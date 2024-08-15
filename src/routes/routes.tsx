import React from "react";
import {
  HashRouter,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login/login";
// import Dev from "../pages/dev";
import ChatApp from "../pages/main/main";
// import AuthCheck from "./authCheck";
const Dev = React.lazy(() => import("../pages/dev"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<ChatApp></ChatApp>} />
        <Route path="*" element={<div>走丢啦！</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
