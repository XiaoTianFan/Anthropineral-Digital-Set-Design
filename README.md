# Experimental Theatre Digital Program

A digital program for experimental theatre that processes audience photos and creates interactive visual displays using real-time eye detection and 3D animations.

## Project Overview

This system consists of:
1. **🤖 SD Card Auto-Import Pipeline**: Automatically detects camera SD cards and imports new images with real-time progress tracking
2. **Image Processing Pipeline**: Automatically detects faces and crops eyes from photos using OpenCV
3. **✨ Professional Bloom Visual Effects System**: Advanced 3-phase configurable 3D animations with constant bloom emission, enhanced particle dynamics, eye-textured shapes, and orbital camera controls
4. **🎮 Interactive Camera Controls**: Mouse grab orbital view with constant auto-rotation around the center for dynamic theatrical presentation
5. **Real-time Communication**: Socket.IO for live updates between all system components
6. **File Monitoring**: Automatic processing of new images with comprehensive status tracking

## Current Status

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
- **🎛️ Complete Configuration System**: All 35+ visual parameters centrally configurable via `VISUAL_CONFIG` object
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
- **Phase 1 - Enhanced Particle Foundation**: Particles distributed in space with center attraction and depth-based brightness
- **Phase 2 - Eye Shape Integration**: Real eye images mapped as textures on orbiting 3D shapes with particle attraction
- **Phase 3 - Convergence Animation**: Dramatic convergence with speed acceleration and completion detection
- **Automatic Phase Transitions**: System responds intelligently to eye image availability
- **Manual Controls**: Test triggers and reset functionality via debug panel
- **Production-Ready Performance**: Optimized rendering with configurable particle counts and shape parameters

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

### 🎉 **Complete Theatre Production Pipeline**
**Full Automated Theatre Experience:**
1. **Insert SD Card** → Automatic detection within seconds
2. **Auto-Import** → Background processing with progress tracking  
3. **Eye Detection** → Immediate processing of imported images
4. **Real-time Display** → Instant appearance of eye images in web interface
5. **3D Animation System** → Configurable interactive visual effects with eye-textured shapes and orbital camera controls
6. **Manual Animation Control** → Test triggers for convergence animation
7. **Professional Monitoring** → Live status updates and configuration controls

### 🔄 **Next Priority: Keyboard Trigger Integration**
With the complete configurable visual effects system operational, the final enhancement is server-side keyboard triggers for live theatre automation.

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- OpenCV (automatically installed via requirements.txt)
- Two computers on the same local network (or one computer serving both roles)

### Installation

1. **Navigate to the backend directory**:
   ```bash
   cd Program/computer1_backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the System

### **Server Startup Options**

Both methods now work correctly and will properly initialize the image processor:

### **Option A: Using run.py (RECOMMENDED)**
```bash
python run.py
```

### **Option B: Direct Execution**
```bash
python main_server.py
```

Both options will:
- Initialize the image processor correctly
- Start file monitoring automatically  
- Display proper status in the web client
- Show detailed startup information in the console

### Server Information
The server will start and show:
- **Local access**: `http://localhost:5000`
- **Network access**: `http://[YOUR_LOCAL_IP]:5000`
- **Status**: Check console for detailed startup information

### 2. Access the Client (Computer 2)

Open a web browser and navigate to `http://[COMPUTER1_IP]:5000`

The client interface includes:
- **Status Indicators**: Connection, Image Processor, and File Monitoring status
- **🎭 3D Visual Effects Canvas**: Complete 3-phase configurable animation system with interactive orbital camera controls
- **🎮 Camera Controls**: Mouse grab orbital view with constant auto-rotation for dynamic viewing experience
- **Debug Panel**: Testing tools and system information
- **🔧 Configuration Controls**: Easy parameter tweaking interface

### 3. System Operation

#### **🎭 Advanced Configurable 3D Visual Effects System**
1. **Phase 1 - Center Attraction**: Particles distributed throughout space, gradually converging toward center with configurable attraction forces and constant bloom emission
2. **Phase 2 - Eye Shape Animation**: Automatic creation of orbiting 3D shapes when eye images become available, with enhanced bloom effects
3. **Phase 3 - Convergence Animation**: Manual trigger via "Trigger Animation" button OR **🎹 Down Arrow Key** for dramatic convergence effect with intensified bloom
4. **🎹 Global Keyboard Triggers**: Press **Down Arrow** key from anywhere on the server computer to instantly trigger convergence animation (2-second cooldown prevents double-triggers)
5. **✨ Constant Bloom Emission**: Professional post-processing bloom effects where each particle acts like a light bulb (similar to Max jit.gl bloom)
6. **🎮 Interactive Camera Controls**: Mouse grab orbital view with constant auto-rotation (1.0 speed) around the center for dynamic theatrical presentation
7. **Real-time Transitions**: System automatically detects eye images and transitions between phases
8. **🎛️ Full Configuration Control**: All visual parameters easily customizable via centralized config object including bloom settings
9. **Performance Optimized**: Smooth rendering with configurable particle counts (500 default) and shape limits (30 default)
10. **Reset Capability**: "Reset Animation" button to restart convergence for multiple performances

#### **Automatic Eye Images Display**
1. **Client Connection**: When you open the web interface, existing eye images automatically load
2. **Real-time Updates**: New processed eye images appear immediately in the debug panel
3. **Automatic Shape Creation**: Eye images instantly create new orbiting 3D shapes in the animation
4. **Collapsible View**: Eye images section can be expanded/collapsed in the debug panel
5. **Manual Refresh**: Use "Refresh Eye Images" button to reload existing images

#### **Testing the Image Processing**
1. **Add Test Images**: Copy any images with faces to `Program/computer1_backend/data/originals/`
2. **Automatic Processing**: The system will automatically detect and process new images
3. **View Results**: Processed eye images appear in `Program/computer1_backend/data/cropped_eyes/` and display on the web client
4. **Instant Animation**: New eye images immediately create new orbiting shapes in the 3D animation
5. **Status Monitoring**: Watch the console for processing logs and the web client for status updates

#### **Using the Debug Panel**
- **Test Connection**: Verify Socket.IO communication
- **Test Processing**: Generate and process a test face image
- **🎭 Animation Controls**: "Trigger Animation" and "Reset Animation" buttons for convergence effects
- **🎹 Keyboard Status**: Shows if global keyboard triggers are active (Down Arrow key)
- **🌊 Flow Dynamics Toggle**: Switch between simple attraction and enhanced flow systems in real-time
- **✨ Bloom Post-Processing Toggle**: Enable/disable professional bloom effects with real-time control
- **🌟 Constant Emission Toggle**: Control particle light bulb emission for bloom effects
- **Refresh Status**: Manually request status updates
- **Clear Images**: Remove displayed eye images
- **Refresh Eye Images**: Clear and reload existing eye images from server
- **Clear Debug**: Clear debug message history
- **Toggle Panel**: Use 🔧 button to show/hide debug panel
- **Collapsible Sections**: Click section headers to expand/collapse content

#### **🤖 SD Card Auto-Import System** 
1. **Auto-Detection**: Insert any camera SD card and the system automatically detects it within seconds
2. **Configuration**: Use the "Auto-Import Settings" toggle in the SD Card Management section to enable/disable auto-import
3. **Automatic Import**: When enabled, new images are automatically imported in the background with real-time progress tracking
4. **Progress Monitoring**: Watch live progress bars and status updates during import operations
5. **Manual Control**: Use "Import New" or "Import All" buttons for manual import control
6. **Status Indicators**: 
   - 🤖 Robot emoji indicates auto-import operations
   - Live card detection with size, image count, and mount point information
   - Real-time import status (Ready/Importing/Error)
7. **Seamless Pipeline**: Imported images automatically trigger eye detection and create new animated shapes

## Implementation Status

### ✅ **Completed Components**
- **Flask Server**: Full Socket.IO integration with status tracking
- **🌟 SD Card Auto-Import System**: Complete pipeline with intelligent detection, background processing, and professional UI
- **Image Processor**: OpenCV face/eye detection with comprehensive error handling
- **File Monitoring**: Watchdog-based automatic processing of new images  
- **Client Interface**: Complete web interface with real-time updates and auto-import controls
- **✨ Professional Bloom Visual Effects System**: Complete 3-phase system with constant bloom emission and 35+ configurable parameters
- **🎨 Constant Bloom Emission**: Professional post-processing with UnrealBloomPass creating light-bulb particle effects
- **🎹 Global Keyboard Trigger System**: Down arrow key triggers with safety mechanisms, status monitoring, and real-time integration
- **Real-time Communication**: Bidirectional Socket.IO events with comprehensive auto-import events
- **Debug Tools**: Comprehensive testing and status monitoring with SD card management, animation controls, and bloom toggles
- **Eye Images Display**: Automatic loading and real-time display of processed eye images
- **UI Layout**: Clean performance interface with collapsible debug panel and auto-import configuration
- **Auto-Import Configuration**: Professional toggle controls with live status indicators and progress tracking

### 🚧 **Current Issues**
None - All core functionality including complete SD card auto-import pipeline, advanced configurable 3D visual effects system, professional constant bloom emission, and global keyboard triggers is working correctly! 🎉

### 🎉 **CORE THEATRE AUTOMATION COMPLETE**
All essential features for live theatre production are now fully implemented and operational:
- ✅ **SD Card Auto-Import**: Automatic detection and background processing
- ✅ **Eye Detection & Processing**: Real-time image processing pipeline  
- ✅ **3D Visual Effects**: Professional configurable animation system with constant bloom
- ✅ **Keyboard Triggers**: Global hotkey system for live performance control
- ✅ **Real-time Communication**: Complete Socket.IO integration
- ✅ **Status Monitoring**: Comprehensive system status and controls

### 🔄 **Optional Enhancements**
1. **Production Deployment**: Server configuration for permanent installation
2. **User Training**: Materials for theatre operators
3. **Performance Optimization**: Additional fine-tuning for specific hardware

## Technical Architecture

### **🎭 Advanced Configurable Visual Effects System** 
1. **🎛️ Complete Configuration System**: All 35+ visual effects parameters controlled via centralized `VISUAL_CONFIG` object
2. **🌀 Enhanced Phase 1**: Particles distributed in space with center attraction (lifetime mechanism removed for infinite persistence)
3. **🎨 Advanced Particle System**: Distance-based opacity, configurable colors (HSL), distribution patterns, and initial velocities
4. **⚙️ Flexible Rendering**: Configurable sphere geometry detail, material properties, and blending modes
5. **🎭 Eye Shape Integration**: Real eye images as textures on configurable 3D shapes (cube, bipyramid, pentagon)
6. **🎪 Convergence Animation**: Customizable duration, target radius, speed multipliers, and easing curves
7. **🔧 Scene Control**: Configurable camera (FOV, position, clipping), lighting (ambient, directional), and background
8. **📊 Performance Optimization**: Configurable limits for particles, shapes, and rendering quality
9. **🎯 Precise Attraction Forces**: Fine-grained control over attraction strength, drag coefficients, and intensity scaling
10. **🎨 Material System**: Configurable placeholder and loaded material properties for eye shapes
11. **🌊 Enhanced Flow Dynamics System**: Revolutionary 6-mechanism particle flow system preventing belt formation with configurable force balancing, repulsion, circulation, flow fields, turbulence, and escape velocity

### **Current Optimized Configuration:**
```javascript
// Current production settings (user-customized):
particles: {
    count: 500,                   // Dense particle field
    size: 0.03,                  // Visible particle size
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
    baseStrength: 0.08,           // Base attraction force strength (user-customized)
    maxStrength: 0.2,             // Maximum attraction force cap (user-customized)
    minDistance: 0.1,             // Minimum distance to avoid division by zero
    distanceOffset: 0.1,          // Distance offset for force calculation
    drag: {
        normal: 0.98,             // Normal drag multiplier (less = more drag)
        intense: 0.95             // Drag during intense convergence
    },
    intensityThreshold: 1.5,      // Threshold for switching to intense mode
    centerAttraction: {
        intensity: 1.0            // Intensity of center attraction in Phase 1
    }
}
```

#### 🌊 **Enhanced Flow Dynamics System**
```javascript
attraction: {
    // ... existing attraction parameters ...
    flowDynamics: {
        enabled: true,            // Enable enhanced flow system
        turbulenceStrength: 0.015, // Random turbulence force strength
        repulsionRadius: 0.3,     // Distance at which repulsion starts
        repulsionStrength: 0.08,  // Strength of repulsion force
        circulationStrength: 0.04, // Strength of tangential circulation force
        distributionRadius: 2.0,  // Radius for spatial distribution
        forceBalancing: true,     // Enable force balancing between attractors
        escapeVelocity: 0.5,      // Minimum velocity to escape attractor influence
        flowField: {
            enabled: true,        // Enable global flow field
            strength: 0.02,       // Global flow field strength
            scale: 0.5,           // Scale of flow field noise
            timeScale: 0.3        // Time scale for animated flow field
        }
    }
}
```

**🌊 Flow Dynamics Features:**
- **Force Balancing**: Prevents any single shape from dominating all particles
- **Repulsion Forces**: Creates "bubbles" around shapes preventing particle trapping
- **Circulation Forces**: Makes particles flow **around** shapes rather than toward them
- **Global Flow Field**: Provides animated background "current" for continuous motion
- **Turbulence**: Adds natural randomness and organic movement patterns
- **Escape Velocity**: Allows fast particles to break free and explore other areas

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
    baseStrength: 0.08,           // Base attraction force strength (user-customized)
    maxStrength: 0.2,             // Maximum attraction force cap (user-customized)
    minDistance: 0.1,             // Minimum distance to avoid division by zero
    distanceOffset: 0.1,          // Distance offset for force calculation
    drag: {
        normal: 0.98,             // Normal drag multiplier (less = more drag)
        intense: 0.95             // Drag during intense convergence
    },
    intensityThreshold: 1.5,      // Threshold for switching to intense mode
    centerAttraction: {
        intensity: 1.0            // Intensity of center attraction in Phase 1
    }
}
```

#### 🌊 **Enhanced Flow Dynamics System**
```javascript
attraction: {
    // ... existing attraction parameters ...
    flowDynamics: {
        enabled: true,            // Enable enhanced flow system
        turbulenceStrength: 0.015, // Random turbulence force strength
        repulsionRadius: 0.3,     // Distance at which repulsion starts
        repulsionStrength: 0.08,  // Strength of repulsion force
        circulationStrength: 0.04, // Strength of tangential circulation force
        distributionRadius: 2.0,  // Radius for spatial distribution
        forceBalancing: true,     // Enable force balancing between attractors
        escapeVelocity: 0.5,      // Minimum velocity to escape attractor influence
        flowField: {
            enabled: true,        // Enable global flow field
            strength: 0.02,       // Global flow field strength
            scale: 0.5,           // Scale of flow field noise
            timeScale: 0.3        // Time scale for animated flow field
        }
    }
}
```

**🌊 Flow Dynamics Features:**
- **Force Balancing**: Prevents any single shape from dominating all particles
- **Repulsion Forces**: Creates "bubbles" around shapes preventing particle trapping
- **Circulation Forces**: Makes particles flow **around** shapes rather than toward them
- **Global Flow Field**: Provides animated background "current" for continuous motion
- **Turbulence**: Adds natural randomness and organic movement patterns
- **Escape Velocity**: Allows fast particles to break free and explore other areas

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

**For Theatre Presentation (Current Setup):**
```javascript
// Compact viewing area with strong center attraction
VISUAL_CONFIG.particles.resetDistance = 10;
VISUAL_CONFIG.particles.depthEffect.maxDistance = 10;
VISUAL_CONFIG.attraction.baseStrength = 0.08;
VISUAL_CONFIG.attraction.maxStrength = 0.2;

// Smooth, theatrical camera rotation
VISUAL_CONFIG.scene.controls.autoRotateSpeed = 1.0;
VISUAL_CONFIG.scene.controls.enableDamping = true;
```

### 🔄 **Applying Configuration Changes**

1. **Edit the Configuration**: Modify the `VISUAL_CONFIG` object in `Program/computer1_backend/static/js/client.js`
2. **Restart the Server**: `python run.py`
3. **Refresh the Browser**: Reload the client page to see changes
4. **Test in Real-time**: Use the debug panel to trigger animations and see your customizations

### 💡 **Configuration Pro Tips**

- **🎨 Color Harmony**: Adjust `hueBase` and `hueVariation`