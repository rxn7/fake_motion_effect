import { Point } from '../point.js'
import { Shape, Connection } from '../shape.js'
import { Vector3 } from '../vector3.js'

export default class Cylinder extends Shape {
	protected override vertices: Vector3[]
	protected override centroid: Vector3 = new Vector3()
	protected override connections: Connection[] = []

	constructor(origin: Point, radius: number = 16, height: number = 256, segments: number = 12) {
		super(origin)
		this.vertices = new Array<Vector3>(segments * 2)

		// Generate vertices
		for(let i = 0; i < segments; ++i) {
			const angle = (i / segments) * Math.PI * 2
			const x = this.origin.x + Math.cos(angle) * radius
			const y = this.origin.y + Math.sin(angle) * radius

			// Bottom circle
			this.vertices[i] = new Vector3(x, y, 0)

			// Top circle
			this.vertices[i + segments] = new Vector3(x, y, height)
		}

		// Generate connections
		for(let i = 0; i < segments; ++i) {
			const next = (i + 1) % segments

			// Connect bottom circle
			this.connections.push({ a: i, b: next })

			// Connect top circle
			this.connections.push({ a: i + segments, b: next + segments })

			// Connect vertical edges
			this.connections.push({ a: i, b: i + segments })
		}
	}
}

