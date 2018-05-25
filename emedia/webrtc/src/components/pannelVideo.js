var _util = require('./Util');
var _logger = _util.tagLogger("PannelVideo");

var Mouse = require('../../../pannel/src/components/Mouse');
var Keyboard = require('../../../pannel/src/components/Keyboard');
var MouseTrack = require('../../../pannel/src/components/MouseTrack');
var MouseTrigger = require('../../../pannel/src/components/MouseTrigger');
var TotalBuffer = require('../../../pannel/src/components/TotalBuffer');


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
