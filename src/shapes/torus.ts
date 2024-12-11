import { Point } from '../point.js'
import { Shape, Connection } from '../shape.js'
import { Vector3 } from '../vector3.js'

export default class Torus extends Shape {
	protected override vertices: Vector3[]
	protected override centroid: Vector3 = new Vector3()
	protected override connections: Connection[]
	private rings: number

	constructor(origin: Point, private centerRadius: number = 86, private tubeRadius: number = 32, private segments: number = 32) {
		super(origin)
		this.rings = this.segments / 2
		this.vertices = new Array<Vector3>(this.segments * this.rings)
		this.connections = new Array<Connection>(this.segments * this.rings * 2)

		this.generateVertices()
		this.generateConnections()
	}

	private generateVertices(): void {
		for(let i=0; i <= this.rings; ++i) {
			const theta = Math.PI / this.rings * i * 2
			const sinTheta = Math.sin(theta)
			const cosTheta = Math.cos(theta)

			for(let j=0; j <= this.segments; ++j) {
				const phi = 2 * Math.PI * j / this.segments	
				const sinPhi = Math.sin(phi)
				const cosPhi = Math.cos(phi)

				this.vertices[i * this.segments + j] = new Vector3(
					this.origin.x + (this.centerRadius + this.tubeRadius * cosTheta) * cosPhi,
					this.origin.y + (this.centerRadius + this.tubeRadius * cosTheta) * sinPhi,
					this.tubeRadius * sinTheta
				)
			}
		}
	}

	private generateConnections(): void {
		let idx = 0

		for(let i=0; i < this.rings; ++i) {
			for(let j=0; j < this.segments; ++j) {
				const a = i * this.segments + j	
				const b = a + this.segments
				const nextSegment = (j + 1) % this.segments
				const nextRing = (i + 1) % this.rings

				// around the tube
				this.connections[idx++] = { a: a, b: i * this.segments + nextSegment }

				// aroudn the major circle 
				this.connections[idx++] = { a, b: nextRing * this.segments + nextSegment }
			}
		}
	}
}
