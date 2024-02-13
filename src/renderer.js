import { canvas, ctx } from './global.js';
export var Renderer;
(function (Renderer) {
    const pixels = new Uint8Array(canvas.width * canvas.height);
    const screenBuffer = ctx.createImageData(canvas.width, canvas.height);
    function init() {
        for (let i = 0; i < pixels.length; ++i) {
            pixels[i] = Math.random() > 0.5 ? 255 : 0;
        }
    }
    Renderer.init = init;
    function render() {
        renderScreenBuffer();
    }
    Renderer.render = render;
    function invertLine(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const angleCos = Math.cos(angle);
        const angleSin = Math.sin(angle);
        for (let i = 0; i < length; ++i) {
            invertPixel(Math.round(x1 + angleCos * i), Math.round(y1 + angleSin * i));
        }
    }
    Renderer.invertLine = invertLine;
    function invertPixel(x, y) {
        pixels[y * canvas.width + x] = pixels[y * canvas.width + x] ? 0 : 255;
    }
    Renderer.invertPixel = invertPixel;
    function renderScreenBuffer() {
        for (let y = 0; y < canvas.height; ++y) {
            for (let x = 0; x < canvas.width; ++x) {
                const idx = y * canvas.width + x;
                const pixelIdx = idx * 4;
                const value = pixels[idx];
                for (let i = 0; i < 3; ++i) {
                    screenBuffer.data[pixelIdx + i] = value;
                }
                screenBuffer.data[pixelIdx + 3] = 255;
            }
        }
        ctx.putImageData(screenBuffer, 0, 0);
    }
})(Renderer || (Renderer = {}));
