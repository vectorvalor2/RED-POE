import * as THREE from 'three';
import { RED } from '../core/red';
import { Entity } from '../core/ecs';

/**
 * Safe AI Sim validation framework matching the Golden Ratio layout constraints
 */
export class SafeAISim {
    private engine: RED;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private phi = 1.61803398875; // Golden Ratio Layout Optimizer

    constructor(engineInstance: RED, containerId: string) {
        this.engine = engineInstance;
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container #${containerId} not found`);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Dynamic scaling
        container.appendChild(this.renderer.domElement);

        this.initLighting();
        this.setupResizeHandler(container);
    }

    private initLighting(): void {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        this.scene.add(ambientLight, dirLight);
        this.camera.position.set(0, 2, 5);
    }

    /**
     * Interlocks and builds high-confidence geometries utilizing Golden Ratio bounding boxes
     */
    public buildGoldenRatioAsset(name: string): Entity {
        const entity = this.engine.registry.createEntity();
        
        // Calculate structural bounding measurements based on Phi scaling layers
        const width = 1.0;
        const height = width * this.phi;
        const depth = height / this.phi;

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xc5a059, 
            wireframe: false,
            roughness: 0.2 
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        this.scene.add(mesh);

        entity.addComponent("Transform", { position: mesh.position, rotation: mesh.rotation });
        entity.addComponent("RenderMesh", { meshInstance: mesh, name });

        return entity;
    }

    private setupResizeHandler(container: HTMLElement): void {
        window.addEventListener('resize', () => {
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    public startLoop(): void {
        const animate = () => {
            requestAnimationFrame(animate);

            // Execute deterministic updates inside our ECS system loop
            const entities = this.engine.registry.getEntities();
            entities.forEach(entity => {
                const renderData = entity.getComponent<{ meshInstance: THREE.Mesh }>("RenderMesh");
                if (renderData) {
                    renderData.meshInstance.rotation.y += 0.01;
                    renderData.meshInstance.rotation.x += 0.005;
                }
            });

            this.engine.poe.seedStack();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}