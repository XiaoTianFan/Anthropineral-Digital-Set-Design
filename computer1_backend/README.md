# Experimental Theatre Digital Program

A digital program for experimental theatre that processes audience photos and creates interactive visual displays using real-time eye detection and 3D animations.

## Project Overview

This system consists of:
1. **Image Processing Pipeline**: Automatically detects faces and crops eyes from photos using OpenCV
2. **Visual Client**: Web-based interface that displays processed eye images and creates animated 3D visualizations
3. **Real-time Communication**: Socket.IO for live updates between image processing and visual display
4. **File Monitoring**: Automatic processing of new images added to the originals folder

## Current Status

### ✅ **Milestone 2: Image Processing Core - COMPLETED**
- **Image Processor**: Complete OpenCV face/eye detection with fallback generation
- **File Monitoring**: Automatic processing using watchdog when new images are added
- **Real-time Updates**: Socket.IO integration for live status and image notifications
- **Client Interface**: Responsive web client with status indicators and debugging tools
- **Error Handling**: Comprehensive logging and fallback mechanisms

### ✅ **Status Communication Bug - FIXED**
**Previous Issue**: When using `run.py`, the image processor status showed as "Error" in the web client, even though the processor initialized correctly when running `main_server.py` directly.

**Root Cause**: The `run.py` script imported the Flask app but didn't trigger the startup sequence that initializes the image processor.

**Solution**: Updated `run.py` to properly trigger the startup sequence, ensuring it behaves identically to running `main_server.py` directly.

### 🔄 **Next Priority: SD Card Integration**
With the core image processing pipeline working reliably, the next milestone is implementing automatic SD card detection and image import functionality.

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
- **3D Animation Canvas**: Three.js scene for future animations
- **Debug Panel**: Testing tools and system information

### 3. System Operation

#### **Testing the Image Processing**
1. **Add Test Images**: Copy any images with faces to `Program/computer1_backend/data/originals/`
2. **Automatic Processing**: The system will automatically detect and process new images
3. **View Results**: Processed eye images appear in `Program/computer1_backend/data/cropped_eyes/` and display on the web client
4. **Status Monitoring**: Watch the console for processing logs and the web client for status updates

#### **Using the Debug Panel**
- **Test Connection**: Verify Socket.IO communication
- **Test Processing**: Generate and process a test face image
- **Refresh Status**: Manually request status updates
- **Clear Images**: Remove displayed eye images
- **Clear Debug**: Clear debug message history

## Implementation Status

### ✅ **Completed Components**
- **Flask Server**: Full Socket.IO integration with status tracking
- **Image Processor**: OpenCV face/eye detection with comprehensive error handling
- **File Monitoring**: Watchdog-based automatic processing of new images  
- **Client Interface**: Complete web interface with real-time updates
- **Three.js Integration**: Basic 3D scene setup for future animations
- **Real-time Communication**: Bidirectional Socket.IO events
- **Debug Tools**: Comprehensive testing and status monitoring

### 🚧 **Current Issues**
None - All core functionality is working correctly.

### 🔄 **Next Milestones**
1. **SD Card Integration**: Automatic SD card detection and image import  
2. **Animation Enhancement**: Integrate real eye images into Three.js animations
3. **Keyboard Triggers**: Global hotkey support for animation control

## Technical Architecture

### **Image Processing Pipeline**
1. **Input**: Images placed in `data/originals/` folder
2. **Processing**: OpenCV Haar cascade face/eye detection
3. **Output**: Cropped eye images saved to `data/cropped_eyes/`
4. **Notification**: Real-time Socket.IO events to connected clients
5. **Fallback**: Dummy eye generation when detection fails

### **Real-time Communication**
- **Socket.IO Events**: 
  - `connection_status`: System status updates
  - `new_eye_image_available`: New processed eye images
  - `trigger_final_animation`: Animation trigger events
  - Client request events for testing and status

### **File Structure**
```
computer1_backend/
├── main_server.py          # Main Flask server with image processor integration
├── image_processor.py      # OpenCV face/eye detection and file monitoring  
├── run.py                  # Server startup script (has bug)
├── requirements.txt        # Python dependencies
├── data/
│   ├── originals/          # Input images (monitored folder)
│   └── cropped_eyes/       # Processed eye images (served to client)
├── static/
│   ├── js/                 # Client-side JavaScript
│   ├── css/                # Styling
│   └── other_images_for_animation/  # Assets for 3D animations
└── templates/
    └── index.html          # Main client interface
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

### **Connection Issues**
- Verify server is running on correct IP and port
- Check firewall settings for port 5000
- Use "Test Connection" button in debug panel

### **OpenCV Issues**
- Ensure all dependencies installed: `pip install -r requirements.txt`
- Check Python version compatibility (3.8+)
- Verify OpenCV cascade files are accessible

---

*Part of the Make Art Here Project 2 at NYUAD* 