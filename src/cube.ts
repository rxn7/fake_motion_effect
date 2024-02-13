import { ctx } from './global.js'
import { Point } from './point.js'
import { Renderer } from './renderer.js'
import { Vector3 } from './vector3.js'

type Connection = {
	a: number
	b: number
}

export default class Cube {
	private vertices: Vector3[] = new Array<Vector3>(8)
	private centroid: Vector3 = new Vector3()
	private connections: Connection[] = [
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

	constructor(public origin: Point, public size: number = 20, public rotate: Vector3 = new Vector3(0.02, 0.01, 0.04)) {
		this.initVertices()
		this.updateCentroid()
	}

	public render(): void {
		this.updateCentroid()

		for (const vertex of this.vertices) {
			vertex[0] -= this.centroid[0]
			vertex[1] -= this.centroid[1]
			vertex[2] -= this.centroid[2]
			vertex.rotate(this.rotate[0], this.rotate[1], this.rotate[2])
			vertex[0] += this.centroid[0]
			vertex[1] += this.centroid[1]
			vertex[2] += this.centroid[2]
		}

		for (const connection of this.connections) {
			const a: Vector3 = this.vertices[connection.a]
			const b: Vector3 = this.vertices[connection.b]
			Renderer.invertLine(a[0], a[1], b[0], b[1])
		}
	}

	private initVertices(): void {
		const halfSize: number = this.size * 0.5

		for (let i: number = 0; i < 2; ++i) {
			const z: number = -halfSize + halfSize * i * 2
			const idxOffset: number = i * 4

			this.vertices[idxOffset + 0] = new Vector3(this.origin.x - halfSize, this.origin.y - halfSize, z)
			this.vertices[idxOffset + 1] = new Vector3(this.origin.x + halfSize, this.origin.y - halfSize, z)
			this.vertices[idxOffset + 2] = new Vector3(this.origin.x + halfSize, this.origin.y + halfSize, z)
			this.vertices[idxOffset + 3] = new Vector3(this.origin.x - halfSize, this.origin.y + halfSize, z)
		}
	}

	private updateCentroid(): void {
		this.centroid = new Vector3()
		for (const vertex of this.vertices) {
			this.centroid[0] += vertex[0]
			this.centroid[1] += vertex[1]
			this.centroid[2] += vertex[2]
		}
		this.centroid[0] /= this.vertices.length
		this.centroid[1] /= this.vertices.length
		this.centroid[2] /= this.vertices.length
	}
}
