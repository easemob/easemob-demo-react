import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { message, Modal } from 'antd';
import VideoCallActions from '@/redux/VideoCallRedux';
import narrow from '@/themes/img/narrow@2x.png'
import avatar from '@/themes/img/avatar-big@2x.png'
import hangup from '@/themes/img/hangupCall@2x.png'
import microphone from '@/themes/img/microphone@2x.png'
import microphoneMute from '@/themes/img/microphone-mute@2x.png'
const rtc = WebIM.rtc;
const AgoraRTC = WebIM.AgoraRTC;

class Channel extends React.Component{
	constructor(props){
		super()
		this.state = {
            full_width: 360,
            full_height: 360,
            toggle_right: 0,
            toggle_top: 0,
            toggle_display: 'block',
            close_right: 0,
            close_bottom: 0,
            accept_left: 0,
            accept_bottom: 0,
            accept_display: 'block',
            mute_left: 0,
            mute_bottom: 6,
            mute_display: 'block',
            hasVideo: false,
            localFullRemoteCorner: true,

            muteBtnIcon: microphone,
		}
	}

	componentDidMount(){
		rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
		rtc.client.setClientRole('host')
		this.addListener()

		if (this.props.callStatus == 5) { //5 被叫加入
			this.join()
		}
	}

	componentWillReceiveProps(props){
    	if (props.callStatus == this.props.callStatus) {return}
    	if (props.callStatus === 3) {
    		// 3 主叫加入； 
    		this.join()
    	}
    }

    componentWillUnmount(){
    	if (this.props.callStatus != 0) {
    		this.props.close()
    	}
    	this.intervalID&&clearInterval(this.intervalID)
    }

	async join(){
		let {channel, token, type} = this.props.confr
        const appId = WebIM.config.AgoraAppId;
        let imUserName = WebIM.conn.context.jid.name
        let params = {
        	username: imUserName,
		    channelName: channel,
		    appkey: WebIM.conn.appKey
        }
        const {accessToken, agoraUserId} = await this.props.getRtctoken(params)

        this.interval()
       	// let res = this.props.getConfDetail(params)
       	console.log('会议详情', accessToken, agoraUserId)
        const uid = await rtc.client.join(appId, channel, accessToken, agoraUserId);
        // 通过麦克风采集的音频创建本地音频轨道对象。
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        
        // 将这些音视频轨道对象发布到频道中。

        let config = [rtc.localAudioTrack]
        if (type === 0) {
        	await rtc.client.publish(config);
        	// rtc.localAudioTrack.play();
        }else{
        	// 通过摄像头采集的视频创建本地视频轨道对象。
        	rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        	config.push(rtc.localVideoTrack)
        	await rtc.client.publish(config);
        	rtc.localVideoTrack.play("local-player");
        	// rtc.localAudioTrack.play();
        }

        console.log("publish success! --- ");
    }
	async close(){
		console.log('click hangup')
		// 销毁本地音视频轨道。
        rtc.localAudioTrack&&rtc.localAudioTrack.close();
        rtc.localVideoTrack&&rtc.localVideoTrack.close();

        if (this.props.confr.callerIMName == WebIM.conn.context.jid.name) {
        	this.props.cancelCall()
        }
        this.props.close()

        // 离开频道。
        await rtc.client.leave();
	}


	accept(){
		const answerCallStatus = 5
		// this.props.setCallStatus(answerCallStatus)
		this.props.answerCall('accept')
		this.props.setCallStatus(answerCallStatus)

	}

	toggle(){
		this.setState({
			localFullRemoteCorner: !this.state.localFullRemoteCorner
		})
	}

	mute(){
		if (!rtc.other.audioTrack) {
			return message.error('当前无对方音频轨道');
		}
		this.refs.mute.isopen?rtc.other.audioTrack.setVolume(100):rtc.other.audioTrack.setVolume(0);
        this.refs.mute.style.color = this.refs.mute.isopen?'#eeeeee':'#4eb1f4'
        this.refs.mute.isopen = !this.refs.mute.isopen
	}

	controlStream(type){
        if(type === 'audioControl'){
        	this.refs.audio.isopen?rtc.localAudioTrack.setEnabled(true):rtc.localAudioTrack.setEnabled(false);
            // this.refs.audio.style.color = this.refs.audio.isopen?'#eeeeee':'#4eb1f4'
            this.setState({
            	muteBtnIcon: this.refs.audio.isopen?microphone:microphoneMute
            })
            this.refs.audio.isopen = !this.refs.audio.isopen
            // rtc.localAudioTrack.play();
        }else{
        	// this.refs.video.isopen?rtc.client.publish(rtc.localVideoTrack):rtc.client.unpublish(rtc.localVideoTrack);
        	this.refs.video.isopen?rtc.localVideoTrack.setEnabled(true):rtc.localVideoTrack.setEnabled(false);
            this.refs.video.style.color = this.refs.video.isopen?'#eeeeee':'#4eb1f4'
            this.refs.video.isopen = !this.refs.video.isopen
            // rtc.localVideoTrack.play("local-player");
        }
	}

	addListener(){
    	rtc.client.on("user-published", async (user, mediaType) => {
    		console.log('-- 对方发布流 -- ')
            // 开始订阅远端用户。
            await rtc.client.subscribe(user, mediaType);

            // 表示本次订阅的是视频。
            if (mediaType === "video") {
                // 订阅完成后，从 `user` 中获取远端视频轨道对象。
                const remoteVideoTrack = user.videoTrack;

                // 也可以只传入该 DIV 节点的 ID。
                remoteVideoTrack.play('remote-player');

                this.setState({
                	localFullRemoteCorner: false
                })
            }

            // 表示本次订阅的是音频。
            if (mediaType === "audio") {
                // 订阅完成后，从 `user` 中获取远端音频轨道对象。
                const remoteAudioTrack = user.audioTrack;
                rtc.other = user
                // 播放音频因为不会有画面，不需要提供 DOM 元素的信息。
                remoteAudioTrack.play();
            }
        });

        rtc.client.on("user-left", () => {
        	console.log('-- 对方已离开 --')
        	this.props.close()
        })
    }

    loadTime(hour, minute, second) {
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
        str = hs == '00' ? ms + ':' + ss : hs + ':' + ms + ':' + ss
        return str
    }
    interval(){
    	let hour = 0, minute =0, second = 0;
		this.intervalID = setInterval( () => {
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
            let time = this.loadTime(hour, minute, second)
            this.props.setCallDuration(time)
        }, 1000)
	}
	minisize(){
		this.props.setMinisize(true)
	}

	render(){
		var localClassName = this.state.localFullRemoteCorner ? 'full' : 'corner';
        var remoteClassName = this.state.localFullRemoteCorner ? 'corner' : 'full'; // 大小屏的样式
        var audioCallClass = ''//this.props.confr.type === 0 ? 'audioCall' : ''; // 语音通话的样式
        // var toggle_display = (this.props.confr.type == 2)?'block': 'none';

        var accept_display = 'none'//this.props.callStatus === 4 ? 'block' : 'none'; //被叫alerting
        // var mute_display = (this.props.callStatus > 4) ? 'block' : 'none'; // 确认后

        var myName = WebIM.conn.context.jid.name;
        var {callerIMName, calleeIMName} = this.props.confr
        // var title = callerIMName == myName? calleeIMName:callerIMName

        let title = callerIMName == myName? calleeIMName:callerIMName
        let text = this.props.callStatus > 4 ? '正在通话中...' : '正在等待对方接受邀请...';
        let mute_display = (this.props.callStatus > 4) ? 'block' : 'none';// 确认后
        let muteBtnIcon = this.state.muteBtnIcon
        let video_display = (this.props.confr.type == 1)?'block': 'none';
        const time = this.props.callDuration
		return (
			<div ref='rtc' className={'webim-rtc-video ' + audioCallClass}>

				<div className="rtc-narrow">
					<img src={narrow} alt="最小化" onClick={()=>{this.minisize()}}/>
				</div>

				<div className="rtc-avatar">
					<img src={avatar}/ >
				</div>

				<div className="rtc-text">
					<div>{title}</div>
					<div>{text}</div>
				</div>

				<div className="rtc-control">
					<div style={{
						display: mute_display
					}}>
						<img ref='audio' isopen={'true'} src={muteBtnIcon} onClick={() => {this.controlStream('audioControl')}}/>
						<p>语音</p>
					</div>
					<div>
						<p className="rtc-time" style={{display: mute_display}}>{time}</p>
						<img src={hangup} onClick={() => {this.close()}}/>
						<p>挂断</p>
					</div>
				</div>
                <div className={'video '+localClassName} style={{display: video_display}} ref='localVideo' id="local-player"></div>
                <div className={'video '+remoteClassName} style={{display: video_display}} ref='remoteVideo' id="remote-player"></div>
            </div>
		)
	}
}


export default connect(
    (state, props) => ({
    	callStatus: state.callVideo.callStatus,
    	confr: state.callVideo.confr,
    	callDuration: state.callVideo.callDuration,
    }),
    (dispatch) => ({
    	close: () => dispatch(VideoCallActions.hangup()),
    	setCallStatus: (status) => dispatch(VideoCallActions.setCallStatus(status)),
    	answerCall: (result) => dispatch(VideoCallActions.answerCall(result)),
    	cancelCall: (to) => dispatch(VideoCallActions.cancelCall(to)),
    	setMinisize: (isMini) => dispatch(VideoCallActions.setMinisize(isMini)),
    	setCallDuration: (time) => dispatch(VideoCallActions.setCallDuration(time)),
    	getRtctoken: (conf) => dispatch(VideoCallActions.getRtctoken(conf)),
    	getConfDetail: (conf) => dispatch(VideoCallActions.getConfDetail(conf))
    })
)(Channel)




