if (typeof Promise === 'undefined') {
    window.Promise = require("bluebird");
}

var adapter = require('./Temasys.adapter'); //6.0.3

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
adapter.onwebrtcready = function(isUsingPlugin) {
    if(adapter.webrtcDetectedType === 'plugin') {
        readyScreenShare && readyScreenShare(adapter);
        promiseApiWrapper(adapter);
        simulateScreenSharePlugin(adapter);
    }
};

module.exports = adapter;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.attachMediaStream || (window.attachMediaStream = function(element, stream) {
    element.srcObject = stream;
    return element;
});
window.reattachMediaStream || (window.reattachMediaStream = function(to, from) {
    to.srcObject = from.srcObject;
    return to;
});


function promiseApiWrapper(adapter) {
    if(typeof window.RTCPeerConnection === 'undefined'){
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

    ['createOffer', 'createAnswer'].forEach(function(method) {
        window.RTCPeerConnection.prototype[method] = function() {
            var self = this;

            var pc = self._nativeRTCPeerConnection;
            var args = arguments;

            var isLegacyCall = arguments.length &&
                typeof arguments[0] === 'function';

            if (isLegacyCall) {
                var obj = pc[method](args[0], rgs[1], arguments[2]);
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
            var args = arguments;

            var isLegacyCall = arguments.length &&
                typeof arguments[0] === 'function';

            if (isLegacyCall) {
                var obj = pc[method](args[0], rgs[1], arguments[2]);
                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;

                return obj;
            }

            return new Promise(function(resolve, reject) {
                pc[method](args[0], resolve, reject);
                self.iceConnectionState = self._nativeRTCPeerConnection.iceConnectionState;
            });
        };
    });
}

function readyScreenShare(adapter) {
    var baseGetUserMedia = window.navigator.getUserMedia;

    var clone = function(obj) {
        if (null === obj || 'object' !== typeof obj) {
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

    var checkIfConstraintsIsValid = function (constraints, successCb, failureCb) {
        // Append checks for overrides as these are mandatory
        // Browsers (not Firefox since they went Promise based) does these checks and they can be quite useful
        if (!(constraints && typeof constraints === 'object')) {
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

            adapter.WebRTCPlugin.callWhenPluginReady(function() {
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
        navigator.mediaDevices.getUserMedia = function(constraints) {
            return new Promise(function(resolve, reject) {
                try {
                    window.navigator.getUserMedia(constraints, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        };
    }
}


if(adapter.webrtcDetectedType === 'plugin') {
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

        if(!event.data) return;
        if(!event.data.type || event.data.type !== RTC_PAGE_MSG_TYPE) return;
        if(!event.data.evname) return;

        console.log('rtc-sd-content: forward data=', event.data);

        var screenOptions = event.data.screenOptions;

        adapter.WebRTCPlugin.callWhenPluginReady(function() {
            if(!adapter.WebRTCPlugin.plugin.HasScreensharingFeature || !adapter.WebRTCPlugin.plugin.isScreensharingAvailable) {
                console.warn("Warn!! screensharing feature is not available");
                return window.postMessage({type:RTC_EXT_MSG_TYPE, evname:'onAccessDenied', tsxId:event.data.tsxId, errorMessage: "screensharing feature is not available"}, '*');
            }

            return window.postMessage({type:RTC_EXT_MSG_TYPE, evname:'onAccessApproved', streamId: (seqno++) + "", tsxId:event.data.tsxId}, '*');
        });
    });
}


