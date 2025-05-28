// Experimental Theatre Digital Program - Client-side JavaScript

class TheatreClient {
    constructor() {
        this.socket = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationMeshes = [];
        this.isAnimationTriggered = false;
        
        this.init();
    }

    init() {
        console.log('Initializing Theatre Client...');
        
        // Initialize Socket.IO connection
        this.initSocketIO();
        
        // Initialize Three.js scene
        this.initThreeJS();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start render loop
        this.animate();
    }

    initSocketIO() {
        // Connect to the server
        this.socket = io();
        
        const connectionStatus = document.getElementById('connection-status');
        
        this.socket.on('connect', () => {
            console.log('Connected to server');
            connectionStatus.textContent = 'Connected';
            connectionStatus.className = 'connected';
            this.addDebugMessage('Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            connectionStatus.textContent = 'Disconnected';
            connectionStatus.className = 'disconnected';
            this.addDebugMessage('Disconnected from server');
        });

        this.socket.on('server_message', (data) => {
            console.log('Server message:', data);
            this.addDebugMessage(`Server: ${data.data}`);
        });

        this.socket.on('test_response', (data) => {
            console.log('Test response:', data);
            this.addDebugMessage(`Test response: ${data.data}`);
        });

        this.socket.on('new_eye_image_available', (data) => {
            console.log('New eye image available:', data);
            this.displayEyeImage(data.filename);
        });

        this.socket.on('trigger_final_animation', (data) => {
            console.log('Trigger final animation received');
            this.triggerFinalAnimation();
        });
    }

    initThreeJS() {
        console.log('Initializing Three.js scene...');
        
        const container = document.getElementById('three-canvas-container');
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            container.clientWidth / container.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        // Add some initial lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        // Create some placeholder meshes for the animation
        this.createPlaceholderMeshes();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    createPlaceholderMeshes() {
        // Create some basic geometric shapes that will be used in the animation
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.ConeGeometry(0.3, 0.6, 8),
            new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8),
            new THREE.TetrahedronGeometry(0.4)
        ];

        const material = new THREE.MeshLambertMaterial({ 
            color: 0x666666,
            transparent: true,
            opacity: 0.7
        });

        for (let i = 0; i < 10; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            // Random initial position
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            
            // Random rotation
            mesh.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            this.scene.add(mesh);
            this.animationMeshes.push(mesh);
        }

        console.log(`Created ${this.animationMeshes.length} placeholder meshes`);
    }

    displayEyeImage(filename) {
        console.log(`Displaying eye image: ${filename}`);
        
        const container = document.getElementById('eye-images-container');
        
        // Create image element
        const img = document.createElement('img');
        img.src = `/eyes/${filename}`;
        img.className = 'eye-image';
        img.alt = 'Eye from audience';
        
        // Add loading animation
        img.onload = () => {
            setTimeout(() => {
                img.classList.add('loaded');
            }, 100);
        };

        // Add to container
        container.appendChild(img);
        
        this.addDebugMessage(`Added eye image: ${filename}`);
    }

    triggerFinalAnimation() {
        console.log('Starting final animation...');
        this.isAnimationTriggered = true;
        
        // Animate meshes forming into a sphere and flowing
        this.animationMeshes.forEach((mesh, index) => {
            // Calculate position on sphere
            const phi = Math.acos(-1 + (2 * index) / this.animationMeshes.length);
            const theta = Math.sqrt(this.animationMeshes.length * Math.PI) * phi;
            
            const radius = 3;
            const targetX = radius * Math.cos(theta) * Math.sin(phi);
            const targetY = radius * Math.sin(theta) * Math.sin(phi);
            const targetZ = radius * Math.cos(phi);

            // Animate to sphere position
            this.animateToPosition(mesh, targetX, targetY, targetZ, 2000);
        });

        this.addDebugMessage('Final animation triggered');
    }

    animateToPosition(mesh, x, y, z, duration) {
        const startPosition = mesh.position.clone();
        const targetPosition = new THREE.Vector3(x, y, z);
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease out)
            const eased = 1 - Math.pow(1 - progress, 3);
            
            mesh.position.lerpVectors(startPosition, targetPosition, eased);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate meshes
        this.animationMeshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            
            if (this.isAnimationTriggered) {
                // Add flowing motion
                const time = Date.now() * 0.001;
                mesh.position.x += Math.sin(time + index) * 0.002;
                mesh.position.y += Math.cos(time + index) * 0.002;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const container = document.getElementById('three-canvas-container');
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    setupEventListeners() {
        // Test connection button
        document.getElementById('test-connection').addEventListener('click', () => {
            this.socket.emit('test_message', { message: 'Hello from client!' });
        });

        // Test animation button
        document.getElementById('test-animation').addEventListener('click', () => {
            this.triggerFinalAnimation();
        });
    }

    addDebugMessage(message) {
        const debugMessages = document.getElementById('debug-messages');
        const timestamp = new Date().toLocaleTimeString();
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `[${timestamp}] ${message}`;
        debugMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        debugMessages.scrollTop = debugMessages.scrollHeight;
        
        // Keep only last 50 messages
        while (debugMessages.children.length > 50) {
            debugMessages.removeChild(debugMessages.firstChild);
        }
    }
}

// Initialize the client when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.theatreClient = new TheatreClient();
}); 