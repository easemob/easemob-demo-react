
var _util = require('./Util');
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
        var message = this.execTime() + " Websocket close (" + (this.retry || 0) + ").";

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
        var message = this.execTime() + " Websocket error. ready state:" + this.event.srcElement.readyState + ". online = " + this.online;
        this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

        this.url && (message += " url: " + this.url);

        return message;
    }}),

    /**
     * {event: evt, session: self}
     */
    WSConnected: Error.extend({message: function () {
        var message = this.execTime() + " Websocket success. ready state:" + this.event.srcElement.readyState;
        this.session && this.session.getSessionId() && (message = message + ", sess = " + this.session.getSessionId());

        return message;
    }}),

    /**
     * {webrtc: webrtc, event: webrtcEvent, state: webrtcEvent.target.iceConnectionState}
     */
    ICEChanage: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + " state: " + this.state;
    }}),

    /**
     * {webrtc: webrtc, event: err}
     */
    AddIceCandError: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + ", add cand error";
    }}),

    /**
     * {webrtc: webrtc, event: event}
     */
    ICEConnectFail: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + " failed";
    }}),

    /**
     * {webrtc: webrtc, event: event}
     */
    ICEConnected: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + " connected";
    }}),

    /**
     * {webrtc: webrtc, event: event}
     */
    ICEDisconnected: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + " disconnected";
    }}),

    /**
     * {webrtc: webrtc}
     */
    ICEClosed: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + " closed";
    }}),

    /**
     * {webrtc: webrtc}
     */
    ICERemoteMediaStream: __ICEEvent.extend({message: function () {
        return this.execTime() + " " + this._webrtcDesc() + " got remote stream";
    }}),

    /**
     * {stream: stream, state:, msg: }
     */
    StreamState: Error.extend({message: function () {
            return this.execTime() + " " + " stream " + this.stream.id + " state: " + this.state + " " + this.msg;
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
        return this.execTime() + " " + " open media error. caused by " + this.event.toString();
    }}),

    /**
     * {reason: reason, parnter: {id: self._memberId}}
     */
    Hangup: Error.extend({message: function () {
        if(this.self){
            return "hangup id = " + (this.self.id || "--") + " reason：" + (this.reason || 0)
        }else{
            return this.execTime() + " " + ((this.parnter && (this.parnter.name || this.parnter.id || " ")) || "") + " hangup, reason：" + (this.reason || 0);
        }
    }}),

    /**
     * {failed: rsp.result, msg: rsp.msg}
     */
    ServerRefuseEnter: Error.extend({message: function () {
        return this.execTime() + " " + "server refuse, cause：" + this.failed + ", msg:" + (this.msg || "");
    }}),

    /**
     * {request: req, response: rsp}
     */
    RspFail: Error.extend({
        __init__: function () {
            this.day = new Date();
            this.failed = this.response.result;
            this.msg = this.response.msg;
        },
        message: function () {
            return this.execTime() + " " + this.request.tsxId + ", " + (this.response.sessId || "--") + " op: " + this.request.op + ", cause: " + this.failed + " " + this.msg ;
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
            return this.execTime() + " " + this.request.tsxId + ", " + (this.response.sessId || "--") + " op: " + this.request.op + ", cause: " + this.failed + " " + this.msg ;
        }
    }),

    /**
     * {me: me, cause: _event_}
     */
    EnterFail: Error.extend({message: function () {
        return this.execTime() + " " + "enter fail：" + (this.cause ? this.cause.message() : "unkown");
    }}),

    EnterSuccess: Error.extend({message: function () {
        return this.execTime() + " " + "enter success";
    }}),

    /**
     * {streamId: rsp.streamId}
     */
    PushSuccess: Error.extend({message: function () {
        return this.execTime() + " " + "push success, streamId = " + this.stream.id + " webrtc = " + this.stream.rtcId;
    }}),

    /**
     * {webrtc: webrtc, pubS: pubS, me: me, cause: _event_}
     */
    PushFail: Error.extend({message: function () {
        return this.execTime() + " " + "push fail, streamId = " + this.stream.id + " webrtc = " + this.stream.rtcId + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),

    /**
     * {stream: stream, failed: failed, me: me, cause: cause}
     */
    RemoteControlFail: Error.extend({message: function () {
        return this.execTime() + " " + "remote control fail, streamId = " + this.stream.id + " failed = " + this.failed + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),

    /**
     * {subMember: subMember, subStream: subStream, cause: ))
     */
    SubSuccess: Error.extend({message: function () {
        return this.execTime() + " " + "sub success, streamId = " + this.stream.id + " webrtc = " + this.stream.rtcId;
    }}),

    /**
     * {subMember: subMember, subStream: subStream, cause: ))
     */
    SubFail: Error.extend({message: function () {
        return this.execTime() + " " + "sub fail, streamId = " + this.stream.id + " webrtc = " + this.stream.rtcId + " cause：" + (this.cause ? (this.cause.message ? this.cause.message() : this.cause) : "unkown");
    }}),


    CurrentCalling: Error.extend({message: function () {
        return this.execTime() + " " + "warn! current calling...";
    }}),

    /**
     * {desktopStreamId: m.streamId}
     */
    OpenDesktopMedia: Error.extend({message: function () {
        return this.execTime() + " " + "shared desktop, desktopStreamId = " + desktopStreamId;
    }}),

    OpenDesktopMediaAccessDenied: Error.extend({message: function () {
        return this.execTime() + " " + "shared desktop not allow";
    }}),

    ShareDesktopExtensionNotFound: Error.extend({message: function () {
        return this.execTime() + " " + "shared desktop plugin required";
    }}),
};