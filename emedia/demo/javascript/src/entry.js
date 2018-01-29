//http://localhost/web/?__log_level___=0&__member_name__=yss002

var $ = require('jquery');

//初始化对象使用
var _logger = emedia.util.logger;


emedia.LOG_LEVEL = 3;


//eg:
// https://localhost:9443/EMedia/?__super_tkt__=true&__confr_id__=MS1000C333
// https://localhost:9443/EMedia/?__log_level___=0&__only_enter__=true&__auto_sub__=false&__super_tkt__=true&__confr_id__=MS1000C333&__member_name__=God123
// https://121.41.87.159:8443/EMedia-1.0.0/?__log_level___=0&__only_enter__=false&__auto_sub__=true&__url__=ws://121.41.87.159:8443/ws&__confr_id__=MS1000C101&__member_name__=yss002
// https://localhost/EMedia/?__log_level___=0&__confr_id__=MS1000C101&__only_enter__=true&__member_name__=yss001&__auto_sub__=false&__url__=ws://127.0.0.1:9092/ws
//根据URL初始化配置，目的为了，减少测试时的乱点
var confrId;

var tkt = document.getElementById('text_tkt');
var __memberName = emedia.util.parseURL("__member_name__");
var __confr_id__ = emedia.util.parseURL("__confr_id__");

var __autoSub__ = emedia.util.parseURL("__auto_sub__");
var __url__ = emedia.util.parseURL("__url__");

var __only_enter__ = emedia.util.parseURL("__only_enter__");

var __super_tkt__ = emedia.util.parseURL("__super_tkt__");
var __forward__ = emedia.util.parseURL("__forward__");
var __visible__ = emedia.util.parseURL("__visible__");
var __audio__ = emedia.util.parseURL("__audio__");
var __video__ = emedia.util.parseURL("__video__");

__forward__ || (__forward__ = document.domain);
var __invisible__ = "false" === __visible__;

if(__memberName){
    var tktJson = tkt.value;
    tktJson = JSON.parse(tktJson);
    tktJson.memName = __memberName;

    tkt.value = JSON.stringify(tktJson);
}
if(__url__){
    var tktJson = tkt.value;
    tktJson = JSON.parse(tktJson);

    tktJson.url = __url__;

    tkt.value = JSON.stringify(tktJson);
}

if(__autoSub__){
    emedia.config({autoSub: __autoSub__ === 'true'});
}
if(__only_enter__){
    emedia.config({onlyEnter: __only_enter__ === 'true'});
}
if(__confr_id__){
    var tktJson = tkt.value;
    tktJson = JSON.parse(tktJson);
    confrId = tktJson.confrId = __confr_id__;

    tkt.value = JSON.stringify(tktJson);
}else{
    var tktJson = tkt.value;
    tktJson = JSON.parse(tktJson);
    confrId = tktJson.confrId;
}


var titleP = document.querySelector("#join #title_p");
titleP.innerHTML = "member: " + __memberName + ", autoSub: " + emedia.config.autoSub + ", onlyEnter: " + emedia.config.onlyEnter;

if(__super_tkt__){
    $("#join h1").append("<a></a>").find("a").html(confrId).attr("href", "/confr/desc/?forward=" + __forward__ + "&confrId=" + confrId);
    $("#join h1").append("<a></a>").find("a:last-child").html('[SER]').attr("href", "/confr/?forward=" + __forward__);

    var tktUrl = "/confr/superticket/?forward=" + __forward__
        + "&confrId=" + confrId
        + "&invisible=" + __invisible__;
    $("#join h1").append("<a></a>").find("a:last-child").html('[TKT]').attr("href", tktUrl);
    $("#join h1").append("<a></a>").find("a:last-child").html('[BLANK]').attr("href", window.location.href);

    __memberName && (tktUrl =  tktUrl + "&memName" + __memberName);

    $.getJSON(tktUrl, function (ticketJson) {
        tkt.value = JSON.stringify(ticketJson);
    }).fail(function(jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        displayEvent( "Request Failed: " + err );
    });
} else {
    $("#join h1").html(confrId);
}

$(function () {
    displayEvent( navigator.userAgent );
    displayEvent( navigator.appName );
});

var service = new emedia.Service({
    nickName: __memberName,

    // newSession: function (attendee, ticket) {
    // var self = this;
    //
    // function chanageCands (cands) {
    //         if(Array.isArray(cands) && cands.length > 0){
    //             var _newCands = [];
    //
    //             for(var i = 0; i < cands.length; i++){
    //                 var newCand = emedia.util.extend(cands[i]);
    //                 newCand.candidate = newCand.candidate.replace("119.145.235.249", "10.121.63.1");
    //                 _newCands.push(newCand);
    //             }
    //
    //             return _newCands;
    //         }
    //     }
    //
    //     var easemobSession = emedia.Service.prototype.newSession.call(self, attendee, ticket);
    //     easemobSession.onTcklC = function(evt){
    //         attendee.onTcklC(evt.rtcId, evt.cands);
    //
    // 	var newCands = chanageCands(evt.cands);
    //         newCands && attendee.onTcklC(evt.rtcId, newCands);
    //     };
    //
    //     easemobSession.onAnsC = function(evt){
    //         attendee.onAnsC(evt.rtcId, evt.sdp, evt.cands);
    //
    //         var newCands = chanageCands(evt.cands);
    //         newCands && attendee.onTcklC(evt.rtcId, newCands);
    //     };
    //
    //     return easemobSession;
    // },

    listeners: { //以下监听，this object == me == service.current
        onMeExit: function (reason, failed) {
            reason = (reason || 0);
            switch (reason){
                case 0:
                    reason = "正常挂断";
                    break;
                case 1:
                    reason = "没响应";
                    break;
                case 2:
                    reason = "服务器拒绝";
                    break;
                case 3:
                    reason = "对方忙";
                    break;
                case 4:
                    reason = "失败,可能是网络或服务器拒绝";
                    if(failed === -9527){
                        reason = "失败,网络原因";
                    }
                    if(failed === -500){
                        reason = "Ticket失效";
                    }
                    if(failed === -502){
                        reason = "Ticket过期";
                    }
                    if(failed === -504){
                        reason = "链接已失效";
                    }
                    if(failed === -508){
                        reason = "会议无效";
                    }
                    if(failed === -510){
                        reason = "服务端限制";
                    }
                    break;
                case 5:
                    reason = "不支持";
                    break;
                case 10:
                    reason = "其他设备登录";
                    break;
                case 11:
                    reason = "会议关闭";
                    break;
            }
            displayEvent("Hangup reason " + (reason || 0));
            rtcs.innerHTML = "";
        },

        onAddMember: function (member) {
            displayEvent(member.id + " " + (member.nickName || "") + " enter， ext = " + member.ext + ", supportVCodecs: " + member.vcodes);
        },
        onRemoveMember: function (member) {
            displayEvent(member.id + " " + (member.nickName || "") + " exit, has members: " + service.getCurrentMembers().length);
        },

        onAddStream: function (stream) {
            displayEvent("Add stream: " + stream.id + " located: " + stream.located() + " use: " + stream.vcodes + " webrtc: " + (stream.rtcId || "--") + "， ext = " + stream.ext);
            genOrUpdateHtml(stream);
        },
        onRemoveStream: function (stream) {
            displayEvent("Remove stream: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--"));

            rmHtml(stream);
        },
        onUpdateStream: function (stream, update) {
            displayEvent("Update stream: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--"));
            genOrUpdateHtml(stream, update);
        },
        onNetworkWeak: function () {
            displayEvent("当前通话连接质量不佳");
        },
        onNotSupportPublishVideoCodecs: function (stream) {
            displayEvent("One sub not support video codecs: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--"));
        },
        onRecvRemoteMessage: function (fromMember, argsObject) {
            displayEvent("On recv remote message, from " + fromMember.id + " " + argsObject);
        },
        onNotifyEvent: function (evt) {
            if(evt instanceof emedia.event.ServerRefuseEnter){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.EnterSuccess){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.EnterFail){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.ICERemoteMediaStream) {
                //displayEvent(evt.message());
            } else if(evt instanceof emedia.event.PushSuccess){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.SubSuccess){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.PushFail){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.SubFail){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.StreamState){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.ShareDesktopExtensionNotFound){
                displayEvent(evt.message());
            } else if(evt instanceof emedia.event.RemoteControlFail){
                displayEvent(evt.message());
            }
        }
    }
});


tkt.ondblclick = function () {
    this.removeAttribute("readonly");
}
tkt.onblur = function () {
    this.setAttribute("readOnly","readonly");

    try{
        this.value = eval(this.value);
    }catch (e){
    }
}

function appInfo(){
    // var browser = {
    //         msie: false, firefox: false, opera: false, safari: false,
    //         chrome: false, netscape: false, appname: 'unknown', version: 0
    //     },
    //     userAgent = window.navigator.userAgent.toLowerCase();
    // if ( /(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test( userAgent ) ){
    //     browser[RegExp.$1] = true;
    //     browser.appname = RegExp.$1;
    //     browser.version = RegExp.$2;
    // } else if ( /version\D+(\d[\d.]*).*safari/.test( userAgent ) ){ // safari
    //     browser.safari = true;
    //     browser.appname = 'safari';
    //     browser.version = RegExp.$2;
    // }
    //
    // return browser;

    return {
        appname : emedia.browser,
        version : emedia.browserVersion
    };
}

var app = appInfo();

//初始化流程

var btnEnter = document.getElementById("btn_enter");
var btnHangup = document.getElementById("btn_hangup");
var btnPub = document.getElementById("btn_pub");
var btnShareDesktop = document.getElementById("btn_shareDesktop");

var selectEvents = document.getElementById("div_events");

var rtcs = document.getElementById("participants");

function displayEvent(event__) {
    var option = document.createElement("p");
    option.innerHTML = event__;

    //selectEvents.insertBefore(option, null);

    selectEvents.innerHTML = option.outerHTML + selectEvents.innerHTML;
}


function genOrUpdateHtml(stream, update) {
    var htmlId = stream.getHtmlDOMID();
    var div = rtcs.querySelector("#" + htmlId);

    var streamId = stream.id;
    var streamName = stream.name;

    if(!div){
        div = document.createElement("div");
        div.className = "participant big ";
        stream.located() && (div.className += "self");


        div.id = htmlId;

        div.innerHTML = "<span></span><div id='video_box'><video autoplay playsinline id='videoTag'></video></div>";

        rtcs.appendChild(div);
    } else {
        var btns = div.querySelector("#btns_div");
        btns && btns.parentNode.removeChild(btns);
    }

    var btnsDiv = document.createElement("div");
    btnsDiv && (btnsDiv.id = 'btns_div');

    var btns = "";
    if(stream.type == 1){
        btns = "<div><a id='close'>关闭</a></div>"
        btns += "<div id='desc'></div>";
    }else if(stream.located()){
        //&nbsp;<a id='record'>录</a>
        btns = "<div><a id='aoff'>无声</a>&nbsp;<a id='voff'>无像</a>&nbsp;<a id='close'>关闭</a></div>"
        btns += "<div id='desc'></div>";
        btns += "<div>&nbsp;</div>";
    } else {
        //&nbsp;<a id='record'>录</a>
        btns = "<div><span id='aflag'>无声</span>&nbsp;<span id='vflag'>无像</span>&nbsp;<a id='freezeFrame'>定</a>&nbsp;<a id='capture'>拍</a>&nbsp;<a id='big'>大</a>&nbsp;<a id='small'>小</a>&nbsp;<a id='torch'>开灯</a>&nbsp;<a id='close'>关闭</a></div>"
        btns += "<div id='desc'></div>";
        btns += "<div><input type='checkbox' id='audio' disabled/><label for='audio'>Audio</label>" +
            "<input type='checkbox' id='video' /><label for='video'>Video</label></div>";
    }
    btnsDiv.innerHTML = btns;

    //btns.find('input[type="checkbox"]')

    var subVideoCheckbox = $(btnsDiv).find("#video");
    var subAudioCheckbox = $(btnsDiv).find("#audio");


    if(!stream.located()){
        var subArgs = stream.subArgs || {subSVideo: true, subSAudio: true};
        if(subArgs.subSVideo){
            subVideoCheckbox.attr("checked", true);
        }else{
            subVideoCheckbox.removeAttr("checked");
        }

        if(subArgs.subSAudio){
            subAudioCheckbox.attr("checked", true);
        }else{
            subAudioCheckbox.removeAttr("checked");
        }

        subVideoCheckbox.click(function () {
            if($(this).attr("checked")){
                $(this).removeAttr("checked");
            }else{
                $(this).attr("checked", true);
            }

            if(close.innerHTML == "关闭"){
                var subSVideo = stream.type == 1 || subVideoCheckbox.attr("checked") === "checked";
                var subSAudio = stream.type == 1 || subAudioCheckbox.attr("checked") === "checked";
                service.subscribe(streamId, {subSVideo: subSVideo, subSAudio: subSAudio});
            }
        });

        subAudioCheckbox.click(function () {
            if($(this).attr("checked")){
                $(this).removeAttr("checked");
            }else{
                $(this).attr("checked", true);
            }

            if(close.innerHTML == "关闭"){
                var subSVideo = stream.type == 1 || subVideoCheckbox.attr("checked") === "checked";
                var subSAudio = stream.type == 1 || subAudioCheckbox.attr("checked") === "checked";
                service.subscribe(streamId, {subSVideo: subSVideo, subSAudio: subSAudio});
            }
        });
    }


    $(btnsDiv).find("#desc").html((stream.owner.res && stream.owner.res.platType || "")
        + ":" + stream.id + ":" + (stream.vcodes || stream.optimalVideoCodecs || "-")
        + " < " + ((stream._webrtc && stream._webrtc.getRtcId()) || "-") + ":" +((stream._webrtc && stream._webrtc.optimalVideoCodecs) || "-"));

    $(btnsDiv).find("div:first-child").append("&nbsp;<a id='zoom'>1X</a>").find("a:last-child").click(function () {
        var zoom = parseInt(this.innerHTML);
        zoom = zoom % 5 + 1;

        if(zoom == 1){
            $(div).find("#videoTag").css("height", "none");
        }else{
            $(div).find("#videoTag").css("height", "auto");
        }

        var width = zoom * 216;

        $(div).css("width", width);
        this.innerHTML = zoom + "X";
    });
    //$(div).css("width", 150);

    div.appendChild(btnsDiv);


    var aoff = div.querySelector("#aoff");
    var voff = div.querySelector("#voff");

    voff && (stream.voff ? (voff.innerHTML = "无像") : (voff.innerHTML = "有像"));
    aoff && (stream.aoff ? (aoff.innerHTML = "无声") : (aoff.innerHTML = "有声"));

    var aflag = div.querySelector("#aflag");
    var vflag = div.querySelector("#vflag");

    vflag && (stream.voff ? (vflag.innerHTML = "无像") : (vflag.innerHTML = "有像"));
    aflag && (stream.aoff ? (aflag.innerHTML = "无声") : (aflag.innerHTML = "有声"));


    var close = div.querySelector("#close");

    var span = div.querySelector("span");
    var video = div.querySelector("#videoTag");

    if(video){ //IE video 被替换成了Object了，所以 video找不到了
        if(stream.located()){
            video.muted = true;
        }

        span.innerHTML = (stream.owner.nickName || stream.owner.id) + ":" + (stream.name || stream.id);
        //stream.getMediaStream() && attachMediaStream(video, stream.getMediaStream());

        _logger.info("Webrtc Update stream.....");
        update ? update.ifMediaStream(function (mediaStream) {
                _logger.info("Webrtc Update11111 stream.....");
                attachMediaStream(video, (window.remote___stream = mediaStream));
            }) : stream.ifMediaStream(function (mediaStream) {
                _logger.info("Webrtc Update22222 stream.....");
                attachMediaStream(video, mediaStream);
            });
        _logger.info("Webrtc Update stream end");

        function displayHW(video){
            var $em = $(btnsDiv).find("#desc").find("em");
            if($em.length > 0){
                $em.html(video.videoWidth + 'x' + video.videoHeight);
            }else{
                var html = $(btnsDiv).find("#desc").html();
                html += "&nbsp;<em>" + video.videoWidth + 'x' + video.videoHeight + "</em>";
                $(btnsDiv).find("#desc").html(html);
            }
        }
        displayHW(video);

        video.onresize = function () {
            displayHW(video);
        };

        video.oncontextmenu_ = function () {
            var className = div.className;

            var index;
            if(( index = className.indexOf('big')) > 0){
                className = className.substring(0, index - 1);
            } else {
                className += ' big';
            }

            div.className = className;
        };

        video.onclick = function (event) {
            var xy = service.getClickXY(video, event);
            console.log(xy);

            if (document.all) { // for IE
                window.event.returnValue = false;
            } else {
                event.preventDefault();
            }

            if(stream.located()){
                displayEvent("Web本地摄像头不支持聚焦");
                return;
            }
            service.focusExpoRemote(stream.id, video, event, function fail(evt) {
                _logger.error("Oh,no.", evt.message())
            });
        }

        video.onmousemove_ = function (event) {
            var floatDiv = document.querySelector("#float_div");
            if(!floatDiv){
                return;
            }

            var e = event || window.event;

            floatDiv.querySelector("#client").innerHTML = e.clientX + ":" + e.clientY;
            floatDiv.querySelector("#screen").innerHTML = e.screenX + ":" + e.screenY;


            var e = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;

            floatDiv.querySelector("#document").innerHTML = x + ":" + y;


            var xy = service._getPosition(video);
            floatDiv.querySelector("#self").innerHTML = (x - xy.clientX) + ":" + (y - xy.clientY);
        };
    }


    update && vflag && update.ifVoff(function (voff) {
        (voff ? (vflag.innerHTML = "无像") : (vflag.innerHTML = "有像"));
    });
    update && aflag && update.ifAoff(function (aoff) {
        (aoff ? (aflag.innerHTML = "无声") : (aflag.innerHTML = "有声"));
    });

    stream.getMediaStream() || (close.innerHTML = "订阅");


    var capture = div.querySelector("#capture");
    capture && (capture.onclick = function () {
        service.capturePictureRemote(stream.id, false, function (base64Pic) {
            displayEvent("capture success");
        }, function fail(evt) {
            _logger.error("Oh,no. capture", evt.message())
            displayEvent("capture fail");
        });
    });

    var freezeFrame = div.querySelector("#freezeFrame");
    freezeFrame && (freezeFrame.onclick = function () {
        (freezeFrame.innerHTML === "定") ? (freezeFrame.innerHTML = "动") : (freezeFrame.innerHTML = "定");

        service.freezeFrameRemote(stream.id, function (freezeFramed) {
            freezeFramed ? (freezeFrame.innerHTML = "动") : (freezeFrame.innerHTML = "定");
        }, function fail(evt, freezeFramed) {
            freezeFramed ? (freezeFrame.innerHTML = "动") : (freezeFrame.innerHTML = "定");
            _logger.error("Oh,no. freeze frame", evt.message())
            displayEvent("freeze frame fail");
        });
    });

    var torchObject = div.querySelector("#torch");
    torchObject && (torchObject.onclick = function () {
        (torchObject.innerHTML === "开灯") ? (torchObject.innerHTML = "关灯") : (torchObject.innerHTML = "开灯");

        service.torchRemote(stream.id, function (torch) {
            torch ? (torchObject.innerHTML = "关灯") : (torchObject.innerHTML = "开灯");
        }, function fail(evt, torch) {
            torch ? (torchObject.innerHTML = "关灯") : (torchObject.innerHTML = "开灯");
            _logger.error("Oh,no. torch fail", evt.message())
            displayEvent("torch fail");
        });
    });


    var big = div.querySelector("#big");
    var small = div.querySelector("#small");

    big && (big.onclick = function () {
        service.zoomRemote(stream.id, 2, function fail(evt) {
            _logger.error("Oh,no. zoom", evt.message())
        });
    });
    small && (small.onclick = function () {
        service.zoomRemote(stream.id, 0.5, function fail(evt) {
            _logger.error("Oh,no. zoom", evt.message())
        });
    });

    aoff && (aoff.onclick = function () {
        var _aoff;
        if(this.innerHTML == "无声"){
            this.innerHTML = "有声";
            _aoff = 0;
        } else {
            this.innerHTML = "无声";
            _aoff = 1;
        }

        service.aoff(stream, _aoff, function (evt) {
            displayEvent(evt.message());
            aoff.innerHTML = "无声";
        });
    });

    voff && (voff.onclick = function () {
        var _voff;
        if(this.innerHTML == "无像"){
            this.innerHTML = "有像";
            _voff = 0;
        } else {
            this.innerHTML = "无像";
            _voff = 1;
        }

        service.voff(stream, _voff, function (evt) {
            displayEvent(evt.message());
            voff.innerHTML = "无像";
        });
    });


    var record = div.querySelector("#record");

    if(service.recording(stream.id)){
        record && (record.innerHTML = "停");
    }

    record && (record.onclick = function () {
        if(this.innerHTML == "录"){
            service.startRecord(stream.id, function (_result) {
                _result && (record.innerHTML = "停");
            });
        } else {
            service.startRecord(stream.id, function (_result) {
                _result && (record.innerHTML = "录");
            });
        }
    });

    close && (close.onclick = function () {
        if(this.innerHTML == "关闭"){ //关闭
            record && (record.innerHTML = "录");

            service.hungup(streamId);

            if(stream.located()){
                this.innerHTML = "";
                //rtcs.querySelector("#" + div.id) && rtcs.removeChild(div);
            }else{
                this.innerHTML = "订阅"
            }

        } else { //订阅
            this.innerHTML = "关闭";

            var self = this;

            var subSVideo = stream.type == 1 || subVideoCheckbox.attr("checked") === "checked";
            var subSAudio = stream.type == 1 || subAudioCheckbox.attr("checked") === "checked";
            service.subscribe(streamId, function (_evt) {
                _logger.warn(_evt);
                self.innerHTML = "订阅";
            }, {subSVideo: subSVideo, subSAudio: subSAudio});
        }
    });
}

function rmHtml(stream) {
    var id = "#" + stream.getHtmlDOMID();

    var div = rtcs.querySelector(id);
    div && rtcs.removeChild(div);
}


btnHangup.onclick = function () {
    service.exit();
}

btnHangup.oncontextmenu = function (event) {
    if (document.all) { // for IE
        window.event.returnValue = false;
    } else {
        event.preventDefault();
    }

    service.exit(true);
}

btnEnter.onclick = function () {
    var tktJson = tkt.value;
    tktJson = JSON.parse(tktJson);

    var ext = {role: "admin000"};

    service.setup(tkt.value, ext);

    if(emedia.config.onlyEnter){
        service.join();

        return;
    }

    var div;

    var pubS = new service.AVPubstream({
        constaints: {
            audio: "false" !== __audio__,
            video: "false" !== __video__
            //video: {width: {exact: 1280}, height: {exact: 720}}
        },
        aoff: 0,
        voff: 0,
        name: "video",
        ext: {
            browser: app.appname
        }
    });

    // service.join(function () {
    //     service.openUserMedia(pubS).then(
    //         function success(_user, stream) { //成功 attachMediaStream(video, mediaStream);
    //             service.push(pubS);
    //         },
    //         function fail(evt) {
    //             if(evt instanceof emedia.event.ShareDesktopExtensionNotFound){ //共享桌面抄件未找到
    //
    //             }
    //             if(evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
    //
    //             }
    //             displayEvent("打开Media失败", evt.message());
    //         }
    //     );
    // });

    service.openUserMedia(pubS).then(
        function success(_user, stream) { //成功 attachMediaStream(video, mediaStream);
            service.withpublish(pubS).join();
        },
        function fail(evt) {
            if(evt instanceof emedia.event.ShareDesktopExtensionNotFound){ //共享桌面抄件未找到

            }
            if(evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头

            }
            displayEvent("打开Media失败", evt.message());
        }
    );
};

btnPub.onclick =  function () {
    var pubS = new service.AVPubstream({
        constaints: {
            audio: "false" !== __audio__,
            video: "false" !== __video__,
        },
        aoff: 0,
        voff: 0,
        name: "video",
        ext: {
            browser: app.appname
        }
    });

    var div;
    service.openUserMedia(pubS).then(function () {
        service.push(pubS);
    }, function fail(evt) {
        displayEvent("打开Media失败" + evt.message());
    });
};

btnShareDesktop.onclick = function () {
    var pubS = new service.ShareDesktopPubstream({voff: 0, aoff: 0, name: "共享桌面", ext: "hello 共享桌面", screenOptions: ['screen', 'window', 'tab']});

    var div;
    service.openUserMedia(pubS).then(function () {
        service.push(pubS);
    }, function fail(evt) {
        displayEvent("打开Media失败" + evt.message());
    });
}