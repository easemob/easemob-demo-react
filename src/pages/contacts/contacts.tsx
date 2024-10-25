import { useState } from "react";
import {
  ContactList,
  ContactDetail,
  Header,
  Icon,
  Modal,
  Input,
  rootStore,
  Button,
} from "easemob-chat-uikit";
import "./contacts.scss";
import toast from "../../components/toast/toast";
import i18next from "../../i18n";
import { getUserIdWithPhoneNumber } from "../../service/login";
interface ContactsProps {
  onMessageClick?: () => void;
  onVideoCall?: () => void;
  onAudioCall?: () => void;
}
const Contacts = ({
  onMessageClick,
  onVideoCall,
  onAudioCall,
}: ContactsProps) => {
  const [contactData, setContactData] = useState({
    id: "",
    name: "",
    type: "contact",
  });

  const [addContactVisible, setAddContactVisible] = useState(false);

  const [userId, setUserId] = useState("");
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserId(e.target.value);
  };
  return (
    <div className="contacts-container">
      <div className="contacts-container-list">
        <ContactList
          header={
            <Header
              avatar={<></>}
              content={i18next.t("contacts")}
              suffixIcon={
                <div
                  className="cui-header-iconBox"
                  title={i18next.t("addContact")}
                  style={{ cursor: "pointer" }}
                >
                  <Button type="text" shape="circle">
                    <Icon
                      type="PERSON_ADD"
                      width={24}
                      height={24}
                      onClick={() => {
                        setAddContactVisible(true);
                      }}
                    ></Icon>
                  </Button>
                </div>
              }
            ></Header>
          }
          // className="conversation"
          onItemClick={(data) => {
            let type = data.type;
            // if (data.type == "request") {
            //   type = "contact";
            // }
            console.log("点击联系人", data);
            setContactData({
              id: data.id,
              name: data.name,
              type: type,
            });
          }}
        ></ContactList>
      </div>
      <div className="contacts-container-detail">
        <ContactDetail
          // @ts-ignore
          data={contactData}
          onMessageBtnClick={() => {
            onMessageClick?.();
          }}
          onVideoCall={() => {
            console.log("onVideoCall");
            onVideoCall?.();
          }}
          onAudioCall={() => {
            console.log("onAudioCall");
            onAudioCall?.();
          }}
          onUserIdCopied={(userId) => {
            toast.success(i18next.t("copySuccess"));
          }}
        ></ContactDetail>
      </div>

      {/** 添加联系人弹窗 */}
      <Modal
        open={addContactVisible}
        onCancel={() => {
          setAddContactVisible(false);
        }}
        onOk={() => {
          if (!/^\d{11}$/.test(userId)) {
            rootStore.addressStore.addContact(userId);
            setAddContactVisible(false);
          } else {
            // 根据手机号获取环信id
            getUserIdWithPhoneNumber(userId, rootStore.client.user)
              .then((res) => {
                if (res.status === 200) {
                  const chatUserId = res.data.chatUserName;
                  // 判断是不是好友
                  if (
                    rootStore.addressStore.contacts.some(
                      (item) => item.userId === chatUserId
                    )
                  ) {
                    toast.error(i18next.t("alreadyFriend"));
                    return;
                  }

                  rootStore.addressStore.addContact(chatUserId);
                  setAddContactVisible(false);
                } else {
                  toast.error(i18next.t("userNotExist"));
                }
              })
              .catch(() => {
                toast.error(i18next.t("userNotExist"));
              });
          }
        }}
        okText={i18next.t("add")}
        closable={false}
        title={i18next.t("addContactByUserIdOrPhone")}
      >
        <>
          <div className="add-contact">
            <Input
              placeholder={i18next.t("enterUserIDOrPhoneNum")}
              className="add-contact-input"
              onChange={handleUserIdChange}
            ></Input>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default Contacts;
