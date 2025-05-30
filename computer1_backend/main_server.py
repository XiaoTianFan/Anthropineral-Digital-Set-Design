from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import os
import threading
import time
from image_processor import ImageProcessor
from sd_card_monitor import SDCardMonitor
from keyboard_listener import KeyboardTriggerListener
import socket

app = Flask(__name__)
app.config['SECRET_KEY'] = 'experimental_theatre_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
CROPPED_EYES_DIR = os.path.join(DATA_DIR, 'cropped_eyes')
ORIGINALS_DIR = os.path.join(DATA_DIR, 'originals')

# Global instances
image_processor = None
sd_card_monitor = None
keyboard_listener = None

@app.route('/')
def index():
    """Serve the main client page"""
    return render_template('index.html')

@app.route('/eyes/<filename>')
def serve_eye_image(filename):
    """Serve cropped eye images to the client"""
    return send_from_directory(CROPPED_EYES_DIR, filename)

@app.route('/get_existing_eyes')
def get_existing_eyes():
    """Get list of existing eye images"""
    try:
        eye_files = []
        if os.path.exists(CROPPED_EYES_DIR):
            files = os.listdir(CROPPED_EYES_DIR)
            # Filter for image files and sort by modification time (newest first)
            image_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
            image_files.sort(key=lambda f: os.path.getmtime(os.path.join(CROPPED_EYES_DIR, f)), reverse=True)
            
            # Limit to most recent 20 images
            for filename in image_files[:20]:
                eye_files.append({
                    'filename': filename,
                    'url': f'/eyes/{filename}',
                    'timestamp': os.path.getmtime(os.path.join(CROPPED_EYES_DIR, filename))
                })
        
        return {'status': 'success', 'eyes': eye_files}
    except Exception as e:
        print(f"Error getting existing eyes: {e}")
        return {'status': 'error', 'message': str(e)}

@app.route('/status')
def get_status():
    """Get current system status"""
    global image_processor, sd_card_monitor
    return {
        'image_processor_ready': image_processor is not None,
        'monitoring_active': image_processor.is_monitoring if image_processor else False,
        'sd_card_monitoring_active': sd_card_monitor.is_monitoring if sd_card_monitor else False,
        'current_sd_cards': sd_card_monitor.get_current_cards() if sd_card_monitor else [],
        'import_in_progress': sd_card_monitor.is_importing if sd_card_monitor else False,
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
        'monitoring_active': image_processor.is_monitoring if image_processor else False,
        'sd_card_monitoring_active': sd_card_monitor.is_monitoring if sd_card_monitor else False,
        'current_sd_cards': sd_card_monitor.get_current_cards() if sd_card_monitor else [],
        'import_in_progress': sd_card_monitor.is_importing if sd_card_monitor else False
    })
    
    # Send existing eye images to the newly connected client
    send_existing_eye_images()

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
    global image_processor, sd_card_monitor
    emit('connection_status', {
        'status': 'connected',
        'image_processor_ready': image_processor is not None,
        'monitoring_active': image_processor.is_monitoring if image_processor else False,
        'sd_card_monitoring_active': sd_card_monitor.is_monitoring if sd_card_monitor else False,
        'current_sd_cards': sd_card_monitor.get_current_cards() if sd_card_monitor else [],
        'import_in_progress': sd_card_monitor.is_importing if sd_card_monitor else False
    })

@socketio.on('request_existing_eyes')
def handle_request_existing_eyes():
    """Handle request for existing eye images"""
    send_existing_eye_images()

@socketio.on('request_keyboard_status')
def handle_keyboard_status_request():
    """Handle request for keyboard listener status"""
    global keyboard_listener
    emit('keyboard_status', {
        'active': keyboard_listener.is_listening if keyboard_listener else False,
        'hotkey': keyboard_listener.hotkey if keyboard_listener else None,
        'cooldown_seconds': keyboard_listener.cooldown_seconds if keyboard_listener else None
    })

# 🆕 NEW: Cue system event handlers
@socketio.on('cue-system-start')
def handle_cue_system_start():
    """Start the complete performance cue sequence"""
    print('🎭 Starting cue system performance')
    emit('cue-execute', {'cue': 'CUE-01', 'source': 'system-start'})

@socketio.on('cue-manual-trigger')
def handle_manual_cue_trigger(data):
    """Handle manual cue triggers (spacebar, etc.)"""
    cue_id = data.get('cue', 'CUE-05')
    print(f'🎭 Manual cue trigger: {cue_id}')
    emit('cue-execute', {'cue': cue_id, 'source': 'manual'})

@socketio.on('cue-spacebar-trigger')  # NEW
def handle_spacebar_trigger(data):
    """Handle context-aware spacebar triggers"""
    print('🎭 Context-aware spacebar trigger received')
    # Forward to frontend for context-aware decision
    emit('cue-spacebar-context', {
        'source': data.get('source', 'keyboard'),
        'timestamp': data.get('timestamp', time.time())
    })

@socketio.on('sd-card-inserted')  # ENHANCE existing handler
def handle_sd_card_insertion_enhanced(data):
    """Enhanced SD card handler with cue integration"""
    # Keep existing SD card logic...
    if sd_card_monitor:
        sd_card_monitor.handle_new_card(data)
    
    # 🆕 NEW: Add cue system integration
    insert_count = data.get('insertCount', 1)
    emit('cue-sd-card-detected', {
        'insertCount': insert_count,
        'timestamp': time.time(),
        'triggerSpeedIncrease': insert_count <= 5
    })
    print(f'🎭 SD card cue trigger: Insert #{insert_count}')

@socketio.on('cue-visual-trigger')  # NEW
def handle_visual_trigger(data):
    """Handle visual system triggers for sound cues"""
    trigger_type = data.get('type')
    print(f'🎭 Visual trigger received: {trigger_type}')
    
    # Forward to frontend for visual actions
    emit('cue-visual-action', data)

def send_existing_eye_images():
    """Send existing eye images to the requesting client"""
    try:
        if os.path.exists(CROPPED_EYES_DIR):
            files = os.listdir(CROPPED_EYES_DIR)
            # Filter for image files and sort by modification time (newest first)
            image_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
            image_files.sort(key=lambda f: os.path.getmtime(os.path.join(CROPPED_EYES_DIR, f)), reverse=True)
            
            # Send existing eye images (limit to most recent 20)
            for filename in image_files[:20]:
                emit('new_eye_image_available', {
                    'filename': filename,
                    'url': f'/eyes/{filename}',
                    'timestamp': os.path.getmtime(os.path.join(CROPPED_EYES_DIR, filename)),
                    'existing': True  # Flag to indicate this is an existing image
                })
            
            print(f"Sent {min(len(image_files), 20)} existing eye images to client")
    except Exception as e:
        print(f"Error sending existing eye images: {e}")

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
            'monitoring_active': image_processor.is_monitoring,
            'sd_card_monitoring_active': sd_card_monitor.is_monitoring if sd_card_monitor else False,
            'current_sd_cards': sd_card_monitor.get_current_cards() if sd_card_monitor else [],
            'import_in_progress': sd_card_monitor.is_importing if sd_card_monitor else False
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
            'sd_card_monitoring_active': False,
            'current_sd_cards': [],
            'import_in_progress': False,
            'error': str(e)
        })

def initialize_sd_card_monitor():
    """Initialize the SD card monitor"""
    global sd_card_monitor
    
    try:
        print("Initializing SD card monitor...")
        sd_card_monitor = SDCardMonitor(
            socketio=socketio,
            data_dir=DATA_DIR
        )
        
        # Start monitoring for SD card changes
        sd_card_monitor.start_monitoring()
        
        print("SD card monitor initialized and monitoring started")
        
        # Perform initial scan
        initial_cards = sd_card_monitor.force_scan()
        print(f"Initial SD card scan found {len(initial_cards)} cards")
        
    except Exception as e:
        print(f"Error initializing SD card monitor: {e}")
        import traceback
        traceback.print_exc()
        sd_card_monitor = None

def initialize_keyboard_listener():
    """Initialize the keyboard trigger listener"""
    global keyboard_listener
    
    try:
        print("Initializing keyboard trigger listener...")
        keyboard_listener = KeyboardTriggerListener(
            socketio_instance=socketio,
            hotkey="down"  # Using down arrow key as the trigger key
        )
        
        # Start listening for keyboard shortcuts
        keyboard_listener.start_listening()
        
        print("Keyboard trigger listener initialized")
        
    except Exception as e:
        print(f"Error initializing keyboard listener: {e}")
        import traceback
        traceback.print_exc()
        keyboard_listener = None

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
        
        # Initialize SD card monitor
        print("\n💾 Initializing SD Card Monitor...")
        initialize_sd_card_monitor()
        
        # Initialize keyboard listener
        print("\n🎹 Initializing Keyboard Trigger Listener...")
        initialize_keyboard_listener()
        
        processor_status = "✅ Ready" if image_processor else "❌ Error"
        monitoring_status = "✅ Active" if (image_processor and image_processor.is_monitoring) else "❌ Inactive"
        sd_monitor_status = "✅ Active" if (sd_card_monitor and sd_card_monitor.is_monitoring) else "❌ Inactive"
        sd_cards_count = len(sd_card_monitor.get_current_cards()) if sd_card_monitor else 0
        keyboard_status = "✅ Active (down)" if (keyboard_listener and keyboard_listener.is_listening) else "❌ Inactive"
        
        print(f"\n🔧 System Status:")
        print(f"   Image Processor:  {processor_status}")
        print(f"   File Monitoring:  {monitoring_status}")
        print(f"   SD Card Monitor:  {sd_monitor_status}")
        print(f"   SD Cards Found:   {sd_cards_count}")
        print(f"   Keyboard Trigger: {keyboard_status}")
        
        if image_processor is None:
            print("⚠️  WARNING: Image processor failed to initialize!")
            print("   Check the error messages above for details.")
        
        if sd_card_monitor is None:
            print("⚠️  WARNING: SD card monitor failed to initialize!")
            print("   SD card detection will not be available.")
        
        if keyboard_listener is None:
            print("⚠️  WARNING: Keyboard listener failed to initialize!")
            print("   Global keyboard triggers will not be available.")
        
        print(f"\n🚀 Ready for connections!")
        print("="*60)
        
    except Exception as e:
        print(f"❌ Error in startup sequence: {e}")
        import traceback
        traceback.print_exc()

# SD Card Socket.IO Event Handlers
@socketio.on('request_sd_card_scan')
def handle_sd_card_scan():
    """Handle request for SD card scan"""
    global sd_card_monitor
    if sd_card_monitor:
        cards = sd_card_monitor.force_scan()
        emit('sd_card_scan_result', {
            'status': 'success',
            'cards_found': len(cards),
            'cards': cards
        })
    else:
        emit('sd_card_scan_result', {
            'status': 'error',
            'message': 'SD card monitor not initialized'
        })

@socketio.on('request_sd_card_import')
def handle_sd_card_import(data):
    """Handle request to import from SD card"""
    global sd_card_monitor
    if not sd_card_monitor:
        emit('sd_card_import_result', {
            'status': 'error',
            'message': 'SD card monitor not initialized'
        })
        return
    
    card_id = data.get('card_id')
    import_new_only = data.get('import_new_only', True)
    
    if not card_id:
        emit('sd_card_import_result', {
            'status': 'error',
            'message': 'No card ID provided'
        })
        return
    
    # Start import in background thread
    def perform_import():
        result = sd_card_monitor.import_from_card(card_id, import_new_only)
        socketio.emit('sd_card_import_result', result)
    
    import_thread = threading.Thread(target=perform_import)
    import_thread.daemon = True
    import_thread.start()
    
    emit('sd_card_import_result', {
        'status': 'started',
        'message': 'Import started in background'
    })

@socketio.on('request_sd_card_status')
def handle_sd_card_status_request():
    """Handle request for SD card status"""
    global sd_card_monitor
    if sd_card_monitor:
        cards = sd_card_monitor.get_current_cards()
        emit('sd_card_status', {
            'monitoring_active': sd_card_monitor.is_monitoring,
            'current_cards': [card['label'] for card in cards],
            'total_cards': len(cards),
            'import_in_progress': sd_card_monitor.is_importing,
            'cards': cards
        })
    else:
        emit('sd_card_status', {
            'monitoring_active': False,
            'current_cards': [],
            'total_cards': 0,
            'import_in_progress': False,
            'error': 'SD card monitor not initialized'
        })

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
        if sd_card_monitor:
            sd_card_monitor.stop_monitoring()
        print("Server stopped.") 