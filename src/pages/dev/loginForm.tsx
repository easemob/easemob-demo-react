import React, { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "easemob-chat-uikit";
import i18next from "../../i18n";

import loading from "../../assets/loading.png";
import closeIcon from "../../assets/Xmark@2x.png";
import eyeOpen from "../../assets/eye@2x.png";
import eyeClose from "../../assets/eye_slash@2x.png";
import toast from "../../components/toast/toast";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { loginWithPassword } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.login);
  useEffect(() => {
    if (state.loggedIn) {
      navigate("/main");
    }
  }, [state.loggedIn]);
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });
  const [isLogging, setIsLogging] = useState(false);

  const handleChange =
    (type: "userId" | "password") => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValues({
        ...values,
        [type]: value,
      });
    };

  const clearUserId = () => {
    setValues({
      ...values,
      userId: "",
    });
  };

  const login = () => {
    setIsLogging(true);
    if (values.userId === "" || values.password === "") {
      setIsLogging(false);
      toast.error("用户名或密码不能为空");
      return;
    }
    dispatch(
      loginWithPassword({
        userId: values.userId,
        password: values.password,
      })
    );
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const switchPasswordVisible = () => {
    console.log("switchPasswordVisible");
    setPasswordVisible((value) => !value);
  };
  return (
    <div className="dev-form">
      <div className="dev-form-icon"></div>
      <div className="dev-form-AC">
        {i18next.t("easemob")} IM Demo <br />
        <div className="devMode">开发者模式</div>
      </div>

      <div className="input-box">
        <input
          disabled={isLogging}
          className="dev-form-input"
          placeholder={i18next.t("userId")}
          onChange={handleChange("userId")}
          value={values.userId}
          maxLength={32}
        ></input>
        {values.userId && (
          <img
            src={closeIcon}
            alt="close"
            onClick={clearUserId}
            className="close-btn"
          />
        )}
      </div>
      <div className="input-box">
        <input
          disabled={isLogging}
          type={passwordVisible ? "text" : "password"}
          maxLength={32}
          className="dev-form-input"
          placeholder={i18next.t("password")}
          value={values.password}
          onChange={handleChange("password")}
        ></input>
        {values.password && (
          <img
            onClick={switchPasswordVisible}
            src={passwordVisible ? eyeClose : eyeOpen}
            alt="close"
            className="close-btn"
          />
        )}
      </div>
      <div className="loading-box">
        <input
          disabled={false}
          type="button"
          className="dev-form-input dev-button"
          value={isLogging ? "" : i18next.t("login")}
          onClick={login}
        ></input>
        {isLogging && (
          <img className="loading-img" src={loading} alt="loading" />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
