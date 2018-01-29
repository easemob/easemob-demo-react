/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	//console.  emedia.__easemob_current_mservice.current

	window.emedia = window.emedia || {};

	;(function (root, factory) {
	    'use strict';

	    if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
	        module.exports = factory();
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.emedia = factory();
	    }
	})(this, function () {
	    'use strict';

	    return emedia;
	});

	var util = emedia.util = __webpack_require__(5);

	(function requireWebrtcAdapter() {
	    var adapter = __webpack_require__(6);
	    emedia.browser = adapter.__browser; // firefox chrome safari IE
	    emedia.browserVersion = adapter.__browserVersion;
	})();
	util.logger.info("Current browser", emedia.browser, emedia.browserVersion);

	emedia.config = function (cfg) {
	    cfg = util.extend({}, cfg);

	    for (var key in cfg) {
	        emedia.config[key] = cfg[key];
	        if (key === "logLevel") {
	            emedia.LOG_LEVEL = cfg[key];
	        }
	    }
	};

	emedia.config({
	    autoSub: true,

	    onlyEnter: false,

	    reconnect: 13, //重连次数
	    reconnectDelay: 3000, //重连间隔 毫秒

	    getCopyIntervalMillis: 17000,
	    checkConnectIntervalMillis: 1000,

	    iceRebuildCount: 3,
	    iceRebuildIntervalMillis: 500,

	    enterTimeout: 20000
	});

	var Service = __webpack_require__(48);
	var __event = __webpack_require__(50);

	emedia.Service = Service;

	emedia.event = __event;

	emedia.LOG_LEVEL = 0;

	emedia.isFirefox = 'firefox' === emedia.browser;
	emedia.isChrome = 'chrome' === emedia.browser;
	emedia.isSafari = 'safari' === emedia.browser;

	emedia.isWebRTC = (emedia.isFirefox || emedia.isChrome || emedia.isSafari) && /^https\:$/.test(window.location.protocol);

	/**
	 * 判断是否支持pranswer
	 */
	if (emedia.isChrome || emedia.isSafari) {
	    emedia.supportPRAnswer = true;
	}
	//WebIM.WebRTC.supportPRAnswer = false;


	emedia.config({
	    baseAcptOps: [107, 300, 302, 303, 304, 301, 204, 206, 400, 401, 1001, 100201, 100202, 100203]
	    // baseAcptOps: [107, 300, 302, 303, 304, 301, 204, 206, 400, 401, 1001]
	});
	emedia.config({
	    clientType: 'WEB',
	    version: '1.1.4',

	    userAgent: navigator.userAgent,

	    acptOps: [1003 //透传消息
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	        var chars = CHARS,
	            uuid = [],
	            i;
	        radix = radix || chars.length;

	        if (len) {
	            // Compact form
	            for (i = 0; i < len; i++) {
	                uuid[i] = chars[0 | Math.random() * radix];
	            }
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
	                    uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
	                }
	            }
	        }

	        return uuid.join('');
	    };

	    // A more performant, but slightly bulkier, RFC4122v4 solution. We boost
	    // performance
	    // by minimizing calls to random()
	    Math.uuidFast = function () {
	        var chars = CHARS,
	            uuid = new Array(36),
	            rnd = 0,
	            r;
	        for (var i = 0; i < 36; i++) {
	            if (i == 8 || i == 13 || i == 18 || i == 23) {
	                uuid[i] = '-';
	            } else if (i == 14) {
	                uuid[i] = '4';
	            } else {
	                if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
	                r = rnd & 0xf;
	                rnd = rnd >> 4;
	                uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
	            }
	        }
	        return uuid.join('');
	    };

	    // A more compact, but less performant, RFC4122v4 solution:
	    Math.uuidCompact = function () {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,
	                v = c == 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    };
	})();

	/**
	 * Util
	 *
	 * @constructor
	 */
	function Util() {}

	/**
	 * Function Logger
	 *
	 * @constructor
	 */
	var Logger = function Logger(tag) {
	    var self = this;

	    var LogLevel = {
	        TRACE: 0,
	        DEBUG: 1,
	        INFO: 2,
	        WARN: 3,
	        ERROR: 4,
	        FATAL: 5
	    };

	    var LogLevelName = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];

	    this.log = function () {
	        var level = arguments[0];

	        level = arguments[0] = LogLevelName[level];

	        console.log.apply(console, arguments);
	    };

	    function callLog(level, args) {
	        if (emedia && emedia.LOG_LEVEL && level < emedia.LOG_LEVEL) {
	            return;
	        }

	        var _args = [];

	        _args.push(level);
	        _args.push(tag || "");

	        for (var i = 0; i < args.length; i++) {
	            _args.push(args[i]);
	        }

	        //_args.caller && _args.push(_args.caller);

	        self.log.apply(self, _args);
	    };

	    this.trace = function () {
	        this.log && callLog(LogLevel.TRACE, arguments);
	    };

	    this.debug = function () {
	        this.log && callLog(LogLevel.DEBUG, arguments);
	    };

	    this.info = function () {
	        this.log && callLog(LogLevel.INFO, arguments);
	    };

	    this.warn = function () {
	        this.log && callLog(LogLevel.WARN, arguments);
	    };

	    this.error = function () {
	        this.log && callLog(LogLevel.ERROR, arguments);
	    };

	    this.fatal = function () {
	        this.log && callLog(LogLevel.FATAL, arguments);
	    };
	};

	Util.prototype.logger = new Logger();

	Util.prototype.tagLogger = function (tag) {
	    return new Logger(tag);
	};

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
	    if (!obj || (objectString = toString.call(obj)) !== "[object Object]" || obj.toString() === "<JSAPI-Auto Javascript Object>" || obj.toString() === "[object IFBComJavascriptObject]") {
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
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	};

	/**
	 * Function extend
	 *
	 * @returns {*|{}}
	 */
	Util.prototype.extend = function () {
	    var self = this;
	    var options,
	        name,
	        src,
	        copy,
	        copyIsArray,
	        clone,
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
	    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !self.isFunction(target)) {
	        target = {};
	    }

	    // Extend self itself if only one argument is passed
	    if (i === length) {
	        target = this;
	        i--;
	    }

	    for (; i < length; i++) {

	        // Only deal with non-null/undefined values
	        if ((options = arguments[i]) != null) {

	            // Extend the base object
	            for (name in options) {
	                src = target[name];
	                copy = options[name];

	                // Prevent never-ending loop
	                if (target === copy) {
	                    continue;
	                }

	                // Recurse if we're merging plain objects or arrays
	                if (deep && copy && (self.isPlainObject(copy) || (copyIsArray = self.isArray(copy)))) {

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
	};

	Util.prototype.removeAttribute = function (elem, key) {
	    var obj = elem[key];

	    delete elem[key];

	    return obj;
	};

	Util.prototype.prototypeExtend = Util.prototype.classExtend = function () {
	    var self = this;

	    function _Obj__() {
	        for (var i = 0; i < arguments.length; i++) {
	            var cfg = arguments[i] || {};
	            self.extend(true, this, cfg);
	        }

	        this.__init__ && this.__init__();
	    }

	    for (var i = 0; i < arguments.length; i++) {
	        var cfg = arguments[i] || {};
	        if (typeof cfg === "function") {
	            cfg = cfg.prototype;
	        }

	        self.extend(true, _Obj__.prototype, cfg);
	    }

	    _Obj__.extend || (_Obj__.extend = function (_prototypeExtend) {
	        return self.prototypeExtend(_Obj__, _prototypeExtend);
	    });

	    return _Obj__;
	};

	/*
	Util.prototype.prototypeExtend = Util.prototype.classExtend = function(){
	    var self = this;

	    function _Obj__(){
	        for(var i = 0; i < arguments.length; i++){
	            var cfg = arguments[i] || {};
	            self.extend(true, this, cfg);
	        }

	        this.__init__ && this.__init__();
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
	*/

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
	};

	Util.prototype.toggleClass = function (node, className) {
	    if (node.hasClass(className)) {
	        node.removeClass(className);
	        return;
	    }
	    node.addClass(className);
	};

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
	};

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
	};

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
	};

	/**
	 * function(index, value){

	}
	 * @param obj
	 */
	Util.prototype.forEach = function (obj, func) {
	    if (!obj || this.isEmptyObject(obj)) {
	        return;
	    }

	    obj = obj || {};

	    var copy = this.extend(false, {}, obj);

	    for (var index in copy) {
	        func(index, obj[index]);
	    }
	};

	module.exports = new Util();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var adapter = __webpack_require__(7); //6.0.3
	// var adapter = require('./adapter'); //6.0.3

	adapter.__browser = adapter.__browser || adapter.browserDetails.browser; // firefox chrome safari
	adapter.__browserVersion = adapter.__browserVersion || adapter.browserDetails.version;

	console && console.warn("Current browser", adapter.__browser, adapter.__browserVersion);

	if ("Not a supported browser." === adapter.__browser) {
	    throw "Not a supported browser";
	}

	module.exports = adapter;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (typeof Promise === 'undefined') {
	    window.Promise = __webpack_require__(8);
	}

	var adapter = __webpack_require__(47); //6.0.3

	adapter.__browser = adapter.webrtcDetectedBrowser;
	adapter.__browserVersion = adapter.webrtcDetectedVersion;

	// window.onPluginNeededButNotInstalled = function () {
	//     alert("插件未安装");
	// }
	// if(window.onPluginNeededButNotInstalled){
	//     // window.AdapterJS = {};
	//     // window.AdapterJS.WebRTCPlugin = {};
	//     adapter.WebRTCPlugin.pluginNeededButNotInstalledCb = window.onPluginNeededButNotInstalled;
	// }
	adapter.onwebrtcready = function (isUsingPlugin) {
	    if (adapter.webrtcDetectedType === 'plugin') {
	        readyScreenShare && readyScreenShare(adapter);
	        promiseApiWrapper(adapter);
	        simulateScreenSharePlugin(adapter);
	    }
	};

	module.exports = adapter;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	window.attachMediaStream || (window.attachMediaStream = function (element, stream) {
	    element.srcObject = stream;
	    return element;
	});
	window.reattachMediaStream || (window.reattachMediaStream = function (to, from) {
	    to.srcObject = from.srcObject;
	    return to;
	});

	function promiseApiWrapper(adapter) {
	    if (typeof window.RTCPeerConnection === 'undefined') {
	        return;
	    }

	    var _NativeRTCPeerConnection = RTCPeerConnection;

	    window.RTCPeerConnection = function (pcConfig, pcConstraints) {
	        var self = this;
	        self._nativeRTCPeerConnection = new _NativeRTCPeerConnection(pcConfig, pcConstraints);

	        self._nativeRTCPeerConnection.onicecandidate = function (event) {
	            self.onicecandidate(event);
	        };

	        self._nativeRTCPeerConnection.onicestatechange = function (event) {
	            self.onicestatechange(event);
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

	    ['createOffer', 'createAnswer'].forEach(function (method) {
	        window.RTCPeerConnection.prototype[method] = function () {
	            var self = this;

	            var pc = self._nativeRTCPeerConnection;
	            var args = arguments;

	            var isLegacyCall = arguments.length && typeof arguments[0] === 'function';

	            if (isLegacyCall) {
	                var obj = pc[method](args[0], rgs[1], arguments[2]);
	                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;

	                return obj;
	            }

	            return new Promise(function (resolve, reject) {
	                pc[method](resolve, reject, args[0]);
	                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;
	            });
	        };
	    });

	    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
	        window.RTCPeerConnection.prototype[method] = function () {
	            var self = this;

	            var pc = self._nativeRTCPeerConnection;
	            var args = arguments;

	            var isLegacyCall = arguments.length && typeof arguments[0] === 'function';

	            if (isLegacyCall) {
	                var obj = pc[method](args[0], rgs[1], arguments[2]);
	                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;

	                return obj;
	            }

	            return new Promise(function (resolve, reject) {
	                pc[method](args[0], resolve, reject);
	                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;
	            });
	        };
	    });
	}

	function readyScreenShare(adapter) {
	    var baseGetUserMedia = window.navigator.getUserMedia;

	    var clone = function clone(obj) {
	        if (null === obj || 'object' !== (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
	            return obj;
	        }
	        var copy = obj.constructor();
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) {
	                copy[attr] = obj[attr];
	            }
	        }
	        return copy;
	    };

	    var checkIfConstraintsIsValid = function checkIfConstraintsIsValid(constraints, successCb, failureCb) {
	        // Append checks for overrides as these are mandatory
	        // Browsers (not Firefox since they went Promise based) does these checks and they can be quite useful
	        if (!(constraints && (typeof constraints === 'undefined' ? 'undefined' : _typeof(constraints)) === 'object')) {
	            throw new Error('GetUserMedia: (constraints, .., ..) argument required');
	        } else if (typeof successCb !== 'function') {
	            throw new Error('GetUserMedia: (.., successCb, ..) argument required');
	        } else if (typeof failureCb !== 'function') {
	            throw new Error('GetUserMedia: (.., .., failureCb) argument required');
	        }
	    };

	    window.navigator.getUserMedia = function (constraints, successCb, failureCb) {
	        checkIfConstraintsIsValid(constraints, successCb, failureCb);

	        if (constraints.video && constraints.video.mandatory && constraints.video.mandatory.chromeMediaSource) {
	            var updatedConstraints = clone(constraints);

	            adapter.WebRTCPlugin.callWhenPluginReady(function () {
	                if (!!adapter.WebRTCPlugin.plugin.HasScreensharingFeature && !!adapter.WebRTCPlugin.plugin.isScreensharingAvailable) {
	                    updatedConstraints.video = {};
	                    updatedConstraints.video.mediaSource = adapter.WebRTCPlugin.plugin.screensharingKeys.screenOrWindow;

	                    updatedConstraints.video.optional = updatedConstraints.video.optional || [];
	                    updatedConstraints.video.optional.push({ sourceId: updatedConstraints.video.mediaSource });

	                    baseGetUserMedia(updatedConstraints, successCb, failureCb);
	                } else {
	                    failureCb(new Error('Your version of the WebRTC plugin does not support screensharing'));
	                    return;
	                }
	            });
	        } else {
	            baseGetUserMedia(constraints, successCb, failureCb);
	        }
	    };

	    if (typeof Promise !== 'undefined') {
	        navigator.mediaDevices.getUserMedia = function (constraints) {
	            return new Promise(function (resolve, reject) {
	                try {
	                    window.navigator.getUserMedia(constraints, resolve, reject);
	                } catch (error) {
	                    reject(error);
	                }
	            });
	        };
	    }
	}

	if (adapter.webrtcDetectedType === 'plugin') {
	    var existelm = document.createElement('div');
	    existelm.id = 'RTC-Share-Deskto-installed-ele-rat1abrr';
	    existelm.style.display = 'none';
	    (document.body || document.documentElement).appendChild(existelm);

	    // if (!adapter.WebRTCPlugin.plugin.HasScreensharingFeature
	    //     || !adapter.WebRTCPlugin.plugin.isScreensharingAvailable) { //不支持共享桌面
	    //     console.warn("Warn!! screensharing feature is not available");
	    // }else{
	    //     var existelm = document.createElement('div');
	    //     existelm.id = 'RTC-Share-Deskto-installed-ele-rat1abrr';
	    //     existelm.style.display = 'none';
	    //     (document.body || document.documentElement).appendChild(existelm);
	    // }
	}

	var seqno = 0;

	function simulateScreenSharePlugin(adapter) {
	    var RTC_PAGE_MSG_TYPE = 'RTC-SD-PAGE';
	    var RTC_EXT_MSG_TYPE = 'RTC-SD-EXT';

	    window.addEventListener('message', function (event) {
	        // if invalid source
	        if (event.source != window) return;

	        if (!event.data) return;
	        if (!event.data.type || event.data.type !== RTC_PAGE_MSG_TYPE) return;
	        if (!event.data.evname) return;

	        console.log('rtc-sd-content: forward data=', event.data);

	        var screenOptions = event.data.screenOptions;

	        adapter.WebRTCPlugin.callWhenPluginReady(function () {
	            if (!adapter.WebRTCPlugin.plugin.HasScreensharingFeature || !adapter.WebRTCPlugin.plugin.isScreensharingAvailable) {
	                console.warn("Warn!! screensharing feature is not available");
	                return window.postMessage({ type: RTC_EXT_MSG_TYPE, evname: 'onAccessDenied', tsxId: event.data.tsxId, errorMessage: "screensharing feature is not available" }, '*');
	            }

	            return window.postMessage({ type: RTC_EXT_MSG_TYPE, evname: 'onAccessApproved', streamId: seqno++ + "", tsxId: event.data.tsxId }, '*');
	        });
	    });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict() {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	var bluebird = __webpack_require__(9)();
	bluebird.noConflict = noConflict;
	module.exports = bluebird;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	module.exports = function() {
	var makeSelfResolutionError = function () {
	    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var reflectHandler = function() {
	    return new Promise.PromiseInspection(this._target());
	};
	var apiRejection = function(msg) {
	    return Promise.reject(new TypeError(msg));
	};
	function Proxyable() {}
	var UNDEFINED_BINDING = {};
	var util = __webpack_require__(11);

	var getDomain;
	if (util.isNode) {
	    getDomain = function() {
	        var ret = process.domain;
	        if (ret === undefined) ret = null;
	        return ret;
	    };
	} else {
	    getDomain = function() {
	        return null;
	    };
	}
	util.notEnumerableProp(Promise, "_getDomain", getDomain);

	var es5 = __webpack_require__(12);
	var Async = __webpack_require__(13);
	var async = new Async();
	es5.defineProperty(Promise, "_async", {value: async});
	var errors = __webpack_require__(18);
	var TypeError = Promise.TypeError = errors.TypeError;
	Promise.RangeError = errors.RangeError;
	var CancellationError = Promise.CancellationError = errors.CancellationError;
	Promise.TimeoutError = errors.TimeoutError;
	Promise.OperationalError = errors.OperationalError;
	Promise.RejectionError = errors.OperationalError;
	Promise.AggregateError = errors.AggregateError;
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {};
	var tryConvertToPromise = __webpack_require__(19)(Promise, INTERNAL);
	var PromiseArray =
	    __webpack_require__(20)(Promise, INTERNAL,
	                               tryConvertToPromise, apiRejection, Proxyable);
	var Context = __webpack_require__(21)(Promise);
	 /*jshint unused:false*/
	var createContext = Context.create;
	var debug = __webpack_require__(22)(Promise, Context);
	var CapturedTrace = debug.CapturedTrace;
	var PassThroughHandlerContext =
	    __webpack_require__(23)(Promise, tryConvertToPromise, NEXT_FILTER);
	var catchFilter = __webpack_require__(24)(NEXT_FILTER);
	var nodebackForPromise = __webpack_require__(25);
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	function check(self, executor) {
	    if (self == null || self.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (typeof executor !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(executor));
	    }

	}

	function Promise(executor) {
	    if (executor !== INTERNAL) {
	        check(this, executor);
	    }
	    this._bitField = 0;
	    this._fulfillmentHandler0 = undefined;
	    this._rejectionHandler0 = undefined;
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._resolveFromExecutor(executor);
	    this._promiseCreated();
	    this._fireEvent("promiseCreated", this);
	}

	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};

	Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return apiRejection("Catch statement predicate: " +
	                    "expecting an object but got " + util.classString(item));
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];
	        return this.then(undefined, catchFilter(catchInstances, fn, this));
	    }
	    return this.then(undefined, fn);
	};

	Promise.prototype.reflect = function () {
	    return this._then(reflectHandler,
	        reflectHandler, undefined, this, undefined);
	};

	Promise.prototype.then = function (didFulfill, didReject) {
	    if (debug.warnings() && arguments.length > 0 &&
	        typeof didFulfill !== "function" &&
	        typeof didReject !== "function") {
	        var msg = ".then() only accepts functions but was passed: " +
	                util.classString(didFulfill);
	        if (arguments.length > 1) {
	            msg += ", " + util.classString(didReject);
	        }
	        this._warn(msg);
	    }
	    return this._then(didFulfill, didReject, undefined, undefined, undefined);
	};

	Promise.prototype.done = function (didFulfill, didReject) {
	    var promise =
	        this._then(didFulfill, didReject, undefined, undefined, undefined);
	    promise._setIsFinal();
	};

	Promise.prototype.spread = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
	};

	Promise.prototype.toJSON = function () {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: undefined,
	        rejectionReason: undefined
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this.value();
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this.reason();
	        ret.isRejected = true;
	    }
	    return ret;
	};

	Promise.prototype.all = function () {
	    if (arguments.length > 0) {
	        this._warn(".all() was passed arguments but it does not take any");
	    }
	    return new PromiseArray(this).promise();
	};

	Promise.prototype.error = function (fn) {
	    return this.caught(util.originatesFromRejection, fn);
	};

	Promise.getNewLibraryCopy = module.exports;

	Promise.is = function (val) {
	    return val instanceof Promise;
	};

	Promise.fromNode = Promise.fromCallback = function(fn) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
	                                         : false;
	    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
	    if (result === errorObj) {
	        ret._rejectCallback(result.e, true);
	    }
	    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
	    return ret;
	};

	Promise.all = function (promises) {
	    return new PromiseArray(promises).promise();
	};

	Promise.cast = function (obj) {
	    var ret = tryConvertToPromise(obj);
	    if (!(ret instanceof Promise)) {
	        ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._setFulfilled();
	        ret._rejectionHandler0 = obj;
	    }
	    return ret;
	};

	Promise.resolve = Promise.fulfilled = Promise.cast;

	Promise.reject = Promise.rejected = function (reason) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._rejectCallback(reason, true);
	    return ret;
	};

	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return async.setScheduler(fn);
	};

	Promise.prototype._then = function (
	    didFulfill,
	    didReject,
	    _,    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== undefined;
	    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
	    var target = this._target();
	    var bitField = target._bitField;

	    if (!haveInternalData) {
	        promise._propagateFrom(this, 3);
	        promise._captureStackTrace();
	        if (receiver === undefined &&
	            ((this._bitField & 2097152) !== 0)) {
	            if (!((bitField & 50397184) === 0)) {
	                receiver = this._boundValue();
	            } else {
	                receiver = target === this ? undefined : this._boundTo;
	            }
	        }
	        this._fireEvent("promiseChained", this, promise);
	    }

	    var domain = getDomain();
	    if (!((bitField & 50397184) === 0)) {
	        var handler, value, settler = target._settlePromiseCtx;
	        if (((bitField & 33554432) !== 0)) {
	            value = target._rejectionHandler0;
	            handler = didFulfill;
	        } else if (((bitField & 16777216) !== 0)) {
	            value = target._fulfillmentHandler0;
	            handler = didReject;
	            target._unsetRejectionIsUnhandled();
	        } else {
	            settler = target._settlePromiseLateCancellationObserver;
	            value = new CancellationError("late cancellation observer");
	            target._attachExtraTrace(value);
	            handler = didReject;
	        }

	        async.invoke(settler, target, {
	            handler: domain === null ? handler
	                : (typeof handler === "function" &&
	                    util.domainBind(domain, handler)),
	            promise: promise,
	            receiver: receiver,
	            value: value
	        });
	    } else {
	        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
	    }

	    return promise;
	};

	Promise.prototype._length = function () {
	    return this._bitField & 65535;
	};

	Promise.prototype._isFateSealed = function () {
	    return (this._bitField & 117506048) !== 0;
	};

	Promise.prototype._isFollowing = function () {
	    return (this._bitField & 67108864) === 67108864;
	};

	Promise.prototype._setLength = function (len) {
	    this._bitField = (this._bitField & -65536) |
	        (len & 65535);
	};

	Promise.prototype._setFulfilled = function () {
	    this._bitField = this._bitField | 33554432;
	    this._fireEvent("promiseFulfilled", this);
	};

	Promise.prototype._setRejected = function () {
	    this._bitField = this._bitField | 16777216;
	    this._fireEvent("promiseRejected", this);
	};

	Promise.prototype._setFollowing = function () {
	    this._bitField = this._bitField | 67108864;
	    this._fireEvent("promiseResolved", this);
	};

	Promise.prototype._setIsFinal = function () {
	    this._bitField = this._bitField | 4194304;
	};

	Promise.prototype._isFinal = function () {
	    return (this._bitField & 4194304) > 0;
	};

	Promise.prototype._unsetCancelled = function() {
	    this._bitField = this._bitField & (~65536);
	};

	Promise.prototype._setCancelled = function() {
	    this._bitField = this._bitField | 65536;
	    this._fireEvent("promiseCancelled", this);
	};

	Promise.prototype._setWillBeCancelled = function() {
	    this._bitField = this._bitField | 8388608;
	};

	Promise.prototype._setAsyncGuaranteed = function() {
	    if (async.hasCustomScheduler()) return;
	    this._bitField = this._bitField | 134217728;
	};

	Promise.prototype._receiverAt = function (index) {
	    var ret = index === 0 ? this._receiver0 : this[
	            index * 4 - 4 + 3];
	    if (ret === UNDEFINED_BINDING) {
	        return undefined;
	    } else if (ret === undefined && this._isBound()) {
	        return this._boundValue();
	    }
	    return ret;
	};

	Promise.prototype._promiseAt = function (index) {
	    return this[
	            index * 4 - 4 + 2];
	};

	Promise.prototype._fulfillmentHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 0];
	};

	Promise.prototype._rejectionHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 1];
	};

	Promise.prototype._boundValue = function() {};

	Promise.prototype._migrateCallback0 = function (follower) {
	    var bitField = follower._bitField;
	    var fulfill = follower._fulfillmentHandler0;
	    var reject = follower._rejectionHandler0;
	    var promise = follower._promise0;
	    var receiver = follower._receiverAt(0);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};

	Promise.prototype._migrateCallbackAt = function (follower, index) {
	    var fulfill = follower._fulfillmentHandlerAt(index);
	    var reject = follower._rejectionHandlerAt(index);
	    var promise = follower._promiseAt(index);
	    var receiver = follower._receiverAt(index);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};

	Promise.prototype._addCallbacks = function (
	    fulfill,
	    reject,
	    promise,
	    receiver,
	    domain
	) {
	    var index = this._length();

	    if (index >= 65535 - 4) {
	        index = 0;
	        this._setLength(0);
	    }

	    if (index === 0) {
	        this._promise0 = promise;
	        this._receiver0 = receiver;
	        if (typeof fulfill === "function") {
	            this._fulfillmentHandler0 =
	                domain === null ? fulfill : util.domainBind(domain, fulfill);
	        }
	        if (typeof reject === "function") {
	            this._rejectionHandler0 =
	                domain === null ? reject : util.domainBind(domain, reject);
	        }
	    } else {
	        var base = index * 4 - 4;
	        this[base + 2] = promise;
	        this[base + 3] = receiver;
	        if (typeof fulfill === "function") {
	            this[base + 0] =
	                domain === null ? fulfill : util.domainBind(domain, fulfill);
	        }
	        if (typeof reject === "function") {
	            this[base + 1] =
	                domain === null ? reject : util.domainBind(domain, reject);
	        }
	    }
	    this._setLength(index + 1);
	    return index;
	};

	Promise.prototype._proxy = function (proxyable, arg) {
	    this._addCallbacks(undefined, undefined, arg, proxyable, null);
	};

	Promise.prototype._resolveCallback = function(value, shouldBind) {
	    if (((this._bitField & 117506048) !== 0)) return;
	    if (value === this)
	        return this._rejectCallback(makeSelfResolutionError(), false);
	    var maybePromise = tryConvertToPromise(value, this);
	    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

	    if (shouldBind) this._propagateFrom(maybePromise, 2);

	    var promise = maybePromise._target();

	    if (promise === this) {
	        this._reject(makeSelfResolutionError());
	        return;
	    }

	    var bitField = promise._bitField;
	    if (((bitField & 50397184) === 0)) {
	        var len = this._length();
	        if (len > 0) promise._migrateCallback0(this);
	        for (var i = 1; i < len; ++i) {
	            promise._migrateCallbackAt(this, i);
	        }
	        this._setFollowing();
	        this._setLength(0);
	        this._setFollowee(promise);
	    } else if (((bitField & 33554432) !== 0)) {
	        this._fulfill(promise._value());
	    } else if (((bitField & 16777216) !== 0)) {
	        this._reject(promise._reason());
	    } else {
	        var reason = new CancellationError("late cancellation observer");
	        promise._attachExtraTrace(reason);
	        this._reject(reason);
	    }
	};

	Promise.prototype._rejectCallback =
	function(reason, synchronous, ignoreNonErrorWarnings) {
	    var trace = util.ensureErrorObject(reason);
	    var hasStack = trace === reason;
	    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
	        var message = "a promise was rejected with a non-error: " +
	            util.classString(reason);
	        this._warn(message, true);
	    }
	    this._attachExtraTrace(trace, synchronous ? hasStack : false);
	    this._reject(reason);
	};

	Promise.prototype._resolveFromExecutor = function (executor) {
	    if (executor === INTERNAL) return;
	    var promise = this;
	    this._captureStackTrace();
	    this._pushContext();
	    var synchronous = true;
	    var r = this._execute(executor, function(value) {
	        promise._resolveCallback(value);
	    }, function (reason) {
	        promise._rejectCallback(reason, synchronous);
	    });
	    synchronous = false;
	    this._popContext();

	    if (r !== undefined) {
	        promise._rejectCallback(r, true);
	    }
	};

	Promise.prototype._settlePromiseFromHandler = function (
	    handler, receiver, value, promise
	) {
	    var bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	    promise._pushContext();
	    var x;
	    if (receiver === APPLY) {
	        if (!value || typeof value.length !== "number") {
	            x = errorObj;
	            x.e = new TypeError("cannot .spread() a non-array: " +
	                                    util.classString(value));
	        } else {
	            x = tryCatch(handler).apply(this._boundValue(), value);
	        }
	    } else {
	        x = tryCatch(handler).call(receiver, value);
	    }
	    var promiseCreated = promise._popContext();
	    bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;

	    if (x === NEXT_FILTER) {
	        promise._reject(value);
	    } else if (x === errorObj) {
	        promise._rejectCallback(x.e, false);
	    } else {
	        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
	        promise._resolveCallback(x);
	    }
	};

	Promise.prototype._target = function() {
	    var ret = this;
	    while (ret._isFollowing()) ret = ret._followee();
	    return ret;
	};

	Promise.prototype._followee = function() {
	    return this._rejectionHandler0;
	};

	Promise.prototype._setFollowee = function(promise) {
	    this._rejectionHandler0 = promise;
	};

	Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
	    var isPromise = promise instanceof Promise;
	    var bitField = this._bitField;
	    var asyncGuaranteed = ((bitField & 134217728) !== 0);
	    if (((bitField & 65536) !== 0)) {
	        if (isPromise) promise._invokeInternalOnCancel();

	        if (receiver instanceof PassThroughHandlerContext &&
	            receiver.isFinallyHandler()) {
	            receiver.cancelPromise = promise;
	            if (tryCatch(handler).call(receiver, value) === errorObj) {
	                promise._reject(errorObj.e);
	            }
	        } else if (handler === reflectHandler) {
	            promise._fulfill(reflectHandler.call(receiver));
	        } else if (receiver instanceof Proxyable) {
	            receiver._promiseCancelled(promise);
	        } else if (isPromise || promise instanceof PromiseArray) {
	            promise._cancel();
	        } else {
	            receiver.cancel();
	        }
	    } else if (typeof handler === "function") {
	        if (!isPromise) {
	            handler.call(receiver, value, promise);
	        } else {
	            if (asyncGuaranteed) promise._setAsyncGuaranteed();
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (receiver instanceof Proxyable) {
	        if (!receiver._isResolved()) {
	            if (((bitField & 33554432) !== 0)) {
	                receiver._promiseFulfilled(value, promise);
	            } else {
	                receiver._promiseRejected(value, promise);
	            }
	        }
	    } else if (isPromise) {
	        if (asyncGuaranteed) promise._setAsyncGuaranteed();
	        if (((bitField & 33554432) !== 0)) {
	            promise._fulfill(value);
	        } else {
	            promise._reject(value);
	        }
	    }
	};

	Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
	    var handler = ctx.handler;
	    var promise = ctx.promise;
	    var receiver = ctx.receiver;
	    var value = ctx.value;
	    if (typeof handler === "function") {
	        if (!(promise instanceof Promise)) {
	            handler.call(receiver, value, promise);
	        } else {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (promise instanceof Promise) {
	        promise._reject(value);
	    }
	};

	Promise.prototype._settlePromiseCtx = function(ctx) {
	    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
	};

	Promise.prototype._settlePromise0 = function(handler, value, bitField) {
	    var promise = this._promise0;
	    var receiver = this._receiverAt(0);
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._settlePromise(promise, handler, receiver, value);
	};

	Promise.prototype._clearCallbackDataAtIndex = function(index) {
	    var base = index * 4 - 4;
	    this[base + 2] =
	    this[base + 3] =
	    this[base + 0] =
	    this[base + 1] = undefined;
	};

	Promise.prototype._fulfill = function (value) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._reject(err);
	    }
	    this._setFulfilled();
	    this._rejectionHandler0 = value;

	    if ((bitField & 65535) > 0) {
	        if (((bitField & 134217728) !== 0)) {
	            this._settlePromises();
	        } else {
	            async.settlePromises(this);
	        }
	    }
	};

	Promise.prototype._reject = function (reason) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    this._setRejected();
	    this._fulfillmentHandler0 = reason;

	    if (this._isFinal()) {
	        return async.fatalError(reason, util.isNode);
	    }

	    if ((bitField & 65535) > 0) {
	        async.settlePromises(this);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};

	Promise.prototype._fulfillPromises = function (len, value) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._fulfillmentHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, value);
	    }
	};

	Promise.prototype._rejectPromises = function (len, reason) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._rejectionHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, reason);
	    }
	};

	Promise.prototype._settlePromises = function () {
	    var bitField = this._bitField;
	    var len = (bitField & 65535);

	    if (len > 0) {
	        if (((bitField & 16842752) !== 0)) {
	            var reason = this._fulfillmentHandler0;
	            this._settlePromise0(this._rejectionHandler0, reason, bitField);
	            this._rejectPromises(len, reason);
	        } else {
	            var value = this._rejectionHandler0;
	            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
	            this._fulfillPromises(len, value);
	        }
	        this._setLength(0);
	    }
	    this._clearCancellationData();
	};

	Promise.prototype._settledValue = function() {
	    var bitField = this._bitField;
	    if (((bitField & 33554432) !== 0)) {
	        return this._rejectionHandler0;
	    } else if (((bitField & 16777216) !== 0)) {
	        return this._fulfillmentHandler0;
	    }
	};

	function deferResolve(v) {this.promise._resolveCallback(v);}
	function deferReject(v) {this.promise._rejectCallback(v, false);}

	Promise.defer = Promise.pending = function() {
	    debug.deprecated("Promise.defer", "new Promise");
	    var promise = new Promise(INTERNAL);
	    return {
	        promise: promise,
	        resolve: deferResolve,
	        reject: deferReject
	    };
	};

	util.notEnumerableProp(Promise,
	                       "_makeSelfResolutionError",
	                       makeSelfResolutionError);

	__webpack_require__(26)(Promise, INTERNAL, tryConvertToPromise, apiRejection,
	    debug);
	__webpack_require__(27)(Promise, INTERNAL, tryConvertToPromise, debug);
	__webpack_require__(28)(Promise, PromiseArray, apiRejection, debug);
	__webpack_require__(29)(Promise);
	__webpack_require__(30)(Promise);
	__webpack_require__(31)(
	    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
	Promise.Promise = Promise;
	Promise.version = "3.5.1";
	__webpack_require__(32)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	__webpack_require__(33)(Promise);
	__webpack_require__(34)(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
	__webpack_require__(35)(Promise, INTERNAL, debug);
	__webpack_require__(36)(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
	__webpack_require__(37)(Promise);
	__webpack_require__(38)(Promise, INTERNAL);
	__webpack_require__(39)(Promise, PromiseArray, tryConvertToPromise, apiRejection);
	__webpack_require__(40)(Promise, INTERNAL, tryConvertToPromise, apiRejection);
	__webpack_require__(41)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	__webpack_require__(42)(Promise, PromiseArray, debug);
	__webpack_require__(43)(Promise, PromiseArray, apiRejection);
	__webpack_require__(44)(Promise, INTERNAL);
	__webpack_require__(45)(Promise, INTERNAL);
	__webpack_require__(46)(Promise);
	                                                         
	    util.toFastProperties(Promise);                                          
	    util.toFastProperties(Promise.prototype);                                
	    function fillTypes(value) {                                              
	        var p = new Promise(INTERNAL);                                       
	        p._fulfillmentHandler0 = value;                                      
	        p._rejectionHandler0 = value;                                        
	        p._promise0 = value;                                                 
	        p._receiver0 = value;                                                
	    }                                                                        
	    // Complete slack tracking, opt out of field-type tracking and           
	    // stabilize map                                                         
	    fillTypes({a: 1});                                                       
	    fillTypes({b: 2});                                                       
	    fillTypes({c: 3});                                                       
	    fillTypes(1);                                                            
	    fillTypes(function(){});                                                 
	    fillTypes(undefined);                                                    
	    fillTypes(false);                                                        
	    fillTypes(new Promise(INTERNAL));                                        
	    debug.setBounds(Async.firstLineError, util.lastLineError);               
	    return Promise;                                                          

	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";
	var es5 = __webpack_require__(12);
	var canEvaluate = typeof navigator == "undefined";

	var errorObj = {e: {}};
	var tryCatchTarget;
	var globalObject = typeof self !== "undefined" ? self :
	    typeof window !== "undefined" ? window :
	    typeof global !== "undefined" ? global :
	    this !== undefined ? this : null;

	function tryCatcher() {
	    try {
	        var target = tryCatchTarget;
	        tryCatchTarget = null;
	        return target.apply(this, arguments);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}

	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;

	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};


	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";

	}

	function isObject(value) {
	    return typeof value === "function" ||
	           typeof value === "object" && value !== null;
	}

	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;

	    return new Error(safeToString(maybeError));
	}

	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}

	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);

	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}

	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}

	function thrower(r) {
	    throw r;
	}

	var inheritedDataKeys = (function() {
	    var excludedPrototypes = [
	        Array.prototype,
	        Object.prototype,
	        Function.prototype
	    ];

	    var isExcludedProto = function(val) {
	        for (var i = 0; i < excludedPrototypes.length; ++i) {
	            if (excludedPrototypes[i] === val) {
	                return true;
	            }
	        }
	        return false;
	    };

	    if (es5.isES5) {
	        var getKeys = Object.getOwnPropertyNames;
	        return function(obj) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            while (obj != null && !isExcludedProto(obj)) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        var hasProp = {}.hasOwnProperty;
	        return function(obj) {
	            if (isExcludedProto(obj)) return [];
	            var ret = [];

	            /*jshint forin:false */
	            enumeration: for (var key in obj) {
	                if (hasProp.call(obj, key)) {
	                    ret.push(key);
	                } else {
	                    for (var i = 0; i < excludedPrototypes.length; ++i) {
	                        if (hasProp.call(excludedPrototypes[i], key)) {
	                            continue enumeration;
	                        }
	                    }
	                    ret.push(key);
	                }
	            }
	            return ret;
	        };
	    }

	})();

	var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.names(fn.prototype);

	            var hasMethods = es5.isES5 && keys.length > 1;
	            var hasMethodsOtherThanConstructor = keys.length > 0 &&
	                !(keys.length === 1 && keys[0] === "constructor");
	            var hasThisAssignmentAndStaticMethods =
	                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

	            if (hasMethods || hasMethodsOtherThanConstructor ||
	                hasThisAssignmentAndStaticMethods) {
	                return true;
	            }
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}

	function toFastProperties(obj) {
	    /*jshint -W027,-W055,-W031*/
	    function FakeConstructor() {}
	    FakeConstructor.prototype = obj;
	    var l = 8;
	    while (l--) new FakeConstructor();
	    return obj;
	    eval(obj);
	}

	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}

	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}

	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}

	function isError(obj) {
	    return obj instanceof Error ||
	        (obj !== null &&
	           typeof obj === "object" &&
	           typeof obj.message === "string" &&
	           typeof obj.name === "string");
	}

	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}

	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
	        e["isOperational"] === true);
	}

	function canAttachTrace(obj) {
	    return isError(obj) && es5.propertyIsWritable(obj, "stack");
	}

	var ensureErrorObject = (function() {
	    if (!("stack" in new Error())) {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            try {throw new Error(safeToString(value));}
	            catch(err) {return err;}
	        };
	    } else {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            return new Error(safeToString(value));
	        };
	    }
	})();

	function classString(obj) {
	    return {}.toString.call(obj);
	}

	function copyDescriptors(from, to, filter) {
	    var keys = es5.names(from);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        if (filter(key)) {
	            try {
	                es5.defineProperty(to, key, es5.getDescriptor(from, key));
	            } catch (ignore) {}
	        }
	    }
	}

	var asArray = function(v) {
	    if (es5.isArray(v)) {
	        return v;
	    }
	    return null;
	};

	if (typeof Symbol !== "undefined" && Symbol.iterator) {
	    var ArrayFrom = typeof Array.from === "function" ? function(v) {
	        return Array.from(v);
	    } : function(v) {
	        var ret = [];
	        var it = v[Symbol.iterator]();
	        var itResult;
	        while (!((itResult = it.next()).done)) {
	            ret.push(itResult.value);
	        }
	        return ret;
	    };

	    asArray = function(v) {
	        if (es5.isArray(v)) {
	            return v;
	        } else if (v != null && typeof v[Symbol.iterator] === "function") {
	            return ArrayFrom(v);
	        }
	        return null;
	    };
	}

	var isNode = typeof process !== "undefined" &&
	        classString(process).toLowerCase() === "[object process]";

	var hasEnvVariables = typeof process !== "undefined" &&
	    typeof process.env !== "undefined";

	function env(key) {
	    return hasEnvVariables ? process.env[key] : undefined;
	}

	function getNativePromise() {
	    if (typeof Promise === "function") {
	        try {
	            var promise = new Promise(function(){});
	            if ({}.toString.call(promise) === "[object Promise]") {
	                return Promise;
	            }
	        } catch (e) {}
	    }
	}

	function domainBind(self, cb) {
	    return self.bind(cb);
	}

	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    asArray: asArray,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    isError: isError,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch: tryCatch,
	    inherits: inherits,
	    withAppended: withAppended,
	    maybeWrapAsError: maybeWrapAsError,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    canAttachTrace: canAttachTrace,
	    ensureErrorObject: ensureErrorObject,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    classString: classString,
	    copyDescriptors: copyDescriptors,
	    hasDevTools: typeof chrome !== "undefined" && chrome &&
	                 typeof chrome.loadTimes === "function",
	    isNode: isNode,
	    hasEnvVariables: hasEnvVariables,
	    env: env,
	    global: globalObject,
	    getNativePromise: getNativePromise,
	    domainBind: domainBind
	};
	ret.isRecentNode = ret.isNode && (function() {
	    var version = process.versions.node.split(".").map(Number);
	    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
	})();

	if (ret.isNode) ret.toFastProperties(process);

	try {throw new Error(); } catch (e) {ret.lastLineError = e;}
	module.exports = ret;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(10)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	var isES5 = (function(){
	    "use strict";
	    return this === undefined;
	})();

	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        getDescriptor: Object.getOwnPropertyDescriptor,
	        keys: Object.keys,
	        names: Object.getOwnPropertyNames,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;

	    var ObjectKeys = function (o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };

	    var ObjectGetDescriptor = function(o, key) {
	        return {value: o[key]};
	    };

	    var ObjectDefineProperty = function (o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };

	    var ObjectFreeze = function (obj) {
	        return obj;
	    };

	    var ObjectGetPrototypeOf = function (obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    };

	    var ArrayIsArray = function (obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    };

	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        names: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        getDescriptor: ObjectGetDescriptor,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function() {
	            return true;
	        }
	    };
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var firstLineError;
	try {throw new Error(); } catch (e) {firstLineError = e;}
	var schedule = __webpack_require__(14);
	var Queue = __webpack_require__(17);
	var util = __webpack_require__(11);

	function Async() {
	    this._customScheduler = false;
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    this._haveDrainedQueues = false;
	    this._trampolineEnabled = true;
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule = schedule;
	}

	Async.prototype.setScheduler = function(fn) {
	    var prev = this._schedule;
	    this._schedule = fn;
	    this._customScheduler = true;
	    return prev;
	};

	Async.prototype.hasCustomScheduler = function() {
	    return this._customScheduler;
	};

	Async.prototype.enableTrampoline = function() {
	    this._trampolineEnabled = true;
	};

	Async.prototype.disableTrampolineIfNecessary = function() {
	    if (util.hasDevTools) {
	        this._trampolineEnabled = false;
	    }
	};

	Async.prototype.haveItemsQueued = function () {
	    return this._isTickUsed || this._haveDrainedQueues;
	};


	Async.prototype.fatalError = function(e, isNode) {
	    if (isNode) {
	        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
	            "\n");
	        process.exit(2);
	    } else {
	        this.throwLater(e);
	    }
	};

	Async.prototype.throwLater = function(fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function () { throw arg; };
	    }
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function() {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function() {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	};

	function AsyncInvokeLater(fn, receiver, arg) {
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncInvoke(fn, receiver, arg) {
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncSettlePromises(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	}

	if (!util.hasDevTools) {
	    Async.prototype.invokeLater = AsyncInvokeLater;
	    Async.prototype.invoke = AsyncInvoke;
	    Async.prototype.settlePromises = AsyncSettlePromises;
	} else {
	    Async.prototype.invokeLater = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvokeLater.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                setTimeout(function() {
	                    fn.call(receiver, arg);
	                }, 100);
	            });
	        }
	    };

	    Async.prototype.invoke = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvoke.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                fn.call(receiver, arg);
	            });
	        }
	    };

	    Async.prototype.settlePromises = function(promise) {
	        if (this._trampolineEnabled) {
	            AsyncSettlePromises.call(this, promise);
	        } else {
	            this._schedule(function() {
	                promise._settlePromises();
	            });
	        }
	    };
	}

	Async.prototype._drainQueue = function(queue) {
	    while (queue.length() > 0) {
	        var fn = queue.shift();
	        if (typeof fn !== "function") {
	            fn._settlePromises();
	            continue;
	        }
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	};

	Async.prototype._drainQueues = function () {
	    this._drainQueue(this._normalQueue);
	    this._reset();
	    this._haveDrainedQueues = true;
	    this._drainQueue(this._lateQueue);
	};

	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};

	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};

	module.exports = Async;
	module.exports.firstLineError = firstLineError;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, setImmediate) {"use strict";
	var util = __webpack_require__(11);
	var schedule;
	var noAsyncScheduler = function() {
	    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var NativePromise = util.getNativePromise();
	if (util.isNode && typeof MutationObserver === "undefined") {
	    var GlobalSetImmediate = global.setImmediate;
	    var ProcessNextTick = process.nextTick;
	    schedule = util.isRecentNode
	                ? function(fn) { GlobalSetImmediate.call(global, fn); }
	                : function(fn) { ProcessNextTick.call(process, fn); };
	} else if (typeof NativePromise === "function" &&
	           typeof NativePromise.resolve === "function") {
	    var nativePromise = NativePromise.resolve();
	    schedule = function(fn) {
	        nativePromise.then(fn);
	    };
	} else if ((typeof MutationObserver !== "undefined") &&
	          !(typeof window !== "undefined" &&
	            window.navigator &&
	            (window.navigator.standalone || window.cordova))) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var opts = {attributes: true};
	        var toggleScheduled = false;
	        var div2 = document.createElement("div");
	        var o2 = new MutationObserver(function() {
	            div.classList.toggle("foo");
	            toggleScheduled = false;
	        });
	        o2.observe(div2, opts);

	        var scheduleToggle = function() {
	            if (toggleScheduled) return;
	            toggleScheduled = true;
	            div2.classList.toggle("foo");
	        };

	        return function schedule(fn) {
	            var o = new MutationObserver(function() {
	                o.disconnect();
	                fn();
	            });
	            o.observe(div, opts);
	            scheduleToggle();
	        };
	    })();
	} else if (typeof setImmediate !== "undefined") {
	    schedule = function (fn) {
	        setImmediate(fn);
	    };
	} else if (typeof setTimeout !== "undefined") {
	    schedule = function (fn) {
	        setTimeout(fn, 0);
	    };
	} else {
	    schedule = noAsyncScheduler;
	}
	module.exports = schedule;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(10), __webpack_require__(15).setImmediate))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(16).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).setImmediate, __webpack_require__(15).clearImmediate))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}

	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}

	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};

	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};

	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};

	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];

	    this[front] = undefined;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};

	Queue.prototype.length = function () {
	    return this._length;
	};

	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};

	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    var moveItemsCount = (front + length) & (oldCapacity - 1);
	    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	};

	module.exports = Queue;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var es5 = __webpack_require__(12);
	var Objectfreeze = es5.freeze;
	var util = __webpack_require__(11);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;

	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message",
	            typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        } else {
	            Error.call(this);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}

	var _TypeError, _RangeError;
	var Warning = subError("Warning", "warning");
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}

	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}

	es5.defineProperty(AggregateError.prototype, "length", {
	    value: 0,
	    configurable: false,
	    writable: true,
	    enumerable: true
	});
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};

	function OperationalError(message) {
	    if (!(this instanceof OperationalError))
	        return new OperationalError(message);
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;

	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }

	}
	inherits(OperationalError, Error);

	var errorTypes = Error["__BluebirdErrorTypes__"];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
	        value: errorTypes,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	}

	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    Warning: Warning
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = __webpack_require__(11);
	var errorObj = util.errorObj;
	var isObject = util.isObject;

	function tryConvertToPromise(obj, context) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) return obj;
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (context) context._pushContext();
	            var ret = Promise.reject(then.e);
	            if (context) context._popContext();
	            return ret;
	        } else if (typeof then === "function") {
	            if (isAnyBluebirdPromise(obj)) {
	                var ret = new Promise(INTERNAL);
	                obj._then(
	                    ret._fulfill,
	                    ret._reject,
	                    undefined,
	                    ret,
	                    null
	                );
	                return ret;
	            }
	            return doThenable(obj, then, context);
	        }
	    }
	    return obj;
	}

	function doGetThen(obj) {
	    return obj.then;
	}

	function getThen(obj) {
	    try {
	        return doGetThen(obj);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    try {
	        return hasProp.call(obj, "_promise0");
	    } catch (e) {
	        return false;
	    }
	}

	function doThenable(x, then, context) {
	    var promise = new Promise(INTERNAL);
	    var ret = promise;
	    if (context) context._pushContext();
	    promise._captureStackTrace();
	    if (context) context._popContext();
	    var synchronous = true;
	    var result = util.tryCatch(then).call(x, resolve, reject);
	    synchronous = false;

	    if (promise && result === errorObj) {
	        promise._rejectCallback(result.e, true, true);
	        promise = null;
	    }

	    function resolve(value) {
	        if (!promise) return;
	        promise._resolveCallback(value);
	        promise = null;
	    }

	    function reject(reason) {
	        if (!promise) return;
	        promise._rejectCallback(reason, synchronous, true);
	        promise = null;
	    }
	    return ret;
	}

	return tryConvertToPromise;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise,
	    apiRejection, Proxyable) {
	var util = __webpack_require__(11);
	var isArray = util.isArray;

	function toResolutionValue(val) {
	    switch(val) {
	    case -2: return [];
	    case -3: return {};
	    case -6: return new Map();
	    }
	}

	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    if (values instanceof Promise) {
	        promise._propagateFrom(values, 3);
	    }
	    promise._setOnCancel(this);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(undefined, -2);
	}
	util.inherits(PromiseArray, Proxyable);

	PromiseArray.prototype.length = function () {
	    return this._length;
	};

	PromiseArray.prototype.promise = function () {
	    return this._promise;
	};

	PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
	    var values = tryConvertToPromise(this._values, this._promise);
	    if (values instanceof Promise) {
	        values = values._target();
	        var bitField = values._bitField;
	        ;
	        this._values = values;

	        if (((bitField & 50397184) === 0)) {
	            this._promise._setAsyncGuaranteed();
	            return values._then(
	                init,
	                this._reject,
	                undefined,
	                this,
	                resolveValueIfEmpty
	           );
	        } else if (((bitField & 33554432) !== 0)) {
	            values = values._value();
	        } else if (((bitField & 16777216) !== 0)) {
	            return this._reject(values._reason());
	        } else {
	            return this._cancel();
	        }
	    }
	    values = util.asArray(values);
	    if (values === null) {
	        var err = apiRejection(
	            "expecting an array or an iterable object but got " + util.classString(values)).reason();
	        this._promise._rejectCallback(err, false);
	        return;
	    }

	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    this._iterate(values);
	};

	PromiseArray.prototype._iterate = function(values) {
	    var len = this.getActualLength(values.length);
	    this._length = len;
	    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	    var result = this._promise;
	    var isResolved = false;
	    var bitField = null;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = tryConvertToPromise(values[i], result);

	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            bitField = maybePromise._bitField;
	        } else {
	            bitField = null;
	        }

	        if (isResolved) {
	            if (bitField !== null) {
	                maybePromise.suppressUnhandledRejections();
	            }
	        } else if (bitField !== null) {
	            if (((bitField & 50397184) === 0)) {
	                maybePromise._proxy(this, i);
	                this._values[i] = maybePromise;
	            } else if (((bitField & 33554432) !== 0)) {
	                isResolved = this._promiseFulfilled(maybePromise._value(), i);
	            } else if (((bitField & 16777216) !== 0)) {
	                isResolved = this._promiseRejected(maybePromise._reason(), i);
	            } else {
	                isResolved = this._promiseCancelled(i);
	            }
	        } else {
	            isResolved = this._promiseFulfilled(maybePromise, i);
	        }
	    }
	    if (!isResolved) result._setAsyncGuaranteed();
	};

	PromiseArray.prototype._isResolved = function () {
	    return this._values === null;
	};

	PromiseArray.prototype._resolve = function (value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};

	PromiseArray.prototype._cancel = function() {
	    if (this._isResolved() || !this._promise._isCancellable()) return;
	    this._values = null;
	    this._promise._cancel();
	};

	PromiseArray.prototype._reject = function (reason) {
	    this._values = null;
	    this._promise._rejectCallback(reason, false);
	};

	PromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};

	PromiseArray.prototype._promiseCancelled = function() {
	    this._cancel();
	    return true;
	};

	PromiseArray.prototype._promiseRejected = function (reason) {
	    this._totalResolved++;
	    this._reject(reason);
	    return true;
	};

	PromiseArray.prototype._resultCancelled = function() {
	    if (this._isResolved()) return;
	    var values = this._values;
	    this._cancel();
	    if (values instanceof Promise) {
	        values.cancel();
	    } else {
	        for (var i = 0; i < values.length; ++i) {
	            if (values[i] instanceof Promise) {
	                values[i].cancel();
	            }
	        }
	    }
	};

	PromiseArray.prototype.shouldCopyValues = function () {
	    return true;
	};

	PromiseArray.prototype.getActualLength = function (len) {
	    return len;
	};

	return PromiseArray;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	var longStackTraces = false;
	var contextStack = [];

	Promise.prototype._promiseCreated = function() {};
	Promise.prototype._pushContext = function() {};
	Promise.prototype._popContext = function() {return null;};
	Promise._peekContext = Promise.prototype._peekContext = function() {};

	function Context() {
	    this._trace = new Context.CapturedTrace(peekContext());
	}
	Context.prototype._pushContext = function () {
	    if (this._trace !== undefined) {
	        this._trace._promiseCreated = null;
	        contextStack.push(this._trace);
	    }
	};

	Context.prototype._popContext = function () {
	    if (this._trace !== undefined) {
	        var trace = contextStack.pop();
	        var ret = trace._promiseCreated;
	        trace._promiseCreated = null;
	        return ret;
	    }
	    return null;
	};

	function createContext() {
	    if (longStackTraces) return new Context();
	}

	function peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return undefined;
	}
	Context.CapturedTrace = null;
	Context.create = createContext;
	Context.deactivateLongStackTraces = function() {};
	Context.activateLongStackTraces = function() {
	    var Promise_pushContext = Promise.prototype._pushContext;
	    var Promise_popContext = Promise.prototype._popContext;
	    var Promise_PeekContext = Promise._peekContext;
	    var Promise_peekContext = Promise.prototype._peekContext;
	    var Promise_promiseCreated = Promise.prototype._promiseCreated;
	    Context.deactivateLongStackTraces = function() {
	        Promise.prototype._pushContext = Promise_pushContext;
	        Promise.prototype._popContext = Promise_popContext;
	        Promise._peekContext = Promise_PeekContext;
	        Promise.prototype._peekContext = Promise_peekContext;
	        Promise.prototype._promiseCreated = Promise_promiseCreated;
	        longStackTraces = false;
	    };
	    longStackTraces = true;
	    Promise.prototype._pushContext = Context.prototype._pushContext;
	    Promise.prototype._popContext = Context.prototype._popContext;
	    Promise._peekContext = Promise.prototype._peekContext = peekContext;
	    Promise.prototype._promiseCreated = function() {
	        var ctx = this._peekContext();
	        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
	    };
	};
	return Context;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	module.exports = function(Promise, Context) {
	var getDomain = Promise._getDomain;
	var async = Promise._async;
	var Warning = __webpack_require__(18).Warning;
	var util = __webpack_require__(11);
	var canAttachTrace = util.canAttachTrace;
	var unhandledRejectionHandled;
	var possiblyUnhandledRejection;
	var bluebirdFramePattern =
	    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
	var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
	var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
	var stackFramePattern = null;
	var formatStack = null;
	var indentStackFrames = false;
	var printWarning;
	var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
	                        (false ||
	                         util.env("BLUEBIRD_DEBUG") ||
	                         util.env("NODE_ENV") === "development"));

	var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
	    (debugging || util.env("BLUEBIRD_WARNINGS")));

	var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
	    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

	var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
	    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

	Promise.prototype.suppressUnhandledRejections = function() {
	    var target = this._target();
	    target._bitField = ((target._bitField & (~1048576)) |
	                      524288);
	};

	Promise.prototype._ensurePossibleRejectionHandled = function () {
	    if ((this._bitField & 524288) !== 0) return;
	    this._setRejectionIsUnhandled();
	    var self = this;
	    setTimeout(function() {
	        self._notifyUnhandledRejection();
	    }, 1);
	};

	Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	    fireRejectionEvent("rejectionHandled",
	                                  unhandledRejectionHandled, undefined, this);
	};

	Promise.prototype._setReturnedNonUndefined = function() {
	    this._bitField = this._bitField | 268435456;
	};

	Promise.prototype._returnedNonUndefined = function() {
	    return (this._bitField & 268435456) !== 0;
	};

	Promise.prototype._notifyUnhandledRejection = function () {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue();
	        this._setUnhandledRejectionIsNotified();
	        fireRejectionEvent("unhandledRejection",
	                                      possiblyUnhandledRejection, reason, this);
	    }
	};

	Promise.prototype._setUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField | 262144;
	};

	Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField & (~262144);
	};

	Promise.prototype._isUnhandledRejectionNotified = function () {
	    return (this._bitField & 262144) > 0;
	};

	Promise.prototype._setRejectionIsUnhandled = function () {
	    this._bitField = this._bitField | 1048576;
	};

	Promise.prototype._unsetRejectionIsUnhandled = function () {
	    this._bitField = this._bitField & (~1048576);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};

	Promise.prototype._isRejectionUnhandled = function () {
	    return (this._bitField & 1048576) > 0;
	};

	Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
	    return warn(message, shouldUseOwnTrace, promise || this);
	};

	Promise.onPossiblyUnhandledRejection = function (fn) {
	    var domain = getDomain();
	    possiblyUnhandledRejection =
	        typeof fn === "function" ? (domain === null ?
	                                            fn : util.domainBind(domain, fn))
	                                 : undefined;
	};

	Promise.onUnhandledRejectionHandled = function (fn) {
	    var domain = getDomain();
	    unhandledRejectionHandled =
	        typeof fn === "function" ? (domain === null ?
	                                            fn : util.domainBind(domain, fn))
	                                 : undefined;
	};

	var disableLongStackTraces = function() {};
	Promise.longStackTraces = function () {
	    if (async.haveItemsQueued() && !config.longStackTraces) {
	        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (!config.longStackTraces && longStackTracesIsSupported()) {
	        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
	        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
	        config.longStackTraces = true;
	        disableLongStackTraces = function() {
	            if (async.haveItemsQueued() && !config.longStackTraces) {
	                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	            }
	            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
	            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
	            Context.deactivateLongStackTraces();
	            async.enableTrampoline();
	            config.longStackTraces = false;
	        };
	        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
	        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
	        Context.activateLongStackTraces();
	        async.disableTrampolineIfNecessary();
	    }
	};

	Promise.hasLongStackTraces = function () {
	    return config.longStackTraces && longStackTracesIsSupported();
	};

	var fireDomEvent = (function() {
	    try {
	        if (typeof CustomEvent === "function") {
	            var event = new CustomEvent("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = new CustomEvent(name.toLowerCase(), {
	                    detail: event,
	                    cancelable: true
	                });
	                return !util.global.dispatchEvent(domEvent);
	            };
	        } else if (typeof Event === "function") {
	            var event = new Event("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = new Event(name.toLowerCase(), {
	                    cancelable: true
	                });
	                domEvent.detail = event;
	                return !util.global.dispatchEvent(domEvent);
	            };
	        } else {
	            var event = document.createEvent("CustomEvent");
	            event.initCustomEvent("testingtheevent", false, true, {});
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = document.createEvent("CustomEvent");
	                domEvent.initCustomEvent(name.toLowerCase(), false, true,
	                    event);
	                return !util.global.dispatchEvent(domEvent);
	            };
	        }
	    } catch (e) {}
	    return function() {
	        return false;
	    };
	})();

	var fireGlobalEvent = (function() {
	    if (util.isNode) {
	        return function() {
	            return process.emit.apply(process, arguments);
	        };
	    } else {
	        if (!util.global) {
	            return function() {
	                return false;
	            };
	        }
	        return function(name) {
	            var methodName = "on" + name.toLowerCase();
	            var method = util.global[methodName];
	            if (!method) return false;
	            method.apply(util.global, [].slice.call(arguments, 1));
	            return true;
	        };
	    }
	})();

	function generatePromiseLifecycleEventObject(name, promise) {
	    return {promise: promise};
	}

	var eventToObjectGenerator = {
	    promiseCreated: generatePromiseLifecycleEventObject,
	    promiseFulfilled: generatePromiseLifecycleEventObject,
	    promiseRejected: generatePromiseLifecycleEventObject,
	    promiseResolved: generatePromiseLifecycleEventObject,
	    promiseCancelled: generatePromiseLifecycleEventObject,
	    promiseChained: function(name, promise, child) {
	        return {promise: promise, child: child};
	    },
	    warning: function(name, warning) {
	        return {warning: warning};
	    },
	    unhandledRejection: function (name, reason, promise) {
	        return {reason: reason, promise: promise};
	    },
	    rejectionHandled: generatePromiseLifecycleEventObject
	};

	var activeFireEvent = function (name) {
	    var globalEventFired = false;
	    try {
	        globalEventFired = fireGlobalEvent.apply(null, arguments);
	    } catch (e) {
	        async.throwLater(e);
	        globalEventFired = true;
	    }

	    var domEventFired = false;
	    try {
	        domEventFired = fireDomEvent(name,
	                    eventToObjectGenerator[name].apply(null, arguments));
	    } catch (e) {
	        async.throwLater(e);
	        domEventFired = true;
	    }

	    return domEventFired || globalEventFired;
	};

	Promise.config = function(opts) {
	    opts = Object(opts);
	    if ("longStackTraces" in opts) {
	        if (opts.longStackTraces) {
	            Promise.longStackTraces();
	        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
	            disableLongStackTraces();
	        }
	    }
	    if ("warnings" in opts) {
	        var warningsOption = opts.warnings;
	        config.warnings = !!warningsOption;
	        wForgottenReturn = config.warnings;

	        if (util.isObject(warningsOption)) {
	            if ("wForgottenReturn" in warningsOption) {
	                wForgottenReturn = !!warningsOption.wForgottenReturn;
	            }
	        }
	    }
	    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
	        if (async.haveItemsQueued()) {
	            throw new Error(
	                "cannot enable cancellation after promises are in use");
	        }
	        Promise.prototype._clearCancellationData =
	            cancellationClearCancellationData;
	        Promise.prototype._propagateFrom = cancellationPropagateFrom;
	        Promise.prototype._onCancel = cancellationOnCancel;
	        Promise.prototype._setOnCancel = cancellationSetOnCancel;
	        Promise.prototype._attachCancellationCallback =
	            cancellationAttachCancellationCallback;
	        Promise.prototype._execute = cancellationExecute;
	        propagateFromFunction = cancellationPropagateFrom;
	        config.cancellation = true;
	    }
	    if ("monitoring" in opts) {
	        if (opts.monitoring && !config.monitoring) {
	            config.monitoring = true;
	            Promise.prototype._fireEvent = activeFireEvent;
	        } else if (!opts.monitoring && config.monitoring) {
	            config.monitoring = false;
	            Promise.prototype._fireEvent = defaultFireEvent;
	        }
	    }
	    return Promise;
	};

	function defaultFireEvent() { return false; }

	Promise.prototype._fireEvent = defaultFireEvent;
	Promise.prototype._execute = function(executor, resolve, reject) {
	    try {
	        executor(resolve, reject);
	    } catch (e) {
	        return e;
	    }
	};
	Promise.prototype._onCancel = function () {};
	Promise.prototype._setOnCancel = function (handler) { ; };
	Promise.prototype._attachCancellationCallback = function(onCancel) {
	    ;
	};
	Promise.prototype._captureStackTrace = function () {};
	Promise.prototype._attachExtraTrace = function () {};
	Promise.prototype._clearCancellationData = function() {};
	Promise.prototype._propagateFrom = function (parent, flags) {
	    ;
	    ;
	};

	function cancellationExecute(executor, resolve, reject) {
	    var promise = this;
	    try {
	        executor(resolve, reject, function(onCancel) {
	            if (typeof onCancel !== "function") {
	                throw new TypeError("onCancel must be a function, got: " +
	                                    util.toString(onCancel));
	            }
	            promise._attachCancellationCallback(onCancel);
	        });
	    } catch (e) {
	        return e;
	    }
	}

	function cancellationAttachCancellationCallback(onCancel) {
	    if (!this._isCancellable()) return this;

	    var previousOnCancel = this._onCancel();
	    if (previousOnCancel !== undefined) {
	        if (util.isArray(previousOnCancel)) {
	            previousOnCancel.push(onCancel);
	        } else {
	            this._setOnCancel([previousOnCancel, onCancel]);
	        }
	    } else {
	        this._setOnCancel(onCancel);
	    }
	}

	function cancellationOnCancel() {
	    return this._onCancelField;
	}

	function cancellationSetOnCancel(onCancel) {
	    this._onCancelField = onCancel;
	}

	function cancellationClearCancellationData() {
	    this._cancellationParent = undefined;
	    this._onCancelField = undefined;
	}

	function cancellationPropagateFrom(parent, flags) {
	    if ((flags & 1) !== 0) {
	        this._cancellationParent = parent;
	        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
	        if (branchesRemainingToCancel === undefined) {
	            branchesRemainingToCancel = 0;
	        }
	        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
	    }
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}

	function bindingPropagateFrom(parent, flags) {
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	var propagateFromFunction = bindingPropagateFrom;

	function boundValueFunction() {
	    var ret = this._boundTo;
	    if (ret !== undefined) {
	        if (ret instanceof Promise) {
	            if (ret.isFulfilled()) {
	                return ret.value();
	            } else {
	                return undefined;
	            }
	        }
	    }
	    return ret;
	}

	function longStackTracesCaptureStackTrace() {
	    this._trace = new CapturedTrace(this._peekContext());
	}

	function longStackTracesAttachExtraTrace(error, ignoreSelf) {
	    if (canAttachTrace(error)) {
	        var trace = this._trace;
	        if (trace !== undefined) {
	            if (ignoreSelf) trace = trace._parent;
	        }
	        if (trace !== undefined) {
	            trace.attachExtraTrace(error);
	        } else if (!error.__stackCleaned__) {
	            var parsed = parseStackAndMessage(error);
	            util.notEnumerableProp(error, "stack",
	                parsed.message + "\n" + parsed.stack.join("\n"));
	            util.notEnumerableProp(error, "__stackCleaned__", true);
	        }
	    }
	}

	function checkForgottenReturns(returnValue, promiseCreated, name, promise,
	                               parent) {
	    if (returnValue === undefined && promiseCreated !== null &&
	        wForgottenReturn) {
	        if (parent !== undefined && parent._returnedNonUndefined()) return;
	        if ((promise._bitField & 65535) === 0) return;

	        if (name) name = name + " ";
	        var handlerLine = "";
	        var creatorLine = "";
	        if (promiseCreated._trace) {
	            var traceLines = promiseCreated._trace.stack.split("\n");
	            var stack = cleanStack(traceLines);
	            for (var i = stack.length - 1; i >= 0; --i) {
	                var line = stack[i];
	                if (!nodeFramePattern.test(line)) {
	                    var lineMatches = line.match(parseLinePattern);
	                    if (lineMatches) {
	                        handlerLine  = "at " + lineMatches[1] +
	                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
	                    }
	                    break;
	                }
	            }

	            if (stack.length > 0) {
	                var firstUserLine = stack[0];
	                for (var i = 0; i < traceLines.length; ++i) {

	                    if (traceLines[i] === firstUserLine) {
	                        if (i > 0) {
	                            creatorLine = "\n" + traceLines[i - 1];
	                        }
	                        break;
	                    }
	                }

	            }
	        }
	        var msg = "a promise was created in a " + name +
	            "handler " + handlerLine + "but was not returned from it, " +
	            "see http://goo.gl/rRqMUw" +
	            creatorLine;
	        promise._warn(msg, true, promiseCreated);
	    }
	}

	function deprecated(name, replacement) {
	    var message = name +
	        " is deprecated and will be removed in a future version.";
	    if (replacement) message += " Use " + replacement + " instead.";
	    return warn(message);
	}

	function warn(message, shouldUseOwnTrace, promise) {
	    if (!config.warnings) return;
	    var warning = new Warning(message);
	    var ctx;
	    if (shouldUseOwnTrace) {
	        promise._attachExtraTrace(warning);
	    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
	        ctx.attachExtraTrace(warning);
	    } else {
	        var parsed = parseStackAndMessage(warning);
	        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
	    }

	    if (!activeFireEvent("warning", warning)) {
	        formatAndLogError(warning, "", true);
	    }
	}

	function reconstructStack(message, stacks) {
	    for (var i = 0; i < stacks.length - 1; ++i) {
	        stacks[i].push("From previous event:");
	        stacks[i] = stacks[i].join("\n");
	    }
	    if (i < stacks.length) {
	        stacks[i] = stacks[i].join("\n");
	    }
	    return message + "\n" + stacks.join("\n");
	}

	function removeDuplicateOrEmptyJumps(stacks) {
	    for (var i = 0; i < stacks.length; ++i) {
	        if (stacks[i].length === 0 ||
	            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
	            stacks.splice(i, 1);
	            i--;
	        }
	    }
	}

	function removeCommonRoots(stacks) {
	    var current = stacks[0];
	    for (var i = 1; i < stacks.length; ++i) {
	        var prev = stacks[i];
	        var currentLastIndex = current.length - 1;
	        var currentLastLine = current[currentLastIndex];
	        var commonRootMeetPoint = -1;

	        for (var j = prev.length - 1; j >= 0; --j) {
	            if (prev[j] === currentLastLine) {
	                commonRootMeetPoint = j;
	                break;
	            }
	        }

	        for (var j = commonRootMeetPoint; j >= 0; --j) {
	            var line = prev[j];
	            if (current[currentLastIndex] === line) {
	                current.pop();
	                currentLastIndex--;
	            } else {
	                break;
	            }
	        }
	        current = prev;
	    }
	}

	function cleanStack(stack) {
	    var ret = [];
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        var isTraceLine = "    (No stack trace)" === line ||
	            stackFramePattern.test(line);
	        var isInternalFrame = isTraceLine && shouldIgnore(line);
	        if (isTraceLine && !isInternalFrame) {
	            if (indentStackFrames && line.charAt(0) !== " ") {
	                line = "    " + line;
	            }
	            ret.push(line);
	        }
	    }
	    return ret;
	}

	function stackFramesAsArray(error) {
	    var stack = error.stack.replace(/\s+$/g, "").split("\n");
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
	            break;
	        }
	    }
	    if (i > 0 && error.name != "SyntaxError") {
	        stack = stack.slice(i);
	    }
	    return stack;
	}

	function parseStackAndMessage(error) {
	    var stack = error.stack;
	    var message = error.toString();
	    stack = typeof stack === "string" && stack.length > 0
	                ? stackFramesAsArray(error) : ["    (No stack trace)"];
	    return {
	        message: message,
	        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
	    };
	}

	function formatAndLogError(error, title, isSoft) {
	    if (typeof console !== "undefined") {
	        var message;
	        if (util.isObject(error)) {
	            var stack = error.stack;
	            message = title + formatStack(stack, error);
	        } else {
	            message = title + String(error);
	        }
	        if (typeof printWarning === "function") {
	            printWarning(message, isSoft);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	}

	function fireRejectionEvent(name, localHandler, reason, promise) {
	    var localEventFired = false;
	    try {
	        if (typeof localHandler === "function") {
	            localEventFired = true;
	            if (name === "rejectionHandled") {
	                localHandler(promise);
	            } else {
	                localHandler(reason, promise);
	            }
	        }
	    } catch (e) {
	        async.throwLater(e);
	    }

	    if (name === "unhandledRejection") {
	        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
	            formatAndLogError(reason, "Unhandled rejection ");
	        }
	    } else {
	        activeFireEvent(name, promise);
	    }
	}

	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj && typeof obj.toString === "function"
	            ? obj.toString() : util.toString(obj);
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {

	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}

	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}

	function longStackTracesIsSupported() {
	    return typeof captureStackTrace === "function";
	}

	var shouldIgnore = function() { return false; };
	var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	function parseLineInfo(line) {
	    var matches = line.match(parseLineInfoRegex);
	    if (matches) {
	        return {
	            fileName: matches[1],
	            line: parseInt(matches[2], 10)
	        };
	    }
	}

	function setBounds(firstLineError, lastLineError) {
	    if (!longStackTracesIsSupported()) return;
	    var firstStackLines = firstLineError.stack.split("\n");
	    var lastStackLines = lastLineError.stack.split("\n");
	    var firstIndex = -1;
	    var lastIndex = -1;
	    var firstFileName;
	    var lastFileName;
	    for (var i = 0; i < firstStackLines.length; ++i) {
	        var result = parseLineInfo(firstStackLines[i]);
	        if (result) {
	            firstFileName = result.fileName;
	            firstIndex = result.line;
	            break;
	        }
	    }
	    for (var i = 0; i < lastStackLines.length; ++i) {
	        var result = parseLineInfo(lastStackLines[i]);
	        if (result) {
	            lastFileName = result.fileName;
	            lastIndex = result.line;
	            break;
	        }
	    }
	    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
	        firstFileName !== lastFileName || firstIndex >= lastIndex) {
	        return;
	    }

	    shouldIgnore = function(line) {
	        if (bluebirdFramePattern.test(line)) return true;
	        var info = parseLineInfo(line);
	        if (info) {
	            if (info.fileName === firstFileName &&
	                (firstIndex <= info.line && info.line <= lastIndex)) {
	                return true;
	            }
	        }
	        return false;
	    };
	}

	function CapturedTrace(parent) {
	    this._parent = parent;
	    this._promisesCreated = 0;
	    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
	    captureStackTrace(this, CapturedTrace);
	    if (length > 32) this.uncycle();
	}
	util.inherits(CapturedTrace, Error);
	Context.CapturedTrace = CapturedTrace;

	CapturedTrace.prototype.uncycle = function() {
	    var length = this._length;
	    if (length < 2) return;
	    var nodes = [];
	    var stackToIndex = {};

	    for (var i = 0, node = this; node !== undefined; ++i) {
	        nodes.push(node);
	        node = node._parent;
	    }
	    length = this._length = i;
	    for (var i = length - 1; i >= 0; --i) {
	        var stack = nodes[i].stack;
	        if (stackToIndex[stack] === undefined) {
	            stackToIndex[stack] = i;
	        }
	    }
	    for (var i = 0; i < length; ++i) {
	        var currentStack = nodes[i].stack;
	        var index = stackToIndex[currentStack];
	        if (index !== undefined && index !== i) {
	            if (index > 0) {
	                nodes[index - 1]._parent = undefined;
	                nodes[index - 1]._length = 1;
	            }
	            nodes[i]._parent = undefined;
	            nodes[i]._length = 1;
	            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

	            if (index < length - 1) {
	                cycleEdgeNode._parent = nodes[index + 1];
	                cycleEdgeNode._parent.uncycle();
	                cycleEdgeNode._length =
	                    cycleEdgeNode._parent._length + 1;
	            } else {
	                cycleEdgeNode._parent = undefined;
	                cycleEdgeNode._length = 1;
	            }
	            var currentChildLength = cycleEdgeNode._length + 1;
	            for (var j = i - 2; j >= 0; --j) {
	                nodes[j]._length = currentChildLength;
	                currentChildLength++;
	            }
	            return;
	        }
	    }
	};

	CapturedTrace.prototype.attachExtraTrace = function(error) {
	    if (error.__stackCleaned__) return;
	    this.uncycle();
	    var parsed = parseStackAndMessage(error);
	    var message = parsed.message;
	    var stacks = [parsed.stack];

	    var trace = this;
	    while (trace !== undefined) {
	        stacks.push(cleanStack(trace.stack.split("\n")));
	        trace = trace._parent;
	    }
	    removeCommonRoots(stacks);
	    removeDuplicateOrEmptyJumps(stacks);
	    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
	    util.notEnumerableProp(error, "__stackCleaned__", true);
	};

	var captureStackTrace = (function stackDetection() {
	    var v8stackFramePattern = /^\s*at\s*/;
	    var v8stackFormatter = function(stack, error) {
	        if (typeof stack === "string") return stack;

	        if (error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };

	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        Error.stackTraceLimit += 6;
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        var captureStackTrace = Error.captureStackTrace;

	        shouldIgnore = function(line) {
	            return bluebirdFramePattern.test(line);
	        };
	        return function(receiver, ignoreUntil) {
	            Error.stackTraceLimit += 6;
	            captureStackTrace(receiver, ignoreUntil);
	            Error.stackTraceLimit -= 6;
	        };
	    }
	    var err = new Error();

	    if (typeof err.stack === "string" &&
	        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
	        stackFramePattern = /@/;
	        formatStack = v8stackFormatter;
	        indentStackFrames = true;
	        return function captureStackTrace(o) {
	            o.stack = new Error().stack;
	        };
	    }

	    var hasStackAfterThrow;
	    try { throw new Error(); }
	    catch(e) {
	        hasStackAfterThrow = ("stack" in e);
	    }
	    if (!("stack" in err) && hasStackAfterThrow &&
	        typeof Error.stackTraceLimit === "number") {
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        return function captureStackTrace(o) {
	            Error.stackTraceLimit += 6;
	            try { throw new Error(); }
	            catch(e) { o.stack = e.stack; }
	            Error.stackTraceLimit -= 6;
	        };
	    }

	    formatStack = function(stack, error) {
	        if (typeof stack === "string") return stack;

	        if ((typeof error === "object" ||
	            typeof error === "function") &&
	            error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };

	    return null;

	})([]);

	if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
	    printWarning = function (message) {
	        console.warn(message);
	    };
	    if (util.isNode && process.stderr.isTTY) {
	        printWarning = function(message, isSoft) {
	            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
	            console.warn(color + message + "\u001b[0m\n");
	        };
	    } else if (!util.isNode && typeof (new Error().stack) === "string") {
	        printWarning = function(message, isSoft) {
	            console.warn("%c" + message,
	                        isSoft ? "color: darkorange" : "color: red");
	        };
	    }
	}

	var config = {
	    warnings: warnings,
	    longStackTraces: false,
	    cancellation: false,
	    monitoring: false
	};

	if (longStackTraces) Promise.longStackTraces();

	return {
	    longStackTraces: function() {
	        return config.longStackTraces;
	    },
	    warnings: function() {
	        return config.warnings;
	    },
	    cancellation: function() {
	        return config.cancellation;
	    },
	    monitoring: function() {
	        return config.monitoring;
	    },
	    propagateFromFunction: function() {
	        return propagateFromFunction;
	    },
	    boundValueFunction: function() {
	        return boundValueFunction;
	    },
	    checkForgottenReturns: checkForgottenReturns,
	    setBounds: setBounds,
	    warn: warn,
	    deprecated: deprecated,
	    CapturedTrace: CapturedTrace,
	    fireDomEvent: fireDomEvent,
	    fireGlobalEvent: fireGlobalEvent
	};
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
	var util = __webpack_require__(11);
	var CancellationError = Promise.CancellationError;
	var errorObj = util.errorObj;
	var catchFilter = __webpack_require__(24)(NEXT_FILTER);

	function PassThroughHandlerContext(promise, type, handler) {
	    this.promise = promise;
	    this.type = type;
	    this.handler = handler;
	    this.called = false;
	    this.cancelPromise = null;
	}

	PassThroughHandlerContext.prototype.isFinallyHandler = function() {
	    return this.type === 0;
	};

	function FinallyHandlerCancelReaction(finallyHandler) {
	    this.finallyHandler = finallyHandler;
	}

	FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
	    checkCancel(this.finallyHandler);
	};

	function checkCancel(ctx, reason) {
	    if (ctx.cancelPromise != null) {
	        if (arguments.length > 1) {
	            ctx.cancelPromise._reject(reason);
	        } else {
	            ctx.cancelPromise._cancel();
	        }
	        ctx.cancelPromise = null;
	        return true;
	    }
	    return false;
	}

	function succeed() {
	    return finallyHandler.call(this, this.promise._target()._settledValue());
	}
	function fail(reason) {
	    if (checkCancel(this, reason)) return;
	    errorObj.e = reason;
	    return errorObj;
	}
	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;

	    if (!this.called) {
	        this.called = true;
	        var ret = this.isFinallyHandler()
	            ? handler.call(promise._boundValue())
	            : handler.call(promise._boundValue(), reasonOrValue);
	        if (ret === NEXT_FILTER) {
	            return ret;
	        } else if (ret !== undefined) {
	            promise._setReturnedNonUndefined();
	            var maybePromise = tryConvertToPromise(ret, promise);
	            if (maybePromise instanceof Promise) {
	                if (this.cancelPromise != null) {
	                    if (maybePromise._isCancelled()) {
	                        var reason =
	                            new CancellationError("late cancellation observer");
	                        promise._attachExtraTrace(reason);
	                        errorObj.e = reason;
	                        return errorObj;
	                    } else if (maybePromise.isPending()) {
	                        maybePromise._attachCancellationCallback(
	                            new FinallyHandlerCancelReaction(this));
	                    }
	                }
	                return maybePromise._then(
	                    succeed, fail, undefined, this, undefined);
	            }
	        }
	    }

	    if (promise.isRejected()) {
	        checkCancel(this);
	        errorObj.e = reasonOrValue;
	        return errorObj;
	    } else {
	        checkCancel(this);
	        return reasonOrValue;
	    }
	}

	Promise.prototype._passThrough = function(handler, type, success, fail) {
	    if (typeof handler !== "function") return this.then();
	    return this._then(success,
	                      fail,
	                      undefined,
	                      new PassThroughHandlerContext(this, type, handler),
	                      undefined);
	};

	Promise.prototype.lastly =
	Promise.prototype["finally"] = function (handler) {
	    return this._passThrough(handler,
	                             0,
	                             finallyHandler,
	                             finallyHandler);
	};


	Promise.prototype.tap = function (handler) {
	    return this._passThrough(handler, 1, finallyHandler);
	};

	Promise.prototype.tapCatch = function (handlerOrPredicate) {
	    var len = arguments.length;
	    if(len === 1) {
	        return this._passThrough(handlerOrPredicate,
	                                 1,
	                                 undefined,
	                                 finallyHandler);
	    } else {
	         var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return Promise.reject(new TypeError(
	                    "tapCatch statement predicate: "
	                    + "expecting an object but got " + util.classString(item)
	                ));
	            }
	        }
	        catchInstances.length = j;
	        var handler = arguments[i];
	        return this._passThrough(catchFilter(catchInstances, handler, this),
	                                 1,
	                                 undefined,
	                                 finallyHandler);
	    }

	};

	return PassThroughHandlerContext;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = __webpack_require__(11);
	var getKeys = __webpack_require__(12).keys;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	function catchFilter(instances, cb, promise) {
	    return function(e) {
	        var boundTo = promise._boundValue();
	        predicateLoop: for (var i = 0; i < instances.length; ++i) {
	            var item = instances[i];

	            if (item === Error ||
	                (item != null && item.prototype instanceof Error)) {
	                if (e instanceof item) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (typeof item === "function") {
	                var matchesPredicate = tryCatch(item).call(boundTo, e);
	                if (matchesPredicate === errorObj) {
	                    return matchesPredicate;
	                } else if (matchesPredicate) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (util.isObject(e)) {
	                var keys = getKeys(item);
	                for (var j = 0; j < keys.length; ++j) {
	                    var key = keys[j];
	                    if (item[key] != e[key]) {
	                        continue predicateLoop;
	                    }
	                }
	                return tryCatch(cb).call(boundTo, e);
	            }
	        }
	        return NEXT_FILTER;
	    };
	}

	return catchFilter;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(11);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(18);
	var OperationalError = errors.OperationalError;
	var es5 = __webpack_require__(12);

	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}

	var rErrorKey = /^(?:name|message|stack|cause)$/;
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	        ret.name = obj.name;
	        ret.message = obj.message;
	        ret.stack = obj.stack;
	        var keys = es5.keys(obj);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!rErrorKey.test(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    util.markAsOriginatingFromRejection(obj);
	    return obj;
	}

	function nodebackForPromise(promise, multiArgs) {
	    return function(err, value) {
	        if (promise === null) return;
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (!multiArgs) {
	            promise._fulfill(value);
	        } else {
	            var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];};
	            promise._fulfill(args);
	        }
	        promise = null;
	    };
	}

	module.exports = nodebackForPromise;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
	var util = __webpack_require__(11);
	var tryCatch = util.tryCatch;

	Promise.method = function (fn) {
	    if (typeof fn !== "function") {
	        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return function () {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._pushContext();
	        var value = tryCatch(fn).apply(this, arguments);
	        var promiseCreated = ret._popContext();
	        debug.checkForgottenReturns(
	            value, promiseCreated, "Promise.method", ret);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};

	Promise.attempt = Promise["try"] = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._pushContext();
	    var value;
	    if (arguments.length > 1) {
	        debug.deprecated("calling Promise.try with more than 1 argument");
	        var arg = arguments[1];
	        var ctx = arguments[2];
	        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
	                                  : tryCatch(fn).call(ctx, arg);
	    } else {
	        value = tryCatch(fn)();
	    }
	    var promiseCreated = ret._popContext();
	    debug.checkForgottenReturns(
	        value, promiseCreated, "Promise.try", ret);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};

	Promise.prototype._resolveFromSyncValue = function (value) {
	    if (value === util.errorObj) {
	        this._rejectCallback(value.e, false);
	    } else {
	        this._resolveCallback(value, true);
	    }
	};
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
	var calledBind = false;
	var rejectThis = function(_, e) {
	    this._reject(e);
	};

	var targetRejected = function(e, context) {
	    context.promiseRejectionQueued = true;
	    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
	};

	var bindingResolved = function(thisArg, context) {
	    if (((this._bitField & 50397184) === 0)) {
	        this._resolveCallback(context.target);
	    }
	};

	var bindingRejected = function(e, context) {
	    if (!context.promiseRejectionQueued) this._reject(e);
	};

	Promise.prototype.bind = function (thisArg) {
	    if (!calledBind) {
	        calledBind = true;
	        Promise.prototype._propagateFrom = debug.propagateFromFunction();
	        Promise.prototype._boundValue = debug.boundValueFunction();
	    }
	    var maybePromise = tryConvertToPromise(thisArg);
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 1);
	    var target = this._target();
	    ret._setBoundTo(maybePromise);
	    if (maybePromise instanceof Promise) {
	        var context = {
	            promiseRejectionQueued: false,
	            promise: ret,
	            target: target,
	            bindingPromise: maybePromise
	        };
	        target._then(INTERNAL, targetRejected, undefined, ret, context);
	        maybePromise._then(
	            bindingResolved, bindingRejected, undefined, ret, context);
	        ret._setOnCancel(maybePromise);
	    } else {
	        ret._resolveCallback(target);
	    }
	    return ret;
	};

	Promise.prototype._setBoundTo = function (obj) {
	    if (obj !== undefined) {
	        this._bitField = this._bitField | 2097152;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~2097152);
	    }
	};

	Promise.prototype._isBound = function () {
	    return (this._bitField & 2097152) === 2097152;
	};

	Promise.bind = function (thisArg, value) {
	    return Promise.resolve(value).bind(thisArg);
	};
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, debug) {
	var util = __webpack_require__(11);
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;

	Promise.prototype["break"] = Promise.prototype.cancel = function() {
	    if (!debug.cancellation()) return this._warn("cancellation is disabled");

	    var promise = this;
	    var child = promise;
	    while (promise._isCancellable()) {
	        if (!promise._cancelBy(child)) {
	            if (child._isFollowing()) {
	                child._followee().cancel();
	            } else {
	                child._cancelBranched();
	            }
	            break;
	        }

	        var parent = promise._cancellationParent;
	        if (parent == null || !parent._isCancellable()) {
	            if (promise._isFollowing()) {
	                promise._followee().cancel();
	            } else {
	                promise._cancelBranched();
	            }
	            break;
	        } else {
	            if (promise._isFollowing()) promise._followee().cancel();
	            promise._setWillBeCancelled();
	            child = promise;
	            promise = parent;
	        }
	    }
	};

	Promise.prototype._branchHasCancelled = function() {
	    this._branchesRemainingToCancel--;
	};

	Promise.prototype._enoughBranchesHaveCancelled = function() {
	    return this._branchesRemainingToCancel === undefined ||
	           this._branchesRemainingToCancel <= 0;
	};

	Promise.prototype._cancelBy = function(canceller) {
	    if (canceller === this) {
	        this._branchesRemainingToCancel = 0;
	        this._invokeOnCancel();
	        return true;
	    } else {
	        this._branchHasCancelled();
	        if (this._enoughBranchesHaveCancelled()) {
	            this._invokeOnCancel();
	            return true;
	        }
	    }
	    return false;
	};

	Promise.prototype._cancelBranched = function() {
	    if (this._enoughBranchesHaveCancelled()) {
	        this._cancel();
	    }
	};

	Promise.prototype._cancel = function() {
	    if (!this._isCancellable()) return;
	    this._setCancelled();
	    async.invoke(this._cancelPromises, this, undefined);
	};

	Promise.prototype._cancelPromises = function() {
	    if (this._length() > 0) this._settlePromises();
	};

	Promise.prototype._unsetOnCancel = function() {
	    this._onCancelField = undefined;
	};

	Promise.prototype._isCancellable = function() {
	    return this.isPending() && !this._isCancelled();
	};

	Promise.prototype.isCancellable = function() {
	    return this.isPending() && !this.isCancelled();
	};

	Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
	    if (util.isArray(onCancelCallback)) {
	        for (var i = 0; i < onCancelCallback.length; ++i) {
	            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
	        }
	    } else if (onCancelCallback !== undefined) {
	        if (typeof onCancelCallback === "function") {
	            if (!internalOnly) {
	                var e = tryCatch(onCancelCallback).call(this._boundValue());
	                if (e === errorObj) {
	                    this._attachExtraTrace(e.e);
	                    async.throwLater(e.e);
	                }
	            }
	        } else {
	            onCancelCallback._resultCancelled(this);
	        }
	    }
	};

	Promise.prototype._invokeOnCancel = function() {
	    var onCancelCallback = this._onCancel();
	    this._unsetOnCancel();
	    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
	};

	Promise.prototype._invokeInternalOnCancel = function() {
	    if (this._isCancellable()) {
	        this._doInvokeOnCancel(this._onCancel(), true);
	        this._unsetOnCancel();
	    }
	};

	Promise.prototype._resultCancelled = function() {
	    this.cancel();
	};

	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	function returner() {
	    return this.value;
	}
	function thrower() {
	    throw this.reason;
	}

	Promise.prototype["return"] =
	Promise.prototype.thenReturn = function (value) {
	    if (value instanceof Promise) value.suppressUnhandledRejections();
	    return this._then(
	        returner, undefined, undefined, {value: value}, undefined);
	};

	Promise.prototype["throw"] =
	Promise.prototype.thenThrow = function (reason) {
	    return this._then(
	        thrower, undefined, undefined, {reason: reason}, undefined);
	};

	Promise.prototype.catchThrow = function (reason) {
	    if (arguments.length <= 1) {
	        return this._then(
	            undefined, thrower, undefined, {reason: reason}, undefined);
	    } else {
	        var _reason = arguments[1];
	        var handler = function() {throw _reason;};
	        return this.caught(reason, handler);
	    }
	};

	Promise.prototype.catchReturn = function (value) {
	    if (arguments.length <= 1) {
	        if (value instanceof Promise) value.suppressUnhandledRejections();
	        return this._then(
	            undefined, returner, undefined, {value: value}, undefined);
	    } else {
	        var _value = arguments[1];
	        if (_value instanceof Promise) _value.suppressUnhandledRejections();
	        var handler = function() {return _value;};
	        return this.caught(value, handler);
	    }
	};
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== undefined) {
	        promise = promise._target();
	        this._bitField = promise._bitField;
	        this._settledValueField = promise._isFateSealed()
	            ? promise._settledValue() : undefined;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValueField = undefined;
	    }
	}

	PromiseInspection.prototype._settledValue = function() {
	    return this._settledValueField;
	};

	var value = PromiseInspection.prototype.value = function () {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};

	var reason = PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason = function () {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};

	var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
	    return (this._bitField & 33554432) !== 0;
	};

	var isRejected = PromiseInspection.prototype.isRejected = function () {
	    return (this._bitField & 16777216) !== 0;
	};

	var isPending = PromiseInspection.prototype.isPending = function () {
	    return (this._bitField & 50397184) === 0;
	};

	var isResolved = PromiseInspection.prototype.isResolved = function () {
	    return (this._bitField & 50331648) !== 0;
	};

	PromiseInspection.prototype.isCancelled = function() {
	    return (this._bitField & 8454144) !== 0;
	};

	Promise.prototype.__isCancelled = function() {
	    return (this._bitField & 65536) === 65536;
	};

	Promise.prototype._isCancelled = function() {
	    return this._target().__isCancelled();
	};

	Promise.prototype.isCancelled = function() {
	    return (this._target()._bitField & 8454144) !== 0;
	};

	Promise.prototype.isPending = function() {
	    return isPending.call(this._target());
	};

	Promise.prototype.isRejected = function() {
	    return isRejected.call(this._target());
	};

	Promise.prototype.isFulfilled = function() {
	    return isFulfilled.call(this._target());
	};

	Promise.prototype.isResolved = function() {
	    return isResolved.call(this._target());
	};

	Promise.prototype.value = function() {
	    return value.call(this._target());
	};

	Promise.prototype.reason = function() {
	    var target = this._target();
	    target._unsetRejectionIsUnhandled();
	    return reason.call(target);
	};

	Promise.prototype._value = function() {
	    return this._settledValue();
	};

	Promise.prototype._reason = function() {
	    this._unsetRejectionIsUnhandled();
	    return this._settledValue();
	};

	Promise.PromiseInspection = PromiseInspection;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
	         getDomain) {
	var util = __webpack_require__(11);
	var canEvaluate = util.canEvaluate;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var reject;

	if (true) {
	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };

	    var promiseSetter = function(i) {
	        return new Function("promise", "holder", "                           \n\
	            'use strict';                                                    \n\
	            holder.pIndex = promise;                                         \n\
	            ".replace(/Index/g, i));
	    };

	    var generateHolderClass = function(total) {
	        var props = new Array(total);
	        for (var i = 0; i < props.length; ++i) {
	            props[i] = "this.p" + (i+1);
	        }
	        var assignment = props.join(" = ") + " = null;";
	        var cancellationCode= "var promise;\n" + props.map(function(prop) {
	            return "                                                         \n\
	                promise = " + prop + ";                                      \n\
	                if (promise instanceof Promise) {                            \n\
	                    promise.cancel();                                        \n\
	                }                                                            \n\
	            ";
	        }).join("\n");
	        var passedArguments = props.join(", ");
	        var name = "Holder$" + total;


	        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
	            'use strict';                                                    \n\
	            function [TheName](fn) {                                         \n\
	                [TheProperties]                                              \n\
	                this.fn = fn;                                                \n\
	                this.asyncNeeded = true;                                     \n\
	                this.now = 0;                                                \n\
	            }                                                                \n\
	                                                                             \n\
	            [TheName].prototype._callFunction = function(promise) {          \n\
	                promise._pushContext();                                      \n\
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
	                promise._popContext();                                       \n\
	                if (ret === errorObj) {                                      \n\
	                    promise._rejectCallback(ret.e, false);                   \n\
	                } else {                                                     \n\
	                    promise._resolveCallback(ret);                           \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype.checkFulfillment = function(promise) {       \n\
	                var now = ++this.now;                                        \n\
	                if (now === [TheTotal]) {                                    \n\
	                    if (this.asyncNeeded) {                                  \n\
	                        async.invoke(this._callFunction, this, promise);     \n\
	                    } else {                                                 \n\
	                        this._callFunction(promise);                         \n\
	                    }                                                        \n\
	                                                                             \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype._resultCancelled = function() {              \n\
	                [CancellationCode]                                           \n\
	            };                                                               \n\
	                                                                             \n\
	            return [TheName];                                                \n\
	        }(tryCatch, errorObj, Promise, async);                               \n\
	        ";

	        code = code.replace(/\[TheName\]/g, name)
	            .replace(/\[TheTotal\]/g, total)
	            .replace(/\[ThePassedArguments\]/g, passedArguments)
	            .replace(/\[TheProperties\]/g, assignment)
	            .replace(/\[CancellationCode\]/g, cancellationCode);

	        return new Function("tryCatch", "errorObj", "Promise", "async", code)
	                           (tryCatch, errorObj, Promise, async);
	    };

	    var holderClasses = [];
	    var thenCallbacks = [];
	    var promiseSetters = [];

	    for (var i = 0; i < 8; ++i) {
	        holderClasses.push(generateHolderClass(i + 1));
	        thenCallbacks.push(thenCallback(i + 1));
	        promiseSetters.push(promiseSetter(i + 1));
	    }

	    reject = function (reason) {
	        this._reject(reason);
	    };
	}}

	Promise.join = function () {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (true) {
	            if (last <= 8 && canEvaluate) {
	                var ret = new Promise(INTERNAL);
	                ret._captureStackTrace();
	                var HolderClass = holderClasses[last - 1];
	                var holder = new HolderClass(fn);
	                var callbacks = thenCallbacks;

	                for (var i = 0; i < last; ++i) {
	                    var maybePromise = tryConvertToPromise(arguments[i], ret);
	                    if (maybePromise instanceof Promise) {
	                        maybePromise = maybePromise._target();
	                        var bitField = maybePromise._bitField;
	                        ;
	                        if (((bitField & 50397184) === 0)) {
	                            maybePromise._then(callbacks[i], reject,
	                                               undefined, ret, holder);
	                            promiseSetters[i](maybePromise, holder);
	                            holder.asyncNeeded = false;
	                        } else if (((bitField & 33554432) !== 0)) {
	                            callbacks[i].call(ret,
	                                              maybePromise._value(), holder);
	                        } else if (((bitField & 16777216) !== 0)) {
	                            ret._reject(maybePromise._reason());
	                        } else {
	                            ret._cancel();
	                        }
	                    } else {
	                        callbacks[i].call(ret, maybePromise, holder);
	                    }
	                }

	                if (!ret._isFateSealed()) {
	                    if (holder.asyncNeeded) {
	                        var domain = getDomain();
	                        if (domain !== null) {
	                            holder.fn = util.domainBind(domain, holder.fn);
	                        }
	                    }
	                    ret._setAsyncGuaranteed();
	                    ret._setOnCancel(holder);
	                }
	                return ret;
	            }
	        }
	    }
	    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];};
	    if (fn) args.pop();
	    var ret = new PromiseArray(args).promise();
	    return fn !== undefined ? ret.spread(fn) : ret;
	};

	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = __webpack_require__(11);
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;

	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._promise._captureStackTrace();
	    var domain = getDomain();
	    this._callback = domain === null ? fn : util.domainBind(domain, fn);
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = [];
	    async.invoke(this._asyncInit, this, undefined);
	}
	util.inherits(MappingPromiseArray, PromiseArray);

	MappingPromiseArray.prototype._asyncInit = function() {
	    this._init$(undefined, -2);
	};

	MappingPromiseArray.prototype._init = function () {};

	MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;

	    if (index < 0) {
	        index = (index * -1) - 1;
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return true;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return false;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;

	        var promise = this._promise;
	        var callback = this._callback;
	        var receiver = promise._boundValue();
	        promise._pushContext();
	        var ret = tryCatch(callback).call(receiver, value, index, length);
	        var promiseCreated = promise._popContext();
	        debug.checkForgottenReturns(
	            ret,
	            promiseCreated,
	            preservedValues !== null ? "Promise.filter" : "Promise.map",
	            promise
	        );
	        if (ret === errorObj) {
	            this._reject(ret.e);
	            return true;
	        }

	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            var bitField = maybePromise._bitField;
	            ;
	            if (((bitField & 50397184) === 0)) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = maybePromise;
	                maybePromise._proxy(this, (index + 1) * -1);
	                return false;
	            } else if (((bitField & 33554432) !== 0)) {
	                ret = maybePromise._value();
	            } else if (((bitField & 16777216) !== 0)) {
	                this._reject(maybePromise._reason());
	                return true;
	            } else {
	                this._cancel();
	                return true;
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }
	        return true;
	    }
	    return false;
	};

	MappingPromiseArray.prototype._drainQueue = function () {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        if (this._isResolved()) return;
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};

	MappingPromiseArray.prototype._filter = function (booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};

	MappingPromiseArray.prototype.preservedValues = function () {
	    return this._preservedValues;
	};

	function map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }

	    var limit = 0;
	    if (options !== undefined) {
	        if (typeof options === "object" && options !== null) {
	            if (typeof options.concurrency !== "number") {
	                return Promise.reject(
	                    new TypeError("'concurrency' must be a number but it is " +
	                                    util.classString(options.concurrency)));
	            }
	            limit = options.concurrency;
	        } else {
	            return Promise.reject(new TypeError(
	                            "options argument must be an object but it is " +
	                             util.classString(options)));
	        }
	    }
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
	}

	Promise.prototype.map = function (fn, options) {
	    return map(this, fn, options, null);
	};

	Promise.map = function (promises, fn, options, _filter) {
	    return map(promises, fn, options, _filter);
	};


	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}

	module.exports = function(Promise) {
	var util = __webpack_require__(11);
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;

	var getMethodCaller;
	var getGetter;
	if (true) {
	var makeMethodCaller = function (methodName) {
	    return new Function("ensureMethod", "                                    \n\
	        return function(obj) {                                               \n\
	            'use strict'                                                     \n\
	            var len = this.length;                                           \n\
	            ensureMethod(obj, 'methodName');                                 \n\
	            switch(len) {                                                    \n\
	                case 1: return obj.methodName(this[0]);                      \n\
	                case 2: return obj.methodName(this[0], this[1]);             \n\
	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
	                case 0: return obj.methodName();                             \n\
	                default:                                                     \n\
	                    return obj.methodName.apply(obj, this);                  \n\
	            }                                                                \n\
	        };                                                                   \n\
	        ".replace(/methodName/g, methodName))(ensureMethod);
	};

	var makeGetter = function (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	};

	var getCompiled = function(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	};

	getMethodCaller = function(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	};

	getGetter = function(name) {
	    return getCompiled(name, makeGetter, getterCache);
	};
	}

	function ensureMethod(obj, methodName) {
	    var fn;
	    if (obj != null) fn = obj[methodName];
	    if (typeof fn !== "function") {
	        var message = "Object " + util.classString(obj) + " has no method '" +
	            util.toString(methodName) + "'";
	        throw new Promise.TypeError(message);
	    }
	    return fn;
	}

	function caller(obj) {
	    var methodName = this.pop();
	    var fn = ensureMethod(obj, methodName);
	    return fn.apply(obj, this);
	}
	Promise.prototype.call = function (methodName) {
	    var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];};
	    if (true) {
	        if (canEvaluate) {
	            var maybeCaller = getMethodCaller(methodName);
	            if (maybeCaller !== null) {
	                return this._then(
	                    maybeCaller, undefined, undefined, args, undefined);
	            }
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, undefined, undefined, args, undefined);
	};

	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    var index = +this;
	    if (index < 0) index = Math.max(0, index + obj.length);
	    return obj[index];
	}
	Promise.prototype.get = function (propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, undefined, undefined, propertyName, undefined);
	};
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function (Promise, apiRejection, tryConvertToPromise,
	    createContext, INTERNAL, debug) {
	    var util = __webpack_require__(11);
	    var TypeError = __webpack_require__(18).TypeError;
	    var inherits = __webpack_require__(11).inherits;
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    var NULL = {};

	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }

	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = new Promise(INTERNAL);
	        function iterator() {
	            if (i >= len) return ret._fulfill();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(
	                        maybePromise._getDisposer().tryDispose(inspection),
	                        resources.promise);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret;
	    }

	    function Disposer(data, promise, context) {
	        this._data = data;
	        this._promise = promise;
	        this._context = context;
	    }

	    Disposer.prototype.data = function () {
	        return this._data;
	    };

	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };

	    Disposer.prototype.resource = function () {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return NULL;
	    };

	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var context = this._context;
	        if (context !== undefined) context._pushContext();
	        var ret = resource !== NULL
	            ? this.doDispose(resource, inspection) : null;
	        if (context !== undefined) context._popContext();
	        this._promise._unsetDisposable();
	        this._data = null;
	        return ret;
	    };

	    Disposer.isDisposer = function (d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };

	    function FunctionDisposer(fn, promise, context) {
	        this.constructor$(fn, promise, context);
	    }
	    inherits(FunctionDisposer, Disposer);

	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };

	    function maybeUnwrapDisposer(value) {
	        if (Disposer.isDisposer(value)) {
	            this.resources[this.index]._setDisposable(value);
	            return value.promise();
	        }
	        return value;
	    }

	    function ResourceList(length) {
	        this.length = length;
	        this.promise = null;
	        this[length-1] = null;
	    }

	    ResourceList.prototype._resultCancelled = function() {
	        var len = this.length;
	        for (var i = 0; i < len; ++i) {
	            var item = this[i];
	            if (item instanceof Promise) {
	                item.cancel();
	            }
	        }
	    };

	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var input;
	        var spreadArgs = true;
	        if (len === 2 && Array.isArray(arguments[0])) {
	            input = arguments[0];
	            len = input.length;
	            spreadArgs = false;
	        } else {
	            input = arguments;
	            len--;
	        }
	        var resources = new ResourceList(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = input[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            } else {
	                var maybePromise = tryConvertToPromise(resource);
	                if (maybePromise instanceof Promise) {
	                    resource =
	                        maybePromise._then(maybeUnwrapDisposer, null, null, {
	                            resources: resources,
	                            index: i
	                    }, undefined);
	                }
	            }
	            resources[i] = resource;
	        }

	        var reflectedResources = new Array(resources.length);
	        for (var i = 0; i < reflectedResources.length; ++i) {
	            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
	        }

	        var resultPromise = Promise.all(reflectedResources)
	            .then(function(inspections) {
	                for (var i = 0; i < inspections.length; ++i) {
	                    var inspection = inspections[i];
	                    if (inspection.isRejected()) {
	                        errorObj.e = inspection.error();
	                        return errorObj;
	                    } else if (!inspection.isFulfilled()) {
	                        resultPromise.cancel();
	                        return;
	                    }
	                    inspections[i] = inspection.value();
	                }
	                promise._pushContext();

	                fn = tryCatch(fn);
	                var ret = spreadArgs
	                    ? fn.apply(undefined, inspections) : fn(inspections);
	                var promiseCreated = promise._popContext();
	                debug.checkForgottenReturns(
	                    ret, promiseCreated, "Promise.using", promise);
	                return ret;
	            });

	        var promise = resultPromise.lastly(function() {
	            var inspection = new Promise.PromiseInspection(resultPromise);
	            return dispose(resources, inspection);
	        });
	        resources.promise = promise;
	        promise._setOnCancel(resources);
	        return promise;
	    };

	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 131072;
	        this._disposer = disposer;
	    };

	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 131072) > 0;
	    };

	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };

	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & (~131072);
	        this._disposer = undefined;
	    };

	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this, createContext());
	        }
	        throw new TypeError();
	    };

	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, debug) {
	var util = __webpack_require__(11);
	var TimeoutError = Promise.TimeoutError;

	function HandleWrapper(handle)  {
	    this.handle = handle;
	}

	HandleWrapper.prototype._resultCancelled = function() {
	    clearTimeout(this.handle);
	};

	var afterValue = function(value) { return delay(+this).thenReturn(value); };
	var delay = Promise.delay = function (ms, value) {
	    var ret;
	    var handle;
	    if (value !== undefined) {
	        ret = Promise.resolve(value)
	                ._then(afterValue, null, null, ms, undefined);
	        if (debug.cancellation() && value instanceof Promise) {
	            ret._setOnCancel(value);
	        }
	    } else {
	        ret = new Promise(INTERNAL);
	        handle = setTimeout(function() { ret._fulfill(); }, +ms);
	        if (debug.cancellation()) {
	            ret._setOnCancel(new HandleWrapper(handle));
	        }
	        ret._captureStackTrace();
	    }
	    ret._setAsyncGuaranteed();
	    return ret;
	};

	Promise.prototype.delay = function (ms) {
	    return delay(ms, this);
	};

	var afterTimeout = function (promise, message, parent) {
	    var err;
	    if (typeof message !== "string") {
	        if (message instanceof Error) {
	            err = message;
	        } else {
	            err = new TimeoutError("operation timed out");
	        }
	    } else {
	        err = new TimeoutError(message);
	    }
	    util.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._reject(err);

	    if (parent != null) {
	        parent.cancel();
	    }
	};

	function successClear(value) {
	    clearTimeout(this.handle);
	    return value;
	}

	function failureClear(reason) {
	    clearTimeout(this.handle);
	    throw reason;
	}

	Promise.prototype.timeout = function (ms, message) {
	    ms = +ms;
	    var ret, parent;

	    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
	        if (ret.isPending()) {
	            afterTimeout(ret, message, parent);
	        }
	    }, ms));

	    if (debug.cancellation()) {
	        parent = this.then();
	        ret = parent._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	        ret._setOnCancel(handleWrapper);
	    } else {
	        ret = this._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	    }

	    return ret;
	};

	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          apiRejection,
	                          INTERNAL,
	                          tryConvertToPromise,
	                          Proxyable,
	                          debug) {
	var errors = __webpack_require__(18);
	var TypeError = errors.TypeError;
	var util = __webpack_require__(11);
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	var yieldHandlers = [];

	function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	    for (var i = 0; i < yieldHandlers.length; ++i) {
	        traceParent._pushContext();
	        var result = tryCatch(yieldHandlers[i])(value);
	        traceParent._popContext();
	        if (result === errorObj) {
	            traceParent._pushContext();
	            var ret = Promise.reject(errorObj.e);
	            traceParent._popContext();
	            return ret;
	        }
	        var maybePromise = tryConvertToPromise(result, traceParent);
	        if (maybePromise instanceof Promise) return maybePromise;
	    }
	    return null;
	}

	function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
	    if (debug.cancellation()) {
	        var internal = new Promise(INTERNAL);
	        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
	        this._promise = internal.lastly(function() {
	            return _finallyPromise;
	        });
	        internal._captureStackTrace();
	        internal._setOnCancel(this);
	    } else {
	        var promise = this._promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	    }
	    this._stack = stack;
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = undefined;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	    this._yieldedPromise = null;
	    this._cancellationPhase = false;
	}
	util.inherits(PromiseSpawn, Proxyable);

	PromiseSpawn.prototype._isResolved = function() {
	    return this._promise === null;
	};

	PromiseSpawn.prototype._cleanup = function() {
	    this._promise = this._generator = null;
	    if (debug.cancellation() && this._finallyPromise !== null) {
	        this._finallyPromise._fulfill();
	        this._finallyPromise = null;
	    }
	};

	PromiseSpawn.prototype._promiseCancelled = function() {
	    if (this._isResolved()) return;
	    var implementsReturn = typeof this._generator["return"] !== "undefined";

	    var result;
	    if (!implementsReturn) {
	        var reason = new Promise.CancellationError(
	            "generator .return() sentinel");
	        Promise.coroutine.returnSentinel = reason;
	        this._promise._attachExtraTrace(reason);
	        this._promise._pushContext();
	        result = tryCatch(this._generator["throw"]).call(this._generator,
	                                                         reason);
	        this._promise._popContext();
	    } else {
	        this._promise._pushContext();
	        result = tryCatch(this._generator["return"]).call(this._generator,
	                                                          undefined);
	        this._promise._popContext();
	    }
	    this._cancellationPhase = true;
	    this._yieldedPromise = null;
	    this._continue(result);
	};

	PromiseSpawn.prototype._promiseFulfilled = function(value) {
	    this._yieldedPromise = null;
	    this._promise._pushContext();
	    var result = tryCatch(this._generator.next).call(this._generator, value);
	    this._promise._popContext();
	    this._continue(result);
	};

	PromiseSpawn.prototype._promiseRejected = function(reason) {
	    this._yieldedPromise = null;
	    this._promise._attachExtraTrace(reason);
	    this._promise._pushContext();
	    var result = tryCatch(this._generator["throw"])
	        .call(this._generator, reason);
	    this._promise._popContext();
	    this._continue(result);
	};

	PromiseSpawn.prototype._resultCancelled = function() {
	    if (this._yieldedPromise instanceof Promise) {
	        var promise = this._yieldedPromise;
	        this._yieldedPromise = null;
	        promise.cancel();
	    }
	};

	PromiseSpawn.prototype.promise = function () {
	    return this._promise;
	};

	PromiseSpawn.prototype._run = function () {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = undefined;
	    this._promiseFulfilled(undefined);
	};

	PromiseSpawn.prototype._continue = function (result) {
	    var promise = this._promise;
	    if (result === errorObj) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._rejectCallback(result.e, false);
	        }
	    }

	    var value = result.value;
	    if (result.done === true) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._resolveCallback(value);
	        }
	    } else {
	        var maybePromise = tryConvertToPromise(value, this._promise);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise,
	                                        this._yieldHandlers,
	                                        this._promise);
	            if (maybePromise === null) {
	                this._promiseRejected(
	                    new TypeError(
	                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
	                        "From coroutine:\u000a" +
	                        this._stack.split("\n").slice(1, -7).join("\n")
	                    )
	                );
	                return;
	            }
	        }
	        maybePromise = maybePromise._target();
	        var bitField = maybePromise._bitField;
	        ;
	        if (((bitField & 50397184) === 0)) {
	            this._yieldedPromise = maybePromise;
	            maybePromise._proxy(this, null);
	        } else if (((bitField & 33554432) !== 0)) {
	            Promise._async.invoke(
	                this._promiseFulfilled, this, maybePromise._value()
	            );
	        } else if (((bitField & 16777216) !== 0)) {
	            Promise._async.invoke(
	                this._promiseRejected, this, maybePromise._reason()
	            );
	        } else {
	            this._promiseCancelled();
	        }
	    }
	};

	Promise.coroutine = function (generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    var stack = new Error().stack;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
	                                      stack);
	        var ret = spawn.promise();
	        spawn._generator = generator;
	        spawn._promiseFulfilled(undefined);
	        return ret;
	    };
	};

	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    yieldHandlers.push(fn);
	};

	Promise.spawn = function (generatorFunction) {
	    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	var util = __webpack_require__(11);
	var async = Promise._async;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	function spreadAdapter(val, nodeback) {
	    var promise = this;
	    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
	    var ret =
	        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	function successAdapter(val, nodeback) {
	    var promise = this;
	    var receiver = promise._boundValue();
	    var ret = val === undefined
	        ? tryCatch(nodeback).call(receiver, null)
	        : tryCatch(nodeback).call(receiver, null, val);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	function errorAdapter(reason, nodeback) {
	    var promise = this;
	    if (!reason) {
	        var newReason = new Error(reason + "");
	        newReason.cause = reason;
	        reason = newReason;
	    }
	    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
	                                                                     options) {
	    if (typeof nodeback == "function") {
	        var adapter = successAdapter;
	        if (options !== undefined && Object(options).spread) {
	            adapter = spreadAdapter;
	        }
	        this._then(
	            adapter,
	            errorAdapter,
	            undefined,
	            this,
	            nodeback
	        );
	    }
	    return this;
	};
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = __webpack_require__(11);
	var nodebackForPromise = __webpack_require__(25);
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = __webpack_require__(18).TypeError;
	var defaultSuffix = "Async";
	var defaultPromisified = {__isPromisified__: true};
	var noCopyProps = [
	    "arity",    "length",
	    "name",
	    "arguments",
	    "caller",
	    "callee",
	    "prototype",
	    "__isPromisified__"
	];
	var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

	var defaultFilter = function(name) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        name !== "constructor";
	};

	function propsFilter(key) {
	    return !noCopyPropsPattern.test(key);
	}

	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}

	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
	                        .replace("%s", suffix));
	                }
	            }
	        }
	    }
	}

	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        var passesDefaultFilter = filter === defaultFilter
	            ? true : defaultFilter(key, value, obj);
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj, passesDefaultFilter)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}

	var escapeIdentRegex = function(str) {
	    return str.replace(/([$])/, "\\$");
	};

	var makeNodePromisifiedEval;
	if (true) {
	var switchCaseArgumentOrder = function(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 3);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
	        ret.push(i);
	    }
	    return ret;
	};

	var argumentSequence = function(argumentCount) {
	    return util.filledRange(argumentCount, "_arg", "");
	};

	var parameterDeclaration = function(parameterCount) {
	    return util.filledRange(
	        Math.max(parameterCount, 3), "_arg", "");
	};

	var parameterCount = function(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	};

	makeNodePromisifiedEval =
	function(callback, receiver, originalName, fn, _, multiArgs) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (shouldProxyThis) {
	            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
	        } else {
	            ret = receiver === undefined
	                ? "ret = callback({{args}}, nodeback); break;\n"
	                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
	        }
	        return ret.replace("{{args}}", args).replace(", ", comma);
	    }

	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for (var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }

	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = nodeback;                                              \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", (shouldProxyThis
	                                ? "ret = callback.apply(this, args);\n"
	                                : "ret = callback.apply(receiver, args);\n"));
	        return ret;
	    }

	    var getFunctionCode = typeof callback === "string"
	                                ? ("this != null ? this['"+callback+"'] : fn")
	                                : "fn";
	    var body = "'use strict';                                                \n\
	        var ret = function (Parameters) {                                    \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._captureStackTrace();                                    \n\
	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
	            var ret;                                                         \n\
	            var callback = tryCatch([GetFunctionCode]);                      \n\
	            switch(len) {                                                    \n\
	                [CodeForSwitchCase]                                          \n\
	            }                                                                \n\
	            if (ret === errorObj) {                                          \n\
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
	            }                                                                \n\
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
	        return ret;                                                          \n\
	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
	        .replace("[GetFunctionCode]", getFunctionCode);
	    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
	    return new Function("Promise",
	                        "fn",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "tryCatch",
	                        "errorObj",
	                        "notEnumerableProp",
	                        "INTERNAL",
	                        body)(
	                    Promise,
	                    fn,
	                    receiver,
	                    withAppended,
	                    maybeWrapAsError,
	                    nodebackForPromise,
	                    util.tryCatch,
	                    util.errorObj,
	                    util.notEnumerableProp,
	                    INTERNAL);
	};
	}

	function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
	    var defaultThis = (function() {return this;})();
	    var method = callback;
	    if (typeof method === "string") {
	        callback = fn;
	    }
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        var promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	        var cb = typeof method === "string" && this !== defaultThis
	            ? this[method] : callback;
	        var fn = nodebackForPromise(promise, multiArgs);
	        try {
	            cb.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            promise._rejectCallback(maybeWrapAsError(e), true, true);
	        }
	        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
	        return promise;
	    }
	    util.notEnumerableProp(promisified, "__isPromisified__", true);
	    return promisified;
	}

	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;

	function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);

	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        if (promisifier === makeNodePromisified) {
	            obj[promisifiedKey] =
	                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	        } else {
	            var promisified = promisifier(fn, function() {
	                return makeNodePromisified(key, THIS, key,
	                                           fn, suffix, multiArgs);
	            });
	            util.notEnumerableProp(promisified, "__isPromisified__", true);
	            obj[promisifiedKey] = promisified;
	        }
	    }
	    util.toFastProperties(obj);
	    return obj;
	}

	function promisify(callback, receiver, multiArgs) {
	    return makeNodePromisified(callback, receiver, undefined,
	                                callback, null, multiArgs);
	}

	Promise.promisify = function (fn, options) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    options = Object(options);
	    var receiver = options.context === undefined ? THIS : options.context;
	    var multiArgs = !!options.multiArgs;
	    var ret = promisify(fn, receiver, multiArgs);
	    util.copyDescriptors(fn, ret, propsFilter);
	    return ret;
	};

	Promise.promisifyAll = function (target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    options = Object(options);
	    var multiArgs = !!options.multiArgs;
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }

	    var keys = util.inheritedDataKeys(target);
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier,
	                multiArgs);
	            promisifyAll(value, suffix, filter, promisifier, multiArgs);
	        }
	    }

	    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
	};
	};



/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(
	    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
	var util = __webpack_require__(11);
	var isObject = util.isObject;
	var es5 = __webpack_require__(12);
	var Es6Map;
	if (typeof Map === "function") Es6Map = Map;

	var mapToEntries = (function() {
	    var index = 0;
	    var size = 0;

	    function extractEntry(value, key) {
	        this[index] = value;
	        this[index + size] = key;
	        index++;
	    }

	    return function mapToEntries(map) {
	        size = map.size;
	        index = 0;
	        var ret = new Array(map.size * 2);
	        map.forEach(extractEntry, ret);
	        return ret;
	    };
	})();

	var entriesToMap = function(entries) {
	    var ret = new Es6Map();
	    var length = entries.length / 2 | 0;
	    for (var i = 0; i < length; ++i) {
	        var key = entries[length + i];
	        var value = entries[i];
	        ret.set(key, value);
	    }
	    return ret;
	};

	function PropertiesPromiseArray(obj) {
	    var isMap = false;
	    var entries;
	    if (Es6Map !== undefined && obj instanceof Es6Map) {
	        entries = mapToEntries(obj);
	        isMap = true;
	    } else {
	        var keys = es5.keys(obj);
	        var len = keys.length;
	        entries = new Array(len * 2);
	        for (var i = 0; i < len; ++i) {
	            var key = keys[i];
	            entries[i] = obj[key];
	            entries[i + len] = key;
	        }
	    }
	    this.constructor$(entries);
	    this._isMap = isMap;
	    this._init$(undefined, isMap ? -6 : -3);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);

	PropertiesPromiseArray.prototype._init = function () {};

	PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val;
	        if (this._isMap) {
	            val = entriesToMap(this._values);
	        } else {
	            val = {};
	            var keyOffset = this.length();
	            for (var i = 0, len = this.length(); i < len; ++i) {
	                val[this._values[i + keyOffset]] = this._values[i];
	            }
	        }
	        this._resolve(val);
	        return true;
	    }
	    return false;
	};

	PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	PropertiesPromiseArray.prototype.getActualLength = function (len) {
	    return len >> 1;
	};

	function props(promises) {
	    var ret;
	    var castValue = tryConvertToPromise(promises);

	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(
	            Promise.props, undefined, undefined, undefined, undefined);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }

	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 2);
	    }
	    return ret;
	}

	Promise.prototype.props = function () {
	    return props(this);
	};

	Promise.props = function (promises) {
	    return props(promises);
	};
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(
	    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
	var util = __webpack_require__(11);

	var raceLater = function (promise) {
	    return promise.then(function(array) {
	        return race(array, promise);
	    });
	};

	function race(promises, parent) {
	    var maybePromise = tryConvertToPromise(promises);

	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else {
	        promises = util.asArray(promises);
	        if (promises === null)
	            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
	    }

	    var ret = new Promise(INTERNAL);
	    if (parent !== undefined) {
	        ret._propagateFrom(parent, 3);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];

	        if (val === undefined && !(i in promises)) {
	            continue;
	        }

	        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	    }
	    return ret;
	}

	Promise.race = function (promises) {
	    return race(promises, undefined);
	};

	Promise.prototype.race = function () {
	    return race(this, undefined);
	};

	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = __webpack_require__(11);
	var tryCatch = util.tryCatch;

	function ReductionPromiseArray(promises, fn, initialValue, _each) {
	    this.constructor$(promises);
	    var domain = getDomain();
	    this._fn = domain === null ? fn : util.domainBind(domain, fn);
	    if (initialValue !== undefined) {
	        initialValue = Promise.resolve(initialValue);
	        initialValue._attachCancellationCallback(this);
	    }
	    this._initialValue = initialValue;
	    this._currentCancellable = null;
	    if(_each === INTERNAL) {
	        this._eachValues = Array(this._length);
	    } else if (_each === 0) {
	        this._eachValues = null;
	    } else {
	        this._eachValues = undefined;
	    }
	    this._promise._captureStackTrace();
	    this._init$(undefined, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);

	ReductionPromiseArray.prototype._gotAccum = function(accum) {
	    if (this._eachValues !== undefined && 
	        this._eachValues !== null && 
	        accum !== INTERNAL) {
	        this._eachValues.push(accum);
	    }
	};

	ReductionPromiseArray.prototype._eachComplete = function(value) {
	    if (this._eachValues !== null) {
	        this._eachValues.push(value);
	    }
	    return this._eachValues;
	};

	ReductionPromiseArray.prototype._init = function() {};

	ReductionPromiseArray.prototype._resolveEmptyArray = function() {
	    this._resolve(this._eachValues !== undefined ? this._eachValues
	                                                 : this._initialValue);
	};

	ReductionPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	ReductionPromiseArray.prototype._resolve = function(value) {
	    this._promise._resolveCallback(value);
	    this._values = null;
	};

	ReductionPromiseArray.prototype._resultCancelled = function(sender) {
	    if (sender === this._initialValue) return this._cancel();
	    if (this._isResolved()) return;
	    this._resultCancelled$();
	    if (this._currentCancellable instanceof Promise) {
	        this._currentCancellable.cancel();
	    }
	    if (this._initialValue instanceof Promise) {
	        this._initialValue.cancel();
	    }
	};

	ReductionPromiseArray.prototype._iterate = function (values) {
	    this._values = values;
	    var value;
	    var i;
	    var length = values.length;
	    if (this._initialValue !== undefined) {
	        value = this._initialValue;
	        i = 0;
	    } else {
	        value = Promise.resolve(values[0]);
	        i = 1;
	    }

	    this._currentCancellable = value;

	    if (!value.isRejected()) {
	        for (; i < length; ++i) {
	            var ctx = {
	                accum: null,
	                value: values[i],
	                index: i,
	                length: length,
	                array: this
	            };
	            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
	        }
	    }

	    if (this._eachValues !== undefined) {
	        value = value
	            ._then(this._eachComplete, undefined, undefined, this, undefined);
	    }
	    value._then(completed, completed, undefined, value, this);
	};

	Promise.prototype.reduce = function (fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};

	Promise.reduce = function (promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};

	function completed(valueOrReason, array) {
	    if (this.isFulfilled()) {
	        array._resolve(valueOrReason);
	    } else {
	        array._reject(valueOrReason);
	    }
	}

	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}

	function gotAccum(accum) {
	    this.accum = accum;
	    this.array._gotAccum(accum);
	    var value = tryConvertToPromise(this.value, this.array._promise);
	    if (value instanceof Promise) {
	        this.array._currentCancellable = value;
	        return value._then(gotValue, undefined, undefined, this, undefined);
	    } else {
	        return gotValue.call(this, value);
	    }
	}

	function gotValue(value) {
	    var array = this.array;
	    var promise = array._promise;
	    var fn = tryCatch(array._fn);
	    promise._pushContext();
	    var ret;
	    if (array._eachValues !== undefined) {
	        ret = fn.call(promise._boundValue(), value, this.index, this.length);
	    } else {
	        ret = fn.call(promise._boundValue(),
	                              this.accum, value, this.index, this.length);
	    }
	    if (ret instanceof Promise) {
	        array._currentCancellable = ret;
	    }
	    var promiseCreated = promise._popContext();
	    debug.checkForgottenReturns(
	        ret,
	        promiseCreated,
	        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
	        promise
	    );
	    return ret;
	}
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	    function(Promise, PromiseArray, debug) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = __webpack_require__(11);

	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);

	SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};

	SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 33554432;
	    ret._settledValueField = value;
	    return this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 16777216;
	    ret._settledValueField = reason;
	    return this._promiseResolved(index, ret);
	};

	Promise.settle = function (promises) {
	    debug.deprecated(".settle()", ".reflect()");
	    return new SettledPromiseArray(promises).promise();
	};

	Promise.prototype.settle = function () {
	    return Promise.settle(this);
	};
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = __webpack_require__(11);
	var RangeError = __webpack_require__(18).RangeError;
	var AggregateError = __webpack_require__(18).AggregateError;
	var isArray = util.isArray;
	var CANCELLATION = {};


	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);

	SomePromiseArray.prototype._init = function () {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(undefined, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};

	SomePromiseArray.prototype.init = function () {
	    this._initialized = true;
	    this._init();
	};

	SomePromiseArray.prototype.setUnwrap = function () {
	    this._unwrap = true;
	};

	SomePromiseArray.prototype.howMany = function () {
	    return this._howMany;
	};

	SomePromiseArray.prototype.setHowMany = function (count) {
	    this._howMany = count;
	};

	SomePromiseArray.prototype._promiseFulfilled = function (value) {
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	        return true;
	    }
	    return false;

	};
	SomePromiseArray.prototype._promiseRejected = function (reason) {
	    this._addRejected(reason);
	    return this._checkOutcome();
	};

	SomePromiseArray.prototype._promiseCancelled = function () {
	    if (this._values instanceof Promise || this._values == null) {
	        return this._cancel();
	    }
	    this._addRejected(CANCELLATION);
	    return this._checkOutcome();
	};

	SomePromiseArray.prototype._checkOutcome = function() {
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            if (this._values[i] !== CANCELLATION) {
	                e.push(this._values[i]);
	            }
	        }
	        if (e.length > 0) {
	            this._reject(e);
	        } else {
	            this._cancel();
	        }
	        return true;
	    }
	    return false;
	};

	SomePromiseArray.prototype._fulfilled = function () {
	    return this._totalResolved;
	};

	SomePromiseArray.prototype._rejected = function () {
	    return this._values.length - this.length();
	};

	SomePromiseArray.prototype._addRejected = function (reason) {
	    this._values.push(reason);
	};

	SomePromiseArray.prototype._addFulfilled = function (value) {
	    this._values[this._totalResolved++] = value;
	};

	SomePromiseArray.prototype._canPossiblyFulfill = function () {
	    return this.length() - this._rejected();
	};

	SomePromiseArray.prototype._getRangeError = function (count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};

	SomePromiseArray.prototype._resolveEmptyArray = function () {
	    this._reject(this._getRangeError(0));
	};

	function some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}

	Promise.some = function (promises, howMany) {
	    return some(promises, howMany);
	};

	Promise.prototype.some = function (howMany) {
	    return some(this, howMany);
	};

	Promise._SomePromiseArray = SomePromiseArray;
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;

	Promise.prototype.filter = function (fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};

	Promise.filter = function (promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;
	var PromiseAll = Promise.all;

	function promiseAllThis() {
	    return PromiseAll(this);
	}

	function PromiseMapSeries(promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
	}

	Promise.prototype.each = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, this, undefined);
	};

	Promise.prototype.mapSeries = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
	};

	Promise.each = function (promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, promises, undefined);
	};

	Promise.mapSeries = PromiseMapSeries;
	};



/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}

	Promise.any = function (promises) {
	    return any(promises);
	};

	Promise.prototype.any = function () {
	    return any(this);
	};

	};


/***/ },
/* 47 */
/***/ function(module, exports) {

	var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/*! adapterjs - v0.15.0 - 2017-12-14 */// Adapter's interface.
	var AdapterJS=AdapterJS||{};AdapterJS.options=AdapterJS.options||{};// uncomment to get virtual webcams
	// AdapterJS.options.getAllCams = true;
	AdapterJS.options.getAllCams=!!AdapterJS.options.getAllCams;// uncomment to prevent the install prompt when the plugin in not yet installed
	// AdapterJS.options.hidePluginInstallPrompt = true;
	AdapterJS.options.hidePluginInstallPrompt=!!AdapterJS.options.hidePluginInstallPrompt;// uncomment to force the use of the plugin on Safari
	// AdapterJS.options.forceSafariPlugin = true;
	AdapterJS.options.forceSafariPlugin=!!AdapterJS.options.forceSafariPlugin;// AdapterJS version
	AdapterJS.VERSION='0.15.0';// This function will be called when the WebRTC API is ready to be used
	// Whether it is the native implementation (Chrome, Firefox, Opera) or
	// the plugin
	// You may Override this function to synchronise the start of your application
	// with the WebRTC API being ready.
	// If you decide not to override use this synchronisation, it may result in
	// an extensive CPU usage on the plugin start (once per tab loaded)
	// Params:
	//    - isUsingPlugin: true is the WebRTC plugin is being used, false otherwise
	//
	AdapterJS.onwebrtcready=AdapterJS.onwebrtcready||function(isUsingPlugin){// The WebRTC API is ready.
	// Override me and do whatever you want here
	};// New interface to store multiple callbacks, private
	AdapterJS._onwebrtcreadies=[];// Sets a callback function to be called when the WebRTC interface is ready.
	// The first argument is the function to callback.\
	// Throws an error if the first argument is not a function
	AdapterJS.webRTCReady=function(baseCallback){if(typeof baseCallback!=='function'){throw new Error('Callback provided is not a function');}var callback=function callback(){// Make users having requirejs to use the webRTCReady function to define first
	// When you set a setTimeout(definePolyfill, 0), it overrides the WebRTC function
	// This is be more than 0s
	if(typeof window.require==='function'&&typeof AdapterJS._defineMediaSourcePolyfill==='function'){AdapterJS._defineMediaSourcePolyfill();}// All WebRTC interfaces are ready, just call the callback
	baseCallback(null!==AdapterJS.WebRTCPlugin.plugin);};if(true===AdapterJS.onwebrtcreadyDone){callback();}else{// will be triggered automatically when your browser/plugin is ready.
	AdapterJS._onwebrtcreadies.push(callback);}};// Plugin namespace
	AdapterJS.WebRTCPlugin=AdapterJS.WebRTCPlugin||{};// The object to store plugin information
	/* jshint ignore:start */AdapterJS.WebRTCPlugin.pluginInfo=AdapterJS.WebRTCPlugin.pluginInfo||{prefix:'Tem',plugName:'TemWebRTCPlugin',pluginId:'plugin0',type:'application/x-temwebrtcplugin',onload:'__TemWebRTCReady0',portalLink:'https://skylink.io/plugin/',downloadLink:null,//set below
	companyName:'Temasys',downloadLinks:{//mac: 'https://bit.ly/webrtcpluginpkg',
	win:'https://turn2.easemob.com/rtc-ws/TemWebRTCPlugin.msi'}};if(typeof AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks!=="undefined"&&AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks!==null){if(!!navigator.platform.match(/^Mac/i)){AdapterJS.WebRTCPlugin.pluginInfo.downloadLink=AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks.mac;}else if(!!navigator.platform.match(/^Win/i)){AdapterJS.WebRTCPlugin.pluginInfo.downloadLink=AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks.win;}}/* jshint ignore:end */AdapterJS.WebRTCPlugin.TAGS={NONE:'none',AUDIO:'audio',VIDEO:'video'};// Unique identifier of each opened page
	AdapterJS.WebRTCPlugin.pageId=Math.random().toString(36).slice(2);// Use this whenever you want to call the plugin.
	AdapterJS.WebRTCPlugin.plugin=null;// Set log level for the plugin once it is ready.
	// The different values are
	// This is an asynchronous function that will run when the plugin is ready
	AdapterJS.WebRTCPlugin.setLogLevel=null;// Defines webrtc's JS interface according to the plugin's implementation.
	// Define plugin Browsers as WebRTC Interface.
	AdapterJS.WebRTCPlugin.defineWebRTCInterface=null;// This function detects whether or not a plugin is installed.
	// Checks if Not IE (firefox, for example), else if it's IE,
	// we're running IE and do something. If not it is not supported.
	AdapterJS.WebRTCPlugin.isPluginInstalled=null;// Lets adapter.js wait until the the document is ready before injecting the plugin
	AdapterJS.WebRTCPlugin.pluginInjectionInterval=null;// Inject the HTML DOM object element into the page.
	AdapterJS.WebRTCPlugin.injectPlugin=null;// States of readiness that the plugin goes through when
	// being injected and stated
	AdapterJS.WebRTCPlugin.PLUGIN_STATES={NONE:0,// no plugin use
	INITIALIZING:1,// Detected need for plugin
	INJECTING:2,// Injecting plugin
	INJECTED:3,// Plugin element injected but not usable yet
	READY:4// Plugin ready to be used
	};// Current state of the plugin. You cannot use the plugin before this is
	// equal to AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY
	AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.NONE;// True is AdapterJS.onwebrtcready was already called, false otherwise
	// Used to make sure AdapterJS.onwebrtcready is only called once
	AdapterJS.onwebrtcreadyDone=false;// Log levels for the plugin.
	// To be set by calling AdapterJS.WebRTCPlugin.setLogLevel
	/*
	 Log outputs are prefixed in some cases.
	 INFO: Information reported by the plugin.
	 ERROR: Errors originating from within the plugin.
	 WEBRTC: Error originating from within the libWebRTC library
	 */// From the least verbose to the most verbose
	AdapterJS.WebRTCPlugin.PLUGIN_LOG_LEVELS={NONE:'NONE',ERROR:'ERROR',WARNING:'WARNING',INFO:'INFO',VERBOSE:'VERBOSE',SENSITIVE:'SENSITIVE'};// Does a waiting check before proceeding to load the plugin.
	AdapterJS.WebRTCPlugin.WaitForPluginReady=null;// This methid will use an interval to wait for the plugin to be ready.
	AdapterJS.WebRTCPlugin.callWhenPluginReady=null;// !!!! WARNING: DO NOT OVERRIDE THIS FUNCTION. !!!
	// This function will be called when plugin is ready. It sends necessary
	// details to the plugin.
	// The function will wait for the document to be ready and the set the
	// plugin state to AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY,
	// indicating that it can start being requested.
	// This function is not in the IE/Safari condition brackets so that
	// TemPluginLoaded function might be called on Chrome/Firefox.
	// This function is the only private function that is not encapsulated to
	// allow the plugin method to be called.
	__TemWebRTCReady0=function(_TemWebRTCReady){function __TemWebRTCReady0(){return _TemWebRTCReady.apply(this,arguments);}__TemWebRTCReady0.toString=function(){return _TemWebRTCReady.toString();};return __TemWebRTCReady0;}(function(){if(document.readyState==='interactive'||document.readyState==='complete'){AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY;AdapterJS.maybeThroughWebRTCReady();}else{// Try again in 100ms
	setTimeout(__TemWebRTCReady0,100);}});AdapterJS.maybeThroughWebRTCReady=function(){if(!AdapterJS.onwebrtcreadyDone){AdapterJS.onwebrtcreadyDone=true;// If new interface for multiple callbacks used
	if(AdapterJS._onwebrtcreadies.length){AdapterJS._onwebrtcreadies.forEach(function(callback){if(typeof callback==='function'){callback(AdapterJS.WebRTCPlugin.plugin!==null);}});// Else if no callbacks on new interface assuming user used old(deprecated) way to set callback through AdapterJS.onwebrtcready = ...
	}else if(typeof AdapterJS.onwebrtcready==='function'){AdapterJS.onwebrtcready(AdapterJS.WebRTCPlugin.plugin!==null);}}};// Text namespace
	AdapterJS.TEXT={PLUGIN:{REQUIRE_INSTALLATION:'This website requires you to install a WebRTC-enabling plugin '+'to work on this browser.',NOT_SUPPORTED:'Your browser does not support WebRTC.',BUTTON:'Install Now'},REFRESH:{REQUIRE_REFRESH:'Please refresh page',BUTTON:'Refresh Page'}};// The result of ice connection states.
	// - starting: Ice connection is starting.
	// - checking: Ice connection is checking.
	// - connected Ice connection is connected.
	// - completed Ice connection is connected.
	// - done Ice connection has been completed.
	// - disconnected Ice connection has been disconnected.
	// - failed Ice connection has failed.
	// - closed Ice connection is closed.
	AdapterJS._iceConnectionStates={starting:'starting',checking:'checking',connected:'connected',completed:'connected',done:'completed',disconnected:'disconnected',failed:'failed',closed:'closed'};//The IceConnection states that has been fired for each peer.
	AdapterJS._iceConnectionFiredStates=[];// Check if WebRTC Interface is defined.
	AdapterJS.isDefined=null;// This function helps to retrieve the webrtc detected browser information.
	// This sets:
	// - webrtcDetectedBrowser: The browser agent name.
	// - webrtcDetectedVersion: The browser version.
	// - webrtcMinimumVersion: The minimum browser version still supported by AJS.
	// - webrtcDetectedType: The types of webRTC support.
	//   - 'moz': Mozilla implementation of webRTC.
	//   - 'webkit': WebKit implementation of webRTC.
	//   - 'plugin': Using the plugin implementation.
	AdapterJS.parseWebrtcDetectedBrowser=function(){var hasMatch=null;// Detect Opera (8.0+)
	if(!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(' OPR/')>=0){hasMatch=navigator.userAgent.match(/OPR\/(\d+)/i)||[];webrtcDetectedBrowser='opera';webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);webrtcMinimumVersion=26;webrtcDetectedType='webkit';webrtcDetectedDCSupport='SCTP';// Opera 20+ uses Chrome 33
	// Detect Bowser on iOS
	}else if(navigator.userAgent.match(/Bowser\/[0-9.]*/g)){hasMatch=navigator.userAgent.match(/Bowser\/[0-9.]*/g)||[];var chromiumVersion=parseInt((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./i)||[])[2]||'0',10);webrtcDetectedBrowser='bowser';webrtcDetectedVersion=parseFloat((hasMatch[0]||'0/0').split('/')[1],10);webrtcMinimumVersion=0;webrtcDetectedType='webkit';webrtcDetectedDCSupport=chromiumVersion>30?'SCTP':'RTP';// Detect Opera on iOS (does not support WebRTC yet)
	}else if(navigator.userAgent.indexOf('OPiOS')>0){hasMatch=navigator.userAgent.match(/OPiOS\/([0-9]+)\./);// Browser which do not support webrtc yet
	webrtcDetectedBrowser='opera';webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);webrtcMinimumVersion=0;webrtcDetectedType=null;webrtcDetectedDCSupport=null;// Detect Chrome on iOS (does not support WebRTC yet)
	}else if(navigator.userAgent.indexOf('CriOS')>0){hasMatch=navigator.userAgent.match(/CriOS\/([0-9]+)\./)||[];webrtcDetectedBrowser='chrome';webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);webrtcMinimumVersion=0;webrtcDetectedType=null;webrtcDetectedDCSupport=null;// Detect Firefox on iOS (does not support WebRTC yet)
	}else if(navigator.userAgent.indexOf('FxiOS')>0){hasMatch=navigator.userAgent.match(/FxiOS\/([0-9]+)\./)||[];// Browser which do not support webrtc yet
	webrtcDetectedBrowser='firefox';webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);webrtcMinimumVersion=0;webrtcDetectedType=null;webrtcDetectedDCSupport=null;// Detect IE (6-11)
	}else if(/*@cc_on!@*/false||!!document.documentMode){hasMatch=/\brv[ :]+(\d+)/g.exec(navigator.userAgent)||[];webrtcDetectedBrowser='IE';webrtcDetectedVersion=parseInt(hasMatch[1],10);webrtcMinimumVersion=9;webrtcDetectedType='plugin';webrtcDetectedDCSupport='SCTP';if(!webrtcDetectedVersion){hasMatch=/\bMSIE[ :]+(\d+)/g.exec(navigator.userAgent)||[];webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);}// Detect Edge (20+)
	}else if(!!window.StyleMedia||navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)){hasMatch=navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)||[];// Previous webrtc/adapter uses minimum version as 10547 but checking in the Edge release history,
	// It's close to 13.10547 and ObjectRTC API is fully supported in that version
	webrtcDetectedBrowser='edge';webrtcDetectedVersion=parseFloat((hasMatch[0]||'0/0').split('/')[1],10);webrtcMinimumVersion=13.10547;webrtcDetectedType='ms';webrtcDetectedDCSupport=null;// Detect Firefox (1.0+)
	// Placed before Safari check to ensure Firefox on Android is detected
	}else if(typeof InstallTrigger!=='undefined'||navigator.userAgent.indexOf('irefox')>0){hasMatch=navigator.userAgent.match(/Firefox\/([0-9]+)\./)||[];webrtcDetectedBrowser='firefox';webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);webrtcMinimumVersion=33;webrtcDetectedType='moz';webrtcDetectedDCSupport='SCTP';// Detect Chrome (1+ and mobile)
	// Placed before Safari check to ensure Chrome on Android is detected
	}else if(!!window.chrome&&!!window.chrome.webstore||navigator.userAgent.indexOf('Chrom')>0){hasMatch=navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./i)||[];webrtcDetectedBrowser='chrome';webrtcDetectedVersion=parseInt(hasMatch[2]||'0',10);webrtcMinimumVersion=38;webrtcDetectedType='webkit';webrtcDetectedDCSupport=webrtcDetectedVersion>30?'SCTP':'RTP';// Chrome 31+ supports SCTP without flags
	// Detect Safari
	}else if(/constructor/i.test(window.HTMLElement)||function(p){return p.toString()==="[object SafariRemoteNotification]";}(!window['safari']||safari.pushNotification)||navigator.userAgent.match(/AppleWebKit\/(\d+)\./)||navigator.userAgent.match(/Version\/(\d+).(\d+)/)){hasMatch=navigator.userAgent.match(/version\/(\d+)/i)||[];AppleWebKitBuild=navigator.userAgent.match(/AppleWebKit\/(\d+)/i)||[];var isMobile=navigator.userAgent.match(/(iPhone|iPad)/gi);var hasNativeImpl=AppleWebKitBuild.length>=1&&AppleWebKitBuild[1]>=604;webrtcDetectedBrowser='safari';webrtcDetectedVersion=parseInt(hasMatch[1]||'0',10);webrtcMinimumVersion=7;if(isMobile){webrtcDetectedType=hasNativeImpl?'AppleWebKit':null;}else{// desktop
	webrtcDetectedType=hasNativeImpl&&!AdapterJS.options.forceSafariPlugin?'AppleWebKit':'plugin';}webrtcDetectedDCSupport='SCTP';}// Scope it to AdapterJS and window for better consistency
	AdapterJS.webrtcDetectedBrowser=window.webrtcDetectedBrowser=webrtcDetectedBrowser;AdapterJS.webrtcDetectedVersion=window.webrtcDetectedVersion=webrtcDetectedVersion;AdapterJS.webrtcMinimumVersion=window.webrtcMinimumVersion=webrtcMinimumVersion;AdapterJS.webrtcDetectedType=window.webrtcDetectedType=webrtcDetectedType;AdapterJS.webrtcDetectedDCSupport=window.webrtcDetectedDCSupport=webrtcDetectedDCSupport;};AdapterJS.addEvent=function(elem,evnt,func){if(elem.addEventListener){// W3C DOM
	elem.addEventListener(evnt,func,false);}else if(elem.attachEvent){// OLD IE DOM
	elem.attachEvent('on'+evnt,func);}else{// No much to do
	elem[evnt]=func;}};AdapterJS.renderNotificationBar=function(message,buttonText,buttonCallback){// only inject once the page is ready
	if(document.readyState!=='interactive'&&document.readyState!=='complete'){return;}var w=window;var i=document.createElement('iframe');i.name='adapterjs-alert';i.style.position='fixed';i.style.top='-41px';i.style.left=0;i.style.right=0;i.style.width='100%';i.style.height='40px';i.style.backgroundColor='#ffffe1';i.style.border='none';i.style.borderBottom='1px solid #888888';i.style.zIndex='9999999';if(typeof i.style.webkitTransition==='string'){i.style.webkitTransition='all .5s ease-out';}else if(typeof i.style.transition==='string'){i.style.transition='all .5s ease-out';}document.body.appendChild(i);var c=i.contentWindow?i.contentWindow:i.contentDocument.document?i.contentDocument.document:i.contentDocument;c.document.open();c.document.write('<span style="display: inline-block; font-family: Helvetica, Arial,'+'sans-serif; font-size: .9rem; padding: 4px; vertical-align: '+'middle; cursor: default;">'+message+'</span>');if(buttonText&&typeof buttonCallback==='function'){c.document.write('<button id="okay">'+buttonText+'</button><button id="cancel">Cancel</button>');c.document.close();// On click on okay
	AdapterJS.addEvent(c.document.getElementById('okay'),'click',function(e){e.preventDefault();try{e.cancelBubble=true;}catch(error){}buttonCallback(e);});// On click on Cancel - all bars has same logic so keeping it that way for now
	AdapterJS.addEvent(c.document.getElementById('cancel'),'click',function(e){w.document.body.removeChild(i);});}else{c.document.close();}setTimeout(function(){if(typeof i.style.webkitTransform==='string'){i.style.webkitTransform='translateY(40px)';}else if(typeof i.style.transform==='string'){i.style.transform='translateY(40px)';}else{i.style.top='0px';}},300);};// -----------------------------------------------------------
	// Detected webrtc implementation. Types are:
	// - 'moz': Mozilla implementation of webRTC.
	// - 'webkit': WebKit implementation of webRTC.
	// - 'plugin': Using the plugin implementation.
	webrtcDetectedType=null;// Set the settings for creating DataChannels, MediaStream for
	// Cross-browser compability.
	// - This is only for SCTP based support browsers.
	// the 'urls' attribute.
	checkMediaDataChannelSettings=function checkMediaDataChannelSettings(peerBrowserAgent,peerBrowserVersion,callback,constraints){if(typeof callback!=='function'){return;}var beOfferer=true;var isLocalFirefox=AdapterJS.webrtcDetectedBrowser==='firefox';// Nightly version does not require MozDontOfferDataChannel for interop
	var isLocalFirefoxInterop=AdapterJS.webrtcDetectedType==='moz'&&AdapterJS.webrtcDetectedVersion>30;var isPeerFirefox=peerBrowserAgent==='firefox';var isPeerFirefoxInterop=peerBrowserAgent==='firefox'&&(peerBrowserVersion?peerBrowserVersion>30:false);// Resends an updated version of constraints for MozDataChannel to work
	// If other userAgent is firefox and user is firefox, remove MozDataChannel
	if(isLocalFirefox&&isPeerFirefox||isLocalFirefoxInterop){try{delete constraints.mandatory.MozDontOfferDataChannel;}catch(error){console.error('Failed deleting MozDontOfferDataChannel');console.error(error);}}else if(isLocalFirefox&&!isPeerFirefox){constraints.mandatory.MozDontOfferDataChannel=true;}if(!isLocalFirefox){// temporary measure to remove Moz* constraints in non Firefox browsers
	for(var prop in constraints.mandatory){if(constraints.mandatory.hasOwnProperty(prop)){if(prop.indexOf('Moz')!==-1){delete constraints.mandatory[prop];}}}}// Firefox (not interopable) cannot offer DataChannel as it will cause problems to the
	// interopability of the media stream
	if(isLocalFirefox&&!isPeerFirefox&&!isLocalFirefoxInterop){beOfferer=false;}callback(beOfferer,constraints);};// Handles the differences for all browsers ice connection state output.
	// - Tested outcomes are:
	//   - Chrome (offerer)  : 'checking' > 'completed' > 'completed'
	//   - Chrome (answerer) : 'checking' > 'connected'
	//   - Firefox (offerer) : 'checking' > 'connected'
	//   - Firefox (answerer): 'checking' > 'connected'
	checkIceConnectionState=function checkIceConnectionState(peerId,iceConnectionState,callback){if(typeof callback!=='function'){console.warn('No callback specified in checkIceConnectionState. Aborted.');return;}peerId=peerId?peerId:'peer';if(!AdapterJS._iceConnectionFiredStates[peerId]||iceConnectionState===AdapterJS._iceConnectionStates.disconnected||iceConnectionState===AdapterJS._iceConnectionStates.failed||iceConnectionState===AdapterJS._iceConnectionStates.closed){AdapterJS._iceConnectionFiredStates[peerId]=[];}iceConnectionState=AdapterJS._iceConnectionStates[iceConnectionState];if(AdapterJS._iceConnectionFiredStates[peerId].indexOf(iceConnectionState)<0){AdapterJS._iceConnectionFiredStates[peerId].push(iceConnectionState);if(iceConnectionState===AdapterJS._iceConnectionStates.connected){setTimeout(function(){AdapterJS._iceConnectionFiredStates[peerId].push(AdapterJS._iceConnectionStates.done);callback(AdapterJS._iceConnectionStates.done);},1000);}callback(iceConnectionState);}return;};// Firefox:
	// - Creates iceServer from the url for Firefox.
	// - Create iceServer with stun url.
	// - Create iceServer with turn url.
	//   - Ignore the transport parameter from TURN url for FF version <=27.
	//   - Return null for createIceServer if transport=tcp.
	// - FF 27 and above supports transport parameters in TURN url,
	// - So passing in the full url to create iceServer.
	// Chrome:
	// - Creates iceServer from the url for Chrome M33 and earlier.
	//   - Create iceServer with stun url.
	//   - Chrome M28 & above uses below TURN format.
	// Plugin:
	// - Creates Ice Server for Plugin Browsers
	//   - If Stun - Create iceServer with stun url.
	//   - Else - Create iceServer with turn url
	//   - This is a WebRTC Function
	createIceServer=null;// Firefox:
	// - Creates IceServers for Firefox
	//   - Use .url for FireFox.
	//   - Multiple Urls support
	// Chrome:
	// - Creates iceServers from the urls for Chrome M34 and above.
	//   - .urls is supported since Chrome M34.
	//   - Multiple Urls support
	// Plugin:
	// - Creates Ice Servers for Plugin Browsers
	//   - Multiple Urls support
	//   - This is a WebRTC Function
	createIceServers=null;//------------------------------------------------------------
	//Creates MediaStream object.
	MediaStream=typeof MediaStream==='function'?MediaStream:null;//The RTCPeerConnection object.
	RTCPeerConnection=typeof RTCPeerConnection==='function'?RTCPeerConnection:null;// Creates RTCSessionDescription object for Plugin Browsers
	RTCSessionDescription=typeof RTCSessionDescription==='function'?RTCSessionDescription:null;// Creates RTCIceCandidate object for Plugin Browsers
	RTCIceCandidate=typeof RTCIceCandidate==='function'?RTCIceCandidate:null;// Get UserMedia (only difference is the prefix).
	// Code from Adam Barth.
	getUserMedia=null;// Attach a media stream to an element.
	attachMediaStream=null;// Re-attach a media stream to an element.
	reattachMediaStream=null;// Detected browser agent name. Types are:
	// - 'firefox': Firefox browser.
	// - 'chrome': Chrome browser.
	// - 'opera': Opera browser.
	// - 'safari': Safari browser.
	// - 'IE' - Internet Explorer browser.
	webrtcDetectedBrowser=null;// Detected browser version.
	webrtcDetectedVersion=null;// The minimum browser version still supported by AJS.
	webrtcMinimumVersion=null;// The type of DC supported by the browser
	webrtcDetectedDCSupport=null;// The requestUserMedia used by plugin gUM
	requestUserMedia=null;// Check for browser types and react accordingly
	AdapterJS.parseWebrtcDetectedBrowser();if(['webkit','moz','ms','AppleWebKit'].indexOf(AdapterJS.webrtcDetectedType)>-1){///////////////////////////////////////////////////////////////////
	// INJECTION OF GOOGLE'S ADAPTER.JS CONTENT
	// Store the original native RTCPC in msRTCPeerConnection object
	if(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)&&window.RTCPeerConnection){window.msRTCPeerConnection=window.RTCPeerConnection;}/* jshint ignore:start */(function(f){if((typeof exports==='undefined'?'undefined':_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.adapter=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var SDPUtils=requirecopy('sdp');function writeMediaSection(transceiver,caps,type,stream,dtlsRole){var sdp=SDPUtils.writeRtpDescription(transceiver.kind,caps);// Map ICE parameters (ufrag, pwd) to SDP.
	sdp+=SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());// Map DTLS parameters to SDP.
	sdp+=SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(),type==='offer'?'actpass':dtlsRole||'active');sdp+='a=mid:'+transceiver.mid+'\r\n';if(transceiver.direction){sdp+='a='+transceiver.direction+'\r\n';}else if(transceiver.rtpSender&&transceiver.rtpReceiver){sdp+='a=sendrecv\r\n';}else if(transceiver.rtpSender){sdp+='a=sendonly\r\n';}else if(transceiver.rtpReceiver){sdp+='a=recvonly\r\n';}else{sdp+='a=inactive\r\n';}if(transceiver.rtpSender){// spec.
	var msid='msid:'+stream.id+' '+transceiver.rtpSender.track.id+'\r\n';sdp+='a='+msid;// for Chrome.
	sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].ssrc+' '+msid;if(transceiver.sendEncodingParameters[0].rtx){sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].rtx.ssrc+' '+msid;sdp+='a=ssrc-group:FID '+transceiver.sendEncodingParameters[0].ssrc+' '+transceiver.sendEncodingParameters[0].rtx.ssrc+'\r\n';}}// FIXME: this should be written by writeRtpDescription.
	sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].ssrc+' cname:'+SDPUtils.localCName+'\r\n';if(transceiver.rtpSender&&transceiver.sendEncodingParameters[0].rtx){sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].rtx.ssrc+' cname:'+SDPUtils.localCName+'\r\n';}return sdp;}// Edge does not like
	// 1) stun: filtered after 14393 unless ?transport=udp is present
	// 2) turn: that does not have all of turn:host:port?transport=udp
	// 3) turn: with ipv6 addresses
	// 4) turn: occurring muliple times
	function filterIceServers(iceServers,edgeVersion){var hasTurn=false;iceServers=JSON.parse(JSON.stringify(iceServers));return iceServers.filter(function(server){if(server&&(server.urls||server.url)){var urls=server.urls||server.url;if(server.url&&!server.urls){console.warn('RTCIceServer.url is deprecated! Use urls instead.');}var isString=typeof urls==='string';if(isString){urls=[urls];}urls=urls.filter(function(url){var validTurn=url.indexOf('turn:')===0&&url.indexOf('transport=udp')!==-1&&url.indexOf('turn:[')===-1&&!hasTurn;if(validTurn){hasTurn=true;return true;}return url.indexOf('stun:')===0&&edgeVersion>=14393&&url.indexOf('?transport=udp')===-1;});delete server.url;server.urls=isString?urls[0]:urls;return!!urls.length;}return false;});}// Determines the intersection of local and remote capabilities.
	function getCommonCapabilities(localCapabilities,remoteCapabilities){var commonCapabilities={codecs:[],headerExtensions:[],fecMechanisms:[]};var findCodecByPayloadType=function findCodecByPayloadType(pt,codecs){pt=parseInt(pt,10);for(var i=0;i<codecs.length;i++){if(codecs[i].payloadType===pt||codecs[i].preferredPayloadType===pt){return codecs[i];}}};var rtxCapabilityMatches=function rtxCapabilityMatches(lRtx,rRtx,lCodecs,rCodecs){var lCodec=findCodecByPayloadType(lRtx.parameters.apt,lCodecs);var rCodec=findCodecByPayloadType(rRtx.parameters.apt,rCodecs);return lCodec&&rCodec&&lCodec.name.toLowerCase()===rCodec.name.toLowerCase();};localCapabilities.codecs.forEach(function(lCodec){for(var i=0;i<remoteCapabilities.codecs.length;i++){var rCodec=remoteCapabilities.codecs[i];if(lCodec.name.toLowerCase()===rCodec.name.toLowerCase()&&lCodec.clockRate===rCodec.clockRate){if(lCodec.name.toLowerCase()==='rtx'&&lCodec.parameters&&rCodec.parameters.apt){// for RTX we need to find the local rtx that has a apt
	// which points to the same local codec as the remote one.
	if(!rtxCapabilityMatches(lCodec,rCodec,localCapabilities.codecs,remoteCapabilities.codecs)){continue;}}rCodec=JSON.parse(JSON.stringify(rCodec));// deepcopy
	// number of channels is the highest common number of channels
	rCodec.numChannels=Math.min(lCodec.numChannels,rCodec.numChannels);// push rCodec so we reply with offerer payload type
	commonCapabilities.codecs.push(rCodec);// determine common feedback mechanisms
	rCodec.rtcpFeedback=rCodec.rtcpFeedback.filter(function(fb){for(var j=0;j<lCodec.rtcpFeedback.length;j++){if(lCodec.rtcpFeedback[j].type===fb.type&&lCodec.rtcpFeedback[j].parameter===fb.parameter){return true;}}return false;});// FIXME: also need to determine .parameters
	//  see https://github.com/openpeer/ortc/issues/569
	break;}}});localCapabilities.headerExtensions.forEach(function(lHeaderExtension){for(var i=0;i<remoteCapabilities.headerExtensions.length;i++){var rHeaderExtension=remoteCapabilities.headerExtensions[i];if(lHeaderExtension.uri===rHeaderExtension.uri){commonCapabilities.headerExtensions.push(rHeaderExtension);break;}}});// FIXME: fecMechanisms
	return commonCapabilities;}// is action=setLocalDescription with type allowed in signalingState
	function isActionAllowedInSignalingState(action,type,signalingState){return{offer:{setLocalDescription:['stable','have-local-offer'],setRemoteDescription:['stable','have-remote-offer']},answer:{setLocalDescription:['have-remote-offer','have-local-pranswer'],setRemoteDescription:['have-local-offer','have-remote-pranswer']}}[type][action].indexOf(signalingState)!==-1;}function maybeAddCandidate(iceTransport,candidate){// Edge's internal representation adds some fields therefore
	// not all fieldѕ are taken into account.
	var alreadyAdded=iceTransport.getRemoteCandidates().find(function(remoteCandidate){return candidate.foundation===remoteCandidate.foundation&&candidate.ip===remoteCandidate.ip&&candidate.port===remoteCandidate.port&&candidate.priority===remoteCandidate.priority&&candidate.protocol===remoteCandidate.protocol&&candidate.type===remoteCandidate.type;});if(!alreadyAdded){iceTransport.addRemoteCandidate(candidate);}return!alreadyAdded;}module.exports=function(window,edgeVersion){var RTCPeerConnection=function RTCPeerConnection(config){var self=this;var _eventTarget=document.createDocumentFragment();['addEventListener','removeEventListener','dispatchEvent'].forEach(function(method){self[method]=_eventTarget[method].bind(_eventTarget);});this.onicecandidate=null;this.onaddstream=null;this.ontrack=null;this.onremovestream=null;this.onsignalingstatechange=null;this.oniceconnectionstatechange=null;this.onicegatheringstatechange=null;this.onnegotiationneeded=null;this.ondatachannel=null;this.canTrickleIceCandidates=null;this.needNegotiation=false;this.localStreams=[];this.remoteStreams=[];this.localDescription=null;this.remoteDescription=null;this.signalingState='stable';this.iceConnectionState='new';this.iceGatheringState='new';config=JSON.parse(JSON.stringify(config||{}));this.usingBundle=config.bundlePolicy==='max-bundle';if(config.rtcpMuxPolicy==='negotiate'){var e=new Error('rtcpMuxPolicy \'negotiate\' is not supported');e.name='NotSupportedError';throw e;}else if(!config.rtcpMuxPolicy){config.rtcpMuxPolicy='require';}switch(config.iceTransportPolicy){case'all':case'relay':break;default:config.iceTransportPolicy='all';break;}switch(config.bundlePolicy){case'balanced':case'max-compat':case'max-bundle':break;default:config.bundlePolicy='balanced';break;}config.iceServers=filterIceServers(config.iceServers||[],edgeVersion);this._iceGatherers=[];if(config.iceCandidatePoolSize){for(var i=config.iceCandidatePoolSize;i>0;i--){this._iceGatherers=new window.RTCIceGatherer({iceServers:config.iceServers,gatherPolicy:config.iceTransportPolicy});}}else{config.iceCandidatePoolSize=0;}this._config=config;// per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
	// everything that is needed to describe a SDP m-line.
	this.transceivers=[];this._sdpSessionId=SDPUtils.generateSessionId();this._sdpSessionVersion=0;this._dtlsRole=undefined;// role for a=setup to use in answers.
	};RTCPeerConnection.prototype._emitGatheringStateChange=function(){var event=new Event('icegatheringstatechange');this.dispatchEvent(event);if(typeof this.onicegatheringstatechange==='function'){this.onicegatheringstatechange(event);}};RTCPeerConnection.prototype.getConfiguration=function(){return this._config;};RTCPeerConnection.prototype.getLocalStreams=function(){return this.localStreams;};RTCPeerConnection.prototype.getRemoteStreams=function(){return this.remoteStreams;};// internal helper to create a transceiver object.
	// (whih is not yet the same as the WebRTC 1.0 transceiver)
	RTCPeerConnection.prototype._createTransceiver=function(kind){var hasBundleTransport=this.transceivers.length>0;var transceiver={track:null,iceGatherer:null,iceTransport:null,dtlsTransport:null,localCapabilities:null,remoteCapabilities:null,rtpSender:null,rtpReceiver:null,kind:kind,mid:null,sendEncodingParameters:null,recvEncodingParameters:null,stream:null,wantReceive:true};if(this.usingBundle&&hasBundleTransport){transceiver.iceTransport=this.transceivers[0].iceTransport;transceiver.dtlsTransport=this.transceivers[0].dtlsTransport;}else{var transports=this._createIceAndDtlsTransports();transceiver.iceTransport=transports.iceTransport;transceiver.dtlsTransport=transports.dtlsTransport;}this.transceivers.push(transceiver);return transceiver;};RTCPeerConnection.prototype.addTrack=function(track,stream){var transceiver;for(var i=0;i<this.transceivers.length;i++){if(!this.transceivers[i].track&&this.transceivers[i].kind===track.kind){transceiver=this.transceivers[i];}}if(!transceiver){transceiver=this._createTransceiver(track.kind);}this._maybeFireNegotiationNeeded();if(this.localStreams.indexOf(stream)===-1){this.localStreams.push(stream);}transceiver.track=track;transceiver.stream=stream;transceiver.rtpSender=new window.RTCRtpSender(track,transceiver.dtlsTransport);return transceiver.rtpSender;};RTCPeerConnection.prototype.addStream=function(stream){var self=this;if(edgeVersion>=15025){stream.getTracks().forEach(function(track){self.addTrack(track,stream);});}else{// Clone is necessary for local demos mostly, attaching directly
	// to two different senders does not work (build 10547).
	// Fixed in 15025 (or earlier)
	var clonedStream=stream.clone();stream.getTracks().forEach(function(track,idx){var clonedTrack=clonedStream.getTracks()[idx];track.addEventListener('enabled',function(event){clonedTrack.enabled=event.enabled;});});clonedStream.getTracks().forEach(function(track){self.addTrack(track,clonedStream);});}};RTCPeerConnection.prototype.removeStream=function(stream){var idx=this.localStreams.indexOf(stream);if(idx>-1){this.localStreams.splice(idx,1);this._maybeFireNegotiationNeeded();}};RTCPeerConnection.prototype.getSenders=function(){return this.transceivers.filter(function(transceiver){return!!transceiver.rtpSender;}).map(function(transceiver){return transceiver.rtpSender;});};RTCPeerConnection.prototype.getReceivers=function(){return this.transceivers.filter(function(transceiver){return!!transceiver.rtpReceiver;}).map(function(transceiver){return transceiver.rtpReceiver;});};RTCPeerConnection.prototype._createIceGatherer=function(sdpMLineIndex,usingBundle){var self=this;if(usingBundle&&sdpMLineIndex>0){return this.transceivers[0].iceGatherer;}else if(this._iceGatherers.length){return this._iceGatherers.shift();}var iceGatherer=new window.RTCIceGatherer({iceServers:this._config.iceServers,gatherPolicy:this._config.iceTransportPolicy});Object.defineProperty(iceGatherer,'state',{value:'new',writable:true});this.transceivers[sdpMLineIndex].candidates=[];this.transceivers[sdpMLineIndex].bufferCandidates=function(event){var end=!event.candidate||Object.keys(event.candidate).length===0;// polyfill since RTCIceGatherer.state is not implemented in
	// Edge 10547 yet.
	iceGatherer.state=end?'completed':'gathering';if(self.transceivers[sdpMLineIndex].candidates!==null){self.transceivers[sdpMLineIndex].candidates.push(event.candidate);}};iceGatherer.addEventListener('localcandidate',this.transceivers[sdpMLineIndex].bufferCandidates);return iceGatherer;};// start gathering from an RTCIceGatherer.
	RTCPeerConnection.prototype._gather=function(mid,sdpMLineIndex){var self=this;var iceGatherer=this.transceivers[sdpMLineIndex].iceGatherer;if(iceGatherer.onlocalcandidate){return;}var candidates=this.transceivers[sdpMLineIndex].candidates;this.transceivers[sdpMLineIndex].candidates=null;iceGatherer.removeEventListener('localcandidate',this.transceivers[sdpMLineIndex].bufferCandidates);iceGatherer.onlocalcandidate=function(evt){if(self.usingBundle&&sdpMLineIndex>0){// if we know that we use bundle we can drop candidates with
	// ѕdpMLineIndex > 0. If we don't do this then our state gets
	// confused since we dispose the extra ice gatherer.
	return;}var event=new Event('icecandidate');event.candidate={sdpMid:mid,sdpMLineIndex:sdpMLineIndex};var cand=evt.candidate;// Edge emits an empty object for RTCIceCandidateComplete‥
	var end=!cand||Object.keys(cand).length===0;if(end){// polyfill since RTCIceGatherer.state is not implemented in
	// Edge 10547 yet.
	if(iceGatherer.state==='new'||iceGatherer.state==='gathering'){iceGatherer.state='completed';}}else{if(iceGatherer.state==='new'){iceGatherer.state='gathering';}// RTCIceCandidate doesn't have a component, needs to be added
	cand.component=1;event.candidate.candidate=SDPUtils.writeCandidate(cand);}// update local description.
	var sections=SDPUtils.splitSections(self.localDescription.sdp);if(!end){sections[event.candidate.sdpMLineIndex+1]+='a='+event.candidate.candidate+'\r\n';}else{sections[event.candidate.sdpMLineIndex+1]+='a=end-of-candidates\r\n';}self.localDescription.sdp=sections.join('');var complete=self.transceivers.every(function(transceiver){return transceiver.iceGatherer&&transceiver.iceGatherer.state==='completed';});if(self.iceGatheringState!=='gathering'){self.iceGatheringState='gathering';self._emitGatheringStateChange();}// Emit candidate. Also emit null candidate when all gatherers are
	// complete.
	if(!end){self.dispatchEvent(event);if(typeof self.onicecandidate==='function'){self.onicecandidate(event);}}if(complete){self.dispatchEvent(new Event('icecandidate'));if(typeof self.onicecandidate==='function'){self.onicecandidate(new Event('icecandidate'));}self.iceGatheringState='complete';self._emitGatheringStateChange();}};// emit already gathered candidates.
	window.setTimeout(function(){candidates.forEach(function(candidate){var e=new Event('RTCIceGatherEvent');e.candidate=candidate;iceGatherer.onlocalcandidate(e);});},0);};// Create ICE transport and DTLS transport.
	RTCPeerConnection.prototype._createIceAndDtlsTransports=function(){var self=this;var iceTransport=new window.RTCIceTransport(null);iceTransport.onicestatechange=function(){self._updateConnectionState();};var dtlsTransport=new window.RTCDtlsTransport(iceTransport);dtlsTransport.ondtlsstatechange=function(){self._updateConnectionState();};dtlsTransport.onerror=function(){// onerror does not set state to failed by itself.
	Object.defineProperty(dtlsTransport,'state',{value:'failed',writable:true});self._updateConnectionState();};return{iceTransport:iceTransport,dtlsTransport:dtlsTransport};};// Destroy ICE gatherer, ICE transport and DTLS transport.
	// Without triggering the callbacks.
	RTCPeerConnection.prototype._disposeIceAndDtlsTransports=function(sdpMLineIndex){var iceGatherer=this.transceivers[sdpMLineIndex].iceGatherer;if(iceGatherer){delete iceGatherer.onlocalcandidate;delete this.transceivers[sdpMLineIndex].iceGatherer;}var iceTransport=this.transceivers[sdpMLineIndex].iceTransport;if(iceTransport){delete iceTransport.onicestatechange;delete this.transceivers[sdpMLineIndex].iceTransport;}var dtlsTransport=this.transceivers[sdpMLineIndex].dtlsTransport;if(dtlsTransport){delete dtlsTransport.ondtlsstatechange;delete dtlsTransport.onerror;delete this.transceivers[sdpMLineIndex].dtlsTransport;}};// Start the RTP Sender and Receiver for a transceiver.
	RTCPeerConnection.prototype._transceive=function(transceiver,send,recv){var params=getCommonCapabilities(transceiver.localCapabilities,transceiver.remoteCapabilities);if(send&&transceiver.rtpSender){params.encodings=transceiver.sendEncodingParameters;params.rtcp={cname:SDPUtils.localCName,compound:transceiver.rtcpParameters.compound};if(transceiver.recvEncodingParameters.length){params.rtcp.ssrc=transceiver.recvEncodingParameters[0].ssrc;}transceiver.rtpSender.send(params);}if(recv&&transceiver.rtpReceiver&&params.codecs.length>0){// remove RTX field in Edge 14942
	if(transceiver.kind==='video'&&transceiver.recvEncodingParameters&&edgeVersion<15019){transceiver.recvEncodingParameters.forEach(function(p){delete p.rtx;});}params.encodings=transceiver.recvEncodingParameters;params.rtcp={cname:transceiver.rtcpParameters.cname,compound:transceiver.rtcpParameters.compound};if(transceiver.sendEncodingParameters.length){params.rtcp.ssrc=transceiver.sendEncodingParameters[0].ssrc;}transceiver.rtpReceiver.receive(params);}};RTCPeerConnection.prototype.setLocalDescription=function(description){var self=this;var args=arguments;if(!isActionAllowedInSignalingState('setLocalDescription',description.type,this.signalingState)){return new Promise(function(resolve,reject){var e=new Error('Can not set local '+description.type+' in state '+self.signalingState);e.name='InvalidStateError';if(args.length>2&&typeof args[2]==='function'){args[2].apply(null,[e]);}reject(e);});}var sections;var sessionpart;if(description.type==='offer'){// VERY limited support for SDP munging. Limited to:
	// * changing the order of codecs
	sections=SDPUtils.splitSections(description.sdp);sessionpart=sections.shift();sections.forEach(function(mediaSection,sdpMLineIndex){var caps=SDPUtils.parseRtpParameters(mediaSection);self.transceivers[sdpMLineIndex].localCapabilities=caps;});this.transceivers.forEach(function(transceiver,sdpMLineIndex){self._gather(transceiver.mid,sdpMLineIndex);});}else if(description.type==='answer'){sections=SDPUtils.splitSections(self.remoteDescription.sdp);sessionpart=sections.shift();var isIceLite=SDPUtils.matchPrefix(sessionpart,'a=ice-lite').length>0;sections.forEach(function(mediaSection,sdpMLineIndex){var transceiver=self.transceivers[sdpMLineIndex];var iceGatherer=transceiver.iceGatherer;var iceTransport=transceiver.iceTransport;var dtlsTransport=transceiver.dtlsTransport;var localCapabilities=transceiver.localCapabilities;var remoteCapabilities=transceiver.remoteCapabilities;// treat bundle-only as not-rejected.
	var rejected=SDPUtils.isRejected(mediaSection)&&!SDPUtils.matchPrefix(mediaSection,'a=bundle-only').length===1;if(!rejected&&!transceiver.isDatachannel){var remoteIceParameters=SDPUtils.getIceParameters(mediaSection,sessionpart);var remoteDtlsParameters=SDPUtils.getDtlsParameters(mediaSection,sessionpart);if(isIceLite){remoteDtlsParameters.role='server';}if(!self.usingBundle||sdpMLineIndex===0){self._gather(transceiver.mid,sdpMLineIndex);if(iceTransport.state==='new'){iceTransport.start(iceGatherer,remoteIceParameters,isIceLite?'controlling':'controlled');}if(dtlsTransport.state==='new'){dtlsTransport.start(remoteDtlsParameters);}}// Calculate intersection of capabilities.
	var params=getCommonCapabilities(localCapabilities,remoteCapabilities);// Start the RTCRtpSender. The RTCRtpReceiver for this
	// transceiver has already been started in setRemoteDescription.
	self._transceive(transceiver,params.codecs.length>0,false);}});}this.localDescription={type:description.type,sdp:description.sdp};switch(description.type){case'offer':this._updateSignalingState('have-local-offer');break;case'answer':this._updateSignalingState('stable');break;default:throw new TypeError('unsupported type "'+description.type+'"');}// If a success callback was provided, emit ICE candidates after it
	// has been executed. Otherwise, emit callback after the Promise is
	// resolved.
	var cb=arguments.length>1&&typeof arguments[1]==='function'&&arguments[1];return new Promise(function(resolve){if(cb){cb.apply(null);}resolve();});};RTCPeerConnection.prototype.setRemoteDescription=function(description){var self=this;var args=arguments;if(!isActionAllowedInSignalingState('setRemoteDescription',description.type,this.signalingState)){return new Promise(function(resolve,reject){var e=new Error('Can not set remote '+description.type+' in state '+self.signalingState);e.name='InvalidStateError';if(args.length>2&&typeof args[2]==='function'){args[2].apply(null,[e]);}reject(e);});}var streams={};this.remoteStreams.forEach(function(stream){streams[stream.id]=stream;});var receiverList=[];var sections=SDPUtils.splitSections(description.sdp);var sessionpart=sections.shift();var isIceLite=SDPUtils.matchPrefix(sessionpart,'a=ice-lite').length>0;var usingBundle=SDPUtils.matchPrefix(sessionpart,'a=group:BUNDLE ').length>0;this.usingBundle=usingBundle;var iceOptions=SDPUtils.matchPrefix(sessionpart,'a=ice-options:')[0];if(iceOptions){this.canTrickleIceCandidates=iceOptions.substr(14).split(' ').indexOf('trickle')>=0;}else{this.canTrickleIceCandidates=false;}sections.forEach(function(mediaSection,sdpMLineIndex){var lines=SDPUtils.splitLines(mediaSection);var kind=SDPUtils.getKind(mediaSection);// treat bundle-only as not-rejected.
	var rejected=SDPUtils.isRejected(mediaSection)&&!SDPUtils.matchPrefix(mediaSection,'a=bundle-only').length===1;var protocol=lines[0].substr(2).split(' ')[2];var direction=SDPUtils.getDirection(mediaSection,sessionpart);var remoteMsid=SDPUtils.parseMsid(mediaSection);var mid=SDPUtils.getMid(mediaSection)||SDPUtils.generateIdentifier();// Reject datachannels which are not implemented yet.
	if(kind==='application'&&protocol==='DTLS/SCTP'){self.transceivers[sdpMLineIndex]={mid:mid,isDatachannel:true};return;}var transceiver;var iceGatherer;var iceTransport;var dtlsTransport;var rtpReceiver;var sendEncodingParameters;var recvEncodingParameters;var localCapabilities;var track;// FIXME: ensure the mediaSection has rtcp-mux set.
	var remoteCapabilities=SDPUtils.parseRtpParameters(mediaSection);var remoteIceParameters;var remoteDtlsParameters;if(!rejected){remoteIceParameters=SDPUtils.getIceParameters(mediaSection,sessionpart);remoteDtlsParameters=SDPUtils.getDtlsParameters(mediaSection,sessionpart);remoteDtlsParameters.role='client';}recvEncodingParameters=SDPUtils.parseRtpEncodingParameters(mediaSection);var rtcpParameters=SDPUtils.parseRtcpParameters(mediaSection);var isComplete=SDPUtils.matchPrefix(mediaSection,'a=end-of-candidates',sessionpart).length>0;var cands=SDPUtils.matchPrefix(mediaSection,'a=candidate:').map(function(cand){return SDPUtils.parseCandidate(cand);}).filter(function(cand){return cand.component===1;});// Check if we can use BUNDLE and dispose transports.
	if((description.type==='offer'||description.type==='answer')&&!rejected&&usingBundle&&sdpMLineIndex>0&&self.transceivers[sdpMLineIndex]){self._disposeIceAndDtlsTransports(sdpMLineIndex);self.transceivers[sdpMLineIndex].iceGatherer=self.transceivers[0].iceGatherer;self.transceivers[sdpMLineIndex].iceTransport=self.transceivers[0].iceTransport;self.transceivers[sdpMLineIndex].dtlsTransport=self.transceivers[0].dtlsTransport;if(self.transceivers[sdpMLineIndex].rtpSender){self.transceivers[sdpMLineIndex].rtpSender.setTransport(self.transceivers[0].dtlsTransport);}if(self.transceivers[sdpMLineIndex].rtpReceiver){self.transceivers[sdpMLineIndex].rtpReceiver.setTransport(self.transceivers[0].dtlsTransport);}}if(description.type==='offer'&&!rejected){transceiver=self.transceivers[sdpMLineIndex]||self._createTransceiver(kind);transceiver.mid=mid;if(!transceiver.iceGatherer){transceiver.iceGatherer=self._createIceGatherer(sdpMLineIndex,usingBundle);}if(cands.length&&transceiver.iceTransport.state==='new'){if(isComplete&&(!usingBundle||sdpMLineIndex===0)){transceiver.iceTransport.setRemoteCandidates(cands);}else{cands.forEach(function(candidate){maybeAddCandidate(transceiver.iceTransport,candidate);});}}localCapabilities=window.RTCRtpReceiver.getCapabilities(kind);// filter RTX until additional stuff needed for RTX is implemented
	// in adapter.js
	if(edgeVersion<15019){localCapabilities.codecs=localCapabilities.codecs.filter(function(codec){return codec.name!=='rtx';});}sendEncodingParameters=transceiver.sendEncodingParameters||[{ssrc:(2*sdpMLineIndex+2)*1001}];var isNewTrack=false;if(direction==='sendrecv'||direction==='sendonly'){isNewTrack=!transceiver.rtpReceiver;rtpReceiver=transceiver.rtpReceiver||new window.RTCRtpReceiver(transceiver.dtlsTransport,kind);if(isNewTrack){var stream;track=rtpReceiver.track;// FIXME: does not work with Plan B.
	if(remoteMsid){if(!streams[remoteMsid.stream]){streams[remoteMsid.stream]=new window.MediaStream();Object.defineProperty(streams[remoteMsid.stream],'id',{get:function get(){return remoteMsid.stream;}});}Object.defineProperty(track,'id',{get:function get(){return remoteMsid.track;}});stream=streams[remoteMsid.stream];}else{if(!streams.default){streams.default=new window.MediaStream();}stream=streams.default;}stream.addTrack(track);receiverList.push([track,rtpReceiver,stream]);}}transceiver.localCapabilities=localCapabilities;transceiver.remoteCapabilities=remoteCapabilities;transceiver.rtpReceiver=rtpReceiver;transceiver.rtcpParameters=rtcpParameters;transceiver.sendEncodingParameters=sendEncodingParameters;transceiver.recvEncodingParameters=recvEncodingParameters;// Start the RTCRtpReceiver now. The RTPSender is started in
	// setLocalDescription.
	self._transceive(self.transceivers[sdpMLineIndex],false,isNewTrack);}else if(description.type==='answer'&&!rejected){transceiver=self.transceivers[sdpMLineIndex];iceGatherer=transceiver.iceGatherer;iceTransport=transceiver.iceTransport;dtlsTransport=transceiver.dtlsTransport;rtpReceiver=transceiver.rtpReceiver;sendEncodingParameters=transceiver.sendEncodingParameters;localCapabilities=transceiver.localCapabilities;self.transceivers[sdpMLineIndex].recvEncodingParameters=recvEncodingParameters;self.transceivers[sdpMLineIndex].remoteCapabilities=remoteCapabilities;self.transceivers[sdpMLineIndex].rtcpParameters=rtcpParameters;if(cands.length&&iceTransport.state==='new'){if((isIceLite||isComplete)&&(!usingBundle||sdpMLineIndex===0)){iceTransport.setRemoteCandidates(cands);}else{cands.forEach(function(candidate){maybeAddCandidate(transceiver.iceTransport,candidate);});}}if(!usingBundle||sdpMLineIndex===0){if(iceTransport.state==='new'){iceTransport.start(iceGatherer,remoteIceParameters,'controlling');}if(dtlsTransport.state==='new'){dtlsTransport.start(remoteDtlsParameters);}}self._transceive(transceiver,direction==='sendrecv'||direction==='recvonly',direction==='sendrecv'||direction==='sendonly');if(rtpReceiver&&(direction==='sendrecv'||direction==='sendonly')){track=rtpReceiver.track;if(remoteMsid){if(!streams[remoteMsid.stream]){streams[remoteMsid.stream]=new window.MediaStream();}streams[remoteMsid.stream].addTrack(track);receiverList.push([track,rtpReceiver,streams[remoteMsid.stream]]);}else{if(!streams.default){streams.default=new window.MediaStream();}streams.default.addTrack(track);receiverList.push([track,rtpReceiver,streams.default]);}}else{// FIXME: actually the receiver should be created later.
	delete transceiver.rtpReceiver;}}});if(this._dtlsRole===undefined){this._dtlsRole=description.type==='offer'?'active':'passive';}this.remoteDescription={type:description.type,sdp:description.sdp};switch(description.type){case'offer':this._updateSignalingState('have-remote-offer');break;case'answer':this._updateSignalingState('stable');break;default:throw new TypeError('unsupported type "'+description.type+'"');}Object.keys(streams).forEach(function(sid){var stream=streams[sid];if(stream.getTracks().length){if(self.remoteStreams.indexOf(stream)===-1){self.remoteStreams.push(stream);var event=new Event('addstream');event.stream=stream;window.setTimeout(function(){self.dispatchEvent(event);if(typeof self.onaddstream==='function'){self.onaddstream(event);}});}receiverList.forEach(function(item){var track=item[0];var receiver=item[1];if(stream.id!==item[2].id){return;}var trackEvent=new Event('track');trackEvent.track=track;trackEvent.receiver=receiver;trackEvent.transceiver={receiver:receiver};trackEvent.streams=[stream];window.setTimeout(function(){self.dispatchEvent(trackEvent);if(typeof self.ontrack==='function'){self.ontrack(trackEvent);}});});}});// check whether addIceCandidate({}) was called within four seconds after
	// setRemoteDescription.
	window.setTimeout(function(){if(!(self&&self.transceivers)){return;}self.transceivers.forEach(function(transceiver){if(transceiver.iceTransport&&transceiver.iceTransport.state==='new'&&transceiver.iceTransport.getRemoteCandidates().length>0){console.warn('Timeout for addRemoteCandidate. Consider sending '+'an end-of-candidates notification');transceiver.iceTransport.addRemoteCandidate({});}});},4000);return new Promise(function(resolve){if(args.length>1&&typeof args[1]==='function'){args[1].apply(null);}resolve();});};RTCPeerConnection.prototype.close=function(){this.transceivers.forEach(function(transceiver){/* not yet
	                     if (transceiver.iceGatherer) {
	                     transceiver.iceGatherer.close();
	                     }
	                     */if(transceiver.iceTransport){transceiver.iceTransport.stop();}if(transceiver.dtlsTransport){transceiver.dtlsTransport.stop();}if(transceiver.rtpSender){transceiver.rtpSender.stop();}if(transceiver.rtpReceiver){transceiver.rtpReceiver.stop();}});// FIXME: clean up tracks, local streams, remote streams, etc
	this._updateSignalingState('closed');};// Update the signaling state.
	RTCPeerConnection.prototype._updateSignalingState=function(newState){this.signalingState=newState;var event=new Event('signalingstatechange');this.dispatchEvent(event);if(typeof this.onsignalingstatechange==='function'){this.onsignalingstatechange(event);}};// Determine whether to fire the negotiationneeded event.
	RTCPeerConnection.prototype._maybeFireNegotiationNeeded=function(){var self=this;if(this.signalingState!=='stable'||this.needNegotiation===true){return;}this.needNegotiation=true;window.setTimeout(function(){if(self.needNegotiation===false){return;}self.needNegotiation=false;var event=new Event('negotiationneeded');self.dispatchEvent(event);if(typeof self.onnegotiationneeded==='function'){self.onnegotiationneeded(event);}},0);};// Update the connection state.
	RTCPeerConnection.prototype._updateConnectionState=function(){var newState;var states={'new':0,closed:0,connecting:0,checking:0,connected:0,completed:0,disconnected:0,failed:0};this.transceivers.forEach(function(transceiver){states[transceiver.iceTransport.state]++;states[transceiver.dtlsTransport.state]++;});// ICETransport.completed and connected are the same for this purpose.
	states.connected+=states.completed;newState='new';if(states.failed>0){newState='failed';}else if(states.connecting>0||states.checking>0){newState='connecting';}else if(states.disconnected>0){newState='disconnected';}else if(states.new>0){newState='new';}else if(states.connected>0||states.completed>0){newState='connected';}if(newState!==this.iceConnectionState){this.iceConnectionState=newState;var event=new Event('iceconnectionstatechange');this.dispatchEvent(event);if(typeof this.oniceconnectionstatechange==='function'){this.oniceconnectionstatechange(event);}}};RTCPeerConnection.prototype.createOffer=function(){var self=this;var args=arguments;var offerOptions;if(arguments.length===1&&typeof arguments[0]!=='function'){offerOptions=arguments[0];}else if(arguments.length===3){offerOptions=arguments[2];}var numAudioTracks=this.transceivers.filter(function(t){return t.kind==='audio';}).length;var numVideoTracks=this.transceivers.filter(function(t){return t.kind==='video';}).length;// Determine number of audio and video tracks we need to send/recv.
	if(offerOptions){// Reject Chrome legacy constraints.
	if(offerOptions.mandatory||offerOptions.optional){throw new TypeError('Legacy mandatory/optional constraints not supported.');}if(offerOptions.offerToReceiveAudio!==undefined){if(offerOptions.offerToReceiveAudio===true){numAudioTracks=1;}else if(offerOptions.offerToReceiveAudio===false){numAudioTracks=0;}else{numAudioTracks=offerOptions.offerToReceiveAudio;}}if(offerOptions.offerToReceiveVideo!==undefined){if(offerOptions.offerToReceiveVideo===true){numVideoTracks=1;}else if(offerOptions.offerToReceiveVideo===false){numVideoTracks=0;}else{numVideoTracks=offerOptions.offerToReceiveVideo;}}}this.transceivers.forEach(function(transceiver){if(transceiver.kind==='audio'){numAudioTracks--;if(numAudioTracks<0){transceiver.wantReceive=false;}}else if(transceiver.kind==='video'){numVideoTracks--;if(numVideoTracks<0){transceiver.wantReceive=false;}}});// Create M-lines for recvonly streams.
	while(numAudioTracks>0||numVideoTracks>0){if(numAudioTracks>0){this._createTransceiver('audio');numAudioTracks--;}if(numVideoTracks>0){this._createTransceiver('video');numVideoTracks--;}}var sdp=SDPUtils.writeSessionBoilerplate(this._sdpSessionId,this._sdpSessionVersion++);this.transceivers.forEach(function(transceiver,sdpMLineIndex){// For each track, create an ice gatherer, ice transport,
	// dtls transport, potentially rtpsender and rtpreceiver.
	var track=transceiver.track;var kind=transceiver.kind;var mid=SDPUtils.generateIdentifier();transceiver.mid=mid;if(!transceiver.iceGatherer){transceiver.iceGatherer=self._createIceGatherer(sdpMLineIndex,self.usingBundle);}var localCapabilities=window.RTCRtpSender.getCapabilities(kind);// filter RTX until additional stuff needed for RTX is implemented
	// in adapter.js
	if(edgeVersion<15019){localCapabilities.codecs=localCapabilities.codecs.filter(function(codec){return codec.name!=='rtx';});}localCapabilities.codecs.forEach(function(codec){// work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
	// by adding level-asymmetry-allowed=1
	if(codec.name==='H264'&&codec.parameters['level-asymmetry-allowed']===undefined){codec.parameters['level-asymmetry-allowed']='1';}});// generate an ssrc now, to be used later in rtpSender.send
	var sendEncodingParameters=transceiver.sendEncodingParameters||[{ssrc:(2*sdpMLineIndex+1)*1001}];if(track){// add RTX
	if(edgeVersion>=15019&&kind==='video'&&!sendEncodingParameters[0].rtx){sendEncodingParameters[0].rtx={ssrc:sendEncodingParameters[0].ssrc+1};}}if(transceiver.wantReceive){transceiver.rtpReceiver=new window.RTCRtpReceiver(transceiver.dtlsTransport,kind);}transceiver.localCapabilities=localCapabilities;transceiver.sendEncodingParameters=sendEncodingParameters;});// always offer BUNDLE and dispose on return if not supported.
	if(this._config.bundlePolicy!=='max-compat'){sdp+='a=group:BUNDLE '+this.transceivers.map(function(t){return t.mid;}).join(' ')+'\r\n';}sdp+='a=ice-options:trickle\r\n';this.transceivers.forEach(function(transceiver,sdpMLineIndex){sdp+=writeMediaSection(transceiver,transceiver.localCapabilities,'offer',transceiver.stream,self._dtlsRole);sdp+='a=rtcp-rsize\r\n';if(transceiver.iceGatherer&&self.iceGatheringState!=='new'&&(sdpMLineIndex===0||!self.usingBundle)){transceiver.iceGatherer.getLocalCandidates().forEach(function(cand){cand.component=1;sdp+='a='+SDPUtils.writeCandidate(cand)+'\r\n';});if(transceiver.iceGatherer.state==='completed'){sdp+='a=end-of-candidates\r\n';}}});var desc=new window.RTCSessionDescription({type:'offer',sdp:sdp});return new Promise(function(resolve){if(args.length>0&&typeof args[0]==='function'){args[0].apply(null,[desc]);resolve();return;}resolve(desc);});};RTCPeerConnection.prototype.createAnswer=function(){var self=this;var args=arguments;var sdp=SDPUtils.writeSessionBoilerplate(this._sdpSessionId,this._sdpSessionVersion++);if(this.usingBundle){sdp+='a=group:BUNDLE '+this.transceivers.map(function(t){return t.mid;}).join(' ')+'\r\n';}var mediaSectionsInOffer=SDPUtils.splitSections(this.remoteDescription.sdp).length-1;this.transceivers.forEach(function(transceiver,sdpMLineIndex){if(sdpMLineIndex+1>mediaSectionsInOffer){return;}if(transceiver.isDatachannel){sdp+='m=application 0 DTLS/SCTP 5000\r\n'+'c=IN IP4 0.0.0.0\r\n'+'a=mid:'+transceiver.mid+'\r\n';return;}// FIXME: look at direction.
	if(transceiver.stream){var localTrack;if(transceiver.kind==='audio'){localTrack=transceiver.stream.getAudioTracks()[0];}else if(transceiver.kind==='video'){localTrack=transceiver.stream.getVideoTracks()[0];}if(localTrack){// add RTX
	if(edgeVersion>=15019&&transceiver.kind==='video'&&!transceiver.sendEncodingParameters[0].rtx){transceiver.sendEncodingParameters[0].rtx={ssrc:transceiver.sendEncodingParameters[0].ssrc+1};}}}// Calculate intersection of capabilities.
	var commonCapabilities=getCommonCapabilities(transceiver.localCapabilities,transceiver.remoteCapabilities);var hasRtx=commonCapabilities.codecs.filter(function(c){return c.name.toLowerCase()==='rtx';}).length;if(!hasRtx&&transceiver.sendEncodingParameters[0].rtx){delete transceiver.sendEncodingParameters[0].rtx;}sdp+=writeMediaSection(transceiver,commonCapabilities,'answer',transceiver.stream,self._dtlsRole);if(transceiver.rtcpParameters&&transceiver.rtcpParameters.reducedSize){sdp+='a=rtcp-rsize\r\n';}});var desc=new window.RTCSessionDescription({type:'answer',sdp:sdp});return new Promise(function(resolve){if(args.length>0&&typeof args[0]==='function'){args[0].apply(null,[desc]);resolve();return;}resolve(desc);});};RTCPeerConnection.prototype.addIceCandidate=function(candidate){var err;var sections;if(!candidate||candidate.candidate===''){for(var j=0;j<this.transceivers.length;j++){if(this.transceivers[j].isDatachannel){continue;}this.transceivers[j].iceTransport.addRemoteCandidate({});sections=SDPUtils.splitSections(this.remoteDescription.sdp);sections[j+1]+='a=end-of-candidates\r\n';this.remoteDescription.sdp=sections.join('');if(this.usingBundle){break;}}}else if(!(candidate.sdpMLineIndex!==undefined||candidate.sdpMid)){throw new TypeError('sdpMLineIndex or sdpMid required');}else if(!this.remoteDescription){err=new Error('Can not add ICE candidate without '+'a remote description');err.name='InvalidStateError';}else{var sdpMLineIndex=candidate.sdpMLineIndex;if(candidate.sdpMid){for(var i=0;i<this.transceivers.length;i++){if(this.transceivers[i].mid===candidate.sdpMid){sdpMLineIndex=i;break;}}}var transceiver=this.transceivers[sdpMLineIndex];if(transceiver){if(transceiver.isDatachannel){return Promise.resolve();}var cand=Object.keys(candidate.candidate).length>0?SDPUtils.parseCandidate(candidate.candidate):{};// Ignore Chrome's invalid candidates since Edge does not like them.
	if(cand.protocol==='tcp'&&(cand.port===0||cand.port===9)){return Promise.resolve();}// Ignore RTCP candidates, we assume RTCP-MUX.
	if(cand.component&&cand.component!==1){return Promise.resolve();}// when using bundle, avoid adding candidates to the wrong
	// ice transport. And avoid adding candidates added in the SDP.
	if(sdpMLineIndex===0||sdpMLineIndex>0&&transceiver.iceTransport!==this.transceivers[0].iceTransport){if(!maybeAddCandidate(transceiver.iceTransport,cand)){err=new Error('Can not add ICE candidate');err.name='OperationError';}}if(!err){// update the remoteDescription.
	var candidateString=candidate.candidate.trim();if(candidateString.indexOf('a=')===0){candidateString=candidateString.substr(2);}sections=SDPUtils.splitSections(this.remoteDescription.sdp);sections[sdpMLineIndex+1]+='a='+(cand.type?candidateString:'end-of-candidates')+'\r\n';this.remoteDescription.sdp=sections.join('');}}else{err=new Error('Can not add ICE candidate');err.name='OperationError';}}var args=arguments;return new Promise(function(resolve,reject){if(err){if(args.length>2&&typeof args[2]==='function'){args[2].apply(null,[err]);}reject(err);}else{if(args.length>1&&typeof args[1]==='function'){args[1].apply(null);}resolve();}});};RTCPeerConnection.prototype.getStats=function(){var promises=[];this.transceivers.forEach(function(transceiver){['rtpSender','rtpReceiver','iceGatherer','iceTransport','dtlsTransport'].forEach(function(method){if(transceiver[method]){promises.push(transceiver[method].getStats());}});});var cb=arguments.length>1&&typeof arguments[1]==='function'&&arguments[1];var fixStatsType=function fixStatsType(stat){return{inboundrtp:'inbound-rtp',outboundrtp:'outbound-rtp',candidatepair:'candidate-pair',localcandidate:'local-candidate',remotecandidate:'remote-candidate'}[stat.type]||stat.type;};return new Promise(function(resolve){// shim getStats with maplike support
	var results=new Map();Promise.all(promises).then(function(res){res.forEach(function(result){Object.keys(result).forEach(function(id){result[id].type=fixStatsType(result[id]);results.set(id,result[id]);});});if(cb){cb.apply(null,results);}resolve(results);});});};return RTCPeerConnection;};},{"sdp":2}],2:[function(requirecopy,module,exports){/* eslint-env node */'use strict';// SDP helpers.
	var SDPUtils={};// Generate an alphanumeric identifier for cname or mids.
	// TODO: use UUIDs instead? https://gist.github.com/jed/982883
	SDPUtils.generateIdentifier=function(){return Math.random().toString(36).substr(2,10);};// The RTCP CNAME used by all peerconnections from the same JS.
	SDPUtils.localCName=SDPUtils.generateIdentifier();// Splits SDP into lines, dealing with both CRLF and LF.
	SDPUtils.splitLines=function(blob){return blob.trim().split('\n').map(function(line){return line.trim();});};// Splits SDP into sessionpart and mediasections. Ensures CRLF.
	SDPUtils.splitSections=function(blob){var parts=blob.split('\nm=');return parts.map(function(part,index){return(index>0?'m='+part:part).trim()+'\r\n';});};// Returns lines that start with a certain prefix.
	SDPUtils.matchPrefix=function(blob,prefix){return SDPUtils.splitLines(blob).filter(function(line){return line.indexOf(prefix)===0;});};// Parses an ICE candidate line. Sample input:
	// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
	// rport 55996"
	SDPUtils.parseCandidate=function(line){var parts;// Parse both variants.
	if(line.indexOf('a=candidate:')===0){parts=line.substring(12).split(' ');}else{parts=line.substring(10).split(' ');}var candidate={foundation:parts[0],component:parseInt(parts[1],10),protocol:parts[2].toLowerCase(),priority:parseInt(parts[3],10),ip:parts[4],port:parseInt(parts[5],10),// skip parts[6] == 'typ'
	type:parts[7]};for(var i=8;i<parts.length;i+=2){switch(parts[i]){case'raddr':candidate.relatedAddress=parts[i+1];break;case'rport':candidate.relatedPort=parseInt(parts[i+1],10);break;case'tcptype':candidate.tcpType=parts[i+1];break;case'ufrag':candidate.ufrag=parts[i+1];// for backward compability.
	candidate.usernameFragment=parts[i+1];break;default:// extension handling, in particular ufrag
	candidate[parts[i]]=parts[i+1];break;}}return candidate;};// Translates a candidate object into SDP candidate attribute.
	SDPUtils.writeCandidate=function(candidate){var sdp=[];sdp.push(candidate.foundation);sdp.push(candidate.component);sdp.push(candidate.protocol.toUpperCase());sdp.push(candidate.priority);sdp.push(candidate.ip);sdp.push(candidate.port);var type=candidate.type;sdp.push('typ');sdp.push(type);if(type!=='host'&&candidate.relatedAddress&&candidate.relatedPort){sdp.push('raddr');sdp.push(candidate.relatedAddress);// was: relAddr
	sdp.push('rport');sdp.push(candidate.relatedPort);// was: relPort
	}if(candidate.tcpType&&candidate.protocol.toLowerCase()==='tcp'){sdp.push('tcptype');sdp.push(candidate.tcpType);}if(candidate.ufrag){sdp.push('ufrag');sdp.push(candidate.ufrag);}return'candidate:'+sdp.join(' ');};// Parses an ice-options line, returns an array of option tags.
	// a=ice-options:foo bar
	SDPUtils.parseIceOptions=function(line){return line.substr(14).split(' ');};// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
	// a=rtpmap:111 opus/48000/2
	SDPUtils.parseRtpMap=function(line){var parts=line.substr(9).split(' ');var parsed={payloadType:parseInt(parts.shift(),10)// was: id
	};parts=parts[0].split('/');parsed.name=parts[0];parsed.clockRate=parseInt(parts[1],10);// was: clockrate
	// was: channels
	parsed.numChannels=parts.length===3?parseInt(parts[2],10):1;return parsed;};// Generate an a=rtpmap line from RTCRtpCodecCapability or
	// RTCRtpCodecParameters.
	SDPUtils.writeRtpMap=function(codec){var pt=codec.payloadType;if(codec.preferredPayloadType!==undefined){pt=codec.preferredPayloadType;}return'a=rtpmap:'+pt+' '+codec.name+'/'+codec.clockRate+(codec.numChannels!==1?'/'+codec.numChannels:'')+'\r\n';};// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
	// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
	// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
	SDPUtils.parseExtmap=function(line){var parts=line.substr(9).split(' ');return{id:parseInt(parts[0],10),direction:parts[0].indexOf('/')>0?parts[0].split('/')[1]:'sendrecv',uri:parts[1]};};// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
	// RTCRtpHeaderExtension.
	SDPUtils.writeExtmap=function(headerExtension){return'a=extmap:'+(headerExtension.id||headerExtension.preferredId)+(headerExtension.direction&&headerExtension.direction!=='sendrecv'?'/'+headerExtension.direction:'')+' '+headerExtension.uri+'\r\n';};// Parses an ftmp line, returns dictionary. Sample input:
	// a=fmtp:96 vbr=on;cng=on
	// Also deals with vbr=on; cng=on
	SDPUtils.parseFmtp=function(line){var parsed={};var kv;var parts=line.substr(line.indexOf(' ')+1).split(';');for(var j=0;j<parts.length;j++){kv=parts[j].trim().split('=');parsed[kv[0].trim()]=kv[1];}return parsed;};// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeFmtp=function(codec){var line='';var pt=codec.payloadType;if(codec.preferredPayloadType!==undefined){pt=codec.preferredPayloadType;}if(codec.parameters&&Object.keys(codec.parameters).length){var params=[];Object.keys(codec.parameters).forEach(function(param){params.push(param+'='+codec.parameters[param]);});line+='a=fmtp:'+pt+' '+params.join(';')+'\r\n';}return line;};// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
	// a=rtcp-fb:98 nack rpsi
	SDPUtils.parseRtcpFb=function(line){var parts=line.substr(line.indexOf(' ')+1).split(' ');return{type:parts.shift(),parameter:parts.join(' ')};};// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeRtcpFb=function(codec){var lines='';var pt=codec.payloadType;if(codec.preferredPayloadType!==undefined){pt=codec.preferredPayloadType;}if(codec.rtcpFeedback&&codec.rtcpFeedback.length){// FIXME: special handling for trr-int?
	codec.rtcpFeedback.forEach(function(fb){lines+='a=rtcp-fb:'+pt+' '+fb.type+(fb.parameter&&fb.parameter.length?' '+fb.parameter:'')+'\r\n';});}return lines;};// Parses an RFC 5576 ssrc media attribute. Sample input:
	// a=ssrc:3735928559 cname:something
	SDPUtils.parseSsrcMedia=function(line){var sp=line.indexOf(' ');var parts={ssrc:parseInt(line.substr(7,sp-7),10)};var colon=line.indexOf(':',sp);if(colon>-1){parts.attribute=line.substr(sp+1,colon-sp-1);parts.value=line.substr(colon+1);}else{parts.attribute=line.substr(sp+1);}return parts;};// Extracts the MID (RFC 5888) from a media section.
	// returns the MID or undefined if no mid line was found.
	SDPUtils.getMid=function(mediaSection){var mid=SDPUtils.matchPrefix(mediaSection,'a=mid:')[0];if(mid){return mid.substr(6);}};SDPUtils.parseFingerprint=function(line){var parts=line.substr(14).split(' ');return{algorithm:parts[0].toLowerCase(),// algorithm is case-sensitive in Edge.
	value:parts[1]};};// Extracts DTLS parameters from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the fingerprint line as input. See also getIceParameters.
	SDPUtils.getDtlsParameters=function(mediaSection,sessionpart){var lines=SDPUtils.matchPrefix(mediaSection+sessionpart,'a=fingerprint:');// Note: a=setup line is ignored since we use the 'auto' role.
	// Note2: 'algorithm' is not case sensitive except in Edge.
	return{role:'auto',fingerprints:lines.map(SDPUtils.parseFingerprint)};};// Serializes DTLS parameters to SDP.
	SDPUtils.writeDtlsParameters=function(params,setupType){var sdp='a=setup:'+setupType+'\r\n';params.fingerprints.forEach(function(fp){sdp+='a=fingerprint:'+fp.algorithm+' '+fp.value+'\r\n';});return sdp;};// Parses ICE information from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the ice-ufrag and ice-pwd lines as input.
	SDPUtils.getIceParameters=function(mediaSection,sessionpart){var lines=SDPUtils.splitLines(mediaSection);// Search in session part, too.
	lines=lines.concat(SDPUtils.splitLines(sessionpart));var iceParameters={usernameFragment:lines.filter(function(line){return line.indexOf('a=ice-ufrag:')===0;})[0].substr(12),password:lines.filter(function(line){return line.indexOf('a=ice-pwd:')===0;})[0].substr(10)};return iceParameters;};// Serializes ICE parameters to SDP.
	SDPUtils.writeIceParameters=function(params){return'a=ice-ufrag:'+params.usernameFragment+'\r\n'+'a=ice-pwd:'+params.password+'\r\n';};// Parses the SDP media section and returns RTCRtpParameters.
	SDPUtils.parseRtpParameters=function(mediaSection){var description={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]};var lines=SDPUtils.splitLines(mediaSection);var mline=lines[0].split(' ');for(var i=3;i<mline.length;i++){// find all codecs from mline[3..]
	var pt=mline[i];var rtpmapline=SDPUtils.matchPrefix(mediaSection,'a=rtpmap:'+pt+' ')[0];if(rtpmapline){var codec=SDPUtils.parseRtpMap(rtpmapline);var fmtps=SDPUtils.matchPrefix(mediaSection,'a=fmtp:'+pt+' ');// Only the first a=fmtp:<pt> is considered.
	codec.parameters=fmtps.length?SDPUtils.parseFmtp(fmtps[0]):{};codec.rtcpFeedback=SDPUtils.matchPrefix(mediaSection,'a=rtcp-fb:'+pt+' ').map(SDPUtils.parseRtcpFb);description.codecs.push(codec);// parse FEC mechanisms from rtpmap lines.
	switch(codec.name.toUpperCase()){case'RED':case'ULPFEC':description.fecMechanisms.push(codec.name.toUpperCase());break;default:// only RED and ULPFEC are recognized as FEC mechanisms.
	break;}}}SDPUtils.matchPrefix(mediaSection,'a=extmap:').forEach(function(line){description.headerExtensions.push(SDPUtils.parseExtmap(line));});// FIXME: parse rtcp.
	return description;};// Generates parts of the SDP media section describing the capabilities /
	// parameters.
	SDPUtils.writeRtpDescription=function(kind,caps){var sdp='';// Build the mline.
	sdp+='m='+kind+' ';sdp+=caps.codecs.length>0?'9':'0';// reject if no codecs.
	sdp+=' UDP/TLS/RTP/SAVPF ';sdp+=caps.codecs.map(function(codec){if(codec.preferredPayloadType!==undefined){return codec.preferredPayloadType;}return codec.payloadType;}).join(' ')+'\r\n';sdp+='c=IN IP4 0.0.0.0\r\n';sdp+='a=rtcp:9 IN IP4 0.0.0.0\r\n';// Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
	caps.codecs.forEach(function(codec){sdp+=SDPUtils.writeRtpMap(codec);sdp+=SDPUtils.writeFmtp(codec);sdp+=SDPUtils.writeRtcpFb(codec);});var maxptime=0;caps.codecs.forEach(function(codec){if(codec.maxptime>maxptime){maxptime=codec.maxptime;}});if(maxptime>0){sdp+='a=maxptime:'+maxptime+'\r\n';}sdp+='a=rtcp-mux\r\n';caps.headerExtensions.forEach(function(extension){sdp+=SDPUtils.writeExtmap(extension);});// FIXME: write fecMechanisms.
	return sdp;};// Parses the SDP media section and returns an array of
	// RTCRtpEncodingParameters.
	SDPUtils.parseRtpEncodingParameters=function(mediaSection){var encodingParameters=[];var description=SDPUtils.parseRtpParameters(mediaSection);var hasRed=description.fecMechanisms.indexOf('RED')!==-1;var hasUlpfec=description.fecMechanisms.indexOf('ULPFEC')!==-1;// filter a=ssrc:... cname:, ignore PlanB-msid
	var ssrcs=SDPUtils.matchPrefix(mediaSection,'a=ssrc:').map(function(line){return SDPUtils.parseSsrcMedia(line);}).filter(function(parts){return parts.attribute==='cname';});var primarySsrc=ssrcs.length>0&&ssrcs[0].ssrc;var secondarySsrc;var flows=SDPUtils.matchPrefix(mediaSection,'a=ssrc-group:FID').map(function(line){var parts=line.split(' ');parts.shift();return parts.map(function(part){return parseInt(part,10);});});if(flows.length>0&&flows[0].length>1&&flows[0][0]===primarySsrc){secondarySsrc=flows[0][1];}description.codecs.forEach(function(codec){if(codec.name.toUpperCase()==='RTX'&&codec.parameters.apt){var encParam={ssrc:primarySsrc,codecPayloadType:parseInt(codec.parameters.apt,10),rtx:{ssrc:secondarySsrc}};encodingParameters.push(encParam);if(hasRed){encParam=JSON.parse(JSON.stringify(encParam));encParam.fec={ssrc:secondarySsrc,mechanism:hasUlpfec?'red+ulpfec':'red'};encodingParameters.push(encParam);}}});if(encodingParameters.length===0&&primarySsrc){encodingParameters.push({ssrc:primarySsrc});}// we support both b=AS and b=TIAS but interpret AS as TIAS.
	var bandwidth=SDPUtils.matchPrefix(mediaSection,'b=');if(bandwidth.length){if(bandwidth[0].indexOf('b=TIAS:')===0){bandwidth=parseInt(bandwidth[0].substr(7),10);}else if(bandwidth[0].indexOf('b=AS:')===0){// use formula from JSEP to convert b=AS to TIAS value.
	bandwidth=parseInt(bandwidth[0].substr(5),10)*1000*0.95-50*40*8;}else{bandwidth=undefined;}encodingParameters.forEach(function(params){params.maxBitrate=bandwidth;});}return encodingParameters;};// parses http://draft.ortc.org/#rtcrtcpparameters*
	SDPUtils.parseRtcpParameters=function(mediaSection){var rtcpParameters={};var cname;// Gets the first SSRC. Note that with RTX there might be multiple
	// SSRCs.
	var remoteSsrc=SDPUtils.matchPrefix(mediaSection,'a=ssrc:').map(function(line){return SDPUtils.parseSsrcMedia(line);}).filter(function(obj){return obj.attribute==='cname';})[0];if(remoteSsrc){rtcpParameters.cname=remoteSsrc.value;rtcpParameters.ssrc=remoteSsrc.ssrc;}// Edge uses the compound attribute instead of reducedSize
	// compound is !reducedSize
	var rsize=SDPUtils.matchPrefix(mediaSection,'a=rtcp-rsize');rtcpParameters.reducedSize=rsize.length>0;rtcpParameters.compound=rsize.length===0;// parses the rtcp-mux attrіbute.
	// Note that Edge does not support unmuxed RTCP.
	var mux=SDPUtils.matchPrefix(mediaSection,'a=rtcp-mux');rtcpParameters.mux=mux.length>0;return rtcpParameters;};// parses either a=msid: or a=ssrc:... msid lines and returns
	// the id of the MediaStream and MediaStreamTrack.
	SDPUtils.parseMsid=function(mediaSection){var parts;var spec=SDPUtils.matchPrefix(mediaSection,'a=msid:');if(spec.length===1){parts=spec[0].substr(7).split(' ');return{stream:parts[0],track:parts[1]};}var planB=SDPUtils.matchPrefix(mediaSection,'a=ssrc:').map(function(line){return SDPUtils.parseSsrcMedia(line);}).filter(function(parts){return parts.attribute==='msid';});if(planB.length>0){parts=planB[0].value.split(' ');return{stream:parts[0],track:parts[1]};}};// Generate a session ID for SDP.
	// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
	// recommends using a cryptographically random +ve 64-bit value
	// but right now this should be acceptable and within the right range
	SDPUtils.generateSessionId=function(){return Math.random().toString().substr(2,21);};// Write boilder plate for start of SDP
	// sessId argument is optional - if not supplied it will
	// be generated randomly
	// sessVersion is optional and defaults to 2
	SDPUtils.writeSessionBoilerplate=function(sessId,sessVer){var sessionId;var version=sessVer!==undefined?sessVer:2;if(sessId){sessionId=sessId;}else{sessionId=SDPUtils.generateSessionId();}// FIXME: sess-id should be an NTP timestamp.
	return'v=0\r\n'+'o=thisisadapterortc '+sessionId+' '+version+' IN IP4 127.0.0.1\r\n'+'s=-\r\n'+'t=0 0\r\n';};SDPUtils.writeMediaSection=function(transceiver,caps,type,stream){var sdp=SDPUtils.writeRtpDescription(transceiver.kind,caps);// Map ICE parameters (ufrag, pwd) to SDP.
	sdp+=SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());// Map DTLS parameters to SDP.
	sdp+=SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(),type==='offer'?'actpass':'active');sdp+='a=mid:'+transceiver.mid+'\r\n';if(transceiver.direction){sdp+='a='+transceiver.direction+'\r\n';}else if(transceiver.rtpSender&&transceiver.rtpReceiver){sdp+='a=sendrecv\r\n';}else if(transceiver.rtpSender){sdp+='a=sendonly\r\n';}else if(transceiver.rtpReceiver){sdp+='a=recvonly\r\n';}else{sdp+='a=inactive\r\n';}if(transceiver.rtpSender){// spec.
	var msid='msid:'+stream.id+' '+transceiver.rtpSender.track.id+'\r\n';sdp+='a='+msid;// for Chrome.
	sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].ssrc+' '+msid;if(transceiver.sendEncodingParameters[0].rtx){sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].rtx.ssrc+' '+msid;sdp+='a=ssrc-group:FID '+transceiver.sendEncodingParameters[0].ssrc+' '+transceiver.sendEncodingParameters[0].rtx.ssrc+'\r\n';}}// FIXME: this should be written by writeRtpDescription.
	sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].ssrc+' cname:'+SDPUtils.localCName+'\r\n';if(transceiver.rtpSender&&transceiver.sendEncodingParameters[0].rtx){sdp+='a=ssrc:'+transceiver.sendEncodingParameters[0].rtx.ssrc+' cname:'+SDPUtils.localCName+'\r\n';}return sdp;};// Gets the direction from the mediaSection or the sessionpart.
	SDPUtils.getDirection=function(mediaSection,sessionpart){// Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
	var lines=SDPUtils.splitLines(mediaSection);for(var i=0;i<lines.length;i++){switch(lines[i]){case'a=sendrecv':case'a=sendonly':case'a=recvonly':case'a=inactive':return lines[i].substr(2);default:// FIXME: What should happen here?
	}}if(sessionpart){return SDPUtils.getDirection(sessionpart);}return'sendrecv';};SDPUtils.getKind=function(mediaSection){var lines=SDPUtils.splitLines(mediaSection);var mline=lines[0].split(' ');return mline[0].substr(2);};SDPUtils.isRejected=function(mediaSection){return mediaSection.split(' ',2)[1]==='0';};SDPUtils.parseMLine=function(mediaSection){var lines=SDPUtils.splitLines(mediaSection);var mline=lines[0].split(' ');return{kind:mline[0].substr(2),port:parseInt(mline[1],10),protocol:mline[2],fmt:mline.slice(3).join(' ')};};// Expose public methods.
	if((typeof module==='undefined'?'undefined':_typeof(module))==='object'){module.exports=SDPUtils;}},{}],3:[function(requirecopy,module,exports){(function(global){/*
	             *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	             *
	             *  Use of this source code is governed by a BSD-style license
	             *  that can be found in the LICENSE file in the root of the source
	             *  tree.
	             *//* eslint-env node */'use strict';var adapterFactory=requirecopy('./adapter_factory.js');module.exports=adapterFactory({window:global.window});}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./adapter_factory.js":4}],4:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var utils=requirecopy('./utils');// Shimming starts here.
	module.exports=function(dependencies,opts){var window=dependencies&&dependencies.window;var options={shimChrome:true,shimFirefox:true,shimEdge:true,shimSafari:true};for(var key in opts){if(hasOwnProperty.call(opts,key)){options[key]=opts[key];}}// Utils.
	var logging=utils.log;var browserDetails=utils.detectBrowser(window);// Export to the adapter global object visible in the browser.
	var adapter={browserDetails:browserDetails,extractVersion:utils.extractVersion,disableLog:utils.disableLog,disableWarnings:utils.disableWarnings};// Uncomment the line below if you want logging to occur, including logging
	// for the switch statement below. Can also be turned on in the browser via
	// adapter.disableLog(false), but then logging from the switch statement below
	// will not appear.
	// requirecopy('./utils').disableLog(false);
	// Browser shims.
	var chromeShim=requirecopy('./chrome/chrome_shim')||null;var edgeShim=requirecopy('./edge/edge_shim')||null;var firefoxShim=requirecopy('./firefox/firefox_shim')||null;var safariShim=requirecopy('./safari/safari_shim')||null;var commonShim=requirecopy('./common_shim')||null;// Shim browser if found.
	switch(browserDetails.browser){case'chrome':if(!chromeShim||!chromeShim.shimPeerConnection||!options.shimChrome){logging('Chrome shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming chrome.');// Export to the adapter global object visible in the browser.
	adapter.browserShim=chromeShim;commonShim.shimCreateObjectURL(window);chromeShim.shimGetUserMedia(window);chromeShim.shimMediaStream(window);chromeShim.shimSourceObject(window);chromeShim.shimPeerConnection(window);chromeShim.shimOnTrack(window);chromeShim.shimAddTrackRemoveTrack(window);chromeShim.shimGetSendersWithDtmf(window);commonShim.shimRTCIceCandidate(window);break;case'firefox':if(!firefoxShim||!firefoxShim.shimPeerConnection||!options.shimFirefox){logging('Firefox shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming firefox.');// Export to the adapter global object visible in the browser.
	adapter.browserShim=firefoxShim;commonShim.shimCreateObjectURL(window);firefoxShim.shimGetUserMedia(window);firefoxShim.shimSourceObject(window);firefoxShim.shimPeerConnection(window);firefoxShim.shimOnTrack(window);firefoxShim.shimRemoveStream(window);commonShim.shimRTCIceCandidate(window);break;case'edge':if(!edgeShim||!edgeShim.shimPeerConnection||!options.shimEdge){logging('MS edge shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming edge.');// Export to the adapter global object visible in the browser.
	adapter.browserShim=edgeShim;commonShim.shimCreateObjectURL(window);edgeShim.shimGetUserMedia(window);edgeShim.shimPeerConnection(window);edgeShim.shimReplaceTrack(window);// the edge shim implements the full RTCIceCandidate object.
	break;case'safari':if(!safariShim||!options.shimSafari){logging('Safari shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming safari.');// Export to the adapter global object visible in the browser.
	adapter.browserShim=safariShim;commonShim.shimCreateObjectURL(window);safariShim.shimRTCIceServerUrls(window);safariShim.shimCallbacksAPI(window);safariShim.shimLocalStreamsAPI(window);safariShim.shimRemoteStreamsAPI(window);safariShim.shimTrackEventTransceiver(window);safariShim.shimGetUserMedia(window);safariShim.shimCreateOfferLegacy(window);commonShim.shimRTCIceCandidate(window);break;default:logging('Unsupported browser!');break;}return adapter;};},{"./chrome/chrome_shim":5,"./common_shim":7,"./edge/edge_shim":8,"./firefox/firefox_shim":10,"./safari/safari_shim":12,"./utils":13}],5:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var utils=requirecopy('../utils.js');var logging=utils.log;var chromeShim={shimMediaStream:function shimMediaStream(window){window.MediaStream=window.MediaStream||window.webkitMediaStream;},shimOnTrack:function shimOnTrack(window){if((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.RTCPeerConnection&&!('ontrack'in window.RTCPeerConnection.prototype)){Object.defineProperty(window.RTCPeerConnection.prototype,'ontrack',{get:function get(){return this._ontrack;},set:function set(f){if(this._ontrack){this.removeEventListener('track',this._ontrack);}this.addEventListener('track',this._ontrack=f);}});var origSetRemoteDescription=window.RTCPeerConnection.prototype.setRemoteDescription;window.RTCPeerConnection.prototype.setRemoteDescription=function(){var pc=this;if(!pc._ontrackpoly){pc._ontrackpoly=function(e){// onaddstream does not fire when a track is added to an existing
	// stream. But stream.onaddtrack is implemented so we use that.
	e.stream.addEventListener('addtrack',function(te){var receiver;if(window.RTCPeerConnection.prototype.getReceivers){receiver=pc.getReceivers().find(function(r){return r.track&&r.track.id===te.track.id;});}else{receiver={track:te.track};}var event=new Event('track');event.track=te.track;event.receiver=receiver;event.transceiver={receiver:receiver};event.streams=[e.stream];pc.dispatchEvent(event);});e.stream.getTracks().forEach(function(track){var receiver;if(window.RTCPeerConnection.prototype.getReceivers){receiver=pc.getReceivers().find(function(r){return r.track&&r.track.id===track.id;});}else{receiver={track:track};}var event=new Event('track');event.track=track;event.receiver=receiver;event.transceiver={receiver:receiver};event.streams=[e.stream];pc.dispatchEvent(event);});};pc.addEventListener('addstream',pc._ontrackpoly);}return origSetRemoteDescription.apply(pc,arguments);};}},shimGetSendersWithDtmf:function shimGetSendersWithDtmf(window){// Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
	if((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.RTCPeerConnection&&!('getSenders'in window.RTCPeerConnection.prototype)&&'createDTMFSender'in window.RTCPeerConnection.prototype){var shimSenderWithDtmf=function shimSenderWithDtmf(pc,track){return{track:track,get dtmf(){if(this._dtmf===undefined){if(track.kind==='audio'){this._dtmf=pc.createDTMFSender(track);}else{this._dtmf=null;}}return this._dtmf;},_pc:pc};};// augment addTrack when getSenders is not available.
	if(!window.RTCPeerConnection.prototype.getSenders){window.RTCPeerConnection.prototype.getSenders=function(){this._senders=this._senders||[];return this._senders.slice();// return a copy of the internal state.
	};var origAddTrack=window.RTCPeerConnection.prototype.addTrack;window.RTCPeerConnection.prototype.addTrack=function(track,stream){var pc=this;var sender=origAddTrack.apply(pc,arguments);if(!sender){sender=shimSenderWithDtmf(pc,track);pc._senders.push(sender);}return sender;};var origRemoveTrack=window.RTCPeerConnection.prototype.removeTrack;window.RTCPeerConnection.prototype.removeTrack=function(sender){var pc=this;origRemoveTrack.apply(pc,arguments);var idx=pc._senders.indexOf(sender);if(idx!==-1){pc._senders.splice(idx,1);}};}var origAddStream=window.RTCPeerConnection.prototype.addStream;window.RTCPeerConnection.prototype.addStream=function(stream){var pc=this;pc._senders=pc._senders||[];origAddStream.apply(pc,[stream]);stream.getTracks().forEach(function(track){pc._senders.push(shimSenderWithDtmf(pc,track));});};var origRemoveStream=window.RTCPeerConnection.prototype.removeStream;window.RTCPeerConnection.prototype.removeStream=function(stream){var pc=this;pc._senders=pc._senders||[];origRemoveStream.apply(pc,[stream]);stream.getTracks().forEach(function(track){var sender=pc._senders.find(function(s){return s.track===track;});if(sender){pc._senders.splice(pc._senders.indexOf(sender),1);// remove sender
	}});};}else if((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.RTCPeerConnection&&'getSenders'in window.RTCPeerConnection.prototype&&'createDTMFSender'in window.RTCPeerConnection.prototype&&window.RTCRtpSender&&!('dtmf'in window.RTCRtpSender.prototype)){var origGetSenders=window.RTCPeerConnection.prototype.getSenders;window.RTCPeerConnection.prototype.getSenders=function(){var pc=this;var senders=origGetSenders.apply(pc,[]);senders.forEach(function(sender){sender._pc=pc;});return senders;};Object.defineProperty(window.RTCRtpSender.prototype,'dtmf',{get:function get(){if(this._dtmf===undefined){if(this.track.kind==='audio'){this._dtmf=this._pc.createDTMFSender(this.track);}else{this._dtmf=null;}}return this._dtmf;}});}},shimSourceObject:function shimSourceObject(window){var URL=window&&window.URL;if((typeof window==='undefined'?'undefined':_typeof(window))==='object'){if(window.HTMLMediaElement&&!('srcObject'in window.HTMLMediaElement.prototype)){// Shim the srcObject property, once, when HTMLMediaElement is found.
	Object.defineProperty(window.HTMLMediaElement.prototype,'srcObject',{get:function get(){return this._srcObject;},set:function set(stream){var self=this;// Use _srcObject as a private property for this shim
	this._srcObject=stream;if(this.src){URL.revokeObjectURL(this.src);}if(!stream){this.src='';return undefined;}this.src=URL.createObjectURL(stream);// We need to recreate the blob url when a track is added or
	// removed. Doing it manually since we want to avoid a recursion.
	stream.addEventListener('addtrack',function(){if(self.src){URL.revokeObjectURL(self.src);}self.src=URL.createObjectURL(stream);});stream.addEventListener('removetrack',function(){if(self.src){URL.revokeObjectURL(self.src);}self.src=URL.createObjectURL(stream);});}});}}},shimAddTrackRemoveTrack:function shimAddTrackRemoveTrack(window){var browserDetails=utils.detectBrowser(window);// shim addTrack and removeTrack.
	if(window.RTCPeerConnection.prototype.addTrack&&browserDetails.version>=64){return;}// also shim pc.getLocalStreams when addTrack is shimmed
	// to return the original streams.
	var origGetLocalStreams=window.RTCPeerConnection.prototype.getLocalStreams;window.RTCPeerConnection.prototype.getLocalStreams=function(){var self=this;var nativeStreams=origGetLocalStreams.apply(this);self._reverseStreams=self._reverseStreams||{};return nativeStreams.map(function(stream){return self._reverseStreams[stream.id];});};var origAddStream=window.RTCPeerConnection.prototype.addStream;window.RTCPeerConnection.prototype.addStream=function(stream){var pc=this;pc._streams=pc._streams||{};pc._reverseStreams=pc._reverseStreams||{};stream.getTracks().forEach(function(track){var alreadyExists=pc.getSenders().find(function(s){return s.track===track;});if(alreadyExists){throw new DOMException('Track already exists.','InvalidAccessError');}});// Add identity mapping for consistency with addTrack.
	// Unless this is being used with a stream from addTrack.
	if(!pc._reverseStreams[stream.id]){var newStream=new window.MediaStream(stream.getTracks());pc._streams[stream.id]=newStream;pc._reverseStreams[newStream.id]=stream;stream=newStream;}origAddStream.apply(pc,[stream]);};var origRemoveStream=window.RTCPeerConnection.prototype.removeStream;window.RTCPeerConnection.prototype.removeStream=function(stream){var pc=this;pc._streams=pc._streams||{};pc._reverseStreams=pc._reverseStreams||{};origRemoveStream.apply(pc,[pc._streams[stream.id]||stream]);delete pc._reverseStreams[pc._streams[stream.id]?pc._streams[stream.id].id:stream.id];delete pc._streams[stream.id];};window.RTCPeerConnection.prototype.addTrack=function(track,stream){var pc=this;if(pc.signalingState==='closed'){throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.','InvalidStateError');}var streams=[].slice.call(arguments,1);if(streams.length!==1||!streams[0].getTracks().find(function(t){return t===track;})){// this is not fully correct but all we can manage without
	// [[associated MediaStreams]] internal slot.
	throw new DOMException('The adapter.js addTrack polyfill only supports a single '+' stream which is associated with the specified track.','NotSupportedError');}var alreadyExists=pc.getSenders().find(function(s){return s.track===track;});if(alreadyExists){throw new DOMException('Track already exists.','InvalidAccessError');}pc._streams=pc._streams||{};pc._reverseStreams=pc._reverseStreams||{};var oldStream=pc._streams[stream.id];if(oldStream){// this is using odd Chrome behaviour, use with caution:
	// https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
	// Note: we rely on the high-level addTrack/dtmf shim to
	// create the sender with a dtmf sender.
	oldStream.addTrack(track);// Trigger ONN async.
	Promise.resolve().then(function(){pc.dispatchEvent(new Event('negotiationneeded'));});}else{var newStream=new window.MediaStream([track]);pc._streams[stream.id]=newStream;pc._reverseStreams[newStream.id]=stream;pc.addStream(newStream);}return pc.getSenders().find(function(s){return s.track===track;});};// replace the internal stream id with the external one and
	// vice versa.
	function replaceInternalStreamId(pc,description){var sdp=description.sdp;Object.keys(pc._reverseStreams||[]).forEach(function(internalId){var externalStream=pc._reverseStreams[internalId];var internalStream=pc._streams[externalStream.id];sdp=sdp.replace(new RegExp(internalStream.id,'g'),externalStream.id);});return new RTCSessionDescription({type:description.type,sdp:sdp});}function replaceExternalStreamId(pc,description){var sdp=description.sdp;Object.keys(pc._reverseStreams||[]).forEach(function(internalId){var externalStream=pc._reverseStreams[internalId];var internalStream=pc._streams[externalStream.id];sdp=sdp.replace(new RegExp(externalStream.id,'g'),internalStream.id);});return new RTCSessionDescription({type:description.type,sdp:sdp});}['createOffer','createAnswer'].forEach(function(method){var nativeMethod=window.RTCPeerConnection.prototype[method];window.RTCPeerConnection.prototype[method]=function(){var pc=this;var args=arguments;var isLegacyCall=arguments.length&&typeof arguments[0]==='function';if(isLegacyCall){return nativeMethod.apply(pc,[function(description){var desc=replaceInternalStreamId(pc,description);args[0].apply(null,[desc]);},function(err){if(args[1]){args[1].apply(null,err);}},arguments[2]]);}return nativeMethod.apply(pc,arguments).then(function(description){return replaceInternalStreamId(pc,description);});};});var origSetLocalDescription=window.RTCPeerConnection.prototype.setLocalDescription;window.RTCPeerConnection.prototype.setLocalDescription=function(){var pc=this;if(!arguments.length||!arguments[0].type){return origSetLocalDescription.apply(pc,arguments);}arguments[0]=replaceExternalStreamId(pc,arguments[0]);return origSetLocalDescription.apply(pc,arguments);};// TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
	var origLocalDescription=Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype,'localDescription');Object.defineProperty(window.RTCPeerConnection.prototype,'localDescription',{get:function get(){var pc=this;var description=origLocalDescription.get.apply(this);if(description.type===''){return description;}return replaceInternalStreamId(pc,description);}});window.RTCPeerConnection.prototype.removeTrack=function(sender){var pc=this;if(pc.signalingState==='closed'){throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.','InvalidStateError');}// We can not yet check for sender instanceof RTCRtpSender
	// since we shim RTPSender. So we check if sender._pc is set.
	if(!sender._pc){throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack '+'does not implement interface RTCRtpSender.','TypeError');}var isLocal=sender._pc===pc;if(!isLocal){throw new DOMException('Sender was not created by this connection.','InvalidAccessError');}// Search for the native stream the senders track belongs to.
	pc._streams=pc._streams||{};var stream;Object.keys(pc._streams).forEach(function(streamid){var hasTrack=pc._streams[streamid].getTracks().find(function(track){return sender.track===track;});if(hasTrack){stream=pc._streams[streamid];}});if(stream){if(stream.getTracks().length===1){// if this is the last track of the stream, remove the stream. This
	// takes care of any shimmed _senders.
	pc.removeStream(pc._reverseStreams[stream.id]);}else{// relying on the same odd chrome behaviour as above.
	stream.removeTrack(sender.track);}pc.dispatchEvent(new Event('negotiationneeded'));}};},shimPeerConnection:function shimPeerConnection(window){var browserDetails=utils.detectBrowser(window);// The RTCPeerConnection object.
	if(!window.RTCPeerConnection){window.RTCPeerConnection=function(pcConfig,pcConstraints){// Translate iceTransportPolicy to iceTransports,
	// see https://code.google.com/p/webrtc/issues/detail?id=4869
	// this was fixed in M56 along with unprefixing RTCPeerConnection.
	logging('PeerConnection');if(pcConfig&&pcConfig.iceTransportPolicy){pcConfig.iceTransports=pcConfig.iceTransportPolicy;}return new window.webkitRTCPeerConnection(pcConfig,pcConstraints);};window.RTCPeerConnection.prototype=window.webkitRTCPeerConnection.prototype;// wrap static methods. Currently just generateCertificate.
	if(window.webkitRTCPeerConnection.generateCertificate){Object.defineProperty(window.RTCPeerConnection,'generateCertificate',{get:function get(){return window.webkitRTCPeerConnection.generateCertificate;}});}}else{// migrate from non-spec RTCIceServer.url to RTCIceServer.urls
	var OrigPeerConnection=window.RTCPeerConnection;window.RTCPeerConnection=function(pcConfig,pcConstraints){if(pcConfig&&pcConfig.iceServers){var newIceServers=[];for(var i=0;i<pcConfig.iceServers.length;i++){var server=pcConfig.iceServers[i];if(!server.hasOwnProperty('urls')&&server.hasOwnProperty('url')){utils.deprecated('RTCIceServer.url','RTCIceServer.urls');server=JSON.parse(JSON.stringify(server));server.urls=server.url;newIceServers.push(server);}else{newIceServers.push(pcConfig.iceServers[i]);}}pcConfig.iceServers=newIceServers;}return new OrigPeerConnection(pcConfig,pcConstraints);};window.RTCPeerConnection.prototype=OrigPeerConnection.prototype;// wrap static methods. Currently just generateCertificate.
	Object.defineProperty(window.RTCPeerConnection,'generateCertificate',{get:function get(){return OrigPeerConnection.generateCertificate;}});}var origGetStats=window.RTCPeerConnection.prototype.getStats;window.RTCPeerConnection.prototype.getStats=function(selector,successCallback,errorCallback){var self=this;var args=arguments;// If selector is a function then we are in the old style stats so just
	// pass back the original getStats format to avoid breaking old users.
	if(arguments.length>0&&typeof selector==='function'){return origGetStats.apply(this,arguments);}// When spec-style getStats is supported, return those when called with
	// either no arguments or the selector argument is null.
	if(origGetStats.length===0&&(arguments.length===0||typeof arguments[0]!=='function')){return origGetStats.apply(this,[]);}var fixChromeStats_=function fixChromeStats_(response){var standardReport={};var reports=response.result();reports.forEach(function(report){var standardStats={id:report.id,timestamp:report.timestamp,type:{localcandidate:'local-candidate',remotecandidate:'remote-candidate'}[report.type]||report.type};report.names().forEach(function(name){standardStats[name]=report.stat(name);});standardReport[standardStats.id]=standardStats;});return standardReport;};// shim getStats with maplike support
	var makeMapStats=function makeMapStats(stats){return new Map(Object.keys(stats).map(function(key){return[key,stats[key]];}));};if(arguments.length>=2){var successCallbackWrapper_=function successCallbackWrapper_(response){args[1](makeMapStats(fixChromeStats_(response)));};return origGetStats.apply(this,[successCallbackWrapper_,arguments[0]]);}// promise-support
	return new Promise(function(resolve,reject){origGetStats.apply(self,[function(response){resolve(makeMapStats(fixChromeStats_(response)));},reject]);}).then(successCallback,errorCallback);};// add promise support -- natively available in Chrome 51
	if(browserDetails.version<51){['setLocalDescription','setRemoteDescription','addIceCandidate'].forEach(function(method){var nativeMethod=window.RTCPeerConnection.prototype[method];window.RTCPeerConnection.prototype[method]=function(){var args=arguments;var self=this;var promise=new Promise(function(resolve,reject){nativeMethod.apply(self,[args[0],resolve,reject]);});if(args.length<2){return promise;}return promise.then(function(){args[1].apply(null,[]);},function(err){if(args.length>=3){args[2].apply(null,[err]);}});};});}// promise support for createOffer and createAnswer. Available (without
	// bugs) since M52: crbug/619289
	if(browserDetails.version<52){['createOffer','createAnswer'].forEach(function(method){var nativeMethod=window.RTCPeerConnection.prototype[method];window.RTCPeerConnection.prototype[method]=function(){var self=this;if(arguments.length<1||arguments.length===1&&_typeof(arguments[0])==='object'){var opts=arguments.length===1?arguments[0]:undefined;return new Promise(function(resolve,reject){nativeMethod.apply(self,[resolve,reject,opts]);});}return nativeMethod.apply(this,arguments);};});}// shim implicit creation of RTCSessionDescription/RTCIceCandidate
	['setLocalDescription','setRemoteDescription','addIceCandidate'].forEach(function(method){var nativeMethod=window.RTCPeerConnection.prototype[method];window.RTCPeerConnection.prototype[method]=function(){arguments[0]=new(method==='addIceCandidate'?window.RTCIceCandidate:window.RTCSessionDescription)(arguments[0]);return nativeMethod.apply(this,arguments);};});// support for addIceCandidate(null or undefined)
	var nativeAddIceCandidate=window.RTCPeerConnection.prototype.addIceCandidate;window.RTCPeerConnection.prototype.addIceCandidate=function(){if(!arguments[0]){if(arguments[1]){arguments[1].apply(null);}return Promise.resolve();}return nativeAddIceCandidate.apply(this,arguments);};}};// Expose public methods.
	module.exports={shimMediaStream:chromeShim.shimMediaStream,shimOnTrack:chromeShim.shimOnTrack,shimAddTrackRemoveTrack:chromeShim.shimAddTrackRemoveTrack,shimGetSendersWithDtmf:chromeShim.shimGetSendersWithDtmf,shimSourceObject:chromeShim.shimSourceObject,shimPeerConnection:chromeShim.shimPeerConnection,shimGetUserMedia:requirecopy('./getusermedia')};},{"../utils.js":13,"./getusermedia":6}],6:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var utils=requirecopy('../utils.js');var logging=utils.log;// Expose public methods.
	module.exports=function(window){var browserDetails=utils.detectBrowser(window);var navigator=window&&window.navigator;var constraintsToChrome_=function constraintsToChrome_(c){if((typeof c==='undefined'?'undefined':_typeof(c))!=='object'||c.mandatory||c.optional){return c;}var cc={};Object.keys(c).forEach(function(key){if(key==='require'||key==='advanced'||key==='mediaSource'){return;}var r=_typeof(c[key])==='object'?c[key]:{ideal:c[key]};if(r.exact!==undefined&&typeof r.exact==='number'){r.min=r.max=r.exact;}var oldname_=function oldname_(prefix,name){if(prefix){return prefix+name.charAt(0).toUpperCase()+name.slice(1);}return name==='deviceId'?'sourceId':name;};if(r.ideal!==undefined){cc.optional=cc.optional||[];var oc={};if(typeof r.ideal==='number'){oc[oldname_('min',key)]=r.ideal;cc.optional.push(oc);oc={};oc[oldname_('max',key)]=r.ideal;cc.optional.push(oc);}else{oc[oldname_('',key)]=r.ideal;cc.optional.push(oc);}}if(r.exact!==undefined&&typeof r.exact!=='number'){cc.mandatory=cc.mandatory||{};cc.mandatory[oldname_('',key)]=r.exact;}else{['min','max'].forEach(function(mix){if(r[mix]!==undefined){cc.mandatory=cc.mandatory||{};cc.mandatory[oldname_(mix,key)]=r[mix];}});}});if(c.advanced){cc.optional=(cc.optional||[]).concat(c.advanced);}return cc;};var shimConstraints_=function shimConstraints_(constraints,func){if(browserDetails.version>=61){return func(constraints);}constraints=JSON.parse(JSON.stringify(constraints));if(constraints&&_typeof(constraints.audio)==='object'){var remap=function remap(obj,a,b){if(a in obj&&!(b in obj)){obj[b]=obj[a];delete obj[a];}};constraints=JSON.parse(JSON.stringify(constraints));remap(constraints.audio,'autoGainControl','googAutoGainControl');remap(constraints.audio,'noiseSuppression','googNoiseSuppression');constraints.audio=constraintsToChrome_(constraints.audio);}if(constraints&&_typeof(constraints.video)==='object'){// Shim facingMode for mobile & surface pro.
	var face=constraints.video.facingMode;face=face&&((typeof face==='undefined'?'undefined':_typeof(face))==='object'?face:{ideal:face});var getSupportedFacingModeLies=browserDetails.version<66;if(face&&(face.exact==='user'||face.exact==='environment'||face.ideal==='user'||face.ideal==='environment')&&!(navigator.mediaDevices.getSupportedConstraints&&navigator.mediaDevices.getSupportedConstraints().facingMode&&!getSupportedFacingModeLies)){delete constraints.video.facingMode;var matches;if(face.exact==='environment'||face.ideal==='environment'){matches=['back','rear'];}else if(face.exact==='user'||face.ideal==='user'){matches=['front'];}if(matches){// Look for matches in label, or use last cam for back (typical).
	return navigator.mediaDevices.enumerateDevices().then(function(devices){devices=devices.filter(function(d){return d.kind==='videoinput';});var dev=devices.find(function(d){return matches.some(function(match){return d.label.toLowerCase().indexOf(match)!==-1;});});if(!dev&&devices.length&&matches.indexOf('back')!==-1){dev=devices[devices.length-1];// more likely the back cam
	}if(dev){constraints.video.deviceId=face.exact?{exact:dev.deviceId}:{ideal:dev.deviceId};}constraints.video=constraintsToChrome_(constraints.video);logging('chrome: '+JSON.stringify(constraints));return func(constraints);});}}constraints.video=constraintsToChrome_(constraints.video);}logging('chrome: '+JSON.stringify(constraints));return func(constraints);};var shimError_=function shimError_(e){return{name:{PermissionDeniedError:'NotAllowedError',InvalidStateError:'NotReadableError',DevicesNotFoundError:'NotFoundError',ConstraintNotSatisfiedError:'OverconstrainedError',TrackStartError:'NotReadableError',MediaDeviceFailedDueToShutdown:'NotReadableError',MediaDeviceKillSwitchOn:'NotReadableError'}[e.name]||e.name,message:e.message,constraint:e.constraintName,toString:function toString(){return this.name+(this.message&&': ')+this.message;}};};var getUserMedia_=function getUserMedia_(constraints,onSuccess,onError){shimConstraints_(constraints,function(c){navigator.webkitGetUserMedia(c,onSuccess,function(e){if(onError){onError(shimError_(e));}});});};navigator.getUserMedia=getUserMedia_;// Returns the result of getUserMedia as a Promise.
	var getUserMediaPromise_=function getUserMediaPromise_(constraints){return new Promise(function(resolve,reject){navigator.getUserMedia(constraints,resolve,reject);});};if(!navigator.mediaDevices){navigator.mediaDevices={getUserMedia:getUserMediaPromise_,enumerateDevices:function enumerateDevices(){return new Promise(function(resolve){var kinds={audio:'audioinput',video:'videoinput'};return window.MediaStreamTrack.getSources(function(devices){resolve(devices.map(function(device){return{label:device.label,kind:kinds[device.kind],deviceId:device.id,groupId:''};}));});});},getSupportedConstraints:function getSupportedConstraints(){return{deviceId:true,echoCancellation:true,facingMode:true,frameRate:true,height:true,width:true};}};}// A shim for getUserMedia method on the mediaDevices object.
	// TODO(KaptenJansson) remove once implemented in Chrome stable.
	if(!navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia=function(constraints){return getUserMediaPromise_(constraints);};}else{// Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
	// function which returns a Promise, it does not accept spec-style
	// constraints.
	var origGetUserMedia=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(cs){return shimConstraints_(cs,function(c){return origGetUserMedia(c).then(function(stream){if(c.audio&&!stream.getAudioTracks().length||c.video&&!stream.getVideoTracks().length){stream.getTracks().forEach(function(track){track.stop();});throw new DOMException('','NotFoundError');}return stream;},function(e){return Promise.reject(shimError_(e));});});};}// Dummy devicechange event methods.
	// TODO(KaptenJansson) remove once implemented in Chrome stable.
	if(typeof navigator.mediaDevices.addEventListener==='undefined'){navigator.mediaDevices.addEventListener=function(){logging('Dummy mediaDevices.addEventListener called.');};}if(typeof navigator.mediaDevices.removeEventListener==='undefined'){navigator.mediaDevices.removeEventListener=function(){logging('Dummy mediaDevices.removeEventListener called.');};}};},{"../utils.js":13}],7:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var SDPUtils=requirecopy('sdp');var utils=requirecopy('./utils');// Wraps the peerconnection event eventNameToWrap in a function
	// which returns the modified event object.
	function wrapPeerConnectionEvent(window,eventNameToWrap,wrapper){if(!window.RTCPeerConnection){return;}var proto=window.RTCPeerConnection.prototype;var nativeAddEventListener=proto.addEventListener;proto.addEventListener=function(nativeEventName,cb){if(nativeEventName!==eventNameToWrap){return nativeAddEventListener.apply(this,arguments);}var wrappedCallback=function wrappedCallback(e){cb(wrapper(e));};this._eventMap=this._eventMap||{};this._eventMap[cb]=wrappedCallback;return nativeAddEventListener.apply(this,[nativeEventName,wrappedCallback]);};var nativeRemoveEventListener=proto.removeEventListener;proto.removeEventListener=function(nativeEventName,cb){if(nativeEventName!==eventNameToWrap||!this._eventMap||!this._eventMap[cb]){return nativeRemoveEventListener.apply(this,arguments);}var unwrappedCb=this._eventMap[cb];delete this._eventMap[cb];return nativeRemoveEventListener.apply(this,[nativeEventName,unwrappedCb]);};Object.defineProperty(proto,'on'+eventNameToWrap,{get:function get(){return this['_on'+eventNameToWrap];},set:function set(cb){if(this['_on'+eventNameToWrap]){this.removeEventListener(eventNameToWrap,this['_on'+eventNameToWrap]);delete this['_on'+eventNameToWrap];}if(cb){this.addEventListener(eventNameToWrap,this['_on'+eventNameToWrap]=cb);}}});}module.exports={shimRTCIceCandidate:function shimRTCIceCandidate(window){// foundation is arbitrarily chosen as an indicator for full support for
	// https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
	if(window.RTCIceCandidate&&'foundation'in window.RTCIceCandidate.prototype){return;}var NativeRTCIceCandidate=window.RTCIceCandidate;window.RTCIceCandidate=function(args){// Remove the a= which shouldn't be part of the candidate string.
	if((typeof args==='undefined'?'undefined':_typeof(args))==='object'&&args.candidate&&args.candidate.indexOf('a=')===0){args=JSON.parse(JSON.stringify(args));args.candidate=args.candidate.substr(2);}// Augment the native candidate with the parsed fields.
	var nativeCandidate=new NativeRTCIceCandidate(args);var parsedCandidate=SDPUtils.parseCandidate(args.candidate);var augmentedCandidate=Object.assign(nativeCandidate,parsedCandidate);// Add a serializer that does not serialize the extra attributes.
	augmentedCandidate.toJSON=function(){return{candidate:augmentedCandidate.candidate,sdpMid:augmentedCandidate.sdpMid,sdpMLineIndex:augmentedCandidate.sdpMLineIndex,usernameFragment:augmentedCandidate.usernameFragment};};return augmentedCandidate;};// Hook up the augmented candidate in onicecandidate and
	// addEventListener('icecandidate', ...)
	wrapPeerConnectionEvent(window,'icecandidate',function(e){if(e.candidate){Object.defineProperty(e,'candidate',{value:new window.RTCIceCandidate(e.candidate),writable:'false'});}return e;});},// shimCreateObjectURL must be called before shimSourceObject to avoid loop.
	shimCreateObjectURL:function shimCreateObjectURL(window){var URL=window&&window.URL;if(!((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.HTMLMediaElement&&'srcObject'in window.HTMLMediaElement.prototype&&URL.createObjectURL&&URL.revokeObjectURL)){// Only shim CreateObjectURL using srcObject if srcObject exists.
	return undefined;}var nativeCreateObjectURL=URL.createObjectURL.bind(URL);var nativeRevokeObjectURL=URL.revokeObjectURL.bind(URL);var streams=new Map(),newId=0;URL.createObjectURL=function(stream){if('getTracks'in stream){var url='polyblob:'+ ++newId;streams.set(url,stream);utils.deprecated('URL.createObjectURL(stream)','elem.srcObject = stream');return url;}return nativeCreateObjectURL(stream);};URL.revokeObjectURL=function(url){nativeRevokeObjectURL(url);streams.delete(url);};var dsc=Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype,'src');Object.defineProperty(window.HTMLMediaElement.prototype,'src',{get:function get(){return dsc.get.apply(this);},set:function set(url){this.srcObject=streams.get(url)||null;return dsc.set.apply(this,[url]);}});var nativeSetAttribute=window.HTMLMediaElement.prototype.setAttribute;window.HTMLMediaElement.prototype.setAttribute=function(){if(arguments.length===2&&(''+arguments[0]).toLowerCase()==='src'){this.srcObject=streams.get(arguments[1])||null;}return nativeSetAttribute.apply(this,arguments);};}};},{"./utils":13,"sdp":2}],8:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var utils=requirecopy('../utils');var shimRTCPeerConnection=requirecopy('rtcpeerconnection-shim');module.exports={shimGetUserMedia:requirecopy('./getusermedia'),shimPeerConnection:function shimPeerConnection(window){var browserDetails=utils.detectBrowser(window);if(window.RTCIceGatherer){// ORTC defines an RTCIceCandidate object but no constructor.
	// Not implemented in Edge.
	if(!window.RTCIceCandidate){window.RTCIceCandidate=function(args){return args;};}// ORTC does not have a session description object but
	// other browsers (i.e. Chrome) that will support both PC and ORTC
	// in the future might have this defined already.
	if(!window.RTCSessionDescription){window.RTCSessionDescription=function(args){return args;};}// this adds an additional event listener to MediaStrackTrack that signals
	// when a tracks enabled property was changed. Workaround for a bug in
	// addStream, see below. No longer required in 15025+
	if(browserDetails.version<15025){var origMSTEnabled=Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype,'enabled');Object.defineProperty(window.MediaStreamTrack.prototype,'enabled',{set:function set(value){origMSTEnabled.set.call(this,value);var ev=new Event('enabled');ev.enabled=value;this.dispatchEvent(ev);}});}}// ORTC defines the DTMF sender a bit different.
	// https://github.com/w3c/ortc/issues/714
	if(window.RTCRtpSender&&!('dtmf'in window.RTCRtpSender.prototype)){Object.defineProperty(window.RTCRtpSender.prototype,'dtmf',{get:function get(){if(this._dtmf===undefined){if(this.track.kind==='audio'){this._dtmf=new window.RTCDtmfSender(this);}else if(this.track.kind==='video'){this._dtmf=null;}}return this._dtmf;}});}window.RTCPeerConnection=shimRTCPeerConnection(window,browserDetails.version);},shimReplaceTrack:function shimReplaceTrack(window){// ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
	if(window.RTCRtpSender&&!('replaceTrack'in window.RTCRtpSender.prototype)){window.RTCRtpSender.prototype.replaceTrack=window.RTCRtpSender.prototype.setTrack;}}};},{"../utils":13,"./getusermedia":9,"rtcpeerconnection-shim":1}],9:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';// Expose public methods.
	module.exports=function(window){var navigator=window&&window.navigator;var shimError_=function shimError_(e){return{name:{PermissionDeniedError:'NotAllowedError'}[e.name]||e.name,message:e.message,constraint:e.constraint,toString:function toString(){return this.name;}};};// getUserMedia error shim.
	var origGetUserMedia=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(c){return origGetUserMedia(c).catch(function(e){return Promise.reject(shimError_(e));});};};},{}],10:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var utils=requirecopy('../utils');var firefoxShim={shimOnTrack:function shimOnTrack(window){if((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.RTCPeerConnection&&!('ontrack'in window.RTCPeerConnection.prototype)){Object.defineProperty(window.RTCPeerConnection.prototype,'ontrack',{get:function get(){return this._ontrack;},set:function set(f){if(this._ontrack){this.removeEventListener('track',this._ontrack);this.removeEventListener('addstream',this._ontrackpoly);}this.addEventListener('track',this._ontrack=f);this.addEventListener('addstream',this._ontrackpoly=function(e){e.stream.getTracks().forEach(function(track){var event=new Event('track');event.track=track;event.receiver={track:track};event.transceiver={receiver:event.receiver};event.streams=[e.stream];this.dispatchEvent(event);}.bind(this));}.bind(this));}});}if((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.RTCTrackEvent&&'receiver'in window.RTCTrackEvent.prototype&&!('transceiver'in window.RTCTrackEvent.prototype)){Object.defineProperty(window.RTCTrackEvent.prototype,'transceiver',{get:function get(){return{receiver:this.receiver};}});}},shimSourceObject:function shimSourceObject(window){// Firefox has supported mozSrcObject since FF22, unprefixed in 42.
	if((typeof window==='undefined'?'undefined':_typeof(window))==='object'){if(window.HTMLMediaElement&&!('srcObject'in window.HTMLMediaElement.prototype)){// Shim the srcObject property, once, when HTMLMediaElement is found.
	Object.defineProperty(window.HTMLMediaElement.prototype,'srcObject',{get:function get(){return this.mozSrcObject;},set:function set(stream){this.mozSrcObject=stream;}});}}},shimPeerConnection:function shimPeerConnection(window){var browserDetails=utils.detectBrowser(window);if((typeof window==='undefined'?'undefined':_typeof(window))!=='object'||!(window.RTCPeerConnection||window.mozRTCPeerConnection)){return;// probably media.peerconnection.enabled=false in about:config
	}// The RTCPeerConnection object.
	if(!window.RTCPeerConnection){window.RTCPeerConnection=function(pcConfig,pcConstraints){if(browserDetails.version<38){// .urls is not supported in FF < 38.
	// create RTCIceServers with a single url.
	if(pcConfig&&pcConfig.iceServers){var newIceServers=[];for(var i=0;i<pcConfig.iceServers.length;i++){var server=pcConfig.iceServers[i];if(server.hasOwnProperty('urls')){for(var j=0;j<server.urls.length;j++){var newServer={url:server.urls[j]};if(server.urls[j].indexOf('turn')===0){newServer.username=server.username;newServer.credential=server.credential;}newIceServers.push(newServer);}}else{newIceServers.push(pcConfig.iceServers[i]);}}pcConfig.iceServers=newIceServers;}}return new window.mozRTCPeerConnection(pcConfig,pcConstraints);};window.RTCPeerConnection.prototype=window.mozRTCPeerConnection.prototype;// wrap static methods. Currently just generateCertificate.
	if(window.mozRTCPeerConnection.generateCertificate){Object.defineProperty(window.RTCPeerConnection,'generateCertificate',{get:function get(){return window.mozRTCPeerConnection.generateCertificate;}});}window.RTCSessionDescription=window.mozRTCSessionDescription;window.RTCIceCandidate=window.mozRTCIceCandidate;}// shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
	['setLocalDescription','setRemoteDescription','addIceCandidate'].forEach(function(method){var nativeMethod=window.RTCPeerConnection.prototype[method];window.RTCPeerConnection.prototype[method]=function(){arguments[0]=new(method==='addIceCandidate'?window.RTCIceCandidate:window.RTCSessionDescription)(arguments[0]);return nativeMethod.apply(this,arguments);};});// support for addIceCandidate(null or undefined)
	var nativeAddIceCandidate=window.RTCPeerConnection.prototype.addIceCandidate;window.RTCPeerConnection.prototype.addIceCandidate=function(){if(!arguments[0]){if(arguments[1]){arguments[1].apply(null);}return Promise.resolve();}return nativeAddIceCandidate.apply(this,arguments);};// shim getStats with maplike support
	var makeMapStats=function makeMapStats(stats){var map=new Map();Object.keys(stats).forEach(function(key){map.set(key,stats[key]);map[key]=stats[key];});return map;};var modernStatsTypes={inboundrtp:'inbound-rtp',outboundrtp:'outbound-rtp',candidatepair:'candidate-pair',localcandidate:'local-candidate',remotecandidate:'remote-candidate'};var nativeGetStats=window.RTCPeerConnection.prototype.getStats;window.RTCPeerConnection.prototype.getStats=function(selector,onSucc,onErr){return nativeGetStats.apply(this,[selector||null]).then(function(stats){if(browserDetails.version<48){stats=makeMapStats(stats);}if(browserDetails.version<53&&!onSucc){// Shim only promise getStats with spec-hyphens in type names
	// Leave callback version alone; misc old uses of forEach before Map
	try{stats.forEach(function(stat){stat.type=modernStatsTypes[stat.type]||stat.type;});}catch(e){if(e.name!=='TypeError'){throw e;}// Avoid TypeError: "type" is read-only, in old versions. 34-43ish
	stats.forEach(function(stat,i){stats.set(i,Object.assign({},stat,{type:modernStatsTypes[stat.type]||stat.type}));});}}return stats;}).then(onSucc,onErr);};},shimRemoveStream:function shimRemoveStream(window){if(!window.RTCPeerConnection||'removeStream'in window.RTCPeerConnection.prototype){return;}window.RTCPeerConnection.prototype.removeStream=function(stream){var pc=this;utils.deprecated('removeStream','removeTrack');this.getSenders().forEach(function(sender){if(sender.track&&stream.getTracks().indexOf(sender.track)!==-1){pc.removeTrack(sender);}});};}};// Expose public methods.
	module.exports={shimOnTrack:firefoxShim.shimOnTrack,shimSourceObject:firefoxShim.shimSourceObject,shimPeerConnection:firefoxShim.shimPeerConnection,shimRemoveStream:firefoxShim.shimRemoveStream,shimGetUserMedia:requirecopy('./getusermedia')};},{"../utils":13,"./getusermedia":11}],11:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var utils=requirecopy('../utils');var logging=utils.log;// Expose public methods.
	module.exports=function(window){var browserDetails=utils.detectBrowser(window);var navigator=window&&window.navigator;var MediaStreamTrack=window&&window.MediaStreamTrack;var shimError_=function shimError_(e){return{name:{InternalError:'NotReadableError',NotSupportedError:'TypeError',PermissionDeniedError:'NotAllowedError',SecurityError:'NotAllowedError'}[e.name]||e.name,message:{'The operation is insecure.':'The request is not allowed by the '+'user agent or the platform in the current context.'}[e.message]||e.message,constraint:e.constraint,toString:function toString(){return this.name+(this.message&&': ')+this.message;}};};// getUserMedia constraints shim.
	var getUserMedia_=function getUserMedia_(constraints,onSuccess,onError){var constraintsToFF37_=function constraintsToFF37_(c){if((typeof c==='undefined'?'undefined':_typeof(c))!=='object'||c.require){return c;}var require=[];Object.keys(c).forEach(function(key){if(key==='require'||key==='advanced'||key==='mediaSource'){return;}var r=c[key]=_typeof(c[key])==='object'?c[key]:{ideal:c[key]};if(r.min!==undefined||r.max!==undefined||r.exact!==undefined){require.push(key);}if(r.exact!==undefined){if(typeof r.exact==='number'){r.min=r.max=r.exact;}else{c[key]=r.exact;}delete r.exact;}if(r.ideal!==undefined){c.advanced=c.advanced||[];var oc={};if(typeof r.ideal==='number'){oc[key]={min:r.ideal,max:r.ideal};}else{oc[key]=r.ideal;}c.advanced.push(oc);delete r.ideal;if(!Object.keys(r).length){delete c[key];}}});if(require.length){c.require=require;}return c;};constraints=JSON.parse(JSON.stringify(constraints));if(browserDetails.version<38){logging('spec: '+JSON.stringify(constraints));if(constraints.audio){constraints.audio=constraintsToFF37_(constraints.audio);}if(constraints.video){constraints.video=constraintsToFF37_(constraints.video);}logging('ff37: '+JSON.stringify(constraints));}return navigator.mozGetUserMedia(constraints,onSuccess,function(e){onError(shimError_(e));});};// Returns the result of getUserMedia as a Promise.
	var getUserMediaPromise_=function getUserMediaPromise_(constraints){return new Promise(function(resolve,reject){getUserMedia_(constraints,resolve,reject);});};// Shim for mediaDevices on older versions.
	if(!navigator.mediaDevices){navigator.mediaDevices={getUserMedia:getUserMediaPromise_,addEventListener:function addEventListener(){},removeEventListener:function removeEventListener(){}};}navigator.mediaDevices.enumerateDevices=navigator.mediaDevices.enumerateDevices||function(){return new Promise(function(resolve){var infos=[{kind:'audioinput',deviceId:'default',label:'',groupId:''},{kind:'videoinput',deviceId:'default',label:'',groupId:''}];resolve(infos);});};if(browserDetails.version<41){// Work around http://bugzil.la/1169665
	var orgEnumerateDevices=navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);navigator.mediaDevices.enumerateDevices=function(){return orgEnumerateDevices().then(undefined,function(e){if(e.name==='NotFoundError'){return[];}throw e;});};}if(browserDetails.version<49){var origGetUserMedia=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(c){return origGetUserMedia(c).then(function(stream){// Work around https://bugzil.la/802326
	if(c.audio&&!stream.getAudioTracks().length||c.video&&!stream.getVideoTracks().length){stream.getTracks().forEach(function(track){track.stop();});throw new DOMException('The object can not be found here.','NotFoundError');}return stream;},function(e){return Promise.reject(shimError_(e));});};}if(!(browserDetails.version>55&&'autoGainControl'in navigator.mediaDevices.getSupportedConstraints())){var remap=function remap(obj,a,b){if(a in obj&&!(b in obj)){obj[b]=obj[a];delete obj[a];}};var nativeGetUserMedia=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(c){if((typeof c==='undefined'?'undefined':_typeof(c))==='object'&&_typeof(c.audio)==='object'){c=JSON.parse(JSON.stringify(c));remap(c.audio,'autoGainControl','mozAutoGainControl');remap(c.audio,'noiseSuppression','mozNoiseSuppression');}return nativeGetUserMedia(c);};if(MediaStreamTrack&&MediaStreamTrack.prototype.getSettings){var nativeGetSettings=MediaStreamTrack.prototype.getSettings;MediaStreamTrack.prototype.getSettings=function(){var obj=nativeGetSettings.apply(this,arguments);remap(obj,'mozAutoGainControl','autoGainControl');remap(obj,'mozNoiseSuppression','noiseSuppression');return obj;};}if(MediaStreamTrack&&MediaStreamTrack.prototype.applyConstraints){var nativeApplyConstraints=MediaStreamTrack.prototype.applyConstraints;MediaStreamTrack.prototype.applyConstraints=function(c){if(this.kind==='audio'&&(typeof c==='undefined'?'undefined':_typeof(c))==='object'){c=JSON.parse(JSON.stringify(c));remap(c,'autoGainControl','mozAutoGainControl');remap(c,'noiseSuppression','mozNoiseSuppression');}return nativeApplyConstraints.apply(this,[c]);};}}navigator.getUserMedia=function(constraints,onSuccess,onError){if(browserDetails.version<44){return getUserMedia_(constraints,onSuccess,onError);}// Replace Firefox 44+'s deprecation warning with unprefixed version.
	utils.deprecated('navigator.getUserMedia','navigator.mediaDevices.getUserMedia');navigator.mediaDevices.getUserMedia(constraints).then(onSuccess,onError);};};},{"../utils":13}],12:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         */'use strict';var utils=requirecopy('../utils');var safariShim={// TODO: DrAlex, should be here, double check against LayoutTests
	// TODO: once the back-end for the mac port is done, add.
	// TODO: check for webkitGTK+
	// shimPeerConnection: function() { },
	shimLocalStreamsAPI:function shimLocalStreamsAPI(window){if((typeof window==='undefined'?'undefined':_typeof(window))!=='object'||!window.RTCPeerConnection){return;}if(!('getLocalStreams'in window.RTCPeerConnection.prototype)){window.RTCPeerConnection.prototype.getLocalStreams=function(){if(!this._localStreams){this._localStreams=[];}return this._localStreams;};}if(!('getStreamById'in window.RTCPeerConnection.prototype)){window.RTCPeerConnection.prototype.getStreamById=function(id){var result=null;if(this._localStreams){this._localStreams.forEach(function(stream){if(stream.id===id){result=stream;}});}if(this._remoteStreams){this._remoteStreams.forEach(function(stream){if(stream.id===id){result=stream;}});}return result;};}if(!('addStream'in window.RTCPeerConnection.prototype)){var _addTrack=window.RTCPeerConnection.prototype.addTrack;window.RTCPeerConnection.prototype.addStream=function(stream){if(!this._localStreams){this._localStreams=[];}if(this._localStreams.indexOf(stream)===-1){this._localStreams.push(stream);}var self=this;stream.getTracks().forEach(function(track){_addTrack.call(self,track,stream);});};window.RTCPeerConnection.prototype.addTrack=function(track,stream){if(stream){if(!this._localStreams){this._localStreams=[stream];}else if(this._localStreams.indexOf(stream)===-1){this._localStreams.push(stream);}}return _addTrack.call(this,track,stream);};}if(!('removeStream'in window.RTCPeerConnection.prototype)){window.RTCPeerConnection.prototype.removeStream=function(stream){if(!this._localStreams){this._localStreams=[];}var index=this._localStreams.indexOf(stream);if(index===-1){return;}this._localStreams.splice(index,1);var self=this;var tracks=stream.getTracks();this.getSenders().forEach(function(sender){if(tracks.indexOf(sender.track)!==-1){self.removeTrack(sender);}});};}},shimRemoteStreamsAPI:function shimRemoteStreamsAPI(window){if((typeof window==='undefined'?'undefined':_typeof(window))!=='object'||!window.RTCPeerConnection){return;}if(!('getRemoteStreams'in window.RTCPeerConnection.prototype)){window.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[];};}if(!('onaddstream'in window.RTCPeerConnection.prototype)){Object.defineProperty(window.RTCPeerConnection.prototype,'onaddstream',{get:function get(){return this._onaddstream;},set:function set(f){if(this._onaddstream){this.removeEventListener('addstream',this._onaddstream);this.removeEventListener('track',this._onaddstreampoly);}this.addEventListener('addstream',this._onaddstream=f);this.addEventListener('track',this._onaddstreampoly=function(e){var stream=e.streams[0];if(!this._remoteStreams){this._remoteStreams=[];}if(this._remoteStreams.indexOf(stream)>=0){return;}this._remoteStreams.push(stream);var event=new Event('addstream');event.stream=e.streams[0];this.dispatchEvent(event);}.bind(this));}});}},shimCallbacksAPI:function shimCallbacksAPI(window){if((typeof window==='undefined'?'undefined':_typeof(window))!=='object'||!window.RTCPeerConnection){return;}var prototype=window.RTCPeerConnection.prototype;var createOffer=prototype.createOffer;var createAnswer=prototype.createAnswer;var setLocalDescription=prototype.setLocalDescription;var setRemoteDescription=prototype.setRemoteDescription;var addIceCandidate=prototype.addIceCandidate;prototype.createOffer=function(successCallback,failureCallback){var options=arguments.length>=2?arguments[2]:arguments[0];var promise=createOffer.apply(this,[options]);if(!failureCallback){return promise;}promise.then(successCallback,failureCallback);return Promise.resolve();};prototype.createAnswer=function(successCallback,failureCallback){var options=arguments.length>=2?arguments[2]:arguments[0];var promise=createAnswer.apply(this,[options]);if(!failureCallback){return promise;}promise.then(successCallback,failureCallback);return Promise.resolve();};var withCallback=function withCallback(description,successCallback,failureCallback){var promise=setLocalDescription.apply(this,[description]);if(!failureCallback){return promise;}promise.then(successCallback,failureCallback);return Promise.resolve();};prototype.setLocalDescription=withCallback;withCallback=function withCallback(description,successCallback,failureCallback){var promise=setRemoteDescription.apply(this,[description]);if(!failureCallback){return promise;}promise.then(successCallback,failureCallback);return Promise.resolve();};prototype.setRemoteDescription=withCallback;withCallback=function withCallback(candidate,successCallback,failureCallback){var promise=addIceCandidate.apply(this,[candidate]);if(!failureCallback){return promise;}promise.then(successCallback,failureCallback);return Promise.resolve();};prototype.addIceCandidate=withCallback;},shimGetUserMedia:function shimGetUserMedia(window){var navigator=window&&window.navigator;if(!navigator.getUserMedia){if(navigator.webkitGetUserMedia){navigator.getUserMedia=navigator.webkitGetUserMedia.bind(navigator);}else if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.getUserMedia=function(constraints,cb,errcb){navigator.mediaDevices.getUserMedia(constraints).then(cb,errcb);}.bind(navigator);}}},shimRTCIceServerUrls:function shimRTCIceServerUrls(window){// migrate from non-spec RTCIceServer.url to RTCIceServer.urls
	var OrigPeerConnection=window.RTCPeerConnection;window.RTCPeerConnection=function(pcConfig,pcConstraints){if(pcConfig&&pcConfig.iceServers){var newIceServers=[];for(var i=0;i<pcConfig.iceServers.length;i++){var server=pcConfig.iceServers[i];if(!server.hasOwnProperty('urls')&&server.hasOwnProperty('url')){utils.deprecated('RTCIceServer.url','RTCIceServer.urls');server=JSON.parse(JSON.stringify(server));server.urls=server.url;delete server.url;newIceServers.push(server);}else{newIceServers.push(pcConfig.iceServers[i]);}}pcConfig.iceServers=newIceServers;}return new OrigPeerConnection(pcConfig,pcConstraints);};window.RTCPeerConnection.prototype=OrigPeerConnection.prototype;// wrap static methods. Currently just generateCertificate.
	if('generateCertificate'in window.RTCPeerConnection){Object.defineProperty(window.RTCPeerConnection,'generateCertificate',{get:function get(){return OrigPeerConnection.generateCertificate;}});}},shimTrackEventTransceiver:function shimTrackEventTransceiver(window){// Add event.transceiver member over deprecated event.receiver
	if((typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.RTCPeerConnection&&'receiver'in window.RTCTrackEvent.prototype&&// can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
	// defined for some reason even when window.RTCTransceiver is not.
	!window.RTCTransceiver){Object.defineProperty(window.RTCTrackEvent.prototype,'transceiver',{get:function get(){return{receiver:this.receiver};}});}},shimCreateOfferLegacy:function shimCreateOfferLegacy(window){var origCreateOffer=window.RTCPeerConnection.prototype.createOffer;window.RTCPeerConnection.prototype.createOffer=function(offerOptions){var pc=this;if(offerOptions){var audioTransceiver=pc.getTransceivers().find(function(transceiver){return transceiver.sender.track&&transceiver.sender.track.kind==='audio';});if(offerOptions.offerToReceiveAudio===false&&audioTransceiver){if(audioTransceiver.direction==='sendrecv'){audioTransceiver.setDirection('sendonly');}else if(audioTransceiver.direction==='recvonly'){audioTransceiver.setDirection('inactive');}}else if(offerOptions.offerToReceiveAudio===true&&!audioTransceiver){pc.addTransceiver('audio');}var videoTransceiver=pc.getTransceivers().find(function(transceiver){return transceiver.sender.track&&transceiver.sender.track.kind==='video';});if(offerOptions.offerToReceiveVideo===false&&videoTransceiver){if(videoTransceiver.direction==='sendrecv'){videoTransceiver.setDirection('sendonly');}else if(videoTransceiver.direction==='recvonly'){videoTransceiver.setDirection('inactive');}}else if(offerOptions.offerToReceiveVideo===true&&!videoTransceiver){pc.addTransceiver('video');}}return origCreateOffer.apply(pc,arguments);};}};// Expose public methods.
	module.exports={shimCallbacksAPI:safariShim.shimCallbacksAPI,shimLocalStreamsAPI:safariShim.shimLocalStreamsAPI,shimRemoteStreamsAPI:safariShim.shimRemoteStreamsAPI,shimGetUserMedia:safariShim.shimGetUserMedia,shimRTCIceServerUrls:safariShim.shimRTCIceServerUrls,shimTrackEventTransceiver:safariShim.shimTrackEventTransceiver,shimCreateOfferLegacy:safariShim.shimCreateOfferLegacy// TODO
	// shimPeerConnection: safariShim.shimPeerConnection
	};},{"../utils":13}],13:[function(requirecopy,module,exports){/*
	         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	         *
	         *  Use of this source code is governed by a BSD-style license
	         *  that can be found in the LICENSE file in the root of the source
	         *  tree.
	         *//* eslint-env node */'use strict';var logDisabled_=true;var deprecationWarnings_=true;// Utility methods.
	var utils={disableLog:function disableLog(bool){if(typeof bool!=='boolean'){return new Error('Argument type: '+(typeof bool==='undefined'?'undefined':_typeof(bool))+'. Please use a boolean.');}logDisabled_=bool;return bool?'adapter.js logging disabled':'adapter.js logging enabled';},/**
	             * Disable or enable deprecation warnings
	             * @param {!boolean} bool set to true to disable warnings.
	             */disableWarnings:function disableWarnings(bool){if(typeof bool!=='boolean'){return new Error('Argument type: '+(typeof bool==='undefined'?'undefined':_typeof(bool))+'. Please use a boolean.');}deprecationWarnings_=!bool;return'adapter.js deprecation warnings '+(bool?'disabled':'enabled');},log:function log(){if((typeof window==='undefined'?'undefined':_typeof(window))==='object'){if(logDisabled_){return;}if(typeof console!=='undefined'&&typeof console.log==='function'){console.log.apply(console,arguments);}}},/**
	             * Shows a deprecation warning suggesting the modern and spec-compatible API.
	             */deprecated:function deprecated(oldMethod,newMethod){if(!deprecationWarnings_){return;}console.warn(oldMethod+' is deprecated, please use '+newMethod+' instead.');},/**
	             * Extract browser version out of the provided user agent string.
	             *
	             * @param {!string} uastring userAgent string.
	             * @param {!string} expr Regular expression used as match criteria.
	             * @param {!number} pos position in the version string to be returned.
	             * @return {!number} browser version.
	             */extractVersion:function extractVersion(uastring,expr,pos){var match=uastring.match(expr);return match&&match.length>=pos&&parseInt(match[pos],10);},/**
	             * Browser detector.
	             *
	             * @return {object} result containing browser and version
	             *     properties.
	             */detectBrowser:function detectBrowser(window){var navigator=window&&window.navigator;// Returned result object.
	var result={};result.browser=null;result.version=null;// Fail early if it's not a browser
	if(typeof window==='undefined'||!window.navigator){result.browser='Not a browser.';return result;}// Firefox.
	if(navigator.mozGetUserMedia){result.browser='firefox';result.version=this.extractVersion(navigator.userAgent,/Firefox\/(\d+)\./,1);}else if(navigator.webkitGetUserMedia){// Chrome, Chromium, Webview, Opera, all use the chrome shim for now
	if(window.webkitRTCPeerConnection){result.browser='chrome';result.version=this.extractVersion(navigator.userAgent,/Chrom(e|ium)\/(\d+)\./,2);}else{// Safari (in an unpublished version) or unknown webkit-based.
	if(navigator.userAgent.match(/Version\/(\d+).(\d+)/)){result.browser='safari';result.version=this.extractVersion(navigator.userAgent,/AppleWebKit\/(\d+)\./,1);}else{// unknown webkit-based browser.
	result.browser='Unsupported webkit-based browser '+'with GUM support but no WebRTC support.';return result;}}}else if(navigator.mediaDevices&&navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)){// Edge.
	result.browser='edge';result.version=this.extractVersion(navigator.userAgent,/Edge\/(\d+).(\d+)$/,2);}else if(navigator.mediaDevices&&navigator.userAgent.match(/AppleWebKit\/(\d+)\./)){// Safari, with webkitGetUserMedia removed.
	result.browser='safari';result.version=this.extractVersion(navigator.userAgent,/AppleWebKit\/(\d+)\./,1);}else{// Default fallthrough: not supported.
	result.browser='Not a supported browser.';return result;}return result;}};// Export.
	module.exports={log:utils.log,deprecated:utils.deprecated,disableLog:utils.disableLog,disableWarnings:utils.disableWarnings,extractVersion:utils.extractVersion,shimCreateObjectURL:utils.shimCreateObjectURL,detectBrowser:utils.detectBrowser.bind(utils)};},{}]},{},[3])(3);});/* jshint ignore:end */// END OF INJECTION OF GOOGLE'S ADAPTER.JS CONTENT
	///////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////
	// EXTENSION FOR CHROME, FIREFOX AND EDGE
	// Includes legacy functions
	// -- createIceServer
	// -- createIceServers
	// -- MediaStreamTrack.getSources
	//
	// and additional shims
	// -- attachMediaStream
	// -- reattachMediaStream
	// -- requestUserMedia
	// -- a call to AdapterJS.maybeThroughWebRTCReady (notifies WebRTC is ready)
	// Add support for legacy functions createIceServer and createIceServers
	if(navigator.mozGetUserMedia){// Shim for MediaStreamTrack.getSources.
	MediaStreamTrack.getSources=function(successCb){setTimeout(function(){var infos=[{kind:'audio',id:'default',label:'',facing:''},{kind:'video',id:'default',label:'',facing:''}];successCb(infos);},0);};// Attach a media stream to an element.
	attachMediaStream=function attachMediaStream(element,stream){element.srcObject=stream;return element;};reattachMediaStream=function reattachMediaStream(to,from){to.srcObject=from.srcObject;return to;};createIceServer=function createIceServer(url,username,password){console.warn('createIceServer is deprecated. It should be replaced with an application level implementation.');// Note: Google's import of AJS will auto-reverse to 'url': '...' for FF < 38
	var iceServer=null;var urlParts=url.split(':');if(urlParts[0].indexOf('stun')===0){iceServer={urls:[url]};}else if(urlParts[0].indexOf('turn')===0){if(AdapterJS.webrtcDetectedVersion<27){var turnUrlParts=url.split('?');if(turnUrlParts.length===1||turnUrlParts[1].indexOf('transport=udp')===0){iceServer={urls:[turnUrlParts[0]],credential:password,username:username};}}else{iceServer={urls:[url],credential:password,username:username};}}return iceServer;};createIceServers=function createIceServers(urls,username,password){console.warn('createIceServers is deprecated. It should be replaced with an application level implementation.');var iceServers=[];for(i=0;i<urls.length;i++){var iceServer=createIceServer(urls[i],username,password);if(iceServer!==null){iceServers.push(iceServer);}}return iceServers;};}else if(navigator.webkitGetUserMedia){// Attach a media stream to an element.
	attachMediaStream=function attachMediaStream(element,stream){if(AdapterJS.webrtcDetectedVersion>=43){element.srcObject=stream;}else if(typeof element.src!=='undefined'){element.src=URL.createObjectURL(stream);}else{console.error('Error attaching stream to element.');// logging('Error attaching stream to element.');
	}return element;};reattachMediaStream=function reattachMediaStream(to,from){if(AdapterJS.webrtcDetectedVersion>=43){to.srcObject=from.srcObject;}else{to.src=from.src;}return to;};createIceServer=function createIceServer(url,username,password){console.warn('createIceServer is deprecated. It should be replaced with an application level implementation.');var iceServer=null;var urlParts=url.split(':');if(urlParts[0].indexOf('stun')===0){iceServer={'url':url};}else if(urlParts[0].indexOf('turn')===0){iceServer={'url':url,'credential':password,'username':username};}return iceServer;};createIceServers=function createIceServers(urls,username,password){console.warn('createIceServers is deprecated. It should be replaced with an application level implementation.');var iceServers=[];if(AdapterJS.webrtcDetectedVersion>=34){iceServers={'urls':urls,'credential':password,'username':username};}else{for(i=0;i<urls.length;i++){var iceServer=createIceServer(urls[i],username,password);if(iceServer!==null){iceServers.push(iceServer);}}}return iceServers;};}else if(AdapterJS.webrtcDetectedType==='AppleWebKit'){attachMediaStream=function attachMediaStream(element,stream){element.srcObject=stream;return element;};reattachMediaStream=function reattachMediaStream(to,from){to.srcObject=from.srcObject;return to;};// Polyfill getUserMedia()
	if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.getUserMedia=getUserMedia=function getUserMedia(constraints,successCb,errorCb){navigator.mediaDevices.getUserMedia(constraints).then(successCb).catch(errorCb);};}}else if(navigator.mediaDevices&&navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)){// Attach a media stream to an element.
	attachMediaStream=function attachMediaStream(element,stream){element.srcObject=stream;return element;};reattachMediaStream=function reattachMediaStream(to,from){to.srcObject=from.srcObject;return to;};}// Need to override attachMediaStream and reattachMediaStream
	// to support the plugin's logic
	attachMediaStream_base=attachMediaStream;if(AdapterJS.webrtcDetectedBrowser==='opera'){attachMediaStream_base=function attachMediaStream_base(element,stream){if(AdapterJS.webrtcDetectedVersion>38){element.srcObject=stream;}else if(typeof element.src!=='undefined'){element.src=URL.createObjectURL(stream);}// Else it doesn't work
	};}attachMediaStream=function attachMediaStream(element,stream){if((AdapterJS.webrtcDetectedBrowser==='chrome'||AdapterJS.webrtcDetectedBrowser==='opera')&&!stream){// Chrome does not support "src = null"
	element.src='';}else{attachMediaStream_base(element,stream);}return element;};reattachMediaStream_base=reattachMediaStream;reattachMediaStream=function reattachMediaStream(to,from){reattachMediaStream_base(to,from);return to;};// Propagate attachMediaStream and gUM in window and AdapterJS
	window.attachMediaStream=attachMediaStream;window.reattachMediaStream=reattachMediaStream;window.getUserMedia=function(constraints,onSuccess,onFailure){navigator.getUserMedia(constraints,onSuccess,onFailure);};AdapterJS.attachMediaStream=attachMediaStream;AdapterJS.reattachMediaStream=reattachMediaStream;AdapterJS.getUserMedia=getUserMedia;// Removed Google defined promises when promise is not defined
	if(typeof Promise==='undefined'){requestUserMedia=null;}AdapterJS.maybeThroughWebRTCReady();// END OF EXTENSION OF CHROME, FIREFOX AND EDGE
	///////////////////////////////////////////////////////////////////
	}else{// TRY TO USE PLUGIN
	///////////////////////////////////////////////////////////////////
	// WEBRTC PLUGIN SHIM
	// Will automatically check if the plugin is available and inject it
	// into the DOM if it is.
	// When the plugin is not available, will prompt a banner to suggest installing it
	// Use AdapterJS.options.hidePluginInstallPrompt to prevent this banner from popping
	//
	// Shims the follwing:
	// -- getUserMedia
	// -- MediaStream
	// -- MediaStreamTrack
	// -- MediaStreamTrack.getSources
	// -- RTCPeerConnection
	// -- RTCSessionDescription
	// -- RTCIceCandidate
	// -- createIceServer
	// -- createIceServers
	// -- attachMediaStream
	// -- reattachMediaStream
	// -- webrtcDetectedBrowser
	// -- webrtcDetectedVersion
	// IE 9 is not offering an implementation of console.log until you open a console
	if((typeof console==='undefined'?'undefined':_typeof(console))!=='object'||typeof console.log!=='function'){/* jshint -W020 */console={}||console;// Implemented based on console specs from MDN
	// You may override these functions
	console.log=function(arg){};console.info=function(arg){};console.error=function(arg){};console.dir=function(arg){};console.exception=function(arg){};console.trace=function(arg){};console.warn=function(arg){};console.count=function(arg){};console.debug=function(arg){};console.count=function(arg){};console.time=function(arg){};console.timeEnd=function(arg){};console.group=function(arg){};console.groupCollapsed=function(arg){};console.groupEnd=function(arg){};/* jshint +W020 */}/* jshint -W035 */AdapterJS.WebRTCPlugin.WaitForPluginReady=function(){while(AdapterJS.WebRTCPlugin.pluginState!==AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY){/* empty because it needs to prevent the function from running. */}};/* jshint +W035 */AdapterJS.WebRTCPlugin.callWhenPluginReady=function(callback){if(AdapterJS.WebRTCPlugin.pluginState===AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY){// Call immediately if possible
	// Once the plugin is set, the code will always take this path
	callback();}else{// otherwise start a 100ms interval
	var checkPluginReadyState=setInterval(function(){if(AdapterJS.WebRTCPlugin.pluginState===AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY){clearInterval(checkPluginReadyState);callback();}},100);}};AdapterJS.WebRTCPlugin.setLogLevel=function(logLevel){AdapterJS.WebRTCPlugin.callWhenPluginReady(function(){AdapterJS.WebRTCPlugin.plugin.setLogLevel(logLevel);});};AdapterJS.WebRTCPlugin.injectPlugin=function(){// only inject once the page is ready
	if(document.readyState!=='interactive'&&document.readyState!=='complete'){return;}// Prevent multiple injections
	if(AdapterJS.WebRTCPlugin.pluginState!==AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING){return;}AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTING;if(AdapterJS.webrtcDetectedBrowser==='IE'&&AdapterJS.webrtcDetectedVersion<=10){var frag=document.createDocumentFragment();AdapterJS.WebRTCPlugin.plugin=document.createElement('div');AdapterJS.WebRTCPlugin.plugin.innerHTML='<object id="'+AdapterJS.WebRTCPlugin.pluginInfo.pluginId+'" type="'+AdapterJS.WebRTCPlugin.pluginInfo.type+'" '+'width="1" height="1">'+'<param name="pluginId" value="'+AdapterJS.WebRTCPlugin.pluginInfo.pluginId+'" /> '+'<param name="windowless" value="false" /> '+'<param name="pageId" value="'+AdapterJS.WebRTCPlugin.pageId+'" /> '+'<param name="onload" value="'+AdapterJS.WebRTCPlugin.pluginInfo.onload+'" />'+'<param name="tag" value="'+AdapterJS.WebRTCPlugin.TAGS.NONE+'" />'+(// uncomment to be able to use virtual cams
	AdapterJS.options.getAllCams?'<param name="forceGetAllCams" value="True" />':'')+'</object>';while(AdapterJS.WebRTCPlugin.plugin.firstChild){frag.appendChild(AdapterJS.WebRTCPlugin.plugin.firstChild);}document.body.appendChild(frag);// Need to re-fetch the plugin
	AdapterJS.WebRTCPlugin.plugin=document.getElementById(AdapterJS.WebRTCPlugin.pluginInfo.pluginId);}else{// Load Plugin
	AdapterJS.WebRTCPlugin.plugin=document.createElement('object');AdapterJS.WebRTCPlugin.plugin.id=AdapterJS.WebRTCPlugin.pluginInfo.pluginId;// IE will only start the plugin if it's ACTUALLY visible
	if(AdapterJS.webrtcDetectedBrowser==='IE'){AdapterJS.WebRTCPlugin.plugin.width='1px';AdapterJS.WebRTCPlugin.plugin.height='1px';}else{// The size of the plugin on Safari should be 0x0px
	// so that the autorisation prompt is at the top
	AdapterJS.WebRTCPlugin.plugin.width='0px';AdapterJS.WebRTCPlugin.plugin.height='0px';}AdapterJS.WebRTCPlugin.plugin.type=AdapterJS.WebRTCPlugin.pluginInfo.type;AdapterJS.WebRTCPlugin.plugin.innerHTML='<param name="onload" value="'+AdapterJS.WebRTCPlugin.pluginInfo.onload+'">'+'<param name="pluginId" value="'+AdapterJS.WebRTCPlugin.pluginInfo.pluginId+'">'+'<param name="windowless" value="false" /> '+(AdapterJS.options.getAllCams?'<param name="forceGetAllCams" value="True" />':'')+'<param name="pageId" value="'+AdapterJS.WebRTCPlugin.pageId+'">'+'<param name="tag" value="'+AdapterJS.WebRTCPlugin.TAGS.NONE+'" />';document.body.appendChild(AdapterJS.WebRTCPlugin.plugin);}AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTED;};AdapterJS.WebRTCPlugin.isPluginInstalled=function(comName,plugName,plugType,installedCb,notInstalledCb){if(AdapterJS.webrtcDetectedBrowser!=='IE'){var pluginArray=navigator.mimeTypes;for(var i=0;i<pluginArray.length;i++){if(pluginArray[i].type.indexOf(plugType)>=0){installedCb();return;}}notInstalledCb();}else{try{var axo=new ActiveXObject(comName+'.'+plugName);}catch(e){notInstalledCb();return;}installedCb();}};AdapterJS.WebRTCPlugin.defineWebRTCInterface=function(){if(AdapterJS.WebRTCPlugin.pluginState===AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY){console.error('AdapterJS - WebRTC interface has already been defined');return;}AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING;AdapterJS.isDefined=function(variable){return variable!==null&&variable!==undefined;};////////////////////////////////////////////////////////////////////////////
	/// CreateIceServer
	////////////////////////////////////////////////////////////////////////////
	createIceServer=function createIceServer(url,username,password){var iceServer=null;var urlParts=url.split(':');if(urlParts[0].indexOf('stun')===0){iceServer={'url':url,'hasCredentials':false};}else if(urlParts[0].indexOf('turn')===0){iceServer={'url':url,'hasCredentials':true,'credential':password,'username':username};}return iceServer;};////////////////////////////////////////////////////////////////////////////
	/// CreateIceServers
	////////////////////////////////////////////////////////////////////////////
	createIceServers=function createIceServers(urls,username,password){var iceServers=[];for(var i=0;i<urls.length;++i){iceServers.push(createIceServer(urls[i],username,password));}return iceServers;};////////////////////////////////////////////////////////////////////////////
	/// RTCSessionDescription
	////////////////////////////////////////////////////////////////////////////
	RTCSessionDescription=function RTCSessionDescription(info){AdapterJS.WebRTCPlugin.WaitForPluginReady();return AdapterJS.WebRTCPlugin.plugin.ConstructSessionDescription(info.type,info.sdp);};////////////////////////////////////////////////////////////////////////////
	/// MediaStream
	////////////////////////////////////////////////////////////////////////////
	MediaStream=function MediaStream(mediaStreamOrTracks){AdapterJS.WebRTCPlugin.WaitForPluginReady();return AdapterJS.WebRTCPlugin.plugin.MediaStream(mediaStreamOrTracks);};////////////////////////////////////////////////////////////////////////////
	/// RTCPeerConnection
	////////////////////////////////////////////////////////////////////////////
	RTCPeerConnection=function RTCPeerConnection(servers,constraints){// Validate server argumenr
	if(!(servers===undefined||servers===null||Array.isArray(servers.iceServers))){throw new Error('Failed to construct \'RTCPeerConnection\': Malformed RTCConfiguration');}// Validate constraints argument
	if(typeof constraints!=='undefined'&&constraints!==null){var invalidConstraits=false;invalidConstraits|=(typeof constraints==='undefined'?'undefined':_typeof(constraints))!=='object';invalidConstraits|=constraints.hasOwnProperty('mandatory')&&constraints.mandatory!==undefined&&constraints.mandatory!==null&&constraints.mandatory.constructor!==Object;invalidConstraits|=constraints.hasOwnProperty('optional')&&constraints.optional!==undefined&&constraints.optional!==null&&!Array.isArray(constraints.optional);if(invalidConstraits){throw new Error('Failed to construct \'RTCPeerConnection\': Malformed constraints object');}}// Call relevant PeerConnection constructor according to plugin version
	AdapterJS.WebRTCPlugin.WaitForPluginReady();// RTCPeerConnection prototype from the old spec
	var iceServers=null;if(servers&&Array.isArray(servers.iceServers)){iceServers=servers.iceServers;for(var i=0;i<iceServers.length;i++){// Legacy plugin versions compatibility
	if(iceServers[i].urls&&!iceServers[i].url){iceServers[i].url=iceServers[i].urls;}iceServers[i].hasCredentials=AdapterJS.isDefined(iceServers[i].username)&&AdapterJS.isDefined(iceServers[i].credential);}}if(AdapterJS.WebRTCPlugin.plugin.PEER_CONNECTION_VERSION&&AdapterJS.WebRTCPlugin.plugin.PEER_CONNECTION_VERSION>1){// RTCPeerConnection prototype from the new spec
	if(iceServers){servers.iceServers=iceServers;}return AdapterJS.WebRTCPlugin.plugin.PeerConnection(servers);}else{var mandatory=constraints&&constraints.mandatory?constraints.mandatory:null;var optional=constraints&&constraints.optional?constraints.optional:null;return AdapterJS.WebRTCPlugin.plugin.PeerConnection(AdapterJS.WebRTCPlugin.pageId,iceServers,mandatory,optional);}};////////////////////////////////////////////////////////////////////////////
	/// MediaStreamTrack
	////////////////////////////////////////////////////////////////////////////
	MediaStreamTrack=function MediaStreamTrack(){};MediaStreamTrack.getSources=function(callback){AdapterJS.WebRTCPlugin.callWhenPluginReady(function(){AdapterJS.WebRTCPlugin.plugin.GetSources(callback);});};// getUserMedia constraints shim.
	// Copied from Chrome
	var constraintsToPlugin=function constraintsToPlugin(c){if((typeof c==='undefined'?'undefined':_typeof(c))!=='object'||c.mandatory||c.optional){return c;}var cc={};Object.keys(c).forEach(function(key){if(key==='require'||key==='advanced'){return;}if(typeof c[key]==='string'){cc[key]=c[key];return;}var r=_typeof(c[key])==='object'?c[key]:{ideal:c[key]};if(r.exact!==undefined&&typeof r.exact==='number'){r.min=r.max=r.exact;}var oldname=function oldname(prefix,name){if(prefix){return prefix+name.charAt(0).toUpperCase()+name.slice(1);}return name==='deviceId'?'sourceId':name;};// HACK : Specially handling: if deviceId is an object with exact property,
	//          change it such that deviceId value is not in exact property
	// Reason : AJS-286 (deviceId in WebRTC samples not in the format specified as specifications)
	if(oldname('',key)==='sourceId'&&r.exact!==undefined){r.ideal=r.exact;r.exact=undefined;}if(r.ideal!==undefined){cc.optional=cc.optional||[];var oc={};if(typeof r.ideal==='number'){oc[oldname('min',key)]=r.ideal;cc.optional.push(oc);oc={};oc[oldname('max',key)]=r.ideal;cc.optional.push(oc);}else{oc[oldname('',key)]=r.ideal;cc.optional.push(oc);}}if(r.exact!==undefined&&typeof r.exact!=='number'){cc.mandatory=cc.mandatory||{};cc.mandatory[oldname('',key)]=r.exact;}else{['min','max'].forEach(function(mix){if(r[mix]!==undefined){cc.mandatory=cc.mandatory||{};cc.mandatory[oldname(mix,key)]=r[mix];}});}});if(c.advanced){cc.optional=(cc.optional||[]).concat(c.advanced);}return cc;};////////////////////////////////////////////////////////////////////////////
	/// getUserMedia
	////////////////////////////////////////////////////////////////////////////
	getUserMedia=function getUserMedia(constraints,successCallback,failureCallback){var cc={};cc.audio=constraints.audio?constraintsToPlugin(constraints.audio):false;cc.video=constraints.video?constraintsToPlugin(constraints.video):false;AdapterJS.WebRTCPlugin.callWhenPluginReady(function(){AdapterJS.WebRTCPlugin.plugin.getUserMedia(cc,successCallback,failureCallback);});};window.navigator.getUserMedia=getUserMedia;////////////////////////////////////////////////////////////////////////////
	/// mediaDevices
	////////////////////////////////////////////////////////////////////////////
	if(typeof Promise!=='undefined'){requestUserMedia=function requestUserMedia(constraints){return new Promise(function(resolve,reject){try{getUserMedia(constraints,resolve,reject);}catch(error){reject(error);}});};navigator.mediaDevices={getUserMedia:requestUserMedia,enumerateDevices:function enumerateDevices(){return new Promise(function(resolve){var kinds={audio:'audioinput',video:'videoinput'};return MediaStreamTrack.getSources(function(devices){resolve(devices.map(function(device){return{label:device.label,kind:kinds[device.kind],id:device.id,deviceId:device.id,groupId:''};}));});});}};}////////////////////////////////////////////////////////////////////////////
	/// attachMediaStream
	////////////////////////////////////////////////////////////////////////////
	attachMediaStream=function attachMediaStream(element,stream){if(!element||!element.parentNode){return;}var streamId;if(stream===null){streamId='';}else{if(typeof stream.enableSoundTracks!=='undefined'){stream.enableSoundTracks(true);}streamId=stream.id;}var elementId=element.id.length===0?Math.random().toString(36).slice(2):element.id;var nodeName=element.nodeName.toLowerCase();if(nodeName!=='object'){// not a plugin <object> tag yet
	var tag;switch(nodeName){case'audio':tag=AdapterJS.WebRTCPlugin.TAGS.AUDIO;break;case'video':tag=AdapterJS.WebRTCPlugin.TAGS.VIDEO;break;default:tag=AdapterJS.WebRTCPlugin.TAGS.NONE;}var frag=document.createDocumentFragment();var temp=document.createElement('div');var classHTML='';if(element.className){classHTML='class="'+element.className+'" ';}else if(element.attributes&&element.attributes['class']){classHTML='class="'+element.attributes['class'].value+'" ';}temp.innerHTML='<object id="'+elementId+'" '+classHTML+'type="'+AdapterJS.WebRTCPlugin.pluginInfo.type+'">'+'<param name="pluginId" value="'+elementId+'" /> '+'<param name="pageId" value="'+AdapterJS.WebRTCPlugin.pageId+'" /> '+'<param name="windowless" value="true" /> '+'<param name="streamId" value="'+streamId+'" /> '+'<param name="tag" value="'+tag+'" /> '+'</object>';while(temp.firstChild){frag.appendChild(temp.firstChild);}var height='';var width='';if(element.clientWidth||element.clientHeight){width=element.clientWidth;height=element.clientHeight;}else if(element.width||element.height){width=element.width;height=element.height;}element.parentNode.insertBefore(frag,element);frag=document.getElementById(elementId);frag.width=width;frag.height=height;element.parentNode.removeChild(element);}else{// already an <object> tag, just change the stream id
	var children=element.children;for(var i=0;i!==children.length;++i){if(children[i].name==='streamId'){children[i].value=streamId;break;}}element.setStreamId(streamId);}var newElement=document.getElementById(elementId);AdapterJS.forwardEventHandlers(newElement,element,Object.getPrototypeOf(element));return newElement;};////////////////////////////////////////////////////////////////////////////
	/// reattachMediaStream
	////////////////////////////////////////////////////////////////////////////
	reattachMediaStream=function reattachMediaStream(to,from){var stream=null;var children=from.children;for(var i=0;i!==children.length;++i){if(children[i].name==='streamId'){AdapterJS.WebRTCPlugin.WaitForPluginReady();stream=AdapterJS.WebRTCPlugin.plugin.getStreamWithId(AdapterJS.WebRTCPlugin.pageId,children[i].value);break;}}if(stream!==null){return attachMediaStream(to,stream);}else{console.log('Could not find the stream associated with this element');}};// Propagate attachMediaStream and gUM in window and AdapterJS
	window.attachMediaStream=attachMediaStream;window.reattachMediaStream=reattachMediaStream;window.getUserMedia=getUserMedia;AdapterJS.attachMediaStream=attachMediaStream;AdapterJS.reattachMediaStream=reattachMediaStream;AdapterJS.getUserMedia=getUserMedia;AdapterJS.forwardEventHandlers=function(destElem,srcElem,prototype){var properties=Object.getOwnPropertyNames(prototype);for(var prop in properties){if(prop){var propName=properties[prop];if(typeof propName.slice==='function'&&propName.slice(0,2)==='on'&&typeof srcElem[propName]==='function'){AdapterJS.addEvent(destElem,propName.slice(2),srcElem[propName]);}}}var subPrototype=Object.getPrototypeOf(prototype);if(!!subPrototype){AdapterJS.forwardEventHandlers(destElem,srcElem,subPrototype);}};////////////////////////////////////////////////////////////////////////////
	/// RTCIceCandidate
	////////////////////////////////////////////////////////////////////////////
	RTCIceCandidate=function RTCIceCandidate(candidate){if(!candidate.sdpMid){candidate.sdpMid='';}AdapterJS.WebRTCPlugin.WaitForPluginReady();return AdapterJS.WebRTCPlugin.plugin.ConstructIceCandidate(candidate.sdpMid,candidate.sdpMLineIndex,candidate.candidate);};// inject plugin
	AdapterJS.addEvent(document,'readystatechange',AdapterJS.WebRTCPlugin.injectPlugin);AdapterJS.WebRTCPlugin.injectPlugin();};// This function will be called if the plugin is needed (browser different
	// from Chrome or Firefox), but the plugin is not installed.
	AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb=AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb||function(){AdapterJS.addEvent(document,'readystatechange',AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv);AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv();};AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv=function(){if(AdapterJS.options.hidePluginInstallPrompt){return;}var downloadLink=AdapterJS.WebRTCPlugin.pluginInfo.downloadLink;if(downloadLink){// if download link
	var popupString;if(AdapterJS.WebRTCPlugin.pluginInfo.portalLink){// is portal link
	popupString='This website requires you to install the '+' <a href="'+AdapterJS.WebRTCPlugin.pluginInfo.portalLink+'" target="_blank">'+AdapterJS.WebRTCPlugin.pluginInfo.companyName+' WebRTC Plugin</a>'+' to work on this browser.';}else{// no portal link, just print a generic explanation
	popupString=AdapterJS.TEXT.PLUGIN.REQUIRE_INSTALLATION;}AdapterJS.renderNotificationBar(popupString,AdapterJS.TEXT.PLUGIN.BUTTON,function(){window.open(downloadLink,'_top');var pluginInstallInterval=setInterval(function(){if(AdapterJS.webrtcDetectedBrowser!=='IE'){navigator.plugins.refresh(false);}AdapterJS.WebRTCPlugin.isPluginInstalled(AdapterJS.WebRTCPlugin.pluginInfo.prefix,AdapterJS.WebRTCPlugin.pluginInfo.plugName,AdapterJS.WebRTCPlugin.pluginInfo.type,function(){// plugin now installed
	clearInterval(pluginInstallInterval);AdapterJS.WebRTCPlugin.defineWebRTCInterface();},function(){// still no plugin detected, nothing to do
	});},500);});}else{// no download link, just print a generic explanation
	AdapterJS.renderNotificationBar(AdapterJS.TEXT.PLUGIN.NOT_SUPPORTED);}};// Try to detect the plugin and act accordingly
	AdapterJS.WebRTCPlugin.isPluginInstalled(AdapterJS.WebRTCPlugin.pluginInfo.prefix,AdapterJS.WebRTCPlugin.pluginInfo.plugName,AdapterJS.WebRTCPlugin.pluginInfo.type,AdapterJS.WebRTCPlugin.defineWebRTCInterface,AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb);// END OF WEBRTC PLUGIN SHIM
	///////////////////////////////////////////////////////////////////
	}// Placed it here so that the module.exports from the browserified
	//   adapterjs will not override our AdapterJS exports
	// Browserify compatibility
	if(typeof exports!=='undefined'){module.exports=AdapterJS;}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	//Service 类，会创建session(me), 并且将current属性设置为 me; 以后方法需要此值


	var _util = __webpack_require__(5);
	var _logger = _util.tagLogger("Service");

	var Session = __webpack_require__(49);
	var Attendee = __webpack_require__(51);

	var __event = __webpack_require__(50);
	var EventHandler = __webpack_require__(55);

	var __Desktop = __webpack_require__(56);

	var __desktop = new __Desktop({
	    onExtLoaded: function onExtLoaded() {
	        _logger.info("Share desktop ext. had loaded.");
	    }
	});

	var __Stream = __webpack_require__(54);

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
	    __init__: function __init__() {
	        var self = this;

	        var urlLogLevel = _util.parseURL("__log_level___");
	        if (urlLogLevel) {
	            emedia.LOG_LEVEL = parseInt(urlLogLevel);
	        }

	        // if(self.ticket && _util.isPlainObject(self.ticket)){
	        //     self.setup(self.ticket);
	        // }

	        self.namespace = Math.uuidFast();
	        emedia.__easemob_current_mservice = this;
	    },

	    AVPubstream: __Stream.extend({
	        __init__: function __init__() {
	            var self = this;

	            self.type = 0;
	            self._located = true;

	            if (self.constaints) {
	                self.constaints.video || (self.voff = 1);
	                self.constaints.audio || (self.aoff = 1);
	            }
	            //self.constaints || (self.constaints = {audio: !self.aoff, video: !self.voff});
	            self.constaints || (self.constaints = { audio: true, video: true });
	        }
	    }),

	    //screenOptions ['screen', 'window', 'tab']
	    ShareDesktopPubstream: __Stream.extend({
	        __init__: function __init__() {
	            var self = this;

	            self.type = 1;
	            self._located = true;
	        }
	    }),

	    __assertCurrent: function __assertCurrent() {
	        var self = this;
	        if (!self.current) {
	            throw "Please call emedia.service.setup(ticket)";
	        }
	        if (self.current.closed) {
	            throw "current closed";
	        }
	    },

	    openUserMedia: function openUserMedia(pubS) {
	        var self = this;

	        //self.__assertCurrent();

	        if (!pubS) {
	            throw "require pubS";
	        }

	        return {
	            then: function then(success, errCallback) {
	                if (pubS instanceof self.AVPubstream) {
	                    self._openCamera(pubS, success, errCallback);
	                } else if (pubS instanceof self.ShareDesktopPubstream) {
	                    self._openSharedDesktop(pubS, success, errCallback);
	                } else {
	                    throw "Unspported pubS";
	                }
	            }
	        };
	    },

	    _openSharedDesktop: function _openSharedDesktop(pubS, success, errCallback) {
	        var self = this;

	        //self.__assertCurrent();

	        //screenOptions ['screen', 'window', 'tab']
	        __desktop.openDesktopMedia(pubS.screenOptions || ['screen', 'window', 'tab'], function (_event) {
	            if (_event instanceof __event.OpenDesktopMedia) {
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
	                    success && success(self.current, stream);
	                }, errCallback);
	            } else {
	                self.current && self.current.onEvent(new __event.ShareDesktopExtensionNotFound({ member: self.current }));
	                errCallback && errCallback(_event);
	            }
	        });
	    },

	    _openCamera: function _openCamera(pubS, success, errCallback) {
	        var self = this;

	        //self.__assertCurrent();

	        //var constaints = pubS.constaints || {audio: !pubS.aoff, video: !pubS.voff};
	        var constaints = pubS.constaints || { audio: true, video: true };

	        self.__getUserMedia(constaints, function (_me, stream) {
	            self.__controlStream(pubS, stream);

	            pubS.localStream = stream;
	            success && success(self.current, stream);
	        }, errCallback);
	    },

	    __controlStream: function __controlStream(pubS, stream) {
	        stream && stream.getVideoTracks().forEach(function (track) {
	            track.enabled = !pubS.voff;
	        });
	        stream && stream.getAudioTracks().forEach(function (track) {
	            track.enabled = !pubS.aoff;
	        });
	    },

	    __getUserMedia: function __getUserMedia(constaints, success, errCallback) {
	        var self = this;

	        var _openstream;

	        function onSuccess(stream) {
	            _openstream = stream;

	            var videoTracks = stream.getVideoTracks();
	            var audioTracks = stream.getAudioTracks();

	            if (videoTracks.length > 0) {
	                _logger.debug('Using video device: ' + videoTracks[0].label);
	            }
	            if (audioTracks.length > 0) {
	                _logger.debug('Using audio device: ' + audioTracks[0].label);
	            }

	            success && success(self.current, stream);
	        }

	        function onFail(e) {
	            _logger.debug('[WebRTC-API] getUserMedia() error: ', e);

	            _openstream && _openstream.getTracks().forEach(function (track) {
	                track.stop();
	            });

	            self.current && self.current.onEvent(new __event.OpenMediaError({ member: self.current, event: e }));
	            errCallback && errCallback(new __event.OpenMediaError({ member: self.current, event: e }));
	        }

	        navigator.mediaDevices.getUserMedia(constaints).then(onSuccess).catch(onFail);
	        // navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(constaints).then(onSuccess).catch(onFail)
	        //     : navigator.getUserMedia(constaints, onSuccess, onFail);
	    },

	    setup: function setup(ticket, ext) {
	        var self = this;

	        _logger.debug("recv ticket", ticket, ext);

	        ext = ext || {};

	        var extObj = ext;
	        if (_util.isPlainObject(ext)) {
	            //ext 是对象， extObj 也是对象
	            ext = JSON.stringify(ext);
	        } else {
	            //ext 是字符串， extObj 尽量转换为 对象
	            try {
	                extObj = JSON.parse(ext);
	            } catch (e) {}
	        }

	        if (typeof ticket === "string") {
	            ticket = JSON.parse(ticket);
	        }

	        var sysUserId = ticket.memName;

	        if (self.current && !self.current.closed) {
	            var __eventCalling = new __event.CurrentCalling();
	            self.current.onEvent(__eventCalling);
	            throw __eventCalling;
	            //return;

	            //self.current.exit(0);
	        }

	        var _Attendee = Attendee.extend(EventHandler);

	        var attendee = self.current = new _Attendee({
	            autoSub: emedia.config.autoSub,
	            getCopyIntervalMillis: emedia.config.getCopyIntervalMillis,
	            sysUserId: sysUserId,
	            resource: self.resource,
	            nickName: self.nickName,
	            ticket: ticket,
	            ext: ext,
	            extObj: extObj,

	            sessionFactory: function sessionFactory() {
	                return self.newSession(this, ticket);
	            }
	        }, self.listeners || {});

	        return attendee;
	    },

	    exit: function exit(closeMyConfrIfICrtConfr) {
	        this.current && this.current.exit(closeMyConfrIfICrtConfr);
	    },

	    join: function join(joined, joinError) {
	        _logger.debug("begin join ...");

	        var self = this;

	        self.__assertCurrent();
	        self.current._session._sessionId = undefined;

	        self.current.join(joined, joinError);
	    },

	    withpublish: function withpublish(pubS) {
	        var self = this;

	        if (!pubS || !pubS.localStream) {
	            throw "pubS null or stream not open";
	        }

	        self.__assertCurrent();
	        self.current._session._sessionId = undefined;

	        return self.current.withpublish(pubS);
	    },

	    push: function push(pubS, pushed, onPushError) {
	        _logger.debug("begin push ...");

	        var self = this;

	        if (arguments.length === 2) {
	            onPushError = pushed;
	            pushed = undefined;
	        }

	        if (!pubS || !pubS.localStream) {
	            throw "pubS or stream open";
	        }

	        self.__assertCurrent();
	        self.current.push(pubS, pushed, onPushError, false);
	    },

	    subscribe: function subscribe(streamId, onSub, subfail, subArgs) {
	        var self = this;

	        self.__assertCurrent();

	        if (arguments.length == 2) {
	            subfail = onSub;
	            onSub = undefined;
	        }

	        if (onSub && _util.isPlainObject(onSub)) {
	            subArgs = onSub;
	            onSub = undefined;
	        }
	        if (subfail && _util.isPlainObject(subfail)) {
	            subArgs = subfail;
	            subfail = undefined;
	        }

	        subArgs || (subArgs = { subSVideo: true, subSAudio: true });

	        var webrtc = self.current._getWebrtc(streamId);

	        if (webrtc && webrtc.isConnected() && !emedia.isSafari) {
	            self.current.subscribeStream(webrtc._rtcId, streamId, subfail, subArgs);
	            return;
	        }

	        webrtc && self.current.closeWebrtc(webrtc.getRtcId(), true, false);

	        self.current.createWebrtcAndSubscribeStream(streamId, {
	            onGotRemote: function onGotRemote(stream) {
	                onSub && onSub(stream);
	            },
	            onEvent: function onEvent(_evt) {
	                subfail && subfail(_evt);
	            }
	        }, undefined, subArgs);
	    },

	    closePubstream: function closePubstream(stream) {
	        if (stream.located()) {
	            stream._localMediaStream && stream._localMediaStream.getTracks().forEach(function (track) {
	                track.stop();
	            });
	            stream.localStream && stream.localStream.getTracks().forEach(function (track) {
	                track.stop();
	            });
	        }
	    },

	    hungup: function hungup(streamId) {
	        var self = this;

	        self.__assertCurrent();

	        var attendee = self.current;

	        var stream = attendee._cacheStreams[streamId];
	        var rtcId = stream.rtcId;
	        if (rtcId) {
	            attendee.closeWebrtc(rtcId);

	            if (stream.located()) {
	                stream.type !== 1 && stream._localMediaStream && stream._localMediaStream.getTracks().forEach(function (track) {
	                    track.stop();
	                });

	                attendee._cacheStreams[streamId] && attendee.onRemoveStream(stream);

	                delete attendee._cacheStreams[streamId];
	            }
	        }

	        if (stream && !stream.located()) {
	            attendee._linkedStreams[stream.id] && delete attendee._linkedStreams[stream.id];

	            var _stream = new __Stream(stream);
	            _stream.rtcId = undefined;
	            _stream._webrtc = undefined;
	            _stream.mediaStream = null;

	            attendee.onUpdateStream(_stream, new _stream.Update(_stream));
	        }
	    },

	    postMessage: function postMessage(memberIdOrStreamId, message, fail) {
	        var self = this;

	        var theMessage = message;
	        if (typeof message !== 'string') {
	            message = JSON.stringify(message);
	        }

	        self.__assertCurrent();
	        var attendee = self.current;

	        var memberId;

	        var linkedStream = attendee._linkedStreams[memberIdOrStreamId];
	        if (linkedStream && linkedStream.owner) {
	            memberId = linkedStream.owner.id;
	        } else {
	            memberId = memberIdOrStreamId;
	        }

	        var message = attendee.newMessage({
	            op: 1003,
	            memId: memberId,
	            arg: message
	        });

	        attendee.postMessage(message, function (rsp) {
	            if (rsp.result != 0) {
	                var _evt = new __event.RemoteControlFail({ memId: memberId, failed: rsp.result, cause: rsp.msg, type: "postMessage", postMessage: message });
	                attendee.onEvent(_evt);

	                fail && fail(_evt, theMessage);

	                return;
	            }
	        });
	    },

	    torchRemote: function torchRemote(streamId, torch, success, fail) {
	        var self = this;

	        if (typeof torch === 'function') {
	            fail = success;
	            success = torch;
	            torch = undefined;
	        }

	        self.__assertCurrent();
	        var attendee = self.current;

	        var linkedStream = attendee._linkedStreams[streamId];
	        if (!linkedStream || linkedStream.located()) {
	            throw streamId + " not exsits or locate, not connect";
	        }

	        var lastTorch = linkedStream.torch;
	        var torch = torch === undefined ? !linkedStream.torch ? 1 : 0 : torch;

	        var arg = {
	            op2: 20,
	            streamId: streamId,
	            tor: torch
	        };

	        var message = attendee.newMessage({
	            op: 1002,
	            memId: linkedStream.owner.id,
	            arg: JSON.stringify(arg),
	            _reqOps: [100206]
	        });

	        linkedStream.torch = torch;

	        attendee.postMessage(message, function (rsp) {
	            if (rsp.result != 0) {
	                var _evt = new __event.RemoteControlFail({ stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "torch_control" });
	                attendee.onEvent(_evt);

	                linkedStream.torch = lastTorch;

	                fail && fail(_evt, linkedStream.torch);

	                return;
	            } else {
	                success && success(linkedStream.torch);
	            }
	        });
	    },

	    freezeFrameRemote: function freezeFrameRemote(streamId, success, fail) {
	        var self = this;

	        self.__assertCurrent();
	        var attendee = self.current;

	        var linkedStream = attendee._linkedStreams[streamId];
	        if (!linkedStream || linkedStream.located()) {
	            throw streamId + " not exsits or locate, not connect";
	        }

	        var freezeFrame = !linkedStream.freezeFrame;

	        var arg = {
	            op2: 20,
	            streamId: streamId,
	            frz: freezeFrame ? 1 : 0
	        };

	        var message = attendee.newMessage({
	            op: 1002,
	            memId: linkedStream.owner.id,
	            arg: JSON.stringify(arg),
	            _reqOps: [100204]
	        });

	        linkedStream.freezeFrame = freezeFrame;

	        attendee.postMessage(message, function (rsp) {
	            if (rsp.result != 0) {
	                var _evt = new __event.RemoteControlFail({ stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "freeze_control" });
	                attendee.onEvent(_evt);

	                linkedStream.freezeFrame = !linkedStream.freezeFrame;

	                fail && fail(_evt, linkedStream.freezeFrame);

	                return;
	            } else {
	                success && success(linkedStream.freezeFrame);
	            }
	        });
	    },

	    capturePictureRemote: function capturePictureRemote(streamId, rspBase64Pic, success, fail) {
	        var self = this;

	        self.__assertCurrent();
	        var attendee = self.current;

	        var linkedStream = attendee._linkedStreams[streamId];
	        if (!linkedStream || linkedStream.located()) {
	            throw streamId + " not exsits or locate, not connect";
	        }

	        var arg = {
	            op2: 20,
	            streamId: streamId,
	            pic: 1,
	            rspBase64Pic: true
	        };

	        rspBase64Pic && (arg.rspBase64Pic = true);

	        var message = attendee.newMessage({
	            op: 1002,
	            memId: linkedStream.owner.id,
	            arg: JSON.stringify(arg),
	            _reqOps: [100205]
	        });

	        attendee.postMessage(message, function (rsp) {
	            if (rsp.result != 0) {
	                var _evt = new __event.RemoteControlFail({ stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "capture_control" });
	                attendee.onEvent(_evt);
	                fail && fail(_evt);

	                return;
	            } else {
	                if (!rspBase64Pic) {
	                    success && success();
	                    return;
	                }

	                if (!rsp.arg) {
	                    fail && fail(new __event.RemoteControlFail({ stream: linkedStream, failed: rsp.result, cause: "Not found base64 pic" }));
	                    return;
	                }

	                var arg = JSON.parse(rsp.arg);
	                success && success(arg.pic);
	            }
	        });
	    },

	    zoomRemote: function zoomRemote(streamId, multiples, fail) {
	        var self = this;

	        self.__assertCurrent();
	        var attendee = self.current;

	        var linkedStream = attendee._linkedStreams[streamId];
	        if (!linkedStream || linkedStream.located()) {
	            throw streamId + " not exsits or locate, not connect";
	        }

	        linkedStream._zoom || (linkedStream._zoom = 1);

	        var _zoom = linkedStream._zoom * multiples;
	        if (_zoom < 1) {
	            return;
	        }

	        linkedStream._zoom = _zoom;

	        var arg = {
	            op2: 20,
	            streamId: streamId,
	            zoom: Math.round(_zoom * 10000)
	        };

	        var message = attendee.newMessage({
	            op: 1002,
	            memId: linkedStream.owner.id,
	            arg: JSON.stringify(arg),
	            _reqOps: [100201]
	        });

	        attendee.postMessage(message, function (rsp) {
	            if (rsp.result != 0) {
	                var _evt = new __event.RemoteControlFail({ stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "zoom_control" });
	                attendee.onEvent(_evt);
	                fail && fail(_evt);

	                return;
	            }
	        });
	    },

	    _getPosition: function getPosition(obj) {
	        var topValue = 0,
	            leftValue = 0;
	        while (obj) {
	            leftValue += obj.offsetLeft;
	            topValue += obj.offsetTop;
	            obj = obj.offsetParent;
	        }

	        return { clientX: leftValue, clientY: topValue };
	    },

	    getClickXY: function getClickXY(videoTag, clickEvent) {
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

	        if (mediaHeight > mediaWidth) {
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
	            x: x - xy.clientX,
	            y: y - xy.clientY
	        };
	    },

	    focusExpoRemote: function focusExpoRemote(streamId, videoTag, clickEvent, fail) {
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

	        if (mediaHeight > mediaWidth) {
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

	        self._focusExpo(streamId, mediaWidth, mediaHeight, x - xy.clientX, y - xy.clientY, fail);
	    },

	    _focusExpo: function _focusExpo(streamId, width, height, x, y, fail) {
	        var self = this;

	        if (x <= 0 || x > width) {
	            return;
	        }
	        if (y <= 0 || y > height) {
	            return;
	        }

	        self.__assertCurrent();
	        var attendee = self.current;

	        var linkedStream = attendee._linkedStreams[streamId];
	        if (!linkedStream || linkedStream.located()) {
	            throw streamId + " not exsits or locate, not connect";
	        }

	        var arg = {
	            op2: 20,
	            streamId: streamId,
	            focus: 1,
	            expo: 1,
	            x: width === 0 ? 0 : Math.round(x * 10000 / width),
	            y: height === 0 ? 0 : Math.round(y * 10000 / height)
	        };

	        var message = attendee.newMessage({
	            op: 1002,
	            memId: linkedStream.owner.id,
	            arg: JSON.stringify(arg),
	            _reqOps: [100202, 100203]
	        });

	        attendee.postMessage(message, function (rsp) {
	            if (rsp.result != 0) {
	                var _evt = new __event.RemoteControlFail({ stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "focus_expo_control" });
	                attendee.onEvent(_evt);
	                fail && fail(_evt);

	                return;
	            }
	        });
	    },

	    _republish: function _republish(pubS, success, error) {
	        var self = this;

	        var webrtc;
	        if (pubS.id) {
	            var rtcId = self.current.__getWebrtcFor(pubS.id);
	            rtcId && self.current.closeWebrtc(rtcId, true);

	            webrtc = self.current._getWebrtc(pubS.id);
	        }

	        pubS._localMediaStream && pubS._localMediaStream.getTracks().forEach(function (track) {
	            track.stop();
	        });

	        setTimeout(function () {
	            var _pubS = new self.AVPubstream(pubS);

	            self.openUserMedia(_pubS).then(function () {
	                pubS.localStream = _pubS.localStream;

	                // var pubS1 = _util.extend({}, _pubS);
	                pubS.isRepublished = true;

	                pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || webrtc && webrtc.optimalVideoCodecs;
	                self.push(pubS, success, error);
	            }, error);
	        }, 500);
	    },

	    voff: function voff(pubS, _voff, error) {
	        var self = this;

	        _voff = _voff ? 1 : 0;
	        pubS.voff = _voff;

	        function updateAndDisabled() {
	            pubS.getMediaStream() && pubS.getMediaStream().getVideoTracks().forEach(function (track) {
	                track.enabled = !_voff;
	            });

	            self.current && self.current.voff(pubS, _voff);
	        }

	        if (pubS.constaints && !pubS.constaints.video) {
	            //error && error("When pub. only audio, voff invalidate");
	            //throw "When pub. only audio, voff invalidate";

	            pubS.constaints.video = true;
	            self._republish(pubS, function () {
	                updateAndDisabled();
	            }, function (_evt) {
	                if (_evt instanceof emedia.event.OpenMediaError) {
	                    //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
	                    pubS.constaints.video = false;
	                }

	                error && error(_evt);
	            });

	            return;
	        }

	        updateAndDisabled();
	    },

	    aoff: function aoff(pubS, _aoff, error) {
	        var self = this;

	        _aoff = _aoff ? 1 : 0;
	        pubS.aoff = _aoff;

	        function updateAndDisabled() {
	            pubS.getMediaStream() && pubS.getMediaStream().getAudioTracks().forEach(function (track) {
	                track.enabled = !_aoff;
	            });

	            self.current && self.current.aoff(pubS, _aoff);
	        }

	        if (pubS.constaints && !pubS.constaints.audio) {
	            // error && error("When pub. only video, aoff invalidate");
	            // throw "When pub. only video, aoff invalidate";

	            pubS.constaints.audio = true;
	            self._republish(pubS, function () {
	                updateAndDisabled();
	            }, function (_evt) {
	                if (_evt instanceof emedia.event.OpenMediaError) {
	                    //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
	                    pubS.constaints.audio = false;
	                }

	                error && error(_evt);
	            });

	            return;
	        }

	        updateAndDisabled();
	    },

	    iceing: function iceing(streamId) {
	        var self = this;

	        return _util.isPlainObject(self.current._linkedStreams[streamId]);
	    },

	    recording: function recording(streamId) {
	        var self = this;

	        return _util.isPlainObject(self.current._records[streamId]);
	    },

	    startRecord: function startRecord(streamId, callback) {
	        var self = this;

	        var _stream = self.current._linkedStreams[streamId];
	        if (!_stream) {
	            throw streamId + " not at linked streams";
	        }
	        if (!_stream._webrtc) {
	            callback && callback(false);
	        }

	        self.current.startRecord(_stream, callback);
	    },

	    stopRecord: function stopRecord(streamId, callback) {
	        var self = this;

	        var _stream = self.current._records[streamId];
	        if (!_stream) {
	            throw streamId + " not at recording streams";
	        }

	        self.current.stopRecord(_stream, callback);
	    },

	    getCurrentMembers: function getCurrentMembers() {
	        var self = this;
	        return self.current.getCurrentMembers();
	    },

	    newSession: function newSession(attendee, ticket) {
	        var self = this;

	        var session = new Session({
	            ticket: ticket,
	            owner: attendee,

	            onTcklC: function onTcklC(evt) {
	                attendee.onTcklC(evt.rtcId, evt.cands);
	            },
	            onAcptC: function onAcptC(evt) {
	                attendee.onAcptC(evt.rtcId, evt.sdp, evt.cands);
	            },
	            onAnsC: function onAnsC(evt) {
	                attendee.onAnsC(evt.rtcId, evt.sdp, evt.cands);
	            },
	            onTermC: function onTermC(evt) {
	                //self.onTermC(me, evt);
	                _logger.info("Server termc rtc: ", evt.rtcId, evt.message || evt.msg);

	                if (evt.endReason === 21 || evt.endReason === 22) {
	                    _util.forEach(attendee._cacheStreams, function (sid, _stream) {
	                        if (_stream.rtcId === evt.rtcId) {
	                            var _event;
	                            if (evt.endReason === 21) {
	                                _event = new emedia.event.SwitchVCodes({ stream: _stream, useVCodes: evt.useVCodes });
	                            } else {
	                                _event = new emedia.event.SubFailNotSupportVCodes({ stream: _stream });
	                            }

	                            attendee.onEvent(_event);
	                        }
	                    });
	                } else {
	                    attendee.closeWebrtc(evt.rtcId, false, true);
	                }
	            },
	            onEnter: function onEnter(evt) {
	                attendee.onEnter(evt.cver, evt.mem);
	            },
	            onExit: function onExit(evt) {
	                attendee.onExit(evt.cver, evt.memId, evt.reason);
	            },
	            onPub: function onPub(evt) {
	                attendee.onPub(evt.cver, evt.memId, evt.pubS);
	            },
	            onUnpub: function onUnpub(evt) {
	                attendee.onUnpub(evt.cver, evt.memId, evt.pubSId);
	            },
	            onMems: function onMems(evt) {},
	            onClose: function onClose(evt) {
	                attendee.onClose(evt.cver, evt.confrId);
	            },
	            onEvent: function onEvent(evt) {
	                attendee.onEvent(evt);
	            },
	            onStreamControl: function onStreamControl(evt) {
	                attendee.onStreamControl(evt.cver, evt.streamId, evt.voff, evt.aoff);
	            },
	            onRemoteControl: function onRemoteControl(evt) {
	                _logger.error("Web not support remote control");

	                var message = attendee.newMessage({
	                    op: 1001,
	                    tsxId: evt.tsxId,
	                    memId: evt.memId,
	                    arg: evt.arg,
	                    result: -507,
	                    msg: "Web not support the remote control."
	                });

	                attendee.postMessage(message, function (rsp) {
	                    _logger.error("Send remote control response. the result = ", rsp.result, rsp.msg || "");
	                });
	            },
	            onRecvRemoteMessage: function onRecvRemoteMessage(evt) {
	                attendee._onRecvRemoteMessage && attendee._onRecvRemoteMessage(evt.memId, evt.arg);
	            }
	        });

	        return session;
	    }
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _util = __webpack_require__(5);
	var _logger = _util.tagLogger("Sess");

	var __event = __webpack_require__(50);

	var __url_seqno = 0;

	var Message = _util.prototypeExtend({
	    setSessId: function setSessId(sessId) {
	        sessId && (this.sessId = sessId);
	        return this;
	    },
	    setOp: function setOp(op) {
	        op && (this.op = op);

	        if (op === 200) {
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
	    setTsxId: function setTsxId(tsxId) {
	        tsxId && (this.tsxId = tsxId);
	        return this;
	    },
	    setTicket: function setTicket(tkt) {
	        tkt && (this.tkt = tkt);
	        return this;
	    },
	    setSdp: function setSdp(sdp) {
	        sdp && (this.sdp = sdp);
	        return this;
	    },
	    setCands: function setCands(cands) {
	        cands && (this.cands = cands);
	        return this;
	    },
	    setSubSId: function setSubSId(subSId) {
	        subSId && (this.subSId = subSId);
	        return this;
	    },
	    setPubS: function setPubS(pubS) {
	        pubS && (this.pubS = _util.extend(false, {}, pubS));

	        var thisPubS = this.pubS;
	        if (thisPubS.ext && _util.isPlainObject(thisPubS.ext)) {
	            thisPubS.ext = JSON.stringify(thisPubS.ext);
	        }

	        thisPubS && _util.forEach(thisPubS, function (key, value) {
	            if (_util.isPlainObject(value) || typeof value === 'function') {
	                _util.removeAttribute(thisPubS, key);
	            }
	        });

	        thisPubS && _util.removeAttribute(thisPubS, "localStream");
	        thisPubS && _util.removeAttribute(thisPubS, "_localMediaStream");
	        thisPubS && _util.removeAttribute(thisPubS, "_webrtc");

	        return this;
	    },
	    setRtcId: function setRtcId(rtcId) {
	        rtcId && (this.rtcId = rtcId);
	        return this;
	    },
	    setCver: function setCver(cver) {
	        cver && (this.cver = cver);
	        return this;
	    },
	    setEndReason: function setEndReason(endReason) {
	        endReason && (this.endReason = endReason);
	        return this;
	    },
	    setNickName: function setNickName(nickName) {
	        nickName && (this.nickName = nickName);
	        return this;
	    },
	    setResource: function setResource(resource) {
	        resource && (this.resource = resource);
	        return this;
	    },
	    setReason: function setReason(reason) {
	        reason && (this.reason = reason);
	        return this;
	    },
	    setConfrId: function setConfrId(confrId) {
	        confrId && (this.confrId = confrId);
	        return this;
	    },
	    setVoff: function setVoff(voff) {
	        typeof voff === "undefined" || (this.voff = voff ? 1 : 0);
	        return this;
	    },
	    setAoff: function setAoff(aoff) {
	        typeof aoff === "undefined" || (this.aoff = aoff ? 1 : 0);
	        return this;
	    },
	    setFlag: function setFlag(flag) {
	        flag === 0 && (this.flag = 0);
	        flag === 1 && (this.flag = 1);

	        return this;
	    },
	    setExt: function setExt(ext) {
	        if (ext && _util.isPlainObject(ext)) {
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

	window.__session_globalCount = 0;

	function _connect(onConnected, onConnectFail, retry) {
	    var self = this;

	    function connectFail(cause, _evt) {
	        try {
	            self.onWebsocketEvent(new __event.WSClose({ url: self.thisWsUri, retry: retry, online: self.online, cause: cause, event: _evt, session: self }));
	        } finally {
	            onConnectFail && onConnectFail(new __event.WSClose({ url: self.thisWsUri, retry: retry, online: self.online, cause: cause, event: _evt, session: self }));
	        }
	    }

	    function post(message) {
	        if (!self.connected(self.thisWsUri)) {
	            _logger.debug("current dont connect. the message = ", message);
	            return;
	        }

	        if (_util.isPlainObject(message) && !(message instanceof Message)) {
	            throw "message not a Messages";
	        }

	        if (self.sessId && message.sessId != self.sessId) {
	            _logger.info("self.sessId && message.sessId != self.sessId", message);
	            return;
	        }

	        self.thisWsUri === self._websocket.url && self._websocket.send(JSON.stringify(message));
	        self.thisWsUri === self._websocket.url && _logger.info("Done send: req:", message, self._websocket.url);
	        self.thisWsUri === self._websocket.url || _logger.info("Donot send(url not equal): req:", message, self._websocket.url);
	    }

	    function notifyNewMessage() {
	        if (self.connected(self.thisWsUri)) {
	            if (self._bufferedMessages.length === 0) {
	                return;
	            }

	            var __array = [];

	            var bufferedMessage;
	            while (bufferedMessage = self._bufferedMessages.shift()) {
	                if (!bufferedMessage.sessId && !self.sessId && bufferedMessage.op != 200) {
	                    //等待Enter
	                    __array.push(bufferedMessage);
	                    continue;
	                }

	                if (bufferedMessage.op === 200) {
	                    //200单独发送，有可能会修改session值
	                    post(bufferedMessage);
	                    break;
	                }

	                if (self.sessId && !bufferedMessage.sessId) {
	                    bufferedMessage.sessId = self.sessId;
	                }

	                var _bufferedMessage = post(bufferedMessage);
	                _bufferedMessage && __array.push(_bufferedMessage);
	            }

	            if (__array.length > 0) {
	                Array.prototype.push.apply(self._bufferedMessages, __array);
	            }
	            //} else if(!retry || !self.online){
	        } else if (retry === 0 || !self.online) {
	            var _messageMap = _util.extend(false, {}, self._callbacks);

	            var tmp = [];
	            for (var tsxId in _messageMap) {
	                var msg = _messageMap[tsxId];
	                if (retry > 0 && !self.online && (msg.op === 107 || msg.op === 201 || msg.op === 204 || msg.op === 206 || msg.op === 400 || msg.op === 500)) {
	                    tmp.push(msg);
	                    continue;
	                }
	                self.onMessage({ op: 1001, tsxId: tsxId, result: -9527, msg: "sdk rsp fail. retry fail or online = " + self.online });
	            }

	            self._bufferedMessages = self._bufferedMessages || [];

	            tmp.length > 0 && Array.prototype.push.apply(self._bufferedMessages, tmp);
	        } else if (!self.connected()) {
	            var _messageMap = _util.extend(false, {}, self._callbacks);

	            for (var tsxId in _messageMap) {
	                var msg = _messageMap[tsxId];
	                if (msg.op !== 102 && msg.op !== 105 && msg.op !== 1000) {
	                    continue;
	                }
	                self.onMessage({ op: 1001, tsxId: tsxId, result: -9527, msg: "websocket disconnect", retrying: true });
	            }
	        }
	    }

	    if (self.connected(self.thisWsUri)) {
	        onConnected && onConnected(self);
	        _logger.info("Session connected. dont continue connect");
	        self.notifyNewMessage && self.notifyNewMessage();

	        return;
	    }

	    if (!self.online) {
	        connectFail();
	        return;
	    }

	    self.notifyNewMessage = notifyNewMessage;

	    _logger.info("Session begin connect.");

	    var _websocket = self._websocket;
	    if (_websocket) {
	        _logger.warn("will close. websocket state", _websocket.readyState, _websocket.url, self.thisWsUri);
	        _websocket.close(1000);
	    }

	    try {
	        _logger.warn("Connecting", self.thisWsUri, retry);
	        _websocket = self._websocket = new WebSocket(self.thisWsUri);
	    } catch (e) {
	        _logger.error(e);
	        connectFail(e);

	        return;
	    }

	    _websocket.onopen = function (evt) {
	        var _url = this.url;
	        if (_url !== self.thisWsUri) {
	            _logger.error("ignore the onopen. caused by websocket url not ", self.thisWsUri, _url);
	            return;
	        }

	        try {
	            _logger.info("websocket connected:", _url);
	            onConnectFail && (onConnectFail = null);
	            onConnected && onConnected(self);
	            self.onWebsocketEvent(new __event.WSConnected({ event: evt, session: self }));
	        } finally {
	            //self.notifyNewMessage();
	        }
	    };

	    _websocket.onmessage = function (evt) {
	        var _url = this.url;
	        if (_url !== self.thisWsUri) {
	            _logger.error("ignore recv data. caused by websocket url not ", self.thisWsUri, _url, evt.data);
	            return;
	        }

	        _logger.debug("recv data", evt.data);

	        var data = JSON.parse(evt.data);
	        data && data.op == 1001 && _logger.debug("recv message: rsp:", data);
	        data && data.op != 1001 && _logger.info("recv message: evt:", data);

	        self.onMessage(data);
	    };

	    _websocket.onclose = function (evt) {
	        var _url = this.url;
	        _logger.info("Disconnected:", _url, self.thisWsUri, evt);
	        if (_url !== self.thisWsUri) {
	            _logger.error("ignore onclose. caused by websocket url not ", self.thisWsUri, _url);
	            return;
	        }

	        self.notifyNewMessage();

	        if (evt.code !== 1000) {
	            //手动断开
	            connectFail(undefined, evt);
	        }
	    };

	    _websocket.onerror = function (evt) {
	        _logger.info("On error:", evt);

	        self.onWebsocketEvent(new __event.WSError({ event: evt, online: self.online, session: self, url: this.url }));
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

	    __init__: function __init__() {
	        var self = this;

	        //self.owner = null;

	        self._bufferedMessages = [];
	        self._callbacks = {};

	        function nowline() {
	            if (navigator.onLine) {
	                self.online = true;
	            } else {
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

	            if (!self.closed) {
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

	        _logger.warn("online status = ", self.online);
	    },

	    _nextWsUri: function _nextWsUri() {
	        var self = this;

	        var url = self.ticket.url;
	        if (url.indexOf("?") >= 0) {
	            url += "&" + __url_seqno++;
	        } else {
	            url += "?" + __url_seqno++;
	        }
	        return url;
	    },

	    _reconnect: function _reconnect(retry) {
	        var self = this;

	        function connected() {
	            _logger.warn("Reconnected. at ", retry, self._websocket.url);
	            self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
	            self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

	            var enter = self.newMessage().setOp(200).setSessId(self._sessionId).setTicket(self.ticket).setNickName(self.nickName || self.ticket.memName).setResource(self.resource).setExt(self.owner.ext);
	            self.postMessage(enter, function (rsp) {
	                if (rsp.result != 0) {
	                    try {
	                        self.onEvent(new __event.EnterFail({
	                            me: self.owner,
	                            cause: new __event.RspFail({ request: enter, response: rsp }) }));
	                    } finally {
	                        if (rsp.result !== -9527) {
	                            //-9527 客户端 自己返回，网络未通， 其他值服务端返回
	                            self.onEvent(new __event.ServerRefuseEnter({ failed: rsp.result, msg: rsp.msg }));
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
	            if (retry <= 0) {
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

	    __checkConnect: function __checkConnect() {
	        var self = this;

	        self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);

	        emedia.config.checkConnectIntervalMillis && (self.__checkConnectIntervalId = setTimeout(function () {
	            //_logger.trace("Check connect..");

	            try {
	                if (self.online && !self.connected()) {
	                    self.__retryConnectIntervalId && _logger.debug("online, reconnecting...");
	                    self.__retryConnectIntervalId || _logger.debug("online, but disconnect. will reconnect");
	                    self.__retryConnectIntervalId || self._reconnect(emedia.config.reconnect);
	                } else {
	                    //self.notifyNewMessage && self.notifyNewMessage();
	                }
	            } finally {
	                self.__checkConnect();
	            }
	        }, emedia.config.checkConnectIntervalMillis));
	    },

	    connect: function connect(onConnected, onConnectFail, retry) {
	        var self = this;

	        var nextUrl = self.thisWsUri = self._nextWsUri();

	        typeof retry !== "undefined" && _logger.warn("begin connect... at retry = ", retry, nextUrl);

	        function connected() {
	            try {
	                onConnected.apply(self, arguments);
	            } finally {
	                self.__checkConnect();
	            }
	        }

	        function failed(evt) {
	            try {
	                onConnectFail.apply(self, arguments);
	            } finally {
	                retry || evt.url !== nextUrl || self.onEvent(new __event.ServerRefuseEnter({
	                    failed: -95270, msg: "sdk reconnect fail. " + nextUrl + "|" + evt.url }));
	            }
	        }
	        _connect.call(self, connected, failed, retry);
	    },

	    connected: function connected(wsUri) {
	        var self = this;
	        var result = self.online && self._websocket && (!wsUri || wsUri === self._websocket.url) && self._websocket.readyState == WebSocket.OPEN;
	        //_logger.trace("Connected?", result, self.online, wsUri, self._websocket && self._websocket.url, self._websocket && self._websocket.readyState);

	        return result;
	    },

	    onWebsocketEvent: function onWebsocketEvent(evt) {
	        var self = this;
	        self.onEvent(evt);
	    },

	    register: function register(listeners) {
	        if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === "object") {
	            for (var event in listeners) {
	                this.bind(event, listeners[event]);
	            }
	        }
	    },

	    bind: function bind(event, func) {
	        var self = this;

	        var onFunc;
	        if (onFunc = self._events[event]) {
	            self[onFunc] = func;
	        } else {
	            throw "Not supported event = " + event;
	        }
	    },

	    getSessionId: function getSessionId() {
	        return this._sessionId;
	    },

	    newMessage: function newMessage(cfg) {
	        return new Message(cfg);
	    },

	    __modifyMessage: function __modifyMessage(message) {
	        if (message && message.sdp) {
	            if (typeof message.sdp === 'string') {
	                message.sdp = _util.parseJSON(message.sdp);
	            }
	            message.sdp.type && (message.sdp.type = message.sdp.type.toLowerCase());
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
	            }
	        }

	        if (message && message.mems) {
	            if (!_util.isArray(message.mems)) {
	                return;
	            }

	            var _mems = message.mems;
	            message.mems = {};

	            _util.forEach(_mems, function (index, _mem) {
	                message.mems[_mem.id] = _mem;

	                var acptOps = _mem.acptOps = {};
	                _util.forEach(emedia.config.baseAcptOps, function (_index, _oper) {
	                    acptOps[_oper] = true;
	                });
	                if (_mem.res) {
	                    _util.forEach(_mem.res.ops, function (_index, _oper) {
	                        acptOps[_oper] = true;
	                    });
	                }

	                if (_mem && _mem.ext) {
	                    try {
	                        message.mems[_mem.id].ext = JSON.parse(_mem.ext);
	                    } catch (e) {
	                        _logger.error(e);
	                    }
	                }
	            });
	        }

	        if (message && message.mem) {
	            var acptOps = message.mem.acptOps = {};
	            _util.forEach(emedia.config.baseAcptOps, function (_index, _oper) {
	                acptOps[_oper] = true;
	            });
	            if (message.mem.res) {
	                _util.forEach(message.mem.res.ops, function (_index, _oper) {
	                    acptOps[_oper] = true;
	                });
	            }

	            if (message.mem && message.mem.ext) {
	                try {
	                    message.mem.ext = JSON.parse(message.mem.ext);
	                } catch (e) {
	                    _logger.error(e);
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

	                if (_stream && _stream.ext) {
	                    try {
	                        message.streams[_stream.id].ext = JSON.parse(_stream.ext);
	                    } catch (e) {
	                        _logger.error(e);
	                    }
	                }
	            });
	        }

	        if (message && message.pubS) {
	            if (message.pubS && message.pubS.ext) {
	                try {
	                    message.pubS.ext = JSON.parse(message.pubS.ext);
	                } catch (e) {
	                    _logger.error(e);
	                }
	            }
	        }

	        if (message && message.ext) {
	            try {
	                message.ext = JSON.parse(message.ext);
	            } catch (e) {
	                _logger.error(e);
	            }
	        }
	    },

	    onMessage: function onMessage(servMessage) {
	        var self = this;

	        if (servMessage.op != 1001 && !servMessage.sessId) {
	            throw "message sessId error. server evt data error";
	        }

	        if (servMessage.op != 1001 && self._sessionId && self._sessionId != servMessage.sessId) {
	            throw "message sessId error. server and local not equal";
	        }

	        self.__modifyMessage(servMessage);

	        var reqMessage = _util.removeAttribute(self._callbacks, servMessage.tsxId);
	        if (reqMessage && reqMessage.op === 200) {
	            self._sessionId = servMessage.sessId;

	            if (servMessage.result === 0) {
	                //enter 成功
	                for (var index in self._bufferedMessages) {
	                    var message = self._bufferedMessages[index];

	                    if (!message.sessId && message.op !== 200) {
	                        message.sessId = servMessage.sessId;
	                    }
	                }

	                setTimeout(function () {
	                    self.notifyNewMessage();
	                }, 100);
	            } else {
	                var bufferedMessage;
	                while (bufferedMessage = self._bufferedMessages.shift()) {
	                    if (bufferedMessage.op === 200) {
	                        continue;
	                    }

	                    self.onMessage({ op: 1001, tsxId: bufferedMessage.tsxId, result: -9527, msg: "sdk enter fail. sdk callback. enter result = " + servMessage.result });
	                }
	            }
	        }

	        self.onEvent(new __event.RecvResponse({ request: reqMessage, response: servMessage }));

	        if (reqMessage && reqMessage.__callback__) {
	            reqMessage.__callback__(servMessage);
	            return;
	        }

	        if (!servMessage.op || servMessage.op == 1001) {
	            _logger.trace("Igron message. caused by op not found.", servMessage);
	            return;
	        }

	        var onFunc;
	        var event = servMessage.op;
	        if ((onFunc = self._events[event]) && (onFunc = self[onFunc])) {
	            onFunc(servMessage);
	        } else {
	            throw "Not supported event = ", servMessage;
	        }
	    },

	    __modifyMessageForPost: function __modifyMessageForPost(message) {
	        if (message.cands) {
	            var _cands = [];

	            var cands = message.cands;
	            for (var i = 0; i < cands.length; i++) {
	                var _cand;

	                if (typeof cands[i] === "string") {
	                    _cand = {
	                        type: "candidate",
	                        candidate: cands[i],
	                        mlineindex: 0,
	                        mid: "audio"
	                        // seq: i
	                    };
	                } else {
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

	                _cands.push(_cand);
	            }

	            message.cands = _cands;
	        }

	        if (message.sdp && _util.isPlainObject(message.sdp)) {
	            var _sdp = {
	                type: message.sdp.type,
	                sdp: message.sdp.sdp
	            };

	            message.sdp = _sdp;

	            message.sdp.type = message.sdp.type.toUpperCase();
	            message.sdp = _util.stringifyJSON(message.sdp);
	        }

	        // if(message.ext && _util.isPlainObject(message.ext)){
	        //     message.ext = JSON.stringify(message.ext);
	        // }

	        return message;
	    },

	    postMessage: function postMessage(message, callback) {
	        var self = this;

	        if (!message.tsxId) {
	            message.setTsxId("MSG" + Date.now() + "-" + __session_globalCount++);
	        }

	        if (message.memId) {
	            var _mem = self.owner._cacheMembers[message.memId];

	            if (!_mem) {
	                callback && callback({ op: 1001, tsxId: message.tsxId, result: -507, msg: " member not found at local. memberId = " + message.memId });
	                return;
	            }

	            var reqOps = message._reqOps;
	            if (!reqOps) {
	                reqOps = [];
	                reqOps.push(message.op);
	            }

	            for (var index in reqOps) {
	                var _reqOp = reqOps[index];

	                if (!_mem.acptOps[_reqOp]) {
	                    callback && callback({ op: 1001, tsxId: message.tsxId, result: -507, msg: " member not accept op " + _reqOp + ", " + message.memId });
	                    return;
	                }
	            }
	        }
	        _util.removeAttribute(message, '_reqOps');

	        if (self._sessionId && self._sessionId != message.sessId) {
	            callback && callback({ op: 1001, tsxId: message.tsxId, result: -9527, msg: "sessionId not excepted." });
	            return;
	        }
	        if (self.closed) {
	            callback && callback({ op: 1001, tsxId: message.tsxId, result: -9527, msg: "session closed" });
	            return;
	        }

	        self.__modifyMessageForPost(message);

	        if (message.op === 200) {
	            // enter 放在首位
	            self._bufferedMessages.unshift(message);

	            if (callback) {
	                setTimeout(function () {
	                    if (!self._callbacks[message.tsxId]) {
	                        return;
	                    }

	                    _logger.error("Enter timeout. fail.");
	                    self.onMessage({ op: 1001, tsxId: message.tsxId, result: -9527, msg: "enter timeout. millis = " + emedia.config.enterTimeout });
	                }, emedia.config.enterTimeout);
	            }
	        } else {
	            self._bufferedMessages.push(message);
	        }
	        self._callbacks[message.tsxId] = _util.extend(message, {
	            __callback__: callback
	        });

	        self.notifyNewMessage && self.notifyNewMessage();
	    },

	    close: function close(reason) {
	        _logger.warn("sessiong closing, reason = ", reason);

	        var self = this;

	        self.notifyNewMessage && self.notifyNewMessage();

	        self.closed = true;

	        self.seqno = 0;

	        self._websocket && (reason == 0 || reason == 100 ? self._websocket.close(1000) : self._websocket.close());

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

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	
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
	    __init__: function __init__() {
	        this.day = new Date();
	    },

	    execTime: function execTime() {
	        var hour = this.day.getHours();
	        if (hour < 10) {
	            hour = "0" + hour;
	        }
	        var minute = this.day.getMinutes();
	        if (minute < 10) {
	            minute = "0" + minute;
	        }
	        var second = this.day.getSeconds();
	        if (second < 10) {
	            second = "0" + second;
	        }

	        return hour + ":" + minute + ":" + second;
	    }
	});

	var __ICEEvent = Error.extend({
	    _webrtcDesc: function _webrtcDesc() {
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
	    WSClose: Error.extend({ message: function message() {
	            var message = this.execTime() + " WSClose: Websocket close (" + (this.retry || 0) + ").";

	            this.online || (message += " offline.");
	            this.event && (message += " wscode: " + this.event.code);
	            this.cause && (message += " cause: " + this.cause.message);

	            this.url && (message += " url: " + this.url);

	            message += " retry: " + (this.retry || 0);

	            this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

	            return message;
	        } }),

	    /**
	     * {event: evt, online: self.online, session: self}
	     */
	    WSError: Error.extend({ message: function message() {
	            var message = this.execTime() + " WSError: Websocket error. ready state:" + (this.event.srcElement && this.event.srcElement.readyState || this.event.currentTarget.readyState) + ". online = " + this.online;
	            this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

	            this.url && (message += " url: " + this.url);

	            return message;
	        } }),

	    /**
	     * {event: evt, session: self}
	     */
	    WSConnected: Error.extend({ message: function message() {
	            var message = this.execTime() + " WSConnected: Websocket success. ready state:" + (this.event.srcElement && this.event.srcElement.readyState || this.event.currentTarget.readyState);
	            this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

	            return message;
	        } }),

	    /**
	     * {webrtc: webrtc, event: webrtcEvent, state: webrtcEvent.target.iceConnectionState}
	     */
	    ICEChanage: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " ICEChanage: " + this._webrtcDesc() + " state: " + this.state;
	        } }),

	    /**
	     * {webrtc: webrtc, event: err}
	     */
	    AddIceCandError: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " AddIceCandError: " + this._webrtcDesc() + ", add cand error";
	        } }),

	    /**
	     * {webrtc: webrtc, event: event}
	     */
	    ICEConnectFail: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " ICEConnectFail: " + this._webrtcDesc() + " failed";
	        } }),

	    /**
	     * {webrtc: webrtc, event: event}
	     */
	    ICEConnected: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " ICEConnected: " + this._webrtcDesc() + " connected";
	        } }),

	    /**
	     * {webrtc: webrtc, event: event}
	     */
	    ICEDisconnected: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " ICEDisconnected: " + this._webrtcDesc() + " disconnected";
	        } }),

	    /**
	     * {webrtc: webrtc}
	     */
	    ICEClosed: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " ICEClosed: " + this._webrtcDesc() + " closed";
	        } }),

	    /**
	     * {webrtc: webrtc}
	     */
	    ICERemoteMediaStream: __ICEEvent.extend({ message: function message() {
	            return this.execTime() + " ICERemoteMediaStream: " + this._webrtcDesc() + " got remote stream";
	        } }),

	    /**
	     * {stream: stream, state:, msg: }
	     */
	    StreamState: Error.extend({ message: function message() {
	            return this.execTime() + " StreamState: " + " stream " + this.stream.id + " state: " + this.state + " " + this.msg;
	        },
	        iceFail: function iceFail() {
	            this.state = 1;
	            this.msg = "network anomaly. media lost";
	        }
	    }),

	    /**
	     * {member: self.current, event: e}
	     */
	    OpenMediaError: Error.extend({ message: function message() {
	            return this.execTime() + " OpenMediaError: " + " open media error. caused by " + this.event.toString();
	        } }),

	    /**
	     * {reason: reason, parnter: {id: self._memberId}}
	     */
	    Hangup: Error.extend({ message: function message() {
	            if (this.self) {
	                return "hangup id = " + (this.self.id || "--") + " reason：" + (this.reason || 0);
	            } else {
	                return this.execTime() + " Hangup: " + (this.parnter && (this.parnter.name || this.parnter.id || " ") || "") + " hangup, reason：" + (this.reason || 0);
	            }
	        } }),

	    /**
	     * {failed: rsp.result, msg: rsp.msg}
	     */
	    ServerRefuseEnter: Error.extend({ message: function message() {
	            return this.execTime() + " ServerRefuseEnter: " + "server refuse, cause：" + this.failed + ", msg:" + (this.msg || "");
	        } }),

	    /**
	     * {request: req, response: rsp}
	     */
	    RspFail: Error.extend({
	        __init__: function __init__() {
	            this.day = new Date();
	            this.failed = this.response.result;
	            this.msg = this.response.msg || this.response.message || "--";
	        },
	        message: function message() {
	            return this.execTime() + " RspFail: " + this.request.tsxId + ", " + (this.response.sessId || "--") + " op: " + this.request.op + ", cause: " + this.failed + " " + this.msg;
	        }
	    }),

	    RecvResponse: Error.extend({
	        __init__: function __init__() {
	            this.day = new Date();
	            this.failed = this.response.result;
	            this.msg = this.response.msg;
	            //this.request = this.response.result;
	            //this.response = this.response.msg;
	        },
	        message: function message() {
	            if (this.request) {
	                return this.execTime() + " RecvResponse: " + (this.request && this.request.tsxId) + ", " + (this.response.sessId || "--") + " op: " + (this.request && this.request.op) + ", cause: " + this.failed + " " + this.msg;
	            } else {
	                return this.execTime() + " RecvMessage: " + (this.response && this.response.tsxId) + ", " + (this.response.sessId || "--") + " op: " + (this.response && this.response.op) + " " + this.msg;
	            }
	        }
	    }),

	    /**
	     * {me: me, cause: _event_}
	     */
	    EnterFail: Error.extend({ message: function message() {
	            return this.execTime() + " EnterFail: " + "enter fail：" + (this.cause ? this.cause.message() : "unkown");
	        } }),

	    EnterSuccess: Error.extend({ message: function message() {
	            return this.execTime() + " EnterSuccess: " + "enter success";
	        } }),

	    /**
	     * {streamId: rsp.streamId}
	     */
	    PushSuccess: Error.extend({ message: function message() {
	            return this.execTime() + " PushSuccess: " + "push success, streamId = " + this.stream.id + ", " + this.stream.optimalVideoCodecs + ", webrtc = " + this.stream.rtcId;
	        } }),

	    /**
	     * {webrtc: webrtc, pubS: pubS, me: me, cause: _event_}
	     */
	    PushFail: Error.extend({ message: function message() {
	            return this.execTime() + " PushFail: " + "push fail, streamId = " + this.stream.id + ", " + this.stream.optimalVideoCodecs + ", webrtc = " + this.stream.rtcId + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
	        } }),

	    /**
	     * {stream: stream, failed: failed, me: me, cause: cause}
	     */
	    RemoteControlFail: Error.extend({ message: function message() {
	            return this.execTime() + " RemoteControlFail: " + (this.type || "remote control") + " fail, " + (this.stream ? this.stream.id : "") + " failed = " + this.failed + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
	        } }),

	    /**
	     * {stream: stream, cause: }
	     */
	    SubSuccess: Error.extend({ message: function message() {
	            return this.execTime() + " SubSuccess: " + "sub success, streamId = " + this.stream.id + ", " + this.stream.vcodes + ", webrtc = " + this.stream.rtcId;
	        } }),

	    /**
	     * {stream: stream, cause: }
	     */
	    SubFail: Error.extend({ message: function message() {
	            return this.execTime() + " SubFail: " + "sub fail, streamId = " + this.stream.id + ", " + this.stream.vcodes + ", webrtc = " + this.stream.rtcId + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
	        } }),

	    /**
	     * {stream: stream, cause: }
	     */
	    SubFailNotSupportVCodes: Error.extend({ message: function message() {
	            return this.execTime() + " SubFailNotSupportVCodes: " + "sub fail, streamId = " + this.stream.id + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
	        } }),

	    /**
	     * {stream: stream, cause: }
	     */
	    SubFailSafariNotAllowSubBeforePub: Error.extend({ message: function message() {
	            return this.execTime() + " SubFailSafariNotAllowSubBeforePub: " + "sub fail, streamId = " + this.stream.id + " cause：Safari without access to capture devices, " + "WebKit only exposes Server Reflexive and TURN ICE candidates, " + "which expose IPs that could already be gathered by websites.";
	        } }),

	    /**
	     * {stream: stream, useVCodes: []}
	     */
	    SwitchVCodes: Error.extend({ message: function message() {
	            return this.execTime() + " SwitchVCodes: " + "pub streamId = " + this.stream.id;
	        } }),

	    CurrentCalling: Error.extend({ message: function message() {
	            return this.execTime() + " CurrentCalling: " + "warn! current calling...";
	        } }),

	    /**
	     * {desktopStreamId: m.streamId}
	     */
	    OpenDesktopMedia: Error.extend({ message: function message() {
	            return this.execTime() + " OpenDesktopMedia: " + "shared desktop, desktopStreamId = " + desktopStreamId;
	        } }),

	    OpenDesktopMediaAccessDenied: Error.extend({ message: function message() {
	            return this.execTime() + " OpenDesktopMediaAccessDenied: " + "shared desktop not allow";
	        } }),

	    ShareDesktopExtensionNotFound: Error.extend({ message: function message() {
	            return this.execTime() + " ShareDesktopExtensionNotFound: " + "shared desktop plugin required";
	        } })
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var _util = __webpack_require__(5);
	var _logger = _util.tagLogger("Me");

	var Member = __webpack_require__(52);

	var __event = __webpack_require__(50);

	var Stream = __webpack_require__(54);

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
	    __init__: function __init__() {
	        var self = this;

	        self._session || self.sessionFactory && (self._session = self.sessionFactory());

	        if (!self._session) throw "Require session";

	        self._cver = 0;

	        self._cacheMembers = {};
	        self._cacheStreams = {};

	        self._linkedStreams = {};
	        self._maybeNotExistStreams = {}; //与self._streams结构相同，用 存储 断网时，ice fail的stream对象。这个对象可能不存在了

	        self._records = {};

	        self._ices = {};

	        self.closed = false;
	    },

	    getCurrentMembers: function getCurrentMembers() {
	        var self = this;

	        var members = [];
	        _util.forEach(self._cacheMembers, function (_memId, _cacheMember) {
	            var member = _util.extend(true, {}, _cacheMember);
	            members.push(member);
	        });

	        return members;
	    },

	    newStream: function newStream(cfg) {
	        var attendee = this;

	        var _Stream = Stream.extend({
	            __init__: function __init__() {
	                var self = this;

	                self.rtcId || self._webrtc && (self.rtcId = self._webrtc.getRtcId());
	                self._webrtc || self.rtcId && (self._webrtc = attendee._ices[self.rtcId]);

	                if (self.memId && !self.owner) {
	                    self.owner = _util.extend({}, attendee._cacheMembers[self.memId]);
	                    if (!self.owner && !self.located()) {
	                        throw "Remote stream, not owner. it = " + self.id;
	                    }
	                }
	            }
	        });

	        return new _Stream(cfg);
	    },

	    getConfrId: function getConfrId() {
	        return this.ticket.confrId;
	    },
	    isCaller: function isCaller() {
	        var self = this;
	        return self.isP2P() && self.ticket.caller == self.name;
	    },
	    isCallee: function isCallee() {
	        var self = this;
	        return self.isP2P() && self.ticket.callee == self.name;
	    },
	    isP2P: function isP2P() {
	        var self = this;
	        return self.ticket && (self.ticket.type == "P2P" || self.ticket.type == "p2p");
	    },
	    isConfr: function isConfr() {
	        var self = this;
	        return self.ticket && (self.ticket.type == "CONFR" || self.ticket.type == "confr");
	    },

	    onEvent: function onEvent(evt) {},

	    join: function join(joined, joinError) {
	        _logger.debug("begin join ...");

	        var self = this;

	        var enter;

	        if (self._memberId) {
	            _logger.warn("Had joined. igrone it");
	            joined && joined(self.memId);
	            return;
	        }

	        function onJoinError(_event_) {
	            try {
	                if (_event_ instanceof __event.WSClose && _event_.retry) {
	                    return;
	                }

	                if (!(_event_ instanceof __event.EnterFail)) {
	                    _event_ = new __event.EnterFail({ //可能是 websocket 链接未成功
	                        attendee: self,
	                        cause: _event_
	                    });
	                }

	                self.onEvent(_event_);
	                joinError && joinError(_event_);
	            } finally {}
	        }

	        function enterRsp(rsp) {
	            if (rsp.result != 0) {
	                try {
	                    onJoinError(new __event.RspFail({ request: enter, response: rsp }));
	                } finally {
	                    if (rsp.result !== -9527) {
	                        //-9527 客户端 自己返回，网络未通， 其他值服务端返回
	                        self.onEvent(new __event.ServerRefuseEnter({ failed: rsp.result, msg: rsp.msg }));
	                    }
	                }

	                return;
	            }

	            self.reflushSupportVCodes(rsp.vcodes);

	            self.setMemberId(rsp.memId);

	            self.onEvent(new __event.EnterSuccess());

	            joined && joined(rsp.memId);

	            self.onMembers(rsp.cver, rsp.mems);
	            self.onStreams(rsp.cver, rsp.streams);
	        }

	        function onConnected() {
	            enter = self.newMessage().setOp(200).setTicket(self.ticket).setNickName(self.nickName || self.ticket.memName).setResource(self.resource).setExt(self.ext);
	            self.postMessage(enter, enterRsp);
	        }

	        self.connect(onConnected, onJoinError);
	        _logger.debug("join", self.ticket.url);
	    },

	    withpublish: function withpublish(pubS) {
	        var self = this;

	        if (!pubS || !pubS.localStream) {
	            throw "pubS null or stream not open";
	        }

	        var enter;

	        var openedStream = pubS && pubS.localStream;

	        var webrtc;

	        function then(joined, joinError) {
	            if (arguments.length === 1) {
	                joinError = joined;
	                joined = undefined;
	            }

	            if (self._memberId) {
	                _logger.warn("Had joined. igrone it");
	                joined && joined(self.memId);
	                return;
	            }

	            function onJoinError(_event_) {
	                try {
	                    if (_event_ instanceof __event.WSClose && _event_.retry) {
	                        return;
	                    }

	                    if (!(_event_ instanceof __event.EnterFail)) {
	                        _event_ = new __event.EnterFail({ //可能是 websocket 链接未成功
	                            attendee: self,
	                            cause: _event_
	                        });
	                    }

	                    self.onEvent(_event_);
	                    joinError && joinError(_event_);
	                } finally {
	                    if (openedStream) {
	                        openedStream.getTracks().forEach(function (track) {
	                            track.stop();
	                        });
	                    }

	                    webrtc && self.closeWebrtc(webrtc.getRtcId());
	                }
	            }

	            var optimalVideoCodecs = self.getOptimalVideoCodecs();

	            function enterRsp(rsp) {
	                if (rsp.result != 0) {
	                    try {
	                        onJoinError(new __event.RspFail({ request: enter, response: rsp }));
	                    } finally {
	                        if (rsp.result !== -9527) {
	                            //-9527 客户端 自己返回，网络未通， 其他值服务端返回
	                            self.onEvent(new __event.ServerRefuseEnter({ failed: rsp.result, msg: rsp.msg }));
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
	                stream.owner = { id: rsp.memId, nickName: self.nickName, name: self.sysUserId, ext: self.extObj };

	                stream.optimalVideoCodecs = optimalVideoCodecs;

	                joined && joined(rsp.memId, stream);
	                self.onEvent(new __event.PushSuccess({ stream: stream, hidden: true })); //ice重连成功后 会 再次 onEvent PushSuccess

	                rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp);
	                rsp.cands && self.tcklC(webrtc.getRtcId(), rsp.cands);

	                self.onMembers(rsp.cver, rsp.mems);
	                self.onStreams(rsp.cver, rsp.streams);
	            }

	            function onConnected() {
	                _logger.debug("enter and pubs");

	                var stream = pubS.localStream;

	                webrtc = self.createWebrtc({ _rtcId: pubS.rtcId, optimalVideoCodecs: optimalVideoCodecs });
	                self.setLocalStream(stream, webrtc.getRtcId());

	                self.doOffer(webrtc.getRtcId(), function (sdp) {
	                    enter = self.newMessage().setOp(200).setTicket(self.ticket).setNickName(self.nickName || self.ticket.memName).setResource(self.resource).setSdp(sdp).setRtcId(webrtc.getRtcId()).setPubS(pubS).setExt(self.ext);
	                    self.postMessage(enter, enterRsp);
	                });
	            }

	            self.connect(onConnected, onJoinError);
	            _logger.debug("join", self.ticket.url);
	        }

	        return {
	            join: then
	        };
	    },

	    push: function push(pubS, pushed, onPushError, autoPush) {
	        _logger.debug("begin push ...");

	        var self = this;

	        if (arguments.length === 2) {
	            onPushError = pushed;
	            pushed = undefined;
	        }

	        if (!pubS || !pubS.localStream) {
	            throw "pubS or stream open";
	        }

	        var initC;

	        var openedStream = pubS.localStream;

	        var webrtc;

	        function _onPushError(_event_) {
	            try {
	                var stream = self.newStream(pubS);
	                stream._localMediaStream = pubS.localStream;
	                stream._webrtc = webrtc;
	                stream.rtcId = webrtc && webrtc.getRtcId();
	                stream.owner = { id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj };

	                var _event_ = new __event.PushFail({
	                    stream: stream,
	                    cause: _event_,
	                    hidden: autoPush && _event_.hidden === true
	                });

	                self.onEvent(_event_);
	                _event_.hidden || onPushError && onPushError(_event_);
	            } finally {
	                if (openedStream && _event_.hidden !== true) {
	                    openedStream.getTracks().forEach(function (track) {
	                        track.stop();
	                    });
	                }

	                webrtc && self.closeWebrtc(webrtc.getRtcId(), _event_.hidden === true);
	            }
	        }

	        var optimalVideoCodecs = pubS.optimalVideoCodecs || self.getOptimalVideoCodecs();

	        function pushRsp(webrtc, rsp) {
	            if (rsp.result != 0) {
	                _onPushError(new __event.RspFail({ request: initC, response: rsp, hidden: rsp.retrying === true }));

	                return;
	            }

	            var stream = self.newStream(pubS);

	            stream._localMediaStream = pubS.localStream;
	            stream._webrtc = webrtc;
	            stream.rtcId = webrtc.getRtcId();
	            stream.id = rsp.streamId;
	            stream.owner = { id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj };

	            stream.optimalVideoCodecs = optimalVideoCodecs;

	            self.onEvent(new __event.PushSuccess({ stream: stream, hidden: true })); //ice重连成功后 会 再次 onEvent PushSuccess
	            pushed && pushed(stream);

	            rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp);
	            rsp.cands && self.tcklC(webrtc.getRtcId(), rsp.cands);
	        }

	        function pub(pubS) {
	            _logger.debug("pubs");

	            var stream = pubS.localStream;

	            webrtc = self.createWebrtc({ _rtcId: pubS.rtcId, optimalVideoCodecs: optimalVideoCodecs });
	            self.setLocalStream(stream, webrtc.getRtcId());

	            self.doOffer(webrtc.getRtcId(), function (sdp) {
	                initC = self.newMessage().setOp(102).setRtcId(webrtc.getRtcId()).setSdp(sdp).setPubS(pubS);

	                self.postMessage(initC, function (rsp) {
	                    pushRsp(webrtc, rsp);
	                });
	            });
	        }

	        pub(pubS);
	        _logger.debug("push", self.ticket.url);
	    },

	    isSafari: function isSafari() {
	        return (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
	        );
	    },
	    isSafariButNotPushStream: function isSafariButNotPushStream() {
	        var self = this;

	        if (self.isSafari() && !emedia._isSafariYetPushedStream) {
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
	    createWebrtcAndSubscribeStream: function createWebrtcAndSubscribeStream(streamId, callbacks, iceServerConfig, subArgs) {
	        var self = this;

	        callbacks || (callbacks = {});

	        var subStream = self._cacheStreams[streamId];
	        var subMember = self._cacheMembers[subStream.memId];

	        //var stream = self.newStream(subStream);
	        var stream = subStream;
	        subArgs = subArgs || stream.subArgs || { subSVideo: true, subSAudio: true };

	        function _onSubFail(evt) {
	            _logger.error("sub stream error", streamId, evt);

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

	        if (self.isSafariButNotPushStream()) {
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

	        var offerOptions = {
	            offerToReceiveAudio: emedia.isSafari ? subArgs.subSAudio : true,
	            offerToReceiveVideo: emedia.isSafari ? subArgs.subSVideo && !stream.voff : true
	        };

	        if (!offerOptions.offerToReceiveAudio && !offerOptions.offerToReceiveVideo) {
	            _logger.error("offerToReceiveAudio == false and offerToReceiveVideo == false");
	            console.error("offerToReceiveAudio == false and offerToReceiveVideo == false");
	        }

	        var webrtc = self.createWebrtc({
	            iceServerConfig: iceServerConfig,
	            optimalVideoCodecs: optimalVideoCodecs,
	            offerOptions: offerOptions,

	            onGotMediaStream: function onGotMediaStream(remoteMediaStream) {
	                var evt = new __event.SubSuccess({
	                    stream: stream,
	                    hidden: true
	                });

	                callbacks.onGotRemote && callbacks.onGotRemote(stream);
	                self.onEvent && self.onEvent(evt);
	            }
	        });
	        var rtcId = webrtc.getRtcId();

	        _logger.warn(rtcId, " sub stream ", streamId, optimalVideoCodecs);

	        stream._webrtc = webrtc;
	        stream.rtcId = rtcId;
	        stream.owner = _util.extend({}, subMember);

	        subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
	        subArgs && (stream.subArgs = subArgs);

	        self.offerCall(rtcId, null, streamId, _onSubFail, function onRspSuccess() {});
	    },

	    _getOptimalVideoCodecsSubset: function _getOptimalVideoCodecsSubset(pubStreamVCodes, pubMemberSupportVCodes, selfSupportVCodes) {
	        var self = this;

	        var optimalVideoCodecs = [];

	        if (pubStreamVCodes && pubStreamVCodes.length > 0 && selfSupportVCodes[pubStreamVCodes[0]]) {
	            optimalVideoCodecs.push(pubStreamVCodes[0]);
	        }
	        if (optimalVideoCodecs.length == 0) {
	            for (var i = 0; i < self._orderVCodes.length; i++) {
	                _util.forEach(pubMemberSupportVCodes, function (index, sVCode) {
	                    if (sVCode == self._orderVCodes[i]) {
	                        optimalVideoCodecs.push(sVCode);
	                    }
	                });
	            }
	        }

	        return optimalVideoCodecs;
	    },

	    subscribeStream: function subscribeStream(rtcId, streamId, rspFail, subArgs) {
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

	        subArgs = subArgs || { subSVideo: true, subSAudio: true };
	        stream.subArgs = stream.subArgs || { subSVideo: true, subSAudio: true };
	        stream._webrtc && (stream._webrtc.subArgs = stream._webrtc.subArgs || { subSVideo: true, subSAudio: true });

	        if (!stream.subArgs.subSVideo && subArgs.subSVideo && !stream.voff) {
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

	        var subMessage = self.newMessage().setOp(205).setRtcId(rtcId).setSubSId(streamId);

	        subArgs && _util.extend(subMessage, subArgs);

	        self.postMessage(subMessage, function (rsp) {
	            if (rsp.result != 0) {
	                preSubArgs && stream._webrtc && stream._webrtc.setSubArgs(preSubArgs);
	                preSubArgs && (stream.subArgs = preSubArgs);

	                var evt = new __event.SubFail({
	                    stream: stream,
	                    cause: new __event.RspFail({ request: subMessage, response: rsp })
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

	    unsubscribeStream: function unsubscribeStream(streamId) {
	        var self = this;

	        var stream = self._cacheStreams[streamId];
	        var rtcId = stream._webrtc && stream._webrtc.getRtcId();
	        if (!rtcId) {
	            return;
	        }

	        try {
	            var unsubMessage = self.newMessage().setOp(206).setRtcId(rtcId).setSubSId(streamId);

	            self.postMessage(unsubMessage);
	        } finally {
	            self.closeWebrtc(rtcId);
	        }

	        return rtcId;
	    },

	    onEnter: function onEnter(cver, mem) {
	        var self = this;

	        cver && (self._cver = cver);

	        if (!mem) return;
	        if (self._cacheMembers[mem.id]) {
	            return;
	        }

	        self._cacheMembers[mem.id] = mem;

	        var _tmpMap = {};
	        if (mem.res && mem.res.vcodes && mem.res.vcodes.length > 0) {
	            _util.forEach(mem.res.vcodes, function (index, vcode) {
	                if (_tmpMap[vcode]) {} else {
	                    _tmpMap[vcode] = true;
	                    self.supportVCodes[vcode] && self.supportVCodes[vcode]++;
	                }
	            });
	        }

	        self.onAddMember(mem);
	    },

	    _onFinally: function _onFinally() {
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

	    onExit: function onExit(cver, memId, reason) {
	        var self = this;

	        cver && (self._cver = cver);

	        if (memId == self.getMemberId()) {
	            //被服务器 强制 exit
	            _logger.warn("Me exit. ", reason, memId);

	            try {
	                self.closed || self.close(reason);
	            } catch (e) {
	                self.onEvent(new __event.Hangup({ reason: reason, self: { id: self._memberId } }));
	                self.onMeExit && self.onMeExit(reason);

	                _logger.error(e);
	            }

	            return;
	        }

	        var rmMember = self._cacheMembers[memId];
	        if (rmMember) {
	            if (rmMember.res && rmMember.res.vcodes && rmMember.res.vcodes.length > 0) {
	                _util.forEach(rmMember.res.vcodes, function (index, vcode) {
	                    self.supportVCodes[vcode]--;
	                });
	            }

	            self._onRemoveMember(rmMember, reason);
	            self.onEvent(new __event.Hangup({ reason: reason, parnter: rmMember }));
	        }
	    },

	    onPub: function onPub(cver, memId, pubS) {
	        var self = this;

	        if (!self._cacheMembers[memId]) throw "No found member. when pub";

	        var newStream = self.newStream(pubS);
	        var _stream = self._cacheStreams[pubS.id];

	        cver && (self._cver = cver);

	        if (_stream && newStream.sver !== _stream.sver) {
	            _logger.info("Onpub. the steam ", _stream.id, " republish. sver ", _stream.sver, newStream.sver);

	            if (newStream && (newStream.aoff !== _stream.aoff || newStream.voff != _stream.voff)) {
	                self.onStreamControl(undefined, pubS.id, newStream.voff, newStream.aoff);
	            }

	            _util.extend(_stream, newStream);
	            self._onRepublishStream(_stream);

	            return;
	        }

	        var stream = newStream;
	        stream.owner = self._cacheMembers[memId];
	        self._cacheStreams[pubS.id] = stream;

	        self.onAddStream(self.newStream(stream));

	        if (self.autoSub) {
	            if (self.isSafariButNotPushStream()) {
	                stream._autoSubWhenPushStream = true;
	                _logger.warn("Dont auto sub stream ", stream.id, ", caused by safari not pub stream");
	                return;
	            }

	            self.createWebrtcAndSubscribeStream(pubS.id, {
	                onGotRemote: function onGotRemote(stream) {
	                    //self.onAddStream(stream);
	                }
	            });
	        }
	    },

	    onUnpub: function onUnpub(cver, memId, sId) {
	        var self = this;

	        var rmStream = self._cacheStreams[sId];
	        self._onRemovePubstream(self._cacheMembers[memId], rmStream);

	        cver && (self._cver = cver);
	    },

	    onClose: function onClose(cver, confrId, reason) {
	        var self = this;

	        try {
	            self.close(reason || 0);
	        } finally {
	            self.onConfrClose && self.onConfrClose(confrId, reason);
	        }
	    },

	    __getWebrtcFor: function __getWebrtcFor(pubStreamId) {
	        var self = this;

	        var webrtc = self._cacheStreams[pubStreamId]._webrtc;
	        return webrtc && webrtc.getRtcId();
	    },
	    _getWebrtc: function _getWebrtc(pubStreamId) {
	        var self = this;

	        var webrtc = self._cacheStreams[pubStreamId]._webrtc;
	        return webrtc;
	    },

	    _updateRemoteStream: function _updateRemoteStream(stream, remoteMediaStream) {
	        remoteMediaStream && remoteMediaStream.getAudioTracks().forEach(function (track) {
	            track.enabled = !stream.aoff && !(stream.subArgs && stream.subArgs.subSAudio === false);
	        });

	        remoteMediaStream && remoteMediaStream.getVideoTracks().forEach(function (track) {
	            track.enabled = !stream.voff && !(stream.subArgs && stream.subArgs.subSVideo === false);
	        });
	    },

	    onStreamControl: function onStreamControl(cver, streamId, voff, aoff) {
	        var self = this;

	        var stream = self._cacheStreams[streamId];

	        stream.voff = voff;
	        stream.aoff = aoff;

	        var webrtc = stream._webrtc;
	        webrtc && webrtc._remoteStream && self._updateRemoteStream(stream, webrtc._remoteStream);

	        var stream = self.newStream(stream);
	        self.onUpdateStream && self.onUpdateStream(stream, new stream.Update({ voff: voff, aoff: aoff }));

	        cver && (self._cver = cver);
	    },

	    aoff: function aoff(pubS, _aoff, callback) {
	        var self = this;

	        var rtcId = self.__getWebrtcFor(pubS.id);
	        if (!rtcId) {
	            throw "pubS not publish" + pubS.id;
	        }

	        self._linkedStreams[pubS.id].aoff = _aoff;

	        var streamControl = self.newMessage().setOp(400).setRtcId(rtcId).setVoff(pubS.voff).setAoff(_aoff);
	        self.postMessage(streamControl, callback);
	    },

	    voff: function voff(pubS, _voff, callback) {
	        var self = this;

	        var rtcId = self.__getWebrtcFor(pubS.id);
	        if (!rtcId) {
	            throw "pubS not publish" + pubS.id;
	        }

	        self._linkedStreams[pubS.id].voff = _voff;

	        var streamControl = self.newMessage().setOp(400).setRtcId(rtcId).setVoff(_voff).setAoff(pubS.aoff);
	        self.postMessage(streamControl, callback);
	    },

	    startRecord: function startRecord(_stream, success) {
	        var self = this;

	        var rtcId = _stream.rtcId;

	        var startRecord = self.newMessage().setOp(500).setRtcId(rtcId).setFlag(1);
	        self.postMessage(startRecord, function (rsp) {
	            _logger.warn("record ", rtcId, rsp.result, rsp.msg);
	            success && success(rsp.result === 0);
	            if (rsp.result === 0) {
	                self._records[_stream.id] = _util.extend(false, {}, _stream);
	            }
	        });
	    },

	    stopRecord: function stopRecord(_stream, success) {
	        var self = this;

	        var rtcId = _stream.rtcId;

	        var stopRecord = self.newMessage().setOp(500).setRtcId(rtcId).setFlag(0);
	        self.postMessage(stopRecord, function (rsp) {
	            _logger.warn("stop record ", rtcId, rsp.result, rsp.msg);
	            success && success(rsp.result === 0);
	        });

	        if (self._records[_stream.id]) {
	            _util.removeAttribute(self._records, _stream.id);
	        }
	    },

	    onMembers: function onMembers(cver, members) {
	        var self = this;

	        var removedMembers = [];
	        _util.forEach(self._cacheStreams, function (_memberId, _member) {
	            members[_memberId] || removedMembers.push(_member);
	        });
	        _util.forEach(removedMembers, function (_index, _member) {
	            self.onExit(undefined, _member.id);
	        });

	        var addMembers = [];
	        _util.forEach(members, function (_memberId, _member) {
	            if (_memberId != self.getMemberId()) {
	                self._cacheStreams[_memberId] || addMembers.push(_member);
	            }
	        });
	        _util.forEach(addMembers, function (_index, _member) {
	            self.onEnter(undefined, _member);
	        });

	        cver && (self._cver = cver);
	    },

	    onStreams: function onStreams(cver, streams) {
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
	            if (stream.memId != self.getMemberId()) {
	                self._cacheStreams[_pubSId] || addStreams.push(stream);
	            }
	        });
	        _util.forEach(addStreams, function (_index, _stream) {
	            self.onPub(undefined, _stream.memId, _stream);
	        });

	        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
	            var newStream;
	            _stream.located() || (newStream = streams[_pubSId]);
	            if (newStream && (newStream.aoff !== _stream.aoff || newStream.voff != _stream.voff)) {
	                self.onStreamControl(undefined, _pubSId, newStream.voff, newStream.aoff);
	            }

	            if (newStream && newStream.sver !== _stream.sver) {
	                _util.extend(_stream, newStream);
	                self._onRepublishStream(_stream);
	            }
	        });

	        cver && (self._cver = cver);
	    },

	    _onRemoveMember: function _onRemoveMember(member, reason) {
	        var self = this;

	        _logger.info("remove", member, reason);

	        var unpubStreams = [];
	        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
	            if (_stream.memId === member.id) {
	                unpubStreams.push(_stream);
	            }
	        });

	        _util.forEach(unpubStreams, function (index, stream) {
	            self._onRemovePubstream(stream.owner, stream, reason);
	        });

	        _util.removeAttribute(self._cacheMembers, member.id);

	        self.onRemoveMember && self.onRemoveMember(member, reason);
	    },

	    _onRemovePubstream: function _onRemovePubstream(member, stream) {
	        var self = this;

	        if (!stream) {
	            return;
	        }

	        var _rtcId = self.unsubscribeStream(stream.id);
	        var rmStream = _util.removeAttribute(self._cacheStreams, stream.id);

	        if (self.onRemoveStream) {
	            var stream = self.newStream(stream);

	            self.onRemoveStream(stream);
	        }
	    },

	    _onRepublishStream: function _onRepublishStream(_stream) {
	        var self = this;

	        if (self._ices[_stream.rtcId] && !self._maybeNotExistStreams[_stream.id]) {
	            var _rtcId = self.unsubscribeStream(_stream.id);

	            self.createWebrtcAndSubscribeStream(_stream.id, {
	                onGotRemote: function onGotRemote(stream) {
	                    //self.onUpdateStream(_stream);
	                }
	            });
	        }
	    },

	    _onRecvRemoteMessage: function _onRecvRemoteMessage(fromMemId, args) {
	        var self = this;

	        _logger.debug("Recv remote message", fromMemId, args);

	        var fromMember = self._cacheMembers[fromMemId];
	        var argsObject;
	        try {
	            argsObject = JSON.parse(args);
	        } catch (e) {}

	        self.onRecvRemoteMessage && self.onRecvRemoteMessage(fromMember || fromMemId, argsObject || args);
	    },

	    onAddMember: function onAddMember(member) {},
	    onRemoveMember: function onRemoveMember(member, reason) {},

	    onAddStream: function onAddStream(stream) {//stream undefined 表明 autoSub属性 空或false. autoSub = true时，自动订阅

	    },
	    onRemoveStream: function onRemoveStream(stream) {},
	    onUpdateStream: function onUpdateStream(stream, update) {},
	    onRecvRemoteMessage: function onRecvRemoteMessage(fromMember, argsObject) {}
	});

	module.exports = Attendee;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	
	var _util = __webpack_require__(5);
	var _logger = _util.tagLogger("Member");

	var __event = __webpack_require__(50);

	var WebRTC = __webpack_require__(53);

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
	    __init__: function __init__() {
	        var self = this;

	        if (!self._session) throw "Require session";

	        self.closed = false;
	        self._ices = {};

	        self.supportVCodes = {};
	    },

	    reflushSupportVCodes: function reflushSupportVCodes(vcodes) {
	        var self = this;

	        self.supportVCodes = {};

	        self._orderVCodes = vcodes;

	        if (!vcodes || vcodes.length == 0) {
	            _logger.warn("Not config support vcodes");
	            return;
	        }

	        _util.forEach(vcodes, function (index, vcode) {
	            self.supportVCodes[vcode] = 1;
	        });
	    },

	    getOptimalVideoCodecs: function getOptimalVideoCodecs() {
	        var self = this;

	        if (!self._orderVCodes || self._orderVCodes.length == 0) {
	            return (/Chrome/.test(navigator.userAgent) ? 'VP8' : /Safari/.test(navigator.userAgent) ? 'H264' : 'VP8'
	            );
	        }

	        var memberCount = 0;
	        _util.forEach(self._cacheMembers, function () {
	            memberCount++;
	        });

	        var maxSupportCount = 0;
	        var optimalVCode;

	        for (var i = 0; i < self._orderVCodes.length; i++) {
	            var vcode = self._orderVCodes[i];

	            if (maxSupportCount == 0) {
	                maxSupportCount = self.supportVCodes[vcode];
	            }

	            if (self.supportVCodes[vcode] > memberCount) {
	                return vcode;
	            }

	            if (self.supportVCodes[vcode] > maxSupportCount) {
	                maxSupportCount = self.supportVCodes[vcode];
	                optimalVCode = vcode;
	            }
	        }

	        return optimalVCode;
	    },

	    setMemberId: function setMemberId(memberId) {
	        this._memberId = memberId;
	    },

	    getMemberId: function getMemberId() {
	        return this._memberId;
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
	    createWebrtc: function createWebrtc(webrtcCfg) {
	        var self = this;

	        var webrtc = new WebRTC({
	            //iceServerConfig: iceServerConfig,

	            onIceStateChange: function onIceStateChange(event) {
	                var state = event.target.iceConnectionState;

	                _logger.debug("evt.target ice state", state);

	                if (state == 'failed') {
	                    self.onEvent(new __event.ICEConnectFail({ webrtc: webrtc, event: event }));
	                    webrtc.onEvent && webrtc.onEvent(new __event.ICEConnectFail({ webrtc: webrtc, event: event }));

	                    return;
	                }
	                if (state == 'connected') {
	                    self.onEvent(new __event.ICEConnected({ webrtc: webrtc, event: event }));
	                    webrtc.onEvent = null;

	                    return;
	                }
	                if (state == 'closed') {
	                    self.onEvent(new __event.ICEClosed({ webrtc: webrtc }));
	                    webrtc.onEvent && webrtc.onEvent(new __event.ICEClosed({ webrtc: webrtc }));

	                    return;
	                }
	                if (state == 'disconnected') {
	                    self.onEvent(new __event.ICEDisconnected({ webrtc: webrtc }));
	                    webrtc.onEvent && webrtc.onEvent(new __event.ICEDisconnected({ webrtc: webrtc }));

	                    return;
	                }

	                self._onIceStateChange && self._onIceStateChange(webrtc, event);
	            },

	            onIceCandidate: function onIceCandidate(candidate) {
	                //event.candidate
	                self._onIceCandidate && candidate && self._onIceCandidate(webrtc, candidate);
	            },

	            onGotRemoteStream: function onGotRemoteStream(remoteStream) {
	                _logger.info("got stream.", webrtc, remoteStream);

	                webrtc.onGotMediaStream && webrtc.onGotMediaStream(remoteStream);

	                self.onEvent(new __event.ICERemoteMediaStream({ webrtc: webrtc }));
	            },
	            onAddIceCandidateError: function onAddIceCandidateError(err) {
	                self.onEvent(new __event.AddIceCandError({ webrtc: webrtc, event: err }));
	            },

	            onSetSessionDescriptionError: function onSetSessionDescriptionError(error) {
	                _logger.error('onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
	                self.onEvent && self.onEvent(new __event.ICEConnectFail({ webrtc: webrtc, event: error }));
	            },
	            onCreateSessionDescriptionError: function onCreateSessionDescriptionError(error) {
	                _logger.error('Failed to create session description: ' + error.toString());
	                self.onEvent && self.onEvent(new __event.ICEConnectFail({ webrtc: webrtc, event: error }));
	            }
	        }, webrtcCfg || {});

	        self._ices || (self._ices = {});
	        if (self._ices[webrtc.getRtcId()]) {
	            //throw "Webrtc id exsits at ices. it is " + webrtc.getRtcId();
	            self.closeWebrtc(webrtc.getRtcId(), true, false);
	        }
	        self._ices[webrtc.getRtcId()] = webrtc;
	        self._ices[webrtc.__id] = webrtc;

	        self._iceCreateRtcPeerConnection(webrtc.getRtcId());
	        _logger.debug("create rtc ", webrtc);

	        return webrtc;
	    },

	    connect: function connect(suceess, fail) {
	        var self = this;

	        self._session.connect(suceess, fail);
	    },

	    connected: function connected() {
	        var self = this;

	        return self._session.connected();
	    },

	    newMessage: function newMessage(cfg) {
	        var self = this;
	        return self._session.newMessage(cfg || {});
	    },

	    postMessage: function postMessage(message, callback) {
	        var self = this;

	        try {
	            message.sessId || message.setSessId(self._session._sessionId);
	            self._session.postMessage(message, callback);
	        } catch (e) {
	            callback && callback({ op: 1001, tsxId: message.tsxId, result: -9527, msg: "post message. exception" });
	            _logger.error(e);
	        }
	    },

	    onEvent: function onEvent(error) {},

	    _onIceStateChange: function _onIceStateChange(webrtc, webrtcEvent) {
	        var self = this;

	        _logger.info(webrtc.getRtcId(), webrtcEvent);
	        self.onEvent(new __event.ICEChanage({ webrtc: webrtc, event: webrtcEvent, state: webrtcEvent.target.iceConnectionState }));
	    },

	    _onIceCandidate: function _onIceCandidate(webrtc, cand) {
	        //event.candidate
	        var self = this;

	        var cands;
	        if (_util.isArray(cand)) {
	            cands = cand;
	        } else {
	            cands = [];
	            cands.push(cand);
	        }

	        var tcklC = self.newMessage().setOp(105).setRtcId(webrtc.getRtcId()).setCands(cands);

	        self.postMessage(tcklC, function (rsp) {
	            if (rsp.result != 0) {
	                self.onEvent(new __event.RspFail({ request: tcklC, response: rsp }));

	                return;
	            }
	        });
	    },

	    _initC: function _initC(webrtc, stream, sdp, subSId, rspFail, rspSuccess) {
	        var self = this;

	        if (stream && stream.rtcId !== webrtc.getRtcId()) {
	            throw "stream and webrtc rtcId not equal.";
	        }

	        var initC = self.newMessage().setOp(102).setRtcId(webrtc.getRtcId()).setSdp(sdp).setSubSId(subSId);

	        webrtc.subArgs && _util.extend(initC, webrtc.subArgs);

	        if (stream && stream.located()) {
	            initC.setPubS(stream);
	        }

	        self.postMessage(initC, function (rsp) {
	            if (rsp.result != 0) {
	                self.onEvent(new __event.RspFail({ request: initC, response: rsp }));
	                rspFail && rspFail(new __event.RspFail({ request: initC, response: rsp, hidden: rsp.retrying === true }));

	                return;
	            }

	            if (stream && !stream.id && rsp.streamId) {
	                stream.id = rsp.streamId;
	            }

	            try {
	                rspSuccess && rspSuccess();
	            } catch (e) {
	                _logger.error(e);
	            }

	            rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp, rsp.cands);

	            rsp.mems && self.onMembers && self.onMembers(rsp.cver, rsp.mems);
	            rsp.streams && self.onStreams && self.onStreams(rsp.cver, rsp.streams);
	        });
	    },

	    _acptC: function _acptC(webrtc, sdp, rspFail) {
	        var self = this;

	        var acptC = self.newMessage().setOp(104).setRtcId(webrtc.getRtcId()).setSdp(sdp);

	        self.postMessage(acptC, function (rsp) {
	            if (rsp.result != 0) {
	                self.onEvent(new __event.RspFail({ request: acptC, response: rsp }));
	                rspFail && rspFail(new __event.RspFail({ request: acptC, response: rsp }));

	                return;
	            }
	        });
	    },

	    _ansC: function _ansC(webrtc, sdp, rspFail) {
	        var self = this;

	        var ansC = self.newMessage().setOp(106).setRtcId(webrtc.getRtcId()).setSdp(sdp);

	        self.postMessage(ansC, function (rsp) {
	            if (rsp.result != 0) {
	                self.onEvent(new __event.RspFail({ request: ansC, response: rsp }));
	                rspFail && rspFail(new __event.RspFail({ request: ansC, response: rsp }));

	                return;
	            }
	        });
	    },

	    _termC: function _termC(webrtc, endReason, rspFail) {
	        var self = this;

	        var termC = self.newMessage().setOp(107).setRtcId(webrtc.getRtcId()).setEndReason(endReason);

	        self.postMessage(termC, function (rsp) {
	            if (rsp.result != 0) {
	                self.onEvent(new __event.RspFail({ request: termC, response: rsp }));
	                rspFail && rspFail(new __event.RspFail({ request: termC, response: rsp }));

	                return;
	            }
	        });
	    },

	    _iceCreateRtcPeerConnection: function _iceCreateRtcPeerConnection(rtcId) {
	        var self = this;

	        self._ices[rtcId].createRtcPeerConnection();

	        _logger.debug("create rtc peer connection", rtcId);
	    },

	    doOffer: function doOffer(rtcId, onGotOffer, onCreateOfferError) {
	        var self = this;

	        var webrtc = self._ices[rtcId];

	        webrtc.createOffer(function (sdp) {
	            onGotOffer(sdp);
	        });
	    },

	    offerCall: function offerCall(rtcId, stream, subSId, rspFail, rspSuccess) {
	        var self = this;

	        var webrtc = self._ices[rtcId];

	        webrtc.createOffer(function (sdp) {
	            self._initC && self._initC(webrtc, stream, sdp, subSId, rspFail, rspSuccess);
	        });
	    },

	    accept: function accept(rtcId, rspFail) {
	        var self = this;

	        var webrtc = self._ices[rtcId];
	        webrtc.createPRAnswer(function (sdp) {
	            self._acptC && self._acptC(webrtc, sdp, rspFail);
	        });
	    },

	    answer: function answer(rtcId, rspFail) {
	        var self = this;

	        var webrtc = self._ices[rtcId];
	        webrtc.createAnswer(function (sdp) {
	            self._ansC && self._ansC(webrtc, sdp, rspFail);
	        });
	    },

	    onTcklC: function onTcklC(rtcId, cands) {
	        var self = this;
	        self._addIceCandidate(cands, rtcId);
	    },

	    onAcptC: function onAcptC(rtcId, sdp, cands) {
	        var self = this;
	        self._iceSetRemoteSDP(sdp, rtcId);
	        cands && self._addIceCandidate(cands, rtcId);
	    },

	    onAnsC: function onAnsC(rtcId, sdp, cands) {
	        var self = this;
	        self._iceSetRemoteSDP(sdp, rtcId);
	        cands && self._addIceCandidate(cands, rtcId);
	    },

	    _addIceCandidate: function _addIceCandidate(cands, rtcId) {
	        var self = this;

	        if (!cands || cands.length == 0) {
	            _logger.warn("drop cands", cands);
	            return;
	        }

	        var webrtc = self._ices[rtcId];
	        webrtc.addIceCandidate(cands);
	    },

	    closeWebrtc: function closeWebrtc(rtcId, remainLocalStream, serverClosed) {
	        var self = this;

	        var webrtc = self._ices[rtcId];

	        if (!webrtc || webrtc.closed) {
	            _logger.warn("Webrtc not exsits or closed", webrtc && webrtc.closed);

	            if (serverClosed) {
	                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
	                    if (_stream.rtcId === rtcId) {
	                        delete self._linkedStreams[sid];
	                    }
	                });
	            }

	            return;
	        }

	        if (self._records) {
	            (function () {
	                var _stopRecord = function _stopRecord(_stream) {
	                    try {
	                        self.stopRecord(_stream);
	                    } catch (e) {
	                        _logger.error(e);
	                    } finally {
	                        _util.removeAttribute(self._records, _stream.id);
	                    }
	                };

	                _util.forEach(self._records, function (sid, _stream) {
	                    _stream.rtcId === rtcId && _stopRecord(_stream);
	                });
	            })();
	        }

	        try {
	            serverClosed || webrtc && self._termC(webrtc, remainLocalStream && webrtc._localStream ? -10 : 0);
	        } finally {
	            //webrtc && _util.removeAttribute(self._ices, rtcId);

	            webrtc && webrtc.close();
	            webrtc && self.onWebrtcTermC && self.onWebrtcTermC(webrtc);

	            if (remainLocalStream) {} else {
	                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
	                    if (_stream.rtcId === rtcId) {
	                        if (_stream.located()) {
	                            // _stream.type !== 1 && _stream._localMediaStream && _stream._localMediaStream.getTracks().forEach(function (track) {
	                            //     track.stop();
	                            // });
	                            _stream._localMediaStream && _stream._localMediaStream.getTracks().forEach(function (track) {
	                                track.stop();
	                            });

	                            self._cacheStreams[sid] && self._linkedStreams[sid] && self.onRemoveStream(_stream);

	                            delete self._cacheStreams[sid];
	                            _logger.info("Remove stream", sid, ". from cache");
	                        }

	                        if (serverClosed) {
	                            delete self._linkedStreams[sid];
	                        }
	                    }
	                });
	            }
	        }

	        return webrtc;
	    },

	    __close: function __close(reason) {
	        _logger.warn("closing, reason = ", reason);

	        var self = this;
	        if (self.closed) {
	            return;
	        }

	        self.closed = true;

	        if (self.__getCopyInterval) {
	            clearInterval(self.__getCopyInterval);
	            _logger.warn("Stop interval get copy");
	        }

	        if (self._ices) {
	            for (var _rtcId in self._ices) {
	                self.closeWebrtc(_rtcId);
	            }
	        }

	        var exit = self.newMessage().setOp(201).setReason(reason || 0);
	        self.postMessage(exit);
	    },

	    exit: function exit(closeMyConfrIfICrtConfr) {
	        var self = this;

	        if (!closeMyConfrIfICrtConfr) {
	            self.close(0); // 正常挂断
	            return;
	        }

	        if (closeMyConfrIfICrtConfr) {
	            self._closeMyConfr(11);
	            //return;
	        }
	        setTimeout(function () {
	            self.close(0); // 正常挂断
	        }, 100);
	    },

	    _closeMyConfr: function _closeMyConfr(reason) {
	        var self = this;

	        var closeConfr = self.newMessage().setOp(204).setReason(reason || 0);
	        self.postMessage(closeConfr, function (rsp) {
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
	    close: function close(reason, failed) {
	        var self = this;
	        if (self.closed) {
	            return;
	        }

	        try {
	            _util.forEach(self._cacheStreams || {}, function (sid, _stream) {
	                if (_stream.located() && _stream._localMediaStream) {
	                    _stream._localMediaStream.getTracks().forEach(function (track) {
	                        track.stop();
	                    });
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

	            self.onEvent(new __event.Hangup({ reason: reason, failed: failed, self: { id: self._memberId } }));
	            self.onMeExit && self.onMeExit(reason, failed);

	            self._onFinally && self._onFinally();
	        }
	    },

	    webrtcState: function webrtcState(rtcId) {
	        var self = this;

	        var webrtc = self._ices[rtcId];
	        return webrtc.iceConnectionState();
	    },

	    _iceSetRemoteSDP: function _iceSetRemoteSDP(sdp, rtcId) {
	        var self = this;

	        var webrtc = self._ices[rtcId];
	        webrtc.setRemoteDescription(sdp);
	    },

	    setLocalStream: function setLocalStream(stream, rtcId) {
	        var self = this;

	        var webrtc = self._ices[rtcId];
	        webrtc.setLocalStream(stream);
	    },

	    onWebrtcTermC: function onWebrtcTermC(_webrtc) {}
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

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

	var __event = __webpack_require__(50);

	var _SDPSection = {
	    headerSection: null,

	    audioSection: null,
	    videoSection: null,

	    _parseHeaderSection: function _parseHeaderSection(sdp) {
	        var index = sdp.indexOf('m=audio');
	        if (index >= 0) {
	            return sdp.slice(0, index);
	        }

	        index = sdp.indexOf('m=video');
	        if (index >= 0) {
	            return sdp.slice(0, index);
	        }

	        return sdp;
	    },

	    _parseAudioSection: function _parseAudioSection(sdp) {
	        var index = sdp.indexOf('m=audio');
	        if (index >= 0) {
	            var endIndex = sdp.indexOf('m=video');
	            return sdp.slice(index, endIndex < 0 ? sdp.length : endIndex);
	        }
	    },

	    _parseVideoSection: function _parseVideoSection(sdp) {
	        var index = sdp.indexOf('m=video');
	        if (index >= 0) {
	            return sdp.slice(index);
	        }
	    },

	    spiltSection: function spiltSection(sdp) {
	        var self = this;

	        self._preSDP = sdp;

	        self.headerSection = self._parseHeaderSection(sdp);
	        self.audioSection = self._parseAudioSection(sdp);
	        self.videoSection = self._parseVideoSection(sdp);
	    },

	    updateVCodes: function updateVCodes(vcodes) {
	        var self = this;

	        if (!vcodes) {
	            return;
	        }
	        if (!self.videoSection) {
	            return;
	        }

	        if (typeof vcodes === "string") {
	            var arr = [];
	            arr.push(vcodes);
	            vcodes = arr;
	        }

	        var vcodeMap = {};
	        var regexp = /a=rtpmap:(\d+) ([A-Za-z0-9]+)\/.*/ig;
	        var arr = self._parseLine(self.videoSection, regexp);
	        for (var i = 0; i < arr.length; i++) {
	            var codeNum = arr[++i];
	            var code = arr[++i];
	            vcodeMap[code] = codeNum;
	        }

	        //H264
	        //if(/Firefox/.test(navigator.userAgent) || /Chrome/.test(navigator.userAgent)){ //a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
	        var h264_regexp = /a=fmtp:(\d+) .*profile-level-id=42e01f;?.*/ig;
	        var h264_arr = self._parseLine(self.videoSection, h264_regexp);

	        if (h264_arr && h264_arr.length >= 2) {
	            vcodeMap['H264'] = h264_arr[1];
	        }
	        //}

	        var numCodes = [];
	        for (var i = 0; i < vcodes.length; i++) {
	            var supportVCode = vcodeMap[vcodes[i]];
	            supportVCode && numCodes.push(supportVCode);
	        }
	        if (numCodes.length == 0) {
	            _logger.error("Not found vcodes map", vcodes);
	            if (self._webrtc) {
	                _logger.error("Not found vcodes map", vcodes, self._webrtc._rtcId, self._webrtc.__id);
	            }
	        }

	        var codeLineLastIndex = self.videoSection.indexOf('\r');
	        var codeLine = self.videoSection.substring(0, codeLineLastIndex);

	        var fields = codeLine.split(' ');

	        Array.prototype.push.apply(numCodes, fields.slice(3));

	        var newNumCodes = [];
	        var _map = {};
	        _util.forEach(numCodes, function (index, ele) {
	            if (newNumCodes.length == 0) {
	                newNumCodes.push(ele);
	                _map[ele] = true;
	            } else {
	                if (!_map[ele]) {
	                    newNumCodes.push(ele);
	                    _map[ele] = true;
	                }
	            }
	        });
	        //alert(numCodes.join(' '));

	        //fields.splice(3, 0, numCodes);
	        fields.splice(3, fields.length - 3, newNumCodes.join(' '));

	        codeLine = fields.join(' ');
	        _logger.warn(codeLine);
	        if (self._webrtc) {
	            _logger.warn(codeLine, self._webrtc._rtcId, self._webrtc.__id);
	        }

	        self.videoSection = codeLine + self.videoSection.substring(codeLineLastIndex);
	    },

	    removeSSRC: function removeSSRC(section) {
	        var arr = [];

	        var _arr = section.split(/a=ssrc:[^\n]+/g);
	        for (var i = 0; i < _arr.length; i++) {
	            _arr[i] != '\n' && arr.push(_arr[i]);
	        }
	        // arr.push('');

	        return arr.join('\n');
	    },

	    removeField_msid: function removeField_msid(section) {
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
	            _arr[i] != '\n' && arr.push(_arr[i]);
	        }

	        return arr.join('\n');
	    },

	    updateHeaderMsidSemantic: function updateHeaderMsidSemantic(wms) {

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

	    updateAudioSSRCSection: function updateAudioSSRCSection(ssrc, cname, msid, label) {
	        var self = this;

	        self.audioSection && (self.audioSection = self.removeSSRC(self.audioSection));
	        self.audioSection && (self.audioSection = self.removeField_msid(self.audioSection));
	        self.audioSection && (self.audioSection = self.audioSection + self.ssrcSection(ssrc, cname, msid, label));
	    },

	    updateVideoSSRCSection: function updateVideoSSRCSection(ssrc, cname, msid, label) {
	        var self = this;

	        self.videoSection && (self.videoSection = self.removeSSRC(self.videoSection));
	        self.videoSection && (self.videoSection = self.removeField_msid(self.videoSection));
	        self.videoSection && (self.videoSection = self.videoSection + self.ssrcSection(ssrc, cname, msid, label));
	    },

	    getUpdatedSDP: function getUpdatedSDP() {
	        var self = this;

	        var sdp = "";

	        self.headerSection && (sdp += self.headerSection);
	        self.audioSection && (sdp += self.audioSection);
	        self.videoSection && (sdp += self.videoSection);

	        return sdp;
	    },

	    parseMsidSemantic: function parseMsidSemantic(header) {
	        var self = this;

	        var regexp = /a=msid\-semantic:\s*WMS (\S+)/ig;
	        var arr = self._parseLine(header, regexp);

	        arr && arr.length == 2 && (self.msidSemantic = {
	            line: arr[0],
	            WMS: arr[1]
	        });

	        return self.msidSemantic;
	    },

	    ssrcSection: function ssrcSection(ssrc, cname, msid, label) {
	        var lines = ['a=ssrc:' + ssrc + ' cname:' + cname, 'a=ssrc:' + ssrc + ' msid:' + msid + ' ' + label, 'a=ssrc:' + ssrc + ' mslabel:' + msid, 'a=ssrc:' + ssrc + ' label:' + label, ''];

	        return lines.join('\n');
	    },

	    parseSSRC: function parseSSRC(section) {
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

	    _parseLine: function _parseLine(str, regexp) {
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

	var SDPSection = function SDPSection(sdp, webrc) {
	    _util.extend(this, _SDPSection);
	    this._webrtc = webrc;
	    this.spiltSection(sdp);
	};

	window.__rtc_globalCount = 0;

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
	    offerOptions: {
	        offerToReceiveAudio: true,
	        offerToReceiveVideo: true
	    },

	    optimalVideoCodecs: null,
	    optimalAudioCodecs: null,

	    __init__: function __init__() {
	        var self = this;

	        self._rtcId || (self._rtcId = "RTC" + __rtc_globalCount++);
	        self.__id = "_i_" + __rtc_globalCount++;

	        self.__setRemoteSDP = false;
	        self.__tmpRemoteCands = [];
	        self.__tmpLocalCands = [];
	        self._rtcPeerConnection = null;

	        _logger.info("Webrtc created. rtcId = ", self._rtcId, ", __id = ", self.__id);
	    },

	    getRtcId: function getRtcId() {
	        return this._rtcId;
	    },

	    iceState: function iceState() {
	        var self = this;
	        return self._rtcPeerConnection.iceConnectionState;
	    },

	    setSubArgs: function setSubArgs(subArgs) {
	        var self = this;
	        self.subArgs = subArgs;
	    },

	    updateRemoteBySubArgs: function updateRemoteBySubArgs(subArgs) {
	        var self = this;

	        self._remoteStream && self._remoteStream.getVideoTracks().forEach(function (track) {
	            track.enabled = !(self.subArgs && self.subArgs.subSVideo === false);
	            //_logger.debug("video track. enabled ", track.enabled, track);
	        });
	        self._remoteStream && self._remoteStream.getAudioTracks().forEach(function (track) {
	            track.enabled = !(self.subArgs && self.subArgs.subSAudio === false);
	            //_logger.debug("audio track. enabled ", track.enabled, track);
	        });
	    },

	    createRtcPeerConnection: function createRtcPeerConnection(iceServerConfig) {
	        var self = this;
	        _logger.debug('begin create RtcPeerConnection ......', self._rtcId, self.__id, "closed:", self.closed);

	        iceServerConfig || (iceServerConfig = self.iceServerConfig);

	        if (iceServerConfig) {
	            //reduce icecandidate number:add default value
	            !iceServerConfig.iceServers && (iceServerConfig.iceServers = []);

	            iceServerConfig.rtcpMuxPolicy = "require";
	            iceServerConfig.bundlePolicy = "max-bundle";

	            //iceServerConfig.iceTransportPolicy = 'relay';
	            if (iceServerConfig.relayOnly) {
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
	        _logger.debug('RtcPeerConnection config:', iceServerConfig, self._rtcId, self.__id, "closed:", self.closed);

	        var rtcPeerConnection = self._rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
	        rtcPeerConnection.__peerId = self._rtcId;
	        _logger.debug('created local peer connection object', rtcPeerConnection, self._rtcId);

	        rtcPeerConnection.onicecandidate = function (event) {
	            //reduce icecandidate number: don't deal with tcp, udp only
	            if (event.type == "icecandidate" && (event.candidate == null || / tcp /.test(event.candidate.candidate))) {
	                return;
	            }

	            if (!event.candidate.candidate) {
	                throw "Not found candidate. candidate is error, " + event.candidate.candidate;
	            }
	            if (!self.__setRemoteSDP) {
	                (self.__tmpLocalCands || (self.__tmpLocalCands = {})).push(event.candidate);
	                _logger.debug('On ICE candidate but tmp buffer caused by not set remote sdp: ', event.candidate.candidate, self._rtcId, self.__id, "closed:", self.closed);
	                return;
	            } else {
	                _logger.debug('On ICE candidate: ', event.candidate.candidate, self._rtcId, self.__id, "closed:", self.closed);
	            }
	            self.onIceCandidate(event.candidate);
	        };

	        rtcPeerConnection.onicestatechange = function (event) {
	            _logger.debug("ice connect state", self.webRtc.iceConnectionState(), "evt.target state", event.target.iceConnectionState, self._rtcId, self.__id, "closed:", self.closed);
	            self.onIceStateChange(event);
	        };

	        rtcPeerConnection.oniceconnectionstatechange = function (event) {
	            self.onIceStateChange(event);
	        };

	        rtcPeerConnection.onaddstream = function (event) {
	            self._onGotRemoteStream(event);
	        };
	    },

	    setLocalStream: function setLocalStream(localStream) {
	        this._localStream = localStream;
	        this._rtcPeerConnection.addStream(localStream);
	        _logger.debug('Added local stream to RtcPeerConnection', localStream, self._rtcId, self.__id, "closed:", this.closed);
	    },

	    getLocalStream: function getLocalStream() {
	        return this._localStream;
	    },
	    getRemoteStream: function getRemoteStream() {
	        return this._remoteStream;
	    },

	    createOffer: function createOffer(onCreateOfferSuccess, onCreateOfferError) {
	        var self = this;

	        _logger.debug('createOffer start...');

	        return self._rtcPeerConnection.createOffer(self.offerOptions).then(function (desc) {
	            self.offerDescription = desc;

	            //_logger.debug('Offer ', desc, "closed:", self.closed);//_logger.debug('from \n' + desc.sdp);
	            _logger.debug('setLocalDescription start', self._rtcId, self.__id, "closed:", self.closed, self.optimalVideoCodecs);
	            //_logger.debug(desc.sdp);
	            //_logger.debug(desc);

	            if (self.optimalVideoCodecs && (typeof self.optimalVideoCodecs === "string" || self.optimalVideoCodecs.length > 0)) {
	                var sdpSection = new SDPSection(desc.sdp, self);
	                sdpSection.updateVCodes(self.optimalVideoCodecs);
	                desc.sdp = sdpSection.getUpdatedSDP();
	            }
	            //_logger.debug(desc.sdp);
	            //_logger.debug(desc);
	            //_logger.debug(JSON.stringify(desc));


	            self._rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSessionDescriptionSuccess, self.onSetSessionDescriptionError).then(function () {
	                (onCreateOfferSuccess || self.onCreateOfferSuccess)(desc);
	            });
	        }, onCreateOfferError || self.onCreateSessionDescriptionError);
	    },

	    createPRAnswer: function createPRAnswer(onCreatePRAnswerSuccess, onCreatePRAnswerError) {
	        var self = this;

	        _logger.info(' createPRAnswer start', "closed:", self.closed);
	        // Since the 'remote' side has no media stream we need
	        // to pass in the right constraints in order for it to
	        // accept the incoming offer of audio and video.
	        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(function (desc) {
	            _logger.debug('_____________PRAnswer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed); //_logger.debug('from :\n' + desc.sdp);

	            desc.type = "pranswer";
	            desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');

	            self.__prAnswerDescription = desc;

	            _logger.debug('inactive PRAnswer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed); //_logger.debug('from :\n' + desc.sdp);
	            _logger.debug('setLocalDescription start', self._rtcId, self.__id, "closed:", self.closed);

	            self._rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSuccess, self.onSetSessionDescriptionError).then(function () {
	                var sdpSection = new SDPSection(desc.sdp);
	                sdpSection.updateHeaderMsidSemantic("MS_0000");
	                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
	                sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

	                desc.sdp = sdpSection.getUpdatedSDP();

	                _logger.debug('Send PRAnswer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed); //_logger.debug('from :\n' + desc.sdp);

	                (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess)(desc);
	            });
	        }, onCreatePRAnswerError || self.onCreateSessionDescriptionError);
	    },

	    createAnswer: function createAnswer(onCreateAnswerSuccess, onCreateAnswerError) {
	        var self = this;

	        _logger.info('createAnswer start', "closed:", self.closed);
	        // Since the 'remote' side has no media stream we need
	        // to pass in the right constraints in order for it to
	        // accept the incoming offer of audio and video.
	        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(function (desc) {
	            _logger.debug('_____________________Answer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed); //_logger.debug('from :\n' + desc.sdp);

	            desc.type = 'answer';

	            if (emedia.supportPRAnswer) {
	                var sdpSection = new SDPSection(desc.sdp);
	                var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);
	                if (ms.WMS == '*') {
	                    sdpSection.updateHeaderMsidSemantic(ms.WMS = "MS_0000");
	                }
	                var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
	                var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

	                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label || "LABEL_AUDIO_1000");
	                if (videoSSRC) {
	                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label || "LABEL_VIDEO_2000");
	                }
	                // mslabel cname

	                desc.sdp = sdpSection.getUpdatedSDP();
	            }

	            self.__answerDescription = desc;

	            _logger.debug('Answer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed); //_logger.debug('from :\n' + desc.sdp);
	            _logger.debug('setLocalDescription start', self._rtcId, self.__id, "closed:", self.closed);

	            self._rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSuccess, self.onSetSessionDescriptionError).then(function () {
	                if (emedia.supportPRAnswer) {
	                    var sdpSection = new SDPSection(desc.sdp);

	                    sdpSection.updateHeaderMsidSemantic("MS_0000");
	                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
	                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

	                    desc.sdp = sdpSection.getUpdatedSDP();
	                }

	                _logger.debug('Send Answer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed); //_logger.debug('from :\n' + desc.sdp);

	                (onCreateAnswerSuccess || self.onCreateAnswerSuccess)(desc);
	            });
	        }, onCreateAnswerError || self.onCreateSessionDescriptionError);
	    },

	    close: function close(remainLocalStream) {
	        var self = this;
	        _logger.warn("webrtc closing", "closed:", self._rtcId, self.__id, self.closed);

	        if (self.closed) {
	            return;
	        }

	        self.closed = true;

	        try {
	            self._rtcPeerConnection && self._rtcPeerConnection.close();
	        } catch (e) {
	            _logger.error(e);
	        } finally {

	            // if (!remainLocalStream && self._localStream) {
	            //     self._localStream.getTracks().forEach(function (track) {
	            //         track.stop();
	            //     });
	            //     self._localStream = null;
	            // }

	            if (self._remoteStream) {
	                self._remoteStream.getTracks().forEach(function (track) {
	                    track.stop();
	                });
	            }
	            self._remoteStream = null;

	            self.onClose && self.onClose();

	            _logger.warn("webrtc closed. closed:", self._rtcId, self.__id, self.closed);
	        }
	    },

	    addIceCandidate: function addIceCandidate(candidate) {
	        var self = this;

	        if (!self._rtcPeerConnection) {
	            return;
	        }

	        _logger.debug('Add ICE candidate: ', candidate, self._rtcId, self.__id, "closed:", self.closed);

	        var _cands = _util.isArray(candidate) ? candidate : [];
	        !_util.isArray(candidate) && _cands.push(candidate);

	        if (!self.__setRemoteSDP) {
	            Array.prototype.push.apply(self.__tmpRemoteCands || (self.__tmpRemoteCands = {}), _cands);

	            _logger.debug('Add ICE candidate but tmp buffer caused by not set remote sdp: ', candidate, self._rtcId, self.__id, "closed:", self.closed);
	            return;
	        }

	        for (var i = 0; i < _cands.length; i++) {
	            candidate = _cands[i];

	            self._rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(self.onAddIceCandidateSuccess, self.onAddIceCandidateError);
	        }
	    },

	    setRemoteDescription: function setRemoteDescription(desc) {
	        var self = this;

	        _logger.debug('setRemoteDescription start. ', desc, self._rtcId, self.__id, "closed:", self.closed);

	        desc.sdp = desc.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF");
	        _logger.debug('setRemoteDescription.', desc, "closed:", self.closed);

	        desc = new RTCSessionDescription(desc);

	        return self._rtcPeerConnection.setRemoteDescription(desc).then(function () {
	            self.__setRemoteSDP = true;
	            self.onSetRemoteSuccess.apply(self, arguments);

	            if (self.__tmpLocalCands && self.__tmpLocalCands.length > 0) {
	                _logger.debug('After setRemoteDescription. send cands', self._rtcId, self.__id, "closed:", self.closed);
	                self.onIceCandidate(self.__tmpLocalCands);

	                self.__tmpLocalCands = [];
	            }

	            if (self.__tmpRemoteCands && self.__tmpRemoteCands.length > 0) {
	                _logger.debug('After setRemoteDescription. add tmp cands', self._rtcId, self.__id, "closed:", self.closed);
	                self.addIceCandidate(self.__tmpRemoteCands);

	                self.__tmpRemoteCands = [];
	            }
	        }, self.onSetSessionDescriptionError);
	    },

	    iceConnectionState: function iceConnectionState() {
	        var self = this;

	        return self._rtcPeerConnection.iceConnectionState;
	    },

	    isConnected: function isConnected() {
	        var self = this;

	        var state = self._rtcPeerConnection.iceConnectionState;

	        return "connected" === state || "completed" === state;
	    },

	    _onGotRemoteStream: function _onGotRemoteStream(event) {
	        _logger.debug('onGotRemoteStream.', self._rtcId, self.__id, event);
	        this._remoteStream = event.stream;
	        this.onGotRemoteStream(this._remoteStream, event);

	        _logger.debug('received remote stream, you will see the other.', self._rtcId, self.__id, "closed:", this.closed);
	    },

	    onSetRemoteSuccess: function onSetRemoteSuccess() {
	        _logger.info('onSetRemoteSuccess complete', self._rtcId);
	    },

	    onSetLocalSuccess: function onSetLocalSuccess() {
	        _logger.info('setLocalDescription complete', self._rtcId);
	    },

	    onAddIceCandidateSuccess: function onAddIceCandidateSuccess() {
	        _logger.debug('addIceCandidate success', self._rtcId);
	    },

	    onAddIceCandidateError: function onAddIceCandidateError(error) {
	        _logger.debug('failed to add ICE Candidate: ' + error.toString(), self._rtcId);
	    },

	    onIceCandidate: function onIceCandidate(candidate) {
	        _logger.debug('onIceCandidate : ICE candidate: \n' + candidate, self._rtcId);
	    },

	    onIceStateChange: function onIceStateChange(event) {
	        _logger.debug('onIceStateChange : ICE state change event: ', self._rtcId);
	    },

	    onCreateSessionDescriptionError: function onCreateSessionDescriptionError(error) {
	        _logger.error('Failed to create session description: ' + error.toString(), self._rtcId);
	    },

	    onCreateOfferSuccess: function onCreateOfferSuccess(desc) {
	        _logger.debug('create offer success', self._rtcId);
	    },

	    onCreatePRAnswerSuccess: function onCreatePRAnswerSuccess(desc) {
	        _logger.debug('create answer success', self._rtcId);
	    },

	    onCreateAnswerSuccess: function onCreateAnswerSuccess(desc) {
	        _logger.debug('create answer success', self._rtcId);
	    },

	    onSetSessionDescriptionError: function onSetSessionDescriptionError(error) {
	        _logger.error('onSetSessionDescriptionError : Failed to set session description: ' + error.toString(), self._rtcId);
	    },

	    onSetLocalSessionDescriptionSuccess: function onSetLocalSessionDescriptionSuccess() {
	        _logger.debug('onSetLocalSessionDescriptionSuccess : setLocalDescription complete', self._rtcId);
	    },

	    onGotRemoteStream: function onGotRemoteStream(remoteStream) {
	        _logger.debug("Got remote stream. ", remoteStream, self._rtcId);
	    }
	});

	module.exports = _WebRTC;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _util = __webpack_require__(5);

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
	module.exports = _util.prototypeExtend({ //type 0 AVpub 1 Desktop 2 Sub
	    Update: _util.prototypeExtend({

	        ifAoff: function ifAoff(update) {
	            this.if("aoff", update);
	        },

	        ifVoff: function ifVoff(update) {
	            this.if("voff", update);
	        },

	        ifMediaStream: function ifMediaStream(update) {
	            this.if("mediaStream", update);
	        },

	        if: function _if(key, update) {
	            if (typeof this[key] === "undefined") {
	                return;
	            }

	            update(this[key]);
	        }
	    }),

	    located: function located() {
	        return this._located || false;
	    },

	    webrtc: function webrtc(_webrtc) {
	        _webrtc && (this._webrtc = _webrtc);
	        return this;
	    },

	    getMediaStream: function getMediaStream() {
	        return this._located ? this._localMediaStream : this._webrtc && this._webrtc.getRemoteStream();
	    },

	    ifMediaStream: function ifMediaStream(update) {
	        if (typeof this.mediaStream !== "undefined") {
	            update(this.mediaStream);
	            return;
	        }

	        if (this._located && typeof this._localMediaStream !== "undefined") {
	            update(this._localMediaStream);
	            return;
	        }

	        if (!this._located && this._webrtc && typeof this._webrtc.getRemoteStream() !== "undefined") {
	            update(this._webrtc.getRemoteStream());
	            return;
	        }
	    },

	    getHtmlDOMID: function getHtmlDOMID() {
	        return "_m_" + this.owner.id + "_s_" + this.id;
	    }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	var _util = __webpack_require__(5);
	var _logger = _util.tagLogger("Handler");

	var __event = __webpack_require__(50);

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
	    onEvent: function onEvent(evt) {
	        var self = this;

	        evt && _logger.warn("[EVT]", evt.message(), evt.hidden || "");

	        if (evt instanceof __event.ServerRefuseEnter) {
	            evt.failed && evt.failed === -95270 && (evt.failed = -9527);
	        }

	        function afterNotify() {
	            try {
	                self.handleEvent(evt);
	            } catch (e) {
	                _logger.error(e);
	            }
	        }

	        if (evt instanceof emedia.event.StreamState && evt.stream && evt.stream.located()) {
	            afterNotify();
	            return;
	        }

	        try {
	            evt.hidden || self.onNotifyEvent && self.onNotifyEvent(evt);
	        } finally {
	            afterNotify();
	        }
	    },

	    handleEvent: function handleEvent(evt) {
	        var self = this;

	        if (evt instanceof __event.RecvResponse) {
	            self._onRecvResponse(evt);
	        } else if (evt instanceof __event.ServerRefuseEnter) {
	            _logger.warn("Server refuse, ", evt.failed, evt.msg);
	            self.onServerRefuseEnter(evt);
	        } else if (evt instanceof __event.EnterFail) {
	            _logger.warn("Enter fail, result = ", evt.failed);
	            self.onEnterFail();
	        } else if (evt instanceof __event.WSClose) {
	            //_logger.warn("Websocket closed");
	            self.onWSClose();
	        } else if (evt instanceof __event.WSConnected) {
	            _logger.warn("Websocket connected");
	        } else if (evt instanceof __event.ICEConnected) {
	            var webrtc = evt.webrtc;
	            self.onICEConnected(webrtc);
	        } else if (evt instanceof __event.ICEConnectFail) {
	            var webrtc = evt.webrtc;
	            self.onICEConnectFail(webrtc);
	        } else if (evt instanceof __event.ICEDisconnected) {
	            //只要ICE断开
	            var webrtc = evt.webrtc;
	            self.onICEDisconnected(webrtc);
	        } else if (evt instanceof __event.ICEClosed) {
	            //只要ICE断开
	            var webrtc = evt.webrtc;
	            self.onICEClosed(webrtc);
	        } else if (evt instanceof __event.ICERemoteMediaStream) {
	            self.onICERemoteMediaStream(evt.webrtc);
	        } else if (evt instanceof __event.PushSuccess) {
	            self._cacheStreams[evt.stream.id] = self._linkedStreams[evt.stream.id] = evt.stream;

	            var _stream = self.newStream(evt.stream);

	            if (evt.hidden && !self._maybeNotExistStreams[evt.stream.id] && !_stream.isRepublished) {
	                self.onAddStream(_stream);
	                return;
	            }

	            if (self.isSafari()) {
	                emedia._isSafariYetPushedStream = true;
	            }

	            try {
	                _stream && (_stream.mediaStream = _stream.getMediaStream());
	                _stream && self.onUpdateStream(_stream, new _stream.Update({ voff: _stream.voff, aoff: _stream.aoff, mediaStream: _stream.mediaStream }));
	            } finally {
	                if (self.isSafari()) {
	                    _util.forEach(self._cacheStreams, function (_sid, _stream) {
	                        if (_stream._autoSubWhenPushStream === true) {
	                            _util.removeAttribute(_stream, "_autoSubWhenPushStream");
	                            self.createWebrtcAndSubscribeStream(_stream.id);
	                        }
	                    });
	                }
	            }
	        } else if (evt instanceof __event.SubSuccess) {
	            self._linkedStreams[evt.stream.id] = evt.stream;
	            evt.stream._zoom = 1;
	        } else if (evt instanceof __event.PushFail) {
	            if (evt.hidden !== true) {
	                var _removeStream = _util.removeAttribute(self._linkedStreams, evt.stream.id);

	                if (_removeStream) {
	                    var _stream = self.newStream(evt.stream);
	                    self.onRemoveStream(_stream);
	                }
	            }
	        } else if (evt instanceof __event.SubFail) {
	            if (evt.hidden !== true) {
	                delete self._linkedStreams[evt.stream.id];

	                var _stream = self.newStream(evt.stream);
	                _stream.rtcId = undefined;
	                _stream._webrtc = undefined;
	                _stream.mediaStream = null;

	                self.onUpdateStream(_stream, new _stream.Update(_stream));
	            }
	        } else if (evt instanceof __event.SubFailNotSupportVCodes) {
	            // Server发现 此订阅时 不支持视频视频编码。或者 推送流 打开视频时，并不是所有的订阅端 都支持此视频编码
	            // Server保持这个channel，客户端自行处理

	            var stream = evt.stream;

	            _logger.warn("Rtc donot support pub VCodes. close. sub fail.", stream.rtcId, " -> ", stream.id);
	            try {
	                self.onNotSupportPublishVideoCodecs && self.onNotSupportPublishVideoCodecs(stream);
	            } catch (e) {
	                _logger.error(e);
	            }

	            // var streamId = stream.id;
	            //
	            // var webrtc = self._getWebrtc(streamId);
	            // if(webrtc && webrtc.isConnected()){
	            //     self.subscribeStream(webrtc._rtcId, streamId, undefined, {subSVideo: false, subSAudio: true});
	            //     return;
	            // }
	        } else if (evt instanceof __event.EnterSuccess) {
	            self.onEnterSuccess();
	        } else if (evt instanceof __event.SwitchVCodes) {
	            var stream = evt.stream;
	            var useVCodes = evt.useVCodes;
	            var webrtc = stream._webrtc;
	            _logger.warn("Rtc switch VCodes. ", stream.id, useVCodes);

	            if (!useVCodes || useVCodes.length == 0) {
	                _logger.warn("Rtc switch VCodes. error! useVCodes is empty ", stream.id, useVCodes);
	            }

	            if (webrtc && webrtc.optimalVideoCodecs) {
	                if (typeof webrtc.optimalVideoCodecs === 'string' && webrtc.optimalVideoCodecs == useVCodes[0]) {
	                    _logger.warn("Rtc switch VCodes. igrone . useVCodes == optimalVideoCodecs ", stream.id, webrtc._rtcId, useVCodes);
	                    return;
	                }
	                if (_util.isArray(webrtc.optimalVideoCodecs) && webrtc.optimalVideoCodecs.length > 0 && webrtc.optimalVideoCodecs[0] == useVCodes[0]) {
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

	    _onRecvResponse: function _onRecvResponse(evt) {
	        var self = this;

	        var request = evt.request;
	        var response = evt.response;

	        // if(!request && response.result !== 0 && response.op === 1001 && !response.tsxId){
	        //     _logger.error("Exit. server error. rspMessage tsxId undefined. when response = ", response);
	        //     self.onServerRefuseEnter({failed: response.result, msg: "rspMessage tsxId undefined"});
	        //
	        //     return;
	        // }

	        //_logger.debug("Server recv request = ", request, response);
	        if (request && response && request.op !== 200 && response.result !== 0) {
	            _logger.error("Server refuse. when request = ", request);

	            var failed = evt.failed;
	            switch (failed) {
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

	    onServerRefuseEnter: function onServerRefuseEnter(evt) {
	        var self = this;

	        var failed = evt.failed;
	        switch (failed) {
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

	    onEnterFail: function onEnterFail() {
	        var self = this;

	        if (self.__getCopyInterval) {
	            clearInterval(self.__getCopyInterval);
	        }
	    },

	    onEnterSuccess: function onEnterSuccess() {
	        var self = this;

	        setTimeout(function () {
	            self._failIcesRebuild();
	        }, 200);

	        if (self.getCopyIntervalMillis && self.getCopyIntervalMillis > 0) {
	            _logger.warn("Run interval get copy. interval = ", self.getCopyIntervalMillis);

	            if (self.__getCopyInterval) {
	                clearInterval(self.__getCopyInterval);
	            }

	            self.__getCopyInterval = setInterval(function () {
	                if (self._session.connected()) {
	                    self._sysCopy.apply(self);
	                } else {
	                    _logger.warn("Warn! cannot get copy. cause offline.");

	                    self.__getCopyInterval && clearInterval(self.__getCopyInterval);
	                }
	            }, self.getCopyIntervalMillis);
	        }
	    },

	    onWSClose: function onWSClose() {
	        var self = this;
	        if (self.__getCopyInterval) {
	            clearInterval(self.__getCopyInterval);
	        }

	        _logger.info("Websocket closed.");
	    },

	    onICEDisconnected: function onICEDisconnected(webrtc) {
	        var self = this;

	        self.__networkWeakInterval && clearTimeout(self.__networkWeakInterval);
	        self.__networkWeakInterval = setTimeout(function () {
	            self.onNetworkWeak && self.onNetworkWeak();
	        }, 1000);

	        _util.forEach(self._linkedStreams, function (sid, stream) {
	            if (stream.rtcId == webrtc.getRtcId()) {
	                var problemStream;
	                if (!(problemStream = self._maybeNotExistStreams[sid])) {
	                    problemStream = self._maybeNotExistStreams[sid] = _util.extend({}, stream);
	                    problemStream.iceRebuildCount = 1;
	                }

	                _logger.info("Stream maybe not exist. caused by disconnected", stream.id);
	            }
	        });
	    },

	    onICEConnectFail: function onICEConnectFail(webrtc) {
	        var self = this;

	        for (var sid in self._linkedStreams) {
	            var stream = self._linkedStreams[sid];
	            if (stream.rtcId == webrtc.getRtcId()) {
	                if (stream._webrtc && stream._webrtc.__id !== webrtc.__id) {
	                    _logger.warn("Stream use other webrtc rtcId = ", stream.rtcId, ", id: ", stream._webrtc.__id, webrtc.__id);
	                    continue;
	                }

	                var problemStream;
	                if (!(problemStream = self._maybeNotExistStreams[sid])) {
	                    problemStream = self._maybeNotExistStreams[sid] = _util.extend({}, stream);
	                    problemStream.iceRebuildCount = 1;
	                }

	                if (problemStream) {
	                    var _evt = new __event.StreamState({ stream: problemStream });
	                    _evt.iceFail();

	                    self.onEvent(_evt);
	                }

	                _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " problem stream is ", problemStream.iceRebuildCount, problemStream.id);

	                if (problemStream.iceRebuildCount > emedia.config.iceRebuildCount) {
	                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " rebuild fail. problem stream is ", problemStream.id);

	                    if (problemStream.located()) {
	                        self.onEvent(new __event.PushFail({
	                            stream: stream,
	                            cause: "pub ice rebuild failed."
	                        }));
	                    } else {
	                        self.onEvent(new __event.SubFail({
	                            stream: stream,
	                            cause: "sub ice rebuild failed."
	                        }));
	                    }
	                    self.closeWebrtc(webrtc.getRtcId(), false);
	                } else {
	                    var recording = self._records[problemStream.id];

	                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuild. remain local stream. ", problemStream.id);
	                    self.closeWebrtc(webrtc.getRtcId(), true);

	                    if (recording) {
	                        self._records[problemStream.id] = recording;
	                    }

	                    setTimeout(function () {
	                        self.iceRebuild(problemStream);
	                    }, emedia.config.iceRebuildIntervalMillis);

	                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuild. problem stream is ", problemStream.id);
	                }
	            }
	        }
	    },

	    onICEClosed: function onICEClosed(webrtc) {
	        var self = this;

	        // _util.forEach(self._linkedStreams, function (streamId, _stream) {
	        //     if(_stream.rtcId == webrtc.getRtcId() &&_util.removeAttribute(self._linkedStreams, _stream.id)){
	        //         _logger.info("ice closed. closed webrtc = ", webrtc.getRtcId(), "remove linked stream = ", _stream.id);
	        //     }
	        // });

	        if (webrtc.closed) {
	            _logger.warn("Webrtc will be removed. by __id = ", webrtc.__id, ", rtcId = ", webrtc.getRtcId());
	            var removedWebrtc = _util.removeAttribute(self._ices, webrtc.__id);
	            if (removedWebrtc) {
	                _logger.warn("Webrtc removed. by id = ", removedWebrtc.__id, ", rtcId = ", removedWebrtc.getRtcId());
	            } else {
	                _logger.warn("Webrtc removed. by id = ", webrtc.__id, ", rtcId = ", webrtc.getRtcId());
	            }

	            var webrtc22 = self._ices[webrtc.getRtcId()];
	            if (webrtc22 && webrtc22.__id === removedWebrtc.__id) {
	                removedWebrtc = _util.removeAttribute(self._ices, webrtc.getRtcId());
	                _logger.warn("Webrtc removed. by rtcId = ", removedWebrtc.getRtcId(), ", __id = ", removedWebrtc.__id);
	            }
	        } else {
	            _logger.info("ICE self closed. not allow. will rebuild", webrtc.getRtcId());
	            self.onICEConnectFail(webrtc);
	        }
	    },

	    onICEConnected: function onICEConnected(webrtc) {
	        var self = this;

	        _util.forEach(self._cacheStreams, function (sid, stream) {
	            if (stream.rtcId == webrtc.getRtcId()) {
	                if (self._maybeNotExistStreams[sid]) {
	                    _util.removeAttribute(self._maybeNotExistStreams, stream.id);
	                    self._linkedStreams[sid] = stream;

	                    _logger.info("ice reconnected. webrtc = ", webrtc.getRtcId(), "will update stream = ", stream.id);
	                    //stream.located() && self.onUpdateStream(self._linkedStreams[stream.id]);
	                    //self.onUpdateStream(self._linkedStreams[stream.id]);

	                    var _recordStream = self._records[stream.id];
	                    if (_recordStream && _recordStream.rtcId !== stream.rtcId) {
	                        //在重连后，恢复录制
	                        //self.stopRecord(_recordStream);
	                        self.startRecord(stream);
	                        _logger.warn("Re record. for ", stream.id, ", after rebuild ice.", _recordStream.rtcId, "->", stream.rtcId);
	                    }
	                } else {
	                    _logger.info("ice connected. webrtc = ", webrtc.getRtcId(), stream.id);

	                    stream.located() && self.onEvent(new __event.PushSuccess({ stream: stream }));
	                    stream.located() || self.onEvent(new __event.SubSuccess({ stream: stream }));
	                }
	            }
	        });
	    },

	    onICERemoteMediaStream: function onICERemoteMediaStream(webrtc) {
	        var self = this;

	        var streams = [];
	        _util.forEach(self._cacheStreams, function (sid, _stream) {
	            if (_stream.rtcId == webrtc.getRtcId() && !_stream.located()) {
	                var _stream = self.newStream(_stream);
	                _stream.mediaStream = _stream.getMediaStream();

	                self._updateRemoteStream(_stream, _stream.mediaStream);
	                self.onUpdateStream(_stream, new _stream.Update({ mediaStream: _stream.mediaStream }));
	            }
	        });
	    },

	    _failIcesRebuild: function _failIcesRebuild() {
	        var self = this;

	        var count = 1;
	        _util.forEach(self._maybeNotExistStreams, function (streamId, stream) {
	            setTimeout(function () {
	                self.iceRebuild(stream);
	            }, count * 100);
	        });
	    },

	    iceRebuild: function iceRebuild(stream) {
	        var self = this;

	        if (!self.connected()) {
	            stream.iceRebuildCount = 1;
	            _logger.warn("Websocket disconnect. waiting. rebuild count reset", stream.iceRebuildCount, stream.id);
	            return;
	        }
	        if (!self._linkedStreams[stream.id] || !self._cacheStreams[stream.id]) {
	            _logger.info("ice rebuild fail. it yet closed. stream is ", stream.id, stream.rtcId);
	            _util.removeAttribute(self._maybeNotExistStreams, stream.id);
	            _util.removeAttribute(self._linkedStreams, stream.id);
	            return;
	        }

	        if (stream.iceRebuildCount > emedia.config.iceRebuildCount) {
	            _logger.info("ice rebuild fail. count too many. stream is ", stream.id);

	            if (stream.located()) {
	                self.onEvent(new __event.PushFail({
	                    stream: stream,
	                    cause: "pub ice rebuild failed."
	                }));
	            } else {
	                self.onEvent(new __event.SubFail({
	                    stream: stream,
	                    cause: "sub ice rebuild failed."
	                }));
	            }
	        } else if (self.connected()) {
	            _logger.info("ice try rebuild. count", stream.iceRebuildCount, ". stream is ", stream.id);
	            self.rebuildIce(stream);

	            stream.iceRebuildCount++;
	        } else {
	            _logger.warn("ice rebuild. stop. cause by not websocket disconnect", stream.id);
	        }
	    },

	    rebuildIce: function rebuildIce(stream) {
	        var self = this;

	        if (!self._cacheStreams[stream.id]) {
	            _logger.warn("Begin rebuild ice. not found stream at local", stream.iceRebuildCount, stream.id);
	            return;
	        }
	        _logger.warn("Begin rebuild ice ", stream.iceRebuildCount, stream.id);

	        if (stream.located()) {
	            stream.isRepublished = true;
	            self.push(stream, undefined, undefined, true);
	        } else {
	            self.createWebrtcAndSubscribeStream(stream.id);
	        }
	        _logger.warn("Finish rebuild ice ", stream.iceRebuildCount, stream.id, self._cacheStreams[stream.id].rtcId);
	    },

	    _sysCopy: function _sysCopy() {
	        var self = this;

	        var copyMessage = self.newMessage().setOp(1000).setCver(self._cver || 0);

	        self.postMessage(copyMessage, function (rsp) {
	            if (rsp.result != 0) {
	                _logger.error("Get copy fail. result = ", rsp.result);

	                return;
	            }

	            if ((self._cver || 0) < rsp.cver) {
	                self._cver = rsp.cver;

	                self.onMembers(rsp.cver, rsp.mems || {});
	                self.onStreams(rsp.cver, rsp.streams || {});

	                _logger.info("Got copy success.");
	            }
	        });
	    }
	});

	module.exports = Handler;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	
	var _util = __webpack_require__(5);
	var _logger = _util.tagLogger("Desktop");

	var __event = __webpack_require__(50);

	window.__shareDesktopMessageCount__ = 0;

	module.exports = _util.prototypeExtend({

	    __RTC_PAGE_MSG_TYPE__: 'RTC-SD-PAGE',
	    __RTC_EXT_MSG_TYPE__: 'RTC-SD-EXT',

	    __init__: function __init__() {
	        var self = this;

	        self.__extLoaded = self.rsdExtLoaded();
	        if (self.__extLoaded) {
	            self.__onRsdExtLoad();
	        }

	        window.addEventListener("load", function (event) {
	            if (self.__extLoaded) {
	                return;
	            }

	            var exist = self.rsdExtLoaded();
	            // console.log('exist=', exist, ', ev4detect=', ev4detect);

	            self.__extLoaded = exist;
	        });

	        window.addEventListener('message', function (event) {
	            if (!event.data) {
	                return;
	            }

	            var msg = event.data;
	            if (!msg.type || msg.type !== self.__RTC_EXT_MSG_TYPE__ || !msg.evname) {
	                return;
	            }
	            _logger.info('got ext-msg: ', msg);

	            if (msg.evname === 'extLoaded') {
	                if (!self.__extLoaded) {
	                    self.__extLoaded = true;

	                    setTimeout(self.__onRsdExtLoad(), 50);
	                }

	                return;
	            }

	            self.__onMessage(msg);
	        });
	    },

	    rsdExtLoaded: function rsdExtLoaded() {
	        var existele = document.getElementById('RTC-Share-Deskto-installed-ele-rat1abrr');
	        return existele ? true : false;
	    },

	    __sendMessage: function __sendMessage(msg, callback) {
	        var self = this;

	        var tsxId = 'tsx_' + __shareDesktopMessageCount__++ + '_' + Math.random().toString(36).substr(2, 4);

	        if (!self.__extLoaded) {
	            throw "Rtc share desktop not loaded";
	        }

	        msg.tsxId = tsxId;

	        self["on_" + tsxId] = function () {
	            callback && callback.apply(self, arguments);

	            delete self["on_" + tsxId];
	        };

	        window.postMessage && window.postMessage(msg, '*');
	    },

	    __onMessage: function __onMessage(msg) {
	        var self = this;

	        var tsxId = msg.tsxId;

	        self["on_" + tsxId] && self["on_" + tsxId](msg);
	        //self["on_" + tsxId] || _logger.info(msg);
	    },

	    __onRsdExtLoad: function __onRsdExtLoad() {
	        var self = this;

	        self.onExtLoaded && self.onExtLoaded();
	    },

	    openDesktopMedia: function openDesktopMedia(screenOptions, callback) {
	        var self = this;

	        if (!self.__extLoaded || !self.rsdExtLoaded()) {
	            callback(new __event.ShareDesktopExtensionNotFound());
	            return;
	        }

	        var msg = { type: self.__RTC_PAGE_MSG_TYPE__, evname: 'chooseDesktopMedia', screenOptions: screenOptions };
	        self.__sendMessage(msg, function (m) {
	            if (m.evname === 'onAccessApproved' && m.streamId) {
	                callback(new __event.OpenDesktopMedia({ desktopStreamId: m.streamId }));
	            } else {
	                callback(new __event.OpenDesktopMediaAccessDenied());
	            }
	        });
	    }
	});

/***/ }
/******/ ]);