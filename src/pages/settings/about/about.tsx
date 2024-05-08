import React, { useContext } from "react";
import i18next from "../../../i18n";
import { Icon, Switch, RootContext } from "easemob-chat-uikit";
import classNames from "classnames";
const About = () => {
  const prefixCls = "user-info";

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;
  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": themeMode === "dark",
      })}
    >
      <header className="setting-personal-header">{i18next.t("about")}</header>
      <main className="setting-personal-main">
        <section className="setting-personal-content">
          <div className="user-info-content">
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("demoVersion")}</span>
                <div>1.0.0</div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("uikitVersion")}</span>
                <div>1.0.0</div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("officialWebsite")}</span>
                <div>
                  <a
                    href="https://www.huanxin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.huanxin.com
                  </a>
                </div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("hotline")}</span>
                <div>
                  <a href="tel:4006221776"></a>400-622-1776
                </div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("businessDevelopment")}</span>
                <div>
                  <a href="mailto:bd@easemob.com">bd@easemob.com</a>
                </div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("channelCooperation")}</span>
                <div>
                  <a href="mailto:qudao@easemob.com">qudao@easemob.com</a>
                </div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("issues")}</span>
                <div>
                  <a href="mailto:issues@easemob.com">issues@easemob.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
