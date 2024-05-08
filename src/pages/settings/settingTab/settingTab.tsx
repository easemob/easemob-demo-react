import React, { useState, useContext } from "react";
import "./settingTab.scss";
import classNames from "classnames";
import i18next from "../../../i18n";
import { RootContext } from "easemob-chat-uikit";
import { use } from "i18next";
import { useAppSelector, useAppDispatch } from "../../../hooks";
interface Tab {
  title: React.ReactNode;
  icon: React.ReactNode;
  key: string;
  content: React.ReactNode;
  type: "button" | "menu";
  onClick?: () => void;
}

interface SettingMenuProps {
  tabGroups: {
    title: string;
    key: string;
    tabs: Tab[];
  }[];
}

const getKeyIndex = (activeKey: string) => {
  const [key, index] = activeKey.split("_");
  return { key, index };
};
const SettingTab = (props: SettingMenuProps) => {
  const { tabGroups } = props;
  const [activeKey, setActiveKey] = useState(tabGroups[0].key + "_0");
  const { key, index } = getKeyIndex(activeKey);

  const context = useContext(RootContext);
  const { theme } = context;
  console.log("theme >>>", context);
  const themeMode = theme?.mode;
  const state = useAppSelector((state) => state.appConfig);
  return (
    <div
      className={classNames("setting-tab", {
        "setting-tab-dark": themeMode === "dark",
      })}
    >
      <div className="setting-tab-menu">
        <div className="setting-tab-menu-header">{i18next.t("me")}</div>

        {tabGroups.map((group, index) => {
          return (
            <div key={index} className="setting-tab-group">
              <div className="setting-tab-group-title">{group.title}</div>
              <div className="setting-tab-group-content">
                {group.tabs.map((item, index) => {
                  return (
                    <div
                      key={`${group.key}_${index}`}
                      className={classNames("setting-menu-item", {
                        active: `${group.key}_${index}` === activeKey,
                      })}
                      onClick={() => {
                        setActiveKey(`${group.key}_${index}`);
                        item.onClick?.();
                      }}
                    >
                      <div className="setting-menu-item-icon">{item.icon}</div>
                      <div className="setting-menu-item-name">{item.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="setting-tab-content">
        {
          // 根据key index 获取对应的content
          tabGroups.map((group, index) => {
            if (group.key === getKeyIndex(activeKey).key) {
              return group.tabs[Number(getKeyIndex(activeKey).index)].content;
            } else {
              return null;
            }
          })
        }
      </div>
    </div>
  );
};
export default SettingTab;
