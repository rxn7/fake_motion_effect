import { Point } from '../point.js'
import { Shape, Connection } from '../shape.js'
import { Vector3 } from '../vector3.js'

export default class Cone extends Shape {
	protected override vertices: Vector3[]
	protected override centroid: Vector3 = new Vector3()
	protected override connections: Connection[]

	constructor(origin: Point, private radius: number = 32, private height: number = 128, private segments: number = 12) {
		super(origin)
		this.vertices = new Array<Vector3>(this.segments + 1)
		this.connections = new Array<Connection>(this.segments)

		this.generateVertices()
		this.generateConnections()
	}

	private generateVertices(): void {
		this.vertices[0] = new Vector3(this.origin.x, this.origin.y, this.height) // apex

		for(let i = 0; i < this.segments; ++i) {
			const angle = (i / this.segments) * Math.PI * 2
			const x = this.origin.x + Math.cos(angle) * this.radius
			const y = this.origin.y + Math.sin(angle) * this.radius
			this.vertices[i + 1] = new Vector3(x, y, 0)
		}
	}

	private generateConnections(): void {
		let idx = 0
		for(let i = 0; i < this.segments; ++i) {
			const next = (i + 1) % this.segments

			this.connections[idx++] = { a: 0, b: i + 1 } // connect to apex
			this.connections[idx++] = { a: i + 1, b: next + 1 }
		}
	}
}
