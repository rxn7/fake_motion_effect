import Cube from './cube.js'
import { canvas, ctx } from './global.js'
import { Renderer } from './renderer.js'

let freeze: boolean = false
let lastFrameTime: DOMHighResTimeStamp
const cube = new Cube({ x: 128, y: 128 }, 128)

function init(): void {
	Renderer.init()
	setInterval(update, 1000 / 60)
}

function update(time: DOMHighResTimeStamp): void {
	const deltaTime: number = (time - lastFrameTime) * 1000
	lastFrameTime = time

	if (!freeze) {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		cube.render()
		Renderer.render()
	}
}

window.addEventListener('keypress', (e: KeyboardEvent) => {
	if (e.key == ' ') {
		freeze = !freeze
	}
})

init()
