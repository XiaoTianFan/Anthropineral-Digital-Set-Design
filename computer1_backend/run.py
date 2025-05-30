#!/usr/bin/env python3
"""
Simple script to run the Experimental Theatre Digital Program Server
"""

from main_server import app, socketio, startup_sequence, BASE_DIR, DATA_DIR, CROPPED_EYES_DIR, ORIGINALS_DIR
import sys
import os
import threading
import shutil
import signal
import atexit

def cleanup_on_shutdown():
    """Clean up data directories and import history on shutdown"""
    print("\nPerforming cleanup...")
    
    try:
        # Clear cropped eyes directory
        if os.path.exists(CROPPED_EYES_DIR):
            shutil.rmtree(CROPPED_EYES_DIR)
            os.makedirs(CROPPED_EYES_DIR, exist_ok=True)
            print(f"✓ Cleared cropped eyes directory: {CROPPED_EYES_DIR}")
        
        # Clear originals directory
        if os.path.exists(ORIGINALS_DIR):
            shutil.rmtree(ORIGINALS_DIR)
            os.makedirs(ORIGINALS_DIR, exist_ok=True)
            print(f"✓ Cleared originals directory: {ORIGINALS_DIR}")
        
        # Clear import history file
        import_history_file = os.path.join(DATA_DIR, 'import_history.json')
        if os.path.exists(import_history_file):
            os.remove(import_history_file)
            print(f"✓ Cleared import history: {import_history_file}")
        
        print("✓ Cleanup completed successfully")
        
    except Exception as e:
        print(f"✗ Error during cleanup: {e}")

def signal_handler(signum, frame):
    """Handle shutdown signals"""
    print(f"\nReceived signal {signum}, shutting down...")
    cleanup_on_shutdown()
    
    # Stop image processor if it exists
    from main_server import image_processor
    if image_processor:
        image_processor.stop_monitoring()
    
    print("Server stopped by signal")
    sys.exit(0)

def main():
    print("=" * 60)
    print("  Experimental Theatre Digital Program")
    print("=" * 60)
    print("")
    print("Starting server...")
    print("Server will be accessible at:")
    print("  Local:   http://localhost:5000")
    print("  Network: http://[YOUR_LOCAL_IP]:5000")
    print("")
    print("To stop the server, press Ctrl+C")
    print("")
    
    # Register cleanup handlers
    signal.signal(signal.SIGINT, signal_handler)  # Ctrl+C
    signal.signal(signal.SIGTERM, signal_handler)  # Termination signal
    atexit.register(cleanup_on_shutdown)  # Normal exit
    
    # Create data directories if they don't exist (same as main_server.py)
    os.makedirs(CROPPED_EYES_DIR, exist_ok=True)
    os.makedirs(ORIGINALS_DIR, exist_ok=True)
    
    # Start startup sequence in background thread (same as main_server.py)
    startup_thread = threading.Thread(target=startup_sequence)
    startup_thread.daemon = True
    startup_thread.start()
    
    try:
        # Run the Flask-SocketIO server
        socketio.run(
            app, 
            debug=True, 
            host='0.0.0.0',  # Allow connections from other computers in the network
            port=5000,
            use_reloader=False,  # Important: disable reloader to avoid threading issues
            allow_unsafe_werkzeug=True  # For development
        )
    except KeyboardInterrupt:
        print("\nShutting down server...")
        cleanup_on_shutdown()
        # Import here to avoid circular imports
        from main_server import image_processor
        if image_processor:
            image_processor.stop_monitoring()
        print("Server stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        cleanup_on_shutdown()
        sys.exit(1)

if __name__ == "__main__":
    main() 