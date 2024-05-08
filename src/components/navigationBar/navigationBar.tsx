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
} from "easemob-chat-uikit";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useAppSelector } from "../../hooks";
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
  const { theme } = context;
  const themeMode = theme?.mode;
  const state = useAppSelector((state) => state.appConfig);
  return (
    <div
      className={classNames("navigation-container", {
        "navigation-container-dark": themeMode === "dark",
        "navigation-container-ground": state.theme === "voyage",
      })}
    >
      <div className="tab-header">
        <div className="tab-header-avatar">
          <Avatar
            shape={state.theme == "voyage" ? "circle" : "square"}
            size={40}
            src={avatarUrl}
          >
            {rootStore.addressStore.appUsersInfo[rootStore.client.user]
              ?.nickname || rootStore.client.user}
          </Avatar>
        </div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? "active" : ""} ${
              index === tabs.length - 1 ? "last" : ""
            }`}
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
    </div>
  );
});

export default observer(NavigationBar);
