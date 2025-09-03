import { useEffect, useState, FC } from "react";
import "./index.css";
import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { rootStore, UIKitProvider, useSDK } from "easemob-chat-uikit";
import "easemob-chat-uikit/style.css";
import "./App.css";
import AppRoutes from "./routes/routes";
import { store } from "./store/store";
import listener from "./UIKit/uikitListener";
import i18next from "./i18n";
import { useAppSelector, useAppDispatch } from "./hooks";
import { updateAppConfig } from "./store/appConfigSlice";
// @ts-ignore
window.rootStore = rootStore;

const ChatApp: FC<any> = () => {
  // close Chat and RTC log
  const { AgoraRTC, ChatSDK } = useSDK();
  // ChatSDK.logger.disableAll();
  AgoraRTC.setLogLevel(4);

  const state = useAppSelector((state) => state.appConfig);
  const loginState = useAppSelector((state) => state.login);

  useEffect(() => {
    listener(store);
  }, [loginState.appKey, loginState.useDNS]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const localGeneralConfig = localStorage.getItem("generalConfig");
    if (localGeneralConfig) {
      const config = JSON.parse(localGeneralConfig);
      dispatch(updateAppConfig(config));
      i18next.changeLanguage(config.language);
    }
  }, []);

  const serverConfig = JSON.parse(localStorage.getItem("serverConfig") || "{}");
  return (
    <UIKitProvider
      initConfig={{
        appKey: loginState.appKey,
        isHttpDNS: loginState.useDNS,
        restUrl: serverConfig.rest,
        msyncUrl: serverConfig.msync,
        useUserInfo: true,
        translationTargetLanguage: state.translationTargetLanguage,
      }}
      features={{
        conversationList: {
          search: true,
          item: {
            moreAction: true,
            deleteConversation: true,
            presence: true,
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
            pin: true,
          },
          messageInput: {
            typing: state.typing,
          },
        },
      }}
      theme={{
        primaryColor: state.color.h,
        mode: state.dark ? "dark" : "light",
        avatarShape: state.theme === "classic" ? "square" : "circle",
        bubbleShape: state.theme === "classic" ? "square" : "round",
        componentsShape: state.theme === "classic" ? "square" : "round",
        ripple: false,
      }}
      local={{
        lng: state.language || "zh",
      }}
    >
      <AppRoutes></AppRoutes>
      <Toaster></Toaster>
    </UIKitProvider>
  );
};

export default observer(ChatApp);
