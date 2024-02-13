import { canvas, ctx } from './global.js'

export namespace Renderer {
	const screenBuffer: ImageData = ctx.createImageData(canvas.width, canvas.height)

	export function init(): void {
		for (let i: number = 0; i < screenBuffer.width * screenBuffer.height; ++i) {
			const idx: number = i * 4
			for(let j: number = 0; j < 3; ++j) {
				screenBuffer.data[idx + j] = Math.random() * 255
			}
			screenBuffer.data[idx + 3] = 255
		}
	}

	export function render(): void {
		renderScreenBuffer()
	}

	export function drawLine(x1: number, y1: number, x2: number, y2: number): void {
		const dx: number = x2 - x1
		const dy: number = y2 - y1

		const length: number = Math.sqrt(dx * dx + dy * dy)
		const angle: number = Math.atan2(dy, dx)
		const angleCos: number = Math.cos(angle)
		const angleSin: number = Math.sin(angle)

		for (let i: number = 0; i < length; ++i) {
			drawPixel(Math.round(x1 + angleCos * i), Math.round(y1 + angleSin * i))
		}
	}

	export function drawPixel(x: number, y: number): void {
		const idx: number = y * canvas.width + x
		for(let i: number = 0; i < 3; ++i) {
			screenBuffer.data[idx * 4 + i] = Math.random() * 255
		}
	}

	function renderScreenBuffer(): void {
		ctx.putImageData(screenBuffer, 0, 0)
	}
}
