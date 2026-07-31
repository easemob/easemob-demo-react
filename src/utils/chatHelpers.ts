import {
  MESSAGE_ACTIONS,
  THREAD_MESSAGE_ACTIONS,
  HEADER_ACTIONS,
  THEME_COLORS,
} from "../constants/chat";

/**
 * 聊天相关工具函数
 */

// 创建消息操作配置
export const createMessageActions = (includeTranslation: boolean = false) => {
  return [
    { content: MESSAGE_ACTIONS.FORWARD, onClick: () => {} },
    { content: MESSAGE_ACTIONS.REPLY, onClick: () => {} },
    { content: MESSAGE_ACTIONS.UNSEND, onClick: () => {} },
    { content: MESSAGE_ACTIONS.MODIFY, onClick: () => {} },
    { content: MESSAGE_ACTIONS.SELECT, onClick: () => {} },
    { content: MESSAGE_ACTIONS.PIN, onClick: () => {} },
    {
      visible: includeTranslation,
      content: MESSAGE_ACTIONS.TRANSLATE,
      onClick: () => {},
    },
    { content: MESSAGE_ACTIONS.DELETE, onClick: () => {} },
  ];
};

// 创建 Thread 消息操作配置
export const createThreadMessageActions = () => {
  return [
    { content: THREAD_MESSAGE_ACTIONS.REPLY, onClick: () => {} },
    { content: THREAD_MESSAGE_ACTIONS.TRANSLATE, onClick: () => {} },
    { content: THREAD_MESSAGE_ACTIONS.MODIFY, onClick: () => {} },
    { content: THREAD_MESSAGE_ACTIONS.SELECT, onClick: () => {} },
    { content: THREAD_MESSAGE_ACTIONS.FORWARD, onClick: () => {} },
    { content: THREAD_MESSAGE_ACTIONS.PIN, onClick: () => {} },
  ];
};

// 创建头部操作图标配置
export const createHeaderIcon = (
  actionType: keyof typeof HEADER_ACTIONS,
  themeMode: string
) => {
  const action = HEADER_ACTIONS[actionType];
  return {
    type: action.type,
    width: action.width,
    height: action.height,
    color: themeMode === "dark" ? THEME_COLORS.DARK : THEME_COLORS.LIGHT,
  };
};

// 获取主题颜色
export const getThemeColor = (themeMode: string) => {
  return themeMode === "dark" ? THEME_COLORS.DARK : THEME_COLORS.LIGHT;
};
