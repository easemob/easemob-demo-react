//console.  emedia.__easemob_current_mservice.current

window.emedia = window.emedia || {};

;(function (root, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.emedia = factory();
    }
}(this, function () {
    'use strict';

    return emedia;
}));



var util = emedia.util = require('./components/Util');


(function requireWebrtcAdapter() {
    var adapter = require('./_adapter/_Adapter.import');
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

    getCopyIntervalMillis: 17000,
    checkConnectIntervalMillis: 1000,

    iceRebuildCount: 3,
    iceRebuildIntervalMillis: 500,

    enterTimeout: 20000
});



var Service = require('./components/Service');
var __event = require('./components/event');

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

    acptOps:[
        1003 //透传消息
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

