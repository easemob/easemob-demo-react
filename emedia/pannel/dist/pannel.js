/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/DATA/WORK.HOME/projects/CO./EASEMOB_2016.05.03~/EMedia";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

/*
 * ! Math.uuid.js (v1.4) http://www.broofa.com mailto:robert@broofa.com
 * 
 * Copyright (c) 2010 Robert Kieffer Dual licensed under the MIT and GPL
 * licenses.
 */

/*
 * Generate a random uuid.
 * 
 * USAGE: Math.uuid(length, radix) length - the desired number of characters
 * radix - the number of allowable values for each character.
 * 
 * EXAMPLES: // No arguments - returns RFC4122, version 4 ID >>> Math.uuid()
 * "92329D39-6F5C-4520-ABFC-AAB64544E172" // One argument - returns ID of the
 * specified length >>> Math.uuid(15) // 15 character ID (default base=62)
 * "VcydxgltxrVZSTV" // Two arguments - returns ID of the specified length, and
 * radix. (Radix must be <= 62) >>> Math.uuid(8, 2) // 8 character ID (base=2)
 * "01001010" >>> Math.uuid(8, 10) // 8 character ID (base=10) "47473046" >>>
 * Math.uuid(8, 16) // 8 character ID (base=16) "098F4D35"
 */
(function () {
    // Private array of chars to use
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    Math.uuid = function (len, radix) {
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data. At i==19 set the high bits of clock sequence
            // as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    };

    // A more performant, but slightly bulkier, RFC4122v4 solution. We boost
    // performance
    // by minimizing calls to random()
    Math.uuidFast = function () {
        var chars = CHARS, uuid = new Array(36), rnd = 0, r;
        for (var i = 0; i < 36; i++) {
            if (i == 8 || i == 13 || i == 18 || i == 23) {
                uuid[i] = '-';
            } else if (i == 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };

    // A more compact, but less performant, RFC4122v4 solution:
    Math.uuidCompact = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
})();


/**
 * Util
 *
 * @constructor
 */
function Util() {
}

/**
 * Function Logger
 *
 * @constructor
 */
var Logger = function (tag) {
    var self = this;

    var LogLevel = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        FATAL: 5
    }

    var LogLevelName = [
        'TRACE',
        'DEBUG',
        'INFO',
        'WARN',
        'ERROR',
        'FATAL'
    ]

    this._log = function () {
        var level = arguments[0];

        level = arguments[0] = LogLevelName[level];

        if(console && level){
            (console[level.toLowerCase()] || console.warn).apply(console, arguments);
        }
    };

    function callLog(level, args) {
        if(emedia && emedia.LOG_LEVEL && (level < emedia.LOG_LEVEL)){
            return;
        }

        var _args = [];

        _args.push(level);
        tag && _args.push(tag);

        for (var i = 0; i < args.length; i++) {
            _args.push(args[i] && args[i]._toString ? args[i]._toString.call(args[i]) : args[i]);
        }

        //_args.caller && _args.push(_args.caller);

        self._log.apply(self, _args);
    };

    this.log = function () {
        this._log && callLog(LogLevel.INFO, arguments)
    };

    this.trace = function () {
        this._log && callLog(LogLevel.TRACE, arguments)
    };

    this.debug = function () {
        this._log && callLog(LogLevel.DEBUG, arguments)
    };

    this.info = function () {
        this._log && callLog(LogLevel.INFO, arguments)
    };

    this.warn = function () {
        this._log && callLog(LogLevel.WARN, arguments)
    };

    this.error = function () {
        this._log && callLog(LogLevel.ERROR, arguments)
    };

    this.fatal = function () {
        this._log && callLog(LogLevel.FATAL, arguments)
    };
}

Util.prototype.logger = new Logger();

Util.prototype.tagLogger = function (tag) {
    return new Logger(tag);
}

/**
 * parse json
 *
 * @param jsonString
 */
Util.prototype.parseJSON = function (jsonString) {
    return JSON.parse(jsonString);
};

/**
 * json to string
 *
 * @type {Util.stringifyJSON}
 */
var stringifyJSON = Util.prototype.stringifyJSON = function (jsonObj) {
    return JSON.stringify(jsonObj);
};


var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call(Object);

/**
 * check object type
 *
 * @type {Util.isPlainObject}
 */
var isPlainObject = Util.prototype.isPlainObject = function (obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    var objectString;
    if (!obj
        || (objectString = toString.call(obj)) !== "[object Object]"
        || (obj.toString() === "<JSAPI-Auto Javascript Object>")
        || (obj.toString() === "[object IFBComJavascriptObject]")) {
        return false;
    }

    proto = Object.getPrototypeOf(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a
    // global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

Util.prototype.isArray = Array.isArray;

/**
 * check empty object
 *
 * @param obj
 * @returns {boolean}
 */
Util.prototype.isEmptyObject = function (obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};

Util.prototype.type = function (obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
};

/**
 * Function extend
 *
 * @returns {*|{}}
 */
Util.prototype.extend = function () {
    var self = this;
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep
    // copy)
    if (typeof target !== "object" && !self.isFunction(target)) {
        target = {};
    }

    // Extend self itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if (( options = arguments[i] ) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && ( self.isPlainObject(copy) ||
                    ( copyIsArray = self.isArray(copy) ) )) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && self.isArray(src) ? src : [];

                    } else {
                        clone = src && self.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = self.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}

Util.prototype.removeAttribute = function (elem, key) {
    if(elem === null || elem === undefined){
        return;
    }

    var obj = elem[key];

    delete elem[key];

    return obj;
}

Util.prototype.prototypeExtend_000 = Util.prototype.classExtend = function(){
    var self = this;

    function _Obj__(){
        for(var i = 0; i < arguments.length; i++){
            var cfg = arguments[i] || {};
            self.extend(true, this, cfg);
        }

        this.__init__ && this.__init__.apply(this, arguments);
    }

    var lastConstructor;

    for(var i = 0; i < arguments.length; i++){
        var cfg = arguments[i] || {};

        if(typeof cfg === "function"){
            if(lastConstructor){
                cfg.constructor = lastConstructor;
                cfg.__proto__ = lastConstructor.prototype;
            }else{
                lastConstructor = cfg;
            }
        }else{
            self.extend(true, _Obj__.prototype, cfg);
        }
    }

    lastConstructor && (_Obj__.prototype.__proto__ = lastConstructor.prototype);
    lastConstructor && (_Obj__.prototype.constructor = lastConstructor);

    _Obj__.extend || (_Obj__.extend = function (_prototypeExtend) {
        return self.prototypeExtend(_Obj__, _prototypeExtend);
    });

    return _Obj__;
}

Util.prototype.prototypeExtend = Util.prototype.classExtend = function(){
    var self = this;

    function _Obj__(){
        for(var i = 0; i < arguments.length; i++){
            var cfg = arguments[i] || {};
            self.extend(true, this, cfg);
        }

        this.__init__ && this.__init__.apply(this, arguments);
    }

    for(var i = 0; i < arguments.length; i++){
        var cfg = arguments[i] || {};
        if(typeof cfg === "function"){
            cfg = cfg.prototype;
        }

        self.extend(true, _Obj__.prototype, cfg);
    }

    _Obj__.extend || (_Obj__.extend = function (_prototypeExtend) {
        return self.prototypeExtend(_Obj__, _prototypeExtend);
    });

    return _Obj__;
}

/**
 * get local cache
 *
 * @memberOf tool
 * @name hasLocalData
 * @param key{string}
 *            localStorage的key值
 * @return boolean
 */
Util.prototype.hasLocalStorage = function (key) {
    // null -> localStorage.removeItem时
    // '{}' -> collection.models.destroy时
    if (localStorage.getItem(key) == null || localStorage.getItem(key) == '{}') {
        return false;
    }
    return true;
}

Util.prototype.toggleClass = function (node, className) {
    if (node.hasClass(className)) {
        node.removeClass(className);
        return;
    }
    node.addClass(className);
}


/**
 * set cookie
 *
 * @param name{String}
 *
 * @param value{String}
 *
 * @param hour{Number}
 *
 * @return void
 */
Util.prototype.setCookie = function (name, value, hour) {
    var exp = new Date();
    exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * read cookie
 *
 * @param name(String)
 *            cookie key
 * @return cookie value
 * @memberOf Tool
 */
Util.prototype.getCookie = function (name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}


/**
 * query parameter from url
 *
 * @name parseURL
 * @memberof C.Tools
 * @param {string}
 *
 * @return {string}
 * @type function
 * @public
 */
Util.prototype.parseURL = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * function(index, value){

}
 * @param obj
 */
Util.prototype.forEach = function (obj, func){
    if(!obj){
        return;
    }

    if(this.isArray(obj) && obj.length === 0){
        return;
    }
    if(obj.length !== undefined && obj.length === 0){
        return;
    }
    if(obj.length){
        for(var i = 0; i < obj.length; i++){
            func(i, obj[i]);
        }
        return;
    }

    if(!obj || this.isEmptyObject(obj)){
        return;
    }

    obj = obj || {};

    var copy = this.extend(false, {}, obj);

    for(var index in copy){
        func(index, obj[index]);
    }
}

Util.prototype.isInt = function(n){
    return Number(n) === n && n % 1 === 0;
}

Util.prototype.isFloat = function(n){
    return Number(n) === n && n % 1 !== 0;
}

Util.prototype.list = function () {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    return args;
}

Util.prototype.addEvent = function (element, name, func) {
    if (element.attachEvent)
        return element.attachEvent("on" + name, func);
    if (element.addEventListener)
        return element.addEventListener(name, func, false);
    throw "Handler could not be attached";
}

Util.prototype.removeEvent = function (element, name, func) {
    if (element.detachEvent)
        return element.detachEvent("on" + name, func);
    if (element.removeEventListener)
        return element.removeEventListener(name, func, false);
    throw "Handler could not be removed";
}

Util.prototype.stopEvent = function (event) {
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
}

Util.prototype.getDomPageRect = function(element) {
    var domRect = element.getBoundingClientRect();
    return {
        x: domRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft),
        y: domRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
        width: domRect.width || element.offsetWidth,
        height: domRect.height || element.offsetHeight
    }
}

Util.prototype.getEventElementXY = function(event, element, scale) {
    event = (event || window.event);

    var touch = event.changedTouches ? event.changedTouches[0] : (event.touches ? event.touches[0] : event);

    var pageX, pageY;
    if(touch.pageX != undefined && touch.pageY != undefined){
        pageX = touch.pageX;
        pageY = touch.pageY;
    }else if(touch.clientX != undefined && touch.clientY != undefined){
        pageX = touch.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = touch.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    var elementPageXY = this.getDomPageRect(element);

    var relativeX = pageX - elementPageXY.x;
    var relativeY = pageY - elementPageXY.y;

    (scale === 0 || scale == undefined) && (scale = 1);
    return {
        x: Math.round(Math.max(Math.min(relativeX, elementPageXY.width - 1), 0) / scale),
        y: Math.round(Math.max(Math.min(relativeY, elementPageXY.height - 1), 0) / scale),
        width: Math.round(elementPageXY.width / scale),
        height: Math.round(elementPageXY.height / scale),

        realX: relativeX,
        realY: relativeY
    }
}

Util.prototype.layoutEngine = (function () {
    var engine = {
        presto: !!window.opera,
        trident: !!window.ActiveXObject && (window.XMLHttpRequest ? document.querySelectorAll ? 6 : 5 : 4),
        webkit: function() {
            try {
                return !navigator.taintEnabled && (i.Features.xpath ? i.Features.query ? 525 : 420 : 419)
            } catch (e) {
                return !1
            }
        }(),
        gecko: !(!document.getBoxObjectFor && null == window.mozInnerScreenX) && (document.getElementsByClassName ? 19 : 18)
    };

    engine.webkit && (engine.webkit = function(e) {
        var n = (navigator.userAgent.match(/WebKit\/([0-9\.]*) /) || ["", e])[1];
        return parseFloat(n, 10);
    }(engine));

    return engine;
})();


Util.prototype.targetDOM = ( typeof HTMLElement === 'object' ) ?
    function(obj){
        return obj instanceof HTMLElement;
    } :
    function(obj){
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    };

module.exports = new Util();


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("DefaultTrack");

var MouseTrack = __webpack_require__(22);

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

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("MouseTrack");

var MouseTrigger = __webpack_require__(23);

module.exports = _util.prototypeExtend({
    _scale: 1,

    __init__: function () {
        var self = this;
    },

    getTargetPageXY: function () {
        var self = this;
        return self._target && _util.extend({}, (_util.getDomPageRect(self._target)));
    },

    onMouseTrack: function (position, lastPosition, lastTrigger) {
        //_logger.warn(position.x, position.y);
    },

    onMouseTrigger: function (trigger, _lastTrigger) {
    },

    _onMouseTrack: function (position, lastPosition, _lastTrigger) {
        this.onMouseTrack && this.onMouseTrack(position, lastPosition, _lastTrigger);
    },
    _onMouseTrigger: function (trigger, _lastTrigger) {
        this.onMouseTrigger && this.onMouseTrigger(trigger, _lastTrigger);
    },
    
    track: function(pos) {
        var self = this;

        var pageXY = pos = _util.extend({}, pos);

        var _elementPageXY = self.getTargetPageXY();
        _elementPageXY && (pos = self._calPosition(pos), pageXY = {
            x: pos.x,
            y: pos.y,
            pageX: (_elementPageXY.x + pos.x),
            pageY: (_elementPageXY.y + pos.y)
        });

        self._onMouseTrack(pageXY, self._lastPageXY, self._lastTrigger);
        self._lastPageXY = pageXY;
    },
    
    trigger: function (trigger) {
        var self = this;

        trigger = new MouseTrigger(trigger);

        var _elementPageXY = self.getTargetPageXY();

        var pos;
        _elementPageXY && (pos = self._calPosition(trigger.xy), trigger.xy = {
            x: pos.x,
            y: pos.y,
            pageX: (_elementPageXY.x + pos.x),
            pageY: (_elementPageXY.y + pos.y)
        });
        trigger._time || (trigger._time = (new Date()).getTime());

        self._onMouseTrigger(trigger, self._lastTrigger);
        self._lastTrigger = trigger;
    },

    releaseTrigger: function () {
        this._lastTrigger = undefined;
        this._lastPageXY = undefined;

        this.onReleaseTrigger && this.onReleaseTrigger(this._lastTrigger);
    },

    /**
     *
     *
     * @param mousePos
     * @private
     */
    _calPosition: function (mousePos) {
        var self = this;

        var _elementPageXY = self.getTargetPageXY();
        if(!_elementPageXY){
            return mousePos;
        }

        if(_util.isFloat(mousePos.x) && mousePos.width !== undefined){ //比率
            mousePos.x = (mousePos.x * mousePos.width) * self._scale * (_elementPageXY.width / mousePos.width);
        }
        if(_util.isFloat(mousePos.y) && mousePos.height !== undefined){ //比率
            mousePos.y = (mousePos.y * mousePos.height) * self._scale * (_elementPageXY.height / mousePos.height);
        }

        if(_util.isFloat(mousePos.x) && mousePos.width === undefined){ //比率
            mousePos.x = mousePos.x * self._scale * _elementPageXY.width;
        }
        if(_util.isFloat(mousePos.y) && mousePos.height === undefined){ //比率
            mousePos.y = mousePos.y * self._scale * _elementPageXY.height;
        }

        if(_util.isInt(mousePos.x) && mousePos.width !== undefined){
            mousePos.x = mousePos.x * self._scale * (_elementPageXY.width / mousePos.width);
        }
        if(_util.isInt(mousePos.y) && mousePos.height !== undefined){
            mousePos.y = mousePos.y * self._scale * (_elementPageXY.height / mousePos.height);
        }

        if(_util.isInt(mousePos.x) && mousePos.width === undefined){
            mousePos.x = mousePos.x * self._scale;
        }
        if(_util.isInt(mousePos.y) && mousePos.height === undefined){
            mousePos.y = mousePos.y * self._scale;
        }

        var x = Math.floor(mousePos.x);
        var y = Math.floor(mousePos.y);

        if(x < 0){
            x = _elementPageXY.width + x;
        }
        if(y < 0){
            y = _elementPageXY.width + y;
        }

        return {x: x, y: y, width: _elementPageXY.width, height: _elementPageXY.height};
    }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("MouseTrigger");

var BTN = {
    LEFT: 1,
    WHEEL: 2,
    RIGHT: 4,

    WHEEL_ROLL_UP: 8,
    WHEEL_ROLL_DOWN: 16,

    KEY_UP: 0,
    KEY_DOWN: 1,
    MOVE: 2,

    KEYBOARD_DOWN: 3,
    KEYBOARD_UP: 4,
}

/**
 *
 * {
 *  xy: eventXY,
 *  oper: oper,
 *  btn: button,
 *  _time: _time
 * }
 *
 *
 */
module.exports = _util.prototypeExtend({
    _timeoutMillis: 500,
    _time: (new Date()).getTime(),

    isKeyup: function () {
        return BTN.KEY_UP == this.oper;
    },
    isKeydown: function () {
        return BTN.KEY_DOWN == this.oper;
    },
    isWheelup: function () {
        return BTN.WHEEL_ROLL_UP == this.btn;
    },
    isWheeldown: function () {
        return BTN.WHEEL_ROLL_DOWN == this.btn;
    },
    isLeftKey: function () {
        return BTN.LEFT == this.btn;
    },
    isRightKey: function () {
        return BTN.RIGHT == this.btn;
    },
    isWheelKey: function () {
        return BTN.WHEEL == this.btn;
    },
    isWheelRoll: function () {
        return this.isWheeldown() || this.isWheelup();
    },
    
    timeout: function () {
        var cur = (new Date()).getTime();
        return cur - this._time >= this._timeoutMillis;
    },

    _toString: function () {
        return _util.list("btn:", this.btn, ", oper:", this.oper, ", timeout:", this.timeout(), ", at (", this.xy.x, ", ", this.xy.y, ")").join("");
    }
});

module.exports.BTN = BTN;

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("Mouse");


var MouseTrigger = __webpack_require__(23);

/**
 * { target:
 *   onMouseButton:
 *   onMouseMove:
 * }
 *
 */

module.exports = _util.prototypeExtend({
    __init__: function () {
        var self = this;

        this._handlers = _util.extend({
            mousedown: this._handleMouseDown.bind(this),
            mouseup: this._handleMouseUp.bind(this),
            mousemove: this._handleMouseMove.bind(this),
            mousewheel: this._handleMouseWheel.bind(this),
            mousedisable: this._handleMouseDisable.bind(this),
            mouseover: this._handleMouseOver.bind(this),
            mouseout: this._handleMouseOut.bind(this)
        }, this._handlers || {});
    },

    //target: n,

    /**
     *
     * @param posX
     * @param posY
     * @param oper 1按下 0up
     * @param button 1左键单击 2滚轮按下 4右键 8滚轮向底端滑 16滚轮向顶端滑
     */
    onMouseButton: function(trigger, lastTrigger) {

    },

    onMouseMove: function(eventXY, lastTrigger) {

    },

    onMouseEnter: function () {

    },

    onMouseExit: function () {

    },

    _onMouseButton: function (eventXY, oper, button) {
        var _time = (new Date().getTime());

        var trigger = new MouseTrigger({
            xy: eventXY,
            oper: oper,
            btn: button,
            _time: _time
        });

        this.onMouseButton && this.onMouseButton(trigger, this._lastTrigger);

        this._lastTrigger = trigger;
    },

    _onMouseMove: function (eventXY) {
        this.onMouseMove && this.onMouseMove(eventXY, this._lastTrigger);
    },

    _captureMouse: function() {
        this._target.setCapture && this._target.setCapture();
        this._mouseCaptured = true;
    },
    _releaseMouse: function() {
        this._target.releaseCapture && this._target.releaseCapture();
        this._mouseCaptured = false;
    },
    _resetDoubleClickTimer: function() {
        this._doubleClickTimer = null;
    },

    _handleMouseOver:function (event) {
        if(this._mouseExit !== false){
            this._mouseExit = false;
            this.onMouseEnter && this.onMouseEnter();
        }
    },
    _handleMouseOut:function (event) {
        if(this._mouseExit !== true){
            this._mouseExit = true;
            this.onMouseExit && this.onMouseExit();
        }

        this._lastTrigger = undefined;
    },
    _handleMouseDown: function(event) {
        this._captureMouse();
        this._handleMouseButton(event, MouseTrigger.BTN.KEY_DOWN);
    },
    _handleMouseUp: function(event) {
        this._mouseCaptured && (this._handleMouseButton(event, MouseTrigger.BTN.KEY_UP), this._releaseMouse());
    },

    _handleMouseWheel: function(event) {
        if (!this._focused){
            return;
        }

        var event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);

        // 8up 16down
        var wheel = (event.detail ? -1 * event.detail : event.wheelDelta / 40) > 0 ? MouseTrigger.BTN.WHEEL_ROLL_UP : MouseTrigger.BTN.WHEEL_ROLL_DOWN;
        this._onMouseButton(eventXY, MouseTrigger.BTN.KEY_DOWN, wheel);
        _util.stopEvent(event);
    },

    _handleMouseMove: function(event) {
        if (!this._focused){
            return;
        }

        var event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);
        this._onMouseMove(eventXY);
        _util.stopEvent(event);
    },

    _handleMouseDisable: function(event) {
        if (!this._focused){
            return;
        }

        var event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);

        try{
            return !(eventXY.realX >= 0 && eventXY.realY >= 0 && eventXY.realX < this._target.offsetWidth && eventXY.realY < this._target.offsetHeight);
        } finally{
            _util.stopEvent(event);
        }
    },

    /**
     *
     * @param event
     * @param oper 1鼠标按下
     * @private
     */
    _handleMouseButton: function(event, oper) {
        if (!this._focused){
            return;
        }

        var button, event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);
        if (event.touches || event.changedTouches) {
            if (oper == MouseTrigger.BTN.KEY_DOWN) {
                if (this._doubleClickTimer === null)
                    this._lastTouchPos = eventXY;
                else {
                    clearTimeout(this._doubleClickTimer);
                    var distanceX = this._lastTouchPos.x - eventXY.x, distanceY = this._lastTouchPos.y - eventXY.y;
                    (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < 20 * window.devicePixelRatio) && (eventXY = this._lastTouchPos)
                }
                this._doubleClickTimer = setTimeout(this._resetDoubleClickTimer.bind(this), 500);
            }
            button = MouseTrigger.BTN.LEFT;
        } else
            button = event.which ? 1 << event.button : (1 & event.button) + 2 * (2 & event.button) + (4 & event.button) / 2;

        this._onMouseButton(eventXY, oper, button);
        _util.stopEvent(event);
    },

    grab: function() {
        var element = this._target;

        _util.addEvent(element, "mouseover", this._handlers.mouseover);
        _util.addEvent(element, "mouseout", this._handlers.mouseout);

        _util.addEvent(element, "touchstart", this._handlers.mousedown);
        //_util.addEvent(window, "touchend", this._handlers.mouseup);
        _util.addEvent(element, "touchend", this._handlers.mouseup);
        _util.addEvent(element, "touchmove", this._handlers.mousemove);
        _util.addEvent(element, "mousedown", this._handlers.mousedown);
        //_util.addEvent(window, "mouseup", this._handlers.mouseup);
        _util.addEvent(element, "mouseup", this._handlers.mouseup);
        _util.addEvent(element, "mousemove", this._handlers.mousemove);
        _util.addEvent(element, _util.layoutEngine.gecko ? "DOMMouseScroll" : "mousewheel", this._handlers.mousewheel);
        _util.addEvent(element, "contextmenu", this._handlers.mousedisable);
        //_util.addEvent(document, "click", this._handlers.mousedisable);
        //_util.addEvent(document.body, "contextmenu", this._handlers.mousedisable);
    },
    ungrab: function() {
        var element = this._target;

        _util.removeEvent(element, "mouseover", this._handlers.mouseover);
        _util.removeEvent(element, "mouseout", this._handlers.mouseout);

        _util.removeEvent(element, "touchstart", this._handlers.mousedown);
        //_util.removeEvent(window, "touchend", this._handlers.mouseup);
        _util.removeEvent(element, "touchend", this._handlers.mouseup);
        _util.removeEvent(element, "touchmove", this._handlers.mousemove);
        _util.removeEvent(element, "mousedown", this._handlers.mousedown);
        //_util.removeEvent(window, "mouseup", this._handlers.mouseup);
        _util.removeEvent(element, "mouseup", this._handlers.mouseup);
        _util.removeEvent(element, "mousemove", this._handlers.mousemove);
        _util.removeEvent(element, _util.layoutEngine.gecko ? "DOMMouseScroll" : "mousewheel", this._handlers.mousewheel);
        _util.removeEvent(element, "contextmenu", this._handlers.mousedisable);
        //_util.removeEvent(document, "click", this._handlers.mousedisable);
        //_util.removeEvent(document.body, "contextmenu", this._handlers.mousedisable);
    }
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("Keyboard");

module.exports = _util.prototypeExtend({

    __init__: function () {
        var self = this;

        this._eventHandlers = {
            keyup: this._handleKeyUp.bind(this),
            keydown: this._handleKeyDown.bind(this),
            keypress: this._handleKeyPress.bind(this),
            blur: this._allKeysUp.bind(this)
        }
    },

    getKey: function(event) {
        return "keyCode"in event && "key"in event ?
            (event.key + ":" + event.keyCode) : ("keyCode" in event ? event.keyCode : event.key)
    },

    onKeyPress: function(keyValue, isPressed) {
    },

    _onKeyPress: function(keyValue, isPressed) {
        this.onKeyPress && this.onKeyPress(keyValue, isPressed);
    },

    _handleRfbEvent: function(event, type) {
        var shift = event.shiftKey,
            ctrl = event.ctrlKey,
            alt = event.altKey,
            ascii = event.keyCode || event.which;

        this._onKeyPress(ascii, "keydown" == type);
    },

    _handleKeyDown: function(event) {
        return !this._focused || !this._handleRfbEvent(event, "keydown") || (_util.stopEvent(event), false);
    },
    _handleKeyPress: function(event) {
        return !this._focused || (_util.stopEvent(event), false)
        //return !this._focused || !this._handleRfbEvent.keypress(event) || (_util.stopEvent(event), false);
    },
    _handleKeyUp: function(event) {
        return !this._focused || !this._handleRfbEvent(event, "keyup") || (_util.stopEvent(event), false);
    },

    _allKeysUp: function() {
    },
    sync: function(e) {
    },

    grab: function() {
        var element = this._target;

        _util.addEvent(element, "keydown", this._eventHandlers.keydown);
        _util.addEvent(element, "keyup", this._eventHandlers.keyup);
        _util.addEvent(element, "keypress", this._eventHandlers.keypress);
        _util.addEvent(element, "blur", this._eventHandlers.blur);
        //_util.addEvent(window, "blur", this._eventHandlers.blur);

        _logger.info("keyboard grab at element");
    },
    ungrab: function() {
        var element = this._target;

        _util.removeEvent(element, "keydown", this._eventHandlers.keydown);
        _util.removeEvent(element, "keyup", this._eventHandlers.keyup);
        _util.removeEvent(element, "keypress", this._eventHandlers.keypress);
        _util.removeEvent(element, "blur", this._eventHandlers.blur);
        //_util.removeEvent(window, "blur", this._eventHandlers.blur);

        this._allKeysUp();

        _logger.info("keyboard upgrab at element");
    }
});




/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("TotalBuffer");

var EventBuffer = __webpack_require__(29);
var TrackBuffer = __webpack_require__(30);

var MouseTrigger = __webpack_require__(23);

module.exports = _util.prototypeExtend({
    trackBufferSize: 100,
    _trackBufferCompRadio: 0.25,

    _sn: 1,

    __init__: function () {
        this._eventBuffer = new EventBuffer({
            _nextsn: this._nextsn.bind(this)
        });
        this._trackBuffer = new TrackBuffer({
            _nextsn: this._nextsn.bind(this),
            _compRadio: this._trackBufferCompRadio,
            mouseTrackBufferSize: this.trackBufferSize
        });
    },

    _nextsn: function () {
        return this._sn ++;
    },

    put: function (event) {
        if(!event || event.oper === undefined){
            return;
        }

        event.oper === MouseTrigger.BTN.MOVE ?
            this._trackBuffer.put(event) : this._eventBuffer.put(event);
    },


    getUnread1: function (length) {
        function sortby(a, b) {
            return a._time - b.time;
        }

        var result;
        if(!length){
            var events = this._eventBuffer.getUnread();
            var tracks = this._trackBuffer.getUnread();

            Array.prototype.push.apply(events, tracks);
            result = events;

            result.sort(sortby);
            return result;
        }

        result = [];

        var events = this._eventBuffer._getUnread(length);
        var tracks = this._trackBuffer._getUnread(length);

        Array.prototype.push.apply(result, events);
        Array.prototype.push.apply(result, tracks);

        result.sort(sortby);

        result = result.slice(0, length > result.length ? result.length : length);
        for(var i = 0; i < result.length; i++){
            if(result[i].oper === MouseTrigger.BTN.MOVE){
                this._trackBuffer.getUnread(1);
            }else{
                this._eventBuffer.getUnread(1);
            }
        }

        return result;
    },

    getUnread: function (length) {
        function sortby(a, b) {
            return a.sn - b.sn;
        }

        if(!length){
            length = this._eventBuffer.getUnreadSize() + this._trackBuffer.getUnreadSize();
        }

        var result = [];
        while(result.length !== length){
            var event = this._eventBuffer._getUnread(1);
            var track = this._trackBuffer._getUnread(1);

            if(event === undefined && track){
                result.push(this._trackBuffer.getUnread(1));
            } else if(track === undefined && event){
                result.push(this._eventBuffer.getUnread(1));
            } else if(track === undefined && event === undefined){
                return result;
            } else {
                if(event.sn < track.sn){
                    result.push(this._eventBuffer.getUnread(1));
                }else{
                    result.push(this._trackBuffer.getUnread(1));
                }
            }
        }

        return result;
    },

    getUnreadSize: function () {
        return this._trackBuffer.getUnreadSize() + this._eventBuffer.getUnreadSize();
    },

    getUnclearSize: function () {
        return this._trackBuffer.getUnclearSize() + this._eventBuffer.getUnclearSize();
    },

    clearRead: function (limitSN) { // <=
        return this._eventBuffer.clearRead(limitSN) + this._trackBuffer.clearRead(limitSN);
    }
});


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("EventBuffer");


module.exports = _util.prototypeExtend({
    _buffer: [],

    _sn: 1,

    _beginIndex: 0,
    _readIndex: 0,
    _endIndex: 0,

    _nextsn: function () {
        return this._sn ++;
    },

    put: function (event) {
        if(!event){
            return;
        }

        event.sn = this._nextsn();

        this._buffer.push(event);
        this._endIndex++;
    },

    _getUnread: function (length) {
        if(this._readIndex === this._endIndex){
            return length === 1 ? undefined : [];
        }

        return this._buffer[this._readIndex];

        var end = this._readIndex + (length || this._endIndex),
            end = (end > this._endIndex ? this._endIndex : end);

        return this._buffer.slice(this._readIndex, end);
    },

    getUnread: function (length) {
        var result;
        try{
            result = this._getUnread(length);
            return result;
        } finally {
            result && (this._readIndex += (length === 1 ? 1 : result.length));
        }
    },

    getUnreadSize: function () {
        return this._endIndex - this._readIndex;
    },

    getUnclearSize: function () {
        return this._readIndex - this._beginIndex;
    },

    clearRead: function (limitSN) { // <=
        if(this._readIndex === this._beginIndex){
            return;
        }

        var count = 0;
        for(var i = this._beginIndex; i < this._readIndex; i++){
            if(this._buffer[i].sn <= limitSN){
                count++;
            }else{
                break;
            }
        }

        if(count === 0){
            return 0;
        }

        for(var i = 0; i < count; i++){
            this._buffer.shift();
        }

        this._beginIndex = 0;
        this._readIndex -= count;
        this._endIndex -= count;

        return count;
    }
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("TrackBuffer");


module.exports = _util.prototypeExtend({
    mouseTrackBufferSize: 1000,

    _sn: 1,
    _compRadio: 0.25,

    _beginIndex: 0,
    _readIndex: 0,
    _endIndex: 0, //不包含end

    __init__: function () {
        this._mouseTrackBuffer = new Array(this.mouseTrackBufferSize);
    },

    _nextsn: function () {
        return this._sn ++;
    },

    _index: function (_index) {
        return _index % this.mouseTrackBufferSize;
    },

    comp1: function(compRadio){ //compRadio 压缩原来的compRadio，如0.25，就是删除其中0.25个元素
        if(compRadio >= 1){
            return;
        }

        var span = Math.floor(1 / compRadio);

        var _nextIndex = this._beginIndex;
        var _currentIndex = _nextIndex + 1;

        while (_nextIndex < this._endIndex){
            for(var i = 2; i < span && (_nextIndex + i) < this._endIndex; i++){
                this._mouseTrackBuffer[this._index(_currentIndex++)] = this._mouseTrackBuffer[this._index(_nextIndex + i)];
            }

            _nextIndex += span;
        }

        this._endIndex = _currentIndex;
    },

    put1: function (track) {
        if(!track){
            return;
        }

        track.sn = this._nextsn();


        if(this._endIndex - this._readIndex === this.mouseTrackBufferSize){
            //此时 begin = read, buffer）将原有数组(未发送队列)压缩为原先的0.75
            this.comp1(this._compRadio);
            this._readIndex = this._beginIndex;
        }

        var begin = this._index(this._beginIndex),
            read = this._index(this._readIndex),
            end = this._index(this._endIndex);

        var next = end;
        if(next <= begin && next >= 0 && this._endIndex > this._beginIndex){ // buffer不足后，首先覆盖已经发送的
            this._beginIndex++;
        }

        this._mouseTrackBuffer[next] = track;
        this._endIndex++;
    },

    compHalfOfUnread: function(){ //compRadio 压缩原来的compRadio，如0.25，就是删除其中0.25个元素
        var _nextIndex = this._readIndex + 2;
        var _currentIndex = this._readIndex + 1;

        while (_nextIndex < this._endIndex){
            this._mouseTrackBuffer[this._index(_currentIndex++)] = this._mouseTrackBuffer[this._index(_nextIndex)];

            _nextIndex += 2;
        }

        this._endIndex = _currentIndex;
    },

    put: function (track) {
        if(!track){
            return;
        }

        track.sn = this._nextsn();


        if(this._endIndex - this._beginIndex === this.mouseTrackBufferSize){
            // begin->read 待清除区，read->end 待发送，如果待清除区+待发送区满，压缩待发送区
            this.compHalfOfUnread();
        }

        var end = this._index(this._endIndex);

        this._mouseTrackBuffer[end] = track;
        this._endIndex++;
    },

    _interval: function (startIndex, endIndex) {
        var read = this._index(startIndex), end = this._index(endIndex);

        if(read < end){
            return this._mouseTrackBuffer.slice(read, end);
        }

        var result = this._mouseTrackBuffer.slice(read);
        Array.prototype.push.apply(result, this._mouseTrackBuffer.slice(0, end));

        return result;
    },

    _getUnread: function (length) {
        if(this._readIndex === this._endIndex){
            return length === 1 ? undefined : [];
        }

        return this._mouseTrackBuffer[this._index(this._readIndex)];

        var end = this._readIndex + (length || this._endIndex),
            end = (end > this._endIndex ? this._endIndex : end);

        return this._interval(this._readIndex, end);
    },

    getUnread: function (length) {
        var result;
        try{
            result = this._getUnread(length);
            return result;
        } finally {
            result && (this._readIndex += (length === 1 ? 1 : result.length));
        }
    },

    getUnreadSize: function () {
        return this._endIndex - this._readIndex;
    },

    getUnclearSize: function () {
        return this._readIndex - this._beginIndex;
    },

    clearRead: function (limitSN) { // <=
        if(this._readIndex === this._beginIndex){
            return;
        }

        var count = 0;

        for(var i = this._beginIndex; i < this._readIndex; i++){
            var index = this._index(i);

            if(this._mouseTrackBuffer[index].sn <= limitSN){
                this._beginIndex++;
                count++;
            }else{
                break;
            }
        }

        return count;
    }
});

/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(6);
var _logger = _util.tagLogger("Keyboard");


module.exports = _util.prototypeExtend({
    onKeyDown: function (btn) {
        
    },
    
    onKeyUp: function (btn) {
        
    }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var emedia = window.emedia = window.emedia || {};
var pannel = emedia.pannel = {};

;(function (root, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    'use strict';

    return pannel;
}));


pannel.Mouse = __webpack_require__(26);
pannel.MouseTrigger = __webpack_require__(23);
pannel.Keyboard = __webpack_require__(27);

pannel.KeyboardTrack = __webpack_require__(32);
pannel.MouseTrack = __webpack_require__(22);
pannel.DefaultMouseTrack = __webpack_require__(21);

pannel.TrackBuffer = __webpack_require__(30);
pannel.EventBuffer = __webpack_require__(29);

pannel.TotalBuffer = __webpack_require__(28);

pannel.util = __webpack_require__(6);
pannel.logger = pannel.util.tagLogger("Pannel");


/***/ })
/******/ ]);