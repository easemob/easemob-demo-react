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