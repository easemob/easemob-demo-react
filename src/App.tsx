import { useEffect, useState, FC } from "react";
import "./index.css";
import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { rootStore, Provider } from "easemob-chat-uikit";
import "easemob-chat-uikit/style.css";
import "./App.css";
import AppRoutes from "./routes/routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import listener from "./UIKit/uikitListener";
import { useSelector } from "react-redux";
import i18next from "./i18n";
import { useAppSelector, useAppDispatch } from "./hooks";
import { updateAppConfig } from "./store/appConfigSlice";
// @ts-ignore
window.rootStore = rootStore;

const ChatApp: FC<any> = () => {
  const state = useAppSelector((state) => state.appConfig);
  const loginState = useAppSelector((state) => state.login);

  useEffect(() => {
    listener(store);
  }, [loginState.appKey, loginState.useDNS]);

  const [config, setConfig] = useState({
    conversationList: {
      search: true,
      item: {
        moreAction: true,
        deleteConversation: true,
        presence: false,
      },
    },
    chat: {
      header: {
        threadList: state.thread,
        audioCall: true,
        videoCall: true,
      },
      message: {
        status: true,
        reaction: state.reaction,
        thread: state.thread,
        recall: false,
        translate: state.translation,
        edit: true,
        delete: true,
        report: true,
      },
      messageInput: {
        typing: state.typing,
      },
    },
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    const localGeneralConfig = localStorage.getItem("generalConfig");
    if (localGeneralConfig) {
      const config = JSON.parse(localGeneralConfig);
      dispatch(updateAppConfig(config));
      i18next.changeLanguage(config.language);
    }
  }, []);

  useEffect(() => {
    setConfig({
      conversationList: {
        search: true,
        item: {
          moreAction: true,
          deleteConversation: true,
          presence: false,
        },
      },

      chat: {
        header: {
          threadList: state.thread,
          audioCall: true,
          videoCall: true,
        },
        message: {
          status: true,
          reaction: state.reaction,
          thread: state.thread,
          recall: true,
          translate: state.translation,
          edit: true,
          delete: true,
          report: true,
        },
        messageInput: {
          typing: state.typing,
        },
      },
    });
  }, [state]);

  const serverConfig = JSON.parse(localStorage.getItem("serverConfig") || "{}");
  console.log("app", loginState.useDNS, serverConfig);
  return (
    <Provider
      initConfig={{
        appKey: loginState.appKey,
        isHttpDNS: loginState.useDNS,
        restUrl: serverConfig.rest,
        msyncUrl: serverConfig.msync,
        useUserInfo: true,
        translationTargetLanguage: window.navigator.language,
      }}
      features={config}
      theme={{
        primaryColor: state.color.h,
        mode: state.dark ? "dark" : "light",
        bubbleShape: state.theme == "classic" ? "square" : "ground",
        avatarShape: state.theme == "classic" ? "square" : "circle",
        componentsShape: state.theme == "classic" ? "square" : "ground",
      }}
      local={{
        lng: state.language || "zh",
      }}
    >
      <AppRoutes></AppRoutes>
      <Toaster></Toaster>
    </Provider>
  );
};

export default observer(ChatApp);
