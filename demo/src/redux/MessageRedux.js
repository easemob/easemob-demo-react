import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import WebIM from "@/config/WebIM"
import { store } from "@/redux"
import AppDB from "@/utils/AppDB"
import StrangerActions from "@/redux/StrangerRedux"

// roomType true-chatroom | false-group
// chatType singleChat  | chatRoom- group or chatroom
// setGroup called when chatType=chatRoom set to 'groupchat'

/* ------------- Types and Action Creators ------------- */

const msgTpl = {
    base: {
        error: false,
        errorCode: "",
        errorText: "",
        // if status is blank, it's treated as "sent" from server side
        status: "sending", // [sending, sent ,fail, read]
        id: "",
        // from - room id need it,should not be deleted
        from: "",
        to: "",
        toJid: "",
        time: "",
        type: "", // chat / groupchat
        body: {},
        ext: {},
        bySelf: false
    },
    txt: {
        type: "txt",
        msg: ""
    },
    img: {
        type: "img",
        file_length: 0,
        filename: "",
        filetype: "",
        length: 0,
        secret: "",
        width: 0,
        height: 0,
        url: "",
        thumb: "",
        thumb_secret: ""
    },
    file: {
        type: "file",
        file_length: 0,
        filename: "",
        filetype: "",
        length: 0,
        secret: "",
        width: 0,
        height: 0,
        url: "",
        thumb: "",
        thumb_secret: ""
    },
    video: {
        type: "video",
        file_length: 0,
        filename: "",
        filetype: "",
        length: 0,
        secret: "",
        width: 0,
        height: 0,
        url: "",
        thumb: "",
        thumb_secret: ""
    },
    audio: {
        type: "audio",
        file_length: 0,
        filename: "",
        filetype: "",
        length: 0,
        secret: "",
        width: 0,
        height: 0,
        url: "",
        thumb: "",
        thumb_secret: ""
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
    case "txt":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                msg: message.data,
                type: "txt"
            }
        }
        break
    case "img":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                type: "img"
            }
        }
        break
    case "file":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                type: "file"
            }
        }
        break
    case "audio":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                type: "audio"
            }
        }
        break
    case "video":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                type: "video"
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
    addMessage: [ "message", "bodyType" ],
    updateMessageStatus: [ "message", "status" ],
    updateMessageMid: [ "id", "mid" ],
    muteMessage: [ "mid" ],
    demo: [ "chatType" ],
    //clearMessage: [ "chatType", "id" ],
    // clearUnread: [ "chatType", "id" ],
    // ---------------async------------------
    sendTxtMessage: (chatType, chatId, message = {}) => {
        // console.log('sendTxtMessage', chatType, chatId, message)
        return (dispatch, getState) => {
            const pMessage = parseFromLocal(chatType, chatId, message, "txt")
            const { body, id, to } = pMessage
            const { type, msg } = body
            const msgObj = new WebIM.message(type, id)
            const chatroom = chatType === "chatroom"
            // console.log(pMessage)
            msgObj.set({
                //TODO: cate type == 'chatrooms'
                msg,
                to,
                roomType: chatroom,
                chatType: 'singleChat',
                success: function () {
                    dispatch(Creators.updateMessageStatus(pMessage, "sent"))
                },
                fail: function () {
                    dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                }
            })

            if (chatType == "groupchat" || chatType == "chatroom") {
                msgObj.setGroup("groupchat")
            }

            WebIM.conn.send(msgObj.body)
            dispatch(Creators.addMessage(pMessage, type))
        }
    },
    sendImgMessage: (chatType, chatId, message = {}, source = {}, callback = () => {
    }) => {
        return (dispatch, getState) => {
            let pMessage = null
            const id = WebIM.conn.getUniqueId()
            const type = "img"
            const to = chatId
            const msgObj = new WebIM.message(type, id)
            msgObj.set({
                apiUrl: WebIM.config.apiURL,
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
                roomType: chatType === "chatroom",
                onFileUploadError: function (error) {
                    console.log("shibai");
                    console.log(error)
                    // dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                    pMessage.body.status = "fail"
                    dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                    callback()
                },
                onFileUploadComplete: function (data) {
                    console.log(data)
                    let url = data.uri + "/" + data.entities[0].uuid
                    pMessage.body.url = url
                    pMessage.body.status = "sent"
                    dispatch(Creators.updateMessageStatus(pMessage, "sent"))
                    callback()
                },
                success: function (id) {
                    console.log(id)
                }
            })

            // keep the same logic as sendTextMessage
            if (chatType === "groupchat" || chatType === "chatroom") {
                msgObj.setGroup("groupchat")
            }

            WebIM.conn.send(msgObj.body)
            pMessage = parseFromLocal(chatType, chatId, msgObj.body, "img")
            // NOTE: parseFromLocal will overwrite original id of msgObj
            // Recover it here.
            pMessage.id = id
            // url at local only
            pMessage.body.url = source.url
            // console.log('pMessage', pMessage, pMessage.body.uri)
            dispatch(Creators.addMessage(pMessage, type))
        }
    },
    sendFileMessage: (chatType, chatId, message = {}, source = {}, callback = () => {
    }) => {
        return (dispatch, getState) => {
            let pMessage = null
            const id = WebIM.conn.getUniqueId()
            const type = "file"
            const to = chatId
            const msgObj = new WebIM.message(type, id)
            msgObj.set({
                apiUrl: WebIM.config.apiURL,
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
                roomType: chatType === "chatroom",
                onFileUploadError: function (error) {
                    console.log(error)
                    // dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                    pMessage.body.status = "fail"
                    dispatch(Creators.updateMessageStatus(pMessage, "fail"))
                    callback()
                },
                onFileUploadComplete: function (data) {
                    console.log("Data: ", data)
                    let url = data.uri + "/" + data.entities[0].uuid
                    pMessage.body.url = url
                    pMessage.body.status = "sent"
                    dispatch(Creators.updateMessageStatus(pMessage, "sent"))
                    callback()
                },
                success: function (id) {
                    console.log(id)
                }
            })

            // keep the same logic as sendTextMessage
            if (chatType === "groupchat" || chatType === "chatroom") {
                msgObj.setGroup("groupchat")
            }

            WebIM.conn.send(msgObj.body)
            pMessage = parseFromLocal(chatType, chatId, msgObj.body, "file")
            // NOTE: parseFromLocal will overwrite original id of msgObj
            // Recover it here.
            pMessage.id = id
            // url at local only
            pMessage.body.url = source.url
            pMessage.body.file_length = source.data.size
            console.log("pMessage: ", pMessage)
            console.log("source: ", source)
            dispatch(Creators.addMessage(pMessage, type))
        }
    },
    addAudioMessage: (message, bodyType) => {
        return (dispatch, getState) => {
            let options = {
                url: message.url,
                headers: {
                    Accept: "audio/mp3"
                },
                onFileDownloadComplete: function (response) {
                    let objectUrl = WebIM.utils.parseDownloadResponse.call(WebIM.conn, response)
                    message.url = objectUrl
                    dispatch(Creators.addMessage(message, bodyType))
                },
                onFileDownloadError: function () {
                    console.log("Audio Error")
                }
            }
            WebIM.utils.download.call(WebIM.conn, options)
        }
    },
    initUnread: () => {
        return (dispatch) => {
            AppDB.getUnreadList().then(res => {

                let collection = {
                    "chat": {},
                    "chatroom": {},
                    "groupchat": {},
                    "stranger": {}
                }

                // unread message count
                res.forEach((msg, index) => {
                    if (!msg.error) {
                        let type = msg.type
                        let from = type === "chat" ? "from" : "to"
                        let id = msg[from]
                        // if (collection[type][id]) {
                        //     collection[type][id] += 1
                        // } else {
                        //     collection[type][id] = 1
                        // }
                    }
                })

                dispatch({
                    "type": "INIT_UNREAD",
                    "unreadList": collection
                })
            })
        }
    },

    fetchMessage: (id, chatType, offset, cb) => {
        return (dispatch) => {
            AppDB.fetchMessage(id, chatType, offset).then(res => {
                if (res.length) {
                    dispatch({
                        "type": "FETCH_MESSAGE",
                        "chatType": chatType,
                        "id": id,
                        "messages": res
                    })
                }
                cb && cb(res.length)
            })
        }
    },

    clearUnread: (chatType, id) => {
        return (dispatch) => {
            dispatch({ "type": "CLEAR_UNREAD", "chatType": chatType, "id": id })
            AppDB.readMessage(chatType, id).then(res => {})
        }
    },

    clearMessage: (chatType, id) => {
        return (dispatch) => {
            dispatch({ "type": "CLEAR_MESSAGE", "chatType": chatType, "id": id })
            AppDB.clearMessage(chatType, id).then(res => {})
        }
    },

    sendRead: msg => {
        return (dispatch) => {
            const msgObj = new WebIM.message("read", WebIM.conn.getUniqueId())
            msgObj.set({ id: msg.id, to: msg.from, ext: { logo: "easemob" } })
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
export const addMessage = (state, { message, bodyType = "txt" }) => {
    console.log("redux addMessage", message)
    !message.status && (message = parseFromServer(message, bodyType))
    const rootState = store.getState()
    const username = _.get(rootState, "login.username", "")
    const { id, to, status } = message
    let { type } = message
    // where the message comes from, when from current user, it is null
    const from = message.from || username
    // bySelf is true when sent by current user, otherwise is false
    const bySelf = from == username
    // root id: when sent by current user or in group chat, is id of receiver. Otherwise is id of sender
    const chatId = bySelf || type !== "chat" ? to : from

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
    if (_message.type === "chatroom" && bySelf && _message.id.indexOf("WEBIM_") < 0) {
        const oid = state.getIn([ "byMid", _message.id, "id" ])
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

    const maxCacheSize = _.includes([ "group", "chatroom" ], type) ? WebIM.config.groupMessageCacheSize : WebIM.config.p2pMessageCacheSize
    if (chatData.length > maxCacheSize) {
        const deletedChats = chatData.splice(0, chatData.length - maxCacheSize)
        let byId = state.getIn([ "byId" ])
        byId = _.omit(byId, _.map(deletedChats, "id"))
        state = state.setIn([ "byId" ], byId)     
    }

    state = state.setIn([ type, chatId ], chatData)

    // unread
    const activeContact = _.get(rootState,[ "common", "activeContact" ])
    if (!bySelf && !isPushed && message.from !== activeContact) {
        let count = state.getIn([ "unread", type, chatId ], 0)
        state = state.setIn([ "unread", type, chatId ], ++count)
    }

    state = state.setIn([ "byId", id ], { type, chatId })

    return state
}

/**
 * update message status
 * @param state
 * @param message object
 * @param status enum [sending, sent ,fail]
 * @returns {*}
 */
export const updateMessageStatus = (state, { message, status = "" }) => {
    let { id } = message
    if (_.isEmpty(id)) id = state.getIn([ "byMid", message.mid, "id" ])
    const byId = state.getIn([ "byId", id ])
    if (!_.isEmpty(byId)) {
        const { type, chatId } = byId
        const messages = state.getIn([ type, chatId ]).asMutable()
        const found = _.find(messages, { id })
        const msg = found.setIn([ "status" ], status)
        messages.splice(messages.indexOf(found), 1, msg)
        AppDB.updateMessageStatus(id, status).then(res => console.log(""))
        state = state.setIn([ type, chatId ], messages)
    }
    return state
}

export const clearMessage = (state, { chatType, id }) => {
    return chatType ? state.setIn([ chatType, id ], []) : state
}

export const clearUnread = (state, { chatType, id }) => {
    let data = state["unread"][chatType].asMutable()
    delete data[id]
    return state.setIn([ "unread", chatType ], data)
}

export const updateMessageMid = (state, { id, mid }) => {
    return state.setIn([ "byMid", mid ], { id })
}

export const muteMessage = (state, { mid }) => {
    const { id } = state.getIn([ "byMid", mid ], "")
    const { type, chatId } = state.getIn([ "byId", id ], {})
    if (type && chatId) {
        const messages = state.getIn([ type, chatId ]).asMutable()
        const found = _.find(messages, { id })
        const msg = found.setIn([ "status" ], "muted")
        messages.splice(messages.indexOf(found), 1, msg)
        state = state.setIn([ type, chatId ], messages)
    }
    return state
}

export const initUnread = (state, { unreadList }) => {
    let data = state.getIn([ "unread" ])
    data = data.merge(unreadList).setIn([ "chatroom" ], {})
    return state.setIn([ "unread" ], data)
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
    [Types.UPDATE_MESSAGE_STATUS]: updateMessageStatus,
    [Types.UPDATE_MESSAGE_MID]: updateMessageMid,
    [Types.MUTE_MESSAGE]: muteMessage,
    [Types.CLEAR_MESSAGE]: clearMessage,
    [Types.CLEAR_UNREAD]: clearUnread,
    [Types.INIT_UNREAD]: initUnread,
    [Types.FETCH_MESSAGE]: fetchMessage
})

/* ------------- Selectors ------------- */
