import keyboard
import time
import threading
from flask_socketio import SocketIO

class KeyboardTriggerListener:
    def __init__(self, socketio_instance, hotkey="down"):
        """
        Initialize keyboard listener for animation triggers
        
        Args:
            socketio_instance: Flask-SocketIO instance for emitting events
            hotkey: Keyboard combination to trigger animation (default: down)
        """
        self.socketio = socketio_instance
        self.hotkey = hotkey
        self.is_listening = False
        self.last_trigger_time = 0
        self.cooldown_seconds = 2  # Prevent accidental double-triggers
        
    def start_listening(self):
        """Start listening for keyboard shortcuts in a background thread"""
        if self.is_listening:
            print(f"⚠️  Keyboard listener already running")
            return
            
        print(f"🎹 Starting keyboard listener for hotkey: {self.hotkey}")
        self.is_listening = True
        
        # Register hotkey handler
        try:
            keyboard.add_hotkey(self.hotkey, self._trigger_animation)
            print(f"✅ Keyboard listener active - Press {self.hotkey} to trigger animation")
        except Exception as e:
            print(f"❌ Error setting up keyboard listener: {e}")
            self.is_listening = False
            
    def stop_listening(self):
        """Stop listening for keyboard shortcuts"""
        if not self.is_listening:
            return
            
        print("🛑 Stopping keyboard listener...")
        try:
            keyboard.unhook_all_hotkeys()
            self.is_listening = False
            print("✅ Keyboard listener stopped")
        except Exception as e:
            print(f"❌ Error stopping keyboard listener: {e}")
            
    def _trigger_animation(self):
        """Internal method to handle animation trigger with safety checks"""
        current_time = time.time()
        
        # Cooldown check to prevent rapid-fire triggers
        if current_time - self.last_trigger_time < self.cooldown_seconds:
            print(f"⏳ Trigger cooldown active ({self.cooldown_seconds}s)")
            return
            
        self.last_trigger_time = current_time
        
        print(f"🎭 Keyboard trigger activated! ({self.hotkey})")
        
        # Emit the trigger event to all connected clients
        try:
            self.socketio.emit('trigger_final_animation', {
                'source': 'keyboard',
                'hotkey': self.hotkey,
                'timestamp': current_time
            })
            print("✅ Animation trigger event emitted to clients")
        except Exception as e:
            print(f"❌ Error emitting trigger event: {e}") 