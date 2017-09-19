import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import { parseFromServer } from "@/redux/MessageRedux"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateStrangerMessage: [ "stranger", "message", "bodyType" ],
    deleteStranger: [ "stranger" ]
    // ---------------async------------------
})

export const StrangerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byId: {}
})

/* ------------- Reducers ------------- */

export const updateStrangerMessage = (state, { stranger, message, bodyType = "txt" }) => {
    // TODO: when receiving friend request, it should move contact with his messages to roster
    !message.status && (message = parseFromServer(message, bodyType))
    const { username = "" } = state.user || {}
    const { id, to, status } = message
    let { type } = message

    // source of message, default as current user when it's empty
    const from = message.from || username
    // true when the message was sent by current user, otherwise is false
    const bySelf = from == username
    // root id, is id of receiver when sent by current user, otherwise is id of sender
    const chatId = bySelf || type !== "chat" ? to : from

    state = state.setIn([ "byId", stranger, id ], {
        ...message,
        bySelf,
        time: +new Date(),
        status: status
    })
    return state
}

export const deleteStranger = (state, { stranger }) => {
    let byId = state.byId.asMutable()
    delete byId[stranger]
    return state.merge({ byId: byId })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_STRANGER_MESSAGE]: updateStrangerMessage,
    [Types.DELETE_STRANGER]: deleteStranger
})

/* ------------- Selectors ------------- */
