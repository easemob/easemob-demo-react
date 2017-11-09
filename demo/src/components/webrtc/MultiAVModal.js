import React from "react"
import { connect } from "react-redux"
import WebIM from "@/config/WebIM"
import Draggable from "react-draggable"
import { Row, Col } from "antd"
import MutiAVActions from "@/redux/MultiAVRedux"
import Immutable from "seamless-immutable"

let _ = require('lodash');

class MultiAVModal extends React.Component {
    constructor(props) {
        super()
        this.state = {
            interval: null,
            hour: 0,
            minute: 0,
            second: 0,
            localVideo: {
                open: false,
                localStreamId: ""
            },
            // rv: Array.apply(null, Array(5)).map(() => {
            //     return {
            //         nickName: "",
            //         streamId: "",
            //         video: <video autoPlay />
            //     }
            // }),
            // rv: [],
            rv: new Array(5).fill({
                nickName: "",
                streamId: "",
                open: false,
                video: <div className="default"></div>
            }),
            rvCount: 0,
            toolsColor: ["", "", ""]
        }
        this.closeModal = this.closeModal.bind(this)
        this.loadTime = this.loadTime.bind(this)
    }

    componentDidMount() {
        let me = this
        if (WebIM.config.isWebRTC && WebIM.WebRTC) {
            this.initEmedia()
        }
        let interval = setInterval(function () {
            let { hour, minute, second } = me.state
            second += 1
            if (second === 60) {
                second = 0
                minute += 1
                if (minute === 60) {
                    minute = 0
                    hour += 1
                    if (hour == 24) {
                        hour = 0
                    }
                }
            }
            me.setState({
                hour: hour,
                minute: minute,
                second: second
            })
        }, 1000)
        this.setState({
            interval: interval
        })
    }

    loadTime() {
        const { hour, minute, second } = this.state
        const n2s = (n) => {
            let s = ""
            if (n >= 0 && n < 10) {
                s = '0' + n
            } else {
                s = n + ''
            }
            return s
        }
        let str = ""
        let hs = n2s(hour), ms = n2s(minute), ss = n2s(second)
        str = hs + ':' + ms + ':' + ss
        return str
    }

    removeVideo(nickName) {
        let rv = this.state.rv, temp = [], rvCount = this.state.rvCount
        for (let [index, elem] of rv.entries()) {
            if (elem.nickName === nickName) {
                for (let i = index; i < 4; i++) {
                    rv[i] = rv[i + 1]
                }
                break;
            }
        }
        rv[4] = {
            nickName: "",
            streamId: "",
            video: <video autoPlay />
        }
        this.setState({
            rvCount: --rvCount,
            rv: rv
        })
        console.log("RemoveRV: ", rv)
    }

    initEmedia() {
        if (WebIM.EMServise) {
            return
        }
        let me = this
        WebIM.EMedia.config({
            autoSub: true
        })
        WebIM.EMedia.config({
            onlyEnter: false
        })

        WebIM.EMService = new WebIM.EMedia.Service({
            nickName: WebIM.conn.context.userId,

            listeners: { //以下监听，this object == me == WebIM.EMService.current
                onMeExit: function onMeExit(reason, failed) {
                    reason = reason || 0;
                    switch (reason) {
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
                            if (failed === -9527) {
                                reason = "失败,网络原因";
                            }
                            if (failed === -500) {
                                reason = "Ticket失效";
                            }
                            if (failed === -502) {
                                reason = "Ticket过期";
                            }
                            if (failed === -504) {
                                reason = "链接已失效";
                            }
                            if (failed === -508) {
                                reason = "会议无效";
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
                    console.log("Hangup reason " + (reason || 0));
                },

                onAddMember: function onAddMember(member) {
                    console.error("onAddMember")
                    console.log(member.id + " " + (member.nickName || "") + " enter， ext = " + member.ext);
                },
                onRemoveMember: function onRemoveMember(member) {
                    me.removeVideo(member.nickName)
                    console.log("onRemoveMember:", member.id + " " + (member.nickName || "") + " exit, has members: " + WebIM.EMService.getCurrentMembers().length);
                },

                onAddStream: function onAddStream(stream) {
                    console.error("onAddStream htmlId: ", stream.getHtmlDOMID())
                    console.error("onAddStream streamId: ", stream.id)
                    console.error("onAddStream name: ", stream.name)
                    console.error("onAddStream type: ", stream.type)
                    console.error("onAddStream located: ", stream.located())
                    console.log("Add stream: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--") + "， ext = " + stream.ext);
                },
                onRemoveStream: function onRemoveStream(stream) {
                    console.error("onRemoveStream: ", stream)
                    console.log("Remove stream: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--"));
                },
                onUpdateStream: function onUpdateStream(stream, update) {
                    console.error("onUpdateStream htmlId: ", stream.getHtmlDOMID())
                    console.error("onUpdateStream streamId: ", stream.id)
                    console.error("onUpdateStream name: ", stream.name)
                    console.error("onUpdateStream type: ", stream.type)
                    console.error("onUpdateStream located: ", stream.located())
                    console.log("onUpdateStream: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--") + "， ext = " + stream.ext);
                    const located = stream.located()
                    if (located) {
                        let localVideo = me.refs.local
                        stream.ifMediaStream(function (mediaStream) {
                            localVideo.srcObject = mediaStream
                        })
                        let lv = {
                            localStreamId: stream.id,
                            open: true
                        }
                        me.setState({
                            localVideo: lv
                        })
                        me.props.setLocalStream(stream)
                    } else {
                        let remoteVideos = me.state.remoteVideos
                        let remoteUsernames = me.state.remoteUsernames
                        let rv = me.state.rv, rvCount = me.state.rvCount
                        const nickName = stream.owner.nickName,
                            streamId = stream.id
                        const contains = (nickName, arr) => {
                            for (let [index, elem] of arr.entries()) {
                                if (elem.nickName === nickName) {
                                    return index
                                }
                            }
                            return false
                        }

                        const ifContain = contains(nickName, rv)
                        if (ifContain === false) {
                            stream.ifMediaStream(function (mediaStream) {
                                let video = <video autoPlay src={URL.createObjectURL(mediaStream)} />
                                // video.srcObject = mediaStream
                                const elem = {
                                    nickName: nickName,
                                    streamId: streamId,
                                    video: video,
                                    open: true
                                }
                                rv[rvCount] = elem
                                ++rvCount
                                me.setState({
                                    rv: rv,
                                    rvCount: rvCount
                                })
                            })
                        } else {
                            stream.ifMediaStream(function (mediaStream) {
                                let video = null
                                try {
                                    video = <video autoPlay src={URL.createObjectURL(mediaStream)} />
                                } catch (e) {
                                    console.log("Error: ", e.message)
                                    video = <div className="default"></div>
                                }
                                // video.srcObject = mediaStream
                                const elem = {
                                    nickName: nickName,
                                    streamId: streamId,
                                    video: video,
                                    open: true
                                }
                                rv[ifContain] = elem
                                me.setState({
                                    rv: rv
                                })
                            })
                        }
                    }
                    console.error("onUpdateStream")
                    console.log("Update stream: " + stream.id + " located: " + stream.located() + " webrtc: " + (stream.rtcId || "--"));
                },
                onNetworkWeak: function onNetworkWeak() {
                    console.error("onNetworkWeak")
                    console.log("当前通话连接质量不佳");
                },
                onNotifyEvent: function onNotifyEvent(evt) {
                    if (evt instanceof emedia.event.ServerRefuseEnter) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.EnterSuccess) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.EnterFail) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.ICERemoteMediaStream) {
                        //console.log(evt.message());
                    } else if (evt instanceof emedia.event.PushSuccess) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.SubSuccess) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.PushFail) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.SubFail) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.StreamState) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.ShareDesktopExtensionNotFound) {
                        console.log(evt.message());
                    } else if (evt instanceof emedia.event.RemoteControlFail) {
                        console.log(evt.message());
                    }
                }
            }
        })
    }

    closeModal() {
        clearInterval(this.state.interval)
        WebIM.EMService.exit()
        this.props.closeModal()
    }

    localMic() {
        console.log("LocalMic......")
    }

    remoteSound() {
        console.log("remoteSound")
    }

    localVideo() {
        console.log("LocalVideo")
        let { open, localStreamId } = this.state.localVideo
        if (open) {
            this.refs.local.src = ""
            WebIM.EMService.hungup(localStreamId, function (evt) {
                console.log("LocalStreamClosed")
            })
            this.setState({
                localVideo: {
                    open: false,
                    localStreamId: localStreamId
                }
            })
        } else {
            const pub = new WebIM.EMService.AVPubstream({
                constaints: {
                    audio: true,
                    video: true
                },
                aoff: 0,
                voff: 0,
                name: "video",
                ext: {
                    hello: "Hello"
                }
            })
            const tkt = this.props.confr.rtcOptions.ticket
            WebIM.EMService.openUserMedia(pub).then(function () {
                WebIM.EMService.push(pub);
                this.setState({
                    localVideo: {
                        open: true,
                        localStreamId: localStreamId
                    }
                })
            }.bind(this), function fail(evt) {
                console.error("打开Media失败", evt.message());
            });
        }
    }

    remoteVideo(id) {
        let rv =  _.cloneDeep(this.state.rv)
        let elem = rv[id]
        if (elem.open) {
                rv[id].open = false
            WebIM.EMService.hungup(elem.streamId, function (_evt) {
                
            });
        } else {
            WebIM.EMService.subscribe(elem.streamId, function (_evt) {

                elem.open = true
                rv[id] = elem
            })
        }
        this.setState({
            rv: rv
        })
    }

    render() {
        const time = this.loadTime(),
            gid = this.props.gid,
            byId = this.props.byId,
            toolsColor = this.state.toolsColor,
            rvCount = this.state.rvCount,
            groupName = byId[gid] && byId[gid].groupname || "群组名称",
            remoteUsernames = this.state.remoteUsernames

        let rv = this.state.rv
        for (let i = rvCount; i < 5; i++) {
            rv[i] = {
                nickName: "",
                streamId: "",
                video: <div className="default"></div>
            }
        }

        return (
            <Draggable
                defaultPosition={{ x: 300, y: 200 }}
                bounds="parent">
                <div className="multi-webim-rtc">
                    <Row>
                        <Col span={24} className="groupname">
                            {groupName}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="time">
                            {time}
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8} className="gutter-row">
                            <video ref="local" muted autoPlay />
                            <div className="user-name">
                                <span>{WebIM.conn.context.userId}</span>
                                <i className="icon iconfont icon-alarm"></i>
                            </div>
                        </Col>
                        <Col span={8} className="gutter-row">
                            {rv[0] && rv[0].video}
                            <div className="user-name">
                                <span>{rv[0].nickName}</span>
                                <i className="icon iconfont icon-alarm"
                                    onClick={this.remoteVideo.bind(this, 0)}
                                >
                                </i>
                            </div>
                        </Col>
                        <Col span={8} className="gutter-row">
                            {rv[1] && rv[1].video}
                            <div className="user-name">
                                <span>{rv[1].nickName}</span>
                                <i className="icon iconfont icon-alarm"
                                    onClick={this.remoteVideo.bind(this, 1)}
                                ></i>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={6}>
                        <Col span={24} className="gutter-row video-divisor">

                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8} className="gutter-row">
                            {rv[2] && rv[2].video}
                            <div className="user-name">
                                <span>{rv[2].nickName}</span>
                                <i className="icon iconfont icon-alarm"
                                    onClick={this.remoteVideo.bind(this, 2)}
                                ></i>
                            </div>
                        </Col>
                        <Col span={8} className="gutter-row">
                            {rv[3] && rv[3].video}
                            <div className="user-name">
                                <span>{rv[3].nickName}</span>
                                <i className="icon iconfont icon-alarm"
                                    onClick={this.remoteVideo.bind(this, 3)}
                                ></i>
                            </div>
                        </Col>
                        <Col span={8} className="gutter-row">
                            {rv[4] && rv[4].video}
                            <div className="user-name">
                                <span>{rv[4].nickName}</span>
                                <i className="icon iconfont icon-alarm"
                                    onClick={this.remoteVideo.bind(this, 4)}
                                ></i>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={6}>
                        <Col span={24} className="gutter-row tools-divisor">

                        </Col>
                    </Row>
                    <Row>
                        <Col span={4} offset={4}>
                            <div className="tools">
                                <i className={"icon iconfont icon-mic " + toolsColor[0]}
                                    onMouseOver={(e) => {
                                        if (toolsColor[0] === "") {
                                            toolsColor[0] = "i-hover"
                                            this.setState({
                                                toolsColor: toolsColor
                                            })
                                        }
                                    }
                                    }

                                    onClick={(e) => {
                                        if (toolsColor[0] === "i-hover") {
                                            toolsColor[0] = "i-act"
                                        } else {
                                            toolsColor[0] = ""
                                        }
                                        this.localMic()
                                        this.setState({
                                            toolsColor: toolsColor
                                        })
                                    }}

                                    onMouseLeave={(e) => {
                                        if (toolsColor[0] === "i-hover") {
                                            toolsColor[0] = ""
                                        }
                                        this.setState({
                                            toolsColor: toolsColor
                                        })
                                    }}
                                ></i>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div className="tools">
                                <i className={"icon iconfont icon-mic " + toolsColor[1]}
                                    onMouseOver={(e) => {
                                        if (toolsColor[1] === "") {
                                            toolsColor[1] = "i-hover"
                                            this.setState({
                                                toolsColor: toolsColor
                                            })
                                        }
                                    }
                                    }

                                    onClick={(e) => {
                                        if (toolsColor[1] === "i-hover") {
                                            toolsColor[1] = "i-act"
                                        } else {
                                            toolsColor[1] = ""
                                        }
                                        this.remoteSound()
                                        this.setState({
                                            toolsColor: toolsColor
                                        })
                                    }}

                                    onMouseLeave={(e) => {
                                        if (toolsColor[1] === "i-hover") {
                                            toolsColor[1] = ""
                                        }
                                        this.setState({
                                            toolsColor: toolsColor
                                        })
                                    }}
                                >
                                </i>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div className="tools">
                                <i className={"icon iconfont icon-mic " + toolsColor[2]}
                                    onMouseOver={(e) => {
                                        if (toolsColor[2] === "") {
                                            toolsColor[2] = "i-hover"
                                            this.setState({
                                                toolsColor: toolsColor
                                            })
                                        }
                                    }
                                    }

                                    onClick={(e) => {
                                        if (toolsColor[2] === "i-hover") {
                                            toolsColor[2] = "i-act"
                                        } else {
                                            toolsColor[2] = ""
                                        }
                                        this.localVideo()
                                        this.setState({
                                            toolsColor: toolsColor
                                        })
                                    }}

                                    onMouseLeave={(e) => {
                                        if (toolsColor[2] === "i-hover") {
                                            toolsColor[2] = ""
                                        }
                                        this.setState({
                                            toolsColor: toolsColor
                                        })
                                    }}
                                ></i>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div className="tools">
                                <div className="hangup" onClick={this.closeModal}>
                                    挂断
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Draggable>
        )
    }
}

export default connect(
    ({ multiAV, entities }) => ({
        multiAV,
        byId: entities.group.byId,
        gid: multiAV.gid,
        confr: multiAV.confr
    }),
    dispatch => ({
        closeModal: () => dispatch(MutiAVActions.closeModal()),
        setLocalStream: (stream) => dispatch(MutiAVActions.setLocalStream(stream))
    })
)(MultiAVModal)