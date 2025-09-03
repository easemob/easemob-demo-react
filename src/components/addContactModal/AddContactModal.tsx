import React, { useState } from "react";
import { Modal, Input } from "easemob-chat-uikit";
import { useAddContact } from "../../hooks";
import i18next from "../../i18n";
import "./AddContactModal.scss";

interface AddContactModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({
  visible,
  onCancel,
}) => {
  const [userId, setUserId] = useState("");
  const { handleAddContact } = useAddContact(() => {
    onCancel();
    setUserId(""); // 清空输入框
  });

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleOk = () => {
    handleAddContact(userId);
  };

  const handleCancel = () => {
    onCancel();
    setUserId(""); // 清空输入框
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={i18next.t("add")}
      closable={false}
      title={i18next.t("addContactByUserIdOrPhone")}
    >
      <div className="add-contact-modal">
        <Input
          placeholder={i18next.t("enterUserIDOrPhoneNum")}
          className="add-contact-modal__input"
          value={userId}
          onChange={handleUserIdChange}
        />
      </div>
    </Modal>
  );
};

export default AddContactModal; 