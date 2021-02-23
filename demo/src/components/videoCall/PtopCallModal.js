import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { message, Modal } from 'antd';
// import VideoCallRedux from 'VideoCallRedux';
import Channel from './Channel';
import '../common/style/webrtc.less'
const rtc = WebIM.rtc;
const AgoraRTC = WebIM.AgoraRTC;
class PtopCallModal extends React.Component {
	constructor(props) {
        super()
    }
    channel = null
    rtcTimeoutID = null

    componentDidMount(){
    	// this.channel = new Channel(this.refs.rtcWrapper)
    	// this.join()
    	// this.addListener()
    	
    }
    componentWillReceiveProps(props){
    }

	render() {
		let { minisize } = this.props
		let hide = ([1,3,5,6,7].includes(this.props.callStatus) && typeof this.props.confr.type == 'number' &&this.props.confr.type < 2) ? '' : ' hide'
		let classHide = minisize ? 'hide' : ''

	return(
		<Draggable defaultPosition={{ x: 300, y: 100 }} bounds="parent">
			<div className={"webim-rtc " + classHide} ref="rtcWrapper">
				{
					hide?'':<Channel/>
				}
				
			</div>
		</Draggable>
	)}
}

export default connect(
    (state, props) => ({
    	callStatus: state.callVideo.callStatus,
    	confr: state.callVideo.confr,
    	minisize: state.callVideo.minisize
    }),
    dispatch => ({})
)(PtopCallModal)


