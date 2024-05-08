import { rootStore } from "easemob-chat-uikit";
const options = {
  requireInteraction: false, // 是否自动消失
  body: "new message", // 展示的具体内容
  tag: "", // 唯一值供记录用
  // body: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZQ20QJS6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648367265&t=c26344538c227e42c92ac1b26d4f9c65',
  // icon: '/favicon@2x.png',
  icon: "/logo192.png",
  image: "",
  data: "", // 附带的数据，可以在展示时获取，然后用做具体的情况使用
  lang: "", // 语言
  dir: "auto", // 文字方向
  renotify: false, // 允许覆盖
  silent: false, // 静音属性为true时不能和vibrate一起使用
  // badge: '',
  // vibrate: [200, 100, 200], // 设备震动频率
  // sound: '',
  // actions: [
  //     {
  //         action: '',
  //         title: '',
  //         icon: ''
  //     }
  // ]
};
export const checkBrowerNotifyStatus = (
  showFlag: boolean,
  params: any,
  iconTitle: string,
  store: any
) => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((e) => {
      if (e === "granted" && showFlag) {
        notification(params, iconTitle, store);
      } else if (e !== "granted") {
        alert("Please set browser support notification");
      }
    });
  } else if (Notification.permission === "denied") {
    alert("Please set browser support notification");
  }
};
export const notification = (iconTitle: string, params: any, store: any) => {
  const config = { ...options, ...params };
  if (Notification?.permission === "granted") {
    const state = store.getState();
    const appConfig = state.appConfig;
    if (!appConfig.notification) return;
    const { chatType, from, to, ext } = params;
    let conversationId = "";
    if (chatType == "singleChat") {
      conversationId = from;
    } else {
      conversationId = to;
    }
    const conversationList = rootStore.conversationStore.conversationList;
    const conversation = conversationList.find(
      (item: any) => item.conversationId === conversationId
    );
    if (conversation?.chatType == "singleChat" && conversation?.silent) {
      return;
    }
    if (conversation?.chatType == "groupChat" && conversation?.silent) {
      if (
        !(
          ext.em_at_list.includes(rootStore.client.user) ||
          ext.em_at_list == "ALL"
        )
      ) {
        return;
      }
    }
    const bodyList = config.body.split("?");
    config.body = bodyList[0];
    var notification = new Notification(config.title || "New Message", config);
    const session = {};
    notification.onclick = (res: any) => {
      //   bodyList[1]?.split("&")?.forEach((item: any) => {
      //     const [first, second] = item?.split("=");
      //     console.log("first", first, "second", second);
      //     // session[first] = second;
      //   });
      //   const { sessionType, sessionId } = session;
      //   if (sessionType && sessionId) {
      //     const { unread } = store.getState();
      //     unread[sessionType][sessionId].fakeNum = 0;
      //     store.dispatch(setUnread(unread));
      //     changeTitle();
      //   }
    };
    notification.addEventListener("show", (e) => {
      setTimeout(notification.close.bind(notification), 2000);
    });
    // changeIcon(iconTitle);
  } else {
    checkBrowerNotifyStatus(true, params, iconTitle, store);
  }
};
