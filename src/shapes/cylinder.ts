import { Point } from '../point.js'
import { Shape, Connection } from '../shape.js'
import { Vector3 } from '../vector3.js'

export default class Cylinder extends Shape {
	protected override vertices: Vector3[]
	protected override centroid: Vector3 = new Vector3()
	protected override connections: Connection[]

	constructor(origin: Point, private radius: number = 16, private height: number = 256, private segments: number = 12) {
		super(origin)
		this.vertices = new Array<Vector3>(this.segments * 2)
		this.connections = new Array<Connection>(this.segments * 3)

		this.generateVertices()
		this.generateConnections()
	}

	private generateVertices(): void {
		for(let i = 0; i < this.segments; ++i) {
			const angle = (i / this.segments) * Math.PI * 2
			const x = this.origin.x + Math.cos(angle) * this.radius
			const y = this.origin.y + Math.sin(angle) * this.radius

			// bottom circle
			this.vertices[i] = new Vector3(x, y, 0)

			// top circle
			this.vertices[i + this.segments] = new Vector3(x, y, this.height)
		}
	}

	private generateConnections(): void {
		let idx = 0
		for(let i = 0; i < this.segments; ++i) {
			const next = (i + 1) % this.segments

			// connect to bottom circle
			this.connections[idx++] = { a: i, b: next }

			// connect to top circle
			this.connections[idx++] = { a: i + this.segments, b: next + this.segments }

			// connect vertical edges
			this.connections[idx++] = { a: i, b: i + this.segments }
		}
	}
}
