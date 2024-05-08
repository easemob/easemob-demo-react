import "./login.scss";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import i18next from "../../i18n";
import loading from "../../assets/loading.png";
import closeIcon from "../../assets/Xmark@2x.png";
import { Icon, Checkbox } from "easemob-chat-uikit";
import toast from "../../components/toast/toast";
import { useNavigate } from "react-router-dom";
import { sendSms, getChatToken } from "../../service/login";
import { loginWithToken, setSDKConfig } from "../../store/loginSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useDispatch } from "react-redux";
import { updateAppConfig } from "../../store/appConfigSlice";
import { DEMO_VERSION, SDK_VERSION, UIKIT_VERSION, appKey } from "../../config";

const Login = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const appConfigState = useAppSelector((state) => state.appConfig);

  useEffect(() => {
    dispatch(
      setSDKConfig({
        appKey: appKey,
        useDNS: true,
      })
    );
  }, []);
  useEffect(() => {
    if (state.loggedIn) {
      navigate("/main");
    }
  }, [state.loggedIn]);
  const [values, setValues] = useState({
    phoneNumber: "",
    vCode: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [agree, setAgree] = useState(false);
  const handleChange =
    (type: "phoneNumber" | "vCode") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (type === "phoneNumber") {
        if (/^[0-9\b]+$/.test(value) || value === "") {
          setValues({
            ...values,
            phoneNumber: value,
          });
        }
      } else if (type === "vCode") {
        setValues({
          ...values,
          vCode: event.target.value,
        });
      }
    };

  const clearPhoneNumber = () => {
    setValues({
      ...values,
      phoneNumber: "",
    });
  };
  const getVCode = () => {
    if (isCounting) {
      return;
    }
    if (values.phoneNumber.length !== 11) {
      toast.error(i18next.t("Please enter the correct phone number"));
      return;
    }
    sendSms(values.phoneNumber)
      .then((res) => {
        setIsCounting(true);
        const timer = setInterval(() => {
          setCountdown((countdown) => {
            if (countdown === 0) {
              clearInterval(timer);
              setIsCounting(false);
              return 60;
            } else {
              return countdown - 1;
            }
          });
        }, 1000);
      })
      .catch(function (error) {
        console.log("error", error.response);
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
      });
  };

  const handleAgreeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgree(event.target.checked);
  };
  const login = () => {
    if (!agree) {
      toast.info(i18next.t("Please agree to privacy and policies"));
      return;
    } else if (values.phoneNumber.length !== 11) {
      toast.info(i18next.t("Please enter the correct phone number"));
      return;
    } else if (values.vCode.length !== 6) {
      toast.info(i18next.t("Please enter the correct verification code"));
      return;
    }

    setIsLogging(true);

    getChatToken(values.phoneNumber, values.vCode)
      .then((res) => {
        console.log("res", res);
        const { token, chatUserName } = res.data;

        dispatch(loginWithToken({ userId: chatUserName, chatToken: token }));
      })
      .catch(function (error) {
        switch (error.response?.data?.errorInfo) {
          case "UserId password error.":
            toast.error(i18next.t("Incorrect username or password"));
            break;
          case `UserId ${values.phoneNumber} does not exist.`:
            toast.error(i18next.t("user does not exist"));
            break;
          case "phone number illegal":
            toast.error(i18next.t("Please enter the correct phone number"));
            break;
          case "SMS verification code error.":
            toast.error(i18next.t("Verification code error"));
            break;
          case "Sms code cannot be empty":
            toast.error(i18next.t("The verification code cannot be empty"));
            break;
          case "Please send SMS to get mobile phone verification code.":
            toast.error(
              i18next.t("Please use SMS verification code to log in")
            );
            break;
          default:
            toast.error(i18next.t("Login failed, please try again"));
            break;
        }
        setIsLogging(false);
      });
  };
  const navigate = useNavigate();
  const goDev = () => {
    navigate("/dev", { replace: true });
  };

  const changeLang = () => {
    console.log("i18next.language", i18next.language);
    const lang = i18next.language === "zh" ? "en" : "zh";
    dispatch(updateAppConfig({ language: lang }));
    i18next.changeLanguage(lang);
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <div title={i18next.t("switchLanguage")}>
          <Icon
            type="GLOBE"
            width={24}
            height={24}
            className="language-switch"
            onClick={changeLang}
          ></Icon>
        </div>

        <div className="login-form-icon"></div>
        <div className="login-form-AC">{i18next.t("easemob")} IM</div>
        <div className="input-box">
          <input
            disabled={isLogging}
            className="login-form-input"
            placeholder={i18next.t("yourPhoneNumber")}
            onChange={handleChange("phoneNumber")}
            value={values.phoneNumber}
            maxLength={11}
          ></input>
          {values.phoneNumber && (
            <img
              src={closeIcon}
              alt="close"
              onClick={clearPhoneNumber}
              className="close-btn"
            />
          )}
        </div>
        <div className="input-box">
          <input
            disabled={isLogging}
            type={"text"}
            maxLength={6}
            className="login-form-input"
            placeholder={i18next.t("verificationCode")}
            value={values.vCode}
            onChange={handleChange("vCode")}
          ></input>
          <div className="login-form-getCode" onClick={getVCode}>
            {isCounting ? (
              <span style={{ color: "#ACB4B9" }}>
                {appConfigState.language == "zh"
                  ? `${countdown}秒后重新获取`
                  : `Retrieve after ${countdown}s`}
              </span>
            ) : (
              <span style={{ color: isLogging ? "#ACB4B9" : "#009EFF" }}>
                {i18next.t("getCode")}
              </span>
            )}
          </div>
        </div>
        <div className="loading-box">
          <input
            disabled={false}
            type="button"
            className="login-form-input login-button"
            value={isLogging ? "" : i18next.t("login")}
            onClick={login}
          ></input>
          {isLogging && (
            <img className="loading-img" src={loading} alt="loading" />
          )}
        </div>
        <div className="login-form-agreement">
          {/* <input
            disabled={isLogging}
            checked={agree}
            type="checkbox"
            onChange={handleAgreeChange}
            className="login-form-checkbox"
          ></input> */}
          <Checkbox
            className="login-form-checkbox"
            disabled={isLogging}
            checked={agree}
            onChange={handleAgreeChange}
            shape="square"
          />
          <div>
            {i18next.t("agree")}{" "}
            <span
              style={{ color: isLogging ? "#ACB4B9" : "#009EFF" }}
              className="login-form-protocol"
            >
              《
              <a target="blank" href="https://www.easemob.com/terms">
                {i18next.t("privacy")}
              </a>
              {i18next.t("and")}
              <a target="blank" href="https://www.easemob.com/protocol">
                {i18next.t("policy")}
              </a>
              》
            </span>{" "}
          </div>
        </div>
      </div>
      <div className="login-copyright">
        {appConfigState.language == "zh"
          ? `© 2024 环信，SDK版本：${SDK_VERSION} UIkit版本：${UIKIT_VERSION} Demo版本：${DEMO_VERSION}`
          : `2024 Easemob Inc, SDK Version: ${SDK_VERSION}  UIkit Version: ${UIKIT_VERSION}  Demo Version: ${DEMO_VERSION}`}
        <span onDoubleClick={goDev}>{"</>"}</span>
      </div>
    </div>
  );
};
// console.log(i18n.t(`I have ${count} ${fruit}`));
// 2024 Easemob Inc, SDK Version: 4.1.1  UIkit Version: Beta0.1.1  Demo Version: 2.0.0
// Privacy and Policy
export default Login;
