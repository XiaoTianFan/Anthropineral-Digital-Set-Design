// Experimental Theatre Digital Program - Sound System
// Professional audio management with cue system integration

// =============================================================================
// SOUND SYSTEM CONFIGURATION - Easy parameter tweaking interface
// =============================================================================
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
        'traffic-light': {
            url: '/static/audio/Traffic Light.mp3',
            volume: 0.8,
            loop: true,
            fadeIn: 0.5,
            fadeOut: 2.0,
            playbackRate: 1.0          // Normal speed
        },
        'sine-riser': {
            url: '/static/audio/Sine Riser.mp3',
            volume: 0.7,
            loop: false,
            fadeIn: 0.5,
            fadeOut: 1.0,
            playbackRate: 1.0          // Normal speed
        },
        'heartbeat': {
            url: '/static/audio/Heartbeat.mp3',
            volume: 0.6,
            loop: true,
            fadeIn: 1.0,
            fadeOut: 2.0,
            playbackRate: 1.0          // Normal speed - can be morphed for tension
        },
        'sublimation-initiated': {
            url: '/static/audio/Sublimation Initiated.mp3',
            volume: 0.8,
            loop: false,
            fadeIn: 0.5,
            fadeOut: 1.5,
            playbackRate: 1.0          // Normal speed
        },
        'spirits-possessed': {
            url: '/static/audio/Spirits Possessed.mp3',
            volume: 0.8,
            loop: false,
            fadeIn: 0.5,
            fadeOut: 1.5,
            playbackRate: 1.0          // Normal speed
        },
        'spirit-mining-initiating': {
            url: '/static/audio/Spirit Mining Initiating.mp3',
            volume: 0.8,
            loop: false,
            fadeIn: 0.5,
            fadeOut: 1.5,
            playbackRate: 1.0          // Normal speed
        },
        'protocol-rebooting': {
            url: '/static/audio/Protocol Rebooting.mp3',
            volume: 0.8,
            loop: false,
            fadeIn: 0.5,
            fadeOut: 1.5,
            playbackRate: 1.0          // Normal speed
        },
        'sublimation-completed': {
            url: '/static/audio/Sublimation Completed.mp3',
            volume: 0.8,
            loop: false,
            fadeIn: 0.3,
            fadeOut: 1.5,
            playbackRate: 1.0          // Normal speed
        },
        'long-season': {
            url: '/static/audio/Long Season.mp3',
            volume: 0.7,
            loop: false,
            fadeIn: 10.0,              // 10 second fade in as requested
            fadeOut: 5.0,              // 5 second fade out for smooth ending
            playbackRate: 1.0          // Normal speed
        }
    },

    // Speed morphing configuration
    speedMorph: {
        enabled: true,                 // Enable speed morphing system
        safeRange: {
            min: 0.25,                 // Minimum playback rate (quarter speed)
            max: 4.0                   // Maximum playback rate (4x speed)
        },
        transitions: {
            enabled: true,             // Enable smooth speed transitions
            defaultDuration: 2.0,      // Default transition duration (seconds)
            easing: 'exponential'      // Transition easing: 'linear', 'exponential', 'logarithmic'
        },
        presets: {
            'crawling': 0.25,          // Ultra slow, creepy effect
            'slow': 0.5,               // Half speed, atmospheric
            'normal': 1.0,             // Standard playback
            'urgent': 1.5,             // Slightly faster, building tension
            'intense': 2.0,            // Double speed, high energy
            'frantic': 3.0,            // Triple speed, chaotic
            'supernatural': 4.0        // Maximum speed, otherworldly
        },
        realTime: {
            enabled: true,             // Enable real-time speed changes during playback
            smoothing: 0.1,            // Smoothing factor for real-time changes (0-1)
            updateRate: 50             // Update rate in milliseconds
        }
    },

    // Cue sequence programming
    cueSequence: [
        // Note: Main cue system (CUE 01-14) is implemented separately
        // These are just fallback/testing cues
        {
            id: 'test-traffic-light',
            trackId: 'traffic-light',
            triggerType: 'manual',
            delay: 0,
            fadeIn: 0.5,
            volume: 0.8,
            loop: true
        },
        {
            id: 'test-heartbeat',
            trackId: 'heartbeat',
            triggerType: 'manual',
            delay: 0,
            fadeIn: 2.0,
            volume: 0.6,
            loop: true,
            playbackRate: 1.0
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

// =============================================================================
// SOUND CUE CLASS - Individual cue configuration object
// =============================================================================
class SoundCue {
    constructor(config) {
        this.id = config.id;                           // Unique cue identifier
        this.trackId = config.trackId;                 // Audio track to play
        this.triggerType = config.triggerType;         // 'auto-follow', 'auto-continue', 'manual', 'visual-cue'
        this.delay = config.delay || 0;                // Delay before playback (seconds)
        this.fadeIn = config.fadeIn || 0;              // Fade in duration
        this.fadeOut = config.fadeOut || 0;            // Fade out duration
        this.volume = config.volume || 1.0;            // Playback volume
        this.loop = config.loop || false;              // Looping enabled
        this.visualTrigger = config.visualTrigger;     // Visual phase trigger
        
        // 🎛️ Speed morphing properties
        this.playbackRate = config.playbackRate || 1.0; // Playback speed/pitch
        this.speedTransition = config.speedTransition || { enabled: false }; // Speed transition config
        
        // Runtime state
        this.isTriggered = false;                      // Has this cue been triggered
        this.triggerTime = 0;                          // When this cue was triggered
        this.isCompleted = false;                      // Has this cue completed execution
        this.currentPlaybackRate = 1.0;                // Current runtime playback rate
    }

    reset() {
        this.isTriggered = false;
        this.triggerTime = 0;
        this.isCompleted = false;
    }

    markTriggered(currentTime) {
        this.isTriggered = true;
        this.triggerTime = currentTime;
    }

    markCompleted() {
        this.isCompleted = true;
    }

    shouldTrigger(currentTime) {
        if (this.isTriggered && !this.isCompleted) {
            return (currentTime - this.triggerTime) >= this.delay;
        }
        return false;
    }

    // 🎛️ Speed morphing helper methods
    resolvePlaybackRate(rateValue) {
        // If it's a string, look up in presets
        if (typeof rateValue === 'string') {
            const preset = SOUND_CONFIG.speedMorph.presets[rateValue];
            if (preset !== undefined) {
                return preset;
            }
            console.warn(`🎵 Unknown playback rate preset: ${rateValue}, using 1.0`);
            return 1.0;
        }
        
        // If it's a number, clamp to safe range
        if (typeof rateValue === 'number') {
            const { min, max } = SOUND_CONFIG.speedMorph.safeRange;
            return Math.max(min, Math.min(max, rateValue));
        }
        
        return 1.0; // Default fallback
    }

    getTargetPlaybackRate() {
        return this.resolvePlaybackRate(this.playbackRate);
    }

    getStartPlaybackRate() {
        if (this.speedTransition.enabled && this.speedTransition.startRate !== undefined) {
            return this.resolvePlaybackRate(this.speedTransition.startRate);
        }
        return this.getTargetPlaybackRate();
    }

    hasSpeedTransition() {
        return this.speedTransition.enabled && 
               this.speedTransition.duration > 0 &&
               this.getStartPlaybackRate() !== this.getTargetPlaybackRate();
    }
}

// =============================================================================
// AUDIO TRACK CLASS - Individual audio file handler
// =============================================================================
class AudioTrack {
    constructor(id, audioBuffer, config) {
        this.id = id;                                  // Unique identifier
        this.audioBuffer = audioBuffer;                // Web Audio buffer
        this.config = config;                          // Track configuration
        this.source = null;                            // Current audio source
        this.gainNode = null;                          // Volume control node
        this.isPlaying = false;                        // Playback state
        this.startTime = 0;                            // When playback started
        this.pauseTime = 0;                            // Pause position
        this.isLooping = false;                        // Current loop state
        this.fadeTimeoutId = null;                     // Fade animation ID
        this.currentVolume = 1.0;                      // Current volume level
        
        // Audio context reference (will be set by SoundManager)
        this.audioContext = null;
        this.masterGainNode = null;

        // 🎛️ Speed morphing properties
        this.currentPlaybackRate = 1.0;                // Current playback rate
        this.targetPlaybackRate = 1.0;                 // Target playback rate for transitions
        this.speedTransitionStartTime = 0;             // When speed transition started
        this.speedTransitionDuration = 0;              // Duration of speed transition
        this.speedTransitionStartRate = 1.0;           // Starting rate for transition
        
        // 🆕 NEW: Track end callback support
        this.onEnd = null;                              // Callback function for track end
    }

    setAudioContext(audioContext, masterGainNode) {
        this.audioContext = audioContext;
        this.masterGainNode = masterGainNode;
    }

    play(fadeInDuration = 0, playbackRate = null) {
        if (!this.audioContext || !this.audioBuffer) {
            console.error(`Cannot play track ${this.id}: Audio context or buffer not available`);
            return false;
        }

        // Stop current playback if running
        this.stop(0);

        try {
            // Create new audio source and gain node
            this.source = this.audioContext.createBufferSource();
            this.gainNode = this.audioContext.createGain();

            // Configure source
            this.source.buffer = this.audioBuffer;
            this.source.loop = this.isLooping;

            // 🎛️ Set playback rate (speed/pitch)
            const effectivePlaybackRate = playbackRate !== null ? playbackRate : 
                                        (this.config.playbackRate || 1.0);
            this.currentPlaybackRate = effectivePlaybackRate;
            this.targetPlaybackRate = effectivePlaybackRate;
            this.source.playbackRate.setValueAtTime(effectivePlaybackRate, this.audioContext.currentTime);

            // Connect audio graph: source -> gainNode -> masterGainNode -> destination
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.masterGainNode);

            // Set initial volume
            const targetVolume = this.config.volume * this.currentVolume;
            
            if (fadeInDuration > 0) {
                // Start at 0 and fade in
                this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                this.gainNode.gain.linearRampToValueAtTime(targetVolume, this.audioContext.currentTime + fadeInDuration);
            } else {
                // Start at target volume
                this.gainNode.gain.setValueAtTime(targetVolume, this.audioContext.currentTime);
            }

            // Handle source end event
            this.source.onended = () => {
                if (SOUND_CONFIG.debug.enabled) {
                    console.log(`🎵 Track ${this.id} onended event - isPlaying: ${this.isPlaying}, isLooping: ${this.isLooping}`);
                }
                if (this.isPlaying && !this.isLooping) {
                    this.isPlaying = false;
                    if (SOUND_CONFIG.debug.enabled) {
                        console.log(`🎵 Track ${this.id} playback completed (non-looping)`);
                    }
                    
                    // 🆕 NEW: Call onEnd callback if provided
                    if (this.onEnd && typeof this.onEnd === 'function') {
                        try {
                            this.onEnd();
                            if (SOUND_CONFIG.debug.enabled) {
                                console.log(`🎵 Track ${this.id} onEnd callback executed`);
                            }
                        } catch (error) {
                            console.error(`🎵 Error in onEnd callback for track ${this.id}:`, error);
                        }
                    }
                }
            };

            // Start playback
            this.source.start(0, this.pauseTime);
            this.isPlaying = true;
            this.startTime = this.audioContext.currentTime;
            this.pauseTime = 0;

            if (SOUND_CONFIG.debug.enabled) {
                console.log(`🎵 Playing track ${this.id} with fade-in: ${fadeInDuration}s, loop: ${this.isLooping}, rate: ${effectivePlaybackRate}x`);
            }

            return true;
        } catch (error) {
            console.error(`Error playing track ${this.id}:`, error);
            return false;
        }
    }

    stop(fadeOutDuration = 0) {
        if (!this.isPlaying || !this.source) {
            return;
        }

        try {
            if (fadeOutDuration > 0 && this.gainNode) {
                // Fade out then stop
                const currentTime = this.audioContext.currentTime;
                this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, currentTime);
                this.gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeOutDuration);
                
                // Schedule stop after fade
                setTimeout(() => {
                    this.forceStop();
                }, fadeOutDuration * 1000);
            } else {
                // Stop immediately
                this.forceStop();
            }

            if (SOUND_CONFIG.debug.enabled) {
                console.log(`🎵 Stopping track ${this.id} with fade-out: ${fadeOutDuration}s`);
            }
        } catch (error) {
            console.error(`Error stopping track ${this.id}:`, error);
            this.forceStop();
        }
    }

    forceStop() {
        if (this.source) {
            try {
                this.source.stop();
            } catch (error) {
                // Source might already be stopped
            }
            this.source = null;
        }
        
        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = null;
        }
        
        this.isPlaying = false;
    }

    setVolume(volume, fadeDuration = 0) {
        this.currentVolume = Math.max(0, Math.min(1, volume)); // Clamp to 0-1
        
        if (!this.gainNode) {
            return;
        }

        const targetVolume = this.config.volume * this.currentVolume;
        const currentTime = this.audioContext.currentTime;

        if (fadeDuration > 0) {
            this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, currentTime);
            this.gainNode.gain.linearRampToValueAtTime(targetVolume, currentTime + fadeDuration);
        } else {
            this.gainNode.gain.setValueAtTime(targetVolume, currentTime);
        }
    }

    setLoop(enabled) {
        this.isLooping = enabled;
        if (this.source) {
            this.source.loop = enabled;
        }
        
        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Track ${this.id} loop set to: ${enabled}`);
        }
    }

    pause() {
        if (this.isPlaying && this.source) {
            this.pauseTime = this.audioContext.currentTime - this.startTime;
            this.forceStop();
        }
    }

    resume(fadeInDuration = 0) {
        if (!this.isPlaying && this.pauseTime > 0) {
            this.play(fadeInDuration);
        }
    }

    getCurrentTime() {
        if (this.isPlaying && this.source) {
            return this.audioContext.currentTime - this.startTime + this.pauseTime;
        }
        return this.pauseTime;
    }

    getDuration() {
        return this.audioBuffer ? this.audioBuffer.duration : 0;
    }

    dispose() {
        this.forceStop();
        this.audioBuffer = null;
        this.audioContext = null;
        this.masterGainNode = null;
    }

    // 🎛️ Speed morphing methods
    setPlaybackRate(rate, transitionDuration = 0) {
        if (!this.source || !this.isPlaying) {
            return;
        }

        // Clamp rate to safe range
        const { min, max } = SOUND_CONFIG.speedMorph.safeRange;
        const clampedRate = Math.max(min, Math.min(max, rate));
        
        const currentTime = this.audioContext.currentTime;

        if (transitionDuration > 0) {
            // Smooth transition
            this.speedTransitionStartTime = currentTime;
            this.speedTransitionDuration = transitionDuration;
            this.speedTransitionStartRate = this.currentPlaybackRate;
            this.targetPlaybackRate = clampedRate;
            
            // Start the transition
            this.source.playbackRate.setValueAtTime(this.currentPlaybackRate, currentTime);
            this.source.playbackRate.linearRampToValueAtTime(clampedRate, currentTime + transitionDuration);
        } else {
            // Immediate change
            this.source.playbackRate.setValueAtTime(clampedRate, currentTime);
            this.currentPlaybackRate = clampedRate;
            this.targetPlaybackRate = clampedRate;
        }

        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Track ${this.id} playback rate set to ${clampedRate}x (transition: ${transitionDuration}s)`);
        }
    }

    startSpeedTransition(startRate, targetRate, duration) {
        if (!this.source || !this.isPlaying) {
            return;
        }

        const currentTime = this.audioContext.currentTime;
        
        // Set starting rate immediately
        this.source.playbackRate.setValueAtTime(startRate, currentTime);
        this.currentPlaybackRate = startRate;
        
        // Begin transition to target rate
        this.speedTransitionStartTime = currentTime;
        this.speedTransitionDuration = duration;
        this.speedTransitionStartRate = startRate;
        this.targetPlaybackRate = targetRate;
        
        // Schedule the transition
        this.source.playbackRate.linearRampToValueAtTime(targetRate, currentTime + duration);

        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Track ${this.id} speed transition: ${startRate}x → ${targetRate}x over ${duration}s`);
        }
    }

    updateSpeedTransition() {
        if (!this.source || !this.isPlaying || this.speedTransitionDuration <= 0) {
            return;
        }

        const currentTime = this.audioContext.currentTime;
        const elapsed = currentTime - this.speedTransitionStartTime;
        
        if (elapsed >= this.speedTransitionDuration) {
            // Transition completed
            this.currentPlaybackRate = this.targetPlaybackRate;
            this.speedTransitionDuration = 0;
        } else {
            // Calculate current rate based on transition progress
            const progress = elapsed / this.speedTransitionDuration;
            this.currentPlaybackRate = this.speedTransitionStartRate + 
                (this.targetPlaybackRate - this.speedTransitionStartRate) * progress;
        }
    }

    getCurrentPlaybackRate() {
        return this.currentPlaybackRate;
    }
}

// =============================================================================
// SOUND MANAGER CLASS - Main orchestrator
// =============================================================================
class SoundManager {
    constructor() {
        this.audioContext = null;                      // Web Audio API context
        this.masterGainNode = null;                    // Master volume control
        this.tracks = new Map();                       // Audio track instances
        this.cues = [];                                // Programmed cue sequence
        this.currentCueIndex = 0;                      // Current position in cue sequence
        this.isInitialized = false;                    // Initialization state
        this.masterVolume = SOUND_CONFIG.master.volume; // Global volume control
        this.isMuted = false;                          // Mute state
        this.loadingPromises = new Map();              // Track loading promises
        this.visualTriggerCallbacks = new Map();       // Visual trigger event handlers
        
        // Performance monitoring
        this.lastUpdateTime = 0;
        this.updateInterval = 100;                     // Update cues every 100ms
        
        // 🆕 NEW: Cue system extensions
        this.socketConnection = null;
        this.performanceState = {
            isActive: false,
            currentPhase: 'idle',
            sdInsertCount: 0,
            trafficLightRate: 0.75,
            cueHistory: [],
            startTime: null,
            cue05Executed: false,         // 🎭 NEW: Track CUE-05 one-time execution
            cue07Triggered: false         // 🎭 NEW: Track CUE-07 one-time execution
        };
        this.cueTimers = new Map();
        this.crossSystemEvents = new Map();
        this.trafficLightController = null;
    }

    async init() {
        if (this.isInitialized) {
            return true;
        }

        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: SOUND_CONFIG.master.sampleRate
            });

            // Create master gain node
            this.masterGainNode = this.audioContext.createGain();
            this.masterGainNode.connect(this.audioContext.destination);
            this.masterGainNode.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);

            // Handle browser autoplay restrictions
            if (this.audioContext.state === 'suspended') {
                console.warn('🎵 Audio context suspended - waiting for user interaction');
            }

            // Initialize cue sequence
            this.createCueSequence(SOUND_CONFIG.cueSequence);

            // Load all tracks defined in configuration
            await this.loadAllTracks();

            this.isInitialized = true;
            
            if (SOUND_CONFIG.debug.enabled) {
                console.log('🎵 Sound system initialized successfully');
                console.log(`🎵 Loaded ${this.tracks.size} audio tracks`);
                console.log(`🎵 Programmed ${this.cues.length} cues`);
            }

            return true;
        } catch (error) {
            console.error('🎵 Failed to initialize sound system:', error);
            return false;
        }
    }

    async loadAllTracks() {
        const loadPromises = [];
        
        for (const [trackId, trackConfig] of Object.entries(SOUND_CONFIG.tracks)) {
            loadPromises.push(this.loadTrack(trackId, trackConfig.url, trackConfig));
        }

        try {
            await Promise.all(loadPromises);
            if (SOUND_CONFIG.debug.enabled) {
                console.log('🎵 All audio tracks loaded successfully');
            }
        } catch (error) {
            console.error('🎵 Error loading some audio tracks:', error);
        }
    }

    async loadTrack(id, url, config) {
        if (this.loadingPromises.has(id)) {
            return this.loadingPromises.get(id);
        }

        const loadPromise = this._loadTrackInternal(id, url, config);
        this.loadingPromises.set(id, loadPromise);
        
        try {
            await loadPromise;
            return true;
        } catch (error) {
            this.loadingPromises.delete(id);
            throw error;
        }
    }

    async _loadTrackInternal(id, url, config) {
        try {
            if (SOUND_CONFIG.debug.enabled) {
                console.log(`🎵 Loading track: ${id} from ${url}`);
            }

            // Fetch audio file
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            
            // Decode audio data
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            // Create audio track instance
            const audioTrack = new AudioTrack(id, audioBuffer, config);
            audioTrack.setAudioContext(this.audioContext, this.masterGainNode);
            
            this.tracks.set(id, audioTrack);

            if (SOUND_CONFIG.debug.enabled) {
                console.log(`🎵 Track loaded: ${id} (${audioBuffer.duration.toFixed(2)}s)`);
            }

        } catch (error) {
            console.error(`🎵 Failed to load track ${id}:`, error);
            throw error;
        }
    }

    createCueSequence(cueConfigs) {
        this.cues = cueConfigs.map(config => new SoundCue(config));
        this.currentCueIndex = 0;
        
        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Created cue sequence with ${this.cues.length} cues`);
        }
    }

    // Resume audio context if suspended (for browser autoplay policies)
    async resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
                if (SOUND_CONFIG.debug.enabled) {
                    console.log('🎵 Audio context resumed');
                }
                return true;
            } catch (error) {
                console.error('🎵 Failed to resume audio context:', error);
                return false;
            }
        }
        return true;
    }

    // Manual cue trigger (Right Arrow key)
    triggerNextManualCue() {
        const manualCue = this.cues.find((cue, index) => 
            index >= this.currentCueIndex && 
            cue.triggerType === 'manual' && 
            !cue.isTriggered
        );

        if (manualCue) {
            this.triggerCue(manualCue.id);
            return true;
        }

        if (SOUND_CONFIG.debug.enabled) {
            console.log('🎵 No manual cues available to trigger');
        }
        return false;
    }

    // Trigger specific cue by ID
    triggerCue(cueId) {
        // 🆕 NEW: Handle main cues (CUE-01 through CUE-14) directly
        if (cueId.match(/^CUE-\d{2}$/)) {
            console.log(`🎭 Triggering main cue: ${cueId}`);
            return this.handleCueExecution({ 
                cue: cueId, 
                source: 'triggerCue' 
            });
        }
        
        // Handle standard cues from the cues array
        const cue = this.cues.find(c => c.id === cueId);
        if (!cue) {
            console.error(`🎵 Cue not found: ${cueId}`);
            return false;
        }

        if (cue.isTriggered) {
            if (SOUND_CONFIG.debug.enabled) {
                console.log(`🎵 Cue ${cueId} already triggered`);
            }
            return false;
        }

        // Resume audio context if needed
        this.resumeAudioContext();

        cue.markTriggered(this.audioContext.currentTime);
        
        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Triggered cue: ${cueId} (${cue.triggerType})`);
        }

        return true;
    }

    // Visual trigger integration
    onVisualTrigger(triggerName, callback) {
        if (!this.visualTriggerCallbacks.has(triggerName)) {
            this.visualTriggerCallbacks.set(triggerName, []);
        }
        this.visualTriggerCallbacks.get(triggerName).push(callback);
    }

    // Trigger visual cues
    triggerVisualCue(triggerName) {
        // Trigger matching cues
        const matchingCues = this.cues.filter(cue => 
            cue.triggerType === 'visual-cue' && 
            cue.visualTrigger === triggerName &&
            !cue.isTriggered
        );

        matchingCues.forEach(cue => {
            this.triggerCue(cue.id);
        });

        // Call registered callbacks
        const callbacks = this.visualTriggerCallbacks.get(triggerName);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback();
                } catch (error) {
                    console.error(`🎵 Error in visual trigger callback for ${triggerName}:`, error);
                }
            });
        }

        if (SOUND_CONFIG.debug.enabled && matchingCues.length > 0) {
            console.log(`🎵 Visual trigger ${triggerName} activated ${matchingCues.length} cues`);
        }
    }

    // Update system - should be called regularly (e.g., in animation loop)
    update(currentTime) {
        if (!this.isInitialized || currentTime - this.lastUpdateTime < this.updateInterval) {
            return;
        }

        this.lastUpdateTime = currentTime;

        // Check for cues that should start playing
        this.cues.forEach(cue => {
            if (cue.shouldTrigger(this.audioContext.currentTime)) {
                this.executeCue(cue);
                cue.markCompleted();
            }
        });

        // 🎛️ Update speed transitions for all playing tracks
        if (SOUND_CONFIG.speedMorph.realTime.enabled) {
            this.tracks.forEach(track => {
                if (track.isPlaying) {
                    track.updateSpeedTransition();
                }
            });
        }
    }

    // Execute a triggered cue
    executeCue(cue) {
        const track = this.tracks.get(cue.trackId);
        if (!track) {
            console.error(`🎵 Track not found for cue ${cue.id}: ${cue.trackId}`);
            return;
        }

        try {
            // Configure track settings
            track.setLoop(cue.loop);
            track.setVolume(cue.volume);

            // 🎛️ Determine playback rate strategy
            let startPlaybackRate = cue.getStartPlaybackRate();
            const targetPlaybackRate = cue.getTargetPlaybackRate();

            // Start playback with initial rate
            track.play(cue.fadeIn, startPlaybackRate);

            // 🎛️ Handle speed transitions
            if (cue.hasSpeedTransition()) {
                const transitionDuration = cue.speedTransition.duration || 
                                          SOUND_CONFIG.speedMorph.transitions.defaultDuration;
                
                // Start the speed transition
                setTimeout(() => {
                    if (track.isPlaying) {
                        track.startSpeedTransition(startPlaybackRate, targetPlaybackRate, transitionDuration);
                    }
                }, 100); // Small delay to ensure playback has started
            }

            if (SOUND_CONFIG.debug.enabled) {
                const rateInfo = cue.hasSpeedTransition() ? 
                    `rate: ${startPlaybackRate}x → ${targetPlaybackRate}x` :
                    `rate: ${targetPlaybackRate}x`;
                console.log(`🎵 Executing cue ${cue.id}: playing ${cue.trackId} (${rateInfo})`);
            }
        } catch (error) {
            console.error(`🎵 Error executing cue ${cue.id}:`, error);
        }
    }

    // Emergency stop all audio
    stopAllAudio(fadeOutDuration = 0) {
        this.tracks.forEach(track => {
            if (track.isPlaying) {
                track.stop(fadeOutDuration);
            }
        });

        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Emergency stop - all audio stopped with fade: ${fadeOutDuration}s`);
        }
    }

    // Master volume control
    setMasterVolume(volume, fadeDuration = 0) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        
        if (this.masterGainNode) {
            const currentTime = this.audioContext.currentTime;
            if (fadeDuration > 0) {
                this.masterGainNode.gain.setValueAtTime(this.masterGainNode.gain.value, currentTime);
                this.masterGainNode.gain.linearRampToValueAtTime(this.masterVolume, currentTime + fadeDuration);
            } else {
                this.masterGainNode.gain.setValueAtTime(this.masterVolume, currentTime);
            }
        }
    }

    // Mute/unmute
    setMute(muted, fadeDuration = 0.5) {
        this.isMuted = muted;
        const targetVolume = muted ? 0 : this.masterVolume;
        
        if (this.masterGainNode) {
            const currentTime = this.audioContext.currentTime;
            this.masterGainNode.gain.setValueAtTime(this.masterGainNode.gain.value, currentTime);
            this.masterGainNode.gain.linearRampToValueAtTime(targetVolume, currentTime + fadeDuration);
        }

        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Audio ${muted ? 'muted' : 'unmuted'}`);
        }
    }

    toggleMute() {
        this.setMute(!this.isMuted);
    }

    // Reset cue system
    resetCues() {
        this.cues.forEach(cue => cue.reset());
        this.currentCueIndex = 0;
        
        if (SOUND_CONFIG.debug.enabled) {
            console.log('🎵 Cue system reset');
        }
    }

    // Get system status
    getStatus() {
        return {
            initialized: this.isInitialized,
            audioContextState: this.audioContext ? this.audioContext.state : 'none',
            tracksLoaded: this.tracks.size,
            totalCues: this.cues.length,
            triggeredCues: this.cues.filter(c => c.isTriggered).length,
            playingTracks: Array.from(this.tracks.values()).filter(t => t.isPlaying).length,
            masterVolume: this.masterVolume,
            isMuted: this.isMuted
        };
    }

    // Cleanup
    dispose() {
        this.stopAllAudio(0);
        
        this.tracks.forEach(track => track.dispose());
        this.tracks.clear();
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        this.isInitialized = false;
        
        if (SOUND_CONFIG.debug.enabled) {
            console.log('🎵 Sound system disposed');
        }
    }

    // 🎛️ Speed morphing control methods
    setTrackPlaybackRate(trackId, rate, transitionDuration = 0) {
        const track = this.tracks.get(trackId);
        if (!track) {
            console.error(`🎵 Track not found: ${trackId}`);
            return false;
        }

        track.setPlaybackRate(rate, transitionDuration);
        return true;
    }

    morphTrackSpeed(trackId, preset, transitionDuration = null) {
        const track = this.tracks.get(trackId);
        if (!track) {
            console.error(`🎵 Track not found: ${trackId}`);
            return false;
        }

        const rate = SOUND_CONFIG.speedMorph.presets[preset];
        if (rate === undefined) {
            console.error(`🎵 Unknown speed preset: ${preset}`);
            return false;
        }

        const duration = transitionDuration !== null ? transitionDuration : 
                        SOUND_CONFIG.speedMorph.transitions.defaultDuration;
        
        track.setPlaybackRate(rate, duration);
        
        if (SOUND_CONFIG.debug.enabled) {
            console.log(`🎵 Morphing ${trackId} to ${preset} (${rate}x) over ${duration}s`);
        }
        
        return true;
    }

    getTrackPlaybackRate(trackId) {
        const track = this.tracks.get(trackId);
        return track ? track.getCurrentPlaybackRate() : null;
    }

    getAllPlayingTracks() {
        const playingTracks = [];
        this.tracks.forEach((track, id) => {
            if (track.isPlaying) {
                playingTracks.push({
                    id: id,
                    playbackRate: track.getCurrentPlaybackRate(),
                    volume: track.currentVolume,
                    isLooping: track.isLooping,
                    duration: track.getDuration(),
                    currentTime: track.getCurrentTime()
                });
            }
        });
        return playingTracks;
    }

    // 🆕 NEW: Initialize cue system
    initCueSystem(socketConnection) {
        this.socketConnection = socketConnection;
        this.setupCueEventHandlers();
        console.log('🎭 Cue system initialized');
    }
    
    // 🆕 NEW: Setup cue-specific event handlers
    setupCueEventHandlers() {
        if (!this.socketConnection) return;
        
        this.socketConnection.on('cue-execute', (data) => {
            this.handleCueExecution(data);
        });
        
        this.socketConnection.on('cue-sd-card-detected', (data) => {
            this.handleSDCardCue(data);
        });
        
        this.socketConnection.on('cue-manual-trigger', (data) => {
            this.handleManualCue(data);
        });
    }
    
    // 🆕 NEW: Handle SD card cue events
    handleSDCardCue(data) {
        console.log('🎭 SD Card cue received:', data);
        
        // Use provided insert count or increment if not provided
        if (data.insertCount !== undefined) {
            this.performanceState.sdInsertCount = data.insertCount;
            console.log(`🎭 SD card count set to: ${this.performanceState.sdInsertCount}`);
        } else {
            // Fallback: increment if no count provided
            this.performanceState.sdInsertCount++;
            console.log(`🎭 SD card inserted - count incremented to: ${this.performanceState.sdInsertCount}`);
        }
        
        // If traffic light is active, speed it up
        if (this.trafficLightController && this.performanceState.trafficLightActive) {
            const success = this.trafficLightController.speedUp();
            if (success) {
                console.log(`🚦 Traffic light speed increased to ${this.trafficLightController.getCurrentRate()}x`);
            } else {
                console.log('🚦 Traffic light at maximum speed or not active');
            }
        } else {
            console.log('🚦 Traffic light controller not available or traffic light not active');
        }
        
        // 🆕 NEW: Check if SD insert count reaches 5 to trigger CUE-07
        if (this.performanceState.sdInsertCount >= 5 && 
            this.performanceState.trafficLightActive && 
            !this.performanceState.cue07Triggered) {
            console.log('🎭 SD insert count reached 5 - triggering CUE-07 (traffic light fade out)');
            // Wait 10 seconds as specified in the cue sequence, then trigger CUE-07
            setTimeout(() => {
                this.triggerCue('CUE-07');
            }, 10000); // 10 second delay as per specification
            
            // Mark that we've triggered CUE-07 so we don't trigger it again
            this.performanceState.cue07Triggered = true;
        }
        
        // Handle any specific cue if provided
        if (data.cue) {
            this.triggerCue(data.cue);
        }
        
        // Emit cross-system event
        this.emitCrossSystemEvent('sd-card-inserted', {
            insertCount: this.performanceState.sdInsertCount,
            trafficLightRate: this.trafficLightController ? this.trafficLightController.getCurrentRate() : null
        });
    }
    
    // 🆕 NEW: Handle manual cue events
    handleManualCue(data) {
        console.log('🎭 Manual cue received:', data);
        if (data.cue) {
            this.triggerCue(data.cue);
        }
    }
    
    // 🆕 NEW: Enhanced cue execution handler
    handleCueExecution(data) {
        const cueId = data.cue || data.cueId;
        const source = data.source || 'unknown';
        console.log(`🎭 Executing cue: ${cueId} from ${source}`);
        
        try {
            // Handle different cue types
            switch(cueId) {
                case 'CUE-01':
                    this.executeCue01();
                    break;
                case 'CUE-02':
                    this.executeCue02();
                    break;
                case 'CUE-03':
                    this.executeCue03();
                    break;
                case 'CUE-04':
                    this.executeCue04();
                    break;
                case 'CUE-05':
                    this.executeCue05();
                    break;
                case 'CUE-06':
                    this.executeCue06();
                    break;
                case 'CUE-07':
                    this.executeCue07();
                    break;
                case 'CUE-08':
                    this.executeCue08();
                    break;
                case 'CUE-09':
                    this.executeCue09();
                    break;
                case 'CUE-10':
                    this.executeCue10();
                    break;
                case 'CUE-11':
                    this.executeCue11();
                    break;
                case 'CUE-12':
                    this.executeCue12();
                    break;
                case 'CUE-13':
                    this.executeCue13();
                    break;
                case 'CUE-14':
                    this.executeCue14();
                    break;
                case 'CUE-15':
                    this.executeCue15();
                    break;
                case 'CUE-16':
                    this.executeCue16();
                    break;
                default:
                    console.warn(`🎭 Unknown cue: ${cueId}`);
                    return false;
            }
            
            // Emit cross-system event to notify other components
            this.emitCrossSystemEvent('cue-executed', {
                cue: cueId,
                source: source,
                timestamp: Date.now()
            });
            
            return true;
            
        } catch (error) {
            console.error(`🎭 Error executing cue ${cueId}:`, error);
            this.emitCrossSystemEvent('cue-error', {
                cue: cueId,
                error: error.message,
                source: source
            });
            return false;
        }
    }
    
    // 🆕 NEW: SPECIFIC CUE IMPLEMENTATIONS
    
    // CUE 01-04: Opening Sequence
    executeCue01() {
        console.log('🎭 executeCue01() called - Executing CUE 01: Opening sequence');
        
        try {
            console.log('🎵 Starting heartbeat track...');
            // Start both tracks simultaneously using existing methods
            this.executeCue({
                id: 'cue-01-heartbeat',
                trackId: 'heartbeat',
                fadeIn: 5.0,
                loop: true,
                volume: 0.8
            });
            
            console.log('🎵 Starting sine riser track...');
            this.executeCue({
                id: 'cue-01-riser',
                trackId: 'sine-riser',
                fadeIn: 0.0,
                loop: false,
                volume: 0.8
            });
            
            console.log('⏰ Scheduling CUE 02 for 14 seconds...');
            // Schedule CUE 02 after 14 seconds using existing timer system
            this.scheduleCue(14.0, { cue: 'CUE-02' }, 'cue-02-trigger');
            
            console.log('✅ CUE 01 setup completed');
        } catch (error) {
            console.error('❌ Error in executeCue01():', error);
        }
    }

    executeCue02() {
        console.log('🎭 Executing CUE 02: Stop opening tracks');
        
        // Stop both tracks with fade using existing methods
        const heartbeat = this.tracks.get('heartbeat');
        const riser = this.tracks.get('sine-riser');
        
        if (heartbeat) heartbeat.stop(0.5);
        if (riser) riser.stop(0.5);
        
        // Schedule CUE 03 after 5 second silence
        this.scheduleCue(5.5, { cue: 'CUE-03' }, 'cue-03-trigger');
    }

    executeCue03() {
        console.log('🎭 Executing CUE 03: Sublimation completed');
        
        this.executeCue({
            id: 'cue-03-sublimation',
            trackId: 'sublimation-completed',
            fadeIn: 0.1,
            loop: false,
            onEnd: () => {
                setTimeout(() => this.executeCue04(), 3000);
            }
        });
    }

    executeCue04() {
        console.log('🎭 Executing CUE 04: Protocol rebooting + visual trigger');
        
        // Start audio using existing system
        this.executeCue({
            id: 'cue-04-protocol',
            trackId: 'protocol-rebooting',
            fadeIn: 0.5,
            loop: false
        });
        
        // Trigger visual system using existing SocketIO
        this.emitCrossSystemEvent('black-filter-disengage', {
            cueId: 'CUE-04',
            timing: 'immediate'
        });
    }

    // CUE 05-06: Manual + Traffic Light
    executeCue05() {
        // 🎭 NEW: Check if CUE-05 has already been executed (one-time trigger)
        if (this.performanceState.cue05Executed) {
            console.log('🎭 CUE-05 already executed - ignoring repeat trigger');
            this.emitCrossSystemEvent('cue-already-executed', {
                cue: 'CUE-05',
                message: 'CUE-05 can only be triggered once per performance'
            });
            return false;
        }
        
        console.log('🎭 Executing CUE 05: Spirit mining initiating (MANUAL)');
        
        // Mark CUE-05 as executed
        this.performanceState.cue05Executed = true;
        
        this.executeCue({
            id: 'cue-05-spirit-mining',
            trackId: 'spirit-mining-initiating',
            fadeIn: 0.5,
            loop: false,
            onEnd: () => {
                setTimeout(() => this.executeCue06(), 2000);
            }
        });
        
        return true;
    }

    executeCue06() {
        console.log('🎭 Executing CUE 06: Traffic light start');
        
        // Initialize traffic light controller if not exists
        if (!this.trafficLightController) {
            this.trafficLightController = new TrafficLightController(this);
        }
        
        // Start traffic light at 0.75x speed
        this.trafficLightController.start();
        
        // Update performance state
        this.performanceState.currentPhase = 'interactive';
        this.performanceState.trafficLightActive = true;
    }

    // CUE 07-10: Convergence Sequence
    executeCue07() {
        console.log('🎭 Executing CUE 07: Traffic light fade out');
        
        if (this.trafficLightController) {
            this.trafficLightController.fadeOut(3.0, () => {
                this.executeCue08();
            });
        } else {
            // Fallback if controller not available
            this.executeCue08();
        }
    }

    executeCue08() {
        console.log('🎭 Executing CUE 08: Spirits possessed + convergence trigger');
        
        this.executeCue({
            id: 'cue-08-spirits',
            trackId: 'spirits-possessed',
            fadeIn: 0.5,
            loop: false,
            onEnd: () => this.executeCue09()
        });
        
        // Trigger visual convergence using existing system
        this.emitCrossSystemEvent('convergence-start', {
            cueId: 'CUE-08',
            timing: 'immediate'
        });
    }

    executeCue09() {
        console.log('🎭 Executing CUE 09: Sublimation initiated');
        
        this.executeCue({
            id: 'cue-09-sublimation',
            trackId: 'sublimation-initiated',
            fadeIn: 0.5,
            loop: false,
            onEnd: () => this.executeCue10()
        });
    }

    executeCue10() {
        console.log('🎭 Executing CUE 10: Heartbeat return');
        
        this.executeCue({
            id: 'cue-10-heartbeat-return',
            trackId: 'heartbeat',
            fadeIn: 5.0,
            loop: true,
            volume: 0.7
        });
        
        // Schedule CUE 11 after 20 seconds
        this.scheduleCue(20.0, { cue: 'CUE-11' }, 'cue-11-trigger');
    }

    // CUE 11-14: Final Sequence
    executeCue11() {
        console.log('🎭 Executing CUE 11: Final sine riser');
        
        this.executeCue({
            id: 'cue-11-riser-final',
            trackId: 'sine-riser',
            fadeIn: 0.0,
            loop: false,
            volume: 0.8
        });
        
        // Schedule departure trigger 6 seconds after riser starts
        this.scheduleCue(6.0, { cue: 'CUE-12' }, 'cue-12-trigger');
    }

    executeCue12() {
        console.log('🎭 Executing CUE 12: Departure phase trigger');
        
        // Trigger visual departure using existing system
        this.emitCrossSystemEvent('departure-start', {
            cueId: 'CUE-12',
            timing: 'immediate'
        });
        
        // Schedule heartbeat stop 7 seconds later
        this.scheduleCue(7.0, { cue: 'CUE-13' }, 'cue-13-trigger');
    }

    executeCue13() {
        console.log('🎭 Executing CUE 13: Heartbeat stop');
        
        const heartbeat = this.tracks.get('heartbeat');
        if (heartbeat && heartbeat.isPlaying) {
            heartbeat.stop(0);
        }
        
        // Schedule final cue 10 seconds later
        this.scheduleCue(10.0, { cue: 'CUE-14' }, 'cue-14-trigger');
    }

    executeCue14() {
        console.log('🎭 Executing CUE 14: Final sublimation completed');
        
        this.executeCue({
            id: 'cue-14-final',
            trackId: 'sublimation-completed',
            fadeIn: 0.5,
            loop: false,
            onEnd: () => {
                // Chain to CUE-15 with 5-second delay after ending performance
                console.log('🎭 CUE 14 completed - scheduling CUE-15 in 5 seconds');
                setTimeout(() => {
                    this.executeCue15();
                }, 5000); // 5-second delay
            }
        });
    }

    // 🆕 NEW: CUE 15-16: Long Season Sequence
    executeCue15() {
        console.log('🎭 Executing CUE 15: Long Season fade in');
        
        this.executeCue({
            id: 'cue-15-long-season',
            trackId: 'long-season',
            fadeIn: 15.0,              // 10 second fade in as requested
            loop: false,
            volume: 0.85
        });
        
        // Schedule CUE 16 after 30 seconds to end the track
        this.scheduleCue(43.0, { cue: 'CUE-16' }, 'cue-16-trigger');
        
        // Update performance phase
        this.performanceState.currentPhase = 'long-season';
        console.log('🎭 Performance entered Long Season phase');
    }

    executeCue16() {
        console.log('🎭 Executing CUE 16: Long Season fade out and performance end');
        
        const longSeasonTrack = this.tracks.get('long-season');
        if (longSeasonTrack && longSeasonTrack.isPlaying) {
            // Fade out over 5 seconds (using track's configured fadeOut)
            longSeasonTrack.stop(3);
            
            // 🆕 NEW: Emit visual trigger to re-engage overall blackout
            this.emitCrossSystemEvent('black-filter-engage', {
                cueId: 'CUE-16',
                timing: 'immediate',
                reason: 'performance-ending'
            });
            console.log('🌐 Visual trigger sent: Re-engaging overall blackout');
            
            // Schedule performance end after fade completes
            setTimeout(() => {
                this.performanceState.currentPhase = 'complete';
                this.performanceState.isActive = false;
                console.log('🎭 Performance sequence completed with Long Season');
                
                // Emit final completion event
                this.emitCrossSystemEvent('performance-complete', {
                    cueId: 'CUE-16',
                    totalDuration: Date.now() - this.performanceState.startTime,
                    finalPhase: 'long-season-complete'
                });
            }, 5000);
        } else {
            console.warn('🎭 Long Season track not playing, ending performance immediately');
            
            // Still trigger blackout even if track isn't playing
            this.emitCrossSystemEvent('black-filter-engage', {
                cueId: 'CUE-16',
                timing: 'immediate',
                reason: 'performance-ending-immediate'
            });
            console.log('🌐 Visual trigger sent: Re-engaging overall blackout (immediate)');
            
            this.performanceState.currentPhase = 'complete';
            this.performanceState.isActive = false;
        }
    }
    
    // 🆕 NEW: Start complete performance sequence
    startPerformanceSequence() {
        console.log('🎭 startPerformanceSequence() called');
        console.log('🔍 Current performance state before starting:', this.performanceState);
        
        this.performanceState.isActive = true;
        this.performanceState.currentPhase = 'opening';
        this.performanceState.startTime = Date.now();
        
        // 🆕 NEW: Reset cue tracking flags for new performance
        this.performanceState.cue05Executed = false;
        this.performanceState.cue07Triggered = false;
        
        console.log('🎭 Performance state updated:', this.performanceState);
        console.log('🎭 Starting performance sequence - calling executeCue01()');
        
        try {
            this.executeCue01();
            console.log('✅ executeCue01() called successfully');
        } catch (error) {
            console.error('❌ Error calling executeCue01():', error);
        }
    }
    
    // 🆕 NEW: Emergency stop with existing system
    emergencyStop() {
        // Use existing stopAllAudio method
        this.stopAllAudio(0.5);
        
        // Clear all scheduled cues
        this.cueTimers.forEach(timer => clearTimeout(timer));
        this.cueTimers.clear();
        
        // Reset performance state
        this.performanceState.isActive = false;
        this.performanceState.currentPhase = 'stopped';
        
        console.log('🛑 Emergency stop - all cues cancelled');
    }

    // 🆕 NEW: Schedule delayed cue execution
    scheduleCue(delay, cueData, cueId) {
        if (this.cueTimers.has(cueId)) {
            clearTimeout(this.cueTimers.get(cueId));
        }
        
        const timer = setTimeout(() => {
            // Handle scheduled cue execution
            this.handleCueExecution(cueData);
            this.cueTimers.delete(cueId);
        }, delay * 1000);
        
        this.cueTimers.set(cueId, timer);
        console.log(`⏰ Scheduled cue ${cueId} in ${delay}s`);
    }
    
    // 🆕 NEW: Enhanced speed morphing for traffic light
    morphTrafficLightSpeed() {
        const track = this.tracks.get('traffic-light');
        if (!track || !track.isPlaying) return false;
        
        const newRate = Math.min(this.performanceState.trafficLightRate + 0.25, 1.75);
        this.performanceState.trafficLightRate = newRate;
        
        // Use existing speed morphing with smooth transition
        track.setPlaybackRate(newRate, 1.0);
        console.log(`🚦 Traffic light speed increased to ${newRate}x`);
        
        return newRate < 1.75; // Return false when max speed reached
    }
    
    // 🆕 NEW: Cross-system event emission
    emitCrossSystemEvent(eventType, data = {}) {
        if (this.socketConnection) {
            this.socketConnection.emit('cue-visual-trigger', {
                type: eventType,
                timestamp: Date.now(),
                data: data
            });
            console.log(`🌐 Cross-system event: ${eventType}`);
        }
    }
    
    // 🆕 NEW: Reset cue system to initial state
    resetCueSystem() {
        console.log('🔄 Resetting cue system...');
        
        // Stop all audio with quick fade
        this.stopAllAudio(0.5);
        
        // Clear all scheduled cues
        this.cueTimers.forEach(timer => clearTimeout(timer));
        this.cueTimers.clear();
        
        // Reset performance state
        this.performanceState = {
            isActive: false,
            currentPhase: 'idle',
            sdInsertCount: 0,
            trafficLightRate: 0.75,
            cueHistory: [],
            startTime: null,
            cue05Executed: false,         // 🎭 NEW: Track CUE-05 one-time execution
            cue07Triggered: false         // 🎭 NEW: Track CUE-07 one-time execution
        };
        
        // Reset traffic light controller if exists
        if (this.trafficLightController) {
            this.trafficLightController.reset();
        }
        
        console.log('🔄 Cue system reset completed');
    }

    // 🆕 NEW: Enhanced cue execution using existing track system
    async executeCue(cueData) {
        const track = this.tracks.get(cueData.trackId);
        if (!track) {
            console.error(`❌ Cue execution failed: Track ${cueData.trackId} not found`);
            return false;
        }
        
        // Log cue execution
        this.performanceState.cueHistory.push({
            cue: cueData.id || cueData.trackId,
            timestamp: Date.now(),
            trackId: cueData.trackId
        });
        
        console.log(`🎵 Executing cue: ${cueData.id || cueData.trackId}`);
        
        // Configure track settings before playing
        if (cueData.volume !== undefined) {
            track.setVolume(cueData.volume);
        }
        
        if (cueData.loop !== undefined) {
            track.setLoop(cueData.loop);
        }
        
        if (cueData.playbackRate !== undefined) {
            track.setPlaybackRate(cueData.playbackRate, 0);
        }
        
        // Set track end callback for cue chaining
        if (cueData.onEnd && typeof cueData.onEnd === 'function') {
            track.onEnd = cueData.onEnd;
        }
        
        // Use existing play method with fade in parameter
        const fadeIn = cueData.fadeIn || 0;
        const success = track.play(fadeIn);
        
        return success;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SoundManager, AudioTrack, SoundCue, SOUND_CONFIG };
} 