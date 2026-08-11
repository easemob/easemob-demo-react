import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
  useMemo,
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
  useIsMobile,
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
    return item.groupId == cvsItem.conversationId;
  });
  const groupDetailConversation = useMemo(
    () => ({
      chatType: CHAT_TYPES.GROUP_CHAT,
      conversationId: cvsItem.conversationId,
    }),
    [cvsItem.conversationId]
  );

  // ==================== 自定义 Hooks ====================
  const handleForwardMessage = useForwardMessage(
    setForwardedMessages,
    setContactListVisible
  );

  // ==================== 事件处理函数 ====================
  const handleEllipsisClick = () => {
    if (isMobile) {
      return;
    }
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

  // 获取群组头像（业务私有 App Server；npm UIKit 尚无 providers.groupInfo）
  useEffect(() => {
    if (!rootStore.loginState) return;
    const groupIds = rootStore.addressStore.groups
      .filter((item) => !item.avatarUrl)
      .map((item) => (item as any).groupId ?? (item as any).groupid)
      .filter(Boolean) as string[];
    if (groupIds.length === 0) return;
    getGroupAvatar(groupIds).then((res) => {
      for (const groupId in res) {
        if (res[groupId]) {
          rootStore.addressStore.updateGroupAvatar(groupId, res[groupId]);
        }
      }
    });
  }, [rootStore.loginState, rootStore.addressStore.groups.length]);

  // 监听当前会话变化
  useEffect(() => {
    if (
      isMobile &&
      rootStore.conversationStore.currentCvs.conversationId != undefined
    ) {
      setShowChatView(true);
    } else {
      setShowChatView(false);
    }
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

  // ==================== 移动端状态 ====================
  const [isMobile, setIsMobile] = useState(false);
  const [showChatView, setShowChatView] = useState(false); // 移动端是否显示聊天视图

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // 桌面端总是显示聊天视图
      if (window.innerWidth > 768) {
        setShowChatView(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 移动端选择会话后显示聊天视图
  const handleMobileItemClick = (item: any) => {
    setConversationDetailVisible(false);
    setCvsItem(item);

    // 移动端点击会话后显示聊天视图
    if (isMobile) {
      setShowChatView(true);
    }
  };

  // 移动端返回会话列表
  const handleBackToConversations = () => {
    setShowChatView(false);
  };

  // 移动端更多按钮菜单内容
  const mobileMoreActions: any[] = [];
  if (isMobile) {
    if (cvsItem.chatType == CHAT_TYPES.SINGLE_CHAT) {
      mobileMoreActions.push({
        icon: <Icon type="PERSON_SINGLE_FILL" width={20} height={20} />,
        content: i18next.t("contactDetails"),
        onClick: () => setConversationDetailVisible(true),
      });
    } else if (cvsItem.chatType == CHAT_TYPES.GROUP_CHAT) {
      mobileMoreActions.push({
        icon: <Icon type="PERSON_DOUBLE_FILL" width={20} height={20} />,
        content: i18next.t("groupSettings"),
        onClick: () => setConversationDetailVisible(true),
      });
    }
  }

  const serverConfig = useMemo(() => {
    try {
      const raw = localStorage.getItem("serverConfig");
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.warn("读取 serverConfig 失败", err);
      return {};
    }
  }, []);
  // 获取 rtc server list
  const rtcServerList = serverConfig.rtcServerList?.split(",") || [];
  const rtcServerDomain = serverConfig.rtcServerDomain || "";
  const useRtcServer = serverConfig.useRtcServer;
  const checkRtcToken =
    useRtcServer && serverConfig.checkRtcToken == false ? false : true;

  // ==================== 渲染 ====================
  return (
    <div
      className={classNames("chat-container", {
        "chat-container-dark": themeMode === "dark",
        "chat-container-mobile": isMobile,
      })}
    >
      {/* 会话列表区域 */}
      <div
        className={classNames("chat-container-conversation", {
          "mobile-hidden": isMobile && showChatView,
        })}
      >
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
                    onClick: () => {
                      if (isMobile) {
                        setShowChatView(true);
                      }
                      setCreateChatVisible(true);
                    },
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
          onItemClick={handleMobileItemClick}
          className="conversation-list"
        />
      </div>

      {/* 聊天区域 */}
      <div
        className={classNames("chat-container-chat", {
          "mobile-hidden": isMobile && !showChatView,
          "mobile-fullwidth": isMobile && showChatView,
        })}
      >
        {/* 诈骗提示 */}
        <div
          className="fraud"
          style={
            showPanel
              ? { width: isMobile ? "100%" : "calc(100% - 350px)" }
              : { width: "100%" }
          }
        >
          <FraudTip
            visible={
              fraudTipVisible &&
              cvsItem.conversationId !== "" &&
              !createChatVisible &&
              !conversationDetailVisible
            }
            onClose={closeFraudTip}
          />
        </div>

        {/* 主聊天内容区域 */}
        <div
          style={{
            display: "flex",
            flex: 1,
            borderLeft: "1px solid transparent",
            transition: "all 0.5s ease",
          }}
        >
          {/* 创建聊天组件 */}
          {createChatVisible && (
            <CreateChat
              onClosed={() => {
                setCreateChatVisible(false);
                if (isMobile) {
                  setShowChatView(false);
                } else {
                  setShowChatView(true);
                }
              }}
              onBack={() => {
                setCreateChatVisible(false);
                setShowChatView(false);
              }}
              onCreateChat={() => {
                setCreateChatVisible(false);
                if (isMobile) {
                  setShowChatView(true);
                }
              }}
            />
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
                actions: mobileMoreActions,
              },
              style: { cursor: "pointer" },
              onClickAvatar: handleEllipsisClick,
              onClickEllipsis: handleEllipsisClick,
              onClickBack: handleBackToConversations,
            }}
            callkitProps={{
              ...CALLKIT_CONFIG,
              onRtcEngineCreated: (engine: any) => {
                if (useRtcServer) {
                  engine.setLocalAccessPointsV2({
                    accessPoints: {
                      serverList: rtcServerList,
                      domain: rtcServerDomain,
                    },
                  });
                }
              },
              useRTCToken: checkRtcToken,
            }}
          />

          {/* 群组设置/联系人详情 */}
          {conversationDetailVisible && (
            <div
              className={classNames("chat-container-chat-right", {
                "mobile-fullwidth": isMobile && showChatView,
              })}
              ref={detailsRef}
            >
              {cvsItem.chatType == CHAT_TYPES.GROUP_CHAT ? (
                <GroupDetail
                  onBack={() => {
                    setConversationDetailVisible(false);
                    // if (isMobile) {
                    //   setShowChatView(false);
                    // }
                  }}
                  conversation={groupDetailConversation}
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
                    setGroupMemberVisible(visible);
                  }}
                  onUserIdCopied={() => {
                    toast.success(i18next.t("copied"));
                  }}
                />
              ) : (
                <UserInfo
                  conversation={cvsItem}
                  onBack={() => {
                    setConversationDetailVisible(false);
                    // if (isMobile) {
                    //   setShowChatView(false);
                    // }
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Thread 面板 */}
        {thread.showThreadPanel &&
          !pinMsgVisible &&
          !conversationDetailVisible && (
            <div
              className={classNames("chat-container-chat-right", {
                "mobile-fullwidth": isMobile && showChatView,
              })}
            >
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
            <div
              className={classNames("chat-container-chat-right", {
                "mobile-fullwidth": isMobile && showChatView,
              })}
            >
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
