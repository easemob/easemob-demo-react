// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '@/config/WebIM'
import Cookie from 'js-cookie'
import { message } from 'antd'
import { history } from '@/utils'
import { store } from '@/redux'
import axios from 'axios'

/* ------------- Types and Action Creators ------------- */
const domain = window.location.protocol+'//a1.easemob.com'
const { Types, Creators } = createActions({
    setLoginToken: [ 'username', 'token' ],
    setLoging: [ 'username', 'password', 'token' ],
    stopLoging: null,
    setLoginSuccess: [ 'username' ],
    loginFailure: [ 'error' ],
    jumpRegister: null,
    logout: null,
    setOwnInfo: ['info'],
    // ------------- async -----------------

    login: (username, password) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoging(username, password, null))
            console.log(WebIM, 'WebIM')
            // if (WebIM.conn.isOpened()) {
            //     WebIM.conn.close("logout")
            // }
            let options = {
                user: username.trim().toLowerCase(),
                pwd: password,
                 // accessToken: password,
                appKey: WebIM.config.appkey,
                success(token) {
                    let I18N = store.getState().i18n.translations[store.getState().i18n.locale]
                    message.success(I18N.loginSuccessfully, 1)
                    dispatch(Creators.setLoginToken(username, token.access_token))
                    dispatch(Creators.setLoginSuccess(username))
                    window.localStorage.setItem('webImLogout', true)
                },
                error: e => {
                    dispatch(Creators.stopLoging())
                }
            }

            if (WebIM.config.isSandBox) {
                options.apiUrl = WebIM.config.restServer;
            }

            WebIM.conn.open(options)

            WebIM.conn.fetchUserInfoById(username).then((res) => {
                let info = res.data[username]
                dispatch(Creators.setOwnInfo(info))
            })
        }
    },
    loginByToken: (username, token) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoging(username, null, token))
            WebIM.conn.open({
                // apiUrl: WebIM.config.restServer,
                user: username.trim().toLowerCase(),
                // pwd: token,
                accessToken: token,
                appKey: WebIM.config.appkey
                // there is no success callback when login by token
                // success(token) {
                // }
            })
            WebIM.conn.fetchUserInfoById(username).then((res) => {
                let info = res.data[username]
                dispatch(Creators.setOwnInfo(info))
            })
        }
    },

    getToken: (phoneNumber, smsCode) => {
        return (dispatch, getState) => {
            axios.post(domain+'/inside/app/user/login/V2', {
                phoneNumber: phoneNumber,
                smsCode: smsCode
            })
            .then(function (response) {
                console.log(response);
                const {token, chatUserName} = response.data
                let I18N = store.getState().i18n.translations[store.getState().i18n.locale]
                message.success(I18N.loginSuccessfully, 1)
                dispatch(Creators.setLoginToken(chatUserName, token))
                dispatch(Creators.setLoginSuccess(chatUserName))
                window.localStorage.setItem('webImLogout', true)

                dispatch(Creators.loginByToken(chatUserName, token))
            })
            .catch(function (error) {
                switch (error.response.data.errorInfo) {
                    case "UserId password error.":
                        message.error('用户名或密码错误！')
                        break;
                    case `UserId ${phoneNumber} does not exist.`:
                        message.error('登录用户不存在')
                        break;
                    case 'phone number illegal':
                        message.error('请输入正确的手机号')
                        break;
                    case 'SMS verification code error.':
                        message.error('验证码错误')
                        break;
                    case 'Sms code cannot be empty':
                        message.error('验证码不能为空')
                        break;
                    case 'Please send SMS to get mobile phone verification code.':
                        message.error('请使用短信验证码登录')
                        break;
                    default:
                        message.error('登录失败，请重试！')
                        break;
                }
                dispatch(Creators.stopLoging())
            });
        }
    },
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    username: null,
    token: null,
    error: null,
    fetching: false,
    registerError: null,
    isLoadingToken: false,
    //
    hasToken: false,
    isLogin: false,
    info: {}
})

/* ------------- Reducers ------------- */
export const setLoginToken = (state = INITIAL_STATE, { username, token }) => {
    Cookie.set('web_im_' + username, token)
    return Immutable.merge(state, {
        username: username,
        token
    })
}

export const setOwnInfo = (state = INITIAL_STATE, { info }) => {
    return Immutable.merge(state, {
        info: info
    })
}

// we're attempting to login
export const setLoging = (state = INITIAL_STATE,
    { username, password, token }) => {
    return Immutable.merge(state, {
        username,
        password,
        token,
        fetching: true,
        error: false
    })
}

export const stopLoging = (state = INITIAL_STATE) => {
    return Immutable.merge(state, {
        fetching: false,
    })
}

// we've successfully logged in
export const setLoginSuccess = state => {
    return Immutable.merge(state, { isLogin: true })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
    return Immutable.merge(state, { error: error })
}


// we've logged out
export const logout = (state = INITIAL_STATE) => {
    return state.merge({ username: null, password: null, token: null, isLogin: false })
}

export const jumpRegister = (state) => {
    history.push('/register')
    return state
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOGIN_TOKEN]: setLoginToken,
    [Types.SET_LOGING]: setLoging,
    [Types.STOP_LOGING]: stopLoging,
    [Types.SET_LOGIN_SUCCESS]: setLoginSuccess,
    [Types.LOGIN_FAILURE]: failure,
    [Types.LOGOUT]: logout,
    [Types.JUMP_REGISTER]: jumpRegister,
    [Types.SET_OWN_INFO]: setOwnInfo
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = state => state.username !== null
