// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '@/config/WebIM'
import CommonActions from '@/redux/CommonRedux'
import GroupActions from '@/redux/GroupRedux'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addGroupRequest: [ 'msg' ],
    removeGroupRequest: [ 'gid', 'invitee' ],
    // ----------------async------------------
    agreeInviteIntoGroup: (gid, options) => {
        return (dispatch, getState) => {
            //dispatch(Creators.removeGroupRequest(gid, options.invitee))
            dispatch(CommonActions.setShowGroupInviteModal(false))
            //dispatch(GroupActions.getGroups())
            WebIM.conn.agreeInviteIntoGroup(options)
        }
    },
    rejectInviteIntoGroup: (gid, options) => {
        return (dispatch, getState) => {
            dispatch(CommonActions.setShowGroupInviteModal(false))
            //dispatch(GroupActions.getGroups())
            //dispatch(Creators.removeGroupRequest(gid, options.invitee))

            WebIM.conn.rejectInviteIntoGroup(options)
        }
    }
})

export const GroupInviteTypes = Types
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
