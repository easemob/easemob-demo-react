import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import VideoCallActions from '@/redux/VideoCallRedux';
import minimodal from '@/themes/img/minimodal@2x.png'
import { connect } from 'react-redux';
class MiniModal extends  React.Component{
	constructor(){
		super()
	}

	handleClick(e){
		this.props.setMinisize(false)
	}

	render(){
		let time = this.props.callDuration
		return(
			<Draggable defaultPosition={{ x: 0, y: 0 }} bounds="parent">
				<div className="rtc-minimodal">
					<p onClick={(e)=>{this.handleClick(e)}}></p>
					<div>{time}</div>
				</div>
			</Draggable>

		)
	}
}

export default connect(
	(state, props) => ({
    	callStatus: state.callVideo.callStatus,
    	confr: state.callVideo.confr,
    	callDuration: state.callVideo.callDuration
    }),
    (dispatch) => ({
    	close: () => dispatch(VideoCallActions.hangup()),
    	setCallStatus: (status) => dispatch(VideoCallActions.setCallStatus(status)),
    	answerCall: (result) => dispatch(VideoCallActions.answerCall(result)),
    	cancelCall: (to) => dispatch(VideoCallActions.cancelCall(to)),
    	setMinisize: (isMini) => dispatch(VideoCallActions.setMinisize(isMini)),
    })
)(MiniModal)