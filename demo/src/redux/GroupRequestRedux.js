// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '@/config/WebIM'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addGroupRequest: [ 'msg' ],
    removeGroupRequest: [ 'gid', 'applicant' ],
    // ----------------async------------------
    agreeJoinGroup: (gid, options) => {
        return (dispatch, getState) => {
            dispatch(Creators.removeGroupRequest(gid, options.applicant))

            WebIM.conn.agreeJoinGroup(options)
        }
    },
    rejectJoinGroup: (gid, options) => {
        return (dispatch, getState) => {
            dispatch(Creators.removeGroupRequest(gid, options.applicant))

            WebIM.conn.rejectJoinGroup(options)
        }
    }
})

export const GroupRequestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byGid: {}
})

/* ------------- Reducers ------------- */

export const addGroupRequest = (state, { msg }) => {
    return state.setIn([ 'byGid', msg.gid, msg.from ], msg)
}

export const removeGroupRequest = (state, { gid, applicant }) => {
    const byGid = state.getIn([ 'byGid', gid ], Immutable({})).without(applicant)
    return state.setIn([ 'byGid', gid ], byGid)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_GROUP_REQUEST]: addGroupRequest,
    [Types.REMOVE_GROUP_REQUEST]: removeGroupRequest
})

/* ------------- Selectors ------------- */
