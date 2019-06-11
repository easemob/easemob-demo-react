/**
 * IQ Message，IM -> CMServer --> IM
 */

var _util = (require('./utils').default);
var _logger = _util.logger;
var API = require('./api');
var RouteTo = API.RouteTo;
var CONFERENCE_XMLNS = "urn:xmpp:media-conference";

var _RtcHandler = {
    _apiCallbacks: {},
    imConnection: null,
    _connectedSid: '',
 
    init: function () {
        var self = this;
        var _conn = self.imConnection;

        _conn.registerConfrIQHandler = function(meta, status, conn){
           // var handleConferenceIQ = function (meta, status, conn) {
                try {
                    self.handleRtcMessage(meta);
                } catch (error) {
                    _logger.error(error);
                    //throw error;
                }
                //return true;
            //};

            // _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "set");
            // _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "get");
            //_logger.warn("Conference iq handler. registered.");
        }
    },
    
    handleRtcMessage: function (msginfo, status, conn) {
        var self = this;
        if (!msginfo) {return}
        var messageBodyMessage = WebIM.conn.context.root.lookup("easemob.pb.ConferenceBody");
        var thirdMessage = messageBodyMessage.decode(msginfo.payload);
        
        var id = msginfo.id;
        var from = msginfo.from.name|| '';

        // remove resource
        from.lastIndexOf("/") >= 0 && (from = from.substring(0, from.lastIndexOf("/")));

        var rtkey = thirdMessage.routeKey;

        var fromSessionId = thirdMessage.sessionId;

        (self._fromSessionID || (self._fromSessionID = {}))[from] = fromSessionId;

        // var contentTags = msginfo.getElementsByTagName('content');
        // var contentString = contentTags[0].innerHTML;

        var content = _util.parseJSON(thirdMessage.content);

        var rtcOptions = content;
        //var mediaType = content.rtcCfg&&JSON.parse(content.rtcCfg).capVideo ? 'VIDEO': 'VOICE';
        var streamType = thirdMessage.type == 1 ? 'VIDEO': 'VOICE'; //VOICE, VIDEO

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

            var reasonObj = msginfo.endReason;
            //var endReason = msginfo.getElementsByTagName('reason')[0].innerHTML;
            reasonObj && reasonObj.length > 0 && (rtcOptions.reason =  '失败了');
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
     * rtcOptions: { data : { op : 'reqP2P', video : 1, audio : 1, peer :
     * curChatUserId, //appKey + "_" + curChatUserId + "@" + this.domain, } }
     */
    sendRtcMessage: function (rt, options, callback) {

        var self = this;
        var _conn = self.imConnection;
        var tsxId = _conn.getUniqueId()//rt.tsxId || _conn.getUniqueId();

        var to = rt.to&&rt.to || _conn.domain;
        if (to.indexOf("@") >= 0) {
            to = to.split('_')[1].split('@')[0]
            if (self._connectedSid == '' && options.data.op == 102) {
                self._connectedSid = sid;
            }
        }
        var sid = rt.sid || self._fromSessionID && self._fromSessionID[to];
        sid = sid || ((self._fromSessionID || (self._fromSessionID = {}))[to] = _conn.getUniqueId("CONFR_"));
 
        //sid = sid || _conn.getUniqueId("CONFR_");

        (self._fromSessionID || (self._fromSessionID = {}))[to] = sid;

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

        callback && (
            self._apiCallbacks[tsxId] = {
                callback: callback
            }
        );

        // var completeFn = function (result) {
        //         rt.success(result);
        //     } || function (result) {
        //         _logger.debug("send result. op:" + options.data.op + ".", result);
        //     };

        // var errFn = function (ele) {
        //         rt.fail(ele);
        //     } || function (ele) {
        //         _logger.debug(ele);
        //     };
        var sendOptions = {
            id: id,
            to: to,
            from: _conn.context.jid,
            type: streamType == "VIDEO" ? 1 : 0,
            rtflag: rtflag,
            stream_type: streamType,
            sid: sid,
            content: options.data,
            reason: options.reason
        }

        if(options.data.op != 202){
            this._sendMessage(sendOptions, WebIM.conn)
            //_conn.context.stropheConn.sendIQ(iq.tree(), completeFn, errFn);
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
            //msg = '快来加入会议'+' - 13 ' + options.data.confrId
            var inviteMessage = {
                msg: msg,
                id: id,
                to: to,
                from: _conn.context.jid,
                contents: [{
                    contenttype: 'TEXT',
                    text: msg
                }],
                gid: options.data.gid,
                password: options.data.password,
                exts: {
                    key: "conferenceId",
                    type: 7,
                    value: options.data.confrId
                  }
            }
            return this._sendGroupInviteMsg(inviteMessage, WebIM.conn)
        }
    },

    _sendGroupInviteMsg: function(messageOption, conn){
        var emptyMessage = [];
        var contentMessage = conn.context.root.lookup("easemob.pb.MessageBody.Content");
        var fifthMessage = contentMessage.decode(emptyMessage);

        fifthMessage.type = 0;
        fifthMessage.text = messageOption.msg;
   
        var messageBody = conn.context.root.lookup("easemob.pb.MessageBody");
        var fourthMessage = messageBody.decode(emptyMessage);

            fourthMessage.from = {
                name: messageOption.from.name
            };
            fourthMessage.to = {
                name: messageOption.to
            }
 
        fourthMessage.contents = [fifthMessage];

        var extMsg = conn.context.root.lookup("easemob.pb.KeyValue");
        var ext = extMsg.decode(emptyMessage);
        var ext2 = extMsg.decode(emptyMessage);
        var ext3 = extMsg.decode(emptyMessage);
        ext.key = 'conferenceId'
        ext.type = 7;
        ext.stringValue = messageOption.exts.value
 
        ext2.key = 'msg_extension'
        ext2.type = 7
        ext2.stringValue = JSON.stringify({
            "inviter": messageOption.from.name,
            "group_id": messageOption.gid
          })
        
        ext3.key = 'password'
        ext3.type = 7
        ext3.stringValue = messageOption.password

        fourthMessage.ext = [ext, ext2, ext3]
        fourthMessage.type = 1;
        fourthMessage = messageBody.encode(fourthMessage).finish();

        var MetaMessage = conn.context.root.lookup("easemob.pb.Meta");
        var thirdMessage = MetaMessage.decode(emptyMessage);

        thirdMessage.id = messageOption.id;
            thirdMessage.from = messageOption.from

            thirdMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "easemob.com",
                // clientResource: conn.clientResource
            }
        
        thirdMessage.ns = 1;
        thirdMessage.type = 1;
        thirdMessage.payload = fourthMessage;
        var commSyncULMessage = conn.context.root.lookup("easemob.pb.CommSyncUL");
        var secondMessage = commSyncULMessage.decode(emptyMessage);
        secondMessage.meta = thirdMessage;
        secondMessage = commSyncULMessage.encode(secondMessage).finish();
        var msyncMessage = conn.context.root.lookup("easemob.pb.MSync");
        var firstMessage = msyncMessage.decode(emptyMessage);

        firstMessage.version = conn.version;
        firstMessage.encryptType = conn.encryptType;
        firstMessage.command = 0;
        firstMessage.guid = conn.context.jid;
        firstMessage.payload = secondMessage;
        firstMessage = msyncMessage.encode(firstMessage).finish();
        conn.sendMSync(firstMessage);
    },

    _sendMessage: function(messageOption, conn){
        var self = conn;
        var emptyMessage = [];

        //构造 content
        var contentMessage = conn.context.root.lookup("easemob.pb.ConferenceBody");
        //构造 第一层
        var fifthMessage = contentMessage.decode(emptyMessage);
        var mediaType = messageOption.content.video;
        var content;
        if (messageOption.content.op == 0) {
            content = {
                op: messageOption.content.op,
                callVersion: "2.0.0", 
                audio: messageOption.content.audio,
                video: messageOption.content.video,
                //sessId: messageOption.sid,
                tsxId: String(messageOption.content.tsxId),
                peer: messageOption.content.peer + "/",
                push: 0
            }
        } else if(messageOption.content.op == 400){
            content = messageOption.content
        }else {
            content = messageOption.content;
            content.tsxId = String(messageOption.content.tsxId);
        }
        var op = messageOption.content.op;
        fifthMessage.content = JSON.stringify(content)
        fifthMessage.routeFlag = messageOption.rtflag;
        fifthMessage.operation = 7;
        fifthMessage.sessionId = String(messageOption.sid) //和content里的sid不同？ 都是什么
        fifthMessage.type = messageOption.type

        if (op == 102 || op == 104 || op == 105 || op == 107 || op == 400) {
            fifthMessage.routeKey = '--X--';
            fifthMessage.routeFlag = messageOption.rtflag;
            fifthMessage.peerName = messageOption.from.name;
        }

        if(op == 107){
            fifthMessage.endReason = 0
        }

        fifthMessage = contentMessage.encode(fifthMessage).finish();
        // var messageBody = conn.context.root.lookup("easemob.pb.ConferenceBody");
        // var fourthMessage = messageBody.decode(emptyMessage);
        // fourthMessage.payload = fifthMessage;
        var MetaMessage = conn.context.root.lookup("easemob.pb.Meta");
        var thirdMessage = MetaMessage.decode(emptyMessage);
        thirdMessage.id = String(messageOption.id);

        thirdMessage.ns = 4;

        thirdMessage.to = {
            appKey: messageOption.from.appKey,
            domain: messageOption.from.domain,
            name: messageOption.to
        }
        if (messageOption.content.op == 102) {
            thirdMessage.from = messageOption.from//.appKey+'_'+messageOption.from.name+'@'+messageOption.from.domain
        }

        thirdMessage.payload = fifthMessage;
 
        var commSyncULMessage = conn.context.root.lookup("easemob.pb.CommSyncUL");
        var secondMessage = commSyncULMessage.decode(emptyMessage);
        secondMessage.meta = thirdMessage;

        secondMessage = commSyncULMessage.encode(secondMessage).finish();
        var msyncMessage = conn.context.root.lookup("easemob.pb.MSync");
        var firstMessage = msyncMessage.decode(emptyMessage);

        firstMessage.version = conn.version;
        firstMessage.encryptType = conn.encryptType;
        firstMessage.command = 0;
        firstMessage.guid = conn.context.jid;
        firstMessage.payload = secondMessage;
        firstMessage = msyncMessage.encode(firstMessage).finish();
        conn.sendMSync(firstMessage);
    }
};

var RTCIQHandler = function (initConfigs) {
    _util.extend(true, this, _RtcHandler, initConfigs || {});
    this.init();
};

module.exports = RTCIQHandler;
