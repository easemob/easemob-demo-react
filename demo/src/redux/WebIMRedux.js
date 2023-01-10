import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import WebIM from '@/config/WebIM'
import CommonActions from '@/redux/CommonRedux'
import RosterActions from '@/redux/RosterRedux'
import LoginActions from '@/redux/LoginRedux'
import GroupActions from '@/redux/GroupRedux'
import ChatRoomActions from '@/redux/ChatRoomRedux'
import StrangerActions from '@/redux/StrangerRedux'
import SubscribeActions from '@/redux/SubscribeRedux'
import BlacklistActions from '@/redux/BlacklistRedux'
import MessageActions from '@/redux/MessageRedux'
import GroupRequestActions from '@/redux/GroupRequestRedux'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import VideoCallAcctions from '@/redux/VideoCallRedux'
import { store } from '@/redux'
import { history } from '@/utils'
import utils from '@/utils'
import AppDB from '@/utils/AppDB'
import { I18n } from 'react-redux-i18n'

import { message, Modal } from 'antd'
const rtc = WebIM.rtc;
const confirm = Modal.confirm

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
const logger = WebIM.loglevel.getLogger('WebIMRedux')

WebIM.conn.listen({
    // success connect
    onOpened: () => {
        const username = store.getState().login.username
        const token = utils.getToken()
        const hash = utils.getHash()
        // TODO all path could visited by anonymous should be declared directly
        const path = history.location.pathname.indexOf('login') !== -1 ? '/contact' : history.location.pathname
        const redirectUrl = `${path}?username=${username}`

        // init local db
        AppDB.init(username)

        // get unread message number from localdb
        store.dispatch(MessageActions.initUnread())

        // presence to be online and receive message
        // WebIM.conn.setPresence()
    
        // get roster
        store.dispatch(RosterActions.getContacts())
        
        // dispatch login success callback
        store.dispatch(LoginActions.setLoginSuccess())
        
        // fetch blacklist
        store.dispatch(BlacklistActions.getBlacklist())

        // fetch grouplist
        // store.dispatch(GroupActions.getGroups())

        // fetch chatrooms
        // store.dispatch(ChatRoomActions.getChatRooms())

        store.dispatch(LoginActions.stopLoging())

        // refresh page
        hash.indexOf(redirectUrl) === -1 && history.push(redirectUrl)

        // console.log(WebIM.call)
        // if (WebIM.config.isWebRTC && WebIM.WebRTC) {
        //     console.log("InitWebRTC..........")
        //     if (WebIM.call) {
        //         return
        //     }
    
        //     console.log("InitWebRTC end..........")    
    
            
        // }
    },
    onPresence: msg => {
        console.log("onPresence", msg)
        switch (msg.type) {
        case 'invite_accept':
        console.log()
            console.log('invite_accept')
            break;
        case 'joinGroupNotifications':
            logger.info('joinGroupNotifications')
            store.dispatch(CommonActions.setShowGroupRequestModal(true))
            store.dispatch(GroupRequestActions.addGroupRequest(msg))
            break
        case 'deleteGroupChat':
            message.error(`group${msg.gid} was destroyed.`)
            store.dispatch(GroupActions.getGroups())
            store.dispatch(MessageActions.clearUnread('groupchat', msg.gid))
            break
        case 'leaveGroup': // 某人离开群
            message.error(
                `${msg.from}${I18n.t('LeaveGroup')}${msg.gid}.`
            )
            break
        case 'removedFromGroup':
            message.error(
                `${msg.kicked || I18n.t('you')} ${I18n.t('dismissed')}${I18n.t('by')}${msg.owner ||
                    I18n.t('admin')} .`
            )
            store.dispatch(GroupActions.getGroups())
            store.dispatch(MessageActions.clearUnread('groupchat', msg.gid))
            break
        case 'invite': //手机端邀请入群
            store.dispatch(CommonActions.setShowGroupInviteModal(true))
            store.dispatch(GroupRequestActions.addGroupRequest(msg))
            break
        case 'direct_joined': //被拉进群
            message.success(`${msg.from}${I18n.t('invite')}${I18n.t('you')}${I18n.t('join')}${msg.gid}`)
            store.dispatch(GroupActions.getGroups())
            break
        case 'joinPublicGroupSuccess':
            message.success(`${I18n.t('joinGroup')} ${msg.from} ${I18n.t('successfully')}`)
            store.dispatch(GroupActions.getGroups())
            break
        case 'joinPublicGroupDeclined':
            message.error(
                `${I18n.t('join')}${I18n.t('group')}${msg.gid}${I18n.t('refuse')}${I18n.t('by')}${msg.owner}`
            )
            break
        case 'joinChatRoomSuccess': // Join the chat room successfully
            // Demo.currentChatroom = msg.from;
            break
        case 'reachChatRoomCapacity': // Failed to join the chat room
            // Demo.currentChatroom = null;
            message.error(`${I18n.t('joinGroup')}${I18n.t('failed')}`)
            break
        case 'subscribe':
            // jion friend action is subscribe/publish pattern，so when you agree to add a friend
            // it will notify the other side automatic，when state equasl [resp:true], do nothing
            // if (msg.status === "[resp:true]") {
            //     return
            // }

            store.dispatch(SubscribeActions.addSubscribe(msg))
            break
        case 'subscribed':
            store.dispatch(RosterActions.getContacts())
            // Alert.alert(msg.from + " " + I18n.t("subscribed"))
            message.warning(msg.from + '' + I18n.t('subscribed'))
            break
        case 'unsubscribe': // The sender deletes a friend.
        case 'unsubscribed': // The other party has removed you from the friend list.
            store.dispatch(RosterActions.getContacts())
            store.dispatch(MessageActions.clearUnread('chat', msg.from))
            // Alert.alert(msg.from + " " + I18n.t("unsubscribed"))
            if ('code' in msg) {
                message.warning(msg.from + ' ' + I18n.t('refuse'))
            } else {
                message.warning(msg.from + ' ' + I18n.t('unsubscribed'))
            }
            break
        case 'memberJoinPublicGroupSuccess':
            message.success(`${msg.from}${I18n.t('join')}${I18n.t('group')}${msg.gid}${I18n.t('successfully')}`)
            store.dispatch(GroupMemberActions.listGroupMemberAsync({groupId: msg.gid}))
            break
        case 'memberJoinChatRoomSuccess':
            message.success(`${msg.from}${I18n.t('join')}${I18n.t('chatroom')}${msg.gid}${I18n.t('successfully')}`)
            break
        case 'leaveChatRoom': // Leave the chat room
            message.warning(`${msg.from} left the chatroom: ${msg.gid}` )
            break
        case 'addMute':
            message.warning('you was muted')
            break
        case 'removeMute':
            message.success('you was unmuted')
            break
        case 'addAdmin':
            message.success('you were set to be an admin')
            break
        case 'removeAdmin':
            message.success('your admin has been canceled')
            break
        case 'changeOwner':
            message.success('You`ve become group managerd')
            break
        default:
            break
        }
    },
    // handle all exception
    onError: error => {
        console.log('onError', error)
        // 16: server-side close the websocket connection
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
            console.log(
                'WEBIM_CONNCTION_DISCONNECTED',
                WebIM.conn.autoReconnectNumTotal,
                WebIM.conn.autoReconnectNumMax
            )
            if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
                return
            }
            message.error(`${I18n.t('serverSideCloseWebsocketConnection')}`)
            history.push('/login')
            return
        }
        // 2: login by token failed
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
            message.error(`${I18n.t('webIMConnectionAuthError')}`)

            return
        }
        // 7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_CLOSE_ERROR) {
            console.log('WEBIM_CONNCTION_SERVER_CLOSE_ERROR')
            //TODO: need add judgement first: should not display err message while logout
            // message.error("client-side network offline")

            return
        }
        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
            message.error(`${I18n.t('offlineByMultiLogin')}`)
            history.push('/login')
            return
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_USER_REMOVED) {
            message.error('用户下线')
            history.push('/login')
            return
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE) {
            message.error('账户在另外一台设备登录')
            history.push('/login')
            return
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD) {
            message.error('用户修改密码')
            history.push('/login')
            return
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE) {
            message.error('用户被其他设备踢掉')
            history.push('/login')
            return
        }
        if (error.type == 1) {
            let data = error.data ? JSON.parse(error.data.data) : ''
            // data && message.error(data)
            if (data) {
                if (data.error_description == "user not found") {
                    message.error("用户名不存在！")
                } else if (data.error_description == "invalid password") {
                    message.error('密码无效！')
                } else if (data.error_description == "user not activated") {
                    message.error("用户已被封禁！")
                }
            }
            store.dispatch(LoginActions.loginFailure(error))
        }
    },
    onClosed: () => {
        console.log('onClosed')
        // msg.msg && message.error(msg.msg)
        // store.dispatch(Creators.logoutSuccess())
    },
    
    // 好友相关回调
    onContactInvited: (msg) => {console.log('onContactInvited', msg)},
    onContactDeleted: (msg) => {console.log('onContactDeleted', msg)},
    onContactAdded: (msg) => {console.log('onContactAdded', msg)},
    onContactRefuse: (msg) => {console.log('onContactRefuse', msg)},
    onContactAgreed: (msg) => {console.log('onContactAgreed', msg)},

    // 消息相关回调
    onReadMessage: message => {
        console.info('onReadMessage', message)
        store.dispatch(MessageActions.updateMessageStatus(message, 'read'))
    },
    onDeliveredMessage: message => {
        console.log('onDeliveredMessage', message)
        // store.dispatch(MessageActions.updateMessageStatus(message, "sent"))
    },
    onReceivedMessage: message => {
        logger.info('onReceivedMessage', message)
        const { id, mid } = message
        store.dispatch(MessageActions.updateMessageMid(id, mid))
    },
    onRecallMessage: message => {
        store.dispatch(MessageActions.deleteMessage(message)) 
        logger.info('onRecallMessage', message)
    },
    onLocationMessage: message =>{ //位置消息
        logger.info('onLocationMessage', message)
    },
    onTextMessage: message => {
        console.log("onTextMessage", message)
        let { from, to } = message 
        let { type } = message
        let rootState = store.getState()
        let username = _.get(rootState, 'login.username', '')
        let bySelf = from == username
        // root id: when sent by current user or in group chat, is id of receiver. Otherwise is id of sender
        let chatId = bySelf || type !== 'chat' ? to : from
        if (type === 'chat' && message.from != 'huanhuan' &&
            (( _.get(rootState,'entities.roster.byName['+chatId+'].subscription')  === 'none') ||
             !(_.get(rootState,'entities.roster.byName['+chatId+'].subscription')))){
            message.type = 'stranger'
            store.dispatch(StrangerActions.updateStrangerMessage(from,message,'txt'))            
        }

        store.dispatch(MessageActions.addMessage(message, 'txt'))     
        store.dispatch(MessageActions.sendRead(message))   // 去掉群组消息回复的ack
        switch (type) {
        case 'chat':
            store.dispatch(RosterActions.topRoster(from))
            //新的会议要求消息，使用text message实现
            if(WebIM && WebIM.call && message && message.ext && message.ext.msg_extension){
                var msgExtension = typeof(message.ext.msg_extension) == 'string'?JSON.parse(message.ext.msg_extension):message.ext.msg_extension
                var options = {
                    confrId: message.ext.conferenceId,
                    password: message.ext.password || '',
                    gid: msgExtension.group_id,
                    inviter: msgExtension.inviter
                }
                WebIM.call.listener.onInvite(from, options)
            }

            if (message.ext && message.ext.action === 'invite') {
                console.log('收到邀请消息', store.getState().callVideo)

                let callVideo = store.getState().callVideo;
                message.calleeIMName = message.to
                message.callerIMName = message.from

                if (message.from == WebIM.conn.context.jid.name) {
                    return // 自己在另一端发出的邀请
                }
                if (callVideo.callStatus > CALLSTATUS.idle) { // 正忙
                    if (message.ext.callId == callVideo.callId) { // 多人会议中邀请别人
                        store.dispatch(VideoCallAcctions.sendAlerting(from, message.ext.callerDevId, message.ext.callId)) // 回复alerting消息
                        store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.alerting)) // 更改为alerting状态
                    }else{
                        return store.dispatch(VideoCallAcctions.answerCall('busy', {callId: message.ext.callId, callerDevId:message.ext.callerDevId, to: from}))
                    }
                }
                store.dispatch(VideoCallAcctions.updateConfr(message))

                // if (message.ext.type === 2) { // 多人
                //     if (callVideo.callStatus > CALLSTATUS.idle) {
                //         return
                //     }
                //     confirm({
                //         title: from + '邀请您进入多人会议',
                //         okText: '确认',
                //         cancelText: '拒绝',
                //         onOk() {
                //             store.dispatch(VideoCallAcctions.sendAlerting(from, message.ext.callerDevId, message.ext.callId)) // 回复alerting消息
                //             store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.alerting)) // 更改为alerting状态
                //             store.dispatch(VideoCallAcctions.answerCall('accept', { callId:message.ext.callId, callerDevId: message.ext.callerDevId, to:from}))
                //         },
                //         onCancel() {
                //             console.log('Cancel')
                //             store.dispatch(VideoCallAcctions.answerCall('refuse', { callId:message.ext.callId, callerDevId:message.ext.callerDevId, to:from}))
                //             store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.idle))
                //             store.dispatch(VideoCallAcctions.updateConfr({}))
                //         }
                //     })
                // }else{
                    store.dispatch(VideoCallAcctions.sendAlerting(from, message.ext.callerDevId, message.ext.callId)) // 回复alerting消息
                    store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.alerting)) // 更改为alerting状态
                // }
            }
            break
        case 'groupchat':
            store.dispatch(GroupActions.topGroup(to))
            break
        case 'chatroom':
            store.dispatch(ChatRoomActions.topChatroom(to))
            break
        case 'stranger':
            // todo: remove chatdata to stranger list
            // store.dispatch(RosterActions.topRoster(from))
            // message.type = "stranger";
            store.dispatch(MessageActions.addMessage(message, 'txt'))                    
            store.dispatch(StrangerActions.topStranger(from))
            break
        default:
            break
        }
    },
    onPictureMessage: message => {
        const { type, from, to } = message
        console.log('onPictureMessage', message)
        store.dispatch(MessageActions.addMessage(message, 'img'))
        type === 'chat' && store.dispatch(MessageActions.sendRead(message))
        switch (type) {
        case 'chat':
            store.dispatch(RosterActions.topRoster(from))
            break
        case 'groupchat':
            store.dispatch(GroupActions.topGroup(to))
            break
        case 'chatroom':
            store.dispatch(ChatRoomActions.topChatroom(to))
            break
        default:
            break
        }
    },
    onFileMessage: message => {
        const { type, from, to } = message
        console.log("onFileMessage", message)
        store.dispatch(MessageActions.addMessage(message, 'file'))
        type === 'chat' && store.dispatch(MessageActions.sendRead(message))
        switch (type) {
        case 'chat':
            store.dispatch(RosterActions.topRoster(from))
            break
        case 'groupchat':
            store.dispatch(GroupActions.topGroup(to))
            break
        case 'chatroom':
            store.dispatch(ChatRoomActions.topChatroom(to))
            break
        default:
            break
        }
    },
    onAudioMessage: message => {
        const { type, from, to } = message
        store.dispatch(MessageActions.addAudioMessage(message, 'audio'))
        type === 'chat' && store.dispatch(MessageActions.sendRead(message))

        switch (type) {
        case 'chat':
            store.dispatch(RosterActions.topRoster(from))
            break
        case 'groupchat':
            store.dispatch(GroupActions.topGroup(to))
            break
        case 'chatroom':
            store.dispatch(ChatRoomActions.topChatroom(to))
            break
        default:
            break
        }
    },
    onVideoMessage: message => {
        const { type, from, to } = message
        store.dispatch(MessageActions.addMessage(message, 'video'))
        type === 'chat' && store.dispatch(MessageActions.sendRead(message))
        switch (type) {
        case 'chat':
            store.dispatch(RosterActions.topRoster(from))
            break
        case 'groupchat':
            store.dispatch(GroupActions.topGroup(to))
            break
        case 'chatroom':
            store.dispatch(ChatRoomActions.topChatroom(to))
            break
        default:
            break
        }
    },
    onInviteMessage: msg => {
        console.log('onInviteMessage', msg)
        store.dispatch(GroupRequestActions.addGroupRequest(msg))
        store.dispatch(GroupActions.getGroups())
        message.success(`${msg.from}${I18n.t('invite')}${I18n.t('you')}${I18n.t('join')}${msg.roomid}`)
    },
    onMutedMessage: msg => {
        console.log('onMutedMessage', msg)
        store.dispatch(MessageActions.muteMessage(msg.mid))
        message.error(`${I18n.t('you')}${I18n.t('muted')}`)
    },
    onCustomMessage: msg => {
        console.log('onCustomMessage', msg)
        let {customEvent, type, from, to} = msg
        if (msg.customEvent == "userCard" && typeof msg.customExts == 'string') {
            msg.customExts = JSON.parse(msg.customExts)
        }
        store.dispatch(MessageActions.addMessage(msg, 'custom'))
        switch (type) {
        case 'chat':
            store.dispatch(RosterActions.topRoster(from))
            break
        case 'groupchat':
            store.dispatch(GroupActions.topGroup(to))
            break
        case 'chatroom':
            store.dispatch(ChatRoomActions.topChatroom(to))
            break
        default:
            break
        }
    },
    onChannelMessage: msg => console.log('onChannelMessage', msg),

    onCmdMessage: msg => {
        console.log('onCmdMessage', msg)
        if (msg.action === "rtcCall") {
            if (msg.from === WebIM.conn.context.jid.name) {
                return // 多端情况， 另一端自己发的消息
            }
            let msgInfo = msg.ext
            let deviceId = '';

            let callerDevId = ''
            let callId = '';
            let callVideo = store.getState().callVideo;
            switch(msgInfo.action){
                case "alert":
                    deviceId = msgInfo.calleeDevId
                    callerDevId = msgInfo.callerDevId
                    callId = msgInfo.callId

                    console.log('收到回复的alert', msg)
                    store.dispatch(VideoCallAcctions.confirmRing(msg.from, deviceId, callerDevId, callId))
                    break;
                case "confirmRing":
                    console.log('收到confirmRing', msg)

                    if (msgInfo.calleeDevId != WebIM.conn.context.jid.clientResource) {
                        console.log('不是自己设备的confirmRing', msg)
                        return // 多端情况另一端的消息
                    }
                    if (!msgInfo.status && callVideo.callStatus < CALLSTATUS.receivedConfirmRing) {
                        console.warn('邀请已失效')
                        store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.idle))
                        store.dispatch(VideoCallAcctions.hangup())
                        return
                    }
                    deviceId = msgInfo.calleeDevId
                    store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.receivedConfirmRing))
                    // store.dispatch(VideoCallAcctions.answerCall(msg.from, deviceId))
                    console.log('清除定时器2')
                    rtc.timer && clearTimeout(rtc.timer)
                    break;
                case "answerCall":
                    console.log('收到回复的answerCall', msg)
                    console.log('清除定时器1')
                    rtc.timer && clearTimeout(rtc.timer)
                    
                    deviceId = msgInfo.calleeDevId

                    if (msgInfo.callerDevId != WebIM.conn.context.jid.clientResource) {
                        console.log('不是自己设备的answerCall', msg)
                        return // 多端情况另一端的消息
                    }
                    if (msgInfo.result !== 'accept') {
                        if (msgInfo.result === 'busy') {
                            message.error('对方正忙')
                        }else if(msgInfo.result === 'refuse'){
                            message.error('对方已拒绝')
                        }
                        
                        if (callVideo.confr.type !== 2) { // 单人情况挂断，多人不挂断
                            store.dispatch(VideoCallAcctions.confirmCallee(msg.from, deviceId, msgInfo.result))
                            store.dispatch(VideoCallAcctions.hangup())
                            store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.idle))
                        }
                    }else{
                        store.dispatch(VideoCallAcctions.confirmCallee(msg.from, deviceId, msgInfo.result))
                    }
                    break;
                case "confirmCallee":
                    console.log('收到confirmCallee', msg)
                    if ( msgInfo.calleeDevId != WebIM.conn.context.jid.clientResource) {
                        if (msg.to == WebIM.conn.context.jid.name) {
                            store.dispatch(VideoCallAcctions.hangup())
                            store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.idle))
                            return message.error('已在其他设备处理')
                        }
                        return
                    }
                    
                    if (msg.ext.result != 'accept' && callVideo.callStatus != 7) {
                        // 不在通话中收到 busy refuse时挂断
                        store.dispatch(VideoCallAcctions.hangup())
                        store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.idle))
                        return
                    }
                    store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.confirmCallee))
                    break;
                case "cancelCall":
                    console.log('收到cancelCall', msg)
                    // if (msgInfo.calleeDevId != WebIM.conn.context.jid.clientResource) {
                    //     console.log('不是自己设备的cancelCall', msg)
                    //     return // 多端情况另一端的消息
                    // }

                    if (msg.from == WebIM.conn.context.jid.name) {
                        return // 多端情况另一端的消息
                    }
                    if (msg.from == callVideo.confr.callerIMName) {
                        store.dispatch(VideoCallAcctions.hangup())
                        store.dispatch(VideoCallAcctions.setCallStatus(CALLSTATUS.idle))
                    }
                    break;
                default:
                    console.log('unexpected action')
                    break;
            }
        }
    }
})

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    logoutSuccess: null,
    signin: null,

    // ----------------async------------------
    logout: () => {
        return (dispatch, state) => {
            let I18N = store.getState().i18n.translations[store.getState().i18n.locale]
            WebIM.conn.close('logout')
            message.success(I18N.logoutSuccessfully)
            dispatch(CommonActions.fetching())
            dispatch(LoginActions.logout())
            // if (WebIM.conn.isOpened()) {
            // WebIM.conn.close("logout")
            // }
            localStorage.removeItem('webIMCustomSetting')
            window.localStorage.setItem('webImLogout', false)
            window.location.reload()
        }
    }
})

export const WebIMTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */

export const logoutSuccess = state => {
    // console.log("logoutSuccess", state)
    history.push('/login')
    return state
}

export const signin = state => {
    history.push('/login')
    return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
    [Types.SIGNIN]: signin
})


/* ------------- Selectors ------------- */

/** Constants: Connection Status Constants
 *  Connection status constants for use by the connection handler
 *  callback.
 *
 *  Status.ERROR - An error has occurred
 *  Status.CONNECTING - The connection is currently being made
 *  Status.CONNFAIL - The connection attempt failed
 *  Status.AUTHENTICATING - The connection is authenticating
 *  Status.AUTHFAIL - The authentication attempt failed
 *  Status.CONNECTED - The connection has succeeded
 *  Status.DISCONNECTED - The connection has been terminated
 *  Status.DISCONNECTING - The connection is currently being terminated
 *  Status.ATTACHED - The connection has been attached
 *  Status.CONNTIMEOUT - The connection has timed out
 */
