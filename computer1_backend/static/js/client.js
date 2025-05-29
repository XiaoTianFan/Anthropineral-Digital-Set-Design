// Experimental Theatre Digital Program - Client-side JavaScript

// =============================================================================
// VISUAL EFFECTS CONFIGURATION - Easy parameter tweaking interface
// =============================================================================
const VISUAL_CONFIG = {
    // Particle System Configuration
    particles: {
        count: 2000,                    // Number of particles in the system
        size: 0.01,                   // Size of individual particles (sphere radius) - increased for visibility
        resetDistance: 6,            // Distance from center before particle resets - reduced for camera scale
        depthEffect: {
            maxDistance: 6,          // Maximum distance for depth brightness calculation
            dimming: 0.1              // How much to dim far particles (0-1)
        },
        distribution: {
            radiusMultiplier: 0.6,    // Percentage of reset distance for initial distribution
            initialSpeed: 0.8         // Initial random velocity speed
        },
        color: {
            hueBase: 0.6,             // Base hue for particle colors
            hueVariation: 0.2,        // Random hue variation range
            saturation: 0.3,          // Color saturation
            lightness: 0.95            // Color lightness
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
                baseOpacity: 0.9,     // Base material opacity
                color: 0xffffff       // Base material color
            }
        }
    },
    
    // Particle Attraction Configuration
    attraction: {
        baseStrength: 0.08,           // Base attraction force strength - increased from 0.02
        maxStrength: 0.8,             // Maximum attraction force cap - increased from 0.1
        minDistance: 0.1,             // Minimum distance to avoid division by zero
        distanceOffset: 0.2,          // Distance offset for force calculation
        drag: {
            normal: 0.9,             // Normal drag multiplier (less = more drag)
            intense: 0.95             // Drag during intense convergence
        },
        intensityThreshold: 1.5,      // Threshold for switching to intense mode
        centerAttraction: {
            intensity: 1.0            // Intensity of center attraction in Phase 1
        },
        // Enhanced flow dynamics
        flowDynamics: {
            enabled: true,            // Enable enhanced flow system
            turbulenceStrength: 0.3, // Random turbulence force strength
            repulsionRadius: 0.4,     // Distance at which repulsion starts
            repulsionStrength: 0.1,  // Strength of repulsion force
            circulationStrength: 0.1, // Strength of tangential circulation force
            distributionRadius: 2.0,  // Radius for spatial distribution
            forceBalancing: true,     // Enable force balancing between attractors
            escapeVelocity: 0.2,      // Minimum velocity to escape attractor influence
            flowField: {
                enabled: true,        // Enable global flow field
                strength: 0.1,       // Global flow field strength
                scale: 0.5,           // Scale of flow field noise
                timeScale: 1.0        // Time scaling for flow field animation
            }
        },
        // Shell effect configuration - new addition
        shellEffect: {
            enabled: true,            // Enable shell effect after convergence
            centerAttraction: 0.08,   // Attraction to center during shell phase
            shapeRepulsion: 0.2,     // Repulsion from converged shapes
            repulsionRadius: 1,     // Distance at which shape repulsion starts
            shellRadius: 2.8,         // Target radius for particle shell
            stabilizationForce: 0.08, // Force to maintain shell radius
            turbulence: 0.02,        // Additional turbulence during shell phase
            transitionDuration: 3.0   // Duration to transition into shell effect (seconds)
        },
        // Dispersion effect configuration - particle burst at end of convergence
        dispersionEffect: {
            enabled: true,            // Enable dispersion burst effect
            duration: 2.0,            // Duration of dispersion burst (seconds)
            burstStrength: 0.9,       // Initial outward burst force strength
            randomization: 1,       // Amount of randomization in burst direction
            velocityMultiplier: 3.0,  // Velocity multiplier during burst
            dragReduction: 0.8,       // Reduced drag during dispersion (more = less drag)
            centerRepulsion: 0.5,    // Additional repulsion from center during burst
            resetThreshold: 0.5,      // Progress threshold to trigger particle resets (creates more dramatic spread)
            newParticleSpeed: 2.0     // Speed for newly reset particles during dispersion
        }
    },
    
    // Eye Shape Configuration
    shapes: {
        sizes: {
            cube: 0.3,                // Size of cube shapes
            bipyramid: 0.4,           // Size of bipyramid shapes
            pentagon: {               // Pentagon (pentagonal prism) sizes
                radius: 0.4,
                height: 0.4
            }
        },
        orbital: {
            radius: {
                min: 1.2,               // Minimum orbital radius from center
                max: 2.5                // Maximum orbital radius from center
            },
            speed: {
                min: 0.6,             // Minimum orbital speed
                max: 0.8              // Maximum orbital speed (min + range)
            }
        },
        rotation: {
            speed: 0.015,              // Base rotation speed for shapes
            convergenceMultiplier: 2   // Rotation speed multiplier during convergence
        },
        convergence: {
            duration: 10,              // Duration of convergence animation (seconds)
            targetRadius: 0.5,        // Final radius at center during convergence
            speedMultiplier: 4.0,     // Speed multiplication during convergence (up to 5x)
            scaleMultiplier: 0.5,     // Scale increase during convergence
            intensity: {
                baseMin: 0.75,         // Base minimum intensity during convergence
                baseMax: 0.4,         // Additional intensity range during convergence
                maxMultiplier: 2.0    // Maximum intensity multiplier for particles
            }
        },
        // 🔄 NEW: Morphing Configuration for Constantly Changing 3D Shapes
        morphing: {
            enabled: true,            // Enable morphing functionality
            speed: 1.0,               // Morphing speed multiplier (increased from 0.3 for more visible effects)
            intensity: 0.5,           // Morphing effect intensity (increased from 0.2 for more dramatic effect)
            targets: ['cube', 'bipyramid'], // Available morph targets (cube and bipyramid)
            transitionDuration: 5.0,  // Seconds per complete morph cycle
            easing: 'easeInOutCubic', // Easing function: 'linear', 'easeInOutCubic', 'easeInOutSine'
            convergenceMultiplier: 3.0, // Speed up morphing during convergence (increased from 2.0)
            phaseOffset: true,        // Offset morph timing between shapes for organic variety
            smoothness: 1.0,          // Smoothness factor for morph transitions (0.1-2.0)
            // Advanced morphing settings - focused on vertex noise
            advanced: {
                vertexNoise: 0.15,    // Random vertex displacement for organic variation (increased from 0.05)
                noiseFrequency: 3.0,  // Frequency of noise pattern (increased from 2.0 for more detail)
                noiseAmplitude: 0.25, // Amplitude of vertex displacement (increased from 0.1 for larger deformation)
                timeScale: 1.5,       // Time scaling for animated noise (increased from 1.0 for faster animation)
                preserveTexture: true, // Maintain texture mapping during vertex changes
                adaptiveDetail: true,  // Adjust geometry detail based on noise complexity
                memoryOptimization: true // Enable memory optimization
            }
        },
        material: {
            placeholder: {
                color: 0x888888,      // Placeholder material color before texture loads
                opacity: 0.75         // Placeholder material opacity
            },
            loaded: {
                color: 0xffffff       // Color when texture is loaded (white for proper texture display)
            }
        },
        
        // 🌟 NEW: Shape Emergence Configuration - Gradual appearance system
        emergence: {
            enabled: true,                // Enable emergence animation for new shapes
            duration: 5,                // Duration of emergence animation (seconds)
            startOpacity: 0.0,            // Starting opacity (completely transparent)
            targetOpacity: 0.75,          // Target placeholder opacity after emergence
            easing: 'easeInOutCubic',     // Easing function: 'linear', 'easeInOutCubic', 'easeInOutSine'
            scaleEffect: {
                enabled: true,            // Enable slight scale animation during emergence
                startScale: 0.8,          // Starting scale (slightly smaller)
                targetScale: 1.0,         // Target scale (normal size)
            },
            // Position animation during emergence
            positionEffect: {
                enabled: false,           // Enable position animation (currently disabled for simplicity)
                upwardOffset: 0.2,        // Upward offset during emergence
            }
        },
    },
    
    // Scene and Camera Configuration
    scene: {
        background: 0x00000a,         // Scene background color
        lighting: {
            ambient: {
                color: 0x404040,      // Ambient light color - reduced for better contrast
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
            position: {
                z: 4                  // Camera Z position
            }
        },
        // Orbital Controls Configuration
        controls: {
            enableDamping: true,      // Enable smooth damping (inertia)
            dampingFactor: 0.05,      // Damping factor for smooth interactions
            screenSpacePanning: false, // Disable screen space panning
            minDistance: 1,           // Minimum zoom distance
            maxDistance: 20,          // Maximum zoom distance
            maxPolarAngle: Math.PI,   // Allow full vertical rotation
            autoRotate: false,        // Disable built-in auto-rotation (we'll use custom)
            autoRotateSpeed: 3.0,     // Auto-rotation speed (if enabled)
            // Custom 3D rotation settings
            custom3DRotation: {
                enabled: true,        // Enable custom 3D rotation
                horizontalSpeed: 0.5, // Horizontal rotation speed
                verticalSpeed: 0.4,   // Vertical rotation speed (slower than horizontal)
                verticalRange: 0.8,   // Vertical oscillation range (0-1, where 1 = full range)
                verticalOffset: Math.PI/2, // Vertical center position
                timeScale: 1.0        // Overall time scaling for rotation
            }
        }
    },
    
    // Animation Configuration
    animation: {
        placeholder: {
            rotationSpeed: 0.01,      // Rotation speed for placeholder meshes
            flowMotion: 0.002         // Flow motion amplitude during triggered animation
        },
        easing: {
            cubicFactor: 4,           // Factor for cubic easing (4 * t * t * t)
            cubicSubtract: 2,         // Subtraction factor for cubic easing
            cubicDivide: 2            // Division factor for cubic easing
        }
    },
    
    // System Configuration
    system: {
        maxShapes: 40,                // Maximum number of eye shapes
        shapeTypes: ['cube', 'bipyramid'],  // Available shape types
        maxEyeImages: 40              // Maximum eye images to keep in UI
    },
    
    // Post-Processing Bloom Configuration
    bloom: {
        enabled: true,                // Enable post-processing bloom
        intensity: 1.2,               // Higher bloom intensity for constant glow effect
        threshold: 0.2,               // Lower threshold to capture more particle emission  
        radius: 0.6,                  // Increased radius for better glow spread
        // Advanced bloom settings for constant emission
        exposure: 1.05,                // Tone mapping exposure for bloom
        constantEmission: {
            enabled: true,            // Enable constant emission mode
            baseEmissive: 0x666666,   // Brighter base emissive color for stronger bloom
            emissiveIntensity: 1.3,   // Base emissive intensity for constant glow
            convergenceMultiplier: 1.5, // Multiplier during convergence (reduced from 2.0)
            // Removed pulsing effect - particles now emit constant light like bulbs
        },
        // Performance settings
        performance: {
            quality: 'medium',          // 'low', 'medium', 'high' - affects bloom quality
            adaptiveQuality: true,    // Automatically adjust quality based on performance
            targetFPS: 60             // Target frame rate for adaptive quality
        }
    },
    
    // 🎨 NEW: Client-Side Artistic Texture Processing Configuration
    artisticProcessing: {
        enabled: true,                    // Enable artistic B&W edge processing
        realTimeAdjustment: true,         // Allow real-time parameter changes
        description: "High-contrast B&W edge detection for dramatic 3D textures",
        
        // Edge detection settings
        edgeDetection: {
            method: 'sobel',              // 'sobel', 'roberts', 'prewitt'
            threshold: 0.3,               // Edge threshold (0-1)
            strength: 2.0,                // Edge strength multiplier
            adaptiveThreshold: false      // Use adaptive thresholding
        },
        
        // Contrast enhancement settings
        contrast: {
            factor: 2.5,                  // Contrast multiplication factor
            brightness: -30,              // Brightness offset (-100 to 100)
            gamma: 1.3,                   // Gamma correction for dramatic effect
            autoBalance: true             // Automatic brightness balancing
        },
        
        // Artistic style settings
        style: {
            invertEdges: false,           // True for white edges on black, False for black edges on white
            backgroundColor: 255,         // Background color (0-255)
            edgeColor: 0,                 // Edge color (0-255)
            edgeThickness: 1,             // Edge thickness (1-5)
            noiseReduction: true,         // Apply noise reduction
            smoothing: true               // Apply edge smoothing
        },
        
        // Client-side texture enhancement
        textureEnhancement: {
            enabled: true,                // Enable client-side texture enhancement
            sharpening: 1.2,              // Additional sharpening for 3D textures
            contrastBoost: 1.1,           // Client-side contrast boost
            edgeGlow: {
                enabled: true,            // Add subtle glow to edges
                intensity: 0.3,           // Glow intensity
                color: 0xffffff           // Glow color
            }
        },
        
        // Performance settings
        performance: {
            canvasSize: 256,              // Maximum processing canvas size
            useWorker: false,             // Use web worker for processing (future)
            cacheProcessed: true          // Cache processed textures
        }
    },
};

// =============================================================================
// END CONFIGURATION - Classes and implementation below
// =============================================================================

// 🎨 CLIENT-SIDE ARTISTIC TEXTURE PROCESSOR
// =============================================================================
class ArtisticTextureProcessor {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.initialized = false;
        this.processedCache = new Map(); // Cache for processed textures
        
        // Initialize off-screen canvas for processing
        this.initializeCanvas();
        
        console.log('🎨 Artistic texture processor created');
    }
    
    initializeCanvas() {
        try {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            
            // Set default canvas size from configuration
            const size = VISUAL_CONFIG.artisticProcessing.performance.canvasSize;
            this.canvas.width = size;
            this.canvas.height = size;
            
            // Enable image smoothing for better quality
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
            
            this.initialized = true;
            console.log('🎨 Artistic texture processor canvas initialized');
        } catch (error) {
            console.error('Error initializing artistic texture processor:', error);
            this.initialized = false;
        }
    }
    
    processTexture(sourceImage, callback) {
        if (!this.initialized || !VISUAL_CONFIG.artisticProcessing.enabled) {
            // Return original image if processing disabled
            callback(sourceImage);
            return;
        }
        
        try {
            // Check cache first if enabled
            const cacheKey = this.generateCacheKey(sourceImage.src);
            console.log('🎨 Processing texture with cache key:', cacheKey);
            
            // 🔧 TEMPORARILY DISABLE CACHE for debugging
            // if (VISUAL_CONFIG.artisticProcessing.performance.cacheProcessed && this.processedCache.has(cacheKey)) {
            //     console.log('🎨 Using cached processed texture');
            //     callback(this.processedCache.get(cacheKey));
            //     return;
            // }
            
            // 🔧 FIX: Create a new canvas for each texture instead of reusing this.canvas
            const processingCanvas = document.createElement('canvas');
            const processingCtx = processingCanvas.getContext('2d');
            
            // Enable image smoothing for better quality
            processingCtx.imageSmoothingEnabled = true;
            processingCtx.imageSmoothingQuality = 'high';
            
            // Prepare canvas size
            const maxSize = VISUAL_CONFIG.artisticProcessing.performance.canvasSize;
            const aspectRatio = sourceImage.naturalWidth / sourceImage.naturalHeight;
            
            let canvasWidth, canvasHeight;
            if (aspectRatio > 1) {
                canvasWidth = Math.min(maxSize, sourceImage.naturalWidth);
                canvasHeight = canvasWidth / aspectRatio;
            } else {
                canvasHeight = Math.min(maxSize, sourceImage.naturalHeight);
                canvasWidth = canvasHeight * aspectRatio;
            }
            
            processingCanvas.width = canvasWidth;
            processingCanvas.height = canvasHeight;
            
            console.log(`🎨 Processing canvas size: ${canvasWidth}x${canvasHeight} for ${sourceImage.src}`);
            
            // Draw source image to the new canvas
            processingCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            processingCtx.drawImage(sourceImage, 0, 0, canvasWidth, canvasHeight);
            
            // Get image data for processing from the new canvas
            const imageData = processingCtx.getImageData(0, 0, canvasWidth, canvasHeight);
            const data = imageData.data;
            
            // Apply artistic processing pipeline
            this.applyProcessingPipeline(data, canvasWidth, canvasHeight);
            
            // Put processed data back to the new canvas
            processingCtx.putImageData(imageData, 0, 0);
            
            // Create Three.js texture from the processed canvas (not the shared canvas)
            const processedTexture = new THREE.CanvasTexture(processingCanvas);
            this.configureTexture(processedTexture);
            
            // Add a unique identifier to help with debugging
            processedTexture.userData = { 
                sourceUrl: sourceImage.src,
                processedAt: Date.now(),
                canvasId: `canvas_${Math.random().toString(36).substr(2, 9)}`
            };
            
            console.log(`🎨 Created unique texture:`, processedTexture.userData);
            
            // Cache the result if enabled (currently disabled for debugging)
            // if (VISUAL_CONFIG.artisticProcessing.performance.cacheProcessed) {
            //     this.processedCache.set(cacheKey, processedTexture);
            // }
            
            console.log('🎨 Applied artistic processing: high-contrast B&W edges');
            callback(processedTexture);
            
        } catch (error) {
            console.error('Error processing texture:', error);
            callback(sourceImage); // Fallback to original
        }
    }
    
    applyProcessingPipeline(data, width, height) {
        // Step 1: Convert to grayscale
        this.convertToGrayscale(data);
        
        // Step 2: Apply contrast enhancement
        this.applyContrastEnhancement(data);
        
        // Step 3: Apply noise reduction if enabled
        if (VISUAL_CONFIG.artisticProcessing.style.noiseReduction) {
            this.applyNoiseReduction(data, width, height);
        }
        
        // Step 4: Detect edges
        this.applyEdgeDetection(data, width, height);
        
        // Step 5: Apply artistic styling
        this.applyArtisticStyle(data);
        
        // Step 6: Apply smoothing if enabled
        if (VISUAL_CONFIG.artisticProcessing.style.smoothing) {
            this.applySmoothing(data, width, height);
        }
    }
    
    convertToGrayscale(data) {
        for (let i = 0; i < data.length; i += 4) {
            // Convert RGB to grayscale using luminance formula
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = data[i + 1] = data[i + 2] = gray;
            // Keep alpha unchanged
        }
    }
    
    applyContrastEnhancement(data) {
        const { factor, brightness, gamma, autoBalance } = VISUAL_CONFIG.artisticProcessing.contrast;
        
        // Auto-balance brightness if enabled
        let adjustedBrightness = brightness;
        if (autoBalance) {
            // Calculate average brightness
            let sum = 0;
            for (let i = 0; i < data.length; i += 4) {
                sum += data[i];
            }
            const avgBrightness = sum / (data.length / 4);
            adjustedBrightness = brightness + (128 - avgBrightness) * 0.3;
        }
        
        // Build gamma correction lookup table
        const gammaTable = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            gammaTable[i] = Math.pow(i / 255, 1 / gamma) * 255;
        }
        
        for (let i = 0; i < data.length; i += 4) {
            // Apply contrast and brightness
            let enhanced = data[i] * factor + adjustedBrightness;
            enhanced = Math.max(0, Math.min(255, enhanced));
            
            // Apply gamma correction
            enhanced = gammaTable[Math.round(enhanced)];
            
            // Store back
            data[i] = data[i + 1] = data[i + 2] = enhanced;
        }
    }
    
    applyNoiseReduction(data, width, height) {
        // Simple 3x3 averaging filter for noise reduction
        const tempData = new Uint8Array(data);
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let sum = 0;
                let count = 0;
                
                // Average 3x3 neighborhood
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const idx = ((y + dy) * width + (x + dx)) * 4;
                        sum += tempData[idx];
                        count++;
                    }
                }
                
                const average = sum / count;
                const idx = (y * width + x) * 4;
                data[idx] = data[idx + 1] = data[idx + 2] = average;
            }
        }
    }
    
    applyEdgeDetection(data, width, height) {
        const { method, threshold, strength } = VISUAL_CONFIG.artisticProcessing.edgeDetection;
        
        // Create a copy for edge calculation
        const grayData = new Float32Array(width * height);
        for (let i = 0; i < data.length; i += 4) {
            grayData[i / 4] = data[i]; // Use red channel (grayscale)
        }
        
        const edges = new Float32Array(width * height);
        
        // Apply edge detection based on method
        switch (method) {
            case 'sobel':
                this.applySobelEdgeDetection(grayData, edges, width, height);
                break;
            case 'roberts':
                this.applyRobertsEdgeDetection(grayData, edges, width, height);
                break;
            case 'prewitt':
                this.applyPrewittEdgeDetection(grayData, edges, width, height);
                break;
            default:
                this.applySobelEdgeDetection(grayData, edges, width, height);
        }
        
        // Apply threshold and strength
        const thresholdValue = threshold * 255;
        for (let i = 0; i < edges.length; i++) {
            let edgeValue = edges[i] * strength;
            edgeValue = edgeValue > thresholdValue ? 255 : 0;
            
            const pixelIndex = i * 4;
            data[pixelIndex] = data[pixelIndex + 1] = data[pixelIndex + 2] = edgeValue;
        }
    }
    
    applySobelEdgeDetection(input, output, width, height) {
        // Sobel kernels
        const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let gx = 0, gy = 0;
                
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const pixel = input[(y + ky) * width + (x + kx)];
                        const kernelIndex = (ky + 1) * 3 + (kx + 1);
                        
                        gx += pixel * sobelX[kernelIndex];
                        gy += pixel * sobelY[kernelIndex];
                    }
                }
                
                output[y * width + x] = Math.sqrt(gx * gx + gy * gy);
            }
        }
    }
    
    applyRobertsEdgeDetection(input, output, width, height) {
        for (let y = 0; y < height - 1; y++) {
            for (let x = 0; x < width - 1; x++) {
                const p1 = input[y * width + x];
                const p2 = input[y * width + (x + 1)];
                const p3 = input[(y + 1) * width + x];
                const p4 = input[(y + 1) * width + (x + 1)];
                
                const gx = p1 - p4;
                const gy = p2 - p3;
                
                output[y * width + x] = Math.sqrt(gx * gx + gy * gy);
            }
        }
    }
    
    applyPrewittEdgeDetection(input, output, width, height) {
        // Prewitt kernels
        const prewittX = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
        const prewittY = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let gx = 0, gy = 0;
                
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const pixel = input[(y + ky) * width + (x + kx)];
                        const kernelIndex = (ky + 1) * 3 + (kx + 1);
                        
                        gx += pixel * prewittX[kernelIndex];
                        gy += pixel * prewittY[kernelIndex];
                    }
                }
                
                output[y * width + x] = Math.sqrt(gx * gx + gy * gy);
            }
        }
    }
    
    applyArtisticStyle(data) {
        const { invertEdges, backgroundColor, edgeColor } = VISUAL_CONFIG.artisticProcessing.style;
        
        for (let i = 0; i < data.length; i += 4) {
            const isEdge = data[i] > 128; // Threshold for edge detection
            
            let finalValue;
            if (invertEdges) {
                // White edges on black background
                finalValue = isEdge ? 255 : 0;
            } else {
                // Black edges on white background (default)
                finalValue = isEdge ? edgeColor : backgroundColor;
            }
            
            data[i] = data[i + 1] = data[i + 2] = finalValue;
            // Keep alpha unchanged
        }
    }
    
    applySmoothing(data, width, height) {
        // Apply morphological operations for smoother edges
        const tempData = new Uint8Array(data);
        const { edgeThickness } = VISUAL_CONFIG.artisticProcessing.style;
        
        // Simple dilation for edge thickness
        for (let iteration = 0; iteration < edgeThickness; iteration++) {
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const centerIdx = (y * width + x) * 4;
                    
                    // Check if any neighbor is an edge
                    let hasEdgeNeighbor = false;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const neighborIdx = ((y + dy) * width + (x + dx)) * 4;
                            if (tempData[neighborIdx] === 0) { // Black edge
                                hasEdgeNeighbor = true;
                                break;
                            }
                        }
                        if (hasEdgeNeighbor) break;
                    }
                    
                    if (hasEdgeNeighbor) {
                        data[centerIdx] = data[centerIdx + 1] = data[centerIdx + 2] = 0;
                    }
                }
            }
            // Update temp data for next iteration
            tempData.set(data);
        }
    }
    
    configureTexture(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        
        // Add texture enhancement if enabled
        const enhancement = VISUAL_CONFIG.artisticProcessing;
        if (enhancement.enabled && enhancement.textureEnhancement.enabled) {
            // These properties will be used when applying to material
            texture.userData = {
                sharpening: enhancement.sharpening,
                contrastBoost: enhancement.contrastBoost,
                edgeGlow: enhancement.edgeGlow
            };
        }
    }
    
    generateCacheKey(imageUrl) {
        // Generate cache key based on URL and current settings
        const settings = VISUAL_CONFIG.artisticProcessing;
        const key = `${imageUrl}_${JSON.stringify({
            method: settings.edgeDetection.method,
            threshold: settings.edgeDetection.threshold,
            strength: settings.edgeDetection.strength,
            contrast: settings.contrast.factor,
            brightness: settings.contrast.brightness,
            gamma: settings.contrast.gamma,
            invertEdges: settings.style.invertEdges,
            edgeThickness: settings.style.edgeThickness
        })}`;
        return key;
    }
    
    clearCache() {
        this.processedCache.clear();
        console.log('🎨 Cleared artistic processing cache');
    }
    
    updateSettings(newSettings) {
        // Clear cache when settings change
        this.clearCache();
        console.log('🎨 Updated artistic processing settings and cleared cache');
    }
    
    dispose() {
        this.clearCache();
        this.canvas = null;
        this.ctx = null;
        this.initialized = false;
        console.log('🎨 Artistic texture processor disposed');
    }
}

// Particle class for individual particles
class Particle {
    constructor() {
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.originalColor = new THREE.Color();
        this.dispersionDirection = new THREE.Vector3(); // Pre-assigned direction for uniform dispersion
        this.reset();
    }

    reset() {
        // Reset particle at random position in 3D space instead of center
        const distributionRadius = VISUAL_CONFIG.particles.resetDistance * VISUAL_CONFIG.particles.distribution.radiusMultiplier;
        
        // Random position within a sphere
        const theta = Math.random() * Math.PI * 2; // Azimuth angle
        const phi = Math.acos(2 * Math.random() - 1); // Polar angle for uniform distribution
        const radius = Math.cbrt(Math.random()) * distributionRadius; // Cube root for uniform volume distribution
        
        this.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
        
        // Start with configurable initial velocity
        const initialSpeed = VISUAL_CONFIG.particles.distribution.initialSpeed;
        this.velocity.set(
            (Math.random() - 0.5) * initialSpeed,
            (Math.random() - 0.5) * initialSpeed,
            (Math.random() - 0.5) * initialSpeed
        );
        
        // Set original color using configurable parameters
        this.originalColor.setHSL(
            VISUAL_CONFIG.particles.color.hueBase + Math.random() * VISUAL_CONFIG.particles.color.hueVariation, 
            VISUAL_CONFIG.particles.color.saturation, 
            VISUAL_CONFIG.particles.color.lightness
        );
    }

    assignDispersionDirection() {
        // Generate uniform random direction on sphere surface using Marsaglia method
        let x, y, z;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            z = Math.random() * 2 - 1;
        } while (x*x + y*y + z*z > 1);
        
        // Normalize to get point on unit sphere
        const length = Math.sqrt(x*x + y*y + z*z);
        this.dispersionDirection.set(x/length, y/length, z/length);
    }

    update(deltaTime, attractors = [], mode = 'normal') {
        // Only apply forces if there are attractors
        if (attractors.length > 0) {
            const config = VISUAL_CONFIG.attraction;
            
            // Choose behavior based on mode
            if (mode === 'shell' && config.shellEffect.enabled) {
                // Shell effect: center attraction + shape repulsion
                this.updateWithShellEffect(deltaTime, attractors, config);
            } else if (mode.startsWith('dispersion') && config.dispersionEffect.enabled) {
                // Dispersion effect: dramatic outward burst
                const dispersionProgress = parseFloat(mode.split('_')[1]) || 0;
                this.updateWithDispersionEffect(deltaTime, dispersionProgress, config);
            } else if (config.flowDynamics.enabled) {
                // Enhanced flow dynamics system
                this.updateWithFlowDynamics(deltaTime, attractors, config);
            } else {
                // Original simple attraction system (fallback)
                this.updateWithSimpleAttraction(deltaTime, attractors, config);
            }
        }
        
        // Update position
        this.position.add(new THREE.Vector3().copy(this.velocity).multiplyScalar(deltaTime));
        
        // Check if particle should be reset (only distance-based now)
        if (this.position.length() > VISUAL_CONFIG.particles.resetDistance) {
            this.reset();
            
            // Special behavior during dispersion: give newly reset particles extra speed
            if (mode.startsWith('dispersion')) {
                const dispersionSpeed = VISUAL_CONFIG.attraction.dispersionEffect.newParticleSpeed;
                this.velocity.multiplyScalar(dispersionSpeed);
            }
        }
    }

    updateWithFlowDynamics(deltaTime, attractors, config) {
        const totalForce = new THREE.Vector3();
        const flow = config.flowDynamics;
        
        // 1. Calculate distance-weighted forces from all attractors
        const attractorData = attractors.map(attractor => {
            const direction = new THREE.Vector3().subVectors(attractor.position, this.position);
            const distance = direction.length();
            return { attractor, direction: direction.clone(), distance, normalizedDirection: direction.normalize() };
        });
        
        // 2. Apply balanced attraction forces
        if (flow.forceBalancing && attractorData.length > 1) {
            this.applyBalancedAttraction(totalForce, attractorData, config);
        } else {
            this.applySimpleAttraction(totalForce, attractorData, config);
        }
        
        // 3. Add repulsion force when too close to any attractor
        attractorData.forEach(({ attractor, distance, normalizedDirection }) => {
            if (distance < flow.repulsionRadius && distance > config.minDistance) {
                const repulsionStrength = flow.repulsionStrength * (1 - distance / flow.repulsionRadius);
                const intensity = attractor.intensity || 1.0;
                totalForce.add(normalizedDirection.clone().multiplyScalar(-repulsionStrength * intensity));
            }
        });
        
        // 4. Add circulation forces for flowing motion around attractors
        attractorData.forEach(({ attractor, direction, distance, normalizedDirection }) => {
            if (distance > config.minDistance && distance < flow.distributionRadius) {
                const tangent = new THREE.Vector3().crossVectors(normalizedDirection, new THREE.Vector3(0, 1, 0));
                if (tangent.length() < 0.1) {
                    tangent.crossVectors(normalizedDirection, new THREE.Vector3(1, 0, 0));
                }
                tangent.normalize();
                
                const circulationStrength = flow.circulationStrength * (1 - distance / flow.distributionRadius);
                const intensity = attractor.intensity || 1.0;
                totalForce.add(tangent.multiplyScalar(circulationStrength * intensity));
            }
        });
        
        // 5. Add global flow field for continuous motion
        if (flow.flowField.enabled) {
            const flowFieldForce = this.calculateFlowField(flow.flowField);
            totalForce.add(flowFieldForce);
        }
        
        // 6. Add turbulence for natural randomness
        const turbulence = new THREE.Vector3(
            (Math.random() - 0.5) * flow.turbulenceStrength,
            (Math.random() - 0.5) * flow.turbulenceStrength,
            (Math.random() - 0.5) * flow.turbulenceStrength
        );
        totalForce.add(turbulence);
        
        // 7. Apply the total force to velocity
        this.velocity.add(totalForce);
        
        // 8. Apply drag with escape velocity consideration
        const speed = this.velocity.length();
        const dragMultiplier = speed > flow.escapeVelocity ? config.drag.normal : config.drag.normal * 0.9;
        this.velocity.multiplyScalar(dragMultiplier);
    }

    applyBalancedAttraction(totalForce, attractorData, config) {
        // Weight forces to distribute particles more evenly among attractors
        const totalWeight = attractorData.reduce((sum, { distance }) => {
            return sum + (1 / (distance * distance + config.distanceOffset));
        }, 0);
        
        attractorData.forEach(({ attractor, distance, normalizedDirection }) => {
            if (distance > config.minDistance) {
                // Base force calculation
                let strength = Math.min(config.baseStrength / (distance * distance + config.distanceOffset), config.maxStrength);
                
                // Reduce dominance of closest attractors
                const weight = (1 / (distance * distance + config.distanceOffset)) / totalWeight;
                const balanceFactor = 1 - Math.pow(weight, 0.5); // Reduce influence of dominant attractors
                strength *= (0.3 + 0.7 * balanceFactor); // Ensure minimum influence
                
                // Apply intensity multiplier
                const intensity = attractor.intensity || 1.0;
                strength *= intensity;
                
                totalForce.add(normalizedDirection.clone().multiplyScalar(strength));
            }
        });
    }

    applySimpleAttraction(totalForce, attractorData, config) {
        // Original attraction method
        attractorData.forEach(({ attractor, distance, normalizedDirection }) => {
            if (distance > config.minDistance) {
                let strength = Math.min(config.baseStrength / (distance * distance + config.distanceOffset), config.maxStrength);
                const intensity = attractor.intensity || 1.0;
                strength *= intensity;
                totalForce.add(normalizedDirection.clone().multiplyScalar(strength));
            }
        });
    }

    calculateFlowField(flowConfig) {
        // Create a noise-based flow field for global particle movement
        const time = performance.now() * 0.001 * flowConfig.timeScale;
        const scale = flowConfig.scale;
        
        // Simple pseudo-noise based on position and time
        const x = this.position.x * scale + time;
        const y = this.position.y * scale + time * 0.7;
        const z = this.position.z * scale + time * 1.3;
        
        // Generate flow field vector using sine waves (simplified noise)
        const flowX = Math.sin(x * 2.1 + Math.cos(y * 1.3)) * Math.cos(z * 1.7);
        const flowY = Math.cos(y * 1.9 + Math.sin(z * 2.3)) * Math.sin(x * 1.1);
        const flowZ = Math.sin(z * 2.7 + Math.cos(x * 1.9)) * Math.cos(y * 2.1);
        
        return new THREE.Vector3(flowX, flowY, flowZ).multiplyScalar(flowConfig.strength);
    }

    updateWithSimpleAttraction(deltaTime, attractors, config) {
        // Original simple attraction method (kept as fallback)
        const attractionForce = new THREE.Vector3();
        
        attractors.forEach(attractor => {
            const direction = new THREE.Vector3().subVectors(attractor.position, this.position);
            const distance = direction.length();
            
            if (distance > config.minDistance) { // Avoid division by zero
                direction.normalize();
                
                // Base attraction strength
                let strength = Math.min(config.baseStrength / (distance * distance + config.distanceOffset), config.maxStrength);
                
                // Apply intensity multiplier for convergence
                const intensity = attractor.intensity || 1.0;
                strength *= intensity;
                
                attractionForce.add(direction.multiplyScalar(strength));
            }
        });
        
        this.velocity.add(attractionForce);
        
        // Apply drag to prevent infinite acceleration
        const maxIntensity = Math.max(...attractors.map(a => a.intensity || 1.0));
        const dragMultiplier = maxIntensity > config.intensityThreshold ? config.drag.intense : config.drag.normal;
        this.velocity.multiplyScalar(dragMultiplier);
    }

    updateWithShellEffect(deltaTime, attractors, config) {
        const totalForce = new THREE.Vector3();
        const shell = config.shellEffect;
        
        // 1. Center attraction - pull particles toward center
        const centerDistance = this.position.length();
        if (centerDistance > 0.001) { // Avoid division by zero
            const centerDirection = new THREE.Vector3().copy(this.position).negate().normalize();
            const centerForce = centerDirection.multiplyScalar(shell.centerAttraction);
            totalForce.add(centerForce);
        }
        
        // 2. Shape repulsion - push particles away from converged shapes
        attractors.forEach(attractor => {
            const direction = new THREE.Vector3().subVectors(this.position, attractor.position);
            const distance = direction.length();
            
            if (distance < shell.repulsionRadius && distance > config.minDistance) {
                direction.normalize();
                // Stronger repulsion when closer to shape
                const repulsionStrength = shell.shapeRepulsion * (1 - distance / shell.repulsionRadius);
                const repulsionForce = direction.multiplyScalar(repulsionStrength);
                totalForce.add(repulsionForce);
            }
        });
        
        // 3. Shell stabilization - maintain target shell radius
        const targetRadius = shell.shellRadius;
        const radiusError = centerDistance - targetRadius;
        if (centerDistance > 0.001) { // Avoid division by zero
            const stabilizationDirection = new THREE.Vector3().copy(this.position).normalize();
            const stabilizationForce = stabilizationDirection.multiplyScalar(-radiusError * shell.stabilizationForce);
            totalForce.add(stabilizationForce);
        }
        
        // 4. Additional turbulence for dynamic shell movement
        const turbulence = new THREE.Vector3(
            (Math.random() - 0.5) * shell.turbulence,
            (Math.random() - 0.5) * shell.turbulence,
            (Math.random() - 0.5) * shell.turbulence
        );
        totalForce.add(turbulence);
        
        // 5. Apply the total force to velocity
        this.velocity.add(totalForce);
        
        // 6. Apply drag
        this.velocity.multiplyScalar(config.drag.normal);
    }

    updateWithDispersionEffect(deltaTime, dispersionProgress, config) {
        const totalForce = new THREE.Vector3();
        const dispersion = config.dispersionEffect;
        
        // 1. Use pre-assigned uniform direction for main burst force
        if (this.dispersionDirection.length() > 0) {
            // Burst strength decreases over time
            const burstIntensity = dispersion.burstStrength * (1 - dispersionProgress);
            
            // Use the pre-assigned uniform direction - apply velocity multiplier here
            const burstForce = this.dispersionDirection.clone().multiplyScalar(burstIntensity * dispersion.velocityMultiplier);
            totalForce.add(burstForce);
        }
        
        // 2. Additional center repulsion ONLY for particles very close to center (reduced interference)
        const centerDistance = this.position.length();
        if (centerDistance > 0.001 && centerDistance < 0.8) { // Reduced range from 2.0 to 0.8
            const repulsionDirection = new THREE.Vector3().copy(this.position).normalize();
            const repulsionIntensity = dispersion.centerRepulsion * (1 - dispersionProgress) * (1 - centerDistance / 0.8);
            const repulsionForce = repulsionDirection.multiplyScalar(repulsionIntensity);
            totalForce.add(repulsionForce);
        }
        
        // 3. Minimal turbulence for natural variation (further reduced)
        const turbulenceIntensity = dispersion.burstStrength * 0.1 * (1 - dispersionProgress); // Reduced from 0.2 to 0.1
        const turbulence = new THREE.Vector3(
            (Math.random() - 0.5) * turbulenceIntensity,
            (Math.random() - 0.5) * turbulenceIntensity,
            (Math.random() - 0.5) * turbulenceIntensity
        );
        totalForce.add(turbulence);
        
        // 4. Apply the total force to velocity (velocity multiplier already applied to main burst)
        this.velocity.add(totalForce);
        
        // 5. Apply reduced drag for more dramatic movement
        const dragMultiplier = config.drag.normal * dispersion.dragReduction;
        this.velocity.multiplyScalar(dragMultiplier);
    }

    getOpacity() {
        // Distance-based opacity instead of lifetime-based
        const distanceFromCenter = this.position.length();
        const maxDistance = VISUAL_CONFIG.particles.resetDistance;
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1.0);
        
        // Particles closer to center are more opaque, farther ones fade out
        return Math.max(
            VISUAL_CONFIG.particles.opacity.minimum, 
            1.0 - (normalizedDistance * VISUAL_CONFIG.particles.opacity.falloffRate)
        );
    }
}

// ParticleSystem class to manage all particles
class ParticleSystem {
    constructor(count = VISUAL_CONFIG.particles.count) {
        this.particles = [];
        this.attractionMode = false;
        this.attractors = [];
        this.cameraPosition = new THREE.Vector3();
        this.particleMode = 'normal'; // Add mode tracking: 'normal', 'shell', 'dispersion_X'
        
        // Dispersion effect tracking
        this.isDispersing = false;
        this.dispersionStartTime = 0;
        this.dispersionProgress = 0;
        
        // Create particles
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle());
        }
        
        // Create Three.js geometry and material for spheres
        this.sphereGeometry = new THREE.SphereGeometry(
            VISUAL_CONFIG.particles.size, 
            VISUAL_CONFIG.particles.rendering.sphereDetail.widthSegments, 
            VISUAL_CONFIG.particles.rendering.sphereDetail.heightSegments
        );
        
        // Material with proper settings for bloom emission
        this.material = new THREE.MeshBasicMaterial({
            color: VISUAL_CONFIG.particles.rendering.material.color,
            transparent: true,
            opacity: VISUAL_CONFIG.particles.rendering.material.baseOpacity,
            depthWrite: false, // Allow particles to blend properly
            depthTest: true    // Keep depth testing for proper layering
        });
        
        // Create instanced mesh for efficient rendering of many spheres
        this.instancedMesh = new THREE.InstancedMesh(this.sphereGeometry, this.material, count);
        
        // Initialize matrices and colors for each instance
        this.dummy = new THREE.Object3D();
        this.colorArray = new Float32Array(count * 3);
        this.opacityArray = new Float32Array(count);
        
        // Set up instance color attribute
        this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(this.colorArray, 3);
        
        console.log(`Created particle system with ${count} sphere particles`);
    }

    setCameraPosition(position) {
        this.cameraPosition.copy(position);
    }

    setParticleMode(mode) {
        this.particleMode = mode;
        console.log(`Particle mode set to: ${mode}`);
    }

    startDispersion() {
        if (!this.isDispersing) {
            this.isDispersing = true;
            this.dispersionStartTime = performance.now() / 1000;
            this.dispersionProgress = 0;
            
            // Assign uniform directions for even distribution
            this.assignUniformDispersionDirections();
            
            console.log('Started particle dispersion effect with uniform distribution');
        }
    }

    assignUniformDispersionDirections() {
        // Assign uniform dispersion directions to all particles
        this.particles.forEach(particle => {
            particle.assignDispersionDirection();
        });
        console.log('Assigned uniform dispersion directions to all particles');
        
        // Also ensure particles get fresh directions by reassigning
        // This fixes any potential issues with stale or corrupted directions
        this.particles.forEach((particle, index) => {
            // Double-check that direction is properly normalized and not zero
            if (particle.dispersionDirection.length() < 0.9) {
                particle.assignDispersionDirection();
                console.log(`Fixed dispersion direction for particle ${index}`);
            }
        });
    }

    updateDispersion(deltaTime) {
        if (this.isDispersing) {
            const currentTime = performance.now() / 1000;
            const elapsed = currentTime - this.dispersionStartTime;
            const duration = VISUAL_CONFIG.attraction.dispersionEffect.duration;
            
            this.dispersionProgress = Math.min(elapsed / duration, 1.0);
            
            // Update particle mode with progress
            this.particleMode = `dispersion_${this.dispersionProgress.toFixed(3)}`;
            
            // Check if dispersion is complete
            if (this.dispersionProgress >= 1.0) {
                this.isDispersing = false;
                this.particleMode = 'normal';
                console.log('Particle dispersion effect completed');
                return true; // Dispersion complete
            }
        }
        return false; // Dispersion ongoing or not active
    }

    isDispersionComplete() {
        return !this.isDispersing && this.dispersionProgress >= 1.0;
    }

    update(deltaTime) {
        const maxDepth = VISUAL_CONFIG.particles.depthEffect.maxDistance; // Maximum distance from camera for depth calculation
        
        // Update dispersion state if active
        this.updateDispersion(deltaTime);
        
        // Update each particle with current mode
        this.particles.forEach((particle, index) => {
            particle.update(deltaTime, this.attractionMode ? this.attractors : [], this.particleMode);
            
            // Update instance matrix (position and scale)
            this.dummy.position.copy(particle.position);
            this.dummy.updateMatrix();
            this.instancedMesh.setMatrixAt(index, this.dummy.matrix);
            
            // Calculate depth-based brightness
            const distanceFromCamera = this.cameraPosition.distanceTo(particle.position);
            const normalizedDepth = Math.min(distanceFromCamera / maxDepth, 1.0);
            const depthBrightness = 1.0 - (normalizedDepth * VISUAL_CONFIG.particles.depthEffect.dimming); // Closer = brighter, further = dimmer
            
            // Combine original color with depth brightness and life opacity
            const lifeOpacity = particle.getOpacity();
            
            // Enhanced brightness during intense attraction (convergence)
            let intensityMultiplier = 1.0;
            if (this.attractionMode && this.attractors.length > 0) {
                // Check if any attractor has intensity (convergence mode)
                const maxIntensity = Math.max(...this.attractors.map(a => a.intensity || 1.0));
                intensityMultiplier = maxIntensity;
                
                // Apply convergence multiplier for bloom emission (constant, no pulsing)
                if (VISUAL_CONFIG.bloom.constantEmission.enabled && maxIntensity > 1.0) {
                    intensityMultiplier *= VISUAL_CONFIG.bloom.constantEmission.convergenceMultiplier;
                }
            }
            
            // Enhanced brightness during dispersion for dramatic effect
            if (this.isDispersing) {
                intensityMultiplier *= 1.5; // Boost brightness during dispersion
            }
            
            // Calculate final brightness with constant emission base
            let emissionBrightness = depthBrightness * lifeOpacity * intensityMultiplier;
            
            // Add constant emission base brightness for bloom effect (like light bulbs)
            if (VISUAL_CONFIG.bloom.constantEmission.enabled) {
                // Ensure particles always emit a minimum amount of light for bloom
                const baseEmission = VISUAL_CONFIG.bloom.constantEmission.emissiveIntensity * 0.8;
                emissionBrightness = Math.max(emissionBrightness, baseEmission) + baseEmission * 0.5;
            }
            
            // Update instance color with constant emission brightness for bloom
            const i3 = index * 3;
            this.colorArray[i3] = particle.originalColor.r * emissionBrightness;
            this.colorArray[i3 + 1] = particle.originalColor.g * emissionBrightness;
            this.colorArray[i3 + 2] = particle.originalColor.b * emissionBrightness;
        });
        
        // Mark attributes as needing update
        this.instancedMesh.instanceMatrix.needsUpdate = true;
        this.instancedMesh.instanceColor.needsUpdate = true;
    }

    addToScene(scene) {
        scene.add(this.instancedMesh);
        console.log('Sphere particle system added to scene');
    }

    removeFromScene(scene) {
        scene.remove(this.instancedMesh);
        console.log('Sphere particle system removed from scene');
    }

    setAttractionMode(enabled, attractors = []) {
        this.attractionMode = enabled;
        this.attractors = attractors;
        console.log(`Particle attraction mode: ${enabled ? 'enabled' : 'disabled'}`);
    }

    dispose() {
        this.sphereGeometry.dispose();
        this.material.dispose();
        this.instancedMesh.dispose();
    }
}

// EyeShape class for individual eye-textured 3D shapes
class EyeShape {
    constructor(textureUrl, shapeType = 'cube') {
        this.textureUrl = textureUrl;
        this.shapeType = shapeType;
        this.mesh = null;
        this.position = new THREE.Vector3();
        this.orbitalRadius = VISUAL_CONFIG.shapes.orbital.radius.min + Math.random() * (VISUAL_CONFIG.shapes.orbital.radius.max - VISUAL_CONFIG.shapes.orbital.radius.min); // Random radius between configured min-max
        this.orbitalSpeed = VISUAL_CONFIG.shapes.orbital.speed.min + Math.random() * (VISUAL_CONFIG.shapes.orbital.speed.max - VISUAL_CONFIG.shapes.orbital.speed.min); // Random speed
        this.orbitalPlane = this.generateRandomPlane();
        this.orbitalAngle = Math.random() * Math.PI * 2; // Random starting angle
        this.rotationSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * VISUAL_CONFIG.shapes.rotation.speed,
            (Math.random() - 0.5) * VISUAL_CONFIG.shapes.rotation.speed,
            (Math.random() - 0.5) * VISUAL_CONFIG.shapes.rotation.speed
        );
        this.isLoaded = false;
        this.id = `eye_shape_${Date.now()}_${Math.random()}`;
        
        // 🔄 NEW: Texture processing state tracking
        this.isTextureProcessing = false;
        this.isTextureProcessed = false;
        this.onTextureProcessed = null; // Callback function to be set by ShapeManager
        
        // Convergence animation properties
        this.isConverging = false;
        this.convergenceProgress = 0; // 0 to 1
        this.convergenceDuration = VISUAL_CONFIG.shapes.convergence.duration; // seconds
        this.initialRadius = this.orbitalRadius;
        this.initialSpeed = this.orbitalSpeed;
        this.convergenceStartTime = 0;
        this.targetRadius = VISUAL_CONFIG.shapes.convergence.targetRadius; // Final radius at center
        this.speedMultiplier = 1.0;
        
        // 🌟 NEW: Emergence animation properties
        this.isEmerging = false;
        this.emergenceProgress = 0; // 0 to 1
        this.emergenceDuration = VISUAL_CONFIG.shapes.emergence.duration; // seconds
        this.emergenceStartTime = 0;
        this.emergenceStartOpacity = VISUAL_CONFIG.shapes.emergence.startOpacity;
        this.emergenceTargetOpacity = VISUAL_CONFIG.shapes.emergence.targetOpacity;
        this.emergenceStartScale = VISUAL_CONFIG.shapes.emergence.scaleEffect.startScale;
        this.emergenceTargetScale = VISUAL_CONFIG.shapes.emergence.scaleEffect.targetScale;
        this.hasCompletedEmergence = false; // Track if emergence has been completed
        
        // 🎨 NEW: Artistic processor reference
        this.artisticProcessor = null; // Will be set by TheatreClient
        
        this.createShape();
    }

    generateRandomPlane() {
        // Generate a random orbital plane by creating two orthogonal vectors
        const normal = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
        
        // Create a tangent vector perpendicular to the normal
        const tangent = new THREE.Vector3();
        if (Math.abs(normal.x) < 0.9) {
            tangent.set(1, 0, 0);
        } else {
            tangent.set(0, 1, 0);
        }
        tangent.cross(normal).normalize();
        
        // Create binormal vector
        const binormal = new THREE.Vector3().crossVectors(normal, tangent);
        
        return { normal, tangent, binormal };
    }

    createShape() {
        // Define different geometric shapes
        const geometries = {
            cube: new THREE.BoxGeometry(VISUAL_CONFIG.shapes.sizes.cube, VISUAL_CONFIG.shapes.sizes.cube, VISUAL_CONFIG.shapes.sizes.cube),
            bipyramid: this.createBipyramidGeometry(),
            pentagon: new THREE.CylinderGeometry(VISUAL_CONFIG.shapes.sizes.pentagon.radius, VISUAL_CONFIG.shapes.sizes.pentagon.radius, VISUAL_CONFIG.shapes.sizes.pentagon.height, 5) // 3D pentagon (pentagonal prism)
        };

        const geometry = geometries[this.shapeType] || geometries.cube;
        
        // 🔄 UPDATED: Set initial opacity based on emergence configuration
        const initialOpacity = VISUAL_CONFIG.shapes.emergence.enabled ? 0.0 : VISUAL_CONFIG.shapes.material.placeholder.opacity;
        
        // Create material with placeholder until texture loads
        const material = new THREE.MeshLambertMaterial({
            color: VISUAL_CONFIG.shapes.material.placeholder.color,
            transparent: true,
            opacity: initialOpacity
        });

        this.mesh = new THREE.Mesh(geometry, material);
        
        // 🌟 NEW: Set initial scale for emergence effect if enabled
        if (VISUAL_CONFIG.shapes.emergence.enabled && VISUAL_CONFIG.shapes.emergence.scaleEffect.enabled) {
            this.mesh.scale.setScalar(VISUAL_CONFIG.shapes.emergence.scaleEffect.startScale);
        }
        
        // Load the eye texture
        this.loadTexture();
    }

    createBipyramidGeometry() {
        // Create a bipyramid (two pyramids joined at their base)
        // This is essentially an octahedron, but we'll create it explicitly as two pyramids
        const geometry = new THREE.OctahedronGeometry(VISUAL_CONFIG.shapes.sizes.bipyramid);
        return geometry;
    }

    loadTexture() {
        const loader = new THREE.TextureLoader();
        
        // 🔄 NEW: Mark texture processing as started
        this.isTextureProcessing = true;
        console.log(`🔄 Starting texture processing for shape: ${this.id}`);
        
        loader.load(
            this.textureUrl,
            (texture) => {
                // 🎨 NEW: Apply client-side artistic processing if available
                if (this.artisticProcessor && VISUAL_CONFIG.artisticProcessing.enabled) {
                    // Create an image element for processing
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    img.onload = () => {
                        console.log(`🎨 Processing texture artistically for shape: ${this.id}`);
                        // Process the texture artistically
                        this.artisticProcessor.processTexture(img, (processedTexture) => {
                            // Apply the processed texture
                            this.applyProcessedTexture(processedTexture);
                            // 🔄 NEW: Mark texture processing as complete and trigger callback
                            this.completeTextureProcessing();
                        });
                    };
                    
                    img.onerror = () => {
                        console.warn(`Failed to load image for artistic processing: ${this.textureUrl}`);
                        // Fallback to original texture
                        this.applyProcessedTexture(texture);
                        // 🔄 NEW: Mark texture processing as complete and trigger callback
                        this.completeTextureProcessing();
                    };
                    
                    img.src = this.textureUrl;
                } else {
                    // Use original texture without processing
                    this.applyProcessedTexture(texture);
                    // 🔄 NEW: Mark texture processing as complete and trigger callback
                    this.completeTextureProcessing();
                }
            },
            (progress) => {
                // Loading progress (optional)
            },
            (error) => {
                console.error(`Failed to load eye texture: ${this.textureUrl}`, error);
                // Keep the placeholder material
                // 🔄 NEW: Mark texture processing as complete even on error
                this.completeTextureProcessing();
            }
        );
    }
    
    applyProcessedTexture(texture) {
        // Configure texture properties
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        // Apply to material
        this.mesh.material.map = texture;
        this.mesh.material.color.setHex(VISUAL_CONFIG.shapes.material.loaded.color);
        
        // 🎨 NEW: Enhanced properties for artistic textures
        const artistic = VISUAL_CONFIG.artisticProcessing;
        if (artistic.enabled && artistic.textureEnhancement.enabled) {
            // Apply edge glow if enabled
            if (artistic.textureEnhancement.edgeGlow.enabled) {
                this.mesh.material.emissive = new THREE.Color(artistic.textureEnhancement.edgeGlow.color);
                this.mesh.material.emissiveIntensity = artistic.textureEnhancement.edgeGlow.intensity;
            }
            
            // Apply additional texture enhancements from userData
            if (texture.userData) {
                const enhancement = texture.userData;
                
                // Apply contrast boost if available
                if (enhancement.contrastBoost && this.mesh.material.color) {
                    const color = this.mesh.material.color;
                    color.multiplyScalar(enhancement.contrastBoost);
                }
            }
        }
        
        this.mesh.material.needsUpdate = true;
        this.isLoaded = true;
        
        const processingStatus = artistic.enabled ? '(with artistic B&W edges)' : '(original)';
        console.log(`🎨 Eye texture applied to shape: ${this.id} ${processingStatus}`);
    }

    // 🔄 NEW: Complete texture processing and trigger emergence
    completeTextureProcessing() {
        this.isTextureProcessing = false;
        this.isTextureProcessed = true;
        
        console.log(`✅ Texture processing completed for shape: ${this.id}`);
        
        // Trigger the emergence callback if it exists
        if (this.onTextureProcessed && typeof this.onTextureProcessed === 'function') {
            this.onTextureProcessed();
        }
    }

    update(deltaTime) {
        if (!this.mesh) return;

        // Handle emergence animation first (takes priority)
        if (this.isEmerging) {
            this.updateEmergence(deltaTime);
        }
        // Handle convergence animation (only if not emerging)
        else if (this.isConverging) {
            this.updateConvergence(deltaTime);
        }

        // Update orbital position
        this.orbitalAngle += (this.orbitalSpeed * this.speedMultiplier) * deltaTime;
        
        // Calculate position on the orbital plane
        const x = Math.cos(this.orbitalAngle) * this.orbitalRadius;
        const z = Math.sin(this.orbitalAngle) * this.orbitalRadius;
        
        // Transform to the random orbital plane
        this.position.copy(this.orbitalPlane.tangent).multiplyScalar(x);
        this.position.add(new THREE.Vector3().copy(this.orbitalPlane.binormal).multiplyScalar(z));
        
        // Apply position to mesh
        this.mesh.position.copy(this.position);
        
        // Apply rotation (faster during convergence)
        const rotationMultiplier = this.isConverging ? (1 + this.convergenceProgress * VISUAL_CONFIG.shapes.rotation.convergenceMultiplier) : 1;
        this.mesh.rotation.x += this.rotationSpeed.x * rotationMultiplier;
        this.mesh.rotation.y += this.rotationSpeed.y * rotationMultiplier;
        this.mesh.rotation.z += this.rotationSpeed.z * rotationMultiplier;
    }

    startConvergence(currentTime) {
        if (!this.isConverging) {
            this.isConverging = true;
            this.convergenceStartTime = currentTime;
            this.convergenceProgress = 0;
            console.log(`Starting convergence for shape: ${this.id}`);
        }
    }

    // 🌟 Start emergence animation - safe and simple implementation
    startEmergence(currentTime) {
        if (VISUAL_CONFIG.shapes.emergence.enabled && !this.isEmerging && !this.hasCompletedEmergence) {
            this.isEmerging = true;
            this.emergenceStartTime = currentTime || performance.now() / 1000;
            this.emergenceProgress = 0;
            console.log(`🌟 Starting emergence for shape: ${this.id}`);
        }
    }

    // 🌟 Update emergence animation - simple and safe implementation
    updateEmergence(deltaTime) {
        if (!this.isEmerging) return;
        
        const currentTime = performance.now() / 1000; // Convert to seconds
        const elapsed = currentTime - this.emergenceStartTime;
        
        // Calculate progress (0 to 1)
        this.emergenceProgress = Math.min(elapsed / this.emergenceDuration, 1);
        
        // Apply easing function
        const easedProgress = this.applyEmergenceEasing(this.emergenceProgress);
        
        // 🔄 UPDATED: Animate opacity from 0 to target emergence opacity
        if (this.mesh && this.mesh.material) {
            const currentOpacity = VISUAL_CONFIG.shapes.emergence.startOpacity + 
                (VISUAL_CONFIG.shapes.emergence.targetOpacity - VISUAL_CONFIG.shapes.emergence.startOpacity) * easedProgress;
            this.mesh.material.opacity = currentOpacity;
            
            // Animate scale if enabled
            if (VISUAL_CONFIG.shapes.emergence.scaleEffect.enabled) {
                const currentScale = VISUAL_CONFIG.shapes.emergence.scaleEffect.startScale + 
                    (VISUAL_CONFIG.shapes.emergence.scaleEffect.targetScale - VISUAL_CONFIG.shapes.emergence.scaleEffect.startScale) * easedProgress;
                this.mesh.scale.setScalar(currentScale);
            }
        }
        
        // Check if emergence is complete
        if (this.emergenceProgress >= 1.0) {
            this.isEmerging = false;
            this.hasCompletedEmergence = true;
            console.log(`🌟 Emergence completed for shape: ${this.id}`);
        }
    }

    updateConvergence(deltaTime) {
        const currentTime = performance.now() / 1000; // Convert to seconds
        const elapsed = currentTime - this.convergenceStartTime;
        
        // Calculate progress (0 to 1)
        this.convergenceProgress = Math.min(elapsed / this.convergenceDuration, 1);
        
        // Easing function for smooth convergence (ease-in-out)
        const easedProgress = this.easeInOutCubic(this.convergenceProgress);
        
        // Animate radius shrinking
        this.orbitalRadius = this.initialRadius + (this.targetRadius - this.initialRadius) * easedProgress;
        
        // Animate speed acceleration (speeds up as it converges)
        this.speedMultiplier = 1.0 + (easedProgress * VISUAL_CONFIG.shapes.convergence.speedMultiplier); // Up to configured max speed
        
        // Add intensity effects as convergence progresses
        if (this.mesh && this.mesh.material) {
            // Increase opacity and add glow effect using configurable parameters
            const intensity = VISUAL_CONFIG.shapes.convergence.intensity.baseMin + (easedProgress * VISUAL_CONFIG.shapes.convergence.intensity.baseMax);
            this.mesh.material.opacity = Math.min(intensity, 1.0);
            
            // Scale effect - slightly larger as it converges
            const scale = 1.0 + (easedProgress * VISUAL_CONFIG.shapes.convergence.scaleMultiplier);
            this.mesh.scale.setScalar(scale);
        }
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 
            VISUAL_CONFIG.animation.easing.cubicFactor * t * t * t : 
            1 - Math.pow(-VISUAL_CONFIG.animation.easing.cubicSubtract * t + VISUAL_CONFIG.animation.easing.cubicSubtract, 3) / VISUAL_CONFIG.animation.easing.cubicDivide;
    }

    // 🌟 Apply emergence easing function - simple and safe
    applyEmergenceEasing(t) {
        switch (VISUAL_CONFIG.shapes.emergence.easing) {
            case 'linear':
                return t;
                
            case 'easeInOutCubic':
                return t < 0.5 
                    ? 4 * t * t * t 
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    
            case 'easeInOutSine':
                return -(Math.cos(Math.PI * t) - 1) / 2;
                
            default:
                return t; // fallback to linear
        }
    }

    isConvergenceComplete() {
        return this.isConverging && this.convergenceProgress >= 1.0;
    }

    resetConvergence() {
        this.isConverging = false;
        this.convergenceProgress = 0;
        this.orbitalRadius = this.initialRadius;
        this.speedMultiplier = 1.0;
        
        // 🌟 Reset emergence state too (but preserve hasCompletedEmergence)
        this.isEmerging = false;
        this.emergenceProgress = 0;
        // Note: We don't reset hasCompletedEmergence - we want to remember this
        
        if (this.mesh) {
            this.mesh.scale.setScalar(1.0);
            if (this.mesh.material) {
                // Set opacity based on emergence completion status
                if (this.hasCompletedEmergence || !VISUAL_CONFIG.shapes.emergence.enabled) {
                    // If emergence is complete or disabled, use normal placeholder opacity
                    this.mesh.material.opacity = VISUAL_CONFIG.shapes.material.placeholder.opacity;
                } else {
                    // If emergence hasn't completed, use the target emergence opacity
                    this.mesh.material.opacity = VISUAL_CONFIG.shapes.emergence.targetOpacity;
                }
            }
        }
        
        console.log(`Reset convergence for shape: ${this.id}`);
    }

    addToScene(scene) {
        if (this.mesh) {
            scene.add(this.mesh);
        }
    }

    removeFromScene(scene) {
        if (this.mesh) {
            scene.remove(this.mesh);
        }
    }

    dispose() {
        if (this.mesh) {
            if (this.mesh.material.map) {
                this.mesh.material.map.dispose();
            }
            this.mesh.material.dispose();
            this.mesh.geometry.dispose();
        }
    }

    // Get position for particle attraction
    getAttractionPosition() {
        return this.position;
    }
}

// 🔄 NEW: MorphingEyeShape class for constantly morphing 3D shapes
class MorphingEyeShape extends EyeShape {
    constructor(textureUrl, shapeType = 'morphing') {
        // Randomly choose between cube and bipyramid for base shape
        const baseShapeTypes = VISUAL_CONFIG.shapes.morphing.targets;
        const randomBaseType = baseShapeTypes[Math.floor(Math.random() * baseShapeTypes.length)];
        
        super(textureUrl, randomBaseType);
        
        // Morphing-specific properties for vertex noise
        this.morphTimer = Math.random() * Math.PI * 2; // Random starting phase for variety
        this.originalVertices = null; // Store original vertex positions
        this.phaseOffset = VISUAL_CONFIG.shapes.morphing.phaseOffset ? 
            Math.random() * Math.PI * 2 : 0; // Random phase offset between shapes
        
        console.log(`🔄 Created morphing eye shape: ${this.id} (base: ${randomBaseType}) with phase offset: ${this.phaseOffset.toFixed(2)}`);
    }
    
    createShape() {
        // Create base shape using parent method
        super.createShape();
        
        // Store original vertex positions for noise application
        this.storeOriginalVertices();
        
        console.log(`🔄 Created morphing shape with vertex noise capability`);
    }
    
    storeOriginalVertices() {
        if (this.mesh && this.mesh.geometry) {
            const positions = this.mesh.geometry.attributes.position;
            if (positions) {
                // Store a copy of the original vertex positions
                this.originalVertices = new Float32Array(positions.array.length);
                this.originalVertices.set(positions.array);
                console.log(`🔄 Stored ${positions.count} original vertices for noise morphing`);
                console.log(`🔄 First few vertices:`, positions.array.slice(0, 9)); // Show first 3 vertices
            } else {
                console.warn(`🔄 No positions attribute found in geometry for ${this.id}`);
            }
        } else {
            console.warn(`🔄 No mesh or geometry found when storing vertices for ${this.id}`);
        }
    }
    
    update(deltaTime) {
        // Call parent update for orbital motion and convergence
        super.update(deltaTime);
        
        // Update vertex noise morphing if enabled
        if (VISUAL_CONFIG.shapes.morphing.enabled && this.originalVertices) {
            this.updateVertexNoise(deltaTime);
        } else if (VISUAL_CONFIG.shapes.morphing.enabled && !this.originalVertices) {
            // Try to store vertices again if we don't have them yet
            console.log(`🔄 Morphing enabled but no original vertices for ${this.id}, attempting to store...`);
            this.storeOriginalVertices();
        }
    }
    
    updateVertexNoise(deltaTime) {
        const config = VISUAL_CONFIG.shapes.morphing;
        
        // Calculate morphing speed (faster during convergence)
        let morphSpeed = config.speed;
        if (this.isConverging) {
            morphSpeed *= config.convergenceMultiplier;
        }
        
        // Update morph timer with phase offset
        this.morphTimer += deltaTime * morphSpeed * config.advanced.timeScale + this.phaseOffset * 0.001;
        
        // Apply vertex noise to the mesh
        this.applyVertexNoise();
    }
    
    applyVertexNoise() {
        if (!this.mesh || !this.mesh.geometry || !this.originalVertices) {
            if (!this.mesh) console.warn(`🔄 No mesh for ${this.id}`);
            if (!this.mesh?.geometry) console.warn(`🔄 No geometry for ${this.id}`);
            if (!this.originalVertices) console.warn(`🔄 No original vertices for ${this.id}`);
            return;
        }
        
        const config = VISUAL_CONFIG.shapes.morphing;
        const advanced = config.advanced;
        const positions = this.mesh.geometry.attributes.position;
        const vertexCount = positions.count;
        
        let maxDisplacement = 0; // Track maximum displacement for debugging
        
        // 🔍 EXTREME DEBUG: Add dramatic test displacement to verify the system works
        const testMode = window.extremeMorphingTest || false; // Use global test mode variable
        
        // Apply time-based noise to each vertex
        for (let i = 0; i < vertexCount; i++) {
            const i3 = i * 3; // Index for x, y, z components
            
            // Get original vertex position
            const originalX = this.originalVertices[i3];
            const originalY = this.originalVertices[i3 + 1];
            const originalZ = this.originalVertices[i3 + 2];
            
            let displacementX, displacementY, displacementZ;
            
            if (testMode) {
                // Extreme test displacement - should be very visible
                const testAmplitude = 0.5; // Very large displacement
                displacementX = Math.sin(this.morphTimer + i * 0.1) * testAmplitude;
                displacementY = Math.cos(this.morphTimer + i * 0.1) * testAmplitude;
                displacementZ = Math.sin(this.morphTimer * 0.5 + i * 0.1) * testAmplitude;
            } else {
                // Calculate noise based on vertex position and time
                const noiseX = this.calculateNoise(originalX, originalY, originalZ, this.morphTimer, 0);
                const noiseY = this.calculateNoise(originalX, originalY, originalZ, this.morphTimer, 1000);
                const noiseZ = this.calculateNoise(originalX, originalY, originalZ, this.morphTimer, 2000);
                
                // Apply noise displacement with intensity scaling
                const intensity = config.intensity;
                const amplitude = advanced.noiseAmplitude;
                
                displacementX = noiseX * amplitude * intensity;
                displacementY = noiseY * amplitude * intensity;
                displacementZ = noiseZ * amplitude * intensity;
            }
            
            // Track max displacement for debugging
            const totalDisplacement = Math.sqrt(displacementX*displacementX + displacementY*displacementY + displacementZ*displacementZ);
            maxDisplacement = Math.max(maxDisplacement, totalDisplacement);
            
            positions.setX(i, originalX + displacementX);
            positions.setY(i, originalY + displacementY);
            positions.setZ(i, originalZ + displacementZ);
        }
        
        // Debug logging for displacement (more frequent for debugging)
        if (Math.floor(this.morphTimer * 10) % 50 === 0) {
            console.log(`🔄 Applied noise to ${this.id}: maxDisplacement=${maxDisplacement.toFixed(4)}, vertices=${vertexCount}, intensity=${config.intensity}, amplitude=${advanced.noiseAmplitude}, timer=${this.morphTimer.toFixed(2)}`);
        }
        
        // Mark positions as needing update
        positions.needsUpdate = true;
        
        // Recompute normals for proper lighting
        this.mesh.geometry.computeVertexNormals();
    }
    
    calculateNoise(x, y, z, time, offset) {
        const config = VISUAL_CONFIG.shapes.morphing.advanced;
        const frequency = config.noiseFrequency;
        
        // Simple 3D noise using sine waves (Perlin noise would be better but more complex)
        const noise1 = Math.sin((x * frequency + time + offset) * 0.5) * 
                      Math.cos((y * frequency + time + offset) * 0.7);
        const noise2 = Math.cos((z * frequency + time + offset) * 0.3) * 
                      Math.sin((x * frequency + time + offset) * 0.9);
        const noise3 = Math.sin((y * frequency + z * frequency + time + offset) * 0.4);
        
        // Combine multiple noise octaves for more organic result
        return (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75;
    }
    
    applyMorphEasing(progress, easingType) {
        switch (easingType) {
            case 'linear':
                return progress;
                
            case 'easeInOutCubic':
                return progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
            case 'easeInOutSine':
                return -(Math.cos(Math.PI * progress) - 1) / 2;
                
            default:
                return progress;
        }
    }
    
    resetConvergence() {
        // Call parent reset
        super.resetConvergence();
        
        // Reset to original vertex positions
        if (this.originalVertices && this.mesh && this.mesh.geometry) {
            const positions = this.mesh.geometry.attributes.position;
            positions.array.set(this.originalVertices);
            positions.needsUpdate = true;
            this.mesh.geometry.computeVertexNormals();
        }
    }
    
    dispose() {
        // Clean up vertex data
        this.originalVertices = null;
        
        // Call parent dispose
        super.dispose();
        
        console.log(`🔄 Disposed morphing eye shape: ${this.id}`);
    }
}

// ShapeManager class to handle dynamic eye shape lifecycle
class ShapeManager {
    constructor() {
        this.shapes = new Map(); // Map of eye image URL to EyeShape
        this.scene = null;
        this.maxShapes = VISUAL_CONFIG.system.maxShapes; // Maximum number of shapes
        this.shapeTypes = VISUAL_CONFIG.system.shapeTypes;
        
        // 🎨 NEW: Artistic processor reference
        this.artisticProcessor = null; // Will be set by TheatreClient
    }

    setScene(scene) {
        this.scene = scene;
    }
    
    // 🎨 NEW: Set artistic processor reference
    setArtisticProcessor(processor) {
        this.artisticProcessor = processor;
        console.log('🎨 Artistic processor set for ShapeManager');
    }

    addEyeShape(eyeImageUrl, filename, useMorphing = false) {
        // Don't add if we already have a shape for this eye image
        if (this.shapes.has(eyeImageUrl)) {
            console.log(`Shape already exists for: ${filename}`);
            return null;
        }

        // Check if we've reached the maximum number of shapes
        if (this.shapes.size >= this.maxShapes) {
            console.log(`Maximum shapes reached (${this.maxShapes}), not adding new shape`);
            return null;
        }

        // Create new eye shape - morphing or regular based on parameter
        let eyeShape;
        if (useMorphing && VISUAL_CONFIG.shapes.morphing.enabled) {
            // Create morphing shape
            eyeShape = new MorphingEyeShape(eyeImageUrl, 'morphing');
        } else {
            // Create regular shape with random geometry type
            const randomShapeType = this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
            eyeShape = new EyeShape(eyeImageUrl, randomShapeType);
        }
        
        // 🎨 NEW: Set artistic processor reference
        if (this.artisticProcessor) {
            eyeShape.artisticProcessor = this.artisticProcessor;
        }
        
        // Add to scene
        if (this.scene) {
            eyeShape.addToScene(this.scene);
        }
        
        // 🔄 UPDATED: Delay emergence until texture is fully processed
        // Set up texture loading completion callback
        eyeShape.onTextureProcessed = () => {
            // 🌟 Start emergence animation ONLY after texture is processed
            if (VISUAL_CONFIG.shapes.emergence.enabled) {
                const currentTime = performance.now() / 1000;
                eyeShape.startEmergence(currentTime);
                console.log(`🌟 Starting delayed emergence for ${eyeShape.id} after texture processing`);
            }
        };
        
        // Store the shape
        this.shapes.set(eyeImageUrl, eyeShape);
        
        const shapeType = useMorphing ? 'morphing' : eyeShape.shapeType;
        console.log(`Created new eye shape: ${eyeShape.id} (${shapeType}) for ${filename} - waiting for texture processing`);
        return eyeShape;
    }
    
    // 🔄 NEW: Add morphing eye shape specifically
    addMorphingEyeShape(eyeImageUrl, filename) {
        return this.addEyeShape(eyeImageUrl, filename, true);
    }
    
    // 🔄 NEW: Convert existing shapes to morphing shapes
    convertToMorphingShapes() {
        if (!VISUAL_CONFIG.shapes.morphing.enabled) {
            console.log('🔄 Morphing is disabled in configuration');
            return 0;
        }
        
        let convertedCount = 0;
        const shapesToConvert = Array.from(this.shapes.entries());
        
        shapesToConvert.forEach(([url, shape]) => {
            if (!(shape instanceof MorphingEyeShape)) {
                // Store shape info before removal
                const filename = shape.filename || 'converted';
                
                // Remove old shape
                this.removeEyeShape(url);
                
                // Create new morphing shape
                const morphingShape = this.addMorphingEyeShape(url, filename);
                if (morphingShape) {
                    convertedCount++;
                }
            }
        });
        
        console.log(`🔄 Converted ${convertedCount} shapes to morphing shapes`);
        return convertedCount;
    }
    
    // 🔄 NEW: Get morphing statistics
    getMorphingStats() {
        const totalShapes = this.shapes.size;
        let morphingShapes = 0;
        let regularShapes = 0;
        
        this.shapes.forEach(shape => {
            if (shape instanceof MorphingEyeShape) {
                morphingShapes++;
            } else {
                regularShapes++;
            }
        });
        
        return {
            total: totalShapes,
            morphing: morphingShapes,
            regular: regularShapes,
            morphingEnabled: VISUAL_CONFIG.shapes.morphing.enabled
        };
    }

    removeEyeShape(eyeImageUrl) {
        const shape = this.shapes.get(eyeImageUrl);
        if (shape) {
            // Remove from scene
            if (this.scene) {
                shape.removeFromScene(this.scene);
            }
            
            // Dispose resources
            shape.dispose();
            
            // Remove from map
            this.shapes.delete(eyeImageUrl);
            
            console.log(`Removed eye shape: ${shape.id}`);
            return true;
        }
        return false;
    }

    update(deltaTime) {
        // Update all shapes
        for (const shape of this.shapes.values()) {
            shape.update(deltaTime);
        }
    }

    getAllShapes() {
        return Array.from(this.shapes.values());
    }

    getAttractionPoints() {
        // Return positions of all shapes for particle attraction
        return this.getAllShapes().map(shape => ({
            position: shape.getAttractionPosition(),
            id: shape.id
        }));
    }

    clearAllShapes() {
        // Remove and dispose all shapes
        for (const [url, shape] of this.shapes) {
            if (this.scene) {
                shape.removeFromScene(this.scene);
            }
            shape.dispose();
        }
        this.shapes.clear();
        console.log('Cleared all eye shapes');
    }

    getShapeCount() {
        return this.shapes.size;
    }

    dispose() {
        this.clearAllShapes();
    }

    // Convergence animation methods
    startConvergence() {
        const currentTime = performance.now() / 1000;
        
        for (const shape of this.shapes.values()) {
            shape.startConvergence(currentTime);
        }
        
        console.log(`Started convergence animation for ${this.shapes.size} shapes`);
    }

    isConvergenceComplete() {
        if (this.shapes.size === 0) return true;
        
        for (const shape of this.shapes.values()) {
            if (!shape.isConvergenceComplete()) {
                return false;
            }
        }
        return true;
    }

    resetConvergence() {
        for (const shape of this.shapes.values()) {
            shape.resetConvergence();
        }
        
        console.log(`Reset convergence for ${this.shapes.size} shapes`);
    }

    getConvergenceProgress() {
        if (this.shapes.size === 0) return 1.0;
        
        let totalProgress = 0;
        for (const shape of this.shapes.values()) {
            totalProgress += shape.convergenceProgress || 0;
        }
        return totalProgress / this.shapes.size;
    }

    // Enhanced attraction during convergence
    getIntenseAttractionPoints() {
        return this.getAllShapes().map(shape => ({
            position: shape.getAttractionPosition(),
            id: shape.id,
            intensity: shape.isConverging ? (1.0 + shape.convergenceProgress * VISUAL_CONFIG.shapes.convergence.intensity.maxMultiplier) : 1.0
        }));
    }
}

class TheatreClient {
    constructor() {
        this.socket = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationMeshes = [];
        this.isAnimationTriggered = false;
        
        // Visual effects system
        this.particleSystem = null;
        this.shapeManager = null; // New shape manager for eye-textured shapes
        this.eyeShapes = []; // Legacy - keeping for compatibility
        this.visualPhase = 1; // 1: particles only, 2: particles + shapes, 3: convergence, 4: dispersion
        this.lastTime = 0;
        
        // Camera rotation tracking
        this.cameraRotationTime = 0;
        this.baseRadius = VISUAL_CONFIG.scene.camera.position.z;
        
        // 🎨 NEW: Artistic texture processor
        this.artisticProcessor = null;
        
        this.init();
    }

    init() {
        console.log('Initializing Theatre Client...');
        
        // Initialize Socket.IO connection
        this.initSocketIO();
        
        // Initialize Three.js scene
        this.initThreeJS();
        
        // Initialize texture display system
        this.initTextureDisplay();
        
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
            
            const source = data.source || 'unknown';
            const sourceText = source === 'keyboard' ? `keyboard (${data.hotkey})` : source;
            this.addDebugMessage(`🎭 Animation triggered from ${sourceText}`);
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

        // Keyboard trigger event handlers
        this.socket.on('keyboard_status', (data) => {
            console.log('Keyboard status update:', data);
            this.updateKeyboardStatus(data);
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
        this.scene.background = new THREE.Color(VISUAL_CONFIG.scene.background);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            VISUAL_CONFIG.scene.camera.fov, 
            container.clientWidth / container.clientHeight, 
            VISUAL_CONFIG.scene.camera.near, 
            VISUAL_CONFIG.scene.camera.far
        );
        this.camera.position.z = VISUAL_CONFIG.scene.camera.position.z;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        container.appendChild(this.renderer.domElement);

        // Initialize post-processing pipeline
        this.initPostProcessing();

        // Add OrbitControls for mouse grab orbital view
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = VISUAL_CONFIG.scene.controls.enableDamping;
        this.controls.dampingFactor = VISUAL_CONFIG.scene.controls.dampingFactor;
        this.controls.screenSpacePanning = VISUAL_CONFIG.scene.controls.screenSpacePanning;
        this.controls.minDistance = VISUAL_CONFIG.scene.controls.minDistance;
        this.controls.maxDistance = VISUAL_CONFIG.scene.controls.maxDistance;
        this.controls.maxPolarAngle = VISUAL_CONFIG.scene.controls.maxPolarAngle;
        this.controls.autoRotate = VISUAL_CONFIG.scene.controls.autoRotate;
        this.controls.autoRotateSpeed = VISUAL_CONFIG.scene.controls.autoRotateSpeed;
        
        console.log('OrbitControls initialized - Mouse grab orbital view enabled with custom 3D rotation');

        // Add configurable lighting
        const ambientLight = new THREE.AmbientLight(
            VISUAL_CONFIG.scene.lighting.ambient.color, 
            VISUAL_CONFIG.scene.lighting.ambient.intensity
        );
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(
            VISUAL_CONFIG.scene.lighting.directional.color, 
            VISUAL_CONFIG.scene.lighting.directional.intensity
        );
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        // Initialize visual effects system
        this.initVisualEffects();

        // Create some placeholder meshes for the animation (keep as backup)
        this.createPlaceholderMeshes();
        
        // Hide placeholder meshes initially since we start with particles
        this.setPlaceholderMeshesVisibility(false);
        
        // Initialize camera rotation speed display
        this.initializeCameraSpeedDisplay();
    }

    initPostProcessing() {
        console.log('Initializing post-processing pipeline...');
        
        // Only initialize if bloom is enabled
        if (!VISUAL_CONFIG.bloom.enabled) {
            console.log('Bloom disabled in configuration');
            return;
        }

        try {
            // Check if required post-processing modules are available
            if (typeof THREE.EffectComposer === 'undefined' || 
                typeof THREE.RenderPass === 'undefined' || 
                typeof THREE.UnrealBloomPass === 'undefined') {
                console.warn('Post-processing modules not available. Bloom will be skipped.');
                console.warn('Please include three/examples/js/postprocessing/EffectComposer.js and related files');
                return;
            }

            // Create effect composer
            this.composer = new THREE.EffectComposer(this.renderer);
            
            // Create render pass
            this.renderPass = new THREE.RenderPass(this.scene, this.camera);
            this.composer.addPass(this.renderPass);
            
            // Determine bloom quality based on configuration
            const qualitySettings = this.getBloomQualitySettings();
            
            // Create bloom pass with configurable parameters and quality settings
            this.bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                VISUAL_CONFIG.bloom.intensity,
                VISUAL_CONFIG.bloom.radius,
                VISUAL_CONFIG.bloom.threshold
            );
            
            // Apply quality settings
            this.bloomPass.resolution = qualitySettings.resolution;
            
            this.composer.addPass(this.bloomPass);
            
            // Set tone mapping exposure
            this.renderer.toneMappingExposure = VISUAL_CONFIG.bloom.exposure;
            
            // Initialize performance monitoring for adaptive quality
            if (VISUAL_CONFIG.bloom.performance.adaptiveQuality) {
                this.initPerformanceMonitoring();
            }
            
            console.log(`Post-processing initialized - Bloom enabled with:`);
            console.log(`  Intensity: ${VISUAL_CONFIG.bloom.intensity}, Threshold: ${VISUAL_CONFIG.bloom.threshold}, Radius: ${VISUAL_CONFIG.bloom.radius}`);
            console.log(`  Quality: ${VISUAL_CONFIG.bloom.performance.quality}, Exposure: ${VISUAL_CONFIG.bloom.exposure}`);
            console.log(`  Constant Emission: ${VISUAL_CONFIG.bloom.constantEmission.enabled ? 'Enabled' : 'Disabled'}`);
            
        } catch (error) {
            console.error('Failed to initialize post-processing:', error);
            console.warn('Falling back to standard renderer without bloom');
        }
    }

    getBloomQualitySettings() {
        const quality = VISUAL_CONFIG.bloom.performance.quality;
        
        switch (quality) {
            case 'low':
                return {
                    resolution: new THREE.Vector2(256, 256)
                };
            case 'medium':
                return {
                    resolution: new THREE.Vector2(512, 512)
                };
            case 'high':
            default:
                return {
                    resolution: new THREE.Vector2(1024, 1024)
                };
        }
    }

    initPerformanceMonitoring() {
        // Simple performance monitoring for adaptive quality
        this.frameCount = 0;
        this.lastFPSCheck = performance.now();
        this.currentFPS = 60;
        
        console.log('Performance monitoring initialized for adaptive bloom quality');
    }

    initVisualEffects() {
        console.log('Initializing visual effects system...');
        
        // 🎨 NEW: Initialize artistic texture processor
        this.artisticProcessor = new ArtisticTextureProcessor();
        
        // Initialize particle system (Phase 1)
        this.particleSystem = new ParticleSystem(VISUAL_CONFIG.particles.count); // Start with configured particle count
        this.particleSystem.addToScene(this.scene);
        
        // Initialize shape manager (Phase 2)
        this.shapeManager = new ShapeManager();
        this.shapeManager.setScene(this.scene);
        
        // 🎨 NEW: Connect artistic processor to shape manager
        this.shapeManager.setArtisticProcessor(this.artisticProcessor);
        
        // Set initial visual phase
        this.visualPhase = 1;
        this.lastTime = performance.now();
        
        console.log('Visual effects system initialized - Phase 1: Particles with center attraction active, ShapeManager ready');
        console.log('🎨 Artistic texture processing enabled for client-side edge detection');
    }

    setPlaceholderMeshesVisibility(visible) {
        this.animationMeshes.forEach(mesh => {
            mesh.visible = visible;
        });
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
        
        // Keep only last configured number of eye images
        while (container.children.length > VISUAL_CONFIG.system.maxEyeImages) {
            container.removeChild(container.lastChild);
        }

        // Create 3D eye shape if we're in Phase 2 or higher
        if (this.visualPhase >= 2 && this.shapeManager) {
            // 🔄 UPDATED: Always create morphing shapes from the beginning
            const eyeShape = this.shapeManager.addMorphingEyeShape(url, filename);
            if (eyeShape) {
                this.addDebugMessage(`Created 3D morphing eye shape for ${filename}`, 'success');
            }
        }

        // Check if we should transition to Phase 2 (eye shapes)
        this.checkVisualPhaseTransition();
        
        // Update texture display
        this.onNewEyeImageProcessed(filename, url);
    }

    checkVisualPhaseTransition() {
        const eyeImages = document.querySelectorAll('#eye-images-container .eye-image');
        
        // Transition to Phase 2 when we have at least one eye image
        if (this.visualPhase === 1 && eyeImages.length > 0) {
            this.transitionToPhase2();
        }
    }

    transitionToPhase2() {
        console.log('Transitioning to Phase 2: Particles + Eye Shapes');
        this.visualPhase = 2;
        
        // Create eye shapes for existing eye images
        if (this.shapeManager) {
            const eyeImages = document.querySelectorAll('#eye-images-container .eye-image');
            eyeImages.forEach(img => {
                // 🔄 UPDATED: Always create morphing shapes from the beginning
                const eyeShape = this.shapeManager.addMorphingEyeShape(img.src, img.alt);
                if (eyeShape) {
                    console.log(`Created morphing eye shape for existing image: ${img.alt} - waiting for texture processing`);
                }
            });
            
            // 🔄 NEW: Monitor texture processing status
            setTimeout(() => {
                const shapes = this.shapeManager.getAllShapes();
                const processingCount = shapes.filter(s => s.isTextureProcessing).length;
                const processedCount = shapes.filter(s => s.isTextureProcessed).length;
                const emergingCount = shapes.filter(s => s.isEmerging).length;
                
                console.log(`📊 Texture Processing Status: ${processingCount} processing, ${processedCount} processed, ${emergingCount} emerging`);
            }, 1000); // Check after 1 second
            
            // Enable particle attraction to eye shapes
            if (this.particleSystem) {
                const attractionPoints = this.shapeManager.getAttractionPoints();
                this.particleSystem.setAttractionMode(true, attractionPoints);
                console.log(`Enabled particle attraction to ${attractionPoints.length} eye shapes`);
            }
        }
        
        this.addDebugMessage(`Visual Phase 2: Eye shapes system activated (${this.shapeManager ? this.shapeManager.getShapeCount() : 0} shapes)`, 'success');
    }

    // Method to be called by external animation trigger
    transitionToPhase3() {
        this.visualPhase = 3;
        this.addDebugMessage('Phase 3: Starting convergence animation', 'info');
        
        // Start convergence animation for all shapes
        if (this.shapeManager) {
            this.shapeManager.startConvergence();
        }
        
        // Remove placeholder meshes if they exist
        this.setPlaceholderMeshesVisibility(false);
        
        console.log('Transitioned to Phase 3: Convergence animation');
    }

    transitionToPhase4() {
        this.visualPhase = 4;
        this.isInShellTransition = true;
        this.shellTransitionStartTime = performance.now() / 1000; // Convert to seconds
        
        this.addDebugMessage('Phase 4: Shell effect - particles forming protective shell', 'info');
        
        // Reset particle mode will be handled in updateVisualEffects
        if (this.particleSystem) {
            this.particleSystem.setParticleMode('normal'); // Start with normal mode, will switch to shell
        }
        
        console.log('Transitioned to Phase 4: Shell effect around converged shapes');
    }

    startDispersionPhase() {
        this.visualPhase = 4; // Move to Phase 4 but start with dispersion
        this.isInDispersionPhase = true;
        this.isInShellTransition = true;
        this.dispersionCompleted = false;
        
        this.addDebugMessage('Phase 4a: Dispersion burst - particles exploding outward!', 'success');
        
        // Start the dispersion effect
        if (this.particleSystem) {
            this.particleSystem.startDispersion();
        }
        
        console.log('Started dispersion phase: particles bursting outward from converged shapes');
    }

    completeDispersionPhase() {
        this.isInDispersionPhase = false;
        this.dispersionCompleted = true;
        
        this.addDebugMessage('Phase 4b: Dispersion complete - transitioning to shell formation', 'info');
        
        // Begin shell effect
        if (this.particleSystem) {
            this.particleSystem.setParticleMode('normal'); // Reset mode before shell
        }
        
        console.log('Dispersion phase completed, beginning shell effect');
    }

    triggerFinalAnimation() {
        console.log('Starting final animation...');
        this.isAnimationTriggered = true;
        
        // Transition to Phase 3 (convergence animation) 
        this.transitionToPhase3();
        
        // Keep existing placeholder mesh animation as backup
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

        this.addDebugMessage('Final animation triggered - convergence animation started');
    }

    resetAnimation() {
        console.log('Resetting convergence animation');
        
        // Reset visual phase
        this.visualPhase = this.shapeManager && this.shapeManager.getShapeCount() > 0 ? 2 : 1;
        
        // Reset convergence animation
        if (this.shapeManager) {
            this.shapeManager.resetConvergence();
        }
        
        // Reset particle system to normal mode
        if (this.particleSystem) {
            this.particleSystem.setParticleMode('normal');
            // Reset dispersion state
            this.particleSystem.isDispersing = false;
            this.particleSystem.dispersionProgress = 0;
        }
        
        // Reset shell effect transition tracking
        this.isInShellTransition = false;
        this.shellTransitionStartTime = 0;
        
        // Reset dispersion tracking
        this.isInDispersionPhase = false;
        this.dispersionCompleted = false;
        
        // Re-enable orbital animation for shapes
        this.setPlaceholderMeshesVisibility(false);
        
        this.addDebugMessage('Animation reset - returned to normal orbital patterns', 'info');
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

        // Calculate delta time for smooth animation
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        // Update custom camera rotation (must be before controls.update())
        this.updateCustomCameraRotation(deltaTime);

        // Update orbital controls
        if (this.controls) {
            this.controls.update();
        }

        // Update visual effects based on current phase
        this.updateVisualEffects(deltaTime);

        // Update placeholder meshes (backup system)
        this.updatePlaceholderMeshes(deltaTime);

        // Render with post-processing if available, otherwise use standard renderer
        if (this.composer && VISUAL_CONFIG.bloom.enabled) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }

    updateVisualEffects(deltaTime) {
        switch (this.visualPhase) {
            case 1: // Particles with center attraction
                if (this.particleSystem) {
                    // Update camera position for depth-based brightness
                    this.particleSystem.setCameraPosition(this.camera.position);
                    
                    // Create center attractor point
                    const centerAttractor = [{
                        position: new THREE.Vector3(0, 0, 0),
                        id: 'center',
                        intensity: VISUAL_CONFIG.attraction.centerAttraction.intensity
                    }];
                    
                    // Enable attraction to center
                    this.particleSystem.setAttractionMode(true, centerAttractor);
                    this.particleSystem.update(deltaTime);
                }
                break;
                
            case 2: // Particles + Eye shapes
                if (this.particleSystem) {
                    // Update camera position for depth-based brightness
                    this.particleSystem.setCameraPosition(this.camera.position);
                    
                    // Update attraction points from orbiting eye shapes
                    if (this.shapeManager) {
                        const attractionPoints = this.shapeManager.getAttractionPoints();
                        this.particleSystem.setAttractionMode(true, attractionPoints);
                    }
                    
                    this.particleSystem.update(deltaTime);
                }
                
                // Update eye shapes (orbital animation)
                if (this.shapeManager) {
                    this.shapeManager.update(deltaTime);
                }
                break;
                
            case 3: // Convergence animation
                if (this.particleSystem) {
                    // Update camera position for depth-based brightness
                    this.particleSystem.setCameraPosition(this.camera.position);
                    
                    // Use intense attraction points during convergence
                    if (this.shapeManager) {
                        const intenseAttractionPoints = this.shapeManager.getIntenseAttractionPoints();
                        this.particleSystem.setAttractionMode(true, intenseAttractionPoints);
                        
                        // Check if convergence is complete
                        if (this.shapeManager.isConvergenceComplete()) {
                            const progress = this.shapeManager.getConvergenceProgress();
                            if (progress >= 1.0 && !this.isInShellTransition) {
                                this.addDebugMessage('Convergence completed! Triggering dispersion burst...', 'success');
                                this.startDispersionPhase();
                            }
                        }
                    }
                    
                    this.particleSystem.update(deltaTime);
                }
                
                // Update eye shapes during convergence
                if (this.shapeManager) {
                    this.shapeManager.update(deltaTime);
                }
                break;
                
            case 4: // Shell effect - particles form shell around converged shapes
                // Handle dispersion phase within Phase 4
                if (this.isInDispersionPhase && this.particleSystem) {
                    // Update camera position for depth-based brightness
                    this.particleSystem.setCameraPosition(this.camera.position);
                    
                    // During dispersion, no attractors - just let particles burst outward
                    this.particleSystem.setAttractionMode(false, []);
                    
                    // Check if dispersion is complete
                    if (this.particleSystem.isDispersionComplete()) {
                        this.completeDispersionPhase();
                    }
                    
                    this.particleSystem.update(deltaTime);
                } else if (this.particleSystem) {
                    // Normal shell effect after dispersion
                    // Update camera position for depth-based brightness
                    this.particleSystem.setCameraPosition(this.camera.position);
                    
                    // Get converged shape positions for repulsion
                    if (this.shapeManager) {
                        const shapePositions = this.shapeManager.getAllShapes().map(shape => ({
                            position: shape.getAttractionPosition(),
                            id: shape.id,
                            intensity: 1.0 // Normal intensity for shell effect
                        }));
                        
                        this.particleSystem.setAttractionMode(true, shapePositions);
                        this.particleSystem.setParticleMode('shell'); // Enable shell behavior
                    }
                    
                    this.particleSystem.update(deltaTime);
                }
                
                // Continue updating eye shapes (they remain stationary at center)
                if (this.shapeManager) {
                    this.shapeManager.update(deltaTime);
                }
                break;
        }
    }

    updatePlaceholderMeshes(deltaTime) {
        // Keep existing placeholder mesh animation as backup
        this.animationMeshes.forEach((mesh, index) => {
            mesh.rotation.x += VISUAL_CONFIG.animation.placeholder.rotationSpeed;
            mesh.rotation.y += VISUAL_CONFIG.animation.placeholder.rotationSpeed;
            
            if (this.isAnimationTriggered) {
                // Add flowing motion
                const time = Date.now() * 0.001;
                mesh.position.x += Math.sin(time + index) * VISUAL_CONFIG.animation.placeholder.flowMotion;
                mesh.position.y += Math.cos(time + index) * VISUAL_CONFIG.animation.placeholder.flowMotion;
            }
        });
    }

    updateCustomCameraRotation(deltaTime) {
        const rotationConfig = VISUAL_CONFIG.scene.controls.custom3DRotation;
        
        if (!rotationConfig.enabled) return;
        
        // Calculate dynamic speed based on number of shapes
        const currentShapes = this.shapeManager ? this.shapeManager.getShapeCount() : 0;
        const maxShapes = VISUAL_CONFIG.system.maxShapes;
        const shapeRatio = Math.min(currentShapes / maxShapes, 1.0); // Clamp to 1.0 max
        
        // Speed multiplier ranges from 0.1 to 1.0 based on shape count
        const speedMultiplier = 0.1 + (shapeRatio * 0.9);
        
        // Apply dynamic speed to both horizontal and vertical rotation
        const dynamicHorizontalSpeed = rotationConfig.horizontalSpeed * speedMultiplier;
        const dynamicVerticalSpeed = rotationConfig.verticalSpeed * speedMultiplier;
        
        // Update rotation time with dynamic speeds
        this.cameraRotationTime += deltaTime * rotationConfig.timeScale;
        
        // Calculate horizontal rotation (azimuth) - continuous rotation with dynamic speed
        const horizontalAngle = this.cameraRotationTime * dynamicHorizontalSpeed;
        
        // Calculate vertical rotation (polar) - oscillating motion with dynamic speed
        const verticalOscillation = Math.sin(this.cameraRotationTime * dynamicVerticalSpeed) * rotationConfig.verticalRange;
        const verticalAngle = rotationConfig.verticalOffset + verticalOscillation * (Math.PI * 0.4); // 0.4 gives nice range without going to extremes
        
        // Calculate camera position using spherical coordinates
        const radius = this.baseRadius;
        const x = radius * Math.sin(verticalAngle) * Math.cos(horizontalAngle);
        const y = radius * Math.cos(verticalAngle);
        const z = radius * Math.sin(verticalAngle) * Math.sin(horizontalAngle);
        
        // Update camera position
        this.camera.position.set(x, y, z);
        
        // Make camera look at the center
        this.camera.lookAt(0, 0, 0);
        
        // Update controls target to maintain smooth user interaction
        if (this.controls) {
            this.controls.target.set(0, 0, 0);
        }
        
        // Optional: Debug logging for speed changes (can be removed later)
        if (Math.floor(this.cameraRotationTime * 10) % 50 === 0) { // Log every ~5 seconds
            console.log(`📷 Camera rotation speed: ${(speedMultiplier * 100).toFixed(1)}% (${currentShapes}/${maxShapes} shapes)`);
        }
        
        // Update UI display for camera rotation speed
        this.updateCameraSpeedDisplay(speedMultiplier, currentShapes, maxShapes);
    }

    updateCameraSpeedDisplay(speedMultiplier, currentShapes, maxShapes) {
        // Update camera rotation speed in UI if elements exist
        const speedElement = document.getElementById('camera-rotation-speed');
        if (speedElement) {
            speedElement.textContent = `${(speedMultiplier * 100).toFixed(1)}%`;
        }
        
        const shapeCountElement = document.getElementById('camera-speed-shape-count');
        if (shapeCountElement) {
            shapeCountElement.textContent = `${currentShapes}/${maxShapes}`;
        }
        
        // Update progress bar if it exists
        const progressBar = document.getElementById('camera-speed-progress');
        if (progressBar) {
            progressBar.style.width = `${speedMultiplier * 100}%`;
            
            // Add visual feedback based on speed level
            progressBar.className = 'camera-speed-bar';
            if (speedMultiplier < 0.3) {
                progressBar.classList.add('speed-slow');
            } else if (speedMultiplier < 0.7) {
                progressBar.classList.add('speed-medium');
            } else {
                progressBar.classList.add('speed-fast');
            }
        }
        
        // Update status text
        const statusElement = document.getElementById('camera-rotation-status');
        if (statusElement) {
            let status = 'Stopped';
            if (VISUAL_CONFIG.scene.controls.custom3DRotation.enabled) {
                if (speedMultiplier < 0.3) {
                    status = 'Slow Rotation';
                } else if (speedMultiplier < 0.7) {
                    status = 'Medium Rotation';
                } else {
                    status = 'Fast Rotation';
                }
            }
            statusElement.textContent = status;
            statusElement.className = `rotation-status ${speedMultiplier > 0.1 ? 'active' : 'inactive'}`;
        }
    }

    onWindowResize() {
        const container = document.getElementById('three-canvas-container');
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        
        // Update composer for post-processing if it exists
        if (this.composer) {
            this.composer.setSize(container.clientWidth, container.clientHeight);
        }
        
        // Update controls if they exist
        if (this.controls) {
            this.controls.handleResize();
        }
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

        // Reset animation button
        const resetAnimationBtn = document.getElementById('reset-animation');
        if (resetAnimationBtn) {
            resetAnimationBtn.addEventListener('click', () => {
                this.resetAnimation();
                this.addDebugMessage('Reset convergence animation');
            });
        }

        // Test shell effect button
        const testShellEffectBtn = document.getElementById('test-shell-effect');
        if (testShellEffectBtn) {
            testShellEffectBtn.addEventListener('click', () => {
                // If we have shapes and not already in shell mode, test shell effect
                if (this.shapeManager && this.shapeManager.getShapeCount() > 0) {
                    if (this.visualPhase !== 4) {
                        this.transitionToPhase4();
                        this.addDebugMessage('Manually triggered shell effect for testing');
                    } else {
                        this.addDebugMessage('Already in shell effect mode');
                    }
                } else {
                    this.addDebugMessage('No eye shapes available - need shapes for shell effect', 'warning');
                }
            });
        }

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

        // Flow dynamics toggle
        const flowDynamicsToggle = document.getElementById('flow-dynamics-toggle');
        if (flowDynamicsToggle) {
            flowDynamicsToggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                const statusText = document.getElementById('flow-dynamics-status');
                
                if (statusText) {
                    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
                    statusText.className = enabled ? 'config-status enabled' : 'config-status disabled';
                }
                
                // Update the configuration
                VISUAL_CONFIG.attraction.flowDynamics.enabled = enabled;
                
                this.addDebugMessage(`Enhanced Flow Dynamics ${enabled ? 'enabled' : 'disabled'} - ${enabled ? 'Particles will flow around all shapes' : 'Using original simple attraction'}`);
            });
        }

        // Bloom toggle
        const bloomToggle = document.getElementById('bloom-toggle');
        if (bloomToggle) {
            bloomToggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                const statusText = document.getElementById('bloom-status');
                
                if (statusText) {
                    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
                    statusText.className = enabled ? 'config-status enabled' : 'config-status disabled';
                }
                
                // Update the configuration
                VISUAL_CONFIG.bloom.enabled = enabled;
                
                this.addDebugMessage(`Bloom Post-Processing ${enabled ? 'enabled' : 'disabled'} - ${enabled ? 'Professional bloom effects active' : 'Standard rendering'}`);
                
                // Note: Full bloom enable/disable requires reinitialization
                if (enabled && !this.composer) {
                    this.addDebugMessage('Bloom reinitialization required - please refresh the page for full effect');
                }
            });
        }

        // Constant emission toggle
        const constantEmissionToggle = document.getElementById('constant-emission-toggle');
        if (constantEmissionToggle) {
            constantEmissionToggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                const statusText = document.getElementById('constant-emission-status');
                
                if (statusText) {
                    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
                    statusText.className = enabled ? 'config-status enabled' : 'config-status disabled';
                }
                
                // Update the configuration
                VISUAL_CONFIG.bloom.constantEmission.enabled = enabled;
                
                this.addDebugMessage(`Constant Emission ${enabled ? 'enabled' : 'disabled'} - ${enabled ? 'Particles emit constant light like bulbs for bloom effect' : 'Standard particle brightness'}`);
            });
        }

        // Test dispersion button
        const testDispersionBtn = document.getElementById('test-dispersion');
        if (testDispersionBtn) {
            testDispersionBtn.addEventListener('click', () => {
                // Test dispersion effect
                if (this.particleSystem) {
                    if (!this.isInDispersionPhase) {
                        this.startDispersionPhase();
                        this.addDebugMessage('Manually triggered dispersion burst for testing');
                    } else {
                        this.addDebugMessage('Dispersion already in progress');
                    }
                } else {
                    this.addDebugMessage('Particle system not available', 'warning');
                }
            });
        }

        // Bloom controls
        if (document.getElementById('bloom-enabled')) {
            document.getElementById('bloom-enabled').addEventListener('change', (e) => {
                VISUAL_CONFIG.bloom.enabled = e.target.checked;
                this.updateBloomSettings();
                console.log(`Bloom effect ${e.target.checked ? 'enabled' : 'disabled'}`);
            });
        }

        if (document.getElementById('bloom-intensity')) {
            document.getElementById('bloom-intensity').addEventListener('input', (e) => {
                VISUAL_CONFIG.bloom.intensity = parseFloat(e.target.value);
                document.getElementById('bloom-intensity-value').textContent = e.target.value;
                this.updateBloomSettings();
            });
        }

        if (document.getElementById('bloom-threshold')) {
            document.getElementById('bloom-threshold').addEventListener('input', (e) => {
                VISUAL_CONFIG.bloom.threshold = parseFloat(e.target.value);
                document.getElementById('bloom-threshold-value').textContent = e.target.value;
                this.updateBloomSettings();
            });
        }

        if (document.getElementById('bloom-radius')) {
            document.getElementById('bloom-radius').addEventListener('input', (e) => {
                VISUAL_CONFIG.bloom.radius = parseFloat(e.target.value);
                document.getElementById('bloom-radius-value').textContent = e.target.value;
                this.updateBloomSettings();
            });
        }

        if (document.getElementById('bloom-exposure')) {
            document.getElementById('bloom-exposure').addEventListener('input', (e) => {
                VISUAL_CONFIG.bloom.exposure = parseFloat(e.target.value);
                document.getElementById('bloom-exposure-value').textContent = e.target.value;
                this.updateBloomSettings();
            });
        }

        // Bloom quality selector
        if (document.getElementById('bloom-quality')) {
            document.getElementById('bloom-quality').addEventListener('change', (e) => {
                VISUAL_CONFIG.bloom.performance.quality = e.target.value;
                this.updateBloomSettings();
                console.log(`Bloom quality set to: ${e.target.value}`);
            });
        }

        // Bloom adaptive quality toggle
        if (document.getElementById('adaptive-quality')) {
            document.getElementById('adaptive-quality').addEventListener('change', (e) => {
                VISUAL_CONFIG.bloom.performance.adaptiveQuality = e.target.checked;
                const status = document.getElementById('adaptive-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                console.log(`Adaptive bloom quality ${e.target.checked ? 'enabled' : 'disabled'}`);
            });
        }
        
        // 🎨 NEW: Artistic Processing Controls Event Listeners
        // =========================================================
        
        // Main toggle for artistic processing
        if (document.getElementById('artistic-enabled')) {
            document.getElementById('artistic-enabled').addEventListener('change', (e) => {
                VISUAL_CONFIG.artisticProcessing.enabled = e.target.checked;
                const status = document.getElementById('artistic-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                this.updateArtisticProcessing();
                console.log(`🎨 Artistic processing ${e.target.checked ? 'enabled' : 'disabled'}`);
            });
        }
        
        // Edge detection method
        if (document.getElementById('edge-method')) {
            document.getElementById('edge-method').addEventListener('change', (e) => {
                VISUAL_CONFIG.artisticProcessing.edgeDetection.method = e.target.value;
                this.updateArtisticProcessing();
                console.log(`🎨 Edge detection method: ${e.target.value}`);
            });
        }
        
        // Edge threshold
        if (document.getElementById('edge-threshold')) {
            document.getElementById('edge-threshold').addEventListener('input', (e) => {
                VISUAL_CONFIG.artisticProcessing.edgeDetection.threshold = parseFloat(e.target.value);
                document.getElementById('threshold-value').textContent = e.target.value;
                this.updateArtisticProcessing();
            });
        }
        
        // Edge strength
        if (document.getElementById('edge-strength')) {
            document.getElementById('edge-strength').addEventListener('input', (e) => {
                VISUAL_CONFIG.artisticProcessing.edgeDetection.strength = parseFloat(e.target.value);
                document.getElementById('strength-value').textContent = e.target.value;
                this.updateArtisticProcessing();
            });
        }
        
        // Contrast factor
        if (document.getElementById('contrast-factor')) {
            document.getElementById('contrast-factor').addEventListener('input', (e) => {
                VISUAL_CONFIG.artisticProcessing.contrast.factor = parseFloat(e.target.value);
                document.getElementById('contrast-value').textContent = e.target.value;
                this.updateArtisticProcessing();
            });
        }
        
        // Gamma correction
        if (document.getElementById('gamma-correction')) {
            document.getElementById('gamma-correction').addEventListener('input', (e) => {
                VISUAL_CONFIG.artisticProcessing.contrast.gamma = parseFloat(e.target.value);
                document.getElementById('gamma-value').textContent = e.target.value;
                this.updateArtisticProcessing();
            });
        }
        
        // Invert edges style
        if (document.getElementById('invert-edges')) {
            document.getElementById('invert-edges').addEventListener('change', (e) => {
                VISUAL_CONFIG.artisticProcessing.style.invertEdges = e.target.value === 'true';
                this.updateArtisticProcessing();
                console.log(`🎨 Edge style: ${e.target.value === 'true' ? 'white on black' : 'black on white'}`);
            });
        }
        
        // Edge thickness
        if (document.getElementById('edge-thickness')) {
            document.getElementById('edge-thickness').addEventListener('input', (e) => {
                VISUAL_CONFIG.artisticProcessing.style.edgeThickness = parseInt(e.target.value);
                document.getElementById('thickness-value').textContent = e.target.value;
                this.updateArtisticProcessing();
            });
        }
        
        // Noise reduction toggle
        if (document.getElementById('noise-reduction')) {
            document.getElementById('noise-reduction').addEventListener('change', (e) => {
                VISUAL_CONFIG.artisticProcessing.style.noiseReduction = e.target.checked;
                const status = document.getElementById('noise-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                this.updateArtisticProcessing();
            });
        }
        
        // Edge smoothing toggle
        if (document.getElementById('edge-smoothing')) {
            document.getElementById('edge-smoothing').addEventListener('change', (e) => {
                VISUAL_CONFIG.artisticProcessing.style.smoothing = e.target.checked;
                const status = document.getElementById('smoothing-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                this.updateArtisticProcessing();
            });
        }
        
        // Edge glow effect
        if (document.getElementById('edge-glow')) {
            document.getElementById('edge-glow').addEventListener('change', (e) => {
                VISUAL_CONFIG.artisticProcessing.textureEnhancement.edgeGlow.enabled = e.target.checked;
                const status = document.getElementById('glow-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                this.updateArtisticProcessing();
            });
        }
        
        // Glow intensity
        if (document.getElementById('glow-intensity')) {
            document.getElementById('glow-intensity').addEventListener('input', (e) => {
                VISUAL_CONFIG.artisticProcessing.textureEnhancement.edgeGlow.intensity = parseFloat(e.target.value);
                document.getElementById('glow-intensity-value').textContent = e.target.value;
                this.updateArtisticProcessing();
            });
        }
        
        // Control buttons
        if (document.getElementById('apply-artistic-processing')) {
            document.getElementById('apply-artistic-processing').addEventListener('click', () => {
                this.reprocessAllShapeTextures();
            });
        }
        
        if (document.getElementById('clear-processing-cache')) {
            document.getElementById('clear-processing-cache').addEventListener('click', () => {
                if (this.artisticProcessor) {
                    this.artisticProcessor.clearCache();
                }
                console.log('🎨 Cleared artistic processing cache');
            });
        }
        
        if (document.getElementById('reset-artistic-defaults')) {
            document.getElementById('reset-artistic-defaults').addEventListener('click', () => {
                this.resetArtisticDefaults();
            });
        }
        
        // 🔄 NEW: Morphing Controls Event Listeners
        // =========================================================
        
        // Main toggle for morphing shapes
        if (document.getElementById('morphing-enabled')) {
            document.getElementById('morphing-enabled').addEventListener('change', (e) => {
                VISUAL_CONFIG.shapes.morphing.enabled = e.target.checked;
                const status = document.getElementById('morphing-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                console.log(`🔄 Shape morphing ${e.target.checked ? 'enabled' : 'disabled'}`);
                this.updateMorphingStats();
            });
        }
        
        // Noise animation speed control
        if (document.getElementById('morphing-speed')) {
            document.getElementById('morphing-speed').addEventListener('input', (e) => {
                VISUAL_CONFIG.shapes.morphing.speed = parseFloat(e.target.value);
                document.getElementById('morphing-speed-value').textContent = e.target.value;
                console.log(`🔄 Noise animation speed: ${e.target.value}`);
            });
        }
        
        // Noise intensity control
        if (document.getElementById('morphing-intensity')) {
            document.getElementById('morphing-intensity').addEventListener('input', (e) => {
                VISUAL_CONFIG.shapes.morphing.intensity = parseFloat(e.target.value);
                document.getElementById('morphing-intensity-value').textContent = e.target.value;
                console.log(`🔄 Noise intensity: ${e.target.value}`);
            });
        }
        
        // NEW: Noise frequency control
        if (document.getElementById('morphing-frequency')) {
            document.getElementById('morphing-frequency').addEventListener('input', (e) => {
                VISUAL_CONFIG.shapes.morphing.advanced.noiseFrequency = parseFloat(e.target.value);
                document.getElementById('morphing-frequency-value').textContent = e.target.value;
                console.log(`🔄 Noise frequency: ${e.target.value}`);
            });
        }
        
        // NEW: Noise amplitude control
        if (document.getElementById('morphing-amplitude')) {
            document.getElementById('morphing-amplitude').addEventListener('input', (e) => {
                VISUAL_CONFIG.shapes.morphing.advanced.noiseAmplitude = parseFloat(e.target.value);
                document.getElementById('morphing-amplitude-value').textContent = e.target.value;
                console.log(`🔄 Noise amplitude: ${e.target.value}`);
            });
        }
        
        // Convert all shapes to morphing
        if (document.getElementById('convert-to-morphing')) {
            document.getElementById('convert-to-morphing').addEventListener('click', () => {
                if (this.shapeManager) {
                    const converted = this.shapeManager.convertToMorphingShapes();
                    this.addDebugMessage(`🔄 Converted ${converted} shapes to morphing shapes`, 'success');
                    this.updateMorphingStats();
                } else {
                    this.addDebugMessage('🔄 Shape manager not available', 'warning');
                }
            });
        }
        
        // Test morphing functionality
        if (document.getElementById('test-morphing')) {
            document.getElementById('test-morphing').addEventListener('click', () => {
                // Create a test morphing shape if none exist
                if (this.shapeManager && this.shapeManager.getShapeCount() === 0) {
                    // Create a test shape with a placeholder texture
                    const testTexture = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiM0Nzc1RkYiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTAiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+';
                    this.shapeManager.addMorphingEyeShape(testTexture, 'test_morphing_shape');
                    this.addDebugMessage('🔄 Created test morphing shape', 'success');
                }
                this.updateMorphingStats();
            });
        }
        
        // 🔍 NEW: Test extreme morphing for debugging
        if (document.getElementById('test-extreme-morphing')) {
            document.getElementById('test-extreme-morphing').addEventListener('click', () => {
                // Toggle extreme test mode
                window.extremeMorphingTest = !window.extremeMorphingTest;
                
                const button = document.getElementById('test-extreme-morphing');
                if (window.extremeMorphingTest) {
                    button.textContent = '🔍 Stop Extreme Test';
                    button.style.backgroundColor = '#ff4444';
                    this.addDebugMessage('🔍 Enabled extreme morphing test - shapes should wobble dramatically', 'warning');
                } else {
                    button.textContent = '🔍 Test Extreme Morphing';
                    button.style.backgroundColor = '';
                    this.addDebugMessage('🔍 Disabled extreme morphing test', 'info');
                }
                
                console.log(`🔍 Extreme morphing test: ${window.extremeMorphingTest ? 'ENABLED' : 'DISABLED'}`);
            });
        }
        
        // Refresh morphing statistics
        if (document.getElementById('refresh-morphing-stats')) {
            document.getElementById('refresh-morphing-stats').addEventListener('click', () => {
                this.updateMorphingStats();
                this.addDebugMessage('🔄 Refreshed morphing statistics', 'info');
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

    updateKeyboardStatus(data) {
        const keyboardStatus = document.getElementById('keyboard-status');
        if (keyboardStatus) {
            if (data.active) {
                keyboardStatus.textContent = `✅ Active (${data.hotkey})`;
                keyboardStatus.className = 'status-connected';
            } else {
                keyboardStatus.textContent = '❌ Inactive';
                keyboardStatus.className = 'status-error';
            }
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
        this.socket.emit('request_keyboard_status');
        this.addDebugMessage('Requested system status update');
    }

    requestExistingEyes() {
        this.socket.emit('request_existing_eyes');
        this.addDebugMessage('Requested existing eye images');
    }

    // 🖼️ NEW: Real-Time Texture Display System
    // =========================================================
    
    initTextureDisplay() {
        // Initialize texture display variables
        this.processedTextures = new Map(); // Store processed textures
        this.autoRefreshInterval = null;
        this.refreshIntervalTime = 3000; // 3 seconds default
        
        // Setup event listeners for texture display controls
        this.setupTextureDisplayEventListeners();
        
        // Start auto-refresh if enabled
        if (document.getElementById('auto-refresh-textures')?.checked) {
            this.startAutoRefresh();
        }
        
        console.log('🖼️ Texture display system initialized');
    }
    
    setupTextureDisplayEventListeners() {
        // Auto-refresh toggle
        if (document.getElementById('auto-refresh-textures')) {
            document.getElementById('auto-refresh-textures').addEventListener('change', (e) => {
                const status = document.getElementById('auto-refresh-status');
                if (status) {
                    status.textContent = e.target.checked ? 'Enabled' : 'Disabled';
                    status.className = `config-status ${e.target.checked ? 'enabled' : 'disabled'}`;
                }
                
                if (e.target.checked) {
                    this.startAutoRefresh();
                } else {
                    this.stopAutoRefresh();
                }
                
                console.log(`🖼️ Auto-refresh ${e.target.checked ? 'enabled' : 'disabled'}`);
            });
        }
        
        // Refresh interval slider
        if (document.getElementById('refresh-interval')) {
            document.getElementById('refresh-interval').addEventListener('input', (e) => {
                this.refreshIntervalTime = parseInt(e.target.value) * 1000; // Convert to milliseconds
                document.getElementById('refresh-interval-value').textContent = e.target.value + 's';
                
                // Restart auto-refresh with new interval if it's running
                if (this.autoRefreshInterval) {
                    this.stopAutoRefresh();
                    this.startAutoRefresh();
                }
                
                console.log(`🖼️ Refresh interval set to ${e.target.value} seconds`);
            });
        }
        
        // Control buttons
        if (document.getElementById('refresh-texture-preview')) {
            document.getElementById('refresh-texture-preview').addEventListener('click', () => {
                this.refreshTextureDisplay();
            });
        }
        
        if (document.getElementById('clear-texture-gallery')) {
            document.getElementById('clear-texture-gallery').addEventListener('click', () => {
                this.clearTextureGallery();
            });
        }
        
        if (document.getElementById('download-processed-texture')) {
            document.getElementById('download-processed-texture').addEventListener('click', () => {
                this.downloadLatestTexture();
            });
        }
    }
    
    startAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
        
        this.autoRefreshInterval = setInterval(() => {
            this.refreshTextureDisplay();
        }, this.refreshIntervalTime);
        
        console.log(`🖼️ Started auto-refresh with ${this.refreshIntervalTime / 1000}s interval`);
    }
    
    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
            console.log('🖼️ Stopped auto-refresh');
        }
    }
    
    refreshTextureDisplay() {
        if (!this.artisticProcessor) {
            console.warn('🖼️ Cannot refresh texture display - artistic processor not available');
            return;
        }
        
        // Update processing status
        this.updateTextureProcessingStatus('processing');
        
        // Get all current eye shapes and their processed textures
        const shapes = this.shapeManager ? this.shapeManager.getAllShapes() : [];
        const grid = document.getElementById('processed-textures-grid');
        
        if (!grid) return;
        
        // Clear existing content except placeholder
        const placeholder = grid.querySelector('.texture-placeholder');
        grid.innerHTML = '';
        
        if (shapes.length === 0) {
            // Show placeholder if no shapes
            if (placeholder) {
                grid.appendChild(placeholder);
            }
            this.updateTextureProcessingStatus('ready');
            this.updateTextureCount(0);
            return;
        }
        
        let processedCount = 0;
        
        shapes.forEach((shape, index) => {
            if (shape.textureUrl && shape.mesh && shape.mesh.material.map) {
                // Create texture item
                const textureItem = this.createTextureItem(shape, index);
                grid.appendChild(textureItem);
                processedCount++;
            }
        });
        
        // Update status and count
        this.updateTextureProcessingStatus('ready');
        this.updateTextureCount(processedCount);
        this.updateLastTextureUpdate();
        
        console.log(`🖼️ Refreshed texture display - showing ${processedCount} processed textures`);
    }
    
    createTextureItem(shape, index) {
        const item = document.createElement('div');
        item.className = 'texture-item';
        item.setAttribute('data-shape-index', index);
        
        // Create image element
        const img = document.createElement('img');
        
        // Extract image data from the Three.js texture with improved debugging
        if (shape.mesh.material.map && shape.mesh.material.map.image) {
            try {
                const texture = shape.mesh.material.map;
                console.log(`🖼️ Processing texture ${index} with userData:`, texture.userData);
                console.log(`🖼️ Texture image type:`, texture.image.constructor.name);
                console.log(`🖼️ Texture image dimensions:`, texture.image.width, 'x', texture.image.height);
                
                // Create a NEW canvas to convert the texture to a data URL
                const displayCanvas = document.createElement('canvas');
                const displayCtx = displayCanvas.getContext('2d');
                
                displayCanvas.width = texture.image.width || 256;
                displayCanvas.height = texture.image.height || 256;
                
                // Clear and draw the texture image
                displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
                displayCtx.drawImage(texture.image, 0, 0);
                
                // Convert to data URL
                const dataUrl = displayCanvas.toDataURL();
                img.src = dataUrl;
                img.alt = `Processed texture ${index + 1}`;
                
                console.log(`🖼️ Created display image for texture ${index}, data URL length:`, dataUrl.length);
                
                // Store the display canvas for potential download (use unique key)
                const uniqueKey = `${index}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
                this.processedTextures.set(uniqueKey, displayCanvas);
                
                // Also store with the simple index for backward compatibility
                this.processedTextures.set(index, displayCanvas);
                
            } catch (error) {
                console.warn(`🖼️ Could not extract texture ${index}:`, error);
                img.src = shape.textureUrl; // Fallback to original
                img.alt = `Original texture ${index + 1}`;
            }
        } else {
            console.warn(`🖼️ No texture found for shape ${index}, using original`);
            img.src = shape.textureUrl; // Fallback to original
            img.alt = `Original texture ${index + 1}`;
        }
        
        img.addEventListener('load', () => {
            item.classList.remove('loading');
            console.log(`🖼️ Texture image ${index} loaded successfully`);
        });
        
        img.addEventListener('error', () => {
            item.classList.remove('loading');
            console.warn(`🖼️ Failed to load texture image for shape ${index}`);
        });
        
        // Create overlay with info
        const overlay = document.createElement('div');
        overlay.className = 'texture-item-overlay';
        
        const filename = shape.filename || `texture_${index + 1}`;
        overlay.innerHTML = `
            <span>${filename}</span>
            <span class="texture-timestamp">${new Date().toLocaleTimeString()}</span>
        `;
        
        // Add click handler for enlargement (optional)
        item.addEventListener('click', () => {
            this.enlargeTexture(shape, index);
        });
        
        item.appendChild(img);
        item.appendChild(overlay);
        item.classList.add('loading');
        
        return item;
    }
    
    enlargeTexture(shape, index) {
        // Optional: Create a modal or popup to show enlarged texture
        console.log(`🖼️ Enlarging texture ${index} for shape:`, shape.filename);
        // This could be implemented as a modal overlay
    }
    
    clearTextureGallery() {
        const grid = document.getElementById('processed-textures-grid');
        if (!grid) return;
        
        // Clear the grid and show placeholder
        grid.innerHTML = `
            <div class="texture-placeholder">
                <div class="placeholder-icon">🎨</div>
                <div class="placeholder-text">No processed textures yet</div>
                <div class="placeholder-subtext">Upload some eye images to see processed textures here</div>
            </div>
        `;
        
        // Clear stored textures
        this.processedTextures.clear();
        
        // Update status
        this.updateTextureCount(0);
        this.updateLastTextureUpdate('Never');
        
        console.log('🖼️ Cleared texture gallery');
    }
    
    downloadLatestTexture() {
        if (this.processedTextures.size === 0) {
            console.warn('🖼️ No processed textures available for download');
            this.addDebugMessage('No processed textures available for download', 'warning');
            return;
        }
        
        // Get the latest processed texture (highest index)
        const latestIndex = Math.max(...this.processedTextures.keys());
        const canvas = this.processedTextures.get(latestIndex);
        
        if (!canvas) {
            console.warn('🖼️ Latest texture canvas not found');
            return;
        }
        
        try {
            // Create download link
            const link = document.createElement('a');
            link.download = `processed_texture_${Date.now()}.png`;
            link.href = canvas.toDataURL();
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('🖼️ Downloaded latest processed texture');
            this.addDebugMessage('Downloaded latest processed texture', 'success');
        } catch (error) {
            console.error('🖼️ Failed to download texture:', error);
            this.addDebugMessage('Failed to download texture', 'error');
        }
    }
    
    updateTextureProcessingStatus(status) {
        const statusElement = document.getElementById('texture-processing-status');
        if (!statusElement) return;
        
        statusElement.className = `status-${status}`;
        
        switch (status) {
            case 'processing':
                statusElement.textContent = 'Processing...';
                break;
            case 'ready':
                statusElement.textContent = 'Ready';
                break;
            case 'error':
                statusElement.textContent = 'Error';
                break;
            default:
                statusElement.textContent = 'Unknown';
        }
    }
    
    updateTextureCount(count) {
        const countElement = document.getElementById('texture-count');
        if (countElement) {
            countElement.textContent = count.toString();
        }
    }
    
    updateLastTextureUpdate(timestamp = null) {
        const updateElement = document.getElementById('last-texture-update');
        if (updateElement) {
            updateElement.textContent = timestamp || new Date().toLocaleTimeString();
        }
    }
    
    // Hook into existing eye image processing to auto-refresh display
    onNewEyeImageProcessed(filename, url) {
        // This method can be called when a new eye image is processed
        // to automatically update the texture display
        if (document.getElementById('auto-refresh-textures')?.checked) {
            setTimeout(() => {
                this.refreshTextureDisplay();
            }, 1000); // Small delay to ensure texture is fully processed
        }
    }

    // Visual effects cleanup
    dispose() {
        // Cleanup resources
        if (this.particleSystem) {
            this.particleSystem.dispose();
        }
        
        if (this.shapeManager) {
            this.shapeManager.dispose();
        }
        
        // 🎨 NEW: Dispose artistic processor
        if (this.artisticProcessor) {
            this.artisticProcessor.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        console.log('TheatreClient disposed');
    }
    
    // 🎨 NEW: Artistic Processing Support Methods
    // =========================================================
    
    updateArtisticProcessing() {
        if (!this.artisticProcessor) return;
        
        // Update processor settings and clear cache
        this.artisticProcessor.updateSettings(VISUAL_CONFIG.artisticProcessing);
        
        // Trigger reprocessing of existing shapes if real-time adjustment is enabled
        if (VISUAL_CONFIG.artisticProcessing.realTimeAdjustment) {
            this.reprocessAllShapeTextures();
        }
        
        console.log('🎨 Updated artistic processing settings');
    }
    
    reprocessAllShapeTextures() {
        if (!this.shapeManager || !this.artisticProcessor) {
            console.warn('🎨 Cannot reprocess textures - missing components');
            return;
        }
        
        const shapes = this.shapeManager.getAllShapes();
        let processedCount = 0;
        
        shapes.forEach(shape => {
            if (shape.textureUrl && shape.mesh) {
                // Clear the current texture
                if (shape.mesh.material.map) {
                    shape.mesh.material.map.dispose();
                }
                
                // Reload and reprocess the texture
                shape.loadTexture();
                processedCount++;
            }
        });
        
        console.log(`🎨 Reprocessing ${processedCount} shape textures with new artistic settings`);
    }
    
    resetArtisticDefaults() {
        // Reset all artistic processing settings to their defaults
        const defaults = {
            enabled: true,
            realTimeAdjustment: true,
            edgeDetection: {
                method: 'sobel',
                threshold: 0.3,
                strength: 2.0,
                adaptiveThreshold: false
            },
            contrast: {
                factor: 2.5,
                brightness: -30,
                gamma: 1.3,
                autoBalance: true
            },
            style: {
                invertEdges: false,
                backgroundColor: 255,
                edgeColor: 0,
                edgeThickness: 1,
                noiseReduction: true,
                smoothing: true
            },
            textureEnhancement: {
                enabled: true,
                sharpening: 1.2,
                contrastBoost: 1.1,
                edgeGlow: {
                    enabled: true,
                    intensity: 0.3,
                    color: 0xffffff
                }
            },
            performance: {
                canvasSize: 256,
                useWorker: false,
                cacheProcessed: true
            }
        };
        
        // Update the config
        VISUAL_CONFIG.artisticProcessing = { ...VISUAL_CONFIG.artisticProcessing, ...defaults };
        
        // Update UI controls to reflect the defaults
        this.updateArtisticUIControls();
        
        // Apply the changes
        this.updateArtisticProcessing();
        
        console.log('🎨 Reset artistic processing to default settings');
    }
    
    updateArtisticUIControls() {
        const config = VISUAL_CONFIG.artisticProcessing;
        
        // Update checkboxes and status
        this.updateCheckboxControl('artistic-enabled', config.enabled, 'artistic-status');
        this.updateCheckboxControl('noise-reduction', config.style.noiseReduction, 'noise-status');
        this.updateCheckboxControl('edge-smoothing', config.style.smoothing, 'smoothing-status');
        this.updateCheckboxControl('edge-glow', config.textureEnhancement.edgeGlow.enabled, 'glow-status');
        
        // Update select elements
        this.updateSelectControl('edge-method', config.edgeDetection.method);
        this.updateSelectControl('invert-edges', config.style.invertEdges.toString());
        
        // Update range inputs and their display values
        this.updateRangeControl('edge-threshold', config.edgeDetection.threshold, 'threshold-value');
        this.updateRangeControl('edge-strength', config.edgeDetection.strength, 'strength-value');
        this.updateRangeControl('contrast-factor', config.contrast.factor, 'contrast-value');
        this.updateRangeControl('gamma-correction', config.contrast.gamma, 'gamma-value');
        this.updateRangeControl('edge-thickness', config.style.edgeThickness, 'thickness-value');
        this.updateRangeControl('glow-intensity', config.textureEnhancement.edgeGlow.intensity, 'glow-intensity-value');
    }
    
    updateCheckboxControl(controlId, value, statusId) {
        const control = document.getElementById(controlId);
        const status = document.getElementById(statusId);
        
        if (control) {
            control.checked = value;
        }
        
        if (status) {
            status.textContent = value ? 'Enabled' : 'Disabled';
            status.className = `config-status ${value ? 'enabled' : 'disabled'}`;
        }
    }
    
    updateSelectControl(controlId, value) {
        const control = document.getElementById(controlId);
        if (control) {
            control.value = value;
        }
    }
    
    updateRangeControl(controlId, value, displayId) {
        const control = document.getElementById(controlId);
        const display = document.getElementById(displayId);
        
        if (control) {
            control.value = value;
        }
        
        if (display) {
            display.textContent = value;
        }
    }
    
    // 🔄 NEW: Update morphing statistics in UI
    updateMorphingStats() {
        if (!this.shapeManager) return;
        
        const stats = this.shapeManager.getMorphingStats();
        
        // Update UI elements
        const totalElement = document.getElementById('morphing-total-shapes');
        const activeElement = document.getElementById('morphing-active-shapes');
        const regularElement = document.getElementById('morphing-regular-shapes');
        
        if (totalElement) totalElement.textContent = stats.total;
        if (activeElement) activeElement.textContent = stats.morphing;
        if (regularElement) regularElement.textContent = stats.regular;
        
        // 🔄 NEW: Add texture processing status
        const shapes = this.shapeManager.getAllShapes();
        const processingCount = shapes.filter(s => s.isTextureProcessing).length;
        const processedCount = shapes.filter(s => s.isTextureProcessed).length;
        const emergingCount = shapes.filter(s => s.isEmerging).length;
        
        console.log(`🔄 Morphing stats: ${stats.morphing}/${stats.total} shapes morphing`);
        console.log(`🔄 Texture processing: ${processingCount} processing, ${processedCount} processed, ${emergingCount} emerging`);
    }

    initializeCameraSpeedDisplay() {
        // Set initial values for camera rotation speed display
        const currentShapes = this.shapeManager ? this.shapeManager.getShapeCount() : 0;
        const maxShapes = VISUAL_CONFIG.system.maxShapes;
        const initialSpeedMultiplier = 0.1; // Starting speed when no shapes
        
        // Initialize display elements
        this.updateCameraSpeedDisplay(initialSpeedMultiplier, currentShapes, maxShapes);
        
        console.log('📷 Camera rotation speed display initialized');
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
}

// Initialize the client when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.theatreClient = new TheatreClient();
}); 