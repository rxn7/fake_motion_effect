import Cube from './cube.js'
import { canvas, ctx } from './global.js'
import { Options } from './options.js'
import { Renderer } from './renderer.js'

let playing: boolean = true
let lastFrameTime: DOMHighResTimeStamp = 0
const cube = new Cube({ x: 128, y: 128 }, 128)

function init(): void {
	Options.init()
	Renderer.init()
	requestAnimationFrame(update)
}

function update(time: DOMHighResTimeStamp): void {
	requestAnimationFrame(update)

	const deltaTime: number = (time - lastFrameTime)
	lastFrameTime = time

	if(Options.isPlaying) {
		cube.rotateSpeed = Options.speed

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		cube.render(deltaTime)
		Renderer.render()
	}
}

init()
