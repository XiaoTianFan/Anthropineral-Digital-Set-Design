# Experimental Theatre Digital Program

A digital program for experimental theatre that processes audience photos and creates interactive visual displays using real-time eye detection and 3D animations.

## Project Overview

This system consists of:
1. **🤖 SD Card Auto-Import Pipeline**: Automatically detects camera SD cards and imports new images with real-time progress tracking
2. **Image Processing Pipeline**: Automatically detects faces and crops eyes from photos using OpenCV
3. **🎭 Visual Effects System**: Web-based interface with sophisticated 3-phase interactive 3D animations using real eye images
4. **Real-time Communication**: Socket.IO for live updates between all system components
5. **File Monitoring**: Automatic processing of new images with comprehensive status tracking

## Current Status

### ✅ **Milestone 4: Visual Effects System - COMPLETED** 🎉
- **🎭 Complete 3-Phase Interactive Experience**: Full visual effects system with particle dynamics and eye-textured animations
- **Phase 1 - Particle Foundation**: Enhanced sphere particles with depth-based brightness and smooth 60fps performance
- **Phase 2 - Eye Shape Integration**: Real eye images mapped as textures on orbiting 3D shapes with particle attraction
- **Phase 3 - Convergence Animation**: Dramatic 8-second convergence with speed acceleration and completion detection
- **Automatic Phase Transitions**: System responds intelligently to eye image availability
- **Manual Controls**: Test triggers and reset functionality via debug panel
- **Production-Ready Performance**: Optimized rendering with 150 particles + 20 eye shapes

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
5. **3D Animation System** → Interactive visual effects with eye-textured shapes
6. **Manual Animation Control** → Test triggers for convergence animation
7. **Professional Monitoring** → Live status updates and configuration controls

### 🔄 **Next Priority: Keyboard Trigger Integration**
With the complete visual effects system operational, the final enhancement is server-side keyboard triggers for live theatre automation.

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
- **Eye Images Display**: Real-time display of processed eye images
- **🎭 3D Visual Effects Canvas**: Complete 3-phase interactive animation system
- **Debug Panel**: Testing tools and system information

### 3. System Operation

#### **🎭 Interactive 3D Visual Effects System**
1. **Phase 1 - Particle Display**: Beautiful sphere particles with depth-based brightness when no eye images present
2. **Phase 2 - Eye Shape Animation**: Automatic creation of orbiting 3D shapes when eye images become available
3. **Phase 3 - Convergence Animation**: Manual trigger via "Trigger Animation" button for dramatic convergence effect
4. **Real-time Transitions**: System automatically detects eye images and transitions between phases
5. **Performance Optimized**: Smooth 60fps rendering with up to 150 particles and 20 eye shapes
6. **Reset Capability**: "Reset Animation" button to restart convergence for multiple performances

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
- **Refresh Status**: Manually request status updates
- **Clear Images**: Remove displayed eye images
- **Refresh Eye Images**: Clear and reload existing eye images from server
- **Clear Debug**: Clear debug message history
- **Toggle Panel**: Use 🔧 button to show/hide debug panel
- **Collapsible Sections**: Click section headers to expand/collapse content

#### **🤖 SD Card Auto-Import System** (NEW!)
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
- **🎭 3D Visual Effects System**: Complete 3-phase interactive animation system with eye-textured shapes
- **Real-time Communication**: Bidirectional Socket.IO events with comprehensive auto-import events
- **Debug Tools**: Comprehensive testing and status monitoring with SD card management and animation controls
- **Eye Images Display**: Automatic loading and real-time display of processed eye images
- **UI Layout**: Clean performance interface with collapsible debug panel and auto-import configuration
- **Auto-Import Configuration**: Professional toggle controls with live status indicators and progress tracking

### 🚧 **Current Issues**
None - All core functionality including complete SD card auto-import pipeline and 3D visual effects system is working correctly! 🎉

### 🔄 **Next Milestones**
1. **Keyboard Triggers**: Global hotkey support for animation control (final automation feature)
2. **Final Polish**: Performance optimization and production deployment features

## Technical Architecture

### **🎭 3D Visual Effects System** (NEW!)
1. **Phase 1 - Pure Particles**: 150 sphere particles with depth-based brightness spawning from center
2. **Phase 2 - Eye Shapes**: Real eye images mapped as textures on orbiting 3D shapes (cube, bipyramid, pentagon)
3. **Phase 3 - Convergence**: 8-second dramatic animation where all shapes converge to center with accelerating speeds
4. **Particle Attraction**: Dynamic attraction forces between particles and eye shapes
5. **Automatic Transitions**: Intelligent phase detection based on eye image availability
6. **Performance Optimization**: THREE.InstancedMesh for efficient rendering, 60fps target
7. **Manual Controls**: Test triggers and reset functionality via debug panel

### **Image Processing Pipeline**
1. **Input**: Images placed in `data/originals/` folder (manually or via SD card auto-import)
2. **Processing**: OpenCV Haar cascade face/eye detection
3. **Output**: Cropped eye images saved to `data/cropped_eyes/`
4. **Notification**: Real-time Socket.IO events to connected clients
5. **Fallback**: Dummy eye generation when detection fails
6. **🎭 Animation Integration**: Automatic creation of textured 3D shapes for new eye images

### **🤖 SD Card Auto-Import System** (NEW!)
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
- **Image Limits**: Maximum 20 images displayed at once

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
│   ├── js/                 # Client-side JavaScript with 🎭 complete 3D visual effects system
│   ├── css/                # Styling including auto-import configuration controls
│   └── other_images_for_animation/  # Assets for 3D animations
└── templates/
    └── index.html          # Main client interface with SD card management panel
```

## Troubleshooting

### **Status Shows "Error"**
- Check console output for detailed error messages
- Use "Refresh Status" button in debug panel
- Verify all dependencies are properly installed

### **Images Not Processing**
- Verify images contain faces (use portrait photos)
- Check `data/originals/` folder permissions
- Monitor console for processing logs
- Try "Test Processing" button for generated test image

### **🎭 Animation Issues**
- **Particles Not Showing**: Check Three.js canvas area, verify WebGL support in browser
- **Eye Shapes Not Creating**: Ensure eye images are processed and available in cropped_eyes folder
- **Convergence Not Working**: Use "Trigger Animation" button in debug panel
- **Performance Issues**: Check browser console for WebGL errors, try reducing particle count

### **Connection Issues**
- Verify server is running on correct IP and port
- Check firewall settings for port 5000
- Use "Test Connection" button in debug panel

### **OpenCV Issues**
- Ensure all dependencies installed: `pip install -r requirements.txt`
- Check Python version compatibility (3.8+)
- Verify OpenCV cascade files are accessible

### **🤖 SD Card Auto-Import Issues** (NEW!)
- **SD Card Not Detected**: 
  - Verify SD card contains camera folder structure (DCIM, etc.)
  - Check if SD card is properly mounted and accessible
  - Use "Scan for Cards" button to manually trigger detection
  - Ensure SD card size is within supported range (32MB - 512GB)
- **Auto-Import Not Working**:
  - Check auto-import toggle is enabled in SD Card Management section
  - Verify SD card contains image files with supported extensions
  - Monitor console for import error messages
  - Use manual "Import New" button to test import functionality
- **Import Progress Stuck**:
  - Check file permissions on SD card and originals folder
  - Verify sufficient disk space for import operation
  - Monitor console for file copy errors
  - Try refreshing the page and checking import status

---

*Part of the Make Art Here Project 2 at NYUAD* 