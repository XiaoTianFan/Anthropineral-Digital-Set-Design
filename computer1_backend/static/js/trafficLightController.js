// =============================================================================
// TRAFFIC LIGHT CONTROLLER - Speed morphing handler for traffic light audio
// =============================================================================

class TrafficLightController {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.currentRate = 1;        // Starting speed (slower than normal)
        this.maxRate = 5;           // Maximum speed
        this.rateIncrement = 0.5;     // Speed increase per SD card insertion
        this.isActive = false;         // Whether traffic light is currently playing
    }
    
    start() {
        console.log('🚦 Starting traffic light at 0.75x speed');
        
        // Use existing SoundManager cue execution
        const success = this.soundManager.executeCue({
            id: 'cue-06-traffic-light',
            trackId: 'traffic-light',
            playbackRate: this.currentRate,
            loop: true,
            fadeIn: 0.5,
            volume: 0.8
        });
        
        if (success) {
            this.isActive = true;
            this.soundManager.performanceState.trafficLightActive = true;
        }
        
        return success;
    }
    
    speedUp() {
        if (!this.isActive) {
            console.warn('🚦 Cannot speed up - traffic light not active');
            return false;
        }
        
        if (this.currentRate < this.maxRate) {
            this.currentRate += this.rateIncrement;
            
            // Use existing speed morphing
            const track = this.soundManager.tracks.get('traffic-light');
            if (track && track.isPlaying) {
                track.setPlaybackRate(this.currentRate, 1.0); // 1 second transition
                console.log(`🚦 Traffic light speed increased to ${this.currentRate}x`);
                return true;
            }
        } else {
            console.log('🚦 Traffic light already at maximum speed');
        }
        return false;
    }
    
    fadeOut(duration, callback) {
        if (!this.isActive) {
            console.warn('🚦 Cannot fade out - traffic light not active');
            return;
        }
        
        console.log(`🚦 Fading out traffic light over ${duration}s`);
        
        const track = this.soundManager.tracks.get('traffic-light');
        if (track && track.isPlaying) {
            track.stop(duration);
            if (callback) setTimeout(callback, duration * 1000);
        }
        
        this.isActive = false;
        this.soundManager.performanceState.trafficLightActive = false;
    }
    
    handleSDCardInsert(insertCount) {
        console.log(`🚦 SD Card #${insertCount} inserted - triggering speed increase`);
        
        // Update the sound manager's SD insert count
        if (this.soundManager && this.soundManager.performanceState) {
            this.soundManager.performanceState.sdInsertCount = insertCount;
        }
        
        // Speed up the traffic light
        const success = this.speedUp();
        
        if (success) {
            console.log(`🚦 Traffic light speed increased to ${this.currentRate}x after SD card insertion`);
        } else {
            console.log('🚦 Traffic light speed could not be increased (inactive or at max speed)');
        }
        
        return success;
    }
    
    getCurrentRate() {
        return this.currentRate;
    }
    
    isMaxSpeed() {
        return this.currentRate >= this.maxRate;
    }
    
    reset() {
        this.currentRate = 0.75;
        this.isActive = false;
        console.log('🚦 Traffic light controller reset');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TrafficLightController };
} 