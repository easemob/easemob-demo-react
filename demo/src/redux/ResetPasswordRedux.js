// @flow
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { message } from "antd";
import axios from "axios";
/* ------------- Types and Action Creators ------------- */
const domain = WebIM.config.restServer
const { Types, Creators } = createActions({
  setImageVerifyUrl: ["url", "imageId"],
  // ------------- async -----------------  
  // 获取图片验证码
  getImageVerification: () => {
    return (dispatch, getState) => {
      axios
        .get(domain + "/inside/app/image")
        .then(function (response) {
          // 处理成功情况
          const url =
            domain + "/inside/app/image/" + response.data.data.image_id;
          dispatch(
            Creators.setImageVerifyUrl(url, response.data.data.image_id)
          );
        })
        .catch(() => {
          message.error("获取图片验证码失败，请刷新重试！");
        });
    };
  }
});

export const ResetpasswordTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  imageVerifyUrl: "",
  imageId: "",
  isSuccess: false
});

export const resetpassword = (state = INITIAL_STATE) => {
  return state;
};

export const setImageVerifyUrl = (state = INITIAL_STATE, { url, imageId }) => {
  return Immutable.merge(state, { imageVerifyUrl: url, imageId });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IMAGE_VERIFY_URL]: setImageVerifyUrl
});

/* ------------- Selectors ------------- */
