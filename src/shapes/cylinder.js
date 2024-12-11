import { Shape } from '../shape.js';
import { Vector3 } from '../vector3.js';
export default class Cylinder extends Shape {
    constructor(origin, radius = 16, height = 256, segments = 12) {
        super(origin);
        this.radius = radius;
        this.height = height;
        this.segments = segments;
        this.centroid = new Vector3();
        this.vertices = new Array(this.segments * 2);
        this.connections = new Array(this.segments * 3);
        this.generateVertices();
        this.generateConnections();
    }
    generateVertices() {
        for (let i = 0; i < this.segments; ++i) {
            const angle = (i / this.segments) * Math.PI * 2;
            const x = this.origin.x + Math.cos(angle) * this.radius;
            const y = this.origin.y + Math.sin(angle) * this.radius;
            this.vertices[i] = new Vector3(x, y, 0);
            this.vertices[i + this.segments] = new Vector3(x, y, this.height);
        }
    }
    generateConnections() {
        let idx = 0;
        for (let i = 0; i < this.segments; ++i) {
            const next = (i + 1) % this.segments;
            this.connections[idx++] = { a: i, b: next };
            this.connections[idx++] = { a: i + this.segments, b: next + this.segments };
            this.connections[idx++] = { a: i, b: i + this.segments };
        }
    }
}
