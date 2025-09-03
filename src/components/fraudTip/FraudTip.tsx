import React from "react";
import { Icon } from "easemob-chat-uikit";
import toast from "../toast/toast";
import "./FraudTip.scss";

interface FraudTipProps {
  visible: boolean;
  onClose: () => void;
}

const FraudTip: React.FC<FraudTipProps> = ({ visible, onClose }) => {
  const handleReport = () => {
    toast.success("感谢您的举报，我们将尽快处理");
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fraud-tip">
      <div className="fraud-content">
        <div className="fraud-main">
          <Icon
            type="EXCLAMATION_MARK_IN_CIRCLE_FILL"
            width={16}
            height={16}
            style={{ marginRight: "8px" }}
            color="var(--cui-primary-color5)"
          />
          <div className="fraud-text">
            请勿轻信任何关于汇款、中奖等信息，务必提高警惕，谨慎对待来自陌生号码的电话。如遇可疑情况，请及时向相关部门反馈并采取必要的防范措施。
            <span className="fraud-report" onClick={handleReport}>
              点我举报
            </span>
          </div>
        </div>
        <Icon
          type="CLOSE"
          className="fraud-content-close"
          width={16}
          height={16}
          style={{ marginLeft: "8px" }}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default FraudTip; 