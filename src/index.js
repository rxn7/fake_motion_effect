import Cube from './cube.js';
import { canvas, ctx } from './global.js';
import { Renderer } from './renderer.js';
let freeze = false;
let lastFrameTime;
const cube = new Cube({ x: 128, y: 128 }, 128);
function init() {
    Renderer.init();
    setInterval(update, 1000 / 60);
}
function update(time) {
    const deltaTime = (time - lastFrameTime) * 1000;
    lastFrameTime = time;
    if (!freeze) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cube.render();
        Renderer.render();
    }
}
window.addEventListener('keypress', (e) => {
    if (e.key == ' ') {
        freeze = !freeze;
    }
});
window.addEventListener('mousedown', (e) => {
    freeze = !freeze;
});
init();
