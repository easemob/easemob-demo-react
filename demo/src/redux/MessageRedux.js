import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import WebIM from '@/config/WebIM'
import { store } from '@/redux'
import AppDB from '@/utils/AppDB'
import StrangerActions from '@/redux/StrangerRedux'

// roomType true-chatroom | false-group
// chatType singleChat  | chatRoom- group or chatroom
// setGroup called when chatType=chatRoom set to 'groupchat'

/* ------------- Types and Action Creators ------------- */

const msgTpl = {
    base: {
        error: false,
        errorCode: '',
        errorText: '',
        // if status is blank, it's treated as "sent" from server side
        status: 'sending', // [sending, sent ,fail, read]
        id: '',
        // from - room id need it,should not be deleted
        from: '',
        to: '',
        toJid: '',
        time: '',
        type: '', // chat / groupchat
        body: {},
        ext: {},
        bySelf: false
    },
    txt: {
        type: 'txt',
        msg: ''
    },
    img: {
        type: 'img',
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    file: {
        type: 'file',
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    video: {
        type: 'video',
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    audio: {
        type: 'audio',
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    custom: {
        type: 'custom',
        customEvent: '',
        customExts: {}
    }
}

// unify message format: local side
function parseFromLocal(type, to, message = {}, bodyType) {
    let ext = message.ext || {}
    let obj = copy(message, msgTpl.base)
    let body = copy(message, msgTpl[bodyType])
    return {
        ...obj,
        type,
        to,
        id: WebIM.conn.getUniqueId(),
        body: {
            ...body,
            ...ext,
            type: bodyType
        }
    }
}

// unify message format: server side
export const parseFromServer = (message = {}, bodyType) => {
    let ext = message.ext || {}
    let obj = copy(message, msgTpl.base)
    // all of entities of message should in body, not in base
    // body.ext could save any customize info of message, like image size, width, height etc
    let body = copy(message, msgTpl[bodyType])
    switch (bodyType) {
    case 'txt':
        return {
            ...obj,
            status: 'sent',
            body: {
                ...body,
                ...ext,
                msg: message.data,
                type: 'txt'
            }
        }
        break
    case 'img':
        return {
            ...obj,
            status: 'sent',
            body: {
                ...body,
                ...ext,
                type: 'img'
            }
        }
        break
    case 'file':
        return {
            ...obj,
            status: 'sent',
            body: {
                ...body,
                ...ext,
                type: 'file'
            }
        }
        break
    case 'audio':
        return {
            ...obj,
            status: 'sent',
            body: {
                ...body,
                ...ext,
                type: 'audio'
            }
        }
        break
    case 'video':
        return {
            ...obj,
            status: 'sent',
            body: {
                ...body,
                ...ext,
                type: 'video'
            }
        }
        break
    case 'custom':
        return {
            ...obj,
            status: 'sent',
            body: {
                ...body,
                ...ext,
                type: 'custom'
            }
        }
        break
    }
}

function copy(message, tpl) {
    let obj = {}
    Object.keys(tpl).forEach(v => {
        obj[v] = message[v] || tpl[v]
    })
    return obj
}

const { Types, Creators } = createActions({
    addMessage: [ 'message', 'bodyType' ],
    deleteMessage: [ 'id', 'isSelf' ],
    updateMessageStatus: [ 'message', 'status' ],
    updateMessageMid: [ 'id', 'mid' ],
    muteMessage: [ 'mid' ],
    demo: [ 'chatType' ],
    //clearMessage: [ "chatType", "id" ],
    clearUnread: [ "chatType", "id" ],
    // ---------------async------------------
    sendTxtMessage: (chatType, chatId, message = {}) => {
        // console.log('sendTxtMessage', chatType, chatId, message)
        return (dispatch, getState) => {
            const pMessage = parseFromLocal(chatType, chatId, message, 'txt')
            // const pMessage = parseFromLocal(chatType, chatId, message, 'custom')
            const { body, id, to } = pMessage
            const { type, msg } = body
            const msgObj = new WebIM.message(type, id)
            const chatroom = chatType === 'chatroom'
            msgObj.set({
                //TODO: cate type == 'chatrooms'
                msg,
                to,
                // roomType: chatroom,
                chatType: 'singleChat',
                success: function () {
                    dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
                },
                fail: function () {
                    console.warn('发送txt失败，确认是否被禁言、拉黑等')
                    dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
                },
                ext: {}
            })

            // 最新的写法，也兼容老的写法，其他类型消息用的老写法
            if (chatType == 'groupchat') {
                msgObj.setChatType('groupChat')
            } else if(chatType == 'chatroom') {
                msgObj.setChatType('chatRoom')
            }
            // if (chatType == 'groupchat' || chatType == 'chatroom') {
            //     msgObj.setGroup('groupchat')
            // }

            WebIM.conn.send(msgObj.body)
            dispatch(Creators.addMessage(pMessage, type))

            //测试发自定义消息
            // const pMessage = parseFromLocal(chatType, chatId, message, 'custom')
            // msgObj.set({
            //     to,
            //     roomType: chatroom,
            //     chatType: 'singleChat',
            //     customEvent: 'customEvent',
            //     customExts: {qw: 123},
            //     params: {a: 33},
            //     success: function () {
            //         dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
            //     },
            //     fail: function () {
            //         dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
            //     },
            //     ext: {a: 1}
            // })

        }
    },
    sendImgMessage: (chatType, chatId, message = {}, source = {}, callback = () => {
    }) => {
        return (dispatch, getState) => {
            let pMessage = null
            const id = WebIM.conn.getUniqueId()
            const type = 'img'
            const to = chatId
            const msgObj = new WebIM.message(type, id)
            msgObj.set({
                // apiUrl: WebIM.config.restServer,
                ext: {
                    // file_length: source.fileSize,
                    // filename: source.fileName || "",
                    // filetype: source.fileName && source.fileName.split(".").pop(),
                    // width: source.width,
                    // height: source.height
                },
                file: source,
                // file: {
                // 	data: {
                // 		uri: source.uri || source.url,
                // 		type: "application/octet-stream",
                // 		name: source.fileName || source.filename
                // 	}
                // },
                to,
                roomType: chatType === 'chatroom',
                onFileUploadError: function (error) {
                    console.log(error)
                    // dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                    pMessage.body.status = 'fail'
                    dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
                    callback()
                },
                onFileUploadComplete: function (data) {
                    let url = data.uri + '/' + data.entities[0].uuid
                    pMessage.body.url = url
                    pMessage.body.status = 'sent'
                    dispatch(Creators.addMessage(pMessage, type))
                    //dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
                    callback()
                },
                success: function (id) {
                },
                fail: function () {
                    console.warn('发送img失败，确认是否被禁言、拉黑等')
                    dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
                },
                // body: {
                //     url: "https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg",
                //     type: "img",
                //     filename: '11122.png'
                // }
            })

            // keep the same logic as sendTextMessage
            if (chatType === 'groupchat' || chatType === 'chatroom') {
                msgObj.setGroup('groupchat')
            }

            WebIM.conn.send(msgObj.body)
            pMessage = parseFromLocal(chatType, chatId, msgObj.body, 'img')
            // NOTE: parseFromLocal will overwrite original id of msgObj
            // Recover it here.
            pMessage.id = id
            // url at local only
            pMessage.body.url = source.url

            // console.log('存储图片', source.url)
            // console.log('pMessage', pMessage, pMessage.body.uri)
            dispatch(Creators.addMessage(pMessage, type))
        }
    },
    sendFileMessage: (chatType, chatId, message = {}, source = {}, callback = () => {}) => {
        return (dispatch, getState) => {
            let pMessage = null
            const id = WebIM.conn.getUniqueId()
            const type = 'file'
            const to = chatId
            const msgObj = new WebIM.message(type, id)
            msgObj.set({
                // apiUrl: WebIM.config.restServer,
                ext: {
                    file_length: source.data.size
                    // filename: source.fileName || "",
                    // filetype: source.fileName && source.fileName.split(".").pop(),
                    // width: source.width,
                    // height: source.height
                },
                file: source,
                // file: {
                // 	data: {
                // 		uri: source.uri || source.url,
                // 		type: "application/octet-stream",
                // 		name: source.fileName || source.filename
                // 	}
                // },
                to,
                roomType: chatType === 'chatroom',
                onFileUploadError: function (error) {
                    console.log(error)
                    // dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                    pMessage.body.status = 'fail'
                    dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
                    callback()
                },
                onFileUploadComplete: function (data) {
                    let url = data.uri + '/' + data.entities[0].uuid
                    pMessage.body.url = url
                    pMessage.body.status = 'sent'
                    dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
                    callback()
                },
                success: function (id) {
                },
                fail: function () {
                    console.warn('发送file失败，确认是否被禁言、拉黑等')
                    dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
                },
            })

            // keep the same logic as sendTextMessage
            if (chatType === 'groupchat' || chatType === 'chatroom') {
                msgObj.setGroup('groupchat')
            }

            WebIM.conn.send(msgObj.body)
            pMessage = parseFromLocal(chatType, chatId, msgObj.body, 'file')
            // NOTE: parseFromLocal will overwrite original id of msgObj
            // Recover it here.
            pMessage.id = id
            // url at local only
            pMessage.body.url = source.url
            pMessage.body.file_length = source.data.size
            dispatch(Creators.addMessage(pMessage, type))
        }
    },
    sendRecorder:(obj) =>{
        return (dispatch) =>{
            let pMessage = null
            let bodyType = 'audio'
            const { chatId, chatType, file, duration } = obj
            const id = WebIM.conn.getUniqueId()
            const msgObj = new WebIM.message('audio', id)
            let isRoom = chatType === 'chatroom'
            msgObj.set({
                // apiUrl: WebIM.config.restServer,
                file: file,
                to: chatId,
                type: 'audio',
                roomType: isRoom,
                length: duration,
                onFileUploadError: function(error){
                    console.log('语音上传失败', error)
                },
                onFileUploadComplete: function(data){
                    console.log('上传成功', data)
                    let url = data.uri + '/' + data.entities[0].uuid
                    pMessage.body.url = url
                    pMessage.body.status = 'sent'
                    dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
                },
                success: function(data){
                    console.log('语音发送成功', data)
                },
                fail: function () {
                    console.warn('发送audio失败，确认是否被禁言、拉黑等')
                    dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
                },
                flashUpload: WebIM.flashUpload
            })
            if(chatType === 'groupchat' || chatType === 'chatroom'){
                // msgObj.setGroup('groupchat')
                msgObj.setChatType('groupChat')
            }
            WebIM.conn.send(msgObj.body)
            pMessage = parseFromLocal(chatType, chatId, msgObj.body, 'audio')
            pMessage.id = id
            pMessage.body.url = file.url
            dispatch(Creators.addMessage(pMessage, bodyType))
        }
    },
    addAudioMessage: (message, bodyType) => {
        return (dispatch, getState) => {
            let options = {
                url: message.url,
                headers: {
                    Accept: 'audio/mp3'
                },
                onFileDownloadComplete: function (response) {
                    let objectUrl = WebIM.utils.parseDownloadResponse.call(WebIM.conn, response)
                    message.audioSrcUrl = message.url
                    message.url = objectUrl
                    dispatch(Creators.addMessage(message, bodyType))
                },
                onFileDownloadError: function () {
                }
            }
            WebIM.utils.download.call(WebIM.conn, options)
        }
    },
    initUnread: () => {
        return (dispatch) => {
            AppDB.getUnreadList().then(res => {

                let collection = {
                    'chat': {},
                    'chatroom': {},
                    'groupchat': {},
                    'stranger': {}
                }

                // unread message count
                res.forEach((msg, index) => {
                    if (!msg.error) {
                        let type = msg.type
                        let from = type === 'chat' ? 'from' : 'to'
                        let id = msg[from]
                        // if (collection[type][id]) {
                        //     collection[type][id] += 1
                        // } else {
                        //     collection[type][id] = 1
                        // }
                    }
                })

                dispatch({
                    'type': 'INIT_UNREAD',
                    'unreadList': collection
                })
            })
        }
    },

    fetchMessage: (id, chatType, offset, cb) => {
        return (dispatch) => {
            AppDB.fetchMessage(id, chatType, offset).then(res => {
                if (res.length) {
                    dispatch({
                        'type': 'FETCH_MESSAGE',
                        'chatType': chatType,
                        'id': id,
                        'messages': res
                    })
                }
                cb && cb(res.length)
            })
        }
    },

    clearUnread: (chatType, id) => {
        return (dispatch) => {
            dispatch({ 'type': 'CLEAR_UNREAD', 'chatType': chatType, 'id': id })
            AppDB.readMessage(chatType, id).then(res => {})
        }
    },

    clearMessage: (chatType, id) => {
        return (dispatch) => {
            dispatch({ 'type': 'CLEAR_MESSAGE', 'chatType': chatType, 'id': id })
            AppDB.clearMessage(chatType, id).then(res => {})
        }
    },

    sendRead: msg => {
        return (dispatch) => {
            const msgObj = new WebIM.message('read', WebIM.conn.getUniqueId())
            msgObj.set({ id: msg.id, to: msg.from, ext: { logo: 'easemob' } })
            WebIM.conn.send(msgObj.body)            
        }
    },

    sendChannel: msg => {
        return (dispatch) => {
            const msgObj = new WebIM.message('channel', WebIM.conn.getUniqueId())
            let to = msg.to
            if (msg.type == 'groupchat' || msg.type == 'chatroom') {
                msgObj.set({ to, chatType: 'groupChat' })
            }else{
                msgObj.set({ to })
            }
            WebIM.conn.send(msgObj.body)            
        }
    }
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byId: {},
    chat: {},
    groupchat: {},
    chatroom: {},
    stranger: {},
    extra: {},
    unread: {
        chat: {},
        groupchat: {},
        chatroom: {},
        stranger: {},
    }
})

/* ------------- Reducers ------------- */
/**
 * add message to store
 * @param state
 * @param message object `{data,error,errorCode,errorText,ext:{weichat:{originType:webim}},from,id,to,type}`
 * @param bodyType enum [txt]
 * @returns {*}
 */
export const addMessage = (state, { message, bodyType = 'txt' }) => {
    !message.status && (message = parseFromServer(message, bodyType))
    const rootState = store.getState()
    const username = _.get(rootState, 'login.username', '')
    const { id, to, status } = message
    let { type } = message
    // where the message comes from, when from current user, it is null
    const from = message.from || username
    // bySelf is true when sent by current user, otherwise is false
    const bySelf = from == username
    // root id: when sent by current user or in group chat, is id of receiver. Otherwise is id of sender
    let chatId = bySelf || type !== 'chat' ? to : from
    // chatId = type === "stranger" ? from
    if(type === 'stranger'){
        chatId = from
    }

    // change type as stranger
    // if (type === "chat" && !rootState.entities.roster.byName[chatId]) {
    //     type = "stranger";
    //     message.type = "stranger";
    // }

    // update message array
    const chatData = state.getIn([ type, chatId ], Immutable([])).asMutable()
    const _message = {
        ...message,
        bySelf,
        time: +new Date(),
        status: status
    }

    // the pushed message maybe have exsited in state, ignore
    if (_message.type === 'chatroom' && bySelf) {
        const oid = state.getIn([ 'byMid', _message.id, 'id' ])
        if (oid) {
            _message.id = oid
        }
    }

    let isPushed = false
    chatData.forEach(m => {
        if (m.id === _message.id) {
            isPushed = true
        }
    })

    !isPushed && chatData.push(_message)

    // add a message to db, if by myselt, isUnread equals 0
    !isPushed && AppDB.addMessage(_message, !bySelf ? 1 : 0)

    const maxCacheSize = _.includes([ 'group', 'chatroom' ], type) ? WebIM.config.groupMessageCacheSize : WebIM.config.p2pMessageCacheSize
    if (chatData.length > maxCacheSize) {
        const deletedChats = chatData.splice(0, chatData.length - maxCacheSize)
        let byId = state.getIn([ 'byId' ])
        byId = _.omit(byId, _.map(deletedChats, 'id'))
        state = state.setIn([ 'byId' ], byId)     
    }

    state = state.setIn([ type, chatId ], chatData)

    // unread
    const activeContact = _.get(rootState,[ 'common', 'activeContact' ])
    if (!bySelf && !isPushed && message.from !== activeContact) {
        let count = state.getIn([ 'unread', type, chatId ], 0)
        state = state.setIn([ 'unread', type, chatId ], ++count)
    }

    state = state.setIn([ 'byId', id ], { type, chatId })
    
    return state
}

export const deleteMessage = (state,{ id, isSelf }) => {
    id = id.mid || id
    const byId = state.getIn([ 'byId', id ])
    if(byId){
        const { type, chatId } = byId
        let messages = state.getIn([ type, chatId ]).asMutable()
        let found = _.find(messages, { id: id })
        const index = messages.indexOf(found)
        let bySelf = found.getIn([ 'bySelf' ])
        if(found.getIn([ 'body', 'type' ]) != 'txt'){
            messages.splice(index, 1)
            messages.splice(index,0,{
                body: {
                    type: 'txt',
                    msg: isSelf?'消息已撤回':found.getIn([ 'from' ])+'撤回了一条消息'
                },
                time: found.getIn([ 'time' ]),
                from: found.getIn([ 'from' ]),
                id: found.getIn([ 'id' ]),
                isUnread: found.getIn([ 'isUnread' ]),
                status: 'read',
                time: found.getIn([ 'time' ]),
                to: found.getIn([ 'to' ]),
                toJid: '',
                type: 'chat',
                bySelf: bySelf
            })
        }else{
            let nMsg = bySelf ? '消息已撤回' : found.from+'撤回了一条消息'
            let message = found.setIn([ 'body', 'msg' ], nMsg)
            // message = found.setIn([ "status",], 'read')
            //console.log('删除了这条消息',message)
            messages.splice(messages.indexOf(found), 1, message)
        }

        state = state.setIn([ type, chatId ], messages)
        AppDB.deleteMessage(id)
    }
    return state
}

/**
 * update message status
 * @param state
 * @param message object
 * @param status enum [sending, sent ,fail]
 * @returns {*}
 */
export const updateMessageStatus = (state, { message, status = '' }) => {
    let { id } = message
    if (!id) id = state.getIn([ 'byMid', message.mid, 'id' ]) //消息体里根本没有mid ... 也不可能没有id ...
    let mids = state.getIn([ 'byMid' ])||{}
    let mid
    for( var i in mids){
        // console.log('ii',i)
        if(mids[i].id == id){
            mid = i
        }
    }
    const byId = state.getIn([ 'byId', id ])
    if (!_.isEmpty(byId)) {
        const { type, chatId } = byId
        let messages = state.getIn([ type, chatId ]).asMutable()
        let found = _.find(messages, { id: parseInt(id) })
        let msg = found.setIn([ 'status' ], status)
        msg = found.setIn([ 'toJid' ], mid)
        messages.splice(messages.indexOf(found), 1, msg)
        AppDB.updateMessageStatus(id, status).then(res => {})
        state = state.setIn([ type, chatId ], messages)
    }
    return state
}

export const clearMessage = (state, { chatType, id }) => {
    return chatType ? state.setIn([ chatType, id ], []) : state
}

export const clearUnread = (state, { chatType, id }) => {
    let data = state['unread'][chatType].asMutable()
    delete data[id]
    return state.setIn([ 'unread', chatType ], data)
}

export const updateMessageMid = (state, { id, mid }) => {
    const byId = state.getIn([ 'byId', id ])
    if (!_.isEmpty(byId)) {
        const { type, chatId } = byId
        let messages = state.getIn([ type, chatId ]).asMutable()
        let found = _.find(messages, { id: parseInt(id) })
        let msg = found.setIn([ 'toJid' ], mid)
        messages.splice(messages.indexOf(found), 1, msg)
        state = state.setIn([ type, chatId ], messages)
    }
    AppDB.updateMessageMid(mid, Number(id))
    return state.setIn([ 'byMid', mid ], { id })
}

export const muteMessage = (state, { mid }) => {
    const { id } = state.getIn([ 'byMid', mid ], '')
    const { type, chatId } = state.getIn([ 'byId', id ], {})
    if (type && chatId) {
        const messages = state.getIn([ type, chatId ]).asMutable()
        const found = _.find(messages, { id: parseInt(id) })
        const msg = found.setIn([ 'status' ], 'muted')
        messages.splice(messages.indexOf(found), 1, msg)
        state = state.setIn([ type, chatId ], messages)
    }
    return state
}

export const initUnread = (state, { unreadList }) => {
    let data = state.getIn([ 'unread' ])
    data = data.merge(unreadList).setIn([ 'chatroom' ], {})
    return state.setIn([ 'unread' ], data)
}

export const fetchMessage = (state, { id, chatType, messages, offset }) => {
    let data = state[chatType] && state[chatType][id] ? state[chatType][id].asMutable() : []
    data = messages.concat(data)
    //-----------------------
    return state.setIn([ chatType, id ], data)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_MESSAGE]: addMessage,
    [Types.DELETE_MESSAGE]: deleteMessage,
    [Types.UPDATE_MESSAGE_STATUS]: updateMessageStatus,
    [Types.UPDATE_MESSAGE_MID]: updateMessageMid,
    [Types.MUTE_MESSAGE]: muteMessage,
    [Types.CLEAR_MESSAGE]: clearMessage,
    [Types.CLEAR_UNREAD]: clearUnread,
    [Types.INIT_UNREAD]: initUnread,
    [Types.FETCH_MESSAGE]: fetchMessage
})

/* ------------- Selectors ------------- */
