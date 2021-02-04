import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { message, Modal } from 'antd';
// import VideoCallRedux from 'VideoCallRedux';
import Channel from './Channel';

const rtc = WebIM.rtc;
const AgoraRTC = WebIM.AgoraRTC;
class PtopCallModal extends React.Component {
	constructor(props) {
        super()
    }
    channel = null
    rtcTimeoutID = null

    componentDidMount(){
    	console.log('this.props.visible', this.props.visible)
    	console.log('callStatus =>>>', this.props.callStatus)
    	// this.channel = new Channel(this.refs.rtcWrapper)

    	// this.channel.ringing()

    	// this.join()

    	// this.addListener()
    	
    }
    componentWillReceiveProps(props){
    	console.log('this.props.callStatus',this.props.callStatus,props)
    }



	render() {
		let { minisize } = this.props
		let hide = ([1,3,5,6,7].includes(this.props.callStatus) && typeof this.props.confr.type == 'number' &&this.props.confr.type < 2) ? '' : ' hide'
		let classHide = minisize ? 'hide' : ''

		// hide = false
	return(
		<Draggable defaultPosition={{ x: 300, y: 200 }} bounds="parent">
			<div className={"multi-webim-rtc " + classHide} ref="rtcWrapper">
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


