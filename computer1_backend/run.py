#!/usr/bin/env python3
"""
Simple script to run the Experimental Theatre Digital Program Server
"""

from main_server import app, socketio
import sys
import os

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
    
    try:
        # Run the Flask-SocketIO server
        socketio.run(
            app, 
            debug=True, 
            host='0.0.0.0',  # Allow connections from other computers in the network
            port=5000,
            allow_unsafe_werkzeug=True  # For development
        )
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 