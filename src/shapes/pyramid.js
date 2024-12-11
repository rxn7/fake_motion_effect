import { Shape } from '../shape.js';
import { Vector3 } from '../vector3.js';
export default class Pyramid extends Shape {
    constructor(origin, baseSize = 20) {
        super(origin);
        this.vertices = new Array(5);
        this.centroid = new Vector3();
        this.connections = [
            { a: 0, b: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 3 },
            { a: 3, b: 0 },
            { a: 0, b: 4 },
            { a: 1, b: 4 },
            { a: 2, b: 4 },
            { a: 3, b: 4 }
        ];
        const halfBase = baseSize * 0.5;
        this.vertices[0] = new Vector3(this.origin.x - halfBase, this.origin.y - halfBase, 0);
        this.vertices[1] = new Vector3(this.origin.x + halfBase, this.origin.y - halfBase, 0);
        this.vertices[2] = new Vector3(this.origin.x + halfBase, this.origin.y + halfBase, 0);
        this.vertices[3] = new Vector3(this.origin.x - halfBase, this.origin.y + halfBase, 0);
        this.vertices[4] = new Vector3(this.origin.x, this.origin.y, baseSize);
    }
}
