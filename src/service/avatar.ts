import axios from "axios";
import { rootStore } from "easemob-chat-uikit";
import defaultAvatar from "../assets/2members_group.png";
export const uploadImage = (formData: FormData) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.context.accessToken;
  return axios
    .post(
      `https://a1-appserver.easemob.com/inside/app/user/${rootStore.client.user}/avatar/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      return rootStore.client
        .updateOwnUserInfo("avatarurl", response.data.avatarUrl)
        .then((res: any) => {
          return response.data.avatarUrl;
        });
    })
    .catch((error) => {
      console.error("uploadImage fail", error);
    });
};

async function sendRequest(groupId: string) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.context.accessToken;
  return await axios
    .get(
      `https://a1-appserver.easemob.com/inside/app/group/${groupId}/avatarurl`
    )
    .then((response) => {
      return response.data.avatarUrl;
    })
    .catch(() => {
      return "";
    });
}

async function getGroupDetail(groupId: string) {
  let avatarUrl = "";
  try {
    const data = await rootStore.client.getGroupInfo({ groupId });
    avatarUrl = data.data[0].avatar;
  } catch (e) {
    console.error("getGroupDetail fail", e);
  }
  if (!avatarUrl) {
    avatarUrl = defaultAvatar;
  }
  return avatarUrl;
}

export const getGroupAvatar = async (groupIds: string[]) => {
  let result: { [key: string]: string } = {};
  for (let groupId of groupIds) {
    result[groupId] = await getGroupDetail(groupId);
  }
  return result;
};
