import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, Row, Form, Input, Select, Col } from "antd"
import { config } from "@/config"
import styles from "./index.less"
import RegisterActions from "@/redux/RegisterRedux"
// import LoginActions from '@/redux/LoginRedux'
import ServerActions from '@/redux/ServerRedux'
import WebIM from "@/config/WebIM"
import axios from 'axios'
import { message } from 'antd'
const domain = WebIM.config.restServer

const { Option } = Select;
const FormItem = Form.Item

const Register = ({
    I18N,
    login,
    imageId,
    imageVerifyUrl,
    doRegister,
    jumpLogin,
    getImageVerification,
    registerUser,
    isSuccess,
    form: { getFieldDecorator, validateFieldsAndScroll, getFieldValue, validateFields }
}) => {
    let timer
    let times = 50
    let [smsBtnText, setSmsBtnText] = useState(I18N.getCaptcha)
    const { loginLoading } = login
    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            registerUser({
                userId: values.username,
                userPassword: values.password,
                phoneNumber: values.phoneNumber,
                smsCode: values.captcha,
            })
            //doRegister(values.username, values.password, values.username)
        })
    }

    const getCaptcha = () => {
        if(typeof smsBtnText != 'string') return
        const imageCode = getFieldValue('imageCode')
        const phoneNumber = getFieldValue('phoneNumber')
        validateFields(['imageCode', 'phoneNumber'], (errors, values) => {
            if(errors){
                return
            }
            sendSms(values.phoneNumber, values.imageCode)
        });
    }

    const sendSms = (phoneNumber, imageCode) => {
        axios.post(domain+'/inside/app/sms/send', {
            phoneNumber,
            imageId,
            imageCode
        })
        .then((response) => {
            message.success('短信已发送')
            countDown()
        })
        .catch(function (error) {
            console.log('error', error.response);
            if(error.response.status == '400'){
                message.error(error.response.data.errorInfo)
                getImageVerification()
            }
        });
    }

    const countDown = () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            setSmsBtnText(times--)
            if (times === 0) {
                times = 50
                setSmsBtnText(I18N.getCaptcha)
                return clearTimeout(timer)
            }
            countDown()
        }, 1000)
    }

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }} isSelectOptGroup>
        <Option value="86">+86</Option>
      </Select>,
    );

    if(isSuccess){
        clearTimeout(timer)
    }

    useEffect( () => {
        getImageVerification()
    }, [])

    const logo = WebIM.config.i18n == "cn" ? <i className='font'>V</i> : <i className="iconfont icon-hyphenate"/>
    return (
        <div className="form x-login">
            <div className="logo">
                {logo}
                <span>
                    {config.name}
                </span>
            </div>

            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator("username", {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(
                        <Input
                            size="large"
                            onPressEnter={handleOk}
                            placeholder={I18N.username}
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(
                        <Input
                            size="large"
                            type="password"
                            onPressEnter={handleOk}
                            placeholder={I18N.password}
                        />
                    )}
                </FormItem>

                <Form.Item hasFeedback>
                  {getFieldDecorator('phoneNumber', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  })(<Input addonBefore={prefixSelector} placeholder={I18N.phoneNumber}/>)}
                </Form.Item>
                <FormItem>
                  <Row gutter={8}>
                    <Col span={16}>
                      {getFieldDecorator('imageCode', {
                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                      })(<Input placeholder={I18N.imageVerification}/>)}
                    </Col>
                    <Col span={8}>
                      <div className="image-verification">
                        <img src={imageVerifyUrl} style={{width: '100%', height: '100%'}} onClick={getImageVerification}></img>
                      </div>
                    </Col>
                  </Row>
                </FormItem>

                <FormItem>
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                      })(<Input size="default" placeholder={I18N.captcha}/>)}
                    </Col>
                    <Col span={12}>
                      <Button size="large" onClick={getCaptcha}>{smsBtnText}</Button>
                    </Col>
                  </Row>
                </FormItem>

                {/*<FormItem hasFeedback>
                    {getFieldDecorator("nickname")(
                        <Input
                            size="large"
                            onPressEnter={handleOk}
                            placeholder={I18N.nickname}
                        />
                    )}
                </FormItem>
                */}
                <Row>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleOk}
                        loading={loginLoading}
                    >
                        {I18N.signUp}
                    </Button>
                </Row>
            </form>
            <div className="extra">
                <p>
                    {I18N.haveaccount}
                    <span onClick={jumpLogin}>{I18N.signIn}</span>
                </p>
            </div>
        </div>
    )
}


Register.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func
}

export default connect(
    ({ i18n, login, register }) => {
        return ({
        I18N: i18n.locale && i18n.translations && i18n.translations[i18n.locale] || {},
        login: {
            loginLoading: false
        },
        imageVerifyUrl: register.imageVerifyUrl,
        isSuccess: register.isSuccess,
        imageId: register.imageId
    })},
    dispatch => ({
        doRegister: (username, password, nickname) =>
            dispatch(RegisterActions.register(username, password, nickname)),
        jumpLogin: () =>
            dispatch(RegisterActions.jumpLogin()),
        getImageVerification: () => {
            dispatch(RegisterActions.getImageVerification())
        },
        registerUser: (option) => {
            dispatch(RegisterActions.registerUser(option))
        }
    })
)(Form.create()(Register))
