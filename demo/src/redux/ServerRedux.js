// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { history } from '@/utils'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    jumpServer: null,
    // ------------- async -----------------
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({

})

/* ------------- Reducers ------------- */

export const jumpServer = (state) => {
    history.push('/server')
    return state
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.JUMP_SERVER]: jumpServer,
})

/* ------------- Selectors ------------- */

