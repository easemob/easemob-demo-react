import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { config } from '@/config'
import styles from './index.less'
import LoginActions from '@/redux/LoginRedux'
import ServerActions from '@/redux/ServerRedux'
import WebIM from '@/config/WebIM'

const FormItem = Form.Item

const Login = ({
    I18N,
    login,
    doLogin,
    doLoginByToken,
    jumpRegister,
    jumpServer,
    getToken,
    form: { getFieldDecorator, validateFieldsAndScroll }
}) => {
    const { loginLoading } = login

    const handleOk = () => {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            getToken(values.username, values.password)
            return
            if (values.type) {
                doLoginByToken(values.username, values.password)
            } else {
                doLogin(values.username, values.password)
            }
        })
    }


    const logo = WebIM.config.i18n === 'cn' ? <i className='font'>V</i> : <i className="iconfont icon-hyphenate"/>
    return (
        <div className="form x-login">
            <div className="logo">
                {logo}
                <span>{config.name}</span>
            </div>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(<Input size="large" onPressEnter={handleOk} placeholder={I18N.username}/>)}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(<Input size="large" type="password" onPressEnter={handleOk} placeholder={I18N.password}/>)}
                </FormItem>

                {/*<FormItem hasFeedback>{getFieldDecorator('type')(<Checkbox>{I18N.tokenSignin}</Checkbox>)}</FormItem>*/}

                <Row>
                    <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                        {I18N.signIn}
                    </Button>
                </Row>
            </form>
            <div className="extra">
                <p>
                    {I18N.noaccount}
                    <span onClick={jumpRegister}>{I18N.signUp}</span>
                    {/*<span onClick={jumpServer}>{I18N.serverConfiguration}</span>*/}
                    <span onClick={jumpServer}>{I18N.findBackPassword}</span>
                </p>
            </div>
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
        getToken: (username, password) => dispatch(LoginActions.getToken(username, password)) 
    })
)(Form.create()(Login))
