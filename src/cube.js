import { Renderer } from './renderer.js';
import { Vector3 } from './vector3.js';
export default class Cube {
    constructor(origin, size = 20, rotate = new Vector3(0.02, 0.01, 0.04)) {
        this.origin = origin;
        this.size = size;
        this.rotate = rotate;
        this.vertices = new Array(8);
        this.centroid = new Vector3();
        this.connections = [
            { a: 0, b: 4 },
            { a: 1, b: 5 },
            { a: 2, b: 6 },
            { a: 3, b: 7 },
            { a: 0, b: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 3 },
            { a: 3, b: 0 },
            { a: 4, b: 5 },
            { a: 5, b: 6 },
            { a: 6, b: 7 },
            { a: 7, b: 4 },
        ];
        this.initVertices();
        this.updateCentroid();
    }
    render() {
        this.updateCentroid();
        for (const vertex of this.vertices) {
            vertex[0] -= this.centroid[0];
            vertex[1] -= this.centroid[1];
            vertex[2] -= this.centroid[2];
            vertex.rotate(this.rotate[0], this.rotate[1], this.rotate[2]);
            vertex[0] += this.centroid[0];
            vertex[1] += this.centroid[1];
            vertex[2] += this.centroid[2];
        }
        for (const connection of this.connections) {
            const a = this.vertices[connection.a];
            const b = this.vertices[connection.b];
            Renderer.invertLine(a[0], a[1], b[0], b[1]);
        }
    }
    initVertices() {
        const halfSize = this.size * 0.5;
        for (let i = 0; i < 2; ++i) {
            const z = -halfSize + halfSize * i * 2;
            const idxOffset = i * 4;
            this.vertices[idxOffset + 0] = new Vector3(this.origin.x - halfSize, this.origin.y - halfSize, z);
            this.vertices[idxOffset + 1] = new Vector3(this.origin.x + halfSize, this.origin.y - halfSize, z);
            this.vertices[idxOffset + 2] = new Vector3(this.origin.x + halfSize, this.origin.y + halfSize, z);
            this.vertices[idxOffset + 3] = new Vector3(this.origin.x - halfSize, this.origin.y + halfSize, z);
        }
    }
    updateCentroid() {
        this.centroid = new Vector3();
        for (const vertex of this.vertices) {
            this.centroid[0] += vertex[0];
            this.centroid[1] += vertex[1];
            this.centroid[2] += vertex[2];
        }
        this.centroid[0] /= this.vertices.length;
        this.centroid[1] /= this.vertices.length;
        this.centroid[2] /= this.vertices.length;
    }
}
