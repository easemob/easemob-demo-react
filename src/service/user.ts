import axios from "axios";
import { serverConfig } from "../utils";
import toast from "../components/toast/toast";

export const getUserIdWithPhoneNumber = (
  phoneNumber: string,
  userId: string,
  token: string
) => {
  return axios
    .get(
      "https://appserver.easesdk.com" +
        `/inside/app/user/${phoneNumber}?operator=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
