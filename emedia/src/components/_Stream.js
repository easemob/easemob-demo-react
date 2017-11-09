var _util = require('./Util');

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
        return this._located ? this._localMediaStream : (this._webrtc && this._webrtc.getRemoteStream());
    },

    ifMediaStream: function (update) {
        if(typeof this.mediaStream !== "undefined"){
            update(this.mediaStream);
            return;
        }

        if(this._located && (typeof this._localMediaStream !== "undefined")){
            update(this._localMediaStream);
            return;
        }

        if(!this._located && this._webrtc && (typeof this._webrtc.getRemoteStream() !== "undefined")){
            update(this._webrtc.getRemoteStream());
            return;
        }
    },

    getHtmlDOMID: function () {
        return "_m_" + this.owner.id + "_s_" + this.id;
    }
});