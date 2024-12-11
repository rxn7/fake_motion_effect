import { Shape } from '../shape.js';
import { Vector3 } from '../vector3.js';
export default class Cone extends Shape {
    constructor(origin, radius = 32, height = 128, segments = 12) {
        super(origin);
        this.radius = radius;
        this.height = height;
        this.segments = segments;
        this.centroid = new Vector3();
        this.vertices = new Array(this.segments + 1);
        this.connections = new Array(this.segments);
        this.generateVertices();
        this.generateConnections();
    }
    generateVertices() {
        this.vertices[0] = new Vector3(this.origin.x, this.origin.y, this.height);
        for (let i = 0; i < this.segments; ++i) {
            const angle = (i / this.segments) * Math.PI * 2;
            const x = this.origin.x + Math.cos(angle) * this.radius;
            const y = this.origin.y + Math.sin(angle) * this.radius;
            this.vertices[i + 1] = new Vector3(x, y, 0);
        }
    }
    generateConnections() {
        let idx = 0;
        for (let i = 0; i < this.segments; ++i) {
            const next = (i + 1) % this.segments;
            this.connections[idx++] = { a: 0, b: i + 1 };
            this.connections[idx++] = { a: i + 1, b: next + 1 };
        }
    }
}
