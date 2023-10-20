import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Row, Form, Input, Switch, message } from 'antd'
import { config } from '@/config'
import LoginActions from '@/redux/LoginRedux'
import RegisterActions from '@/redux/RegisterRedux'
import WebIM from '@/config/WebIM'
import { history } from '@/utils'
const FormItem = Form.Item

const { appkey, https, rest, isHttpDNS, isCustomConfig } = localStorage.getItem(
    'imConfig'
)
    ? JSON.parse(localStorage.getItem('imConfig'))
    : {}

const Server = ({
    I18N,
    jumpRegister,
    jumpLogin,
    form: { getFieldDecorator, validateFieldsAndScroll, resetFields }
}) => {
    const [ disabled, setDisabled ] = useState(true)
    const [ useHttps, setHttps ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [ useCustomConfig, setUseCustomConfig ] = useState(false)
    const [ appKey, setAppKey ] = useState('')
    const [ restServer, setRestServer ] = useState('')
    const [ imServer, setImServer ] = useState('')

    useEffect(() => {
        if (appkey) {
            setAppKey(appkey)
        }
        if (https) {
            setHttps(https)
        }
        setChecked(!isHttpDNS)
        setDisabled(isHttpDNS)
        if (isCustomConfig) {
            setUseCustomConfig(isCustomConfig)
        }
        if (rest) {
            const { imServer, restServer } = rest
            if (imServer) {
                setImServer(imServer)
            }

            if (restServer) {
                setRestServer(restServer)
            }
        }
    }, [])

    const handleOk = () => {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            const { appkey, imServer, restServer } = values
            const tempObj = {
                rest: {
                    imServer: imServer,
                    restServer: restServer
                },
                isHttpDNS: !checked,
                https: useHttps,
                isCustomConfig: useCustomConfig,
                appkey
            }
            localStorage.setItem('imConfig', JSON.stringify(tempObj))
            message.success(I18N.settingSuccess)
            history.replace('/login')
            window.location.reload()
        })
    }
    function onChange(checked, num) {
        if (num) {
            setHttps(checked)
        } else {
            setChecked(checked)
            setDisabled(!checked)
        }
    }

    const logo =
    WebIM.config.i18n === 'cn' ? (
        <i className="font">V</i>
    ) : (
        <i className="iconfont icon-hyphenate" />
    )
    return (
        <div className="form x-login form-server">
            <div className="logo">
                {logo}
                <span>{config.name}</span>
            </div>
            <div className="switch-box">
                <h2>使用自定义配置?</h2>
                <Switch
                    className="switch-width"
                    checked={useCustomConfig}
                    onChange={(e) => {
                        setUseCustomConfig(e)
                    }}
                ></Switch>
            </div>
            <br></br>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator('appkey', {
                        rules: [
                            {
                                required: false
                            }
                        ],
                        initialValue: appKey
                    })(<Input size="large" placeholder={I18N.appKey} />)}
                </FormItem>
                <FormItem>
                    <div className="switch-box">
                        <span>使用私有服务器</span>
                        <Switch
                            className="switch-width"
                            checked={checked}
                            onChange={(e) => onChange(e, 0)}
                        ></Switch>
                    </div>
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('imServer', {
                        rules: [
                            {
                                required: checked
                            }
                        ],
                        initialValue: imServer
                    })(
                        <Input
                            size="large"
                            disabled={disabled}
                            placeholder={I18N.imServerAddress}
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('restServer', {
                        rules: [
                            {
                                required: checked
                            }
                        ],
                        initialValue: restServer
                    })(
                        <Input
                            size="large"
                            disabled={disabled}
                            placeholder={I18N.restServerAddress}
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    <div className="switch-box">
                        <span>只使用Https</span>
                        <Switch
                            className="switch-width"
                            checked={useHttps}
                            onChange={(e) => onChange(e, 1)}
                        ></Switch>
                    </div>
                </FormItem>
                <Row>
                    <Button type="primary" size="large" onClick={handleOk}>
                        {I18N.saveSetting}
                    </Button>
                </Row>
            </form>
            <div className="extra">
                <p>
                    {I18N.noaccount}
                    <span onClick={jumpRegister}>{I18N.signUp}</span>
                    <span onClick={jumpLogin}>{I18N.signIn}</span>
                </p>
            </div>
        </div>
    )
}

Server.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func
}

export default connect(
    ({ login, i18n }) => ({
        I18N:
      (i18n.locale && i18n.translations && i18n.translations[i18n.locale]) || {}
    }),
    (dispatch) => ({
        jumpRegister: () => dispatch(LoginActions.jumpRegister()),
        jumpLogin: () => dispatch(RegisterActions.jumpLogin())
    })
)(Form.create()(Server))
