import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '@/config/WebIM'
import { history } from '@/utils'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import CommonActions from '@/redux/CommonRedux'
import _ from 'lodash'
import { config } from '@/config'
import { store } from '@/redux'
import axios from 'axios'
const rtc = WebIM.rtc;
const AgoraRTC = WebIM.AgoraRTC;
/** 
								** 呼叫流程 **
    caller            --------------------------------------             callee
	    	----------inviting--------------->
										<-------------alerting-------
			----------confirmRing------------>
										<-------------answerCall-----
			----------confirmCallee---------->
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
	setCallDuration: ['time'],
	setMinisize: ['isMini'],
	updateConfr: ['msg'],
	setGid: [ 'gid' ],
	showInviteModal: null,
    closeInviteModal: null,
    setJoinedMembers: ['members'],
    setInvitedMembers: ['members'],
    updateJoinedMembers: [ 'removed' ],
    resetAll: null,
    /*  async methods */

    // callee
	sendAlerting: (to, calleeDevId, callId) => {
		return (dispatch, getState) => {
            var id = WebIM.conn.getUniqueId();            //生成本地消息id
			var msg = new WebIM.message('cmd', id); //创建命令消息
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'alert',
					calleeDevId: WebIM.conn.context.jid.clientResource,
					callerDevId: calleeDevId,
					callId: callId,
					ts: Date.now(),
					msgType: 'rtcCallWithAgora'
				}, 
				success: function ( id,serverMsgId ) {
					dispatch(Creators.setCallStatus(CALLSTATUS.alerting))
				},
				fail: function(e){
				    console.log("Fail");
				}
			});

			console.log('被叫发出的alert: ', msg.body)
			WebIM.conn.send(msg.body);
			rtc.timer = setTimeout(() => {
				console.log('定时器到期')
				dispatch(Creators.hangup())
				dispatch(Creators.setCallStatus(CALLSTATUS.idle))
			}, 30000)
			console.log('设置定时器')
        }
	},

	// caller
	confirmRing: (to, calleeDevId, callerDevId, callId) => {
		return (dispatch, getState) => {
			let confr = getState().callVideo.confr
			let currentCallId = confr.callId
			let status = true
			console.log('confirmRing confr', confr)
			if (callId !== currentCallId) {
				console.warn('callId 不相同', callId)
				status = false
			}

			if (getState().callVideo.callStatus > 4 && confr.type != 2) { //已经在通话中
				status = false
			}
			// if (confr.calleeDevId && confr.calleeDevId != calleeDevId){
			// 	console.warn('calleeDevId 不相同')
			// 	status = false
			// }

			if (callerDevId !== WebIM.conn.context.jid.clientResource) {
				console.warn('callerDevId 设备不相同')
				return
			}

			var id = WebIM.conn.getUniqueId();            //生成本地消息id
			var msg = new WebIM.message('cmd', id); //创建命令消息
			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'confirmRing',
					status: status, // TRUE为有效，FALSE为无效（miss）
					callerDevId: WebIM.conn.context.jid.clientResource,
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
			console.log('发送confirmRing', msg)
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
					calleeDevId: WebIM.conn.context.jid.clientResource,
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

			let confr = getState().callVideo.confr
			let currentCallId = confr.callId

			if (!confr.calleeDevId && confr.type !=2 ) {
				dispatch(Creators.updateConfr({
					to: confr.confrName,
					ext: {
						channelName: confr.channel,
						token: confr.token,
						type: confr.type,
						callerDevId: confr.callerDevId,
						calleeDevId: calleeDevId,
		                callId: confr.callId,
					},
					calleeIMName: confr.calleeIMName,
					callerIMName: confr.callerIMName
				}))
			}else if(confr.calleeDevId != calleeDevId && confr.type !=2){
				result = 'refuse'
			}

			msg.set({
				to: to,
				action : 'rtcCall', 
				ext: {
					action: 'confirmCallee',
					result: result || 'accept', // busy/accept/refuse
					callerDevId: WebIM.conn.context.jid.clientResource,
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
			let user = to || getState().callVideo.confr.calleeIMName
			let currentCallId = getState().callVideo.confr.callId
			if (!user) {
				console.log('-- to is undefined --')
				return
			}
			msg.set({
				to: user,
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
				    console.log("Fail");
				}
			});
			console.log('发送取消消息',msg)
			WebIM.conn.send(msg.body);
		}
	},

	hangup: () => {
		rtc.localAudioTrack&&rtc.localAudioTrack.close();
        rtc.localVideoTrack&&rtc.localVideoTrack.close();
        rtc.client&&rtc.client.leave();

		return (dispatch, getState) => {
			dispatch(Creators.setCallStatus(CALLSTATUS.idle))
			dispatch(Creators.setCallDuration('00:00'))
			dispatch(Creators.setMinisize(false))
			dispatch(Creators.resetAll())
			dispatch(Creators.setJoinedMembers([]))
			dispatch(Creators.setInvitedMembers([]))
			dispatch(Creators.updateConfr({
				to: '',
				ext: {}
			}))
		}
	},

	getRtctoken: (params)=>{
		return (dispatch, getState) => {
			dispatch(CommonActions.fetching())
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + WebIM.conn.context.accessToken;
			let {username, channelName, appkey} = params
			return axios.get(`//a1-hsb.easemob.com/token/rtcToken?userAccount=${username}&channelName=${channelName}&appkey=${encodeURIComponent(appkey)}`)
			.then(function (response) {
			    dispatch(CommonActions.fetched())
			    return response.data
			})
			.catch(function (error) {
				dispatch(CommonActions.fetched())
			    console.log(error);
			});
		}
		
	}

})

/* ----- Initial State ------ */

export const INITIAL_STATE = Immutable({
    callStatus: CALLSTATUS.idle,
    callDuration: '00:00',
    minisize: false,
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
    inviteModal: false,
    joinedMembers: [],
    invitedMembers: [],
})



/* ------------- Reducers ------------- */

export const setCallStatus = (state, {status}) => {
    console.log('更新会议状态-----', status)
    return state.setIn([ 'callStatus' ], status)
}

export const setCallDuration = (state, {time}) => {
	return state.setIn([ 'callDuration' ], time)
}

export const setMinisize = (state, {isMini}) => {
	return state.setIn([ 'minisize' ], isMini)
}

export const setJoinedMembers = (state, { members }) => {
	let join = state.getIn([ 'joinedMembers' ])
    let joinCurrent = join.concat(members)
    let invitedMem = state.getIn([ 'invitedMembers' ])
    let newInvitedMem = []
    if (invitedMem.length) {
    	newInvitedMem = invitedMem.filter((item) => {
    		if (item.value != members.name) { return item}
    	})
    }
    return state.setIn([ 'joinedMembers' ],joinCurrent)
    	   .setIn(['invitedMembers'], newInvitedMem)
}
export const updateJoinedMembers = (state, { removed }) => {
    let join = state.getIn([ 'joinedMembers' ])
    let joinCurrent = join.filter((item) => {
    	if (item.name != removed.name) {
    		return item
    	}
    });
    // let joinCurrent = _.difference(join,[ removed.name ])
    console.log('joinCurrent',joinCurrent)
    return state.setIn([ 'joinedMembers' ],joinCurrent)
}
export const setInvitedMembers = (state, { members }) => {
	// let invitedMem = members.map( (item) => ({name: item}))
	return state.setIn(['invitedMembers'], members)
}

export const updateConfr = (state, {msg}) => {
	let confrInfo = msg.ext || {}
	let groupId
	let confr = {
		channel: confrInfo.channelName,
		token: confrInfo.token,
		type: confrInfo.type,
		callId: confrInfo.callId,
		callerDevId: confrInfo.callerDevId,
		calleeDevId: confrInfo.calleeDevId
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
	if (confrInfo.ext) {
		groupId = confrInfo.ext.groupId
	}
	
	return confrInfo.ext ? state.setIn(['confr'], confr).setIn(['gid'], groupId): state.setIn(['confr'], confr)
}

export const setGid = (state, { gid }) => {
    return state.setIn([ 'gid' ], gid)
}

export const showInviteModal = (state) => {
    return state.setIn([ 'inviteModal' ], true)
}

export const closeInviteModal = (state) => {
    return state.setIn([ 'inviteModal' ], false).setIn(['invitedMembers'], [])
}

export const resetAll = (state) => {
    return state.setIn([ 'joinedMembers' ], [])
}


/* ----- Hookup Reducers To Types ------ */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_CALL_STATUS]: setCallStatus,
	[Types.UPDATE_CONFR]: updateConfr,
	[Types.SET_GID]: setGid,
	[Types.SHOW_INVITE_MODAL]: showInviteModal,
	[Types.CLOSE_INVITE_MODAL]: closeInviteModal,
	[Types.SET_JOINED_MEMBERS]: setJoinedMembers,
	[Types.SET_CALL_DURATION]: setCallDuration,
	[Types.SET_MINISIZE]: setMinisize,
	[Types.SET_INVITED_MEMBERS]: setInvitedMembers,
	[Types.UPDATE_JOINED_MEMBERS]: updateJoinedMembers,
	[Types.RESET_ALL]: resetAll
})

export default Creators





