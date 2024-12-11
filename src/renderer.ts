import { canvas, ctx } from './global.js'
import { RenderColors, Options } from './options.js'

export namespace Renderer {
	const screenBuffer: ImageData = ctx.createImageData(canvas.width, canvas.height)

	export function init(): void {
		for(let i: number = 1; i < screenBuffer.width * screenBuffer.height; ++i) {
			screenBuffer.data.set([255, 255, 255, 255], i * 4)
		}
	}

	export function render(): void {
		renderScreenBuffer()
	}

	export function begin(): void {
		if(!Options.isEffectEnabled) {
			screenBuffer.data.fill(255)
		}
	}

	export function drawLine(x0: number, y0: number, x1: number, y1: number): void {
		x0 = Math.floor(x0)
		x1 = Math.floor(x1)
		y0 = Math.floor(y0)
		y1 = Math.floor(y1)
		let dx = Math.abs(x1 - x0)
		let dy = Math.abs(y1 - y0)
		let sx = (x0 < x1) ? 1 : -1
		let sy = (y0 < y1) ? 1 : -1
		let err = dx - dy

		drawPixel(x0, y0)

		while(!((x0 == x1) && (y0 == y1))) {
			const err2 = err * 2

			if(err2 > -dy) {
				err -= dy
				x0 += sx
			}

			if(err2 < dx) {
				err += dx
				y0 += sy
			}

			drawPixel(x0, y0)
		}
	}

	export function drawPixel(x: number, y: number): void {
		if(x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
			console.warn("Tried to draw outside the canvas")
			return
		}

		const idx: number = y * canvas.width + x

		if(!Options.isEffectEnabled) {
			screenBuffer.data.set([0, 0, 0, 255], idx * 4)
			return
		}

		switch(Options.renderColors) {
			case RenderColors.BlackAndWhite:
				renderBlackAndWhite(idx)
				break

			case RenderColors.RedAndBlue:
				break

			case RenderColors.RedAndGreen:
				renderRedAndGreen(idx)
				break
			
			case RenderColors.RGB:
				renderRGB(idx)
				break
		}
	}

	function renderBlackAndWhite(idx: number): void {
		const isWhite = screenBuffer.data[idx * 4] == 255
		for(let i: number = 0; i < 3; ++i) {
			screenBuffer.data[idx * 4 + i] = isWhite ? 0 : 255
		}
	}

	function renderRedAndBlue(idx: number): void {
		const colorOffset = screenBuffer.data[idx * 4 + 2] == 255 ? 1 : 0
		screenBuffer.data.set([255 * colorOffset, 0, 255 * (1 - colorOffset)], idx * 4)
	}

	function renderRedAndGreen(idx: number): void {
		const colorOffset = screenBuffer.data[idx * 4] == 255 ? 1 : 0
		screenBuffer.data.set([255 * (1 - colorOffset), 255 * colorOffset, 0], idx * 4)
	}

	function renderRGB(idx: number): void {
		screenBuffer.data.set([Math.random() * 255, Math.random() * 255, Math.random() * 255], idx * 4)
	}

	function renderScreenBuffer(): void {
		ctx.putImageData(screenBuffer, 0, 0)
	}
}
