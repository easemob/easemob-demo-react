import React, { ChangeEvent, useState, useRef, useContext } from "react";
import ReactDom from "react-dom";
import "./personalInfo.scss";
import i18next from "../../../i18n";
import {
  Avatar,
  rootStore,
  Icon,
  Modal,
  Input,
  RootContext,
} from "easemob-chat-uikit";
import { uploadImage } from "../../../service/avatar";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import ImageCrop from "../../../components/imageCrop/imageCrop";
import toast from "../../../components/toast/toast";
const PersonalInfo = () => {
  const prefixCls = "user-info";
  const { addressStore } = rootStore;
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);

  const [nicknameValue, setNicknameValue] = useState(
    addressStore.appUsersInfo[rootStore.client.user]?.nickname
  );
  const editNickname = () => {
    addressStore.setAppUserInfo({
      ...addressStore.appUsersInfo,
      [rootStore.client.user]: {
        ...addressStore.appUsersInfo[rootStore.client.user],
        nickname: nicknameValue,
      },
    });
    setNicknameModalVisible(false);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value.length > 20) return;

    rootStore.client
      .updateUserInfo({
        nickname: e.target.value,
      })
      .then(() => {
        setNicknameValue(e.target.value);
      });
  };

  const imageEl = useRef<HTMLInputElement>(null);
  const selectImage = () => {
    console.log(123);
    imageEl.current?.focus();
    setTimeout(() => {
      imageEl.current?.click();
    }, 0);
  };
  const [img, setImg] = useState<string>("");
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let file = imageEl.current?.files?.[0];
    console.log("file", file);
    const url = URL.createObjectURL(file as File);
    setImg(url);
    setCropModalOpen(true);
    imageEl!.current!.value = "";
    // const formData = new FormData();
    // if (!file) return;

    // formData.append("file", file);
    // uploadImage(formData).then((url) => {
    //   rootStore.addressStore.setAppUserInfo({
    //     ...addressStore.appUsersInfo,
    //     [rootStore.client.user]: {
    //       ...addressStore.appUsersInfo[rootStore.client.user],
    //       avatarurl: url,
    //     },
    //   });
    // });
    // imageEl!.current!.value = "";
  };

  const handleUploadImage = (url: string) => {
    fetch(url).then((res) => {
      res.blob().then((blob) => {
        console.log("blob", blob);
        const formData = new FormData();
        formData.append("file", blob);
        console.log("formData", formData);
        uploadImage(formData).then((url) => {
          rootStore.addressStore.setAppUserInfo({
            ...addressStore.appUsersInfo,
            [rootStore.client.user]: {
              ...addressStore.appUsersInfo[rootStore.client.user],
              avatarurl: url,
            },
          });
          setCropModalOpen(false);
        });
      });
    });
  };

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;

  const handleCopy = () => {
    var textArea = document.createElement("textarea");
    textArea.value = rootStore.client.user;
    // 添加到 DOM 元素中，方便调用 select 方法
    document.body.appendChild(textArea);
    // 选中文本
    textArea.select();
    // 执行复制命令
    document.execCommand("copy");
    // 删除临时元素
    document.body.removeChild(textArea);
    toast.success(i18next.t("copySuccess"));
  };
  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": themeMode === "dark",
      })}
    >
      <header className="setting-personal-header">
        {i18next.t("personalInfo")}
      </header>
      <main className="setting-personal-main">
        <section className="setting-personal-content">
          <div className={`${prefixCls}-header`}>
            <Avatar
              src={addressStore.appUsersInfo[rootStore.client.user]?.avatarurl}
              size={100}
              shape={theme?.avatarShape}
            >
              {addressStore.appUsersInfo[rootStore.client.user]?.nickname}
            </Avatar>
            <div>
              <div className={`${prefixCls}-header-name`}>
                {addressStore.appUsersInfo[rootStore.client.user]?.nickname}
              </div>
              <div className={`${prefixCls}-header-id`}>
                <div>{i18next.t("easemob")} ID:</div>
                {rootStore.client.user}
                <Icon
                  type="DOC_ON_DOC"
                  style={{ cursor: "copy" }}
                  onClick={handleCopy}
                ></Icon>
              </div>
            </div>
          </div>

          <div className={`${prefixCls}-content`}>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                onClick={() => {
                  setNicknameModalVisible(true);
                }}
              >
                <span>{i18next.t("nickname")}</span>
                <div>
                  {addressStore.appUsersInfo[rootStore.client.user]?.nickname}
                  <Icon type="SLASH_IN_BOX" width={24} height={24}></Icon>
                </div>
              </div>
            </div>

            <div className={`${prefixCls}-content-item`}>
              <div
                style={{ position: "relative" }}
                className={`${prefixCls}-content-item-box`}
                onClick={() => {
                  // setNicknameModalVisible(true);
                }}
              >
                <span>{i18next.t("avatar")}</span>
                <div>
                  <Avatar
                    src={
                      addressStore.appUsersInfo[rootStore.client.user]
                        ?.avatarurl
                    }
                    size={40}
                    shape={theme?.avatarShape}
                  >
                    {addressStore.appUsersInfo[rootStore.client.user]?.nickname}
                  </Avatar>
                  <Icon
                    type="SLASH_IN_BOX"
                    width={24}
                    height={24}
                    color="#F9FAFA"
                    onClick={selectImage}
                    style={{
                      position: "absolute",
                      right: "8px",
                    }}
                  ></Icon>
                </div>
              </div>
            </div>
            <ImageCrop
              open={cropModalOpen}
              onCancel={() => {
                setCropModalOpen(false);
              }}
              title={i18next.t("uploadProfileImage")}
              onUpload={handleUploadImage}
              img={img}
            ></ImageCrop>
          </div>
        </section>
      </main>

      <Modal
        open={nicknameModalVisible}
        onCancel={() => {
          setNicknameModalVisible(false);
        }}
        onOk={editNickname}
        title={i18next.t("nickname")}
        wrapClassName="modify-message-modal"
      >
        <Input
          className="cui-group-nickname-input"
          maxLength={20}
          value={nicknameValue}
          onChange={handleNicknameChange}
        />
      </Modal>
      <input
        id="btn"
        type="file"
        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
        ref={imageEl}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default observer(PersonalInfo);
