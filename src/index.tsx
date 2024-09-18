import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "easemob-chat-uikit";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div>
    <ReduxProvider store={store}>
      <App></App>
    </ReduxProvider>
  </div>
);
