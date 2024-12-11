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

	export function drawLine(x1: number, y1: number, x2: number, y2: number): void {
		const dx: number = x2 - x1
		const dy: number = y2 - y1

		const length: number = Math.sqrt(dx * dx + dy * dy)
		const angle: number = Math.atan2(dy, dx)
		const angleCos: number = Math.cos(angle)
		const angleSin: number = Math.sin(angle)

		for(let i: number = 0; i < length; ++i) {
			drawPixel(Math.round(x1 + angleCos * i), Math.round(y1 + angleSin * i))
		}
	}

	export function drawPixel(x: number, y: number): void {
		if(x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
			console.warn("Tried to draw outside the canvas")
			return
		}

		const idx: number = y * canvas.width + x
		switch(Options.renderColors) {
			case RenderColors.BlackAndWhite:
				renderBlackAndWhite(idx)
				break

			case RenderColors.RedAndBlue:
				renderRedAndBlue(idx)
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
