import { describe, it, expect } from 'vitest';
import { POE } from '../core/poe';
import { RED } from '../core/red';

describe('Game Engine Core Architecture Tests', () => {
    it('should initialize POE context with random seeding stack values', () => {
        const poe = new POE(0xABCDEF);
        expect(poe.stackSeed).toBe(0xABCDEF);
        expect(poe.hardwareMetrics.gpu).toContain("Jecht");
    });

    it('should cycle deterministic state steps accurately inside the POE layer', () => {
        const poe = new POE(12345);
        const originalSeed = poe.stackSeed;
        poe.seedStack();
        expect(poe.stackSeed).not.toBe(originalSeed);
    });

    it('should calculate structural Base44 data encoding values dynamically', () => {
        const poe = new POE();
        const engine = new RED(poe, "Test-Context");
        const crypto = engine.getCryptoLayer();
        
        const textPayload = "EngineNodeData";
        const encoded = crypto.encode(textPayload);
        expect(encoded).toBeDefined();
        expect(typeof encoded).toBe("string");
    });

    it('should safely construct new entity wrappers dynamically in the registration system', () => {
        const poe = new POE();
        const engine = new RED(poe, "Test-Context");
        
        const entity = engine.registry.createEntity();
        entity.addComponent("TestComp", { status: "Active" });
        
        expect(entity.hasComponent("TestComp")).toBe(true);
        expect(engine.registry.getEntities().length).toBe(1);
    });
});