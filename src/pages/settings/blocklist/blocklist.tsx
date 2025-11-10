import React, { useContext, useState } from "react";
import i18next from "../../../i18n";
import {
  Icon,
  Switch,
  RootContext,
  Blocklist as BlocklistUIKit,
  useIsMobile,
} from "easemob-chat-uikit";
import UserInfo from "../../../components/userInfo/userInfo";
import classNames from "classnames";

const Blocklist = (props: { onBack?: () => void }) => {
  const { onBack } = props;
  const isMobile = useIsMobile();
  const prefixCls = "blocklist";

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;

  const [selectedUser, setSelectedUser] = useState("");
  const handleItemClick = (item: {
    avatarUrl?: string;
    nickname?: string;
    userId: string;
  }) => {
    console.log(item);
    setSelectedUser(item.userId);
  };
  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": themeMode === "dark",
        "mobile-fullwidth": isMobile,
      })}
    >
      <header className="setting-personal-header">
        {isMobile && (
          <Icon
            type="ARROW_LEFT"
            width={24}
            height={24}
            onClick={onBack}
          ></Icon>
        )}
        {i18next.t("blocklist")}
      </header>
      <main className="setting-personal-main">
        <BlocklistUIKit
          renderHeader={() => null}
          style={{ flex: 1 }}
          onItemClick={handleItemClick}
        ></BlocklistUIKit>

        {selectedUser && (
          <div
            style={
              isMobile
                ? {
                    width: "100%",
                    position: "absolute",
                  }
                : {
                    width: "360px",
                    borderLeft: `1px solid ${
                      themeMode == "dark" ? "#464E53" : "#E3E6E8"
                    }`,
                  }
            }
          >
            <UserInfo
              itemConfig={{
                remark: false,
                silent: false,
                block: true,
                clearMsg: false,
                deleteContact: true,
                onBlockedChange: (e) => {
                  if (!e.target.checked) {
                    setSelectedUser("");
                  }
                },
                onDeleteContact: () => {
                  setSelectedUser("");
                },
              }}
              conversation={{
                chatType: "singleChat",
                conversationId: selectedUser,
              }}
              onBack={() => {
                setSelectedUser("");
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Blocklist;
