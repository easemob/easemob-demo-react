import { rootStore, eventHandler } from "easemob-chat-uikit";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../store/loginSlice";
import { store } from "../store/store";
import { notification } from "../utils/notification";
import toast from "react-hot-toast";
import i18next from "../i18n";
const listener = (store: any) => {
  const { client } = rootStore;
  const dispatch = store.dispatch;

  client.addEventHandler("chatdemo", {
    onConnected: () => {
      console.log("登录成功");
      dispatch(setLoggedIn(true));
    },
    onDisconnected: () => {
      console.log("退出登录");
      dispatch(setLoggedIn(false));
    },
    onTextMessage: (message: any) => {
      notification("新消息", message, store);
    },
    onImageMessage: (message: any) => {
      notification("新消息", message, store);
    },
    onFileMessage: (message: any) => {
      notification("新消息", message, store);
    },
    onAudioMessage: (message: any) => {
      notification("新消息", message, store);
    },
    onVideoMessage: (message: any) => {
      notification("新消息", message, store);
    },
    onCustomMessage: (message: any) => {
      notification("新消息", message, store);
    },
  });

  eventHandler.addEventHandler("uikit", {
    onError: (error) => {
      console.error(error);
    },
    addReaction: {
      error: (error) => {
        console.log("addReaction error", error);
        if (error.type == 50) {
          toast.error(`Reaction ${i18next.t("Exceeded maximum number")}`);
        }
      },
    },
    addContact: {
      success: () => {
        toast.success(i18next.t("Friend request sent"));
      },
      error: (error) => {
        if (
          error.type == 204 &&
          error.message == "Service resource not found"
        ) {
          toast.error(i18next.t("User does not exist"));
        } else {
          toast.error(i18next.t("Request failed"));
        }
      },
    },
  });
};

export { rootStore };

export default listener;
