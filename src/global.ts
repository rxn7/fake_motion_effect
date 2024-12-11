export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d', {willReadFrequently: false, alpha: false}) as CanvasRenderingContext2D
