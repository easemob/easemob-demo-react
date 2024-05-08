import React, { useEffect, useState } from "react";
import {
  Modal,
  UserSelect,
  rootStore,
  useAddressContext,
} from "easemob-chat-uikit";
import toast from "react-hot-toast";
const ALLOW_MAX_USER = 16;
interface UserInviteModalProps {
  onClose?: () => void;
  onInvite?: (
    userId: { name: string; id: string; avatarurl?: string }[]
  ) => void;
  visible: boolean;
  checkedUsers?: UserInfo[];
  groupId: string;
  title: string;
}
interface UserInfo {
  avatarUrl?: string;
  nickname?: string;
  userId: string;
  attributes?: {
    nickName?: string;
    avatarurl?: string;
  };
}
const UserInviteModal = (props: UserInviteModalProps) => {
  const {
    visible,
    onInvite,
    onClose,
    checkedUsers = [],
    groupId,
    title,
  } = props;
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([
    { userId: rootStore.client.user },
  ]);
  const [disabled, setDisabled] = useState(false);
  const { getGroupMembers: getGroupMembers2 } = useAddressContext();

  const rtcGroup = rootStore.addressStore.groups.filter((item) => {
    // @ts-ignore
    return item.groupid == groupId;
  });
  const getGroupMembers = (groupId: string) => {
    if (rtcGroup.length > 0) {
      if (!rtcGroup[0]?.members) {
        getGroupMembers2(groupId, true);
      }

      const members = rtcGroup[0]?.members?.map((item) => {
        const member = { ...item };
        if (!item?.attributes?.nickName) {
          if (!member.attributes) {
            member.attributes = {};
          }

          member.attributes.nickName =
            rootStore.addressStore.appUsersInfo[item.userId]?.nickname;
        }
        if (!item?.attributes?.avatarurl) {
          member.attributes.avatarurl =
            rootStore.addressStore.appUsersInfo[item.userId]?.avatarurl;
        }
        // @ts-ignore
        member.nickname =
          rootStore.addressStore.appUsersInfo[item.userId]?.nickname;
        // @ts-ignore
        member.avatarUrl =
          rootStore.addressStore.appUsersInfo[item.userId]?.avatarurl;
        return member;
      });
      console.log("members >>>", members);
      setUsers(members as any as UserInfo[]);
    }
  };

  useEffect(() => {
    if (visible) {
      getGroupMembers(groupId);
    }
  }, [groupId, visible, rtcGroup?.[0]?.members?.length]);

  console.log("checkedUsers", checkedUsers);
  return (
    <UserSelect
      title={title}
      onCancel={() => {
        onClose?.();
      }}
      onOk={() => {
        let contacts =
          selectedUsers.length > 0
            ? selectedUsers.map((item) => {
                return {
                  id: item.userId,
                  name: item?.attributes?.nickName || item.userId,
                  avatarurl: item?.attributes?.avatarurl,
                };
              })
            : [];
        console.log("contacts", contacts);
        onInvite?.(contacts);
      }}
      enableMultipleSelection
      onUserSelect={(user, users) => {
        if (users.length >= ALLOW_MAX_USER) {
          setDisabled(true);
        }
        setSelectedUsers(users as any);
      }}
      users={users}
      checkedUsers={checkedUsers}
      open={visible}
      disabled={disabled}
    ></UserSelect>
  );
};

export default UserInviteModal;
