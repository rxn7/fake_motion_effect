export namespace Options {
	export enum RenderColors {
		BlackAndWhite = 0,
		RedAndBlue = 1,
		RedAndGreen = 2,
		RGB = 3,
	}

	export let isPlaying: boolean = true
	export let speed: number = 0.05
	export let renderColors: RenderColors = RenderColors.BlackAndWhite

	export function init(): void {
		const playingInput = document.getElementById('input-playing') as HTMLInputElement
		playingInput.addEventListener('change', () => {
			isPlaying = playingInput.checked
		})

		const speedInput = document.getElementById('input-speed') as HTMLInputElement
		speedInput.addEventListener('change', () => {
			speed = speedInput.valueAsNumber
		})

		const colorsInput = document.getElementById('input-colors') as HTMLSelectElement
		colorsInput.addEventListener('change', () => {
			renderColors = colorsInput.selectedIndex as RenderColors
		})
	}
}
