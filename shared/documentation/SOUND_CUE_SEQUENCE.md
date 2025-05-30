# Experimental Theatre - Sound Cue Sequence
## Complete Audio-Visual Integration Timeline

---

## 🎭 **PERFORMANCE CUE SEQUENCE**

### **Phase 1: Opening - Atmospheric Build**

| Cue | Trigger | Action | Timing | Notes |
|-----|---------|--------|--------|-------|
| **CUE 01** | Play Start | • Start `heartbeat` (fade in 5s)<br>• Start `sine-riser` simultaneously | Begin | Atmospheric opening |
| **CUE 02** | Auto (14s after CUE 01) | • Stop `sine-riser` (fade out 0.5s)<br>• Stop `heartbeat` (fade out 0.5s) | +14s | Synchronized stop |
| **CUE 03** | Auto (5s after fade complete) | • Start `sublimation-completed` | +19.5s | After silence pause |
| **CUE 04** | Auto (3s after CUE 03 ends) | • Start `protocol-rebooting`<br>• **→ VISUAL TRIGGER:** Disengage black filter | +22.5s + track duration | Cross-system cue |

### **Phase 2: Interactive Engagement**

| Cue | Trigger | Action | Timing | Notes |
|-----|---------|--------|--------|-------|
| **CUE 05** | **Manual (Spacebar)** | • Start `spirit-mining-initiating` | Manual | Operator control |
| **CUE 06** | Auto (3s after CUE 05 ends) | • Start `traffic-light` (loop, 0.75x rate) | +3s after track ends | Baseline traffic light |

### **Phase 3: SD Card Interactive System**

| Event | Trigger | Action | Timing | Notes |
|-------|---------|--------|--------|-------|
| **SD Card Insert** | **← VISUAL TRIGGER:** SD card detected | • Wait 15s<br>• Increase `traffic-light` rate by +0.25x | +15s delay | Cumulative speed increase |

**Variable Tracking:**
- **SD_INSERT_COUNT** = 0 (initialize)
- Each SD insert: SD_INSERT_COUNT++
- Speed progression: 0.75x → 1.0x → 1.25x → 1.5x → 1.75x

| SD Count | Traffic Light Rate | Action |
|----------|-------------------|--------|
| 1 | 1.0x | Speed up |
| 2 | 1.25x | Speed up |
| 3 | 1.5x | Speed up |
| 4 | 1.75x | Speed up |
| 5 | 1.75x | **No speed change - proceed to Phase 4** |

| Cue | Trigger | Action | Timing | Notes |
|-----|---------|--------|--------|-------|
| **CUE 07** | Auto (SD_INSERT_COUNT == 5) | • Wait 10s<br>• Fade out `traffic-light` (5s fade) | +10s delay | End of interactive phase |

### **Phase 4: Convergence Sequence**

| Cue | Trigger | Action | Timing | Notes |
|-----|---------|--------|--------|-------|
| **CUE 08** | Auto (after traffic light fade) | • Start `spirits-possessed`<br>• **→ VISUAL TRIGGER:** Start convergence phase | Immediate | Cross-system cue |
| **CUE 09** | Auto (after CUE 08 ends) | • Start `sublimation-initiated` | Immediate | Chain sequence |
| **CUE 10** | Auto (after CUE 09 ends) | • Start `heartbeat` (fade in 5s, loop) | Immediate | Return of heartbeat |

### **Phase 5: Climax and Departure**

| Cue | Trigger | Action | Timing | Notes |
|-----|---------|--------|--------|-------|
| **CUE 11** | Auto (20s after CUE 10 start) | • Start `sine-riser` | +20s | Building tension |
| **CUE 12** | Auto (6s after CUE 11 start) | • **→ VISUAL TRIGGER:** Start departure phase | +6s | Cross-system cue |
| **CUE 13** | Auto (7s after CUE 12) | • Stop `heartbeat` (looping) | +7s | Heartbeat cessation |
| **CUE 14** | Auto (5s after CUE 13) | • Start `sublimation-completed` | +5s | Final resolution |

---

## 🔗 **CROSS-SYSTEM INTEGRATION**

### **Sound → Visual Triggers**
| Cue | Audio Event | Visual System Action | Timing |
|-----|-------------|---------------------|--------|
| CUE 04 | `protocol-rebooting` starts | Disengage black filter | Simultaneous |
| CUE 08 | `spirits-possessed` starts | Start convergence phase | Simultaneous |
| CUE 12 | 6s after `sine-riser` starts | Start departure phase | +6s delay |

### **Visual → Sound Triggers**
| Event | Visual System Event | Sound System Action | Timing |
|-------|-------------------|-------------------|--------|
| SD Insert | SD card detection | Wait 15s → Speed up traffic light | +15s delay |

---

## ⏱️ **TIMING ANALYSIS**

### **Approximate Timeline** (excluding variable track durations)
```
00:00  CUE 01  - Heartbeat + Sine Riser start
00:14  CUE 02  - Both stop (0.5s fade)
00:19  CUE 03  - Sublimation Completed
00:22+ CUE 04  - Protocol Rebooting + Visual trigger
????   CUE 05  - [MANUAL] Spirit Mining Initiating  
????+  CUE 06  - Traffic Light starts (0.75x)
????   [INTERACTIVE PHASE - Variable duration]
????   CUE 07  - Traffic Light fade out
????   CUE 08  - Spirits Possessed + Convergence trigger
????   CUE 09  - Sublimation Initiated
????   CUE 10  - Heartbeat restart (loop)
????+20 CUE 11 - Sine Riser
????+26 CUE 12 - Departure phase trigger
????+33 CUE 13 - Heartbeat stop
????+38 CUE 14 - Final Sublimation Completed
```

---

## 🎛️ **TECHNICAL SPECIFICATIONS**

### **Playback Rate Settings**
| Track | Default Rate | Modified Rate | Context |
|-------|-------------|---------------|---------|
| `traffic-light` | 1.0x | 0.75x → 1.75x | Interactive speed morphing |
| All others | 1.0x | 1.0x | Standard playback |

### **Fade Specifications**
| Track | Fade In | Fade Out | Loop | Context |
|-------|---------|----------|------|---------|
| `heartbeat` | 5s | - | Yes | Opening & closing |
| `sine-riser` | 0s | 0.5s | No | Atmospheric builds |
| `traffic-light` | 0s | 5s | Yes | Interactive phase |
| Others | Standard | Standard | No | Story elements |

### **Variable Tracking Required**
- **SD_INSERT_COUNT**: Integer (0-5)
- **TRAFFIC_LIGHT_RATE**: Float (0.75x-1.75x)
- **PHASE_STATE**: Enum (Opening, Interactive, Convergence, Departure, End)

---

## 🎯 **OPERATOR CONTROLS**

### **Manual Triggers**
| Key | Cue | Action | Phase |
|-----|-----|--------|-------|
| **Spacebar** | CUE 05 | Start `spirit-mining-initiating` | Interactive |

### **Emergency Controls**
| Key | Action | Description |
|-----|--------|-------------|
| **Escape** | Emergency stop | Stop all audio immediately |
| **M** | Master mute | Mute/unmute all audio |

---

## 📝 **IMPLEMENTATION NOTES**

1. **Precision Timing**: All auto-triggers must be frame-accurate
2. **Cross-System Communication**: Robust error handling for visual system communication
3. **Variable Persistence**: SD_INSERT_COUNT must persist through entire performance
4. **Graceful Degradation**: System should handle missing audio files or visual system disconnection
5. **Performance Logging**: Log all cue executions for post-performance analysis

---

## 🔄 **STATE TRANSITIONS**

```
[Play Start] → Opening → [Manual Spacebar] → Interactive → 
[5 SD Inserts] → Convergence → [Auto Sequence] → Departure → 
[Final Cue] → End
```

---

*This document serves as the master reference for implementing the complete audio-visual cue sequence. All timing values are approximate and may need adjustment based on actual audio track durations.* 