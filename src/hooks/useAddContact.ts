import { useCallback } from "react";
import { rootStore } from "easemob-chat-uikit";
import { getUserIdWithPhoneNumber } from "../service/user";
import toast from "../components/toast/toast";
import i18next from "../i18n";
import { PHONE_REGEX } from "../constants/chat";

/**
 * 添加联系人逻辑 Hook
 */
export const useAddContact = (
  setAddContactVisible: (visible: boolean) => void
) => {
  /**
   * 验证是否为手机号格式
   */
  const isPhoneNumber = useCallback((userId: string): boolean => {
    return PHONE_REGEX.test(userId);
  }, []);

  /**
   * 检查是否已经是好友
   */
  const isAlreadyFriend = useCallback((chatUserId: string): boolean => {
    return rootStore.addressStore.contacts.some(
      (contact) => contact.userId === chatUserId
    );
  }, []);

  /**
   * 通过环信ID添加联系人
   */
  const addContactById = useCallback(
    async (userId: string) => {
      try {
        await rootStore.addressStore.addContact(userId);
        setAddContactVisible(false);
        toast.success(i18next.t("friendRequestSent"));
      } catch (error) {
        console.error("添加联系人失败:", error);
        toast.error(i18next.t("addContactFailed"));
      }
    },
    [setAddContactVisible]
  );

  /**
   * 通过手机号添加联系人
   */
  const addContactByPhone = useCallback(
    async (phoneNumber: string) => {
      try {
        const response = await getUserIdWithPhoneNumber(
          phoneNumber,
          rootStore.client.getCurrentUserId()
        );

        if (response.status === 200) {
          const chatUserId = response.data.chatUserName;

          if (isAlreadyFriend(chatUserId)) {
            toast.error(i18next.t("alreadyFriend"));
            return;
          }

          await addContactById(chatUserId);
        } else {
          toast.error(i18next.t("userNotExist"));
        }
      } catch (error) {
        console.error("通过手机号添加联系人失败:", error);
        toast.error(i18next.t("userNotExist"));
      }
    },
    [addContactById, isAlreadyFriend]
  );

  /**
   * 统一的添加联系人处理函数
   */
  const handleAddContact = useCallback(
    async (userId: string) => {
      if (!userId.trim()) {
        toast.error(i18next.t("pleaseEnterUserIdOrPhone"));
        return;
      }

      if (isPhoneNumber(userId)) {
        await addContactByPhone(userId);
      } else {
        await addContactById(userId);
      }
    },
    [isPhoneNumber, addContactByPhone, addContactById]
  );

  return {
    handleAddContact,
    isPhoneNumber,
    isAlreadyFriend,
  };
};
