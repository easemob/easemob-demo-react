// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '@/config/WebIM'
import CommonActions from './CommonRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateBlacklist: [ 'list' ],
    // ----------------async------------------
    // update black list
    getBlacklist: () => {
        return (dispatch, getState) => {
            WebIM.conn.getBlocklist().then(res=>{
                res.data && dispatch(Creators.updateBlacklist(res.data))
            })
        }
    },
    // add to black list
    doAddBlacklist: id => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())
            try{
                WebIM.conn.addUsersToBlocklist({name:id});
                let blacklist = getState().entities.blacklist.byName.asMutable()
                let index = blacklist.findIndex(i=>blacklist[i]==id)
                if(index>-1) return
                blacklist.push(id);
                dispatch(Creators.updateBlacklist(blacklist))
            }catch(e){

            }finally{
                dispatch(CommonActions.fetched())
            }
        }
    },
    // delete from blacklist
    doRemoveBlacklist: id => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())
            try{
                let blacklist = getState().entities.blacklist.byName.asMutable()
                WebIM.conn.removeUserFromBlackList({name:blacklist[id]})
                blacklist.splice(id,1)
                dispatch(Creators.updateBlacklist(blacklist))
                dispatch(CommonActions.fetched())
                // delete blacklist[id]
            }catch(e){
                dispatch(CommonActions.fetched())
            }
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
