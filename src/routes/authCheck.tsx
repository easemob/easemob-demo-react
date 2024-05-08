import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, ComponentType, useState, ReactElement } from "react";

function AuthCheck({ children }: { children: ReactElement<any, any> }) {
  // 获取用户信息或者登录状态，这个getUser可以是任何获取用户信息或者认证信息的方法
  //   const user = getUser();
  let navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // 检查用户是否已登录
    const checkAuthentication = () => {
      const isAuthenticated: boolean = !!sessionStorage.getItem("webImAuth");
      setIsAuthenticated(isAuthenticated);
      if (!isAuthenticated) {
        navigate("/login"); //跳转到登陆页面
      }
    };

    checkAuthentication();
  }, []);

  return isAuthenticated ? children : <></>;
}

export default AuthCheck;
