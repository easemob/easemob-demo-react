import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '@/config/WebIM'
import { history } from '@/utils'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import CommonActions from '@/redux/CommonRedux'
import _ from 'lodash'
import { config } from '@/config'
import { store } from '@/redux'

const rtc = WebIM.rtc;
const AgoraRTC = WebIM.AgoraRTC;
/** 
								** 呼叫流程 **
    caller            --------------------------------------             callee
	    	----------inviting--------------->
										<-------------alerting-------
			----------confirmRing------------>
										<-------------answerCall-----

*/
const CALLSTATUS = {
	idle: 0,
	inviting: 1,
	alerting: 2,
	confirmRing: 3, // caller
	receivedConfirmRing: 4, // callee
	answerCall: 5,
	receivedAnswerCall: 6,
	confirmCallee: 7
}

const { Types, Creators } = createActions({
	setCallStatus: [ 'status' ],
	updateConfr: ['msg'],
	setGid: [ 'gid' ],
	showInviteModal: null,
    closeInviteModal: null,

    /*  async methods */

    // callee
	sendAlerting: (to, calleeDevId, callId) => {
		return (dispatch, getState) => {
			console.log('我拿到state', getState())
            var id = WebIM.conn.getUniqueId();            //生成本地消息id
			var msg = new WebIM.message('cmd', id); //创建命令消息
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'alert',
					calleeDevId: WebIM.conn.deviceId,
					callerDevId: calleeDevId,
					callId: callId,
					ts: Date.now(),
					msgType: 'rtcCallWithAgora'
				}, 
				success: function ( id,serverMsgId ) {
					dispatch(Creators.setCallStatus(CALLSTATUS.alerting))
				},
				fail: function(e){
				    console.log("Fail"); //如禁言、拉黑后发送消息会失败
				}
			});

			console.log('被叫发出的alert: ', msg.body)
			WebIM.conn.send(msg.body);

			rtc.timer = setTimeout(() => {
				console.log('定时器到期')
				dispatch(Creators.cancelCall(to))
				dispatch(Creators.setCallStatus(CALLSTATUS.idle))
			}, 30000)
			console.log('设置定时器')
        }
	},

	// caller
	confirmRing: (to, calleeDevId, callerDevId, callId) => {
		return (dispatch, getState) => {

			let currentCallId = getState().callVideo.confr.callId
			let status = true
			if (callId !== currentCallId) {
				console.warn('callId 不相同')
				status = false
			}

			if (callerDevId !== WebIM.conn.deviceId) {
				console.warn('callerDevId 设备不相同')
				status = false
			}

			var id = WebIM.conn.getUniqueId();            //生成本地消息id
			var msg = new WebIM.message('cmd', id); //创建命令消息
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'confirmRing',
					status: status, // TRUE为有效，FALSE为无效（miss）
					callerDevId: WebIM.conn.deviceId,
					calleeDevId: calleeDevId,
					callId: callId,
					ts: Date.now(),
					msgType: 'rtcCallWithAgora'
				}, 
				success: function ( id,serverMsgId ) {
					if (status) {
						dispatch(Creators.setCallStatus(CALLSTATUS.confirmRing))
					}
				},
				fail: function(e){
				    console.log("Fail");
				}
			});
			WebIM.conn.send(msg.body);
		}
	},

	// callee
	answerCall: (result, info ) => {
		//{currentCallId, callerDevId, to}
		info = info || {}
		console.log('111111', result, info.currentCallId, info.callerDevId, info.to)
		return (dispatch, getState) => {
			var id = WebIM.conn.getUniqueId();            //生成本地消息id
			var msg = new WebIM.message('cmd', id); //创建命令消息
			let currentCallId = info.currentCallId || getState().callVideo.confr.callId
			let callerDevId = info.callerDevId || getState().callVideo.confr.callerDevId
			let to = info.to || getState().callVideo.confr.callerIMName
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'answerCall',
					result: result, // busy/accept/refuse
					callerDevId: callerDevId,
					calleeDevId: WebIM.conn.deviceId,
					callId: currentCallId,
					ts: Date.now(),
					msgType: 'rtcCallWithAgora'
				}, 
				success: function ( id, serverMsgId ) {
				},
				fail: function(e){
				    console.log("Fail"); //如禁言、拉黑后发送消息会失败
				}
			});
			console.log('发送answerCall', msg )
			WebIM.conn.send(msg.body);
		}
	},

	// caller
	confirmCallee: (to, calleeDevId, result)=>{
		return (dispatch, getState) => {
			var id = WebIM.conn.getUniqueId();
			var msg = new WebIM.message('cmd', id);
			let currentCallId = getState().callVideo.confr.callId

			/*增加验证是否是同一个通话*/

			
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'confirmCallee',
					result: result || 'accept', // busy/accept/refuse
					callerDevId: WebIM.conn.deviceId,
					calleeDevId: calleeDevId,
					callId: currentCallId,
					ts: Date.now(),
					msgType: 'rtcCallWithAgora'
				}, 
				success: function ( id,serverMsgId ) {
					dispatch(Creators.setCallStatus(CALLSTATUS.confirmCallee))
				},
				fail: function(e){
				    console.log("Fail")
				}
			}); 
			console.log('发送confirmCallee', msg)
			WebIM.conn.send(msg.body);
		}
	},

	cancelCall: (to) => {
		return (dispatch, getState) => {
			var id = WebIM.conn.getUniqueId();
			var msg = new WebIM.message('cmd', id);
			let callerDevId = getState().callVideo.confr.callerDevId
			let to = to || getState().callVideo.confr.calleeIMName
			let currentCallId = getState().callVideo.confr.callId
			if (!to) {
				console.log('-- to is undefined --')
				return
			}
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'cancelCall',
					callerDevId: callerDevId,
					callId: currentCallId,
					ts: Date.now(),
					msgType: 'rtcCallWithAgora'
				}, 
				success: function ( id,serverMsgId ) {
					dispatch(Creators.setCallStatus(CALLSTATUS.idle))
				},
				fail: function(e){
				    console.log("Fail"); //如禁言、拉黑后发送消息会失败
				}
			});
			console.log('发送取消消息',msg)
			WebIM.conn.send(msg.body);
		}
	},

	hangup: () => {
		rtc.localAudioTrack&&rtc.localAudioTrack.close();
        rtc.localVideoTrack&&rtc.localVideoTrack.close();
        // 离开频道。
        rtc.client.leave();

		return (dispatch, getState) => {
			dispatch(Creators.setCallStatus(CALLSTATUS.idle))
			dispatch(Creators.updateConfr({
				to: '',
				ext: {}
			}))
		}
	}

})

/* ----- Initial State ------ */

export const INITIAL_STATE = Immutable({
    callStatus: CALLSTATUS.idle,
    confr: {
    	channel: '',
    	token: '',
    	type: null,
    	callId: null,
    	callerDevId: null,
    	calleeDevId: null,
    	confrName: '',
    	callerIMName: '',
    	calleeIMName: ''
    },
    gid: '',
    inviteModal: false
})



/* ------------- Reducers ------------- */

export const setCallStatus = (state, {status}) => {
    console.log('更新会议状态-----', status)
    return state.setIn([ 'callStatus' ], status)
}

export const updateConfr = (state, {msg}) => {

	console.log('更新会议信息----', msg)
	let confrInfo = msg.ext || {}
	let confr = {
		channel: confrInfo.channelName,
		token: confrInfo.token,
		type: confrInfo.type,
		callId: confrInfo.callId,
		callerDevId: confrInfo.callerDevId,
	}
	if (confrInfo.type === 2) {
		confr.confrName = msg.to
	}else{
		confr.confrName = msg.from
	}

	if (msg.calleeIMName) {
		confr.calleeIMName = msg.calleeIMName
	}

	if (msg.callerIMName) {
		confr.callerIMName = msg.callerIMName
	}
	return state.setIn(['confr'], confr)
}

export const setGid = (state, { gid }) => {
	console.log('gid', gid)
    return state.setIn([ 'gid' ], gid)
}

export const showInviteModal = (state) => {
    console.log('showConfrModal')
    return state.setIn([ 'inviteModal' ], true)
}

export const closeInviteModal = (state) => {
    return state.setIn([ 'inviteModal' ], false)
}


/* ----- Hookup Reducers To Types ------ */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_CALL_STATUS]: setCallStatus,
	[Types.UPDATE_CONFR]: updateConfr,
	[Types.SET_GID]: setGid,
	[Types.SHOW_INVITE_MODAL]: showInviteModal,
	[Types.CLOSE_INVITE_MODAL]: closeInviteModal,

})

export default Creators





