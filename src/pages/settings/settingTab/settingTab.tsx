import React, { useState, useContext, useEffect } from "react";
import "./settingTab.scss";
import classNames from "classnames";
import i18next from "../../../i18n";
import {
  RootContext,
  Icon,
  Tooltip,
  Modal,
  Input,
  rootStore,
} from "easemob-chat-uikit";
import { use } from "i18next";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { on } from "events";
interface Tab {
  title: React.ReactNode;
  icon: React.ReactNode;
  key: string;
  content: React.ReactNode | string[];
  type: "button" | "menu";
  onClick?: (data?: any) => void;
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
  //找出type === 'menu'的tab, 如果有则保存对应的key, value保存选中的值,
  let menuTabsMap: Map<string, Tab & { open?: boolean; value?: string }> =
    new Map();

  tabGroups.forEach((group) => {
    group.tabs.forEach((tab) => {
      if (tab.type === "menu") {
        menuTabsMap.set(group.key, tab);
      }
    });
  });

  const [menuTab, setMenuTab] = useState(menuTabsMap);
  console.log("menuTabKeys", menuTabsMap);

  const [presenceModalOpen, setPresenceModalOpen] = useState(false);
  const [customPresenceExt, setCustomPresenceExt] = useState("");
  useEffect(() => {
    if (
      //@ts-ignore
      !context.presenceMap[
        rootStore.addressStore.appUsersInfo[rootStore.client.user]
          ?.presenceExt ?? ""
      ]
    ) {
      setCustomPresenceExt(
        rootStore.addressStore.appUsersInfo[rootStore.client.user]
          ?.presenceExt || ""
      );
    }

    const userInfo =
      rootStore.addressStore.appUsersInfo[rootStore.client.user] || {};
    setMenuTab((prev) => {
      let newMenuTab = new Map(prev);
      newMenuTab.set("presence", {
        ...(prev.get("presence") as Tab),
        value: userInfo.isOnline ? userInfo.presenceExt : "Offline",
      });
      return newMenuTab;
    });
  }, []);
  const setCustomPresence = () => {
    setPresenceModalOpen(false);
    setMenuTab((prev) => {
      let newMenuTab = new Map(prev);
      newMenuTab.set("presence", {
        ...(prev.get("presence") as Tab),
        value: customPresenceExt,
      });
      return newMenuTab;
    });
    // @ts-ignore
    rootStore.addressStore.publishPresence(customPresenceExt);
  };
  const handlePresenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPresenceExt(e.target.value);
  };
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
                  if (item.type === "menu") {
                    return (
                      <div
                        key={`${group.key}_${index}`}
                        className={classNames("setting-menu-item")}
                        onClick={() => {
                          // 设置 open 属性
                          setMenuTab((prev) => {
                            let newMenuTab = new Map(prev);
                            newMenuTab.set(item.key, {
                              ...(prev.get(item.key) as Tab),
                              open: !prev.get(item.key)?.open,
                            });
                            return newMenuTab;
                          });

                          item.onClick?.();
                        }}
                      >
                        <div className="setting-menu-item-icon">
                          {item.icon}
                        </div>
                        <div className="setting-menu-item-name">
                          {item.title}

                          <Tooltip
                            title={
                              <ul className="cui-header-more">
                                {(item.content as string[]).map((menuItem) => (
                                  <li
                                    className={
                                      themeMode == "dark" ? "cui-li-dark" : ""
                                    }
                                    style={{
                                      width: "212px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      boxSizing: "border-box",
                                    }}
                                    data-name={menuItem}
                                    onClick={() => {
                                      item.onClick?.();
                                      if (menuItem === "Custom") {
                                        setPresenceModalOpen(true);
                                        return;
                                      }
                                      setMenuTab((prev) => {
                                        let newMenuTab = new Map(prev);
                                        newMenuTab.set(item.key, {
                                          ...(prev.get(item.key) as Tab),
                                          value: menuItem as string,
                                        });
                                        return newMenuTab;
                                      });
                                      rootStore.addressStore.publishPresence(
                                        menuItem
                                      );
                                    }}
                                  >
                                    {i18next.t((menuItem || "") as string)}
                                    {(menuItem ===
                                      menuTab.get(item.key)?.value ||
                                      (!(item.content as string[])?.includes(
                                        menuTab.get(item.key)?.value ?? ""
                                      ) &&
                                        menuItem === "Custom")) && (
                                      <Icon
                                        type="CHECK"
                                        width={14}
                                        height={14}
                                      ></Icon>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            }
                            trigger="click"
                            placement="bottomLeft"
                            open={menuTab.get(item.key)?.open}
                            onOpenChange={(value: boolean) => {
                              if (value) return;
                              setMenuTab((prev) => {
                                let newMenuTab = new Map(prev);
                                newMenuTab.set(item.key, {
                                  ...(prev.get(item.key) as Tab),
                                  open: value,
                                });
                                return newMenuTab;
                              });
                            }}
                          >
                            <div className={`setting-menu-item-name-dropdown`}>
                              <div className="setting-menu-item-name-dropdown-value">
                                {i18next.t(menuTab.get(item.key)?.value ?? "")}
                              </div>
                              <Icon
                                style={{ cursor: "pointer" }}
                                type={
                                  menuTab.get(item.key)?.open
                                    ? "ARROW_UP"
                                    : "ARROW_DOWN"
                                }
                                color={
                                  themeMode == "dark" ? "#C8CDD0" : "#464E53"
                                }
                                width={24}
                                height={24}
                              ></Icon>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    );
                  }
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

      <Modal
        open={presenceModalOpen}
        onCancel={() => {
          setPresenceModalOpen(false);
        }}
        onOk={setCustomPresence}
        title={i18next.t("customPresenceTitle")}
        wrapClassName="modify-message-modal"
      >
        <Input
          className="add-contact-input"
          maxLength={20}
          value={customPresenceExt}
          onChange={handlePresenceChange}
        />
      </Modal>
    </div>
  );
};
export default SettingTab;
