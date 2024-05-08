import axios from "axios";
import { rootStore } from "easemob-chat-uikit";

// username -> chat user id

export const getRtcToken = (params: {
  appKey: string;
  channelName: string | number;
  username: string;
}) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.context.accessToken;
  let { username, channelName, appKey } = params;
  return axios
    .get(
      `${
        rootStore.client.apiUrl
      }/token/rtcToken/v1?userAccount=${username}&channelName=${channelName}&appkey=${encodeURIComponent(
        appKey
      )}`
    )
    .then(function (response) {
      return response.data;
    });
};

export const getRtcChannelMembers = (params: {
  username: string;
  channelName: string;
  appKey: string;
}) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + rootStore.client.context.accessToken;
  let { username, channelName, appKey } = params;
  return axios
    .get(
      `${
        rootStore.client.apiUrl
      }/channel/mapper?userAccount=${username}&channelName=${channelName}&appkey=${encodeURIComponent(
        appKey
      )}`
    )
    .then(function (response) {
      let members = response.data.result;
      console.log(members);
      return members;
    })
    .catch(function (error) {
      console.log(error);
    });
};
