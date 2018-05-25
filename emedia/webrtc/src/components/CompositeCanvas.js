var _util = require('./Util');
var _logger = _util.tagLogger("CompositeCanvas");

function SimpleCanvasRenderingContext2D() {
    
};

for(var key in CanvasRenderingContext2D.prototype){
    (function (attr) {
        SimpleCanvasRenderingContext2D.prototype[attr] = function(){
            if(typeof this._canvasContext[attr] === "function"){
                this._canvasContext[attr].apply(this._canvasContext, arguments);
            }else{
                var arg = arguments.length >=1 ? arguments[0] : undefined;
                if(arg){
                    this._canvasContext[attr] = arg;
                }else{
                    return this._canvasContext[attr];
                }
            }
        }
    })(key);
}

//https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D

var CompositeCanvas = _util.prototypeExtend(SimpleCanvasRenderingContext2D, {
    //compositeCanvasTag:
    //_compositeOperation:
    //_globalAlpha:
    __init__: function () {
        var self = this;

        if(!self.compositeCanvasTag){
            self.compositeCanvasTag = document.createElement("canvas");
        }

        self._canvasContext = self.compositeCanvasTag.getContext("2d");

        self._canvasContext.globalAlpha = this._globalAlpha !== undefined ? this._globalAlpha : 1;

        self._compositeOperation = self._compositeOperation || operation.source_over;
        self.globalCompositeOperation(self._compositeOperation);
    },
    
    setCanvas: function () {
        var self = this;
        var set;
        for(var i = 0; i < arguments.length; i++){
            set = arguments[i];

            typeof set === "function" && set(this.compositeCanvasTag, this._canvasContext);
            typeof set !== "function" && _util.isPlainObject(set) && _util.forEach(set, function (key, value) {
                _logger.debug("Canvas set ", key, " = ", value);
                self.compositeCanvasTag.setAttribute(key, value);
            });
        }

        return self;
    },

    getCanvasImageData: function(canvas, alpha){
        var args = [];
        for(var i = 1; i < arguments.length; i++){
            args.push(arguments[i]);
        }

        var canvasContext = canvas.getContext("2d");
        canvasContext.globalAlpha = alpha || 0;
        return canvasContext.getImageData.apply(canvasContext, args);
    },

    _composite: function (compositeOperation) {
        var self = this;

        return new CompositeCanvas(self, {_compositeOperation: compositeOperation});
    },

    composite: function (compositeOperation) {
        var self = this;
        self.globalCompositeOperation(compositeOperation);

        return self;
    },

    requestAnimationFrame: function (time) {
        var self = this;

        self.requestFrame();
        self._requestAnimationFrameStart = window.requestAnimationFrame(function (time) {
            self.requestAnimationFrame(time);
        });

        return self;
    },

    cancelAnimationFrame: function () {
        var self = this;
        self._requestAnimationFrameStart && window.cancelAnimationFrame(self._requestAnimationFrameStart);

        return self;
    },

    requestFrame: function (_frameRate){
        var self = this;
        if(typeof this.requestOneFrame !== "function"){
            throw "Pleas implement requestOneFrame()";
        }

        try{
            this.requestOneFrame();
        }catch (e){
            _logger.error(e);
        }

        var timeoutMillis;
        if(_frameRate){
            timeoutMillis = Math.floor(1000 / _frameRate);
        }

        if(!timeoutMillis){
            return self;
        }

        var requestFrame = this.requestFrame.bind(this);
        this.intervalId = setInterval(function () {
            requestFrame(_frameRate);
        }, timeoutMillis);

        return self;
    },
    stopRequestFrame: function () {
        this.intervalId && clearInterval(this.intervalId);
        return this;
    },

    // getImageData: function(x, y, width, height){
    //     x = x || 0,
    //         y = y || 0,
    //         width = width || this.compositeCanvasTag.width,
    //         height = height || this.compositeCanvasTag.height;
    //
    //     var imageData = this._canvasContext.getImageData(x, y, width, height);
    //     return imageData;
    // },

    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData
     *
     * @param imageData ImageData ，包含像素值的数组对象。
     * @param dx 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
     * @param dy 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
     * @param dirtyX 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
     * @param dirtyY 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
     * @param dirtyWidth 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
     * @param dirtyHeight 在源图像数据中，矩形区域的高度。默认是图像数据的高度。
     * @returns {CompositeCanvas}
     */
    // putImageData: function(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight){
    //     dx = dx || 0,
    //         dy = dy || 0;
    //
    //     if(arguments.length >= 7){
    //         this._canvasContext.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    //     }else{
    //         this._canvasContext.putImageData(imageData, dx, dy);
    //     }
    //
    //     return this;
    // },

    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
     *
     * @param image 绘制到上下文的元素。允许任何的 canvas 图像源(CanvasImageSource)，例如：HTMLImageElement，HTMLVideoElement，或者 HTMLCanvasElement。
     * @param dx 目标画布的左上角在目标canvas上 X 轴的位置。
     * @param dy 目标画布的左上角在目标canvas上 Y 轴的位置。
     * @param dWidth 在目标画布上绘制图像的宽度。 允许对绘制的图像进行缩放。 如果不说明， 在绘制时图片宽度不会缩放。
     * @param dHeight 在目标画布上绘制图像的高度。 允许对绘制的图像进行缩放。 如果不说明， 在绘制时图片高度不会缩放。
     * @param sx 需要绘制到目标上下文中的，源图像的矩形选择框的左上角 X 坐标。
     * @param sy 需要绘制到目标上下文中的，源图像的矩形选择框的左上角 Y 坐标。
     * @param sWidth 需要绘制到目标上下文中的，源图像的矩形选择框的宽度。如果不说明，整个矩形从坐标的sx和sy开始，到图像的右下角结束。
     * @param sHeight 需要绘制到目标上下文中的，源图像的矩形选择框的高度。
     * @returns {CompositeCanvas}
     */
    // drawImage: function(image, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight){
    //     if(arguments.length >= 9){
    //         this._canvasContext.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    //     }else if(arguments.length >= 5){
    //         this._canvasContext.drawImage(image, dx, dy, dWidth, dHeight);
    //     }else{
    //         dx = dx || 0, dy = dy || 0;
    //         this._canvasContext.drawImage(image, dx, dy);
    //     }
    //
    //     return this;
    // }
});

CompositeCanvas.CompositeOperation = [
    'source-atop',
    'source-in',
    'source-out',
    'source-over',
    'destination-atop',
    'destination-in',
    'destination-out',
    'destination-over',
    'lighter',
    'darker',
    'xor',
    'copy'
];

var operation = CompositeCanvas.operation = {
    source_atop: 'source-atop',
    source_in: 'source-in',
    source_out: 'source-out',
    source_over: 'source-over',
    destination_atop: 'destination-atop',
    destination_in: 'destination-in',
    destination_out: 'destination-out',
    destination_over: 'destination-over',
    lighter: 'lighter',
    darker: 'darker',
    xor: 'xor',
    copy: 'copy'
};

CompositeCanvas.compositeVideoOverCanvas = function(compositeCanvasTag, video, canvas){
    var compositeCanvas;
    if(!(compositeCanvas = compositeCanvasTag.compositeCanvas)){
        compositeCanvas = new CompositeCanvas({
            compositeCanvasTag: compositeCanvasTag,

            requestOneFrame: function () {
                video && compositeCanvas.drawImage(video, 0, 0, compositeCanvasTag.width, compositeCanvasTag.height);
                canvas && compositeCanvas.drawImage(canvas, 0, 0, compositeCanvasTag.width, compositeCanvasTag.height);
            }
        });

        compositeCanvasTag.compositeCanvas = compositeCanvas;
    }

    return compositeCanvas;
}

module.exports = CompositeCanvas;