# Theatre Sound System Architecture Design Plan

## 1. Current Project Architecture Analysis

### 1.1 Project Structure Overview
The project is a sophisticated experimental theatre program with the following architecture:

```
Program/
├── computer1_backend/           # Backend server with image processing
│   ├── static/js/client.js     # Main client-side application (5,319 lines)
│   ├── static/css/             # Styling
│   └── templates/              # HTML templates
└── shared/documentation/       # Documentation and plans
```

### 1.2 Current System Components

#### **Core Classes & Systems:**
1. **TheatreClient** - Main orchestrator class managing the entire visual experience
2. **ParticleSystem** - 2000+ particle animation system with 6 sophisticated physics mechanisms
3. **ShapeManager** - Manages eye-textured 3D shapes with emergence and morphing
4. **ArtisticTextureProcessor** - Real-time image processing with 12+ parameters
5. **EyeShape/MorphingEyeShape** - Individual eye shape objects with convergence animations

#### **Configuration System:**
- **VISUAL_CONFIG** - Centralized configuration object with 40+ parameters
- Hierarchical structure: `particles`, `attraction`, `shapes`, `bloom`, etc.
- Real-time parameter adjustment via debug panels
- Professional theatre-ready settings

#### **Visual Phases:**
1. **Phase 1**: Particle foundation with center attraction
2. **Phase 2**: Eye shapes emergence and orbital motion
3. **Phase 3**: Convergence animation with speed acceleration
4. **Phase 4**: Dispersion burst → Shell formation
5. **Phase 5**: Portal departure with auto-trigger system

#### **Event System:**
- **Socket.IO** real-time communication with backend
- **Global keyboard triggers** (Down Arrow) via server-side Python `keyboard` library
- **Auto-trigger system** with 2-minute countdown for Phase 5
- **Event listeners** for UI controls and visual effect toggles

#### **Integration Points:**
- `initSocketIO()` - Socket event handlers
- `setupEventListeners()` - Keyboard/UI event handling
- `updateVisualEffects(deltaTime)` - Main animation loop
- `checkVisualPhaseTransition()` - Phase management
- Configuration toggles with real-time status updates

## 2. Sound System Design Requirements

### 2.1 Functional Requirements
1. **Audio Playback Control**
   - Play, pause, stop functionality
   - Fade in/out with configurable duration
   - Looping control (on/off)
   - Volume/gain control per track

2. **Cue System Interface**
   - Easy-to-program variable interface
   - Per-clip parameter configuration
   - Multiple trigger types:
     - **Auto-following**: Play after previous clip ends (with optional delay)
     - **Auto-continuing**: Play after previous clip starts (with optional delay)
     - **Manual cue**: Keyboard trigger (Right Arrow key)
     - **Theatre program cues**: Integration with visual phase transitions

3. **Technical Features**
   - Separate JavaScript file for maintainability
   - Compatible with existing configuration system
   - Non-blocking audio loading
   - Cross-browser audio support
   - Professional theatre reliability

### 2.2 Integration Requirements
1. **Architecture Compatibility**
   - Follow existing class-based structure
   - Use VISUAL_CONFIG pattern for sound configuration
   - Integrate with existing Socket.IO communication
   - Respect existing keyboard event handling

2. **Performance Requirements**
   - No impact on 60fps visual rendering
   - Efficient memory management
   - Graceful error handling
   - Production-ready for live theatre

## 3. Proposed Sound System Architecture

### 3.1 File Structure
```
computer1_backend/static/js/
├── client.js           # Main theatre client (existing)
├── soundSystem.js      # NEW: Sound system implementation
└── soundConfig.js      # NEW: Sound configuration (optional separate file)
```

### 3.2 Core Classes Design

#### **SoundManager** (Main orchestrator)
```javascript
class SoundManager {
    constructor() {
        this.audioContext = null;      // Web Audio API context
        this.tracks = new Map();       // Audio track instances
        this.cueQueue = [];           // Programmed cue sequence
        this.currentCueIndex = 0;     // Current position in cue sequence
        this.isInitialized = false;   // Initialization state
        this.masterVolume = 1.0;      // Global volume control
    }

    // Core Methods
    init()                          // Initialize Web Audio API
    loadTrack(id, url, config)      // Load audio file with configuration
    createCueSequence(cues)         // Program cue sequence
    triggerCue(cueId)              // Manual cue trigger
    advanceToNextCue()             // Auto-advance cue system
    dispose()                      // Cleanup resources
}
```

#### **AudioTrack** (Individual audio file handler)
```javascript
class AudioTrack {
    constructor(id, audioBuffer, config) {
        this.id = id;                 // Unique identifier
        this.audioBuffer = audioBuffer; // Web Audio buffer
        this.config = config;         // Track configuration
        this.source = null;           // Current audio source
        this.gainNode = null;         // Volume control node
        this.isPlaying = false;       // Playback state
    }

    // Playback Control
    play(fadeInDuration = 0)        // Start playback with optional fade
    stop(fadeOutDuration = 0)       // Stop playback with optional fade
    setVolume(volume, fadeDuration) // Volume control with fade
    setLoop(enabled)                // Toggle looping
}
```

#### **SoundCue** (Cue configuration object)
```javascript
class SoundCue {
    constructor(config) {
        this.id = config.id;          // Unique cue identifier
        this.trackId = config.trackId; // Audio track to play
        this.triggerType = config.triggerType; // 'auto-follow', 'auto-continue', 'manual', 'visual-cue'
        this.delay = config.delay || 0; // Delay before playback (seconds)
        this.fadeIn = config.fadeIn || 0; // Fade in duration
        this.fadeOut = config.fadeOut || 0; // Fade out duration
        this.volume = config.volume || 1.0; // Playback volume
        this.loop = config.loop || false; // Looping enabled
        this.visualTrigger = config.visualTrigger; // Visual phase trigger
    }
}
```

### 3.3 Configuration System

#### **SOUND_CONFIG** (Following VISUAL_CONFIG pattern)
```javascript
const SOUND_CONFIG = {
    // Master audio settings
    master: {
        enabled: true,              // Global enable/disable
        volume: 1.0,               // Master volume (0.0-1.0)
        fadeTime: 2.0,             // Default fade duration
        bufferSize: 4096,          // Audio buffer size
        sampleRate: 44100          // Audio sample rate
    },

    // Audio track definitions
    tracks: {
        'ambient-intro': {
            url: '/static/audio/ambient-intro.mp3',
            volume: 0.8,
            loop: true,
            fadeIn: 3.0,
            fadeOut: 2.0
        },
        'emergence-sound': {
            url: '/static/audio/emergence.wav',
            volume: 0.6,
            loop: false,
            fadeIn: 1.0,
            fadeOut: 1.5
        },
        'convergence-build': {
            url: '/static/audio/convergence-build.mp3',
            volume: 0.9,
            loop: false,
            fadeIn: 0.5,
            fadeOut: 3.0
        },
        'portal-departure': {
            url: '/static/audio/portal-departure.wav',
            volume: 1.0,
            loop: false,
            fadeIn: 0.0,
            fadeOut: 0.0
        }
    },

    // Cue sequence programming
    cueSequence: [
        {
            id: 'cue-1-ambient',
            trackId: 'ambient-intro',
            triggerType: 'manual',    // Right arrow key
            delay: 0,
            fadeIn: 3.0,
            volume: 0.8,
            loop: true
        },
        {
            id: 'cue-2-emergence',
            trackId: 'emergence-sound',
            triggerType: 'visual-cue',
            visualTrigger: 'phase2-transition', // Triggered by first eye shape emergence
            delay: 1.0,               // 1 second after visual trigger
            fadeIn: 1.0,
            volume: 0.6,
            loop: false
        },
        {
            id: 'cue-3-convergence',
            trackId: 'convergence-build',
            triggerType: 'visual-cue',
            visualTrigger: 'convergence-start', // Triggered by Down Arrow convergence
            delay: 0.5,
            fadeIn: 0.5,
            volume: 0.9,
            loop: false
        },
        {
            id: 'cue-4-portal',
            trackId: 'portal-departure',
            triggerType: 'visual-cue',
            visualTrigger: 'portal-departure-start',
            delay: 0,
            fadeIn: 0,
            volume: 1.0,
            loop: false
        }
    ],

    // Keyboard controls
    controls: {
        manualCueKey: 'ArrowRight',  // Right arrow for manual cues
        emergencyStop: 'Escape',     // Emergency stop all audio
        masterMute: 'KeyM',          // Mute/unmute toggle
        volumeUp: 'Equal',           // Increase master volume
        volumeDown: 'Minus'          // Decrease master volume
    },

    // Debug and development
    debug: {
        enabled: true,               // Enable debug logging
        showCueStatus: true,         // Show cue status in UI
        audioAnalyzer: false,        // Enable audio analysis (development)
        testMode: false              // Test mode for development
    }
};
```

### 3.4 Integration with Existing System

#### **TheatreClient Integration**
```javascript
class TheatreClient {
    constructor() {
        // ... existing code ...
        
        // 🎵 NEW: Sound system integration
        this.soundManager = null;
        
        this.init();
    }

    init() {
        // ... existing initialization ...
        
        // 🎵 NEW: Initialize sound system
        this.initSoundSystem();
    }

    initSoundSystem() {
        if (SOUND_CONFIG.master.enabled) {
            this.soundManager = new SoundManager();
            this.soundManager.init();
            this.setupSoundEventHandlers();
            this.addDebugMessage('🎵 Sound system initialized');
        }
    }

    setupSoundEventHandlers() {
        // Integration with existing visual triggers
        this.soundManager.onVisualTrigger('phase2-transition', () => {
            // Triggered when first eye shape emerges
        });

        this.soundManager.onVisualTrigger('convergence-start', () => {
            // Triggered when Down Arrow convergence begins
        });

        this.soundManager.onVisualTrigger('portal-departure-start', () => {
            // Triggered when portal departure begins
        });
    }
}
```

#### **Event System Integration**
```javascript
setupEventListeners() {
    // ... existing event listeners ...

    // 🎵 NEW: Sound system keyboard controls
    document.addEventListener('keydown', (event) => {
        if (this.soundManager && event.code === SOUND_CONFIG.controls.manualCueKey) {
            this.soundManager.triggerNextManualCue();
            this.addDebugMessage('🎵 Manual sound cue triggered');
            event.preventDefault();
        }
        
        if (this.soundManager && event.code === SOUND_CONFIG.controls.emergencyStop) {
            this.soundManager.stopAllAudio();
            this.addDebugMessage('🎵 Emergency stop - all audio stopped');
            event.preventDefault();
        }
    });
}
```

## 4. Implementation Strategy

### 4.1 Development Phases

#### **Phase 1: Core Audio Engine**
1. Create `soundSystem.js` with basic Web Audio API implementation
2. Implement `SoundManager` and `AudioTrack` classes
3. Basic audio loading and playback functionality
4. Fade in/out and volume control
5. Integration with existing `TheatreClient`

#### **Phase 2: Cue System**
1. Implement `SoundCue` class and cue sequence programming
2. Manual trigger system (Right Arrow key)
3. Auto-following and auto-continuing cue types
4. Basic visual trigger integration
5. Configuration system with `SOUND_CONFIG`

#### **Phase 3: Visual Integration**
1. Deep integration with visual phase transitions
2. Real-time trigger system for emergence, convergence, portal departure
3. Synchronization with existing auto-trigger countdown
4. Professional theatre timing and reliability

#### **Phase 4: Polish & Production**
1. Error handling and graceful degradation
2. Debug UI and status indicators
3. Performance optimization
4. Cross-browser compatibility testing
5. Live theatre stress testing

### 4.2 Technical Considerations

#### **Web Audio API vs HTML5 Audio**
- **Web Audio API** recommended for professional control
- Precise timing, fade control, and volume management
- Better integration with visual animation loop
- Supports complex audio processing if needed later

#### **Audio File Format Support**
- **MP3**: Universal browser support, good compression
- **WAV**: Uncompressed, professional quality, larger files
- **OGG**: Good compression, Firefox/Chrome support
- Recommend MP3 for production with WAV fallback

#### **Browser Autoplay Policies**
- Modern browsers require user interaction before audio playback
- Integration with existing user interaction (clicking UI elements)
- Graceful handling of autoplay restrictions
- User notification for audio permission if needed

#### **Performance Optimization**
- Audio loading during visual initialization
- Efficient memory management for long performances
- Non-blocking audio operations
- Cleanup during animation reset cycles

### 4.3 Testing Strategy

#### **Development Testing**
1. **Unit Testing**: Individual class functionality
2. **Integration Testing**: Visual-audio synchronization
3. **Performance Testing**: Audio + visual rendering at 60fps
4. **Cross-browser Testing**: Chrome, Firefox, Safari, Edge

#### **Theatre Production Testing**
1. **Live Performance Simulation**: Full workflow with SD card import
2. **Stress Testing**: Multiple performance cycles without restart
3. **Audio Quality Testing**: Professional sound system integration
4. **Operator Training**: Sound cue programming and troubleshooting

## 5. Implementation Benefits

### 5.1 Architectural Advantages
- **Maintainable**: Separate file structure, clear class organization
- **Configurable**: Easy cue programming without code changes
- **Integrated**: Seamless visual-audio synchronization
- **Professional**: Production-ready reliability and error handling

### 5.2 Theatre Production Benefits
- **Automated Cuing**: Visual triggers reduce operator workload
- **Flexible Programming**: Easy adjustment of timing and volume
- **Professional Control**: Precise fade timing and volume management
- **Reliable Operation**: Robust error handling for live performance

### 5.3 Development Benefits
- **Easy Debugging**: Comprehensive logging and status indicators
- **Rapid Iteration**: Configuration-based cue programming
- **Compatible Architecture**: Follows existing code patterns
- **Future-Proof**: Extensible for additional audio features

## 6. Next Steps

### 6.1 Immediate Actions
1. **Create basic `soundSystem.js` file** with core classes
2. **Implement minimal Web Audio API integration**
3. **Add sound system initialization to `TheatreClient`**
4. **Test basic audio playback and volume control**

### 6.2 Configuration Setup
1. **Create `SOUND_CONFIG` object** following `VISUAL_CONFIG` pattern
2. **Implement basic cue sequence programming**
3. **Add keyboard event handling for manual cues**
4. **Create debug UI elements for sound system status**

### 6.3 Integration Testing
1. **Test visual trigger integration** with existing phase transitions
2. **Verify performance impact** on visual rendering
3. **Cross-browser compatibility testing**
4. **Live theatre workflow testing**

This sound system design provides a professional, maintainable, and theatre-ready audio solution that integrates seamlessly with the existing visual effects system while maintaining the architectural patterns and reliability standards of the current codebase. 