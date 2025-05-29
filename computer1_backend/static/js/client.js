// Experimental Theatre Digital Program - Client-side JavaScript

// =============================================================================
// VISUAL EFFECTS CONFIGURATION - Easy parameter tweaking interface
// =============================================================================
const VISUAL_CONFIG = {
    // Particle System Configuration
    particles: {
        count: 500,                    // Number of particles in the system
        size: 0.01,                   // Size of individual particles (sphere radius) - increased for visibility
        resetDistance: 6,            // Distance from center before particle resets - reduced for camera scale
        depthEffect: {
            maxDistance: 6,          // Maximum distance for depth brightness calculation
            dimming: 0.1              // How much to dim far particles (0-1)
        },
        distribution: {
            radiusMultiplier: 0.3,    // Percentage of reset distance for initial distribution
            initialSpeed: 0.8         // Initial random velocity speed
        },
        color: {
            hueBase: 0.6,             // Base hue for particle colors
            hueVariation: 0.2,        // Random hue variation range
            saturation: 0.3,          // Color saturation
            lightness: 0.9            // Color lightness
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
        baseStrength: 0.06,           // Base attraction force strength - increased from 0.02
        maxStrength: 0.15,             // Maximum attraction force cap - increased from 0.1
        minDistance: 0.1,             // Minimum distance to avoid division by zero
        distanceOffset: 0.1,          // Distance offset for force calculation
        drag: {
            normal: 0.85,             // Normal drag multiplier (less = more drag)
            intense: 0.95             // Drag during intense convergence
        },
        intensityThreshold: 1.5,      // Threshold for switching to intense mode
        centerAttraction: {
            intensity: 1.0            // Intensity of center attraction in Phase 1
        },
        // Enhanced flow dynamics
        flowDynamics: {
            enabled: true,            // Enable enhanced flow system
            turbulenceStrength: 0.02, // Random turbulence force strength
            repulsionRadius: 0.4,     // Distance at which repulsion starts
            repulsionStrength: 0.09,  // Strength of repulsion force
            circulationStrength: 0.05, // Strength of tangential circulation force
            distributionRadius: 2.0,  // Radius for spatial distribution
            forceBalancing: true,     // Enable force balancing between attractors
            escapeVelocity: 0.5,      // Minimum velocity to escape attractor influence
            flowField: {
                enabled: true,        // Enable global flow field
                strength: 0.04,       // Global flow field strength
                scale: 0.5,           // Scale of flow field noise
                timeScale: 0.3        // Time scale for animated flow field
            }
        }
    },
    
    // Eye Shape Configuration
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
                min: 1.5,               // Minimum orbital radius from center
                max: 3                // Maximum orbital radius from center
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
                color: 0xffffff       // Color when texture is loaded (white for proper texture display)
            }
        }
    },
    
    // Scene and Camera Configuration
    scene: {
        background: 0x0a0a0a,         // Scene background color
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
                z: 5                  // Camera Z position
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
            autoRotate: true,         // Auto-rotate the camera
            autoRotateSpeed: 1.0      // Auto-rotation speed (if enabled)
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
        maxShapes: 30,                // Maximum number of eye shapes
        shapeTypes: ['cube', 'bipyramid', 'pentagon'],  // Available shape types
        maxEyeImages: 30              // Maximum eye images to keep in UI
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
    }
};

// =============================================================================
// END CONFIGURATION - Classes and implementation below
// =============================================================================

// Particle class for individual particles
class Particle {
    constructor() {
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.originalColor = new THREE.Color();
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

    update(deltaTime, attractors = []) {
        // Apply attraction forces if in attraction mode
        if (attractors.length > 0) {
            const config = VISUAL_CONFIG.attraction;
            
            if (config.flowDynamics.enabled) {
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
        
        // Enhanced material for bloom emission
        this.material = new THREE.MeshBasicMaterial({
            color: VISUAL_CONFIG.particles.rendering.material.color,
            transparent: true,
            opacity: VISUAL_CONFIG.particles.rendering.material.baseOpacity,
            blending: THREE.AdditiveBlending,
            // Enhanced properties for constant bloom emission like light bulbs
            emissive: new THREE.Color(VISUAL_CONFIG.bloom.constantEmission.baseEmissive), // Use config emissive color
            emissiveIntensity: VISUAL_CONFIG.bloom.constantEmission.emissiveIntensity, // Strong constant emission
            depthWrite: false, // Disable depth writing for better blending
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

    update(deltaTime) {
        const maxDepth = VISUAL_CONFIG.particles.depthEffect.maxDistance; // Maximum distance from camera for depth calculation
        
        // Update each particle
        this.particles.forEach((particle, index) => {
            particle.update(deltaTime, this.attractionMode ? this.attractors : []);
            
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
        
        // Convergence animation properties
        this.isConverging = false;
        this.convergenceProgress = 0; // 0 to 1
        this.convergenceDuration = VISUAL_CONFIG.shapes.convergence.duration; // seconds
        this.initialRadius = this.orbitalRadius;
        this.initialSpeed = this.orbitalSpeed;
        this.convergenceStartTime = 0;
        this.targetRadius = VISUAL_CONFIG.shapes.convergence.targetRadius; // Final radius at center
        this.speedMultiplier = 1.0;
        
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
        
        // Create material with placeholder until texture loads
        const material = new THREE.MeshLambertMaterial({
            color: VISUAL_CONFIG.shapes.material.placeholder.color,
            transparent: true,
            opacity: VISUAL_CONFIG.shapes.material.placeholder.opacity
        });

        this.mesh = new THREE.Mesh(geometry, material);
        
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
        
        loader.load(
            this.textureUrl,
            (texture) => {
                // Texture loaded successfully
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                
                // Update material with the eye texture
                this.mesh.material.map = texture;
                this.mesh.material.color.setHex(VISUAL_CONFIG.shapes.material.loaded.color);
                this.mesh.material.needsUpdate = true;
                
                this.isLoaded = true;
                console.log(`Eye texture loaded for shape: ${this.id}`);
            },
            (progress) => {
                // Loading progress (optional)
            },
            (error) => {
                console.error(`Failed to load eye texture: ${this.textureUrl}`, error);
                // Keep the placeholder material
            }
        );
    }

    update(deltaTime) {
        if (!this.mesh) return;

        // Handle convergence animation
        if (this.isConverging) {
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

    isConvergenceComplete() {
        return this.isConverging && this.convergenceProgress >= 1.0;
    }

    resetConvergence() {
        this.isConverging = false;
        this.convergenceProgress = 0;
        this.orbitalRadius = this.initialRadius;
        this.speedMultiplier = 1.0;
        
        if (this.mesh) {
            this.mesh.scale.setScalar(1.0);
            if (this.mesh.material) {
                this.mesh.material.opacity = VISUAL_CONFIG.shapes.material.placeholder.opacity;
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

// ShapeManager class to handle dynamic eye shape lifecycle
class ShapeManager {
    constructor() {
        this.shapes = new Map(); // Map of eye image URL to EyeShape
        this.scene = null;
        this.maxShapes = VISUAL_CONFIG.system.maxShapes; // Maximum number of shapes
        this.shapeTypes = VISUAL_CONFIG.system.shapeTypes;
    }

    setScene(scene) {
        this.scene = scene;
    }

    addEyeShape(eyeImageUrl, filename) {
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

        // Create new eye shape with random geometry type
        const randomShapeType = this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
        const eyeShape = new EyeShape(eyeImageUrl, randomShapeType);
        
        // Add to scene
        if (this.scene) {
            eyeShape.addToScene(this.scene);
        }
        
        // Store the shape
        this.shapes.set(eyeImageUrl, eyeShape);
        
        console.log(`Created new eye shape: ${eyeShape.id} (${randomShapeType}) for ${filename}`);
        return eyeShape;
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
        this.visualPhase = 1; // 1: particles only, 2: particles + shapes, 3: convergence
        this.lastTime = 0;
        
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
        
        console.log('OrbitControls initialized - Mouse grab orbital view enabled with auto-rotation');

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
        
        // Initialize particle system (Phase 1)
        this.particleSystem = new ParticleSystem(VISUAL_CONFIG.particles.count); // Start with configured particle count
        this.particleSystem.addToScene(this.scene);
        
        // Initialize shape manager (Phase 2)
        this.shapeManager = new ShapeManager();
        this.shapeManager.setScene(this.scene);
        
        // Set initial visual phase
        this.visualPhase = 1;
        this.lastTime = performance.now();
        
        console.log('Visual effects system initialized - Phase 1: Particles with center attraction active, ShapeManager ready');
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
            const eyeShape = this.shapeManager.addEyeShape(url, filename);
            if (eyeShape) {
                this.addDebugMessage(`Created 3D eye shape: ${eyeShape.shapeType} for ${filename}`, 'success');
            }
        }

        // Check if we should transition to Phase 2 (eye shapes)
        this.checkVisualPhaseTransition();
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
                const eyeShape = this.shapeManager.addEyeShape(img.src, img.alt);
                if (eyeShape) {
                    console.log(`Created eye shape for existing image: ${eyeShape.shapeType}`);
                }
            });
            
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
        console.log('Transitioning to Phase 3: Convergence Animation');
        this.visualPhase = 3;
        
        // Start convergence animation for all eye shapes
        if (this.shapeManager) {
            this.shapeManager.startConvergence();
            
            // Enable intense particle attraction
            if (this.particleSystem) {
                const intenseAttractionPoints = this.shapeManager.getIntenseAttractionPoints();
                this.particleSystem.setAttractionMode(true, intenseAttractionPoints);
                console.log(`Enabled intense particle attraction with ${intenseAttractionPoints.length} convergence points`);
            }
        }
        
        this.addDebugMessage(`Visual Phase 3: Convergence animation started (${this.shapeManager ? this.shapeManager.getShapeCount() : 0} shapes converging)`, 'success');
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
        console.log('Resetting convergence animation...');
        
        // Reset convergence state
        if (this.shapeManager) {
            this.shapeManager.resetConvergence();
        }
        
        // Reset to appropriate phase based on eye images
        const eyeImages = document.querySelectorAll('#eye-images-container .eye-image');
        if (eyeImages.length > 0) {
            this.visualPhase = 2; // Back to particle + shapes phase
            this.addDebugMessage('Reset to Phase 2: Particles + Eye Shapes');
        } else {
            this.visualPhase = 1; // Back to center attraction phase
            this.addDebugMessage('Reset to Phase 1: Particles with Center Attraction');
        }
        
        this.isAnimationTriggered = false;
        this.addDebugMessage('Animation reset complete');
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
                            if (progress >= 1.0) {
                                this.addDebugMessage('Convergence animation completed! All shapes have reached the center.', 'success');
                                // Optional: Could transition to a new phase or loop
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

    // Visual effects cleanup
    dispose() {
        if (this.particleSystem) {
            this.particleSystem.dispose();
            this.particleSystem = null;
        }
        
        if (this.shapeManager) {
            this.shapeManager.dispose();
            this.shapeManager = null;
        }
        
        if (this.controls) {
            this.controls.dispose();
            this.controls = null;
        }
        
        // Clean up post-processing resources
        if (this.composer) {
            this.composer.dispose();
            this.composer = null;
        }
        
        if (this.bloomPass) {
            this.bloomPass.dispose();
            this.bloomPass = null;
        }
        
        if (this.renderPass) {
            this.renderPass.dispose();
            this.renderPass = null;
        }
        
        // Clear status update interval
        if (this.statusUpdateInterval) {
            clearInterval(this.statusUpdateInterval);
        }
        
        console.log('Theatre client disposed - including post-processing resources');
    }
}

// Initialize the client when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.theatreClient = new TheatreClient();
}); 