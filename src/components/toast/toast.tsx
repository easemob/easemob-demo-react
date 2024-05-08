import toast, { Toaster } from "react-hot-toast";
import { ReactElement } from "react";
import { Icon } from "easemob-chat-uikit";
export { Toaster };
const customToast: any = toast;

customToast.success = (message: string, options = {}) => {
  // @ts-ignore
  const { theme = "light" } = options;

  return toast(message, {
    duration: 4000,
    position: "top-center",

    //@ts-ignore Styling
    style: {
      background: theme === "dark" ? "#F9FAFA" : "#2F3437",
      color: theme === "dark" ? "#171A1C" : "#F9FAFA",
    },
    className: "",

    // Custom Icon
    icon: (
      <Icon
        type="CHECK_IN_CIRCLE_FILL"
        width={24}
        height={24}
        color="#00FF95"
      ></Icon>
    ),

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
    ...options,
  });
};

customToast.info = (message: string, options = {}) => {
  // @ts-ignore
  const { theme = "light" } = options;
  return toast(message, {
    duration: 4000,
    position: "top-center",

    // Styling
    style: {
      background: theme === "dark" ? "#F9FAFA" : "#2F3437",
      color: theme === "dark" ? "#171A1C" : "#F9FAFA",
    },
    className: "",

    // Custom Icon
    icon: (
      <Icon
        type="CANDLE_IN_CIRCLE_FILL"
        width={24}
        height={24}
        color="#33B1FF"
      ></Icon>
    ),

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
    ...options,
  });
};

customToast.error = (message: string, options = {}) => {
  // @ts-ignore
  const { theme = "light" } = options;
  return toast(message, {
    duration: 4000,
    position: "top-center",

    // Styling
    style: {
      background: theme === "dark" ? "#F9FAFA" : "#2F3437",
      color: theme === "dark" ? "#171A1C" : "#F9FAFA",
    },
    className: "",

    // Custom Icon
    icon: (
      <Icon
        type="EXCLAMATION_MARK_IN_CIRCLE_FILL"
        width={24}
        height={24}
        color="#FF3355"
      ></Icon>
    ),

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
    ...options,
  });
};

export default customToast;
