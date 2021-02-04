import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { message, Modal } from 'antd';
import avatar from '@/themes/img/avatar@2x.png'
import accept from '@/themes/img/acceptCall@2x.png'
import hangup from '@/themes/img/hangupCall@2x.png'
import VideoCallActions from '@/redux/VideoCallRedux';
class AtertModal extends React.Component {
	constructor(){
		super()
	}


	accept(){
		const answerCallStatus = 5
		this.props.answerCall('accept')
		this.props.setCallStatus(answerCallStatus)
	}

	refuse(){
		this.props.answerCall('refuse')
		if (this.props.callStatus < 4) { //拒接
        	this.props.close()
        }
	}

	render(){
		let { type } = this.props.confr
		let text = type == 0 ? '语音': type == 1 ? '视频': '多人视频'
		return(
			<div className="rtc-alert-box">
				<div className="rtc-alert-item">
					<div className="rtc-alert-avatar">
						<img src={avatar}/>
					</div>
					<div className="rtc-alert-name">name</div>
				</div>
				<div className="rtc-alert-item">
					<div className="rtc-alert-text">邀请你{text}通话...</div>
					<div className="rtc-alert-button">
						<div>
							<img src={hangup} onClick={()=>{this.refuse()}}/>
						</div>
						<div>
							<img src={accept} onClick={()=>{this.accept()}}/>
						</div>
					</div>
				</div>
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
)(AtertModal);




