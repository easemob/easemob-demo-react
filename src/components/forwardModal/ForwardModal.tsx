import React from "react";
import { Modal, ContactList, rootStore } from "easemob-chat-uikit";
import { CHAT_TYPES, CONTACT_MENU, MODAL_STYLES } from "../../constants/chat";
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
  const handleItemClick = (data: {
    id: string;
    type: string;
    name: string;
  }) => {
    // 设置转发目标
    forwardedMessages.to = data.id;
    forwardedMessages.chatType =
      data.type === "contact" ? CHAT_TYPES.SINGLE_CHAT : CHAT_TYPES.GROUP_CHAT;

    // 发送转发消息
    //@ts-ignore
    rootStore.messageStore.sendMessage(forwardedMessages);

    // 清理选中状态
    rootStore.messageStore.setSelectedMessage(currentConversation, {
      selectable: false,
      selectedMessage: [],
    });

    // 切换到目标会话
    rootStore.conversationStore.setCurrentCvs({
      chatType:
        data.type === "contact"
          ? CHAT_TYPES.SINGLE_CHAT
          : CHAT_TYPES.GROUP_CHAT,
      conversationId: data.id,
      //@ts-ignore
      lastMessage: forwardedMessages,
      name: data.name,
    });

    // 关闭弹窗
    onCancel();
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
