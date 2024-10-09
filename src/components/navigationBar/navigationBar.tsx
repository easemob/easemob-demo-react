import React, {
  useState,
  ReactNode,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import "./navigationBar.scss";
import {
  Tooltip,
  Avatar,
  Icon,
  rootStore,
  RootContext,
  Modal,
  Input,
} from "easemob-chat-uikit";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useAppSelector } from "../../hooks";
import i18next from "i18next";
import { PRESENCE_CONFIG } from "../../config";
interface NavigationBarProps {
  tabs: {
    title: string;
    icon: ReactNode;
    content: React.ReactNode;
    unmountOnExit?: boolean; // 切换后是否卸载
  }[];
}

const NavigationBar = forwardRef(({ tabs }: NavigationBarProps, ref) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  useImperativeHandle(ref, () => ({
    changeTab: (index: number) => {
      setActiveTab(index);
    },
  }));
  const avatarUrl =
    rootStore.addressStore.appUsersInfo[rootStore.client.user]?.avatarurl;

  const context = useContext(RootContext);
  const { theme, presenceMap } = context;
  const themeMode = theme?.mode;
  const state = useAppSelector((state) => state.appConfig);

  const myInfo =
    rootStore.addressStore.appUsersInfo[rootStore.client.user] || {};

  const presence = myInfo.isOnline
    ? presenceMap?.[myInfo.presenceExt || "Online"] || presenceMap?.["Custom"]
    : presenceMap?.["Offline"];
  const [presenceModalOpen, setPresenceModalOpen] = useState(false);
  const [currentPresence, setCurrentPresence] = useState("");
  const [customPresenceExt, setCustomPresenceExt] = useState("");
  const userInfo =
    rootStore.addressStore.appUsersInfo[rootStore.client.user] || {};
  useEffect(() => {
    setCustomPresenceExt(() => {
      return PRESENCE_CONFIG.includes(userInfo.presenceExt || "")
        ? ""
        : userInfo.presenceExt ?? "";
    });
    setCurrentPresence(() => {
      return userInfo.isOnline
        ? (userInfo.presenceExt &&
          PRESENCE_CONFIG.includes(userInfo.presenceExt || "")
            ? userInfo.presenceExt
            : "Custom") ?? "Online"
        : "Offline";
    });
  }, [userInfo.isOnline, userInfo.presenceExt]);
  return (
    <div
      className={classNames("navigation-container", {
        "navigation-container-dark": themeMode === "dark",
        "navigation-container-ground": state.theme === "voyage",
      })}
    >
      <div className="tab-header">
        <div className="tab-header-avatar">
          <Tooltip
            title={
              <ul className="cui-header-more">
                {PRESENCE_CONFIG.map((menuItem) => (
                  <li
                    className={themeMode == "dark" ? "cui-li-dark" : ""}
                    style={{
                      width: "212px",
                      display: "flex",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                    }}
                    data-name={menuItem}
                    onClick={() => {
                      setCurrentPresence(menuItem);
                      if (menuItem === "Custom") {
                        setPresenceModalOpen(true);
                        return;
                      }
                      rootStore.addressStore.publishPresence(menuItem);
                    }}
                  >
                    {i18next.t((menuItem || "") as string)}
                    {menuItem === currentPresence && (
                      <Icon type="CHECK" width={14} height={14}></Icon>
                    )}
                  </li>
                ))}
              </ul>
            }
            trigger="click"
            placement="rightTop"
          >
            <Avatar
              style={{ cursor: "pointer" }}
              shape={state.theme == "voyage" ? "circle" : "square"}
              size={40}
              src={avatarUrl}
              presence={{ visible: true, icon: presence }}
            >
              {rootStore.addressStore.appUsersInfo[rootStore.client.user]
                ?.nickname || rootStore.client.user}
            </Avatar>
          </Tooltip>
        </div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
            title={tab.title}
          >
            {/* <Tooltip
              key={index}
              trigger={"hover"}
              placement="right"
              title={
                <div style={{ height: "32px", lineHeight: "32px" }}>
                  {tab.title}
                </div>
              }
              //   arrow={true}
            > */}
            {tab.icon || tab.title}
            {/* </Tooltip> */}
          </div>
        ))}
      </div>

      {
        //unmountOnExit
        tabs.map((tab, index) => {
          if (tab.unmountOnExit == true && index !== activeTab) {
            return null;
          }
          return (
            <div
              className={`tab-content ${
                !tab.unmountOnExit && index !== activeTab ? "tab-hide" : ""
              }`}
            >
              {tabs[index].content}
            </div>
          );
        })
      }

      <Modal
        open={presenceModalOpen}
        onCancel={() => {
          setPresenceModalOpen(false);
        }}
        onOk={() => {
          setPresenceModalOpen(false);
          // @ts-ignore
          rootStore.addressStore.publishPresence(customPresenceExt);
        }}
        title={i18next.t("customPresenceTitle")}
        wrapClassName="modify-message-modal"
      >
        <Input
          className="add-contact-input"
          maxLength={20}
          value={customPresenceExt}
          onChange={(e) => {
            setCustomPresenceExt(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
});

export default observer(NavigationBar);
