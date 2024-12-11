import { canvas, ctx } from './global.js';
import { Options, ShapeOption } from './options.js';
import { Renderer } from './renderer.js';
import Pyramid from './shapes/pyramid.js';
import Cube from './shapes/cube.js';
import Cylinder from './shapes/cylinder.js';
import Cone from './shapes/cone.js';
import Sphere from './shapes/sphere.js';
let lastFrameTime = 0;
let shape = new Cube({ x: 128, y: 128 }, 128);
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
        Renderer.begin();
        shape.rotateSpeed = Options.speed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shape.render(deltaTime);
        Renderer.render();
    }
}
export function changeShape(option) {
    switch (option) {
        case ShapeOption.Cube:
            shape = new Cube({ x: 128, y: 128 }, 128);
            break;
        case ShapeOption.Pyramid:
            shape = new Pyramid({ x: 128, y: 128 }, 128);
            break;
        case ShapeOption.Cylinder:
            shape = new Cylinder({ x: 128, y: 128 });
            break;
        case ShapeOption.Cone:
            shape = new Cone({ x: 128, y: 128 });
            break;
        case ShapeOption.Sphere:
            shape = new Sphere({ x: 128, y: 128 }, 128);
            break;
    }
}
init();
