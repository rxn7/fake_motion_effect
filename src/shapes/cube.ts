import { Point } from '../point.js'
import { Shape, Connection } from '../shape.js'
import { Vector3 } from '../vector3.js'

export default class Cube extends Shape {
	protected override vertices: Vector3[] = new Array<Vector3>(8)
	protected override centroid: Vector3 = new Vector3()
	protected override connections: Connection[] = [
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
	]

	constructor(origin: Point, size: number = 20) {
		super(origin)
		const halfSize: number = size * 0.5

		for(let i: number = 0; i < 2; ++i) {
			const z: number = -halfSize + halfSize * i * 2
			const idxOffset: number = i * 4

			this.vertices[idxOffset + 0] = new Vector3(this.origin.x - halfSize, this.origin.y - halfSize, z)
			this.vertices[idxOffset + 1] = new Vector3(this.origin.x + halfSize, this.origin.y - halfSize, z)
			this.vertices[idxOffset + 2] = new Vector3(this.origin.x + halfSize, this.origin.y + halfSize, z)
			this.vertices[idxOffset + 3] = new Vector3(this.origin.x - halfSize, this.origin.y + halfSize, z)
		}
	}
}
