# Experimental Theatre - Audio Assets
This directory contains all audio files for the digital performance program.

## 🎵 **PERFORMANCE AUDIO TRACKS**

### **Main Cue Sequence Tracks**
| Filename | Usage | Cue | Loop | Volume | Fade In | Fade Out |
|----------|-------|-----|------|--------|---------|----------|
| `Heartbeat.mp3` | Opening atmospheric & closing heartbeat | CUE-01, CUE-10 | Yes | 0.6 | 5.0s | 2.0s |
| `Sine Riser.mp3` | Atmospheric tension building | CUE-01, CUE-11 | No | 0.7 | 0.5s | 1.0s |
| `Traffic Light.mp3` | Interactive phase background | CUE-06 | Yes | 0.8 | 0.5s | 2.0s |
| `Sublimation Completed.mp3` | Story progression markers | CUE-03, CUE-14 | No | 0.8 | 0.3s | 1.5s |
| `Protocol Rebooting.mp3` | System state transition | CUE-04 | No | 0.8 | 0.5s | 1.5s |
| `Spirit Mining Initiating.mp3` | Manual trigger cue | CUE-05 | No | 0.8 | 0.5s | 1.5s |
| `Spirits Possessed.mp3` | Convergence phase start | CUE-08 | No | 0.8 | 0.5s | 1.5s |
| `Sublimation Initiated.mp3` | Transformation sequence | CUE-09 | No | 0.8 | 0.5s | 1.5s |
| `Long Season.mp3` | 🆕 **NEW** Extended finale sequence | CUE-15 | No | 0.7 | 10.0s | 5.0s |

### **🆕 NEW: Long Season Track Details**
- **Purpose**: Extended atmospheric finale after main performance sequence
- **Duration**: Plays for 30 seconds after 10-second fade in
- **Integration**: Triggered automatically after CUE-14 completes
- **Fade Characteristics**: 
  - **Fade In**: 10 seconds (extended for dramatic effect)
  - **Fade Out**: 5 seconds (smooth performance completion)
- **Volume**: 0.7 (slightly lower for atmospheric effect)
- **Performance Phase**: Creates new "long-season" phase before final completion

## 🎛️ **DYNAMIC PLAYBACK FEATURES**

### **Speed Morphing System**
- **Traffic Light**: Dynamic speed changes from 0.75x to 1.75x based on SD card interactions
- **All Other Tracks**: Standard 1.0x playback rate
- **Real-time Transitions**: Smooth speed changes during playback

### **Cross-System Integration**
- **Visual Triggers**: Audio cues trigger visual effects (black filter, convergence, departure)
- **Interactive Response**: SD card events modify audio playback in real-time
- **Performance State**: Audio system tracks and responds to overall performance phases

## 📁 **FILE ORGANIZATION**

### **Required Files** ✅
All files listed above must be present for full system functionality.

### **⚠️ MISSING FILES STATUS**
Run the system and check the browser console for any loading errors. Missing files will be logged as:
```
🎵 Failed to load track [filename]: HTTP 404: Not Found
```

### **File Format Requirements**
- **Format**: MP3 (recommended) or WAV
- **Sample Rate**: 44.1 kHz (standard)
- **Bit Rate**: 128 kbps minimum, 320 kbps recommended
- **Channels**: Mono or Stereo (Stereo recommended for spatial audio)

## 🔧 **TECHNICAL SPECIFICATIONS**

### **Web Audio API Compatibility**
- All tracks loaded via `fetch()` and `decodeAudioData()`
- Real-time volume control via GainNode
- Smooth fade transitions using AudioParam automation
- Loop functionality for ambient tracks

### **Performance Optimization**
- **Pre-loading**: All tracks loaded at system initialization
- **Buffer Management**: Audio buffers cached for instant playback
- **Memory Usage**: Efficient buffer sharing for repeated track playback

## 🎭 **CUE SYSTEM INTEGRATION**

### **Automatic Cue Sequence** (CUE 01-16)
The audio system automatically handles:
- Precise timing between cues
- Fade in/out transitions
- Loop management for ambient tracks
- Cross-system visual trigger coordination
- **🆕 Extended finale sequence through CUE-16**

### **Manual Triggers**
- **Spacebar**: Triggers CUE-05 (Spirit Mining Initiating)
- **Emergency Controls**: Escape key for immediate stop

### **Interactive Elements**
- **SD Card Integration**: Each SD card insertion increases Traffic Light speed
- **Visual Phase Coordination**: Audio responds to visual system state changes

## 📝 **TROUBLESHOOTING**

### **Common Issues**
1. **Audio Context Suspended**: Click anywhere on the page to activate Web Audio API
2. **File Not Found**: Check that all MP3 files are present in this directory
3. **No Sound**: Verify browser audio permissions and volume settings
4. **Stuttering/Glitches**: Check system CPU usage and close other audio applications

### **Debug Information**
Enable debug logging in the browser console to see detailed audio system status:
```javascript
// Check audio system status
soundManager.getStatus()

// Check loaded tracks
Array.from(soundManager.tracks.keys())
```

---

**Last Updated**: Current Session - Added Long Season.mp3 support for CUE-15/CUE-16
**Total Tracks**: 9 (previously 8)
**Total Cues**: 16 (extended from 14)
**🆕 New Feature**: Extended finale sequence with Long Season track 