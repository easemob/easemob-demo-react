import i18next from "../../../i18n";
import {
  Switch,
  Tooltip,
  Button,
  Icon,
  Collapse,
  RootContext,
} from "easemob-chat-uikit";
import React, { useState, useEffect, useContext } from "react";
import { HuePicker } from "react-color";
import "./general.scss";
import { updateAppConfig } from "../../../store/appConfigSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import classNames from "classnames";
export interface GeneralConfig {
  typing: boolean;
  dark: boolean;
  theme: "classic" | "voyage";
  color: { h: number; s: number; l: number; a: number };
  translation: boolean;
  thread: boolean;
  reaction: boolean;
  language: string;
}
const Pointer = () => {
  return <div className="color-picker-pointer"></div>;
};

const General = () => {
  const state = useAppSelector((state) => state.appConfig);
  const dispatch = useAppDispatch();

  const prefixCls = "user-info";
  const context = useContext(RootContext);
  const { theme } = context;
  const appThemeMode = theme?.mode;
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
    typing: state.typing,
    dark: state.dark,
    theme: state.theme,
    color: state.color,
    translation: state.translation,
    thread: state.thread,
    reaction: state.reaction,
    language: state.language,
  });

  useEffect(() => {
    dispatch(updateAppConfig(generalConfig));
    i18next.changeLanguage(generalConfig.language);
  }, [generalConfig]);

  const handleSwitchChange =
    (type: "typing" | "dark" | "translation" | "thread" | "reaction") =>
    (e: { target: { checked: boolean } }) => {
      const result = e.target.checked;
      const config = {
        ...generalConfig,
        [type]: result,
      };
      setGeneralConfig(config);
      localStorage.setItem("generalConfig", JSON.stringify(config));
    };
  let themeMode = "light";

  // --- 主题切换 ---
  const themes: ["classic", "voyage"] = ["classic", "voyage"];
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const setTheme = (theme: "classic" | "voyage") => {
    console.log("setTheme", theme);
    setGeneralConfig({
      ...generalConfig,
      theme,
    });
    localStorage.setItem(
      "generalConfig",
      JSON.stringify({ ...generalConfig, theme })
    );
  };

  const themeMenu = (
    <ul className={`cui-header-more`}>
      {themes.map((theme, index) => (
        <li
          className={appThemeMode == "dark" ? "cui-li-dark" : ""}
          style={{
            width: "212px",
            display: "flex",
            justifyContent: "space-between",
          }}
          key={index}
          onClick={() => {
            setTheme(theme);
          }}
        >
          {i18next.t(theme)}
          {generalConfig.theme == theme && (
            <Icon type="CHECK" width={14} height={14}></Icon>
          )}
        </li>
      ))}
    </ul>
  );

  // --- 颜色设置 ---
  const [colorSettingVisible, setColorSettingVisible] = useState(false);
  const handleColorSettingClick = () => {
    setColorSettingVisible((colorSettingVisible) => !colorSettingVisible);
  };
  const setColor = (color: any) => {
    console.log("color", color);
    setGeneralConfig({
      ...generalConfig,
      color: color.hsl,
    });
    localStorage.setItem(
      "generalConfig",
      JSON.stringify({ ...generalConfig, color: color.hsl })
    );
  };
  const colorNode = (
    <div style={{ position: "relative" }}>
      <HuePicker
        color={generalConfig.color}
        width={184}
        height={4}
        pointer={Pointer}
        onChange={setColor}
      ></HuePicker>
    </div>
  );

  // --- 特性开关 ---
  const [featureSettingVisible, setFeatureSettingVisible] = useState(false);
  const handleFeatureSettingClick = () => {
    setFeatureSettingVisible((featureSettingVisible) => !featureSettingVisible);
  };

  // --- 语言设置 ---
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langs = ["zh", "en"];
  const setLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    // localStorage.setItem("language", lang);
    setGeneralConfig({
      ...generalConfig,
      language: lang,
    });
    localStorage.setItem(
      "generalConfig",
      JSON.stringify({ ...generalConfig, language: lang })
    );
  };
  const langMenu = (
    <ul className={`cui-header-more`}>
      {langs.map((lang, index) => (
        <li
          className={appThemeMode == "dark" ? "cui-li-dark" : ""}
          style={{
            width: "212px",
            display: "flex",
            justifyContent: "space-between",
          }}
          key={index}
          onClick={() => {
            setLanguage(lang);
          }}
        >
          {i18next.t(lang)}
          {generalConfig.language == lang && (
            <Icon type="CHECK" width={14} height={14}></Icon>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": appThemeMode === "dark",
      })}
    >
      <header className="setting-personal-header">
        {i18next.t("general")}
      </header>
      <main className="setting-personal-main">
        <section className="setting-personal-content">
          <div
            className="user-info-content"
            style={{
              backgroundColor: appThemeMode == "dark" ? "#171A1C" : "#F9FAFA",
            }}
          >
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("showTyping")}</span>
                <div>
                  <Switch
                    checked={generalConfig.typing}
                    onChange={handleSwitchChange("typing")}
                  ></Switch>
                </div>
              </div>
              <div className={`${prefixCls}-content-item-explain`}>
                {i18next.t(
                  "Turning it on will show you the status of your input"
                )}
              </div>
            </div>

            <div
              className={`${prefixCls}-content-item`}
              style={{ marginTop: "28px" }}
            >
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("darkMode")}</span>
                <div>
                  <Switch
                    checked={generalConfig.dark}
                    onChange={handleSwitchChange("dark")}
                  ></Switch>
                </div>
              </div>
            </div>

            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("changeTheme")}</span>
                <div>
                  <Tooltip
                    title={themeMenu}
                    trigger="click"
                    placement="bottomLeft"
                    open={themeMenuOpen}
                    onOpenChange={(value: boolean) => {
                      setThemeMenuOpen(value);
                    }}
                  >
                    <div className={`${prefixCls}-content-item-dropdown`}>
                      <div>{i18next.t(generalConfig.theme)}</div>
                      <Icon
                        type={themeMenuOpen ? "ARROW_UP" : "ARROW_DOWN"}
                        color={appThemeMode == "dark" ? "#C8CDD0" : "#464E53"}
                        width={24}
                        height={24}
                      ></Icon>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                onClick={handleColorSettingClick}
              >
                <span>{i18next.t("themeColor")}</span>

                <Icon
                  type={colorSettingVisible ? "ARROW_UP" : "ARROW_DOWN"}
                  color={appThemeMode == "dark" ? "#C8CDD0" : "#464E53"}
                  width={24}
                  height={24}
                ></Icon>
              </div>
            </div>
            {colorSettingVisible ? (
              <div className="color-setting-content">
                <div className="color-setting-content-item">
                  <div className="color-setting-content-ellipse"></div>
                  <div
                    className={classNames("color-setting-content-body", {
                      "color-setting-content-body-dark":
                        appThemeMode === "dark",
                    })}
                  >
                    <div className="color-setting-content-body-label">
                      {i18next.t("primary")}
                    </div>
                    <div className="color-setting-content-body-picker">
                      <div>{colorNode}</div>
                      <div style={{ width: "24px" }}>
                        {Math.round(generalConfig.color.h)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                onClick={handleFeatureSettingClick}
              >
                <span>{i18next.t("featuresConsole")}</span>
                <Icon
                  type={featureSettingVisible ? "ARROW_UP" : "ARROW_DOWN"}
                  color={appThemeMode == "dark" ? "#C8CDD0" : "#464E53"}
                  width={24}
                  height={24}
                ></Icon>
              </div>
            </div>
            {featureSettingVisible ? (
              <div className="color-setting-content">
                <div className="color-setting-content-item feature-setting-item">
                  <div className="color-setting-content-ellipse"></div>
                  <div
                    className={`${prefixCls}-content-item feature-setting-content`}
                  >
                    <div className={`${prefixCls}-content-item-box`}>
                      <span>{i18next.t("messageTranslation")}</span>
                      <div>
                        <Switch
                          checked={generalConfig.translation}
                          onChange={handleSwitchChange("translation")}
                        ></Switch>
                      </div>
                    </div>
                    <div className={`${prefixCls}-content-item-explain`}>
                      {i18next.t(
                        "Translate messages into browser language through the message operation menu"
                      )}
                    </div>
                  </div>
                </div>

                <div className="color-setting-content-item feature-setting-item">
                  <div className="color-setting-content-ellipse"></div>
                  <div
                    className={`${prefixCls}-content-item feature-setting-content`}
                  >
                    <div className={`${prefixCls}-content-item-box`}>
                      <span>{i18next.t("groupThread")}</span>
                      <div>
                        <Switch
                          checked={generalConfig.thread}
                          onChange={handleSwitchChange("thread")}
                        ></Switch>
                      </div>
                    </div>
                    <div className={`${prefixCls}-content-item-explain`}>
                      {i18next.t(
                        "Create a thread from a message within the group"
                      )}
                    </div>
                  </div>
                </div>

                <div className="color-setting-content-item feature-setting-item">
                  <div className="color-setting-content-ellipse"></div>
                  <div
                    className={`${prefixCls}-content-item feature-setting-content`}
                  >
                    <div className={`${prefixCls}-content-item-box`}>
                      <span>{i18next.t("messageReactions")}</span>
                      <div>
                        <Switch
                          checked={generalConfig.reaction}
                          onChange={handleSwitchChange("reaction")}
                        ></Switch>
                      </div>
                    </div>
                    <div className={`${prefixCls}-content-item-explain`}>
                      {i18next.t(
                        "Add emoji reactions to messages through the message operation menu"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("languageSettings")}</span>
                <div>
                  <Tooltip
                    title={langMenu}
                    trigger="click"
                    placement="bottomLeft"
                    open={langMenuOpen}
                    onOpenChange={(value: boolean) => {
                      setLangMenuOpen(value);
                    }}
                  >
                    <div className={`${prefixCls}-content-item-dropdown`}>
                      <div>{i18next.t(generalConfig.language)}</div>
                      <Icon
                        style={{ cursor: "pointer" }}
                        type={langMenuOpen ? "ARROW_UP" : "ARROW_DOWN"}
                        color={appThemeMode == "dark" ? "#C8CDD0" : "#464E53"}
                        width={24}
                        height={24}
                      ></Icon>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default General;
