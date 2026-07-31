import axios from "axios";
import { rootStore } from "easemob-chat-uikit";
import { serverConfig } from "../utils";
import toast from "../components/toast/toast";

/**
 * 头像两步更新：
 * 1. 上传图片文件到业务私有 App Server（appserver.easesdk.com）拿到 URL
 * 2. 用 SDK 5 userInfoManager.updateOwnInfo 把 URL 写回 IM 用户资料
 */
export const uploadImage = async (formData: FormData): Promise<string> => {
  const client = rootStore.client;
  const userId = client.getCurrentUserId();
  if (!userId || !client.authToken) {
    throw new Error("未登录，无法上传头像");
  }

  axios.defaults.headers.common["Authorization"] = "Bearer " + client.authToken;

  try {
    const response = await axios.post(
      `https://appserver.easesdk.com/inside/app/user/${userId}/avatar/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const avatarUrl = response.data?.avatarUrl as string | undefined;
    if (!avatarUrl) {
      throw new Error("上传头像失败：未返回 avatarUrl");
    }

    await client.userInfoManager.updateOwnInfo({ avatarUrl });
    return avatarUrl;
  } catch (error) {
    console.error("uploadImage fail", error);
    if (serverConfig.useAppkey) {
      toast.error("如果要体验头像功能，请实现app server。");
    }
    throw error;
  }
};

async function sendRequest(groupId: string) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.authToken;
  return await axios
    .get(`https://appserver.easesdk.com/inside/app/group/${groupId}/avatarurl`)
    .then((response) => {
      return response.data.avatarUrl;
    })
    .catch(() => {
      return "";
    });
}

export const getGroupAvatar = async (groupIds: string[]) => {
  let result: { [key: string]: string } = {};
  for (let groupId of groupIds) {
    result[groupId] = await sendRequest(groupId);
  }
  return result;
};
