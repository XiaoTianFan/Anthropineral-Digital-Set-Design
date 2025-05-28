# Experimental Theatre Digital Program - Project Plan

## 1. Project Goal

To create a digital program for an experimental theatre piece that involves:
1.  Automatically collecting images of audience faces from an SD card inserted into `computer1`.
2.  Processing these images on `computer1` to detect and crop out eyes.
3.  Serving a web-based visual client from `computer1` to `computer2` (which can only run a web browser).
4.  The client on `computer2` will display the processed eye images in real-time.
5.  Upon a keyboard shortcut trigger from `computer1`, the client on `computer2` will transition to a dynamic 3D animation using `Three.js`, where pre-loaded images form a flowing, sphere-like digital creature.

## 2. Overall Architecture

The system will operate with two computers in the same local network:

*   **`computer1` (Windows):** Acts as the central processing unit and server.
    *   Handles all image acquisition from the SD card.
    *   Performs image processing (eye detection and cropping).
    *   Hosts the web server (Flask) that serves the client application.
    *   Manages real-time communication (Flask-SocketIO) with the client.
    *   Listens for a local keyboard shortcut to trigger the main animation.
*   **`computer2` (Any OS with a modern Web Browser):** Acts as a display client.
    *   Loads and runs a web application served by `computer1`.
    *   Cannot run any native code; all logic is client-side JavaScript.
    *   Receives data and signals from `computer1` to update visuals.

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
    *   Use the `keyboard` library to listen for a specific key combination (e.g., Ctrl+Alt+T).
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
*   ✅ Implement eye cropping and saving functionality
*   ✅ Add file monitoring using watchdog for automatic processing
*   ✅ Integrate image processor with main server via Socket.IO
*   ✅ Add comprehensive error handling and logging
*   ✅ Implement real-time status updates for client
*   ✅ Add test processing functionality with generated test images
*   ✅ Create eye image display system with automatic updates
*   ✅ Fix Flask-SocketIO compatibility issues (broadcast parameter)
*   ✅ Add status refresh and debugging capabilities
*   ✅ Implement fallback dummy eye generation when face detection fails
*   ✅ **FIX STATUS COMMUNICATION BUG**: Resolved run.py initialization issue

### ✅ **M2: Status Communication Bug Resolution** - COMPLETED
*   ✅ **Root Cause Identified:** `run.py` script didn't trigger startup sequence for image processor initialization
*   ✅ **Solution Implemented:** Updated `run.py` to properly call startup sequence in background thread
*   ✅ **Testing Verified:** Both `run.py` and direct `main_server.py` execution now work identically
*   ✅ **Documentation Updated:** README reflects that both startup methods work correctly

### 🔄 **M3: SD Card Detection & Import** - PLANNED
*   **Tasks:**
    *   [ ] Develop `sd_card_monitor.py` with psutil for drive detection
    *   [ ] Implement automatic image copying from SD card to originals folder
    *   [ ] Add duplicate detection to avoid re-processing same images
    *   [ ] Integrate SD card monitoring with main server
    *   [ ] Test with actual SD card insertion/removal

### 🔄 **M4: Animation Enhancement** - PLANNED
*   **Tasks:**
    *   [ ] Load and integrate actual eye images into Three.js animation
    *   [ ] Implement sphere formation animation using detected eyes
    *   [ ] Add flowing creature movement patterns
    *   [ ] Optimize animation performance for real-time display
    *   [ ] Add visual transitions and effects

### 🔄 **M5: Keyboard Trigger System** - PLANNED
*   **Tasks:**
    *   [ ] Develop `keyboard_listener.py` using keyboard library
    *   [ ] Implement global hotkey detection (e.g., Ctrl+Alt+T)
    *   [ ] Integrate keyboard triggers with Socket.IO animation events
    *   [ ] Add safety mechanisms to prevent accidental triggers
    *   [ ] Test keyboard functionality across different system states

### 🔄 **M6: Final Integration & Testing** - PLANNED
*   **Tasks:**
    *   [ ] End-to-end testing with actual SD card workflow
    *   [ ] Performance optimization for real-time operation
    *   [ ] Error handling and recovery mechanisms
    *   [ ] Production deployment configuration
    *   [ ] Documentation of complete workflow
    *   [ ] User training materials

## 8. Technical Status

### ✅ **Completed Components:**
*   **Flask Server:** Fully functional with Socket.IO integration
*   **Image Processor:** Complete with OpenCV face/eye detection, file monitoring, and real-time updates
*   **Client Interface:** Responsive web client with status indicators and debug capabilities
*   **Three.js Integration:** Basic 3D scene with placeholder animations
*   **Real-time Communication:** Full Socket.IO bidirectional communication
*   **Status System:** Comprehensive status tracking and display
*   **Startup Process:** Both `run.py` and direct execution work identically

### 🚧 **Current Issues:**
None - All core functionality is working correctly.

### 🔄 **Next Priorities:**
1. **SD Card Integration:** Implement automatic SD card detection and image import
2. **Animation Enhancement:** Integrate real eye images into Three.js animations
3. **Keyboard Triggers:** Add global hotkey support for animation control

## 9. Current Implementation Status

### ✅ **Completed Components:**
1. **Project Structure**: Complete directory organization with all required folders
2. **Dependencies**: All Python packages installed and tested
3. **Web Server**: Flask application with Socket.IO support running on port 5000
4. **Client Interface**: Beautiful HTML/CSS interface with theatrical theme
5. **Real-time Communication**: Socket.IO connection established between server and client
6. **Three.js Integration**: Basic 3D scene with placeholder meshes and animation loop
7. **Debug Tools**: Connection status, test buttons, and message logging
8. **Documentation**: Comprehensive README and setup instructions

### 🎯 **Next Immediate Steps (Priority Order):**

1. **Create Test Environment** (Today):
   - Add sample face images to `shared/test_images/` for development
   - Test server startup and client connection
   - Verify Three.js animation placeholders work

2. **Implement Image Processing** (Next Session):
   - Create `image_processor.py` with OpenCV face/eye detection
   - Test eye cropping with sample images
   - Implement basic file monitoring

3. **Integrate Real-time Updates** (Following Session):
   - Connect image processor to Socket.IO events
   - Test automatic eye image display in browser
   - Refine image display animations

### 📁 **Current File Structure:**
```
Program/
├── computer1_backend/                    ✅ COMPLETE
│   ├── main_server.py                   ✅ Flask server with Socket.IO
│   ├── run.py                           ✅ Server startup script
│   ├── requirements.txt                 ✅ All dependencies
│   ├── README.md                        ✅ Setup instructions
│   ├── static/
│   │   ├── js/
│   │   │   ├── client.js               ✅ Client-side logic
│   │   │   ├── three.min.js            ✅ Three.js library
│   │   │   └── socket.io.min.js        ✅ Socket.IO client
│   │   ├── css/
│   │   │   └── style.css               ✅ Theatrical styling
│   │   └── other_images_for_animation/ ✅ Directory created
│   ├── templates/
│   │   └── index.html                  ✅ Main client page
│   └── data/
│       ├── originals/                  ✅ For SD card images
│       └── cropped_eyes/               ✅ For processed eyes
│
├── shared/
│   ├── documentation/
│   │   └── PROJECT_PLAN.md             ✅ This updated plan
│   └── test_images/                    🚧 TO CREATE
└── [Next files to implement:]          🔄 PENDING
    ├── image_processor.py              🚧 Image processing core
    ├── sd_card_monitor.py              🔄 SD card detection
    └── keyboard_listener.py            🔄 Hotkey system
```

## 10. Technical Notes

### **Current Working Features:**
- Server starts on `http://localhost:5000` and `http://[LOCAL_IP]:5000`
- Client connects via Socket.IO with real-time status updates
- Three.js scene renders with placeholder geometric meshes
- Debug panel shows connection status and test capabilities
- Responsive design works on different screen sizes

### **Ready for Next Development Phase:**
- Image processing pipeline (OpenCV integration)
- File monitoring system (watchdog integration)
- Real-time image display system

### **Development Environment:**
- Python 3.x with all dependencies installed
- Flask development server with debug mode
- Socket.IO for real-time communication
- Three.js r140 for 3D graphics
- Windows PowerShell environment

This plan provides a comprehensive roadmap. We can adjust and elaborate on specific sections as development progresses. 