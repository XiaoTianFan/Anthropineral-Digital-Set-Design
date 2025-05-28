"""
SD Card Monitor Module for Experimental Theatre Digital Program

This module handles:
- SD card detection using psutil
- Camera-specific folder structure identification
- Background monitoring for SD card insertion/removal
- Integration with image import system

Author: AI Assistant
Date: January 2025
"""

import psutil
import os
import time
import threading
import logging
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set
import hashlib
import shutil
from concurrent.futures import ThreadPoolExecutor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SDCardMonitor:
    def __init__(self, socketio=None, data_dir='data'):
        """
        Initialize the SD Card Monitor
        
        Args:
            socketio: Flask-SocketIO instance for real-time notifications
            data_dir: Directory for storing import history and configuration
        """
        self.socketio = socketio
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        
        # Import directories
        self.originals_dir = self.data_dir / 'originals'
        self.originals_dir.mkdir(parents=True, exist_ok=True)
        
        # Configuration
        self.config = {
            'detection': {
                'polling_interval': 3.0,
                'auto_import': True,
                'supported_extensions': ['.jpg', '.jpeg', '.png', '.tiff', '.bmp', '.raw', '.cr2', '.nef'],
                'max_file_size_mb': 50
            },
            'import': {
                'batch_size': 10,
                'preserve_folder_structure': False,
                'auto_process_after_import': True,
                'duplicate_action': 'skip',  # 'skip', 'overwrite', 'rename'
                'max_concurrent_copies': 3
            },
            'identification': {
                'volume_patterns': ['SDCARD', 'EOS_DIGITAL', 'NIKON', 'CANON', 'SONY', 'FUJIFILM'],
                'camera_folders': ['DCIM', '100CANON', '101CANON', '102CANON', '102EOS5D', '100NIKON', '101NIKON', 'PRIVATE'],
                'min_drive_size_mb': 32,
                'max_drive_size_gb': 512
            }
        }
        
        # State tracking
        self.is_monitoring = False
        self.monitor_thread = None
        self.current_sd_cards: Dict[str, Dict] = {}
        self.known_drives: Set[str] = set()
        
        # Import state
        self.is_importing = False
        self.import_progress = {
            'total_files': 0,
            'current_file': 0,
            'imported_files': 0,
            'skipped_files': 0,
            'error_files': 0,
            'current_filename': '',
            'start_time': None
        }
        
        # Import history file
        self.import_history_file = self.data_dir / 'import_history.json'
        self.import_history = self._load_import_history()
        
        logger.info("SD Card Monitor initialized")
    
    def _load_import_history(self) -> Dict:
        """Load import history from JSON file"""
        try:
            if self.import_history_file.exists():
                with open(self.import_history_file, 'r') as f:
                    return json.load(f)
            else:
                return {
                    'imported_files': {},
                    'sd_cards_seen': {}
                }
        except Exception as e:
            logger.error(f"Error loading import history: {e}")
            return {
                'imported_files': {},
                'sd_cards_seen': {}
            }
    
    def _save_import_history(self):
        """Save import history to JSON file"""
        try:
            with open(self.import_history_file, 'w') as f:
                json.dump(self.import_history, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving import history: {e}")
    
    def detect_sd_cards(self) -> List[Dict]:
        """
        Detect all connected SD cards
        
        Returns:
            List of detected SD card information dictionaries
        """
        detected_cards = []
        
        try:
            # Get all disk partitions
            partitions = psutil.disk_partitions()
            
            for partition in partitions:
                if self._is_sd_card(partition):
                    card_info = self._get_card_info(partition)
                    if card_info:
                        detected_cards.append(card_info)
                        logger.info(f"Detected SD card: {card_info['label']} at {card_info['mount_point']}")
            
        except Exception as e:
            logger.error(f"Error detecting SD cards: {e}")
        
        return detected_cards
    
    def _is_sd_card(self, partition) -> bool:
        """
        Determine if a partition is likely an SD card
        
        Args:
            partition: psutil disk partition object
            
        Returns:
            True if partition is likely an SD card
        """
        try:
            mount_point = partition.mountpoint
            
            # Skip system drives and network drives
            if not mount_point or mount_point in ['C:\\', 'D:\\'] or '\\\\' in mount_point:
                return False
            
            # Check if accessible
            if not os.path.exists(mount_point):
                return False
            
            # Get drive usage info
            try:
                usage = psutil.disk_usage(mount_point)
                drive_size_gb = usage.total / (1024**3)
                
                # Check size constraints (typical SD card range)
                min_size = self.config['identification']['min_drive_size_mb'] / 1024
                max_size = self.config['identification']['max_drive_size_gb']
                
                if drive_size_gb < min_size or drive_size_gb > max_size:
                    return False
                
            except Exception:
                return False
            
            # Check for camera folder structures
            if self._has_camera_folders(mount_point):
                return True
            
            # Check volume label patterns
            if self._matches_volume_patterns(partition):
                return True
            
            # Check file system type (SD cards commonly use FAT32 or exFAT)
            if partition.fstype.lower() in ['fat32', 'exfat', 'fat']:
                # Additional verification - check for image files
                if self._has_image_files(mount_point):
                    return True
            
            return False
            
        except Exception as e:
            logger.debug(f"Error checking partition {partition}: {e}")
            return False
    
    def _has_camera_folders(self, mount_point: str) -> bool:
        """Check if the drive has camera-specific folder structures"""
        try:
            camera_folders = self.config['identification']['camera_folders']
            
            for item in os.listdir(mount_point):
                item_path = os.path.join(mount_point, item)
                if os.path.isdir(item_path):
                    # Check direct match
                    if item.upper() in [folder.upper() for folder in camera_folders]:
                        logger.debug(f"Found camera folder: {item} in {mount_point}")
                        return True
                    
                    # Check DCIM subfolder structure (like DCIM/102EOS5D)
                    if item.upper() == 'DCIM':
                        dcim_path = item_path
                        try:
                            for dcim_item in os.listdir(dcim_path):
                                dcim_subdir = os.path.join(dcim_path, dcim_item)
                                if os.path.isdir(dcim_subdir):
                                    # Check if it matches camera folder patterns
                                    if any(pattern.upper() in dcim_item.upper() 
                                          for pattern in ['CANON', 'NIKON', 'SONY', 'EOS']):
                                        logger.debug(f"Found camera DCIM subfolder: {dcim_item}")
                                        return True
                                    # Check for numbered folders (100CANON, 102EOS5D, etc.)
                                    if len(dcim_item) >= 6 and dcim_item[:3].isdigit():
                                        logger.debug(f"Found numbered camera folder: {dcim_item}")
                                        return True
                        except Exception:
                            pass
            
            return False
            
        except Exception as e:
            logger.debug(f"Error checking camera folders in {mount_point}: {e}")
            return False
    
    def _matches_volume_patterns(self, partition) -> bool:
        """Check if volume label matches known SD card patterns"""
        try:
            # Try to get volume label (this might not always work)
            mount_point = partition.mountpoint
            
            # On Windows, try to get volume label
            if os.name == 'nt':
                try:
                    import subprocess
                    result = subprocess.run(['vol', mount_point[:2]], 
                                          capture_output=True, text=True, timeout=5)
                    if result.returncode == 0:
                        output_lines = result.stdout.split('\n')
                        for line in output_lines:
                            if 'Volume in drive' in line and 'is' in line:
                                volume_label = line.split('is')[-1].strip()
                                volume_patterns = self.config['identification']['volume_patterns']
                                if any(pattern.upper() in volume_label.upper() 
                                      for pattern in volume_patterns):
                                    logger.debug(f"Volume label matches pattern: {volume_label}")
                                    return True
                except Exception:
                    pass
            
            return False
            
        except Exception:
            return False
    
    def _has_image_files(self, mount_point: str, max_check: int = 50) -> bool:
        """Check if the drive contains image files"""
        try:
            supported_extensions = [ext.lower() for ext in self.config['detection']['supported_extensions']]
            image_count = 0
            checked_count = 0
            
            # Walk through directory structure
            for root, dirs, files in os.walk(mount_point):
                for file in files:
                    checked_count += 1
                    if checked_count > max_check:  # Limit search to avoid long delays
                        break
                        
                    file_ext = Path(file).suffix.lower()
                    if file_ext in supported_extensions:
                        image_count += 1
                        if image_count >= 3:  # Found enough images to confirm
                            return True
                
                if checked_count > max_check:
                    break
            
            return image_count > 0
            
        except Exception:
            return False
    
    def _get_card_info(self, partition) -> Optional[Dict]:
        """Get detailed information about an SD card"""
        try:
            mount_point = partition.mountpoint
            usage = psutil.disk_usage(mount_point)
            
            # Get volume label
            volume_label = "Unknown"
            if os.name == 'nt':
                try:
                    import subprocess
                    result = subprocess.run(['vol', mount_point[:2]], 
                                          capture_output=True, text=True, timeout=5)
                    if result.returncode == 0:
                        output_lines = result.stdout.split('\n')
                        for line in output_lines:
                            if 'Volume in drive' in line and 'is' in line:
                                volume_label = line.split('is')[-1].strip()
                                break
                except Exception:
                    pass
            
            # Count image files
            image_count = self._count_image_files(mount_point)
            
            # Generate card ID
            sanitized_mount_point = mount_point.replace(':', '').replace('\\', '_')
            card_id = f"{volume_label}_{sanitized_mount_point}"
            
            card_info = {
                'id': card_id,
                'label': volume_label,
                'mount_point': mount_point,
                'total_space': usage.total,
                'free_space': usage.free,
                'used_space': usage.used,
                'total_space_gb': round(usage.total / (1024**3), 2),
                'free_space_gb': round(usage.free / (1024**3), 2),
                'file_system': partition.fstype,
                'total_images': image_count,
                'detected_at': datetime.now().isoformat()
            }
            
            return card_info
            
        except Exception as e:
            logger.error(f"Error getting card info for {partition}: {e}")
            return None
    
    def _count_image_files(self, mount_point: str, max_count: int = 1000) -> int:
        """Count image files on the SD card"""
        try:
            supported_extensions = [ext.lower() for ext in self.config['detection']['supported_extensions']]
            image_count = 0
            
            for root, dirs, files in os.walk(mount_point):
                for file in files:
                    if image_count >= max_count:  # Limit for performance
                        break
                    file_ext = Path(file).suffix.lower()
                    if file_ext in supported_extensions:
                        image_count += 1
                
                if image_count >= max_count:
                    break
            
            return min(image_count, max_count)
            
        except Exception:
            return 0
    
    def start_monitoring(self):
        """Start background monitoring for SD card changes"""
        if self.is_monitoring:
            logger.warning("SD card monitoring is already active")
            return
        
        self.is_monitoring = True
        self.monitor_thread = threading.Thread(target=self._monitoring_loop, daemon=True)
        self.monitor_thread.start()
        logger.info("Started SD card monitoring")
        
        # Emit status update
        if self.socketio:
            self.socketio.emit('sd_card_status', {
                'monitoring_active': True,
                'current_cards': list(self.current_sd_cards.keys()),
                'message': 'SD card monitoring started'
            })
    
    def stop_monitoring(self):
        """Stop background monitoring"""
        if not self.is_monitoring:
            return
        
        self.is_monitoring = False
        if self.monitor_thread and self.monitor_thread.is_alive():
            self.monitor_thread.join(timeout=5)
        
        logger.info("Stopped SD card monitoring")
        
        # Emit status update
        if self.socketio:
            self.socketio.emit('sd_card_status', {
                'monitoring_active': False,
                'current_cards': [],
                'message': 'SD card monitoring stopped'
            })
    
    def _monitoring_loop(self):
        """Main monitoring loop running in background thread"""
        logger.info("SD card monitoring loop started")
        
        # Initial scan
        current_drives = set()
        for partition in psutil.disk_partitions():
            current_drives.add(partition.mountpoint)
        self.known_drives = current_drives
        
        # Detect any SD cards already connected
        initial_cards = self.detect_sd_cards()
        for card in initial_cards:
            self._handle_card_detected(card)
        
        # Main monitoring loop
        while self.is_monitoring:
            try:
                # Check for drive changes
                new_drives = set()
                for partition in psutil.disk_partitions():
                    new_drives.add(partition.mountpoint)
                
                # Check for newly connected drives
                added_drives = new_drives - self.known_drives
                for drive in added_drives:
                    self._check_new_drive(drive)
                
                # Check for removed drives
                removed_drives = self.known_drives - new_drives
                for drive in removed_drives:
                    self._handle_drive_removed(drive)
                
                self.known_drives = new_drives
                
                # Sleep until next check
                time.sleep(self.config['detection']['polling_interval'])
                
            except Exception as e:
                logger.error(f"Error in monitoring loop: {e}")
                time.sleep(5)  # Wait longer on error
        
        logger.info("SD card monitoring loop ended")
    
    def _check_new_drive(self, drive_path: str):
        """Check if a newly detected drive is an SD card"""
        try:
            # Find the partition object
            for partition in psutil.disk_partitions():
                if partition.mountpoint == drive_path:
                    if self._is_sd_card(partition):
                        card_info = self._get_card_info(partition)
                        if card_info:
                            self._handle_card_detected(card_info)
                    break
        except Exception as e:
            logger.error(f"Error checking new drive {drive_path}: {e}")
    
    def _handle_card_detected(self, card_info: Dict):
        """Handle SD card detection"""
        card_id = card_info['id']
        self.current_sd_cards[card_id] = card_info
        
        logger.info(f"SD card detected: {card_info['label']} with {card_info['total_images']} images")
        
        # Update import history
        if card_id not in self.import_history['sd_cards_seen']:
            self.import_history['sd_cards_seen'][card_id] = {
                'first_seen': card_info['detected_at'],
                'last_seen': card_info['detected_at'],
                'total_imports': 0
            }
        else:
            self.import_history['sd_cards_seen'][card_id]['last_seen'] = card_info['detected_at']
        
        self._save_import_history()
        
        # Emit Socket.IO event
        if self.socketio:
            self.socketio.emit('sd_card_detected', card_info)
        
        # Auto-import if enabled and card has images
        if (self.config['detection']['auto_import'] and 
            card_info['total_images'] > 0 and 
            not self.is_importing):
            
            logger.info(f"Auto-import enabled - starting automatic import from {card_info['label']}")
            
            # Start auto-import in background thread to avoid blocking monitoring
            auto_import_thread = threading.Thread(
                target=self._auto_import_from_card, 
                args=(card_id,), 
                daemon=True
            )
            auto_import_thread.start()
    
    def _auto_import_from_card(self, card_id: str):
        """Automatically import from SD card in background thread"""
        try:
            # Small delay to ensure card is fully ready
            time.sleep(2)
            
            # Emit auto-import started event
            if self.socketio:
                card_info = self.current_sd_cards.get(card_id)
                if card_info:
                    self.socketio.emit('auto_import_started', {
                        'card_id': card_id,
                        'card_label': card_info['label'],
                        'message': f'Auto-importing from {card_info["label"]}'
                    })
            
            # Perform the import (only new files by default)
            result = self.import_from_card(card_id, import_new_only=True)
            
            # Log the result
            if result['status'] == 'success':
                logger.info(f"Auto-import completed: {result['imported_count']} files imported from {card_id}")
                
                # Emit completion event
                if self.socketio:
                    self.socketio.emit('auto_import_completed', {
                        'card_id': card_id,
                        'imported_count': result['imported_count'],
                        'skipped_count': result['skipped_count'],
                        'message': f'Auto-import completed: {result["imported_count"]} new files'
                    })
            else:
                logger.error(f"Auto-import failed for {card_id}: {result['message']}")
                
                # Emit error event
                if self.socketio:
                    self.socketio.emit('auto_import_error', {
                        'card_id': card_id,
                        'error_message': result['message'],
                        'message': f'Auto-import failed: {result["message"]}'
                    })
                    
        except Exception as e:
            logger.error(f"Error in auto-import for {card_id}: {e}")
            
            # Emit error event
            if self.socketio:
                self.socketio.emit('auto_import_error', {
                    'card_id': card_id,
                    'error_message': str(e),
                    'message': f'Auto-import error: {str(e)}'
                })
    
    def _handle_drive_removed(self, drive_path: str):
        """Handle drive removal"""
        # Find and remove any SD cards with this mount point
        removed_cards = []
        for card_id, card_info in list(self.current_sd_cards.items()):
            if card_info['mount_point'] == drive_path:
                removed_cards.append(card_info)
                del self.current_sd_cards[card_id]
        
        for card_info in removed_cards:
            logger.info(f"SD card removed: {card_info['label']}")
            
            # Emit Socket.IO event
            if self.socketio:
                self.socketio.emit('sd_card_removed', {
                    'label': card_info['label'],
                    'mount_point': card_info['mount_point'],
                    'was_importing': False  # TODO: Track import status
                })
    
    def get_current_cards(self) -> List[Dict]:
        """Get list of currently connected SD cards"""
        return list(self.current_sd_cards.values())
    
    def force_scan(self) -> List[Dict]:
        """Force a manual scan for SD cards"""
        logger.info("Force scanning for SD cards...")
        cards = self.detect_sd_cards()
        
        # Update current cards
        self.current_sd_cards.clear()
        for card in cards:
            self.current_sd_cards[card['id']] = card
        
        # Emit status update
        if self.socketio:
            self.socketio.emit('sd_card_status', {
                'monitoring_active': self.is_monitoring,
                'current_cards': [card['label'] for card in cards],
                'total_cards': len(cards),
                'message': f'Force scan completed - found {len(cards)} SD cards'
            })
        
        return cards
    
    def import_from_card(self, card_id: str, import_new_only: bool = True) -> Dict:
        """
        Import images from a specific SD card
        
        Args:
            card_id: ID of the SD card to import from
            import_new_only: If True, only import files not previously imported
            
        Returns:
            Dictionary with import results
        """
        if self.is_importing:
            return {
                'status': 'error',
                'message': 'Import already in progress'
            }
        
        if card_id not in self.current_sd_cards:
            return {
                'status': 'error',
                'message': f'SD card {card_id} not found'
            }
        
        card_info = self.current_sd_cards[card_id]
        mount_point = card_info['mount_point']
        
        try:
            # Find all image files on the SD card
            logger.info(f"Scanning for images on {card_info['label']}...")
            image_files = self._find_image_files(mount_point)
            
            if not image_files:
                return {
                    'status': 'success',
                    'message': 'No image files found on SD card',
                    'imported_count': 0,
                    'skipped_count': 0,
                    'error_count': 0
                }
            
            # Filter out already imported files if requested
            if import_new_only:
                image_files = self._filter_new_files(image_files)
            
            if not image_files:
                return {
                    'status': 'success',
                    'message': 'All files have been previously imported',
                    'imported_count': 0,
                    'skipped_count': len(image_files),
                    'error_count': 0
                }
            
            # Start import process
            return self._perform_import(image_files, card_info)
            
        except Exception as e:
            logger.error(f"Error during import from {card_id}: {e}")
            return {
                'status': 'error',
                'message': f'Import failed: {str(e)}',
                'imported_count': 0,
                'skipped_count': 0,
                'error_count': 0
            }
    
    def _find_image_files(self, mount_point: str) -> List[Dict]:
        """Find all image files on the SD card"""
        image_files = []
        supported_extensions = [ext.lower() for ext in self.config['detection']['supported_extensions']]
        max_file_size = self.config['detection']['max_file_size_mb'] * 1024 * 1024
        
        try:
            for root, dirs, files in os.walk(mount_point):
                for file in files:
                    file_path = os.path.join(root, file)
                    file_ext = Path(file).suffix.lower()
                    
                    if file_ext in supported_extensions:
                        try:
                            file_stat = os.stat(file_path)
                            file_size = file_stat.st_size
                            
                            # Skip files that are too large
                            if file_size > max_file_size:
                                logger.warning(f"Skipping large file: {file} ({file_size / (1024*1024):.1f} MB)")
                                continue
                            
                            # Skip very small files (likely corrupted)
                            if file_size < 1024:  # Less than 1KB
                                logger.warning(f"Skipping small file: {file} ({file_size} bytes)")
                                continue
                            
                            image_files.append({
                                'path': file_path,
                                'filename': file,
                                'size': file_size,
                                'modified_time': file_stat.st_mtime,
                                'relative_path': os.path.relpath(file_path, mount_point)
                            })
                            
                        except Exception as e:
                            logger.warning(f"Error getting file info for {file_path}: {e}")
                            continue
            
            # Sort by modification time (newest first)
            image_files.sort(key=lambda x: x['modified_time'], reverse=True)
            logger.info(f"Found {len(image_files)} image files on SD card")
            
        except Exception as e:
            logger.error(f"Error scanning SD card {mount_point}: {e}")
        
        return image_files
    
    def _filter_new_files(self, image_files: List[Dict]) -> List[Dict]:
        """Filter out files that have already been imported"""
        new_files = []
        
        for file_info in image_files:
            file_hash = self._calculate_file_hash(file_info['path'])
            if file_hash and file_hash not in self.import_history['imported_files']:
                new_files.append(file_info)
            else:
                logger.debug(f"Skipping already imported file: {file_info['filename']}")
        
        logger.info(f"Found {len(new_files)} new files to import (out of {len(image_files)} total)")
        return new_files
    
    def _calculate_file_hash(self, file_path: str) -> Optional[str]:
        """Calculate SHA-256 hash of a file"""
        try:
            hash_sha256 = hashlib.sha256()
            with open(file_path, 'rb') as f:
                # Read file in chunks to handle large files
                for chunk in iter(lambda: f.read(4096), b""):
                    hash_sha256.update(chunk)
            return hash_sha256.hexdigest()
        except Exception as e:
            logger.error(f"Error calculating hash for {file_path}: {e}")
            return None
    
    def _perform_import(self, image_files: List[Dict], card_info: Dict) -> Dict:
        """Perform the actual import process"""
        self.is_importing = True
        
        # Initialize progress tracking
        self.import_progress = {
            'total_files': len(image_files),
            'current_file': 0,
            'imported_files': 0,
            'skipped_files': 0,
            'error_files': 0,
            'current_filename': '',
            'start_time': time.time()
        }
        
        # Emit import started event
        if self.socketio:
            self.socketio.emit('import_started', {
                'total_files': len(image_files),
                'sd_card_label': card_info['label'],
                'card_id': card_info['id']
            })
        
        imported_files = []
        skipped_files = []
        error_files = []
        
        try:
            # Process files in batches
            batch_size = self.config['import']['batch_size']
            
            for i in range(0, len(image_files), batch_size):
                batch = image_files[i:i + batch_size]
                
                # Process batch with concurrent copying
                batch_results = self._process_batch(batch, card_info)
                
                imported_files.extend(batch_results['imported'])
                skipped_files.extend(batch_results['skipped'])
                error_files.extend(batch_results['errors'])
                
                # Update progress
                self.import_progress['current_file'] = min(i + batch_size, len(image_files))
                self.import_progress['imported_files'] = len(imported_files)
                self.import_progress['skipped_files'] = len(skipped_files)
                self.import_progress['error_files'] = len(error_files)
                
                # Emit progress update
                if self.socketio:
                    progress_percent = (self.import_progress['current_file'] / self.import_progress['total_files']) * 100
                    self.socketio.emit('import_progress', {
                        'current_file': self.import_progress['current_file'],
                        'total_files': self.import_progress['total_files'],
                        'progress_percent': round(progress_percent, 1),
                        'files_imported': len(imported_files),
                        'files_remaining': len(image_files) - self.import_progress['current_file'],
                        'current_filename': self.import_progress['current_filename']
                    })
            
            # Update import history
            card_id = card_info['id']
            if card_id in self.import_history['sd_cards_seen']:
                self.import_history['sd_cards_seen'][card_id]['total_imports'] += len(imported_files)
            
            self._save_import_history()
            
            # Calculate duration
            duration = time.time() - self.import_progress['start_time']
            
            # Emit completion event
            if self.socketio:
                self.socketio.emit('import_completed', {
                    'total_imported': len(imported_files),
                    'skipped_duplicates': len(skipped_files),
                    'errors': len(error_files),
                    'duration': round(duration, 2),
                    'card_label': card_info['label']
                })
            
            logger.info(f"Import completed: {len(imported_files)} imported, {len(skipped_files)} skipped, {len(error_files)} errors")
            
            return {
                'status': 'success',
                'message': f'Import completed successfully',
                'imported_count': len(imported_files),
                'skipped_count': len(skipped_files),
                'error_count': len(error_files),
                'duration': duration,
                'imported_files': [f['target_filename'] for f in imported_files]
            }
            
        except Exception as e:
            logger.error(f"Error during import process: {e}")
            
            if self.socketio:
                self.socketio.emit('import_error', {
                    'error_message': str(e),
                    'files_processed': self.import_progress['current_file'],
                    'retry_possible': True
                })
            
            return {
                'status': 'error',
                'message': f'Import failed: {str(e)}',
                'imported_count': len(imported_files),
                'skipped_count': len(skipped_files),
                'error_count': len(error_files)
            }
        
        finally:
            self.is_importing = False
    
    def _process_batch(self, batch: List[Dict], card_info: Dict) -> Dict:
        """Process a batch of files with concurrent copying"""
        results = {
            'imported': [],
            'skipped': [],
            'errors': []
        }
        
        max_workers = min(self.config['import']['max_concurrent_copies'], len(batch))
        
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Submit all copy tasks
            future_to_file = {}
            for file_info in batch:
                future = executor.submit(self._copy_single_file, file_info, card_info)
                future_to_file[future] = file_info
            
            # Collect results
            for future in future_to_file:
                file_info = future_to_file[future]
                self.import_progress['current_filename'] = file_info['filename']
                
                try:
                    result = future.result(timeout=30)  # 30 second timeout per file
                    
                    if result['status'] == 'imported':
                        results['imported'].append(result)
                    elif result['status'] == 'skipped':
                        results['skipped'].append(result)
                    else:
                        results['errors'].append(result)
                        
                except Exception as e:
                    logger.error(f"Error copying {file_info['filename']}: {e}")
                    results['errors'].append({
                        'status': 'error',
                        'source_path': file_info['path'],
                        'filename': file_info['filename'],
                        'error': str(e)
                    })
        
        return results
    
    def _copy_single_file(self, file_info: Dict, card_info: Dict) -> Dict:
        """Copy a single file from SD card to originals directory"""
        try:
            source_path = file_info['path']
            original_filename = file_info['filename']
            
            # Calculate file hash for duplicate detection
            file_hash = self._calculate_file_hash(source_path)
            if not file_hash:
                return {
                    'status': 'error',
                    'source_path': source_path,
                    'filename': original_filename,
                    'error': 'Could not calculate file hash'
                }
            
            # Check if already imported
            if file_hash in self.import_history['imported_files']:
                existing_import = self.import_history['imported_files'][file_hash]
                logger.debug(f"File already imported: {original_filename} -> {existing_import['imported_path']}")
                return {
                    'status': 'skipped',
                    'source_path': source_path,
                    'filename': original_filename,
                    'reason': 'duplicate',
                    'existing_path': existing_import['imported_path']
                }
            
            # Generate target filename with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            name_part = Path(original_filename).stem
            ext_part = Path(original_filename).suffix
            target_filename = f"{name_part}_imported_{timestamp}{ext_part}"
            target_path = self.originals_dir / target_filename
            
            # Ensure unique filename
            counter = 1
            while target_path.exists():
                target_filename = f"{name_part}_imported_{timestamp}_{counter}{ext_part}"
                target_path = self.originals_dir / target_filename
                counter += 1
            
            # Copy the file
            shutil.copy2(source_path, target_path)
            
            # Verify copy
            if not target_path.exists() or target_path.stat().st_size != file_info['size']:
                raise Exception("File copy verification failed")
            
            # Update import history
            self.import_history['imported_files'][file_hash] = {
                'original_path': source_path,
                'imported_path': str(target_path),
                'import_timestamp': datetime.now().isoformat(),
                'file_size': file_info['size'],
                'sd_card_id': card_info['id'],
                'original_filename': original_filename,
                'target_filename': target_filename
            }
            
            logger.info(f"Imported: {original_filename} -> {target_filename}")
            
            return {
                'status': 'imported',
                'source_path': source_path,
                'target_path': str(target_path),
                'filename': original_filename,
                'target_filename': target_filename,
                'file_hash': file_hash,
                'file_size': file_info['size']
            }
            
        except Exception as e:
            logger.error(f"Error copying {file_info['filename']}: {e}")
            return {
                'status': 'error',
                'source_path': source_path,
                'filename': original_filename,
                'error': str(e)
            } 