import React, { useContext } from "react";
import i18next from "../../../i18n";
import { Icon, RootContext, useIsMobile } from "easemob-chat-uikit";
import classNames from "classnames";
import "./userInfoCollection.css";

const About = (props: { onBack?: () => void }) => {
  const { onBack } = props;
  const isMobile = useIsMobile();
  const prefixCls = "user-info";

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;

  // 静态表格数据
  const tableData = [
    {
      scene: "当您注册或登录时",
      collectedInfo:
        "手机号。收集手机号码是为了满足相关法律法规关于网络实名制要求的必要信息。如果您不提供手机号，您可能无法正常使用我们的服务。用户名、头像。您可以选择修改用户名和头像完善您的个人账号。",
      usage:
        "用于帮助您完成账号注册、登录服务。您的手机号还会被用于进行电话回访，若您不愿继续接受回访，可直接拒绝，不会影响您正常使用我们的服务。",
    },
    {
      scene: "当您使用我们的服务时",
      collectedInfo:
        "设备类型、设备型号、操作系统信息、网络状态、IP地址等日志信息。",
      usage: "用于保障服务的正常使用，维护服务的正常运行，改进及优化服务体验。",
    },
    {
      scene: "当您使用聊天、视频功能时",
      collectedInfo: "音频、视频、聊天记录、图片、文件",
      usage: "用于为您提供聊天相关功能的体验使用",
    },
    {
      scene: "当您使用电话功能拨打客服电话时",
      collectedInfo: "手机号",
      usage: "用于为您提供拨打客服电话的功能体验",
    },
  ];

  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": themeMode === "dark",
        "mobile-fullwidth": isMobile,
      })}
    >
      <header className="setting-personal-header">
        {isMobile && (
          <Icon
            type="ARROW_LEFT"
            width={24}
            height={24}
            onClick={onBack}
          ></Icon>
        )}
        {i18next.t("personalInformationCollected")}
      </header>
      <main className="setting-personal-main">
        <div
          className={classNames("user-info-container", {
            "user-info-container-dark": themeMode === "dark",
          })}
        >
          <div className="user-info-table-wrapper">
            <table className="user-info-table">
              <thead>
                <tr>
                  <th>收集场景</th>
                  <th>我们收集哪些您的个人信息</th>
                  <th>我们如何使用</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.scene}</td>
                    <td>{row.collectedInfo}</td>
                    <td>{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
