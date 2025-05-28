from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'experimental_theatre_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
CROPPED_EYES_DIR = os.path.join(DATA_DIR, 'cropped_eyes')

@app.route('/')
def index():
    """Serve the main client page"""
    return render_template('index.html')

@app.route('/eyes/<filename>')
def serve_eye_image(filename):
    """Serve cropped eye images to the client"""
    return send_from_directory(CROPPED_EYES_DIR, filename)

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('server_message', {'data': 'Connected to server'})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')

@socketio.on('test_message')
def handle_test_message(data):
    """Handle test messages from client"""
    print(f'Received test message: {data}')
    emit('test_response', {'data': f'Server received: {data["message"]}'})

def emit_new_eye_image(image_filename):
    """Emit event when new eye image is available"""
    socketio.emit('new_eye_image_available', {'filename': image_filename})
    print(f'Emitted new eye image event: {image_filename}')

def emit_trigger_animation():
    """Emit event to trigger the final animation"""
    socketio.emit('trigger_final_animation', {})
    print('Emitted trigger animation event')

if __name__ == '__main__':
    print("Starting Experimental Theatre Server...")
    print(f"Base directory: {BASE_DIR}")
    print(f"Data directory: {DATA_DIR}")
    
    # Create data directories if they don't exist
    os.makedirs(CROPPED_EYES_DIR, exist_ok=True)
    
    # Run the server
    # Use host='0.0.0.0' to allow connections from other computers on the network
    socketio.run(app, host='0.0.0.0', port=5000, debug=True) 