import React, { useState, useContext } from "react";
import { Icon } from "easemob-chat-uikit";
// import { ChatroomContext } from "../../context";
import "./themeSwitch.scss";
interface ThemeSwitchProps {
  onChange?: (type: "sun" | "moon") => void;
}
const ThemeSwitch = (props: ThemeSwitchProps) => {
  const style = {
    background: "#009EFF",
    borderRadius: "12px",
    width: "24px",
    height: "24px",
    fill: "#F9FAFA",
  };
  //   const context = useContext(ChatroomContext);
  const { onChange } = props;
  const [activeType, setActiveType] = useState("sun");
  const handleClick = (type: "sun" | "moon") => {
    setActiveType(type);
    onChange?.(type);
  };
  return (
    <div
      className={`themeSwitch-box ${activeType == "moon" ? "theme-dark" : ""}`}
    >
      <div title="亮色主题" style={{ display: "flex" }}>
        <Icon
          type="SUN"
          width={24}
          height={24}
          onClick={() => {
            handleClick("sun");
          }}
          style={
            activeType == "sun"
              ? style
              : { width: "24px", height: "24px", fill: "#171A1C" }
          }
        ></Icon>
      </div>
      <div title="暗色主题" style={{ display: "flex" }}>
        <Icon
          type="MOON"
          width={24}
          height={24}
          onClick={() => {
            handleClick("moon");
          }}
          style={
            activeType == "moon"
              ? style
              : { width: "24px", height: "24px", fill: "#ACB4B9" }
          }
        ></Icon>
      </div>
    </div>
  );
};

export default ThemeSwitch;
