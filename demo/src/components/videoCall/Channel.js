import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { message, Modal } from 'antd';
import VideoCallActions from '@/redux/VideoCallRedux';
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
            localFullRemoteCorner: true
		}
	}

	componentDidMount(){
		console.log('Channel callStatus --- +++ ***:', this.props.callStatus)
		this.addListener()
		// this.join()
	}

	componentWillReceiveProps(props){
    	console.log('this.props.callStatus',props,this.props.callStatus)
    	if (props.callStatus === 3 || props.callStatus === 5 || props.callStatus === 7) {
    		// 3 主叫加入； 5 被叫加入
    		this.join()
    	}
    }

	async join(){
		let {channel, token, type} = this.props.confr
		console.log('加入时的参数', channel, token, type)
    	var options = {
            // 替换成你自己项目的 App ID。
            // appId: "783c9572963e447e96ee41685fa6ed9f",
            appId: '15cb0d28b87b425ea613fc46f7c9f974',
            // 传入目标频道名。
            channel: channel,
            // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
            token: null //token,
        };

        const uid = await rtc.client.join(options.appId, options.channel, options.token, null);

        // 通过麦克风采集的音频创建本地音频轨道对象。
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        
        // 将这些音视频轨道对象发布到频道中。

        let config = [rtc.localAudioTrack]
        
        if (type === 0) {
        	await rtc.client.publish(config);
        	rtc.localAudioTrack.play();
        }else{
        	// 通过摄像头采集的视频创建本地视频轨道对象。
        	rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        	config.push(rtc.localVideoTrack)
        	await rtc.client.publish(config);
        	rtc.localVideoTrack.play("local-player");
        	rtc.localAudioTrack.play();


        }

        console.log("publish success! --- ");
        
    }
	async close(){
		// 销毁本地音视频轨道。
        rtc.localAudioTrack&&rtc.localAudioTrack.close();
        rtc.localVideoTrack&&rtc.localVideoTrack.close();

        // 离开频道。
        await rtc.client.leave();

        this.props.callStatus
        if (this.props.callStatus < 5) { //拒接
        	this.props.answerCall('refuse')
        }

        if (this.props.confr.callerIMName == WebIM.conn.context.jid.name) {
        	this.props.cancelCall()
        }
        this.props.close()
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
		console.log('控制音量')
		this.refs.mute.isopen?rtc.other.audioTrack.setVolume(100):rtc.other.audioTrack.setVolume(0);
        this.refs.mute.style.color = this.refs.mute.isopen?'#eeeeee':'#4eb1f4'
        this.refs.mute.isopen = !this.refs.mute.isopen
	}

	controlStream(type){
		console.log(type, this.refs.video.isopen)
        if(type === 'audioControl'){
        	this.refs.audio.isopen?rtc.localAudioTrack.setEnabled(true):rtc.localAudioTrack.setEnabled(false);
            this.refs.audio.style.color = this.refs.audio.isopen?'#eeeeee':'#4eb1f4'
            this.refs.audio.isopen = !this.refs.audio.isopen
            rtc.localAudioTrack.play();
        }else{
        	console.log('this.refs.video.isopen', this.refs.video.isopen)
        	// this.refs.video.isopen?rtc.client.publish(rtc.localVideoTrack):rtc.client.unpublish(rtc.localVideoTrack);
        	this.refs.video.isopen?rtc.localVideoTrack.setEnabled(true):rtc.localVideoTrack.setEnabled(false);
            this.refs.video.style.color = this.refs.video.isopen?'#eeeeee':'#4eb1f4'
            this.refs.video.isopen = !this.refs.video.isopen
            rtc.localVideoTrack.play("local-player");
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

	render(){
		var localClassName = this.state.localFullRemoteCorner ? 'full' : 'corner';
        var remoteClassName = this.state.localFullRemoteCorner ? 'corner' : 'full'; // 大小屏的样式
        var audioCallClass = this.props.confr.type === 0 ? 'audioCall' : ''; // 语音通话的样式
        var toggle_display = (this.props.confr.type == 2)?'block': 'none';

        var accept_display = this.props.callStatus === 4 ? 'block' : 'none'; //被叫alerting
        var mute_display = (this.props.callStatus > 4) ? 'block' : 'none'; // 确认后

        var myName = WebIM.conn.context.jid.name;
        var {callerIMName, calleeIMName} = this.props.confr
        var title = callerIMName == myName? calleeIMName:callerIMName
		return (
			<div ref='rtc' className={'webim-rtc-video ' + audioCallClass}>

                <div className={'video '+localClassName} ref='localVideo' id="local-player"></div>
                <div className={'video '+remoteClassName} ref='remoteVideo' id="remote-player"></div>

                <span>{title}</span>
                <i ref='close' id='webrtc_close' className='font small close' style={{
                    left: 'auto',
                    right: this.state.close_right + 'px',
                    top: 'auto',
                    bottom: this.state.close_bottom + 'px'
                }} onClick={() => {this.close()}}>Q</i>
                <i ref='accept' className='font small accept' style={{
                    display: accept_display,
                    left: this.state.accept_left + 'px',
                    right: 'auto',
                    top: 'auto',
                    bottom: this.state.accept_bottom + 'px'
                }} onClick={() => this.accept()}>z</i>
                <i ref='toggle' className='font small toggle'
                    style={{
                        display: toggle_display,
                        left: 'auto',
                        right: this.state.toggle_right + 'px',
                        top: this.state.toggle_top + 'px',
                        bottom: 'auto'
                    }} onClick={()=>{this.toggle()}}>d</i>
                { <i ref='mute' className='font small mute'
                    style={{
                        display: mute_display,
                        left: this.state.toggle_right + 'px',
                        right: 'auto',
                        top: 'auto',
                        bottom: this.state.mute_bottom + 'px'
                    }} onClick={this.mute.bind(this)}>m</i>}
                <i ref='audio' isopen={'true'} className='font small mute'
                    style={{
                        display: mute_display,
                        left: this.state.toggle_right + 30 + 'px',
                        right: 'auto',
                        top: 'auto',
                        bottom: this.state.mute_bottom + 'px'
                    }} onClick={this.controlStream.bind(this, 'audioControl')}>u</i>
                <i ref='video' isopen={'true'} className='font small mute'
                    style={{
                        display: (mute_display == 'block' && this.props.confr.type == 1)?'block': 'none',
                        left: this.state.toggle_right + 60 + 'px',
                        right: 'auto',
                        top: 'auto',
                        bottom: this.state.mute_bottom + 'px'
                    }} onClick={this.controlStream.bind(this,'videoControl')}>v</i>
            </div>
		)
	}
}


export default connect(
    (state, props) => ({
    	callStatus: state.callVideo.callStatus,
    	confr: state.callVideo.confr
    }),
    (dispatch) => ({
    	close: () => dispatch(VideoCallActions.hangup()),
    	setCallStatus: (status) => dispatch(VideoCallActions.setCallStatus(status)),
    	answerCall: (result) => dispatch(VideoCallActions.answerCall(result)),
    	cancelCall: (to) => dispatch(VideoCallActions.cancelCall(to))
    })
)(Channel)




