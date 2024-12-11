import Cube from './cube.js';
import { canvas, ctx } from './global.js';
import { Options } from './options.js';
import { Renderer } from './renderer.js';
let playing = true;
let lastFrameTime = 0;
const cube = new Cube({ x: 128, y: 128 }, 128);
function init() {
    Options.init();
    Renderer.init();
    requestAnimationFrame(update);
}
function update(time) {
    requestAnimationFrame(update);
    const deltaTime = (time - lastFrameTime);
    lastFrameTime = time;
    if (Options.isPlaying) {
        cube.rotateSpeed = Options.speed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cube.render(deltaTime);
        Renderer.render();
    }
}
init();
