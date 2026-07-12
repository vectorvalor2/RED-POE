import { POE } from './core/poe';
import { RED } from './core/red';
import { SafeAISim } from './simulation/safe_sim';

// Strict runtime architecture bootstrapping sequence
document.addEventListener("DOMContentLoaded", () => {
    // Instantiate execution track layer
    const executionContext = new POE();
    
    // Instantiate the primary context manager layer
    const engineCore = new RED(executionContext, "WebGL(Three.js) & Web Audio API Stack");

    // Initialize simulation canvas configuration
    const simulation = new SafeAISim(engineCore, "viewport-container");

    // Seed production layout parameters
    simulation.buildGoldenRatioAsset("Alpha-Interlock-Node");
    simulation.buildGoldenRatioAsset("Beta-Validation-BoundingBox");

    // Hook analytics pipeline UI outputs
    const metricSeed = document.getElementById("metric-seed");
    const metricEntities = document.getElementById("metric-entities");

    setInterval(() => {
        if (metricSeed) metricSeed.innerText = "0x" + engineCore.poe.stackSeed.toString(16).toUpperCase();
        if (metricEntities) metricEntities.innerText = engineCore.registry.getEntities().length.toString();
    }, 100);

    // Run Graphics Engine Lifecycle Loop
    simulation.startLoop();
});