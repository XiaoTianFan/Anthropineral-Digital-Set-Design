# Experimental Theatre - Cue System Testing Guide
## Comprehensive Testing Procedures for Phase 4

---

## 🔧 **PRE-TESTING SETUP**

### **1. Environment Preparation**
```bash
# 1. Start the backend server
cd Program/computer1_backend
python run.py

# 2. Verify server startup messages
# Expected output:
# ✅ Server running on: http://localhost:5000
# 🎹 Enhanced keyboard listener initialized (down + spacebar)
# 🎭 Cue system initialized
```

### **2. Audio Files Verification**
Ensure these audio files exist in `Program/computer1_backend/static/audio/`:
- ✅ `Heartbeat.mp3`
- ✅ `Sine Riser.mp3` 
- ✅ `Sublimation Completed.mp3`
- ✅ `Protocol Rebooting.mp3`
- ✅ `Spirit Mining Initiating.mp3`
- ✅ `Traffic Light.mp3`
- ✅ `Spirits Possessed.mp3`
- ✅ `Sublimation Initiated.mp3`

### **3. Browser Setup**
1. Open browser to `http://localhost:5000`
2. **IMPORTANT**: Click somewhere on the page to enable audio (browser autoplay policy)
3. Open browser Developer Console (F12) to monitor debug messages
4. Verify you see: `🎵 Sound system initialized successfully`

---

## 🧪 **TESTING PROCEDURES**

### **TEST 1: System Initialization** ⏱️ 2 minutes

#### **Steps:**
1. Refresh the browser page
2. Click anywhere on the page to activate audio context

#### **Expected Console Messages:**
```
🎵 Sound system initialized successfully
🎵 Loaded 8 audio tracks
🎭 Cue system initialized
✅ Connected to server
```

#### **Expected UI Elements:**
- Audio debug panel showing "Audio Context: running"
- All tracks showing "Ready" status
- No error messages in console

#### **✅ Pass Criteria:**
- All audio tracks loaded successfully
- No error messages
- Audio context state is "running"

---

### **TEST 2: Context-Aware Spacebar Trigger** ⏱️ 5 minutes

#### **Steps:**
1. **Part A: Start Main Sequence**
   - Press **Spacebar** (when no performance is active)
   - Observe complete opening sequence starts

2. **Part B: Manual CUE-05 Trigger** 
   - Wait for opening sequence to complete
   - Press **Spacebar** again during interactive phase
   - Observe CUE-05 triggers and traffic light starts

#### **Expected Behavior - Part A (Main Sequence):**
1. **Immediate**: Console shows `🎭 Context-aware spacebar trigger received`
2. **Decision**: `🎭 Starting main performance sequence (Spacebar)`
3. **Sequence**: Complete CUE 01-04 opening sequence begins
4. **Timeline**: Same as TEST 4 (Heartbeat + Sine Riser → stops → sublimation → protocol)

#### **Expected Behavior - Part B (CUE-05 Manual):**
1. **Context Check**: System detects `interactive` phase
2. **Audio**: "Spirit Mining Initiating" plays (~3 seconds)
3. **Auto-follow**: Traffic light starts at 0.75x speed

#### **Expected Console Sequence:**
```
# Part A - Starting main sequence
🎭 Context-aware spacebar trigger activated!
🎭 Context-aware spacebar trigger received
🎭 Starting main performance sequence (Spacebar)
🎭 Executing CUE 01: Opening sequence
🎵 Executing cue: cue-01-heartbeat
🎵 Executing cue: cue-01-riser
⏰ Scheduled cue cue-02-trigger in 14s
🎭 Executing CUE 02: Stop opening tracks
🎭 Executing CUE 03: Sublimation completed
🎭 Executing CUE 04: Protocol rebooting + visual trigger
🌐 Cross-system event: black-filter-disengage
🎨 Visual cue action: black-filter-disengage

# Part B - Manual trigger during interactive phase
🎭 Context-aware spacebar trigger activated!
🎭 Triggering CUE-05 during interactive phase (Spacebar)
🎭 Executing CUE 05: Spirit mining initiating (MANUAL)
🎭 Executing CUE 06: Traffic light start
🚦 Starting traffic light at 0.75x speed
```

#### **✅ Pass Criteria:**
- **Single Key Control**: Spacebar starts main sequence when idle
- **Context Awareness**: Spacebar triggers CUE-05 during opening or interactive phase  
- **Phase Detection**: System correctly identifies performance state
- **Smooth Transition**: No interruption of ongoing sequences

---

### **TEST 3: SD Card Speed Morphing** ⏱️ 10 minutes

**SETUP**: Complete TEST 2 first (traffic light must be playing)

#### **Steps:**
1. Insert SD card into computer 5 times (or simulate via debug panel)
2. Wait 15 seconds between each insertion
3. Listen for traffic light speed changes

#### **Expected Behavior per Insertion:**
| Insertion | Wait Time | Expected Speed | Console Message |
|-----------|-----------|----------------|-----------------|
| 1 | 15s | 1.0x (normal) | `🚦 Traffic light speed increased to 1.0x` |
| 2 | 15s | 1.25x | `🚦 Traffic light speed increased to 1.25x` |
| 3 | 15s | 1.5x | `🚦 Traffic light speed increased to 1.5x` |
| 4 | 15s | 1.75x (max) | `🚦 Traffic light speed increased to 1.75x` |
| 5 | 15s | 1.75x (no change) | `🚦 Traffic light already at maximum speed` + CUE-07 trigger |

#### **Expected Console for Insert #5:**
```
🎭 SD card cue: Insert #5
💾 SD Card Insert #5 - Traffic light speed increase
🚦 Traffic light already at maximum speed
🚦 Traffic light max speed reached - triggering CUE-07
🎭 Executing CUE 07: Traffic light fade out
```

#### **✅ Pass Criteria:**
- Traffic light progressively speeds up (audibly noticeable)
- After 5th insertion, traffic light fades out over 5 seconds
- Convergence sequence begins automatically

---

### **TEST 4: Complete Opening Sequence (CUE 01-04)** ⏱️ 30 seconds

#### **Steps:**
1. Open browser console
2. Type: `window.theatreClient.soundManager.startPerformanceSequence()`
3. Press Enter
4. Observe the complete opening sequence

#### **Expected Timeline:**
```
00:00 - CUE 01: Heartbeat (fade in 5s) + Sine Riser start simultaneously
00:14 - CUE 02: Both tracks stop (0.5s fade)
00:19 - CUE 03: "Sublimation Completed" plays
00:22 - CUE 04: "Protocol Rebooting" + BLACK FILTER DISENGAGES
```

#### **Expected Console Messages:**
```
🎭 Starting performance sequence
🎭 Executing CUE 01: Opening sequence
🎵 Executing cue: cue-01-heartbeat
🎵 Executing cue: cue-01-riser
⏰ Scheduled cue cue-02-trigger in 14s
🎭 Executing CUE 02: Stop opening tracks
🎭 Executing CUE 03: Sublimation completed
🎭 Executing CUE 04: Protocol rebooting + visual trigger
🌐 Cross-system event: black-filter-disengage
🎨 Visual cue action: black-filter-disengage
```

#### **Expected Visual:**
- Black filter should fade out when CUE 04 triggers

#### **✅ Pass Criteria:**
- Timing is accurate (14s, then 5.5s, then 3s delays)
- Black filter visual effect activates
- Audio tracks play and stop as expected

---

### **TEST 5: Convergence Sequence (CUE 07-10)** ⏱️ 2 minutes

**PREREQUISITE**: Complete TEST 3 (traffic light at max speed)

#### **Steps:**
1. Wait for traffic light to fade out (5 seconds)
2. Observe convergence visual effect starts
3. Listen for complete audio sequence

#### **Expected Timeline:**
```
00:00 - CUE 07: Traffic light fades out (5s)
00:05 - CUE 08: "Spirits Possessed" + convergence visual starts
00:08 - CUE 09: "Sublimation Initiated" 
00:11 - CUE 10: Heartbeat returns (fade in 5s, loops)
```

#### **Expected Console Sequence:**
```
🎭 Executing CUE 07: Traffic light fade out
🚦 Fading out traffic light over 5s
🎭 Executing CUE 08: Spirits possessed + convergence trigger
🌐 Cross-system event: convergence-start
🎨 Visual cue action: convergence-start
🎭 Executing CUE 09: Sublimation initiated
🎭 Executing CUE 10: Heartbeat return
⏰ Scheduled cue cue-11-trigger in 20s
```

#### **Expected Visual:**
- Convergence phase visual effect starts with CUE 08

#### **✅ Pass Criteria:**
- Traffic light fades out smoothly
- Visual convergence effect triggers
- Heartbeat returns and loops continuously
- CUE 11 scheduled for 20 seconds later

---

### **TEST 6: Final Sequence (CUE 11-16)** ⏱️ 2 minutes 🆕 **EXTENDED**

**PREREQUISITE**: Complete TEST 5 (heartbeat playing)

#### **Steps:**
1. Wait 20 seconds after CUE 10
2. Listen for sine riser
3. Observe departure visual effect
4. Listen for sequence completion
5. 🆕 **NEW**: Wait for Long Season fade in
6. 🆕 **NEW**: Wait for Long Season completion and final fade out

#### **Expected Timeline:**
```
00:00 - CUE 11: Final sine riser starts
00:06 - CUE 12: Departure visual effect triggers
00:13 - CUE 13: Heartbeat stops immediately
00:18 - CUE 14: Final "Sublimation Completed"
00:22 - 🆕 CUE 15: "Long Season" fade in (10s fade)
00:32 - Long Season playing at full volume
01:02 - 🆕 CUE 16: "Long Season" fade out (5s fade)
01:07 - SEQUENCE COMPLETE 🎉
```

#### **Expected Console Sequence:**
```
🎭 Executing CUE 11: Final sine riser
⏰ Scheduled cue cue-12-trigger in 6s
🎭 Executing CUE 12: Departure phase trigger
🌐 Cross-system event: departure-start
🎨 Visual cue action: departure-start
⏰ Scheduled cue cue-13-trigger in 7s
🎭 Executing CUE 13: Heartbeat stop
⏰ Scheduled cue cue-14-trigger in 5s
🎭 Executing CUE 14: Final sublimation completed
🎭 CUE 14 completed - chaining to CUE-15
🎭 Executing CUE 15: Long Season fade in
🎭 Performance entered Long Season phase
⏰ Scheduled cue cue-16-trigger in 30s
🎭 Executing CUE 16: Long Season fade out and performance end
🎭 Performance sequence completed with Long Season
🌐 Cross-system event: performance-complete
```

#### **Expected Visual:**
- Departure phase visual effect starts with CUE 12
- Performance state shows "long-season" phase during CUE 15-16

#### **✅ Pass Criteria:**
- Precise timing (6s, 7s, 5s intervals for CUE 11-14)
- Heartbeat stops cleanly
- Visual departure effect triggers
- 🆕 **Long Season Track**: 
  - 10-second fade in works smoothly
  - Track plays for 30 seconds at 0.7 volume
  - 5-second fade out completes sequence
  - Performance state transitions to "complete"
  - Final cross-system event emitted
- **Total sequence duration**: ~67 seconds from CUE 11 start to complete

---

### **🆕 NEW: TEST 6A: Long Season Isolation Test** ⏱️ 1 minute

**PURPOSE**: Test only the new CUE-15 and CUE-16 functionality

#### **Steps:**
1. Use browser console: `window.theatreClient.soundManager.executeCue15()`
2. Observe 10-second fade in
3. Wait 30 seconds for automatic CUE-16 trigger
4. Observe 5-second fade out

#### **Expected Behavior:**
```
🎭 Executing CUE 15: Long Season fade in
🎭 Performance entered Long Season phase
⏰ Scheduled cue cue-16-trigger in 30s
[... 30 seconds later ...]
🎭 Executing CUE 16: Long Season fade out and performance end
🎭 Performance sequence completed with Long Season
```

#### **✅ Pass Criteria:**
- Fade in is smooth and takes exactly 10 seconds
- Track plays at correct volume (0.7)
- Automatic trigger after 30 seconds works
- Fade out is smooth and takes 5 seconds
- Performance state changes to "complete"

---

## 🛠️ **ERROR TESTING**

### **TEST 7: Emergency Stop** ⏱️ 30 seconds

#### **Steps:**
1. Start any cue sequence
2. Press **Escape** key
3. Verify immediate stop

#### **Expected Behavior:**
- All audio stops immediately (0.5s fade)
- All scheduled cues cancelled
- Console shows: `🛑 Emergency stop - all cues cancelled`

### **TEST 8: Missing Audio File** ⏱️ 1 minute

#### **Steps:**
1. Temporarily rename one audio file
2. Refresh page
3. Try to trigger affected cue

#### **Expected Behavior:**
- Graceful degradation
- Error message in console
- Other cues continue to work

### **TEST 9: SocketIO Disconnection** ⏱️ 2 minutes

#### **Steps:**
1. Stop the backend server while browser is open
2. Try manual triggers
3. Restart server

#### **Expected Behavior:**
- Frontend shows disconnection status
- Automatic reconnection when server restarts
- Cue system reinitializes

---

## 📊 **PERFORMANCE MONITORING**

### **Debug Panel Checks:**
1. **Audio Context Status**: Should show "running"
2. **Tracks Loaded**: Should show "9/9"
3. **Master Volume**: Should be adjustable
4. **Cue History**: Should log all executed cues
5. **Cue Sequence Display**: Should show all 16 cues (CUE-01 through CUE-16)
6. **Performance Phase**: Should show "long-season" during CUE-15/16

### **Console Monitoring:**
- Look for any error messages (❌)
- Verify timing accuracy (⏰)
- Check cross-system events (🌐)
- Monitor audio execution (🎵)

---

## ❌ **COMMON ISSUES & TROUBLESHOOTING**

### **🚨 COMMON FIRST-TIME ISSUES:**

1. **"Audio context suspended"** → Click anywhere on page first
2. **No spacebar response** → Check cooldown (1 second between presses)
3. **Timing seems off** → Browser performance or network delays
4. **Missing visual effects** → SocketIO connection issues

### **📊 QUICK TEST COMMANDS:**

For manual testing, you can use these browser console commands:

```javascript
// Context-aware spacebar: Start main sequence OR trigger CUE-05
// (Just press Spacebar - system decides based on context!)

// Manual commands for testing:
// Start full performance sequence
window.theatreClient.soundManager.startPerformanceSequence()

// Trigger specific cues manually
window.theatreClient.soundManager.executeCue05()

// Emergency stop
window.theatreClient.soundManager.emergencyStop()

// Check system status and performance state
window.theatreClient.soundManager.getStatus()
window.theatreClient.soundManager.performanceState
```

### **🎹 IMPROVED KEYBOARD CONTROLS:**

- **Spacebar**: 
  - **When idle**: Starts complete performance sequence (CUE 01-04)
  - **During interactive phase**: Triggers manual CUE-05
  - **Other phases**: Ignored (shows warning)
- **Down Arrow**: Triggers visual animation (original functionality)
- **Escape**: Emergency stop all audio and cues

---

## 🎯 **SUCCESS CRITERIA SUMMARY**

### **✅ PASSING TESTS:**
1. All audio tracks load successfully (9 tracks total) 🆕 **Updated**
2. Spacebar triggers CUE-05 immediately
3. Traffic light progressive speed increase (5 steps)
4. Complete opening sequence with correct timing
5. Convergence sequence with visual triggers
6. Final sequence completion through CUE-16 🆕 **Extended**
7. 🆕 **Long Season Extended Finale**: CUE-15 and CUE-16 work correctly
8. Emergency stop works immediately
9. Graceful error handling
10. SocketIO reconnection works

### **📈 PERFORMANCE EXPECTATIONS:**
- Audio latency < 100ms
- Visual trigger delay < 50ms
- Timing accuracy ±100ms
- Zero audio dropouts
- Smooth speed morphing
- 🆕 **Extended Sequence**: Total performance duration ~8-10 minutes (including Long Season)
- 🆕 **Long Season Fades**: 10s fade in and 5s fade out must be smooth

---

**Total Testing Time: ~25 minutes for full sequence** 🆕 **(Updated from 20 minutes)**
**🆕 New Requirements**: Ensure "Long Season.mp3" file is present in `/static/audio/` directory
**Recommended**: Test each section individually first, then run complete end-to-end test 