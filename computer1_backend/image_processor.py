"""
Image Processing Module for Experimental Theatre Digital Program

This module handles:
- Enhanced face detection using OpenCV Haar cascades with improved parameters
- Eye detection and cropping with aspect ratio preservation
- Intelligent padding and sizing for better quality crops
- File monitoring for automatic processing
- Socket.IO integration for real-time notifications

Author: AI Assistant
Date: January 2025
"""

import cv2
import numpy as np
import os
import time
import threading
import logging
from datetime import datetime
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from PIL import Image

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ImageProcessor:
    def __init__(self, socketio=None, originals_dir='data/originals', 
                 cropped_eyes_dir='data/cropped_eyes'):
        """
        Initialize the Image Processor
        
        Args:
            socketio: Flask-SocketIO instance for real-time notifications
            originals_dir: Directory containing original images
            cropped_eyes_dir: Directory to save cropped eye images
        """
        self.socketio = socketio
        self.originals_dir = Path(originals_dir)
        self.cropped_eyes_dir = Path(cropped_eyes_dir)
        
        # Create directories if they don't exist
        self.originals_dir.mkdir(parents=True, exist_ok=True)
        self.cropped_eyes_dir.mkdir(parents=True, exist_ok=True)
        
        # Load OpenCV cascade classifiers
        self.face_cascade = None
        self.eye_cascade = None
        self._load_cascades()
        
        # File monitoring
        self.observer = None
        self.is_monitoring = False
        
        # Enhanced detection parameters - Tuned to reduce false positives
        self.detection_params = {
            'face_scale_factor': 1.1,       # Less sensitive face detection (was 1.05)
            'face_min_neighbors': 5,        # More strict face detection (was 4)
            'face_min_size': (50, 50),      # Larger minimum face size (was 40x40)
            'eye_scale_factor': 1.1,        # Less sensitive eye detection (was 1.03)
            'eye_min_neighbors': 6,         # Much more strict for eyes (was 3)
            'eye_min_size': (15, 15),       # Larger minimum eye size (was 8x8)
            'padding_factor': 0.2,          # 20% padding around detected eyes
            'max_dimension': 120,           # Maximum dimension while preserving aspect ratio
            'min_dimension': 15,            # Larger minimum dimension (was 12)
            'quality_threshold': 80,        # Higher area threshold (was 40)
            # Additional filtering for anatomical constraints
            'max_eyes_per_face': 4,         # Maximum reasonable eyes per face
            'eye_position_filter': True,    # Enable position-based filtering
            'upper_face_ratio': 0.7         # Eyes should be in upper 70% of face
        }
        
    def _load_cascades(self):
        """Load OpenCV Haar cascade classifiers for face and eye detection"""
        try:
            # Try to load face cascade (built-in with OpenCV)
            self.face_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            )
            
            # Try to load eye cascade (built-in with OpenCV)
            self.eye_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + 'haarcascade_eye.xml'
            )
            
            if self.face_cascade.empty() or self.eye_cascade.empty():
                raise Exception("Failed to load cascade classifiers")
                
            logger.info("Successfully loaded OpenCV cascade classifiers")
            
        except Exception as e:
            logger.error(f"Error loading cascade classifiers: {e}")
            # Create dummy classifiers for testing if real ones fail
            self.face_cascade = None
            self.eye_cascade = None
    
    def detect_faces_and_eyes(self, image_path):
        """
        Detect faces and eyes in an image, then crop and save eye regions with preserved aspect ratios
        
        Args:
            image_path: Path to the input image
            
        Returns:
            List of saved eye image filenames
        """
        try:
            # Read the image
            img = cv2.imread(str(image_path))
            if img is None:
                logger.error(f"Could not read image: {image_path}")
                return []
            
            # Convert to grayscale for detection
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Apply histogram equalization for better detection
            gray = cv2.equalizeHist(gray)
            
            # If cascades aren't loaded, return empty list (no dummy generation)
            if self.face_cascade is None or self.eye_cascade is None:
                logger.error("Cascade classifiers not loaded - cannot process images")
                return []
            
            # Detect faces with improved parameters
            faces = self.face_cascade.detectMultiScale(
                gray, 
                scaleFactor=self.detection_params['face_scale_factor'], 
                minNeighbors=self.detection_params['face_min_neighbors'],
                minSize=self.detection_params['face_min_size']
            )
            
            eye_filenames = []
            
            for i, (x, y, w, h) in enumerate(faces):
                # Extract face region with some padding for better eye detection
                face_padding = int(max(w, h) * 0.1)
                face_x1 = max(0, x - face_padding)
                face_y1 = max(0, y - face_padding)
                face_x2 = min(img.shape[1], x + w + face_padding)
                face_y2 = min(img.shape[0], y + h + face_padding)
                
                face_roi_gray = gray[face_y1:face_y2, face_x1:face_x2]
                face_roi_color = img[face_y1:face_y2, face_x1:face_x2]
                
                # Detect eyes in the face region with improved parameters
                eyes = self.eye_cascade.detectMultiScale(
                    face_roi_gray,
                    scaleFactor=self.detection_params['eye_scale_factor'],
                    minNeighbors=self.detection_params['eye_min_neighbors'],
                    minSize=self.detection_params['eye_min_size']
                )
                
                # Filter and process detected eyes
                processed_eyes = self._filter_and_process_eyes(eyes, face_roi_color, i, image_path)
                eye_filenames.extend(processed_eyes)
            
            if eye_filenames:
                logger.info(f"Processed {len(eye_filenames)} eyes from {image_path}")
            else:
                logger.warning(f"No eyes detected in {image_path}")
                
            return eye_filenames
            
        except Exception as e:
            logger.error(f"Error processing image {image_path}: {e}")
            return []
    
    def _filter_and_process_eyes(self, eyes, face_roi_color, face_index, image_path):
        """Filter detected eyes and process them with aspect ratio preservation"""
        eye_filenames = []
        
        # Filter eyes by quality and remove duplicates
        filtered_eyes = self._filter_eye_detections(eyes)
        
        for j, (ex, ey, ew, eh) in enumerate(filtered_eyes):
            try:
                # Extract eye region with natural eye proportions and padding
                padded_eye_img = self._extract_eye_with_padding(face_roi_color, ex, ey, ew, eh)
                
                if padded_eye_img is not None:
                    # Generate filename with timestamp
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")[:-3]
                    base_name = Path(image_path).stem
                    eye_filename = f"{base_name}_face{face_index}_eye{j}_{timestamp}.jpg"
                    eye_path = self.cropped_eyes_dir / eye_filename
                    
                    # Save the eye image with preserved aspect ratio
                    if self._save_eye_image_enhanced(padded_eye_img, eye_path):
                        eye_filenames.append(eye_filename)
                        logger.info(f"Saved enhanced eye image: {eye_filename} (size: {padded_eye_img.shape[1]}x{padded_eye_img.shape[0]})")
                        
            except Exception as e:
                logger.error(f"Error processing eye {j} from face {face_index}: {e}")
                continue
        
        return eye_filenames
    
    def _filter_eye_detections(self, eyes):
        """Filter eye detections to remove poor quality, overlapping, and anatomically incorrect detections"""
        if len(eyes) == 0:
            return []
        
        # Filter by minimum area first
        min_area = self.detection_params['quality_threshold']
        quality_eyes = []
        
        for (ex, ey, ew, eh) in eyes:
            area = ew * eh
            if area >= min_area:
                quality_eyes.append((ex, ey, ew, eh, area))
        
        if len(quality_eyes) == 0:
            return []
        
        # Apply anatomical filtering if enabled
        if self.detection_params.get('eye_position_filter', False):
            quality_eyes = self._apply_anatomical_filtering(quality_eyes)
        
        # Remove overlapping detections (keep larger ones)
        filtered_eyes = []
        quality_eyes.sort(key=lambda x: x[4], reverse=True)  # Sort by area, largest first
        
        for (ex, ey, ew, eh, area) in quality_eyes:
            overlap = False
            for (fx, fy, fw, fh) in filtered_eyes:
                # Check for significant overlap
                if self._rectangles_overlap(ex, ey, ew, eh, fx, fy, fw, fh):
                    overlap = True
                    break
            
            if not overlap:
                filtered_eyes.append((ex, ey, ew, eh))
        
        # Limit to reasonable number of eyes per face
        max_eyes = self.detection_params.get('max_eyes_per_face', 4)
        filtered_eyes = filtered_eyes[:max_eyes]
        
        return filtered_eyes
    
    def _apply_anatomical_filtering(self, quality_eyes):
        """Apply anatomical constraints to filter out false positives"""
        if not quality_eyes:
            return []
        
        # Get face dimensions (assuming we're working within a face ROI)
        # Eyes should typically be in the upper portion of the face
        upper_face_ratio = self.detection_params.get('upper_face_ratio', 0.7)
        
        # Find the overall bounds of detections to estimate face region
        all_y_positions = [eye[1] for eye in quality_eyes]  # y coordinates
        min_y = min(all_y_positions)
        max_y = max(all_y_positions)
        face_height_estimate = max_y - min_y + max([eye[3] for eye in quality_eyes])
        
        # Calculate the upper face threshold
        upper_face_threshold = min_y + (face_height_estimate * upper_face_ratio)
        
        # Filter eyes that are too low (likely nose holes or mouth)
        anatomically_valid_eyes = []
        for (ex, ey, ew, eh, area) in quality_eyes:
            eye_center_y = ey + eh // 2
            
            # Check if eye is in upper portion of face
            if eye_center_y <= upper_face_threshold:
                anatomically_valid_eyes.append((ex, ey, ew, eh, area))
            else:
                logger.debug(f"Filtered out low eye detection at y={eye_center_y} (threshold={upper_face_threshold:.1f})")
        
        # Additional filtering: remove detections that are too close vertically (likely same feature)
        if len(anatomically_valid_eyes) > 2:
            final_eyes = []
            for i, (ex1, ey1, ew1, eh1, area1) in enumerate(anatomically_valid_eyes):
                is_unique = True
                for j, (ex2, ey2, ew2, eh2, area2) in enumerate(anatomically_valid_eyes):
                    if i != j:
                        # Check vertical distance between detections
                        vertical_distance = abs(ey1 - ey2)
                        min_separation = max(eh1, eh2) * 0.5  # Minimum separation
                        
                        if vertical_distance < min_separation and area1 < area2:
                            is_unique = False  # Keep the larger detection
                            break
                
                if is_unique:
                    final_eyes.append((ex1, ey1, ew1, eh1, area1))
            
            anatomically_valid_eyes = final_eyes
        
        return anatomically_valid_eyes
    
    def _rectangles_overlap(self, x1, y1, w1, h1, x2, y2, w2, h2, threshold=0.5):
        """Check if two rectangles overlap significantly"""
        # Calculate intersection
        x_left = max(x1, x2)
        y_top = max(y1, y2)
        x_right = min(x1 + w1, x2 + w2)
        y_bottom = min(y1 + h1, y2 + h2)
        
        if x_right <= x_left or y_bottom <= y_top:
            return False
        
        intersection_area = (x_right - x_left) * (y_bottom - y_top)
        area1 = w1 * h1
        area2 = w2 * h2
        
        # Check if intersection is significant relative to smaller rectangle
        min_area = min(area1, area2)
        overlap_ratio = intersection_area / min_area
        
        return overlap_ratio > threshold
    
    def _extract_eye_with_padding(self, face_roi_color, ex, ey, ew, eh):
        """Extract eye region with natural eye proportions and padding"""
        try:
            face_h, face_w = face_roi_color.shape[:2]
            
            # Convert square detection to natural eye proportions
            # Human eyes are typically 3:2 to 2:1 width:height ratio
            natural_eye_ratio = 2  # width:height ratio for natural eyes
            
            if ew == eh:  # Square detection (typical for Haar cascades)
                # Reshape to natural eye proportions
                natural_width = int(ew * 1.1)  # Slightly wider
                natural_height = int(natural_width / natural_eye_ratio)
                
                # Adjust the eye region coordinates
                width_adjust = (natural_width - ew) // 2
                height_adjust = (eh - natural_height) // 2
                
                # New eye coordinates with natural proportions
                new_ex = ex - width_adjust
                new_ey = ey + height_adjust
                new_ew = natural_width
                new_eh = natural_height
                
                # Ensure coordinates are within face bounds
                new_ex = max(0, new_ex)
                new_ey = max(0, new_ey)
                new_ew = min(new_ew, face_w - new_ex)
                new_eh = min(new_eh, face_h - new_ey)
                
            else:
                # Use original dimensions if already non-square
                new_ex, new_ey, new_ew, new_eh = ex, ey, ew, eh
            
            # Apply proportional padding
            padding_w = int(new_ew * self.detection_params['padding_factor'])
            padding_h = int(new_eh * self.detection_params['padding_factor'])
            
            # Calculate final padded coordinates
            x1 = max(0, new_ex - padding_w)
            y1 = max(0, new_ey - padding_h)
            x2 = min(face_w, new_ex + new_ew + padding_w)
            y2 = min(face_h, new_ey + new_eh + padding_h)
            
            # Extract the eye region
            padded_eye = face_roi_color[y1:y2, x1:x2]
            
            # Validate extracted region
            if padded_eye.size == 0 or padded_eye.shape[0] < self.detection_params['min_dimension'] or padded_eye.shape[1] < self.detection_params['min_dimension']:
                return None
            
            return padded_eye
            
        except Exception as e:
            logger.error(f"Error extracting eye with natural proportions: {e}")
            return None
    
    def _save_eye_image_enhanced(self, eye_img, eye_path):
        """Save an eye image with preserved aspect ratio and intelligent resizing"""
        try:
            if eye_img is None or eye_img.size == 0:
                return False
            
            original_h, original_w = eye_img.shape[:2]
            max_dim = self.detection_params['max_dimension']
            
            # Calculate new dimensions while preserving aspect ratio
            if max(original_w, original_h) > max_dim:
                # Resize while maintaining aspect ratio
                if original_w > original_h:
                    new_w = max_dim
                    new_h = int((original_h * max_dim) / original_w)
                else:
                    new_h = max_dim
                    new_w = int((original_w * max_dim) / original_h)
                
                # Ensure minimum dimensions
                if new_w < self.detection_params['min_dimension']:
                    new_w = self.detection_params['min_dimension']
                if new_h < self.detection_params['min_dimension']:
                    new_h = self.detection_params['min_dimension']
                
                # Apply high-quality resize
                resized_eye = cv2.resize(eye_img, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
            else:
                # Use original size if already within limits
                resized_eye = eye_img.copy()
            
            # Apply subtle sharpening for better quality
            kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
            sharpened = cv2.filter2D(resized_eye, -1, kernel)
            final_image = cv2.addWeighted(resized_eye, 0.8, sharpened, 0.2, 0)
            
            # Save with high quality
            success = cv2.imwrite(str(eye_path), final_image, [cv2.IMWRITE_JPEG_QUALITY, 95])
            return success
            
        except Exception as e:
            logger.error(f"Error saving enhanced eye image to {eye_path}: {e}")
            return False
    
    def _save_eye_image(self, eye_img, eye_path):
        """Legacy save method - redirects to enhanced version for compatibility"""
        return self._save_eye_image_enhanced(eye_img, eye_path)
    
    def process_existing_images(self):
        """Process all existing images in the originals directory"""
        logger.info("Processing existing images in originals directory...")
        
        image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
        processed_count = 0
        
        for image_path in self.originals_dir.iterdir():
            if image_path.suffix.lower() in image_extensions:
                eye_filenames = self.detect_faces_and_eyes(image_path)
                if eye_filenames and self.socketio:
                    # Notify clients of new eye images
                    for filename in eye_filenames:
                        self.socketio.emit('new_eye_image_available', {
                            'filename': filename,
                            'url': f'/eyes/{filename}'
                        })
                processed_count += 1
        
        logger.info(f"Processed {processed_count} existing images")
    
    def start_monitoring(self):
        """Start monitoring the originals directory for new images"""
        if self.is_monitoring:
            logger.warning("Already monitoring directory")
            return
            
        try:
            event_handler = ImageFileHandler(self)
            self.observer = Observer()
            self.observer.schedule(event_handler, str(self.originals_dir), recursive=False)
            self.observer.start()
            self.is_monitoring = True
            logger.info(f"Started monitoring directory: {self.originals_dir}")
            
        except Exception as e:
            logger.error(f"Error starting directory monitoring: {e}")
    
    def stop_monitoring(self):
        """Stop monitoring the originals directory"""
        if self.observer and self.is_monitoring:
            self.observer.stop()
            self.observer.join()
            self.is_monitoring = False
            logger.info("Stopped monitoring directory")


class ImageFileHandler(FileSystemEventHandler):
    """File system event handler for new images"""
    
    def __init__(self, image_processor):
        self.image_processor = image_processor
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
    
    def on_created(self, event):
        """Handle new file creation"""
        if not event.is_directory:
            file_path = Path(event.src_path)
            if file_path.suffix.lower() in self.image_extensions:
                # Add small delay to ensure file is fully written
                time.sleep(0.5)
                self._process_new_image(file_path)
    
    def on_moved(self, event):
        """Handle file moves (like drag and drop)"""
        if not event.is_directory:
            file_path = Path(event.dest_path)
            if file_path.suffix.lower() in self.image_extensions:
                time.sleep(0.5)
                self._process_new_image(file_path)
    
    def _process_new_image(self, file_path):
        """Process a new image file"""
        try:
            logger.info(f"New image detected: {file_path.name}")
            eye_filenames = self.image_processor.detect_faces_and_eyes(file_path)
            
            if eye_filenames and self.image_processor.socketio:
                # Notify clients of new eye images
                for filename in eye_filenames:
                    self.image_processor.socketio.emit('new_eye_image_available', {
                        'filename': filename,
                        'url': f'/eyes/{filename}',
                        'timestamp': datetime.now().isoformat()
                    })
                    logger.info(f"Notified clients of new eye image: {filename}")
            
        except Exception as e:
            logger.error(f"Error processing new image {file_path}: {e}")


def create_test_image(output_path, width=400, height=300):
    """Create a simple test image with basic shapes for testing"""
    try:
        from PIL import Image, ImageDraw
        
        # Create a white background
        img = Image.new('RGB', (width, height), 'white')
        draw = ImageDraw.Draw(img)
        
        # Draw a simple face-like shape
        # Head (circle)
        draw.ellipse([width//4, height//4, 3*width//4, 3*height//4], 
                    outline='black', width=3, fill='lightgray')
        
        # Eyes (smaller circles)
        eye_y = height//2 - 20
        left_eye_x = width//2 - 40
        right_eye_x = width//2 + 40
        
        draw.ellipse([left_eye_x-10, eye_y-5, left_eye_x+10, eye_y+5], 
                    fill='black')
        draw.ellipse([right_eye_x-10, eye_y-5, right_eye_x+10, eye_y+5], 
                    fill='black')
        
        # Save the image
        img.save(output_path)
        logger.info(f"Created test image: {output_path}")
        return True
        
    except Exception as e:
        logger.error(f"Error creating test image: {e}")
        return False


if __name__ == "__main__":
    # Test the image processor independently
    processor = ImageProcessor()
    
    # Create a test image if none exist
    test_image_path = processor.originals_dir / "test_face.jpg"
    if not test_image_path.exists():
        create_test_image(test_image_path)
    
    # Process existing images
    processor.process_existing_images()
    
    # Start monitoring (this would run indefinitely in production)
    processor.start_monitoring()
    
    try:
        # Keep the script running for testing
        print("Image processor running. Press Ctrl+C to stop.")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping image processor...")
        processor.stop_monitoring() 