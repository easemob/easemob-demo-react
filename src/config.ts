export const UIKIT_VERSION = "1.7.1";
export const SDK_VERSION = "4.15.1";
export const DEMO_VERSION = "2.4.0";

export const PRESENCE_CONFIG = [
  "Online",
  "Offline",
  "Away",
  "Busy",
  "Do Not Disturb",
  "Custom",
];

// 默认路由配置，可通过环境变量 REACT_APP_DEFAULT_ROUTE 控制
// 本地开发可设置为 "/login"，生产环境可设置为 "/dev"
export const DEFAULT_ROUTE = process.env.REACT_APP_DEFAULT_ROUTE || "/dev";
