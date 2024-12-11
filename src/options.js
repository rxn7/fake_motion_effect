export var Options;
(function (Options) {
    let RenderColors;
    (function (RenderColors) {
        RenderColors[RenderColors["BlackAndWhite"] = 0] = "BlackAndWhite";
        RenderColors[RenderColors["RedAndBlue"] = 1] = "RedAndBlue";
        RenderColors[RenderColors["RedAndGreen"] = 2] = "RedAndGreen";
        RenderColors[RenderColors["RGB"] = 3] = "RGB";
    })(RenderColors = Options.RenderColors || (Options.RenderColors = {}));
    Options.isPlaying = true;
    Options.speed = 0.05;
    Options.renderColors = RenderColors.BlackAndWhite;
    function init() {
        const playingInput = document.getElementById('input-playing');
        playingInput.addEventListener('change', () => {
            Options.isPlaying = playingInput.checked;
        });
        const speedInput = document.getElementById('input-speed');
        speedInput.addEventListener('change', () => {
            Options.speed = speedInput.valueAsNumber;
        });
        const colorsInput = document.getElementById('input-colors');
        colorsInput.addEventListener('change', () => {
            Options.renderColors = colorsInput.selectedIndex;
        });
    }
    Options.init = init;
})(Options || (Options = {}));
