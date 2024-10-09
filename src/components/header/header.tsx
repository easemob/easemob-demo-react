import React from "react";
import "./header.scss";
import ThemeSwitch from "../themeSwitch/themeSwitch";
import { updateAppConfig } from "../../store/appConfigSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import classNames from "classnames";
const Header = () => {
  const dispatch = useAppDispatch();
  const handleChangeTheme = (type: "sun" | "moon") => {
    dispatch(updateAppConfig({ dark: type === "moon" }));
  };
  const state = useAppSelector((state) => state.appConfig);
  const classString = classNames("live-demo-header", {
    "live-demo-header-dark": state.dark,
  });
  return (
    <div className={classString}>
      <div className="window-control-bar">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="theme-button">
        <ThemeSwitch onChange={handleChangeTheme}></ThemeSwitch>
      </div>
    </div>
  );
};

export default Header;
