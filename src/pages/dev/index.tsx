import "./dev.scss";
import i18next from "../../i18n";
import { useNavigate } from "react-router-dom";
import ConfigForm from "./configForm";
import LoginForm from "./loginForm";
import { DEMO_VERSION, SDK_VERSION, UIKIT_VERSION } from "../../config";
const Dev = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="dev-container">
      <LoginForm></LoginForm>
      <ConfigForm></ConfigForm>
      <div className="dev-copyright">
        {`© 2024 环信，SDK版本：${SDK_VERSION} UIkit版本：${UIKIT_VERSION} Demo版本：${DEMO_VERSION}`}
        <span onDoubleClick={goLogin}>{"</>"}</span>
      </div>
    </div>
  );
};

export default Dev;
