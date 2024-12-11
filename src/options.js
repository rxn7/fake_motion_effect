import { changeShape } from "./index.js";
import { Renderer } from "./renderer.js";
export var RenderColors;
(function (RenderColors) {
    RenderColors[RenderColors["BlackAndWhite"] = 0] = "BlackAndWhite";
    RenderColors[RenderColors["RedAndBlue"] = 1] = "RedAndBlue";
    RenderColors[RenderColors["RedAndGreen"] = 2] = "RedAndGreen";
    RenderColors[RenderColors["RGB"] = 3] = "RGB";
})(RenderColors || (RenderColors = {}));
export var ShapeOption;
(function (ShapeOption) {
    ShapeOption[ShapeOption["Cube"] = 0] = "Cube";
    ShapeOption[ShapeOption["Pyramid"] = 1] = "Pyramid";
    ShapeOption[ShapeOption["Cylinder"] = 2] = "Cylinder";
    ShapeOption[ShapeOption["Cone"] = 3] = "Cone";
    ShapeOption[ShapeOption["Sphere"] = 4] = "Sphere";
    ShapeOption[ShapeOption["Torus"] = 5] = "Torus";
})(ShapeOption || (ShapeOption = {}));
export var Options;
(function (Options) {
    Options.isPlaying = true;
    Options.isEffectEnabled = true;
    Options.speed = 0.05;
    Options.renderColors = RenderColors.BlackAndWhite;
    function init() {
        const clearButton = document.getElementById('button-clear');
        clearButton.addEventListener('click', Renderer.clear);
        const playingInput = document.getElementById('input-playing');
        const updateIsPlaying = () => Options.isPlaying = playingInput.checked;
        playingInput.addEventListener('change', updateIsPlaying);
        updateIsPlaying();
        const speedInput = document.getElementById('input-speed');
        const updateSpeed = () => Options.speed = speedInput.valueAsNumber;
        speedInput.addEventListener('change', updateSpeed);
        updateSpeed();
        const colorsInput = document.getElementById('input-colors');
        const updateColors = () => Options.renderColors = colorsInput.selectedIndex;
        colorsInput.addEventListener('change', updateColors);
        updateColors();
        const shapeInput = document.getElementById('input-shape');
        const updateShape = () => changeShape(shapeInput.selectedIndex);
        shapeInput.addEventListener('change', updateShape);
        addShapeOptions(shapeInput);
        updateShape();
        const effectInput = document.getElementById('input-effect');
        const updateEffect = () => Options.isEffectEnabled = effectInput.checked;
        effectInput.addEventListener('change', updateEffect);
        updateEffect();
    }
    Options.init = init;
    function addShapeOptions(shapeInput) {
        for (const shape of Object.keys(ShapeOption)) {
            if (!isNaN(+shape))
                continue;
            console.log(shape);
            const option = document.createElement('option');
            option.value = shape.toString();
            option.innerText = shape.toString();
            shapeInput.appendChild(option);
        }
    }
})(Options || (Options = {}));
