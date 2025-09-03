import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
} from "react";
import {
  Chat,
  GroupDetail,
  Header,
  rootStore,
  ConversationList,
  Icon,
  UserSelect,
  Modal,
  Input,
  Thread,
  PinnedMessage,
  usePinnedMessage,
  RootContext,
} from "easemob-chat-uikit";
import toast from "../../components/toast/toast";
import { getGroupAvatar } from "../../service/avatar";
import "./chatContainer.scss";
import UserInfo from "../../components/userInfo/userInfo";
import FraudTip from "../../components/fraudTip/FraudTip";
import AddContactModal from "../../components/addContactModal/AddContactModal";
import ForwardModal from "../../components/forwardModal/ForwardModal";
import { observer } from "mobx-react-lite";
import { useAppSelector, useForwardMessage } from "../../hooks";
import CreateChat from "./createChat";
import classNames from "classnames";
import i18next from "../../i18n";
import chats from "../../assets/chats@2x.png";
import {
  CHAT_TYPES,
  MESSAGE_TYPES,
  CALLKIT_CONFIG,
} from "../../constants/chat";
import {
  createMessageActions,
  createThreadMessageActions,
  createHeaderIcon,
} from "../../utils/chatHelpers";

const ChatContainer = forwardRef((props, ref) => {
  // ==================== 外部状态 ====================
  const appConfig = useAppSelector((state) => state.appConfig);
  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;
  const thread = rootStore.threadStore;
  const { visible: pinMsgVisible, hide: hidePinMsg } = usePinnedMessage();

  // ==================== UI 控制状态 ====================
  const [userSelectVisible, setUserSelectVisible] = useState(false); // 创建群组弹窗
  const [addContactVisible, setAddContactVisible] = useState(false); // 添加联系人弹窗
  const [conversationDetailVisible, setConversationDetailVisible] =
    useState(false); // 群组设置/联系人详情弹窗
  const [contactListVisible, setContactListVisible] = useState(false); // 转发消息弹窗
  const [createChatVisible, setCreateChatVisible] = useState(false); // 创建会话弹窗
  const [groupMemberVisible, setGroupMemberVisible] = useState(false); // 群组成员弹窗
  const [fraudTipVisible, setFraudTipVisible] = useState(true); // 诈骗提示

  // ==================== 数据状态 ====================
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // 选中的用户
  const [cvsItem, setCvsItem] = useState<any>([]); // 当前会话项
  const [forwardedMessages, setForwardedMessages] = useState<
    Record<string, any>
  >({}); // 转发的消息

  // ==================== Refs ====================
  const chatRef = useRef<any>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // ==================== 计算属性 ====================
  const showPanel =
    thread.showThreadPanel || pinMsgVisible || conversationDetailVisible;
  const isInGroup = rootStore.addressStore.groups.some((item) => {
    // @ts-ignore
    return item.groupid == cvsItem.conversationId;
  });

  // ==================== 自定义 Hooks ====================
  const handleForwardMessage = useForwardMessage(
    setForwardedMessages,
    setContactListVisible
  );

  // ==================== 事件处理函数 ====================
  const handleEllipsisClick = () => {
    if (cvsItem.chatType == CHAT_TYPES.GROUP_CHAT) {
      if (thread.showThreadPanel) {
        rootStore.threadStore.setThreadVisible(false);
      }
      if (pinMsgVisible) {
        hidePinMsg();
      }
      isInGroup && setConversationDetailVisible((value) => !value);
    } else {
      setConversationDetailVisible((value) => !value);
    }
  };

  const closeFraudTip = () => {
    setFraudTipVisible(false);
  };

  // ==================== 副作用 ====================
  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    startVideoCall: chatRef.current?.startVideoCall,
    startAudioCall: chatRef.current?.startAudioCall,
  }));

  // 获取群组头像
  useEffect(() => {
    if (rootStore.loginState) {
      const groupIds =
        rootStore.addressStore.groups
          .filter((item) => !item.avatarUrl)
          .map((item) => {
            //@ts-ignore
            return item.groupid;
          }) || [];
      getGroupAvatar(groupIds).then((res) => {
        for (let groupId in res) {
          rootStore.addressStore.updateGroupAvatar(groupId, res[groupId]);
        }
      });
    }
  }, [rootStore.loginState, rootStore.addressStore.groups.length]);

  // 监听当前会话变化
  useEffect(() => {
    setConversationDetailVisible(false);
    setCvsItem(rootStore.conversationStore.currentCvs);
  }, [rootStore.conversationStore.currentCvs]);

  // 管理面板间的互斥显示
  useEffect(() => {
    if (pinMsgVisible) {
      thread.setThreadVisible(false);
      setConversationDetailVisible(false);
    }
  }, [pinMsgVisible]);

  useEffect(() => {
    if (thread.showThreadPanel) {
      hidePinMsg();
      setConversationDetailVisible(false);
    }
  }, [thread.showThreadPanel]);

  // 诈骗提示显示控制
  useEffect(() => {
    if (rootStore.conversationStore.currentCvs.conversationId !== "") {
      setFraudTipVisible(true);
    } else {
      setFraudTipVisible(false);
    }
  }, [rootStore.conversationStore.currentCvs]);

  // 点击外部关闭详情面板
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setConversationDetailVisible(false);
      }
    };

    if (!groupMemberVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detailsRef, groupMemberVisible]);

  // ==================== 渲染 ====================
  return (
    <div
      className={classNames("chat-container", {
        "chat-container-dark": themeMode === "dark",
      })}
    >
      {/* 会话列表区域 */}
      <div className="chat-container-conversation">
        <ConversationList
          renderHeader={() => (
            <Header
              moreAction={{
                visible: true,
                icon: (
                  <Icon {...createHeaderIcon("MORE", themeMode || "light")} />
                ),
                actions: [
                  {
                    icon: (
                      <Icon
                        {...createHeaderIcon(
                          "NEW_CONVERSATION",
                          themeMode || "light"
                        )}
                      />
                    ),
                    content: i18next.t("newConversation"),
                    onClick: () => setCreateChatVisible(true),
                  },
                  {
                    icon: (
                      <Icon
                        {...createHeaderIcon(
                          "ADD_CONTACT",
                          themeMode || "light"
                        )}
                      />
                    ),
                    content: i18next.t("addContact"),
                    onClick: () => setAddContactVisible(true),
                  },
                  {
                    icon: (
                      <Icon
                        {...createHeaderIcon(
                          "CREATE_GROUP",
                          themeMode || "light"
                        )}
                      />
                    ),
                    content: i18next.t("createGroup"),
                    onClick: () => setUserSelectVisible(true),
                  },
                ],
                tooltipProps: {
                  placement: "bottomRight",
                },
              }}
              content={
                <div className={`header-content ${themeMode}`}>
                  <img className="header-img" src={chats} alt="" />
                </div>
              }
              avatar={<></>}
            />
          )}
          onItemClick={(item) => {
            setConversationDetailVisible(false);
            setCvsItem(item);
          }}
          className="conversation-list"
        />
      </div>

      {/* 聊天区域 */}
      <div className="chat-container-chat">
        {/* 诈骗提示 */}
        <div
          className="fraud"
          style={
            showPanel ? { width: "calc(100% - 350px)" } : { width: "100%" }
          }
        >
          <FraudTip
            visible={fraudTipVisible && cvsItem.conversationId !== ""}
            onClose={closeFraudTip}
          />
        </div>

        {/* 主聊天内容区域 */}
        <div
          style={{
            display: "flex",
            flex: 1,
            borderLeft: "1px solid transparent",
            overflow: "hidden",
            transition: "all 0.5s ease",
          }}
        >
          {/* 创建聊天组件 */}
          {createChatVisible && (
            <CreateChat onClosed={() => setCreateChatVisible(false)} />
          )}

          {/* 聊天组件 */}
          <Chat
            key={
              appConfig.reaction.toString() +
              appConfig.thread.toString() +
              appConfig.translation.toString()
            }
            ref={chatRef}
            onOpenThread={() => {
              if (conversationDetailVisible) {
                setConversationDetailVisible(false);
              }
            }}
            messageListProps={{
              renderUserProfile: () => null,
              messageProps: {
                onForwardMessage: handleForwardMessage,
                reaction: appConfig.reaction,
                thread: appConfig.thread,
                customAction: {
                  visible: true,
                  icon: null,
                  actions: createMessageActions(appConfig.translation),
                },
              },
            }}
            messageInputProps={{
              enabledTyping: true,
              onSendMessage: (msg) => {
                // @ts-ignore
                if (msg.type == MESSAGE_TYPES.COMBINE) {
                  setForwardedMessages(msg);
                  setContactListVisible(true);
                }
              },
            }}
            //@ts-ignore
            headerProps={{
              moreAction: {
                visible: true,
                actions: [],
              },
              style: { cursor: "pointer" },
              onClickAvatar: handleEllipsisClick,
              onClickEllipsis: handleEllipsisClick,
            }}
            callkitProps={CALLKIT_CONFIG}
          />

          {/* 群组设置/联系人详情 */}
          {conversationDetailVisible && (
            <div className="chat-container-chat-right" ref={detailsRef}>
              {cvsItem.chatType == CHAT_TYPES.GROUP_CHAT ? (
                <GroupDetail
                  conversation={{
                    chatType: CHAT_TYPES.GROUP_CHAT,
                    conversationId: cvsItem.conversationId,
                  }}
                  onLeaveGroup={() => setConversationDetailVisible(false)}
                  onDestroyGroup={() => setConversationDetailVisible(false)}
                  // @ts-ignore
                  groupMemberProps={{
                    onPrivateChat: () => {
                      setConversationDetailVisible(false);
                      setGroupMemberVisible(false);
                    },
                    onAddContact: () => {
                      toast.success("Friend request sent");
                      setGroupMemberVisible(false);
                    },
                  }}
                  onGroupMemberVisibleChange={(visible: boolean) => {
                    console.log("onGroupMemberVisibleChange", visible);
                    setGroupMemberVisible(visible);
                  }}
                  onUserIdCopied={() => {
                    toast.success(i18next.t("copied"));
                  }}
                />
              ) : (
                <UserInfo conversation={cvsItem} />
              )}
            </div>
          )}
        </div>

        {/* Thread 面板 */}
        {thread.showThreadPanel &&
          !pinMsgVisible &&
          !conversationDetailVisible && (
            <div className="chat-container-chat-right">
              <Thread
                messageListProps={{
                  renderUserProfile: () => null,
                  messageProps: {
                    onForwardMessage: handleForwardMessage,
                    customAction: {
                      visible: true,
                      icon: null,
                      actions: createThreadMessageActions(),
                    },
                  },
                }}
                messageInputProps={{
                  onSendMessage: (msg: any) => {
                    if (msg.type == MESSAGE_TYPES.COMBINE) {
                      setForwardedMessages(msg);
                      setContactListVisible(true);
                    }
                  },
                }}
              />
            </div>
          )}

        {/* Pin Message 面板 */}
        {pinMsgVisible &&
          !thread.showThreadPanel &&
          !conversationDetailVisible && (
            <div className="chat-container-chat-right">
              <PinnedMessage />
            </div>
          )}
      </div>

      {/* ==================== 弹窗组件 ==================== */}
      {/* 创建群组联系人选择弹窗 */}
      <UserSelect
        onCancel={() => setUserSelectVisible(false)}
        onConfirm={() => {
          rootStore.addressStore.createGroup(
            selectedUsers.map((user) => user.userId)
          );
          setUserSelectVisible(false);
        }}
        okText={i18next.t("create")}
        enableMultipleSelection
        onUserSelect={(user, users) => setSelectedUsers(users)}
        open={userSelectVisible}
      />

      {/* 转发消息联系人选择弹窗 */}
      <ForwardModal
        visible={contactListVisible}
        forwardedMessages={forwardedMessages}
        currentConversation={cvsItem}
        onCancel={() => setContactListVisible(false)}
      />

      {/* 添加联系人弹窗 */}
      <AddContactModal
        visible={addContactVisible}
        onCancel={() => setAddContactVisible(false)}
      />
    </div>
  );
});

export default observer(ChatContainer);
