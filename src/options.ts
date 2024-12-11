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
		playingInput.addEventListener('change', updateIsPlaying)
		updateIsPlaying()

		const speedInput = document.getElementById('input-speed') as HTMLInputElement
		const updateSpeed = () => speed = speedInput.valueAsNumber
		speedInput.addEventListener('change', updateSpeed)
		updateSpeed()

		const colorsInput = document.getElementById('input-colors') as HTMLSelectElement
		const updateColors = () => renderColors = colorsInput.selectedIndex as RenderColors
		colorsInput.addEventListener('change', updateColors)
		updateColors()

		const shapeInput = document.getElementById('input-shape') as HTMLSelectElement
		const updateShape = () => changeShape(shapeInput.selectedIndex as ShapeOption)
		shapeInput.addEventListener('change', updateShape)
		updateShape()

		const effectInput = document.getElementById('input-effect') as HTMLInputElement
		const updateEffect = () => isEffectEnabled = effectInput.checked
		effectInput.addEventListener('change', updateEffect)
		updateEffect()
	}
}
