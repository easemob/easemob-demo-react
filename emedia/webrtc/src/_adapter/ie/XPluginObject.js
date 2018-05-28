var _util = require('../../components/Util');

var RTCError = require("./RTCError");
var RTCSessionDescription = require('./RTCSessionDescription');
var RTCIceCandidate = require('./RTCIceCandidate');
var MediaStream = require('./MediaStream');
var MediaStreamTrack = require('./MediaStreamTrack');
var RTCStatsReport = require('./RTCStatsReport');

var RTCPeerConnection = require('./RTCPeerConnection');
var MediaDevices = require('./MediaDevices');

var XVideo = require('./XVideoObject');


var _logger = _util.tagLogger("IE.plugin");

var hasMatch = /\brv[ :]+(\d+)/g.exec(navigator.userAgent) || [];
var webrtcDetectedVersion   = parseInt(hasMatch[1], 10);

var globalPluginSeqno = 0;
var plugins = emedia.__ieWebrtcPlugins__ = (emedia.__ieWebrtcPlugins__ || {});

var State = {
    NONE : 0,           // no plugin use
    INITIALIZING : 1,   // Detected need for plugin
    INJECTING : 2,      // Injecting plugin
    INJECTED: 3,        // Plugin element injected but not usable yet
    READY: 4
};

var Plugin = _util.prototypeExtend({
    id: _util.list("plugin", globalPluginSeqno++).join("_"),
    classid: 'clsid:8b9cc1b7-2703-44bc-a317-a025b24b7464',
    width: 0,
    height: 0,

    cbScrpitTags: [],
    pcs: {},

    // params: {},
    param: function (name, value) {
        (this.params || (this.params = {}))[name] = value;
        return this;
    },

    release: function () {
        removePlugin(this);
    }
});

function paramsHTMLTag(params) {
    var html = "";
    _util.forEach(params, function (param, value) {
        html += _util.list("<param name='", param, "'", "value='", value, "'", "/>").join(" ");
    });

    return html;
}

function inject(plugin) {
    // only inject once the page is ready
    if (document.readyState !== 'interactive' && document.readyState !== 'complete') {
        return;
    }

    var plugin = plugins[plugin.id];
    if(!plugin){
        throw "Require plugin."
    }

    if (plugin.state !== State.INJECTING) {
        return;
    }

    if (webrtcDetectedVersion <= 10) {
        //"<object id=\"WebRtcPlugin\" classid=\"clsid:8b9cc1b7-2703-44bc-a317-a025b24b7464\" width=\"0\" height=\"0\"></object>"
        plugin.innerHTML = _util.list('<object id="', plugin.id, '"',
            'classid="', plugin.classid, '"',
            'width="', plugin.width, '"',
            'height="', plugin.height, '"', '/>').join(" ");

        plugin.tag = document.getElementById(plugin.id);

        if(plugin.params){
            var pluginObject = plugin.tag.getElementById("#" + plugin.id);
            pluginObject.innerHTML = paramsHTMLTag(plugin.params);
        }
    } else {
        plugin.tag = document.createElement('object');
        plugin.tag.id = plugin.id;
        plugin.tag.classid =plugin.classid;
        plugin.tag.width = '0px';
        plugin.tag.height = '0px';

        if(plugin.params){
            var pluginObject = plugin.tag.getElementById("#" + plugin.id);
            plugin.tag.innerHTML = paramsHTMLTag(plugin.params);
        }
    }

    document.body.appendChild(plugin._xobj = plugin.tag);

    plugin.state = State.INJECTED;

    return plugin;
}

function setXObjCallback(plugin, callback, eventAttr){
    eventAttr = (eventAttr || callbackname);

    var callbackname = "__easemob_ie_webrtc_plugin_" + plugin.id + "$" + eventAttr;
    var callbackScrpit = document.getElementById("#" + callbackname);
    if(callbackScrpit){
        return;
    }

    callbackScrpit = document.createElement("script");
    callbackScrpit.language = "javascript";
    callbackScrpit.for = plugin.id;
    callbackScrpit.event = eventAttr + "()";
    callbackScrpit.innerHTML = callbackname + "()";

    window[callbackname] = callback.bind(plugin);

    plugin.cbScrpitTags.push(callbackScrpit);

    document.body.appendChild(callbackScrpit);
}

function removePlugin(plugin) {
    plugin.tag && document.removeChild(plugin.tag);
    plugin.tag === undefined;

    _util.forEach(plugin.cbScrpitTags, function (_index, cbTag) {
        cbTag && document.removeChild(cbTag);
    });
    plugin.cbScrpitTags = [];
}

function isPluginInstalled(clsid, installedCb, notInstalledCb) {
    try {
        var shellObj = new ActiveXObject("WScript.Shell");
        var progid = shellObj.RegRead("HKEY_CLASSES_ROOT\\CLSID\\{"+clsid+"}\\ProgID\\");

        var axo = new ActiveXObject(progid);

        installedCb && installedCb();
        return true;
    } catch (e) {
        notInstalledCb && notInstalledCb();
        return false;
    }
}

module.exports = Plugin = Plugin.extend({
    XVideo: XVideo,

    RTCSessionDescription: RTCSessionDescription,
    RTCIceCandidate: RTCIceCandidate,
    MediaStream: MediaStream,
    MediaStreamTrack: MediaStreamTrack,
    RTCStatsReport: RTCStatsReport,
    RTCError: RTCError,

    MediaDevices: function () {
        var self = this;
        return function () {
            return new MediaDevices(self);
        }
    },

    RTCPeerConnection: function (pcConfig, pcConstraints) {
        var self = this;
        return function (pcConfig, pcConstraints) {
            return new RTCPeerConnection(self, pcConfig, pcConstraints);
        }
    },

    attachMediaStream: function (videoTag, stream) {
        var xvideo = new XVideo({width: videoTag.width, height: videoTag.height});
        xvideo.replace(videoTag);

        stream._attachToXVideo = xvideo;
        xvideo._xobj && xvideo._xobj.AttachToWindow(xvideo._xobj.GetRtcWindow(), stream._xobj);
    }
});


Plugin.isPluginInstalled = isPluginInstalled;
Plugin.remove = removePlugin;

Plugin.get = function (id) {
    return id ? plugins[id] : (function () {
        var p;
        _util.forEach(plugins, function (key, val) {
            if(p){
                throw "Plugin load mn";
            }
            p = val;
        })

        return p;
    })();
};

Plugin.load = function (plugin, success, error) {
    var _p;
    if((_p = Plugin.get(plugin.id)) && _p.state !== State.NONE){
        throw "Plugin has been load. or loading. " + plugin.id;
    }

    plugins[plugin.id] = plugin;

    plugin.state = State.INJECTING;

    inject(plugin);
    plugin.state = State.INJECTED;

    plugin.state = State.INITIALIZING;

    _util.forEach(xObjCallbacks, function (eventAttr, callback) {
        setXObjCallback(plugin, callback, eventAttr);
    });

    plugin.mediaDevices = new MediaDevices(plugin);

    plugin.state = State.READY;
}

Plugin.factory = function (cfg) {
    var plugin = new Plugin(cfg || {});
    Plugin.load(plugin);

    return plugin;
}

Plugin.single = function (success, error, cfg) {
    var plugin;
    while (!(plugin  = Plugin.get())){
        plugin = new Plugin(cfg || {});
        plugins[plugin.id] = plugin;
    }

    while(true){
        if(isPluginInstalled(plugin.classid)){
            error("Not found ActiveXObject:" + plugin.classid);
            return;
        }
        switch(plugin.state){
            case undefined:
            case State.NONE:
                Plugin.load(plugin);
                break;
            case State.INJECTING:
            case State.INJECTED:
            case State.INJECTING:
                break;
            case State.READY:
                success(plugin);
                return plugin;
            default:
                error("Unkown state " + plugin.state);
                return;
        }
    }
}


function defaultOnError(pcId, seqno, BstrError) {
    _logger.info("Plugin", this.id, pcId, seqno, BstrError);

    var pc = this.pcs[pcId];

    var error = JSON.parse(BstrError);
    var event = new RTCError(error);

    pc._error(seqno, event);
}

var xObjCallbacks = {
    // this is plugin

    onAddstream: function onAddstream(pcId, stream) {
        _logger.info("Plugin", this.id, "onAddstream", pcId, stream);

        var ms = new MediaStream({
            id: pcId + "_s" + stream.id,
            _xobj: stream,
        });

        var pc = this.pcs[pcId];

        pc.remoteStreams = [ms];
        pc.onaddstream && pc.onaddstream({stream: ms});
    },

    onIceCandidate: function onIceCandidate(pcId, BstrIceCandidate) {
        _logger.info("Plugin", this.id, "onIceCandidate", pcId, BstrIceCandidate);

        var pc = this.pcs[pcId];

        var _xcand = JSON.parse(BstrIceCandidate);
        var rtcIceCandidate = new RTCIceCandidate(_xcand);

        pc.onicecandidate && pc.onicecandidate({candidate: rtcIceCandidate});
    },

    //new checking connected completed failed disconnected closed
    onIceConnectionStateChange: function onIceConnectionStateChange(pcId, nowState, oldState) {
        _logger.info("Plugin", this.id, "onIceConnectionStateChange", pcId, nowState, oldState);

        var pc = this.pcs[pcId];
        pc.iceConnectionState = nowState;

        pc.oniceconnectionstatechange && pc.oniceconnectionstatechange({target: {iceConnectionState: nowState}});
    },

    onCreateSessionDescription: function onCreateSessionDescription(pcId, seqno, BstrDesc) { //onCreateOfferSuccess
        _logger.info("Plugin", this.id, "onRTCSessionDescriptionCreate", pcId, seqno, BstrDesc);

        var pc = this.pcs[pcId];
        var descJSON = JSON.parse(BstrDesc);

        var description = new RTCSessionDescription({
            sdp: descJSON.sdp,
            type: descJSON.type
        });

        switch(descJSON.type){
            case "offer":
                pc._success(seqno, description);
                break;
            case "answer":
                pc._success(seqno, description);
                break;
            default:
                throw "Unknow sdp type " + descJSON.type;
        }
    },

    onSetLocalDescriptionSuccess: function onSetLocalDescriptionSuccess(pcId, seqno) {
        _logger.info("Plugin", this.id, "onSetLocalDescriptionSuccess", pcId, seqno);

        var pc = this.pcs[pcId];
        pc._success(seqno);
    },

    onSetRemoteDescriptionSuccess: function onSetRemoteDescriptionSuccess(pcId, seqno) {
        _logger.info("Plugin", this.id, "onSetRemoteDescriptionSuccess", pcId, seqno);

        var pc = this.pcs[pcId];
        pc._success(seqno);
    },

    onAddIceCandidateSuccess: function onAddIceCandidateSuccess(pcId, seqno) {
        _logger.info("Plugin", this.id, "onAddIceCandidateSuccess", pcId, seqno);

        var pc = this.pcs[pcId];
        pc._success(seqno);
    },


    onCreateSessionDescriptionError: defaultOnError,
    onSetLocalDescriptionError: defaultOnError,
    onSetRemoteDescriptionError: defaultOnError,
    onAddIceCandidateError: defaultOnError
};
