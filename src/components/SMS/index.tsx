import React, { useState, useEffect } from "react";
import { sendSms } from "../../service/login";
import toast from "../toast/toast";
import i18next from "../../i18n";
import { encryptAES } from "./utils";
import { secret, SCENE_ID, PREFIX } from "../../config";

const SMS = ({
  phoneNumber,
  onVerified,
}: {
  phoneNumber: string;
  onVerified: () => void;
}) => {
  const [isSending, setIsSending] = useState(false);
  const handleSendCode = (success: boolean) => {
    // 发送验证码请求，这里使用setTimeout模拟请求
    setIsSending(true);
    // if (success) {
    //   setCountdown(60);
    //   message.success("验证码已发送，请注意查收");
    // } else {
    //   setCountdown(5);
    //   message.error("验证码发送失败，请重试");
    // }
  };

  let captcha;

  const getInstance = (instance: any) => {
    captcha = instance;
  };
  const phoneNumberRef = React.useRef(phoneNumber);
  useEffect(() => {
    phoneNumberRef.current = phoneNumber;
  }, [phoneNumber]);

  const captchaVerifyCallback = async (captchaVerifyParam: string) => {
    // 1.向后端发起业务请求，获取验证码验证结果和业务结果

    const data = { captchaResult: false, bizResult: true };
    if (!captchaVerifyParam) {
      toast.error(i18next.t("Please complete the verification"));
      handleSendCode(false);
      return data;
    }
    // 2.对验证码验证结果进行加密

    // 对secret进行base64解码

    captchaVerifyParam = await encryptAES(captchaVerifyParam, secret);
    try {
      const result = await sendSms({
        phoneNumber: phoneNumberRef.current,
        // sceneId: SCENE_ID,
        captchaVerifyParam: captchaVerifyParam,
      });
      if (result.data.code == 200) {
        onVerified?.();
        handleSendCode(true);
        data.captchaResult = true;
      } else {
        handleSendCode(false);
      }
    } catch (error: any) {
      if (error.response.status == "400") {
        if (error.response.data?.errorInfo == "phone number illegal") {
          i18next.t("Please enter the correct phone number");
        } else if (
          error.response.data?.errorInfo ==
          "Please wait a moment while trying to send."
        ) {
          toast.error(
            `${i18next.t(
              "Your operation is too frequent, please try again later"
            )}!`
          );
        } else if (
          error.response.data?.errorInfo.includes("exceed the limit")
        ) {
          toast.error(i18next.t("Obtaining has reached the maximum limit"));
        } else {
          toast.error(error.response.data?.errorInfo);
        }
      } else {
        toast.error(i18next.t("Failed to obtain verification code"));
      }
      handleSendCode(false);
    }

    return data;
  };
  // 验证通过后调用
  const onBizResultCallback = (bizResult: boolean) => {
    handleSendCode(bizResult);
  };

  useEffect(() => {
    // 只用初始化一次验证码即可
    // @ts-ignore
    window.initAliyunCaptcha({
      SceneId: SCENE_ID, // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
      prefix: PREFIX, // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
      mode: "popup", // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
      element: "#captcha-element", // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
      button: "#captcha-button", // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
      captchaVerifyCallback: captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
      onBizResultCallback: onBizResultCallback, // 业务请求结果回调函数，无需修改
      getInstance: getInstance, // 绑定验证码实例函数，无需修改
      slideStyle: {
        width: 360,
        height: 40,
      }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
      language: "cn", // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
    });
    return () => {
      // 必须删除相关元素，否则再次mount多次调用 initAliyunCaptcha 会导致多次回调 captchaVerifyCallback
      document.getElementById("aliyunCaptcha-mask")?.remove();
      document.getElementById("aliyunCaptcha-window-popup")?.remove();
    };
  }, []);

  return (
    <div className="sms">
      {/* 嵌入式可以控制一下验证码是否显示， 加上这个style */}
      <div
        id="captcha-element"
        style={{ display: isSending ? "none" : "initial" }}
      ></div>
    </div>
  );
};

export default SMS;
