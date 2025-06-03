import axios from "axios";
import { rootStore } from "easemob-chat-uikit";
import { serverConfig } from "../utils";
import toast from "../components/toast/toast";

export const getUserIdWithPhoneNumber = (
  phoneNumber: string,
  userId: string
) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.context.accessToken;
  return axios
    .get(
      "https://a1-appserver.easemob.com" +
        `/inside/app/user/${phoneNumber}?operator=${userId}`
    )
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (serverConfig.useAppkey) {
        toast.error("如果要体验通话手机号查找用户功能，请实现app server。");
      }
      throw error;
    });
};
