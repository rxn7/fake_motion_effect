import { Renderer } from './renderer.js';
import { Vector3 } from './vector3.js';
export class Shape {
    constructor(origin, rotateAxis = new Vector3(0.005, 0.02, 0.01)) {
        this.origin = origin;
        this.rotateAxis = rotateAxis;
        this.rotateSpeed = 0.05;
    }
    render(deltaTime) {
        this.updateCentroid();
        for (const vertex of this.vertices) {
            vertex[0] -= this.centroid[0];
            vertex[1] -= this.centroid[1];
            vertex[2] -= this.centroid[2];
            const speed = this.rotateSpeed * deltaTime;
            vertex.rotate(this.rotateAxis[0] * speed, this.rotateAxis[1] * speed, this.rotateAxis[2] * speed);
            vertex[0] += this.centroid[0];
            vertex[1] += this.centroid[1];
            vertex[2] += this.centroid[2];
        }
        for (const connection of this.connections) {
            const a = this.vertices[connection.a];
            const b = this.vertices[connection.b];
            Renderer.drawLine(a[0], a[1], b[0], b[1]);
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
