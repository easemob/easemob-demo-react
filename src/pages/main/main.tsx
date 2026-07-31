import { useEffect, useState, FC, useRef } from "react";
// import "./index.css";
import { observer } from "mobx-react-lite";
import toast, { Toaster } from "react-hot-toast";
import { rootStore, Icon, eventHandler } from "easemob-chat-uikit";
import "easemob-chat-uikit/style.css";
import "./main.scss";
import NavigationBar from "../../components/navigationBar/navigationBar";
import ChatContainer from "../chatContainer/chatContainer";
import Contacts from "../contacts/contacts";
import Settings from "../settings/settings";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import {
  setLoggedIn,
  setChatToken,
  setPhoneNumber,
} from "../../store/loginSlice";
// @ts-ignore
window.rootStore = rootStore;
const ChatApp: FC<any> = () => {
  const client = rootStore.client;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  // 刷新 /main 时 Redux loggedIn 会重置为 false，但 session 可能仍有效。
  // 恢复完成前不要根据 loggedIn 踢回登录页。
  const [isRestoringSession, setIsRestoringSession] = useState(
    () => !!sessionStorage.getItem("webImAuth")
  );

  useEffect(() => {
    const webImAuth = sessionStorage.getItem("webImAuth");
    if (!webImAuth) {
      setIsRestoringSession(false);
      return;
    }

    let webImAuthObj = {
      userId: "",
      chatToken: "",
      phoneNumber: "",
    };

    try {
      webImAuthObj = JSON.parse(webImAuth);
    } catch {
      sessionStorage.removeItem("webImAuth");
      setIsRestoringSession(false);
      return;
    }

    if (client.authToken || state.loggedIn) {
      setIsRestoringSession(false);
      return;
    }

    if (!webImAuthObj.chatToken || !webImAuthObj.userId) {
      sessionStorage.removeItem("webImAuth");
      setIsRestoringSession(false);
      return;
    }

    let cancelled = false;
    client
      .login({
        userId: webImAuthObj.userId,
        token: webImAuthObj.chatToken,
      })
      .then(() => {
        if (cancelled) return;
        dispatch(setLoggedIn(true));
        dispatch(setChatToken(webImAuthObj.chatToken));
        dispatch(setPhoneNumber(webImAuthObj.phoneNumber));
      })
      .catch(() => {
        if (cancelled) return;
        console.log("login with token error");
        sessionStorage.removeItem("webImAuth");
      })
      .finally(() => {
        if (!cancelled) {
          setIsRestoringSession(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [client, dispatch, state.loggedIn]);

  useEffect(() => {
    if (!isRestoringSession && !state.loggedIn) {
      navigate("/login");
    }
  }, [isRestoringSession, navigate, state.loggedIn]);

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
    return () => {
      eventHandler.removeEventHandler("chatroom");
    };
  }, []);

  const navRef = useRef<any>(null);
  const chatContainerRef = useRef<any>(null);
  return (
    <div className="main-container">
      <NavigationBar
        ref={navRef}
        tabs={[
          {
            title: "Message",
            icon: <Icon type="BUBBLE_FILL" width={28} height={28}></Icon>,
            content: <ChatContainer ref={chatContainerRef} />,
            unmountOnExit: false, // 当有音视频通话时切换后能保持音视频窗口不消失
          },
          {
            title: "Contacts",
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
                  setTimeout(() => {
                    chatContainerRef.current?.startAudioCall();
                  }, 300);
                }}
                onVideoCall={() => {
                  navRef.current?.changeTab(0);
                  setTimeout(() => {
                    chatContainerRef.current?.startVideoCall();
                  }, 300);
                }}
              />
            ),
            unmountOnExit: true,
          },
          {
            title: "Settings",
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
