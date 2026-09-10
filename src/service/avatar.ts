import axios from "axios";
import type { ChatClient, UserInfoManager } from "easemob-websdk";
import { serverConfig } from "../utils";
import toast from "../components/toast/toast";

type UIKitClient = Pick<ChatClient, "getCurrentUserId" | "getRestContext"> & {
  userInfoManager: Pick<UserInfoManager, "updateOwnInfo">;
};

/**
 * 头像两步更新：
 * 1. 上传图片文件到业务私有 App Server（appserver.easesdk.com）拿到 URL
 * 2. 用 SDK 5 userInfoManager.updateOwnInfo 把 URL 写回 IM 用户资料
 */
export const uploadImage = async (
  client: UIKitClient,
  formData: FormData
): Promise<string> => {
  const userId = client.getCurrentUserId();
  if (!userId) {
    throw new Error("未登录，无法上传头像");
  }

  const { token } = client.getRestContext();

  try {
    const response = await axios.post(
      `https://appserver.easesdk.com/inside/app/user/${userId}/avatar/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

async function sendRequest(client: Pick<ChatClient, "getRestContext">, groupId: string) {
  const { token } = client.getRestContext();
  return await axios
    .get(`https://appserver.easesdk.com/inside/app/group/${groupId}/avatarurl`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.avatarUrl;
    })
    .catch(() => {
      return "";
    });
}

export const getGroupAvatar = async (
  client: Pick<ChatClient, "getRestContext">,
  groupIds: string[]
) => {
  const result: Record<string, string> = {};
  for (const groupId of groupIds) {
    result[groupId] = await sendRequest(client, groupId);
  }
  return result;
};
