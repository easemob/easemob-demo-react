import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Row, Form, Input, Checkbox, Col, message } from 'antd'
import { config } from '@/config'
import styles from './index.less'
import LoginActions from '@/redux/LoginRedux'
import ServerActions from '@/redux/ServerRedux'
import WebIM from '@/config/WebIM'
import axios from 'axios'
const domain = WebIM.config.restServer
const FormItem = Form.Item

const USE_PASSWORD = WebIM.config.usePassword

const Login = ({
    I18N,
    login,
    doLogin,
    doLoginByToken,
    jumpRegister,
    jumpServer,
    getToken,
    history,
    form: { getFieldDecorator, validateFieldsAndScroll, validateFields, getFieldValue }
}) => {
    let timer
    let times = 60
    const { loginLoading } = login
    let [smsBtnText, setSmsBtnText] = useState(I18N.getCaptcha)
    const handleOk = () => {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            // 使用用户名密码登录
            if (USE_PASSWORD) {
                doLogin(values.phoneNumber, values.captcha)
            } else {
                getToken(values.phoneNumber, values.captcha)
            }
        })
    }

    const getCaptcha = () => {
        if (typeof smsBtnText !== 'string') return
        const phoneNumber = getFieldValue('phoneNumber')
        validateFields(['phoneNumber'], (errors, values) => {
            if (errors) {
                return
            }
            sendSms(values.phoneNumber)
        })
    }

    const sendSms = (phoneNumber) => {
        axios.post(domain + `/inside/app/sms/send/${phoneNumber}`, {
            phoneNumber
        })
            .then((response) => {
                message.success('短信已发送')
                countDown()
            })
            .catch(function (error) {
                console.log('error', error.response)
                if (error.response.status == '400') {
                    if (error.response.data?.errorInfo == 'phone number illegal') {
                        message.error('请输入正确的手机号！')
                    } else if (error.response.data?.errorInfo == 'Please wait a moment while trying to send.') {
                        message.error('你的操作过于频繁，请稍后再试！')
                    } else if (error.response.data?.errorInfo.includes('exceed the limit')) {
                        message.error('获取已达上限！')
                    } else {
                        message.error(error.response.data?.errorInfo)
                    }
                }
            })
    }

    const countDown = () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            setSmsBtnText(times--)
            if (times === 0) {
                times = 60
                setSmsBtnText(I18N.getCaptcha)
                return clearTimeout(timer)
            }
            countDown()
        }, 1000)
    }

    const logo = WebIM.config.i18n === 'cn' ? <i className='font'>V</i> : <i className="iconfont icon-hyphenate" />
    return (
        <div className="form x-login">
            <div className="logo">
                {logo}
                <span>{config.name}</span>
            </div>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator('phoneNumber', {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(<Input size="large" onPressEnter={handleOk} placeholder={I18N.phoneNumber} />)}
                </FormItem>

                <FormItem>
                    <Row gutter={8}>
                        <Col span={14}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(<Input size="default" placeholder={I18N.captcha} />)}
                        </Col>
                        <Col span={10}>
                            <Button size="large" onClick={getCaptcha}>{smsBtnText}</Button>
                        </Col>
                    </Row>
                </FormItem>

                {/*<FormItem hasFeedback>{getFieldDecorator('type')(<Checkbox>{I18N.tokenSignin}</Checkbox>)}</FormItem>*/}

                <Row>
                    <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                        {I18N.signIn}
                    </Button>
                </Row>
            </form>
            {/* <div className="extra">
                <p>
                    {I18N.noaccount}
                    <span onClick={jumpRegister}>{I18N.signUp}</span>
                    <span onClick={jumpServer}>{I18N.serverConfiguration}</span>
                    <span onClick={()=>{history.push("/resetpassword")}}>{I18N.findBackPassword}</span>
                </p>
            </div> */}
        </div>
    )
}

Login.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func
}

export default connect(
    ({ login, i18n }) => ({
        I18N: (i18n.locale && i18n.translations && i18n.translations[i18n.locale]) || {},
        login: {
            loginLoading: false
        }
    }),
    dispatch => ({
        doLogin: (username, password) => dispatch(LoginActions.login(username, password)),
        doLoginByToken: (username, token) => dispatch(LoginActions.loginByToken(username, token)),
        jumpRegister: () => dispatch(LoginActions.jumpRegister()),
        jumpServer: () => dispatch(ServerActions.jumpServer()),
        getToken: (phoneNumber, smsCode) => dispatch(LoginActions.getToken(phoneNumber, smsCode))
    })
)(Form.create()(Login))
