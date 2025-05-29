# Theatre Sound System - Audio Files

This directory contains audio files for the experimental theatre sound system.

## Supported Formats
- **MP3**: Recommended for general use (universal browser support, good compression)
- **WAV**: High quality, uncompressed (larger files)
- **OGG**: Good compression (Firefox/Chrome support)

## Current Configuration
The sound system is configured to load the following audio tracks:

### 1. `ambient-intro.mp3`
- **Usage**: Background ambient sound for Phase 1
- **Loop**: Yes (continuous background)
- **Volume**: 80%
- **Fade In**: 3.0 seconds

### 2. `emergence.wav`
- **Usage**: Sound for eye shape emergence (Phase 2)
- **Loop**: No (one-shot effect)
- **Volume**: 60%
- **Fade In**: 1.0 second

### 3. `convergence-build.mp3`
- **Usage**: Building tension during convergence (Phase 3)
- **Loop**: No (dramatic buildup)
- **Volume**: 90%
- **Fade In**: 0.5 seconds

### 4. `portal-departure.wav`
- **Usage**: Portal departure effect (Phase 5)
- **Loop**: No (final dramatic moment)
- **Volume**: 100%
- **Fade In**: None (immediate)

### 5. `Traffic Light.mp3`
- **Usage**: Manual test track for debug panel testing
- **Loop**: No (test purposes)
- **Volume**: 80%
- **Fade In**: 0.5 seconds

## Adding Audio Files

1. **Place audio files** in this directory with the exact filenames listed above
2. **Test the system** using the keyboard controls:
   - **Right Arrow**: Trigger manual cues
   - **M**: Mute/unmute
   - **+/-**: Volume up/down
   - **Escape**: Emergency stop all audio

## Cue Programming

Sound cues are programmed in `/static/js/soundSystem.js` in the `SOUND_CONFIG` object:

- **Manual cues**: Triggered by Right Arrow key
- **Visual cues**: Automatically triggered by visual phase transitions
- **Auto-following**: Play after previous clip ends
- **Auto-continuing**: Play after previous clip starts

## Browser Compatibility

The sound system uses the Web Audio API for professional audio control:
- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support

**Note**: Modern browsers require user interaction before audio playback. The system will automatically handle this after the first UI interaction.

## Development Testing

For development without audio files, the system will:
- Show loading errors in the console (this is normal)
- Continue to function for visual-only testing
- Display sound system status in debug messages

To enable full testing:
1. Add audio files with the correct names
2. Refresh the page
3. Check debug messages for "🎵 Sound system initialized successfully"
4. Test keyboard controls and visual triggers 