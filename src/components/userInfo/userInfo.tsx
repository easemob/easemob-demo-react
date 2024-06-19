import {
  Icon,
  Switch,
  Avatar,
  RootContext,
  Modal,
  rootStore,
  Input,
} from "easemob-chat-uikit";
import i18next from "../../i18n";
import classNames from "classnames";
import { useContext } from "react";
import toast from "../toast/toast";
import { useState, ChangeEvent } from "react";
import "./userInfo.scss";
import { observer } from "mobx-react-lite";
interface UserInfoProps {
  className?: string;
  conversation: {
    chatType: "singleChat";
    conversationId: string;
  };
  // 配置都显示哪些功能   1.备注  2.消息免打扰  3.加入黑名单  4.清空聊天记录  5.删除联系人
  itemConfig?: {
    remark?: boolean;
    silent?: boolean;
    block?: boolean;
    clearMsg?: boolean;
    deleteContact?: boolean;
    onBlockedChange?: (e: { target: { checked: boolean } }) => void;
    onDeleteContact?: () => void;
  };
  // themeMode?: string;
}
const UserInfo = (props: UserInfoProps) => {
  const {
    className,
    conversation,
    itemConfig = {
      remark: true,
      silent: true,
      block: true,
      clearMsg: true,
      deleteContact: true,
    },
  } = props;
  const context = useContext(RootContext);
  console.log("context", context);
  const { theme } = context;
  const themeMode = theme?.mode || "light";

  const prefixCls = "user-info";
  const { addressStore, conversationStore } = rootStore;
  const userInfo =
    addressStore.contacts.filter(
      (item) => item.userId === conversation.conversationId
    )[0] || {};

  const currentCvs = conversationStore.conversationList.filter((item) => {
    return item.conversationId === conversation.conversationId;
  });

  const silent = currentCvs[0]?.silent;

  const isInBlocklist = addressStore.blockList.some((item) => {
    return item === conversation.conversationId;
  });

  const [remarkModalVisible, setRemarkModalVisible] = useState(false);
  const [remarkValue, setRemarkValue] = useState(userInfo.remark || "");

  const { t } = i18next;

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${themeMode}`]: !!themeMode,
    },
    className
  );

  const handleCopy = () => {
    var textArea = document.createElement("textarea");
    textArea.value = conversation.conversationId;
    // 添加到 DOM 元素中，方便调用 select 方法
    document.body.appendChild(textArea);
    // 选中文本
    textArea.select();
    // 执行复制命令
    document.execCommand("copy");
    // 删除临时元素
    document.body.removeChild(textArea);
    toast.success(t("copySuccess"));
  };

  const editRemark = () => {
    rootStore.addressStore.setContactRemark(
      conversation.conversationId,
      remarkValue
    );
    setRemarkModalVisible(false);
  };

  const handleRemarkInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value.length > 20) return;
    setRemarkValue(e.target.value);
  };

  // ---------- notification --------
  const handleNotificationChange = (e: { target: { checked: boolean } }) => {
    const result = e.target.checked;
    rootStore.addressStore.setSilentModeForConversation(
      {
        conversationId: conversation.conversationId,
        chatType: conversation.chatType,
      },
      result
    );
  };

  // ---------- block --------
  const handleBlockChange = (e: { target: { checked: boolean } }) => {
    const result = e.target.checked;
    itemConfig?.onBlockedChange?.(e);
    result
      ? setBlockContactModalVisible(true)
      : rootStore.addressStore.removeUserFromBlocklist([
          conversation.conversationId,
        ]);
  };

  const [blockContactModalVisible, setBlockContactModalVisible] =
    useState(false);

  // -------  clear message ---------
  const [clearMsgModalVisible, setClearMsgModalVisible] = useState(false);
  const clearMessages = () => {
    rootStore.messageStore.clearMessage(conversation);
    setClearMsgModalVisible(false);
  };

  //--------------- delete contact -------
  const [deleteContactModalVisible, setDeleteContactModalVisible] =
    useState(false);
  const deleteContact = () => {
    rootStore.addressStore.deleteContact(conversation.conversationId);
    rootStore.conversationStore.deleteConversation(conversation);
    rootStore.messageStore.clearMessage(conversation);
    setDeleteContactModalVisible(false);
    itemConfig?.onDeleteContact?.();
  };

  return (
    <div className={classString}>
      <div className={`${prefixCls}-header`}>
        <Avatar
          src={
            addressStore.appUsersInfo[conversation.conversationId]?.avatarurl
          }
          size={100}
          shape={theme?.avatarShape}
        >
          {addressStore.appUsersInfo[conversation.conversationId]?.nickname ||
            conversation.conversationId}
        </Avatar>
        <div>
          <div className={`${prefixCls}-header-name`}>
            {addressStore.appUsersInfo[conversation.conversationId]?.nickname}
          </div>
          <div className={`${prefixCls}-header-id`}>
            <div>{t("enterUserID")}:</div>
            {conversation?.conversationId}
            <Icon
              type="DOC_ON_DOC"
              style={{ cursor: "copy" }}
              onClick={handleCopy}
            ></Icon>
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-content`}>
        {itemConfig?.remark && (
          <div className={`${prefixCls}-content-item`}>
            <Icon type="PERSON_SINGLE_LINE_FILL" width={24} height={24}></Icon>
            <div
              className={`${prefixCls}-content-item-box`}
              onClick={() => {
                setRemarkModalVisible(true);
              }}
            >
              <span>{t("contactRemark")}</span>
              <div>
                {userInfo.remark}
                <Icon type="SLASH_IN_BOX" width={24} height={24}></Icon>
              </div>
            </div>
          </div>
        )}
        {itemConfig?.silent && (
          <div className={`${prefixCls}-content-item`}>
            <Icon type="BELL" width={24} height={24}></Icon>
            <div className={`${prefixCls}-content-item-box`}>
              <span>{t("muteNotifications")}</span>
              <div>
                <Switch
                  checked={!!silent}
                  onChange={handleNotificationChange}
                ></Switch>
              </div>
            </div>
          </div>
        )}
        {itemConfig?.block && (
          <div className={`${prefixCls}-content-item`}>
            <Icon type="BELL" width={24} height={24}></Icon>
            <div className={`${prefixCls}-content-item-box`}>
              <span>{t("contactBlocked")}</span>
              <div>
                <Switch
                  checked={isInBlocklist}
                  onChange={handleBlockChange}
                ></Switch>
              </div>
            </div>
          </div>
        )}

        {itemConfig?.clearMsg && (
          <div className={`${prefixCls}-content-item`}>
            <Icon type="ERASER" width={24} height={24}></Icon>
            <div
              className={`${prefixCls}-content-item-box`}
              onClick={() => {
                setClearMsgModalVisible(true);
              }}
            >
              <span>{t("clearChatHistory")}</span>
            </div>
          </div>
        )}

        {itemConfig?.deleteContact && (
          <div className={`${prefixCls}-content-section`}>
            <div className={`${prefixCls}-content-item`}>
              <Icon
                type={"PERSON_MINUS_FILL"}
                width={24}
                height={24}
                style={{ fill: "#FF002B", width: "24px", height: "24px" }}
              ></Icon>
              <div
                className={`${prefixCls}-content-item-box`}
                onClick={() => {
                  setDeleteContactModalVisible(true);
                }}
              >
                <span style={{ color: "#FF002B" }}>
                  {t("deleteContactTitle")}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={remarkModalVisible}
        onCancel={() => {
          setRemarkModalVisible(false);
        }}
        onOk={editRemark}
        title={t("contactRemark")}
        wrapClassName="modify-message-modal"
        okText={t("done")}
      >
        <Input
          className="cui-group-nickname-input"
          maxLength={20}
          value={remarkValue}
          onChange={handleRemarkInputChange}
        />
      </Modal>

      <Modal
        title={t("clearChatHistory")}
        open={clearMsgModalVisible}
        onCancel={() => {
          setClearMsgModalVisible(false);
        }}
        onOk={clearMessages}
      >
        <div>{`${t("Want to delete all chat history")}?`}</div>
      </Modal>

      <Modal
        title={t("deleteContactTitle")}
        open={deleteContactModalVisible}
        onCancel={() => {
          setDeleteContactModalVisible(false);
        }}
        onOk={deleteContact}
      >
        <div>{`${t("want to delete contact")} “${
          remarkValue ||
          addressStore.appUsersInfo[conversation.conversationId]?.nickname
        }” ${t("and delete all chat history")}?`}</div>
      </Modal>

      <Modal
        title={t("blockContact")}
        open={blockContactModalVisible}
        onCancel={() => {
          setBlockContactModalVisible(false);
        }}
        onOk={() => {
          rootStore.addressStore.addUsersToBlocklist([
            conversation.conversationId,
          ]);
          setBlockContactModalVisible(false);
        }}
      >
        <div>{`${t("Confirm blocking user")} ${
          remarkValue ||
          addressStore.appUsersInfo[conversation.conversationId]?.nickname
        }?`}</div>
      </Modal>
    </div>
  );
};

export default observer(UserInfo);
