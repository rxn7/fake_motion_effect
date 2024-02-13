export class Vector3 extends Float32Array {
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		super(3)
		this[0] = x
		this[1] = y
		this[2] = z
	}

	public rotate(x: number, y: number, z: number): void {
		let cos: number = Math.cos(x)
		let sin: number = Math.sin(x)
		let newY: number = cos * this[1] - sin * this[2]
		let newZ: number = sin * this[1] + cos * this[2]

		this[1] = newY
		this[2] = newZ

		cos = Math.cos(y)
		sin = Math.sin(y)
		let newX: number = cos * this[0] + sin * this[2]
		newZ = -sin * this[0] + cos * this[2]

		this[0] = newX
		this[2] = newZ

		cos = Math.cos(z)
		sin = Math.sin(z)
		newX = cos * this[0] - sin * this[1]
		newY = sin * this[0] + cos * this[1]

		this[0] = newX
		this[1] = newY
	}
}
