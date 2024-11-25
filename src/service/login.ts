import axios from "axios";
const isSandBox = false;
const domain =
  (window.location.protocol === "https:" ? "https:" : "http:") +
  (isSandBox ? "//a1-hsb.easemob.com" : "//a1-appserver.easemob.com");

export const sendSms = (phoneNumber: string) => {
  return axios.post(domain + `/inside/app/sms/send/${phoneNumber}`, {
    phoneNumber,
  });
};

export const getChatToken = (phoneNumber: string, VCode: string) => {
  return axios.post(domain + "/inside/app/user/login/V2", {
    phoneNumber: phoneNumber,
    smsCode: VCode,
  });
};
