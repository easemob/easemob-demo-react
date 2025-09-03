import axios from "axios";
const isSandBox = false;
const domain =
  (window.location.protocol === "https:" ? "https:" : "http:") +
  (isSandBox ? "//a1-hsb.easemob.com" : "//appserver.easesdk.com");

export const sendSms = (param: {
  phoneNumber: string;
  // sceneId: string;
  captchaVerifyParam: string;
}) => {
  // return axios.post(domain + `/inside/app/sms/send/${phoneNumber}`, {
  //   phoneNumber,
  // });
  return axios.post(domain + "/inside/app/sms/send/v2", param);
};

export const getChatToken = (phoneNumber: string, VCode: string) => {
  return axios.post(domain + "/inside/app/user/login/V2", {
    phoneNumber: phoneNumber,
    smsCode: VCode,
  });
};
