import React, { useContext } from "react";
import {
  Modal,
  ContactList,
  RootContext,
  rootStore,
} from "easemob-chat-uikit";
import { CHAT_TYPES, CONTACT_MENU, MODAL_STYLES } from "../../constants/chat";
import toast from "../toast/toast";
import "./ForwardModal.scss";

interface ForwardModalProps {
  visible: boolean;
  forwardedMessages: Record<string, any>;
  currentConversation: any;
  onCancel: () => void;
}

const ForwardModal: React.FC<ForwardModalProps> = ({
  visible,
  forwardedMessages,
  currentConversation,
  onCancel,
}) => {
  const { client } = useContext(RootContext);

  const createForwardMessage = (
    source: Record<string, any>,
    conversationId: string,
    conversationType: "singleChat" | "groupChat"
  ) => {
    const body = source.body || {};
    const base = {
      conversationId,
      conversationType,
      ext: { ...(source.ext || {}) },
      needReadReceipt: true,
    };
    let message: Record<string, any>;

    switch (source.type) {
      case "text":
      case "txt":
        return client.chatManager.createTextMessage({
          ...base,
          content: body.content || "",
        });
      case "image":
      case "img":
        message = client.chatManager.createImageMessage({
          ...base,
          originalUrl:
            body.originalImageUrl ||
            body.bigImageUrl ||
            body.url ||
            body.localUrl,
          filename: body.filename,
          filetype: body.filetype,
          width: body.width,
          height: body.height,
          isGif: body.isGif,
          isOriginalImage: body.isOriginalImage,
          fileLength: body.fileLength,
          thumbnailUrl: body.thumbnailUrl,
        });
        break;
      case "file":
        message = client.chatManager.createFileMessage({
          ...base,
          originalUrl: body.url,
          filename: body.filename,
          filetype: body.filetype,
          fileSize: body.fileSize,
          fileLength: body.fileLength,
        });
        break;
      case "voice":
      case "audio":
        message = client.chatManager.createVoiceMessage({
          ...base,
          originalUrl: body.url,
          filename: body.filename,
          filetype: body.filetype,
          duration: body.duration ?? body.length ?? 0,
          fileLength: body.fileLength,
        });
        break;
      case "video":
        message = client.chatManager.createVideoMessage({
          ...base,
          originalUrl: body.url,
          filename: body.filename,
          filetype: body.filetype,
          duration: body.duration ?? body.length ?? 0,
          width: body.width,
          height: body.height,
          fileLength: body.fileLength,
          thumbnailUrl: body.thumbnailUrl,
        });
        break;
      case "location":
      case "loc":
        return client.chatManager.createLocationMessage({
          ...base,
          latitude: body.latitude,
          longitude: body.longitude,
          address: body.address,
          buildingName: body.buildingName,
        });
      case "cmd":
        return client.chatManager.createCmdMessage({
          ...base,
          action: body.action,
        });
      case "custom":
        return client.chatManager.createCustomMessage({
          ...base,
          event: body.event,
          params: body.params,
        });
      case "combine":
        return client.chatManager.createCombineMessage({
          ...base,
          title: body.title,
          summary: body.summary,
          compatibleText: body.compatibleText,
          messageList: body.messageList,
        });
      default:
        throw new Error(`暂不支持转发 ${source.type} 类型的消息`);
    }

    if (body.secret) {
      message.body.secret = body.secret;
    }
    return message;
  };

  const handleItemClick = async (data: {
    id: string;
    type: string;
    name: string;
  }) => {
    const conversationType =
      data.type === "contact" ? CHAT_TYPES.SINGLE_CHAT : CHAT_TYPES.GROUP_CHAT;

    try {
      const message = createForwardMessage(
        forwardedMessages,
        data.id,
        conversationType
      );
      const sentMessage = await rootStore.messageStore.sendMessage(message);

      rootStore.messageStore.setSelectedMessage(currentConversation, {
        selectable: false,
        selectedMessage: [],
      });

      rootStore.conversationStore.setCurrentCvs({
        chatType: conversationType,
        conversationId: data.id,
        name: data.name,
      });
      // sendMessage 已写入会话 lastMessage；这里只切换当前会话。
      void sentMessage;

      onCancel();
    } catch (error) {
      console.error("转发消息失败", error);
      toast.error(error instanceof Error ? error.message : "转发消息失败");
    }
  };

  return (
    <Modal
      open={visible}
      closable={false}
      onCancel={onCancel}
      bodyStyle={{ padding: 0 }}
      footer={null}
      className="forward-modal"
    >
      <div style={{ height: MODAL_STYLES.CONTACT_LIST.height }}>
        <ContactList
          style={{ padding: MODAL_STYLES.CONTACT_LIST.padding }}
          menu={CONTACT_MENU}
          header={<></>}
          onItemClick={handleItemClick}
        />
      </div>
    </Modal>
  );
};

export default ForwardModal;
