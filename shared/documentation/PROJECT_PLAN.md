# Experimental Theatre Digital Program - Project Plan

## 1. Project Goal

To create a digital program for an experimental theatre piece that involves:
1.  Automatically collecting images of audience faces from an SD card inserted into `computer1`.
2.  Processing these images on `computer1` to detect and crop out eyes.
3.  Applying real-time artistic texture processing with live preview gallery displaying processed textures in original aspect ratios.
4.  Serving a web-based visual client from `computer1` to `computer2` (which can only run a web browser).
5.  The client on `computer2` will display the processed eye images in real-time with a texture preview gallery.
6.  Upon a keyboard shortcut trigger from `computer1`, the client on `computer2` will transition to a dynamic 4-phase 3D animation using `Three.js`, featuring enhanced flow dynamics, professional bloom effects, convergence animation, dispersion burst, and shell formation with organic morphing eye-textured shapes creating a flowing, living digital creature.
7.  **🎬 Progressive Camera Animation System** - Camera rotation speed progressively increases from 10% to 100% based on audience participation (number of eye shapes), creating direct connection between audience engagement and visual energy.
8.  **🔄 NEW: Organic Shape Morphing System** - Eye-textured shapes constantly morph using vertex noise, creating living, breathing appearance that makes the digital creature appear truly alive.

## 2. Overall Architecture

The system will operate with two computers in the same local network:

*   **`computer1` (Windows):** Acts as the central processing unit and server.
    *   Handles all image acquisition from the SD card with automatic detection and import.
    *   Performs image processing (eye detection and cropping).
    *   Hosts the web server (Flask) that serves the client application.
    *   Manages real-time communication (Flask-SocketIO) with the client.
    *   Listens for a global keyboard shortcut to trigger the main animation.
*   **`computer2` (Any OS with a modern Web Browser):** Acts as a display client.
    *   Loads and runs a web application served by `computer1`.
    *   Cannot run any native code; all logic is client-side JavaScript.
    *   Receives data and signals from `computer1` to update visuals.
    *   Displays 4-phase interactive 3D visual effects with enhanced flow dynamics, professional bloom post-processing, and progressive camera rotation system.

## 3. Technology Stack

*   **Backend (`computer1` - Python):**
    *   **SD Card Detection & File Operations:** `psutil` (for drive detection), `os`, `shutil`.
    *   **Image Processing:** `OpenCV-Python` (for face/eye detection), `Pillow` (for image manipulation).
    *   **Folder Monitoring:** `watchdog`.
    *   **Web Framework:** `Flask`.
    *   **Real-time Communication:** `Flask-SocketIO`.
    *   **Keyboard Listener:** `keyboard` library.
    *   **Dependency Management:** `pip` with `requirements.txt`.
*   **Frontend (`computer2` - Browser, code served from `computer1`):**
    *   **Structure:** HTML5.
    *   **Styling:** CSS3.
    *   **Logic & Interactivity:** JavaScript (ES6+).
    *   **3D Graphics:** `Three.js`.
    *   **Real-time Communication Client:** `Socket.IO Client JS library`.
    *   **Image Display/Filtering (Optional):** HTML Canvas API.

## 4. Component Breakdown

### 4.1. Computer 1: Backend & Server (Python)

#### 4.1.1. SD Card Monitor & Image Importer
*   **Objective:** Detect SD card insertion and copy new images.
*   **Tasks:**
    *   Periodically scan for newly connected drives/volumes using `psutil`.
    *   Identify the SD card (e.g., by volume name or presence of a specific marker file/folder).
    *   Once detected, iterate through image files (e.g., `.jpg`, `.png`) on the SD card.
    *   Copy only new images (not previously imported) to a designated `data/originals/` folder on `computer1`. Maintain a list or mechanism to track imported files.
*   **File:** `computer1_backend/sd_card_monitor.py` (can be a standalone script or a module integrated into `main_server.py`).

#### 4.1.2. Eye Detection & Cropping Service
*   **Objective:** Process images from `data/originals/` to extract eyes.
*   **Tasks:**
    *   Use `watchdog` to monitor the `data/originals/` folder for new image files.
    *   For each new image:
        *   Load the image using `OpenCV`.
        *   Perform face detection (e.g., using Haar cascades or a more modern DNN model).
        *   For each detected face, perform eye detection.
        *   Crop the regions corresponding to the detected eyes.
        *   Save the cropped eye images to the `data/cropped_eyes/` folder (e.g., `eye_timestamp_1.jpg`, `eye_timestamp_2.jpg`).
        *   After processing, notify the web server (e.g., via an internal queue or a Socket.IO emit from the server itself) that new eye images are available.
*   **File:** `computer1_backend/image_processor.py` (can be a standalone script or a module).

#### 4.1.3. Web Application Server (Flask)
*   **Objective:** Serve the client application and image data.
*   **Tasks:**
    *   Initialize Flask and Flask-SocketIO.
    *   Define a route to serve the main `index.html` for the client.
    *   Define routes to serve static assets (CSS, client-side JS, `Three.js` library, `Socket.IO` client library, and images in `static/other_images_for_animation/`).
    *   Define a route or mechanism to serve images from the `data/cropped_eyes/` folder (e.g., `/eyes/<filename>`).
*   **File:** `computer1_backend/main_server.py`.

#### 4.1.4. Real-time Communication (Flask-SocketIO)
*   **Objective:** Facilitate communication between server and client.
*   **Tasks (within `main_server.py`):**
    *   Handle client connections and disconnections.
    *   When the `image_processor.py` signals that new eye images are ready:
        *   Emit a `new_eye_image_available` event to all connected clients, sending the path/URL of the new eye image(s).
    *   When the `keyboard_listener.py` detects the trigger shortcut:
        *   Emit a `trigger_final_animation` event to all connected clients.
*   **File:** `computer1_backend/main_server.py`.

#### 4.1.5. Keyboard Shortcut Listener
*   **Objective:** Detect a global keyboard shortcut on `computer1` to trigger the animation.
*   **Tasks:**
    *   Use the `keyboard` library to listen for a specific key combination (e.g., Down Arrow).
    *   When the combination is detected, send a signal to the `main_server.py` (e.g., via an internal HTTP request to a specific Flask endpoint, or by directly calling a function if running in the same process/thread, or via a shared event queue). The server will then relay this as a Socket.IO event.
*   **File:** `computer1_backend/keyboard_listener.py` (standalone script).

### 4.2. Computer 2: Web Client (Browser, served from `computer1`)

#### 4.2.1. HTML Structure & Asset Loading
*   **Objective:** Basic webpage structure.
*   **Tasks:**
    *   Create `index.html` with placeholders for dynamic content.
    *   Include `<script>` tags for `Socket.IO` client, `Three.js`, and custom `client.js`.
    *   Include `<link>` tag for `style.css`.
    *   Container elements for eye image display and the Three.js canvas.
*   **File:** `computer1_backend/templates/index.html`.

#### 4.2.2. Real-time Communication Client (Socket.IO JS)
*   **Objective:** Connect to the server and handle events.
*   **Tasks (within `client.js`):**
    *   Establish a Socket.IO connection to `computer1`'s server.
    *   Listen for `new_eye_image_available` events:
        *   On event, receive image URL/path.
        *   Call functions to display the new eye image.
    *   Listen for `trigger_final_animation` events:
        *   On event, call functions to initiate the Three.js animation sequence.
*   **File:** `computer1_backend/static/js/client.js`.

#### 4.2.3. Eye Image Display
*   **Objective:** Show incoming eye images.
*   **Tasks (within `client.js`):**
    *   Function to dynamically add new eye images to the display area (e.g., append `<img>` tags or draw to a 2D canvas).
    *   Implement logic for how images are displayed (e.g., one by one, fading in/out, grid).
    *   Optional: Apply client-side filters using the Canvas API if desired.
*   **File:** `computer1_backend/static/js/client.js`.

#### 4.2.4. Three.js Animation Engine
*   **Objective:** Create and manage the 3D animation.
*   **Tasks (within `client.js` or a dedicated `animation.js` module):**
    *   **Scene Setup:**
        *   Initialize Three.js scene, camera, renderer.
        *   Load the "other images" (from `computer1_backend/static/other_images_for_animation/`) as textures for 3D meshes.
        *   Position these meshes initially (e.g., scattered, semi-transparent).
    *   **Animation Logic:**
        *   Function to be called on `trigger_final_animation` event.
        *   Animate meshes blending/morphing into a sphere-like structure.
        *   Animate this structure flowing or moving across the screen.
        *   Handle the render loop.
*   **File:** `computer1_backend/static/js/client.js` (or potentially a separate JS file imported by it).

## 5. Data Management

*   **Source Images (SD Card):** Temporarily accessed.
*   **Originals:** Stored in `Program/computer1_backend/data/originals/`. Copied from SD card.
*   **Cropped Eyes:** Stored in `Program/computer1_backend/data/cropped_eyes/`. Generated by `image_processor.py`. Served to the client.
*   **Animation Assets:** Stored in `Program/computer1_backend/static/other_images_for_animation/`. Pre-loaded images for the Three.js animation. Served to the client.

## 6. Proposed Directory Structure

```
Program/
├── computer1_backend/
│   ├── sd_card_monitor.py
│   ├── image_processor.py
│   ├── main_server.py
│   ├── keyboard_listener.py
│   ├── static/
│   │   ├── js/
│   │   │   ├── client.js
│   │   │   ├── three.min.js        # (or other version)
│   │   │   └── socket.io.min.js    # (or other version)
│   │   ├── css/
│   │   │   └── style.css
│   │   └── other_images_for_animation/
│   │       └── (e.g., image1.jpg, image2.png)
│   ├── templates/
│   │   └── index.html
│   ├── data/
│   │   ├── originals/
│   │   └── cropped_eyes/
│   └── requirements.txt
│
└── shared/
    └── documentation/
        └── PROJECT_PLAN.md
    └── test_images/
        └── (Example images for testing)
```
*(The `computer2/` directory is omitted as all client files are served from `computer1_backend`)*

## 7. Development Steps / Milestones

### ✅ **M1: Basic Server & Client Setup** - COMPLETED
*   ✅ Create `computer1_backend` directory structure.
*   ✅ Setup `requirements.txt` with all dependencies (`Flask`, `Flask-SocketIO`, `OpenCV`, `Pillow`, etc.).
*   ✅ Implement Flask server (`main_server.py`) serving `index.html` with Socket.IO support.
*   ✅ Create beautiful, theatrical HTML template (`templates/index.html`) with eye display and Three.js canvas areas.
*   ✅ Implement comprehensive CSS styling (`static/css/style.css`) with dark theme and smooth animations.
*   ✅ Download and integrate Three.js and Socket.IO client libraries.
*   ✅ Create client-side JavaScript (`static/js/client.js`) with Socket.IO connection and basic Three.js scene.
*   ✅ Implement debug panel with connection status and test buttons.
*   ✅ Create `run.py` script for easy server startup.
*   ✅ Create comprehensive README with setup and usage instructions.
*   ✅ Test dependencies installation and basic server functionality.

### ✅ **M2: Image Processing Core** - COMPLETED
*   ✅ Create test images in `shared/test_images/` directory for development
*   ✅ Develop `image_processor.py` with OpenCV face and eye detection
*   ✅ Implement comprehensive error handling and fallback eye generation
*   ✅ Add automatic file monitoring using `watchdog` library
*   ✅ Integrate real-time Socket.IO notifications for new processed eyes
*   ✅ Test face detection with various image types and qualities
*   ✅ Create eye images gallery display system in web client
*   ✅ Add auto-loading of existing eye images on client connection

### ✅ **M3: SD Card Auto-Import System** - COMPLETED
*   ✅ Implement intelligent SD card detection using `psutil`
*   ✅ Create comprehensive SD card management interface
*   ✅ Add background import system with real-time progress tracking
*   ✅ Implement duplicate prevention using SHA-256 hashing
*   ✅ Create professional UI with configuration controls and status indicators
*   ✅ Add auto-import toggle with robot emoji indicators
*   ✅ Integrate seamless pipeline: SD Card → Import → Eye Processing → Display

### ✅ **M4: Visual Effects System** - COMPLETED
*   ✅ Complete 3-phase interactive 3D visual effects system
*   ✅ Enhanced particle system with depth-based effects and configurable parameters
*   ✅ Eye-textured 3D shapes with automatic texture loading
*   ✅ Dramatic convergence animation with speed acceleration
*   ✅ Automatic phase transitions based on eye image detection
*   ✅ Mouse grab orbital camera controls for interactive viewing

### ✅ **M5: Advanced Configurable Visual Effects** - COMPLETED
*   ✅ Complete configuration system with 40+ visual parameters
*   ✅ Enhanced flow dynamics system preventing particle belt formation
*   ✅ Real-time flow control toggle for comparing simple vs enhanced systems
*   ✅ Enhanced Phase 1 with center attraction and infinite particle persistence
*   ✅ Advanced particle system with distance-based opacity and HSL colors
*   ✅ Flexible rendering with configurable geometry and material properties
*   ✅ Enhanced scene control and performance optimization settings

### ✅ **M6: Constant Bloom Emission System** - COMPLETED
*   ✅ Professional Three.js UnrealBloomPass integration
*   ✅ Constant light emission with particles acting as individual light bulbs
*   ✅ Optimized bloom settings for strong constant emission
*   ✅ Real-time bloom controls in debug panel
*   ✅ Enhanced material system with emissive properties
*   ✅ Adaptive quality settings with performance monitoring

### ✅ **M7: Global Keyboard Trigger System** - COMPLETED
*   ✅ Global hotkey support using Python `keyboard` library
*   ✅ Down arrow key trigger with 2-second cooldown safety
*   ✅ Real-time Socket.IO integration for instant client notification
*   ✅ Live keyboard listener status monitoring in web interface
*   ✅ Background operation with comprehensive error handling

### ✅ **M8: Enhanced Flow Dynamics System** - COMPLETED
*   ✅ Revolutionary 6-mechanism particle physics system
*   ✅ Balanced vs simple attraction modes with force distribution
*   ✅ Circulation forces for tangential particle motion around shapes
*   ✅ Global flow field with animated background currents
*   ✅ Enhanced turbulence and escape velocity systems
*   ✅ Repulsion zones preventing particle trapping
*   ✅ Real-time toggle control for system comparison

### ✅ **M9: Client-Side Artistic Texture Processing** - COMPLETED
*   ✅ Complete artistic processing pipeline with real-time edge detection
*   ✅ Three sophisticated algorithms (Sobel, Roberts, Prewitt)
*   ✅ High-performance off-screen canvas processing with smart caching
*   ✅ Comprehensive UI controls with 12+ adjustable parameters
*   ✅ Artistic enhancement pipeline with multiple processing stages
*   ✅ 3D integration with emissive glow effects and bloom compatibility
*   ✅ Advanced configuration system with professional control panel
*   ✅ Real-time texture display gallery with live preview capabilities
*   ✅ Original aspect ratio display with interactive controls
*   ✅ Auto-refresh system and texture management features

### ✅ **M10: Dynamic Camera Rotation System** - COMPLETED 📷
*   ✅ **🎬 Progressive Camera Animation**: Revolutionary camera system that builds energy as audience participates
*   ✅ **📈 Speed-Based Progression**: Camera rotation speed increases from 10% to 100% based on number of eye shapes (0 to 40 shapes)
*   ✅ **🌍 3D Orbital Motion**: Both horizontal continuous rotation and vertical oscillating motion for dynamic cinematic experience
*   ✅ **⚡ Real-Time Speed Calculation**: `speed = 0.1 + (currentShapes/maxShapes) * 0.9` provides smooth acceleration curve
*   ✅ **🎛️ Comprehensive UI Monitoring**: Live camera rotation status with color-coded indicators:
     - **🟢 Slow (10-30%)**: Green progress bar and "Slow Rotation" status
     - **🟡 Medium (30-70%)**: Yellow progress bar and "Medium Rotation" status  
     - **🔴 Fast (70-100%)**: Red progress bar and "Fast Rotation" status
*   ✅ **📊 Live Performance Metrics**: Real-time display of current speed percentage, shape count (current/max), and rotation status
*   ✅ **✨ Animated Progress Bar**: Shimmer effect and smooth transitions with hover interactions
*   ✅ **🎪 Theatre Integration**: Creates direct connection between audience participation and visual energy
*   ✅ **⚙️ Configurable Parameters**: Base speeds, oscillation range, and visual feedback all easily adjustable
*   ✅ **🎮 User Interaction Friendly**: Camera system works seamlessly with mouse grab orbital controls

### ✅ **M11: Organic Shape Morphing System** - COMPLETED 🔄
*   ✅ **🌱 Living Eye Shapes**: Revolutionary vertex noise morphing system creating organic, constantly changing 3D shapes that appear alive and breathing
*   ✅ **🔄 Vertex Noise Implementation**: Real-time vertex displacement using multi-octave mathematical functions (sine/cosine waves) for natural, flowing movement
*   ✅ **🎭 Simplified Architecture**: Focused on vertex noise rather than complex geometric morphing for better performance and more organic results
*   ✅ **🎛️ Advanced Morphing Controls**: Complete UI control panel with 5 real-time adjustable parameters:
     - **Noise Animation Speed** (0.1-2.0): Controls how fast the vertex noise animates over time
     - **Noise Intensity** (0.0-1.0): Overall strength of vertex displacement effects
     - **Noise Frequency** (0.5-5.0): Detail level of noise pattern (higher = more intricate deformation)
     - **Noise Amplitude** (0.01-0.5): Maximum displacement distance for individual vertices
     - **Global Enable/Disable**: Master switch for the entire morphing system
*   ✅ **🎨 Base Shape Variety**: Each morphing shape randomly chooses between cube or bipyramid as foundation, maintaining original shape recognition while adding organic movement
*   ✅ **⚡ High-Performance Implementation**: Optimized vertex manipulation with original vertex preservation and efficient normal recalculation
*   ✅ **🔍 Advanced Debugging System**: Comprehensive debugging tools including:
     - **Vertex Storage Verification**: Logs when vertices are stored and validates geometry data
     - **Displacement Tracking**: Real-time monitoring of maximum displacement values being applied
     - **Extreme Test Mode**: Debug button for dramatic wobbling to verify system functionality
     - **Performance Logging**: Tracks morphing activity, timer progression, and effect intensity
*   ✅ **🌊 Phase Integration**: Seamless integration with existing visual phases and convergence animations
*   ✅ **💫 Organic Appearance**: Creates breathing, pulsing, living shapes that enhance the theatrical experience with subtle but noticeable movement
*   ✅ **🎪 Theatre-Ready**: Production-optimized settings providing dramatic organic movement without overwhelming the core eye-texture visibility
*   ✅ **⚙️ Memory Efficient**: Smart original vertex storage and disposal system prevents memory leaks during long performances
*   ✅ **🔄 Reset Capability**: Complete reset to original geometry during convergence reset and shape disposal

### 🎉 **CORE THEATRE PRODUCTION SYSTEM COMPLETE**
All essential components for professional live theatre production are now fully implemented and operational:
- ✅ **🤖 SD Card Auto-Import**: Automatic detection and background processing
- ✅ **👁️ Eye Detection & Processing**: Real-time image processing pipeline  
- ✅ **🎨 Client-Side Artistic Processing**: Real-time B&W edge detection with professional control panel
- ✅ **✨ 3D Visual Effects**: Professional configurable animation system with constant bloom emission
- ✅ **🌊 Enhanced Flow Dynamics**: Revolutionary 6-mechanism particle physics system
- ✅ **📷 Dynamic Camera Rotation**: Progressive speed-up system connected to audience participation
- ✅ **🎹 Keyboard Triggers**: Global hotkey system for live performance control
- ✅ **🔄 Real-time Communication**: Complete Socket.IO integration with comprehensive status monitoring

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

This plan provides a comprehensive roadmap. We can adjust and elaborate on specific sections as development progresses. 

- ✨ Complete 4-phase visual effects system with enhanced flow dynamics, constant bloom emission, and client-side artistic texture processing ✅ 