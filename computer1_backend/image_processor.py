"""
Image Processing Module for Experimental Theatre Digital Program

This module handles:
- Face detection using OpenCV Haar cascades
- Eye detection and cropping from detected faces
- File monitoring for automatic processing
- Socket.IO integration for real-time notifications

Author: AI Assistant
Date: January 2025
"""

import cv2
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
        Detect faces and eyes in an image, then crop and save eye regions
        
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
            
            # If cascades aren't loaded, create dummy eye crops for testing
            if self.face_cascade is None or self.eye_cascade is None:
                return self._create_dummy_eye_crops(img, image_path)
            
            # Detect faces
            faces = self.face_cascade.detectMultiScale(
                gray, 
                scaleFactor=1.1, 
                minNeighbors=5,
                minSize=(30, 30)
            )
            
            eye_filenames = []
            
            for i, (x, y, w, h) in enumerate(faces):
                # Extract face region
                face_roi_gray = gray[y:y+h, x:x+w]
                face_roi_color = img[y:y+h, x:x+w]
                
                # Detect eyes in the face region
                eyes = self.eye_cascade.detectMultiScale(
                    face_roi_gray,
                    scaleFactor=1.1,
                    minNeighbors=5,
                    minSize=(10, 10)
                )
                
                # Crop and save each eye
                for j, (ex, ey, ew, eh) in enumerate(eyes):
                    # Extract eye region
                    eye_img = face_roi_color[ey:ey+eh, ex:ex+ew]
                    
                    # Generate filename with timestamp
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")[:-3]
                    base_name = Path(image_path).stem
                    eye_filename = f"{base_name}_face{i}_eye{j}_{timestamp}.jpg"
                    eye_path = self.cropped_eyes_dir / eye_filename
                    
                    # Save the eye image
                    if self._save_eye_image(eye_img, eye_path):
                        eye_filenames.append(eye_filename)
                        logger.info(f"Saved eye image: {eye_filename}")
            
            if eye_filenames:
                logger.info(f"Processed {len(eye_filenames)} eyes from {image_path}")
            else:
                logger.warning(f"No eyes detected in {image_path}")
                
            return eye_filenames
            
        except Exception as e:
            logger.error(f"Error processing image {image_path}: {e}")
            return []
    
    def _create_dummy_eye_crops(self, img, image_path):
        """Create dummy eye crops for testing when cascades aren't available"""
        try:
            h, w = img.shape[:2]
            # Create two dummy "eye" regions from the center area
            eye_regions = [
                img[h//3:2*h//3, w//4:w//2],  # Left side
                img[h//3:2*h//3, w//2:3*w//4]  # Right side
            ]
            
            eye_filenames = []
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")[:-3]
            base_name = Path(image_path).stem
            
            for i, eye_img in enumerate(eye_regions):
                if eye_img.size > 0:
                    eye_filename = f"{base_name}_dummy_eye{i}_{timestamp}.jpg"
                    eye_path = self.cropped_eyes_dir / eye_filename
                    
                    if self._save_eye_image(eye_img, eye_path):
                        eye_filenames.append(eye_filename)
                        logger.info(f"Saved dummy eye image: {eye_filename}")
            
            return eye_filenames
            
        except Exception as e:
            logger.error(f"Error creating dummy eye crops: {e}")
            return []
    
    def _save_eye_image(self, eye_img, eye_path):
        """Save an eye image to disk"""
        try:
            # Resize eye image to standard size for consistency
            if eye_img.size > 0:
                resized_eye = cv2.resize(eye_img, (64, 32))  # Standard eye aspect ratio
                success = cv2.imwrite(str(eye_path), resized_eye)
                return success
            return False
        except Exception as e:
            logger.error(f"Error saving eye image to {eye_path}: {e}")
            return False
    
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