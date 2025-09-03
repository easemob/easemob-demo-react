/**
 * 聊天相关常量定义
 */

// 手机号正则表达式
export const PHONE_REGEX = /^\d{11}$/;

// 消息操作类型
export const MESSAGE_ACTIONS = {
  FORWARD: "FORWARD",
  REPLY: "REPLY",
  UNSEND: "UNSEND",
  MODIFY: "Modify",
  SELECT: "SELECT",
  PIN: "PIN",
  TRANSLATE: "TRANSLATE",
  REPORT: "REPORT",
  DELETE: "DELETE",
} as const;

// Thread 消息操作（Thread 面板中的操作相对较少）
export const THREAD_MESSAGE_ACTIONS = {
  REPLY: "REPLY",
  TRANSLATE: "TRANSLATE",
  MODIFY: "Modify",
  SELECT: "SELECT",
  FORWARD: "FORWARD",
  PIN: "PIN",
} as const;

// 聊天类型
export const CHAT_TYPES = {
  SINGLE_CHAT: "singleChat",
  GROUP_CHAT: "groupChat",
} as const;

// 消息类型
export const MESSAGE_TYPES = {
  COMBINE: "combine",
} as const;

// 联系人列表菜单
export const CONTACT_MENU = ["groups", "contacts"] as ("groups" | "contacts")[];

// 头部操作图标配置
export const HEADER_ACTIONS = {
  NEW_CONVERSATION: {
    type: "BUBBLE_FILL" as const,
    width: 24,
    height: 24,
  },
  ADD_CONTACT: {
    type: "PERSON_ADD_FILL" as const,
    width: 24,
    height: 24,
  },
  CREATE_GROUP: {
    type: "PERSON_DOUBLE_FILL" as const,
    width: 24,
    height: 24,
  },
  MORE: {
    type: "PLUS_IN_CIRCLE" as const,
    width: 24,
    height: 24,
  },
} as const;

// 主题颜色
export const THEME_COLORS = {
  DARK: "#C8CDD0",
  LIGHT: "#464E53",
} as const;

// 弹窗样式配置
export const MODAL_STYLES = {
  CONTACT_LIST: {
    height: "600px",
    padding: "24px",
  },
} as const;

// CallKit 配置
export const CALLKIT_CONFIG = {
  logLevel: "debug" as const,
  encoderConfig: "720p_1" as const,
  enableLogging: true,
} as const;
