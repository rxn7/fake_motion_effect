import { Point } from '../point.js';
import { Shape, Connection } from '../shape.js';
import { Vector3 } from '../vector3.js';

export default class Pyramid extends Shape {
	protected override vertices: Vector3[] = new Array<Vector3>(5);
	protected override centroid: Vector3 = new Vector3();
	protected override connections: Connection[] = [
		{ a: 0, b: 1 },
		{ a: 1, b: 2 },
		{ a: 2, b: 3 },
		{ a: 3, b: 0 },
		{ a: 0, b: 4 },
		{ a: 1, b: 4 },
		{ a: 2, b: 4 },
		{ a: 3, b: 4 }
	];

	constructor(origin: Point, baseSize: number = 20) {
		super(origin)
		const halfBase: number = baseSize * 0.5

		// base
		this.vertices[0] = new Vector3(this.origin.x - halfBase, this.origin.y - halfBase, 0)
		this.vertices[1] = new Vector3(this.origin.x + halfBase, this.origin.y - halfBase, 0)
		this.vertices[2] = new Vector3(this.origin.x + halfBase, this.origin.y + halfBase, 0)
		this.vertices[3] = new Vector3(this.origin.x - halfBase, this.origin.y + halfBase, 0)

		// apex
		this.vertices[4] = new Vector3(this.origin.x, this.origin.y, baseSize)
	}
}

