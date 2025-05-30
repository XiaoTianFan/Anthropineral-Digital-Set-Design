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
        
        # 🆕 NEW: Spacebar trigger for CUE-05
        self.last_spacebar_trigger = 0
        self.spacebar_cooldown = 1  # Shorter cooldown for manual cue triggers
        
    def start_listening(self):
        """Start listening for keyboard shortcuts in a background thread"""
        if self.is_listening:
            print(f"⚠️  Keyboard listener already running")
            return
            
        print(f"🎹 Starting keyboard listener for hotkey: {self.hotkey}")
        print(f"🔍 DEBUG: Platform: {keyboard._platform}")
        print(f"🔍 DEBUG: Running with admin/root privileges: {self._check_privileges()}")
        self.is_listening = True
        
        # Register hotkey handler
        try:
            print(f"🔍 DEBUG: Registering hotkey '{self.hotkey}' for animation trigger...")
            keyboard.add_hotkey(self.hotkey, self._trigger_animation)
            print(f"✅ Registered '{self.hotkey}' hotkey successfully")
            
            # 🆕 NEW: Add spacebar handler for CUE-05
            print(f"🔍 DEBUG: Registering 'space' hotkey for cue trigger...")
            keyboard.add_hotkey('space', self._trigger_spacebar_context_aware)
            print(f"✅ Registered 'space' hotkey successfully")
            
            # 🆕 ENHANCED DEBUG: Try alternative spacebar registrations
            try:
                print(f"🔍 DEBUG: Testing alternative spacebar registrations...")
                # Try different variations of space key
                keyboard.add_hotkey('spacebar', self._debug_spacebar_test)
                print(f"✅ Registered 'spacebar' as test")
            except Exception as e:
                print(f"⚠️ Could not register 'spacebar': {e}")
            
            # 🆕 ENHANCED DEBUG: Add general key logging
            print(f"🔍 DEBUG: Setting up general key event debugging...")
            keyboard.on_press(self._debug_key_press)
            print(f"✅ General key press debugging enabled")
            
            # 🆕 ENHANCED DEBUG: Test if keyboard events are being captured
            print(f"🔍 DEBUG: Testing keyboard event capture...")
            self._test_keyboard_capture()
            
            # List all registered hotkeys for debugging
            print(f"🔍 DEBUG: Current registered hotkeys: {list(keyboard._hotkeys.keys()) if hasattr(keyboard, '_hotkeys') else 'Unable to list'}")
            
            print(f"✅ Keyboard listener active - Press {self.hotkey} to trigger animation, Spacebar for context-aware cue triggers")
            print(f"💡 TIP: If spacebar doesn't work, try running with administrator privileges or use browser fallback")
        except Exception as e:
            print(f"❌ Error setting up keyboard listener: {e}")
            print(f"💡 TIP: On Linux/macOS, try running with sudo. On Windows, run as Administrator.")
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
        
        print(f"🔍 DEBUG: _trigger_animation() called for hotkey: {self.hotkey}")
        
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
            
            # Emit keyboard status update
            self.socketio.emit('keyboard_status', {
                'active': True,
                'hotkey': self.hotkey,
                'cooldown_seconds': self.cooldown_seconds
            })
            
            print("✅ Animation trigger event emitted to clients")
        except Exception as e:
            print(f"❌ Error emitting trigger event: {e}")
    
    # 🆕 NEW: Context-aware spacebar trigger
    def _trigger_spacebar_context_aware(self):
        """Context-aware spacebar handler: Start main sequence OR trigger CUE-05"""
        current_time = time.time()
        
        print(f"🔍 DEBUG: _trigger_spacebar_context_aware() called")
        
        # Cooldown check for spacebar
        if current_time - self.last_spacebar_trigger < self.spacebar_cooldown:
            print(f"⏳ Spacebar cooldown active ({self.spacebar_cooldown}s)")
            return
            
        self.last_spacebar_trigger = current_time
        
        print("🎭 Context-aware spacebar trigger activated!")
        
        # Emit directly to client like down arrow does - no server handler chain
        try:
            self.socketio.emit('cue-spacebar-context', {
                'source': 'keyboard',
                'hotkey': 'spacebar',
                'timestamp': current_time
            })
            print("✅ Spacebar context event emitted directly to client")
        except Exception as e:
            print(f"❌ Error emitting spacebar context event: {e}")
    
    # 🆕 ENHANCED DEBUG: Test method for alternative spacebar registration
    def _debug_spacebar_test(self):
        """Debug method to test if 'spacebar' key name works"""
        print(f"🔍 DEBUG: _debug_spacebar_test() called - 'spacebar' key detected!")
        
    # 🆕 ENHANCED DEBUG: General key press debugging
    def _debug_key_press(self, key):
        """Debug method to log all key presses"""
        try:
            key_name = key.name if hasattr(key, 'name') else str(key)
            # print(f"🔍 DEBUG: Key pressed: '{key_name}' (type: {type(key)})")
            
            # Special attention to space-related keys
            if 'space' in key_name.lower():
                print(f"🚨 SPACE KEY DETECTED: '{key_name}'")
        except Exception as e:
            print(f"🔍 DEBUG: Key press debug error: {e}")

    def _check_privileges(self):
        """Check if running with admin/root privileges"""
        import os
        import sys
        
        try:
            if sys.platform == "win32":
                import ctypes
                return ctypes.windll.shell32.IsUserAnAdmin() != 0
            else:  # Linux/macOS
                return os.geteuid() == 0
        except Exception as e:
            print(f"🔍 DEBUG: Could not check privileges: {e}")
            return False

    def _test_keyboard_capture(self):
        """Test if keyboard events are being captured"""
        try:
            print(f"🔍 DEBUG: Keyboard backend: {keyboard._backend}")
            print(f"🔍 DEBUG: Available keyboard devices: Checking...")
            
            # Try to get keyboard state
            if hasattr(keyboard, '_backend'):
                print(f"✅ Keyboard backend loaded successfully")
            else:
                print(f"⚠️ Keyboard backend not available")
                
        except Exception as e:
            print(f"🔍 DEBUG: Keyboard capture test error: {e}") 