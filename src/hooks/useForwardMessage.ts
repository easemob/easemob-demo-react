import { useCallback } from "react";
import { rootStore } from "easemob-chat-uikit";
import toast from "../components/toast/toast";

/**
 * 消息类型定义
 */
interface ForwardMessage {
  [key: string]: any;
  type: string;
  url?: string;
  filename?: string;
  secret?: string;
  file_length?: number;
  length?: number;
  thumb?: string;
  messageList?: any[];
  file?: any;
  id?: string;
  from?: string;
  ext?: any;
  reactions?: any;
  isChatThread?: boolean;
  chatThreadOverview?: any;
  chatThread?: any;
  time?: number;
}

/**
 * 转发消息 Hook
 * @param setForwardedMessages - 设置转发消息的回调
 * @param setContactListVisible - 设置联系人列表可见性的回调
 * @returns 转发消息处理函数
 */
export const useForwardMessage = (
  setForwardedMessages: (msg: ForwardMessage) => void,
  setContactListVisible: (visible: boolean) => void
) => {
  /**
   * 处理不同类型消息的 body 构建
   */
  const buildMessageBody = useCallback((msg: ForwardMessage) => {
    switch (msg.type) {
      case "video":
        return {
          url: msg.url?.split("?")[0],
          filename: msg.filename,
          secret: msg.secret,
          file_length: msg.file_length,
        };
      case "audio":
        return {
          url: msg.url,
          filename: msg.filename,
          secret: msg.secret,
          file_length: msg.file_length,
          length: msg.length,
        };
      case "file":
        return {
          url: msg.url,
          filename: msg.filename,
          secret: msg.secret,
          file_length: msg.file_length,
        };
      default:
        return msg.body;
    }
  }, []);

  /**
   * 处理合并消息的解析
   */
  const handleCombineMessage = useCallback(async (msg: ForwardMessage) => {
    if (msg.type === "combine" && !msg.messageList) {
      try {
        const messageList =
          await rootStore.client.downloadAndParseCombineMessage({
            url: msg.url!,
            secret: msg.secret!,
          });
        return messageList;
      } catch (err) {
        toast.error("解析合并消息失败，无法转发");
        throw err;
      }
    }
    return msg.messageList;
  }, []);

  /**
   * 构建用户信息扩展字段
   */
  const buildUserExtension = useCallback(() => {
    const currentUser = rootStore.client.user;
    return {
      ease_chat_uikit_user_info: {
        nickname: rootStore.addressStore.appUsersInfo[currentUser]?.nickname,
        avatarURL: rootStore.addressStore.appUsersInfo[currentUser]?.avatarurl,
      },
    };
  }, []);

  /**
   * 转发消息处理函数
   */
  const handleForwardMessage = useCallback(
    async (msg: ForwardMessage) => {
      console.log("要转发的消息", msg);

      try {
        // 深拷贝消息对象
        const forwardMsg: ForwardMessage = { ...msg };

        // 处理不同类型消息的 body
        if (["video", "audio", "file"].includes(forwardMsg.type)) {
          forwardMsg.body = buildMessageBody(forwardMsg);

          // 视频消息需要清空缩略图
          if (forwardMsg.type === "video") {
            forwardMsg.thumb = "";
          }
        }

        // 处理合并消息
        if (forwardMsg.type === "combine") {
          forwardMsg.messageList = await handleCombineMessage(forwardMsg);
        }

        // 清理不需要的字段
        if (forwardMsg.file) {
          delete forwardMsg.file;
        }

        // 设置新的消息属性
        forwardMsg.id = Date.now().toString();
        forwardMsg.from = rootStore.client.user;
        forwardMsg.ext = buildUserExtension();
        forwardMsg.time = Date.now();

        // 清理线程相关属性
        forwardMsg.reactions = undefined;
        forwardMsg.isChatThread = false;
        forwardMsg.chatThreadOverview = undefined;
        forwardMsg.chatThread = undefined;

        // 执行转发逻辑
        setForwardedMessages(forwardMsg);
        setContactListVisible(true);
      } catch (error) {
        console.error("转发消息失败:", error);
        // 错误已在 handleCombineMessage 中处理，这里不需要再次处理
      }
    },
    [
      buildMessageBody,
      handleCombineMessage,
      buildUserExtension,
      setForwardedMessages,
      setContactListVisible,
    ]
  );

  return handleForwardMessage;
};
