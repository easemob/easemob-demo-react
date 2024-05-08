import React, { useContext } from "react";
import "./notification.scss";
import i18next from "../../../i18n";
import { Icon, Switch, RootContext } from "easemob-chat-uikit";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { updateAppConfig } from "../../../store/appConfigSlice";

const Notification = () => {
  const prefixCls = "user-info";
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.appConfig);
  const handleNotificationChange = (e: { target: { checked: boolean } }) => {
    const result = e.target.checked;
    dispatch(updateAppConfig({ notification: result }));
    const appConfig = JSON.parse(localStorage.getItem("generalConfig") || "{}");
    localStorage.setItem(
      "generalConfig",
      JSON.stringify({ ...appConfig, notification: result })
    );
  };

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;

  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": themeMode === "dark",
      })}
    >
      <header className="setting-personal-header">
        {i18next.t("messageNotification")}
      </header>
      <main className="setting-personal-main">
        <section className="setting-personal-content">
          <div className={`${prefixCls}-content-item`}>
            <div className={`${prefixCls}-content-item-box`}>
              <span>{i18next.t("newMessageNotification")}</span>
              <div>
                <Switch
                  checked={state.notification}
                  onChange={handleNotificationChange}
                ></Switch>
              </div>
            </div>
            <div className={`${prefixCls}-content-item-explain`}>
              {i18next.t(
                "After closing, you will not receive any message push notifications or prompts"
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Notification;
