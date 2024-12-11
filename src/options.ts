import { changeShape } from "./index.js"

export enum RenderColors {
	BlackAndWhite = 0,
	RedAndBlue = 1,
	RedAndGreen = 2,
	RGB = 3,
}

export enum ShapeOption {
	Cube = 0,
	Pyramid = 1,
	Cylinder = 2,
}

export namespace Options {
	export let isPlaying: boolean = true
	export let isEffectEnabled: boolean = true
	export let speed: number = 0.05
	export let renderColors: RenderColors = RenderColors.BlackAndWhite
	
	export function init(): void {
		const playingInput = document.getElementById('input-playing') as HTMLInputElement

		const updateIsPlaying = () => isPlaying = playingInput.checked
		updateIsPlaying()
		playingInput.addEventListener('change', updateIsPlaying)

		const speedInput = document.getElementById('input-speed') as HTMLInputElement
		speedInput.addEventListener('change', () => {
			speed = speedInput.valueAsNumber
		})

		const colorsInput = document.getElementById('input-colors') as HTMLSelectElement
		colorsInput.addEventListener('change', () => {
			renderColors = colorsInput.selectedIndex as RenderColors
		})

		const shapeInput = document.getElementById('input-shape') as HTMLSelectElement
		shapeInput.addEventListener('change', () => {
			changeShape(shapeInput.selectedIndex as ShapeOption)
		})

		const effectInput = document.getElementById('input-effect') as HTMLInputElement
		effectInput.addEventListener('change', () => {
			isEffectEnabled = effectInput.checked
		})
	}
}
