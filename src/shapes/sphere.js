import { Shape } from '../shape.js';
import { Vector3 } from '../vector3.js';
export default class Sphere extends Shape {
    constructor(origin, radius = 32, segments = 16) {
        super(origin);
        this.radius = radius;
        this.segments = segments;
        this.centroid = new Vector3();
        this.rings = this.segments / 2;
        this.vertices = new Array((this.segments + 1) * (this.rings + 1));
        this.connections = new Array(this.segments * 2 * this.rings);
        this.generateVertices();
        this.generateConnections();
    }
    generateVertices() {
        for (let i = 0; i <= this.rings; ++i) {
            const theta = Math.PI / this.rings * i;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            for (let j = 0; j <= this.segments; ++j) {
                const phi = 2 * Math.PI * j / this.segments;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
                this.vertices[i * (this.segments + 1) + j] = new Vector3(this.origin.x + sinTheta * cosPhi * this.radius, this.origin.y + sinTheta * sinPhi * this.radius, this.radius * cosTheta);
            }
        }
    }
    generateConnections() {
        let idx = 0;
        for (let i = 0; i < this.rings; ++i) {
            for (let j = 0; j < this.segments; ++j) {
                const a = i * (this.segments + 1) + j;
                const b = a + this.segments + 1;
                const next = (j + 1) % this.segments;
                this.connections[idx++] = { a: a, b: i * (this.segments + 1) + next };
                this.connections[idx++] = { a, b };
            }
        }
    }
}
