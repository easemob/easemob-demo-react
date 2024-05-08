import { useState } from "react";
import {
  ContactList,
  ContactDetail,
  Header,
  Icon,
  Modal,
  Input,
  rootStore,
} from "easemob-chat-uikit";
import "./contacts.scss";
import toast from "../../components/toast/toast";
import i18next from "../../i18n";
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
                  title={i18next.t("addContact")}
                  style={{ cursor: "pointer" }}
                >
                  <Icon
                    type="PERSON_ADD"
                    width={24}
                    height={24}
                    onClick={() => {
                      setAddContactVisible(true);
                    }}
                  ></Icon>
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
          rootStore.addressStore.addContact(userId);
          setAddContactVisible(false);
        }}
        okText={i18next.t("add")}
        closable={false}
        title={i18next.t("addContact")}
      >
        <>
          <div className="add-contact">
            <Input
              placeholder={i18next.t("enterUserID")}
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
