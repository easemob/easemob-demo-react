import { useEffect, useState, FC, useRef } from "react";
// import "./index.css";
import { observer } from "mobx-react-lite";
import toast, { Toaster } from "react-hot-toast";
import {
  Chat,
  GroupDetail,
  ContactList,
  ContactDetail,
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
// import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { getToken } from "../../service/login";
import Header from "../../components/header/header";
// @ts-ignore
window.rootStore = rootStore;
const ChatApp: FC<any> = () => {
  const client = useClient();
  useEffect(() => {
    // 登录
    getToken().then((res) => {
      client
        .open({
          user: res.data.chatUserName,
          accessToken: res.data.token,
        })
        .catch((err: any) => {
          console.log("登录失败", err);
        });
    });

    const webImAuth = sessionStorage.getItem("webImAuth");

    let webImAuthObj = {
      userId: "",
      password: "",
      chatToken: "",
    };
    if (webImAuth && !client.token) {
      webImAuthObj = JSON.parse(webImAuth);
      if (webImAuthObj.password) {
        client
          .open({
            user: webImAuthObj.userId,
            pwd: webImAuthObj.password,
          })
          .catch((err: any) => {
            console.log("登录失败2", err);
          });
      } else {
        client
          .open({
            user: webImAuthObj.userId,
            accessToken: webImAuthObj.chatToken,
          })
          .catch((err: any) => {
            console.log("登录失败3", err);
          });
      }
    }
  }, [client]);
  const state = useAppSelector((state) => state.login);
  // const navigate = useNavigate();
  useEffect(() => {
    //
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
          toast.success(i18n.t("Report successfully"));
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
      <Header></Header>
      <NavigationBar
        ref={navRef}
        tabs={[
          {
            title: "消息",
            icon: <Icon type="BUBBLE_FILL" width={28} height={28}></Icon>,
            content: <ChatContainer ref={chatContainerRef} />,
            unmountOnExit: true, // 当有音视频通话时切换后能保持音视频窗口不消失
          },
          {
            title: "联系人",
            icon: (
              <Icon type="PERSON_DOUBLE_FILL" width={28} height={28}></Icon>
            ),
            content: (
              <Contacts
                onMessageClick={() => {
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
          // {
          //   title: "Settings",
          //   icon: <Icon type="HAMBURGER" width={28} height={28}></Icon>,
          //   content: <Settings></Settings>,
          //   unmountOnExit: true,
          // },
        ]}
      ></NavigationBar>
    </div>
  );
};

export default observer(ChatApp);
