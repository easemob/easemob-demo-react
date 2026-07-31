import { useNavigate } from "react-router-dom";
import { useEffect, useState, ReactElement } from "react";

function AuthCheck({ children }: { children: ReactElement<any, any> }) {
  const navigate = useNavigate();
  // 初始先按 session 判断，避免首帧闪一下空内容；真正连接态由 /main 恢复登录补齐。
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!sessionStorage.getItem("webImAuth")
  );

  useEffect(() => {
    const hasSession = !!sessionStorage.getItem("webImAuth");
    setIsAuthenticated(hasSession);
    if (!hasSession) {
      navigate("/login");
    }
  }, [navigate]);

  return isAuthenticated ? children : <></>;
}

export default AuthCheck;
