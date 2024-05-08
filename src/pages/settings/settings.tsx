import "./settings.scss";
import SettingTab from "./settingTab/settingTab";
import { Icon, Modal } from "easemob-chat-uikit";
import PersonalInfo from "./personalInfo/personalInfo";
import Notification from "./notification/notification";
import About from "./about/about";
import General from "./general/general";
import i18next from "../../i18n";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { logout } from "../../store/loginSlice";
const Settings = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <SettingTab
        tabGroups={[
          {
            title: i18next.t("settings"),
            key: "setting",
            tabs: [
              {
                icon: (
                  <Icon type="PERSON_SINGLE_FILL" width={24} height={24}></Icon>
                ),
                title: i18next.t("profileInfo"),
                key: "basic",
                content: <PersonalInfo key="personal" />,
                type: "button",
              },
              {
                icon: <Icon type="GEAR" width={24} height={24}></Icon>,
                title: i18next.t("general"),
                key: "basic",
                content: <General />,
                type: "button",
              },
              {
                icon: <Icon type="BELL" width={24} height={24}></Icon>,
                title: i18next.t("pushNotifications"),
                key: "basic",
                content: <Notification />,
                type: "button",
              },
              {
                icon: <Icon type="DOC" width={24} height={24}></Icon>,
                title: i18next.t("about"),
                key: "basic",
                content: <About />,
                type: "button",
              },
            ],
          },
          {
            title: i18next.t("account"),
            key: "login",
            tabs: [
              {
                icon: (
                  <Icon
                    type="ARROW_RIGHT_SQUARE_FILL"
                    width={24}
                    height={24}
                  ></Icon>
                ),
                title: i18next.t("logout"),
                key: "basic",
                content: "",
                type: "button",
                onClick: () => {
                  setLogoutModalOpen(true);
                },
              },
            ],
          },
        ]}
      ></SettingTab>
      <Modal
        open={logoutModalOpen}
        onCancel={() => {
          setLogoutModalOpen(false);
        }}
        onOk={handleLogout}
        title={i18next.t("logout")}
        wrapClassName="modify-message-modal"
      >
        <div>{i18next.t("Log out and return to the login page")}</div>
      </Modal>
    </div>
  );
};

export default Settings;
