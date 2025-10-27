export const UIKIT_VERSION = "2.1.0";
export const SDK_VERSION = "4.16.0";
export const DEMO_VERSION = "2.5.1";

// 在线状态配置
export const PRESENCE_CONFIG = [
  "Online",
  "Offline",
  "Away",
  "Busy",
  "Do Not Disturb",
  "Custom",
];

// 默认路由配置，可通过环境变量 REACT_APP_DEFAULT_ROUTE 控制
// 本地开发可设置为 "/dev"，生产环境可设置为 "/login"
export const DEFAULT_ROUTE = process.env.REACT_APP_DEFAULT_ROUTE || "/dev";
