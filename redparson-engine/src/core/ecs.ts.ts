/**
 * Strict Lightweight Entity Component System (ECS) for deterministic graphics and asset updates.
 */
export type Component = Record<string, any>;

export class Entity {
    public readonly id: string;
    private components: Map<string, Component> = new Map();

    constructor() {
        this.id = Math.random().toString(36).substr(2, 9);
    }

    public addComponent(name: string, component: Component): void {
        this.components.set(name, component);
    }

    public getComponent<T>(name: string): T | undefined {
        return this.components.get(name) as T;
    }

    public hasComponent(name: string): boolean {
        return this.components.has(name);
    }
}

export class Registry {
    private entities: Map<string, Entity> = new Map();

    public createEntity(): Entity {
        const entity = new Entity();
        this.entities.set(entity.id, entity);
        return entity;
    }

    public removeEntity(id: string): void {
        this.entities.delete(id);
    }

    public getEntities(): Entity[] {
        return Array.from(this.entities.values());
    }
}