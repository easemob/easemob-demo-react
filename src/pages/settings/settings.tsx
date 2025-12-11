import "./settings.scss";
import SettingTab from "./settingTab/settingTab";
import { Icon, Modal, useClient } from "easemob-chat-uikit";
import PersonalInfo from "./personalInfo/personalInfo";
import Notification from "./notification/notification";
import About from "./about/about";
import General from "./general/general";
import Blocklist from "./blocklist/blocklist";
import i18next from "../../i18n";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { logout } from "../../store/loginSlice";
import { PRESENCE_CONFIG } from "../../config";
import { deleteAccount } from "../../service/login";
const Settings = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const phoneNumber = useAppSelector((state) => state.login.phoneNumber);
  const token = useAppSelector((state) => state.login.chatToken);
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAccount = () => {
    console.log("handleDeleteAccount", token, phoneNumber);
    deleteAccount(token, phoneNumber)
      .then((res) => {
        console.log("Account deleted successfully:", res);
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
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
                key: "personal",
                content: <PersonalInfo key="personal" />,
                type: "button",
              },
              {
                //@ts-ignore
                icon: <Icon type="CIRCLE_N_DOT" width={24} height={24}></Icon>,
                title: i18next.t("status"),
                key: "presence",
                content: PRESENCE_CONFIG,
                type: "menu",
              },
              {
                icon: <Icon type="GEAR" width={24} height={24}></Icon>,
                title: i18next.t("general"),
                key: "general",
                content: <General />,
                type: "button",
              },
              {
                icon: <Icon type="BELL" width={24} height={24}></Icon>,
                title: i18next.t("pushNotifications"),
                key: "notification",
                content: <Notification />,
                type: "button",
              },
              {
                //@ts-ignore
                icon: <Icon type="LOCK" width={24} height={24}></Icon>,
                title: i18next.t("privacy"),
                key: "privacy",
                content: <Blocklist />,
                type: "button",
              },
              {
                // @ts-ignore
                icon: <Icon type="DOC_LOCK" width={24} height={24}></Icon>,
                title: i18next.t("privacyPolicyLink"),
                key: "presence",
                content: "11",
                type: "link",
                onClick: () => {
                  window.open(
                    "https://www.easemob.com/console/privacy",
                    "_blank"
                  );
                },
              },
              {
                // @ts-ignore
                icon: <Icon type="THREE_CHART" width={24} height={24}></Icon>,
                title: i18next.t("thirdPartyInfoSharing"),
                key: "presence",
                content: "11",
                type: "link",
                onClick: () => {
                  window.open(
                    "https://www.easemob.com/demo/third-party-sharing",
                    "_blank"
                  );
                },
              },
              {
                icon: (
                  <Icon
                    type={"PERSON_3LINES_FILL" as any}
                    width={24}
                    height={24}
                  ></Icon>
                ),
                title: i18next.t("personalInformationCollected"),
                key: "presence",
                content: "11",
                type: "link",
                onClick: () => {
                  window.open(
                    "https://www.easemob.com/demo/personal-info-collection",
                    "_blank"
                  );
                },
              },
              {
                icon: <Icon type="DOC" width={24} height={24}></Icon>,
                title: i18next.t("about"),
                key: "about",
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
                key: "login",
                content: "",
                type: "button",
                onClick: () => {
                  setLogoutModalOpen(true);
                },
              },
              {
                icon: (
                  <Icon
                    type={"BAR_SQUARE_FILL" as any}
                    width={24}
                    height={24}
                  ></Icon>
                ),
                title: i18next.t("accountDeletion"),
                key: "deleteAccount",
                content: "",
                type: "button",
                onClick: () => {
                  setDeleteAccountModalOpen(true);
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
        okText={i18next.t("Confirm")}
        cancelText={i18next.t("Cancel")}
      >
        <div>{i18next.t("Log out and return to the login page")}</div>
      </Modal>

      <Modal
        open={deleteAccountModalOpen}
        onCancel={() => {
          setDeleteAccountModalOpen(false);
        }}
        onOk={handleDeleteAccount}
        title={i18next.t("accountDeletion")}
        wrapClassName="modify-message-modal"
        okText={i18next.t("Confirm")}
        cancelText={i18next.t("Cancel")}
      >
        <div>{i18next.t("deleteAccountConfirm")}</div>
      </Modal>
    </div>
  );
};

export default Settings;
