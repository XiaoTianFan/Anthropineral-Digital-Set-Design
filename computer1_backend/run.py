#!/usr/bin/env python3
"""
Simple script to run the Experimental Theatre Digital Program Server
"""

from main_server import app, socketio, startup_sequence, BASE_DIR, DATA_DIR, CROPPED_EYES_DIR, ORIGINALS_DIR
import sys
import os
import threading

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
        # Import here to avoid circular imports
        from main_server import image_processor
        if image_processor:
            image_processor.stop_monitoring()
        print("Server stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 