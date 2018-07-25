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
/******/ 	__webpack_require__.p = "/Users/DATA/WORK.HOME/projects/CO./EASEMOB_2016.05.03~/webim.1.git/webrtc";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var Util = (__webpack_require__(2).default);
var Call = __webpack_require__(33);

var emedia = __webpack_require__(3);

window.WebIM = typeof WebIM !== 'undefined' ? WebIM : {};
WebIM.WebRTC = WebIM.WebRTC || {};
WebIM.WebRTC.Call = Call;
WebIM.WebRTC.Util = Util;

WebIM.__alreadyOpenMedias = [];

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = WebIM.WebRTC;
} else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return WebIM.WebRTC;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


// /**
//  * 判断是否支持pranswer
//  */
// if (/Firefox/.test(navigator.userAgent)) {
//     //WebIM.WebRTC.supportPRAnswer = (navigator.userAgent.split("Chrome/")[1].split(".")[0] >= 50) ? true : false;
//     WebIM.WebRTC.supportPRAnswer = false;
// }else{
//     WebIM.WebRTC.supportPRAnswer = true;
// }
WebIM.WebRTC.supportPRAnswer = emedia.supportPRAnswer;

console && console.warn('Webrtc version', 'Git.e4f0006');

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var easemob_emedia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var easemob_emedia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(easemob_emedia__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["util"]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4)


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//console.  emedia.__easemob_current_mservice.current
//3.0.0_Git.f6ca116
console && console.warn('EMedia version', '3.0.0_Git.f6ca116');
window.emedia = window.emedia || {};

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

    return emedia;
}));

var util = emedia.util = __webpack_require__(5);


(function requireWebrtcAdapter() {
    var adapter = __webpack_require__(6);
    emedia.browser = adapter.__browser; // firefox chrome safari IE
    emedia.browserVersion = adapter.__browserVersion;
})();
util.logger.info("Current browser", emedia.browser, emedia.browserVersion);


emedia.config = function (cfg) {
    cfg = util.extend({}, cfg);

    for(var key in cfg){
        emedia.config[key] = cfg[key];
        if(key === "logLevel"){
            emedia.LOG_LEVEL = cfg[key];
        }
    }
};

emedia.config({
    autoSub: true,

    onlyEnter: false,

    reconnect: 13, //重连次数
    reconnectDelay: 3000, //重连间隔 毫秒

    getCopyIntervalMillis: 30000,
    checkConnectIntervalMillis: 1000,

    iceRebuildCount: 3,
    iceRebuildIntervalMillis: 500,

    enterTimeout: 20000,

    useRTCCfgIfServerReturn: false,
    forceUseRTCCfgIfServerReturnWhenP2P: true,

    allowRepeatAudioMixerPublish: false,

    getMediaMeterIntervalMillis: 400,
    _useRequestAnimationFrame: false,

    meterWithTrackAudioLevel: false,
    judgeTalkingByInstantGE: 0.05,

    _printSoundData: false,

    trackBufferSize: 20,
    allowSendWhenLessThan: 4,
    disableTrack: false,

    ctrlCheckIntervalMillis: 10 * 1000,
    ctrlTimeoutMillis: 30 * 1000,

    _printDebugStats: false,
    //wsorigin
});


emedia.AudioContext = window.AudioContext || window.webkitAudioContext;

if(emedia.config.getMediaMeterIntervalMillis){
    // https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11/46534088#46534088
    // There are two problems.
    // The main one is that Safari on iOS 11 seems to automatically suspend new AudioContext's that aren't created in response to a tap.
    // You can resume() them, but only in response to a tap.
    //
    // So, you have to either create it before you get the MediaStream, or else get the user to tap again later.
    try {
        if (typeof emedia.AudioContext === 'function') {
            emedia.__audioContext = new emedia.AudioContext();
            emedia.__usingWebAudio = true;
        }else{
            emedia.__usingWebAudio = false;
        }
    } catch(e) {
        emedia.__usingWebAudio = false;
    }

    // context state at this time is `undefined` in iOS8 Safari
    if (emedia.__usingWebAudio && emedia.__audioContext.state === 'suspended') {
        var resume = function () {
            (emedia.__audioContext.state === 'suspended') && emedia.__audioContext.resume();
            util.logger.warn("AudioContext state suspended ->", emedia.__audioContext.state);

            setTimeout(function () {
                if (emedia.__audioContext.state === 'running') {
                    document.body.removeEventListener('touchend', resume, false);
                    document.body.removeEventListener('click', resume, false);
                }
            }, 0);
        };

        document.body.addEventListener('touchend', resume, false);
        //document.body.addEventListener('load', resume, false);
        document.body.addEventListener('click', resume, false);
    }

    if(!emedia.__usingWebAudio){
        console.warn("'new AudioContext()' failed. can not know who talking.");
    }
    if(emedia.__audioContext && emedia.__audioContext.state === 'suspended'){
        console.warn("audioContext.state is suspended. can not know who talking. You can resume() emedia.__audioContext, but only in response to a tap.");
    }
}


if (!window.requestAnimationFrame || !emedia.config._useRequestAnimationFrame) {
    emedia.requestAnimationFrame = function(fn, timeoutMillis) {
        return setTimeout(fn, timeoutMillis || emedia.config.getMediaMeterIntervalMillis);
    };
}else{
    emedia.requestAnimationFrame = function(callback){
        window.requestAnimationFrame(callback);
    }
}

if (!window.cancelAnimationFrame || !emedia.config._useRequestAnimationFrame) {
    emedia.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}else{
    emedia.cancelAnimationFrame = function(id){
        window.cancelAnimationFrame(id);
    }
}

emedia.stopAudioTracks = function (_stream) {
    _stream && _stream.getAudioTracks().forEach(function (track) {
        track.stop();
    });
};
emedia.stopAndRemoveAudioTracks = function (_stream) {
    var tracks = [];
    _stream && _stream.getAudioTracks().forEach(function (track) {
        track.stop();
        tracks.push(track);
    });

    util.forEach(tracks, function (_index, track) {
        _stream.removeTrack(track);
    });
};

emedia.stopTracks = function (_stream) {
    _stream && _stream.getTracks().forEach(function (track) {
        track.stop();
    });
};

emedia.enableVideoTracks = function (_stream, enabled) {
    _stream && _stream.getVideoTracks().forEach(function (track) {
        track.enabled === enabled || (track.enabled = enabled);
    });
};

emedia.enableAudioTracks = function (_stream, enabled) {
    _stream && _stream.getAudioTracks().forEach(function (track) {
        track.enabled === enabled || (track.enabled = enabled);
    });
};

emedia.hasEnabledTracks = function (mediaStream) {
    if(!mediaStream || (typeof mediaStream.getAudioTracks !== 'function')){
        return false;
    }

    if(!mediaStream.active){
        return false;
    }

    var tracks = mediaStream.getAudioTracks();

    if(tracks.length === 0){
        return false;
    }

    for(var i in tracks){
        if(tracks[i].enabled){
            return true;
        }
    }

    return false;
};


var Service = __webpack_require__(9);
var __event = __webpack_require__(11);

emedia.Webrtc = __webpack_require__(14);

emedia.Service = Service;
emedia.P2P = __webpack_require__(23);
// var cloneService = util.extend({}, Service).extend(Service);
emedia.XService = emedia.P2P(Service);

emedia.ctrl = __webpack_require__(24);
emedia.CompositeCanvas = __webpack_require__(30);

emedia.pannel || (emedia.pannel = {});
emedia.pannel.DefaultMouseTrack = __webpack_require__(20);
emedia.pannel.MouseTrack = __webpack_require__(21);
emedia.pannel.KeyboardTrack = __webpack_require__(31);

emedia.PCStats = __webpack_require__(32);

emedia.event = __event;


emedia.LOG_LEVEL = 0;

emedia.isFirefox = 'firefox' === emedia.browser;
emedia.isChrome = 'chrome' === emedia.browser;
emedia.isSafari = 'safari' === emedia.browser;
emedia.isEdge = 'edge' === emedia.browser;

emedia.isWebRTC = window.RTCPeerConnection && /^https\:$/.test(window.location.protocol);

/**
 * 判断是否支持pranswer
 */
if (emedia.isChrome || emedia.isSafari) {
    emedia.supportPRAnswer = true;
}
//WebIM.WebRTC.supportPRAnswer = false;


emedia.config({
   baseAcptOps: [102, 104, 105, 106, 107, 300, 302, 303, 304, 301, 204, 206, 400, 401, 1001, 100201, 100202, 100203]
    // baseAcptOps: [107, 300, 302, 303, 304, 301, 204, 206, 400, 401, 1001]
});
emedia.config({
    clientType: 'WEB',
    version: '3.0.0',

    userAgent: navigator.userAgent,

    acptOps:[
        100230, //远程控制
        100205, //远程抓图
        1003, //透传消息
        1004,  //P2P消息支持
        // 100201, //缩放
        // 100202, //聚焦
        // 100203, //曝光
        // 100204, //定格
        // 100205 //远程抓图
    ]
});

// /**
//  *  Enter 客户端携带，进入
//  *  服务端可支持，Json字符串，或Json数据
//  */
// var res = {
//     type: 'ios|android|web',
//     ver: '1.0.2',
//     agent: '', //ios android可以不传，web navigator.userAgent
//     //可缺省，缺省默认支持
//     //107 300 302 303 304 301 204 206 400 401 1001
//     ops:[
//         1003, //透传消息
//         100201, //缩放
//         100202, //聚焦
//         100203, //曝光
//         100204, //定格
//         100205 //远程抓图
//     ],
//
//     vcodes:['H264', 'VP8'] //客户端进入，可以携带，也可以不携带。携带了，就使用这个广播给其他人。
//                            // A进入，没有携带此参数，服务端通过 type ver agent 补全此字段，广播给B C
// }



/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var adapter;

if (!!document.documentMode) { // Detect IE (6-11)
    var hasMatch = /\brv[ :]+(\d+)/g.exec(navigator.userAgent) || [];

    var webrtcDetectedBrowser   = 'IE';
    var webrtcDetectedVersion   = parseInt(hasMatch[1], 10);
    var webrtcMinimumVersion    = 9;
    var webrtcDetectedType      = 'plugin';
    var webrtcDetectedDCSupport = 'SCTP';

    if (!webrtcDetectedVersion) {
        hasMatch = /\bMSIE[ :]+(\d+)/g.exec(navigator.userAgent) || [];

        webrtcDetectedVersion = parseInt(hasMatch[1] || '0', 10);
    }

    adapter = __webpack_require__(7);

    adapter.__browser = webrtcDetectedBrowser;
    adapter.__browserVersion = webrtcDetectedVersion;

    //adapter = require('./Temasys.wrapper'); //6.0.3
}else{
    adapter = __webpack_require__(8); //6.2.0
}


adapter.__browser = adapter.__browser || adapter.browserDetails.browser; // firefox chrome safari
adapter.__browserVersion = adapter.__browserVersion || adapter.browserDetails.version;

console && console.info("Current browser", adapter.__browser, adapter.__browserVersion);

if("Not a supported browser." === adapter.__browser){
    throw "Not a supported browser";
}


function _attachMediaStream(element, stream) {
    element.srcObject = stream;
}

/**
 * muted undefined, stream _located true 时muted
 *
 * @param element
 * @param stream
 * @param muted
 * @returns {*}
 */
function easemobAttachMediaStream(element, stream, muted, _fun) {
    function mute() {
        muted = !!(muted === undefined ? stream._located : muted);

        //为了解决某些手机mute造成本地图像卡的问题
        element.muted = false;
        if(muted !== element.muted){
            element.muted = true;
        }
    }

    _fun || (_fun = window.__attachMediaStream) || (_fun = _attachMediaStream);

    if(!element){
        return;
    }

    if(!stream){
        _fun(element, stream);
        return;
    }

    if(!element.srcObject){
        mute();
        _fun(element, stream);
        return element;
    }

    if(element.srcObject._located //old stream 也是 _located
            && stream._located
            && element.srcObject.id === stream.id){
        return element.srcObject;
    }

    mute();
    _fun(element, stream);

    return element;
}

if(window.attachMediaStream){
    window.__attachMediaStream = window.attachMediaStream;
}

window.attachMediaStream = easemobAttachMediaStream;

module.exports = adapter;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

if (typeof Promise === 'undefined') {
    window.Promise = require("bluebird");
}

var Plugin = require('./ie/XPluginObject');

var plugin = Plugin.single(_export);

window.reattachMediaStream = window.attachMediaStream = plugin.attachMediaStream;

function _args(_args, count) {
    var args = (_args.length === 1 ? [_args[0]] : Array.apply(null, _args));
    while(args.length < (count || 3)){
        args.push(undefined);
    }
    return args;
}

function _export(plugin) {
    if(typeof window.RTCPeerConnection === 'undefined'){
        return;
    }

    window.XVideo = plugin.XVideo;
    window.RTCSessionDescription = plugin.RTCSessionDescription;
    window.RTCIceCandidate = plugin.RTCIceCandidate;
    window.MediaStream = plugin.MediaStream;
    window.MediaStreamTrack = plugin.MediaStreamTrack;
    window.RTCStatsReport = plugin.RTCStatsReport;

    var _NativeRTCPeerConnection = plugin.RTCPeerConnection;

    window.RTCPeerConnection = function (pcConfig) {
        var self = this;
        self._nativeRTCPeerConnection = new _NativeRTCPeerConnection(pcConfig);

        self._nativeRTCPeerConnection.onicecandidate = function (event) {
            self.onicecandidate(event);
        };

        self._nativeRTCPeerConnection.oniceconnectionstatechange = function (event) {
            self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;
            self.oniceconnectionstatechange(event);
        };

        self._nativeRTCPeerConnection.onaddstream = function (event) {
            self.onaddstream(event);
        };
    };

    window.RTCPeerConnection.prototype.addStream = function (stream) {
        var pc = this._nativeRTCPeerConnection;
        pc.addStream(stream);
    };

    window.RTCPeerConnection.prototype.close = function () {
        var pc = this._nativeRTCPeerConnection;
        pc.close();
    };

    ['createOffer', 'createAnswer'].forEach(function(method) {
        window.RTCPeerConnection.prototype[method] = function() {
            var self = this;

            var pc = self._nativeRTCPeerConnection;
            var args = _args(arguments);

            var isLegacyCall = args.length &&
                typeof args[0] === 'function';

            if (isLegacyCall) {
                var obj = pc[method](args[1], args[2], args[0]);
                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;

                return obj;
            }

            return new Promise(function(resolve, reject) {
                pc[method](resolve, reject, args[0]);
                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;
            });
        };
    });

    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(method) {
        window.RTCPeerConnection.prototype[method] = function() {
            var self = this;

            var pc = self._nativeRTCPeerConnection;
            var args = _args(arguments);

            var isLegacyCall = args.length &&
                typeof args[0] === 'function';

            if (isLegacyCall) {
                var obj = pc[method](args[0], args[1], args[2]);
                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;

                return obj;
            }

            return new Promise(function(resolve, reject) {
                pc[method](args[0], resolve, reject);
                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;
            });
        };
    });

    var mediaDevices = navigator.mediaDevices = plugin.mediaDevices;

    mediaDevices.getUserMedia = navigator.getUserMedia = function () {
        var self = this;

        var getUserMedia = MediaDevices.prototype.getUserMedia.bind(self);
        var args = _args(arguments);

        var isLegacyCall = args.length &&
            typeof args[0] === 'function';

        if (isLegacyCall) {
            var obj = getUserMedia[method](args[0], args[1], args[2]);

            return obj;
        }

        return new Promise(function(resolve, reject) {
            return getUserMedia[method](args[0], resolve, reject);
        });
    }

    mediaDevices.enumerateDevices = function () {
        var self = this;

        var enumerateDevices = MediaDevices.prototype.enumerateDevices.bind(self);
        var args = _args(arguments);

        var isLegacyCall = args.length &&
            typeof args[0] === 'function';

        if (isLegacyCall) {
            var obj = enumerateDevices[method](args[0], args[1]);

            return obj;
        }

        return new Promise(function(resolve, reject) {
            return enumerateDevices[method](resolve, reject);
        });
    }
}

module.exports = plugin;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

//6.2.0
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.adapter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 *  Version: 6.2.0
 *
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var SDPUtils = require('sdp');

        function fixStatsType(stat) {
            return {
                inboundrtp: 'inbound-rtp',
                outboundrtp: 'outbound-rtp',
                candidatepair: 'candidate-pair',
                localcandidate: 'local-candidate',
                remotecandidate: 'remote-candidate'
            }[stat.type] || stat.type;
        }

        function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
            var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

            // Map ICE parameters (ufrag, pwd) to SDP.
            sdp += SDPUtils.writeIceParameters(
                transceiver.iceGatherer.getLocalParameters());

            // Map DTLS parameters to SDP.
            sdp += SDPUtils.writeDtlsParameters(
                transceiver.dtlsTransport.getLocalParameters(),
                type === 'offer' ? 'actpass' : dtlsRole || 'active');

            sdp += 'a=mid:' + transceiver.mid + '\r\n';

            if (transceiver.rtpSender && transceiver.rtpReceiver) {
                sdp += 'a=sendrecv\r\n';
            } else if (transceiver.rtpSender) {
                sdp += 'a=sendonly\r\n';
            } else if (transceiver.rtpReceiver) {
                sdp += 'a=recvonly\r\n';
            } else {
                sdp += 'a=inactive\r\n';
            }

            if (transceiver.rtpSender) {
                var trackId = transceiver.rtpSender._initialTrackId ||
                    transceiver.rtpSender.track.id;
                transceiver.rtpSender._initialTrackId = trackId;
                // spec.
                var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
                    trackId + '\r\n';
                sdp += 'a=' + msid;
                // for Chrome. Legacy should no longer be required.
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                    ' ' + msid;

                // RTX
                if (transceiver.sendEncodingParameters[0].rtx) {
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                        ' ' + msid;
                    sdp += 'a=ssrc-group:FID ' +
                        transceiver.sendEncodingParameters[0].ssrc + ' ' +
                        transceiver.sendEncodingParameters[0].rtx.ssrc +
                        '\r\n';
                }
            }
            // FIXME: this should be written by writeRtpDescription.
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                ' cname:' + SDPUtils.localCName + '\r\n';
            if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                    ' cname:' + SDPUtils.localCName + '\r\n';
            }
            return sdp;
        }

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
        function filterIceServers(iceServers, edgeVersion) {
            var hasTurn = false;
            iceServers = JSON.parse(JSON.stringify(iceServers));
            return iceServers.filter(function(server) {
                if (server && (server.urls || server.url)) {
                    var urls = server.urls || server.url;
                    if (server.url && !server.urls) {
                        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
                    }
                    var isString = typeof urls === 'string';
                    if (isString) {
                        urls = [urls];
                    }
                    urls = urls.filter(function(url) {
                        var validTurn = url.indexOf('turn:') === 0 &&
                            url.indexOf('transport=udp') !== -1 &&
                            url.indexOf('turn:[') === -1 &&
                            !hasTurn;

                        if (validTurn) {
                            hasTurn = true;
                            return true;
                        }
                        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
                            url.indexOf('?transport=udp') === -1;
                    });

                    delete server.url;
                    server.urls = isString ? urls[0] : urls;
                    return !!urls.length;
                }
            });
        }

// Determines the intersection of local and remote capabilities.
        function getCommonCapabilities(localCapabilities, remoteCapabilities) {
            var commonCapabilities = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: []
            };

            var findCodecByPayloadType = function(pt, codecs) {
                pt = parseInt(pt, 10);
                for (var i = 0; i < codecs.length; i++) {
                    if (codecs[i].payloadType === pt ||
                        codecs[i].preferredPayloadType === pt) {
                        return codecs[i];
                    }
                }
            };

            var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
                var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
                var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
                return lCodec && rCodec &&
                    lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
            };

            localCapabilities.codecs.forEach(function(lCodec) {
                for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
                    var rCodec = remoteCapabilities.codecs[i];
                    if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
                        lCodec.clockRate === rCodec.clockRate) {
                        if (lCodec.name.toLowerCase() === 'rtx' &&
                            lCodec.parameters && rCodec.parameters.apt) {
                            // for RTX we need to find the local rtx that has a apt
                            // which points to the same local codec as the remote one.
                            if (!rtxCapabilityMatches(lCodec, rCodec,
                                    localCapabilities.codecs, remoteCapabilities.codecs)) {
                                continue;
                            }
                        }
                        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                        // number of channels is the highest common number of channels
                        rCodec.numChannels = Math.min(lCodec.numChannels,
                            rCodec.numChannels);
                        // push rCodec so we reply with offerer payload type
                        commonCapabilities.codecs.push(rCodec);

                        // determine common feedback mechanisms
                        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                            for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                                if (lCodec.rtcpFeedback[j].type === fb.type &&
                                    lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                                    return true;
                                }
                            }
                            return false;
                        });
                        // FIXME: also need to determine .parameters
                        //  see https://github.com/openpeer/ortc/issues/569
                        break;
                    }
                }
            });

            localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
                for (var i = 0; i < remoteCapabilities.headerExtensions.length;
                     i++) {
                    var rHeaderExtension = remoteCapabilities.headerExtensions[i];
                    if (lHeaderExtension.uri === rHeaderExtension.uri) {
                        commonCapabilities.headerExtensions.push(rHeaderExtension);
                        break;
                    }
                }
            });

            // FIXME: fecMechanisms
            return commonCapabilities;
        }

// is action=setLocalDescription with type allowed in signalingState
        function isActionAllowedInSignalingState(action, type, signalingState) {
            return {
                offer: {
                    setLocalDescription: ['stable', 'have-local-offer'],
                    setRemoteDescription: ['stable', 'have-remote-offer']
                },
                answer: {
                    setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                    setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
                }
            }[type][action].indexOf(signalingState) !== -1;
        }

        function maybeAddCandidate(iceTransport, candidate) {
            // Edge's internal representation adds some fields therefore
            // not all fieldѕ are taken into account.
            var alreadyAdded = iceTransport.getRemoteCandidates()
                .find(function(remoteCandidate) {
                    return candidate.foundation === remoteCandidate.foundation &&
                        candidate.ip === remoteCandidate.ip &&
                        candidate.port === remoteCandidate.port &&
                        candidate.priority === remoteCandidate.priority &&
                        candidate.protocol === remoteCandidate.protocol &&
                        candidate.type === remoteCandidate.type;
                });
            if (!alreadyAdded) {
                iceTransport.addRemoteCandidate(candidate);
            }
            return !alreadyAdded;
        }


        function makeError(name, description) {
            var e = new Error(description);
            e.name = name;
            // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
            e.code = {
                NotSupportedError: 9,
                InvalidStateError: 11,
                InvalidAccessError: 15,
                TypeError: undefined,
                OperationError: undefined
            }[name];
            return e;
        }

        module.exports = function(window, edgeVersion) {
            // https://w3c.github.io/mediacapture-main/#mediastream
            // Helper function to add the track to the stream and
            // dispatch the event ourselves.
            function addTrackToStreamAndFireEvent(track, stream) {
                stream.addTrack(track);
                stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
                    {track: track}));
            }

            function removeTrackFromStreamAndFireEvent(track, stream) {
                stream.removeTrack(track);
                stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
                    {track: track}));
            }

            function fireAddTrack(pc, track, receiver, streams) {
                var trackEvent = new Event('track');
                trackEvent.track = track;
                trackEvent.receiver = receiver;
                trackEvent.transceiver = {receiver: receiver};
                trackEvent.streams = streams;
                window.setTimeout(function() {
                    pc._dispatchEvent('track', trackEvent);
                });
            }

            var RTCPeerConnection = function(config) {
                var pc = this;

                var _eventTarget = document.createDocumentFragment();
                ['addEventListener', 'removeEventListener', 'dispatchEvent']
                    .forEach(function(method) {
                        pc[method] = _eventTarget[method].bind(_eventTarget);
                    });

                this.canTrickleIceCandidates = null;

                this.needNegotiation = false;

                this.localStreams = [];
                this.remoteStreams = [];

                this.localDescription = null;
                this.remoteDescription = null;

                this.signalingState = 'stable';
                this.iceConnectionState = 'new';
                this.connectionState = 'new';
                this.iceGatheringState = 'new';

                config = JSON.parse(JSON.stringify(config || {}));

                this.usingBundle = config.bundlePolicy === 'max-bundle';
                if (config.rtcpMuxPolicy === 'negotiate') {
                    throw(makeError('NotSupportedError',
                        'rtcpMuxPolicy \'negotiate\' is not supported'));
                } else if (!config.rtcpMuxPolicy) {
                    config.rtcpMuxPolicy = 'require';
                }

                switch (config.iceTransportPolicy) {
                    case 'all':
                    case 'relay':
                        break;
                    default:
                        config.iceTransportPolicy = 'all';
                        break;
                }

                switch (config.bundlePolicy) {
                    case 'balanced':
                    case 'max-compat':
                    case 'max-bundle':
                        break;
                    default:
                        config.bundlePolicy = 'balanced';
                        break;
                }

                config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

                this._iceGatherers = [];
                if (config.iceCandidatePoolSize) {
                    for (var i = config.iceCandidatePoolSize; i > 0; i--) {
                        this._iceGatherers.push(new window.RTCIceGatherer({
                            iceServers: config.iceServers,
                            gatherPolicy: config.iceTransportPolicy
                        }));
                    }
                } else {
                    config.iceCandidatePoolSize = 0;
                }

                this._config = config;

                // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
                // everything that is needed to describe a SDP m-line.
                this.transceivers = [];

                this._sdpSessionId = SDPUtils.generateSessionId();
                this._sdpSessionVersion = 0;

                this._dtlsRole = undefined; // role for a=setup to use in answers.

                this._isClosed = false;
            };

            // set up event handlers on prototype
            RTCPeerConnection.prototype.onicecandidate = null;
            RTCPeerConnection.prototype.onaddstream = null;
            RTCPeerConnection.prototype.ontrack = null;
            RTCPeerConnection.prototype.onremovestream = null;
            RTCPeerConnection.prototype.onsignalingstatechange = null;
            RTCPeerConnection.prototype.oniceconnectionstatechange = null;
            RTCPeerConnection.prototype.onconnectionstatechange = null;
            RTCPeerConnection.prototype.onicegatheringstatechange = null;
            RTCPeerConnection.prototype.onnegotiationneeded = null;
            RTCPeerConnection.prototype.ondatachannel = null;

            RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
                if (this._isClosed) {
                    return;
                }
                this.dispatchEvent(event);
                if (typeof this['on' + name] === 'function') {
                    this['on' + name](event);
                }
            };

            RTCPeerConnection.prototype._emitGatheringStateChange = function() {
                var event = new Event('icegatheringstatechange');
                this._dispatchEvent('icegatheringstatechange', event);
            };

            RTCPeerConnection.prototype.getConfiguration = function() {
                return this._config;
            };

            RTCPeerConnection.prototype.getLocalStreams = function() {
                return this.localStreams;
            };

            RTCPeerConnection.prototype.getRemoteStreams = function() {
                return this.remoteStreams;
            };

            // internal helper to create a transceiver object.
            // (which is not yet the same as the WebRTC 1.0 transceiver)
            RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
                var hasBundleTransport = this.transceivers.length > 0;
                var transceiver = {
                    track: null,
                    iceGatherer: null,
                    iceTransport: null,
                    dtlsTransport: null,
                    localCapabilities: null,
                    remoteCapabilities: null,
                    rtpSender: null,
                    rtpReceiver: null,
                    kind: kind,
                    mid: null,
                    sendEncodingParameters: null,
                    recvEncodingParameters: null,
                    stream: null,
                    associatedRemoteMediaStreams: [],
                    wantReceive: true
                };
                if (this.usingBundle && hasBundleTransport) {
                    transceiver.iceTransport = this.transceivers[0].iceTransport;
                    transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
                } else {
                    var transports = this._createIceAndDtlsTransports();
                    transceiver.iceTransport = transports.iceTransport;
                    transceiver.dtlsTransport = transports.dtlsTransport;
                }
                if (!doNotAdd) {
                    this.transceivers.push(transceiver);
                }
                return transceiver;
            };

            RTCPeerConnection.prototype.addTrack = function(track, stream) {
                if (this._isClosed) {
                    throw makeError('InvalidStateError',
                        'Attempted to call addTrack on a closed peerconnection.');
                }

                var alreadyExists = this.transceivers.find(function(s) {
                    return s.track === track;
                });

                if (alreadyExists) {
                    throw makeError('InvalidAccessError', 'Track already exists.');
                }

                var transceiver;
                for (var i = 0; i < this.transceivers.length; i++) {
                    if (!this.transceivers[i].track &&
                        this.transceivers[i].kind === track.kind) {
                        transceiver = this.transceivers[i];
                    }
                }
                if (!transceiver) {
                    transceiver = this._createTransceiver(track.kind);
                }

                this._maybeFireNegotiationNeeded();

                if (this.localStreams.indexOf(stream) === -1) {
                    this.localStreams.push(stream);
                }

                transceiver.track = track;
                transceiver.stream = stream;
                transceiver.rtpSender = new window.RTCRtpSender(track,
                    transceiver.dtlsTransport);
                return transceiver.rtpSender;
            };

            RTCPeerConnection.prototype.addStream = function(stream) {
                var pc = this;
                if (edgeVersion >= 15025) {
                    stream.getTracks().forEach(function(track) {
                        pc.addTrack(track, stream);
                    });
                } else {
                    // Clone is necessary for local demos mostly, attaching directly
                    // to two different senders does not work (build 10547).
                    // Fixed in 15025 (or earlier)
                    var clonedStream = stream.clone();
                    stream.getTracks().forEach(function(track, idx) {
                        var clonedTrack = clonedStream.getTracks()[idx];
                        track.addEventListener('enabled', function(event) {
                            clonedTrack.enabled = event.enabled;
                        });
                    });
                    clonedStream.getTracks().forEach(function(track) {
                        pc.addTrack(track, clonedStream);
                    });
                }
            };

            RTCPeerConnection.prototype.removeTrack = function(sender) {
                if (this._isClosed) {
                    throw makeError('InvalidStateError',
                        'Attempted to call removeTrack on a closed peerconnection.');
                }

                if (!(sender instanceof window.RTCRtpSender)) {
                    throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
                        'does not implement interface RTCRtpSender.');
                }

                var transceiver = this.transceivers.find(function(t) {
                    return t.rtpSender === sender;
                });

                if (!transceiver) {
                    throw makeError('InvalidAccessError',
                        'Sender was not created by this connection.');
                }
                var stream = transceiver.stream;

                transceiver.rtpSender.stop();
                transceiver.rtpSender = null;
                transceiver.track = null;
                transceiver.stream = null;

                // remove the stream from the set of local streams
                var localStreams = this.transceivers.map(function(t) {
                    return t.stream;
                });
                if (localStreams.indexOf(stream) === -1 &&
                    this.localStreams.indexOf(stream) > -1) {
                    this.localStreams.splice(this.localStreams.indexOf(stream), 1);
                }

                this._maybeFireNegotiationNeeded();
            };

            RTCPeerConnection.prototype.removeStream = function(stream) {
                var pc = this;
                stream.getTracks().forEach(function(track) {
                    var sender = pc.getSenders().find(function(s) {
                        return s.track === track;
                    });
                    if (sender) {
                        pc.removeTrack(sender);
                    }
                });
            };

            RTCPeerConnection.prototype.getSenders = function() {
                return this.transceivers.filter(function(transceiver) {
                    return !!transceiver.rtpSender;
                })
                    .map(function(transceiver) {
                        return transceiver.rtpSender;
                    });
            };

            RTCPeerConnection.prototype.getReceivers = function() {
                return this.transceivers.filter(function(transceiver) {
                    return !!transceiver.rtpReceiver;
                })
                    .map(function(transceiver) {
                        return transceiver.rtpReceiver;
                    });
            };


            RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
                                                                      usingBundle) {
                var pc = this;
                if (usingBundle && sdpMLineIndex > 0) {
                    return this.transceivers[0].iceGatherer;
                } else if (this._iceGatherers.length) {
                    return this._iceGatherers.shift();
                }
                var iceGatherer = new window.RTCIceGatherer({
                    iceServers: this._config.iceServers,
                    gatherPolicy: this._config.iceTransportPolicy
                });
                Object.defineProperty(iceGatherer, 'state',
                    {value: 'new', writable: true}
                );

                this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
                this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
                    var end = !event.candidate || Object.keys(event.candidate).length === 0;
                    // polyfill since RTCIceGatherer.state is not implemented in
                    // Edge 10547 yet.
                    iceGatherer.state = end ? 'completed' : 'gathering';
                    if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
                        pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
                    }
                };
                iceGatherer.addEventListener('localcandidate',
                    this.transceivers[sdpMLineIndex].bufferCandidates);
                return iceGatherer;
            };

            // start gathering from an RTCIceGatherer.
            RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
                var pc = this;
                var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                if (iceGatherer.onlocalcandidate) {
                    return;
                }
                var bufferedCandidateEvents =
                    this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
                this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
                iceGatherer.removeEventListener('localcandidate',
                    this.transceivers[sdpMLineIndex].bufferCandidates);
                iceGatherer.onlocalcandidate = function(evt) {
                    if (pc.usingBundle && sdpMLineIndex > 0) {
                        // if we know that we use bundle we can drop candidates with
                        // ѕdpMLineIndex > 0. If we don't do this then our state gets
                        // confused since we dispose the extra ice gatherer.
                        return;
                    }
                    var event = new Event('icecandidate');
                    event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

                    var cand = evt.candidate;
                    // Edge emits an empty object for RTCIceCandidateComplete‥
                    var end = !cand || Object.keys(cand).length === 0;
                    if (end) {
                        // polyfill since RTCIceGatherer.state is not implemented in
                        // Edge 10547 yet.
                        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
                            iceGatherer.state = 'completed';
                        }
                    } else {
                        if (iceGatherer.state === 'new') {
                            iceGatherer.state = 'gathering';
                        }
                        // RTCIceCandidate doesn't have a component, needs to be added
                        cand.component = 1;
                        // also the usernameFragment. TODO: update SDP to take both variants.
                        cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

                        var serializedCandidate = SDPUtils.writeCandidate(cand);
                        event.candidate = Object.assign(event.candidate,
                            SDPUtils.parseCandidate(serializedCandidate));

                        event.candidate.candidate = serializedCandidate;
                        event.candidate.toJSON = function() {
                            return {
                                candidate: event.candidate.candidate,
                                sdpMid: event.candidate.sdpMid,
                                sdpMLineIndex: event.candidate.sdpMLineIndex,
                                usernameFragment: event.candidate.usernameFragment
                            };
                        };
                    }

                    // update local description.
                    var sections = SDPUtils.getMediaSections(pc.localDescription.sdp);
                    if (!end) {
                        sections[event.candidate.sdpMLineIndex] +=
                            'a=' + event.candidate.candidate + '\r\n';
                    } else {
                        sections[event.candidate.sdpMLineIndex] +=
                            'a=end-of-candidates\r\n';
                    }
                    pc.localDescription.sdp =
                        SDPUtils.getDescription(pc.localDescription.sdp) +
                        sections.join('');
                    var complete = pc.transceivers.every(function(transceiver) {
                        return transceiver.iceGatherer &&
                            transceiver.iceGatherer.state === 'completed';
                    });

                    if (pc.iceGatheringState !== 'gathering') {
                        pc.iceGatheringState = 'gathering';
                        pc._emitGatheringStateChange();
                    }

                    // Emit candidate. Also emit null candidate when all gatherers are
                    // complete.
                    if (!end) {
                        pc._dispatchEvent('icecandidate', event);
                    }
                    if (complete) {
                        pc._dispatchEvent('icecandidate', new Event('icecandidate'));
                        pc.iceGatheringState = 'complete';
                        pc._emitGatheringStateChange();
                    }
                };

                // emit already gathered candidates.
                window.setTimeout(function() {
                    bufferedCandidateEvents.forEach(function(e) {
                        iceGatherer.onlocalcandidate(e);
                    });
                }, 0);
            };

            // Create ICE transport and DTLS transport.
            RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
                var pc = this;
                var iceTransport = new window.RTCIceTransport(null);
                iceTransport.onicestatechange = function() {
                    pc._updateIceConnectionState();
                    pc._updateConnectionState();
                };

                var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
                dtlsTransport.ondtlsstatechange = function() {
                    pc._updateConnectionState();
                };
                dtlsTransport.onerror = function() {
                    // onerror does not set state to failed by itself.
                    Object.defineProperty(dtlsTransport, 'state',
                        {value: 'failed', writable: true});
                    pc._updateConnectionState();
                };

                return {
                    iceTransport: iceTransport,
                    dtlsTransport: dtlsTransport
                };
            };

            // Destroy ICE gatherer, ICE transport and DTLS transport.
            // Without triggering the callbacks.
            RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
                sdpMLineIndex) {
                var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                if (iceGatherer) {
                    delete iceGatherer.onlocalcandidate;
                    delete this.transceivers[sdpMLineIndex].iceGatherer;
                }
                var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
                if (iceTransport) {
                    delete iceTransport.onicestatechange;
                    delete this.transceivers[sdpMLineIndex].iceTransport;
                }
                var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
                if (dtlsTransport) {
                    delete dtlsTransport.ondtlsstatechange;
                    delete dtlsTransport.onerror;
                    delete this.transceivers[sdpMLineIndex].dtlsTransport;
                }
            };

            // Start the RTP Sender and Receiver for a transceiver.
            RTCPeerConnection.prototype._transceive = function(transceiver,
                                                               send, recv) {
                var params = getCommonCapabilities(transceiver.localCapabilities,
                    transceiver.remoteCapabilities);
                if (send && transceiver.rtpSender) {
                    params.encodings = transceiver.sendEncodingParameters;
                    params.rtcp = {
                        cname: SDPUtils.localCName,
                        compound: transceiver.rtcpParameters.compound
                    };
                    if (transceiver.recvEncodingParameters.length) {
                        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
                    }
                    transceiver.rtpSender.send(params);
                }
                if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
                    // remove RTX field in Edge 14942
                    if (transceiver.kind === 'video'
                        && transceiver.recvEncodingParameters
                        && edgeVersion < 15019) {
                        transceiver.recvEncodingParameters.forEach(function(p) {
                            delete p.rtx;
                        });
                    }
                    if (transceiver.recvEncodingParameters.length) {
                        params.encodings = transceiver.recvEncodingParameters;
                    } else {
                        params.encodings = [{}];
                    }
                    params.rtcp = {
                        compound: transceiver.rtcpParameters.compound
                    };
                    if (transceiver.rtcpParameters.cname) {
                        params.rtcp.cname = transceiver.rtcpParameters.cname;
                    }
                    if (transceiver.sendEncodingParameters.length) {
                        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
                    }
                    transceiver.rtpReceiver.receive(params);
                }
            };

            RTCPeerConnection.prototype.setLocalDescription = function(description) {
                var pc = this;

                // Note: pranswer is not supported.
                if (['offer', 'answer'].indexOf(description.type) === -1) {
                    return Promise.reject(makeError('TypeError',
                        'Unsupported type "' + description.type + '"'));
                }

                if (!isActionAllowedInSignalingState('setLocalDescription',
                        description.type, pc.signalingState) || pc._isClosed) {
                    return Promise.reject(makeError('InvalidStateError',
                        'Can not set local ' + description.type +
                        ' in state ' + pc.signalingState));
                }

                var sections;
                var sessionpart;
                if (description.type === 'offer') {
                    // VERY limited support for SDP munging. Limited to:
                    // * changing the order of codecs
                    sections = SDPUtils.splitSections(description.sdp);
                    sessionpart = sections.shift();
                    sections.forEach(function(mediaSection, sdpMLineIndex) {
                        var caps = SDPUtils.parseRtpParameters(mediaSection);
                        pc.transceivers[sdpMLineIndex].localCapabilities = caps;
                    });

                    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                        pc._gather(transceiver.mid, sdpMLineIndex);
                    });
                } else if (description.type === 'answer') {
                    sections = SDPUtils.splitSections(pc.remoteDescription.sdp);
                    sessionpart = sections.shift();
                    var isIceLite = SDPUtils.matchPrefix(sessionpart,
                        'a=ice-lite').length > 0;
                    sections.forEach(function(mediaSection, sdpMLineIndex) {
                        var transceiver = pc.transceivers[sdpMLineIndex];
                        var iceGatherer = transceiver.iceGatherer;
                        var iceTransport = transceiver.iceTransport;
                        var dtlsTransport = transceiver.dtlsTransport;
                        var localCapabilities = transceiver.localCapabilities;
                        var remoteCapabilities = transceiver.remoteCapabilities;

                        // treat bundle-only as not-rejected.
                        var rejected = SDPUtils.isRejected(mediaSection) &&
                            SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

                        if (!rejected && !transceiver.rejected) {
                            var remoteIceParameters = SDPUtils.getIceParameters(
                                mediaSection, sessionpart);
                            var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                                mediaSection, sessionpart);
                            if (isIceLite) {
                                remoteDtlsParameters.role = 'server';
                            }

                            if (!pc.usingBundle || sdpMLineIndex === 0) {
                                pc._gather(transceiver.mid, sdpMLineIndex);
                                if (iceTransport.state === 'new') {
                                    iceTransport.start(iceGatherer, remoteIceParameters,
                                        isIceLite ? 'controlling' : 'controlled');
                                }
                                if (dtlsTransport.state === 'new') {
                                    dtlsTransport.start(remoteDtlsParameters);
                                }
                            }

                            // Calculate intersection of capabilities.
                            var params = getCommonCapabilities(localCapabilities,
                                remoteCapabilities);

                            // Start the RTCRtpSender. The RTCRtpReceiver for this
                            // transceiver has already been started in setRemoteDescription.
                            pc._transceive(transceiver,
                                params.codecs.length > 0,
                                false);
                        }
                    });
                }

                pc.localDescription = {
                    type: description.type,
                    sdp: description.sdp
                };
                if (description.type === 'offer') {
                    pc._updateSignalingState('have-local-offer');
                } else {
                    pc._updateSignalingState('stable');
                }

                return Promise.resolve();
            };

            RTCPeerConnection.prototype.setRemoteDescription = function(description) {
                var pc = this;

                // Note: pranswer is not supported.
                if (['offer', 'answer'].indexOf(description.type) === -1) {
                    return Promise.reject(makeError('TypeError',
                        'Unsupported type "' + description.type + '"'));
                }

                if (!isActionAllowedInSignalingState('setRemoteDescription',
                        description.type, pc.signalingState) || pc._isClosed) {
                    return Promise.reject(makeError('InvalidStateError',
                        'Can not set remote ' + description.type +
                        ' in state ' + pc.signalingState));
                }

                var streams = {};
                pc.remoteStreams.forEach(function(stream) {
                    streams[stream.id] = stream;
                });
                var receiverList = [];
                var sections = SDPUtils.splitSections(description.sdp);
                var sessionpart = sections.shift();
                var isIceLite = SDPUtils.matchPrefix(sessionpart,
                    'a=ice-lite').length > 0;
                var usingBundle = SDPUtils.matchPrefix(sessionpart,
                    'a=group:BUNDLE ').length > 0;
                pc.usingBundle = usingBundle;
                var iceOptions = SDPUtils.matchPrefix(sessionpart,
                    'a=ice-options:')[0];
                if (iceOptions) {
                    pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
                        .indexOf('trickle') >= 0;
                } else {
                    pc.canTrickleIceCandidates = false;
                }

                sections.forEach(function(mediaSection, sdpMLineIndex) {
                    var lines = SDPUtils.splitLines(mediaSection);
                    var kind = SDPUtils.getKind(mediaSection);
                    // treat bundle-only as not-rejected.
                    var rejected = SDPUtils.isRejected(mediaSection) &&
                        SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
                    var protocol = lines[0].substr(2).split(' ')[2];

                    var direction = SDPUtils.getDirection(mediaSection, sessionpart);
                    var remoteMsid = SDPUtils.parseMsid(mediaSection);

                    var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

                    // Reject datachannels which are not implemented yet.
                    if ((kind === 'application' && protocol === 'DTLS/SCTP') || rejected) {
                        // TODO: this is dangerous in the case where a non-rejected m-line
                        //     becomes rejected.
                        pc.transceivers[sdpMLineIndex] = {
                            mid: mid,
                            kind: kind,
                            rejected: true
                        };
                        return;
                    }

                    if (!rejected && pc.transceivers[sdpMLineIndex] &&
                        pc.transceivers[sdpMLineIndex].rejected) {
                        // recycle a rejected transceiver.
                        pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
                    }

                    var transceiver;
                    var iceGatherer;
                    var iceTransport;
                    var dtlsTransport;
                    var rtpReceiver;
                    var sendEncodingParameters;
                    var recvEncodingParameters;
                    var localCapabilities;

                    var track;
                    // FIXME: ensure the mediaSection has rtcp-mux set.
                    var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
                    var remoteIceParameters;
                    var remoteDtlsParameters;
                    if (!rejected) {
                        remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
                            sessionpart);
                        remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
                            sessionpart);
                        remoteDtlsParameters.role = 'client';
                    }
                    recvEncodingParameters =
                        SDPUtils.parseRtpEncodingParameters(mediaSection);

                    var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

                    var isComplete = SDPUtils.matchPrefix(mediaSection,
                        'a=end-of-candidates', sessionpart).length > 0;
                    var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
                        .map(function(cand) {
                            return SDPUtils.parseCandidate(cand);
                        })
                        .filter(function(cand) {
                            return cand.component === 1;
                        });

                    // Check if we can use BUNDLE and dispose transports.
                    if ((description.type === 'offer' || description.type === 'answer') &&
                        !rejected && usingBundle && sdpMLineIndex > 0 &&
                        pc.transceivers[sdpMLineIndex]) {
                        pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                        pc.transceivers[sdpMLineIndex].iceGatherer =
                            pc.transceivers[0].iceGatherer;
                        pc.transceivers[sdpMLineIndex].iceTransport =
                            pc.transceivers[0].iceTransport;
                        pc.transceivers[sdpMLineIndex].dtlsTransport =
                            pc.transceivers[0].dtlsTransport;
                        if (pc.transceivers[sdpMLineIndex].rtpSender) {
                            pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                                pc.transceivers[0].dtlsTransport);
                        }
                        if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                            pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                                pc.transceivers[0].dtlsTransport);
                        }
                    }
                    if (description.type === 'offer' && !rejected) {
                        transceiver = pc.transceivers[sdpMLineIndex] ||
                            pc._createTransceiver(kind);
                        transceiver.mid = mid;

                        if (!transceiver.iceGatherer) {
                            transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                                usingBundle);
                        }

                        if (cands.length && transceiver.iceTransport.state === 'new') {
                            if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                                transceiver.iceTransport.setRemoteCandidates(cands);
                            } else {
                                cands.forEach(function(candidate) {
                                    maybeAddCandidate(transceiver.iceTransport, candidate);
                                });
                            }
                        }

                        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

                        // filter RTX until additional stuff needed for RTX is implemented
                        // in adapter.js
                        if (edgeVersion < 15019) {
                            localCapabilities.codecs = localCapabilities.codecs.filter(
                                function(codec) {
                                    return codec.name !== 'rtx';
                                });
                        }

                        sendEncodingParameters = transceiver.sendEncodingParameters || [{
                            ssrc: (2 * sdpMLineIndex + 2) * 1001
                        }];

                        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                        var isNewTrack = false;
                        if (direction === 'sendrecv' || direction === 'sendonly') {
                            isNewTrack = !transceiver.rtpReceiver;
                            rtpReceiver = transceiver.rtpReceiver ||
                                new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

                            if (isNewTrack) {
                                var stream;
                                track = rtpReceiver.track;
                                // FIXME: does not work with Plan B.
                                if (remoteMsid && remoteMsid.stream === '-') {
                                    // no-op. a stream id of '-' means: no associated stream.
                                } else if (remoteMsid) {
                                    if (!streams[remoteMsid.stream]) {
                                        streams[remoteMsid.stream] = new window.MediaStream();
                                        Object.defineProperty(streams[remoteMsid.stream], 'id', {
                                            get: function() {
                                                return remoteMsid.stream;
                                            }
                                        });
                                    }
                                    Object.defineProperty(track, 'id', {
                                        get: function() {
                                            return remoteMsid.track;
                                        }
                                    });
                                    stream = streams[remoteMsid.stream];
                                } else {
                                    if (!streams.default) {
                                        streams.default = new window.MediaStream();
                                    }
                                    stream = streams.default;
                                }
                                if (stream) {
                                    addTrackToStreamAndFireEvent(track, stream);
                                    transceiver.associatedRemoteMediaStreams.push(stream);
                                }
                                receiverList.push([track, rtpReceiver, stream]);
                            }
                        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                            transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                                var nativeTrack = s.getTracks().find(function(t) {
                                    return t.id === transceiver.rtpReceiver.track.id;
                                });
                                if (nativeTrack) {
                                    removeTrackFromStreamAndFireEvent(nativeTrack, s);
                                }
                            });
                            transceiver.associatedRemoteMediaStreams = [];
                        }

                        transceiver.localCapabilities = localCapabilities;
                        transceiver.remoteCapabilities = remoteCapabilities;
                        transceiver.rtpReceiver = rtpReceiver;
                        transceiver.rtcpParameters = rtcpParameters;
                        transceiver.sendEncodingParameters = sendEncodingParameters;
                        transceiver.recvEncodingParameters = recvEncodingParameters;

                        // Start the RTCRtpReceiver now. The RTPSender is started in
                        // setLocalDescription.
                        pc._transceive(pc.transceivers[sdpMLineIndex],
                            false,
                            isNewTrack);
                    } else if (description.type === 'answer' && !rejected) {
                        transceiver = pc.transceivers[sdpMLineIndex];
                        iceGatherer = transceiver.iceGatherer;
                        iceTransport = transceiver.iceTransport;
                        dtlsTransport = transceiver.dtlsTransport;
                        rtpReceiver = transceiver.rtpReceiver;
                        sendEncodingParameters = transceiver.sendEncodingParameters;
                        localCapabilities = transceiver.localCapabilities;

                        pc.transceivers[sdpMLineIndex].recvEncodingParameters =
                            recvEncodingParameters;
                        pc.transceivers[sdpMLineIndex].remoteCapabilities =
                            remoteCapabilities;
                        pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

                        if (cands.length && iceTransport.state === 'new') {
                            if ((isIceLite || isComplete) &&
                                (!usingBundle || sdpMLineIndex === 0)) {
                                iceTransport.setRemoteCandidates(cands);
                            } else {
                                cands.forEach(function(candidate) {
                                    maybeAddCandidate(transceiver.iceTransport, candidate);
                                });
                            }
                        }

                        if (!usingBundle || sdpMLineIndex === 0) {
                            if (iceTransport.state === 'new') {
                                iceTransport.start(iceGatherer, remoteIceParameters,
                                    'controlling');
                            }
                            if (dtlsTransport.state === 'new') {
                                dtlsTransport.start(remoteDtlsParameters);
                            }
                        }

                        pc._transceive(transceiver,
                            direction === 'sendrecv' || direction === 'recvonly',
                            direction === 'sendrecv' || direction === 'sendonly');

                        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                        if (rtpReceiver &&
                            (direction === 'sendrecv' || direction === 'sendonly')) {
                            track = rtpReceiver.track;
                            if (remoteMsid) {
                                if (!streams[remoteMsid.stream]) {
                                    streams[remoteMsid.stream] = new window.MediaStream();
                                }
                                addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                                receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                            } else {
                                if (!streams.default) {
                                    streams.default = new window.MediaStream();
                                }
                                addTrackToStreamAndFireEvent(track, streams.default);
                                receiverList.push([track, rtpReceiver, streams.default]);
                            }
                        } else {
                            // FIXME: actually the receiver should be created later.
                            delete transceiver.rtpReceiver;
                        }
                    }
                });

                if (pc._dtlsRole === undefined) {
                    pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
                }

                pc.remoteDescription = {
                    type: description.type,
                    sdp: description.sdp
                };
                if (description.type === 'offer') {
                    pc._updateSignalingState('have-remote-offer');
                } else {
                    pc._updateSignalingState('stable');
                }
                Object.keys(streams).forEach(function(sid) {
                    var stream = streams[sid];
                    if (stream.getTracks().length) {
                        if (pc.remoteStreams.indexOf(stream) === -1) {
                            pc.remoteStreams.push(stream);
                            var event = new Event('addstream');
                            event.stream = stream;
                            window.setTimeout(function() {
                                pc._dispatchEvent('addstream', event);
                            });
                        }

                        receiverList.forEach(function(item) {
                            var track = item[0];
                            var receiver = item[1];
                            if (stream.id !== item[2].id) {
                                return;
                            }
                            fireAddTrack(pc, track, receiver, [stream]);
                        });
                    }
                });
                receiverList.forEach(function(item) {
                    if (item[2]) {
                        return;
                    }
                    fireAddTrack(pc, item[0], item[1], []);
                });

                // check whether addIceCandidate({}) was called within four seconds after
                // setRemoteDescription.
                window.setTimeout(function() {
                    if (!(pc && pc.transceivers)) {
                        return;
                    }
                    pc.transceivers.forEach(function(transceiver) {
                        if (transceiver.iceTransport &&
                            transceiver.iceTransport.state === 'new' &&
                            transceiver.iceTransport.getRemoteCandidates().length > 0) {
                            console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                                'an end-of-candidates notification');
                            transceiver.iceTransport.addRemoteCandidate({});
                        }
                    });
                }, 4000);

                return Promise.resolve();
            };

            RTCPeerConnection.prototype.close = function() {
                this.transceivers.forEach(function(transceiver) {
                    /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */
                    if (transceiver.iceTransport) {
                        transceiver.iceTransport.stop();
                    }
                    if (transceiver.dtlsTransport) {
                        transceiver.dtlsTransport.stop();
                    }
                    if (transceiver.rtpSender) {
                        transceiver.rtpSender.stop();
                    }
                    if (transceiver.rtpReceiver) {
                        transceiver.rtpReceiver.stop();
                    }
                });
                // FIXME: clean up tracks, local streams, remote streams, etc
                this._isClosed = true;
                this._updateSignalingState('closed');
            };

            // Update the signaling state.
            RTCPeerConnection.prototype._updateSignalingState = function(newState) {
                this.signalingState = newState;
                var event = new Event('signalingstatechange');
                this._dispatchEvent('signalingstatechange', event);
            };

            // Determine whether to fire the negotiationneeded event.
            RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
                var pc = this;
                if (this.signalingState !== 'stable' || this.needNegotiation === true) {
                    return;
                }
                this.needNegotiation = true;
                window.setTimeout(function() {
                    if (pc.needNegotiation) {
                        pc.needNegotiation = false;
                        var event = new Event('negotiationneeded');
                        pc._dispatchEvent('negotiationneeded', event);
                    }
                }, 0);
            };

            // Update the ice connection state.
            RTCPeerConnection.prototype._updateIceConnectionState = function() {
                var newState;
                var states = {
                    'new': 0,
                    closed: 0,
                    checking: 0,
                    connected: 0,
                    completed: 0,
                    disconnected: 0,
                    failed: 0
                };
                this.transceivers.forEach(function(transceiver) {
                    states[transceiver.iceTransport.state]++;
                });

                newState = 'new';
                if (states.failed > 0) {
                    newState = 'failed';
                } else if (states.checking > 0) {
                    newState = 'checking';
                } else if (states.disconnected > 0) {
                    newState = 'disconnected';
                } else if (states.new > 0) {
                    newState = 'new';
                } else if (states.connected > 0) {
                    newState = 'connected';
                } else if (states.completed > 0) {
                    newState = 'completed';
                }

                if (newState !== this.iceConnectionState) {
                    this.iceConnectionState = newState;
                    var event = new Event('iceconnectionstatechange');
                    this._dispatchEvent('iceconnectionstatechange', event);
                }
            };

            // Update the connection state.
            RTCPeerConnection.prototype._updateConnectionState = function() {
                var newState;
                var states = {
                    'new': 0,
                    closed: 0,
                    connecting: 0,
                    connected: 0,
                    completed: 0,
                    disconnected: 0,
                    failed: 0
                };
                this.transceivers.forEach(function(transceiver) {
                    states[transceiver.iceTransport.state]++;
                    states[transceiver.dtlsTransport.state]++;
                });
                // ICETransport.completed and connected are the same for this purpose.
                states.connected += states.completed;

                newState = 'new';
                if (states.failed > 0) {
                    newState = 'failed';
                } else if (states.connecting > 0) {
                    newState = 'connecting';
                } else if (states.disconnected > 0) {
                    newState = 'disconnected';
                } else if (states.new > 0) {
                    newState = 'new';
                } else if (states.connected > 0) {
                    newState = 'connected';
                }

                if (newState !== this.connectionState) {
                    this.connectionState = newState;
                    var event = new Event('connectionstatechange');
                    this._dispatchEvent('connectionstatechange', event);
                }
            };

            RTCPeerConnection.prototype.createOffer = function() {
                var pc = this;

                if (pc._isClosed) {
                    return Promise.reject(makeError('InvalidStateError',
                        'Can not call createOffer after close'));
                }

                var numAudioTracks = pc.transceivers.filter(function(t) {
                    return t.kind === 'audio';
                }).length;
                var numVideoTracks = pc.transceivers.filter(function(t) {
                    return t.kind === 'video';
                }).length;

                // Determine number of audio and video tracks we need to send/recv.
                var offerOptions = arguments[0];
                if (offerOptions) {
                    // Reject Chrome legacy constraints.
                    if (offerOptions.mandatory || offerOptions.optional) {
                        throw new TypeError(
                            'Legacy mandatory/optional constraints not supported.');
                    }
                    if (offerOptions.offerToReceiveAudio !== undefined) {
                        if (offerOptions.offerToReceiveAudio === true) {
                            numAudioTracks = 1;
                        } else if (offerOptions.offerToReceiveAudio === false) {
                            numAudioTracks = 0;
                        } else {
                            numAudioTracks = offerOptions.offerToReceiveAudio;
                        }
                    }
                    if (offerOptions.offerToReceiveVideo !== undefined) {
                        if (offerOptions.offerToReceiveVideo === true) {
                            numVideoTracks = 1;
                        } else if (offerOptions.offerToReceiveVideo === false) {
                            numVideoTracks = 0;
                        } else {
                            numVideoTracks = offerOptions.offerToReceiveVideo;
                        }
                    }
                }

                pc.transceivers.forEach(function(transceiver) {
                    if (transceiver.kind === 'audio') {
                        numAudioTracks--;
                        if (numAudioTracks < 0) {
                            transceiver.wantReceive = false;
                        }
                    } else if (transceiver.kind === 'video') {
                        numVideoTracks--;
                        if (numVideoTracks < 0) {
                            transceiver.wantReceive = false;
                        }
                    }
                });

                // Create M-lines for recvonly streams.
                while (numAudioTracks > 0 || numVideoTracks > 0) {
                    if (numAudioTracks > 0) {
                        pc._createTransceiver('audio');
                        numAudioTracks--;
                    }
                    if (numVideoTracks > 0) {
                        pc._createTransceiver('video');
                        numVideoTracks--;
                    }
                }

                var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
                    pc._sdpSessionVersion++);
                pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                    // For each track, create an ice gatherer, ice transport,
                    // dtls transport, potentially rtpsender and rtpreceiver.
                    var track = transceiver.track;
                    var kind = transceiver.kind;
                    var mid = transceiver.mid || SDPUtils.generateIdentifier();
                    transceiver.mid = mid;

                    if (!transceiver.iceGatherer) {
                        transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                            pc.usingBundle);
                    }

                    var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
                    // filter RTX until additional stuff needed for RTX is implemented
                    // in adapter.js
                    if (edgeVersion < 15019) {
                        localCapabilities.codecs = localCapabilities.codecs.filter(
                            function(codec) {
                                return codec.name !== 'rtx';
                            });
                    }
                    localCapabilities.codecs.forEach(function(codec) {
                        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                        // by adding level-asymmetry-allowed=1
                        if (codec.name === 'H264' &&
                            codec.parameters['level-asymmetry-allowed'] === undefined) {
                            codec.parameters['level-asymmetry-allowed'] = '1';
                        }

                        // for subsequent offers, we might have to re-use the payload
                        // type of the last offer.
                        if (transceiver.remoteCapabilities &&
                            transceiver.remoteCapabilities.codecs) {
                            transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                                if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                                    codec.clockRate === remoteCodec.clockRate) {
                                    codec.preferredPayloadType = remoteCodec.payloadType;
                                }
                            });
                        }
                    });
                    localCapabilities.headerExtensions.forEach(function(hdrExt) {
                        var remoteExtensions = transceiver.remoteCapabilities &&
                            transceiver.remoteCapabilities.headerExtensions || [];
                        remoteExtensions.forEach(function(rHdrExt) {
                            if (hdrExt.uri === rHdrExt.uri) {
                                hdrExt.id = rHdrExt.id;
                            }
                        });
                    });

                    // generate an ssrc now, to be used later in rtpSender.send
                    var sendEncodingParameters = transceiver.sendEncodingParameters || [{
                        ssrc: (2 * sdpMLineIndex + 1) * 1001
                    }];
                    if (track) {
                        // add RTX
                        if (edgeVersion >= 15019 && kind === 'video' &&
                            !sendEncodingParameters[0].rtx) {
                            sendEncodingParameters[0].rtx = {
                                ssrc: sendEncodingParameters[0].ssrc + 1
                            };
                        }
                    }

                    if (transceiver.wantReceive) {
                        transceiver.rtpReceiver = new window.RTCRtpReceiver(
                            transceiver.dtlsTransport, kind);
                    }

                    transceiver.localCapabilities = localCapabilities;
                    transceiver.sendEncodingParameters = sendEncodingParameters;
                });

                // always offer BUNDLE and dispose on return if not supported.
                if (pc._config.bundlePolicy !== 'max-compat') {
                    sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
                        return t.mid;
                    }).join(' ') + '\r\n';
                }
                sdp += 'a=ice-options:trickle\r\n';

                pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                    sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
                        'offer', transceiver.stream, pc._dtlsRole);
                    sdp += 'a=rtcp-rsize\r\n';

                    if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
                        (sdpMLineIndex === 0 || !pc.usingBundle)) {
                        transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
                            cand.component = 1;
                            sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
                        });

                        if (transceiver.iceGatherer.state === 'completed') {
                            sdp += 'a=end-of-candidates\r\n';
                        }
                    }
                });

                var desc = new window.RTCSessionDescription({
                    type: 'offer',
                    sdp: sdp
                });
                return Promise.resolve(desc);
            };

            RTCPeerConnection.prototype.createAnswer = function() {
                var pc = this;

                if (pc._isClosed) {
                    return Promise.reject(makeError('InvalidStateError',
                        'Can not call createAnswer after close'));
                }

                if (!(pc.signalingState === 'have-remote-offer' ||
                        pc.signalingState === 'have-local-pranswer')) {
                    return Promise.reject(makeError('InvalidStateError',
                        'Can not call createAnswer in signalingState ' + pc.signalingState));
                }

                var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
                    pc._sdpSessionVersion++);
                if (pc.usingBundle) {
                    sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
                        return t.mid;
                    }).join(' ') + '\r\n';
                }
                var mediaSectionsInOffer = SDPUtils.getMediaSections(
                    pc.remoteDescription.sdp).length;
                pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                    if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
                        return;
                    }
                    if (transceiver.rejected) {
                        if (transceiver.kind === 'application') {
                            sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                        } else if (transceiver.kind === 'audio') {
                            sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                                'a=rtpmap:0 PCMU/8000\r\n';
                        } else if (transceiver.kind === 'video') {
                            sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                                'a=rtpmap:120 VP8/90000\r\n';
                        }
                        sdp += 'c=IN IP4 0.0.0.0\r\n' +
                            'a=inactive\r\n' +
                            'a=mid:' + transceiver.mid + '\r\n';
                        return;
                    }

                    // FIXME: look at direction.
                    if (transceiver.stream) {
                        var localTrack;
                        if (transceiver.kind === 'audio') {
                            localTrack = transceiver.stream.getAudioTracks()[0];
                        } else if (transceiver.kind === 'video') {
                            localTrack = transceiver.stream.getVideoTracks()[0];
                        }
                        if (localTrack) {
                            // add RTX
                            if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                                !transceiver.sendEncodingParameters[0].rtx) {
                                transceiver.sendEncodingParameters[0].rtx = {
                                    ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                                };
                            }
                        }
                    }

                    // Calculate intersection of capabilities.
                    var commonCapabilities = getCommonCapabilities(
                        transceiver.localCapabilities,
                        transceiver.remoteCapabilities);

                    var hasRtx = commonCapabilities.codecs.filter(function(c) {
                        return c.name.toLowerCase() === 'rtx';
                    }).length;
                    if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                        delete transceiver.sendEncodingParameters[0].rtx;
                    }

                    sdp += writeMediaSection(transceiver, commonCapabilities,
                        'answer', transceiver.stream, pc._dtlsRole);
                    if (transceiver.rtcpParameters &&
                        transceiver.rtcpParameters.reducedSize) {
                        sdp += 'a=rtcp-rsize\r\n';
                    }
                });

                var desc = new window.RTCSessionDescription({
                    type: 'answer',
                    sdp: sdp
                });
                return Promise.resolve(desc);
            };

            RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
                var pc = this;
                var sections;
                if (candidate && !(candidate.sdpMLineIndex !== undefined ||
                        candidate.sdpMid)) {
                    return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
                }

                // TODO: needs to go into ops queue.
                return new Promise(function(resolve, reject) {
                    if (!pc.remoteDescription) {
                        return reject(makeError('InvalidStateError',
                            'Can not add ICE candidate without a remote description'));
                    } else if (!candidate || candidate.candidate === '') {
                        for (var j = 0; j < pc.transceivers.length; j++) {
                            if (pc.transceivers[j].rejected) {
                                continue;
                            }
                            pc.transceivers[j].iceTransport.addRemoteCandidate({});
                            sections = SDPUtils.getMediaSections(pc.remoteDescription.sdp);
                            sections[j] += 'a=end-of-candidates\r\n';
                            pc.remoteDescription.sdp =
                                SDPUtils.getDescription(pc.remoteDescription.sdp) +
                                sections.join('');
                            if (pc.usingBundle) {
                                break;
                            }
                        }
                    } else {
                        var sdpMLineIndex = candidate.sdpMLineIndex;
                        if (candidate.sdpMid) {
                            for (var i = 0; i < pc.transceivers.length; i++) {
                                if (pc.transceivers[i].mid === candidate.sdpMid) {
                                    sdpMLineIndex = i;
                                    break;
                                }
                            }
                        }
                        var transceiver = pc.transceivers[sdpMLineIndex];
                        if (transceiver) {
                            if (transceiver.rejected) {
                                return resolve();
                            }
                            var cand = Object.keys(candidate.candidate).length > 0 ?
                                SDPUtils.parseCandidate(candidate.candidate) : {};
                            // Ignore Chrome's invalid candidates since Edge does not like them.
                            if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                                return resolve();
                            }
                            // Ignore RTCP candidates, we assume RTCP-MUX.
                            if (cand.component && cand.component !== 1) {
                                return resolve();
                            }
                            // when using bundle, avoid adding candidates to the wrong
                            // ice transport. And avoid adding candidates added in the SDP.
                            if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                                    transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
                                if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                                    return reject(makeError('OperationError',
                                        'Can not add ICE candidate'));
                                }
                            }

                            // update the remoteDescription.
                            var candidateString = candidate.candidate.trim();
                            if (candidateString.indexOf('a=') === 0) {
                                candidateString = candidateString.substr(2);
                            }
                            sections = SDPUtils.getMediaSections(pc.remoteDescription.sdp);
                            sections[sdpMLineIndex] += 'a=' +
                                (cand.type ? candidateString : 'end-of-candidates')
                                + '\r\n';
                            pc.remoteDescription.sdp =
                                SDPUtils.getDescription(pc.remoteDescription.sdp) +
                                sections.join('');
                        } else {
                            return reject(makeError('OperationError',
                                'Can not add ICE candidate'));
                        }
                    }
                    resolve();
                });
            };

            RTCPeerConnection.prototype.getStats = function(selector) {
                if (selector && selector instanceof window.MediaStreamTrack) {
                    var senderOrReceiver = null;
                    this.transceivers.forEach(function(transceiver) {
                        if (transceiver.rtpSender &&
                            transceiver.rtpSender.track === selector) {
                            senderOrReceiver = transceiver.rtpSender;
                        } else if (transceiver.rtpReceiver &&
                            transceiver.rtpReceiver.track === selector) {
                            senderOrReceiver = transceiver.rtpReceiver;
                        }
                    });
                    if (!senderOrReceiver) {
                        throw makeError('InvalidAccessError', 'Invalid selector.');
                    }
                    return senderOrReceiver.getStats();
                }

                var promises = [];
                this.transceivers.forEach(function(transceiver) {
                    ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
                        'dtlsTransport'].forEach(function(method) {
                        if (transceiver[method]) {
                            promises.push(transceiver[method].getStats());
                        }
                    });
                });
                return Promise.all(promises).then(function(allStats) {
                    var results = new Map();
                    allStats.forEach(function(stats) {
                        stats.forEach(function(stat) {
                            results.set(stat.id, stat);
                        });
                    });
                    return results;
                });
            };

            // fix low-level stat names and return Map instead of object.
            var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
                'RTCIceTransport', 'RTCDtlsTransport'];
            ortcObjects.forEach(function(ortcObjectName) {
                var obj = window[ortcObjectName];
                if (obj && obj.prototype && obj.prototype.getStats) {
                    var nativeGetstats = obj.prototype.getStats;
                    obj.prototype.getStats = function() {
                        return nativeGetstats.apply(this)
                            .then(function(nativeStats) {
                                var mapStats = new Map();
                                Object.keys(nativeStats).forEach(function(id) {
                                    nativeStats[id].type = fixStatsType(nativeStats[id]);
                                    mapStats.set(id, nativeStats[id]);
                                });
                                return mapStats;
                            });
                    };
                }
            });

            // legacy callback shims. Should be moved to adapter.js some days.
            var methods = ['createOffer', 'createAnswer'];
            methods.forEach(function(method) {
                var nativeMethod = RTCPeerConnection.prototype[method];
                RTCPeerConnection.prototype[method] = function() {
                    var args = arguments;
                    if (typeof args[0] === 'function' ||
                        typeof args[1] === 'function') { // legacy
                        return nativeMethod.apply(this, [arguments[2]])
                            .then(function(description) {
                                if (typeof args[0] === 'function') {
                                    args[0].apply(null, [description]);
                                }
                            }, function(error) {
                                if (typeof args[1] === 'function') {
                                    args[1].apply(null, [error]);
                                }
                            });
                    }
                    return nativeMethod.apply(this, arguments);
                };
            });

            methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
            methods.forEach(function(method) {
                var nativeMethod = RTCPeerConnection.prototype[method];
                RTCPeerConnection.prototype[method] = function() {
                    var args = arguments;
                    if (typeof args[1] === 'function' ||
                        typeof args[2] === 'function') { // legacy
                        return nativeMethod.apply(this, arguments)
                            .then(function() {
                                if (typeof args[1] === 'function') {
                                    args[1].apply(null);
                                }
                            }, function(error) {
                                if (typeof args[2] === 'function') {
                                    args[2].apply(null, [error]);
                                }
                            });
                    }
                    return nativeMethod.apply(this, arguments);
                };
            });

            // getStats is special. It doesn't have a spec legacy method yet we support
            // getStats(something, cb) without error callbacks.
            ['getStats'].forEach(function(method) {
                var nativeMethod = RTCPeerConnection.prototype[method];
                RTCPeerConnection.prototype[method] = function() {
                    var args = arguments;
                    if (typeof args[1] === 'function') {
                        return nativeMethod.apply(this, arguments)
                            .then(function() {
                                if (typeof args[1] === 'function') {
                                    args[1].apply(null);
                                }
                            });
                    }
                    return nativeMethod.apply(this, arguments);
                };
            });

            return RTCPeerConnection;
        };

    },{"sdp":2}],2:[function(require,module,exports){
        /* eslint-env node */
        'use strict';

// SDP helpers.
        var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
        SDPUtils.generateIdentifier = function() {
            return Math.random().toString(36).substr(2, 10);
        };

// The RTCP CNAME used by all peerconnections from the same JS.
        SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
        SDPUtils.splitLines = function(blob) {
            return blob.trim().split('\n').map(function(line) {
                return line.trim();
            });
        };
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
        SDPUtils.splitSections = function(blob) {
            var parts = blob.split('\nm=');
            return parts.map(function(part, index) {
                return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
            });
        };

// returns the session description.
        SDPUtils.getDescription = function(blob) {
            var sections = SDPUtils.splitSections(blob);
            return sections && sections[0];
        };

// returns the individual media sections.
        SDPUtils.getMediaSections = function(blob) {
            var sections = SDPUtils.splitSections(blob);
            sections.shift();
            return sections;
        };

// Returns lines that start with a certain prefix.
        SDPUtils.matchPrefix = function(blob, prefix) {
            return SDPUtils.splitLines(blob).filter(function(line) {
                return line.indexOf(prefix) === 0;
            });
        };

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
        SDPUtils.parseCandidate = function(line) {
            var parts;
            // Parse both variants.
            if (line.indexOf('a=candidate:') === 0) {
                parts = line.substring(12).split(' ');
            } else {
                parts = line.substring(10).split(' ');
            }

            var candidate = {
                foundation: parts[0],
                component: parseInt(parts[1], 10),
                protocol: parts[2].toLowerCase(),
                priority: parseInt(parts[3], 10),
                ip: parts[4],
                port: parseInt(parts[5], 10),
                // skip parts[6] == 'typ'
                type: parts[7]
            };

            for (var i = 8; i < parts.length; i += 2) {
                switch (parts[i]) {
                    case 'raddr':
                        candidate.relatedAddress = parts[i + 1];
                        break;
                    case 'rport':
                        candidate.relatedPort = parseInt(parts[i + 1], 10);
                        break;
                    case 'tcptype':
                        candidate.tcpType = parts[i + 1];
                        break;
                    case 'ufrag':
                        candidate.ufrag = parts[i + 1]; // for backward compability.
                        candidate.usernameFragment = parts[i + 1];
                        break;
                    default: // extension handling, in particular ufrag
                        candidate[parts[i]] = parts[i + 1];
                        break;
                }
            }
            return candidate;
        };

// Translates a candidate object into SDP candidate attribute.
        SDPUtils.writeCandidate = function(candidate) {
            var sdp = [];
            sdp.push(candidate.foundation);
            sdp.push(candidate.component);
            sdp.push(candidate.protocol.toUpperCase());
            sdp.push(candidate.priority);
            sdp.push(candidate.ip);
            sdp.push(candidate.port);

            var type = candidate.type;
            sdp.push('typ');
            sdp.push(type);
            if (type !== 'host' && candidate.relatedAddress &&
                candidate.relatedPort) {
                sdp.push('raddr');
                sdp.push(candidate.relatedAddress);
                sdp.push('rport');
                sdp.push(candidate.relatedPort);
            }
            if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
                sdp.push('tcptype');
                sdp.push(candidate.tcpType);
            }
            if (candidate.usernameFragment || candidate.ufrag) {
                sdp.push('ufrag');
                sdp.push(candidate.usernameFragment || candidate.ufrag);
            }
            return 'candidate:' + sdp.join(' ');
        };

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
        SDPUtils.parseIceOptions = function(line) {
            return line.substr(14).split(' ');
        }

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
        SDPUtils.parseRtpMap = function(line) {
            var parts = line.substr(9).split(' ');
            var parsed = {
                payloadType: parseInt(parts.shift(), 10) // was: id
            };

            parts = parts[0].split('/');

            parsed.name = parts[0];
            parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
            parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
            // legacy alias, got renamed back to channels in ORTC.
            parsed.numChannels = parsed.channels;
            return parsed;
        };

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
        SDPUtils.writeRtpMap = function(codec) {
            var pt = codec.payloadType;
            if (codec.preferredPayloadType !== undefined) {
                pt = codec.preferredPayloadType;
            }
            var channels = codec.channels || codec.numChannels || 1;
            return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
                (channels !== 1 ? '/' + channels : '') + '\r\n';
        };

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
        SDPUtils.parseExtmap = function(line) {
            var parts = line.substr(9).split(' ');
            return {
                id: parseInt(parts[0], 10),
                direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
                uri: parts[1]
            };
        };

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
        SDPUtils.writeExtmap = function(headerExtension) {
            return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
                (headerExtension.direction && headerExtension.direction !== 'sendrecv'
                    ? '/' + headerExtension.direction
                    : '') +
                ' ' + headerExtension.uri + '\r\n';
        };

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
        SDPUtils.parseFmtp = function(line) {
            var parsed = {};
            var kv;
            var parts = line.substr(line.indexOf(' ') + 1).split(';');
            for (var j = 0; j < parts.length; j++) {
                kv = parts[j].trim().split('=');
                parsed[kv[0].trim()] = kv[1];
            }
            return parsed;
        };

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
        SDPUtils.writeFmtp = function(codec) {
            var line = '';
            var pt = codec.payloadType;
            if (codec.preferredPayloadType !== undefined) {
                pt = codec.preferredPayloadType;
            }
            if (codec.parameters && Object.keys(codec.parameters).length) {
                var params = [];
                Object.keys(codec.parameters).forEach(function(param) {
                    if (codec.parameters[param]) {
                        params.push(param + '=' + codec.parameters[param]);
                    } else {
                        params.push(param);
                    }
                });
                line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
            }
            return line;
        };

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
        SDPUtils.parseRtcpFb = function(line) {
            var parts = line.substr(line.indexOf(' ') + 1).split(' ');
            return {
                type: parts.shift(),
                parameter: parts.join(' ')
            };
        };
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
        SDPUtils.writeRtcpFb = function(codec) {
            var lines = '';
            var pt = codec.payloadType;
            if (codec.preferredPayloadType !== undefined) {
                pt = codec.preferredPayloadType;
            }
            if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
                // FIXME: special handling for trr-int?
                codec.rtcpFeedback.forEach(function(fb) {
                    lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
                        (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
                        '\r\n';
                });
            }
            return lines;
        };

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
        SDPUtils.parseSsrcMedia = function(line) {
            var sp = line.indexOf(' ');
            var parts = {
                ssrc: parseInt(line.substr(7, sp - 7), 10)
            };
            var colon = line.indexOf(':', sp);
            if (colon > -1) {
                parts.attribute = line.substr(sp + 1, colon - sp - 1);
                parts.value = line.substr(colon + 1);
            } else {
                parts.attribute = line.substr(sp + 1);
            }
            return parts;
        };

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
        SDPUtils.getMid = function(mediaSection) {
            var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
            if (mid) {
                return mid.substr(6);
            }
        }

        SDPUtils.parseFingerprint = function(line) {
            var parts = line.substr(14).split(' ');
            return {
                algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
                value: parts[1]
            };
        };

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
        SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
            var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
                'a=fingerprint:');
            // Note: a=setup line is ignored since we use the 'auto' role.
            // Note2: 'algorithm' is not case sensitive except in Edge.
            return {
                role: 'auto',
                fingerprints: lines.map(SDPUtils.parseFingerprint)
            };
        };

// Serializes DTLS parameters to SDP.
        SDPUtils.writeDtlsParameters = function(params, setupType) {
            var sdp = 'a=setup:' + setupType + '\r\n';
            params.fingerprints.forEach(function(fp) {
                sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
            });
            return sdp;
        };
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
        SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
            var lines = SDPUtils.splitLines(mediaSection);
            // Search in session part, too.
            lines = lines.concat(SDPUtils.splitLines(sessionpart));
            var iceParameters = {
                usernameFragment: lines.filter(function(line) {
                    return line.indexOf('a=ice-ufrag:') === 0;
                })[0].substr(12),
                password: lines.filter(function(line) {
                    return line.indexOf('a=ice-pwd:') === 0;
                })[0].substr(10)
            };
            return iceParameters;
        };

// Serializes ICE parameters to SDP.
        SDPUtils.writeIceParameters = function(params) {
            return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
                'a=ice-pwd:' + params.password + '\r\n';
        };

// Parses the SDP media section and returns RTCRtpParameters.
        SDPUtils.parseRtpParameters = function(mediaSection) {
            var description = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: [],
                rtcp: []
            };
            var lines = SDPUtils.splitLines(mediaSection);
            var mline = lines[0].split(' ');
            for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
                var pt = mline[i];
                var rtpmapline = SDPUtils.matchPrefix(
                    mediaSection, 'a=rtpmap:' + pt + ' ')[0];
                if (rtpmapline) {
                    var codec = SDPUtils.parseRtpMap(rtpmapline);
                    var fmtps = SDPUtils.matchPrefix(
                        mediaSection, 'a=fmtp:' + pt + ' ');
                    // Only the first a=fmtp:<pt> is considered.
                    codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
                    codec.rtcpFeedback = SDPUtils.matchPrefix(
                        mediaSection, 'a=rtcp-fb:' + pt + ' ')
                        .map(SDPUtils.parseRtcpFb);
                    description.codecs.push(codec);
                    // parse FEC mechanisms from rtpmap lines.
                    switch (codec.name.toUpperCase()) {
                        case 'RED':
                        case 'ULPFEC':
                            description.fecMechanisms.push(codec.name.toUpperCase());
                            break;
                        default: // only RED and ULPFEC are recognized as FEC mechanisms.
                            break;
                    }
                }
            }
            SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
                description.headerExtensions.push(SDPUtils.parseExtmap(line));
            });
            // FIXME: parse rtcp.
            return description;
        };

// Generates parts of the SDP media section describing the capabilities /
// parameters.
        SDPUtils.writeRtpDescription = function(kind, caps) {
            var sdp = '';

            // Build the mline.
            sdp += 'm=' + kind + ' ';
            sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
            sdp += ' UDP/TLS/RTP/SAVPF ';
            sdp += caps.codecs.map(function(codec) {
                if (codec.preferredPayloadType !== undefined) {
                    return codec.preferredPayloadType;
                }
                return codec.payloadType;
            }).join(' ') + '\r\n';

            sdp += 'c=IN IP4 0.0.0.0\r\n';
            sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

            // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
            caps.codecs.forEach(function(codec) {
                sdp += SDPUtils.writeRtpMap(codec);
                sdp += SDPUtils.writeFmtp(codec);
                sdp += SDPUtils.writeRtcpFb(codec);
            });
            var maxptime = 0;
            caps.codecs.forEach(function(codec) {
                if (codec.maxptime > maxptime) {
                    maxptime = codec.maxptime;
                }
            });
            if (maxptime > 0) {
                sdp += 'a=maxptime:' + maxptime + '\r\n';
            }
            sdp += 'a=rtcp-mux\r\n';

            if (caps.headerExtensions) {
                caps.headerExtensions.forEach(function(extension) {
                    sdp += SDPUtils.writeExtmap(extension);
                });
            }
            // FIXME: write fecMechanisms.
            return sdp;
        };

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
        SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
            var encodingParameters = [];
            var description = SDPUtils.parseRtpParameters(mediaSection);
            var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
            var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

            // filter a=ssrc:... cname:, ignore PlanB-msid
            var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                .map(function(line) {
                    return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(parts) {
                    return parts.attribute === 'cname';
                });
            var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
            var secondarySsrc;

            var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
                .map(function(line) {
                    var parts = line.substr(17).split(' ');
                    return parts.map(function(part) {
                        return parseInt(part, 10);
                    });
                });
            if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
                secondarySsrc = flows[0][1];
            }

            description.codecs.forEach(function(codec) {
                if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
                    var encParam = {
                        ssrc: primarySsrc,
                        codecPayloadType: parseInt(codec.parameters.apt, 10),
                    };
                    if (primarySsrc && secondarySsrc) {
                        encParam.rtx = {ssrc: secondarySsrc};
                    }
                    encodingParameters.push(encParam);
                    if (hasRed) {
                        encParam = JSON.parse(JSON.stringify(encParam));
                        encParam.fec = {
                            ssrc: secondarySsrc,
                            mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                        };
                        encodingParameters.push(encParam);
                    }
                }
            });
            if (encodingParameters.length === 0 && primarySsrc) {
                encodingParameters.push({
                    ssrc: primarySsrc
                });
            }

            // we support both b=AS and b=TIAS but interpret AS as TIAS.
            var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
            if (bandwidth.length) {
                if (bandwidth[0].indexOf('b=TIAS:') === 0) {
                    bandwidth = parseInt(bandwidth[0].substr(7), 10);
                } else if (bandwidth[0].indexOf('b=AS:') === 0) {
                    // use formula from JSEP to convert b=AS to TIAS value.
                    bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
                        - (50 * 40 * 8);
                } else {
                    bandwidth = undefined;
                }
                encodingParameters.forEach(function(params) {
                    params.maxBitrate = bandwidth;
                });
            }
            return encodingParameters;
        };

// parses http://draft.ortc.org/#rtcrtcpparameters*
        SDPUtils.parseRtcpParameters = function(mediaSection) {
            var rtcpParameters = {};

            var cname;
            // Gets the first SSRC. Note that with RTX there might be multiple
            // SSRCs.
            var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                .map(function(line) {
                    return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(obj) {
                    return obj.attribute === 'cname';
                })[0];
            if (remoteSsrc) {
                rtcpParameters.cname = remoteSsrc.value;
                rtcpParameters.ssrc = remoteSsrc.ssrc;
            }

            // Edge uses the compound attribute instead of reducedSize
            // compound is !reducedSize
            var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
            rtcpParameters.reducedSize = rsize.length > 0;
            rtcpParameters.compound = rsize.length === 0;

            // parses the rtcp-mux attrіbute.
            // Note that Edge does not support unmuxed RTCP.
            var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
            rtcpParameters.mux = mux.length > 0;

            return rtcpParameters;
        };

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
        SDPUtils.parseMsid = function(mediaSection) {
            var parts;
            var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
            if (spec.length === 1) {
                parts = spec[0].substr(7).split(' ');
                return {stream: parts[0], track: parts[1]};
            }
            var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                .map(function(line) {
                    return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(parts) {
                    return parts.attribute === 'msid';
                });
            if (planB.length > 0) {
                parts = planB[0].value.split(' ');
                return {stream: parts[0], track: parts[1]};
            }
        };

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
        SDPUtils.generateSessionId = function() {
            return Math.random().toString().substr(2, 21);
        };

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
        SDPUtils.writeSessionBoilerplate = function(sessId, sessVer) {
            var sessionId;
            var version = sessVer !== undefined ? sessVer : 2;
            if (sessId) {
                sessionId = sessId;
            } else {
                sessionId = SDPUtils.generateSessionId();
            }
            // FIXME: sess-id should be an NTP timestamp.
            return 'v=0\r\n' +
                'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' +
                's=-\r\n' +
                't=0 0\r\n';
        };

        SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
            var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

            // Map ICE parameters (ufrag, pwd) to SDP.
            sdp += SDPUtils.writeIceParameters(
                transceiver.iceGatherer.getLocalParameters());

            // Map DTLS parameters to SDP.
            sdp += SDPUtils.writeDtlsParameters(
                transceiver.dtlsTransport.getLocalParameters(),
                type === 'offer' ? 'actpass' : 'active');

            sdp += 'a=mid:' + transceiver.mid + '\r\n';

            if (transceiver.direction) {
                sdp += 'a=' + transceiver.direction + '\r\n';
            } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
                sdp += 'a=sendrecv\r\n';
            } else if (transceiver.rtpSender) {
                sdp += 'a=sendonly\r\n';
            } else if (transceiver.rtpReceiver) {
                sdp += 'a=recvonly\r\n';
            } else {
                sdp += 'a=inactive\r\n';
            }

            if (transceiver.rtpSender) {
                // spec.
                var msid = 'msid:' + stream.id + ' ' +
                    transceiver.rtpSender.track.id + '\r\n';
                sdp += 'a=' + msid;

                // for Chrome.
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                    ' ' + msid;
                if (transceiver.sendEncodingParameters[0].rtx) {
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                        ' ' + msid;
                    sdp += 'a=ssrc-group:FID ' +
                        transceiver.sendEncodingParameters[0].ssrc + ' ' +
                        transceiver.sendEncodingParameters[0].rtx.ssrc +
                        '\r\n';
                }
            }
            // FIXME: this should be written by writeRtpDescription.
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                ' cname:' + SDPUtils.localCName + '\r\n';
            if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                    ' cname:' + SDPUtils.localCName + '\r\n';
            }
            return sdp;
        };

// Gets the direction from the mediaSection or the sessionpart.
        SDPUtils.getDirection = function(mediaSection, sessionpart) {
            // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
            var lines = SDPUtils.splitLines(mediaSection);
            for (var i = 0; i < lines.length; i++) {
                switch (lines[i]) {
                    case 'a=sendrecv':
                    case 'a=sendonly':
                    case 'a=recvonly':
                    case 'a=inactive':
                        return lines[i].substr(2);
                    default:
                    // FIXME: What should happen here?
                }
            }
            if (sessionpart) {
                return SDPUtils.getDirection(sessionpart);
            }
            return 'sendrecv';
        };

        SDPUtils.getKind = function(mediaSection) {
            var lines = SDPUtils.splitLines(mediaSection);
            var mline = lines[0].split(' ');
            return mline[0].substr(2);
        };

        SDPUtils.isRejected = function(mediaSection) {
            return mediaSection.split(' ', 2)[1] === '0';
        };

        SDPUtils.parseMLine = function(mediaSection) {
            var lines = SDPUtils.splitLines(mediaSection);
            var parts = lines[0].substr(2).split(' ');
            return {
                kind: parts[0],
                port: parseInt(parts[1], 10),
                protocol: parts[2],
                fmt: parts.slice(3).join(' ')
            };
        };

        SDPUtils.parseOLine = function(mediaSection) {
            var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
            var parts = line.substr(2).split(' ');
            return {
                username: parts[0],
                sessionId: parts[1],
                sessionVersion: parseInt(parts[2], 10),
                netType: parts[3],
                addressType: parts[4],
                address: parts[5],
            };
        }

// Expose public methods.
        if (typeof module === 'object') {
            module.exports = SDPUtils;
        }

    },{}],3:[function(require,module,exports){
        (function (global){
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */

            'use strict';

            var adapterFactory = require('./adapter_factory.js');
            module.exports = adapterFactory({window: global.window});

        }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./adapter_factory.js":4}],4:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */

        'use strict';

        var utils = require('./utils');
// Shimming starts here.
        module.exports = function(dependencies, opts) {
            var window = dependencies && dependencies.window;

            var options = {
                shimChrome: true,
                shimFirefox: true,
                shimEdge: true,
                shimSafari: true,
            };

            for (var key in opts) {
                if (hasOwnProperty.call(opts, key)) {
                    options[key] = opts[key];
                }
            }

            // Utils.
            var logging = utils.log;
            var browserDetails = utils.detectBrowser(window);

            // Uncomment the line below if you want logging to occur, including logging
            // for the switch statement below. Can also be turned on in the browser via
            // adapter.disableLog(false), but then logging from the switch statement below
            // will not appear.
            // require('./utils').disableLog(false);

            // Browser shims.
            var chromeShim = require('./chrome/chrome_shim') || null;
            var edgeShim = require('./edge/edge_shim') || null;
            var firefoxShim = require('./firefox/firefox_shim') || null;
            var safariShim = require('./safari/safari_shim') || null;
            var commonShim = require('./common_shim') || null;

            // Export to the adapter global object visible in the browser.
            var adapter = {
                browserDetails: browserDetails,
                commonShim: commonShim,
                extractVersion: utils.extractVersion,
                disableLog: utils.disableLog,
                disableWarnings: utils.disableWarnings
            };

            // Shim browser if found.
            switch (browserDetails.browser) {
                case 'chrome':
                    if (!chromeShim || !chromeShim.shimPeerConnection ||
                        !options.shimChrome) {
                        logging('Chrome shim is not included in this adapter release.');
                        return adapter;
                    }
                    logging('adapter.js shimming chrome.');
                    // Export to the adapter global object visible in the browser.
                    adapter.browserShim = chromeShim;
                    commonShim.shimCreateObjectURL(window);

                    chromeShim.shimGetUserMedia(window);
                    chromeShim.shimMediaStream(window);
                    chromeShim.shimSourceObject(window);
                    chromeShim.shimPeerConnection(window);
                    chromeShim.shimOnTrack(window);
                    chromeShim.shimAddTrackRemoveTrack(window);
                    chromeShim.shimGetSendersWithDtmf(window);
                    chromeShim.shimSenderReceiverGetStats(window);

                    commonShim.shimRTCIceCandidate(window);
                    commonShim.shimMaxMessageSize(window);
                    commonShim.shimSendThrowTypeError(window);
                    break;
                case 'firefox':
                    if (!firefoxShim || !firefoxShim.shimPeerConnection ||
                        !options.shimFirefox) {
                        logging('Firefox shim is not included in this adapter release.');
                        return adapter;
                    }
                    logging('adapter.js shimming firefox.');
                    // Export to the adapter global object visible in the browser.
                    adapter.browserShim = firefoxShim;
                    commonShim.shimCreateObjectURL(window);

                    firefoxShim.shimGetUserMedia(window);
                    firefoxShim.shimSourceObject(window);
                    firefoxShim.shimPeerConnection(window);
                    firefoxShim.shimOnTrack(window);
                    firefoxShim.shimRemoveStream(window);
                    firefoxShim.shimSenderGetStats(window);
                    firefoxShim.shimReceiverGetStats(window);
                    firefoxShim.shimRTCDataChannel(window);

                    commonShim.shimRTCIceCandidate(window);
                    commonShim.shimMaxMessageSize(window);
                    commonShim.shimSendThrowTypeError(window);
                    break;
                case 'edge':
                    if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                        logging('MS edge shim is not included in this adapter release.');
                        return adapter;
                    }
                    logging('adapter.js shimming edge.');
                    // Export to the adapter global object visible in the browser.
                    adapter.browserShim = edgeShim;
                    commonShim.shimCreateObjectURL(window);

                    edgeShim.shimGetUserMedia(window);
                    edgeShim.shimPeerConnection(window);
                    edgeShim.shimReplaceTrack(window);

                    // the edge shim implements the full RTCIceCandidate object.

                    commonShim.shimMaxMessageSize(window);
                    commonShim.shimSendThrowTypeError(window);
                    break;
                case 'safari':
                    if (!safariShim || !options.shimSafari) {
                        logging('Safari shim is not included in this adapter release.');
                        return adapter;
                    }
                    logging('adapter.js shimming safari.');
                    // Export to the adapter global object visible in the browser.
                    adapter.browserShim = safariShim;
                    commonShim.shimCreateObjectURL(window);

                    safariShim.shimRTCIceServerUrls(window);
                    safariShim.shimCallbacksAPI(window);
                    safariShim.shimLocalStreamsAPI(window);
                    safariShim.shimRemoteStreamsAPI(window);
                    safariShim.shimTrackEventTransceiver(window);
                    safariShim.shimGetUserMedia(window);
                    safariShim.shimCreateOfferLegacy(window);

                    commonShim.shimRTCIceCandidate(window);
                    commonShim.shimMaxMessageSize(window);
                    commonShim.shimSendThrowTypeError(window);
                    break;
                default:
                    logging('Unsupported browser!');
                    break;
            }

            return adapter;
        };

    },{"./chrome/chrome_shim":5,"./common_shim":7,"./edge/edge_shim":8,"./firefox/firefox_shim":11,"./safari/safari_shim":13,"./utils":14}],5:[function(require,module,exports){

        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';
        var utils = require('../utils.js');
        var logging = utils.log;

        /* iterates the stats graph recursively. */
        function walkStats(stats, base, resultSet) {
            if (!base || resultSet.has(base.id)) {
                return;
            }
            resultSet.set(base.id, base);
            Object.keys(base).forEach(function(name) {
                if (name.endsWith('Id')) {
                    walkStats(stats, stats.get(base[name]), resultSet);
                } else if (name.endsWith('Ids')) {
                    base[name].forEach(function(id) {
                        walkStats(stats, stats.get(id), resultSet);
                    });
                }
            });
        }

        /* filter getStats for a sender/receiver track. */
        function filterStats(result, track, outbound) {
            var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
            var filteredResult = new Map();
            if (track === null) {
                return filteredResult;
            }
            var trackStats = [];
            result.forEach(function(value) {
                if (value.type === 'track' &&
                    value.trackIdentifier === track.id) {
                    trackStats.push(value);
                }
            });
            trackStats.forEach(function(trackStat) {
                result.forEach(function(stats) {
                    if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                        walkStats(result, stats, filteredResult);
                    }
                });
            });
            return filteredResult;
        }

        module.exports = {
            shimGetUserMedia: require('./getusermedia'),
            shimMediaStream: function(window) {
                window.MediaStream = window.MediaStream || window.webkitMediaStream;
            },

            shimOnTrack: function(window) {
                if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
                        window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
                        get: function() {
                            return this._ontrack;
                        },
                        set: function(f) {
                            if (this._ontrack) {
                                this.removeEventListener('track', this._ontrack);
                            }
                            this.addEventListener('track', this._ontrack = f);
                        }
                    });
                    var origSetRemoteDescription =
                        window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
                        var pc = this;
                        if (!pc._ontrackpoly) {
                            pc._ontrackpoly = function(e) {
                                // onaddstream does not fire when a track is added to an existing
                                // stream. But stream.onaddtrack is implemented so we use that.
                                e.stream.addEventListener('addtrack', function(te) {
                                    var receiver;
                                    if (window.RTCPeerConnection.prototype.getReceivers) {
                                        receiver = pc.getReceivers().find(function(r) {
                                            return r.track && r.track.id === te.track.id;
                                        });
                                    } else {
                                        receiver = {track: te.track};
                                    }

                                    var event = new Event('track');
                                    event.track = te.track;
                                    event.receiver = receiver;
                                    event.transceiver = {receiver: receiver};
                                    event.streams = [e.stream];
                                    pc.dispatchEvent(event);
                                });
                                e.stream.getTracks().forEach(function(track) {
                                    var receiver;
                                    if (window.RTCPeerConnection.prototype.getReceivers) {
                                        receiver = pc.getReceivers().find(function(r) {
                                            return r.track && r.track.id === track.id;
                                        });
                                    } else {
                                        receiver = {track: track};
                                    }
                                    var event = new Event('track');
                                    event.track = track;
                                    event.receiver = receiver;
                                    event.transceiver = {receiver: receiver};
                                    event.streams = [e.stream];
                                    pc.dispatchEvent(event);
                                });
                            };
                            pc.addEventListener('addstream', pc._ontrackpoly);
                        }
                        return origSetRemoteDescription.apply(pc, arguments);
                    };
                } else if (!('RTCRtpTransceiver' in window)) {
                    utils.wrapPeerConnectionEvent(window, 'track', function(e) {
                        if (!e.transceiver) {
                            e.transceiver = {receiver: e.receiver};
                        }
                        return e;
                    });
                }
            },

            shimGetSendersWithDtmf: function(window) {
                // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
                if (typeof window === 'object' && window.RTCPeerConnection &&
                    !('getSenders' in window.RTCPeerConnection.prototype) &&
                    'createDTMFSender' in window.RTCPeerConnection.prototype) {
                    var shimSenderWithDtmf = function(pc, track) {
                        return {
                            track: track,
                            get dtmf() {
                                if (this._dtmf === undefined) {
                                    if (track.kind === 'audio') {
                                        this._dtmf = pc.createDTMFSender(track);
                                    } else {
                                        this._dtmf = null;
                                    }
                                }
                                return this._dtmf;
                            },
                            _pc: pc
                        };
                    };

                    // augment addTrack when getSenders is not available.
                    if (!window.RTCPeerConnection.prototype.getSenders) {
                        window.RTCPeerConnection.prototype.getSenders = function() {
                            this._senders = this._senders || [];
                            return this._senders.slice(); // return a copy of the internal state.
                        };
                        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                        window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
                            var pc = this;
                            var sender = origAddTrack.apply(pc, arguments);
                            if (!sender) {
                                sender = shimSenderWithDtmf(pc, track);
                                pc._senders.push(sender);
                            }
                            return sender;
                        };

                        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                        window.RTCPeerConnection.prototype.removeTrack = function(sender) {
                            var pc = this;
                            origRemoveTrack.apply(pc, arguments);
                            var idx = pc._senders.indexOf(sender);
                            if (idx !== -1) {
                                pc._senders.splice(idx, 1);
                            }
                        };
                    }
                    var origAddStream = window.RTCPeerConnection.prototype.addStream;
                    window.RTCPeerConnection.prototype.addStream = function(stream) {
                        var pc = this;
                        pc._senders = pc._senders || [];
                        origAddStream.apply(pc, [stream]);
                        stream.getTracks().forEach(function(track) {
                            pc._senders.push(shimSenderWithDtmf(pc, track));
                        });
                    };

                    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                    window.RTCPeerConnection.prototype.removeStream = function(stream) {
                        var pc = this;
                        pc._senders = pc._senders || [];
                        origRemoveStream.apply(pc, [stream]);

                        stream.getTracks().forEach(function(track) {
                            var sender = pc._senders.find(function(s) {
                                return s.track === track;
                            });
                            if (sender) {
                                pc._senders.splice(pc._senders.indexOf(sender), 1); // remove sender
                            }
                        });
                    };
                } else if (typeof window === 'object' && window.RTCPeerConnection &&
                    'getSenders' in window.RTCPeerConnection.prototype &&
                    'createDTMFSender' in window.RTCPeerConnection.prototype &&
                    window.RTCRtpSender &&
                    !('dtmf' in window.RTCRtpSender.prototype)) {
                    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                    window.RTCPeerConnection.prototype.getSenders = function() {
                        var pc = this;
                        var senders = origGetSenders.apply(pc, []);
                        senders.forEach(function(sender) {
                            sender._pc = pc;
                        });
                        return senders;
                    };

                    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
                        get: function() {
                            if (this._dtmf === undefined) {
                                if (this.track.kind === 'audio') {
                                    this._dtmf = this._pc.createDTMFSender(this.track);
                                } else {
                                    this._dtmf = null;
                                }
                            }
                            return this._dtmf;
                        }
                    });
                }
            },

            shimSenderReceiverGetStats: function(window) {
                if (!(typeof window === 'object' && window.RTCPeerConnection &&
                        window.RTCRtpSender && window.RTCRtpReceiver)) {
                    return;
                }

                // shim sender stats.
                if (!('getStats' in window.RTCRtpSender.prototype)) {
                    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                    if (origGetSenders) {
                        window.RTCPeerConnection.prototype.getSenders = function() {
                            var pc = this;
                            var senders = origGetSenders.apply(pc, []);
                            senders.forEach(function(sender) {
                                sender._pc = pc;
                            });
                            return senders;
                        };
                    }

                    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                    if (origAddTrack) {
                        window.RTCPeerConnection.prototype.addTrack = function() {
                            var sender = origAddTrack.apply(this, arguments);
                            sender._pc = this;
                            return sender;
                        };
                    }
                    window.RTCRtpSender.prototype.getStats = function() {
                        var sender = this;
                        return this._pc.getStats().then(function(result) {
                            /* Note: this will include stats of all senders that
           *   send a track with the same id as sender.track as
           *   it is not possible to identify the RTCRtpSender.
           */
                            return filterStats(result, sender.track, true);
                        });
                    };
                }

                // shim receiver stats.
                if (!('getStats' in window.RTCRtpReceiver.prototype)) {
                    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                    if (origGetReceivers) {
                        window.RTCPeerConnection.prototype.getReceivers = function() {
                            var pc = this;
                            var receivers = origGetReceivers.apply(pc, []);
                            receivers.forEach(function(receiver) {
                                receiver._pc = pc;
                            });
                            return receivers;
                        };
                    }
                    utils.wrapPeerConnectionEvent(window, 'track', function(e) {
                        e.receiver._pc = e.srcElement;
                        return e;
                    });
                    window.RTCRtpReceiver.prototype.getStats = function() {
                        var receiver = this;
                        return this._pc.getStats().then(function(result) {
                            return filterStats(result, receiver.track, false);
                        });
                    };
                }

                if (!('getStats' in window.RTCRtpSender.prototype &&
                        'getStats' in window.RTCRtpReceiver.prototype)) {
                    return;
                }

                // shim RTCPeerConnection.getStats(track).
                var origGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function() {
                    var pc = this;
                    if (arguments.length > 0 &&
                        arguments[0] instanceof window.MediaStreamTrack) {
                        var track = arguments[0];
                        var sender;
                        var receiver;
                        var err;
                        pc.getSenders().forEach(function(s) {
                            if (s.track === track) {
                                if (sender) {
                                    err = true;
                                } else {
                                    sender = s;
                                }
                            }
                        });
                        pc.getReceivers().forEach(function(r) {
                            if (r.track === track) {
                                if (receiver) {
                                    err = true;
                                } else {
                                    receiver = r;
                                }
                            }
                            return r.track === track;
                        });
                        if (err || (sender && receiver)) {
                            return Promise.reject(new DOMException(
                                'There are more than one sender or receiver for the track.',
                                'InvalidAccessError'));
                        } else if (sender) {
                            return sender.getStats();
                        } else if (receiver) {
                            return receiver.getStats();
                        }
                        return Promise.reject(new DOMException(
                            'There is no sender or receiver for the track.',
                            'InvalidAccessError'));
                    }
                    return origGetStats.apply(pc, arguments);
                };
            },

            shimSourceObject: function(window) {
                var URL = window && window.URL;

                if (typeof window === 'object') {
                    if (window.HTMLMediaElement &&
                        !('srcObject' in window.HTMLMediaElement.prototype)) {
                        // Shim the srcObject property, once, when HTMLMediaElement is found.
                        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
                            get: function() {
                                return this._srcObject;
                            },
                            set: function(stream) {
                                var self = this;
                                // Use _srcObject as a private property for this shim
                                this._srcObject = stream;
                                if (this.src) {
                                    URL.revokeObjectURL(this.src);
                                }

                                if (!stream) {
                                    this.src = '';
                                    return undefined;
                                }
                                this.src = URL.createObjectURL(stream);
                                // We need to recreate the blob url when a track is added or
                                // removed. Doing it manually since we want to avoid a recursion.
                                stream.addEventListener('addtrack', function() {
                                    if (self.src) {
                                        URL.revokeObjectURL(self.src);
                                    }
                                    self.src = URL.createObjectURL(stream);
                                });
                                stream.addEventListener('removetrack', function() {
                                    if (self.src) {
                                        URL.revokeObjectURL(self.src);
                                    }
                                    self.src = URL.createObjectURL(stream);
                                });
                            }
                        });
                    }
                }
            },

            shimAddTrackRemoveTrackWithNative: function(window) {
                // shim addTrack/removeTrack with native variants in order to make
                // the interactions with legacy getLocalStreams behave as in other browsers.
                // Keeps a mapping stream.id => [stream, rtpsenders...]
                window.RTCPeerConnection.prototype.getLocalStreams = function() {
                    var pc = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
                        return pc._shimmedLocalStreams[streamId][0];
                    });
                };

                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
                    if (!stream) {
                        return origAddTrack.apply(this, arguments);
                    }
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

                    var sender = origAddTrack.apply(this, arguments);
                    if (!this._shimmedLocalStreams[stream.id]) {
                        this._shimmedLocalStreams[stream.id] = [stream, sender];
                    } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
                        this._shimmedLocalStreams[stream.id].push(sender);
                    }
                    return sender;
                };

                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function(stream) {
                    var pc = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

                    stream.getTracks().forEach(function(track) {
                        var alreadyExists = pc.getSenders().find(function(s) {
                            return s.track === track;
                        });
                        if (alreadyExists) {
                            throw new DOMException('Track already exists.',
                                'InvalidAccessError');
                        }
                    });
                    var existingSenders = pc.getSenders();
                    origAddStream.apply(this, arguments);
                    var newSenders = pc.getSenders().filter(function(newSender) {
                        return existingSenders.indexOf(newSender) === -1;
                    });
                    this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
                };

                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function(stream) {
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    delete this._shimmedLocalStreams[stream.id];
                    return origRemoveStream.apply(this, arguments);
                };

                var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                window.RTCPeerConnection.prototype.removeTrack = function(sender) {
                    var pc = this;
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    if (sender) {
                        Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
                            var idx = pc._shimmedLocalStreams[streamId].indexOf(sender);
                            if (idx !== -1) {
                                pc._shimmedLocalStreams[streamId].splice(idx, 1);
                            }
                            if (pc._shimmedLocalStreams[streamId].length === 1) {
                                delete pc._shimmedLocalStreams[streamId];
                            }
                        });
                    }
                    return origRemoveTrack.apply(this, arguments);
                };
            },

            shimAddTrackRemoveTrack: function(window) {
                var browserDetails = utils.detectBrowser(window);
                // shim addTrack and removeTrack.
                if (window.RTCPeerConnection.prototype.addTrack &&
                    browserDetails.version >= 65) {
                    return this.shimAddTrackRemoveTrackWithNative(window);
                }

                // also shim pc.getLocalStreams when addTrack is shimmed
                // to return the original streams.
                var origGetLocalStreams = window.RTCPeerConnection.prototype
                    .getLocalStreams;
                window.RTCPeerConnection.prototype.getLocalStreams = function() {
                    var pc = this;
                    var nativeStreams = origGetLocalStreams.apply(this);
                    pc._reverseStreams = pc._reverseStreams || {};
                    return nativeStreams.map(function(stream) {
                        return pc._reverseStreams[stream.id];
                    });
                };

                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function(stream) {
                    var pc = this;
                    pc._streams = pc._streams || {};
                    pc._reverseStreams = pc._reverseStreams || {};

                    stream.getTracks().forEach(function(track) {
                        var alreadyExists = pc.getSenders().find(function(s) {
                            return s.track === track;
                        });
                        if (alreadyExists) {
                            throw new DOMException('Track already exists.',
                                'InvalidAccessError');
                        }
                    });
                    // Add identity mapping for consistency with addTrack.
                    // Unless this is being used with a stream from addTrack.
                    if (!pc._reverseStreams[stream.id]) {
                        var newStream = new window.MediaStream(stream.getTracks());
                        pc._streams[stream.id] = newStream;
                        pc._reverseStreams[newStream.id] = stream;
                        stream = newStream;
                    }
                    origAddStream.apply(pc, [stream]);
                };

                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function(stream) {
                    var pc = this;
                    pc._streams = pc._streams || {};
                    pc._reverseStreams = pc._reverseStreams || {};

                    origRemoveStream.apply(pc, [(pc._streams[stream.id] || stream)]);
                    delete pc._reverseStreams[(pc._streams[stream.id] ?
                        pc._streams[stream.id].id : stream.id)];
                    delete pc._streams[stream.id];
                };

                window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
                    var pc = this;
                    if (pc.signalingState === 'closed') {
                        throw new DOMException(
                            'The RTCPeerConnection\'s signalingState is \'closed\'.',
                            'InvalidStateError');
                    }
                    var streams = [].slice.call(arguments, 1);
                    if (streams.length !== 1 ||
                        !streams[0].getTracks().find(function(t) {
                            return t === track;
                        })) {
                        // this is not fully correct but all we can manage without
                        // [[associated MediaStreams]] internal slot.
                        throw new DOMException(
                            'The adapter.js addTrack polyfill only supports a single ' +
                            ' stream which is associated with the specified track.',
                            'NotSupportedError');
                    }

                    var alreadyExists = pc.getSenders().find(function(s) {
                        return s.track === track;
                    });
                    if (alreadyExists) {
                        throw new DOMException('Track already exists.',
                            'InvalidAccessError');
                    }

                    pc._streams = pc._streams || {};
                    pc._reverseStreams = pc._reverseStreams || {};
                    var oldStream = pc._streams[stream.id];
                    if (oldStream) {
                        // this is using odd Chrome behaviour, use with caution:
                        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
                        // Note: we rely on the high-level addTrack/dtmf shim to
                        // create the sender with a dtmf sender.
                        oldStream.addTrack(track);

                        // Trigger ONN async.
                        Promise.resolve().then(function() {
                            pc.dispatchEvent(new Event('negotiationneeded'));
                        });
                    } else {
                        var newStream = new window.MediaStream([track]);
                        pc._streams[stream.id] = newStream;
                        pc._reverseStreams[newStream.id] = stream;
                        pc.addStream(newStream);
                    }
                    return pc.getSenders().find(function(s) {
                        return s.track === track;
                    });
                };

                // replace the internal stream id with the external one and
                // vice versa.
                function replaceInternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                        var externalStream = pc._reverseStreams[internalId];
                        var internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
                            externalStream.id);
                    });
                    return new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                    });
                }
                function replaceExternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                        var externalStream = pc._reverseStreams[internalId];
                        var internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
                            internalStream.id);
                    });
                    return new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                    });
                }
                ['createOffer', 'createAnswer'].forEach(function(method) {
                    var nativeMethod = window.RTCPeerConnection.prototype[method];
                    window.RTCPeerConnection.prototype[method] = function() {
                        var pc = this;
                        var args = arguments;
                        var isLegacyCall = arguments.length &&
                            typeof arguments[0] === 'function';
                        if (isLegacyCall) {
                            return nativeMethod.apply(pc, [
                                function(description) {
                                    var desc = replaceInternalStreamId(pc, description);
                                    args[0].apply(null, [desc]);
                                },
                                function(err) {
                                    if (args[1]) {
                                        args[1].apply(null, err);
                                    }
                                }, arguments[2]
                            ]);
                        }
                        return nativeMethod.apply(pc, arguments)
                            .then(function(description) {
                                return replaceInternalStreamId(pc, description);
                            });
                    };
                });

                var origSetLocalDescription =
                    window.RTCPeerConnection.prototype.setLocalDescription;
                window.RTCPeerConnection.prototype.setLocalDescription = function() {
                    var pc = this;
                    if (!arguments.length || !arguments[0].type) {
                        return origSetLocalDescription.apply(pc, arguments);
                    }
                    arguments[0] = replaceExternalStreamId(pc, arguments[0]);
                    return origSetLocalDescription.apply(pc, arguments);
                };

                // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

                var origLocalDescription = Object.getOwnPropertyDescriptor(
                    window.RTCPeerConnection.prototype, 'localDescription');
                Object.defineProperty(window.RTCPeerConnection.prototype,
                    'localDescription', {
                        get: function() {
                            var pc = this;
                            var description = origLocalDescription.get.apply(this);
                            if (description.type === '') {
                                return description;
                            }
                            return replaceInternalStreamId(pc, description);
                        }
                    });

                window.RTCPeerConnection.prototype.removeTrack = function(sender) {
                    var pc = this;
                    if (pc.signalingState === 'closed') {
                        throw new DOMException(
                            'The RTCPeerConnection\'s signalingState is \'closed\'.',
                            'InvalidStateError');
                    }
                    // We can not yet check for sender instanceof RTCRtpSender
                    // since we shim RTPSender. So we check if sender._pc is set.
                    if (!sender._pc) {
                        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
                            'does not implement interface RTCRtpSender.', 'TypeError');
                    }
                    var isLocal = sender._pc === pc;
                    if (!isLocal) {
                        throw new DOMException('Sender was not created by this connection.',
                            'InvalidAccessError');
                    }

                    // Search for the native stream the senders track belongs to.
                    pc._streams = pc._streams || {};
                    var stream;
                    Object.keys(pc._streams).forEach(function(streamid) {
                        var hasTrack = pc._streams[streamid].getTracks().find(function(track) {
                            return sender.track === track;
                        });
                        if (hasTrack) {
                            stream = pc._streams[streamid];
                        }
                    });

                    if (stream) {
                        if (stream.getTracks().length === 1) {
                            // if this is the last track of the stream, remove the stream. This
                            // takes care of any shimmed _senders.
                            pc.removeStream(pc._reverseStreams[stream.id]);
                        } else {
                            // relying on the same odd chrome behaviour as above.
                            stream.removeTrack(sender.track);
                        }
                        pc.dispatchEvent(new Event('negotiationneeded'));
                    }
                };
            },

            shimPeerConnection: function(window) {
                var browserDetails = utils.detectBrowser(window);

                // The RTCPeerConnection object.
                if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
                    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
                        // Translate iceTransportPolicy to iceTransports,
                        // see https://code.google.com/p/webrtc/issues/detail?id=4869
                        // this was fixed in M56 along with unprefixing RTCPeerConnection.
                        logging('PeerConnection');
                        if (pcConfig && pcConfig.iceTransportPolicy) {
                            pcConfig.iceTransports = pcConfig.iceTransportPolicy;
                        }

                        return new window.webkitRTCPeerConnection(pcConfig, pcConstraints);
                    };
                    window.RTCPeerConnection.prototype =
                        window.webkitRTCPeerConnection.prototype;
                    // wrap static methods. Currently just generateCertificate.
                    if (window.webkitRTCPeerConnection.generateCertificate) {
                        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                            get: function() {
                                return window.webkitRTCPeerConnection.generateCertificate;
                            }
                        });
                    }
                } else {
                    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
                    var OrigPeerConnection = window.RTCPeerConnection;
                    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
                        if (pcConfig && pcConfig.iceServers) {
                            var newIceServers = [];
                            for (var i = 0; i < pcConfig.iceServers.length; i++) {
                                var server = pcConfig.iceServers[i];
                                if (!server.hasOwnProperty('urls') &&
                                    server.hasOwnProperty('url')) {
                                    utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                                    server = JSON.parse(JSON.stringify(server));
                                    server.urls = server.url;
                                    newIceServers.push(server);
                                } else {
                                    newIceServers.push(pcConfig.iceServers[i]);
                                }
                            }
                            pcConfig.iceServers = newIceServers;
                        }
                        return new OrigPeerConnection(pcConfig, pcConstraints);
                    };
                    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
                    // wrap static methods. Currently just generateCertificate.
                    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                        get: function() {
                            return OrigPeerConnection.generateCertificate;
                        }
                    });
                }

                var origGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function(selector,
                                                                       successCallback, errorCallback) {
                    var pc = this;
                    var args = arguments;

                    // If selector is a function then we are in the old style stats so just
                    // pass back the original getStats format to avoid breaking old users.
                    if (arguments.length > 0 && typeof selector === 'function') {
                        return origGetStats.apply(this, arguments);
                    }

                    // When spec-style getStats is supported, return those when called with
                    // either no arguments or the selector argument is null.
                    if (origGetStats.length === 0 && (arguments.length === 0 ||
                            typeof arguments[0] !== 'function')) {
                        return origGetStats.apply(this, []);
                    }

                    var fixChromeStats_ = function(response) {
                        var standardReport = {};
                        var reports = response.result();
                        reports.forEach(function(report) {
                            var standardStats = {
                                id: report.id,
                                timestamp: report.timestamp,
                                type: {
                                    localcandidate: 'local-candidate',
                                    remotecandidate: 'remote-candidate'
                                }[report.type] || report.type
                            };
                            report.names().forEach(function(name) {
                                standardStats[name] = report.stat(name);
                            });
                            standardReport[standardStats.id] = standardStats;
                        });

                        return standardReport;
                    };

                    // shim getStats with maplike support
                    var makeMapStats = function(stats) {
                        return new Map(Object.keys(stats).map(function(key) {
                            return [key, stats[key]];
                        }));
                    };

                    if (arguments.length >= 2) {
                        var successCallbackWrapper_ = function(response) {
                            args[1](makeMapStats(fixChromeStats_(response)));
                        };

                        return origGetStats.apply(this, [successCallbackWrapper_,
                            arguments[0]]);
                    }

                    // promise-support
                    return new Promise(function(resolve, reject) {
                        origGetStats.apply(pc, [
                            function(response) {
                                resolve(makeMapStats(fixChromeStats_(response)));
                            }, reject]);
                    }).then(successCallback, errorCallback);
                };

                // add promise support -- natively available in Chrome 51
                if (browserDetails.version < 51) {
                    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
                        .forEach(function(method) {
                            var nativeMethod = window.RTCPeerConnection.prototype[method];
                            window.RTCPeerConnection.prototype[method] = function() {
                                var args = arguments;
                                var pc = this;
                                var promise = new Promise(function(resolve, reject) {
                                    nativeMethod.apply(pc, [args[0], resolve, reject]);
                                });
                                if (args.length < 2) {
                                    return promise;
                                }
                                return promise.then(function() {
                                        args[1].apply(null, []);
                                    },
                                    function(err) {
                                        if (args.length >= 3) {
                                            args[2].apply(null, [err]);
                                        }
                                    });
                            };
                        });
                }

                // promise support for createOffer and createAnswer. Available (without
                // bugs) since M52: crbug/619289
                if (browserDetails.version < 52) {
                    ['createOffer', 'createAnswer'].forEach(function(method) {
                        var nativeMethod = window.RTCPeerConnection.prototype[method];
                        window.RTCPeerConnection.prototype[method] = function() {
                            var pc = this;
                            if (arguments.length < 1 || (arguments.length === 1 &&
                                    typeof arguments[0] === 'object')) {
                                var opts = arguments.length === 1 ? arguments[0] : undefined;
                                return new Promise(function(resolve, reject) {
                                    nativeMethod.apply(pc, [resolve, reject, opts]);
                                });
                            }
                            return nativeMethod.apply(this, arguments);
                        };
                    });
                }

                // shim implicit creation of RTCSessionDescription/RTCIceCandidate
                ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
                    .forEach(function(method) {
                        var nativeMethod = window.RTCPeerConnection.prototype[method];
                        window.RTCPeerConnection.prototype[method] = function() {
                            arguments[0] = new ((method === 'addIceCandidate') ?
                                window.RTCIceCandidate :
                                window.RTCSessionDescription)(arguments[0]);
                            return nativeMethod.apply(this, arguments);
                        };
                    });

                // support for addIceCandidate(null or undefined)
                var nativeAddIceCandidate =
                    window.RTCPeerConnection.prototype.addIceCandidate;
                window.RTCPeerConnection.prototype.addIceCandidate = function() {
                    if (!arguments[0]) {
                        if (arguments[1]) {
                            arguments[1].apply(null);
                        }
                        return Promise.resolve();
                    }
                    return nativeAddIceCandidate.apply(this, arguments);
                };
            }
        };

    },{"../utils.js":14,"./getusermedia":6}],6:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';
        var utils = require('../utils.js');
        var logging = utils.log;

// Expose public methods.
        module.exports = function(window) {
            var browserDetails = utils.detectBrowser(window);
            var navigator = window && window.navigator;

            var constraintsToChrome_ = function(c) {
                if (typeof c !== 'object' || c.mandatory || c.optional) {
                    return c;
                }
                var cc = {};
                Object.keys(c).forEach(function(key) {
                    if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                        return;
                    }
                    var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
                    if (r.exact !== undefined && typeof r.exact === 'number') {
                        r.min = r.max = r.exact;
                    }
                    var oldname_ = function(prefix, name) {
                        if (prefix) {
                            return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                        }
                        return (name === 'deviceId') ? 'sourceId' : name;
                    };
                    if (r.ideal !== undefined) {
                        cc.optional = cc.optional || [];
                        var oc = {};
                        if (typeof r.ideal === 'number') {
                            oc[oldname_('min', key)] = r.ideal;
                            cc.optional.push(oc);
                            oc = {};
                            oc[oldname_('max', key)] = r.ideal;
                            cc.optional.push(oc);
                        } else {
                            oc[oldname_('', key)] = r.ideal;
                            cc.optional.push(oc);
                        }
                    }
                    if (r.exact !== undefined && typeof r.exact !== 'number') {
                        cc.mandatory = cc.mandatory || {};
                        cc.mandatory[oldname_('', key)] = r.exact;
                    } else {
                        ['min', 'max'].forEach(function(mix) {
                            if (r[mix] !== undefined) {
                                cc.mandatory = cc.mandatory || {};
                                cc.mandatory[oldname_(mix, key)] = r[mix];
                            }
                        });
                    }
                });
                if (c.advanced) {
                    cc.optional = (cc.optional || []).concat(c.advanced);
                }
                return cc;
            };

            var shimConstraints_ = function(constraints, func) {
                if (browserDetails.version >= 61) {
                    return func(constraints);
                }
                constraints = JSON.parse(JSON.stringify(constraints));
                if (constraints && typeof constraints.audio === 'object') {
                    var remap = function(obj, a, b) {
                        if (a in obj && !(b in obj)) {
                            obj[b] = obj[a];
                            delete obj[a];
                        }
                    };
                    constraints = JSON.parse(JSON.stringify(constraints));
                    remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
                    remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
                    constraints.audio = constraintsToChrome_(constraints.audio);
                }
                if (constraints && typeof constraints.video === 'object') {
                    // Shim facingMode for mobile & surface pro.
                    var face = constraints.video.facingMode;
                    face = face && ((typeof face === 'object') ? face : {ideal: face});
                    var getSupportedFacingModeLies = browserDetails.version < 66;

                    if ((face && (face.exact === 'user' || face.exact === 'environment' ||
                            face.ideal === 'user' || face.ideal === 'environment')) &&
                        !(navigator.mediaDevices.getSupportedConstraints &&
                            navigator.mediaDevices.getSupportedConstraints().facingMode &&
                            !getSupportedFacingModeLies)) {
                        delete constraints.video.facingMode;
                        var matches;
                        if (face.exact === 'environment' || face.ideal === 'environment') {
                            matches = ['back', 'rear'];
                        } else if (face.exact === 'user' || face.ideal === 'user') {
                            matches = ['front'];
                        }
                        if (matches) {
                            // Look for matches in label, or use last cam for back (typical).
                            return navigator.mediaDevices.enumerateDevices()
                                .then(function(devices) {
                                    devices = devices.filter(function(d) {
                                        return d.kind === 'videoinput';
                                    });
                                    var dev = devices.find(function(d) {
                                        return matches.some(function(match) {
                                            return d.label.toLowerCase().indexOf(match) !== -1;
                                        });
                                    });
                                    if (!dev && devices.length && matches.indexOf('back') !== -1) {
                                        dev = devices[devices.length - 1]; // more likely the back cam
                                    }
                                    if (dev) {
                                        constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
                                            {ideal: dev.deviceId};
                                    }
                                    constraints.video = constraintsToChrome_(constraints.video);
                                    logging('chrome: ' + JSON.stringify(constraints));
                                    return func(constraints);
                                });
                        }
                    }
                    constraints.video = constraintsToChrome_(constraints.video);
                }
                logging('chrome: ' + JSON.stringify(constraints));
                return func(constraints);
            };

            var shimError_ = function(e) {
                return {
                    name: {
                        PermissionDeniedError: 'NotAllowedError',
                        PermissionDismissedError: 'NotAllowedError',
                        InvalidStateError: 'NotAllowedError',
                        DevicesNotFoundError: 'NotFoundError',
                        ConstraintNotSatisfiedError: 'OverconstrainedError',
                        TrackStartError: 'NotReadableError',
                        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                        MediaDeviceKillSwitchOn: 'NotAllowedError',
                        TabCaptureError: 'AbortError',
                        ScreenCaptureError: 'AbortError',
                        DeviceCaptureError: 'AbortError'
                    }[e.name] || e.name,
                    message: e.message,
                    constraint: e.constraintName,
                    toString: function() {
                        return this.name + (this.message && ': ') + this.message;
                    }
                };
            };

            var getUserMedia_ = function(constraints, onSuccess, onError) {
                shimConstraints_(constraints, function(c) {
                    navigator.webkitGetUserMedia(c, onSuccess, function(e) {
                        if (onError) {
                            onError(shimError_(e));
                        }
                    });
                });
            };

            navigator.getUserMedia = getUserMedia_;

            // Returns the result of getUserMedia as a Promise.
            var getUserMediaPromise_ = function(constraints) {
                return new Promise(function(resolve, reject) {
                    navigator.getUserMedia(constraints, resolve, reject);
                });
            };

            if (!navigator.mediaDevices) {
                navigator.mediaDevices = {
                    getUserMedia: getUserMediaPromise_,
                    enumerateDevices: function() {
                        return new Promise(function(resolve) {
                            var kinds = {audio: 'audioinput', video: 'videoinput'};
                            return window.MediaStreamTrack.getSources(function(devices) {
                                resolve(devices.map(function(device) {
                                    return {label: device.label,
                                        kind: kinds[device.kind],
                                        deviceId: device.id,
                                        groupId: ''};
                                }));
                            });
                        });
                    },
                    getSupportedConstraints: function() {
                        return {
                            deviceId: true, echoCancellation: true, facingMode: true,
                            frameRate: true, height: true, width: true
                        };
                    }
                };
            }

            // A shim for getUserMedia method on the mediaDevices object.
            // TODO(KaptenJansson) remove once implemented in Chrome stable.
            if (!navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia = function(constraints) {
                    return getUserMediaPromise_(constraints);
                };
            } else {
                // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
                // function which returns a Promise, it does not accept spec-style
                // constraints.
                var origGetUserMedia = navigator.mediaDevices.getUserMedia.
                bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(cs) {
                    return shimConstraints_(cs, function(c) {
                        return origGetUserMedia(c).then(function(stream) {
                            if (c.audio && !stream.getAudioTracks().length ||
                                c.video && !stream.getVideoTracks().length) {
                                stream.getTracks().forEach(function(track) {
                                    track.stop();
                                });
                                throw new DOMException('', 'NotFoundError');
                            }
                            return stream;
                        }, function(e) {
                            return Promise.reject(shimError_(e));
                        });
                    });
                };
            }

            // Dummy devicechange event methods.
            // TODO(KaptenJansson) remove once implemented in Chrome stable.
            if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
                navigator.mediaDevices.addEventListener = function() {
                    logging('Dummy mediaDevices.addEventListener called.');
                };
            }
            if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
                navigator.mediaDevices.removeEventListener = function() {
                    logging('Dummy mediaDevices.removeEventListener called.');
                };
            }
        };

    },{"../utils.js":14}],7:[function(require,module,exports){
        /*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var SDPUtils = require('sdp');
        var utils = require('./utils');

        module.exports = {
            shimRTCIceCandidate: function(window) {
                // foundation is arbitrarily chosen as an indicator for full support for
                // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
                if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'foundation' in
                        window.RTCIceCandidate.prototype)) {
                    return;
                }

                var NativeRTCIceCandidate = window.RTCIceCandidate;
                window.RTCIceCandidate = function(args) {
                    // Remove the a= which shouldn't be part of the candidate string.
                    if (typeof args === 'object' && args.candidate &&
                        args.candidate.indexOf('a=') === 0) {
                        args = JSON.parse(JSON.stringify(args));
                        args.candidate = args.candidate.substr(2);
                    }

                    if (args.candidate && args.candidate.length) {
                        // Augment the native candidate with the parsed fields.
                        var nativeCandidate = new NativeRTCIceCandidate(args);
                        var parsedCandidate = SDPUtils.parseCandidate(args.candidate);
                        var augmentedCandidate = Object.assign(nativeCandidate,
                            parsedCandidate);

                        // Add a serializer that does not serialize the extra attributes.
                        augmentedCandidate.toJSON = function() {
                            return {
                                candidate: augmentedCandidate.candidate,
                                sdpMid: augmentedCandidate.sdpMid,
                                sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                                usernameFragment: augmentedCandidate.usernameFragment,
                            };
                        };
                        return augmentedCandidate;
                    }
                    return new NativeRTCIceCandidate(args);
                };
                window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

                // Hook up the augmented candidate in onicecandidate and
                // addEventListener('icecandidate', ...)
                utils.wrapPeerConnectionEvent(window, 'icecandidate', function(e) {
                    if (e.candidate) {
                        Object.defineProperty(e, 'candidate', {
                            value: new window.RTCIceCandidate(e.candidate),
                            writable: 'false'
                        });
                    }
                    return e;
                });
            },

            // shimCreateObjectURL must be called before shimSourceObject to avoid loop.

            shimCreateObjectURL: function(window) {
                var URL = window && window.URL;

                if (!(typeof window === 'object' && window.HTMLMediaElement &&
                        'srcObject' in window.HTMLMediaElement.prototype &&
                        URL.createObjectURL && URL.revokeObjectURL)) {
                    // Only shim CreateObjectURL using srcObject if srcObject exists.
                    return undefined;
                }

                var nativeCreateObjectURL = URL.createObjectURL.bind(URL);
                var nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL);
                var streams = new Map(), newId = 0;

                URL.createObjectURL = function(stream) {
                    if ('getTracks' in stream) {
                        var url = 'polyblob:' + (++newId);
                        streams.set(url, stream);
                        utils.deprecated('URL.createObjectURL(stream)',
                            'elem.srcObject = stream');
                        return url;
                    }
                    return nativeCreateObjectURL(stream);
                };
                URL.revokeObjectURL = function(url) {
                    nativeRevokeObjectURL(url);
                    streams.delete(url);
                };

                var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype,
                    'src');
                Object.defineProperty(window.HTMLMediaElement.prototype, 'src', {
                    get: function() {
                        return dsc.get.apply(this);
                    },
                    set: function(url) {
                        this.srcObject = streams.get(url) || null;
                        return dsc.set.apply(this, [url]);
                    }
                });

                var nativeSetAttribute = window.HTMLMediaElement.prototype.setAttribute;
                window.HTMLMediaElement.prototype.setAttribute = function() {
                    if (arguments.length === 2 &&
                        ('' + arguments[0]).toLowerCase() === 'src') {
                        this.srcObject = streams.get(arguments[1]) || null;
                    }
                    return nativeSetAttribute.apply(this, arguments);
                };
            },

            shimMaxMessageSize: function(window) {
                if (window.RTCSctpTransport || !window.RTCPeerConnection) {
                    return;
                }
                var browserDetails = utils.detectBrowser(window);

                if (!('sctp' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
                        get: function() {
                            return typeof this._sctp === 'undefined' ? null : this._sctp;
                        }
                    });
                }

                var sctpInDescription = function(description) {
                    var sections = SDPUtils.splitSections(description.sdp);
                    sections.shift();
                    return sections.some(function(mediaSection) {
                        var mLine = SDPUtils.parseMLine(mediaSection);
                        return mLine && mLine.kind === 'application'
                            && mLine.protocol.indexOf('SCTP') !== -1;
                    });
                };

                var getRemoteFirefoxVersion = function(description) {
                    // TODO: Is there a better solution for detecting Firefox?
                    var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                    if (match === null || match.length < 2) {
                        return -1;
                    }
                    var version = parseInt(match[1], 10);
                    // Test for NaN (yes, this is ugly)
                    return version !== version ? -1 : version;
                };

                var getCanSendMaxMessageSize = function(remoteIsFirefox) {
                    // Every implementation we know can send at least 64 KiB.
                    // Note: Although Chrome is technically able to send up to 256 KiB, the
                    //       data does not reach the other peer reliably.
                    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
                    var canSendMaxMessageSize = 65536;
                    if (browserDetails.browser === 'firefox') {
                        if (browserDetails.version < 57) {
                            if (remoteIsFirefox === -1) {
                                // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                                // fragmentation.
                                canSendMaxMessageSize = 16384;
                            } else {
                                // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                                // messages. Thus, supporting ~2 GiB when sending.
                                canSendMaxMessageSize = 2147483637;
                            }
                        } else if (browserDetails.version < 60) {
                            // Currently, all FF >= 57 will reset the remote maximum message size
                            // to the default value when a data channel is created at a later
                            // stage. :(
                            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                            canSendMaxMessageSize =
                                browserDetails.version === 57 ? 65535 : 65536;
                        } else {
                            // FF >= 60 supports sending ~2 GiB
                            canSendMaxMessageSize = 2147483637;
                        }
                    }
                    return canSendMaxMessageSize;
                };

                var getMaxMessageSize = function(description, remoteIsFirefox) {
                    // Note: 65536 bytes is the default value from the SDP spec. Also,
                    //       every implementation we know supports receiving 65536 bytes.
                    var maxMessageSize = 65536;

                    // FF 57 has a slightly incorrect default remote max message size, so
                    // we need to adjust it here to avoid a failure when sending.
                    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
                    if (browserDetails.browser === 'firefox'
                        && browserDetails.version === 57) {
                        maxMessageSize = 65535;
                    }

                    var match = SDPUtils.matchPrefix(description.sdp, 'a=max-message-size:');
                    if (match.length > 0) {
                        maxMessageSize = parseInt(match[0].substr(19), 10);
                    } else if (browserDetails.browser === 'firefox' &&
                        remoteIsFirefox !== -1) {
                        // If the maximum message size is not present in the remote SDP and
                        // both local and remote are Firefox, the remote peer can receive
                        // ~2 GiB.
                        maxMessageSize = 2147483637;
                    }
                    return maxMessageSize;
                };

                var origSetRemoteDescription =
                    window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function() {
                    var pc = this;
                    pc._sctp = null;

                    if (sctpInDescription(arguments[0])) {
                        // Check if the remote is FF.
                        var isFirefox = getRemoteFirefoxVersion(arguments[0]);

                        // Get the maximum message size the local peer is capable of sending
                        var canSendMMS = getCanSendMaxMessageSize(isFirefox);

                        // Get the maximum message size of the remote peer.
                        var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

                        // Determine final maximum message size
                        var maxMessageSize;
                        if (canSendMMS === 0 && remoteMMS === 0) {
                            maxMessageSize = Number.POSITIVE_INFINITY;
                        } else if (canSendMMS === 0 || remoteMMS === 0) {
                            maxMessageSize = Math.max(canSendMMS, remoteMMS);
                        } else {
                            maxMessageSize = Math.min(canSendMMS, remoteMMS);
                        }

                        // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
                        // attribute.
                        var sctp = {};
                        Object.defineProperty(sctp, 'maxMessageSize', {
                            get: function() {
                                return maxMessageSize;
                            }
                        });
                        pc._sctp = sctp;
                    }

                    return origSetRemoteDescription.apply(pc, arguments);
                };
            },

            shimSendThrowTypeError: function(window) {
                if (!(window.RTCPeerConnection &&
                        'createDataChannel' in window.RTCPeerConnection.prototype)) {
                    return;
                }

                // Note: Although Firefox >= 57 has a native implementation, the maximum
                //       message size can be reset for all data channels at a later stage.
                //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

                function wrapDcSend(dc, pc) {
                    var origDataChannelSend = dc.send;
                    dc.send = function() {
                        var data = arguments[0];
                        var length = data.length || data.size || data.byteLength;
                        if (dc.readyState === 'open' &&
                            pc.sctp && length > pc.sctp.maxMessageSize) {
                            throw new TypeError('Message too large (can send a maximum of ' +
                                pc.sctp.maxMessageSize + ' bytes)');
                        }
                        return origDataChannelSend.apply(dc, arguments);
                    };
                }
                var origCreateDataChannel =
                    window.RTCPeerConnection.prototype.createDataChannel;
                window.RTCPeerConnection.prototype.createDataChannel = function() {
                    var pc = this;
                    var dataChannel = origCreateDataChannel.apply(pc, arguments);
                    wrapDcSend(dataChannel, pc);
                    return dataChannel;
                };
                utils.wrapPeerConnectionEvent(window, 'datachannel', function(e) {
                    wrapDcSend(e.channel, e.target);
                    return e;
                });
            }
        };

    },{"./utils":14,"sdp":2}],8:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var utils = require('../utils');
        var filterIceServers = require('./filtericeservers');
        var shimRTCPeerConnection = require('rtcpeerconnection-shim');

        module.exports = {
            shimGetUserMedia: require('./getusermedia'),
            shimPeerConnection: function(window) {
                var browserDetails = utils.detectBrowser(window);

                if (window.RTCIceGatherer) {
                    if (!window.RTCIceCandidate) {
                        window.RTCIceCandidate = function(args) {
                            return args;
                        };
                    }
                    if (!window.RTCSessionDescription) {
                        window.RTCSessionDescription = function(args) {
                            return args;
                        };
                    }
                    // this adds an additional event listener to MediaStrackTrack that signals
                    // when a tracks enabled property was changed. Workaround for a bug in
                    // addStream, see below. No longer required in 15025+
                    if (browserDetails.version < 15025) {
                        var origMSTEnabled = Object.getOwnPropertyDescriptor(
                            window.MediaStreamTrack.prototype, 'enabled');
                        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                            set: function(value) {
                                origMSTEnabled.set.call(this, value);
                                var ev = new Event('enabled');
                                ev.enabled = value;
                                this.dispatchEvent(ev);
                            }
                        });
                    }
                }

                // ORTC defines the DTMF sender a bit different.
                // https://github.com/w3c/ortc/issues/714
                if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
                    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
                        get: function() {
                            if (this._dtmf === undefined) {
                                if (this.track.kind === 'audio') {
                                    this._dtmf = new window.RTCDtmfSender(this);
                                } else if (this.track.kind === 'video') {
                                    this._dtmf = null;
                                }
                            }
                            return this._dtmf;
                        }
                    });
                }
                // Edge currently only implements the RTCDtmfSender, not the
                // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
                if (window.RTCDtmfSender && !window.RTCDTMFSender) {
                    window.RTCDTMFSender = window.RTCDtmfSender;
                }

                var RTCPeerConnectionShim = shimRTCPeerConnection(window,
                    browserDetails.version);
                window.RTCPeerConnection = function(config) {
                    if (config.iceServers) {
                        config.iceServers = filterIceServers(config.iceServers);
                    }
                    return new RTCPeerConnectionShim(config);
                };
                window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
            },
            shimReplaceTrack: function(window) {
                // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
                if (window.RTCRtpSender &&
                    !('replaceTrack' in window.RTCRtpSender.prototype)) {
                    window.RTCRtpSender.prototype.replaceTrack =
                        window.RTCRtpSender.prototype.setTrack;
                }
            }
        };

    },{"../utils":14,"./filtericeservers":9,"./getusermedia":10,"rtcpeerconnection-shim":1}],9:[function(require,module,exports){
        /*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var utils = require('../utils');
// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
        module.exports = function(iceServers, edgeVersion) {
            var hasTurn = false;
            iceServers = JSON.parse(JSON.stringify(iceServers));
            return iceServers.filter(function(server) {
                if (server && (server.urls || server.url)) {
                    var urls = server.urls || server.url;
                    if (server.url && !server.urls) {
                        utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                    }
                    var isString = typeof urls === 'string';
                    if (isString) {
                        urls = [urls];
                    }
                    urls = urls.filter(function(url) {
                        var validTurn = url.indexOf('turn:') === 0 &&
                            url.indexOf('transport=udp') !== -1 &&
                            url.indexOf('turn:[') === -1 &&
                            !hasTurn;

                        if (validTurn) {
                            hasTurn = true;
                            return true;
                        }
                        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
                            url.indexOf('?transport=udp') === -1;
                    });

                    delete server.url;
                    server.urls = isString ? urls[0] : urls;
                    return !!urls.length;
                }
            });
        };

    },{"../utils":14}],10:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

// Expose public methods.
        module.exports = function(window) {
            var navigator = window && window.navigator;

            var shimError_ = function(e) {
                return {
                    name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
                    message: e.message,
                    constraint: e.constraint,
                    toString: function() {
                        return this.name;
                    }
                };
            };

            // getUserMedia error shim.
            var origGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
            navigator.mediaDevices.getUserMedia = function(c) {
                return origGetUserMedia(c).catch(function(e) {
                    return Promise.reject(shimError_(e));
                });
            };
        };

    },{}],11:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var utils = require('../utils');

        module.exports = {
            shimGetUserMedia: require('./getusermedia'),
            shimOnTrack: function(window) {
                if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
                        window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
                        get: function() {
                            return this._ontrack;
                        },
                        set: function(f) {
                            if (this._ontrack) {
                                this.removeEventListener('track', this._ontrack);
                                this.removeEventListener('addstream', this._ontrackpoly);
                            }
                            this.addEventListener('track', this._ontrack = f);
                            this.addEventListener('addstream', this._ontrackpoly = function(e) {
                                e.stream.getTracks().forEach(function(track) {
                                    var event = new Event('track');
                                    event.track = track;
                                    event.receiver = {track: track};
                                    event.transceiver = {receiver: event.receiver};
                                    event.streams = [e.stream];
                                    this.dispatchEvent(event);
                                }.bind(this));
                            }.bind(this));
                        }
                    });
                }
                if (typeof window === 'object' && window.RTCTrackEvent &&
                    ('receiver' in window.RTCTrackEvent.prototype) &&
                    !('transceiver' in window.RTCTrackEvent.prototype)) {
                    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
                        get: function() {
                            return {receiver: this.receiver};
                        }
                    });
                }
            },

            shimSourceObject: function(window) {
                // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
                if (typeof window === 'object') {
                    if (window.HTMLMediaElement &&
                        !('srcObject' in window.HTMLMediaElement.prototype)) {
                        // Shim the srcObject property, once, when HTMLMediaElement is found.
                        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
                            get: function() {
                                return this.mozSrcObject;
                            },
                            set: function(stream) {
                                this.mozSrcObject = stream;
                            }
                        });
                    }
                }
            },

            shimPeerConnection: function(window) {
                var browserDetails = utils.detectBrowser(window);

                if (typeof window !== 'object' || !(window.RTCPeerConnection ||
                        window.mozRTCPeerConnection)) {
                    return; // probably media.peerconnection.enabled=false in about:config
                }
                // The RTCPeerConnection object.
                if (!window.RTCPeerConnection) {
                    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
                        if (browserDetails.version < 38) {
                            // .urls is not supported in FF < 38.
                            // create RTCIceServers with a single url.
                            if (pcConfig && pcConfig.iceServers) {
                                var newIceServers = [];
                                for (var i = 0; i < pcConfig.iceServers.length; i++) {
                                    var server = pcConfig.iceServers[i];
                                    if (server.hasOwnProperty('urls')) {
                                        for (var j = 0; j < server.urls.length; j++) {
                                            var newServer = {
                                                url: server.urls[j]
                                            };
                                            if (server.urls[j].indexOf('turn') === 0) {
                                                newServer.username = server.username;
                                                newServer.credential = server.credential;
                                            }
                                            newIceServers.push(newServer);
                                        }
                                    } else {
                                        newIceServers.push(pcConfig.iceServers[i]);
                                    }
                                }
                                pcConfig.iceServers = newIceServers;
                            }
                        }
                        return new window.mozRTCPeerConnection(pcConfig, pcConstraints);
                    };
                    window.RTCPeerConnection.prototype =
                        window.mozRTCPeerConnection.prototype;

                    // wrap static methods. Currently just generateCertificate.
                    if (window.mozRTCPeerConnection.generateCertificate) {
                        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                            get: function() {
                                return window.mozRTCPeerConnection.generateCertificate;
                            }
                        });
                    }

                    window.RTCSessionDescription = window.mozRTCSessionDescription;
                    window.RTCIceCandidate = window.mozRTCIceCandidate;
                }

                // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
                ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
                    .forEach(function(method) {
                        var nativeMethod = window.RTCPeerConnection.prototype[method];
                        window.RTCPeerConnection.prototype[method] = function() {
                            arguments[0] = new ((method === 'addIceCandidate') ?
                                window.RTCIceCandidate :
                                window.RTCSessionDescription)(arguments[0]);
                            return nativeMethod.apply(this, arguments);
                        };
                    });

                // support for addIceCandidate(null or undefined)
                var nativeAddIceCandidate =
                    window.RTCPeerConnection.prototype.addIceCandidate;
                window.RTCPeerConnection.prototype.addIceCandidate = function() {
                    if (!arguments[0]) {
                        if (arguments[1]) {
                            arguments[1].apply(null);
                        }
                        return Promise.resolve();
                    }
                    return nativeAddIceCandidate.apply(this, arguments);
                };

                // shim getStats with maplike support
                var makeMapStats = function(stats) {
                    var map = new Map();
                    Object.keys(stats).forEach(function(key) {
                        map.set(key, stats[key]);
                        map[key] = stats[key];
                    });
                    return map;
                };

                var modernStatsTypes = {
                    inboundrtp: 'inbound-rtp',
                    outboundrtp: 'outbound-rtp',
                    candidatepair: 'candidate-pair',
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                };

                var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function(
                    selector,
                    onSucc,
                    onErr
                ) {
                    return nativeGetStats.apply(this, [selector || null])
                        .then(function(stats) {
                            if (browserDetails.version < 48) {
                                stats = makeMapStats(stats);
                            }
                            if (browserDetails.version < 53 && !onSucc) {
                                // Shim only promise getStats with spec-hyphens in type names
                                // Leave callback version alone; misc old uses of forEach before Map
                                try {
                                    stats.forEach(function(stat) {
                                        stat.type = modernStatsTypes[stat.type] || stat.type;
                                    });
                                } catch (e) {
                                    if (e.name !== 'TypeError') {
                                        throw e;
                                    }
                                    // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                                    stats.forEach(function(stat, i) {
                                        stats.set(i, Object.assign({}, stat, {
                                            type: modernStatsTypes[stat.type] || stat.type
                                        }));
                                    });
                                }
                            }
                            return stats;
                        })
                        .then(onSucc, onErr);
                };
            },

            shimSenderGetStats: function(window) {
                if (!(typeof window === 'object' && window.RTCPeerConnection &&
                        window.RTCRtpSender)) {
                    return;
                }
                if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
                    return;
                }
                var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                if (origGetSenders) {
                    window.RTCPeerConnection.prototype.getSenders = function() {
                        var pc = this;
                        var senders = origGetSenders.apply(pc, []);
                        senders.forEach(function(sender) {
                            sender._pc = pc;
                        });
                        return senders;
                    };
                }

                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                if (origAddTrack) {
                    window.RTCPeerConnection.prototype.addTrack = function() {
                        var sender = origAddTrack.apply(this, arguments);
                        sender._pc = this;
                        return sender;
                    };
                }
                window.RTCRtpSender.prototype.getStats = function() {
                    return this.track ? this._pc.getStats(this.track) :
                        Promise.resolve(new Map());
                };
            },

            shimReceiverGetStats: function(window) {
                if (!(typeof window === 'object' && window.RTCPeerConnection &&
                        window.RTCRtpSender)) {
                    return;
                }
                if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
                    return;
                }
                var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                if (origGetReceivers) {
                    window.RTCPeerConnection.prototype.getReceivers = function() {
                        var pc = this;
                        var receivers = origGetReceivers.apply(pc, []);
                        receivers.forEach(function(receiver) {
                            receiver._pc = pc;
                        });
                        return receivers;
                    };
                }
                utils.wrapPeerConnectionEvent(window, 'track', function(e) {
                    e.receiver._pc = e.srcElement;
                    return e;
                });
                window.RTCRtpReceiver.prototype.getStats = function() {
                    return this._pc.getStats(this.track);
                };
            },

            shimRemoveStream: function(window) {
                if (!window.RTCPeerConnection ||
                    'removeStream' in window.RTCPeerConnection.prototype) {
                    return;
                }
                window.RTCPeerConnection.prototype.removeStream = function(stream) {
                    var pc = this;
                    utils.deprecated('removeStream', 'removeTrack');
                    this.getSenders().forEach(function(sender) {
                        if (sender.track && stream.getTracks().indexOf(sender.track) !== -1) {
                            pc.removeTrack(sender);
                        }
                    });
                };
            },

            shimRTCDataChannel: function(window) {
                // rename DataChannel to RTCDataChannel (native fix in FF60):
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
                if (window.DataChannel && !window.RTCDataChannel) {
                    window.RTCDataChannel = window.DataChannel;
                }
            },
        };

    },{"../utils":14,"./getusermedia":12}],12:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var utils = require('../utils');
        var logging = utils.log;

// Expose public methods.
        module.exports = function(window) {
            var browserDetails = utils.detectBrowser(window);
            var navigator = window && window.navigator;
            var MediaStreamTrack = window && window.MediaStreamTrack;

            var shimError_ = function(e) {
                return {
                    name: {
                        InternalError: 'NotReadableError',
                        NotSupportedError: 'TypeError',
                        PermissionDeniedError: 'NotAllowedError',
                        SecurityError: 'NotAllowedError'
                    }[e.name] || e.name,
                    message: {
                        'The operation is insecure.': 'The request is not allowed by the ' +
                        'user agent or the platform in the current context.'
                    }[e.message] || e.message,
                    constraint: e.constraint,
                    toString: function() {
                        return this.name + (this.message && ': ') + this.message;
                    }
                };
            };

            // getUserMedia constraints shim.
            var getUserMedia_ = function(constraints, onSuccess, onError) {
                var constraintsToFF37_ = function(c) {
                    if (typeof c !== 'object' || c.require) {
                        return c;
                    }
                    var require = [];
                    Object.keys(c).forEach(function(key) {
                        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                            return;
                        }
                        var r = c[key] = (typeof c[key] === 'object') ?
                            c[key] : {ideal: c[key]};
                        if (r.min !== undefined ||
                            r.max !== undefined || r.exact !== undefined) {
                            require.push(key);
                        }
                        if (r.exact !== undefined) {
                            if (typeof r.exact === 'number') {
                                r. min = r.max = r.exact;
                            } else {
                                c[key] = r.exact;
                            }
                            delete r.exact;
                        }
                        if (r.ideal !== undefined) {
                            c.advanced = c.advanced || [];
                            var oc = {};
                            if (typeof r.ideal === 'number') {
                                oc[key] = {min: r.ideal, max: r.ideal};
                            } else {
                                oc[key] = r.ideal;
                            }
                            c.advanced.push(oc);
                            delete r.ideal;
                            if (!Object.keys(r).length) {
                                delete c[key];
                            }
                        }
                    });
                    if (require.length) {
                        c.require = require;
                    }
                    return c;
                };
                constraints = JSON.parse(JSON.stringify(constraints));
                if (browserDetails.version < 38) {
                    logging('spec: ' + JSON.stringify(constraints));
                    if (constraints.audio) {
                        constraints.audio = constraintsToFF37_(constraints.audio);
                    }
                    if (constraints.video) {
                        constraints.video = constraintsToFF37_(constraints.video);
                    }
                    logging('ff37: ' + JSON.stringify(constraints));
                }
                return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
                    onError(shimError_(e));
                });
            };

            // Returns the result of getUserMedia as a Promise.
            var getUserMediaPromise_ = function(constraints) {
                return new Promise(function(resolve, reject) {
                    getUserMedia_(constraints, resolve, reject);
                });
            };

            // Shim for mediaDevices on older versions.
            if (!navigator.mediaDevices) {
                navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
                    addEventListener: function() { },
                    removeEventListener: function() { }
                };
            }
            navigator.mediaDevices.enumerateDevices =
                navigator.mediaDevices.enumerateDevices || function() {
                    return new Promise(function(resolve) {
                        var infos = [
                            {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
                            {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
                        ];
                        resolve(infos);
                    });
                };

            if (browserDetails.version < 41) {
                // Work around http://bugzil.la/1169665
                var orgEnumerateDevices =
                    navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
                navigator.mediaDevices.enumerateDevices = function() {
                    return orgEnumerateDevices().then(undefined, function(e) {
                        if (e.name === 'NotFoundError') {
                            return [];
                        }
                        throw e;
                    });
                };
            }
            if (browserDetails.version < 49) {
                var origGetUserMedia = navigator.mediaDevices.getUserMedia.
                bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(c) {
                    return origGetUserMedia(c).then(function(stream) {
                        // Work around https://bugzil.la/802326
                        if (c.audio && !stream.getAudioTracks().length ||
                            c.video && !stream.getVideoTracks().length) {
                            stream.getTracks().forEach(function(track) {
                                track.stop();
                            });
                            throw new DOMException('The object can not be found here.',
                                'NotFoundError');
                        }
                        return stream;
                    }, function(e) {
                        return Promise.reject(shimError_(e));
                    });
                };
            }
            if (!(browserDetails.version > 55 &&
                    'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
                var remap = function(obj, a, b) {
                    if (a in obj && !(b in obj)) {
                        obj[b] = obj[a];
                        delete obj[a];
                    }
                };

                var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
                bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(c) {
                    if (typeof c === 'object' && typeof c.audio === 'object') {
                        c = JSON.parse(JSON.stringify(c));
                        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
                    }
                    return nativeGetUserMedia(c);
                };

                if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
                    var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
                    MediaStreamTrack.prototype.getSettings = function() {
                        var obj = nativeGetSettings.apply(this, arguments);
                        remap(obj, 'mozAutoGainControl', 'autoGainControl');
                        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                        return obj;
                    };
                }

                if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
                    var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
                    MediaStreamTrack.prototype.applyConstraints = function(c) {
                        if (this.kind === 'audio' && typeof c === 'object') {
                            c = JSON.parse(JSON.stringify(c));
                            remap(c, 'autoGainControl', 'mozAutoGainControl');
                            remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                        }
                        return nativeApplyConstraints.apply(this, [c]);
                    };
                }
            }
            navigator.getUserMedia = function(constraints, onSuccess, onError) {
                if (browserDetails.version < 44) {
                    return getUserMedia_(constraints, onSuccess, onError);
                }
                // Replace Firefox 44+'s deprecation warning with unprefixed version.
                utils.deprecated('navigator.getUserMedia',
                    'navigator.mediaDevices.getUserMedia');
                navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
            };
        };

    },{"../utils":14}],13:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        'use strict';
        var utils = require('../utils');

        module.exports = {
            shimLocalStreamsAPI: function(window) {
                if (typeof window !== 'object' || !window.RTCPeerConnection) {
                    return;
                }
                if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.getLocalStreams = function() {
                        if (!this._localStreams) {
                            this._localStreams = [];
                        }
                        return this._localStreams;
                    };
                }
                if (!('getStreamById' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.getStreamById = function(id) {
                        var result = null;
                        if (this._localStreams) {
                            this._localStreams.forEach(function(stream) {
                                if (stream.id === id) {
                                    result = stream;
                                }
                            });
                        }
                        if (this._remoteStreams) {
                            this._remoteStreams.forEach(function(stream) {
                                if (stream.id === id) {
                                    result = stream;
                                }
                            });
                        }
                        return result;
                    };
                }
                if (!('addStream' in window.RTCPeerConnection.prototype)) {
                    var _addTrack = window.RTCPeerConnection.prototype.addTrack;
                    window.RTCPeerConnection.prototype.addStream = function(stream) {
                        if (!this._localStreams) {
                            this._localStreams = [];
                        }
                        if (this._localStreams.indexOf(stream) === -1) {
                            this._localStreams.push(stream);
                        }
                        var pc = this;
                        stream.getTracks().forEach(function(track) {
                            _addTrack.call(pc, track, stream);
                        });
                    };

                    window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
                        if (stream) {
                            if (!this._localStreams) {
                                this._localStreams = [stream];
                            } else if (this._localStreams.indexOf(stream) === -1) {
                                this._localStreams.push(stream);
                            }
                        }
                        return _addTrack.call(this, track, stream);
                    };
                }
                if (!('removeStream' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.removeStream = function(stream) {
                        if (!this._localStreams) {
                            this._localStreams = [];
                        }
                        var index = this._localStreams.indexOf(stream);
                        if (index === -1) {
                            return;
                        }
                        this._localStreams.splice(index, 1);
                        var pc = this;
                        var tracks = stream.getTracks();
                        this.getSenders().forEach(function(sender) {
                            if (tracks.indexOf(sender.track) !== -1) {
                                pc.removeTrack(sender);
                            }
                        });
                    };
                }
            },
            shimRemoteStreamsAPI: function(window) {
                if (typeof window !== 'object' || !window.RTCPeerConnection) {
                    return;
                }
                if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.getRemoteStreams = function() {
                        return this._remoteStreams ? this._remoteStreams : [];
                    };
                }
                if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
                        get: function() {
                            return this._onaddstream;
                        },
                        set: function(f) {
                            var pc = this;
                            if (this._onaddstream) {
                                this.removeEventListener('addstream', this._onaddstream);
                                this.removeEventListener('track', this._onaddstreampoly);
                            }
                            this.addEventListener('addstream', this._onaddstream = f);
                            this.addEventListener('track', this._onaddstreampoly = function(e) {
                                e.streams.forEach(function(stream) {
                                    if (!pc._remoteStreams) {
                                        pc._remoteStreams = [];
                                    }
                                    if (pc._remoteStreams.indexOf(stream) >= 0) {
                                        return;
                                    }
                                    pc._remoteStreams.push(stream);
                                    var event = new Event('addstream');
                                    event.stream = stream;
                                    pc.dispatchEvent(event);
                                });
                            });
                        }
                    });
                }
            },
            shimCallbacksAPI: function(window) {
                if (typeof window !== 'object' || !window.RTCPeerConnection) {
                    return;
                }
                var prototype = window.RTCPeerConnection.prototype;
                var createOffer = prototype.createOffer;
                var createAnswer = prototype.createAnswer;
                var setLocalDescription = prototype.setLocalDescription;
                var setRemoteDescription = prototype.setRemoteDescription;
                var addIceCandidate = prototype.addIceCandidate;

                prototype.createOffer = function(successCallback, failureCallback) {
                    var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
                    var promise = createOffer.apply(this, [options]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };

                prototype.createAnswer = function(successCallback, failureCallback) {
                    var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
                    var promise = createAnswer.apply(this, [options]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };

                var withCallback = function(description, successCallback, failureCallback) {
                    var promise = setLocalDescription.apply(this, [description]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.setLocalDescription = withCallback;

                withCallback = function(description, successCallback, failureCallback) {
                    var promise = setRemoteDescription.apply(this, [description]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.setRemoteDescription = withCallback;

                withCallback = function(candidate, successCallback, failureCallback) {
                    var promise = addIceCandidate.apply(this, [candidate]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.addIceCandidate = withCallback;
            },
            shimGetUserMedia: function(window) {
                var navigator = window && window.navigator;

                if (!navigator.getUserMedia) {
                    if (navigator.webkitGetUserMedia) {
                        navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
                    } else if (navigator.mediaDevices &&
                        navigator.mediaDevices.getUserMedia) {
                        navigator.getUserMedia = function(constraints, cb, errcb) {
                            navigator.mediaDevices.getUserMedia(constraints)
                                .then(cb, errcb);
                        }.bind(navigator);
                    }
                }
            },
            shimRTCIceServerUrls: function(window) {
                // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
                var OrigPeerConnection = window.RTCPeerConnection;
                window.RTCPeerConnection = function(pcConfig, pcConstraints) {
                    if (pcConfig && pcConfig.iceServers) {
                        var newIceServers = [];
                        for (var i = 0; i < pcConfig.iceServers.length; i++) {
                            var server = pcConfig.iceServers[i];
                            if (!server.hasOwnProperty('urls') &&
                                server.hasOwnProperty('url')) {
                                utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                                server = JSON.parse(JSON.stringify(server));
                                server.urls = server.url;
                                delete server.url;
                                newIceServers.push(server);
                            } else {
                                newIceServers.push(pcConfig.iceServers[i]);
                            }
                        }
                        pcConfig.iceServers = newIceServers;
                    }
                    return new OrigPeerConnection(pcConfig, pcConstraints);
                };
                window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
                // wrap static methods. Currently just generateCertificate.
                if ('generateCertificate' in window.RTCPeerConnection) {
                    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                        get: function() {
                            return OrigPeerConnection.generateCertificate;
                        }
                    });
                }
            },
            shimTrackEventTransceiver: function(window) {
                // Add event.transceiver member over deprecated event.receiver
                if (typeof window === 'object' && window.RTCPeerConnection &&
                    ('receiver' in window.RTCTrackEvent.prototype) &&
                    // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
                    // defined for some reason even when window.RTCTransceiver is not.
                    !window.RTCTransceiver) {
                    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
                        get: function() {
                            return {receiver: this.receiver};
                        }
                    });
                }
            },

            shimCreateOfferLegacy: function(window) {
                var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
                window.RTCPeerConnection.prototype.createOffer = function(offerOptions) {
                    var pc = this;
                    if (offerOptions) {
                        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                            // support bit values
                            offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
                        }
                        var audioTransceiver = pc.getTransceivers().find(function(transceiver) {
                            return transceiver.sender.track &&
                                transceiver.sender.track.kind === 'audio';
                        });
                        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                            if (audioTransceiver.direction === 'sendrecv') {
                                if (audioTransceiver.setDirection) {
                                    audioTransceiver.setDirection('sendonly');
                                } else {
                                    audioTransceiver.direction = 'sendonly';
                                }
                            } else if (audioTransceiver.direction === 'recvonly') {
                                if (audioTransceiver.setDirection) {
                                    audioTransceiver.setDirection('inactive');
                                } else {
                                    audioTransceiver.direction = 'inactive';
                                }
                            }
                        } else if (offerOptions.offerToReceiveAudio === true &&
                            !audioTransceiver) {
                            pc.addTransceiver('audio');
                        }


                        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                            // support bit values
                            offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
                        }
                        var videoTransceiver = pc.getTransceivers().find(function(transceiver) {
                            return transceiver.sender.track &&
                                transceiver.sender.track.kind === 'video';
                        });
                        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                            if (videoTransceiver.direction === 'sendrecv') {
                                videoTransceiver.setDirection('sendonly');
                            } else if (videoTransceiver.direction === 'recvonly') {
                                videoTransceiver.setDirection('inactive');
                            }
                        } else if (offerOptions.offerToReceiveVideo === true &&
                            !videoTransceiver) {
                            pc.addTransceiver('video');
                        }
                    }
                    return origCreateOffer.apply(pc, arguments);
                };
            }
        };

    },{"../utils":14}],14:[function(require,module,exports){
        /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
        /* eslint-env node */
        'use strict';

        var logDisabled_ = true;
        var deprecationWarnings_ = true;

        /**
         * Extract browser version out of the provided user agent string.
         *
         * @param {!string} uastring userAgent string.
         * @param {!string} expr Regular expression used as match criteria.
         * @param {!number} pos position in the version string to be returned.
         * @return {!number} browser version.
         */
        function extractVersion(uastring, expr, pos) {
            var match = uastring.match(expr);
            return match && match.length >= pos && parseInt(match[pos], 10);
        }

// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object.
        function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
            if (!window.RTCPeerConnection) {
                return;
            }
            var proto = window.RTCPeerConnection.prototype;
            var nativeAddEventListener = proto.addEventListener;
            proto.addEventListener = function(nativeEventName, cb) {
                if (nativeEventName !== eventNameToWrap) {
                    return nativeAddEventListener.apply(this, arguments);
                }
                var wrappedCallback = function(e) {
                    cb(wrapper(e));
                };
                this._eventMap = this._eventMap || {};
                this._eventMap[cb] = wrappedCallback;
                return nativeAddEventListener.apply(this, [nativeEventName,
                    wrappedCallback]);
            };

            var nativeRemoveEventListener = proto.removeEventListener;
            proto.removeEventListener = function(nativeEventName, cb) {
                if (nativeEventName !== eventNameToWrap || !this._eventMap
                    || !this._eventMap[cb]) {
                    return nativeRemoveEventListener.apply(this, arguments);
                }
                var unwrappedCb = this._eventMap[cb];
                delete this._eventMap[cb];
                return nativeRemoveEventListener.apply(this, [nativeEventName,
                    unwrappedCb]);
            };

            Object.defineProperty(proto, 'on' + eventNameToWrap, {
                get: function() {
                    return this['_on' + eventNameToWrap];
                },
                set: function(cb) {
                    if (this['_on' + eventNameToWrap]) {
                        this.removeEventListener(eventNameToWrap,
                            this['_on' + eventNameToWrap]);
                        delete this['_on' + eventNameToWrap];
                    }
                    if (cb) {
                        this.addEventListener(eventNameToWrap,
                            this['_on' + eventNameToWrap] = cb);
                    }
                },
                enumerable: true,
                configurable: true
            });
        }

// Utility methods.
        module.exports = {
            extractVersion: extractVersion,
            wrapPeerConnectionEvent: wrapPeerConnectionEvent,
            disableLog: function(bool) {
                if (typeof bool !== 'boolean') {
                    return new Error('Argument type: ' + typeof bool +
                        '. Please use a boolean.');
                }
                logDisabled_ = bool;
                return (bool) ? 'adapter.js logging disabled' :
                    'adapter.js logging enabled';
            },

            /**
             * Disable or enable deprecation warnings
             * @param {!boolean} bool set to true to disable warnings.
             */
            disableWarnings: function(bool) {
                if (typeof bool !== 'boolean') {
                    return new Error('Argument type: ' + typeof bool +
                        '. Please use a boolean.');
                }
                deprecationWarnings_ = !bool;
                return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
            },

            log: function() {
                if (typeof window === 'object') {
                    if (logDisabled_) {
                        return;
                    }
                    if (typeof console !== 'undefined' && typeof console.log === 'function') {
                        console.log.apply(console, arguments);
                    }
                }
            },

            /**
             * Shows a deprecation warning suggesting the modern and spec-compatible API.
             */
            deprecated: function(oldMethod, newMethod) {
                if (!deprecationWarnings_) {
                    return;
                }
                console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
                    ' instead.');
            },

            /**
             * Browser detector.
             *
             * @return {object} result containing browser and version
             *     properties.
             */
            detectBrowser: function(window) {
                var navigator = window && window.navigator;

                // Returned result object.
                var result = {};
                result.browser = null;
                result.version = null;

                // Fail early if it's not a browser
                if (typeof window === 'undefined' || !window.navigator) {
                    result.browser = 'Not a browser.';
                    return result;
                }

                if (navigator.mozGetUserMedia) { // Firefox.
                    result.browser = 'firefox';
                    result.version = extractVersion(navigator.userAgent,
                        /Firefox\/(\d+)\./, 1);
                } else if (navigator.webkitGetUserMedia) {
                    // Chrome, Chromium, Webview, Opera.
                    // Version matches Chrome/WebRTC version.
                    result.browser = 'chrome';
                    result.version = extractVersion(navigator.userAgent,
                        /Chrom(e|ium)\/(\d+)\./, 2);
                } else if (navigator.mediaDevices &&
                    navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) { // Edge.
                    result.browser = 'edge';
                    result.version = extractVersion(navigator.userAgent,
                        /Edge\/(\d+).(\d+)$/, 2);
                } else if (window.RTCPeerConnection &&
                    navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) { // Safari.
                    result.browser = 'safari';
                    result.version = extractVersion(navigator.userAgent,
                        /AppleWebKit\/(\d+)\./, 1);
                } else { // Default fallthrough: not supported.
                    result.browser = 'Not a supported browser.';
                    return result;
                }

                return result;
            }
        };

    },{}]},{},[3])(3)
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

//Service 类，会创建session(me), 并且将current属性设置为 me; 以后方法需要此值



var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Service");


var Session = __webpack_require__(10);


var Attendee = __webpack_require__(12);

var __event = __webpack_require__(11);
var EventHandler = __webpack_require__(18);

var __Desktop = __webpack_require__(19);

var __desktop = new __Desktop({
    onExtLoaded: function () {
        _logger.info("Share desktop ext. had loaded.");
    }
});

var __Stream = __webpack_require__(16);

var DefaultMouseTrack = __webpack_require__(20);

/**
 * {
 *  newSession:
 *  onCalling:
 *  onRinging:
 *
 *
 * }
 *
 *
 *
 */
module.exports = _util.prototypeExtend({
    __init__: function () {
        var self = this;

        var urlLogLevel = _util.parseURL("__log_level___");
        if(urlLogLevel){
            emedia.LOG_LEVEL = parseInt(urlLogLevel);
        }

        // if(self.ticket && _util.isPlainObject(self.ticket)){
        //     self.setup(self.ticket);
        // }

        self.namespace = Math.uuidFast();
        emedia.__easemob_current_mservice = self;

        if(self.useRTCCfg === undefined){
            self.useRTCCfg = emedia.config.useRTCCfgIfServerReturn;
        }

        if(typeof self.useRTCCfg === "string"){
            self.useRTCCfg = JSON.parse(self.useRTCCfg);
        }
    },

    AVPubstream: __Stream.extend({
        __init__: function () {
            var self = this;

            self.type = 0;
            self._located = true;

            self.mutedMuted = true;

            if(self.constaints){
                self.constaints.video || (self.voff = 1);
                self.constaints.audio || (self.aoff = 1);
            }
            //self.constaints || (self.constaints = {audio: !self.aoff, video: !self.voff});
            self.constaints || (self.constaints = {audio: true, video: true});
        }
    }),

    AudioMixerPubstream: new __Stream.extend({
        __init__: function () {
            var self = this;

            self.type = 2;
            self._located = true;

            self.mutedMuted = true;

            self.constaints || (self.constaints = {audio: true, video: false});
            if(self.constaints){
                self.constaints.audio = true;
                self.constaints.video || (self.constaints.video = false);

                self.constaints.video || (self.voff = 1);
                self.constaints.audio || (self.aoff = 1);
            }
        },

        onGotRemoteMediaStream: function(remoteMediaStream){
            var self = this;

            if(!self.remotePlayAudioObject){
                var _audioId = "__o_remote_play_audio_" + self.id;

                var audioObject = document.createElement("audio");
                audioObject.style.display = "none";
                audioObject.id = "__o_remote_play_audio_" + self.id;
                audioObject.autoplay = true;
                audioObject.playsinline = true;

                //monitorEvents && monitorEvents(audioObject);

                self.remotePlayAudioObject = audioObject;

                document.body.appendChild(audioObject);
            }

            // self.remotePlayAudioObject.autoplay = true;
            // self.remotePlayAudioObject.playsinline = true;
            self.remotePlayAudioObject.srcObject = remoteMediaStream;

            //window.__$_remoteMediaStream = remoteMediaStream;
        }
    }),

    //screenOptions ['screen', 'window', 'tab']
    ShareDesktopPubstream: __Stream.extend({
        voff: 0,

        __init__: function () {
            var self = this;

            self.type = 1;
            self._located = true;

            self.mutedMuted = true;
            self.constaints = {audio: !this.aoff, video: true};
        }
    }),

    __assertCurrent: function () {
        var self = this;
        if(!self.current){
            throw "Please call emedia.service.setup(ticket)"
        }
        if(self.current.closed){
            throw "current closed"
        }
    },

    hasAudioMixers: function () {
        var self = this;

        self.__assertCurrent();

        for(var sid in self.current.audioMixers) {
            var stream = self.current.audioMixers[sid];
            if(stream && stream.located()){
                return true;
            }
        }
    },

    getMediaDevices: function (kind, devices, errorCallback) {
        if(typeof kind === 'function'){
            errorCallback = devices;
            devices = kind;
            kind = undefined;
        }

        function gotDevices(deviceInfos) {
            var resultDeviceInfos = [];

            for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                var deviceId = deviceInfo.deviceId;

                if(!kind){
                    resultDeviceInfos.push(deviceInfo);
                }

                if(kind && kind === deviceInfo.kind){
                    resultDeviceInfos.push(deviceInfo);
                }else if (deviceInfo.kind === 'audioinput') {
                } else if (deviceInfo.kind === 'audiooutput') {
                } else if (deviceInfo.kind === 'videoinput') {
                } else {
                    _logger.info('Some other kind of source/device: ', deviceInfo);
                }
            }

            devices && devices(resultDeviceInfos);
        };

        navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(function handleError(error) {
            _logger.warn('navigator.getUserMedia error: ', error);
            errorCallback && errorCallback(error);
        });
    },

    // Attach audio output device to video element using device/sink ID.
    // sinkId deviceInfo.deviceId;
    // attachSinkId(videoElement, deviceInfo.deviceId);
    attachSinkId: function (videoObj, sinkId) {
        if (typeof videoObj.sinkId !== 'undefined') {
            videoObj.setSinkId(sinkId)
                .then(function() {
                    _logger.info('Success, audio output device attached: ' + sinkId);
                })
                .catch(function(error) {
                    var errorMessage = error;
                    if (error.name === 'SecurityError') {
                        errorMessage = 'You need to use HTTPS for selecting audio output ' + 'device: ' + error;
                    }
                    _logger.warn(errorMessage);
                });
        } else {
            _logger.warn('Browser does not support output device selection.');
        }
    },

    _stopTracks: function (_stream) {
        emedia.stopTracks(_stream);
        _stream && _logger.warn("Stream tracks stop. it = ", _stream);
    },
    _enableVideoTracks: function (_stream, enabled) {
        emedia.enableVideoTracks(_stream, enabled);
    },
    _enableAudioTracks: function (_stream, enabled) {
        emedia.enableAudioTracks(_stream, enabled);
    },

    openUserMedia: function (pubS) {
        var self = this;

        //self.__assertCurrent();

        if(!pubS){
            throw "require pubS";
        }

        return {
            then: function (success, errCallback) {
                if(pubS instanceof self.AVPubstream){
                    self._openCamera(pubS, success, errCallback);
                }else if(pubS instanceof self.ShareDesktopPubstream){
                    self._openSharedDesktop(pubS, success, errCallback)
                }else if(pubS instanceof self.AudioMixerPubstream){
                    self._openCamera(pubS, success, errCallback)
                }else{
                    throw "Unspported pubS"
                }
            }
        }
    },

    _openSharedDesktop: function (pubS, success, errCallback) {
        var self = this;

        //self.__assertCurrent();

        function getAudioStream(pubS) {
            self.__getUserMedia({audio: true}, function (_user, stream) {
                var mediaStream = new MediaStream();
                mediaStream._located = true;

                stream && stream.getAudioTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                pubS.localStream && pubS.localStream.getVideoTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                pubS.localStream = mediaStream;

                success && success(self.current, mediaStream);
            }, errCallback);
        }

        var videoTracks;
        if(pubS._localMediaStream
            && (videoTracks = pubS._localMediaStream.getVideoTracks())
            && videoTracks.length > 0){
            pubS.localStream = pubS._localMediaStream;

            if(pubS.constaints.audio){
                getAudioStream(pubS);
            }else{
                success && success(self.current, stream);
            }

            return ;
        }

        //screenOptions ['screen', 'window', 'tab']
        __desktop.openDesktopMedia(pubS.screenOptions || ['screen', 'window', 'tab'], function (_event) {
            if(_event instanceof __event.OpenDesktopMedia){
                var desktopStreamId = _event.desktopStreamId;
                _logger.warn("desktop streamId", desktopStreamId);

                var constraints = {
                    audio: false,
                    video: {
                        mandatory: pubS.mandatory || {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: desktopStreamId,
                            maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
                            maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
                        },
                        optional: []
                    }
                };

                delete pubS.mandatory;

                self.__getUserMedia(constraints, function (_me, stream) {
                    pubS.localStream = stream;

                    if(pubS.constaints.audio){
                        getAudioStream(pubS);
                    }else{
                        success && success(self.current, stream);
                    }
                }, errCallback);
            } else {
                self.current && self.current.onEvent(new __event.ShareDesktopExtensionNotFound({member: self.current}));
                errCallback && errCallback(_event);
            }
        });
    },

    _openCamera: function(pubS, success, errCallback){
        var self = this;

        //self.__assertCurrent();

        //var constaints = pubS.constaints || {audio: !pubS.aoff, video: !pubS.voff};
        var constaints = pubS.constaints || {audio: true, video: true};

        self.__getUserMedia(constaints, function (_me, stream) {
            self.__controlStream(pubS, stream);

            pubS.localStream = stream;
            success && success(self.current, stream);
        }, errCallback);
    },

    __controlStream: function (pubS, stream) {
        emedia.enableVideoTracks(stream, !pubS.voff);
        emedia.enableAudioTracks(stream, !pubS.aoff);
    },

    __getUserMedia: function (constaints, success, errCallback) {
        var self = this;

        var _openstream;

        function onSuccess(stream){
            _openstream = stream;

            var videoTracks = stream.getVideoTracks();
            var audioTracks = stream.getAudioTracks();

            if (videoTracks.length > 0) {
                _logger.debug('Using video device: ' + videoTracks[0].label);
            }
            if (audioTracks.length > 0) {
                _logger.debug('Using audio device: ' + audioTracks[0].label);
            }

            stream._located = true;

            success && success(self.current, stream);
        }

        function onFail(e) {
            _logger.debug('[WebRTC-API] getUserMedia() error: ', e);

            emedia.stopTracks(_openstream);

            self.current && self.current.onEvent(new __event.OpenMediaError({member: self.current, event: e}));
            errCallback && errCallback(new __event.OpenMediaError({member: self.current, event: e}));
        }

        navigator.mediaDevices.getUserMedia(constaints).then(onSuccess).catch(onFail);
        // navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(constaints).then(onSuccess).catch(onFail)
        //     : navigator.getUserMedia(constaints, onSuccess, onFail);
    },

    setup: function (ticket, ext) {
        var self = this;

        _logger.debug("recv ticket", ticket, ext);

        ext = ext || {};

        var extObj = ext;
        if(_util.isPlainObject(ext)){ //ext 是对象， extObj 也是对象
            ext = JSON.stringify(ext);
        }else{ //ext 是字符串， extObj 尽量转换为 对象
            try{
                extObj = JSON.parse(ext);
            }catch (e){
            }
        }

        if(typeof ticket === "string"){
            ticket = JSON.parse(ticket);
        }

        var sysUserId = memName = ticket.memName;

        if(self.current && !self.current.closed){
            var __eventCalling = new __event.CurrentCalling();
            self.current.onEvent(__eventCalling);
            throw __eventCalling;
            //return;

            //self.current.exit(0);
        }

        var TargetAttendee = self.Attendee || Attendee;
        var _Attendee = TargetAttendee.extend(EventHandler);

        var attendee = self.current = new _Attendee({
            _service: self,
            autoSub: emedia.config.autoSub,
            getCopyIntervalMillis: emedia.config.getCopyIntervalMillis,
            sysUserId: sysUserId,
            memName: memName,
            resource: self.resource,
            nickName: self.nickName,
            ticket: ticket,
            ext: ext,
            extObj: extObj,

            sessionFactory: function(){
                return self.newSession(this, ticket);
            }
        }, self.listeners || {});

        return attendee;
    },

    getStreamById: function (streamId) {
        var stream = this.current && this.current._cacheStreams[streamId];
        return stream && _util.extend(false, {}, stream);
    },

    getMemberById: function (memId) {
        var member = this.current && this.current._cacheMembers[memId];
        return member && _util.extend(false, {}, member);
    },

    exit: function (closeMyConfrIfICrtConfr) {
        _logger.warn("User click exit ", closeMyConfrIfICrtConfr);
        this.current && this.current.exit(closeMyConfrIfICrtConfr);
    },

    join: function(joined, joinError){
        _logger.debug("begin join ...");

        var self = this;

        self.__assertCurrent();
        self.current._session._sessionId = undefined;

        self.current.join(joined, joinError);
    },

    withpublish: function (pubS) {
        var self = this;

        if(!pubS || !pubS.localStream){
            throw "pubS null or stream not open";
        }

        self.__assertCurrent();
        self.current._session._sessionId = undefined;

        return self.current.withpublish(pubS);
    },

    push: function(pubS, pushed, onPushError){
        _logger.debug("begin push ...");

        var self = this;

        if(arguments.length === 2){
            onPushError = pushed;
            pushed = undefined;
        }

        if(!pubS || !pubS.localStream){
            throw "pubS or stream open";
        }

        self.__assertCurrent();
        self.current.push(pubS, pushed, onPushError, false);
    },


    subscribe: function (streamId, onSub, subfail, subArgs) {
        var self = this;

        self.__assertCurrent();

        if(arguments.length == 2){
            subfail = onSub;
            onSub = undefined;
        }

        if(onSub && _util.isPlainObject(onSub)){
            subArgs = onSub;
            onSub = undefined;
        }
        if(subfail && _util.isPlainObject(subfail)){
            subArgs = subfail;
            subfail = undefined;
        }

        subArgs || (subArgs = {subSVideo: true, subSAudio: true});


        var subStream = self.current._cacheStreams[streamId];
        // if(subStream && subStream.type === 2 && subArgs.subSAudio !== undefined && !subArgs.subSAudio){
        //     subfail && subfail(new __event.AudioMixerStreamNotAllowOnlySubVideo({stream: subStream}));
        //     self.current.onEvent(new __event.AudioMixerStreamNotAllowOnlySubVideo({stream: subStream}));
        //     return;
        // }

        var webrtc = self.current._getWebrtc(streamId);


        // if(webrtc && webrtc.isConnected() && !emedia.isSafari){
        if(webrtc && webrtc.isConnected()){
            self.current.subscribeStream(webrtc._rtcId, streamId, subfail, subArgs);
            return;
        }

        webrtc && (!webrtc.closed) && self.current.closeWebrtc(webrtc.getRtcId(), true, false);

        self.current.createWebrtcAndSubscribeStream(streamId, {
            onGotRemote: function(stream) {
                onSub && onSub(stream)
            },
            onEvent: function(_evt){
                subfail && subfail(_evt)
            }
        }, undefined, subArgs);
    },

    closePubstream: function (stream) {
        if(stream.located()){
            emedia.stopTracks(stream._localMediaStream);
            emedia.stopTracks(stream.localStream);
        }
    },

    hungup: function (streamId) {
        var stream = this.getStreamById(streamId);
        try{
            this._hungup(streamId);
        }finally{
            this.onHungup && this.onHungup(stream);
        }
    },
    _hungup: function (streamId) {
        var self = this;

        self.__assertCurrent();

        var attendee = self.current;

        var stream = attendee._cacheStreams[streamId];
        var rtcId = stream && stream.rtcId;
        if(rtcId){
            attendee.closeWebrtc(rtcId);

            if(stream.located()){
                stream.type !== 1 && stream._localMediaStream && emedia.stopTracks(stream._localMediaStream);

                if(stream.remotePlayAudioObject){
                    document.body.removeChild(stream.remotePlayAudioObject);
                }

                attendee._cacheStreams[streamId] && attendee.onRemoveStream(stream);

                delete attendee._cacheStreams[streamId];
            }
        }

        if(stream && !stream.located()){
            attendee._linkedStreams[stream.id] && (delete attendee._linkedStreams[stream.id]);
            _logger.warn("Hangeup remove from _linkedStreams. stream = ", stream.id);

            stream = attendee._cacheStreams[streamId];
            if(!stream){
                return;
            }

            var _stream = new __Stream(stream);
            stream.rtcId = _stream.rtcId = undefined;
            stream._webrtc = _stream._webrtc = undefined;
            stream.mediaStream = _stream.mediaStream = undefined;

            attendee.onUpdateStream(_stream, new _stream.Update(_stream));
        }
    },

    postMessage: function (memberIdOrStreamId, message, fail, onRsp) {
        var self = this;

        var theMessage = message;
        if(typeof message !== 'string'){
            message = JSON.stringify(message);
        }

        self.__assertCurrent();
        var attendee = self.current;

        var memberId;

        var linkedStream = attendee._linkedStreams[memberIdOrStreamId];
        if(linkedStream && linkedStream.owner){
            memberId = linkedStream.owner.id;
        }else{
            memberId = memberIdOrStreamId;
        }

        var message = attendee.newMessage({
            op: 1003,
            memId: memberId,
            arg: message
        });

        attendee.postMessage(message, (fail || onRsp) && function (rsp) {
            onRsp && onRsp(rsp, theMessage);

            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({memId: memberId, failed: rsp.result, cause: rsp.msg, type: "postMessage", postMessage: message});
                attendee.onEvent(_evt);

                fail && fail(_evt, theMessage);

                return;
            }
        });
    },

    torchRemote: function (streamId, torch, success, fail) {
        var self = this;

        if(typeof torch === 'function'){
            fail = success;
            success = torch;
            torch = undefined;
        }

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var lastTorch = linkedStream.torch;
        var torch = (torch === undefined) ? (!linkedStream.torch ? 1 : 0) : torch;

        var arg = {
            op2: 20,
            streamId: streamId,
            tor: torch,
        };

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100206]
        });

        linkedStream.torch = torch;

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "torch_control"});
                attendee.onEvent(_evt);

                linkedStream.torch = lastTorch;

                fail && fail(_evt, linkedStream.torch);

                return;
            } else {
                success && success(linkedStream.torch);
            }
        });
    },

    freezeFrameRemote: function (streamId, success, fail) {
        var self = this;

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var freezeFrame = !linkedStream.freezeFrame;

        var arg = {
            op2: 20,
            streamId: streamId,
            frz: (freezeFrame ? 1 : 0),
        };

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100204]
        });

        linkedStream.freezeFrame = freezeFrame;

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "freeze_control"});
                attendee.onEvent(_evt);

                linkedStream.freezeFrame = !linkedStream.freezeFrame;

                fail && fail(_evt, linkedStream.freezeFrame);

                return;
            } else {
                success && success(linkedStream.freezeFrame);
            }
        });
    },

    base64Img2Blob: function base64Img2Blob(code) {
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    },

    blob2URL: function (blob) {
        return URL.createObjectURL(blob);
    },

    imagesPngContext2URL: function (code) {
        var self = this;
        return self.blob2URL(self.blob2URL(code));
    },

    downloadFile: function downloadFile(fileName, content) {
        var self = this;

        var aLink = document.createElement('a');
        var blob = self.base64Img2Blob(content); //new Blob([content]);


        aLink.download = fileName;
        aLink.href = self.blob2URL(blob);

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
        aLink.dispatchEvent(evt);

        aLink.click();
    },

    videoCaptureBase64Context2URL: function (videoObj) {
        var self = this;
        return self.imagesPngContext2URL(self.getCaptureBase64Context(videoObj));
    },

    getCaptureBase64Context: function (videoObj) {
        var canvas = document.createElement("canvas");
        var id = canvas.id = "__capture_video_" + new Date().getTime();

        canvas.width = videoObj.videoWidth;
        canvas.height = videoObj.videoHeight;

        var canvas2dContext = canvas.getContext('2d');
        canvas2dContext.drawImage(videoObj, 0, 0, canvas.width, canvas.height);

        var base64 = canvas.toDataURL('images/png');
        //console.log(base64);

        return base64;
    },

    captureVideo: function captureVideo(videoObj, storeLocal, filename) {
        var self = this;

        var base64 = self.getCaptureBase64Context(videoObj);

        if (storeLocal) {
            filename = filename || ("capture_" + (new Date()).getTime());
            self.downloadFile(filename, base64);
            //window.location.href = base64;

            // var iframe = document.createElement("iframe");
            // iframe.id = "__capture_video_pic_dl_iframe_" + (new Date().getTime());
            // iframe.style.display = "none";
            //
            // //document.body.appendChild(iframe);
            //
            // iframe.src = base64;
            // //iframe.contentWindow.location.href = URL.createObjectURL(base64);
            //
            // setTimeout(function () {
            //     //document.body.removeChild(iframe);
            // }, 50);
        }

        return base64;
    },

    capturePictureRemote: function (streamId, rspBase64Pic, success, fail) {
        var self = this;

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var arg = {
            op2: 20,
            streamId: streamId,
            pic: 1,
            rspBase64Pic: (rspBase64Pic === true)
        };

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100205]
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "capture_control"});
                attendee.onEvent(_evt);
                fail && fail(_evt);

                return;
            } else {
                if(!rspBase64Pic){
                    success && success();
                    return;
                }

                if(!rsp.arg) {
                    fail && fail(new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: "Not found base64 pic"}));
                    return;
                }

                var arg = JSON.parse(rsp.arg);
                success && success(arg.pic);
            }
        });
    },

    zoomRemote: function (streamId, multiples, fail) {
        var self = this;

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        linkedStream._zoom || (linkedStream._zoom = 1);

        var _zoom = linkedStream._zoom * multiples;
        if(_zoom < 1){
            return;
        }

        linkedStream._zoom = _zoom;

        var arg = {
            op2: 20,
            streamId: streamId,
            zoom: Math.round(_zoom * 10000)
        }

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100201]
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "zoom_control"});
                attendee.onEvent(_evt);
                fail && fail(_evt);

                return;
            }
        });
    },

    _getPosition: function getPosition(obj){
        var topValue= 0,leftValue= 0;
        while(obj){
            leftValue+= obj.offsetLeft;
            topValue+= obj.offsetTop;
            obj= obj.offsetParent;
        }

        return {clientX: leftValue, clientY: topValue};
    },

    eventXYAtMedia: function (eventXY, videoTag) {
        var videoXY = _util.getDomPageRect(videoTag);

        var videoWidth = videoXY.width, videoHeight = videoXY.height;
        var mediaWidth = videoTag.videoWidth, mediaHeight = videoTag.videoHeight;

        if(mediaHeight/mediaWidth > videoHeight/videoWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoHeight;
            mediaWidth = mediaHeight * t;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoWidth;
            mediaHeight = mediaWidth * t;
        }

        var clickXY = eventXY;

        var isRadioX, isRadioY;
        if(isRadioX = _util.isFloat(clickXY.x)){ //比率
            clickXY.x = clickXY.x * videoWidth;
        }
        if(isRadioY = _util.isFloat(clickXY.y)){ //比率
            clickXY.y = clickXY.y * videoHeight;
        }

        if(Math.abs(clickXY.x) < (videoWidth - mediaWidth) / 2
            || (videoWidth - Math.abs(clickXY.x)  < (videoWidth - mediaWidth) / 2)){
            return;
        }
        if(Math.abs(clickXY.y) < (videoHeight - mediaHeight) / 2
            || (videoHeight - Math.abs(clickXY.y)  < (videoHeight - mediaHeight) / 2)){
            return;
        }

        clickXY.x = clickXY.x < 0 ? Math.floor(clickXY.x + (videoWidth - mediaWidth) / 2)
            : Math.floor(clickXY.x - (videoWidth - mediaWidth) / 2);
        clickXY.y = clickXY.y < 0 ? Math.floor(clickXY.y + (videoHeight - mediaHeight) / 2)
            : Math.floor(clickXY.y - (videoHeight - mediaHeight) / 2);


        if(isRadioX){
            clickXY.x = clickXY.x / mediaWidth;
        }
        if(isRadioY){
            clickXY.y = clickXY.y / mediaHeight;
        }

        return {x: clickXY.x, y: clickXY.y, width: mediaWidth, height: mediaHeight};
    },

    eventXYAtVideo: function (mediaXY, videoTag) {
        var videoXY = _util.getDomPageRect(videoTag);

        var videoWidth = videoXY.width, videoHeight = videoXY.height;
        var mediaWidth = videoTag.videoWidth, mediaHeight = videoTag.videoHeight;

        if(mediaHeight/mediaWidth > videoHeight/videoWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoHeight;
            mediaWidth = mediaHeight * t;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoWidth;
            mediaHeight = mediaWidth * t;
        }

        var isRadioX, isRadioY;
        if(isRadioX = _util.isFloat(mediaXY.x)){ //比率
            mediaXY.x = mediaXY.x * mediaWidth;
        }
        if(isRadioY = _util.isFloat(mediaXY.y)){ //比率
            mediaXY.y = mediaXY.y * mediaHeight;
        }

        mediaXY.x = mediaXY.x < 0 ? Math.floor(mediaXY.x - (videoWidth - mediaWidth) / 2)
            : Math.floor(mediaXY.x + (videoWidth - mediaWidth) / 2);
        mediaXY.y = mediaXY.y < 0 ? Math.floor(mediaXY.y - (videoHeight - mediaHeight) / 2)
            : Math.floor(mediaXY.y + (videoHeight - mediaHeight) / 2);

        if(isRadioX){
            mediaXY.x = mediaXY.x / videoWidth;
        }
        if(isRadioY){
            mediaXY.y = mediaXY.y / videoHeight;
        }

        return mediaXY;
    },

    getClickXY: function (videoTag, clickEvent) {
        var self = this;

        var e = clickEvent || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        var xy = self._getPosition(videoTag);

        _logger.info("Video tag position ", xy.clientX, ":", xy.clientY);


        var mediaWidth = videoTag.videoWidth;
        var mediaHeight = videoTag.videoHeight;

        if(mediaHeight/mediaWidth > videoTag.offsetHeight/videoTag.offsetWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoTag.offsetHeight;
            mediaWidth = mediaHeight * t;

            xy.clientX += (videoTag.offsetWidth - mediaWidth) / 2;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoTag.offsetWidth;
            mediaHeight = mediaWidth * t;

            xy.clientY += (videoTag.offsetHeight - mediaHeight) / 2;
        }
        _logger.info("Media position ", xy.clientX, ":", xy.clientY);
        _logger.info("Media xy ", mediaWidth, ":", mediaHeight);
        _logger.info("Click position ", x, ":", y);

        return {
            mediaWidth: mediaWidth,
            mediaHeight: mediaHeight,
            x: (x - xy.clientX),
            y: (y - xy.clientY)
        };
    },

    focusExpoRemote: function (streamId, videoTag, clickEvent, fail) {
        var self = this;

        var e = clickEvent || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        var xy = self._getPosition(videoTag);

        _logger.info("Video tag position ", xy.clientX, ":", xy.clientY);


        var mediaWidth = videoTag.videoWidth;
        var mediaHeight = videoTag.videoHeight;

        if(mediaHeight/mediaWidth > videoTag.offsetHeight/videoTag.offsetWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoTag.offsetHeight;
            mediaWidth = mediaHeight * t;

            xy.clientX += (videoTag.offsetWidth - mediaWidth) / 2;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoTag.offsetWidth;
            mediaHeight = mediaWidth * t;

            xy.clientY += (videoTag.offsetHeight - mediaHeight) / 2;
        }
        _logger.info("Media position ", xy.clientX, ":", xy.clientY);
        _logger.info("Media xy ", mediaWidth, ":", mediaHeight);
        _logger.info("Click position ", x, ":", y);

        self._focusExpo(streamId, mediaWidth, mediaHeight, (x - xy.clientX), (y - xy.clientY), fail);
    },

    _focusExpo: function (streamId, width, height, x, y, fail) {
        var self = this;

        if(x <= 0 || x > width){
            return;
        }
        if(y <= 0 || y > height){
            return;
        }

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var arg = {
            op2: 20,
            streamId: streamId,
            focus: 1,
            expo: 1,
            x: width === 0 ? 0 : Math.round(x * 10000 / width),
            y: height === 0 ? 0 : Math.round(y * 10000 / height)
        }

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100202, 100203]
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "focus_expo_control"});
                attendee.onEvent(_evt);
                fail && fail(_evt);

                return;
            }
        });
    },

    _republish: function (pubS, success, error) {
        var self = this;

        var webrtc;
        if(pubS.id){
            var rtcId = self.current.__getWebrtcFor(pubS.id);
            rtcId && self.current.closeWebrtc(rtcId, true);

            webrtc = self.current._getWebrtc(pubS.id);
        }

        var _pubS;

        switch(pubS.type) {
            case 0:
                emedia.stopTracks(pubS._localMediaStream);

                _pubS = new self.AVPubstream(pubS);

                setTimeout(function () {
                    self.openUserMedia(_pubS).then(function () {
                        pubS.localStream = _pubS.localStream;

                        pubS.isRepublished = true;

                        pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                        self.push(pubS, success, error);
                    }, error);
                }, 300);

                break;
            case 1:
                emedia.stopAndRemoveAudioTracks(pubS._localMediaStream);

                _pubS = new self.ShareDesktopPubstream(pubS);

                setTimeout(function () {
                    self.openUserMedia(_pubS).then(function () {
                        pubS.localStream = _pubS.localStream;

                        pubS.isRepublished = true;

                        pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                        self.push(pubS, success, error);
                    }, error);
                }, 300);

                break;
            case 2:
                emedia.stopTracks(pubS._localMediaStream);

                _pubS = new self.AudioMixerPubstream(pubS);

                setTimeout(function () {
                    self.openUserMedia(_pubS).then(function () {
                        pubS.localStream = _pubS.localStream;

                        pubS.isRepublished = true;

                        pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                        self.push(pubS, success, error);
                    }, error);
                }, 300);

                break;
        }
    },

    chanageCamera: function(pubS, error){
        var self = this;

        if(typeof pubS === 'string'){ //id
            pubS = self.current._cacheStreams[pubS];
        } else if(pubS.id){
            pubS = self.current._cacheStreams[pubS.id];
        }

        if(pubS.voff){
            _logger.warn("Stream id = ", pubS.id, " voff, do not chanage camera.");
            return;
        }

        self.getMediaDevices("videoinput", function (devices) {
            if(devices.length <= 1){
                _logger.warn("Only video input. not chanage");
                return;
            }


            var cameraIndex = (pubS._cameraIndex === null || pubS._cameraIndex === undefined) ? 0 : pubS._cameraIndex;
            while(cameraIndex < devices.length){
                var lastDevice = devices[cameraIndex];
                cameraIndex = (cameraIndex + 1) % devices.length;

                var device = devices[cameraIndex];

                var videoTracks = pubS._localMediaStream.getVideoTracks();
                if(!videoTracks || videoTracks.length === 0 || device.label != videoTracks[0].label){
                    break;
                }
            }

            var device = devices[cameraIndex];
            var deviceInfoLabel = device.label;

            _logger.warn("Stream ", pubS.id, lastDevice.label, ">>", deviceInfoLabel);

            pubS._cameraIndex = cameraIndex;

            pubS.constaints || (pubS.constaints = {});
            pubS.constaints.video = (typeof pubS.constaints.video === "object") ? pubS.constaints.video : {};
            pubS.constaints.video.deviceId = {exact: device.deviceId};

            self._republish(pubS, function(){
            },function (_evt) {
                if(_evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
                    pubS.constaints.video = false;
                }

                error && error(_evt);
            });
        }, error);
    },

    voff: function(pubS, _voff, error){
        var self = this;

        if(typeof pubS === 'string'){ //id
            pubS = self.current._cacheStreams[pubS];
        }

        _voff = _voff ? 1 : 0;
        pubS.voff = _voff;

        function updateAndDisabled() {
            emedia.enableVideoTracks(pubS.getMediaStream(), !_voff);

            self.current && self.current.voff(pubS, _voff);
        }

        if(pubS.constaints && !pubS.constaints.video){
            //error && error("When pub. only audio, voff invalidate");
            //throw "When pub. only audio, voff invalidate";

            pubS.constaints.video = true;
            self._republish(pubS, function(){
                updateAndDisabled();
            },function (_evt) {
                if(_evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
                    pubS.constaints.video = false;
                }

                error && error(_evt);
            });

            return;
        }

        updateAndDisabled();
    },

    aoff: function(pubS, _aoff, error){
        var self = this;

        if(typeof pubS === 'string'){ //id
            pubS = self.current._cacheStreams[pubS];
        }

        _aoff = _aoff ? 1 : 0;
        pubS.aoff = _aoff;

        function updateAndDisabled() {
            emedia.enableAudioTracks(pubS.getMediaStream(), !_aoff);
            self.current && self.current.aoff(pubS, _aoff);
        }

        if(pubS.constaints && !pubS.constaints.audio){
            // error && error("When pub. only video, aoff invalidate");
            // throw "When pub. only video, aoff invalidate";

            pubS.constaints.audio = true;
            self._republish(pubS, function(){
                updateAndDisabled();
            },function (_evt) {
                if(_evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
                    pubS.constaints.audio = false;
                }

                error && error(_evt);
            });

            return;
        }

        updateAndDisabled();
    },

    iceing: function (streamId) {
        var self = this;

        return _util.isPlainObject(self.current._linkedStreams[streamId]);
    },

    recording: function (streamId) {
        var self = this;

        return _util.isPlainObject(self.current._records[streamId]);
    },

    startRecord: function (streamId, callback) {
        var self = this;

        var _stream = self.current._linkedStreams[streamId];
        if(!_stream){
            throw streamId + " not at linked streams";
        }
        if(!_stream._webrtc){
            callback && callback(false);
        }

        self.current.startRecord(_stream, callback);
    },

    stopRecord: function (streamId, callback) {
        var self = this;

        var _stream = self.current._records[streamId];
        if(!_stream){
            throw streamId + " not at recording streams";
        }

        self.current.stopRecord(_stream, callback);
    },

    getCurrentMembers: function () {
        var self = this;
        return self.current.getCurrentMembers();
    },

    _onCapturePicture: function (evt) {
        var self = this;

        var rspBase64Pic = evt.arg.rspBase64Pic;
        var streamId = evt.arg.streamId;
        var stream = self.current._cacheStreams[streamId];

        var base64;
        if(rspBase64Pic){
            var htmlVideo;
            if(typeof self.getHTMLVideo !== "function" || !(htmlVideo = self.getHTMLVideo(streamId))){
                _logger.warn("Not support capture picture. caused by htmlVideo not found");
                return;
            }

            base64 = self.getCaptureBase64Context(htmlVideo);
        }else{
            if(typeof self.onCapturePicture !== "function"){
                _logger.warn("Not support capture picture. caused by onCapturePicture not found");
                return;
            }
            self.onCapturePicture(stream);
        }

        var message = self.current.newMessage({
            op: 1001,
            tsxId: evt.tsxId,
            memId: evt.memId,
            arg: JSON.stringify(base64 ? {pic: base64} : {}),
            result: 0
        });

        self.current.postMessage(message, function (rsp) {
            _logger.warn("Send remote control onCapturePicture response. the result = ", rsp.result, rsp.msg || "");
        });

        return true;
    },

    // _onRemotePannelControl: function (evt) {
    //
    // },

    newSession: function (attendee, ticket) {
        var self = this;

        var ExtendSession = self.Session || Session;
        var session = new ExtendSession({
            ticket: ticket,
            owner: attendee,

            onTcklC: function(evt){
                attendee.onTcklC(evt.rtcId, evt.cands);
            },
            onAcptC: function(evt){
                attendee.onAcptC(evt.rtcId, evt.sdp, evt.cands);
            },
            onAnsC: function(evt){
                attendee.onAnsC(evt.rtcId, evt.sdp, evt.cands);
            },
            onTermC: function(evt){
                //self.onTermC(me, evt);
                _logger.info("Server termc rtc: ", evt.rtcId, evt.message || evt.msg);

                if(evt.endReason === 21 || evt.endReason === 22){
                    _util.forEach(attendee._cacheStreams, function (sid, _stream) {
                        if(_stream.rtcId === evt.rtcId){
                            var _event;
                            if(evt.endReason === 21){
                                _event = new emedia.event.SwitchVCodes({stream: _stream, useVCodes: evt.useVCodes});
                            }else{
                                _event = new emedia.event.SubFailNotSupportVCodes({stream: _stream});
                            }

                            attendee.onEvent(_event);
                        }
                    });
                }else{
                    attendee.closeWebrtc(evt.rtcId, false, true);
                }
            },
            onEnter: function(evt){
                attendee.onEnter(evt.cver, evt.mem);
            },
            onExit: function(evt){
                attendee.onExit(evt.cver, evt.memId, evt.reason || 0);
            },
            onPub: function(evt){
                attendee.onPub(evt.cver, evt.memId, evt.pubS);
            },
            onUnpub: function(evt){
                attendee.onUnpub(evt.cver, evt.memId, evt.pubSId);
            },
            onMems: function(evt){
            },
            onClose: function(evt){
                attendee.onClose(evt.cver, evt.confrId);
            },
            onEvent: function(evt){
                attendee.onEvent(evt);
            },
            onStreamControl: function (evt) {
                attendee.onStreamControl(evt.cver, evt.streamId, evt.voff, evt.aoff, evt.sver);
            },
            onRemoteControl: function (evt) {
                if(typeof evt.arg === 'string'){
                    evt.arg = JSON.parse(evt.arg);
                }
                if(evt.arg.op2 === 20 && evt.arg.pic && self._onCapturePicture.call(self, evt)){
                    return;
                }
                if(evt.arg.op2 === 30 && self._onRemotePannelControl){
                    try{
                        self._onRemotePannelControl.call(self, evt);
                        return;
                    }catch (e){
                        _logger.warn(e);
                    }
                }

                _logger.warn("Not support remote control");

                var message = attendee.newMessage({
                    op: 1001,
                    tsxId: evt.tsxId,
                    memId: evt.memId,
                    arg: JSON.stringify(evt.arg),
                    result: evt && evt.arg && evt.arg.op2 === 30 ? -405 : -507,
                    msg: "Not support the remote control."
                });

                attendee.postMessage(message, function (rsp) {
                    _logger.warn("Send remote control response. the result = ", rsp.result, rsp.msg || "");
                });
            },
            onRecvRemoteMessage: function (evt) {
                attendee._onRecvRemoteMessage && attendee._onRecvRemoteMessage(evt.memId, evt.arg, evt);
            }
        });

        return session;
    },

    _judgeTalking: function (meter) {
        if(!meter){
            return false;
        }

        return meter.instant >= emedia.config.judgeTalkingByInstantGE;
    },

    graffitiVideo: function (streamId, videoTag, canvasTag) {
        var self = this;

        var easemobStream = self.getStreamById(streamId);

        var mediaStream = new MediaStream();
        mediaStream._located = true;

        easemobStream._localMediaStream.getAudioTracks().forEach(function(track) {
            mediaStream.addTrack(track);
        });

        var drawStream = canvasTag.captureStream(25);
        drawStream.getVideoTracks().forEach(function(track) {
            mediaStream.addTrack(track);
        });

        videoTag.srcObject = mediaStream;

        easemobStream.localStream = mediaStream;
        easemobStream.isRepublished = true;
        easemobStream.optimalVideoCodecs = easemobStream.optimalVideoCodecs;
        self.push(easemobStream);
    },

    resetCanvas: function (canvasTag) {
        var set;
        if(arguments.length > 1){
            for(var i = 0; i < arguments.length; i++){
                set = arguments[i];

                typeof set === "function" && set(canvasTag);
                typeof set !== "function" && _util.isPlainObject(set) && _util.forEach(set, function (key, value) {
                    _logger.debug("Canvas set ", key, " = ", value);
                    canvasTag.setAttribute(key, value);
                });
            }
        }
    },

    _random: function (c) {
        return Math.floor(Math.random() * c)
    },
    requestFrame: function (stream, millis) {
        var self = this;

        var _cacheStream;
        if(typeof stream === "string"){
            _cacheStream = this.current._cacheStreams[stream];
        }else if(stream.id){
            _cacheStream = this.current._cacheStreams[stream.id];
        }else{
            return;
        }

        if(!_cacheStream){
            return;
        }

        function _requestFrame() {
            _cacheStream.requestFrame();

            if(_cacheStream.canvas){
                var redraw = DefaultMouseTrack.prototype.redraw.bind({_canvasContext: _cacheStream.canvas.getContext("2d")});
                //_logger.debug(self._random(255));
                redraw(3, 3);
            }
        }

        if(!millis){
            _requestFrame();
            return;
        }

        setTimeout(function () {
            _requestFrame();
            self.requestFrame(_cacheStream, millis);
        }, millis)
    },

    graffitiCanvas: function (withVoice, canvasTag) {
        if(_util.targetDOM(withVoice)){
            canvasTag = withVoice;
            withVoice = false;
        }

        var self = this;

        var pubS = new self.ShareDesktopPubstream({
            voff: 0,
            aoff: withVoice ? 0 : 1
        });

        canvasTag || (canvasTag = document.createElement("canvas"));

        //canvasTag.getContext("2d", {willReadFrequently: true}); //Fixed: Firefox captureStream  NS_ERROR_NOT_INITIALIZED
        canvasTag.getContext("2d");
        pubS.canvas = canvasTag;

        var diy = function () {}
        diy.prototype.setCanvas = function(set){
            this.canvasTag = canvasTag;
            self.resetCanvas(canvasTag, set);

            return this;
        }

        diy.prototype.push = function (frameRate, _onpushed) {
            var diy = this;
            diy._push(frameRate, _onpushed);
        }
        diy.prototype._push = function (frameRate, _onpushed) {
            if(typeof frameRate === "function"){
                _onpushed = frameRate;
                frameRate = undefined;
            }

            canvasTag.captureStream && (canvasTag.captureStream.enabled = true);
            var drawStream = canvasTag.captureStream(frameRate || 25);

            function pushed(stream) {
                stream.canvas = canvasTag;
                _onpushed && _onpushed(stream, canvasTag, drawStream);

                if(withVoice){ //发送一帧视频
                    stream.requestFrame();
                }
            }

            function pub(pubS, pushed) {
                var mediaStream = new MediaStream();
                mediaStream._located = true;

                pubS._localMediaStream && pubS._localMediaStream.getAudioTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                drawStream.getVideoTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                pubS._localMediaStream = mediaStream;
                pubS.localStream = mediaStream;
                self.push(pubS, pushed);
            }

            if(withVoice){
                self.__getUserMedia({audio: true}, function success(_user, stream) {
                    pubS._localMediaStream = stream;
                    pub(pubS, pushed);
                });
            }else{
                pub(pubS, pushed);
            }

            return this;
        }

        return new diy();
    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Sess");

var __event = __webpack_require__(11);

var __url_seqno = 0;

var Message = _util.prototypeExtend({
    setSessId: function (sessId) {
        sessId && (this.sessId = sessId);
        return this;
    },
    setOp: function (op) {
        op && (this.op = op);

        if(op === 200){
            this.res = {
                type: emedia.config.clientType,
                ver: emedia.config.version,
                agent: emedia.config.userAgent,
                ops: emedia.config.acptOps
            };

            //this.res = JSON.stringify(this.res);
        }

        return this;
    },
    setTsxId: function (tsxId) {
        tsxId && (this.tsxId = tsxId);
        return this;
    },
    setTicket: function (tkt) {
        tkt && (this.tkt = tkt);
        return this;
    },
    setSdp: function (sdp) {
        sdp && (this.sdp = sdp);
        return this;
    },
    setCands: function (cands) {
        cands && (this.cands = cands);
        return this;
    },
    setSubSId: function (subSId) {
        subSId && (this.subSId = subSId);
        return this;
    },
    setMemId: function (memId) {
        memId && (this.memId = memId);
        return this;
    },
    setPubS: function (pubS) {
        pubS && (this.pubS = _util.extend(false, {}, pubS));

        var thisPubS = this.pubS;
        if(thisPubS.ext && _util.isPlainObject(thisPubS.ext)){
            thisPubS.ext = JSON.stringify(thisPubS.ext);
        }

        thisPubS && _util.forEach(thisPubS, function (key, value) {
            if(_util.isPlainObject(value) || typeof value === 'function'){
                _util.removeAttribute(thisPubS, key);
            }
        });

        thisPubS && _util.removeAttribute(thisPubS, "localStream");
        thisPubS && _util.removeAttribute(thisPubS, "_localMediaStream");
        thisPubS && _util.removeAttribute(thisPubS, "_webrtc");

        return this;
    },
    setRtcId: function (rtcId) {
        rtcId && (this.rtcId = rtcId);
        return this;
    },
    setCver: function (cver) {
        cver && (this.cver = cver);
        return this;
    },
    setEndReason: function (endReason) {
        endReason && (this.endReason = endReason);
        return this;
    },
    setNickName: function (nickName) {
        nickName && (this.nickName = nickName);
        return this;
    },
    setResource: function (resource){
        resource && (this.resource = resource);
        return this;
    },
    setReason: function (reason) {
        reason && (this.reason = reason);
        return this;
    },
    setConfrId: function (confrId) {
        confrId && (this.confrId = confrId);
        return this;
    },
    setVoff: function (voff) {
        (typeof voff === "undefined") || (this.voff = (voff ? 1 : 0));
        return this;
    },
    setAoff: function (aoff) {
        (typeof aoff === "undefined") || (this.aoff = (aoff ? 1 : 0));
        return this;
    },
    setFlag: function (flag) {
        flag === 0 && (this.flag = 0);
        flag === 1 && (this.flag = 1);

        return this;
    },
    setExt: function (ext) {
        if(ext && _util.isPlainObject(ext)){
            ext = JSON.stringify(ext);
        }
        ext && (this.ext = ext);
        return this;
    }
});


/**
 * {
 *   websocket:
 *   onMessage:
 *   _postMessage(Message):
 *   onError:
 * }
 *
 * reconnectCount > 0 时不上报错误（调用onWebsocketEvent）。
 * 不存在或==0 调用调用onWebsocketEvent
 * 调用onWebsocketEvent WSClose时 将会关闭
 *
 * @returns {*}
 *
 */

var __session_globalCount = emedia.__session_globalCount = 0;

function _connect(onConnected, onConnectFail, retry){
    var self = this;

    function connectFail(cause, _evt){
        try{
            self.onWebsocketEvent(new __event.WSClose({url: self.thisWsUri, retry: retry, online: self.online, cause: cause, event: _evt, session: self}));
        } finally {
            onConnectFail && onConnectFail(new __event.WSClose({url: self.thisWsUri, retry: retry, online: self.online, cause: cause, event: _evt, session: self}));
        }
    }

    function post(message) {
        if(!self.connected(self.thisWsUri)){
            _logger.debug("current dont connect. the message = ", message);
            return;
        }

        if(_util.isPlainObject(message) && !(message instanceof Message)){
            throw "message not a Messages";
        }

        if(self.sessId && message.sessId != self.sessId){
            _logger.warn("self.sessId && message.sessId != self.sessId", message);
            return;
        }

        self.thisWsUri === self._websocket.url && self._websocket.send(JSON.stringify(message));
        self.thisWsUri === self._websocket.url && _logger.debug("Done send: req:", message, self._websocket.url);
        self.thisWsUri === self._websocket.url || _logger.debug("Donot send(url not equal): req:", message, self._websocket.url);
    }

    function notifyNewMessage() {
        if(self.connected(self.thisWsUri)){
            if(self._bufferedMessages.length === 0){
                return;
            }

            var __array = [];

            var bufferedMessage;
            while((bufferedMessage = self._bufferedMessages.shift())){
                if(!bufferedMessage.sessId && !self.sessId && bufferedMessage.op != 200){ //等待Enter
                    __array.push(bufferedMessage);
                    continue;
                }

                if(bufferedMessage.op === 200){ //200单独发送，有可能会修改session值
                    post(bufferedMessage);
                    break;
                }

                if(self.sessId && !bufferedMessage.sessId){
                    bufferedMessage.sessId = self.sessId;
                }

                var _bufferedMessage = post(bufferedMessage);
                _bufferedMessage && __array.push(_bufferedMessage);
            }

            if(__array.length > 0){
                Array.prototype.push.apply(self._bufferedMessages, __array);
            }
            //} else if(!retry || !self.online){
        } else if(retry === 0 || !self.online){
            var _messageMap = _util.extend(false, {}, self._callbacks);

            var tmp = [];
            for(var tsxId in _messageMap){
                var msg = _messageMap[tsxId];
                if(retry > 0 && !self.online && (msg.op === 107 || msg.op === 201 || msg.op === 204 || msg.op === 206 || msg.op === 400 || msg.op === 500)) {
                    tmp.push(msg);
                    continue;
                }
                self.onMessage({op: 1001, tsxId: tsxId, result: -9527, msg: "sdk rsp fail. retry fail or online = " + self.online});
            }

            self._bufferedMessages = (self._bufferedMessages || []);

            tmp.length > 0 && (Array.prototype.push.apply(self._bufferedMessages, tmp));
        }
        else if(!self.connected()){
            var _messageMap = _util.extend(false, {}, self._callbacks);

            for(var tsxId in _messageMap){
                var msg = _messageMap[tsxId];
                if(msg.op !== 102 && msg.op !== 105 && msg.op !== 1000) {
                    continue;
                }
                self.onMessage({op: 1001, tsxId: tsxId, result: -9527, msg: "websocket disconnect", retrying: true});
            }
        }
    }


    if(self.connected(self.thisWsUri)){
        onConnected && onConnected(self);
        _logger.info("Session connected. dont continue connect");
        self.notifyNewMessage && self.notifyNewMessage();

        return;
    }

    if(!self.online){
        connectFail();
        return;
    }

    self.notifyNewMessage = notifyNewMessage;


    _logger.info("Session begin connect.");

    var _websocket = self._websocket;
    if(_websocket){
        _logger.warn("will close. websocket state", _websocket.readyState, _websocket.url, self.thisWsUri);
        _websocket.close(1000);
    }

    try {
        _logger.info("Connecting", self.thisWsUri, retry);
        _websocket = self._websocket = new WebSocket(self.thisWsUri);
    } catch (e) {
        _logger.warn(e);
        connectFail(e);

        return;
    }

    _websocket.onopen = function(evt) {
        var _url = this.url;
        if(_url !== self.thisWsUri){
            _logger.warn("ignore the onopen. caused by websocket url not ", self.thisWsUri, _url);
            return;

        }

        try{
            _logger.info("websocket connected:", _url);
            onConnectFail && (onConnectFail = null);
            onConnected && onConnected(self);
            self.onWebsocketEvent(new __event.WSConnected({event: evt, session: self}));
        }finally{
            //self.notifyNewMessage();
        }
    };

    _websocket.onmessage = function(evt) {
        var _url = this.url;
        if(_url !== self.thisWsUri){
            _logger.warn("ignore recv data. caused by websocket url not ", self.thisWsUri, _url, evt.data);
            return;

        }

        _logger.debug("recv data", evt.data);

        var data = JSON.parse(evt.data);
        data && data.op == 1001 &&  _logger.debug("recv message: rsp:", data);
        data && data.op != 1001 &&  _logger.debug("recv message: evt:", data);

        self.onMessage(data);
    };

    _websocket.onclose = function(evt) {
        var _url = this.url;
        _logger.info("Disconnected:", _url, self.thisWsUri, evt);
        if(_url !== self.thisWsUri){
            _logger.warn("ignore onclose. caused by websocket url not ", self.thisWsUri, _url);
            return;

        }

        self.notifyNewMessage();

        if(evt.code !== 1000){ //手动断开
            connectFail(undefined, evt);
        }
    };

    _websocket.onerror = function(evt) {
        _logger.info("On error:", evt);

        self.onWebsocketEvent(new __event.WSError({event: evt, online: self.online, session: self, url: this.url}));
    };
}

/**
 * {
 *   ticket:
 *   reconnectCount:
 *   onError:
 *
 *   onEnter:
 *   onExit:
 *   onPub:
 *   onUnpub:
 *   onMems:
 *   onClose:
 *
 *   onInitC:
 *   onTcklC:
 *
 *
 *   newMessage:
 *   postMessage:
 * }
 *
 *
 * @private
 */
module.exports = _util.prototypeExtend({
    _events: {
        '0': 'onReqP2P',
        '1': 'onNewCfr',
        '2': 'onDelCfr',
        '3': 'onReqTkt',

        '100': 'onPing',
        '101': 'onPong',
        '102': 'onInitC',
        '103': 'onReqC',
        '104': 'onAcptC',
        '105': 'onTcklC',
        '106': 'onAnsC',
        '107': 'onTermC',

        '300': 'onEnter',
        '301': 'onExit',
        '302': 'onPub',
        '303': 'onUnpub',
        '304': 'onMems',
        '204': 'onClose',
        '400': 'onStreamControl',
        '401': 'onJoin',
        '1002': 'onRemoteControl',
        '1003': 'onRecvRemoteMessage'

        //'onServerError': 'onServerError'
    },

    __init__: function(){
        var self = this;

        //self.owner = null;

        self._bufferedMessages = [];
        self._callbacks = {};

        function nowline() {
            if(navigator.onLine){
                self.online = true;
            }else{
                self.online = false;
            }
        }

        nowline();

        // window.__easemob_checkLineIntervalId_ && clearInterval(window.__easemob_checkLineIntervalId_);
        // window.__easemob_checkLineIntervalId_ = setInterval(function () {
        //     var lastOnline = self.online;
        //     nowline();
        //     if(!lastOnline && self.online){
        //         online();
        //     }
        //     if(lastOnline && !self.online){
        //         offline();
        //     }
        // }, 500);


        function online(e) {
            self.online = true;
            _logger.warn("online online online");

            if(!self.closed){
                self._reconnect(emedia.config.reconnect);
            }
        }

        function offline(e) {
            self.online = false;
            _logger.warn("offline offline offline");

            self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);

            self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
            self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

            self._websocket && self._websocket.close(1000);
        }

        window.addEventListener("online", online, true);

        window.addEventListener("offline", offline, true);

        _logger.info("online status = ", self.online);
    },

    _nextWsUri: function () {
        var self = this;

        var url = self.ticket.url;

        // var hostname = window.location.hostname;
        // if(hostname.endsWith("paic.com.cn")){ //pingan.com.cn -> paic.com.cn
        //     url = url.replace("pingan.com.cn", "paic.com.cn");
        // }else if(hostname.endsWith("pingan.com.cn")){ // paic.com.cn -> pingan.com.cn
        //     url = url.replace("paic.com.cn", "pingan.com.cn");
        // }
        // _logger.warn("ticket url modifiy. ", hostname, url);

        if(url.startsWith('/')){ //通过地址栏 补齐url
            if(emedia.config.wsorigin){
                url = emedia.config.wsorigin + url;
            }else{
                var href = window.location.href;
                var proto = href.startsWith("https") ? "wss://" : "ws://";

                var startIndex = href.indexOf("://") + 3;
                var endIndex = href.indexOf("/", startIndex);
                var wsorigin = href.substring(startIndex, endIndex);

                url = proto + wsorigin + url;
            }

            _logger.warn("websocket url. update. {} -> {}", self.ticket.url, url);
        }else if(emedia.config.wsorigin){
            _logger.warn("emedia.config.wsorigin invalidate. causeby server url {}", url);
        }

        if(url.indexOf("?") >= 0){
            url += "&" + __url_seqno++;
        }else{
            url += "?" + __url_seqno++;
        }
        return url;
    },

    _reconnect: function (retry) {
        var self = this;

        function connected() {
            _logger.warn("Reconnected. at ", retry, self._websocket.url);
            self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
            self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

            var enter = self.newMessage()
                .setOp(200)
                .setSessId(self._sessionId)
                .setTicket(self.ticket)
                .setNickName(self.nickName || self.ticket.memName)
                .setResource(self.resource)
                .setExt(self.owner.ext)
            self.postMessage(enter, function(rsp){
                if(rsp.result != 0){
                    try {
                        self.onEvent(new __event.EnterFail({
                            me: self.owner,
                            cause: (new __event.RspFail({request: enter, response: rsp}))}));
                    } finally {
                        if(rsp.result !== -9527){ //-9527 客户端 自己返回，网络未通， 其他值服务端返回
                            self.onEvent(new __event.ServerRefuseEnter({failed: rsp.result, msg: rsp.msg}));
                        }
                    }

                    return;
                }

                self.onEvent(new __event.EnterSuccess());

                self.owner.onMembers(rsp.cver, rsp.mems);
                self.owner.onStreams(rsp.cver, rsp.streams);

                self.notifyNewMessage();
            });
        }

        function failed(evt) {
            if(retry <= 0){
                _logger.warn("Reconnect end. but fail.", evt.url, retry);
                self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

                return;
            }
            retry && (self.__retryConnectIntervalId = setTimeout(function () {
                self.connect(connected, failed, --retry);
            }, emedia.config.reconnectDelay));
        }

        self.connect(connected, failed, --retry);
    },

    __checkConnect: function () {
        var self = this;

        self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);

        emedia.config.checkConnectIntervalMillis && (self.__checkConnectIntervalId = setTimeout(function () {
            //_logger.trace("Check connect..");

            try{
                if(self.online && !self.connected()){
                    self.__retryConnectIntervalId && _logger.debug("online, reconnecting...");
                    self.__retryConnectIntervalId || _logger.debug("online, but disconnect. will reconnect");
                    self.__retryConnectIntervalId || self._reconnect(emedia.config.reconnect);
                } else {
                    //self.notifyNewMessage && self.notifyNewMessage();
                }
            }finally{
                self.__checkConnect();
            }
        }, emedia.config.checkConnectIntervalMillis));
    },

    connect: function(onConnected, onConnectFail, retry){
        var self = this;

        var nextUrl = self.thisWsUri = self._nextWsUri();

        (typeof retry !== "undefined") && _logger.warn("begin connect... at retry = ", retry, nextUrl);

        function connected() {
            try{
                onConnected.apply(self, arguments);
            }finally{
                self.__checkConnect();
            }
        }

        function failed(evt) {
            try{
                onConnectFail.apply(self, arguments);
            }finally{
                retry || evt.url !== nextUrl
                || self.onEvent(new __event.ServerRefuseEnter({
                    failed: -95270, msg: "sdk reconnect fail. " + nextUrl + "|" + evt.url}));
            }
        }
        _connect.call(self, connected, failed, retry);
    },

    connected: function (wsUri) {
        var self = this;
        var result = self.online && self._websocket && (!wsUri || wsUri === self._websocket.url) && self._websocket.readyState == WebSocket.OPEN;
        //_logger.trace("Connected?", result, self.online, wsUri, self._websocket && self._websocket.url, self._websocket && self._websocket.readyState);

        return result;
    },

    onWebsocketEvent: function (evt) {
        var self = this;
        self.onEvent(evt);
    },

    register: function (listeners) {
        if (typeof listeners === "object") {
            for (var event in listeners) {
                this.bind(event, listeners[event]);
            }
        }
    },

    bind: function (event, func) {
        var self = this;

        var onFunc;
        if ((onFunc = self._events[event])) {
            self[onFunc] = func;
        } else {
            throw "Not supported event = " + event;
        }
    },

    getSessionId: function(){
        return this._sessionId;
    },

    newMessage: function(cfg) {
        return new Message(cfg);
    },

    __modifyMessage: function (message) {
        if (message && message.sdp) {
            if (typeof message.sdp === 'string') {
                message.sdp = _util.parseJSON(message.sdp);
            }
            message.sdp.type && ( message.sdp.type =  message.sdp.type.toLowerCase());
            message.cctx && (message.sdp.cctx = message.cctx);
        }
        if (message && message.cands) {
            if (typeof message.cands === 'string') {
                message.cands = _util.parseJSON(message.cands);
            }

            for (var i = 0; i < message.cands.length; i++) {
                typeof message.cands[i] === 'string' && (message.cands[i] = _util.parseJSON(message.cands[i]));

                message.cands[i].sdpMLineIndex = message.cands[i].mlineindex;
                message.cands[i].sdpMid = message.cands[i].mid;

                delete message.cands[i].mlineindex;
                delete message.cands[i].mid;

                message.cctx && (message.cands[i].cctx = message.cctx);
            }
        }

        if (message && message.mems) {
            if (!_util.isArray(message.mems)) {
                return;
            }

            var _mems = message.mems;
            message.mems = {};

            _util.forEach(_mems, function (index, _mem) {
                _mem.name && (_mem.memName = _mem.name);
                message.mems[_mem.id] = _mem;

                var acptOps = _mem.acptOps = {};
                _util.forEach(emedia.config.baseAcptOps, function (_index, _oper) {
                    acptOps[_oper] = true;
                });
                if(_mem.res){
                    _util.forEach(_mem.res.ops, function (_index, _oper) {
                        acptOps[_oper] = true;
                    })
                }

                if(_mem && _mem.ext){
                    try{
                        message.mems[_mem.id].ext = JSON.parse(_mem.ext);
                    }catch(e){
                        _logger.debug(e);
                    }
                }
            })
        }

        if (message && message.mem) {
            message.mem.name && (message.mem.memName = message.mem.name);

            var acptOps = message.mem.acptOps = {};
            _util.forEach(emedia.config.baseAcptOps, function (_index, _oper) {
                acptOps[_oper] = true;
            });
            if(message.mem.res){
                _util.forEach(message.mem.res.ops, function (_index, _oper) {
                    acptOps[_oper] = true;
                })
            }

            if(message.mem && message.mem.ext){
                try{
                    message.mem.ext = JSON.parse(message.mem.ext);
                }catch(e){
                    _logger.debug(e);
                }
            }
        }

        if (message && message.streams) {
            if (!_util.isArray(message.streams)) {
                return;
            }

            var _streams = message.streams;
            message.streams = {};

            _util.forEach(_streams, function (index, _stream) {
                message.streams[_stream.id] = _stream;

                if(_stream && _stream.ext){
                    try{
                        message.streams[_stream.id].ext = JSON.parse(_stream.ext);
                    }catch(e){
                        _logger.debug(e);
                    }
                }
            })
        }

        if (message && message.pubS) {
            if(message.pubS && message.pubS.ext){
                try{
                    message.pubS.ext = JSON.parse(message.pubS.ext);
                }catch(e){
                    _logger.debug(e);
                }
            }
        }


        if(message && message.ext){
            try{
                message.ext = JSON.parse(message.ext);
            }catch(e){
                _logger.debug(e);
            }
        }

        return message;
    },

    onMessage: function(servMessage){
        var self = this;

        function onFunc(servMessage) {
            var onFunc;
            var event = servMessage.op;
            if ((onFunc = self._events[event]) && (onFunc = self[onFunc])) {
                onFunc.call(self, servMessage);
            } else {
                throw "Not supported event = ", servMessage;
            }
        }

        if(servMessage.op != 1001 && !servMessage.sessId){
            throw "message sessId error. server evt data error";
        }

        if(servMessage.op != 1001 && self._sessionId && self._sessionId != servMessage.sessId){
            throw "message sessId error. server and local not equal";
        }

        if(servMessage.op === 1004){
            onFunc(servMessage);
            return;
        }

        servMessage = self.__modifyMessage(servMessage);

        var reqMessage = _util.removeAttribute(self._callbacks, servMessage.tsxId);
        if(reqMessage && reqMessage.op === 200){
            self._sessionId = servMessage.sessId;

            if(servMessage.result === 0) { //enter 成功
                for(var index in self._bufferedMessages){
                    var message = self._bufferedMessages[index];

                    if(!message.sessId && message.op !== 200){
                        message.sessId = servMessage.sessId;
                    }
                }

                setTimeout(function () {
                    self.notifyNewMessage();
                }, 100);
            } else {
                var bufferedMessage;
                while((bufferedMessage = self._bufferedMessages.shift())){
                    if(bufferedMessage.op === 200){
                        continue;
                    }

                    self.onMessage({op: 1001, tsxId: bufferedMessage.tsxId, result: -9527, msg: "sdk enter fail. sdk callback. enter result = " + servMessage.result});
                }
            }
        }

        if(self.owner && self.owner.closed){
            _logger.warn("self closed. me is " + self.owner.getMemberId() + ", session_id = " + self.getSessionId() + ". drop message", servMessage);
            return;
        }


        self.onEvent(new __event.RecvResponse({request: reqMessage, response: servMessage}));

        if(reqMessage && reqMessage.__callback__ && servMessage.op !== 1004){
            reqMessage.__callback__(servMessage);
            return;
        }

        if(!servMessage.op || servMessage.op == 1001){
            _logger.debug("Igron message. caused by op not found.", servMessage);
            return;
        }

        onFunc(servMessage);
    },

    __modifyMessageForPost: function (message) {
        if (message.cands) {
            var _cands = [];

            var cands = message.cands;
            for (var i = 0; i < cands.length; i++){
                var _cand;

                if(i == 0){
                    cands[i].cctx && (message.cctx = cands[i].cctx);
                }

                if(typeof cands[i] === "string"){
                    _cand = {
                        type: "candidate",
                        candidate: cands[i],
                        mlineindex: 0,
                        mid: "audio"
                        // seq: i
                    };
                }else {
                    // if (cands[i].type && cands[i].type == "candidate") {
                    //     _cands.push(cands[i]);
                    //     continue;
                    // }

                    _cand = {
                        type: "candidate",
                        candidate: cands[i].candidate,
                        mlineindex: cands[i].sdpMLineIndex,
                        mid: cands[i].sdpMid
                        // seq: i
                    };
                }

                _cands.push(JSON.stringify(_cand));
            }

            message.cands = _cands;
        }

        if (message.sdp && (typeof message.sdp !== "string")) {
            var _sdp = {
                type: message.sdp.type,
                sdp: message.sdp.sdp
            };

            message.sdp.cctx && (message.cctx = message.sdp.cctx);

            message.sdp = _sdp;

            message.sdp.type = message.sdp.type.toUpperCase();
            message.sdp = _util.stringifyJSON(message.sdp);
        }

        // if(message.ext && _util.isPlainObject(message.ext)){
        //     message.ext = JSON.stringify(message.ext);
        // }

        message.pubS && _util.removeAttribute(message.pubS, "_located");
        message.pubS && _util.removeAttribute(message.pubS, "mutedMuted");
        message.pubS && _util.removeAttribute(message.pubS, "mediaStream");
        message.pubS && _util.removeAttribute(message.pubS, "isRepublished");
        message.pubS && _util.removeAttribute(message.pubS, "optimalVideoCodecs");

        typeof message.post === "function" && _util.removeAttribute(message, "post");

        return message;
    },

    postMessage: function(message, callback, timeoutMillis) {
        var self = this;

        if (!message.tsxId) {
            message.tsxId = ("MSG" + Date.now() + "-" + (__session_globalCount++));
        }

        if(message.memId){
            var _mem = self.owner._cacheMembers[message.memId];

            if(!_mem){
                _logger.warn("Member not found at local. memberId = " + message.memId, message);
                callback && callback({op: 1001, tsxId: message.tsxId, result: -507, msg: " member not found at local. memberId = " + message.memId});
                return;
            }

            var reqOps = message._reqOps;
            if(!reqOps){
                reqOps = [];
                reqOps.push(message.op);
            }

            for(var index in reqOps){
                var _reqOp = reqOps[index];

                if(!_mem.acptOps[_reqOp]){
                    _logger.warn("Member not accept op " + _reqOp + ", " + message.memId, message);
                    callback && callback({op: 1001, tsxId: message.tsxId, result: -507, msg: " member not accept op " + _reqOp + ", " + message.memId});
                    return;
                }
            }
        }
        _util.removeAttribute(message, '_reqOps');

        if (self._sessionId && self._sessionId != message.sessId) {
            _logger.warn("sessionId not excepted. self._sessionId = " + self._sessionId, message);
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "sessionId not excepted."});
            return;
        }
        if (self.closed) {
            _logger.warn("session closed.", message);
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "session closed"});
            return;
        }

        var oldMessage = _util.extend({}, message);
        message = self.__modifyMessageForPost(message);
        if(!message){
            _logger.warn("Message drop. callback success.", message);
            callback && callback({op: 1001, tsxId: oldMessage.tsxId, result: 0, msg: "Message drop. callback success."});
            return;
        }

        if(message.op === 200){ // enter 放在首位
            self._bufferedMessages.unshift(message);

            if(callback){
                setTimeout(function () {
                    if(!self._callbacks[message.tsxId]){
                        return;
                    }

                    _logger.error("Enter timeout. fail.");
                    self.onMessage({op: 1001, tsxId: message.tsxId, result: -9527, msg: "enter timeout. millis = " + emedia.config.enterTimeout});
                }, emedia.config.enterTimeout);
            }
        } else {
            self._bufferedMessages.push(message);
        }

        callback && (self._callbacks[message.tsxId] =  _util.extend(message, {
            __callback__: callback.bind(self.owner)
        }));

        self.notifyNewMessage && self.notifyNewMessage();

        if(timeoutMillis && callback){
            setTimeout(function () {
                var message = self._callbacks[message.tsxId];

                if(message && message.__callback__){
                    message.__callback__({op: 1001, tsxId: oldMessage.tsxId, result: -408, msg: "Message request timeout."});
                }

                _util.removeAttribute(self._callbacks, message.tsxId);
            }, timeoutMillis);
        }
    },

    close: function (reason) {
        _logger.warn("sessiong closing, reason = ", reason);

        var self = this;

        self.notifyNewMessage && self.notifyNewMessage();

        self.closed = true;

        self.seqno = 0;

        self._websocket && ((reason == 0 || reason == 100) ? self._websocket.close(1000) : self._websocket.close());

        self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
        self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

        self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);
        self.__checkConnectIntervalId && delete self.__checkConnectIntervalId;

        self.owner = null;
        //self._sessionId = null;

        self._bufferedMessages = [];
        self._callbacks = {};

        _logger.warn("session closed");
    }
});



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var _util = __webpack_require__(5);
var _logger = _util.logger;


/**
 * Error({
 *   hidden:
 * })
 *
 *
 *
 *
 */
var Error = _util.prototypeExtend({
    msg: "",
    __init__: function () {
        this.day = new Date();
    },

    execTime: function () {
        var hour = this.day.getHours();
        if(hour < 10){
            hour = "0" + hour;
        }
        var minute = this.day.getMinutes();
        if(minute < 10){
            minute = "0" + minute;
        }
        var second = this.day.getSeconds();
        if(second < 10){
            second = "0" + second;
        }

        return hour + ":" + minute + ":" + second;
    }
});

var __ICEEvent = Error.extend({
    _webrtcDesc: function () {
        var webrtc = this.webrtc;

        var message = this.webrtc.getRtcId();

        return message;
    }
});


module.exports = {
    Exception: Error.extend(),

    /**
     * {retry: retry, online: self.online, event: evt, cause: e, session: self}
     */
    WSClose: Error.extend({message: function () {
        var message = this.execTime() + " WSClose: Websocket close (" + (this.retry || 0) + ").";

        this.online || (message += " offline.");
        this.event && (message += " wscode: " + this.event.code);
        this.cause && (message += " cause: " + this.cause.message);

        this.url && (message += " url: " + this.url);

        message += " retry: " + (this.retry || 0);

        this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

        return message;
    }}),

    /**
     * {event: evt, online: self.online, session: self}
     */
    WSError: Error.extend({message: function () {
        var message = this.execTime() + " WSError: Websocket error. ready state:"
            + (this.event.srcElement && this.event.srcElement.readyState || this.event.currentTarget.readyState)
            + ". online = " + this.online;
        this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

        this.url && (message += " url: " + this.url);

        return message;
    }}),

    /**
     * {event: evt, session: self}
     */
    WSConnected: Error.extend({message: function () {
        var message = this.execTime() + " WSConnected: Websocket success. ready state:"
            + (this.event.srcElement && this.event.srcElement.readyState || this.event.currentTarget.readyState);
        this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

        return message;
    }}),

    /**
     * {webrtc: webrtc, event: webrtcEvent, state: webrtcEvent.target.iceConnectionState}
     */
    ICEChanage: __ICEEvent.extend({message: function () {
        return this.execTime() + " ICEChanage: " + this._webrtcDesc() + " state: " + this.state;
    }}),

    /**
     * {webrtc: webrtc, event: err}
     */
    AddIceCandError: __ICEEvent.extend({message: function () {
        return this.execTime() + " AddIceCandError: " + this._webrtcDesc() + ", add cand error";
    }}),

    /**
     * {webrtc: webrtc, event: event}
     */
    ICEConnectFail: __ICEEvent.extend({message: function () {
        return this.execTime() + " ICEConnectFail: " + this._webrtcDesc() + " failed";
    }}),

    /**
     * {webrtc: webrtc, event: event}
     */
    ICEConnected: __ICEEvent.extend({message: function () {
        return this.execTime() + " ICEConnected: " + this._webrtcDesc() + " connected";
    }}),

    /**
     * {webrtc: webrtc, event: event}
     */
    ICEDisconnected: __ICEEvent.extend({message: function () {
        return this.execTime() + " ICEDisconnected: " + this._webrtcDesc() + " disconnected";
    }}),

    /**
     * {webrtc: webrtc}
     */
    ICEClosed: __ICEEvent.extend({message: function () {
        return this.execTime() + " ICEClosed: " + this._webrtcDesc() + " closed";
    }}),

    /**
     * {webrtc: webrtc}
     */
    ICERemoteMediaStream: __ICEEvent.extend({message: function () {
        return this.execTime() + " ICERemoteMediaStream: " + this._webrtcDesc() + " got remote stream";
    }}),

    /**
     * {stream: stream, state:, msg: }
     */
    StreamState: Error.extend({message: function () {
            return this.execTime() + " StreamState: " + " stream "
                + this.stream.id + " state: " + this.state + " " + this.msg;
        },
        iceFail: function () {
            this.state = 1;
            this.msg = "network anomaly. media lost";
        }
    }),

    /**
     * {member: self.current, event: e}
     */
    OpenMediaError: Error.extend({message: function () {
        return this.execTime() + " OpenMediaError: " + " open media error. caused by " + this.event.toString();
    }}),

    /**
     * {reason: reason, parnter: {id: self._memberId}}
     */
    Hangup: Error.extend({message: function () {
        if(this.self){
            return "hangup id = " + (this.self.id || "--") + " reason：" + (this.reason || 0)
        }else{
            return this.execTime() + " Hangup: "
                + ((this.parnter && (this.parnter.name || this.parnter.id || " ")) || "")
                + " hangup, reason：" + (this.reason || 0);
        }
    }}),

    /**
     * {failed: rsp.result, msg: rsp.msg}
     */
    ServerRefuseEnter: Error.extend({message: function () {
        return this.execTime() + " ServerRefuseEnter: "
            + "server refuse, cause：" + this.failed + ", msg:" + (this.msg || "");
    }}),

    /**
     * {request: req, response: rsp}
     */
    RspFail: Error.extend({
        __init__: function () {
            this.day = new Date();
            this.failed = this.response.result;
            this.msg = this.response.msg || this.response.message || "--";
        },
        message: function () {
            return this.execTime() + " RspFail: " + this.request.tsxId + ", "
                + (this.response.sessId || "--") + " op: " + this.request.op
                + ", cause: " + this.failed + " " + this.msg ;
        }
    }),

    RecvResponse: Error.extend({
        __init__: function () {
            this.day = new Date();
            this.failed = this.response.result;
            this.msg = this.response.msg;
            //this.request = this.response.result;
            //this.response = this.response.msg;
        },
        message: function () {
            if(this.request){
                return this.execTime() + " RecvResponse: " + (this.request && this.request.tsxId) + ", "
                    + (this.response.sessId || "--") + " op: " + (this.request && this.request.op)
                    + ", cause: " + this.failed + " " + this.msg ;
            }else{
                return this.execTime() + " RecvMessage: " + (this.response && this.response.tsxId) + ", "
                    + (this.response.sessId || "--") + " op: " + (this.response && this.response.op) + " " + this.msg ;
            }
        }
    }),

    /**
     * {me: me, cause: _event_}
     */
    EnterFail: Error.extend({message: function () {
        return this.execTime() + " EnterFail: " + "enter fail：" + (this.cause ? this.cause.message() : "unkown");
    }}),

    EnterSuccess: Error.extend({message: function () {
        return this.execTime() + " EnterSuccess: " + "enter success";
    }}),

    /**
     * {streamId: rsp.streamId}
     */
    PushSuccess: Error.extend({message: function () {
        return this.execTime() + " PushSuccess: " + "push success, streamId = " + this.stream.id + ", "
            + this.stream.optimalVideoCodecs + ", webrtc = " + this.stream.rtcId;
    }}),

    /**
     * {webrtc: webrtc, pubS: pubS, me: me, cause: _event_}
     */
    PushFail: Error.extend({message: function () {
        return this.execTime() + " PushFail: " + "push fail, streamId = " + this.stream.id + ", "
            + this.stream.optimalVideoCodecs + ", webrtc = " + this.stream.rtcId
            + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),

    /**
     * {stream: stream, failed: failed, me: me, cause: cause}
     */
    RemoteControlFail: Error.extend({message: function () {
        return this.execTime() + " RemoteControlFail: " + (this.type || "remote control") + " fail, "
            + (this.stream ? this.stream.id : "")
            + " failed = " + this.failed
            + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),

    /**
     * {stream: stream, cause: }
     */
    SubSuccess: Error.extend({message: function () {
        return this.execTime() + " SubSuccess: " + "sub success, streamId = " + this.stream.id + ", "
            + this.stream.vcodes + ", webrtc = " + this.stream.rtcId;
    }}),

    /**
     * {stream: stream, cause: }
     */
    SubFail: Error.extend({message: function () {
        return this.execTime() + " SubFail: " + "sub fail, streamId = " + this.stream.id + ", "
            + this.stream.vcodes + ", webrtc = " + this.stream.rtcId
            + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),

    /**
     * {stream: stream, cause: }
     */
    SubFailNotSupportVCodes: Error.extend({message: function () {
        return this.execTime() + " SubFailNotSupportVCodes: " + "sub fail, streamId = " + this.stream.id
            + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),

    /**
     * {stream: stream, cause: }
     */
    SubFailSafariNotAllowSubBeforePub: Error.extend({message: function () {
        return this.execTime() + " SubFailSafariNotAllowSubBeforePub: " + "sub fail, streamId = " + this.stream.id
            + " cause：Safari without access to capture devices, " +
            "WebKit only exposes Server Reflexive and TURN ICE candidates, " +
            "which expose IPs that could already be gathered by websites.";
    }}),

    /**
     * {stream: stream, useVCodes: []}
     */
    SwitchVCodes: Error.extend({message: function () {
        return this.execTime() + " SwitchVCodes: " + "pub streamId = " + this.stream.id;
    }}),


    CurrentCalling: Error.extend({message: function () {
        return this.execTime() + " CurrentCalling: " + "warn! current calling...";
    }}),

    /**
     * {desktopStreamId: m.streamId}
     */
    OpenDesktopMedia: Error.extend({message: function () {
        return this.execTime() + " OpenDesktopMedia: " + "shared desktop, desktopStreamId = " + desktopStreamId;
    }}),

    OpenDesktopMediaAccessDenied: Error.extend({message: function () {
        return this.execTime() + " OpenDesktopMediaAccessDenied: " + "shared desktop not allow";
    }}),

    ShareDesktopExtensionNotFound: Error.extend({message: function () {
        return this.execTime() + " ShareDesktopExtensionNotFound: " + "shared desktop plugin required";
    }}),

    OtherDeviceAnswer: Error.extend({message: function () {
        return this.execTime() + " other device answer, webrtc = " + this.rtcId;
    }}),

    AudioMixerStreamNotAllowSub: Error.extend({message: function () {
        return this.execTime() + " audio mixer stream not allow sub, webrtc = " + this.rtcId + ", streamId = " + this.stream.id;
    }}),
    AudioMixerStreamNotAllowOnlySubVideo: Error.extend({message: function () {
            return this.execTime() + " audio mixer stream not allow only sub video, webrtc = " + this.rtcId + ", streamId = " + this.stream.id;
    }}),
    AudioMixerStreamRepeatPublish: Error.extend({message: function () {
        return this.execTime() + " audio mixer stream repeat publish";
    }})
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Me");

var Member = __webpack_require__(13);

var __event = __webpack_require__(11);

var Stream = __webpack_require__(16);

/**
 * 未体现 member 使用了 session。
 * 请 这样创建
 * Member({_session: sess})
 *
 *
 * close:
 * 1.服务端 踢掉
 * 2.手动点击 挂断
 * 3.enter失败！
 *
 * websocket 断开连接后，并不会 去close。因为发送消息可以实现重连，重新enter
 *
 *
 */
var Attendee = Member.extend({
    __init__: function(){
        var self = this;

        self._session || (self.sessionFactory && (self._session = self.sessionFactory()));

        if(!self._session) throw "Require session";

        self._cver = 0;

        self._cacheMembers = {};
        self._cacheStreams = {};
        self._mediaMeters = {};

        self._linkedStreams = {};
        self._maybeNotExistStreams = {}; //与self._streams结构相同，用 存储 断网时，ice fail的stream对象。这个对象可能不存在了

        self._records = {};

        self._ices = {};
        self.audioMixers = {};

        self.closed = false;

        self._nextStreamSeqno = 0;

        self.getMediaMeterIntervalMillis = self.getMediaMeterIntervalMillis || emedia.config.getMediaMeterIntervalMillis;
    },

    getCurrentMembers: function () {
        var self = this;

        var members = [];
        _util.forEach(self._cacheMembers, function (_memId, _cacheMember) {
            var member = _util.extend(true, {}, _cacheMember);
            members.push(member);
        });

        return members;
    },

    newStream: function(cfg){
        var attendee = this;

        return new Stream(cfg, {
            __init__: function () {
                var self = this;

                self.rtcId || (self._webrtc && (self.rtcId = self._webrtc.getRtcId()));
                self._webrtc || (self.rtcId && (self._webrtc = attendee._ices[self.rtcId]));

                self.__create_id = attendee._nextStreamSeqno++;

                if(self.memId && !self.owner){
                    self.owner = _util.extend({}, attendee._cacheMembers[self.memId]);
                    if(!self.owner && !self.located()){
                        throw "Remote stream, not owner. it = " + self.id;
                    }
                }
            }
        });
    },

    getConfrId: function(){
        return this.ticket.confrId;
    },
    isCaller: function () {
        var self = this;
        return self.isP2P() && self.ticket.caller == self.ticket.memName;
    },
    isCallee: function () {
        var self = this;
        return self.isP2P() && self.ticket.callee == self.ticket.memName;
    },
    isP2P: function () {
        var self = this;
        return self.ticket && (self.ticket.type == "P2P" || self.ticket.type == "p2p");
    },
    isConfr: function () {
        var self = this;
        return self.ticket && (self.ticket.type == "CONFR" || self.ticket.type == "confr");
    },

    onEvent: function (evt) {

    },

    join: function(joined, joinError){
        _logger.debug("begin join ...");

        var self = this;

        var enter;

        if(self._memberId){
            _logger.warn("Had joined. igrone it");
            joined && joined(self.memId);
            return;
        }

        function onJoinError(_event_) {
            try{
                if((_event_ instanceof __event.WSClose) && _event_.retry){
                    return;
                }

                if(!(_event_ instanceof __event.EnterFail)){
                    _event_ = new __event.EnterFail({ //可能是 websocket 链接未成功
                        attendee: self,
                        cause: _event_,
                    });
                }

                self.onEvent(_event_);
                joinError && joinError(_event_);
            } finally {

            }
        }

        function enterRsp(rsp) {
            if(rsp.result != 0){
                try{
                    onJoinError(new __event.RspFail({request: enter, response: rsp}));
                } finally {
                    if(rsp.result !== -9527){ //-9527 客户端 自己返回，网络未通， 其他值服务端返回
                        self.onEvent(new __event.ServerRefuseEnter({failed: rsp.result, msg: rsp.msg}));
                    }
                }

                return;
            }

            self.reflushSupportVCodes(rsp.vcodes);

            self.setMemberId(rsp.memId);

            self.onEvent(new __event.EnterSuccess());

            joined && joined(rsp.memId);

            try{
                self.__rtc_cfg = rsp.rtcCfg;
                if(typeof rsp.rtcCfg === 'string'){
                    self.__rtc_cfg = JSON.parse(rsp.rtcCfg);
                }
            }finally {
                self.onMembers(rsp.cver, rsp.mems);
                self.onStreams(rsp.cver, rsp.streams);
            }
        }

        function onConnected() {
            enter = self.newMessage()
                .setOp(200)
                .setTicket(self.ticket)
                .setNickName(self.nickName || self.ticket.memName)
                .setResource(self.resource)
                .setExt(self.ext);
            self.postMessage(enter, enterRsp);
        }

        self.connect(onConnected, onJoinError);
        _logger.debug("join", self.ticket.url);
    },

    withpublish: function (pubS) {
        var self = this;

        if(!pubS || !pubS.localStream){
            throw "pubS null or stream not open";
        }

        var enter;

        var openedStream = pubS && pubS.localStream;

        var webrtc;

        function then(joined, joinError) {
            if(arguments.length === 1){
                joinError = joined;
                joined = undefined;
            }

            if(self._memberId){
                _logger.warn("Had joined. igrone it");
                joined && joined(self.memId);
                return;
            }


            function onJoinError(_event_) {
                try{
                    if((_event_ instanceof __event.WSClose) && _event_.retry){
                        return;
                    }

                    if(!(_event_ instanceof __event.EnterFail)){
                        _event_ = new __event.EnterFail({ //可能是 websocket 链接未成功
                            attendee: self,
                            cause: _event_,
                        });
                    }

                    self.onEvent(_event_);
                    joinError && joinError(_event_);
                } finally {
                    emedia.stopTracks(openedStream);

                    webrtc && self.closeWebrtc(webrtc.getRtcId());
                }
            }


            var optimalVideoCodecs = self.getOptimalVideoCodecs();

            function enterRsp(rsp) {
                if(rsp.result != 0){
                    try{
                        onJoinError(new __event.RspFail({request: enter, response: rsp}));
                    } finally {
                        if(rsp.result !== -9527){ //-9527 客户端 自己返回，网络未通， 其他值服务端返回
                            self.onEvent(new __event.ServerRefuseEnter({failed: rsp.result, msg: rsp.msg}));
                        }
                    }

                    return;
                }

                self.reflushSupportVCodes(rsp.vcodes);

                self.setMemberId(rsp.memId);

                self.onEvent(new __event.EnterSuccess());

                var stream = self.newStream(pubS);
                stream._localMediaStream = pubS.localStream;
                stream.rtcId = webrtc.getRtcId();
                stream._webrtc = webrtc;
                stream.id = rsp.streamId;
                stream.csrc = rsp.csrc;
                stream.owner = {id: rsp.memId, nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

                stream.optimalVideoCodecs = optimalVideoCodecs;

                joined && joined(rsp.memId, stream);
                self.onEvent(new __event.PushSuccess({stream: stream, hidden: true})); //ice重连成功后 会 再次 onEvent PushSuccess

                rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp);
                rsp.cands && self.tcklC(webrtc.getRtcId(), rsp.cands)

                try{
                    self.__rtc_cfg = rsp.rtcCfg;
                    if(typeof rsp.rtcCfg === 'string'){
                        self.__rtc_cfg = JSON.parse(rsp.rtcCfg);
                    }
                    if(self.__rtc_cfg && self.__rtc_cfg.iceServers && self.__rtc_cfg.iceServers.length > 0){
                        _logger.warn("Server rsp one rtc cfg. publish will republish");

                        self._service && setTimeout(function () {
                            self._service._republish(stream);
                        }, 200);
                    }
                }finally {
                    self.onMembers(rsp.cver, rsp.mems);
                    self.onStreams(rsp.cver, rsp.streams);
                }
            }

            function onConnected() {
                _logger.debug("enter and pubs");

                var stream = pubS.localStream;

                var offerOptions;
                if(pubS.type === 2){
                    offerOptions = {
                        offerToReceiveAudio: true,
                        offerToReceiveVideo: false
                    }
                }

                webrtc = self.createWebrtc({
                    _rtcId: pubS.rtcId,
                    optimalVideoCodecs: optimalVideoCodecs,
                    offerOptions: offerOptions
                }, pubS.iceRebuildCount);
                self.setLocalStream(stream, webrtc.getRtcId());

                self.doOffer(webrtc.getRtcId(), function (sdp) {
                    enter = self.newMessage()
                        .setOp(200)
                        .setTicket(self.ticket)
                        .setNickName(self.nickName || self.ticket.memName)
                        .setResource(self.resource)
                        .setSdp(sdp)
                        .setRtcId(webrtc.getRtcId())
                        .setPubS(pubS)
                        .setExt(self.ext);
                    self.postMessage(enter, enterRsp);
                });
            }

            self.connect(onConnected, onJoinError);
            _logger.debug("join", self.ticket.url);
        }

        return {
            join: then
        }
    },

    push: function(pubS, pushed, onPushError, autoPush){
        _logger.debug("begin push ...");

        var self = this;

        if(arguments.length === 2){
            onPushError = pushed;
            pushed = undefined;
        }


        if(!pubS || !pubS.localStream){
            throw "pubS or stream open";
        }


        var initC;

        var openedStream = pubS.localStream;

        var webrtc;

        function _onPushError(_event_) {
            try{
                var stream = self.newStream(pubS);
                stream._localMediaStream = pubS.localStream;
                stream._webrtc = webrtc;
                stream.rtcId = webrtc && webrtc.getRtcId();
                stream.owner = {id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

                var _event_ = new __event.PushFail({
                    stream: stream,
                    cause: _event_,
                    hidden: (autoPush && _event_.hidden === true)
                });

                self.onEvent(_event_);
                _event_.hidden || (onPushError && onPushError(_event_));
            } finally {
                if (openedStream && _event_.hidden !== true) {
                    emedia.stopTracks(openedStream);
                }

                webrtc && self.closeWebrtc(webrtc.getRtcId(), _event_.hidden === true);
            }
        }

        if(!pubS.rtcId && pubS.type === 2 && !emedia.config.allowRepeatAudioMixerPublish && self._service.hasAudioMixers()){
            _onPushError(new __event.AudioMixerStreamRepeatPublish());
            return;
        }

        var optimalVideoCodecs = pubS.optimalVideoCodecs || self.getOptimalVideoCodecs();

        function pushRsp(webrtc, rsp) {
            if(rsp.result != 0){
                _onPushError(new __event.RspFail({request: initC, response: rsp, hidden: rsp.retrying === true}));

                return;
            }

            var stream = self.newStream(pubS);

            stream._localMediaStream = pubS.localStream;
            stream._webrtc = webrtc;
            stream.rtcId = webrtc.getRtcId();
            stream.id = rsp.streamId;
            stream.csrc = rsp.csrc;
            stream.owner = {id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

            stream.optimalVideoCodecs = optimalVideoCodecs;

            stream.id && (stream.type === 2) && (self.audioMixers[stream.id] = stream);

            try{
                self.onEvent(new __event.PushSuccess({stream: stream, hidden: true})); //ice重连成功后 会 再次 onEvent PushSuccess
            } finally {
                rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp);
                rsp.cands && self.tcklC(webrtc.getRtcId(), rsp.cands);

                pushed && pushed(stream);
            }
        }

        function pub(pubS) {
            _logger.debug("pubs");

            var stream = pubS.localStream;

            var offerOptions;
            if(pubS.type === 2){
                offerOptions = {
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: false
                }
            }

            webrtc = self.createWebrtc({
                _rtcId: pubS.rtcId,
                optimalVideoCodecs: optimalVideoCodecs,
                offerOptions: offerOptions
            }, pubS.iceRebuildCount);

            self.setLocalStream(stream, webrtc.getRtcId());

            self.doOffer(webrtc.getRtcId(), function (sdp) {
                initC = self.newMessage()
                    .setOp(102)
                    .setRtcId(webrtc.getRtcId())
                    .setSdp(sdp)
                    .setPubS(pubS);

                self.postMessage(initC, function (rsp) {
                    pushRsp(webrtc, rsp);
                });
            });
        }

        pub(pubS);
        _logger.debug("push", self.ticket.url);
    },

    isSafari: function () {
        return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    },

    isSafariButNotPushStream: function () {
        var self = this;

        if(self.isSafari() && !emedia._isSafariYetPushedStream){
            // var pubCount = 0;
            // _util.forEach(self._cacheStreams, function (_sid, _stream) {
            //     if(_stream.located()){
            //         pubCount ++;
            //     }
            // });
            // if(pubCount == 0){
            //     return true;
            // }
            return true;
        }

        return false;
    },

    createWebrtcAndSubscribeStream: function (streamId, callbacks, iceServerConfig, subArgs) {
        var self = this;

        callbacks || (callbacks = {});

        var subStream = self._cacheStreams[streamId];
        var subMember = self._cacheMembers[subStream.memId];

        //var stream = self.newStream(subStream);
        var stream = subStream;
        subArgs = subArgs || stream.subArgs || {subSVideo: true, subSAudio: (subStream.type !== 2)}; //混音自动订阅不要订阅音频

        function _onSubFail(evt) {
            _logger.warn("sub stream error", streamId, evt);

            preSubArgs && stream._webrtc && stream._webrtc.setSubArgs(preSubArgs);
            preSubArgs && (stream.subArgs = preSubArgs);

            evt = new __event.SubFail({
                stream: stream,
                hidden: evt.hidden === true,
                cause: evt
            });

            callbacks && callbacks.onEvent && callbacks.onEvent(evt);
            self.onEvent && self.onEvent(evt);
        }

        if(self.isSafariButNotPushStream()){
            _onSubFail(_util.extend(new __event.SubFail(), new __event.SubFailSafariNotAllowSubBeforePub({
                stream: stream
            })));
            return;
        }


        var pubStreamVCodes = subStream.vcodes;
        var pubMemberSupportVCodes = subMember.vcodes;
        var selfSupportVCodes = self.supportVCodes;

        var optimalVideoCodecs = self._getOptimalVideoCodecsSubset(pubStreamVCodes, pubMemberSupportVCodes, selfSupportVCodes);


        // if(!stream.voff && subArgs.subSVideo && optimalVideoCodecs.length == 0){ // 订阅视频 但是 没有相同的 视频编码格式。失败
        //     _onSubFail(_util.extend(new __event.SubFail(), new __event.SubFailNotSupportVCodes({
        //         stream: stream
        //     })));
        //     return;
        // }

        subArgs = subArgs || stream.subArgs;

        var preSubArgs = stream.subArgs;

        var withoutVideo = !(stream.vcodes && stream.vcodes.length > 0);

        var offerOptions = {
            offerToReceiveAudio: true,
            offerToReceiveVideo: (subArgs.subSVideo && withoutVideo)
        };

        if(!offerOptions.offerToReceiveAudio && !offerOptions.offerToReceiveVideo){
            _logger.warn("offerToReceiveAudio == false and offerToReceiveVideo == false");
        }

        var webrtc = self.createWebrtc({
            iceServerConfig: iceServerConfig,
            optimalVideoCodecs: optimalVideoCodecs,
            offerOptions: offerOptions,

            onGotMediaStream: function (remoteMediaStream) {
                var evt = new __event.SubSuccess({
                    stream: stream,
                    hidden: true
                });

                callbacks.onGotRemote && callbacks.onGotRemote(stream);
                self.onEvent && self.onEvent(evt);
            }
        }, stream.iceRebuildCount);
        var rtcId = webrtc.getRtcId();

        _logger.warn(rtcId, " sub stream ", streamId, optimalVideoCodecs);

        stream._webrtc = webrtc;
        stream.rtcId = rtcId;
        stream.owner = _util.extend({}, subMember);


        subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
        subArgs && (stream.subArgs = subArgs);


        self.offerCall(rtcId, null, streamId, _onSubFail, function onRspSuccess() {

        });
    },

    _getOptimalVideoCodecsSubset: function (pubStreamVCodes, pubMemberSupportVCodes, selfSupportVCodes) {
        var self = this;

        var optimalVideoCodecs = [];

        if(pubStreamVCodes && pubStreamVCodes.length > 0 && selfSupportVCodes[pubStreamVCodes[0]]){
            optimalVideoCodecs.push(pubStreamVCodes[0]);
        }
        if(optimalVideoCodecs.length == 0){
            for(var i = 0; i < self._orderVCodes.length; i ++){
                _util.forEach(pubMemberSupportVCodes, function (index, sVCode) {
                    if(sVCode == self._orderVCodes[i]){
                        optimalVideoCodecs.push(sVCode);
                    }
                });
            }
        }

        return optimalVideoCodecs;
    },

    subscribeStream: function (rtcId, streamId, rspFail, subArgs){
        var self = this;

        var webrtc = self._ices[rtcId];

        var subStream = self._cacheStreams[streamId];
        var subMember = self._cacheMembers[subStream.memId];

        //var stream = self.newStream(subStream);
        var stream = subStream;
        stream._webrtc = webrtc;
        stream.rtcId = rtcId;
        stream.owner = _util.extend({}, subMember);



        var preSubArgs = stream.subArgs;

        subArgs = subArgs || {subSVideo: true, subSAudio: true};
        stream.subArgs = stream.subArgs || {subSVideo: true, subSAudio: true};
        stream._webrtc && (stream._webrtc.subArgs = stream._webrtc.subArgs || {subSVideo: true, subSAudio: true});

        if(!stream.subArgs.subSVideo && subArgs.subSVideo && !stream.voff){
            var pubStreamVCodes = subStream.vcodes;
            var pubMemberSupportVCodes = subMember.vcodes;
            var selfSupportVCodes = self.supportVCodes;

            var optimalVideoCodecs = self._getOptimalVideoCodecsSubset(pubStreamVCodes, pubMemberSupportVCodes, selfSupportVCodes);

            // if(optimalVideoCodecs.length == 0){ // 订阅视频 但是 没有相同的 视频编码格式。失败
            //     preSubArgs && stream._webrtc && stream._webrtc.setSubArgs(preSubArgs);
            //     preSubArgs && (stream.subArgs = preSubArgs);
            //
            //     var evt = _util.extend(new __event.SubFail(), new __event.SubFailNotSupportVCodes({
            //         stream: stream
            //     }));
            //
            //     rspFail && rspFail(evt);
            //     self.onEvent(evt);
            //
            //     return;
            // }
        }


        subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
        subArgs && (stream.subArgs = subArgs);


        var subMessage = self.newMessage()
            .setOp(205)
            .setRtcId(rtcId)
            .setSubSId(streamId);

        subArgs && _util.extend(subMessage, subArgs);

        self.postMessage(subMessage, function (rsp) {
            if(rsp.result != 0){
                preSubArgs && stream._webrtc && stream._webrtc.setSubArgs(preSubArgs);
                preSubArgs && (stream.subArgs = preSubArgs);

                var evt = new __event.SubFail({
                    stream: stream,
                    cause: (new __event.RspFail({request: subMessage, response: rsp}))
                });

                rspFail && rspFail(evt);
                self.onEvent(evt);

                return;
            }

            var evt = new __event.SubSuccess({
                stream: stream,
                hidden: true
            });
            self._updateRemoteStream(stream, stream._webrtc.getRemoteStream());
            self.onEvent(evt);
        });
    },

    unsubscribeStream: function(streamId){
        var self = this;

        var stream = self._cacheStreams[streamId];
        var rtcId = stream._webrtc && stream._webrtc.getRtcId();
        if(!rtcId){
            return;
        }

        try {
            var unsubMessage = self.newMessage()
                .setOp(206)
                .setRtcId(rtcId)
                .setSubSId(streamId);

            self.postMessage(unsubMessage);
        } finally {
            self.closeWebrtc(rtcId);
        }

        return rtcId;
    },

    onEnter: function(cver, mem){
        var self = this;

        cver && (self._cver = cver);

        if(!mem) return;
        if(self._cacheMembers[mem.id]){
            return;
        }

        self._cacheMembers[mem.id] = mem;

        var _tmpMap = {};
        if(mem.res && mem.res.vcodes && mem.res.vcodes.length > 0){
            _util.forEach(mem.res.vcodes, function (index, vcode) {
                if(_tmpMap[vcode]){
                }else{
                    _tmpMap[vcode] = true;
                    self.supportVCodes[vcode] && self.supportVCodes[vcode]++;
                }

            });
        }

        var hasOtherDevices;
        _util.forEach(self._cacheMembers, function (_memId, _member) {
            if(!hasOtherDevices && _memId != mem.id && mem.memName === _member.memName){
                hasOtherDevices = true;
            }
        });

        if(hasOtherDevices){
            return;
        }
        self.onAddMember(mem);
    },

    _onFinally: function () {
        var self = this;

        self._cacheMembers = {}; // id, name, nickName, resource
        self._cacheStreams = {}; // id, memId, name, voff, aoff, type
        self._linkedStreams = {};
        self._ices = {};
        self._maybeNotExistStreams = {};

        //self._session._sessionId = undefined;
        //self._session = undefined;

        _logger.warn("finally. all clean.");
    },

    onExit: function(cver, memId, reason){
        var self = this;

        cver && (self._cver = cver);

        if(memId == self.getMemberId()){ //被服务器 强制 exit
            _logger.warn("Me exit. ", reason, memId);

            try{
                self.closed || self.close(reason);
            }catch (e){
                self.onEvent(new __event.Hangup({reason: reason, self: {id: self._memberId}}));
                self.onMeExit && self.onMeExit(reason);

                _logger.warn(e);
            }

            return;
        }

        var rmMember = self._cacheMembers[memId];
        if(rmMember){
            if(rmMember.res && rmMember.res.vcodes && rmMember.res.vcodes.length > 0){
                _util.forEach(rmMember.res.vcodes, function (index, vcode) {
                    self.supportVCodes[vcode]--;
                });
            }

            self._onRemoveMember(rmMember, reason);
            self.onEvent(new __event.Hangup({reason: reason, parnter: rmMember}));
        }
    },

    onPub: function(cver, memId, pubS){
        var self = this;

        if(!self._cacheMembers[memId]) throw "No found member. when pub";

        // if(pubS.type === 2){ //强制 aoff = 1
        //     pubS._1_aoff = pubS.aoff;
        //     pubS.aoff = self._service.hasAudioMixers() ? 0 : 1;
        // }

        var newStream = self.newStream(pubS);
        var _stream = self._cacheStreams[pubS.id];

        cver && (self._cver = cver);

        if(_stream && (newStream.sver !== _stream.sver)){
            _logger.info("Onpub. the steam ", _stream.id, " republish. sver ", _stream.sver, newStream.sver);

            if(newStream && (newStream.aoff !== _stream.aoff || newStream.voff != _stream.voff)){
                self.onStreamControl(undefined, pubS.id, newStream.voff, newStream.aoff);
            }

            _util.extend(_stream, newStream);
            self._onRepublishStream(_stream);

            return;
        }

        var stream = newStream;

        stream.owner = self._cacheMembers[memId];
        self._cacheStreams[pubS.id] = stream;

        self._onAddStream(self.newStream(stream));

        if(self.autoSub){
            if(self.isSafariButNotPushStream()){
                stream._autoSubWhenPushStream = true;
                _logger.warn("Dont auto sub stream ", stream.id, ", caused by safari not pub stream");
                return;
            }

            self.createWebrtcAndSubscribeStream(pubS.id, {
                onGotRemote: function(stream) {
                }
            }); //, undefined, subArgs
        }

        return stream;
    },

    onUnpub: function(cver, memId, sId){
        var self = this;

        var rmStream = self._cacheStreams[sId];
        self._onRemovePubstream(self._cacheMembers[memId], rmStream);

        cver && (self._cver = cver);
    },

    onClose: function(cver, confrId, reason){
        var self = this;

        try{
            self.close(reason || 0);
        } finally {
            self.onConfrClose && self.onConfrClose(confrId, reason);
        }
    },
    
    __getWebrtcFor: function (pubStreamId) {
        var self = this;

        var webrtc = self._cacheStreams[pubStreamId] && self._cacheStreams[pubStreamId]._webrtc;
        return webrtc && webrtc.getRtcId();
    },
    _getWebrtc: function (pubStreamId) {
        var self = this;

        var webrtc = self._cacheStreams[pubStreamId] && self._cacheStreams[pubStreamId]._webrtc;
        return webrtc;
    },

    _updateRemoteStream: function (stream, remoteMediaStream) {
        emedia.enableAudioTracks(remoteMediaStream, !stream.aoff && !(stream.subArgs && stream.subArgs.subSAudio === false));
        emedia.enableVideoTracks(remoteMediaStream, !stream.voff && !(stream.subArgs && stream.subArgs.subSVideo === false));
    },

    onStreamControl: function(cver, streamId, voff, aoff, sver){
        var self = this;

        var stream = self._cacheStreams[streamId];

        stream.voff = voff;
        stream.aoff = aoff;


        var webrtc = stream._webrtc;
        webrtc && webrtc._remoteStream && self._updateRemoteStream(stream, webrtc._remoteStream);

        var stream = self.newStream(stream);
        self.onUpdateStream && self.onUpdateStream(stream, new stream.Update({voff: voff, aoff: aoff}));

        cver && (self._cver = cver);
        sver && (stream.sver = sver);
    },

    aoff: function(pubS, _aoff, callback){
        var self = this;

        var rtcId = self.__getWebrtcFor(pubS.id);
        if(!rtcId){
            throw "pubS not publish" + pubS.id;
        }

        self._linkedStreams[pubS.id].aoff = _aoff;

        var streamControl = self.newMessage()
            .setOp(400)
            .setRtcId(rtcId)
            .setVoff(pubS.voff)
            .setAoff(_aoff);
        self.postMessage(streamControl, callback);
    },

    voff: function(pubS, _voff, callback){
        var self = this;

        var rtcId = self.__getWebrtcFor(pubS.id);
        if(!rtcId){
            throw "pubS not publish" + pubS.id;
        }

        self._linkedStreams[pubS.id].voff = _voff;

        var streamControl = self.newMessage()
            .setOp(400)
            .setRtcId(rtcId)
            .setVoff(_voff)
            .setAoff(pubS.aoff);
        self.postMessage(streamControl, callback);
    },

    startRecord: function (_stream, success) {
        var self = this;

        var rtcId = _stream.rtcId;

        var startRecord = self.newMessage()
            .setOp(500)
            .setRtcId(rtcId)
            .setFlag(1);
        self.postMessage(startRecord, function (rsp) {
            _logger.warn("record ", rtcId, rsp.result, rsp.msg);
            success && success(rsp.result === 0);
            if(rsp.result === 0){
                self._records[_stream.id] = _util.extend(false, {}, _stream);
            }
        });
    },

    stopRecord: function (_stream, success) {
        var self = this;

        var rtcId = _stream.rtcId;

        var stopRecord = self.newMessage()
            .setOp(500)
            .setRtcId(rtcId)
            .setFlag(0);
        self.postMessage(stopRecord, function (rsp) {
            _logger.warn("stop record ", rtcId, rsp.result, rsp.msg);
            success && success(rsp.result === 0);
        });

        if(self._records[_stream.id]){
            _util.removeAttribute(self._records, _stream.id);
        }
    },

    onMembers: function(cver, members){
        var self = this;

        var removedMembers = [];
        _util.forEach(self._cacheMembers, function (_memberId, _member) {
            members[_memberId] || removedMembers.push(_member);
        });
        _util.forEach(removedMembers, function (_index, _member) {
            self.onExit(undefined, _member.id);
        });

        var addMembers = [];
        _util.forEach(members, function (_memberId, _member) {
            if(_memberId != self.getMemberId()){
                self._cacheStreams[_memberId] || addMembers.push(_member);
            }
        });
        _util.forEach(addMembers, function (_index, _member) {
            self.onEnter(undefined, _member);
        });

        cver && (self._cver = cver);
    },

    onStreams: function(cver, streams){
        var self = this;

        var removedStreams = [];
        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
            _stream.located() || streams[_pubSId] || removedStreams.push(_stream);
        });
        _util.forEach(removedStreams, function (_index, _stream) {
            self.onUnpub(undefined, _stream.memId, _stream.id);
        });

        var addStreams = [];
        _util.forEach(streams, function (_pubSId, stream) {
            // if(stream.type === 2){ //强制 aoff = 1
            //     stream._1_aoff = stream.aoff;
            //     stream.aoff = self._service.hasAudioMixers() ? 0 : 1;
            // }

            if(stream.memId != self.getMemberId()){
                self._cacheStreams[_pubSId] || addStreams.push(stream);
            }
        });
        _util.forEach(addStreams, function (_index, _stream) {
            self.onPub(undefined, _stream.memId, _stream)
        });

        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
            var newStream;
            _stream.located() || (newStream = streams[_pubSId]);
            if(newStream && (newStream.aoff !== _stream.aoff || newStream.voff != _stream.voff)){
                self.onStreamControl(undefined, _pubSId, newStream.voff, newStream.aoff);
            }

            if(newStream && (newStream.sver !== _stream.sver)){
                _util.extend(_stream, newStream);
                self._onRepublishStream(_stream);
            }
        });

        cver && (self._cver = cver);
    },

    _onRemoveMember: function(member, reason){
        var self = this;

        _logger.info("remove", member, reason);

        var unpubStreams = [];
        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
            if((_stream.memId || (_stream.owner && _stream.owner.id)) === member.id){
                unpubStreams.push(_stream);
            }
        });
        
        _util.forEach(unpubStreams, function (index, stream) {
            self._onRemovePubstream(stream.owner, stream, reason);
        });

        _util.removeAttribute(self._cacheMembers, member.id);

        var hasOtherDevices;
        _util.forEach(self._cacheMembers, function (_memId, _member) {
            if(!hasOtherDevices && _memId != member.id && member.memName === _member.memName){
                hasOtherDevices = true;
            }
        });

        if(hasOtherDevices){
            return;
        }

        self.onRemoveMember && self.onRemoveMember(member, reason);
    },


    _onAddStream: function(stream){
        _logger.info("add stream ", stream.id);
        _logger.debug("add stream ", stream);

        var self = this;
        self.onAddStream(stream);
    },

    _onRemovePubstream: function(member, stream){
        var self = this;

        if(!stream){
            return;
        }

        function finallyDo(stream) {
            if(stream.type === 2){
                _util.removeAttribute(self.audioMixers, stream.id);

                if(stream.remotePlayAudioObject){
                    document.body.removeChild(stream.remotePlayAudioObject);
                }
            }

            var _rtcId = self.unsubscribeStream(stream.id);
            var rmStream = _util.removeAttribute(self._cacheStreams, stream.id);

            if(self.onRemoveStream){
                var stream = self.newStream(stream);

                self.onRemoveStream(stream);
            }
        }

        try{
            var soundMeter = _util.removeAttribute(self._mediaMeters, stream.id);
            soundMeter && soundMeter._finally();
        } finally {
            finallyDo(stream);
        }
    },


    _onRepublishStream: function (_stream) {
        var self = this;

        if((self._ices[_stream.rtcId] || emedia.subscribed(_stream)) && !self._maybeNotExistStreams[_stream.id]){
            var _rtcId = self.unsubscribeStream(_stream.id);

            self.createWebrtcAndSubscribeStream(_stream.id, {
                onGotRemote: function(stream) {
                    //self.onUpdateStream(_stream);
                }
            });
        }else{
            self.onUpdateStream(_stream);
        }
    },

    _onRecvRemoteMessage: function (fromMemId, args, evt) {
        var self = this;

        _logger.debug("Recv remote message", fromMemId, args);

        var fromMember = self._cacheMembers[fromMemId];
        var argsObject;
        try{
            argsObject = JSON.parse(args);
        }catch(e){
        }

        self.onRecvRemoteMessage && self.onRecvRemoteMessage(fromMember || fromMemId, argsObject || args, evt);
    },

    _onSoundChanage: function (member, stream, meterData) {
        if(emedia.config._printSoundData){
            _logger.info("Stream id " + stream.id + ", meter " + (meterData && (meterData.instant.toFixed(2)
                + " " + meterData.slow.toFixed(2)
                + " " + meterData.clip.toFixed(2)
                + " " + (meterData.trackAudioLevel || "--")
                + " " + (meterData.trackTotalAudioEnergy || "--"))));
        }

        meterData || (meterData = {
            instant: 0,
            slow: 0,
            clip: 0
        });

        var self = this;

        if(meterData.instant === 0){
            meterData.instant = meterData.trackAudioLevel || meterData.trackTotalAudioEnergy || 0;
        }

        self.onSoundChanage(member, stream, meterData);
        if(self._service._judgeTalking(meterData)){
            self.onTalking(member, stream, meterData);
        }
    },

    onAddMember: function(member){

    },
    onRemoveMember: function(member, reason){

    },
    onAddStream: function(stream){ //stream undefined 表明 autoSub属性 空或false. autoSub = true时，自动订阅

    },
    onRemoveStream: function(stream){

    },
    onUpdateStream: function (stream, update) {

    },
    onRecvRemoteMessage: function (fromMember, argsObject) {

    },

    onSoundChanage: function (member, stream, meterData) {

    },
    onTalking: function (member, stream, meterData) {

    }
});

module.exports = Attendee;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Member");

var __event = __webpack_require__(11);

var WebRTC = __webpack_require__(14);

/**
 * 未体现 Member 使用了 session。
 * 请 这样创建
 * Member({_session: sess, _memberId: memberId})
 * this._session
 *
 * {
 *  _memberId:
 *  _ices[Map]:
 * }
 *
 *
 *
 */
module.exports = _util.prototypeExtend({
    __init__: function(){
        var self = this;

        if(!self._session) throw "Require session";

        self.closed = false;
        self._ices = {};

        self.supportVCodes = {};

        self.audioMixers = {};
    },

    reflushSupportVCodes: function (vcodes) {
        var self = this;

        self.supportVCodes = {};

        self._orderVCodes = vcodes;

        if(!vcodes || vcodes.length == 0){
            _logger.warn("Not config support vcodes");
            return;
        }
        
        _util.forEach(vcodes, function (index, vcode) {
            self.supportVCodes[vcode] = 1;
        });
    },

    getOptimalVideoCodecs: function () {
        var self = this;

        if(!self._orderVCodes || self._orderVCodes.length == 0){
            return (/Chrome/.test(navigator.userAgent)) ? 'VP8'
                : (/Safari/.test(navigator.userAgent)) ? 'H264' : 'VP8';
        }

        var memberCount = 0;
        _util.forEach(self._cacheMembers, function () {
            memberCount ++;
        });


        var maxSupportCount = 0;
        var optimalVCode;

        for(var i = 0; i < self._orderVCodes.length; i++){
            var vcode = self._orderVCodes[i];

            if(maxSupportCount == 0){
                maxSupportCount = self.supportVCodes[vcode];
            }

            if(self.supportVCodes[vcode] > memberCount){
                return vcode;
            }

            if(self.supportVCodes[vcode] > maxSupportCount){
                maxSupportCount = self.supportVCodes[vcode];
                optimalVCode = vcode;
            }
        }

        return optimalVCode;
    },

    setMemberId: function (memberId) {
        this._memberId = memberId;
    },

    getMemberId: function () {
        return this._memberId || this.id;
    },

    /**
     * createWebrtc({
     *  _rtcId:
     *  iceServerConfig:
     *  onGotMediaStream:
      * onEvent:
     * })
     *
     * @param iceServerConfig
     */
    createWebrtc: function(webrtcCfg, rebuildCount){
        var self = this;

        webrtcCfg || (webrtcCfg = {});

        _util.extend(webrtcCfg, {_rebuildCount: (rebuildCount || 0)});

        if(self._service.useRTCCfg === true && self.__rtc_cfg){ //优先使用 __rtc_cfg
            webrtcCfg.iceServerConfig = _util.extend(true, {}, self.__rtc_cfg);
        }else if(_util.isPlainObject(self._service.useRTCCfg)){
            webrtcCfg.iceServerConfig = _util.extend(true, {}, self._service.useRTCCfg);
        }

        var webrtc = new WebRTC({
            //iceServerConfig: iceServerConfig,

            onIceStateChange: function(iceState){
                var state = iceState;

                _logger.debug("evt.target ice state", state);

                if(state == 'failed'){
                    self.onEvent(new __event.ICEConnectFail({webrtc: webrtc}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEConnectFail({webrtc: webrtc}));

                    return;
                }
                if(state == 'connected'){
                    self.onEvent(new __event.ICEConnected({webrtc: webrtc}));
                    webrtc.onEvent = null;

                    return;
                }
                if(state == 'closed'){
                    self.onEvent(new __event.ICEClosed({webrtc: webrtc}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEClosed({webrtc: webrtc}));

                    return;
                }
                if(state == 'disconnected'){
                    self.onEvent(new __event.ICEDisconnected({webrtc: webrtc}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEDisconnected({webrtc: webrtc}));

                    return;
                }

                self._onIceStateChange && self._onIceStateChange(webrtc, iceState);
            },

            onIceCandidate: function (candidate) { //event.candidate
                self._onIceCandidate && candidate && self._onIceCandidate(webrtc, candidate);
            },

            onGotRemoteStream: function (remoteStream) {
                _logger.info("got stream.", webrtc, remoteStream);

                webrtc.onGotMediaStream && webrtc.onGotMediaStream(remoteStream);

                self.onEvent(new __event.ICERemoteMediaStream({webrtc: webrtc}));
            },
            onAddIceCandidateError: function (err) {
                self.onEvent(new __event.AddIceCandError({webrtc: webrtc, event: err}))
            },
            onSetSessionDescriptionError: function (error) {
                _logger.warn('onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
                self.onEvent && self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            },
            onCreateSessionDescriptionError: function (error) {
                _logger.warn('Failed to create session description: ' + error.toString());
                self.onEvent && self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            },
            // onSetLocalSessionDescriptionSuccess: function (error) {
            //     _logger.debug('onSetLocalSessionDescriptionSuccess : setLocalDescription complete: ' + error.toString());
            //     self.onEvent && self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            // },
        }, webrtcCfg);

        (self._ices || (self._ices = {}));
        if(self._ices[webrtc.getRtcId()]){
            self._howDoWebrtcWhenCrtExsitsWebrtc(webrtc);
        }
        self._ices[webrtc.getRtcId()] = webrtc;
        self._ices[webrtc.__id] = webrtc;

        self._iceCreateRtcPeerConnection(webrtc.getRtcId());
        _logger.debug("create rtc ", webrtc);

        return webrtc;
    },

    _howDoWebrtcWhenCrtExsitsWebrtc: function (webrtc) {
        var self = this;

        //throw "Webrtc id exsits at ices. it is " + webrtc.getRtcId();
        self.closeWebrtc(webrtc.getRtcId(), true, false);
    },

    connect: function (suceess, fail) {
        var self = this;

        self._session.connect(suceess, fail);
    },

    connected: function () {
        var self = this;

        return self._session.connected();
    },

    newMessage: function message (cfg) {
        var self = this;

        var message = self._session.newMessage(cfg);
        message.post = function (callback, timeoutMillis) {
            self.postMessage(this, callback, timeoutMillis)
        };

        return message;
    },

    message: function (cfg) {
        var self = this;

        var message = self._session.newMessage(cfg);
        message.post = function (callback, timeoutMillis) {
            self.postMessage(this, callback, timeoutMillis)
        };

        return message;
    },

    postMessage: function(message, callback, timeoutMillis){
        var self = this;

        try {
            message.sessId || (message.sessId = self._session._sessionId);
            self._session.postMessage(message, callback, timeoutMillis);
        } catch (e){
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "post message. exception"});
            _logger.warn(e);
        }
    },

    onEvent: function (error) {

    },

    _onIceStateChange: function(webrtc, rtcState){
        var self = this;

        _logger.info(webrtc.getRtcId(), rtcState);
        self.onEvent(new __event.ICEChanage({webrtc: webrtc, state: rtcState}));
    },

    _onIceCandidate: function (webrtc, cand) { //event.candidate
        var self = this;

        var cands;
        if(_util.isArray(cand)){
            cands = cand;
        }else{
            cands = [];
            cands.push(cand);
        }

        var tcklC = self.newMessage()
            .setOp(105)
            .setRtcId(webrtc.getRtcId())
            .setCands(cands);

        self.postMessage(tcklC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: tcklC, response: rsp}));

                return;
            }
        });
    },

    _initC: function (webrtc, stream, sdp, subSId, rspFail, rspSuccess) {
        var self = this;

        if(stream && stream.rtcId !== webrtc.getRtcId()){
            throw "stream and webrtc rtcId not equal.";
        }

        var initC = self.newMessage()
            .setOp(102)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp)
            .setSubSId(subSId);

        webrtc.subArgs && _util.extend(initC, webrtc.subArgs);

        if(stream && stream.located()){
            initC.setPubS(stream);
        }

        self.postMessage(initC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: initC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: initC, response: rsp, hidden: rsp.retrying === true}));

                return;
            }

            if(stream && !stream.id && rsp.streamId){
                stream.id = rsp.streamId;
            }

            try{
                rspSuccess && rspSuccess();
            }catch(e){
                _logger.warn(e);
            }

            rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp, rsp.cands)

            rsp.mems && self.onMembers && self.onMembers(rsp.cver, rsp.mems);
            rsp.streams && self.onStreams && self.onStreams(rsp.cver, rsp.streams);
        });
    },

    _acptC: function (webrtc, sdp, rspFail) {
        var self = this;

        var acptC = self.newMessage()
            .setOp(104)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp);

        self.postMessage(acptC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: acptC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: acptC, response: rsp}));

                return;
            }
        });
    },

    _ansCAndPubstream: function(webrtc, stream, sdp, rspFail, rspSuccess){
        var self = this;

        var ansC = self.newMessage()
            .setOp(106)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp);

        webrtc.subArgs && _util.extend(ansC, webrtc.subArgs);

        if(stream && stream.located()){
            stream = _util.extend({}, stream);
            _util.removeAttribute(stream, "mutedMuted");
            _util.removeAttribute(stream, "_located");

            ansC.setPubS(stream);
        }

        self.postMessage(ansC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: ansC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: ansC, response: rsp, hidden: rsp.retrying === true}));

                return;
            }

            if(stream && !stream.id && rsp.streamId){
                stream.id = rsp.streamId;
            }

            try{
                rspSuccess && rspSuccess();
            }catch(e){
                _logger.warn(e);
            }
        });
    },

    _ansC: function (webrtc, sdp, rspFail) {
        var self = this;

        var ansC = self.newMessage()
            .setOp(106)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp);

        self.postMessage(ansC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: ansC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: ansC, response: rsp}));

                return;
            }
        });
    },

    _termC: function (webrtc, endReason, rspFail) {
        var self = this;

        var rtcId = (typeof webrtc === "string") ? webrtc : webrtc.getRtcId();
        var termC = self.newMessage()
            .setOp(107)
            .setRtcId(rtcId)
            .setEndReason(endReason);

        self.postMessage(termC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: termC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: termC, response: rsp}));

                return;
            }
        });
    },

    _iceCreateRtcPeerConnection: function(rtcId){
        var self = this;

        self._ices[rtcId].createRtcPeerConnection();

        _logger.debug("create rtc peer connection", rtcId);
    },

    doOffer: function(rtcId, onGotOffer, onCreateOfferError){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc.createOffer(function(sdp){
            onGotOffer(sdp);
        });
    },

    offerCall: function(rtcId, stream, subSId, rspFail, rspSuccess){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc.createOffer(function(sdp){
            self._initC && self._initC(webrtc, stream, sdp, subSId, rspFail, rspSuccess);
        });
    },

    accept: function(rtcId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.createPRAnswer(function(sdp){
            self._acptC && self._acptC(webrtc, sdp, rspFail);
        });
    },

    answerCall: function(rtcId, stream, rspFail, rspSuccess){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc.createAnswer(function(sdp){
            self._ansCAndPubstream && self._ansCAndPubstream(webrtc, stream, sdp, rspFail, rspSuccess);
        });
    },

    answer: function(rtcId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.createAnswer(function(sdp){
            self._ansC && self._ansC(webrtc, sdp, rspFail);
        });
    },

    onTcklC: function(rtcId, cands){
        var self = this;
        self._addIceCandidate(cands, rtcId)
    },

    onAcptC: function(rtcId, sdp, cands){
        var self = this;
        self._iceSetRemoteSDP(sdp, rtcId)
        cands && self._addIceCandidate(cands, rtcId)
    },

    onAnsC: function(rtcId, sdp, cands){
        var self = this;
        self._iceSetRemoteSDP(sdp, rtcId)
        cands && self._addIceCandidate(cands, rtcId)
    },

    _addIceCandidate: function(cands, rtcId){
        var self = this;

        if(!cands || cands.length == 0){
            _logger.warn("drop cands", cands);
            return;
        }

        var webrtc = self._ices[rtcId];
        webrtc && webrtc.addIceCandidate(cands);
    },

    closeWebrtc: function(rtcId, remainLocalStream, serverClosed){
        var self = this;
        var webrtc = self._ices[rtcId];

        _util.forEach(self._cacheStreams, function (sid, _stream) {
            if(_stream.rtcId === rtcId && !_stream.located()){
                try{
                    var soundMeter = _util.removeAttribute(self._mediaMeters, sid);
                    soundMeter && soundMeter._finally();
                }catch(e){
                    _logger.warn(e);
                }
            }

            if(_stream.rtcId === rtcId && _stream.type === 2){
                _util.removeAttribute(self.audioMixers, _stream.id);
            }
        });

        if(!webrtc || webrtc.closed){
            _logger.warn("Webrtc not exsits or closed", webrtc && webrtc.closed);

            if(serverClosed){
                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        delete self._linkedStreams[sid];
                        _logger.warn("Webrtc close, remvoe from _linkedStreams", sid);
                    }
                });
            }

            serverClosed || (self._termC(rtcId, 0));

            return;
        }

        if(self._records){
            function _stopRecord(_stream) {
                try{
                    self.stopRecord(_stream);
                } catch (e){
                    _logger.warn(e);
                } finally {
                    _util.removeAttribute(self._records, _stream.id);
                }
            }

            _util.forEach(self._records, function (sid, _stream) {
                _stream.rtcId === rtcId && _stopRecord(_stream);
            });
        }

        try{
            serverClosed || (webrtc && self._termC(webrtc, remainLocalStream && webrtc._localStream ? -10 : 0));
        } finally {
            //webrtc && _util.removeAttribute(self._ices, rtcId);

            webrtc && webrtc.close();
            webrtc && self.onWebrtcTermC && self.onWebrtcTermC(webrtc);

            if(remainLocalStream){
            }else{
                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        if(_stream.located()){
                            emedia.stopTracks(_stream._localMediaStream);

                            self._cacheStreams[sid] && self._linkedStreams[sid] && self.onRemoveStream(_stream);

                            delete self._cacheStreams[sid];
                            _logger.info("Webrtc close. Remove stream", sid, ". from cache");
                        }

                        if(serverClosed){
                            delete self._linkedStreams[sid];
                            _logger.info("Webrtc close. Remove stream", sid, ". from _linkedStreams");
                        }
                    }
                });
            }
        }

        return webrtc;
    },

    __close: function (reason) {
        _logger.warn("closing, reason = ", reason);

        var self = this;
        if(self.closed){
            return;
        }

        self.closed = true;

        if(self.__getCopyInterval){
            clearInterval(self.__getCopyInterval);
            _logger.warn("Stop interval get copy");
        }


        if(self._ices) {
            for(var _rtcId in self._ices){
                self.closeWebrtc(_rtcId);
            }
        }

        var exit = self.newMessage()
            .setOp(201)
            .setReason(reason || 0);
        self.postMessage(exit);
    },


    exit: function (closeMyConfrIfICrtConfr) {
        var self = this;

        if(!closeMyConfrIfICrtConfr){
            self.close(0); // 正常挂断
            return;
        }

        if(closeMyConfrIfICrtConfr){
            self._closeMyConfr(11);
            //return;
        }
        setTimeout(function () {
            self.close(0); // 正常挂断
        }, 100);
    },

    _closeMyConfr: function (reason) {
        var self = this;

        var closeConfr = self.newMessage()
            .setOp(204)
            .setReason(reason || 0);
        self.postMessage(closeConfr,  function (rsp) {
            _logger.warn("Close confr ", rsp.result, rsp.msg);
        });
    },

    /**
     * 1.服务端 踢掉
     * 2.手动点击 挂断
     * 3.enter失败！
     *
     * @param reason
     */
    close: function (reason, failed) {
        var self = this;
        if(self.closed){
            return;
        }

        try{
            _util.forEach(self._cacheStreams || {}, function (sid, _stream) {
                if(_stream.located() && _stream._localMediaStream){
                    emedia.stopTracks(_stream._localMediaStream);
                }
            });

            self.__close(reason);

            _util.forEach(self._cacheStreams, function (sid, _stream) {
                self.onRemoveStream(_stream);
            });
            _util.forEach(self._cacheMembers, function (_id, _member) {
                self.onRemoveMember(_member);
            });
        } finally {
            setTimeout(function () {
                self._session && self._session.close(reason);
            }, 500);

            self.onEvent(new __event.Hangup({reason: reason, failed: failed, self: {id: self._memberId}}));
            self.onMeExit && self.onMeExit(reason, failed);

            self._onFinally && self._onFinally();
        }
    },

    webrtcState: function(rtcId){
        var self = this;

        var webrtc = self._ices[rtcId];
        return webrtc.iceConnectionState();
    },

    _iceSetRemoteSDP: function (sdp, rtcId) {
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.setRemoteDescription(sdp);
    },

    setLocalStream: function(stream, rtcId){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.setLocalStream(stream);
    },

    onWebrtcTermC: function (_webrtc) {

    }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * WebRTC
 *
 *                              A                   |                                       B
 *                                                  |
 *   1.createMedia:got streamA                      | 1.createMedia:got streamB
 *   2.new RTCPeerConnection: APeerConnection       | 2.new RTCPeerConnection: BPeerConnection
 *   3.APeerConnection.createOffer:got offerA       |
 *      APeerConnection.setLocalDescription(offerA) |
 *      send offerA ---> ---> ---> --->        ---> |
 *                                                  | ---> 3.got offerA | offerA = new RTCSessionDescription(offerA);
 *                                                  | BPeerConnection.setRemoteDescription(offerA)
 *                                                  |
 *                                                  |
 *                                                  | 4.BPeerConnection.createAnswer: got answerB
 *                                                  | BPeerConnection.setLocalDescription(answerB)
 *                                                  | <---- send answerB
 *                                                  | 5.got answerB <--- <--- <--- <---
 *                                                  | answerB = new RTCSessionDescription(answerB)
 *                                                  |
 * APeerConnection.setRemoteDescription(answerB)    |
 *                                                  |
 * 6.got candidateA ---> --->  ---> --->            | ---> got candidateA
 *                                                  | BPeerConnection.addIceCandidate(new RTCIceCandidate(candidateA))
 *                                                  |
 *                                                  |
 *                                                  | got candidateB <--- <--- <--- <---
 *                                                  | <--- 6.got candidateB APeerConnection.addIceCandidate(candidateB)
 *                                                  |
 *                                                  |
 *                                                  | 7. APeerConnection.addStream(streamA)
 *                                                  | 7. BPeerConnection.addStream(streamB)
 *                                                  |
 *                              streamA >>>>>>>>>>> |  <<<<< see A
 *                              seeB <<<<<<<<<<<    | <<<<< streamB
 *                                                  |
 *
 */



var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Webrtc");

var __event = __webpack_require__(11);

var SDPUtils = __webpack_require__(15); //希望使用 SDPUtils 取代 SDPSection

var _SDPSection = {
    headerSection: null,

    audioSection: null,
    videoSection: null,

    _parseHeaderSection: function (sdp, audioIndex, videoIndex) {
        var index = audioIndex;

        if(videoIndex === -1){ //保持不变
        }else if(audioIndex === -1){
            index = videoIndex;
        }else{
            index = Math.min(audioIndex, videoIndex);
        }

        if (index >= 0) {
            return sdp.slice(0, index);
        }
        return sdp;
    },

    _parseAudioSection: function (sdp, audioIndex, videoIndex) {
        var index = audioIndex;
        if (index >= 0) {
            return sdp.slice(index, videoIndex < index ? sdp.length : videoIndex);
        }
    },

    _parseVideoSection: function (sdp, audioIndex, videoIndex) {
        var index = videoIndex;
        if (index >= 0) {
            return sdp.slice(index, audioIndex < index ? sdp.length : audioIndex);
        }
    },

    spiltSection: function (sdp) {
        var self = this;

        self._preSDP = sdp;

        var audioIndex = self._preAudioIndex = sdp.indexOf('m=audio');
        var videoIndex = self._preVideoIndex = sdp.indexOf('m=video');

        self.headerSection = self._parseHeaderSection(sdp, audioIndex, videoIndex);
        self.audioSection = self._parseAudioSection(sdp, audioIndex, videoIndex);
        self.videoSection = self._parseVideoSection(sdp, audioIndex, videoIndex);
    },

    updateVideoSendonly: function () {
        var self = this;

        if(!self.videoSection){
            return;
        }

        self.videoSection = self.videoSection.replace(/sendrecv/g, "sendonly");
    },

    updateVideoRecvonly: function () {
        var self = this;

        if(!self.videoSection){
            return;
        }

        self.videoSection = self.videoSection.replace(/sendrecv/g, "recvonly");
    },

    updateAudioSendonly: function () {
        var self = this;

        if(!self.audioSection){
            return;
        }

        self.audioSection = self.audioSection.replace(/sendrecv/g, "sendonly");
    },

    updateAudioRecvonly: function () {
        var self = this;

        if(!self.audioSection){
            return;
        }

        self.audioSection = self.audioSection.replace(/sendrecv/g, "recvonly");
    },

    updateVCodes: function (vcodes) {
        var self = this;

        if(!vcodes){
            return;
        }
        if(!self.videoSection){
            return;
        }

        if(typeof vcodes === "string"){
            var arr = [];
            arr.push(vcodes);
            vcodes = arr;
        }

        var vcodeMap = {};
        var regexp = /a=rtpmap:(\d+) ([A-Za-z0-9]+)\/.*/ig;
        var arr = self._parseLine(self.videoSection, regexp);
        for(var i = 0; i < arr.length; i++) {
            var codeNum = arr[++i];
            var code = arr[++i];
            vcodeMap[code] = codeNum;
        }

        //H264
        //if(/Firefox/.test(navigator.userAgent) || /Chrome/.test(navigator.userAgent)){ //a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
        var h264_regexp = /a=fmtp:(\d+) .*profile-level-id=42e01f;?.*/ig;
        var h264_arr = self._parseLine(self.videoSection, h264_regexp);

        if(h264_arr && h264_arr.length >= 2){
            vcodeMap['H264'] = h264_arr[1];
        }
        //}

        var numCodes = []
        for(var i = 0; i < vcodes.length; i++){
            var supportVCode = vcodeMap[vcodes[i]];
            supportVCode && numCodes.push(supportVCode);
        }
        if(numCodes.length == 0){
            _logger.warn("Not found vcodes map", vcodes);
            if(self._webrtc){
                _logger.warn("Not found vcodes map", vcodes, self._webrtc._rtcId, self._webrtc.__id);
            }
        }

        var codeLineLastIndex = self.videoSection.indexOf('\r');
        var codeLine = self.videoSection.substring(0, codeLineLastIndex);

        var fields = codeLine.split(' ');

        Array.prototype.push.apply(numCodes, fields.slice(3));

        var newNumCodes = [];
        var _map = {};
        _util.forEach(numCodes, function (index, ele) {
            if(newNumCodes.length == 0){
                newNumCodes.push(ele);
                _map[ele] = true;
            } else {
                if(!_map[ele]){
                    newNumCodes.push(ele);
                    _map[ele] = true;
                }
            }
        });
        //alert(numCodes.join(' '));

        //fields.splice(3, 0, numCodes);
        fields.splice(3, fields.length - 3, newNumCodes.join(' '));

        codeLine = fields.join(' ');
        //_logger.info(codeLine);
        if(self._webrtc){
            _logger.warn(codeLine, self._webrtc._rtcId, self._webrtc.__id);
        }

        self.videoSection = codeLine + self.videoSection.substring(codeLineLastIndex);
    },

    removeSSRC: function (section) {
        var arr = [];

        var _arr = section.split(/a=ssrc:[^\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            _arr[i] != '\n' && arr.push(_arr[i]);
        }
        // arr.push('');

        return arr.join('\n');
    },

    removeField_msid: function (section) {
        var arr = [];

        var _arr = section.split(/a=msid:[^\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            _arr[i] != '\n' && arr.push(_arr[i]);
        }
        // arr.push('');

        section = arr.join('\n');
        arr = [];

        _arr = section.split(/[\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            (_arr[i] != '\n') && arr.push(_arr[i]);
        }

        return arr.join('\n');
    },

    updateHeaderMsidSemantic: function (wms) {

        var self = this;

        var line = "a=msid-semantic: WMS " + wms;

        var _arr = self.headerSection.split(/a=msid\-semantic: WMS.*/g);
        var arr = [];
        switch (_arr.length) {
            case 1:
                arr.push(_arr[0]);
                break;
            case 2:
                arr.push(_arr[0]);
                arr.push(line);
                arr.push('\n');
                break;
            case 3:
                arr.push(_arr[0]);
                arr.push(line);
                arr.push('\n');
                arr.push(_arr[2]);
                arr.push('\n');
                break;
        }

        return self.headerSection = arr.join('');
    },

    updateAudioSSRCSection: function (ssrc, cname, msid, label) {
        var self = this;

        self.audioSection && (self.audioSection = self.removeSSRC(self.audioSection));
        self.audioSection && (self.audioSection = self.removeField_msid(self.audioSection));
        self.audioSection && (self.audioSection = self.audioSection + self.ssrcSection(ssrc, cname, msid, label));
    },


    updateVideoSSRCSection: function (ssrc, cname, msid, label) {
        var self = this;

        self.videoSection && (self.videoSection = self.removeSSRC(self.videoSection));
        self.videoSection && (self.videoSection = self.removeField_msid(self.videoSection));
        self.videoSection && (self.videoSection = self.videoSection + self.ssrcSection(ssrc, cname, msid, label))
    },

    getUpdatedSDP: function (audioVideo) {
        var self = this;

        var sdp = "";

        self.headerSection && (sdp += self.headerSection);

        if(audioVideo === true
            || (audioVideo === undefined && self._preAudioIndex < self._preVideoIndex)){
            self.audioSection && (sdp += self.audioSection);
            self.videoSection && (sdp += self.videoSection);
        }else{
            self.videoSection && (sdp += self.videoSection);
            self.audioSection && (sdp += self.audioSection);
        }

        return sdp;
    },

    parseMsidSemantic: function (header) {
        var self = this;

        var regexp = /a=msid\-semantic:\s*WMS (\S+)/ig;
        var arr = self._parseLine(header, regexp);

        arr && arr.length == 2 && (self.msidSemantic = {
            line: arr[0],
            WMS: arr[1]
        });

        return self.msidSemantic;
    },

    ssrcSection: function (ssrc, cname, msid, label) {
        var lines = [
            'a=ssrc:' + ssrc + ' cname:' + cname,
            'a=ssrc:' + ssrc + ' msid:' + msid + ' ' + label,
            'a=ssrc:' + ssrc + ' mslabel:' + msid,
            'a=ssrc:' + ssrc + ' label:' + label,
            ''
        ];

        return lines.join('\n');
    },

    parseSSRC: function (section) {
        var self = this;

        var regexp = new RegExp("a=(ssrc):(\\d+) (\\S+):(\\S+)", "ig");

        var arr = self._parseLine(section, regexp);
        if (arr) {
            var ssrc = {
                lines: [],
                updateSSRCSection: self.ssrcSection
            };

            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                if (e.indexOf("a=ssrc") >= 0) {
                    ssrc.lines.push(e);
                } else {
                    switch (e) {
                        case 'ssrc':
                        case 'cname':
                        case 'msid':
                        case 'mslabel':
                        case 'label':
                            ssrc[e] = arr[++i];
                    }
                }
            }

            return ssrc;
        }
    },

    _parseLine: function (str, regexp) {
        var arr = [];

        var _arr;
        while ((_arr = regexp.exec(str)) != null) {
            for (var i = 0; i < _arr.length; i++) {
                arr.push(_arr[i]);
            }
        }

        if (arr.length > 0) {
            return arr;
        }
    }
};

var SDPSection = function (sdp, webrc) {
    _util.extend(this, _SDPSection);
    this._webrtc = webrc;
    this.spiltSection(sdp);
};

SDPSection.isAudioVideo = function (sdp) {
    var audioIndex = sdp.indexOf('m=audio');
    var videoIndex = sdp.indexOf('m=video');

    return audioIndex < videoIndex;
}

SDPSection.isVideoPreAudio = function (sdp) {
    var audioIndex = sdp.indexOf('m=audio');
    var videoIndex = sdp.indexOf('m=video');

    return audioIndex >= 0 && videoIndex>=0 && videoIndex < audioIndex;
}


var __rtc_globalCount = emedia.__rtc_globalCount = 0;

/**
 * Abstract
 * {
 *   onIceStateChange:
 *   onIceCandidate:
 *   onGotRemoteStream:
 *
 *   createRtcPeerConnection:
 *   createOffer:
 *   createPRAnswer:
 *   createAnswer:
 *   addIceCandidate:
 *   close:
 *   iceState:
 *
 *   setLocalStream:
 *   getRtcId:
 * }
 *
 */
/**
 * ICE 通道失败：
 * 1.set sdp 失败
 * 2.set cands 失败
 * 但最终都是 ice fail
 *
 *
 * onSetSessionDescriptionError
 * onCreateSessionDescriptionError
 * onAddIceCandidateError
 *
 * onIceStateChange  ice fail
 *
 */
var _WebRTC = _util.prototypeExtend({
    closed: false,
    sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
    },

    /**
     * offerToReceiveAudio false sendonly, or sendrecv
     * offerToReceiveVideo false sendonly, or sendrecv
     *
     */
    offerOptions: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
    },

    optimalVideoCodecs: null,
    optimalAudioCodecs: null,

    __init__: function () {
        var self = this;

        self._rtcId || (self._rtcId = "RTC" + (__rtc_globalCount++));
        self.__id = "_i_" + (__rtc_globalCount++);

        self.__setRemoteSDP = false;
        self.__tmpRemoteCands = [];
        self.__tmpLocalCands = [];
        self._rtcPeerConnection = null;

        self.cctx = self.__id;

        _logger.info("Webrtc created.", self._rtcId, self.__id);
    },

    getRtcId: function(){
        return this._rtcId;
    },

    iceState: function () {
        var self = this;
        return self._rtcPeerConnection.iceConnectionState;
    },

    setSubArgs: function (subArgs) {
        var self = this;
        self.subArgs = subArgs;
    },

    getReceiversOfPeerConnection: function () {
        var self = this;

        if(!self._rtcPeerConnection){
            return;
        }

        if(self._rtcPeerConnection.iceConnectionState == 'closed'){
            return;
        }

        return self._rtcPeerConnection.getReceivers();
    },

    updateRemoteBySubArgs: function () {
        var self = this;

        if(!self.subArgs){
            return;
        }
        if(!self._remoteStream){
            return;
        }

        emedia.enableVideoTracks(self._remoteStream, !(self.subArgs && self.subArgs.subSVideo === false));
        emedia.enableAudioTracks(self._remoteStream, !(self.subArgs && self.subArgs.subSAudio === false));

        _logger.info("enable tracks remote stream", self._remoteStream, self._rtcId, self.__id,  self.closed);
    },

    createRtcPeerConnection: function (iceServerConfig) {
        var self = this;
        _logger.debug('begin create peer connection ......', self._rtcId, self.__id,  self.closed);

        iceServerConfig || (iceServerConfig = self.iceServerConfig);

        if (iceServerConfig || emedia.isEdge){ //reduce icecandidate number:add default value
            iceServerConfig || (iceServerConfig = {});
            !iceServerConfig.iceServers && (iceServerConfig.iceServers = []);

            iceServerConfig.rtcpMuxPolicy = "require";
            iceServerConfig.bundlePolicy = "max-bundle";

            //iceServerConfig.iceTransportPolicy = 'relay';
            if(iceServerConfig.relayOnly){
                iceServerConfig.iceTransportPolicy = 'relay';
            }
        } else {
            iceServerConfig = null;
        }

        // iceServerConfig = {
        //     capAudio: true,
        //     capVideo: true,
        //     iceServers:[{
        //         credential: "+F34cGoWeMmwa+XtvibM7dr4Ccc=",
        //         url: "turn:101.200.76.93:3478",
        //         username: "easemob-demo#chatdemoui_yss000@easemob.com/webim_device_uuid%179310420104847360:1506431735"
        //     }],
        //     recvAudio: true,
        //     recvVideo: true,
        //     relayOnly: false,
        // };
        _logger.info('create pc, set config:', iceServerConfig, self._rtcId, self.__id,  self.closed);

        var rtcPeerConnection = self._rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
        rtcPeerConnection.__peerId = self._rtcId;
        _logger.debug('created local peer connection object', rtcPeerConnection, self._rtcId);


        rtcPeerConnection.onicecandidate = function (event) {
            var candidate = event.candidate;

            //reduce icecandidate number: don't deal with tcp, udp only
            if (event.type == "icecandidate"
                && ((!candidate)
                    || (typeof candidate.protocol === 'string' && candidate.protocol.toLowerCase() === 'tcp')
                    || / TCP /.test(candidate.candidate))) {
                _logger.debug("On ICE candidate: drop", candidate, self._rtcId, self.__id,  self.closed);
                return;
            }

            if(!candidate.candidate){
                throw "Not found candidate. candidate is error, " + event.candidate.candidate;
            }

            candidate.cctx = self.cctx;
            if(!self.__setRemoteSDP){
                (self.__tmpLocalCands || (self.__tmpLocalCands = {})).push(candidate);
                _logger.debug('On ICE candidate ok: but tmp buffer caused by not set remote sdp: ', candidate,
                    self._rtcId, self.__id,  self.closed);
                return;
            }else{
                _logger.debug('On ICE candidate ok: ', candidate, self._rtcId, self.__id,  self.closed);
            }
            self._onIceCandidate(candidate);
        };

        function stateChange(event) {
            _logger.info("states: conn", (rtcPeerConnection.connectionState || rtcPeerConnection.iceConnectionState),
                ", ice", rtcPeerConnection.iceConnectionState, "@", self._rtcId, self.__id,  self.closed);
            try {
                self.onIceStateChange(rtcPeerConnection.iceConnectionState);
            }finally{

            }
        }

        rtcPeerConnection.onconnectionstatechange = stateChange.bind(self);
        rtcPeerConnection.onicestatechange =  stateChange.bind(self);
        rtcPeerConnection.oniceconnectionstatechange =  stateChange.bind(self);
        rtcPeerConnection.onsignalingstatechange = function (event) {
            _logger.info("states: signaling", rtcPeerConnection.signalingState, "@", self._rtcId, self.__id,  self.closed);
        }

        if(rtcPeerConnection.ontrack === null){
            self._onTrack && (rtcPeerConnection.ontrack = function (event) {
                self._onTrack(event);
            });
        }

        rtcPeerConnection.onaddstream = function (event) {
            self._onGotRemoteStream(event);
        };
    },

    addTrack: function(tracks, stream){
        var self = this;

        tracks.forEach(function(track) {
            self._rtcPeerConnection.addTrack(track, stream);
        });
    },
    setLocalStream: function (localStream) {
        var self = this;

        self._localStream = localStream;

        if(self._rtcPeerConnection.addTrack){
            localStream.getTracks().forEach(function(track) {
                self._rtcPeerConnection.addTrack(track, localStream);
            });
        }else{
            self._rtcPeerConnection.addStream(localStream);
        }
        _logger.debug('Added local stream to RtcPeerConnection', localStream, self._rtcId, self.__id, this.closed);
    },

    removeStream: function (mediaStream) {
        this._rtcPeerConnection.removeStream(mediaStream);
        _logger.debug('Remove stream from RtcPeerConnection', mediaStream, self._rtcId, self.__id, this.closed);
    },

    getLocalStream: function () {
        return this._localStream;
    },
    getRemoteStream: function () {
        return this._remoteStream;
    },

    createOffer: function (onCreateOfferSuccess, onCreateOfferError) {
        var self = this;

        _logger.debug('createOffer start...', self.offerOptions);

        var offerOptions = _util.extend({}, self.offerOptions);

        //offerToReceiveAudio = false时，chrome没有video段；safari却这个块。需要将sendrecv改为sendonly
        //由于手机没有视频发布时，sdp中有video字段，而 web以offerToReceiveVideo = false去订阅时，导致订阅流中没有video块，会引发重协商。进而导致 始终无法看到对方视频
        //所以 订阅流时 无论offerToReceiveVideo = false，都生成offer sdp；其中都有video块。即 offerToReceiveVideo = true；但要将sdp修改为recvonly
        if(self.subArgs){
            offerOptions = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            }
        }

        return self._rtcPeerConnection.createOffer(offerOptions).then(
            function (desc) {
                self.offerDescription = desc;

                if(emedia.isEdge){
                    desc.sdp = desc.sdp.replace(/profile-level-id=[^;]+/, "profile-level-id=42e01f");
                }
                if(emedia.isFirefox){
                    //需要交换 cand answer
                    self.fireFoxOfferVideoPreAudio = SDPSection.isVideoPreAudio(desc.sdp);
                }
                desc.sdp = desc.sdp.replace(/m=video 0/g, "m=video 9");
                _logger.warn("setLocalDescription. modify offer. if 'm=video 0' -> 'm=video 9'; if H264, 'profile-level-id=42e01f'", self._rtcId, self.__id);

                var updateVCodes;
                if((updateVCodes = (self.optimalVideoCodecs && ((typeof self.optimalVideoCodecs === "string") || self.optimalVideoCodecs.length > 0)))
                    || (self.offerOptions && (self.offerOptions.offerToReceiveVideo === false || self.offerOptions.offerToReceiveAudio === false))
                ){
                    var sdpSection = new SDPSection(desc.sdp, self);
                    updateVCodes && sdpSection.updateVCodes(self.optimalVideoCodecs);

                    if(!emedia.isSafari && self.subArgs){ //订阅流
                        // self.offerOptions && self.offerOptions.offerToReceiveVideo === false && sdpSection.updateVideoRecvonly();
                        // self.offerOptions && self.offerOptions.offerToReceiveAudio === false && sdpSection.updateAudioRecvonly();
                    }else{
                        emedia.isSafari && self.offerOptions && self.offerOptions.offerToReceiveVideo === false && sdpSection.updateVideoSendonly();
                        emedia.isSafari && self.offerOptions && self.offerOptions.offerToReceiveAudio === false && sdpSection.updateAudioSendonly();
                    }

                    desc.sdp = sdpSection.getUpdatedSDP();
                }

                _logger.debug('setLocalDescription start', desc, self._rtcId, self.__id,  self.closed, self.optimalVideoCodecs);
                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self._onSetLocalSessionDescriptionSuccess.bind(self),
                    self._onSetSessionDescriptionError.bind(self)
                ).then(function () {
                    desc.cctx = self.cctx;
                    (onCreateOfferSuccess || self.onCreateOfferSuccess.bind(self))(desc);
                });
            },
            (onCreateOfferError || self._onCreateSessionDescriptionError.bind(self))
        );
    },

    createPRAnswer: function (onCreatePRAnswerSuccess, onCreatePRAnswerError) {
        var self = this;

        _logger.info(' createPRAnswer start',  self.closed, self.sdpConstraints);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(
            function (desc) {
                _logger.debug('_____________PRAnswer ', desc.sdp, self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                desc.type = "pranswer";
                desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');


                self.__prAnswerDescription = desc;

                _logger.debug('inactive PRAnswer ', desc.sdp, self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('setLocalDescription start', desc, self._rtcId, self.__id,  self.closed);

                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self._onSetLocalSessionDescriptionSuccess.bind(self),
                    self._onSetSessionDescriptionError.bind(self)
                ).then(function () {
                    var sdpSection = new SDPSection(desc.sdp);
                    sdpSection.updateHeaderMsidSemantic("MS_0000");
                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                    desc.sdp = sdpSection.getUpdatedSDP();

                    _logger.debug('Send PRAnswer ', desc.sdp, self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                    self.cctx && (desc.cctx = self.cctx);
                    (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess.bind(self))(desc);
                });
            },
            (onCreatePRAnswerError || self._onCreateSessionDescriptionError.bind(self))
        );
    },

    createAnswer: function (onCreateAnswerSuccess, onCreateAnswerError) {
        var self = this;

        _logger.info('createAnswer start',  self.closed, self.sdpConstraints);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(
            function (desc) {
                _logger.debug('_____________________Answer ', self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                desc.type = 'answer';

                function updateSDP() {
                    var sdpSection = new SDPSection(desc.sdp);
                    var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);
                    if(!ms){
                        return;
                    }

                    if(ms.WMS == '*') {
                        sdpSection.updateHeaderMsidSemantic(ms.WMS = "MS_0000");
                    }
                    var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
                    var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

                    audioSSRC && sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label || "LABEL_AUDIO_1000");
                    if(videoSSRC){
                        sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label || "LABEL_VIDEO_2000");
                    }
                    // mslabel cname

                    desc.sdp = sdpSection.getUpdatedSDP();
                }

                if(emedia.supportPRAnswer){
                    updateSDP();
                }

                self.__answerDescription = desc;

                _logger.debug('Answer ', self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('setLocalDescription start', desc, self._rtcId, self.__id,  self.closed);

                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self._onSetLocalSessionDescriptionSuccess.bind(self),
                    self._onSetSessionDescriptionError.bind(self)
                ).then(function () {
                    if(emedia.supportPRAnswer){
                        var sdpSection = new SDPSection(desc.sdp);

                        sdpSection.updateHeaderMsidSemantic("MS_0000");
                        sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                        sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                        desc.sdp = sdpSection.getUpdatedSDP();
                    }

                    _logger.debug('Send Answer ', self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                    self.cctx && (desc.cctx = self.cctx);
                    (onCreateAnswerSuccess || self.onCreateAnswerSuccess.bind(self))(desc);
                });
            },
            (onCreateAnswerError || self._onCreateSessionDescriptionError.bind(self))
        );
    },

    close: function (remainLocalStream, onlyPeerConnectionClosed) {
        var self = this;
        _logger.warn("webrtc closing",  self._rtcId, self.__id, self.closed);

        if(self.closed){
            return;
        }

        onlyPeerConnectionClosed = (onlyPeerConnectionClosed === true);

        self.closed = true;

        try {
            self._rtcPeerConnection && self._rtcPeerConnection.close();
        } catch (e) {
            _logger.warn(e);
        } finally {
            if (self._remoteStream) {
                emedia.stopTracks(self._remoteStream);
            }
            self._remoteStream = null;

            if(!onlyPeerConnectionClosed){
                self.onClose && self.onClose();
            }

            _logger.warn("webrtc closed. closed:", self._rtcId, self.__id, self.closed);
        }
    },

    addIceCandidate: function (candidate) {
        var self = this;

        if (!self._rtcPeerConnection) {
            return;
        }

        _logger.debug('Add ICE candidate: ', candidate, self._rtcId, self.__id,  self.closed);

        var _cands = _util.isArray(candidate) ? candidate : [];
        !_util.isArray(candidate) && _cands.push(candidate);

        if(!self.__setRemoteSDP){
            Array.prototype.push.apply((self.__tmpRemoteCands || (self.__tmpRemoteCands = {})), _cands);

            _logger.debug('Add ICE candidate but tmp buffer caused by not set remote sdp: ', candidate, self._rtcId, self.__id,  self.closed);
            return;
        }

        for (var i = 0; i < _cands.length; i++) {
            candidate = _cands[i];

            if(candidate.cctx && candidate.cctx != self.cctx){
                _logger.warn('addIceCandidate fail drop. cctx not equal. ', candidate, self._rtcId, self.__id,  self.closed);
                continue;
            }

            //candidate.candidate = candidate.candidate.replace("172.17.2.130", "10.121.63.1");
            if(self.fireFoxOfferVideoPreAudio === true){
                //candidate.sdpMid = "sdparta_0";
                var oldLineIndex = candidate.sdpMLineIndex;
                candidate.sdpMLineIndex = parseInt(candidate.sdpMid.replace(/[^0-9]*/, ''));
                _logger.warn("Firefox sdp section video pre audio, sdp mline index update ", oldLineIndex, "->", candidate.sdpMLineIndex);
            }

            if(candidate.candidate && candidate.candidate !== ""){
                self._rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(
                    self.onAddIceCandidateSuccess.bind(self),
                    self._onAddIceCandidateError.bind(self)
                );
            }else{
                _logger.warn("Add ICE candidate fail. drop it ", candidate, self._rtcId, self.__id,  self.closed);
            }
        }
    },

    setRemoteDescription: function (desc) {
        var self = this;

        _logger.debug('setRemoteDescription start. ', self._rtcId, self.__id,  self.closed);

        // 生成offer的
        // 会议模式，也是设置的是 pranswer 和 answer 会有服务器传回。
        // p2p模式下的主叫。此时设置的是 pranswer 和 answer。这个应该有p2p模式下传回。因此，需要如果有的话，需要判断
        if(self.offerDescription){
            if(desc.cctx && desc.cctx != self.cctx){
                _logger.warn('setRemoteDescription fail drop. cctx not equal. ', desc, self._rtcId, self.__id,  self.closed);
                return;
            }

            if(self.fireFoxOfferVideoPreAudio === true){
                //_logger.debug("Remote sdp.1", desc.sdp);

                var sdpSection = new SDPSection(desc.sdp, self);
                desc.sdp = sdpSection.getUpdatedSDP(false);
                _logger.info("Remote sdp.2. switch audio video", desc.sdp);
            }
        }else{//被叫 p2p模式，覆盖
            desc.cctx && (self.cctx = desc.cctx);
        }

        desc.sdp = desc.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF");
        _logger.warn('setRemoteDescription. UDP/TLS/RTP/SAVPF -> RTP/SAVPF; if firefox: switch audio video;', self._rtcId, self.__id);
        _logger.debug('setRemoteDescription.', desc, self._rtcId, self.__id);

        desc = self.__remoteDescription = new RTCSessionDescription(desc);

        return self._rtcPeerConnection.setRemoteDescription(desc).then(
            function() {
                self.__setRemoteSDP = true;
                self._onSetRemoteSuccess.apply(self, arguments);

                if(self.__tmpLocalCands && self.__tmpLocalCands.length > 0){
                    _logger.debug('After setRemoteDescription. send cands', self._rtcId, self.__id,  self.closed);
                    self._onIceCandidate(self.__tmpLocalCands);

                    self.__tmpLocalCands = [];
                }

                if(self.__tmpRemoteCands && self.__tmpRemoteCands.length > 0){
                    _logger.debug('After setRemoteDescription. add tmp cands', self._rtcId, self.__id,  self.closed);
                    self.addIceCandidate(self.__tmpRemoteCands);

                    self.__tmpRemoteCands = [];
                }
            },
            self._onSetSessionDescriptionError.bind(self)
        );
    },

    iceConnectionState: function () {
        var self = this;

        return self._rtcPeerConnection.iceConnectionState;
    },

    isConnected: function () {
        var self = this;

        var state = self._rtcPeerConnection.iceConnectionState;

        return "connected" === state || "completed" === state;
    },

    _onGotRemoteStream: function (event) {
        var self = this;

        _logger.debug('onGotRemoteStream.', self._rtcId, self.__id, event);
        this._remoteStream = event.stream || event.streams[0];
        this._remoteStream._rtcId = this._rtcId;
        this._remoteStream.__rtc_c_id = this.__id;

        self.updateRemoteBySubArgs();

        this.onGotRemoteStream(this._remoteStream, event);

        _logger.debug('received remote stream, you will see the other.', self._rtcId, self.__id,  this.closed);
    },

    _onSetRemoteSuccess: function () {
        _logger.info('onSetRemoteSuccess success', this._rtcId, this.__id);
        this.onSetRemoteSuccess.apply(this, arguments);

        if(this.offerDescription && this.__remoteDescription && this.__remoteDescription.sdp){
            this._onAnswerCodes(this.__remoteDescription.sdp);
        }
    },

    _onAnswerCodes: function (sdp) {
        var self = this;
        var section = new SDPSection(sdp, this);
        if(section.videoSection){
            var rtpParams = SDPUtils.parseRtpParameters(section.videoSection);

            if(!rtpParams.codecs || rtpParams.codecs.length === 0){
                _logger.info("not found any video codes. @ ", self._rtcId, self.__id);
                return;
            }

            var vcodes = [];
            _util.forEach(rtpParams.codecs, function (_i, _param) {
                vcodes.push(_param.name);
            });

            self.finalVCodeChoices = vcodes;

            self.onVCodeChoices && self.onVCodeChoices(vcodes);
        }
    },

    onSetRemoteSuccess: function () {
    },

    onAddIceCandidateSuccess: function () {
        _logger.debug('addIceCandidate success', this._rtcId, this.__id);
    },

    _onAddIceCandidateError: function (error) {
        _logger.error('failed to add ICE Candidate: ' + error.toString(), this._rtcId, this.__id);
        this.onAddIceCandidateError(error);
    },
    onAddIceCandidateError: function (error) {
    },

    _onIceCandidate: function (candidate) {
        _logger.debug('onIceCandidate:', candidate, this._rtcId, this.__id);
        this.onIceCandidate(candidate);
    },
    onIceCandidate: function (candidate) {
    },

    onIceStateChange: function (state) {
        _logger.debug('onIceStateChange : ICE state ', state);
    },

    _onCreateSessionDescriptionError: function (error) {
        _logger.error('Failed to create session description: ' + error.toString(), this._rtcId, this.__id);
        this.onCreateSessionDescriptionError(error);
    },
    onCreateSessionDescriptionError: function (error) {
    },

    onCreateOfferSuccess: function (desc) {
        _logger.debug('create offer success', this._rtcId, this.__id);
    },

    onCreatePRAnswerSuccess: function (desc) {
        _logger.debug('create answer success', this._rtcId, this.__id);
    },

    onCreateAnswerSuccess: function (desc) {
        _logger.debug('create answer success', this._rtcId, this.__id);
    },

    _onSetSessionDescriptionError: function (error) {
        _logger.error('onSetSessionDescriptionError : Failed to set session description: ' + error.toString(), this._rtcId, this.__id);
        this.onSetSessionDescriptionError(error);
    },
    onSetSessionDescriptionError: function (error) {
    },
    _onSetLocalSessionDescriptionSuccess: function () {
        _logger.debug('onSetLocalSessionDescriptionSuccess : setLocalDescription complete', this._rtcId, this.__id);
        this.onSetLocalSessionDescriptionSuccess();

        if(this.__answerDescription && this.__answerDescription.sdp){
            this._onAnswerCodes(this.__answerDescription.sdp);
        }
    },
    onSetLocalSessionDescriptionSuccess: function () {

    },

    onGotRemoteStream: function(remoteStream){
        _logger.debug("Got remote stream. ", remoteStream, this._rtcId, this.__id);
    }
});

module.exports = _WebRTC;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /* eslint-env node */


// SDP helpers.
var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function() {
  return Math.random().toString(36).substr(2, 10);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function(blob) {
  return blob.trim().split('\n').map(function(line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function(blob) {
  var parts = blob.split('\nm=');
  return parts.map(function(part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// returns the session description.
SDPUtils.getDescription = function(blob) {
  var sections = SDPUtils.splitSections(blob);
  return sections && sections[0];
};

// returns the individual media sections.
SDPUtils.getMediaSections = function(blob) {
  var sections = SDPUtils.splitSections(blob);
  sections.shift();
  return sections;
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function(blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function(line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function(line) {
  var parts;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: parseInt(parts[1], 10),
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compability.
        candidate.usernameFragment = parts[i + 1];
        break;
      default: // extension handling, in particular ufrag
        candidate[parts[i]] = parts[i + 1];
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function(candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.ip);
  sdp.push(candidate.port);

  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress &&
      candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress);
    sdp.push('rport');
    sdp.push(candidate.relatedPort);
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  if (candidate.usernameFragment || candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.usernameFragment || candidate.ufrag);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function(line) {
  return line.substr(14).split(' ');
}

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function(line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');

  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  // legacy alias, got renamed back to channels in ORTC.
  parsed.numChannels = parsed.channels;
  return parsed;
};

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function(codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  var channels = codec.channels || codec.numChannels || 1;
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
      (channels !== 1 ? '/' + channels : '') + '\r\n';
};

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function(line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1]
  };
};

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function(headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
      (headerExtension.direction && headerExtension.direction !== 'sendrecv'
          ? '/' + headerExtension.direction
          : '') +
      ' ' + headerExtension.uri + '\r\n';
};

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function(line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function(codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function(param) {
      if (codec.parameters[param]) {
        params.push(param + '=' + codec.parameters[param]);
      } else {
        params.push(param);
      }
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function(line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function(codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function(fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
          '\r\n';
    });
  }
  return lines;
};

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function(line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }
  return parts;
};

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function(mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
  if (mid) {
    return mid.substr(6);
  }
}

SDPUtils.parseFingerprint = function(line) {
  var parts = line.substr(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
    value: parts[1]
  };
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=fingerprint:');
  // Note: a=setup line is ignored since we use the 'auto' role.
  // Note2: 'algorithm' is not case sensitive except in Edge.
  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function(params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function(fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection);
  // Search in session part, too.
  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var iceParameters = {
    usernameFragment: lines.filter(function(line) {
      return line.indexOf('a=ice-ufrag:') === 0;
    })[0].substr(12),
    password: lines.filter(function(line) {
      return line.indexOf('a=ice-pwd:') === 0;
    })[0].substr(10)
  };
  return iceParameters;
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function(params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
      'a=ice-pwd:' + params.password + '\r\n';
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function(mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(
        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(
          mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(
          mediaSection, 'a=rtcp-fb:' + pt + ' ')
        .map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default: // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function(kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function(codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';

  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function(codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function(codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });
  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }
  sdp += 'a=rtcp-mux\r\n';

  if (caps.headerExtensions) {
    caps.headerExtensions.forEach(function(extension) {
      sdp += SDPUtils.writeExtmap(extension);
    });
  }
  // FIXME: write fecMechanisms.
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;

  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
  .map(function(line) {
    var parts = line.substr(17).split(' ');
    return parts.map(function(part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function(codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10),
      };
      if (primarySsrc && secondarySsrc) {
        encParam.rtx = {ssrc: secondarySsrc};
      }
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: secondarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
          - (50 * 40 * 8);
    } else {
      bandwidth = undefined;
    }
    encodingParameters.forEach(function(params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function(mediaSection) {
  var rtcpParameters = {};

  var cname;
  // Gets the first SSRC. Note that with RTX there might be multiple
  // SSRCs.
  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
      .map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
      })
      .filter(function(obj) {
        return obj.attribute === 'cname';
      })[0];
  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  }

  // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize
  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0;

  // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.
  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;

  return rtcpParameters;
};

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function(mediaSection) {
  var parts;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
  if (spec.length === 1) {
    parts = spec[0].substr(7).split(' ');
    return {stream: parts[0], track: parts[1]};
  }
  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'msid';
  });
  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return {stream: parts[0], track: parts[1]};
  }
};

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function() {
  return Math.random().toString().substr(2, 21);
};

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
SDPUtils.writeSessionBoilerplate = function(sessId, sessVer) {
  var sessionId;
  var version = sessVer !== undefined ? sessVer : 2;
  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' +
      'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' +
      's=-\r\n' +
      't=0 0\r\n';
};

SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(
      transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(
      transceiver.dtlsTransport.getLocalParameters(),
      type === 'offer' ? 'actpass' : 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' +
        transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' ' + msid;
      sdp += 'a=ssrc-group:FID ' +
          transceiver.sendEncodingParameters[0].ssrc + ' ' +
          transceiver.sendEncodingParameters[0].rtx.ssrc +
          '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
      ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function(mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);
      default:
        // FIXME: What should happen here?
    }
  }
  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};

SDPUtils.getKind = function(mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substr(2);
};

SDPUtils.isRejected = function(mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};

SDPUtils.parseMLine = function(mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var parts = lines[0].substr(2).split(' ');
  return {
    kind: parts[0],
    port: parseInt(parts[1], 10),
    protocol: parts[2],
    fmt: parts.slice(3).join(' ')
  };
};

SDPUtils.parseOLine = function(mediaSection) {
  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
  var parts = line.substr(2).split(' ');
  return {
    username: parts[0],
    sessionId: parts[1],
    sessionVersion: parseInt(parts[2], 10),
    netType: parts[3],
    addressType: parts[4],
    address: parts[5],
  };
}

// Expose public methods.
if (true) {
  module.exports = SDPUtils;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);

var SoundMeter = __webpack_require__(17);

/**
 * {
 *  _located:
 *  _webrtc:
 *
 *  id:
 *  memId:
 *  name:
 *  voff:
 *  aoff:
 *  type: 0 1
 *  ext:
 *  owner: {
 *    id:
 *    nickName:
 *    name:
 *    ext:
 *  }
 *
 *  _localMediaStream:
 * }
 *
 *
 *
 */

emedia.subscribed = function (stream) {
    if(stream._located){
        return true;
    }

    if(stream.type === 2){
        return !!(!stream._located && stream._webrtc);
    }

    return (stream._webrtc !== undefined);
};


var MediaSoundMeter = _util.prototypeExtend({
    voff: 0,
    aoff: 0,

    __init__: function () {
        var self = this;

        if(!self._mediaStream){
            throw "_mediaStream empty";
        }

        if(!self.hasEnabledTracks(self._mediaStream)){
            return;
        }

        if(!self.__audioContext){
            throw "require audioContext";
        }

        self.__soundMeter = new SoundMeter(self.__audioContext);

        self.__soundMeter.connectToSource(self._mediaStream, function(e) {
            if (e) {
                throw e;
            }
            self.__worked = self.__soundMeter.__worked = true;
        });
    },

    hasEnabledTracks: function (mediaStream) {
        return emedia.hasEnabledTracks(mediaStream);
    },

    getSoundMeters: function () {
        var self = this;

        if(!self.__soundMeter || !self.__worked){
            return;
        }

        if(!self._mediaStream.active){
            self.__worked && self._finally();
            return;
        }

        if(!self.hasEnabledTracks(self._mediaStream)){
            return;
        }

        return {
            instant: self.__soundMeter.instant,
            slow: self.__soundMeter.slow,
            clip: self.__soundMeter.clip
        }
    },

    _finally: function () {
        var self = this;

        if(self.__soundMeter){
            self.__soundMeter.stop();
            self.__worked = self.__soundMeter.__worked = false;
        }
    }
});

module.exports = _util.prototypeExtend({ //type 0 AVpub 1 Desktop 2 Sub
    Update: _util.prototypeExtend({

        ifAoff: function (update) {
            this.if("aoff", update);
        },

        ifVoff: function (update) {
            this.if("voff", update);
        },

        ifMediaStream: function (update) {
            this.if("mediaStream", update);
        },
        
        if: function (key, update) {
            if(typeof this[key] === "undefined"){
                return;
            }

            update(this[key]);
        }
    }),


    located: function () {
        return this._located || false;
    },

    webrtc: function (webrtc) {
        webrtc && (this._webrtc = webrtc);
        return this;
    },

    getMediaStream: function () {
        if(typeof this.mediaStream !== "undefined"){
            return this.mediaStream;
        }

        // if(this.type === 2 && this._webrtc && this._webrtc.getRemoteStream()){
        //     return this._webrtc.getRemoteStream();
        // }

        if(this._located){
            return this._localMediaStream;
        }

        return (this._webrtc && (this._webrtc.getRemoteStream() || this._webrtc.getLocalStream()));
    },

    requestFrame: function (){
        this._localMediaStream && this._localMediaStream.getVideoTracks().forEach(function(track) {
            typeof track.requestFrame === "function" && track.requestFrame();
        });
    },

    getLocalMediaStream: function () {
        return this._localMediaStream;
    },

    getRemoteMediaStream: function () {
        if(this._webrtc && (typeof this._webrtc.getRemoteStream() !== "undefined")){
            return this._webrtc.getRemoteStream();
        }
    },

    mutedNeed: function () {
        return this.mutedMuted || false;
    },

    ifMediaStream: function (update) {
        if(typeof this.mediaStream !== "undefined"){
            update(this.mediaStream);
            return;
        }

        // if(this.type === 2 && this._webrtc && this._webrtc.getRemoteStream() !== "undefined"){
        //     update(this._webrtc.getRemoteStream());
        //     return;
        // }

        if(this._located && (typeof this._localMediaStream !== "undefined")){
            update(this._localMediaStream);
            return;
        }

        if(!this._located && this._webrtc && (typeof this._webrtc.getRemoteStream() !== "undefined")){
            update(this._webrtc.getRemoteStream());
            return;
        }
    },

    subscribed: function () {
        return emedia.subscribed(this);
    },

    getHtmlDOMID: function () {
        return "_m_" + this.owner.id + "_s_" + this.id;
    },

    MediaSoundMeter: MediaSoundMeter,

    StreamSoundMeter: _util.prototypeExtend({
        __init__: function () {
            var self = this;

            if(!self._stream || (typeof self._stream.getMediaStream !== 'function')){
                throw "_stream empty or not found method getMediaStream";
            }

            self._streamId = self._stream.id;
            self._streamCreateId = self._stream.__create_id;
            self._mediaStream = self._mediaStream;

            if(self._stream.type === 2 && !self._stream.located() && !self._webrtc){
                throw "require webrtc. when type = 2 and not located";
            }

            self.__mediaSoundMeter = (self.__mediaSoundMeter || new MediaSoundMeter({
                __audioContext: self.__audioContext,
                _mediaStream: self._mediaStream
            }));
            self.__mediaSoundMeter.useCount = (self.__mediaSoundMeter.useCount || 0) + 1;
        },

        onSoundMeters: function (callback) {
            var self = this;

            var emptyResult = {
                instant: 0,
                slow: 0,
                clip: 0
            };

            if(self._stream.aoff){
                self._finally();
                callback(emptyResult);
                return emptyResult;
            }

            if(self._stream.type !== 2
                && self._stream.subArgs
                && self._stream.subArgs.subSAudio !== undefined
                && !self._stream.subArgs.subSAudio){
                self._finally();
                callback(emptyResult);
                return emptyResult;
            }

            if(self._stream.type === 2 && !self._stream.located() && (!self._stream.subArgs || !self._stream.subArgs.subSAudio)){
                var receivers = self._webrtc.getReceiversOfPeerConnection();

                if(!receivers || receivers.length === 0){
                    callback(emptyResult);
                    return emptyResult;
                }

                var audioReceiver;
                for(var i in receivers){
                    if(receivers[i].track.kind === 'audio'){
                        audioReceiver = receivers[i];
                    }
                }

                if(!audioReceiver){
                    callback(emptyResult);
                    return emptyResult;
                }

                if(typeof audioReceiver.getContributingSources === 'function') {
                    var rtpContributingSources = audioReceiver.getContributingSources();
                    if(emedia.config._printSoundData){
                        _util.logger.debug(self._stream.id, self._stream.csrc, "rtpContributingSources ", rtpContributingSources)
                    }

                    if (!rtpContributingSources || rtpContributingSources.length === 0) {
                        callback(emptyResult);
                        return emptyResult;
                    }

                    var source;
                    for (var i in rtpContributingSources) {
                        if (rtpContributingSources[i].source == self._stream.csrc) {
                            source = self._stream.csrc;
                        }
                    }

                    if(emedia.config._printSoundData){
                        _util.logger.debug(self._stream.id, self._stream.csrc, "source ", source)
                    }

                    if (source === undefined) {
                        callback(emptyResult);
                        return emptyResult;
                    }
                }
            }

            var _meter = self.__mediaSoundMeter.getSoundMeters() || emptyResult;

            var webrtc = (self._stream.type === 2) ? self._webrtc : self._stream._webrtc;
            if((emedia.meterWithTrackAudioLevel || _meter.instant === 0)
                && webrtc
                && !webrtc.closed
                && webrtc._rtcPeerConnection){
                webrtc._rtcPeerConnection.getStats().then(function(stats) {
                    if(stats.size > 0){
                        stats.forEach(function(res) {
                            if(res.type === "track" && (res.kind === "audio" || res.trackIdentifier === "audio")){
                                _meter.trackAudioLevel = res.audioLevel;
                                //_meter.trackTotalAudioEnergy = 0;
                                _meter.trackTotalAudioEnergy = res.totalAudioEnergy;
                                callback(_meter);
                            }
                        });
                    }
                });
            }

            callback(_meter);
        },
        
        _finally: function () {
            var self = this;

            if(self._stream.type === 2 && self._stream.located() && self._remoteMediaSoundMeters){
                 self._remoteMediaSoundMeters._finally();
            }

            self.__mediaSoundMeter.useCount--;

            if(self.__mediaSoundMeter.useCount === 0){
                self.__mediaSoundMeter._finally();
            }
        }
    })
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */



// Meter class that generates a number correlated to audio volume.
// The meter class itself displays nothing, but it makes the
// instantaneous and time-decaying volumes available for inspection.
// It also reports on the fraction of samples that were at or near
// the top of the measurement range.
function SoundMeter(context) {
  this.context = context;
  this.instant = 0.0;
  this.slow = 0.0;
  this.clip = 0.0;
  this.script = context.createScriptProcessor(2048, 1, 1);
  var that = this;
  this.script.onaudioprocess = function(event) {
    var input = event.inputBuffer.getChannelData(0);
    var i;
    var sum = 0.0;
    var clipcount = 0;
    for (i = 0; i < input.length; ++i) {
      sum += input[i] * input[i];
      if (Math.abs(input[i]) > 0.99) {
        clipcount += 1;
      }
    }
    that.instant = Math.sqrt(sum / input.length);
    that.slow = 0.95 * that.slow + 0.05 * that.instant;
    that.clip = clipcount / input.length;
  };
}

SoundMeter.prototype.connectToSource = function(stream, callback) {
  console.log('SoundMeter connecting');
  try {
    this.mic = this.context.createMediaStreamSource(stream);
    this.mic.connect(this.script);
    // necessary to make sample run, but should not be.
    this.script.connect(this.context.destination);
    if (typeof callback !== 'undefined') {
      callback(null);
    }
  } catch (e) {
    console.error(e);
    if (typeof callback !== 'undefined') {
      callback(e);
    }
  }
};
SoundMeter.prototype.stop = function() {
  this.mic.disconnect();
  this.script.disconnect();
};


module.exports = SoundMeter;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Handler");

var __event = __webpack_require__(11);


/**
 * Error({
 *   code:
 *   targetObj:
 *   evtObj:
 * })
 *
 *
 *
 *
 */
var Handler = _util.prototypeExtend({
    onEvent: function(evt){
        var self = this;

        evt && _logger.info("[EVT]", evt.message(), evt.hidden || "");

        if(evt instanceof __event.ServerRefuseEnter){
            evt.failed && evt.failed === -95270 && (evt.failed = -9527);
        }

        function afterNotify() {
            try{
                self.handleEvent(evt);
            }catch(e){
                _logger.warn(e);
            }
        }

        if(evt instanceof emedia.event.StreamState && evt.stream && evt.stream.located()){
            afterNotify();
            return;
        }

        try{
            evt.hidden || (self.onNotifyEvent && self.onNotifyEvent(evt));
        } finally {
            afterNotify();
        }
    },

    handleEvent: function (evt) {
        var self = this;

        if(evt instanceof __event.RecvResponse){
            self._onRecvResponse(evt);
        } else if(evt instanceof __event.ServerRefuseEnter){
            _logger.warn("Server refuse, ", evt.failed, evt.msg);
            self.onServerRefuseEnter(evt);
        } else if(evt instanceof __event.EnterFail){
            _logger.warn("Enter fail, result = ", evt.failed);
            self.onEnterFail();
        } else if(evt instanceof __event.WSClose){
            //_logger.warn("Websocket closed");
            self.onWSClose();
        } else if(evt instanceof __event.WSConnected){
            _logger.warn("Websocket connected");
        } else if(evt instanceof __event.ICEConnected){
            var webrtc = evt.webrtc;
            self.onICEConnected(webrtc);
        } else if(evt instanceof __event.ICEConnectFail){
            var webrtc = evt.webrtc;
            self.onICEConnectFail(webrtc);
        } else if(evt instanceof __event.ICEDisconnected){ //只要ICE断开
            var webrtc = evt.webrtc;
            self.onICEDisconnected(webrtc);
        }  else if(evt instanceof __event.ICEClosed){ //只要ICE断开
            var webrtc = evt.webrtc;
            self.onICEClosed(webrtc);
        } else if(evt instanceof __event.ICERemoteMediaStream) {
            self.onICERemoteMediaStream(evt.webrtc);
        } else if(evt instanceof __event.PushSuccess){
            self._cacheStreams[evt.stream.id] = self._linkedStreams[evt.stream.id] = evt.stream;

            var _stream = self.newStream(evt.stream);

            if(evt.hidden && !self._maybeNotExistStreams[evt.stream.id] && !_stream.isRepublished){
                self._onAddStream(_stream);
                return;
            }

            if(self.isSafari()){
                emedia._isSafariYetPushedStream = true;
            }

            try{
                //_stream && (_stream.mediaStream = _stream.getMediaStream());
                _stream && self.onUpdateStream(_stream,
                    new _stream.Update({voff: _stream.voff, aoff: _stream.aoff, mediaStream: _stream.getMediaStream()}));

                // _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
                //     if(_stream.type === 2){
                //         self.onStreamControl(undefined, _pubSId, _stream.voff, _stream._1_aoff);
                //     }
                // });
            } finally {
                if(self.isSafari()){
                    _util.forEach(self._cacheStreams, function (_sid, _stream) {
                        if(_stream._autoSubWhenPushStream === true){
                            _util.removeAttribute(_stream, "_autoSubWhenPushStream");
                            self.createWebrtcAndSubscribeStream(_stream.id);
                        }
                    });
                }
            }
        } else if(evt instanceof __event.SubSuccess){
            self._linkedStreams[evt.stream.id] = evt.stream;
            evt.stream._zoom = 1;
        } else if(evt instanceof __event.PushFail){
            if(evt.hidden !== true){
                var _removeStream = _util.removeAttribute(self._linkedStreams, evt.stream.id);
                _logger.warn("PushFail remove from _linkedStreams", evt.stream.id, _removeStream);

                if(_removeStream){
                    var _stream = self.newStream(evt.stream);
                    self.onRemoveStream(_stream);
                }
            }
        } else if(evt instanceof __event.SubFail){
            if(evt.hidden !== true){
                delete self._linkedStreams[evt.stream.id];
                _logger.warn("SubFail remove from _linkedStreams", evt.stream.id);

                var _stream = self.newStream(evt.stream);
                _stream.rtcId = undefined;
                _stream._webrtc = undefined;
                _stream.mediaStream = undefined;

                self.onUpdateStream(_stream, new _stream.Update(_stream));
            }
        } else if(evt instanceof __event.SubFailNotSupportVCodes){
            // Server发现 此订阅时 不支持视频视频编码。或者 推送流 打开视频时，并不是所有的订阅端 都支持此视频编码
            // Server保持这个channel，客户端自行处理

            var stream = evt.stream;

            _logger.warn("Rtc donot support pub VCodes. close. sub fail.", stream.rtcId, " -> ", stream.id);
            try{
                self.onNotSupportPublishVideoCodecs && self.onNotSupportPublishVideoCodecs(stream);
            }catch (e){
                _logger.warn(e);
            }

            // var streamId = stream.id;
            //
            // var webrtc = self._getWebrtc(streamId);
            // if(webrtc && webrtc.isConnected()){
            //     self.subscribeStream(webrtc._rtcId, streamId, undefined, {subSVideo: false, subSAudio: true});
            //     return;
            // }
        } else if(evt instanceof __event.EnterSuccess){
            self.onEnterSuccess();
        } else if(evt instanceof  __event.SwitchVCodes) {
            var stream = evt.stream;
            var useVCodes = evt.useVCodes;
            var webrtc = stream._webrtc;
            _logger.warn("Rtc switch VCodes. ", stream.id, useVCodes);

            if (!useVCodes || useVCodes.length == 0) {
                _logger.warn("Rtc switch VCodes. error! useVCodes is empty ", stream.id, useVCodes);
            }

            if(webrtc && webrtc.optimalVideoCodecs){
                if(typeof webrtc.optimalVideoCodecs === 'string'
                    && webrtc.optimalVideoCodecs == useVCodes[0]){
                    _logger.warn("Rtc switch VCodes. igrone . useVCodes == optimalVideoCodecs ", stream.id, webrtc._rtcId, useVCodes);
                    return;
                }
                if(_util.isArray(webrtc.optimalVideoCodecs)
                    && webrtc.optimalVideoCodecs.length > 0
                    && webrtc.optimalVideoCodecs[0] == useVCodes[0]){
                    _logger.warn("Rtc switch VCodes. igrone ddd . useVCodes == optimalVideoCodecs ", stream.id, webrtc._rtcId, useVCodes);
                    return;
                }
            }

            stream.optimalVideoCodecs = useVCodes;

            webrtc && self.closeWebrtc(webrtc.getRtcId(), true);
            setTimeout(function () {
                stream.iceRebuildCount = 1;
                self.iceRebuild(stream);
                _logger.warn("Rtc switch VCodes. iceRebuild end.", stream.id, useVCodes);
            }, 300);
        }
    },

    _onRecvResponse: function (evt) {
        var self = this;

        var request = evt.request;
        var response = evt.response;

        if(request && response
            && request.op !== 200
            && request.op !== 1002
            && response.result !== 0){

            _logger.warn("Server refuse. when request = ", request);

            var failed = evt.failed;
            switch (failed){
                case -9527:
                case -95270:
                    //self.close(4, -9527);
                    break;
                case -500:
                case -502:
                case -504:
                case -508:
                case -510:
                    self.close(4, failed);
                    break;
                case -506:
                    self.close(11, failed);
                    break;

                case -501:
                    self.close(11, failed);
                default: // -501 异常引起 忽略
            }
        }
    },

    onServerRefuseEnter: function (evt) {
        var self = this;

        var failed = evt.failed;
        switch (failed){
            case -9527:
            case -95270:
                self.close(4, -9527);
                break;
            case -500:
            case -502:
            case -504:
            case -508:
            case -510:
                self.close(4, failed);
                break;
            case -506:
                self.close(11, failed);
                break;
            default:
                self.close(2);
        }
    },

    onEnterFail: function () {
        var self = this;

        if(self.__getCopyInterval){
            clearInterval(self.__getCopyInterval);
        }
    },

    onEnterSuccess: function () {
        var self = this;

        setTimeout(function () {
            self._failIcesRebuild();
        }, 200);

        if(self.getCopyIntervalMillis && self.getCopyIntervalMillis > 0){
            _logger.warn("Run interval get copy. interval = ", self.getCopyIntervalMillis);

            if(self.__getCopyInterval){
                clearInterval(self.__getCopyInterval);
            }

            self.__getCopyInterval = setInterval(function () {
                if(self._session.connected()){
                    self._sysCopy.apply(self);
                }else{
                    _logger.warn("Warn! cannot get copy. cause offline.");

                    self.__getCopyInterval && clearInterval(self.__getCopyInterval);
                }
            }, self.getCopyIntervalMillis);
        }

        if(self.getMediaMeterIntervalMillis && self.getMediaMeterIntervalMillis > 0){
            self._intervalGetMediaMeters();
        }
    },

    _intervalGetMediaMeters: function () {
        var self = this;

        function _start() {
            self.__getMediaMetersIntervalFlag && emedia.cancelAnimationFrame(self.__getMediaMetersIntervalFlag);

            if(!self.getMediaMeterIntervalMillis){
                _logger.warn("Ontalking closed. please use getMediaMeterIntervalMillis");
                return;
            }
            self.__getMediaMetersIntervalFlag = emedia.requestAnimationFrame(function (time) {
                if(typeof emedia.AudioContext === 'function'){
                    self._flushMediaMetersByAudioContext.apply(self);
                }

                !(self.closed !== false) && _start();
            }, self.getMediaMeterIntervalMillis);
        }
        _start();
    },

    _flushMediaMetersByAudioContext: function () {
        var self = this;

        _util.forEach(self._cacheStreams, function (_sid, _stream){
            self._updateMetersOrNewOne.call(self, _sid, _stream);
        });

        var delStreamSoundMeters = [];
        _util.forEach(self._mediaMeters, function (_sid, streamSoundMeter){
            var _stream = self._cacheStreams[_sid];
            _stream && self._updateMetersOrNewOne.call(self, _sid, _stream);
            _stream || delStreamSoundMeters.push(_sid);
        });

        _util.forEach(delStreamSoundMeters, function (index, _sid) {
            _util.removeAttribute(self._mediaMeters, _sid);
        })
    },

    _updateMetersOrNewOne: function (_sid, _stream) {
        var self = this;

        var metersData;

        var streamSoundMeter = self._mediaMeters[_sid];

        if(_stream.type === 2 && !_stream.located() && (!_stream.subArgs || !_stream.subArgs.subSAudio)) {
            var pubAudioMixersStream = self._oneAudioMixers();
            if (!pubAudioMixersStream) {
                streamSoundMeter && streamSoundMeter._finally();
                _util.removeAttribute(self._mediaMeters, _sid);
                self._onSoundChanage.call(self, _stream.owner, _stream);

                return;
            }
        }

        if(streamSoundMeter
            && streamSoundMeter._streamCreateId === _stream.__create_id
            && streamSoundMeter.__mediaSoundMeter.__worked){

            streamSoundMeter.onSoundMeters(function (metersData) {
                self._onSoundChanage.call(self, _stream.owner, _stream, metersData);
            });

            return streamSoundMeter;
        }

        if((streamSoundMeter && (streamSoundMeter._streamCreateId !== _stream.__create_id || streamSoundMeter.__mediaSoundMeter.__worked))){
            streamSoundMeter && streamSoundMeter._finally();
            _util.removeAttribute(self._mediaMeters, _sid);
            self._onSoundChanage.call(self, _stream.owner, _stream);
        }

        if(_stream.aoff){
            return;
        }

        streamSoundMeter = self._newMediaMeters(_stream);
        if(streamSoundMeter){
            self._mediaMeters[_sid] && (self._mediaMeters[_sid]._finally());
            self._mediaMeters[_sid] = streamSoundMeter;
        }

        return streamSoundMeter;
    },

    _newAudioContext: function () {
        var self = this;

        if(!emedia.__usingWebAudio){
            return;
        }

        return emedia.__audioContext;
    },

    _newMediaMeters: function (_stream) {
        var self = this;

        var mediaStream;
        if(_stream.type === 2
            && _stream.subArgs
            && _stream.subArgs.subSAudio
            && _stream._webrtc
            && _stream._webrtc.getRemoteStream()){
            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _mediaStream: _stream._webrtc.getRemoteStream(),
                _webrtc: _stream._webrtc,
                __audioContext: self._newAudioContext()
            });

            return soundMeter;
        }

        if(_stream.type === 2 && _stream.located()){
            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _mediaStream: _stream._localMediaStream,
                __audioContext: self._newAudioContext()
            });

            return soundMeter;
        }

        if(_stream.type === 2 && !_stream.located()){
            var pubAudioMixersStream = self._oneAudioMixers();
            if(!pubAudioMixersStream || !pubAudioMixersStream._webrtc || pubAudioMixersStream._webrtc.closed){
                return;
            }

            if(pubAudioMixersStream
                && (pubAudioMixersStream._remoteMediaSoundMeters === undefined || !pubAudioMixersStream._remoteMediaSoundMeters.__worked)
                && pubAudioMixersStream._webrtc
                && pubAudioMixersStream._webrtc.getRemoteStream()){
                pubAudioMixersStream._remoteMediaSoundMeters = new pubAudioMixersStream.MediaSoundMeter({
                    _mediaStream: pubAudioMixersStream._webrtc.getRemoteStream(),
                    __audioContext: self._newAudioContext()
                });
            }

            if(!pubAudioMixersStream._remoteMediaSoundMeters){
                return;
            }

            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _webrtc: pubAudioMixersStream._webrtc,
                __mediaSoundMeter: pubAudioMixersStream._remoteMediaSoundMeters
            });

            return soundMeter;
        }

        if(!_stream.aoff && (mediaStream = _stream.getMediaStream())){
            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _mediaStream: mediaStream,
                __audioContext: self._newAudioContext()
            });

            return soundMeter;
        }
    },

    _oneAudioMixers: function () {
        var self = this;

        for(var sid in self.audioMixers) {
            var stream = self.audioMixers[sid];
            if(stream.located()){
                return stream;
            }
        }
    },

    onWSClose: function () {
        var self = this;
        if(self.__getCopyInterval){
            clearInterval(self.__getCopyInterval);
        }

        _logger.info("Websocket closed.");
    },

    onICEDisconnected: function (webrtc) {
        var self = this;

        self.__networkWeakInterval && clearTimeout(self.__networkWeakInterval);
        self.__networkWeakInterval = setTimeout(function () {
            self.onNetworkWeak && self.onNetworkWeak();
        }, 1000);

        _util.forEach(self._linkedStreams, function (sid, stream) {
            if(stream.rtcId == webrtc.getRtcId()){
                var problemStream;
                if(!(problemStream = self._maybeNotExistStreams[sid])){
                    problemStream = self._maybeNotExistStreams[sid] = _util.extend({}, stream);
                    problemStream.iceRebuildCount = 1;
                }

                _logger.info("Stream maybe not exist. caused by disconnected", stream.id);
            }
        });
    },

    onICEConnectFail: function (webrtc) {
        var self = this;

        for(var sid in self._linkedStreams){
            var stream = self._linkedStreams[sid];
            if(stream.rtcId == webrtc.getRtcId()){
                if(stream._webrtc && stream._webrtc.__id !== webrtc.__id){
                    _logger.warn("Stream use other webrtc rtcId = ", stream.rtcId, ", id: ", stream._webrtc.__id, webrtc.__id);
                    continue;
                }

                var problemStream;
                if(!(problemStream = self._maybeNotExistStreams[sid])){
                    problemStream = self._maybeNotExistStreams[sid] = _util.extend({}, stream);
                    problemStream.iceRebuildCount = 1;
                }

                if(problemStream){
                    var _evt = new __event.StreamState({stream: problemStream});
                    _evt.iceFail();

                    self.onEvent(_evt);
                }

                _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " problem stream is ", problemStream.iceRebuildCount, problemStream.id);

                if(problemStream.iceRebuildCount > emedia.config.iceRebuildCount){
                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " rebuild fail. problem stream is ", problemStream.id);

                    if(problemStream.located()){
                        self.onEvent(new __event.PushFail({
                            stream: stream,
                            cause: "pub ice rebuild failed."
                        }));
                    }else{
                        self.onEvent(new __event.SubFail({
                            stream: stream,
                            cause: "sub ice rebuild failed."
                        }));
                    }
                    self.closeWebrtc(webrtc.getRtcId(), false);
                }else{
                    var recording = self._records[problemStream.id];

                    if(problemStream._localMediaStream){
                        _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuild. remain local stream. ", problemStream.id);
                    }else{
                        _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuild.", problemStream.id);
                    }

                    self.closeWebrtc(webrtc.getRtcId(), true);

                    if(recording){
                        self._records[problemStream.id] = recording;
                    }

                    (function (problemStream) {
                        setTimeout(function () {
                            self.iceRebuild(problemStream);
                        }, emedia.config.iceRebuildIntervalMillis);
                    })(problemStream);

                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuilding. problem stream is ", problemStream.id);
                }

                if(stream.type === 2){
                    _util.removeAttribute(self.audioMixers, stream.id);
                }
            }
        }
    },

    onICEClosed: function (webrtc) {
        var self = this;

        if(webrtc.closed){
            _logger.warn("Webrtc will be removed. by __id = ", webrtc.__id, ", rtcId = ", webrtc.getRtcId());
            var removedWebrtc = _util.removeAttribute(self._ices, webrtc.__id);
            if(removedWebrtc){
                _logger.warn("Webrtc removed. by id = ", removedWebrtc.__id, ", rtcId = ", removedWebrtc.getRtcId());
            }else{
                _logger.warn("Webrtc removed. by id = ", webrtc.__id, ", rtcId = ", webrtc.getRtcId());
            }

            var webrtc22 = self._ices[webrtc.getRtcId()];
            if(webrtc22 && webrtc22.__id === removedWebrtc.__id){
                removedWebrtc = _util.removeAttribute(self._ices, webrtc.getRtcId());
                _logger.warn("Webrtc removed. by rtcId = ", removedWebrtc.getRtcId(), ", __id = ", removedWebrtc.__id);
            }
        }else{
            _logger.info("ICE self closed. not allow. will rebuild", webrtc.getRtcId());
            self.onICEConnectFail(webrtc);
        }
    },

    onICEConnected: function (webrtc) {
        var self = this;

        _util.forEach(self._cacheStreams, function (sid, stream) {
            if(stream.rtcId == webrtc.getRtcId()){
                stream.finalVCodeChoices = webrtc.finalVCodeChoices;

                if(self._maybeNotExistStreams[sid]){
                    _util.removeAttribute(self._maybeNotExistStreams, stream.id);
                    self._linkedStreams[sid] = stream;

                    _logger.info("ice reconnected. webrtc = ", webrtc.getRtcId(), "will update stream = ", stream.id);
                    //stream.located() && self.onUpdateStream(self._linkedStreams[stream.id]);
                    //self.onUpdateStream(self._linkedStreams[stream.id]);

                    var _recordStream = self._records[stream.id];
                    if(_recordStream && _recordStream.rtcId !== stream.rtcId){ //在重连后，恢复录制
                        //self.stopRecord(_recordStream);
                        self.startRecord(stream);
                        _logger.warn("Re record. for ", stream.id, ", after rebuild ice.", _recordStream.rtcId, "->", stream.rtcId);
                    }
                } else {
                    _logger.info("ice connected. webrtc = ", webrtc.getRtcId(), stream.id);

                    stream.located() && self.onEvent(new __event.PushSuccess({stream: stream}));
                    stream.located() || self.onEvent(new __event.SubSuccess({stream: stream}));
                }

                if(stream.type === 2){
                    self.audioMixers[stream.id] = stream;
                }
            }
        });
    },

    onICERemoteMediaStream: function (webrtc) {
        var self = this;

        var streams = [];
        _util.forEach(self._cacheStreams, function (sid, _stream) {
            if (_stream.rtcId == webrtc.getRtcId() && (!_stream.located() || _stream.type === 2)) {
                var mediaStream = webrtc.getRemoteStream();
                self._updateRemoteStream(_stream, mediaStream);

                if(_stream.onGotRemoteMediaStream){
                    _stream.onGotRemoteMediaStream.call(_stream, mediaStream);
                }else{
                    var _stream = self.newStream(_stream);
                    _stream.mediaStream = webrtc.getRemoteStream();

                    self.onUpdateStream(_stream, new _stream.Update({mediaStream: _stream.mediaStream}));
                }
            }
        });
    },

    _failIcesRebuild: function () {
        var self = this;

        var count = 1;
        _util.forEach(self._maybeNotExistStreams, function (streamId, stream) {
            setTimeout(function () {
                self.iceRebuild(stream);
            }, count * 100);
        });
    },

    iceRebuild: function (stream) {
        var self = this;

        if(!self.connected()){
            stream.iceRebuildCount = 1;
            _logger.warn("Websocket disconnect. waiting. rebuild count reset", stream.iceRebuildCount, stream.id);
            return;
        }
        if(!self._linkedStreams[stream.id] || !self._cacheStreams[stream.id]){
            _logger.info("ice rebuild fail. it yet closed. stream is ", stream.id, stream.rtcId);
            _util.removeAttribute(self._maybeNotExistStreams, stream.id);
            _util.removeAttribute(self._linkedStreams, stream.id);
            _logger.warn("iceRebuild, remvoe from _linkedStreams", stream.id);

            return;
        }

        if(stream.iceRebuildCount > emedia.config.iceRebuildCount){
            _logger.info("ice rebuild fail. count too many. stream is ", stream.id);

            if(stream.located()){
                self.onEvent(new __event.PushFail({
                    stream: stream,
                    cause: "pub ice rebuild failed."
                }));
            }else{
                self.onEvent(new __event.SubFail({
                    stream: stream,
                    cause: "sub ice rebuild failed."
                }));
            }
        } else if(self.connected()){
            _logger.info("ice try rebuild. count", stream.iceRebuildCount, ". stream is ", stream.id);
            self.rebuildIce(stream);

            stream.iceRebuildCount ++;
        } else {
            _logger.warn("ice rebuild. stop. cause by not websocket disconnect", stream.id);
        }
    },

    rebuildIce: function (stream) {
        var self = this;

        if(!(self._cacheStreams[stream.id])){
            _logger.warn("Begin rebuild ice. not found stream at local", stream.iceRebuildCount, stream.id);
            return;
        }
        _logger.warn("Begin rebuild ice ", stream.iceRebuildCount, stream.id);

        if(stream.located()){
            stream.isRepublished = true;
            self.push(stream, undefined, undefined, true);
        }else{
            self.createWebrtcAndSubscribeStream(stream.id);
        }
        _logger.warn("Finish rebuild ice ", stream.iceRebuildCount, stream.id, self._cacheStreams[stream.id].rtcId);
    },

    _sysCopy: function () {
        var self = this;

        var copyMessage = self.newMessage()
            .setOp(1000)
            .setCver(self._cver || 0);

        self.postMessage(copyMessage, function (rsp) {
            if(rsp.result != 0){
                _logger.warn("Get copy fail. result = ", rsp.result);

                return;
            }

            if((self._cver || 0) < rsp.cver){
                self._cver = rsp.cver;

                self.onMembers(rsp.cver, rsp.mems || {});
                self.onStreams(rsp.cver, rsp.streams || {})

                _logger.info("Got copy success.");
            }
        });
    },
});

module.exports = Handler;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Desktop");

var __event = __webpack_require__(11);


window.__shareDesktopMessageCount__ = 0;

module.exports = _util.prototypeExtend({

    __RTC_PAGE_MSG_TYPE__: 'RTC-SD-PAGE',
    __RTC_EXT_MSG_TYPE__: 'RTC-SD-EXT',



    __init__: function () {
        var self = this;

        self.__extLoaded = self.rsdExtLoaded();
        if(self.__extLoaded){
            self.__onRsdExtLoad();
        }

        window.addEventListener("load", function(event) {
            if(self.__extLoaded){
                return;
            }

            var exist = self.rsdExtLoaded();
            // console.log('exist=', exist, ', ev4detect=', ev4detect);

            self.__extLoaded = exist;
        });

        window.addEventListener('message', function (event) {
            if(!event.data) {
                return;
            }

            var msg = event.data;
            if(!msg.type || msg.type !== self.__RTC_EXT_MSG_TYPE__ || !msg.evname) {
                return;
            }
            _logger.info('got ext-msg: ', msg);


            if(msg.evname === 'extLoaded'){
                if(!self.__extLoaded){
                    self.__extLoaded = true;

                    setTimeout(self.__onRsdExtLoad(), 50);
                }

                return;
            }

            self.__onMessage(msg);
        });
    },

    rsdExtLoaded: function(){
        var existele = document.getElementById('RTC-Share-Deskto-installed-ele-rat1abrr');
        return existele ? true : false;
    },

    __sendMessage: function(msg, callback){
        var self = this;

        var tsxId = 'tsx_' + (__shareDesktopMessageCount__++) + '_' +  Math.random().toString(36).substr(2,4);

        if(!self.__extLoaded){
            throw "Rtc share desktop not loaded";
        }

        msg.tsxId = tsxId;

        self["on_" + tsxId] = function () {
            callback && callback.apply(self, arguments);

            delete self["on_" + tsxId];
        }

        window.postMessage && window.postMessage(msg, '*');
    },

    __onMessage: function (msg) {
        var self = this;

        var tsxId = msg.tsxId;

        self["on_" + tsxId] && self["on_" + tsxId](msg);
        //self["on_" + tsxId] || _logger.info(msg);
    },

    __onRsdExtLoad: function () {
        var self = this;

        self.onExtLoaded && self.onExtLoaded();
    },

    openDesktopMedia: function (screenOptions, callback){
        var self = this;

        if(!self.__extLoaded || !self.rsdExtLoaded()){
            callback(new __event.ShareDesktopExtensionNotFound());
            return;
        }

        var msg = {type:self.__RTC_PAGE_MSG_TYPE__, evname: 'chooseDesktopMedia', screenOptions: screenOptions};
        self.__sendMessage(msg, function(m){
            if(m.evname === 'onAccessApproved' && m.streamId){
                callback(new __event.OpenDesktopMedia({desktopStreamId: m.streamId}));
            }else{
                callback(new __event.OpenDesktopMediaAccessDenied());
            }
        });
    }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("DefaultTrack");

var MouseTrack = __webpack_require__(21);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("MouseTrack");

var MouseTrigger = __webpack_require__(22);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("AddonsP2P");

var __event = __webpack_require__(11);

/**
 *
 * 对于视频流，往往 会出现 多个流 共用一个webrtc情况
 *
 *
 * @type {{}}
 * @private
 */


var addonsSession = function (Session) {
    var NewSession = Session.extend({

        postMessage: function(message, callback) {
            var self = this;

            var tsxId = message.tsxId;
            if (!message.tsxId) {
                tsxId = message.tsxId = ("MSG" + Date.now() + "-" + (emedia.__session_globalCount++));
            }

            Session.prototype.postMessage.call(self, message, callback);

            (function (tsxId) {
                var attendee = self.owner;
                if(attendee.isP2P() && self._callbacks[tsxId]){
                    setTimeout(function () {
                        var _sentMessage = self._callbacks[tsxId];
                        if(_sentMessage && _sentMessage.op === 1004){
                            var rsp = self.newMessage({
                                op: 1001,
                                tsxId: _sentMessage.tsxId,
                                memId: _sentMessage.memId,
                                result: 0,
                                msg: ("3000ms not recv response. will success callback. " + _sentMessage.tsxId)
                            });
                            self.onMessage(rsp);
                        }
                    }, 3000);
                }
            })(tsxId);
        },

        __modifyMessageForPost: function (message) {
            var self = this;

            message = Session.prototype.__modifyMessageForPost.call(self, message);

            var attendee = self.owner;
            if(attendee.isP2P()){
                if(message.op === 102 || message.op === 105){ //缓存  回调推流成功
                    var rsp = self.newMessage({
                        op: 1001,
                        tsxId: message.tsxId,
                        memId: message.memId,
                        result: 0,
                        streamId: (message.rtcId + (attendee.isCaller() ? "__Caller" : "__Callee")),
                        sver: 1
                    });

                    setTimeout(function () {
                        self.onMessage(rsp);
                    }, 100);

                    if(!message._cached_){
                        var cacheMessage = _util.extend({_cached_: true}, message);
                        _util.removeAttribute(cacheMessage, "tsxId");
                        (message.op === 102) && (attendee.__cache_[message.rtcId] = []).push(cacheMessage);
                        (message.op === 105) && attendee.__cache_[message.rtcId] && attendee.__cache_[message.rtcId].push(cacheMessage);
                        attendee.__cache_[message.rtcId] && (attendee.__cache_[message.rtcId].selfId = attendee.getMemberId());
                    }
                }

                _util.removeAttribute(message, "_cached_");

                if(message.memId){
                    var p2pMessage = self.newMessage({
                        op: 1004,
                        sessId: _util.removeAttribute(message, "sessId"),
                        memId: _util.removeAttribute(message, "memId"),
                        tsxId: _util.removeAttribute(message, "tsxId"),
                        arg: JSON.stringify(message)
                    });

                    message = p2pMessage;
                }

                switch(message.op){
                    case 205:
                        var rsp = self.newMessage({
                            op: 1001,
                            tsxId: message.tsxId,
                            result: 0
                        });

                        setTimeout(function () {
                            self.onMessage(rsp);
                        }, 50);

                        return;
                    case 102:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                        if(message.endReason === -10){
                            return;
                        }
                    case 1001:
                    case 400:
                        var p2pMessage = self.newMessage({
                            op: 1004,
                            sessId: _util.removeAttribute(message, "sessId"),
                            tsxId: _util.removeAttribute(message, "tsxId"),
                            arg: JSON.stringify(message)
                        });

                        message = p2pMessage;

                        break;

                    case 303:
                    case 206:
                        return;

                    default:
                }
            }

            return message;
        },

        onP2PMessage: function (evt) {
            var self = this;
            var attendee = self.owner;

            if(self.owner.isConfr()){
                _logger.warn("Recv p2p ctrl message. when CONFR. ignore");
                return;
            }

            var message = JSON.parse(evt.arg);
            message.memId = evt.memId;
            message.tsxId = evt.tsxId;
            message.sessId = evt.sessId;

            if(message.op === 400){
                message.streamId = message.rtcId + (self.owner.isCaller() ? "__Callee" : "__Caller");
            }

            if(message.op !== 1001){
                var rsp = self.newMessage({
                    op: 1001,
                    tsxId: evt.tsxId,
                    memId: evt.memId,
                    sessId: evt.sessId,
                    result: 0,
                    msg: "Web sdk success recv"
                });

                if(message.op === 102 || message.op === 105){
                    _util.extend(rsp, {
                        streamId: (message.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller")),
                        sver: 1
                    });
                }

                self.postMessage(rsp);
            }

            (function (message) {
                setTimeout(function () {
                    self.onMessage(message);
                }, 10);
            })(message);
        }
    });

    _util.extend(NewSession.prototype._events, {
        '1004': 'onP2PMessage'
    });

    return NewSession;
}

var addonsAttendee = function (Attendee) {
    var NewAttendee = Attendee.extend({
        __init__ : function () {
            var self = this;
            Attendee.prototype.__init__.call(self);

            self.__cache_ = {};

            var extIceRebuild = self.iceRebuild;
            self.iceRebuild = function (stream) {
                var self = this;

                if(!self.isP2P() || !stream.rtcId){
                    extIceRebuild.call(self, stream);
                    return;
                }

                if(stream._webrtc && (stream._webrtc.answerWebrtc === true)){
                    _logger.warn("Stream not auto iceRebuild. caused by answer webrtc. it = ", stream.id, stream);
                    return;
                }

                if(!stream.located()){ //被叫 rtcId 不自动重建；所有的订阅流不自动重建；
                    _logger.warn("Stream not auto iceRebuild. caused by not located. it = ", stream.id, stream);
                    return;
                }

                // stream.isRepublished = true;
                // self.push(stream, undefined, undefined, true);
                extIceRebuild.call(self, stream);
            };
        },

        onEnter: function(cver, mem){
            var self = this;
            try {
                Attendee.prototype.onEnter.call(self, cver, mem);
            } finally {
                if(!self.isP2P() || !(mem = self._cacheMembers[mem.id])){ //不是p2p 或者 没有 member
                    return;
                }
                _util.forEach(self.__cache_, function (rtcId, cacheMessages) {
                    if(cacheMessages.answered !== true){
                        _util.forEach(cacheMessages, function (index, cacheMessage) {
                            (function (cacheMessage) {
                                cacheMessage.memId = mem.id;
                                self.postMessage(cacheMessage);
                            })(cacheMessage);
                        });
                    }
                });
            }
        },

        rejectAnswer: function (memId, rtcId, endReason, rspFail) {
            var self = this;

            var termC = self.newMessage()
                .setOp(107)
                .setRtcId(rtcId)
                .setMemId(memId)
                .setEndReason(endReason);

            self.postMessage(termC, function (rsp) {
                if(rsp.result != 0){
                    self.onEvent(new __event.RspFail({request: termC, response: rsp}));
                    rspFail && rspFail(new __event.RspFail({request: termC, response: rsp}));

                    return;
                }
            });
        },

        closeWebrtc: function(rtcId, remainLocalStream, serverClosed){
            var self = this;

            var failed = false;

            if(self.isP2P()){
                var _webrtc = self._ices[rtcId];
                if(_webrtc){
                    var state = _webrtc.iceConnectionState();
                    failed = (state === 'failed');
                    failed = failed && (_webrtc._rebuildCount < emedia.config.iceRebuildCount);

                    _logger.warn("Webrtc state failed. it is ", rtcId, _webrtc._rebuildCount, emedia.config.iceRebuildCount, _webrtc.__id);
                }
            }

            //p2p failed认为服务端关闭，不发送 107.
            Attendee.prototype.closeWebrtc.call(self, rtcId, remainLocalStream, serverClosed || failed);

            if(self.isP2P())
            if(!serverClosed && failed){ //p2p failed 需要重连 所以需要将 steam重新添加到_linkedStreams中
                //换句话说 需要重建RTC必须 _linkedStreams中有值
                _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        self._linkedStreams[sid] = _stream;
                        _logger.warn("Reput stream to _linkedStreams", sid);
                    }
                });
            }

            // p2p时 ice close 可以认为 流 已经关闭，移除流
            if(self.isP2P() && (!remainLocalStream)){
                _util.removeAttribute(self.__cache_, rtcId);

                var _tmp = _util.extend({}, self._cacheStreams);

                _util.forEach(_tmp, function (streamId, stream) {
                    if(rtcId === stream.rtcId){
                        _util.removeAttribute(self._linkedStreams, stream.id);
                        var rmStream = _util.removeAttribute(self._cacheStreams, stream.id);
                        _logger.warn("P2P close webrtc. remove stream from _cacheStreams. it = ", stream.id, stream);

                        if(rmStream._localMediaStream){
                            self._service._stopTracks(rmStream._localMediaStream);
                        }

                        if(self.onRemoveStream){
                            var stream = self.newStream(stream);

                            self.onRemoveStream(stream);
                        }
                    }
                });
            }
        },

        subscribeStream: function (rtcId, streamId, rspFail, subArgs){
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.subscribeStream.call(self, rtcId, streamId, rspFail, subArgs);
                return;
            }

            // throw "P2P not allow call subscribeStream";
            var webrtc = self._ices[rtcId];

            var subStream = self._cacheStreams[streamId];

            //var stream = self.newStream(subStream);
            var stream = subStream;
            stream._webrtc = webrtc;
            stream.rtcId = rtcId;

            var preSubArgs = stream.subArgs;

            subArgs = subArgs || {subSVideo: true, subSAudio: true};
            stream.subArgs = stream.subArgs || {subSVideo: true, subSAudio: true};
            stream._webrtc && (stream._webrtc.subArgs = stream._webrtc.subArgs || {subSVideo: true, subSAudio: true});

            if(!stream.subArgs.subSVideo && subArgs.subSVideo && stream.voff){
                throw "Sub not allow. stream voff"
            }

            if(!stream.subArgs.subSAudio && subArgs.subSAudio && stream.aoff){
                throw "Sub not allow. stream aoff"
            }

            if(stream.subArgs.subSVideo && !subArgs.subSVideo && !stream.voff && emedia.isSafari){
                throw "Sub not allow. safari close sub video. will error"
            }

            subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
            subArgs && (stream.subArgs = subArgs);

            var evt = new __event.SubSuccess({
                stream: stream,
                hidden: true
            });
            self._updateRemoteStream(stream, stream._webrtc.getRemoteStream());
            self.onEvent(evt);
        },

        unsubscribeStream: function(streamId){
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.unsubscribeStream.call(self, streamId);
                return;
            }
        },

        onPub: function(cver, memId, pubS){
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.onPub.call(self, cver, memId, pubS);
                return;
            }

            var stream = Attendee.prototype.onPub.call(self, cver, memId, pubS);

            return stream;
        },

        onStreams: function(cver, streams) {
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.onStreams.call(self, cver, streams);
                return;
            }

            _logger.warn("P2P ingrone the onStreams");
        },

        _howDoWebrtcWhenCrtExsitsWebrtc: function (webrtc) {
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype._howDoWebrtcWhenCrtExsitsWebrtc.call(self, webrtc);
                return;
            }

            self.closeWebrtc(webrtc.getRtcId(), true, true);
        },

        createWebrtcAndSubscribeStream: function (streamId, callbacks, iceServerConfig, subArgs) {
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.createWebrtcAndSubscribeStream.call(self, streamId, callbacks, iceServerConfig, subArgs);
                return;
            }


            var self = this;

            callbacks || (callbacks = {});

            var subStream = self._cacheStreams[streamId];
            var subMember = self._cacheMembers[subStream.owner.id];

            //var stream = self.newStream(subStream);
            var stream = subStream;
            subArgs = subArgs || stream.subArgs || {subSVideo: true, subSAudio: true};

            function _onSubFail(evt) {
                _logger.warn("sub stream error", streamId, evt);

                preSubArgs && stream._webrtc && stream._webrtc.setSubArgs(preSubArgs);
                preSubArgs && (stream.subArgs = preSubArgs);

                evt = new __event.SubFail({
                    stream: stream,
                    hidden: evt.hidden === true,
                    cause: evt
                });

                callbacks && callbacks.onEvent && callbacks.onEvent(evt);
                self.onEvent && self.onEvent(evt);
            }

            var pubStreamVCodes = subStream.vcodes;
            var pubMemberSupportVCodes = subMember.vcodes;
            var selfSupportVCodes = self.supportVCodes;

            var optimalVideoCodecs = self._getOptimalVideoCodecsSubset(pubStreamVCodes, pubMemberSupportVCodes, selfSupportVCodes);

            subArgs = subArgs || stream.subArgs;

            var preSubArgs = stream.subArgs;

            var withoutVideo = !(stream.vcodes && stream.vcodes.length > 0);
            var offerOptions = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: (subArgs.subSVideo && withoutVideo)
            };

            if(!offerOptions.offerToReceiveAudio && !offerOptions.offerToReceiveVideo){
                _logger.warn("offerToReceiveAudio == false and offerToReceiveVideo == false");
            }

            var webrtc = self.createWebrtc({
                _rtcId: stream.rtcId,

                iceServerConfig: iceServerConfig,
                optimalVideoCodecs: optimalVideoCodecs,
                offerOptions: offerOptions,

                onGotMediaStream: function (remoteMediaStream) {
                    var evt = new __event.SubSuccess({
                        stream: stream,
                        hidden: true
                    });

                    callbacks.onGotRemote && callbacks.onGotRemote(stream);
                    self.onEvent && self.onEvent(evt);
                }
            }, stream.iceRebuildCount);
            var rtcId = webrtc.getRtcId();

            _logger.warn(rtcId, " sub stream ", streamId, optimalVideoCodecs);

            var preWebrtc = stream._webrtc;

            stream._webrtc = webrtc;
            stream.rtcId = rtcId;
            stream.owner = _util.extend({}, subMember);
            self._ices[rtcId] = webrtc;

            webrtc.answerWebrtc = true;


            subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
            subArgs && (stream.subArgs = subArgs);

            function channelSet(localStream) {
                localStream && webrtc.setLocalStream(localStream);
                webrtc.setRemoteDescription(stream.sdp);
                stream.cands && (stream.cands.length > 0) && webrtc.addIceCandidate(stream.cands);
            }

            if(rtcId === ("rtc-" + self.ticket.confrId)){
                var lastCalleePub = self.__lastCalleePub;

                var calleePub = self._cacheStreams[rtcId + (self.isCaller() ? "__Caller" : "__Callee")];
                var calleePub = new self._service.AVPubstream(calleePub || {
                    constaints: {
                        audio: (!stream.aoff),
                        video: (!stream.voff)
                    }
                });

                preWebrtc && preWebrtc.getLocalStream() && self._service._stopTracks(preWebrtc.getLocalStream());

                self._service.openUserMedia(calleePub).then(function () {
                    var stream = self.newStream(calleePub);

                    stream._localMediaStream = calleePub.localStream;
                    stream._webrtc = webrtc;
                    stream.rtcId = webrtc.getRtcId();
                    stream.id = rtcId + (self.isCaller() ? "__Caller" : "__Callee");
                    stream.owner = {id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

                    self.onEvent(new __event.PushSuccess({stream: stream, hidden: true}));

                    channelSet(calleePub.localStream);
                    self.answerCall(rtcId, calleePub, _onSubFail);
                }, _onSubFail);

            }else{
                channelSet();
                self.answer(rtcId, _onSubFail);
            }
        }
    });

    return NewAttendee;
}


var addonsService = function (Service, Session, Attendee) {
    var NewService = Service.extend({
        Session: Session,
        Attendee: Attendee,

        __init__: function () {
            var self = this;
            Service.prototype.__init__.call(self);

            if(self.useRTCCfg === undefined || self.useRTCCfg === false || self.useRTCCfg === null){
                self.useRTCCfg = emedia.config.forceUseRTCCfgIfServerReturnWhenP2P;
            }
        },

        push: function(pubS, pushed, onPushError){
            var self = this;

            if(self.current && self.current.isP2P()){
                if(pubS.type === 2){
                    throw "P2P do not allow audio_mixer";
                }

                if((pubS instanceof self.AVPubstream) && !pubS.rtcId){ // 主叫 如果没有主RTC, 将创建
                    var p2pAV = self.current._cacheStreams["rtc-" + self.current.ticket.confrId + "__Caller"]
                        || self.current._cacheStreams["rtc-" + self.current.ticket.confrId + "__Callee"];

                    if(!p2pAV){
                        pubS.rtcId = "rtc-" + self.current.ticket.confrId;
                    }
                }
            }

            Service.prototype.push.call(self, pubS, pushed, onPushError);
        },

        newSession: function (attendee, ticket){
            var self = this;

            var session = Service.prototype.newSession.call(self, attendee, ticket);
            var preOnTermC = session.onTermC;
            var preOnAnsC = session.onAnsC;

            return _util.extend(session, {
                onInitC: function (message) {
                    if(!attendee.isP2P()){
                        return;
                    }

                    if(message.rtcId === ("rtc-" + attendee.ticket.confrId)){ //收到主呼叫
                        var streamId = message.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller");
                        var _stream = attendee._cacheStreams[streamId];
                        if(_stream && _stream.owner && (_stream.owner.id !== message.memId)){
                            attendee.rejectAnswer(message.memId, message.rtcId, 10);
                            attendee.postMessage(attendee.newMessage({
                                op: 1001,
                                memId: message.memId,
                                tsxId: message.tsxId,
                                result: -554,
                                msg: "Other device call it. you no."
                            }));

                            return;
                        }
                    }

                    //认为 只有一个音视频流，多个桌面共享的流  音视频流双向的。
                    message.pubS.sdp = message.sdp;
                    message.pubS.cands = message.cands;
                    message.pubS.id = message.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller");
                    message.pubS._located = false;
                    message.pubS.memId = message.memId;
                    message.pubS.rtcId = message.rtcId;
                    message.pubS.sver = 0;

                    var _stream = attendee._cacheStreams[message.pubS.id];
                    if(_stream){
                        message.pubS.sver = _stream.sver + 1;
                        _util.removeAttribute(attendee._maybeNotExistStreams, message.pubS.id);
                    }
                    attendee.onPub.call(attendee, ++attendee._cver, message.memId, message.pubS);
                },

                onTermC: function(evt){
                    if(!attendee.isP2P()){
                        preOnTermC.call(attendee, evt);
                        return;
                    }

                    if(evt.endReason === -20){
                        var callerPub = attendee._cacheStreams[(evt.rtcId+ "__Caller")];

                        _logger.warn("Begin re-publish. 20", callerPub);
                        callerPub && self._republish(callerPub);

                        return;
                    }

                    // memId 不相等说明 来自 p2p的对方
                    // 意思是 evt.memId 关闭了一个 rtcId
                    if(evt.memId && evt.memId !== attendee.getMemberId()){
                        // 由于流集合中，所有的发布流均有个特点，caller __Caller结尾，callee __Callee结尾
                        // 关闭流时，先关闭订阅流，在关闭发布流
                        // 所以做了下排序
                        var sortedStreams = [];
                        _util.forEach(attendee._cacheStreams, function (streamId, stream) {
                            sortedStreams.push(stream);
                        });
                        sortedStreams = sortedStreams.sort(function(a, b){
                            var result = -1;
                            if(a.id > b.id){
                                result = 1;
                            }

                            return attendee.isCallee() ? (0 - result) : result;
                        });

                        _util.forEach(sortedStreams, function (_index, stream) {
                            // evt.memId 关闭的 evt.rtcId 所关联的流 要关闭
                            if(stream && stream.owner && stream.owner.id === evt.memId && evt.rtcId === stream.rtcId){
                                (evt.endReason !== -10) && preOnTermC.call(attendee, evt);

                                if(evt.rtcId === ("rtc-" + attendee.ticket.confrId)){
                                    attendee.onUnpub(++attendee._cver, evt.memId, stream.id);
                                }

                                if(evt.endReason === 10){
                                    attendee.onEvent(new __event.OtherDeviceAnswer({rtcId: evt.rtcId, stream: stream}));
                                }
                            }

                            if(stream && stream.owner && stream.owner.id === attendee.getMemberId() && evt.rtcId === stream.rtcId){
                                attendee.closeWebrtc(evt.rtcId);
                                attendee.onUnpub(++attendee._cver, stream.owner.id, stream.id);
                            }
                        });
                        return;
                    }

                    (evt.endReason !== -10) && preOnTermC.call(attendee, evt);

                    if(evt.endReason === 10){
                        attendee.onEvent(new __event.OtherDeviceAnswer({rtcId: evt.rtcId}));
                    }
                },

                onAnsC: function(evt){
                    if(!attendee.isP2P()){
                        preOnAnsC.call(attendee, evt);
                        return;
                    }

                    if(!attendee.__cache_[evt.rtcId]){
                        _logger.warn("Webrtc ", evt.rtcId, "not created. drop the answer");

                        return;
                    }

                    if(attendee.__cache_[evt.rtcId].answered === true){
                        _logger.warn("Webrtc ", evt.rtcId, "had been ansC");

                        attendee.rejectAnswer(evt.memId, evt.rtcId, 10);
                        attendee.postMessage(attendee.newMessage({
                            op: 1001,
                            memId: evt.memId,
                            tsxId: evt.tsxId,
                            result: -554,
                            msg: "Other device sub it. you no."
                        }));

                        return;
                    }

                    try{
                        if(evt.pubS){
                            var stream = attendee.newStream(evt.pubS);

                            stream._webrtc = attendee._ices[evt.rtcId];
                            stream.rtcId = evt.rtcId;
                            stream.id = evt.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller");
                            stream.owner = attendee._cacheMembers[evt.memId];

                            if(!attendee._cacheStreams[stream.id]){
                                attendee.onPub.call(attendee, ++attendee._cver, evt.memId, stream);
                            }else{
                                attendee._cacheStreams[stream.id] = stream;
                            }

                            attendee.onEvent(new __event.SubSuccess({stream: stream, hidden: true}));
                        }

                        var ansCMember = attendee._cacheMembers[evt.memId];

                        preOnAnsC.call(attendee, evt);

                        _util.forEach(attendee._cacheMembers, function (_memberId, _member) {
                            if(_memberId !== evt.memId && ansCMember.memName === _member.memName){
                                attendee.rejectAnswer(_memberId, evt.rtcId, 10);
                            }
                        });
                    } finally {
                        attendee.__cache_[evt.rtcId].answered = true;
                    }
                }
            });
        }
    });

    return NewService;
}


module.exports = function (Service) {
    var _Session = Service.prototype.Session || __webpack_require__(10);
    var Session = addonsSession(_Session.extend({}));

    var _Attendee = Service.prototype.Attendee || __webpack_require__(12);
    var Attendee = addonsAttendee(_Attendee.extend({}));

    return addonsService(Service, Session, Attendee);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("PannelVideo");

var Mouse = __webpack_require__(25);
var Keyboard = __webpack_require__(26);
var MouseTrack = __webpack_require__(21);
var MouseTrigger = __webpack_require__(22);
var TotalBuffer = __webpack_require__(27);


function overrideOnRemoveMember(service){
    overrideOnRemoveMember._overrideCount++;
    if(overrideOnRemoveMember.overrideObj === service){
        return;
    }

    overrideOnRemoveMember.overrideObj = service;
    onRemoveMember.override = service.listeners.onRemoveMember;
    service.listeners.onRemoveMember = onRemoveMember;
}
overrideOnRemoveMember._overrideCount = 0;

function onRemoveMember(member, reason) {
    try{
        var remoteControls = member && member.id && selectRemoteControlByMemId(this._service, member.id);

        if(remoteControls && remoteControls.length){
            _util.forEach(remoteControls, function (_index, ctrl) {
                _logger.warn("Remove member. free remote controller. it is ", ctrl.id, ctrl._ctrlStream.id, ctrl._controller.memName, member.id);

                ctrl._free(); //超时清空

                ctrl._callbacks && ctrl._callbacks.onRemoteFreeControl
                    && ctrl._callbacks.onRemoteFreeControl(ctrl._ctrlStream, ctrl._controller,  ctrl._cId);
            });
        }
    }finally{
        onRemoveMember.override && onRemoveMember.override.apply(this, arguments);
    }
}


function overrideOnRemoveStream(service) {
    overrideOnRemoveStream._overrideCount++;
    if(overrideOnRemoveStream.overrideObj === service){
        return;
    }

    overrideOnRemoveStream.overrideObj = service;
    onRemoveStream.override = service.listeners.onRemoveStream;
    service.listeners.onRemoveStream = onRemoveStream;
}
overrideOnRemoveStream._overrideCount = 0;

function resetOnRemoveStream(service) {
    // overrideOnRemoveStream._overrideCount--;
    //
    // if(overrideOnRemoveStream._overrideCount === 0){
    //     service.current.onRemoveStream = onRemoveStream.override;
    //     overrideOnRemoveStream.overrideObj = undefined;
    // }
}

function onRemoveStream(stream) {
    doCleanAfterStreamClose(this._service, stream);

    onRemoveStream.override && onRemoveStream.override.apply(this, arguments);
}

function doCleanAfterStreamClose(service, stream) {
    disControlled(service, stream.id);

    var controls = getRemoteControl(service, stream);
    controls && _util.forEach(controls, function (_i, control) {
        control._free && control._free();
    })

    _util.removeAttribute(service.current.__remoteControls, stream.id);
}

function overrideOnHungup(service) {
    overrideOnHungup._overrideCount++;
    if(overrideOnHungup.overrideObj === service){
        return;
    }

    overrideOnHungup.overrideObj = service;
    var override = service.onHungup;

    service.onHungup = (function onHungup(stream) {
        doCleanAfterStreamClose(service, stream);
        override && override.apply(this, arguments);
    }).bind(service);
}
overrideOnHungup._overrideCount = 0;

function overrideOnRemotePannelControl(service, callbacks) {
    overrideOnRemotePannelControl._overrideCount++;
    if(overrideOnRemotePannelControl.overrideObj === service){
        return;
    }

    overrideOnRemotePannelControl.overrideObj = service;
    var override = service._onRemotePannelControl;

    service._onRemotePannelControl = (function _onRemotePannelControl(evt) {
        handlePannelRemoteMessage(this, evt, false, callbacks);
        override && override.apply(this, arguments);
    }).bind(service);
}
overrideOnRemotePannelControl._overrideCount = 0;

function resetOnRemotePannelControl(service) {
    // overrideOnRemotePannelControl._overrideCount--;
    //
    // if(overrideOnRemotePannelControl._overrideCount === 0){
    //     service._onRemotePannelControl = _onRemotePannelControl.override;
    //     overrideOnRemotePannelControl.overrideObj = undefined;
    // }
}

function codeCtrlMessage(service, stream, ctrl) {
    var actions = [];

    ctrl && _util.forEach(ctrl.actions, function (i, m) {
        m.xy && actions.push({
            x: Math.round(m.xy.x * 10000),
            y: Math.round(m.xy.y * 10000),
            oper: m.oper,
            btn: m.btn,
            sn: m.sn,
            _time: m._time
        });

        m.xy || actions.push({
            oper: m.oper,
            btn: m.btn,
            sn: m.sn,
            _time: m._time
        });
    });

    var arg = {
        op2: 30,
        evt: 0,
        streamId: stream.id,
        actions: actions,
        cId: ctrl.cId
    };

    return service.current.newMessage({
        op: 1002,
        memId: stream.owner.id,
        arg: JSON.stringify(arg),
        _reqOps:[100230]
    });
}

function decodeCtrlMessage(evt) {
    if(typeof evt.arg === 'string'){
        evt.arg = JSON.parse(evt.arg);
    }

    var arg = evt.arg;

    var mouse = [], keyboard = [];
    arg && arg.actions && _util.forEach(arg.actions, function (i, m) {
        (m.x !== undefined && m.y !== undefined) && mouse.push({
            xy: {x: m.x / 10000, y: m.y / 10000},
            oper: m.oper,
            btn: m.btn,
            sn: m.sn,
            _time: m._time
        });

        (m.x === undefined || m.y === undefined) && keyboard.push({
            oper: m.oper,
            btn: m.btn,
            sn: m.sn,
            _time: m._time
        });
    });

    arg.mouse = mouse;
    arg.keyboard = keyboard;
}

var remoteControlSeqno = 0;
var RemoteControl = _util.prototypeExtend({
    //id:
    //_service:
    //controller:
    //_ctrlStream:
    //_cId:
    //_reqevt:
    __init__: function () {
        this.id = remoteControlSeqno++;
    },
    accept: function (videoTag, mouseTrack, keyboard) {
        var self = this;

        if(self.hasOtherControl()){
            self.busy();
            throw "Other has been controled.";
        }

        var preAcpt = false;

        var preRemoteControls = getRemoteControl(this._service, this._ctrlStream, this._controller); // 获取此前的remotecontrol
        preRemoteControls && _util.forEach(preRemoteControls, function (_index, preRC) {
            if(preRC.id < self.id) {
                preRC._free();
            }else{
                preAcpt = true;
            }
        })

        if(preAcpt){ //已经同意最新的控制。忽略这个
            self._free();
            return;
        }

        var remoteControls = this._service.current.__remoteControls || (this._service.current.__remoteControls = {});
        remoteControls[self.id] = self;

        controlling(this, videoTag, mouseTrack, keyboard);

        rspRemoteControl(this._service, this._reqevt, 0);
    },

    controlling: function () {
        var self = this;

        //存在启动人控制
        var controls = [];
        var remoteControls =  getRemoteControl(this._service, this._ctrlStream);
        remoteControls && _util.forEach(remoteControls, function (_index, other) {
            if(other._controller.memName === self._controller.memName){
                controls.push(other);
            }
        });

        return controls && controls.length ? controls : undefined;
    },

    hasOtherControl: function () {
        var self = this;

        //存在启动人控制
        var hasOtherControl = false;
        var controls =  getRemoteControl(this._service, this._ctrlStream);
        controls && _util.forEach(controls, function (_index, other) {
            if(other._controller.memName != self._controller.memName){
                hasOtherControl = true;
            }
        });

        return hasOtherControl;
    },

    busy: function () {
        rspRemoteControl(this._service, this._reqevt, -403);
    },

    reject: function () {
        rspRemoteControl(this._service, this._reqevt, -402);
    },

    _free: function () {
        _util.removeAttribute(this._service.current.__remoteControls, this.id);
    },

    forceDisconnect: function () {
        
    }
});

function rspRemoteControl(service, evt, result) {
    service.current.message({
        op: 1001,
        tsxId: evt.tsxId,
        memId: evt.memId,
        arg: JSON.stringify({cId: evt.arg.cId}),
        result: result
    }).post();
}

function notAllowControl(service, evt) {
    rspRemoteControl(service, evt, -405);
}

function selectRemoteControlByMemId(service, controllerMemId, stream) {
    var remoteControls = [];
    service.current.__remoteControls && _util.forEach(service.current.__remoteControls, function (_remoteControlId, _remoteControl) {
        if((!stream || _remoteControl._ctrlStream.id === stream.id)
            && (!controllerMemId || ((_remoteControl._controller.id === controllerMemId) )
            )){
            remoteControls.push(_remoteControl);
        }
    });

    return remoteControls;
}

function getRemoteControl(service, stream, controller, cId) {
    var remoteControls = [];
    service.current.__remoteControls && _util.forEach(service.current.__remoteControls, function (_remoteControlId, _remoteControl) {
        if((!stream || _remoteControl._ctrlStream.id === stream.id)
            && (!controller || _remoteControl._controller.memName === controller.memName)
            && (!cId || _remoteControl._cId === cId)){
            remoteControls.push(_remoteControl);
        }
    });

    return remoteControls;
}

function handlePannelRemoteMessage(service, evt, located, callbacks) {
    decodeCtrlMessage(evt);

    var arg = evt.arg;
    var cId = arg.cId;

    var streamId = arg.streamId;

    var member = service.getMemberById(evt.memId);
    var stream = service.getStreamById(streamId);

    function recvRemoteControl() {
        if(!member || !stream){
            notAllowControl(service, evt);
            return true;
        }

        if(arg.evt === 1){ // 控制申请
            var remoteControl = new RemoteControl({
                _service: service,
                _controller: member,
                _ctrlStream: stream,
                _cId: cId,
                _reqevt: evt,
                _callbacks: callbacks
            });

            if(remoteControl.hasOtherControl()){
                remoteControl.busy();
                return true;
            }

            var ctrls;
            if((ctrls =remoteControl.controlling())){
                _util.forEach(ctrls, function (_index, ctrl) {
                    ctrl._cId = cId;
                });

                rspRemoteControl(service, evt, 0);
                return true;
            }

            callbacks && callbacks.onHasRemoteControl && callbacks.onHasRemoteControl(stream, member, remoteControl);

            return true;
        }

        if(arg.evt === 2){ // 控制释放
            var remoteControls = getRemoteControl(service, stream, member, cId);
            if(remoteControls){
                _util.forEach(remoteControls, function (_index, remoteControl) {
                    remoteControl._free && remoteControl._free();
                    rspRemoteControl(service, evt, 0)
                })
            }

            callbacks && callbacks.onRemoteFreeControl && callbacks.onRemoteFreeControl(stream, member, cId);

            return true;
        }
    }

    if(!located && recvRemoteControl()){
        return;
    }

    var remoteControls = getRemoteControl(service, stream, member, cId);
    if(!located && (!remoteControls || remoteControls.length === 0)){
         notAllowControl(service, evt);
    }

    remoteControls && _util.forEach(remoteControls, function (_index, __ctrl) {
        __ctrl._lastRecvTimestamp = (new Date()).getTime();
    });

    if(located){
        var remoteControl = service.current.__remoteControls[stream.id];
        remoteControls = (remoteControls || []);

        remoteControl && remoteControls.push(remoteControl);
    }

    _util.forEach(remoteControls, function (_i, ctrl) {
        var maxSN = 0;

        var triggers = arg.mouse;
        if(triggers && triggers.length > 0){
            try {
                _util.forEach(triggers, function (index, elem) {
                    if(elem.sn > maxSN){
                        maxSN = elem.sn;
                    }

                    if(elem.oper === MouseTrigger.BTN.MOVE){
                        ctrl.mouseTrack && ctrl.mouseTrack.track(elem.xy);
                    }else{
                        ctrl.mouseTrack && ctrl.mouseTrack.trigger(new MouseTrigger(elem));
                    }
                });
            } catch (e){
                _logger.warn(e);
            }
        }

        var triggers = arg.keyboard;
        if(triggers && triggers.length > 0){
            try {
                _util.forEach(triggers, function (index, elem) {
                    if(elem.sn > maxSN){
                        maxSN = elem.sn;
                    }

                    if(ctrl.keyboard) if(elem.oper === MouseTrigger.BTN.KEYBOARD_DOWN){
                        ctrl.keyboard.onKeyDown(elem.btn);
                    }else if(elem.oper === MouseTrigger.BTN.KEYBOARD_UP){
                        ctrl.keyboard.onKeyUp(elem.btn);
                    }
                });
            } catch (e){
                _logger.warn(e);
            }
        }

        if(located === true){ //自个儿 没通过 session发送
            return;
        }

        function rsp() {
            service.current.message({
                op: 1001,
                tsxId: evt.tsxId,
                memId: evt.memId,
                arg: JSON.stringify({sn: maxSN}),
                result: 0
            }).post(function (rsp) {
                _logger.debug("Send remote control response. the result = ", rsp.result, rsp.msg || "");
            });
        }

        try {
            rsp();
        }catch (e){
            _logger.warn(e);
        }
    })
}

function onMouseEnter(service, streamId, videoTarget, _onMouseEnter, onCallbacks) {
    _onMouseEnter && _onMouseEnter();
}

function onMouseExit(service, streamId, videoTarget, _onMouseExit, onCallbacks) {
    _onMouseExit && _onMouseExit();
}

function onMouseMove(service, streamId, videoTarget, eventXY, lastTrigger, _onMouseMove, onCallbacks) {
    var pos = service.eventXYAtMedia(eventXY, videoTarget);
    if(!pos){
        return;
    }

    pos = {
        x: (pos.x / pos.width),
        y: (pos.y / pos.height)
    }

    //_logger.info(pos.x, pos.y);

    sendPannelMessage(service, {xy: pos, oper: MouseTrigger.BTN.MOVE, sid: streamId}, onCallbacks);
    _onMouseMove && _onMouseMove(pos, lastTrigger);
}

function onMouseButton(service, streamId, videoTarget, trigger, lastTrigger, _onMouseButton, onCallbacks) {
    trigger.xy = service.eventXYAtMedia(trigger.xy, videoTarget);
    if(!trigger.xy){
        return;
    }

    trigger.xy = {
        x: (trigger.xy.x / trigger.xy.width),
        y: (trigger.xy.y / trigger.xy.height)
    }

    _util.extend(trigger, {sid: streamId});

    sendPannelMessage(service, trigger, onCallbacks);
    _onMouseButton && _onMouseButton(trigger, lastTrigger);
}

function onKeyboard(service, streamId, oper, btn, _onKeyboard, onCallbacks) {
    sendPannelMessage(service, {oper: oper, btn: btn, sid: streamId}, onCallbacks);
    _onKeyboard && _onKeyboard(oper, btn);
}

function maskVideo(videoTarget) {
    var maskDiv = document.createElement("div");
    maskDiv.style = videoTarget.style;
    maskDiv.style.background = "transparent";

    videoTarget.parentNode.appendChild(maskDiv);
}

function sendPannelMessage(service, trigger, onCallbacks) {
    var streamId = trigger.sid;

    var stream = service.getStreamById(streamId);

    var ctrl;
    if(service.current.__remoteControls && (ctrl = service.current.__remoteControls[streamId])){
        handlePannelRemoteMessage(service, codeCtrlMessage(service, stream, {actions: [trigger]}), true);
    }

    var _buffer = service.current.__pannelBuffers[streamId];

    var preUnclearSize = _buffer.getUnclearSize();
    _buffer.put(trigger);

    if(preUnclearSize < emedia.config.allowSendWhenLessThan){
        function _getAndSend() {
            var evts = _buffer.getUnread();

            var _maxSN = 0;
            for(var i = 0; evts && i < evts.length; i++){
                var evt = evts[i];
                _util.removeAttribute(evt, "sid");

                (_maxSN < evt.sn) && (_maxSN = evt.sn);
            }

            if(!evts || evts.length === 0){
                return;
            }

            _logger.debug(streamId, "buffer remain:", _buffer.getUnclearSize(), ", send evt:", evts.length);

            service.current.postMessage(codeCtrlMessage(service, stream, {actions: evts, cId: _buffer._cId}), function (rsp) {
                if(rsp.result === -402){ //对方 拒绝控制
                    onCallbacks && onCallbacks.onReject && onCallbacks.onReject(stream);
                    return;
                }
                if(rsp.result === -403){ //对方 正被控制，忙
                    onCallbacks && onCallbacks.onBusy && onCallbacks.onBusy(stream);
                    return;
                }
                if(rsp.result === -408){ //超时
                    onCallbacks && onCallbacks.onRemoteControlTimeout && onCallbacks.onRemoteControlTimeout(stream);
                    return;
                }
                if(rsp.result === -507 || rsp.result === -405){ //不被支持
                    _buffer.clearRead(_maxSN);
                    onCallbacks && onCallbacks.onNotAllowRemoteControl && onCallbacks.onNotAllowRemoteControl(stream);
                    return;
                }

                if(rsp.result === 0){
                    _buffer._lastRspTimestamp = (new Date()).getTime();
                }

                var arg = rsp.arg;
                if(arg && (arg = JSON.parse(arg)) && !_util.isInt(arg.sn)){
                    _logger.warn("rsp.sn not a Number.", arg.sn, "for streamId", streamId);
                }else{
                    arg && (arg.sn !== undefined) && _buffer.clearRead(arg.sn);
                }

                _getAndSend();
            });

        }

        _getAndSend();
    }
}

function disControlled(service, streamId) {
    var buffer;

    var mouse = service.current.__pannelMouses && _util.removeAttribute(service.current.__pannelMouses, streamId);
    var keyboard = service.current.__pannelKeyboards && _util.removeAttribute(service.current.__pannelKeyboards, streamId);
    service.current.__pannelBuffers && (buffer = _util.removeAttribute(service.current.__pannelBuffers, streamId));

    mouse && mouse.ungrab();
    keyboard && keyboard.ungrab();

    resetOnRemoveStream(service);

    if(!buffer){
        return;
    }

    var stream = service.getStreamById(streamId);
    if(buffer._callbacks && buffer._callbacks.onDisControlled){
        buffer._callbacks.onDisControlled(stream);
    }


    if(!stream){
        return;
    }

    var messge = service.current.newMessage({
        op: 1002,
        memId: stream.owner.id,
        arg: JSON.stringify({
            op2: 30,
            streamId: stream.id,
            evt: 2,
            cId: buffer._cId
        }),
        _reqOps:[100230]
    });

    service.current.postMessage(messge, function (rsp) {
        if(rsp.result === 0){
            return;
        }

        _logger.warn("Unkown result：", rsp.result);
        return;
    });
}


function mirrorControlled(service, streamId, videoTarget, maskTarget) {
    var onCallbacks = {};
    _util.forEach(arguments, function (_index, _func) {
        if(typeof _func === "function"){
            onCallbacks[_func.name] = _func;
        }
    });

    reqControlled(service, streamId, videoTarget, true, maskTarget, onCallbacks);
}

function controlled(service, streamId, videoTarget, maskTarget) {
    var onCallbacks = {};
    _util.forEach(arguments, function (_index, _func) {
        if(typeof _func === "function"){
            onCallbacks[_func.name] = _func;
        }
    });

    reqControlled(service, streamId, videoTarget, false, maskTarget, onCallbacks);
}

function reqControlled(service, streamId, videoTarget, mirror, maskTarget, onCallbacks) {
    var cId = Math.uuidFast();
    cId = cId.substr(cId.length - 6, 6);

    var stream = service.getStreamById(streamId);

    if(!stream._webrtc){
        //throw "Not allow control. cause by the stream not sub";
        onCallbacks && onCallbacks.onNotAllowRemoteControl && onCallbacks.onNotAllowRemoteControl(stream);
        throw "Not allow control. cause by the stream not sub";
    }

    var arg = {
        op2: 30,
        streamId: stream.id,
        evt: 1,
        cId: cId
    };

    var messge = service.current.newMessage({
        op: 1002,
        memId: stream.owner.id,
        arg: JSON.stringify(arg),
        _reqOps:[100230]
    });

    service.current.postMessage(messge, function (rsp) {
        if(rsp.result === -402){ //对方 拒绝控制
            onCallbacks && onCallbacks.onReject && onCallbacks.onReject(stream);
            return;
        }
        if(rsp.result === -403){ //对方 正被控制，忙
            onCallbacks && onCallbacks.onBusy && onCallbacks.onBusy(stream);
            return;
        }
        if(rsp.result === -408){ //超时
            onCallbacks && onCallbacks.onRemoteControlTimeout && onCallbacks.onRemoteControlTimeout(stream);
            return;
        }
        if(rsp.result === -507 || rsp.result === -405){ //不被支持
            onCallbacks && onCallbacks.onNotAllowRemoteControl && onCallbacks.onNotAllowRemoteControl(stream);
            return;
        }

        if(rsp.result === 0){
            _controlled(service, streamId, videoTarget, mirror, maskTarget, onCallbacks, cId, true);
            onCallbacks && onCallbacks.onAccept && onCallbacks.onAccept(stream);
            return;
        }

        _logger.warn("Unkown result：", rsp.result);

        onCallbacks && onCallbacks.onNotAllowRemoteControl && onCallbacks.onNotAllowRemoteControl(stream);
        return;
    });
}

function _controlled(service, streamId, videoTarget, mirror, maskTarget, onCallbacks, cId, openKeyboard) {
    if(!_util.targetDOM(maskTarget)){
        maskTarget = undefined;
    }

    if(maskTarget === undefined){
        maskTarget = maskVideo(videoTarget);
    }

    var stream = service.getStreamById(streamId);

    var mouse = (service.current.__pannelMouses || (service.current.__pannelMouses = {}))[streamId];
    if(mouse){
        disControlled(service, streamId);
    }

    if(!stream.located() && !stream.owner.acptOps[1003]){
        throw stream.owner.memName + " do not recv remote message";
    }

    mouse = new Mouse({
        _video: videoTarget,
        _target: maskTarget,
        _focused: true,

        onMouseEnter: function () {
            onMouseEnter.call(mouse, service, streamId, videoTarget, onCallbacks && onCallbacks.onMouseEnter, onCallbacks);

            keyboard && keyboard.grab();
        },

        onMouseExit: function () {
            onMouseExit.call(mouse, service, streamId, videoTarget, onCallbacks && onCallbacks.onMouseExit, onCallbacks);

            keyboard && keyboard.ungrab();
        },

        onMouseButton: function(trigger, lastTrigger) {
            mirror === true && (trigger.xy.x = - trigger.xy.x);
            onMouseButton.call(mouse, service, streamId, videoTarget, trigger, lastTrigger, onCallbacks && onCallbacks.onMouseButton, onCallbacks);
        },

        onMouseMove: function(pos, lastTrigger) {
            //_logger.info(pos.x, pos.y);

            if(!emedia.config.disableTrack){
                mirror === true && (pos.x = - pos.x);
                onMouseMove.call(mouse, service, streamId, videoTarget, pos, lastTrigger, onCallbacks && onCallbacks.onMouseMove, onCallbacks);
            }
        }
    });

    var pannelBuffers = (service.current.__pannelBuffers || (service.current.__pannelBuffers = {}));
    var _buffer = pannelBuffers[streamId] = new TotalBuffer({
        _cId: cId,
        _callbacks: onCallbacks,
        trackBufferSize: emedia.config.trackBufferSize || 1000
    });

    (service.current.__pannelMouses || (service.current.__pannelMouses = {}))[streamId] = mouse;
    mouse.grab();

    var keyboard;
    if(openKeyboard){
        keyboard = new Keyboard({
            _target: document,
            _focused: true,
            onKeyPress: function(keyValue, isPressed) {
                var oper = isPressed ? MouseTrigger.BTN.KEYBOARD_DOWN : MouseTrigger.BTN.KEYBOARD_UP;
                var btn = keyValue;

                onKeyboard.call(keyboard, service, streamId, oper, btn, onCallbacks && onCallbacks.onKeyboard, onCallbacks);
            }
        });

        (service.current.__pannelKeyboards || (service.current.__pannelKeyboards = {}))[streamId] = keyboard;
        //keyboard.grab();
    }

    // overrideOnHungup(service);
    // overrideOnRemoveStream(service);
    // overrideOnRemoveMember(service);
}

function graffiti(maskTag, mouseTrack){
    var mouse = new Mouse({
        _target: maskTag,
        _focused: true,

        onMouseEnter: function () {
            //mouse.grab();
        },

        onMouseExit: function () {
            mouseTrack.releaseTrigger();
        },

        onMouseButton: function(trigger, lastTrigger) {
            mouseTrack.trigger(trigger);
        },

        onMouseMove: function(pos, lastTrigger) {
            mouseTrack.track(pos);
        }
    });

    mouse.grab();

    return mouse;
}

function controlling(ctrl, videoTag, mouseTrack, keyboard) {
    var __mouseTrack;
    videoTag && mouseTrack && (__mouseTrack = new MouseTrack({
        _focused: true,

        onMouseTrack: function (position, lastPosition, lastTrigger) {
            position = ctrl._service.eventXYAtVideo(position, videoTag);
            mouseTrack.track(position);
        },

        onMouseTrigger: function (trigger, _lastTrigger) {
            trigger.xy = ctrl._service.eventXYAtVideo(trigger.xy, videoTag);
            mouseTrack.trigger(trigger);
        },
        onReleaseTrigger: function (_lastTrigger) {
            mouseTrack.releaseTrigger();
        }
    }));

    __mouseTrack && (ctrl.mouseTrack = __mouseTrack);
    ctrl.keyboard = keyboard;
}

function support(service) {
    var onCallbacks = {};
    _util.forEach(arguments, function (_index, _func) {
        if(_index != 0 && typeof _func === "function"){
            onCallbacks[_func.name] = _func;
        }
    });

    overrideOnHungup(service);

    overrideOnRemoveStream(service);
    overrideOnRemoveMember(service);
    overrideOnRemotePannelControl(service, onCallbacks);

    checkTimeout(service);
}

function getController(service, streamId) {
    var stream = service.getStreamById(streamId);

    var controls = getRemoteControl(service, stream);

    if(!controls || controls.length === 0){
        return;
    }

    return controls[0]._controller.memName;
}

function echoControl(service, streamId, videoTag, mouseTrack, keyboard) {
    var stream = service.getStreamById(streamId);

    var echoControl = {_ctrlStream: stream, _controller: stream.owner, _service: service};
    controlling(echoControl, videoTag, mouseTrack, keyboard);

    (service.current.__remoteControls || (service.current.__remoteControls = {}))[streamId] = echoControl;
}

function disEchoControl(service, streamId) {
    _util.removeAttribute(service.current.__remoteControls, streamId);
}

var checkTimeout = function(service) {
    if(checkTimeout.timeoutId){
        clearTimeout(checkTimeout.timeoutId);
    }

    checkTimeout.timeoutId = setTimeout(function () {
        checkTimeout(service)
    }, emedia.config.ctrlCheckIntervalMillis);

    if(!service.current){
        return;
    }

    var controls;
    if((controls = service.current.__remoteControls)){ //受控制端，查看 _lastRecvTimestamp
        //_logger.debug("Will check timeout for remote controller.");

        _util.forEach(controls, function (ctrlId, ctrl) {
            if(ctrl.id !== undefined && ctrlId == ctrl.id){
                var now = (new Date()).getTime();
                if(ctrl._lastRecvTimestamp && (now - ctrl._lastRecvTimestamp) > emedia.config.ctrlTimeoutMillis){
                    _logger.warn("Timeout for remote controller. it is ", ctrl.id, ctrl._ctrlStream.id, ctrl._controller.memName);

                    ctrl._free(); //超时清空

                    ctrl._callbacks && ctrl._callbacks.onRemoteFreeControl
                        && ctrl._callbacks.onRemoteFreeControl(ctrl._ctrlStream, ctrl._controller,  ctrl._cId);
                }
            }
        });
    }

    var buffers;
    if((buffers = service.current.__pannelBuffers)){ //控制端 根据是否还存在 这个发布流判断，如果 这个pub流被移除，控制 停止。查看 _lastRspTimestamp
        _util.forEach(buffers, function (_streamId, buffer) { //控制端发送ping
            var stream = service.getStreamById(_streamId);
            if(!stream.located()){
                service.current.message({ // 发送ping
                    op: 1002,
                    memId: stream.owner.id,
                    arg: JSON.stringify({
                        op2: 30,
                        streamId: stream.id,
                        evt: 3,
                        cId: buffer._cId
                    }),
                    _reqOps:[100230]
                }).post(function (rsp) {
                    
                });
            }
        });
    }
}

module.exports = {
    mirrorControlled: mirrorControlled,
    controlled: controlled,
    disControlled: disControlled,

    controlling: controlling,

    graffiti: graffiti,

    echoControl: echoControl,
    disEchoControl: disEchoControl,

    support: support,

    getController: getController
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Mouse");


var MouseTrigger = __webpack_require__(22);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("TotalBuffer");

var EventBuffer = __webpack_require__(28);
var TrackBuffer = __webpack_require__(29);

var MouseTrigger = __webpack_require__(22);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
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

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("Keyboard");


module.exports = _util.prototypeExtend({
    onKeyDown: function (btn) {
        
    },
    
    onKeyUp: function (btn) {
        
    }
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);
var _logger = _util.tagLogger("PCStats");

/**
 * outbound-rtp
 *  bytesSent
 *  packetsSent
 *  qpSum
 *  pliCount
 * inbound-rtp
 *  bytesReceived
 *  framesDecoded
 *  packetsLost
 *  packetsReceived
 *  pliCount
 * track
 *  framesDecoded
 *  framesReceived
 *  framesDropped
 * transport
 *  bytesReceived
 *  bytesSent
 * candidate-pair
 *  bytesReceived
 *  bytesSent
 *  totalRoundTripTime
 *  requestsReceived
 *  responsesSent
 *  requestsSent
 *  responsesReceived
 * local-candidate
 *  networkType
 *  protocol
 *  port
 * remote-candidate
 *  ip
 * codec
 *  clockRate
 *  mimeType
 *
 *
 */

var PCStats;
module.exports = PCStats = _util.prototypeExtend({
    //_webrtc:
    //_stream:

    __init__: function () {
        if(!this._webrtc){
            this._stream && (this._webrtc = this._stream._webrtc);
        }

        this.samplesDatas = {};
        this.gatherResults = {};

        this._bysamples = {};
        if(this._inbound_ !== false){
            this._bysamples["inbound-rtp"] = ["bytesReceived", "framesDecoded", "packetsLost", "packetsReceived", "pliCount"];
        }
        if(this._outbound_ !== false){
            this._bysamples["outbound-rtp"] = ["bytesSent", "packetsSent", "qpSum", "pliCount"];
        }
    },

    onGatherResult: function (trackId, type, subtype, data) {
        _logger.info(trackId, type, subtype, data);
    },

    stats: function (selector) {
        if(!this._webrtc || !this._webrtc._rtcPeerConnection){
            _logger.warn("not found webrtc or peer connection").
            return;
        }

        return this._webrtc._rtcPeerConnection.getStats(selector);
    },

    statsOfTrack: function (selector) {
        if(!selector instanceof window.MediaStreamTrack){
            throw "selector not a MediaStreamTrack";
        }

        return this.stats(selector);
    },

    audioTrack: function (mediaStream) {
        var tracks = mediaStream && mediaStream.getAudioTracks();
        return tracks && tracks.length ? tracks[0] : undefined;
    },

    videoTrack: function (mediaStream) {
        var tracks = mediaStream && mediaStream.getVideoTracks();
        return tracks && tracks.length ? tracks[0] : undefined;
    },

    // samplingTrack: function (track) {
    //     var self = this;
    //
    //     var trackId = track.id;
    //     this.statsOfTrack(track).then(function(_stats){
    //         self._trackSamples[trackId] || (self._trackSamples[trackId] = []);
    //
    //         var statsParms = self._trackSamples[trackId];
    //
    //         _stats.forEach(function(_stat, name){
    //             var samplings = _bysamples[_stat.type];
    //
    //             var tmp;
    //             if(samplings && samplings.length){
    //                 var statParms = (tmp || (tmp = {}))[_stat.type] = {type:_stat.type, timestamp: _stat.timestamp};
    //
    //                 samplings.forEach(function(_param){
    //                     statParms[_param] = _stat[_param];
    //                 });
    //             }
    //             tmp && statsParms.push(tmp);
    //         });
    //     });
    // },

    gatherTrack: function (track, mediaType) {
        var self = this;

        mediaType = track.kind || mediaType;
        mediaType = mediaType && mediaType.toLowerCase();

        var trackId = track.id;
        this.statsOfTrack(track).then(function(_stats){
            self.samplesDatas[trackId] || (self.samplesDatas[trackId] = {});

            var statsParms = self.samplesDatas[trackId];

            _stats.forEach(function(_stat, name){
                var samplings = self._bysamples[_stat.type];

                var statMediaType = _stat.mediaType
                    || (name.indexOf("ideo") >= 0 && "video")
                    || (name.indexOf("udio") >= 0 && "audio")
                    || undefined;

                if(samplings && samplings.length){
                    if(emedia.config._printDebugStats === true){
                        _logger.debug(name, _stat, track, statMediaType, mediaType);
                    }

                    if(!statMediaType || statMediaType === mediaType){
                        var tmp = statsParms[_stat.type] || (statsParms[_stat.type] = {});

                        samplings.forEach(function(_param){
                            var items = (tmp[_param] || (tmp[_param] = []));

                            var item = {timestamp: _stat.timestamp, kind: _stat.mediaType || track.kind || mediaType};
                            item[_param] = _stat[_param];
                            items.push(item);
                        });
                    }
                }
            });
        });
    },

    gatherWebrtcMediaStream: function (_mediaStream, type) {
        var self = this;

        if(!type){
            _mediaStream.getTracks().forEach(function (track) {
                self.gatherTrack(track);
            });
            return;
        }

        if("audio" === type.toLowerCase()){
            _mediaStream.getAudioTracks().forEach(function (track) {
                self.gatherTrack(track, track.kind || type.toLowerCase());
            });
            return;
        }

        if("video" === type.toLowerCase()){
            _mediaStream.getVideoTracks().forEach(function (track) {
                self.gatherTrack(track, track.kind || type.toLowerCase());
            });
            return;
        }
    },

    gatherWebrtc: function () {
        this._webrtc._localStream && this.gatherWebrtcMediaStream(this._webrtc._localStream);
        this._webrtc._remoteStream && this.gatherWebrtcMediaStream(this._webrtc._remoteStream);
    },

    _gather_inbound_rtp_pliCount: function (dataArray) {
        var data = dataArray.shift();
        return data.pliCount;
    },

    _gather: function (type, subtype, dataArray) {
        type = type.replace(/[^\w]/g, "_");
        subtype = subtype.replace(/[^\w]/g, "_");

        var func = _util.list("_gather", type, subtype).join("_");
        if(typeof this[func] === "function"){
            return this[func](dataArray);
        }

        var count = 3;
        if(dataArray.length < count){
            return 0;
        }

        var data = dataArray[count - 1][subtype] - dataArray[0][subtype];
        var time = dataArray[count - 1].timestamp - dataArray[0].timestamp;

        dataArray.shift();

        return (time === 0) ? 0 : (parseFloat(data * 1000 / time).toFixed(2));
    },

    _statsCount: function () {
        var self = this;

        function gatherByTrack() {
            _util.forEach(self.samplesDatas, function (trackId, _samples) {
                var trackGathers = self.gatherResults[trackId] = self.gatherResults[trackId] || {};
                gatherByType(trackId, trackGathers, _samples);
            });
        }

        function gatherByType(trackId, trackGathers, _trackSamples) {
            _util.forEach(_trackSamples, function (type, _data) {
                var typeGathers = (trackGathers[type] || (trackGathers[type] = {}));
                gatherBySubtype(trackId, typeGathers, type, _data);
            });
        }

        function gatherBySubtype(trackId, typeGathers, type, _data) {
            _util.forEach(_data, function (subtype, dataArray) {
                var result = typeGathers[subtype] = self._gather(type, subtype, dataArray);
                self.onGatherResult(trackId, type, subtype, result);
            });
        }

        gatherByTrack();
    },

    gather: function () {
        this.gatherWebrtc();
        this._statsCount();
    },

    intervalGather: function (intervalMillis) {
        this._intervalId && clearInterval(this._intervalId);
        this._intervalId = setInterval(this.gather.bind(this), intervalMillis || 1000);
    },

    stopIntervalGather: function () {
        this._intervalId && clearInterval(this._intervalId);
    }
});

var statsMap = {};
var echo = PCStats.echo = function(easemobStreams){
    _util.forEach(easemobStreams, function (_k, _stream) {
        if(!statsMap[_stream.id]
            && _stream._webrtc
            && !_stream._webrtc.closed
            && _stream.getMediaStream()){

            var pcstats;
            statsMap[_stream.id] = pcstats = new PCStats({_webrtc: _stream._webrtc});
            pcstats._mediaStream = _stream.getMediaStream();
        }else if(statsMap[_stream.id] && (!_stream._webrtc || _stream._webrtc.closed || !_stream.getMediaStream())){
            _util.removeAttribute(statsMap, _stream.id);
        }
    });

    var clearStats = [];
    _util.forEach(statsMap, function (_sid, stats) {
        if(!easemobStreams || !easemobStreams[_sid]){
            clearStats.push(_sid);
        }else{
            stats.gatherWebrtcMediaStream(stats._mediaStream);
            stats._statsCount();
        }
    })

    _util.forEach(clearStats, function (_index, _sid) {
        _util.removeAttribute(statsMap, _sid);
    });
}

PCStats.intervalEcho = function(easemobStreams, intervalMillis){
    return setInterval(function () {
        echo(easemobStreams);
    }, intervalMillis)
}


_util.forEach(["inbound", "outbound"], function (_typeIndex, gatherType) {
    _util.forEach(["Audio", "Video"], function (_trackTypeIndex, trackType) {
        (function (gatherType, trackType) {
            var gatherTrack;
            PCStats[gatherType + trackType] = gatherTrack = function (easemobStream, onNotify, intervalMillis) {
                intervalId && clearInterval(intervalId);

                var intervalId = setInterval(function () {
                    var pcstats = gatherTrack[easemobStream.id];
                    if(!pcstats
                        && easemobStream
                        && easemobStream._webrtc
                        && !easemobStream._webrtc.closed
                        && easemobStream.getMediaStream()){

                        gatherTrack[easemobStream.id] = pcstats = new PCStats({
                            _webrtc: easemobStream._webrtc,
                            _inbound_: gatherType === "inbound",
                            _outbound_: gatherType === "outbound"
                        });
                        onNotify && (pcstats.onGatherResult = onNotify);
                        pcstats._mediaStream = easemobStream.getMediaStream();

                    } else if(pcstats
                        && (!easemobStream
                            || !easemobStream._webrtc
                            || easemobStream._webrtc.closed
                            || !easemobStream.getMediaStream()
                            || !pcstats._mediaStream
                            || pcstats._mediaStream.id !== easemobStream.getMediaStream().id
                        )){
                        _util.removeAttribute(gatherTrack, easemobStream.id);
                        pcstats = null;
                    }

                    if(!pcstats){
                        intervalId && clearInterval(intervalId);
                        return;
                    }

                    pcstats.gatherWebrtcMediaStream(pcstats._mediaStream, trackType);
                    pcstats._statsCount();
                }, intervalMillis);

                return intervalId;
            }
        })(gatherType, trackType);
    });
})

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Util = (__webpack_require__(2).default);
var RTCIQHandler = __webpack_require__(34);
var API = __webpack_require__(35);
var WebRTC = (__webpack_require__(36).default);
var CommonPattern = __webpack_require__(37);

var RouteTo = API.RouteTo;
var Api = API.Api;
var _logger = Util.logger;


var _Call = {
    api: null,
    caller: '',
    connection: null,

    pattern: null,

    listener: {
        onAcceptCall: function (from, options) {
        },

        onRinging: function (caller) {
        },

        onTermCall: function () {
        },

        onIceConnectionStateChange: function (iceState) {
        }
    },

    mediaStreamConstaints: {
        audio: true,
        video: true
    },

    init: function () {
        var self = this;

        if (typeof self.connection === "undefined") {
            throw "Caller need a instance of Easemob.im.Connection"
        }

        self.api = self.api || new Api({
                imConnection: self.connection,

                rtcHandler: new RTCIQHandler({
                    imConnection: self.connection
                })
            });

        self.api.onInitC = function () {
            self._onInitC.apply(self, arguments);
        },

        self.api.onInvite = function(){
            self.listener.onInvite.apply(self, arguments);
        },

        self.api.onIceConnectionStateChange = function () {
            self.listener.onIceConnectionStateChange.apply(self, arguments);
        }
    },

    createConference: function(pwd, _callback){
        var rt = new RouteTo({
            rtKey: ""
        })
        this.api.reqTkt(
            rt, 
            true,
            undefined,
            pwd, 
            function(from, rtcOptions){
                var ticketStr = rtcOptions.ticket
                rtcOptions.conferenceId = rtcOptions.confrId
                _callback && _callback(from, rtcOptions)
        })
    },

    inviteConference: function(confrId, pwd, to, gid, _callback){
        var rt = new RouteTo({
            to: to,
            rtKey: "",
            rtflag: 0
        })
        this.api.invite(
            rt, 
            confrId, 
            pwd, 
            gid,
            function(from, rtcOptions){
                _callback && _callback(from, rtcOptions)
            }
        );
    },

    getConferenceTkt: function(confrId, pwd, _callback){
        var rt = new RouteTo({
            rtKey: ""
        });
        this.api.reqTkt(
            rt,
            false,
            confrId,
            pwd,
            function(from, rtcOptions){
                _callback && _callback(from, rtcOptions)
            }
        );
    },

    makeVideoCall: function (callee, accessSid) {
        var self = this;

        var mediaStreamConstaints = {};
        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
        self.mediaStreamConstaints.video = true;

        this.call(callee, mediaStreamConstaints, accessSid);
    },

    makeVoiceCall: function (callee, accessSid) {
        console.log('ScareCrow');
        var self = this;

        var mediaStreamConstaints = {};
        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
        self.mediaStreamConstaints.video = false;

        self.call(callee, mediaStreamConstaints, accessSid);
    },

    acceptCall: function () {
        var self = this;
        self.pattern.accept();
    },

    endCall: function (callee) {
        var self = this;
        self.caller = '';
        self.pattern.termCall();
    },

    call: function (callee, mediaStreamConstaints, accessSid) {
        var self = this;
        this.callee = this.api.jid(callee);

        var rt = new RouteTo({
            rtKey: "",
            sid: accessSid,

            success: function (result) {
                _logger.debug("iq to server success", result);
            },
            fail: function (error) {
                _logger.debug("iq to server error", error);
                self.onError(error);
            }
        });

        this.api.reqP2P(
            rt,
            mediaStreamConstaints.video ? 1 : 0,
            mediaStreamConstaints.audio ? 1 : 0,
            this.api.jid(callee),
            function (from, rtcOptions) {
                if (rtcOptions.online == "0") {
                    self.listener.onError({message: "callee is not online!"});
                    return;
                }
                self._onGotServerP2PConfig(from, rtcOptions);
                self.pattern.initC(self.mediaStreamConstaints, accessSid);
            });
    },

    _onInitC: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        self.callee = from;
        self._rtcCfg = options.rtcCfg;
        self._WebRTCCfg = options.WebRTC;

        self.sessId = options.sessId;
        self.rtcId = options.rtcId;

        self.switchPattern(options.streamType == "VIDEO" ? "VIDEO" : "VOICE");
        self.pattern._onInitC(from, options, rtkey, tsxId, fromSid);
    },

    _onInvite: function(){

    },

    _onGotServerP2PConfig: function (from, rtcOptions) {
        var self = this;

        if (rtcOptions.result == 0) {
            self._p2pConfig = rtcOptions;
            self._rtcCfg = rtcOptions.rtcCfg;
            self._rtcCfg2 = rtcOptions.rtcCfg2;

            self.sessId = rtcOptions.sessId;
            self.rtcId = "Channel_webIM";

            self._rtKey = self._rtkey = rtcOptions.rtKey || rtcOptions.rtkey;
            self._rtFlag = self._rtflag = rtcOptions.rtFlag || rtcOptions.rtflag;

            self._WebRTCCfg = rtcOptions.WebRTC;
            self.admtok = rtcOptions.admtok;
            self.tkt = rtcOptions.tkt;


            self.switchPattern(self.mediaStreamConstaints.audio && self.mediaStreamConstaints.video ? "VIDEO" : "VOICE");
        } else {
            //
        }
    },

    switchPattern: function (streamType) {
        var self = this;

        (!self._WebRTCCfg) && (self.pattern = new CommonPattern({
            callee: self.callee,

            _p2pConfig: self._p2pConfig,
            _rtcCfg: self._rtcCfg,
            _rtcCfg2: self._rtcCfg2,

            _rtKey: self._rtKey || self._rtkey,
            _rtFlag: self._rtFlag || self._rtflag,

            _sessId: self.sessId,
            _rtcId: self.rtcId,

            webRtc: new WebRTC({
                streamType: streamType,
                subArgs:{
                    subSVideo: "VIDEO" === streamType,
                    subSAudio: true
                },
                onGotLocalStream: self.listener.onGotLocalStream,
                onGotRemoteStream: self.listener.onGotRemoteStream,
                onError: self.listener.onError
            }),

            api: self.api,

            onAcceptCall: (self.listener && self.listener.onAcceptCall) || function () {

            },
            onRinging: (self.listener && self.listener.onRinging) || function () {

            },
            onTermCall: (self.listener && self.listener.onTermCall) || function () {

            },
            onOtherUserOpenVoice: (self.listener && self.listener.onOtherUserOpenVoice) || function () {

            },
            onOtherUserOpenVideo: (self.listener && self.listener.onOtherUserOpenVideo) || function () {

            }
        }));
    }
};


module.exports = function (initConfigs) {
    Util.extend(true, this, _Call, initConfigs || {});

    this.init();
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * IQ Message，IM -> CMServer --> IM
 */

var _util = (__webpack_require__(2).default);
var _logger = _util.logger;
var API = __webpack_require__(35);
var RouteTo = API.RouteTo;

var CONFERENCE_XMLNS = "urn:xmpp:media-conference";


var _RtcHandler = {
    _apiCallbacks: {},

    imConnection: null,

    _connectedSid: '',


    init: function () {
        var self = this;

        var _conn = self.imConnection;

        _conn.registerConfrIQHandler = function(){
            var handleConferenceIQ = function (msginfo) {
                try {
                    self.handleRtcMessage(msginfo);
                } catch (error) {
                    _logger.error(error);
                    //throw error;
                }

                return true;
            };

            _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "set");
            _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "get");

            _logger.warn("Conference iq handler. registered.");
        }
    },

    handleRtcMessage: function (msginfo) {
        var self = this;

        var id = msginfo.getAttribute('id');
        var from = msginfo.getAttribute('from') || '';

        // remove resource
        from.lastIndexOf("/") >= 0 && (from = from.substring(0, from.lastIndexOf("/")));


        var rtkey = msginfo.getElementsByTagName('rtkey')[0].innerHTML;

        var fromSessionId = msginfo.getElementsByTagName('sid')[0].innerHTML;

        (self._fromSessionID || (self._fromSessionID = {}))[from] = fromSessionId;

        var contentTags = msginfo.getElementsByTagName('content');



        var contentString = contentTags[0].innerHTML;

        var content = _util.parseJSON(contentString);

        var rtcOptions = content;

        var streamType = msginfo.getElementsByTagName('stream_type')[0].innerHTML; //VOICE, VIDEO

        if(streamType == ""){
            streamType = "VOICE";
        }

        rtcOptions.streamType = streamType;

        if(rtcOptions.op == 102){
            self.singalStreamType = streamType;
        }


        var tsxId = content.tsxId;

        self.ctx = content.ctx;

        _logger.debug("Recv [op = " + rtcOptions.op + "] [tsxId=" + tsxId + "]\r\n json :", msginfo);


        //if a->b already, c->a/b should be termiated with 'busy' reason
        if (from.indexOf("@") >= 0) {
            if (self._connectedSid == '' && (rtcOptions.op == 102 || rtcOptions.op == 202)) {
                self._connectedSid = fromSessionId;
            } else {
                if (self._connectedSid != fromSessionId) {
                    _logger.debug("Error recv [op = " + rtcOptions.op + "] [tsxId=" + tsxId + "]. caused by _connectedSid != fromSessionId :",
                        self._connectedSid, fromSessionId);

                    //onInitC
                    if (rtcOptions.op == 102) {
                        var rt = new RouteTo({
                            to: from,
                            rtKey: rtkey,
                            sid: fromSessionId,
                            success: function (result) {
                                _logger.debug("iq to server success", result);
                            },
                            fail: function (error) {
                                _logger.debug("iq to server error", error);
                                self.onError(error);
                            }
                        });

                        var options = {
                            data: {
                                op: 107,
                                sessId: rtcOptions.sessId,
                                rtcId: rtcOptions.rtcId,
                                reason: 'busy'

                            },
                            reason: 'busy'
                        };
                        self.sendRtcMessage(rt, options)
                    }
                    return;
                }
            }
        }

        //onTermC
        if (rtcOptions.op == 107) {
            self._connectedSid = '';
            self._fromSessionID = {};

            var reasonObj = msginfo.getElementsByTagName('reason');
            //var endReason = msginfo.getElementsByTagName('reason')[0].innerHTML;
            reasonObj && reasonObj.length > 0 && (rtcOptions.reason = reasonObj[0].innerHTML);
        }

        if (rtcOptions.sdp) {
            if (typeof rtcOptions.sdp === 'string') {
                rtcOptions.sdp = _util.parseJSON(rtcOptions.sdp);
            }
            rtcOptions.sdp.type && (rtcOptions.sdp.type = rtcOptions.sdp.type.toLowerCase());
        }
        if (rtcOptions.cands) {
            if (typeof rtcOptions.cands === 'string') {
                rtcOptions.cands = _util.parseJSON(rtcOptions.cands);
            }

            for (var i = 0; i < rtcOptions.cands.length; i++) {
                if(typeof rtcOptions.cands[i] === 'string'){
                    try{
                        rtcOptions.cands[i] = _util.parseJSON(rtcOptions.cands[i]);
                    }catch(e){
                        rtcOptions.cands[i] = {candidate: rtcOptions.cands[i]}
                    }
                }

                rtcOptions.cands[i].sdpMLineIndex = rtcOptions.cands[i].sdpMLineIndex !== undefined ?
                    rtcOptions.cands[i].sdpMLineIndex : rtcOptions.cands[i].mlineindex;
                rtcOptions.cands[i].sdpMid = rtcOptions.cands[i].sdpMid !== undefined ?
                    rtcOptions.cands[i].sdpMid : rtcOptions.cands[i].mid;

                delete rtcOptions.cands[i].mlineindex;
                delete rtcOptions.cands[i].mid;
            }
        }

        rtcOptions.rtcCfg && (typeof rtcOptions.rtcCfg === 'string') && (rtcOptions.rtcCfg = _util.parseJSON(rtcOptions.rtcCfg));
        rtcOptions.rtcCfg2 && (typeof rtcOptions.rtcCfg2 === 'string') && (rtcOptions.rtcCfg2 = _util.parseJSON(rtcOptions.rtcCfg2));
        rtcOptions.WebRTC && (typeof rtcOptions.WebRTC === 'string') && (rtcOptions.WebRTC = _util.parseJSON(rtcOptions.WebRTC));
        rtcOptions.confrId && (rtcOptions.conferenceId = rtcOptions.confrId)

        if (tsxId && self._apiCallbacks[tsxId]) {
            try {
                self._apiCallbacks[tsxId].callback && self._apiCallbacks[tsxId].callback(from, rtcOptions);
            } catch (err) {
                throw err;
            } finally {
                delete self._apiCallbacks[tsxId]
            }
        } else {
            self.onRecvRtcMessage(from, rtcOptions, rtkey, tsxId, fromSessionId);
        }

        return true;
    },


    onRecvRtcMessage: function (from, rtcOptions, rtkey, tsxId, fromSessionId) {
        _logger.debug(' form : ' + from + " \r\n json :" + _util.stringifyJSON(rtcJSON));
    },

    convertRtcOptions: function (options) {
        var sdp = options.data.sdp;
        if (sdp) {
            var _sdp = {
                type: sdp.type,
                sdp: sdp.sdp
            };

            sdp = _sdp;

            sdp.type = sdp.type.toUpperCase();
            sdp = _util.stringifyJSON(sdp);

            options.data.sdp = sdp;
        }


        var cands = options.data.cands;

        if (cands) {
            if (_util.isArray(cands)) {

            } else {
                var _cands = [];
                _cands.push(cands);
                cands = _cands;
            }

            for (var i in cands) {
                var cand = cands[i];

                if (cand.candidate !== undefined
                    && cand.sdpMLineIndex !== undefined
                    && cand.sdpMid !== undefined) {
                    var _cand = {
                        type: "candidate",
                        candidate: cand.candidate,
                        mlineindex: cand.sdpMLineIndex,
                        mid: cand.sdpMid,
                        // seq: i
                    };

                    cands[i] = _util.stringifyJSON(_cand);
                }
            }

            options.data.cands = cands;
        } else {
            // options.data.cands = [];
        }

        var rtcCfg = options.data.rtcCfg;
        if (rtcCfg) {
            typeof rtcCfg !== 'string' && (options.data.rtcCfg = _util.stringifyJSON(rtcCfg));
        }

        var _webrtc = options.data.WebRTC;
        if (_webrtc) {
            typeof _webrtc !== 'string' && (options.data.WebRTC = _util.stringifyJSON(_webrtc));
        }
    },

    getShortId: function (jid) {
        var begin;
        if((begin = (jid.indexOf('_') + 1)) < 1){
            begin = 0;
        }

        var end;
        if((end = jid.indexOf('@', -1)) < 0){
            end = jid.length;
        }

        return jid.substring(begin, end);
    },

    /**
     * rt: { id: , to: , rtKey: , rtflag: , sid: , tsxId: , type: , }
     *
     * rtcOptions: { data : { op : 'reqP2P', video : 1, audio : 1, peer :
     * curChatUserId, //appKey + "_" + curChatUserId + "@" + this.domain, } }
     *
     */
    sendRtcMessage: function (rt, options, callback) {
        var self = this;

        var _conn = self.imConnection;

        var tsxId = rt.tsxId || _conn.getUniqueId();

        var to = rt.to || _conn.domain;

        var sid = rt.sid || self._fromSessionID && self._fromSessionID[to];
        //sid = sid || ((self._fromSessionID || (self._fromSessionID = {}))[to] = _conn.getUniqueId("CONFR_"));
        sid = sid || _conn.getUniqueId("CONFR_");
        (self._fromSessionID || (self._fromSessionID = {}))[to] = sid;

        if (to.indexOf("@") >= 0) {
            if (self._connectedSid == '' && options.data.op == 102) {
                self._connectedSid = sid;
            }
        }
        var rtKey = rt.rtKey || rt.rtkey;
        // rtKey && delete rt.rtKey;
        rtKey || (rtKey = "");

        var rtflag = rt.rtflag;
        // rtflag && delete rt.rtflag;
        !isNaN(rtflag) || (rtflag = 1);

        options.data || (options.data = {});
        options.data.tsxId = tsxId;

        self.ctx && (options.data.ctx = self.ctx);
        self.convertRtcOptions(options);

        var streamType = options.streamType || self.singalStreamType || "VIDEO"; // "VIDEO"; //VOICE, VIDEO
        if (options.data.op == 102) {
            self.singalStreamType = streamType;
        }


        var id = rt.id || _conn.getUniqueId("CONFR_");
        var iq = $iq({
            // xmlns: CONFERENCE_XMLNS,
            id: id,
            to: to,
            from: _conn.context.jid,
            type: rt.type || "get"
        }).c("query", {
            xmlns: CONFERENCE_XMLNS
        }).c("MediaReqExt").c('rtkey').t(rtKey)
            .up().c('rtflag').t(rtflag)
            .up().c('stream_type').t(streamType)
            .up().c('sid').t(sid)
            .up().c('content').t(_util.stringifyJSON(options.data));

        if (options.data.op == 107 && options.reason) {
            iq.up().c('reason').t(options.reason);
        }
        _logger.debug("Send [op = " + options.data.op + "] : \r\n", iq.tree());


        callback && (
            self._apiCallbacks[tsxId] = {
                callback: callback
            }
        );

        var completeFn = function (result) {
                rt.success(result);
            } || function (result) {
                _logger.debug("send result. op:" + options.data.op + ".", result);
            };

        var errFn = function (ele) {
                rt.fail(ele);
            } || function (ele) {
                _logger.debug(ele);
            };

        if(options.data.op != 202){
            _conn.context.stropheConn.sendIQ(iq.tree(), completeFn, errFn);
        }

        //onTermC
        if (options.data.op == 107 && self._connectedSid) {
            if (!rt.sid || self._connectedSid == rt.sid) {
                self._connectedSid = '';
                self._fromSessionID = {};
            }
        }

        if (options.data.op == 202){
            var msg = _util.list("Invite", self.getShortId(to), "join conference:", options.data.confrId).join(" ");
            var id = _conn.getUniqueId("CONFR_INVITE");                 // 生成本地消息id
            var inviteMessage = $msg({
                xmlns: 'jabber:client',
                id: id,
                type: 'chat',
                to: to,
                from: _conn.context.jid
            }).c('body').t(JSON.stringify({
                data: msg,
                bodies:[
                    {
                        msg: msg,
                        type: "txt"
                    }
                ],
                ext: {
                    conferenceId: options.data.confrId,
                    password: options.data.password,
                    msg_extension: {
                        group_id: options.data.gid,
                        inviter: self.getShortId(_conn.context.jid)
                    }
                },
                from: self.getShortId(_conn.context.jid),
                to: self.getShortId(to)
            }));

            _conn.sendCommand(inviteMessage.tree(), inviteMessage.id);
        }
    }
};


var RTCIQHandler = function (initConfigs) {
    _util.extend(true, this, _RtcHandler, initConfigs || {});

    this.init();
};
module.exports = RTCIQHandler;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * API
 */
var _util = (__webpack_require__(2).default);
var _logger = _util.logger;


var _RouteTo = {
    // to : null,
    // rtKey: null,
    rtFlag: 1,

    success: function (result) {

    },
    fail: function (error) {

    }
};

var RouteTo = function (extendCfg) {
    if (this instanceof RouteTo) {
        var self = this;
        _util.extend(true, self, _RouteTo, extendCfg || {});

    } else {
        var sub = function (extendCfg) {
            var self = this;
            _util.extend(true, self, extendCfg || {});
        };

        _util.extend(true, sub.prototype, _RouteTo, extendCfg || {});

        return sub;
    }
};
exports.RouteTo = RouteTo;


var _clazz = {
    imConnection: null,
    // webRtc: null,

    rtcHandler: null,

    events: {
        '0': 'onReqP2P',
        '1': 'onNewCfr',
        '2': 'onDelCfr',
        '3': 'onReqTkt',

        '100': 'onPing',
        '101': 'onPong',
        '102': 'onInitC',
        '103': 'onReqC',
        '104': 'onAcptC',
        '105': 'onTcklC',
        '106': 'onAnsC',
        '107': 'onTermC',

        // '200' : 'onEnter',
        // '201' : 'onExit',
        '202' : 'onInvite',
        // '203' : 'onGetMems',

        // '205' : 'onSubC',
        // '206' : 'onUsubC',

        '300': 'onEvEnter',
        '301': 'onEvExit',
        '302': 'onEvPub',
        '303': 'onEvUnpub',
        '304': 'onEvMems',
        '204': 'onEvClose',
        '400': 'onStreamControl',
        '401': 'onEvJoin',

        'onServerError': 'onServerError'
    },

    register: function (listener) {
        if (typeof listener === "object") {
            for (var event in listener) {
                this.bind(event, listener[event]);
            }
        }
    },

    bind: function (event, func) {
        var self = this;

        var onFunc;
        if ((onFunc = self.events[event])) {
            self[onFunc] = func;
        } else {
            onFunc = self.events[event] = 'on_' + event;
            self[onFunc] = func;
        }
    },

    jid: function (shortUserName) {
        if(/^.+#.+_.+@.+$/g.test(shortUserName)){
            return shortUserName;
        }
        // if (shortUserName.indexOf(this.imConnection.context.appKey) >= 0) {
        //     return shortUserName;
        // }
        return this.imConnection.context.appKey + "_" + shortUserName + "@" + this.imConnection.domain;
    },

    /**
     * ReqP2P 0
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param video
     *            1 0
     * @param audio
     *            1 0
     * @param peer
     *
     */
    reqP2P: function (rt, video, audio, peer, callback) {
        _logger.debug("req p2p ...");


        var rtcOptions = {
            data: {
                op: 0,
                video: video,
                audio: audio,
                peer: peer // appKey + "_" + curChatUserId + "@" + this.domain,
            }
        };

        this.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * NewCfr 1
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param reqTkt
     *            1 null
     * @param password
     *            string null
     *
     */
    newCfr: function (rt, reqTkt, password, callback) {
        _logger.debug("newCfr ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 1
            }
        };

        reqTkt && (rtcOptions.data.reqTkt = reqTkt);
        password && (rtcOptions.data.password = password);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * Enter 200
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param reqMembers !=
     *            0 members
     * @param tkt
     * @param nonce
     * @param digest
     *
     */
    enter: function (rt, WebRTCId, reqMembers, tkt, nonce, digest, callback) {
        _logger.debug("enter ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 200
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        reqMembers && (rtcOptions.data.reqMembers = reqMembers);
        tkt && (rtcOptions.data.tkt = tkt);
        nonce && (rtcOptions.data.nonce = nonce);
        digest && (rtcOptions.data.digest = digest);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * Ping 100
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     *
     */
    ping: function (rt, sessId, callback) {
        _logger.debug("ping ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 100
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * 通知对方 我已经关闭/打开 麦卡，摄像头
     *
     * PAUSE_VOICE(0, 0), RESUME_VOICE(1, 1), PAUSE_VIDEO(2, 2), RESUME_VIDEO(3, 3)
     *
     *
     * @param rt
     * @param sessId
     * @param rtcId
     * @param controlType
     * @param callback
     */
    streamControl: function (rt, sessId, rtcId, controlType, callback) {
        _logger.debug("streamControl ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 400
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        (typeof controlType !== 'undefined' &&  controlType != null ) && (rtcOptions.data.controlType = controlType);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * ReqTkt 3
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param success(from,
     *            rtcOptions)
     *
     */
    reqTkt: function (rt, isCreate, confrId, password, callback) {
        _logger.debug("reqTkt ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 3
            }
        };

        isCreate && (rtcOptions.data.isCreate = isCreate);
        confrId && (rtcOptions.data.confrId = confrId);
        password && (rtcOptions.data.password = password);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    invite: function (rt, confrId, password, gid, callback) {
        _logger.debug("reqTkt ...");

        var self = this;

        var rtcOptions = {
            data: {
                op:  202
            }
        };

        confrId && (rtcOptions.data.confrId = confrId); // 格式需要跟雅洁确定
        password && (rtcOptions.data.password = password);
        gid && (rtcOptions.data.gid = gid);
        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * InitC 102
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param tkt
     * @param sessId
     * @param rtcId
     * @param pubS
     *            {name: streamName, video:1, audio:1, type: 0}
     * @param subS
     *            {memId: , rtcId: }
     * @param sdp
     *            sdp:sdpstring
     * @param cands [ ]
     *
     */
    initC: function (rt, streamType, WebRTCId, tkt, sessId, rtcId, pubS, subS, sdp, cands, rtcCfg, WebRTC, callback) {
        _logger.debug("initC ...");


        var rtcOptions = {
            data: {
                op: 102
            }
        };

        rtcOptions.streamType = streamType || "VIDEO";

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        tkt && (rtcOptions.data.tkt = tkt);
        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        pubS && (rtcOptions.data.pubS = pubS);
        subS && (rtcOptions.data.subS = subS);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);
        rtcCfg && (rtcOptions.data.rtcCfg = rtcCfg);
        WebRTC && (rtcOptions.data.WebRTC = WebRTC);

        rtcOptions.data.expr = !emedia.supportPRAnswer ? 0 : 1; //Firefox 和 Edge不希望sdk回复 pranswer

        this.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * TcklC 105
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param cands
     * @param success(from,
     *            rtcOptions)
     *
     */
    tcklC: function (rt, sessId, rtcId, sdp, cands, callback) {
        _logger.debug("tcklC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 105
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * AnsC 106
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param sdp
     * @param cands
     *
     */
    ansC: function (rt, sessId, rtcId, sdp, cands, callback, enableVoice, enableVideo) {
        _logger.debug("ansC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 106
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);

        enableVoice === false && (rtcOptions.data.enableVoice = enableVoice);
        enableVideo === false && (rtcOptions.data.enableVideo = enableVideo);



        // rtcOptions.data.enableVoice = false;
        // rtcOptions.data.enableVideo = false;

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * AcptC 104
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param sdp
     * @param ans
     *            1
     *
     */
    acptC: function (rt, sessId, rtcId, sdp, cands, ans, callback, enableVoice, enableVideo) {
        _logger.debug("acptC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 104
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);
        ans && (rtcOptions.data.ans = ans);

        enableVoice === false && (rtcOptions.data.enableVoice = enableVoice);
        enableVideo === false && (rtcOptions.data.enableVideo = enableVideo);

        // rtcOptions.data.enableVoice = false;
        // rtcOptions.data.enableVideo = false;

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * GetMems 203
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param sessId
     * @param success(from,
     *            rtcOptions)
     *
     */
    getMems: function (rt, WebRTCId, sessId, callback) {
        _logger.debug("getMems ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 203
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        sessId && (rtcOptions.data.sessId = sessId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * SubC 205
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param subS
     *            {memId:m001, rtcId:r001}
     *
     */
    subC: function (rt, sessId, rtcId, subS, callback) {
        _logger.debug("subC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 205
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        subS && (rtcOptions.data.subS = subS);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * UsubC 206
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     *
     */
    usubC: function (rt, sessId, rtcId, callback) {
        _logger.debug("usubC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 206
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * TermC 107
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param reason
     *               "ok"      -> 'HANGUP'     "success" -> 'HANGUP'   "timeout"          -> 'NORESPONSE'
     *               "decline" -> 'REJECT'     "busy"    -> 'BUSY'     "failed-transport" -> 'FAIL'
     *
     */
    termC: function (rt, sessId, rtcId, reason, callback) {
        _logger.debug("termC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 107
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        reason && (rtcOptions.reason = reason);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * Exit 201
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param sessId
     * @param success(from,
     *            rtcOptions)
     *
     */
    exit: function (rt, WebRTCId, sessId, callback) {
        _logger.debug("exit ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 201
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        sessId && (rtcOptions.data.sessId = sessId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * DelCfr 2
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param admtok
     * @param success(from,
     *            rtcOptions)
     *
     */
    delCfr: function (rt, WebRTCId, admtok, callback) {
        _logger.debug("delCfr ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 2
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        admtok && (rtcOptions.data.admtok = admtok);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    }
};

exports.Api = function (initConfigs) {
    var self = this;

    _util.extend(true, this, _clazz, initConfigs || {});


    function _onRecvRtcMessage(from, rtcOptions, rtkey, tsxId, fromSessionId) {
        if (rtcOptions.result != 0 && self['onServerError']) {
            self['onServerError'].call(self, from, rtcOptions, rtkey, tsxId, fromSessionId);
        } else {
            var onFunction;

            if (self.events[rtcOptions.op] && (onFunction = self[self.events[rtcOptions.op]])) {
                onFunction.call(self, from, rtcOptions, rtkey, tsxId, fromSessionId);
            } else {
                _logger.info("can not handle(recvRtcMessage) the op: " + rtcOptions.op, rtcOptions);
            }
        }
    }

    this.rtcHandler.onRecvRtcMessage = _onRecvRtcMessage;
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var easemob_emedia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var easemob_emedia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(easemob_emedia__WEBPACK_IMPORTED_MODULE_0__);


easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.AVPubstream = easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Service"].prototype.AVPubstream;

easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype._openCamera = function(){
    easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Service"].prototype._openCamera.apply(this, arguments);
}
easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.__getUserMedia = function(){
    easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Service"].prototype.__getUserMedia.apply(this, arguments);
}
easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.__controlStream = function(){
    easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Service"].prototype.__controlStream.apply(this, arguments);
}

//callback (rtc, stream)
var createMedia;
easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.createMedia = createMedia = function(constaints, callback){
    var self = this;

    var mediaStream = new MediaStream();

    function __callback() {
        if(--__callback.count === 0){
            WebIM.__alreadyOpenMedias.push(mediaStream);
            callback && callback(self, mediaStream);
        }
    }

    function __cloneTrack(destStream) {
        destStream && destStream.getTracks().forEach(function(track) {
            mediaStream.addTrack(track);
        });
    }

    var audio = !constaints || constaints.audio;
    var video = !constaints || constaints.video;

    if(!audio && !video){
        __callback.count = 0;
        return __callback();
    }

    if(!!audio && !!video){ //两个true
        __callback.count = 2;
        createMedia.call(this, {video: constaints.video, audio: false}, function (obj, stream) {
            __cloneTrack(stream);
            __callback();
        });
        createMedia.call(this, {video: false, audio: constaints.audio}, function (obj, stream) {
            __cloneTrack(stream);
            __callback();
        });

        return;
    }

    __callback.count = 1;

    var pubS = new self.AVPubstream({
        constaints: constaints
    });

    var openUserMedia = easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Service"].prototype.openUserMedia.bind(this);
    openUserMedia(pubS).then(function (_service, stream) {
        __cloneTrack(stream);
        __callback();
    }, function fail(evt) {
        __callback();
        easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["util"].logger.debug('[WebRTC-API] getUserMedia() error: ', evt);

        if(typeof evt.message === 'function'){
            evt.message = evt.message();
        }else if(typeof evt.message === 'string' && evt.message !== ""){
            evt.message = evt.message;
        }else{
            evt.message = "open media error. " + evt.name;
        }

        evt.message = evt.message + " when get " + (video ? "carma" : "microphone");

        self.onError(evt);
    });
}

easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.setLocalVideoSrcObject = function (stream) {
    var self = this;

    self._localStream = stream;

    self.onGotLocalStream(stream, this.streamType);
    self.setLocalStream(stream);

    easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["util"].logger.debug('[WebRTC-API] you can see yourself !');
}

var _setRemoteDescription = easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.setRemoteDescription;
easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"].prototype.setRemoteDescription = function (desc) {
    var self = this;

    if(self.streamType === "VOICE"){ //将remote sdp中 video中改为 a=mid:video -》 a=sendrecv|a=sendonly--recvonly
        function videoSectionReplace(regx, use) {
            var videoSectionIndex = desc.sdp.indexOf("m=video");
            var audioSectionIndex = desc.sdp.indexOf("m=audio");
            var end = audioSectionIndex > videoSectionIndex ? audioSectionIndex : desc.sdp.length;

            desc.sdp = desc.sdp.replace(regx, function (match, offset, string) {
                if(offset >= videoSectionIndex && offset < end){
                    return use;
                }else{
                    return match;
                }
            });
        }

        videoSectionReplace(/a=sendrecv|a=sendonly/g, "a=inactive");
    }
    return _setRemoteDescription.call(self, desc);
}


/* harmony default export */ __webpack_exports__["default"] = (easemob_emedia__WEBPACK_IMPORTED_MODULE_0__["Webrtc"]);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * P2P
 */
var _util = (__webpack_require__(2).default);
var RouteTo = __webpack_require__(35).RouteTo;
var _logger = _util.logger;


var P2PRouteTo = RouteTo({
    success: function (result) {
        _logger.debug("iq to server success", result);
    },
    fail: function (error) {
        _logger.debug("iq to server error", error);
    }
});


var CommonPattern = {
    _pingIntervalId: null,
    _p2pConfig: null,
    _rtcCfg: null,
    _rtcCfg2: null,
    _rtKey: null,
    _rtFlag: null,


    webRtc: null,
    api: null,

    callee: null,


    isCaller: false,
    accepted: false,

    setLocalSDP: false,
    setRemoteSDP: false,

    hangup: false,


    init: function () {
        var self = this;

        self.api.onPing = function () {
            self._onPing.apply(self, arguments);
        };
        self.api.onTcklC = function () {
            self._onTcklC.apply(self, arguments);
        };
        self.api.onAcptC = function () {
            self._onAcptC.apply(self, arguments);
        };
        self.api.onAnsC = function () {
            self._onAnsC.apply(self, arguments);
        };
        self.api.onTermC = function () {
            self._onTermC.apply(self, arguments);
        };
        self.api.onEvJoin = function() {
            self._onEvJoin.apply(self, arguments);
        };
        self.api.onStreamControl = function() {
            self._onStreamControl.apply(self, arguments);
        };
        self.webRtc.onIceCandidate = function () {
            self._onIceCandidate.apply(self, arguments);
        };
        self.webRtc.onIceStateChange = function () {
            self._onIceStateChange.apply(self, arguments);
        };
    },

    _ping: function () {
        var self = this;

        var index = 0;

        function ping() {
            var rt = new P2PRouteTo({
                to: self.callee,
                rtKey: self._rtKey
            });

            self.api.ping(rt, self._sessId, function (from, rtcOptions) {
                _logger.debug("ping result", rtcOptions);

            });
            // self.api.streamControl(rt, self._sessId, "rtcId", (index++) % 4, function (from, rtcOptions) {
            //     _logger.debug("streamControl result", rtcOptions);
            //
            // });
        }

        self._pingIntervalId = window.setInterval(ping, 50000);
    },

    _onPing: function (from, options, rtkey, tsxId, fromSid) {
        _logger.debug('_onPing from', fromSid);
    },

    initC: function (mediaStreamConstaints, accessSid) {
        var self = this;
        self.sid = accessSid;

        self.isCaller = true;
        self.accepted = false;
        self.setLocalSDP = false;
        self.setRemoteSDP = false;
        self.hangup = false;

        self.streamType = mediaStreamConstaints.audio && mediaStreamConstaints.video ? "VIDEO" : "VOICE";

        self.createLocalMedia(mediaStreamConstaints);
    },

    createLocalMedia: function (mediaStreamConstaints) {
        var self = this;

        this.webRtc.createMedia(mediaStreamConstaints, function (webrtc, stream) {
            self.webRtc.createRtcPeerConnection(self._rtcCfg);

            webrtc.setLocalVideoSrcObject(stream);

            self.webRtc.createOffer(function (offer) {
                self._onGotWebRtcOffer(offer);
            });
        });
    },

    _onGotWebRtcOffer: function (offer) {
        var self = this;

        var rt = new P2PRouteTo({
            sid: self.sid,
            to: self.callee,
            rtKey: self._rtKey
        });

        self.api.initC(rt, self.streamType, null, null, self._sessId, self._rtcId, null, null, offer, null, self._rtcCfg2, null, function (from, rtcOptions) {
            _logger.debug("initc result", rtcOptions);
        });

        self.setLocalSDP = true;

        self._ping();
    },

    _onAcptC: function (from, options) {
        var self = this;

        if (options.ans && options.ans == 1) {
            _logger.info("[WebRTC-API] _onAcptC : 104, ans = 1, it is a answer. will onAcceptCall");
            self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
            self._onAnsC(from, options);
        } else if (!WebIM.WebRTC.supportPRAnswer) {
            _logger.info("[WebRTC-API] _onAcptC : not supported pranswer. drop it. will onAcceptCall");

            self.setRemoteSDP = false;
            self._handRecvCandsOrSend(from, options);

            self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
        } else {
            _logger.info("[WebRTC-API] _onAcptC : recv pranswer. ");

            if (options.sdp || options.cands) {
                // options.sdp && (options.sdp.type = "pranswer");
                options.sdp && self.webRtc.setRemoteDescription(options.sdp);

                self.setRemoteSDP = true;
                self._handRecvCandsOrSend(from, options);

                self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
            }
        }
    },

    _onEvJoin: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        _logger.debug('_onEvJoin from', fromSid, from);

        self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
    },

    onAcceptCall: function (from, options, enableVoice, enableVideo) {

    },

    __onVoiceOrVideo: function(from, options, fromSid){
        var self = this;

        options.enableVoice === false ? (self.onOtherUserOpenVoice(from, false)) : (self.onOtherUserOpenVoice(from, true));
        options.enableVideo === false ? (self.onOtherUserOpenVideo(from, false)) : (self.onOtherUserOpenVideo(from, true));
    },

    /*
     * { verison : MSYNC_V1, compress_algorimth : 0, command : SYNC, payload : { meta : { id : 2326, to : easemob-demo#chatdemoui_xyj002@easemob.com, ns : CONFERENCE, payload : { session_id : xyj0011494320598055, operation : MEDIA_REQUEST, peer_name : xyj001, route_flag : 1, route_key : --X--, content : {"op":400,"callVersion":"2.0.0","sessId":"128542826909667328","rtcId":"Channel1494320598056","tsxId":"1494320622866-6","controlType":0}, control_type : PAUSE_VOICE } } } }
     * PAUSE_VOICE(0, 0), RESUME_VOICE(1, 1), PAUSE_VIDEO(2, 2), RESUME_VIDEO(3, 3)
     *
     */
    _onStreamControl: function (from, options, rtkey, tsxId, fromSid){
        var self = this;
        var controlType = options.controlType;

        controlType === 0 && (self.onOtherUserOpenVoice(from, false));
        controlType === 1 && (self.onOtherUserOpenVoice(from, true));
        controlType === 2 && (self.onOtherUserOpenVideo(from, false));
        controlType === 3 && (self.onOtherUserOpenVideo(from, true));

        self.onStreamControl(from, options, rtkey, tsxId, fromSid);
    },
    onStreamControl: function (from, options, rtkey, tsxId, fromSid){

    },

    onOtherUserOpenVoice: function (from, opened){
        _logger.debug("from open:", opened, " voice .", from)
    },
    onOtherUserOpenVideo: function (from, opened){
        _logger.debug("from open:", opened, " voideo .", from)
    },


    _onAnsC: function (from, options) { // answer
        var self = this;

        _logger.info("[WebRTC-API] _onAnsC : recv answer. ");

        self.accepted = true;

        options.sdp && self.webRtc.setRemoteDescription(options.sdp);

        self.setRemoteSDP = true;
        self._handRecvCandsOrSend(from, options);


        self.__onVoiceOrVideo(from, options);
    },


    _onInitC: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        self.isCaller = false;
        self.accepted = false;
        self.setLocalSDP = false;
        self.setRemoteSDP = false;
        self.hangup = false;

        self.callee = from;
        self._rtcCfg2 = options.rtcCfg;
        self._rtKey = rtkey;
        self._tsxId = tsxId;
        self._fromSid = fromSid;

        self._rtcId = options.rtcId;
        self._sessId = options.sessId;

        self.streamType = options.streamType;

        self.webRtc.createRtcPeerConnection(self._rtcCfg2);

        self.callerNotPranswer = (options.expr === 0);
        _logger.warn("caller not pranswer ", self.callerNotPranswer);

        options.sdp && _logger.debug(options.sdp.sdp);

        options.sdp && (self.webRtc.setRemoteDescription(options.sdp).then(function () {

            self.setRemoteSDP = true;
            self._handRecvCandsOrSend(from, options);

            /*
             * chrome 版本 大于 50时，可以使用pranswer。
             * 小于50 不支持pranswer，此时处理逻辑是，直接进入振铃状态
             *
             */
            if (WebIM.WebRTC.supportPRAnswer) {
                self.webRtc.createPRAnswer(function (prAnswer) {
                    self._onGotWebRtcPRAnswer(prAnswer);

                    setTimeout(function () { //由于 chrome 在 pranswer时，ice状态只是 checking，并不能像sdk那样 期待 connected 振铃；所以目前改为 发送完pranswer后，直接振铃
                        _logger.info("[WebRTC-API] onRinging : after send pranswer. ", self.callee);
                        self.onRinging(self.callee, self.streamType);
                    }, 500);
                });
            } else {
                setTimeout(function () {
                    _logger.info("[WebRTC-API] onRinging : After iniC, cause by: not supported pranswer. ", self.callee);
                    self.onRinging(self.callee, self.streamType);
                }, 500)
                self._ping();
            }
        }));
    },


    _onGotWebRtcPRAnswer: function (prAnswer) {
        var self = this;

        var rt = new P2PRouteTo({
            //tsxId: self._tsxId,
            to: self.callee,
            rtKey: self._rtKey
        });

        //self.api.acptC(rt, self._sessId, self._rtcId, prAnswer, null, 1);
        self.api.acptC(rt, self._sessId, self._rtcId, prAnswer);

        self.setLocalSDP = true;
        self._handRecvCandsOrSend();

        self._ping();
    },

    onRinging: function (caller, streamType) {
    },

    accept: function () {
        var self = this;

        function createAndSendAnswer() {
            _logger.info("createAndSendAnswer : ...... ");

            self.webRtc.createAnswer(function (answer) {
                var rt = new P2PRouteTo({
                    //tsxId: self._tsxId,
                    to: self.callee,
                    rtKey: self._rtKey
                });

                if (WebIM.WebRTC.supportPRAnswer) {
                    if(self.webRtc.isConnected() || self.callerNotPranswer){
                        _logger.info("[WebRTC-API] ice connected or caller not pranswer, may send answer");
                        self.api.ansC(rt, self._sessId, self._rtcId, answer);
                    }else{
                        _logger.info("[WebRTC-API] ice state not connected, send answer waiting.");
                        self.webRtc._hookWhenICEReady = function () {
                            _logger.info("[WebRTC-API] ice connected, send answer");
                            self.api.ansC(rt, self._sessId, self._rtcId, answer);
                        }
                    }
                } else {
                    self.api.acptC(rt, self._sessId, self._rtcId, answer, null, 1);
                }

                if (!WebIM.WebRTC.supportPRAnswer) {
                    self.setLocalSDP = true;
                }
                self._handRecvCandsOrSend();

                self.accepted = true;
            });
        }

        var constaints = {
            audio: true
        };
        if(self.streamType == "VIDEO"){
            constaints.video = true;
        }

        self.webRtc.createMedia(constaints, function (webrtc, stream) {
            webrtc.setLocalVideoSrcObject(stream);

            createAndSendAnswer();
        });
    },

    _handRecvCandsOrSend: function (from, options) {
        var self = this;

        setTimeout(function () {
            self._onTcklC(from, options);
        }, 50);

        setTimeout(function () {
            self._onIceCandidate();
        }, 50);
    },

    _onTcklC: function (from, options) { // setRemoteSDP，才可以添加 添加 对方 cands
        var self = this;

        // options.sdp && self.webRtc.setRemoteDescription(options.sdp);

        if (self.setRemoteSDP) {
            _logger.info("[WebRTC-API] recv and add cands.");

            self._recvCands && self._recvCands.length > 0 && self.webRtc.addIceCandidate(self._recvCands);
            self._recvCands && self._recvCands.length > 0 && (self._recvCands = []);
            options && options.cands && self.webRtc.addIceCandidate(options.cands);
        } else if (options && options.cands && options.cands.length > 0) {
            for (var i = 0; i < options.cands.length; i++) {
                (self._recvCands || (self._recvCands = [])).push(options.cands[i]);
            }
            _logger.debug("[_onTcklC] temporary memory[recv] ice candidate. util setRemoteSDP = true");
        }
    },

    _onIceStateChange: function (iceState) {
        var self = this;
        _logger.debug("[WebRTC-API] ice state is " + iceState);

        if(self.webRtc.isConnected()){ //出发hook
            self.webRtc._hookWhenICEReady && self.webRtc._hookWhenICEReady();
            self.webRtc._hookWhenICEReady = undefined;
        }

        if(iceState === "closed"){
            self.setLocalSDP = false;
            self.setRemoteSDP = false;
        }

        self.api.onIceConnectionStateChange(iceState);
    },

    _onIceCandidate: function (_candidate) { //在本地sdp set 发送完成后，发送 cands
        var self = this;

        if (self.setLocalSDP) {
            function sendIceCandidate(candidate) {
                _logger.debug("send ice candidate...");

                var rt = new P2PRouteTo({
                    to: self.callee,
                    rtKey: self._rtKey
                });

                if (candidate) {
                    self.api.tcklC(rt, self._sessId, self._rtcId, null, candidate);
                }
            }

            if (self._cands && self._cands.length > 0) {

                sendIceCandidate(self._cands);

                self._cands = [];
            }
            _candidate && sendIceCandidate(_candidate);
        } else {
            _candidate && (self._cands || (self._cands = [])).push(_candidate);
            _logger.debug("[_onIceCandidate] temporary memory[send] ice candidate. util setLocalSDP = true");
        }
    },


    __termCall1: function (reason) {
        var self = this;

        self._pingIntervalId && window.clearInterval(self._pingIntervalId);

        var rt = new P2PRouteTo({
            to: self.callee,
            rtKey: self._rtKey
        });

        var sendReason;
        reason || (!self.isCaller && !self.accepted && (sendReason = 'decline')) || (sendReason = 'success');

        self.hangup || self.api.termC(rt, self._sessId, self._rtcId, sendReason);

        self.webRtc.close();

        self.hangup = true;

        self.setLocalSDP = false;
        self.setRemoteSDP = false;

        self.onTermCall(reason);
    },

    termCall: function (reason) {
        var self = this;
        try{
            self.__termCall1(reason);
        }finally{
            if(WebIM.__alreadyOpenMedias && WebIM.__alreadyOpenMedias.length > 0){
                for(var index in WebIM.__alreadyOpenMedias){
                    var stream = WebIM.__alreadyOpenMedias[index];
                    try{
                        emedia.stopTracks(stream);
                    }catch(e){

                    }
                }

                WebIM.__alreadyOpenMedias = [];
            }
        }
    },

    /**
     *
     * @param from
     * @param options
     * @param options.reason
     *               "ok"      -> 'HANGUP'     "success" -> 'HANGUP'   "timeout"          -> 'NORESPONSE'
     *               "decline" -> 'REJECT'     "busy"    -> 'BUSY'     "failed-transport" -> 'FAIL'
     * @private
     */
    _onTermC: function (from, options) {
        _logger.debug("[_onTermC] options.reason = " + options.reason);

        var self = this;

        self.hangup = true;

        self.setLocalSDP = false;
        self.setRemoteSDP = false;

        self.termCall(options.reason);

    },

    onTermCall: function () {
        //to be overwrited by call.listener.onTermCall
    }
};

module.exports = function (initConfigs) {
    var self = this;

    _util.extend(true, this, CommonPattern, initConfigs || {});

    self.init();
};

/**
 * TODO: Conference
 */


/***/ })
/******/ ]);