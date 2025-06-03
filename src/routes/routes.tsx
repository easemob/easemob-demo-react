import React from "react";
import {
  HashRouter,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
// import Login from "../pages/login/login";
import Dev from "../pages/dev";
import ChatApp from "../pages/main/main";
import AuthCheck from "./authCheck";
// const Dev = React.lazy(() => import("../pages/dev"));
const Login = React.lazy(() => import("../pages/login/login"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dev" />} />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Login></Login>
            </React.Suspense>
          }
        />
        <Route path="/dev" element={<Dev></Dev>} />
        <Route
          path="/main"
          element={
            <AuthCheck>
              <ChatApp></ChatApp>
            </AuthCheck>
          }
        />
        <Route path="*" element={<div>走丢啦！</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
