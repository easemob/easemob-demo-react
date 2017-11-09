import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"
import { history } from "@/utils"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import CommonActions from "@/redux/CommonRedux"
import _ from "lodash"
import { config } from "@/config"
import { store } from "@/redux"

/* ----- Types and Action Creators ------ */

const { Types, Creators } = createActions({
    showModal: null,
    closeModal: null,
    updateConfrInfo: ["pwd", "from", "rtcOptions"],
    setGid: ["gid"],
    setLocalStream: ["stream"],
    setRtcOptions: ["rtcOptions"],

    /* ------async------ */
    updateConfrInfoAsync: (gid) => {
        return (dispatch, getState) => {
            dispatch(Creators.setGid(gid))
            const pwd = Math.random().toString(36).substr(2)
            WebIM.call.createConfr(pwd, function (from, rtcOptions) {
                dispatch(Creators.updateConfrInfo(pwd, from, rtcOptions))
            })
        }
    },

    setRtcOptionsAsync: (confrId, password) => {
        return (dispatch, getState) => {
            let callback = (from, rtcOptions) => {
                dispatch(Creators.setRtcOptions(rtcOptions))
            };
            WebIM.call.getConfrTkt(confrId, password, callback)
        }
    }
})

/* ----- Initial State ------ */
export const INITIAL_STATE = Immutable({
    ifShowMultiAVModal: false,
    gid: "",
    confr: {
        password: "",
        from: "",
        rtcOptions: {}
    },
    localStream: {},
    remoteStream: []
})

/* ------ Reducers ------ */

export const updateConfrInfo = (state, { pwd, from, rtcOptions }) => {
    let confr = state.getIn(["confr"])
    confr = confr.setIn(["password"], pwd)
    confr = confr.setIn(["from"], from)
    confr = confr.setIn(["rtcOptions"], rtcOptions)
    return state.setIn(["confr"], confr)
}

export const showModal = (state) => {
    return state.setIn(["ifShowMultiAVModal"], true)
}

export const closeModal = (state) => {
    console.log("Closing Modal...")
    return state.setIn(["ifShowMultiAVModal"], false)
}

export const setGid = (state, { gid }) => {
    return state.setIn(["gid"], gid)
}

export const setLocalStream = (state, { stream }) => {
    console.log("SetLocalStream")
    return state.setIn(["localStream"], stream)
}

export const setRtcOptions = (state, { rtcOptions }) => {
    return state.setIn(["confr", "rtcOptions"], rtcOptions)
}

export default Creators

/* ----- Hookup Reducers To Types ------ */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_CONFR_INFO]: updateConfrInfo,
    [Types.SHOW_MODAL]: showModal,
    [Types.CLOSE_MODAL]: closeModal,
    [Types.SET_GID]: setGid,
    [Types.SET_LOCAL_STREAM]: setLocalStream,
    [Types.SET_RTC_OPTIONS]: setRtcOptions
})