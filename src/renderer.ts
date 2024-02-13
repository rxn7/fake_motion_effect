import { canvas, ctx } from './global.js'

export namespace Renderer {
	const pixels: Uint8Array = new Uint8Array(canvas.width * canvas.height)
	const screenBuffer: ImageData = ctx.createImageData(canvas.width, canvas.height)

	export function init(): void {
		for (let i = 0; i < pixels.length; ++i) {
			pixels[i] = Math.random() > 0.5 ? 255 : 0
		}
	}

	export function render(): void {
		renderScreenBuffer()
	}

	export function invertLine(x1: number, y1: number, x2: number, y2: number): void {
		const dx: number = x2 - x1
		const dy: number = y2 - y1

		const length: number = Math.sqrt(dx * dx + dy * dy)
		const angle: number = Math.atan2(dy, dx)
		const angleCos: number = Math.cos(angle)
		const angleSin: number = Math.sin(angle)

		for (let i: number = 0; i < length; ++i) {
			invertPixel(Math.round(x1 + angleCos * i), Math.round(y1 + angleSin * i))
		}
	}

	export function invertPixel(x: number, y: number): void {
		pixels[y * canvas.width + x] = pixels[y * canvas.width + x] ? 0 : 255
	}

	function renderScreenBuffer(): void {
		for (let y: number = 0; y < canvas.height; ++y) {
			for (let x: number = 0; x < canvas.width; ++x) {
				const idx: number = y * canvas.width + x
				const pixelIdx: number = idx * 4
				const value: number = pixels[idx]

				for (let i: number = 0; i < 3; ++i) {
					screenBuffer.data[pixelIdx + i] = value
				}

				screenBuffer.data[pixelIdx + 3] = 255 // Alpha always 255
			}
		}

		ctx.putImageData(screenBuffer, 0, 0)
	}
}
