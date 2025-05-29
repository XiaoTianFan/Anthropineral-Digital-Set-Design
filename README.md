# Experimental Theatre Digital Program

A digital program for experimental theatre that processes audience photos and creates interactive visual displays using real-time eye detection and organic morphing 3D animations.

## Project Overview

This system consists of:
1. **🤖 SD Card Auto-Import Pipeline**: Automatically detects camera SD cards and imports new images with real-time progress tracking
2. **Image Processing Pipeline**: Automatically detects faces and crops eyes from photos using OpenCV
3. **✨ Professional Bloom Visual Effects System**: Advanced 4-phase configurable 3D animations with constant bloom emission, enhanced flow dynamics, eye-textured shapes, and dynamic orbital camera controls
4. **🔄 Organic Shape Morphing System**: Real-time vertex noise morphing creates constantly changing, living eye-textured shapes that breathe and pulse with organic movement
5. **🎨 Client-Side Artistic Texture Processing**: Real-time B&W edge detection transforms raw eye images into dramatic high-contrast textures with 12+ adjustable parameters
6. **🖼️ Real-Time Texture Display Gallery**: Live preview gallery showing processed textures in their original aspect ratios with interactive controls
7. **📷 Dynamic Camera Rotation System**: Progressive speed-up camera rotation (0.1x to 1.0x) that accelerates with audience participation
8. **Real-time Communication**: Socket.IO for live updates between all system components
9. **File Monitoring**: Automatic processing of new images with comprehensive status tracking

## Current Status

### ✅ **Milestone 11: Organic Shape Morphing System - COMPLETED** 🔄
- **🌱 Living Eye Shapes**: Revolutionary vertex noise morphing system creating organic, constantly changing 3D shapes that appear alive and breathing
- **🔄 Organic Vertex Displacement**: Real-time vertex noise using multi-octave mathematical functions (sine/cosine waves) for natural, flowing movement
- **🎭 Simplified Architecture**: Focused on vertex noise rather than complex geometric morphing for better performance and more organic results
- **🎛️ Advanced Morphing Controls**: Complete UI control panel with 5 real-time adjustable parameters:
  - **Noise Animation Speed** (0.1-2.0): Controls how fast the vertex noise animates over time
  - **Noise Intensity** (0.0-1.0): Overall strength of vertex displacement effects
  - **Noise Frequency** (0.5-5.0): Detail level of noise pattern (higher = more intricate deformation)
  - **Noise Amplitude** (0.01-0.5): Maximum displacement distance for individual vertices
  - **Global Enable/Disable**: Master switch for the entire morphing system
- **🎨 Base Shape Variety**: Each morphing shape randomly chooses between cube or bipyramid as foundation, maintaining original shape recognition while adding organic movement
- **⚡ High-Performance Implementation**: Optimized vertex manipulation with original vertex preservation and efficient normal recalculation
- **🔍 Advanced Debugging System**: Comprehensive debugging tools including:
  - **Vertex Storage Verification**: Logs when vertices are stored and validates geometry data
  - **Displacement Tracking**: Real-time monitoring of maximum displacement values being applied
  - **Extreme Test Mode**: Debug button for dramatic wobbling to verify system functionality
  - **Performance Logging**: Tracks morphing activity, timer progression, and effect intensity
- **🌊 Phase Integration**: Seamless integration with existing visual phases and convergence animations
- **💫 Organic Appearance**: Creates breathing, pulsing, living shapes that enhance the theatrical experience with subtle but noticeable movement
- **🎪 Theatre-Ready**: Production-optimized settings providing dramatic organic movement without overwhelming the core eye-texture visibility
- **⚙️ Memory Efficient**: Smart original vertex storage and disposal system prevents memory leaks during long performances
- **🔄 Reset Capability**: Complete reset to original geometry during convergence reset and shape disposal

### ✅ **Milestone 10: Dynamic Camera Rotation System - COMPLETED** 📷
- **🎬 Progressive Camera Animation**: Revolutionary camera system that builds energy as audience participates
- **📈 Speed-Based Progression**: Camera rotation speed increases from 10% to 100% based on number of eye shapes (0 to 40 shapes)
- **🌍 3D Orbital Motion**: Both horizontal continuous rotation and vertical oscillating motion for dynamic cinematic experience
- **⚡ Real-Time Speed Calculation**: `speed = 0.1 + (currentShapes/maxShapes) * 0.9` provides smooth acceleration curve
- **🎛️ Comprehensive UI Monitoring**: Live camera rotation status with color-coded indicators:
  - **🟢 Slow (10-30%)**: Green progress bar and "Slow Rotation" status
  - **🟡 Medium (30-70%)**: Yellow progress bar and "Medium Rotation" status  
  - **🔴 Fast (70-100%)**: Red progress bar and "Fast Rotation" status
- **📊 Live Performance Metrics**: Real-time display of current speed percentage, shape count (current/max), and rotation status
- **✨ Animated Progress Bar**: Shimmer effect and smooth transitions with hover interactions
- **🎪 Theatre Integration**: Creates direct connection between audience participation and visual energy
- **⚙️ Configurable Parameters**: Base speeds, oscillation range, and visual feedback all easily adjustable
- **🎮 User Interaction Friendly**: Camera system works seamlessly with mouse grab orbital controls

### ✅ **Milestone 9: Client-Side Artistic Texture Processing System - COMPLETED** 🎨
- **🎨 Complete Artistic Processing Pipeline**: Revolutionary client-side system transforming raw eye images into dramatic B&W edge-detected textures
- **🔥 Real-Time Edge Detection**: Three sophisticated algorithms (Sobel, Roberts, Prewitt) with live processing on user devices
- **⚡ High-Performance Processing**: Off-screen canvas with smart caching, size optimization, and efficient memory management  
- **🎛️ Comprehensive UI Controls**: 12+ real-time adjustable parameters with live preview and instant texture reprocessing
- **🎭 Artistic Enhancement Pipeline**: Grayscale conversion → Contrast enhancement → Noise reduction → Edge detection → Artistic styling → Smoothing
- **💫 3D Integration Features**: Emissive glow effects, material enhancement, and bloom-compatible texture mapping
- **🚀 Advanced Configuration System**: Multiple edge detection methods, contrast/gamma controls, artistic styling options, and performance optimization
- **🎪 Production-Ready Interface**: Professional control panel with reset defaults, cache management, and real-time parameter adjustment
- **🔧 Smart Caching System**: Intelligent texture caching with settings-based cache keys for optimal performance
- **✨ Enhanced Visual Impact**: Dramatic black & white edge outlines create striking contrast for professional theatre presentation
- **🖼️ Real-Time Texture Display Gallery**: Complete live preview system with sophisticated texture management:
  - **📸 Live Processing Preview**: Instant display of processed textures as new eye images are uploaded and processed
  - **🎨 Unique Texture Rendering**: Fixed canvas reuse issue - each texture now displays its own unique processed content
  - **📐 Original Aspect Ratio Display**: Images shown in natural proportions instead of forced squares for authentic presentation
  - **🗂️ Compact Gallery Layout**: Three textures per row with optimal spacing for efficient screen usage
  - **🔄 Auto-Refresh Controls**: Configurable automatic gallery updates when new images are processed (1-10 second intervals)
  - **⚙️ Interactive Gallery Management**: Manual refresh, clear gallery, and download latest texture controls
  - **📊 Live Status Tracking**: Real-time display of texture count, processing status, and last update timestamp
  - **🎯 Enhanced User Experience**: Hover effects, loading indicators, and smooth transitions for professional presentation
  - **💾 Download Capability**: One-click download of latest processed texture for external use
  - **🔍 Texture Inspection**: Click-to-enlarge functionality for detailed texture examination

### ✅ **Milestone 8: Enhanced Flow Dynamics System - COMPLETED** 🌊
- **🌊 Revolutionary Particle Physics**: Complete flow dynamics system with 6 sophisticated force mechanisms preventing particle clustering and creating organic motion
- **⚖️ Balanced vs Simple Attraction**: Two distinct attraction modes with force balancing to distribute particles evenly among multiple eye shapes
- **🔄 Dynamic Force Management**: Advanced force coordination preventing any single shape from monopolizing all particles
- **🌀 Circulation Forces**: Particles flow **around** shapes in tangential motion rather than just toward them, creating natural streaming effects
- **💨 Global Flow Field**: Animated background "current" system providing continuous motion with configurable noise patterns
- **🌪️ Enhanced Turbulence**: Natural randomness and organic movement patterns with configurable strength
- **⚡ Escape Velocity System**: Fast particles can break free from attractor influence and explore other regions
- **🛡️ Repulsion Zones**: "Bubble" effects around shapes preventing particle trapping and maintaining dynamic flow
- **🎛️ Real-time Toggle Control**: Debug panel switch to compare simple vs enhanced flow systems instantly
- **🎪 Phase 4 Extensions**: Enhanced shell effect and dispersion burst with uniform particle distribution

### ✅ **Milestone 7: Global Keyboard Trigger System - COMPLETED** 🎹
- **🎹 Global Hotkey Support**: Complete keyboard trigger system using Python `keyboard` library for system-wide detection
- **⬇️ Down Arrow Trigger**: Configured to use down arrow key as the animation trigger (easily configurable)
- **🛡️ Safety Mechanisms**: 2-second cooldown prevents accidental double-triggers during live performance
- **📡 Real-time Integration**: Immediate Socket.IO event emission to all connected clients when trigger is activated
- **📊 Status Monitoring**: Live keyboard listener status display in web interface (Active/Inactive)
- **🧵 Background Operation**: Runs in separate thread without blocking main server operations
- **🎭 Theatre Integration**: Professional control allowing operators to trigger convergence animation seamlessly
- **🔄 Source Tracking**: Animation events include source information (keyboard vs. manual trigger)
- **🌐 Non-intrusive**: Global hotkey works regardless of active window or application focus
- **⚙️ Error Resilience**: Comprehensive error handling with graceful degradation if keyboard system fails

### ✅ **Milestone 6: Constant Bloom Emission System - COMPLETED** 🌟
- **✨ Professional Bloom Post-Processing**: Complete Three.js UnrealBloomPass integration with EffectComposer pipeline
- **💡 Constant Light Emission**: Particles now act like individual light bulbs with continuous bloom glow (similar to Max jit.gl bloom)
- **🎛️ Advanced Bloom Configuration**: Optimized settings (intensity: 1.2, threshold: 0.2, radius: 0.8) for strong constant emission
- **⚙️ Real-time Bloom Controls**: Debug panel toggles for bloom post-processing and constant emission settings
- **🔧 Enhanced Material System**: Particles use emissive materials (0x666666 base, 1.2 intensity) for consistent bloom source
- **📈 Performance Optimization**: Adaptive quality settings (low/medium/high) with automatic performance monitoring
- **🎪 Theatre-Ready Effects**: Constant bloom emission creates dramatic light-bulb effect for professional visual impact
- **💎 No Periodical Variations**: Pure constant emission without pulsing - consistent bloom glow like Max jit.gl
- **🎨 Enhanced Visual Fidelity**: Lower bloom threshold captures more particle light, higher intensity for stronger glow effect
- **📊 Quality Control**: Configurable bloom resolution and exposure settings for different performance requirements

### ✅ **Milestone 5: Advanced Configurable Visual Effects - COMPLETED** 🎉
- **🎛️ Complete Configuration System**: All 40+ visual parameters centrally configurable via `VISUAL_CONFIG` object
- **🌊 Enhanced Flow Dynamics System**: Revolutionary particle flow system with 6 sophisticated force mechanisms that prevents belt formation and ensures dynamic motion around all shapes
- **🎛️ Real-time Flow Control**: Debug panel toggle to switch between simple attraction and advanced flow systems for easy comparison
- **🌀 Enhanced Phase 1**: Particles now start distributed throughout space with center attraction (no more lifetime mechanism)
- **🎨 Advanced Particle System**: Distance-based opacity, configurable colors, rendering quality, and distribution patterns
- **⚙️ Flexible Rendering**: Configurable sphere geometry detail, material properties, and performance optimization settings
- **🎭 Enhanced Scene Control**: Configurable camera, lighting, background, and animation parameters
- **🎮 Interactive Orbital Controls**: Mouse grab orbital view with configurable auto-rotation for dynamic theatrical presentation
- **🔧 Easy Customization**: Artist-friendly configuration without code diving - all parameters documented and accessible
- **📊 Performance Tuning**: Configurable particle counts, shape limits, and rendering quality for different hardware
- **🎯 Precise Control**: Fine-grained control over attraction forces, easing curves, and animation timings

### ✅ **Milestone 4: Visual Effects System - COMPLETED** 🎉
- **🎭 Complete 3-Phase Interactive Experience**: Full visual effects system with particle dynamics and eye-textured animations
- **🎭 Advanced Configurable 3D Visual Effects System**
  1. **Phase 1 - Enhanced Particle Foundation**: Particles distributed in space with center attraction and depth-based brightness
  2. **Phase 2 - Eye Shape Integration**: Real eye images mapped as textures on orbiting 3D shapes with particle attraction
  3. **🎨 Artistic Texture Processing**: Client-side edge detection transforms raw eye images into dramatic B&W outlines with high contrast
  4. **Phase 3 - Convergence Animation**: Dramatic convergence with speed acceleration and completion detection
  5. **Phase 4a - Dispersion Burst**: Explosive outward particle fountain in uniform directions creating dramatic fountain effect
  6. **Phase 4b - Shell Formation**: Particles form protective shell around converged shapes with dynamic turbulence and center attraction
  7. **🎹 Global Keyboard Triggers**: Press **Down Arrow** key from anywhere on the server computer to instantly trigger convergence animation (2-second cooldown prevents double-triggers)
  8. **✨ Constant Bloom Emission**: Professional post-processing bloom effects where each particle acts like a light bulb (similar to Max jit.gl bloom)
  9. **📷 Dynamic Camera Rotation**: Progressive speed-up orbital camera system that accelerates with audience participation (10% to 100% speed based on shape count)
  10. **🌊 Enhanced Flow Dynamics**: Revolutionary particle physics with 6 force mechanisms:
      - **⚖️ Balanced Attraction**: Force balancing prevents any single shape from monopolizing particles
      - **🌀 Circulation Forces**: Particles flow around shapes in tangential motion, not just toward them
      - **🛡️ Repulsion Zones**: Creates "bubbles" around shapes preventing particle trapping
      - **💨 Global Flow Field**: Animated background current providing continuous organic motion
      - **🌪️ Smart Turbulence**: Natural randomness with configurable intensity
      - **⚡ Escape Velocity**: Fast particles can break free and explore other regions
  11. **🎨 Real-Time Artistic Controls**: Live adjustment of edge detection, contrast, gamma, and artistic styling parameters
  12. **🎛️ Real-time Flow Control**: Debug panel toggle to switch between simple and enhanced flow systems instantly
  13. **Automatic Phase Transitions**: System automatically detects eye images and transitions between phases
  14. **🎛️ Full Configuration Control**: All visual parameters easily customizable via centralized config object including artistic processing settings
  15. **Performance Optimized**: Smooth rendering with configurable particle counts (2000 default) and shape limits (40 default)
  16. **Reset Capability**: "Reset Animation" button to restart convergence for multiple performances

### ✅ **Milestone 3: SD Card Auto-Import System - COMPLETED** 🌟
- **🤖 Complete Auto-Import Pipeline**: SD Card → Detection → Import → Eye Processing → Real-time Display
- **Intelligent SD Card Detection**: Camera-specific folder recognition (DCIM, 102EOS5D, etc.) using psutil
- **Background Import System**: Multi-threaded file copying with concurrent processing and real-time progress
- **Duplicate Prevention**: SHA-256 hash-based detection prevents re-importing same files
- **Professional UI**: Configuration panel with toggle switches, progress bars, and live status indicators
- **Auto-Import Configuration**: Web-based controls with robot emoji indicators (🤖) for auto-import operations
- **Error Handling**: Comprehensive recovery mechanisms and retry logic
- **Seamless Integration**: Automatic trigger of eye detection pipeline when images are imported

### ✅ **All Previous Milestones Completed**
- **Image Processor**: Complete OpenCV face/eye detection with fallback generation ✅
- **File Monitoring**: Automatic processing using watchdog when new images are added ✅
- **Real-time Updates**: Socket.IO integration for live status and image notifications ✅
- **Client Interface**: Responsive web client with status indicators and debugging tools ✅
- **Eye Images Display**: Automatic loading of existing eye images with real-time updates ✅
- **Status Communication**: All initialization bugs resolved, both startup methods work correctly ✅

### 🎉 **CORE THEATRE AUTOMATION COMPLETE**
All essential features for live theatre production are now fully implemented and operational:
- ✅ **SD Card Auto-Import**: Automatic detection and background processing
- ✅ **Eye Detection & Processing**: Real-time image processing pipeline  
- ✅ **🎨 Client-Side Artistic Processing**: Real-time B&W edge detection with professional control panel
- ✅ **📷 Dynamic Camera Rotation**: Progressive speed-up system connected to audience participation
- ✅ **3D Visual Effects**: Professional configurable animation system with constant bloom
- ✅ **🌊 Enhanced Flow Dynamics**: Revolutionary 6-mechanism particle physics system
- ✅ **Keyboard Triggers**: Global hotkey system for live performance control
- ✅ **Real-time Communication**: Complete Socket.IO integration

### 🎪 **Live Theatre Operation Workflow**
1. **🎬 Setup**: Start server, open web client on display computer
2. **📸 Image Collection**: Insert camera SD card → Automatic detection and import
3. **👁️ Processing**: Real-time eye detection and artistic texture processing
4. **🔄 Organic Animation**: Eye shapes begin morphing with vertex noise, creating living, breathing appearance
5. **🎨 Visual Development**: Progressive camera rotation accelerates as more audience eyes appear with organic movement
6. **🎹 Performance Control**: Down arrow key triggers dramatic convergence animation with morphing shapes
7. **✨ Visual Spectacle**: Professional bloom effects, flow dynamics, organic morphing, and dynamic camera create engaging theatre experience
8. **🔄 Reset**: Easy animation reset for multiple performances (morphing shapes return to original geometry)

The system is now **production-ready** for live theatre implementation with all core functionality operational and tested.

### 🔄 **Optional Enhancements**
1. **Production Deployment**: Server configuration for permanent installation
2. **User Training**: Materials for theatre operators
3. **Performance Optimization**: Additional fine-tuning for specific hardware
4. **🎨 Advanced Artistic Effects**: Additional filter algorithms and texture enhancement options

## Technical Architecture

### **🎭 Advanced Configurable Visual Effects System** 
1. **🎛️ Complete Configuration System**: All 40+ visual effects parameters controlled via centralized `VISUAL_CONFIG` object
2. **🌀 Enhanced Phase 1**: Particles distributed in space with center attraction (lifetime mechanism removed for infinite persistence)
3. **🎨 Advanced Particle System**: Distance-based opacity, configurable colors (HSL), distribution patterns, and initial velocities
4. **⚙️ Flexible Rendering**: Configurable sphere geometry detail, material properties, and blending modes
5. **🎭 Eye Shape Integration**: Real eye images as textures on configurable 3D shapes (cube, bipyramid, pentagon)
6. **🔄 Organic Shape Morphing**: Revolutionary vertex noise system creating constantly changing, living eye-textured shapes with real-time displacement
7. **🎪 Convergence Animation**: Customizable duration, target radius, speed multipliers, and easing curves
8. **🔧 Scene Control**: Configurable camera (FOV, position, clipping), lighting (ambient, directional), and background
9. **📊 Performance Optimization**: Configurable limits for particles, shapes, and rendering quality
10. **🎯 Precise Attraction Forces**: Fine-grained control over attraction strength, drag coefficients, and intensity scaling
11. **🎨 Material System**: Configurable placeholder and loaded material properties for eye shapes
12. **🌊 Enhanced Flow Dynamics System**: Revolutionary 6-mechanism particle flow system preventing belt formation with configurable force balancing, repulsion, circulation, flow fields, turbulence, and escape velocity
13. **💥 Phase 4 Extensions**: Dispersion burst effect with uniform particle distribution and shell formation with dynamic turbulence

### **🔄 Organic Shape Morphing System**
**Revolutionary vertex noise morphing creating living, breathing 3D eye-textured shapes**

#### **Technical Implementation:**
- **Multi-Octave Noise Functions**: Combines sine/cosine waves with position and time variables for organic movement
- **Original Vertex Preservation**: Stores original geometry for reset capability and displacement calculation
- **Real-time Vertex Manipulation**: Modifies vertex positions every frame with configurable displacement
- **Smart Normal Recalculation**: Maintains proper lighting by recalculating surface normals after vertex changes
- **Memory Efficient**: Optimized vertex storage and disposal preventing memory leaks

#### **Morphing Configuration:**
```javascript
morphing: {
    enabled: true,                // Master enable/disable switch
    speed: 0.3,                   // Animation speed multiplier (0.1-2.0)
    intensity: 0.2,               // Overall displacement strength (0.0-1.0)
    targets: ['cube', 'bipyramid'], // Base shape types (randomly chosen per shape)
    advanced: {
        noiseFrequency: 2.0,      // Detail level of noise pattern (0.5-5.0)
        noiseAmplitude: 0.1,      // Maximum vertex displacement (0.01-0.5)
        timeScale: 1.0,           // Time scaling for noise animation
        preserveTexture: true,    // Maintain texture mapping during morphing
        memoryOptimization: true  // Enable efficient vertex management
    }
}
```

#### **Morphing Features:**
- **🌱 Living Appearance**: Shapes appear to breathe and pulse with organic movement
- **🎨 Base Shape Variety**: Random selection between cube and bipyramid geometries
- **⚡ High Performance**: Optimized for real-time rendering during live performance
- **🔄 Phase Integration**: Works seamlessly with convergence animations and reset cycles
- **🎛️ Real-time Controls**: All parameters adjustable via debug panel during performance
- **🔍 Debug Tools**: Comprehensive logging and extreme test mode for troubleshooting

### **Current Optimized Configuration:**
```javascript
// Current production settings (optimized for theatre performance):
particles: {
    count: 2000,                  // Enhanced particle density for dramatic effect
    size: 0.01,                   // Size of individual particles (sphere radius)
    resetDistance: 6,             // Distance from center before particle resets
    depthEffect: {
        maxDistance: 6,           // Maximum distance for depth brightness calculation
        dimming: 0.1              // How much to dim far particles (0-1)
    },
    distribution: {
        radiusMultiplier: 0.6,    // Percentage of reset distance for initial distribution
        initialSpeed: 0.8         // Initial random velocity speed
    },
    color: {
        hueBase: 0.6,             // Base hue for particle colors (blue-cyan range)
        hueVariation: 0.2,        // Random hue variation range
        saturation: 0.3,          // Color saturation
        lightness: 0.95           // Color lightness for bloom emission
    },
    opacity: {
        minimum: 0.4,             // Minimum opacity for far particles
        falloffRate: 0.3          // How quickly opacity falls off with distance
    },
    rendering: {
        sphereDetail: {
            widthSegments: 8,     // Sphere geometry width segments
            heightSegments: 6     // Sphere geometry height segments
        },
        material: {
            baseOpacity: 0.9,     // Base material opacity for bloom emission
            color: 0xffffff       // Base material color
        }
    }
},

// Dynamic Camera Rotation System
scene: {
    camera: {
        fov: 75,                  // Camera field of view
        near: 0.1,                // Camera near clipping plane
        far: 1000,                // Camera far clipping plane
        position: { z: 4 }        // Camera Z position
    },
    controls: {
        custom3DRotation: {
            enabled: true,        // Enable custom 3D rotation
            horizontalSpeed: 0.5, // Horizontal rotation speed (base)
            verticalSpeed: 0.4,   // Vertical rotation speed (base)
            verticalRange: 0.8,   // Vertical oscillation range (0-1)
            verticalOffset: Math.PI/2, // Vertical center position
            timeScale: 1.0        // Overall time scaling for rotation
        }
    }
},

// Enhanced System Limits
system: {
    maxShapes: 40,                // Maximum number of eye shapes
    maxEyeImages: 40,             // Maximum eye images to keep in UI
    shapeTypes: ['cube', 'bipyramid'] // Available shape types
}
```

#### 🎪 **Eye Shape Configuration**
```javascript
shapes: {
    sizes: {
        cube: 0.5,                // Size of cube shapes
        bipyramid: 0.4,           // Size of bipyramid shapes
        pentagon: {               // Pentagon (pentagonal prism) sizes
            radius: 0.4,
            height: 0.4
        }
    },
    orbital: {
        radius: {
            min: 1.5,             // Minimum orbital radius from center
            max: 3.5              // Maximum orbital radius from center
        },
        speed: {
            min: 0.3,             // Minimum orbital speed
            max: 0.8              // Maximum orbital speed
        }
    },
    rotation: {
        speed: 0.015,             // Base rotation speed for shapes
        convergenceMultiplier: 2   // Rotation speed multiplier during convergence
    },
    convergence: {
        duration: 10,             // Duration of convergence animation (seconds)
        targetRadius: 0.5,        // Final radius at center during convergence
        speedMultiplier: 4.0,     // Speed multiplication during convergence
        scaleMultiplier: 0.5,     // Scale increase during convergence
        intensity: {
            baseMin: 0.8,         // Base minimum intensity during convergence
            baseMax: 0.4,         // Additional intensity range during convergence
            maxMultiplier: 2.0    // Maximum intensity multiplier for particles
        }
    },
    material: {
        placeholder: {
            color: 0x888888,      // Placeholder material color before texture loads
            opacity: 0.8         // Placeholder material opacity
        },
        loaded: {
            color: 0xffffff       // Color when texture is loaded
        }
    }
}
```

#### ⚡ **Enhanced Attraction Forces**
```javascript
attraction: {
    baseStrength: 0.08,           // Base attraction force strength
    maxStrength: 0.8,             // Maximum attraction force cap
    minDistance: 0.1,             // Minimum distance to avoid division by zero
    distanceOffset: 0.2,          // Distance offset for force calculation
    drag: {
        normal: 0.9,              // Normal drag multiplier (less = more drag)
        intense: 0.95             // Drag during intense convergence
    },
    intensityThreshold: 1.5,      // Threshold for switching to intense mode
    centerAttraction: {
        intensity: 1.0            // Intensity of center attraction in Phase 1
    },
    // Enhanced flow dynamics
    flowDynamics: {
        enabled: true,            // Enable enhanced flow system
        turbulenceStrength: 0.3,  // Random turbulence force strength
        repulsionRadius: 0.4,     // Distance at which repulsion starts
        repulsionStrength: 0.1,   // Strength of repulsion force
        circulationStrength: 0.1, // Strength of tangential circulation force
        distributionRadius: 2.0,  // Radius for spatial distribution
        forceBalancing: true,     // Enable force balancing between attractors
        escapeVelocity: 0.2,      // Minimum velocity to escape attractor influence
        flowField: {
            enabled: true,        // Enable global flow field
            strength: 0.1,        // Global flow field strength
            scale: 0.5,           // Scale of flow field noise
            timeScale: 1.0        // Time scaling for flow field animation
        }
    },
    // Enhanced dispersion effect
    dispersionEffect: {
        enabled: true,            // Enable dispersion burst effect
        duration: 2.0,            // Duration of dispersion burst (seconds)
        burstStrength: 0.4,       // Initial outward burst force strength
        randomization: 1.0,       // Amount of randomization in burst direction
        velocityMultiplier: 3.0,  // Velocity multiplier during burst
        dragReduction: 0.5,       // Reduced drag during dispersion (more = less drag)
        centerRepulsion: 0.2,     // Additional repulsion from center during burst
        resetThreshold: 0.9,      // Progress threshold to trigger particle resets
        newParticleSpeed: 2.0     // Speed for newly reset particles during dispersion
    }
}
```

**🌊 Flow Dynamics Features:**
- **⚖️ Balanced vs Simple Attraction**: Two distinct modes with intelligent force distribution
  - **Balanced Mode**: Prevents any single shape from monopolizing particles by reducing dominant attractor influence
  - **Simple Mode**: Direct inverse-square law attraction for dramatic clustering effects
- **🌀 Circulation Forces**: Makes particles flow **around** shapes in tangential motion rather than just toward them
- **🛡️ Repulsion Zones**: Creates dynamic "bubbles" around shapes preventing particle trapping and belt formation
- **💨 Global Flow Field**: Provides animated background "current" using noise-based flow for continuous organic motion
- **🌪️ Smart Turbulence**: Adds natural randomness and organic movement patterns with configurable intensity
- **⚡ Escape Velocity**: Allows fast particles to break free from attractor influence and explore other regions
- **💥 Dispersion Burst**: Dramatic explosive outward particle fountain with uniform distribution in all directions
- **🛡️ Shell Formation**: Particles form protective shell around converged shapes with dynamic stabilization forces

#### 🎬 **Scene & Camera Control**
```javascript
scene: {
    background: 0x0a0a0a,         // Scene background color
    lighting: {
        ambient: {
            color: 0x404040,      // Ambient light color
            intensity: 0.6        // Ambient light intensity
        },
        directional: {
            color: 0xffffff,      // Directional light color
            intensity: 0.8        // Directional light intensity
        }
    },
    camera: {
        fov: 75,                  // Camera field of view
        near: 0.1,                // Camera near clipping plane
        far: 1000,                // Camera far clipping plane
        position: { z: 5 }        // Camera Z position
    },
    // 🎮 Orbital Controls Configuration
    controls: {
        enableDamping: true,      // Enable smooth damping (inertia)
        dampingFactor: 0.05,      // Damping factor for smooth interactions
        screenSpacePanning: false, // Disable screen space panning
        minDistance: 1,           // Minimum zoom distance
        maxDistance: 20,          // Maximum zoom distance
        maxPolarAngle: Math.PI,   // Allow full vertical rotation
        autoRotate: true,         // Auto-rotate the camera
        autoRotateSpeed: 1.0      // Auto-rotation speed (revolutions per minute)
    }
}
```

#### 🎭 **Animation System**
```javascript
animation: {
    placeholder: {
        rotationSpeed: 0.01,      // Rotation speed for placeholder meshes
        flowMotion: 0.002         // Flow motion amplitude during triggered animation
    },
    easing: {
        cubicFactor: 4,           // Factor for cubic easing
        cubicSubtract: 2,         // Subtraction factor for cubic easing
        cubicDivide: 2            // Division factor for cubic easing
    }
}
```

#### 📊 **System Limits**
```javascript
system: {
    maxShapes: 30,                // Maximum number of eye shapes
    shapeTypes: ['cube', 'bipyramid', 'pentagon'],  // Available shape types
    maxEyeImages: 30              // Maximum eye images to keep in UI
}
```

### **Image Processing Pipeline**
1. **Input**: Images placed in `data/originals/` folder (manually or via SD card auto-import)
2. **Processing**: OpenCV Haar cascade face/eye detection
3. **Output**: Cropped eye images saved to `data/cropped_eyes/`
4. **Notification**: Real-time Socket.IO events to connected clients
5. **Fallback**: Dummy eye generation when detection fails
6. **🎭 Animation Integration**: Automatic creation of textured 3D shapes for new eye images

### **🤖 SD Card Auto-Import System** 
1. **Detection**: Intelligent SD card recognition using psutil with camera-specific folder patterns
2. **Monitoring**: Background polling for drive changes and SD card insertion/removal
3. **Import Engine**: Multi-threaded file copying with SHA-256 duplicate prevention
4. **Progress Tracking**: Real-time status updates via Socket.IO with progress bars
5. **Configuration**: Web-based toggle controls with live status indicators
6. **Integration**: Seamless trigger of image processing pipeline for imported files
7. **Error Handling**: Comprehensive recovery mechanisms and user feedback

### **Eye Images Display System**
- **Automatic Loading**: Existing eye images load when clients connect
- **Real-time Updates**: New processed images appear immediately
- **🎭 Animation Integration**: New eye images instantly create orbiting 3D shapes
- **Smart Ordering**: Existing images chronological, new images at top
- **Collapsible Interface**: Eye images section in debug panel
- **Manual Refresh**: Button to reload existing images
- **Image Limits**: Maximum 30 images displayed at once (configurable)

### **Real-time Communication**
- **Socket.IO Events**: 
  - `connection_status`: System status updates including SD card monitoring status
  - `new_eye_image_available`: New processed eye images with automatic shape creation
  - `trigger_final_animation`: Animation trigger events for convergence
  - `sd_card_detected`: SD card insertion with card information
  - `sd_card_removed`: SD card removal notifications
  - `auto_import_started`: 🤖 Auto-import initiation with card details
  - `auto_import_completed`: 🤖 Auto-import completion with import statistics
  - `auto_import_error`: 🤖 Auto-import error notifications
  - `import_progress`: Real-time import progress updates with file counts and percentages
  - Client request events for testing, status, and manual SD card operations

### **File Structure**
```
computer1_backend/
├── main_server.py          # Main Flask server with image processor and SD card integration
├── image_processor.py      # OpenCV face/eye detection and file monitoring  
├── sd_card_monitor.py      # 🤖 SD card detection, monitoring, and auto-import system
├── run.py                  # Server startup script (recommended)
├── test_auto_import.py     # Test script for SD card auto-import functionality
├── requirements.txt        # Python dependencies
├── data/
│   ├── originals/          # Input images (monitored folder, auto-import destination)
│   └── cropped_eyes/       # Processed eye images (served to client)
├── static/
│   ├── js/                 # Client-side JavaScript with 🎭 complete configurable 3D visual effects
│   ├── css/                # Styling including auto-import configuration controls
│   └── other_images_for_animation/  # Assets for 3D animations
└── templates/
    └── index.html          # Main client interface with SD card management panel
```

## 🔧 Complete Visual Effects Configuration System

### 🎛️ **Centralized Configuration Interface**

All visual effects parameters can be easily customized by editing the `VISUAL_CONFIG` object at the top of `Program/computer1_backend/static/js/client.js`. This comprehensive system provides control over 35+ parameters without needing to search through code!

### **Configuration Categories**

#### 🎨 **Enhanced Particle System**
```javascript
particles: {
    count: 500,                    // Total number of particles
    size: 0.03,                   // Individual particle size (sphere radius)
    resetDistance: 10,            // Distance from center before particle resets
    depthEffect: {
        maxDistance: 10,          // Maximum distance for depth brightness
        dimming: 0.2              // How much to dim far particles (0-1)
    },
    distribution: {
        radiusMultiplier: 0.7,    // Percentage of reset distance for initial distribution
        initialSpeed: 0.5         // Initial random velocity speed
    },
    color: {
        hueBase: 0.6,             // Base hue for particle colors
        hueVariation: 0.2,        // Random hue variation range
        saturation: 0.3,          // Color saturation
        lightness: 0.9            // Color lightness (user-customized)
    },
    opacity: {
        minimum: 0.4,             // Minimum opacity for far particles (user-customized)
        falloffRate: 0.5          // How quickly opacity falls off with distance (user-customized)
    },
    rendering: {
        sphereDetail: {
            widthSegments: 8,     // Sphere geometry width segments
            heightSegments: 6     // Sphere geometry height segments
        },
        material: {
            baseOpacity: 0.8,     // Base material opacity
            color: 0xffffff       // Base material color
        }
    }
}
```

#### 🎪 **Eye Shape Configuration**
```javascript
shapes: {
    sizes: {
        cube: 0.5,                // Size of cube shapes
        bipyramid: 0.4,           // Size of bipyramid shapes
        pentagon: {               // Pentagon (pentagonal prism) sizes
            radius: 0.4,
            height: 0.4
        }
    },
    orbital: {
        radius: {
            min: 1.5,             // Minimum orbital radius from center
            max: 3.5              // Maximum orbital radius from center
        },
        speed: {
            min: 0.3,             // Minimum orbital speed
            max: 0.8              // Maximum orbital speed
        }
    },
    rotation: {
        speed: 0.015,             // Base rotation speed for shapes
        convergenceMultiplier: 2   // Rotation speed multiplier during convergence
    },
    convergence: {
        duration: 10,             // Duration of convergence animation (seconds)
        targetRadius: 0.5,        // Final radius at center during convergence
        speedMultiplier: 4.0,     // Speed multiplication during convergence
        scaleMultiplier: 0.5,     // Scale increase during convergence
        intensity: {
            baseMin: 0.8,         // Base minimum intensity during convergence
            baseMax: 0.4,         // Additional intensity range during convergence
            maxMultiplier: 2.0    // Maximum intensity multiplier for particles
        }
    },
    material: {
        placeholder: {
            color: 0x888888,      // Placeholder material color before texture loads
            opacity: 0.8         // Placeholder material opacity
        },
        loaded: {
            color: 0xffffff       // Color when texture is loaded
        }
    }
}
```

#### ⚡ **Enhanced Attraction Forces**
```javascript
attraction: {
    baseStrength: 0.08,           // Base attraction force strength
    maxStrength: 0.8,             // Maximum attraction force cap
    minDistance: 0.1,             // Minimum distance to avoid division by zero
    distanceOffset: 0.2,          // Distance offset for force calculation
    drag: {
        normal: 0.9,              // Normal drag multiplier (less = more drag)
        intense: 0.95             // Drag during intense convergence
    },
    intensityThreshold: 1.5,      // Threshold for switching to intense mode
    centerAttraction: {
        intensity: 1.0            // Intensity of center attraction in Phase 1
    },
    // Enhanced flow dynamics
    flowDynamics: {
        enabled: true,            // Enable enhanced flow system
        turbulenceStrength: 0.3,  // Random turbulence force strength
        repulsionRadius: 0.4,     // Distance at which repulsion starts
        repulsionStrength: 0.1,   // Strength of repulsion force
        circulationStrength: 0.1, // Strength of tangential circulation force
        distributionRadius: 2.0,  // Radius for spatial distribution
        forceBalancing: true,     // Enable force balancing between attractors
        escapeVelocity: 0.2,      // Minimum velocity to escape attractor influence
        flowField: {
            enabled: true,        // Enable global flow field
            strength: 0.1,        // Global flow field strength
            scale: 0.5,           // Scale of flow field noise
            timeScale: 1.0        // Time scaling for flow field animation
        }
    },
    // Enhanced dispersion effect
    dispersionEffect: {
        enabled: true,            // Enable dispersion burst effect
        duration: 2.0,            // Duration of dispersion burst (seconds)
        burstStrength: 0.4,       // Initial outward burst force strength
        randomization: 1.0,       // Amount of randomization in burst direction
        velocityMultiplier: 3.0,  // Velocity multiplier during burst
        dragReduction: 0.5,       // Reduced drag during dispersion (more = less drag)
        centerRepulsion: 0.2,     // Additional repulsion from center during burst
        resetThreshold: 0.9,      // Progress threshold to trigger particle resets
        newParticleSpeed: 2.0     // Speed for newly reset particles during dispersion
    }
}
```

**🌊 Flow Dynamics Features:**
- **⚖️ Balanced vs Simple Attraction**: Two distinct modes with intelligent force distribution
  - **Balanced Mode**: Prevents any single shape from monopolizing particles by reducing dominant attractor influence
  - **Simple Mode**: Direct inverse-square law attraction for dramatic clustering effects
- **🌀 Circulation Forces**: Makes particles flow **around** shapes in tangential motion rather than just toward them
- **🛡️ Repulsion Zones**: Creates dynamic "bubbles" around shapes preventing particle trapping and belt formation
- **💨 Global Flow Field**: Provides animated background "current" using noise-based flow for continuous organic motion
- **🌪️ Smart Turbulence**: Adds natural randomness and organic movement patterns with configurable intensity
- **⚡ Escape Velocity**: Allows fast particles to break free from attractor influence and explore other regions
- **💥 Dispersion Burst**: Dramatic explosive outward particle fountain with uniform distribution in all directions
- **🛡️ Shell Formation**: Particles form protective shell around converged shapes with dynamic stabilization forces

#### 🎬 **Scene & Camera Control**
```javascript
scene: {
    background: 0x0a0a0a,         // Scene background color
    lighting: {
        ambient: {
            color: 0x404040,      // Ambient light color
            intensity: 0.6        // Ambient light intensity
        },
        directional: {
            color: 0xffffff,      // Directional light color
            intensity: 0.8        // Directional light intensity
        }
    },
    camera: {
        fov: 75,                  // Camera field of view
        near: 0.1,                // Camera near clipping plane
        far: 1000,                // Camera far clipping plane
        position: { z: 5 }        // Camera Z position
    },
    // 🎮 Orbital Controls Configuration
    controls: {
        enableDamping: true,      // Enable smooth damping (inertia)
        dampingFactor: 0.05,      // Damping factor for smooth interactions
        screenSpacePanning: false, // Disable screen space panning
        minDistance: 1,           // Minimum zoom distance
        maxDistance: 20,          // Maximum zoom distance
        maxPolarAngle: Math.PI,   // Allow full vertical rotation
        autoRotate: true,         // Auto-rotate the camera
        autoRotateSpeed: 1.0      // Auto-rotation speed (revolutions per minute)
    }
}
```

#### 🎭 **Animation System**
```javascript
animation: {
    placeholder: {
        rotationSpeed: 0.01,      // Rotation speed for placeholder meshes
        flowMotion: 0.002         // Flow motion amplitude during triggered animation
    },
    easing: {
        cubicFactor: 4,           // Factor for cubic easing
        cubicSubtract: 2,         // Subtraction factor for cubic easing
        cubicDivide: 2            // Division factor for cubic easing
    }
}
```

#### 📊 **System Limits**
```javascript
system: {
    maxShapes: 30,                // Maximum number of eye shapes
    shapeTypes: ['cube', 'bipyramid', 'pentagon'],  // Available shape types
    maxEyeImages: 30              // Maximum eye images to keep in UI
}
```

### 🎛️ **Customization Examples**

**For More Dramatic Effects:**
```javascript
// Increase particle count and make them larger
VISUAL_CONFIG.particles.count = 1000;
VISUAL_CONFIG.particles.size = 0.05;

// Make convergence faster and more intense
VISUAL_CONFIG.shapes.convergence.duration = 5;
VISUAL_CONFIG.shapes.convergence.speedMultiplier = 8.0;
VISUAL_CONFIG.attraction.baseStrength = 0.15;

// Enable enhanced flow for dynamic particle streams
VISUAL_CONFIG.attraction.flowDynamics.enabled = true;
VISUAL_CONFIG.attraction.flowDynamics.circulationStrength = 0.08;
VISUAL_CONFIG.attraction.flowDynamics.turbulenceStrength = 0.025;

// Faster camera rotation for more dynamic view
VISUAL_CONFIG.scene.controls.autoRotateSpeed = 3.0;
```

**For Subtle, Ambient Effects:**
```javascript
// Fewer, smaller particles with gentler attraction
VISUAL_CONFIG.particles.count = 200;
VISUAL_CONFIG.particles.size = 0.02;
VISUAL_CONFIG.attraction.baseStrength = 0.04;

// Gentle flow dynamics for subtle movement
VISUAL_CONFIG.attraction.flowDynamics.enabled = true;
VISUAL_CONFIG.attraction.flowDynamics.circulationStrength = 0.02;
VISUAL_CONFIG.attraction.flowDynamics.turbulenceStrength = 0.008;

// Slower, wider orbital movements
VISUAL_CONFIG.shapes.orbital.speed.max = 0.3;
VISUAL_CONFIG.shapes.orbital.radius.max = 8;

// Very slow camera rotation for calm ambience
VISUAL_CONFIG.scene.controls.autoRotateSpeed = 0.3;
```

**For Performance Optimization:**
```javascript
// Reduce particle count for lower-end hardware
VISUAL_CONFIG.particles.count = 250;
VISUAL_CONFIG.particles.rendering.sphereDetail.widthSegments = 6;
VISUAL_CONFIG.particles.rendering.sphereDetail.heightSegments = 4;

// Limit maximum shapes for better performance
VISUAL_CONFIG.system.maxShapes = 15;

// Disable auto-rotation to save processing power
VISUAL_CONFIG.scene.controls.autoRotate = false;
```