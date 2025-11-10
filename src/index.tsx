import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "easemob-chat-uikit";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import register, { unregister } from "./serviceWorker";
register();
unregister();

function updateViewportHeight() {
  // 计算动态视口高度
  const dvh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--dvh", `${dvh}px`);

  // // 计算小视口高度（可选）
  // const svh = Math.min(window.innerHeight, screen.height) * 0.01;
  // document.documentElement.style.setProperty("--svh", `${svh}px`);

  // // 计算大视口高度（可选）
  // const lvh = Math.max(window.innerHeight, screen.height) * 0.01;
  // document.documentElement.style.setProperty("--lvh", `${lvh}px`);
}

// 初始化并监听窗口变化
updateViewportHeight();
window.addEventListener("resize", updateViewportHeight);
window.addEventListener("orientationchange", updateViewportHeight);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div>
    <ReduxProvider store={store}>
      <App></App>
    </ReduxProvider>
  </div>
);
