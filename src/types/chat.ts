/**
 * 聊天相关类型定义
 */

export interface ConversationItem {
  conversationId: string;
  chatType: "singleChat" | "groupChat";
  name?: string;
  lastMessage?: any;
}

export interface GroupInfo {
  groupId: string;
  groupName: string;
  avatarUrl?: string;
  description?: string;
  memberCount?: number;
}

export interface ContactInfo {
  userId: string;
  nickname?: string;
  avatarurl?: string;
}

export interface MessageAction {
  content: string;
  onClick: () => void;
}

export interface CustomActionConfig {
  visible: boolean;
  icon?: React.ReactNode | null;
  actions: MessageAction[];
}

export interface ForwardContactData {
  id: string;
  name: string;
  type: "contact" | "group";
}

/**
 * 聊天容器组件的 Props 类型
 */
export interface ChatContainerProps {
  // 如果有 props 的话可以在这里定义
}

/**
 * 群组成员 Props 类型
 */
export interface GroupMemberProps {
  onPrivateChat?: () => void;
  onAddContact?: () => void;
}
