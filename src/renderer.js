import { canvas, ctx } from './global.js';
import { Options } from './options.js';
export var Renderer;
(function (Renderer) {
    const screenBuffer = ctx.createImageData(canvas.width, canvas.height);
    function init() {
        for (let i = 1; i < screenBuffer.width * screenBuffer.height; ++i) {
            screenBuffer.data.set([255, 255, 255, 255], i * 4);
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
        switch (Options.renderColors) {
            case Options.RenderColors.BlackAndWhite:
                renderBlackAndWhite(idx);
                break;
            case Options.RenderColors.RedAndBlue:
                renderRedAndBlue(idx);
                break;
            case Options.RenderColors.RedAndGreen:
                renderRedAndGreen(idx);
                break;
            case Options.RenderColors.RGB:
                renderRGB(idx);
                break;
        }
    }
    Renderer.drawPixel = drawPixel;
    function renderBlackAndWhite(idx) {
        const isWhite = screenBuffer.data[idx * 4] == 255;
        for (let i = 0; i < 3; ++i) {
            screenBuffer.data[idx * 4 + i] = isWhite ? 0 : 255;
        }
    }
    function renderRedAndBlue(idx) {
        const colorOffset = screenBuffer.data[idx * 4 + 2] == 255 ? 1 : 0;
        screenBuffer.data.set([255 * colorOffset, 0, 255 * (1 - colorOffset)], idx * 4);
    }
    function renderRedAndGreen(idx) {
        const colorOffset = screenBuffer.data[idx * 4] == 255 ? 1 : 0;
        screenBuffer.data.set([255 * (1 - colorOffset), 255 * colorOffset, 0], idx * 4);
    }
    function renderRGB(idx) {
        screenBuffer.data.set([Math.random() * 255, Math.random() * 255, Math.random() * 255], idx * 4);
    }
    function renderScreenBuffer() {
        ctx.putImageData(screenBuffer, 0, 0);
    }
})(Renderer || (Renderer = {}));
