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
            
            // Request existing eye images when connected
            this.requestExistingEyes();
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
            this.displayEyeImage(data.filename, data.url, data.existing);
            
            const messagePrefix = data.existing ? 'Loaded existing' : 'New';
            this.addDebugMessage(`${messagePrefix} eye image: ${data.filename}`);
        });

        this.socket.on('trigger_final_animation', (data) => {
            console.log('Trigger final animation received:', data);
            this.triggerFinalAnimation();
            this.addDebugMessage('Animation triggered from server');
        });

        this.socket.on('connection_status', (data) => {
            console.log('Connection status update:', data);
            this.updateSystemStatus(data);
            
            // If there's an error, show it in debug
            if (data.error) {
                this.addDebugMessage(`Image Processor Error: ${data.error}`, 'error');
            }
        });

        this.socket.on('test_processing_result', (data) => {
            console.log('Test processing result:', data);
            this.addDebugMessage(`Image processing: ${data.message}`);
            
            if (data.status === 'success') {
                this.addDebugMessage(`Found ${data.eyes_found} eyes in test image`);
            }
        });

        // SD Card event handlers
        this.socket.on('sd_card_detected', (data) => {
            console.log('SD card detected:', data);
            this.addDebugMessage(`SD card detected: ${data.label} (${data.total_images} images)`, 'success');
            this.updateSDCardDisplay();
        });

        this.socket.on('sd_card_removed', (data) => {
            console.log('SD card removed:', data);
            this.addDebugMessage(`SD card removed: ${data.label}`, 'warning');
            this.updateSDCardDisplay();
        });

        this.socket.on('sd_card_status', (data) => {
            console.log('SD card status update:', data);
            this.updateSDCardStatus(data);
        });

        this.socket.on('sd_card_scan_result', (data) => {
            console.log('SD card scan result:', data);
            if (data.status === 'success') {
                this.addDebugMessage(`Card scan found ${data.cards_found} cards`);
                this.updateSDCardDisplay(data.cards);
            } else {
                this.addDebugMessage(`Card scan error: ${data.message}`, 'error');
            }
        });

        this.socket.on('import_started', (data) => {
            console.log('Import started:', data);
            this.addDebugMessage(`Import started: ${data.total_files} files from ${data.sd_card_label}`, 'success');
            this.showImportProgress();
            this.updateImportStatus('importing');
        });

        this.socket.on('import_progress', (data) => {
            console.log('Import progress:', data);
            this.updateImportProgress(data);
        });

        this.socket.on('import_completed', (data) => {
            console.log('Import completed:', data);
            this.addDebugMessage(`Import completed: ${data.total_imported} files imported in ${data.duration}s`, 'success');
            this.hideImportProgress();
            this.updateImportStatus('ready');
            this.updateSDCardDisplay(); // Refresh display
        });

        this.socket.on('import_error', (data) => {
            console.log('Import error:', data);
            this.addDebugMessage(`Import error: ${data.error_message}`, 'error');
            this.hideImportProgress();
            this.updateImportStatus('error');
        });

        this.socket.on('sd_card_import_result', (data) => {
            console.log('SD card import result:', data);
            if (data.status === 'started') {
                this.addDebugMessage('Import started in background');
            } else if (data.status === 'success') {
                this.addDebugMessage(`Import successful: ${data.imported_count} files`, 'success');
            } else if (data.status === 'error') {
                this.addDebugMessage(`Import failed: ${data.message}`, 'error');
            }
        });

        // Auto-import event handlers
        this.socket.on('auto_import_started', (data) => {
            console.log('Auto-import started:', data);
            this.addDebugMessage(`🤖 Auto-import started: ${data.card_label}`, 'success');
            this.showImportProgress();
            this.updateImportStatus('importing');
        });

        this.socket.on('auto_import_completed', (data) => {
            console.log('Auto-import completed:', data);
            this.addDebugMessage(`🤖 Auto-import completed: ${data.imported_count} files from ${data.card_id}`, 'success');
            this.hideImportProgress();
            this.updateImportStatus('ready');
            this.updateSDCardDisplay(); // Refresh display
        });

        this.socket.on('auto_import_error', (data) => {
            console.log('Auto-import error:', data);
            this.addDebugMessage(`🤖 Auto-import error: ${data.error_message}`, 'error');
            this.hideImportProgress();
            this.updateImportStatus('error');
        });

        // Request status updates periodically
        this.requestStatusUpdate();
        this.statusUpdateInterval = setInterval(() => {
            this.requestStatusUpdate();
        }, 5000); // Request status every 5 seconds
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

    displayEyeImage(filename, url, existing = false) {
        console.log(`Displaying eye image: ${filename}`);
        
        const container = document.getElementById('eye-images-container');
        
        // Create image element
        const img = document.createElement('img');
        img.src = url;
        img.className = 'eye-image';
        img.alt = 'Eye from audience';
        
        // Add loading animation
        img.onload = () => {
            setTimeout(() => {
                img.classList.add('loaded');
            }, 100);
        };

        // Add to container (existing images go at the end, new ones at the beginning)
        if (existing) {
            container.appendChild(img);
        } else {
            container.insertBefore(img, container.firstChild);
        }
        
        // Keep only last 20 eye images
        while (container.children.length > 20) {
            container.removeChild(container.lastChild);
        }
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
        // Window resize event
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        // Fullscreen change events
        document.addEventListener('fullscreenchange', () => {
            this.onWindowResize();
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.onWindowResize();
        });
        document.addEventListener('msfullscreenchange', () => {
            this.onWindowResize();
        });

        // Test connection button
        document.getElementById('test-connection').addEventListener('click', () => {
            this.socket.emit('test_message', { message: 'Hello from client!' });
            this.addDebugMessage('Sent test message to server');
        });

        // Test animation button
        document.getElementById('test-animation').addEventListener('click', () => {
            this.socket.emit('trigger_animation_test');
            this.addDebugMessage('Requested animation trigger from server');
        });

        // Test image processing button
        const testProcessingBtn = document.getElementById('test-processing');
        if (testProcessingBtn) {
            testProcessingBtn.addEventListener('click', () => {
                this.socket.emit('request_test_processing');
                this.addDebugMessage('Requested test image processing');
            });
        }

        // Clear eye images button
        const clearEyesBtn = document.getElementById('clear-eyes');
        if (clearEyesBtn) {
            clearEyesBtn.addEventListener('click', () => {
                const container = document.getElementById('eye-images-container');
                container.innerHTML = '';
                this.addDebugMessage('Cleared all eye images');
            });
        }

        // Clear debug messages button
        const clearDebugBtn = document.getElementById('clear-debug');
        if (clearDebugBtn) {
            clearDebugBtn.addEventListener('click', () => {
                const debugMessages = document.getElementById('debug-messages');
                debugMessages.innerHTML = '';
            });
        }

        // Refresh eye images button
        const refreshEyesBtn = document.getElementById('refresh-eyes');
        if (refreshEyesBtn) {
            refreshEyesBtn.addEventListener('click', () => {
                const container = document.getElementById('eye-images-container');
                container.innerHTML = ''; // Clear existing images first
                this.requestExistingEyes(); // Request fresh images
                this.addDebugMessage('Refreshed eye images');
            });
        }

        // SD Card control buttons
        const scanSDCardsBtn = document.getElementById('scan-sd-cards');
        if (scanSDCardsBtn) {
            scanSDCardsBtn.addEventListener('click', () => {
                this.socket.emit('request_sd_card_scan');
                this.addDebugMessage('Requested SD card scan');
            });
        }

        const refreshSDStatusBtn = document.getElementById('refresh-sd-status');
        if (refreshSDStatusBtn) {
            refreshSDStatusBtn.addEventListener('click', () => {
                this.socket.emit('request_sd_card_status');
                this.addDebugMessage('Requested SD card status refresh');
            });
        }

        // Auto-import toggle
        const autoImportToggle = document.getElementById('auto-import-toggle');
        if (autoImportToggle) {
            autoImportToggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                const statusText = document.getElementById('auto-import-status');
                
                if (statusText) {
                    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
                    statusText.className = enabled ? 'config-status enabled' : 'config-status disabled';
                }
                
                // TODO: Send configuration update to server
                this.addDebugMessage(`Auto-import ${enabled ? 'enabled' : 'disabled'}`);
            });
        }
    }

    addDebugMessage(message, type = 'info') {
        const debugMessages = document.getElementById('debug-messages');
        const timestamp = new Date().toLocaleTimeString();
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `[${timestamp}] ${message}`;
        messageDiv.className = type;
        debugMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        debugMessages.scrollTop = debugMessages.scrollHeight;
        
        // Keep only last 50 messages
        while (debugMessages.children.length > 50) {
            debugMessages.removeChild(debugMessages.firstChild);
        }
    }

    updateSystemStatus(data) {
        // Update image processor status
        const processorStatus = document.getElementById('processor-status');
        if (processorStatus) {
            processorStatus.textContent = data.image_processor_ready ? 'Ready' : 'Error';
            processorStatus.className = data.image_processor_ready ? 'status-ready' : 'status-error';
        }

        // Update monitoring status
        const monitoringStatus = document.getElementById('monitoring-status');
        if (monitoringStatus) {
            monitoringStatus.textContent = data.monitoring_active ? 'Active' : 'Inactive';
            monitoringStatus.className = data.monitoring_active ? 'status-ready' : 'status-error';
        }

        // Update SD card monitor status
        const sdMonitorStatus = document.getElementById('sd-monitor-status');
        if (sdMonitorStatus) {
            sdMonitorStatus.textContent = data.sd_card_monitoring_active ? 'Active' : 'Inactive';
            sdMonitorStatus.className = data.sd_card_monitoring_active ? 'active' : 'inactive';
        }

        // Update SD card count
        const sdCardsCount = document.getElementById('sd-cards-count');
        if (sdCardsCount && data.current_sd_cards) {
            sdCardsCount.textContent = data.current_sd_cards.length;
        }

        // Update import status
        const importStatus = document.getElementById('import-status');
        if (importStatus) {
            if (data.import_in_progress) {
                importStatus.textContent = 'Importing';
                importStatus.className = 'importing';
            } else {
                importStatus.textContent = 'Ready';
                importStatus.className = 'ready';
            }
        }

        this.addDebugMessage(`System status updated - Processor: ${data.image_processor_ready ? 'Ready' : 'Error'}, Monitoring: ${data.monitoring_active ? 'Active' : 'Inactive'}, SD Cards: ${data.current_sd_cards ? data.current_sd_cards.length : 0}`);
    }

    updateSDCardStatus(data) {
        // Update SD card count
        const sdCardsCount = document.getElementById('sd-cards-count');
        if (sdCardsCount) {
            sdCardsCount.textContent = data.total_cards || 0;
        }

        // Update import status
        const importStatus = document.getElementById('import-status');
        if (importStatus) {
            if (data.import_in_progress) {
                importStatus.textContent = 'Importing';
                importStatus.className = 'importing';
            } else {
                importStatus.textContent = 'Ready';
                importStatus.className = 'ready';
            }
        }

        // Update SD card display if cards data is provided
        if (data.cards) {
            this.updateSDCardDisplay(data.cards);
        }
    }

    updateSDCardDisplay(cards = null) {
        const container = document.getElementById('sd-cards-container');
        const noCardsMessage = document.getElementById('no-cards-message');
        
        if (!cards) {
            // Request SD card status to get current cards
            this.socket.emit('request_sd_card_status');
            return;
        }

        // Clear existing content except no-cards message
        const existingCards = container.querySelectorAll('.sd-card-item');
        existingCards.forEach(card => card.remove());

        if (cards.length === 0) {
            noCardsMessage.style.display = 'block';
        } else {
            noCardsMessage.style.display = 'none';
            
            cards.forEach(card => {
                const cardElement = this.createSDCardElement(card);
                container.insertBefore(cardElement, noCardsMessage);
            });
        }
    }

    createSDCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'sd-card-item';
        
        cardDiv.innerHTML = `
            <div class="sd-card-header">
                <span class="sd-card-label">${card.label}</span>
                <span class="sd-card-size">${card.total_space_gb} GB</span>
            </div>
            <div class="sd-card-details">
                <div class="sd-card-detail">
                    <span>Images:</span>
                    <span>${card.total_images}</span>
                </div>
                <div class="sd-card-detail">
                    <span>Free:</span>
                    <span>${card.free_space_gb} GB</span>
                </div>
                <div class="sd-card-detail">
                    <span>Mount:</span>
                    <span>${card.mount_point}</span>
                </div>
                <div class="sd-card-detail">
                    <span>Format:</span>
                    <span>${card.file_system}</span>
                </div>
            </div>
            <div class="sd-card-controls">
                <button onclick="theatreClient.importFromCard('${card.id}', true)">Import New</button>
                <button onclick="theatreClient.importFromCard('${card.id}', false)">Import All</button>
            </div>
        `;
        
        return cardDiv;
    }

    importFromCard(cardId, importNewOnly = true) {
        this.addDebugMessage(`Starting import from card: ${cardId} (${importNewOnly ? 'new only' : 'all files'})`);
        
        this.socket.emit('request_sd_card_import', {
            card_id: cardId,
            import_new_only: importNewOnly
        });
    }

    showImportProgress() {
        const progressContainer = document.getElementById('import-progress-container');
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
    }

    hideImportProgress() {
        const progressContainer = document.getElementById('import-progress-container');
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
        
        // Reset progress bar
        const progressBar = document.getElementById('import-progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    updateImportProgress(data) {
        // Update progress bar
        const progressBar = document.getElementById('import-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${data.progress_percent}%`;
        }

        // Update progress text
        const progressText = document.getElementById('import-progress-text');
        if (progressText) {
            progressText.textContent = `${data.progress_percent}% - ${data.current_file}/${data.total_files} files`;
        }

        // Update current file
        const currentFile = document.getElementById('current-import-file');
        if (currentFile) {
            currentFile.textContent = data.current_filename || '-';
        }

        // Update imported count
        const importedCount = document.getElementById('imported-count');
        if (importedCount) {
            importedCount.textContent = data.files_imported;
        }

        // Update remaining count
        const remainingCount = document.getElementById('remaining-count');
        if (remainingCount) {
            remainingCount.textContent = data.files_remaining;
        }
    }

    updateImportStatus(status) {
        const importStatus = document.getElementById('import-status');
        if (importStatus) {
            switch (status) {
                case 'importing':
                    importStatus.textContent = 'Importing';
                    importStatus.className = 'importing';
                    break;
                case 'ready':
                    importStatus.textContent = 'Ready';
                    importStatus.className = 'ready';
                    break;
                case 'error':
                    importStatus.textContent = 'Error';
                    importStatus.className = 'error';
                    break;
            }
        }
    }

    requestStatusUpdate() {
        this.socket.emit('request_status');
        this.addDebugMessage('Requested system status update');
    }

    requestExistingEyes() {
        this.socket.emit('request_existing_eyes');
        this.addDebugMessage('Requested existing eye images');
    }
}

// Initialize the client when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.theatreClient = new TheatreClient();
}); 