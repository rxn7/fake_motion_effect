import { Point } from './point.js'
import { Renderer } from './renderer.js'
import { Vector3 } from './vector3.js'

export type Connection = {
	a: number
	b: number
}

export abstract class Shape {
	public rotateSpeed: number = 0.05
	protected abstract vertices: Vector3[]
	protected abstract centroid: Vector3
	protected abstract connections: Connection[]

	constructor(public origin: Point, public rotateAxis: Vector3 = new Vector3(0.02, 0.01, 0.04)) { }

	public render(deltaTime: number): void {
		this.updateCentroid()

		for(const vertex of this.vertices) {
			vertex[0] -= this.centroid[0]
			vertex[1] -= this.centroid[1]
			vertex[2] -= this.centroid[2]

			const speed: number = this.rotateSpeed * deltaTime
			vertex.rotate(this.rotateAxis[0] * speed, this.rotateAxis[1] * speed, this.rotateAxis[2] * speed)

			vertex[0] += this.centroid[0]
			vertex[1] += this.centroid[1]
			vertex[2] += this.centroid[2]
		}

		for(const connection of this.connections) {
			const a: Vector3 = this.vertices[connection.a]
			const b: Vector3 = this.vertices[connection.b]
			Renderer.drawLine(a[0], a[1], b[0], b[1])
		}
	}

	private updateCentroid(): void {
		this.centroid = new Vector3()
		for(const vertex of this.vertices) {
			this.centroid[0] += vertex[0]
			this.centroid[1] += vertex[1]
			this.centroid[2] += vertex[2]
		}
		this.centroid[0] /= this.vertices.length
		this.centroid[1] /= this.vertices.length
		this.centroid[2] /= this.vertices.length
	}
}
