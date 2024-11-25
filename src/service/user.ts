import axios from "axios";
import { rootStore } from "easemob-chat-uikit";

export const getUserIdWithPhoneNumber = (
  phoneNumber: string,
  userId: string
) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.context.accessToken;
  return axios.get(
    "https://a1-appserver.easemob.com" +
      `/inside/app/user/${phoneNumber}?operator=${userId}`
  );
};
