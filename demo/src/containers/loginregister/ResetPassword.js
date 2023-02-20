import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Form, Input, Select, Col } from "antd";
import { config } from "@/config";
import RegisterActions from "@/redux/RegisterRedux";
import WebIM from "@/config/WebIM";
import axios from "axios";
import { message } from "antd";

const domain = WebIM.config.restServer
const { Option } = Select;
const FormItem = Form.Item;
let ResetUserId = null;

const ResetPassword = ({
  I18N,
  imageId,
  imageVerifyUrl,
  isSuccess,
  getImageVerification,
  history,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
    getFieldValue
  }
}) => {
  let timer;
  let times = 50;
  let [smsBtnText, setSmsBtnText] = useState(I18N.getCaptcha);
  let [isNext, setNext] = useState(false);

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      checkUserTel({
        userId: values.username,
        phoneNumber: values.phoneNumber,
        smsCode: values.captcha
      });
    });
  }

  const checkUserTel = ({ userId, phoneNumber, smsCode }) => {
    axios
      .post(domain + "/inside/app/user/reset/password", {
        userId,
        phoneNumber,
        smsCode
      })
      .then(function () {
        ResetUserId = userId;
        setNext(true);
      })
      .catch((e) => {
        switch (e.response.data.errorInfo) {
          case "Please send SMS to get mobile phone verification code.":
            message.info("请发送短信验证码！");
            break;
          case "SMS verification code error..":
            message.error("短信验证码错误！");
            break;
          case "The phone number does not match the userId.":
            message.error("用户ID和手机号不匹配");
            break;
          default:
            message.error("用户信息校验失败，请重试！")
            break;
        }
      });
  };

  const getCaptcha = () => {
    if (typeof smsBtnText != "string") return;
    validateFields(["imageCode", "phoneNumber"], (errors, values) => {
      if (errors) {
        return;
      }
      sendSms(values.phoneNumber, values.imageCode);
    });
  };

  const sendSms = (phoneNumber, imageCode) => {
    axios
      .post(domain + "/inside/app/sms/send", {
        phoneNumber,
        imageId,
        imageCode
      })
      .then((response) => {
        message.success("短信已发送");
        countDown();
      })
      .catch(function (error) {
        if (error.response.status == "400") {
          message.error(error.response.data.errorInfo);
          getImageVerification();
        }
      });
  };

  const countDown = () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      setSmsBtnText(times--);
      if (times === 0) {
        times = 50;
        setSmsBtnText(I18N.getCaptcha);
        return clearTimeout(timer);
      }
      countDown();
    }, 1000);
  };

  const resetPassword = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      axios
        .put(`${domain}/inside/app/user/${ResetUserId}/password`, {
          newPassword: values.newPassword
        })
        .then(function () {
          message.success("重置密码成功");
          history.push("/login");
        })
        .catch(() => {
          message.error("重置密码失败,请重试！");
        });
    });
  };

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "86"
  })(
    <Select style={{ width: 70 }} isSelectOptGroup>
      <Option value="86">+86</Option>
    </Select>
  );

  if (isSuccess) {
    clearTimeout(timer);
  }

  useEffect(() => {
    getImageVerification();
  }, []);

  const logo =
    WebIM.config.i18n == "cn" ? (
      <i className="font">V</i>
    ) : (
      <i className="iconfont icon-hyphenate" />
    );
  return (
    <div className="form x-login">
      <div className="logo">
        {logo}
        <span>{config.name}</span>
      </div>

      {!isNext ? (
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
          <Form.Item hasFeedback>
            {getFieldDecorator("phoneNumber", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input
                addonBefore={prefixSelector}
                placeholder={I18N.phoneNumber}
              />
            )}
          </Form.Item>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator("imageCode", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the captcha you got!"
                    }
                  ]
                })(<Input placeholder={I18N.imageVerification} />)}
              </Col>
              <Col span={8}>
                <div className="image-verification">
                  <img
                    src={imageVerifyUrl}
                    style={{ width: "100%", height: "100%" }}
                    onClick={getImageVerification}
                  ></img>
                </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("captcha", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the captcha you got!"
                    }
                  ]
                })(<Input size="default" placeholder={I18N.captcha} />)}
              </Col>
              <Col span={12}>
                <Button size="large" onClick={getCaptcha}>
                  {smsBtnText}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={handleOk}
              loading={false}
            >
              {I18N.next}
            </Button>
          </Row>
        </form>
      ) : (
        // 下一步
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input the password!"
                }
              ]
            })(
              <Input
                size="large"
                type={"password"}
                onPressEnter={handleOk}
                placeholder={I18N.newPassword}
              />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator("newPassword", {
              rules: [
                {
                  validator: (rule, value) => {
                    if (value) {
                      if (value !== getFieldValue("password")) {
                        return Promise.reject(
                          "The passwords entered twice do not match"
                        );
                      } else {
                        return Promise.resolve();
                      }
                    } else {
                      return Promise.reject(
                        "Please input the confirm password!"
                      );
                    }
                  }
                }
              ]
            })(
              <Input
                size="large"
                type={"password"}
                onPressEnter={handleOk}
                placeholder={I18N.confirmPassword}
              />
            )}
          </FormItem>

          <Row>
            <Button
              type="primary"
              size="large"
              onClick={resetPassword}
              loading={false}
            >
              {I18N.complete}
            </Button>
          </Row>
        </form>
      )}

      <div className="extra">
        <p>
          {I18N.haveaccount}
          <span
            onClick={() => {
              history.push("/login");
            }}
          >
            {I18N.signIn}
          </span>
        </p>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(
  ({ i18n, resetpassword }) => {
    return {
      I18N:
        (i18n.locale && i18n.translations && i18n.translations[i18n.locale]) ||
        {},
      imageVerifyUrl: resetpassword.imageVerifyUrl,
      imageId: resetpassword.imageId,
      isSuccess: resetpassword.isSuccess
    };
  },
  (dispatch) => ({
    getImageVerification: () => {
      dispatch(RegisterActions.getImageVerification());
    }
  })
)(Form.create()(ResetPassword));
