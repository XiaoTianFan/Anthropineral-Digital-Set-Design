# Experimental Theatre Digital Program

A digital program for experimental theatre that processes audience photos and creates interactive visual displays.

## Project Overview

This system consists of:
1. **Image Processing Pipeline**: Automatically detects SD card insertion, copies images, and crops eyes from audience photos
2. **Visual Client**: Web-based interface that displays processed eye images and creates animated 3D visualizations
3. **Real-time Communication**: Socket.IO for live updates between image processing and visual display

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- A camera with SD card support
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

3. **Verify directory structure**:
   ```
   computer1_backend/
   ├── main_server.py          # Main Flask server
   ├── run.py                  # Server startup script
   ├── requirements.txt        # Python dependencies
   ├── static/
   │   ├── js/
   │   │   ├── three.min.js    # Three.js library
   │   │   ├── socket.io.min.js # Socket.IO client
   │   │   └── client.js       # Main client JavaScript
   │   ├── css/
   │   │   └── style.css       # Client styles
   │   └── other_images_for_animation/  # Images for 3D animation
   ├── templates/
   │   └── index.html          # Main client template
   └── data/
       ├── originals/          # Original images from SD card
       └── cropped_eyes/       # Processed eye images
   ```

## Running the System

### 1. Start the Server (Computer 1)

```bash
python run.py
```

The server will start and show:
- Local access: `http://localhost:5000`
- Network access: `http://[YOUR_LOCAL_IP]:5000`

### 2. Access the Client (Computer 2)

Open a web browser and navigate to `http://[COMPUTER1_IP]:5000`

### 3. System Operation

1. **Image Collection**: Insert SD card with audience photos into Computer 1
2. **Image Processing**: The system will automatically:
   - Detect the SD card
   - Copy images to `data/originals/`
   - Process images to crop out eyes
   - Save cropped eyes to `data/cropped_eyes/`
3. **Visual Display**: The client will automatically display new eye images
4. **Animation Trigger**: Press the configured keyboard shortcut on Computer 1 to trigger the 3D animation

## Current Implementation Status

### ✅ Completed (Milestone 1)
- [x] Basic Flask server with Socket.IO
- [x] HTML template with placeholder sections
- [x] CSS styling with theatrical theme
- [x] JavaScript client with Socket.IO connection
- [x] Three.js integration setup
- [x] Project directory structure
- [x] Requirements and dependencies

### 🚧 Next Steps (Milestone 2)
- [ ] SD card detection system
- [ ] Image copy functionality
- [ ] Eye detection and cropping (OpenCV)
- [ ] Real-time image processing pipeline

### 🔄 Future Milestones
- [ ] Animation image loading system
- [ ] 3D mesh creation and blending
- [ ] Keyboard shortcut handling
- [ ] Sphere animation with Three.js
- [ ] Digital creature flow effects

## Development Notes

- The system is designed to run everything from Computer 1 (Windows)
- Computer 2 only needs a web browser
- All communication happens over the local network
- Images are processed server-side and streamed to the client

## Troubleshooting

1. **Can't access from Computer 2**: Check firewall settings and network connectivity
2. **Images not processing**: Verify OpenCV installation and image permissions
3. **Socket.IO not connecting**: Check that the server is running and ports are open

---

*This is part of the Make Art Here Project 2 at NYUAD* 