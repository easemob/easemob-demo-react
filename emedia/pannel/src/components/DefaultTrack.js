var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("DefaultTrack");

var MouseTrack = require("./MouseTrack");

function zoomCanvas(canvas, width, height) {
    var canvasContext = canvas.getContext("2d");

    var _width = canvas.width,
        _height = canvas.height;

    canvasContext.scale(_width / width, _height / height);
    _logger.warn("Canvas scale", _width / width, _height / height, width, height);
    var imageData = canvasContext.getImageData(0, 0, _width, _height);

    canvas.width = width;
    canvas.height = height;

    canvasContext.putImageData(imageData, 0, 0);
}

function initCanvas(_target) {
    var _canvas;
    _canvas = document.createElement("canvas");
    _target.appendChild(_canvas);

    _canvas.style.cssText = "position: absolute; background: transparent; width: 100%; height: 100%";

    _canvas.width = _target.offsetWidth;
    _canvas.height = _target.offsetHeight;
    _logger.warn("Canvas", _canvas.width, _canvas.height);

    // if(initCanvas.timeoutId === undefined){
    //     var targetElement = _target.onresize ? _target : window;
    //     _util.addEvent(targetElement, "resize", function () {
    //         if(initCanvas.timeoutId){
    //             clearTimeout(initCanvas.timeoutId);
    //         }
    //
    //         initCanvas.timeoutId = setTimeout(function () {
    //             initCanvas();
    //             initCanvas.timeoutId = null;
    //         }, 500);
    //     });
    // }

    return _canvas;
}

var DefaultMouseTrack;
module.exports = DefaultMouseTrack = MouseTrack.extend({
    __init__: function () {
        this._canvas || (this._canvas = initCanvas(this._target));
        this._canvasContext || (this._canvasContext = this._canvas.getContext("2d"));
    },

    resizeCanvas: function () {
    },

    _calPosition: function () {
        var xy = MouseTrack.prototype._calPosition.apply(this, arguments);
        xy.x = Math.floor(xy.x * this._canvas.width / xy.width);
        xy.y = Math.floor(xy.y * this._canvas.height / xy.height);

        return xy;
    },

    _draw: function (position, pixelCount, r, g, b, alpha) {
        var self = this;
        //_logger.warn(self._canvas.width, self._canvas.height);

        var canvasContext = self._canvasContext;

        if(!pixelCount || pixelCount <= 1){
            pixelCount = 2;
        }

        var pixel = canvasContext.getImageData(position.x - pixelCount/2, position.y - pixelCount/2, pixelCount, pixelCount);
        var color = function(imageData, r, g, b, alpha) {
            for (var i = 0, data = imageData.data; i < data.length; i += 4) {
                var rgb = {
                    r: (r === undefined ? data[i] : r),
                    g: (g === undefined ? data[i + 1] : g),
                    b: (b === undefined ? data[i + 2] : b),
                    alpha: (alpha === undefined ? data[i + 3] : alpha)};

                data[i]     = rgb.r; // red
                data[i + 1] = rgb.g; // green
                data[i + 2] = rgb.b; // blue
                data[i + 3] = rgb.alpha;

                //_logger.debug(rgb);
            }
        };
        pixel && color(pixel, r, g, b, alpha);

        canvasContext.putImageData(pixel, position.x, position.y);
    },

    redraw: function (x, y, r, g, b, alpha) {
        var self = this;
        var draw = DefaultMouseTrack.prototype._draw.bind(self);
        draw({x: x, y: y}, 2);
    },

    onMouseTrigger: function (trigger, _lastTrigger) {
        trigger.isLeftKey() && this._draw(trigger.xy, 8, 189, 56, 51, 255);
        trigger.isRightKey() && this._draw(trigger.xy, 8, 45, 23, 189, 255);
        trigger.isWheelKey() && this._draw(trigger.xy, 8, 58, 189, 76, 255);
    },

    onMouseTrack: function (position, lastPosition, lastTrigger) {
        this._draw(position, 2, 227, 18, 247, 255);
    },

    // onMouseTrack2: function (position, lastPosition, lastTrigger) {
    //     var self = this;
    //     //_logger.warn(self._canvas.width, self._canvas.height);
    //
    //     self._canvasContext || (self._canvasContext = self._canvas.getContext("2d"));
    //
    //     var canvasContext = self._canvasContext;
    //
    //     var pixel = canvasContext.getImageData(position.x - 1, position.y - 1, 3, 3);
    //     var rgb;
    //     var color = function(imageData, r, g, b, alpha) {
    //         rgb = {r: r, g: g, b: b, alpha: alpha};
    //         for (var i = 0, data = imageData.data; i < data.length; i += 4) {
    //             data[i]     = r === undefined ? 0 : r; // red
    //             data[i + 1] = g === undefined ? 0 : g; // green
    //             data[i + 2] = b === undefined ? 0 : b; // blue
    //             data[i + 3] = alpha === undefined ? 255 : alpha;
    //         }
    //     };
    //     pixel && color(pixel, 189, 56, 51);
    //     lastTrigger.isRightKey() && pixel && color(pixel, 45, 23, 189);
    //     lastTrigger.isWheelKey() && pixel && color(pixel, 58, 189, 76);
    //
    //     if(!lastPosition){
    //         canvasContext.putImageData(pixel, position.x, position.y);
    //     }
    //
    //
    //     function line() {
    //         canvasContext.lineWidth = 2;
    //         canvasContext.beginPath();
    //         canvasContext.strokeStyle = _util.list('rgb(', rgb.r, ",", rgb.g, ",", rgb.b, ")").join("");
    //         canvasContext.moveTo(lastPosition ? lastPosition.x : position.x, lastPosition ? lastPosition.y : position.y);
    //         canvasContext.lineTo(position.x, position.y);
    //
    //         canvasContext.stroke();
    //         canvasContext.closePath();
    //     }
    //
    //     if(lastPosition){
    //         line();
    //     }
    // }
});