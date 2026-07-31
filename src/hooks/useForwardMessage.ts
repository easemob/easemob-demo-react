import { useCallback } from "react";
import { rootStore } from "easemob-chat-uikit";
import toast from "../components/toast/toast";

/**
 * 消息类型定义
 */
interface ForwardMessage {
  [key: string]: any;
  type: string;
  body?: Record<string, any>;
  ext?: any;
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
   * 处理合并消息的解析
   */
  const handleCombineMessage = useCallback(async (msg: ForwardMessage) => {
    if (msg.type === "combine" && !msg.body?.messageList) {
      try {
        const messageList =
          await rootStore.client.chatManager.downloadAndParseCombineMessage({
            message: msg,
          });
        return messageList;
      } catch (err) {
        toast.error("解析合并消息失败，无法转发");
        throw err;
      }
    }
    return msg.body?.messageList;
  }, []);

  /**
   * 转发消息处理函数
   */
  const handleForwardMessage = useCallback(
    async (msg: ForwardMessage) => {
      console.log("要转发的消息", msg);

      try {
        const forwardMsg: ForwardMessage = {
          ...msg,
          body: { ...(msg.body || {}) },
        };

        if (forwardMsg.type === "combine") {
          forwardMsg.body!.messageList = await handleCombineMessage(forwardMsg);
        }

        setForwardedMessages(forwardMsg);
        setContactListVisible(true);
      } catch (error) {
        console.error("转发消息失败:", error);
        // 错误已在 handleCombineMessage 中处理，这里不需要再次处理
      }
    },
    [
      handleCombineMessage,
      setForwardedMessages,
      setContactListVisible,
    ]
  );

  return handleForwardMessage;
};
