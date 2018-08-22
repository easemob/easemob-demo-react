import React from "react"
import { connect } from "react-redux"
import WebIM from "@/config/WebIM"
import RTCChannel from "@/components/webrtc/rtcChannel"
import { message, Modal } from "antd"
import MultiAVActions from "@/redux/MultiAVRedux"
import Creators from "../../redux/MultiAVRedux";

const confirm = Modal.confirm

class WebRTCModal extends React.Component {
    constructor(props) {
        super()
    }

    componentDidMount() {
        // this.setSelectStatus()
        if (WebIM.config.isWebRTC && WebIM.WebRTC) {
            this.initWebRTC(WebRTCModal)
            // this.initEmedia()
            this.channel = new RTCChannel(this.refs.rtcWrapper, this.props.collapsed)
        }
    }

    channel = null
    rtcTimeoutID = null

    initWebRTC() {

        console.log("InitWebRTC..........")
        if (WebIM.call) {
            return
        }

        console.log("InitWebRTC end..........")
        var me = this


        WebIM.call = new WebIM.WebRTC.Call({
            connection: WebIM.conn,

            mediaStreamConstaints: {
                audio: true,
                video: true
            },

            listener: {
                onOtherUserOpenVoice: function (from, opened) {
                    console.log("from open:", opened, " voice .", from)
                },
                onOtherUserOpenVideo: function (from, opened) {
                    console.log("from open:", opened, " voideo .", from)
                },
                onAcceptCall: function (from, options, enableVoice, enableVideo) {
                    console.log("onAcceptCall", from, options, enableVoice, enableVideo)
                },
                onGotRemoteStream: function (stream, streamType) {
                    console.log("onGotRemoteStream")
                    me.channel.setRemote(stream, streamType)
                },
                onGotLocalStream: function (stream, streamType) {
                    console.log("onGotLocalStream ", "Stream Type: ", streamType)
                    me.channel.setLocal(stream, streamType)
                },
                onRinging: function (caller, streamType) {
                    console.log("onRinging", caller)
                    me.channel.ringing(caller, streamType)
                },
                onTermCall: function (reason) {
                    //"ok"      -> 'HANGUP'     "success" -> 'HANGUP'   "timeout"          -> 'NORESPONSE'
                    //"decline" -> 'REJECT'     "busy"    -> 'BUSY'     "failed-transport" -> 'FAIL'
                    // TODO reason undefine if reason is busy
                    console.log("onTermCall")
                    if (reason && (reason == "busy" || reason == "BUSY")) {
                        message.error("Target is busy. Try it later.")
                    }
                    if (reason && (reason == "timeout" || reason == "NORESPONSE")) {
                        message.error("Target no response. Try it later.")
                    }
                    if (reason && (reason == "decline" || reason == "REJECT")) {
                        message.error("Target reject.")
                    }
                    if (reason && (reason == "failed-transport" || reason == "FAIL")) {
                        message.error("Call failed. Try it later.")
                    }
                    if (reason && (reason == "ok" || reason == "success" || reason == "HANGUP")) {
                        message.success("Target hangup. ")
                    }


                    WebIM.call.caller = ""
                    WebIM.call.callee = ""
                    me.channel.close()
                },
                onIceConnectionStateChange: function (iceState) {
                    console.log("onIceConnectionStateChange")
                    // checking
                    // connected completed
                    // disconnected failed
                    // closed
                    // console.log('onIceConnectionStateChange', iceState);
                    if (iceState == "disconnected") {
                        if (!me.rtcTimeoutID) {
                            //console.warn("Warn. disconnect. notify offline");

                            me.rtcTimeoutID = setTimeout(function () {
                                if (!(WebIM.call.pattern && WebIM.call.pattern.hangup)) {
                                    message.success("Target is offline")
                                    var closeButton = document.getElementById("webrtc_close")
                                    closeButton && closeButton.click()
                                }
                            }, 10000)
                        }
                    } else if (iceState == "connected") {
                        if (me.rtcTimeoutID) {
                            clearTimeout(me.rtcTimeoutID)
                            me.rtcTimeoutID = null
                        }
                    }
                },
                onError: function (e) {
                    if (e && e.message) {
                        var close = false
                        switch (e.message) {
                            case "CALLLING_EACH_OTHER_AT_THE_SAME_TIME":
                                e.message = "Target is calling. Please try again later."
                                close = true
                                break
                            case "TARGET_OFFLINE":
                                e.message = "Target is offline."
                                break
                        }
                        if (close) {
                            var closeButton = document.getElementById("webrtc_close")
                            closeButton && closeButton.click()
                        }
                    }
                    message.error(e && e.message ? e.message : "An error occured when calling webrtc")
                },
                onInvite: function (from, rtcOption) {
                    const { confrId, password, gid } = rtcOption
                    const { appkey, xmppURL } = WebIM.config
                    const { avModal, multiAV } = me.props
                    let host = xmppURL.split(".")
                    host = "@" + host[1] + "." + host[2]
                    from = from.replace(appkey + '_', "")
                    from = from.replace(host, "")
                    let callback = (confr) => {
                        me.props.setRtcOptions(confr)
                        confirm({
                            title: from + "邀请您进入多人会议",
                            okText: "确认",
                            cancelText: "拒绝",
                            onOk() {
                                if(avModal){
                                    message.info("您正在进行视频通话，不能接受其它邀请")
                                    return
                                }
                                me.props.showMultiAVModal()
                                me.props.setGid(gid);

                                setTimeout(() => {
                                    const pub = new WebIM.EMService.AudioMixerPubstream({
                                        constaints: {
                                            video : true,
                                        },

                                        aoff: 0
                                    })
                                    const tkt = confr.ticket
                                    WebIM.EMService.setup(tkt)
                                    WebIM.EMService.openUserMedia(pub).then(function () {
                                        WebIM.EMService.withpublish(pub).join();
                                    }, function fail(evt) {
                                        console.error("打开Media失败", evt.message());
                                    });
                                }, 0)
                            },
                            onCancel() {
                                console.log("Cancel")
                            }
                        })
                    }
                    emedia.mgr.getConferenceTkt(confrId, password).then(function (confr) {
                        callback(confr);
                    });
                }
            }
        })
        WebIM.conn.registerConfrIQHandler && (WebIM.conn.registerConfrIQHandler())
    }

    render() {
        return (
            <div className={"webim-rtc " + this.props.visible ? "" : "hide"} ref="rtcWrapper"></div>
        )
    }
}

export default connect(
    (state, props) => ({
        confr: state.multiAV.confr,
        avModal: state.multiAV.ifShowMultiAVModal,
        multiAV: state.multiAV
    }),
    dispatch => ({
        setRtcOptions: (rtfOptions) => dispatch(MultiAVActions.setRtcOptions(rtfOptions)),
        showMultiAVModal: () => dispatch(MultiAVActions.showModal()),
        setGid: (gid) => dispatch(MultiAVActions.setGid(gid)),
    })
)(WebRTCModal)
