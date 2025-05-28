from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import os
import threading
import time
from image_processor import ImageProcessor
import socket

app = Flask(__name__)
app.config['SECRET_KEY'] = 'experimental_theatre_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
CROPPED_EYES_DIR = os.path.join(DATA_DIR, 'cropped_eyes')
ORIGINALS_DIR = os.path.join(DATA_DIR, 'originals')

# Global image processor instance
image_processor = None

@app.route('/')
def index():
    """Serve the main client page"""
    return render_template('index.html')

@app.route('/eyes/<filename>')
def serve_eye_image(filename):
    """Serve cropped eye images to the client"""
    return send_from_directory(CROPPED_EYES_DIR, filename)

@app.route('/status')
def get_status():
    """Get current system status"""
    global image_processor
    return {
        'image_processor_ready': image_processor is not None,
        'monitoring_active': image_processor.is_monitoring if image_processor else False,
        'directories': {
            'originals': ORIGINALS_DIR,
            'cropped_eyes': CROPPED_EYES_DIR
        }
    }

@app.route('/process_test_image')
def process_test_image():
    """Process a test image for development purposes"""
    global image_processor
    if image_processor:
        # Create a test image if none exist
        from image_processor import create_test_image
        test_image_path = os.path.join(ORIGINALS_DIR, f"test_face_{int(time.time())}.jpg")
        
        if create_test_image(test_image_path):
            # Process the test image
            eye_filenames = image_processor.detect_faces_and_eyes(test_image_path)
            
            # Emit the new eye images to clients
            for filename in eye_filenames:
                socketio.emit('new_eye_image_available', {
                    'filename': filename,
                    'url': f'/eyes/{filename}',
                    'timestamp': time.time()
                })
            
            return {'status': 'success', 'eyes_found': len(eye_filenames), 'filenames': eye_filenames}
        else:
            return {'status': 'error', 'message': 'Failed to create test image'}
    else:
        return {'status': 'error', 'message': 'Image processor not initialized'}

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('server_message', {'data': 'Connected to server'})
    
    # Send current status
    emit('connection_status', {
        'status': 'connected',
        'image_processor_ready': image_processor is not None,
        'monitoring_active': image_processor.is_monitoring if image_processor else False
    })

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')

@socketio.on('test_message')
def handle_test_message(data):
    """Handle test messages from client"""
    print(f'Received test message: {data}')
    emit('test_response', {'data': f'Server received: {data["message"]}'})

@socketio.on('request_test_processing')
def handle_test_processing():
    """Handle request to process a test image"""
    global image_processor
    if image_processor:
        # Create and process a test image
        from image_processor import create_test_image
        test_image_path = os.path.join(ORIGINALS_DIR, f"test_face_{int(time.time())}.jpg")
        
        if create_test_image(test_image_path):
            eye_filenames = image_processor.detect_faces_and_eyes(test_image_path)
            
            emit('test_processing_result', {
                'status': 'success',
                'eyes_found': len(eye_filenames),
                'message': f'Processed test image, found {len(eye_filenames)} eyes'
            })
            
            # The eye images will be automatically emitted by the image processor
        else:
            emit('test_processing_result', {
                'status': 'error',
                'message': 'Failed to create test image'
            })
    else:
        emit('test_processing_result', {
            'status': 'error',
            'message': 'Image processor not ready'
        })

@socketio.on('trigger_animation_test')
def handle_animation_trigger():
    """Handle animation trigger test from client"""
    print('Animation trigger requested')
    emit('trigger_final_animation', {
        'message': 'Animation triggered manually',
        'timestamp': time.time()
    })

@socketio.on('request_status')
def handle_status_request():
    """Handle request for current system status"""
    global image_processor
    emit('connection_status', {
        'status': 'connected',
        'image_processor_ready': image_processor is not None,
        'monitoring_active': image_processor.is_monitoring if image_processor else False
    })

def emit_new_eye_image(image_filename):
    """Emit event when new eye image is available"""
    socketio.emit('new_eye_image_available', {'filename': image_filename})
    print(f'Emitted new eye image event: {image_filename}')

def emit_trigger_animation():
    """Emit event to trigger the final animation"""
    socketio.emit('trigger_final_animation', {})
    print('Emitted trigger animation event')

def initialize_image_processor():
    """Initialize the image processor in a separate thread"""
    global image_processor
    
    try:
        print("Initializing image processor...")
        image_processor = ImageProcessor(
            socketio=socketio,
            originals_dir=ORIGINALS_DIR,
            cropped_eyes_dir=CROPPED_EYES_DIR
        )
        
        # Process any existing images
        image_processor.process_existing_images()
        
        # Start monitoring for new images
        image_processor.start_monitoring()
        
        print("Image processor initialized and monitoring started")
        
        # Broadcast the updated status to all connected clients
        socketio.emit('connection_status', {
            'status': 'connected',
            'image_processor_ready': True,
            'monitoring_active': image_processor.is_monitoring
        })
        
    except Exception as e:
        print(f"Error initializing image processor: {e}")
        import traceback
        traceback.print_exc()
        image_processor = None
        
        # Broadcast the error status to all connected clients
        socketio.emit('connection_status', {
            'status': 'connected',
            'image_processor_ready': False,
            'monitoring_active': False,
            'error': str(e)
        })

def get_local_ip():
    """Get the local IP address"""
    try:
        # Connect to a remote address to get the local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return "localhost"

def startup_sequence():
    """Run startup sequence in a separate thread"""
    try:
        time.sleep(3)  # Wait longer for Flask and SocketIO to start
        
        print("\n" + "="*60)
        print("🎭 EXPERIMENTAL THEATRE DIGITAL PROGRAM")
        print("="*60)
        
        local_ip = get_local_ip()
        
        print(f"✅ Server running on:")
        print(f"   Local:   http://localhost:5000")
        print(f"   Network: http://{local_ip}:5000")
        print(f"\n📁 Directories:")
        print(f"   Originals:    {ORIGINALS_DIR}")
        print(f"   Cropped Eyes: {CROPPED_EYES_DIR}")
        
        # Initialize image processor
        print("\n🔧 Initializing Image Processor...")
        initialize_image_processor()
        
        processor_status = "✅ Ready" if image_processor else "❌ Error"
        monitoring_status = "✅ Active" if (image_processor and image_processor.is_monitoring) else "❌ Inactive"
        
        print(f"\n🔧 System Status:")
        print(f"   Image Processor: {processor_status}")
        print(f"   File Monitoring: {monitoring_status}")
        
        if image_processor is None:
            print("⚠️  WARNING: Image processor failed to initialize!")
            print("   Check the error messages above for details.")
        
        print(f"\n🚀 Ready for connections!")
        print("="*60)
        
    except Exception as e:
        print(f"❌ Error in startup sequence: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    print("Starting Experimental Theatre Server...")
    print(f"Base directory: {BASE_DIR}")
    print(f"Data directory: {DATA_DIR}")
    
    # Create data directories if they don't exist
    os.makedirs(CROPPED_EYES_DIR, exist_ok=True)
    os.makedirs(ORIGINALS_DIR, exist_ok=True)
    
    # Start startup sequence in background thread
    startup_thread = threading.Thread(target=startup_sequence)
    startup_thread.daemon = True
    startup_thread.start()
    
    # Run the server
    # Use host='0.0.0.0' to allow connections from other computers on the network
    try:
        socketio.run(app, host='0.0.0.0', port=5000, debug=True, use_reloader=False)
    except KeyboardInterrupt:
        print("\nShutting down server...")
        if image_processor:
            image_processor.stop_monitoring()
        print("Server stopped.") 