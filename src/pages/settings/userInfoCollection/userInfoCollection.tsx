import React, { useContext, useMemo } from "react";
import i18next from "../../../i18n";
import { Icon, rootStore, RootContext, useIsMobile } from "easemob-chat-uikit";
import classNames from "classnames";
import { DEMO_VERSION, UIKIT_VERSION } from "../../../config";
import { useAppSelector } from "../../../hooks";
import "./userInfoCollection.css";

const About = (props: { onBack?: () => void }) => {
  const { onBack } = props;
  const isMobile = useIsMobile();
  const prefixCls = "user-info";

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;

  // 获取浏览器名称
  const getBrowserName = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Edg/")) return "Microsoft Edge";
    if (ua.includes("Chrome/")) return "Chrome";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
    if (ua.includes("MSIE") || ua.includes("Trident/"))
      return "Internet Explorer";
    return "Unknown Browser";
  };

  // 获取用户信息
  const userInfo =
    rootStore.addressStore.appUsersInfo[rootStore.client.user] || {};
  const phoneNumber = useAppSelector((state) => state.login.phoneNumber);

  const userData = useMemo(() => {
    const username = userInfo?.nickname || rootStore.client.user || "";
    const avatar = userInfo?.avatarurl || "";
    const phone = phoneNumber || "";
    const device = getBrowserName();

    return {
      username: {
        value: username,
        count: username ? 1 : 0,
      },
      avatar: {
        value: avatar,
        count: avatar ? 1 : 0,
      },
      phone: {
        value: phone,
        count: phone ? 1 : 0,
      },
      device: {
        value: device,
        count: device ? 1 : 0,
      },
    };
  }, [userInfo, phoneNumber]);

  // 手机号脱敏处理
  const maskPhone = (phone: string) => {
    if (!phone) return "-";
    if (phone.length === 11) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    }
    return phone;
  };

  const tableData = [
    {
      name: "昵称/用户名",
      purpose: "用于完善网络身份标识",
      scene: "用户注册、登录",
      count: `用户提供，已收集${userData.username.count}条`,
      content: userData.username.value || "-",
      isAvatar: false,
    },
    {
      name: "头像",
      purpose: "用于展示头像信息",
      scene: "用户个人信息/聊天房/直播间等页面信息展示",
      count: `用户提供，已收集${userData.avatar.count}条`,
      content: userData.avatar.value,
      isAvatar: true,
    },
    {
      name: "手机号码",
      purpose: "用于注册创建账号和登录",
      scene: "用户注册、登录及实名认证",
      count: `用户提供，已收集${userData.phone.count}条`,
      content: maskPhone(userData.phone.value),
      isAvatar: false,
    },
    {
      name: "行为日志",
      purpose: "记录用户功能使用偏好",
      scene: "功能打点上报",
      count: "用户提供，已收集0条",
      content: "",
      isAvatar: false,
    },
    {
      name: "设备型号和名称",
      purpose: "用于兼容性判断和安全保障等功能",
      scene: "使用APP过程中",
      count: `用户提供，已收集${userData.device.count}条`,
      content: userData.device.value || "-",
      isAvatar: false,
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
                  <th>信息名称</th>
                  <th>使用目的</th>
                  <th>使用场景</th>
                  <th>收集情况</th>
                  <th>信息内容</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.purpose}</td>
                    <td>{row.scene}</td>
                    <td>{row.count}</td>
                    <td
                      className={row.isAvatar ? "avatar-cell" : "info-content"}
                    >
                      {row.isAvatar ? (
                        row.content ? (
                          <img
                            src={row.content}
                            alt="用户头像"
                            className="avatar-img"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="default-avatar">
                            {userData.username.value
                              ? userData.username.value.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                        )
                      ) : (
                        <span className={!row.content ? "empty-data" : ""}>
                          {row.content || "-"}
                        </span>
                      )}
                    </td>
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
