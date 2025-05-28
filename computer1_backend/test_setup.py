#!/usr/bin/env python3
"""
Test script to verify the Experimental Theatre Digital Program setup
"""

import sys
import os
import importlib.util

def test_imports():
    """Test that all required packages can be imported"""
    print("Testing Python package imports...")
    
    required_packages = [
        ('flask', 'Flask'),
        ('flask_socketio', 'Flask-SocketIO'), 
        ('cv2', 'OpenCV'),
        ('PIL', 'Pillow'),
        ('watchdog.observers', 'Watchdog'),
        ('keyboard', 'Keyboard'),
        ('psutil', 'psutil'),
        ('socketio', 'python-socketio'),
        ('engineio', 'python-engineio')
    ]
    
    results = []
    for package, name in required_packages:
        try:
            if '.' in package:
                # Handle nested imports like watchdog.observers
                parent = package.split('.')[0]
                __import__(parent)
                __import__(package)
            else:
                __import__(package)
            print(f"  ✅ {name} - OK")
            results.append(True)
        except ImportError as e:
            print(f"  ❌ {name} - FAILED: {e}")
            results.append(False)
    
    return all(results)

def test_directories():
    """Test that all required directories exist"""
    print("\nTesting directory structure...")
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    required_dirs = [
        'static/js',
        'static/css', 
        'static/other_images_for_animation',
        'templates',
        'data/originals',
        'data/cropped_eyes'
    ]
    
    results = []
    for dir_path in required_dirs:
        full_path = os.path.join(base_dir, dir_path)
        if os.path.exists(full_path):
            print(f"  ✅ {dir_path} - EXISTS")
            results.append(True)
        else:
            print(f"  ❌ {dir_path} - MISSING")
            results.append(False)
    
    return all(results)

def test_static_files():
    """Test that required static files exist"""
    print("\nTesting static files...")
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    required_files = [
        'static/js/three.min.js',
        'static/js/socket.io.min.js',
        'static/js/client.js',
        'static/css/style.css',
        'templates/index.html',
        'main_server.py',
        'run.py',
        'requirements.txt'
    ]
    
    results = []
    for file_path in required_files:
        full_path = os.path.join(base_dir, file_path)
        if os.path.exists(full_path):
            file_size = os.path.getsize(full_path)
            print(f"  ✅ {file_path} - EXISTS ({file_size} bytes)")
            results.append(True)
        else:
            print(f"  ❌ {file_path} - MISSING")
            results.append(False)
    
    return all(results)

def test_server_import():
    """Test that the server can be imported without errors"""
    print("\nTesting server import...")
    
    try:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import main_server
        print("  ✅ main_server.py imports successfully")
        
        # Test that required components exist
        if hasattr(main_server, 'app'):
            print("  ✅ Flask app object exists")
        else:
            print("  ❌ Flask app object missing")
            return False
            
        if hasattr(main_server, 'socketio'):
            print("  ✅ SocketIO object exists")
        else:
            print("  ❌ SocketIO object missing") 
            return False
            
        return True
    except Exception as e:
        print(f"  ❌ Server import failed: {e}")
        return False

def test_opencv_basic():
    """Test basic OpenCV functionality"""
    print("\nTesting OpenCV basic functionality...")
    
    try:
        import cv2
        import numpy as np
        
        # Test that OpenCV can load haar cascades for face detection
        face_cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        if os.path.exists(face_cascade_path):
            face_cascade = cv2.CascadeClassifier(face_cascade_path)
            print("  ✅ Face detection cascade loaded")
        else:
            print("  ❌ Face detection cascade not found")
            return False
            
        # Test eye cascade
        eye_cascade_path = cv2.data.haarcascades + 'haarcascade_eye.xml'
        if os.path.exists(eye_cascade_path):
            eye_cascade = cv2.CascadeClassifier(eye_cascade_path)
            print("  ✅ Eye detection cascade loaded")
        else:
            print("  ❌ Eye detection cascade not found")
            return False
            
        # Test creating a test image
        test_img = np.zeros((100, 100, 3), dtype=np.uint8)
        print("  ✅ NumPy array creation works")
        
        return True
    except Exception as e:
        print(f"  ❌ OpenCV test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("  Experimental Theatre Digital Program - Setup Test")
    print("=" * 60)
    
    tests = [
        ("Package Imports", test_imports),
        ("Directory Structure", test_directories),
        ("Static Files", test_static_files),
        ("Server Import", test_server_import),
        ("OpenCV Functionality", test_opencv_basic)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print(f"\n❌ {test_name} failed with exception: {e}")
            results.append(False)
    
    print("\n" + "=" * 60)
    print("  TEST SUMMARY")
    print("=" * 60)
    
    for i, (test_name, _) in enumerate(tests):
        status = "✅ PASS" if results[i] else "❌ FAIL"
        print(f"  {test_name:<25} {status}")
    
    all_passed = all(results)
    print(f"\nOverall Status: {'✅ ALL TESTS PASSED' if all_passed else '❌ SOME TESTS FAILED'}")
    
    if all_passed:
        print("\n🎉 Setup is complete! You can now run the server with:")
        print("   python run.py")
        print("\n📝 Next steps:")
        print("   1. Start the server: python run.py")
        print("   2. Open browser to: http://localhost:5000")
        print("   3. Test Socket.IO connection with debug panel")
        print("   4. Proceed to Milestone 2: Image Processing")
    else:
        print("\n🔧 Please fix the failing tests before proceeding.")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main()) 