// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { api } from '@/config/WebIM'
import Cookie from 'js-cookie'
import { message } from 'antd'
import { history } from '@/utils'
import { store } from '@/redux'
import WebIM from '@/config/WebIM'
import axios from 'axios'
/* ------------- Types and Action Creators ------------- */
const domain = WebIM.config.restServer
const { Types, Creators } = createActions({

    jumpLogin: null,
    registerRequest: [ 'username', 'password', 'nickname' ],
    registerSuccess: [ 'username' ],
    registerFailure: [ 'registerError' ],
    setImageVerifyUrl: [ 'url', 'imageId' ],
    // ------------- async -----------------

    register: (username, password, nickname) => {
        return (dispatch, getState) => {
            let options = {
                // appKey: WebIM.config.appkey,
                // apiUrl: WebIM.config.restServer,
                username: username.trim().toLowerCase(),
                password: password,
                nickname: nickname ? nickname.trim().toLowerCase() : '',
                success: function(){
                    dispatch(Creators.registerSuccess(username))
                },

                error: (err) => {
                    if (JSON.parse(err.data).error === 'duplicate_unique_property_exists') {
                        message.error('用户已存在！')
                    } else if (JSON.parse(err.data).error === 'illegal_argument') {
                        if (JSON.parse(err.data).error_description === 'USERNAME_TOO_LONG') {
                            return message.error('用户名超过64个字节！')
                        }else if(JSON.parse(err.data).error_description === 'password or pin must provided'){
                            return  message.error('密码不合法！')
                        }
                        message.error('用户名不合法！')
                    } else if (JSON.parse(err.data).error === 'unauthorized') {
                        message.error('注册失败，无权限！')
                    } else if (JSON.parse(err.data).error === 'resource_limited') {
                        message.error('您的App用户注册数量已达上限,请升级至企业版！')
                    }
                }
            }
            dispatch(Creators.registerRequest(username, password, nickname))
            WebIM.conn.registerUser(options)
        }
    },

    // 获取图片验证码
    getImageVerification: () => {
        return (dispatch, getState) => {
            axios.get(domain+'/inside/app/image')
            .then(function (response) {
            // 处理成功情况
                const url = domain + '/inside/app/image/' + response.data.data.image_id
                dispatch(Creators.setImageVerifyUrl(url, response.data.data.image_id))
                // https://a1.easemob.com/inside/app/image/dd2a51f0-1872-11ed-9d35-17fdda8f1000
            })
            .catch(() => {
                message.error('获取图片验证码失败，请刷新重试！')
            })
        }
    },
    // 在 appserver 注册用户
    registerUser: ({userId,userPassword,phoneNumber,smsCode}=options) => {
        return (dispatch, getState) => {
            const registerState = getState().register
            const {imageId, imageCode} = registerState
            axios.post(domain+'/inside/app/user/register', {
                userId,
                userPassword,
                phoneNumber,
                smsCode,
                imageId,
                imageCode
            })
            .then(function (response) {
                dispatch(Creators.registerSuccess(username))
                return response
            })
            .catch(function (error) {
                if(error.response.status == '400'){
                    message.error(error.response.data.errorInfo)
                }
                console.log(error.response);
            });
        }
    }
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({imageVerifyUrl: '', imageId: '', isSuccess: false})

/* ------------- Reducers ------------- */
export const jumpLogin = (state) => {
    history.push('/login')
    return state
}

export const register = (state = INITIAL_STATE) => {
    return state
}

export const registerRequest = (state = INITIAL_STATE,
    { username, password }) => {
    return Immutable.merge(state, { username, password, fetching: true })
}

export const registerSuccess = (state = INITIAL_STATE, { username }) => {
    let I18N = store.getState().i18n.translations[store.getState().i18n.locale]
    message.success(username + ', ' + I18N.signUpSuccessfully)
    history.push('/login')
    return Immutable.merge(state, { fetching: false, registerError: null, isSuccess: true})
}

export const registerFailure = (state = INITIAL_STATE, { registerError }) => {
    return Immutable.merge(state, { fetching: false, registerError,  isSuccess: false })
}

export const setImageVerifyUrl = (state = INITIAL_STATE, { url, imageId }) => {
    return Immutable.merge(state, { imageVerifyUrl: url, imageId })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.JUMP_LOGIN]: jumpLogin,
    [Types.REGISTER]: register,
    [Types.REGISTER_REQUEST]: registerRequest,
    [Types.REGISTER_SUCCESS]: registerSuccess,
    [Types.REGISTER_FAILURE]: registerFailure,
    [Types.SET_IMAGE_VERIFY_URL]: setImageVerifyUrl
})

/* ------------- Selectors ------------- */
