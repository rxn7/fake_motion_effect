import { changeShape } from "./index.js"
import { Renderer } from "./renderer.js"

export enum RenderColors {
	BlackAndWhite = 0,
	RedAndBlue,
	RedAndGreen,
	RGB,
}

export enum ShapeOption {
	Cube,
	Pyramid,
	Cylinder,
	Cone,
	Sphere,
	Torus
}

export namespace Options {
	export let isPlaying: boolean = true
	export let isEffectEnabled: boolean = true
	export let speed: number = 0.05
	export let renderColors: RenderColors = RenderColors.BlackAndWhite
	
	export function init(): void {
		const clearButton = document.getElementById('button-clear') as HTMLButtonElement
		clearButton.addEventListener('click', Renderer.clear)

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
		addShapeOptions(shapeInput)
		updateShape()

		const effectInput = document.getElementById('input-effect') as HTMLInputElement
		const updateEffect = () => isEffectEnabled = effectInput.checked
		effectInput.addEventListener('change', updateEffect)
		updateEffect()
	}

	function addShapeOptions(shapeInput: HTMLSelectElement): void {
		for(const shape of Object.keys(ShapeOption)) {
			if(!isNaN(+shape)) continue // skip numbers
			console.log(shape)

			const option = document.createElement('option')
			option.value = shape.toString()
			option.innerText = shape.toString()
			shapeInput.appendChild(option)
		}
	}
}
