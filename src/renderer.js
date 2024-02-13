import { canvas, ctx } from './global.js';
export var Renderer;
(function (Renderer) {
    const screenBuffer = ctx.createImageData(canvas.width, canvas.height);
    function init() {
        for (let i = 0; i < screenBuffer.width * screenBuffer.height; ++i) {
            const idx = i * 4;
            for (let j = 0; j < 3; ++j) {
                screenBuffer.data[idx + j] = Math.random() * 255;
            }
            screenBuffer.data[idx + 3] = 255;
        }
    }
    Renderer.init = init;
    function render() {
        renderScreenBuffer();
    }
    Renderer.render = render;
    function drawLine(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const angleCos = Math.cos(angle);
        const angleSin = Math.sin(angle);
        for (let i = 0; i < length; ++i) {
            drawPixel(Math.round(x1 + angleCos * i), Math.round(y1 + angleSin * i));
        }
    }
    Renderer.drawLine = drawLine;
    function drawPixel(x, y) {
        const idx = y * canvas.width + x;
        for (let i = 0; i < 3; ++i) {
            screenBuffer.data[idx * 4 + i] = Math.random() * 255;
        }
    }
    Renderer.drawPixel = drawPixel;
    function renderScreenBuffer() {
        ctx.putImageData(screenBuffer, 0, 0);
    }
})(Renderer || (Renderer = {}));
