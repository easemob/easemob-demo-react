import { useEffect, useState, FC, useRef } from "react";
// import "./index.css";
import { observer } from "mobx-react-lite";
import toast, { Toaster } from "react-hot-toast";
import {
  Chat,
  GroupDetail,
  ContactList,
  ContactDetail,
  Header,
  rootStore,
  ConversationList,
  Provider,
  useClient,
  Icon,
  Avatar,
  MessageList,
  useConversationContext,
  useChatContext,
  UserSelect,
  TextMessage,
  GroupMember,
  Modal,
  Input,
  eventHandler,
  Tooltip,
  Button,
  Thread,
} from "easemob-chat-uikit";
import "easemob-chat-uikit/style.css";
import "./main.scss";
import NavigationBar from "../../components/navigationBar/navigationBar";
import ChatContainer from "../chatContainer/chatContainer";
import Contacts from "../contacts/contacts";
import Settings from "../settings/settings";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
// @ts-ignore
window.rootStore = rootStore;
const ChatApp: FC<any> = () => {
  const client = useClient();
  useEffect(() => {
    const webImAuth = sessionStorage.getItem("webImAuth");

    console.log("webImAuth", webImAuth);
    let webImAuthObj = {
      userId: "",
      password: "",
      chatToken: "",
    };
    if (webImAuth) {
      webImAuthObj = JSON.parse(webImAuth);
      if (webImAuthObj.password) {
        client.open({
          user: webImAuthObj.userId,
          pwd: webImAuthObj.password,
        });
      } else {
        console.log("webimAuthObj", webImAuthObj);
        client.open({
          user: webImAuthObj.userId,
          accessToken: webImAuthObj.chatToken,
        });
      }
    }
  }, [client]);
  const state = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/login");
    }
  }, [state.loggedIn]);

  useEffect(() => {
    eventHandler.addEventHandler("chatroom", {
      onError: (err) => {
        console.error(err);
      },
      recallMessage: {
        success: () => {
          toast.success(i18n.t("Recall message successfully"));
        },
        error: (error) => {
          toast.error(i18n.t("Recall message failed"));
        },
      },
      reportMessage: {
        success: () => {
          toast.success(i18n.t("Reported successfully"));
        },
        error: (error) => {
          toast.error(i18n.t("Report failed"));
        },
      },
      sendMessage: {
        error: (error) => {
          if (error.type == 507) {
            toast.error(i18n.t("You have been banned from sending messages"));
          } else if (
            error.type == 602 &&
            error.message == "not in group or chatroom"
          ) {
            toast.error(
              i18n.t(
                "Message sending failed, you are no longer in the current group"
              )
            );
          }
        },
      },
    });
  }, []);

  const navRef = useRef<any>(null);
  const chatContainerRef = useRef<any>(null);
  return (
    <div className="main-container">
      <NavigationBar
        ref={navRef}
        tabs={[
          {
            title: "消息",
            icon: <Icon type="BUBBLE_FILL" width={28} height={28}></Icon>,
            content: <ChatContainer ref={chatContainerRef} />,
            unmountOnExit: false, // 当有音视频通话时切换后能保持音视频窗口不消失
          },
          {
            title: "通讯录",
            icon: (
              <Icon type="PERSON_DOUBLE_FILL" width={28} height={28}></Icon>
            ),
            content: (
              <Contacts
                onMessageClick={() => {
                  console.log("发消息");
                  navRef.current?.changeTab(0);
                }}
                onAudioCall={() => {
                  navRef.current?.changeTab(0);
                  chatContainerRef.current?.startAudioCall();
                }}
                onVideoCall={() => {
                  navRef.current?.changeTab(0);
                  chatContainerRef.current?.startVideoCall();
                }}
              />
            ),
            unmountOnExit: true,
          },
          {
            title: "设置",
            icon: <Icon type="HAMBURGER" width={28} height={28}></Icon>,
            content: <Settings></Settings>,
            unmountOnExit: true,
          },
        ]}
      ></NavigationBar>
    </div>
  );
};

export default observer(ChatApp);
