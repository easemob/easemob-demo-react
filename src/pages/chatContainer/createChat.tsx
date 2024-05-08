import {
  Input,
  ContactList,
  Popover,
  Tooltip,
  rootStore,
  Avatar,
  RootContext,
} from "easemob-chat-uikit";
import { useRef, useEffect, ChangeEvent, useState, useContext } from "react";
import classNames from "classnames";
import i18next from "../../i18n";
interface CreateChatProps {
  onClosed?: () => void;
}
const CreateChat = (props: CreateChatProps) => {
  const { onClosed } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus?.();
    //@ts-ignore
    handleChange({ target: { value: "" } });
  }, []);

  const contacts = rootStore.addressStore.contacts;

  const [searchedContacts, setSearchedContacts] = useState<
    { nickname: string; remark?: string; userId: string; silent?: boolean }[]
  >([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, contacts);

    if (e.target.value.length > 0) {
      setShowSearch(true);
    } else {
      //setShowSearch(false);
    }
    const searched = contacts.filter((contact) => {
      if (contact.remark) {
        return contact.remark.includes(e.target.value);
      } else if (contact.nickname) {
        return contact.nickname.includes(e.target.value);
      } else {
        return contact.userId.includes(e.target.value);
      }
    });
    setSearchedContacts(searched);
  };

  const [selectedContact, setSelectedContact] = useState<{
    nickname: string;
    remark?: string;
    userId: string;
    silent?: boolean;
  }>();

  const [showSearch, setShowSearch] = useState(true);

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;

  return (
    <div
      className={classNames("create-chat-container", {
        "create-chat-container-dark": themeMode == "dark",
      })}
    >
      <header>
        <span style={{ marginRight: "8px" }}>
          {i18next.t("newConversation")}
        </span>

        <Input
          ref={inputRef}
          onChange={handleChange}
          onClear={() => {
            onClosed?.();
          }}
          onBlur={() => {
            console.log("showSearch", showSearch);
            setTimeout(() => {
              setShowSearch(false);
              onClosed?.();
            }, 500);

            // !showSearch && onClosed?.();
          }}
        />
      </header>
      <main>
        <div
          className={classNames("create-chat-search-content", {
            displayNone: !showSearch,
          })}
        >
          {searchedContacts.length > 0 ? (
            searchedContacts.map((contact) => {
              return (
                <div
                  className={classNames("search-content-item", {
                    "search-content-item-active":
                      selectedContact?.userId == contact.userId,
                  })}
                  key={contact.userId}
                  onClick={() => {
                    setSelectedContact(contact);
                    rootStore.conversationStore.addConversation({
                      chatType: "singleChat",
                      conversationId: contact.userId,
                      name:
                        contact.remark || contact.nickname || contact.userId,
                      lastMessage: {} as never,
                      unreadCount: 0,
                    });
                    rootStore.conversationStore.setCurrentCvs({
                      chatType: "singleChat",
                      name:
                        contact.remark || contact.nickname || contact.userId,
                      conversationId: contact.userId,
                      unreadCount: 0,
                    });
                    onClosed?.();
                  }}
                >
                  <Avatar
                    src={
                      rootStore.addressStore.appUsersInfo[contact.userId]
                        ?.avatarurl
                    }
                  >
                    {" "}
                    {contact.remark || contact.nickname || contact.userId}
                  </Avatar>
                  <div className={classNames("search-content-item-name")}>
                    {contact.remark || contact.nickname || contact.userId}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="search-content-item search-content-none">
              {i18next.t("noResults")}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateChat;
