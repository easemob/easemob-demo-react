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
    showConfrModal: null,
    closeConfrModal: null,
    showModal: null,
    closeModal: null,
    updateConfrInfo: ["pwd", "from", "rtcOptions"],
    setGid: ["gid"],
    setRtcOptions: ["rtcOptions"],
    setSelectedMembers: ["selected"],
    setJoinedMembers: ["joined"],
    updateJoinedMembers: ["removed"],
    resetAll: null,

    /* ------async------ */
    updateConfrInfoAsync: (gid) => {
        return (dispatch, getState) => {
            dispatch(Creators.setGid(gid))
            var pwd = Math.random().toString(36).substr(2);
            pwd = "";
            WebIM.call.createConference(pwd, function (from, rtcOptions) {
                dispatch(Creators.updateConfrInfo(pwd, from, rtcOptions))
            })
        }
    },

    setRtcOptionsAsync: (confrId, password) => {
        return (dispatch, getState) => {
            let callback = (from, rtcOptions) => {
                dispatch(Creators.setRtcOptions(rtcOptions))
            };
            WebIM.call.getConferenceTkt(confrId, password, callback)
        }
    }
})

/* ----- Initial State ------ */
export const INITIAL_STATE = Immutable({
    ifShowMultiAVModal: false,
    confrModal: false,
    gid: "",
    confr: {
        password: "",
        from: "",
        rtcOptions: {}
    },
    localStream: {},
    selectedMembers: [],
    joinedMembers: []
})

/* ------ Reducers ------ */

export const setSelectedMembers = (state, {selected}) => {
    return state.setIn(["selectedMembers"], selected)
}

export const setJoinedMembers = (state, {joined}) => {
    let join = state.getIn(["joinedMembers"]);
    let joinCurrent = join.concat([joined.nickName]);
    return state.setIn(["joinedMembers"],joinCurrent);
}

export const updateJoinedMembers = (state, {removed}) => {
    console.log("updateJoinedMembers")
    let join = state.getIn(["joinedMembers"]);
    let joinCurrent = _.difference(join,[removed.nickName]);
    console.log("joinCurrent",joinCurrent)
    return state.setIn(["joinedMembers"],joinCurrent);
}

export const updateConfrInfo = (state, { pwd, from, rtcOptions }) => {
    let confr = state.getIn(["confr"])
    confr = confr.setIn(["password"], pwd)
    confr = confr.setIn(["from"], from)
    confr = confr.setIn(["rtcOptions"], rtcOptions)
    return state.setIn(["confr"], confr)
}

export const showConfrModal = (state) => {
    console.log("SSSSSSSSSSSSSSSSss......")
    return state.setIn(["confrModal"], true)
}

export const closeConfrModal = (state) => {
    return state.setIn(["confrModal"], false)
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

export const setRtcOptions = (state, { rtcOptions }) => {
    return state.setIn(["confr", "rtcOptions"], rtcOptions)
}

export const resetAll = (state) => {
    console.log("ResetAll...")
    return state.setIn(["selectedMembers"], [])
}


export default Creators

/* ----- Hookup Reducers To Types ------ */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_CONFR_INFO]: updateConfrInfo,
    [Types.SHOW_MODAL]: showModal,
    [Types.CLOSE_MODAL]: closeModal,
    [Types.SET_GID]: setGid,
    [Types.SET_RTC_OPTIONS]: setRtcOptions,
    [Types.SHOW_CONFR_MODAL]: showConfrModal,
    [Types.CLOSE_CONFR_MODAL]: closeConfrModal,
    [Types.SET_SELECTED_MEMBERS]: setSelectedMembers,
    [Types.SET_JOINED_MEMBERS]: setJoinedMembers,
    [Types.UPDATE_JOINED_MEMBERS]: updateJoinedMembers,
    [Types.RESET_ALL]: resetAll
})