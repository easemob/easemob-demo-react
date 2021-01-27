import React from 'react'
import { connect } from 'react-redux'
import WebIM from '@/config/WebIM'
import Draggable from 'react-draggable'
import { message, Row, Col, Modal } from 'antd'
import MultiAVActions from '@/redux/MultiAVRedux'
import VideoCallActions from '@/redux/VideoCallRedux'
import Immutable from 'seamless-immutable'
import { store } from '@/redux'
const confirm = Modal.confirm
const rtc = WebIM.rtc;
const AgoraRTC = WebIM.AgoraRTC;

class MultiAVModal extends React.Component {
	constructor(props) {
        super()

        this.state = {
        	videos: [
        		{},
        		{},
        		{},
        		{},
        		{},
        		{}
        	],
        	aoff: false,
			voff: false,
			hour: 0,
            minute: 0,
            second: 0,
        }
        this.loadTime = this.loadTime.bind(this)
    }

    componentDidMount(){
    	rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
		this.addListener()
		this.join()
		this.interval()

		console.log('多人会议页面参数更新：', this.props.callStatus)
	}


	componentWillReceiveProps(props){
    	console.log('----多人会议页面参数更新： ----- ',props)
    	if (props.callStatus === 3 || props.callStatus === 5) {
    		// 3 主叫加入； 5 被叫加入
    		// this.join()
    	}
    }

	interval(){
		let interval = setInterval( () => {
            let { hour, minute, second } = this.state
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
            this.setState({
                hour: hour,
                minute: minute,
                second: second
            })
        }, 1000)
        this.setState({
            interval: interval
        })
	}

	async join(){
    	var options = {
            // 替换成你自己项目的 App ID。
            appId: "15cb0d28b87b425ea613fc46f7c9f974",
            // 传入目标频道名。
            channel: "channel1",
            // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
            token: null,
        };

        let confr = this.props.confr

        let imUserName = WebIM.conn.context.jid.name

        const uid = await rtc.client.join(options.appId, confr.channel, null, imUserName);

        // 通过麦克风采集的音频创建本地音频轨道对象。
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // 通过摄像头采集的视频创建本地视频轨道对象。
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        // 将这些音视频轨道对象发布到频道中。
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

        console.log("publish success! --- ");

        rtc.localVideoTrack.play("video0");

        let { videos } = this.state
        videos[0] = {videoElm: 'video0', name: imUserName, type: 'video'}

        this.setState({
        	videos
        })
    }

    addListener(){
    	rtc.client.on("user-published", async (user, mediaType) => {
    		console.log('有远端画面 -------- ')
    		console.log(user, mediaType)
            // 开始订阅远端用户。
            await rtc.client.subscribe(user, mediaType);
            console.log("subscribe success");

            let { videos } = this.state
            let videoElm = ''
            let exist = false;
            videos.forEach((item, index) => {
            	if (item.name === user.uid) {
            		exist = true
            		item.type = mediaType
            		videoElm = 'video' + index;
            	}
            })

            if (!exist) {
            	for (let i = 0, len = videos.length; i < len; i++) {
	            	if (!videos[i].name) {
	            		videos[i] = {
	            			name: user.uid,
	            			videoElm: 'video' + i,
	            			type: mediaType
	            		}
	            		videoElm = 'video' + i;
	            		break;
	            	}
	            }
            }
            
            this.setState({
            	videos
            })

            // 表示本次订阅的是视频。
            if (mediaType === "video") {
                // 订阅完成后，从 `user` 中获取远端视频轨道对象。
                const remoteVideoTrack = user.videoTrack;
                // 也可以只传入该 DIV 节点的 ID。
                remoteVideoTrack.play(videoElm);
            }

            // 表示本次订阅的是音频。
            if (mediaType === "audio") {
                // 订阅完成后，从 `user` 中获取远端音频轨道对象。
                const remoteAudioTrack = user.audioTrack;
                // 播放音频因为不会有画面，不需要提供 DOM 元素的信息。
                remoteAudioTrack.play();
            }
        });

        // 监听远端取消发布
        rtc.client.on("user-unpublished", (user, mediaType) => {
        	console.log('取消发布了')
        });

        rtc.client.on("user-left", (user) => {
        	console.log('-- 对方已离开 --', user)
            let { videos } = this.state
            let newVideos = videos.map((item, index) => {
            	if (item.name === user.uid) {
            		return {}
            	}
            	return item
            })
            this.setState({
            	videos: newVideos
            })
        })
    }

    closeModal(){
    	console.log('挂断')
    	// rtc.localAudioTrack&&rtc.localAudioTrack.close();
     //    rtc.localVideoTrack&&rtc.localVideoTrack.close();

     //    // 离开频道。
     //    rtc.client.leave();

        this.props.hangup()
    }

    open_camera(){
    	// rtc.client.publish(rtc.localVideoTrack);
    	this.setState({
    		voff: false
    	})
    	rtc.localVideoTrack.setEnabled(true)
    }

    close_camera(){
    	// rtc.client.unpublish(rtc.localVideoTrack);
    	this.setState({
    		voff: true
    	})
    	rtc.localVideoTrack.setEnabled(false)
    }

    open_mic(){
    	// rtc.client.publish(rtc.localAudioTrack);
    	this.setState({
    		aoff: false
    	})
    	rtc.localAudioTrack.setEnabled(true)
    }

    close_mic(){
    	// rtc.client.unpublish(rtc.localAudioTrack);
    	this.setState({
    		aoff: true
    	})
    	rtc.localAudioTrack.setEnabled(false)
    }

    addMember(){
    	console.log('添加')
    	this.props.showInviteModal()
    }

    loadTime() {
        const { hour, minute, second } = this.state
        const n2s = (n) => {
            let s = ''
            if (n >= 0 && n < 10) {
                s = '0' + n
            } else {
                s = n + ''
            }
            return s
        }
        let str = ''
        let hs = n2s(hour), ms = n2s(minute), ss = n2s(second)
        str = hs + ':' + ms + ':' + ss
        return str
    }

    render() {
    	const time = this.loadTime()
    	let groupName = '多人会议'
    	let { voff, aoff } = this.state
    	let streams = []

    	let videos = this.state.videos

    	return (
    		<Draggable
                defaultPosition={{ x: 300, y: 200 }}
                bounds="parent"
                >

                <div className="multi-webim-rtc multi-webim-rtc2">
                    <div className="groupname">{groupName}</div>
                    <div className="time">{time}</div>

                    <Row gutter={4}>

                    	{/* 占位框 */}
                        {
                            videos.map(
                                (item, index) => (
                                    <Col span={8} key={index}> 
                                    	<div className='default' id={'video' + index}></div>
                                    	<div className="user-name">
                                            <span>{item.name || ''}</span>
                                        </div>
                                    </Col>
                                )
                            )
                        }

                    </Row>

	                <div className='action-wrap'>
		                <div className="tools">
		                    <i className='icon iconfont icon-add'
		                        onClick={() => this.addMember()}
		                    ></i>
		                </div>
		                <div className="tools">
		                    {
		                        aoff ? 
		                        <i className='icon iconfont icon-mic_off' onClick={() => this.open_mic()}></i> : 
		                        <i className='icon iconfont icon-mic_on'  onClick={() => this.close_mic()}></i>
		                    }
		                </div>
		                <div className="tools">
		                    {
		                        voff ? 
		                        <i className='icon iconfont icon-video_off' onClick={() => this.open_camera()}></i> :
		                        <i className='icon iconfont icon-video_on'  onClick={() => this.close_camera()}></i>
		                    }
		                </div>

		                <div className="tools">
		                    <div className="hangup" onClick={() => this.closeModal()}>
		                        挂断
		                    </div>
		                </div>
	                </div>
                </div>
            </Draggable>
    	)

    }

}

export default connect(
    ({ multiAV, entities, callVideo }) => ({
        multiAV,
        byId: entities.group.byId,
        gid: callVideo.gid,
        confr: callVideo.confr,
        callStatus: callVideo.callStatus,
    }),
    dispatch => ({
        closeModal: () => dispatch(MultiAVActions.closeModal()),
        setLocalStream: (stream) => dispatch(MultiAVActions.setLocalStream(stream)),
        resetConfr: () => dispatch(MultiAVActions.resetAll()),
        updateConfrInfo: (gid) => dispatch(MultiAVActions.updateConfrInfoAsync(gid)),
        showConfrModal: () => dispatch(MultiAVActions.showConfrModal()),
        setJoinedMembers: (joined) => dispatch(MultiAVActions.setJoinedMembers(joined)),
        updateJoinedMembers: (removed) => dispatch(MultiAVActions.updateJoinedMembers(removed)),
        hangup: () => dispatch(VideoCallActions.hangup()),
        showInviteModal: () => dispatch(VideoCallActions.showInviteModal())
    })
)(MultiAVModal)

