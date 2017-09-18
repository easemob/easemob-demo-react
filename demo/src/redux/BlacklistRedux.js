// @flow

import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"
import CommonActions from "./CommonRedux"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateBlacklist: [ "list" ],
    // ----------------async------------------
    // update black list
    getBlacklist: () => {
        return (dispatch, getState) => {
            WebIM.conn.getBlacklist()
        }
    },
    // add to black list
    doAddBlacklist: id => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())

            let blacklist = getState().entities.blacklist.byName.asMutable()
            let roster = getState().entities.roster.byName
            if (blacklist[id]) return
            blacklist[id] = roster[id]
            WebIM.conn.addToBlackList({
                list: blacklist,
                type: "jid",
                success: function () {
                    // TODO: add to black list directly , shouldn't  re-pull
                    dispatch(CommonActions.fetched())
                },
                error: function () {
                    dispatch(CommonActions.fetched())
                }
            })
        }
    },
    // delete from blacklist
    doRemoveBlacklist: id => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())

            let blacklist = getState().entities.blacklist.byName.asMutable()
            delete blacklist[id]
            WebIM.conn.removeFromBlackList({
                list: blacklist,
                type: "jid",
                success: function () {
                    // TODO: delete from black list directly , shouldn't  re-pull
                    dispatch(CommonActions.fetched())
                },
                error: function () {
                    dispatch(CommonActions.fetched())
                }
            })
        }
    }
})

export const BlacklistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byName: {},
    names: []
})

/* ------------- Reducers ------------- */

export const updateBlacklist = (state, { list }) => {
    console.log("updateBlacklist", list)
    return state.merge({
        byName: Object(list),
        names: Object.keys(list).sort()
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_BLACKLIST]: updateBlacklist
})

/* ------------- Selectors ------------- */
