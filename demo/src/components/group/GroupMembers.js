import React from "react";
import { connect } from "react-redux";
import Immutable from "seamless-immutable";
import {
  Card,
  Icon,
  Menu,
  Popconfirm,
  Input,
  Modal,
  Table,
  Tooltip,
  Dropdown,
  message
} from "antd";
import _ from "lodash";
import { I18n } from "react-redux-i18n";
import GroupActions from "@/redux/GroupRedux";
import GroupMemberActions from "@/redux/GroupMemberRedux";
import GroupRedux from "@/redux/GroupRedux";
import "./style/index.less";
import { withRouter } from "react-router-dom";
import WebIM from "../../config/WebIM";

const iconStyle = { fontSize: 16, marginRight: 15 };

class GroupMembers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      nickName: ""
    };
  }

  unListen = null;
  componentDidMount() {
    const { login, roomId, groupMember } = this.props;
    this.props.listGroupMemberAsync({ groupId: roomId });
    this.props.getUserAttrs(this.props.roomId);
    this.unListen = this.props.history.listen((location) => {
      if (this.props.location.pathname !== location.pathname) {
        setTimeout(() => {
          this.props.getUserAttrs(this.props.roomId);
        }, 0);
      }
    });
  }

  componentWillUnmount() {
    this.unListen && this.unListen();
  }

  setAdmin = (groupId, name) => this.props.setAdminAsync(groupId, name);

  removeAdmin = (groupId, name) => this.props.removeAdminAsync(groupId, name);

  mute = (groupId, name) => this.props.muteAsync(groupId, name);

  removeMute = (groupId, name) => this.props.removeMuteAsync(groupId, name);

  groupBlockSingle = (groupId, name) =>
    this.props.groupBlockSingleAsync(groupId, name);

  removeSingleGroupMember = (groupId, name) =>
    this.props.removeSingleGroupMemberAsync(groupId, name);

  showModal = () => {
    let { groupInfo, roomId } = this.props;
    this.setState({
      visible: true,
      nickName:
        groupInfo?.groupMemberAttrsMap?.[roomId]?.[WebIM.conn.user]?.nickName
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  handleOk = ({ userId = "" }) => {
    const { nickName } = this.state;
    let opt = {
      groupId: this.props.roomId,
      userId,
      memberAttributes: {
        nickName
      }
    };
    WebIM.conn
      .setGroupMemberAttributes(opt)
      .then((res) => {
        message.success(I18n.t("editGroupNickSuccess"));
        this.props.setGroupMemberAttr({
          groupId: this.props.roomId,
          attributes: { [userId]: { nickName } }
        });
        this.setState({
          visible: false,
          nickName: ""
        });
      })
      .catch((e) => {
        console.log(e, "e");
        message.error(I18n.t("editGroupNickFailed"));
      });
  };

  render() {
    const { login, roomId, groupMember, groupInfo } = this.props;
    // const memberActionMenu = (
    //     <Menu>
    //         <Menu.Item key="1">
    //             <Tooltip>
    //                 <Popconfirm title="确认设为管理员吗？" onConfirm={() => this.setAdmin(record.name)}>
    //                     <a href="#">设为管理</a>
    //                 </Popconfirm>
    //             </Tooltip>
    //         </Menu.Item>
    //     </Menu>
    // )
    const { visible, nickName, current } = this.state;
    let owner;
    let isOwner = false;
    const currentUser = _.get(login, "username", "");
    const members = _.get(groupMember, `${roomId}.byName`, []);
    const admins = _.get(groupMember, `${roomId}.admins`, []);
    const muted = _.get(groupMember, `${roomId}.muted`, []);
    const data = _.map(members, (val, key) => {
      const { affiliation, info, name } = val;
      if (affiliation.toLowerCase() === "owner") {
        owner = key.toLowerCase();
        if (key === currentUser.toLowerCase()) {
          isOwner = true;
        }
      }
      const isAdmin = _.includes(admins, key);
      const isMuted = _.includes(muted, key);
      return {
        name:
          groupInfo?.groupMemberAttrsMap?.[roomId]?.[name]?.nickName ||
          info.nickname ||
          val.name,
        key,
        affiliation,
        isAdmin,
        isMuted,
        id: name
      };
    });
    const columns = [
      {
        title: "Name",
        key: "name",
        dataIndex: "name"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          // const isAdmin = _.includes(admins, currentUser)
          const canOperate =
            record.id !== currentUser && // self
            record.id !== owner && // owner
            (isOwner || _.includes(admins, currentUser));
          // return data.length > 0 && (isAdmin || (isOwner && owner !== record.id))
          const AdminIcons = (props) => {
            const { admins, record } = props;
            return _.includes(admins, record.id) ? (
              <Popconfirm
                title={I18n.t("confirm") + " " + I18n.t("removeAdmin")}
                onConfirm={() => this.removeAdmin(roomId, record.id)}
              >
                <Tooltip title={I18n.t("removeAdmin")} placement="left">
                  <Icon type="arrow-down" style={iconStyle} />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Popconfirm
                title={I18n.t("confirm") + " " + I18n.t("setAdmin")}
                onConfirm={() => this.setAdmin(roomId, record.id)}
              >
                <Tooltip title={I18n.t("setAdmin")} placement="left">
                  <Icon type="arrow-up" style={iconStyle} />
                </Tooltip>
              </Popconfirm>
            );
          };
          const MuteIcons = (props) => {
            const { muted, record } = props;
            return _.hasIn(muted, ["byName", record.id]) ? (
              <Popconfirm
                title={I18n.t("confirm") + " " + I18n.t("removeMute")}
                onConfirm={() => this.removeMute(roomId, record.id)}
              >
                <Tooltip title={I18n.t("removeMute")} placement="left">
                  <Icon type="unlock" style={iconStyle} />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Popconfirm
                title={I18n.t("confirm") + " " + I18n.t("mute")}
                onConfirm={() => this.mute(roomId, record.id)}
              >
                <Tooltip title={I18n.t("mute")} placement="left">
                  <Icon type="lock" style={iconStyle} />
                </Tooltip>
              </Popconfirm>
            );
          };
          return data.length > 0 && canOperate ? (
            <span className="fr">
              {record.isAdmin}

              {/* <Dropdown overlay={memberActionMenu} trigger={['click']}><Icon type="info-circle-o" /></Dropdown> */}
              <AdminIcons record={record} admins={admins} />
              <MuteIcons record={record} muted={muted} />
              <Popconfirm
                title={I18n.t("confirm") + " " + I18n.t("groupBlockSingle")}
                onConfirm={() => this.groupBlockSingle(roomId, record.id)}
              >
                <Tooltip title={I18n.t("groupBlockSingle")} placement="left">
                  <Icon type="frown-o" style={iconStyle} />
                </Tooltip>
              </Popconfirm>
              <Popconfirm
                title={
                  I18n.t("confirm") + " " + I18n.t("removeSingleGroupMember")
                }
                onConfirm={() =>
                  this.removeSingleGroupMember(roomId, record.id)
                }
              >
                <Tooltip
                  title={I18n.t("removeSingleGroupMember")}
                  placement="left"
                >
                  <Icon type="usergroup-delete" style={iconStyle} />
                </Tooltip>
              </Popconfirm>
            </span>
          ) : null;
        }
      }
    ];
    return (
      <>
        <Card
          title={I18n.t("myGroupNick")}
          extra={
            <div
              onClick={() => {
                this.showModal();
              }}
              style={{ cursor: "pointer" }}
            >
              <Icon type="edit" />
            </div>
          }
        >
          <span>
            {
              groupInfo?.groupMemberAttrsMap?.[roomId]?.[WebIM.conn.user]
                ?.nickName
            }
          </span>
          <Modal
            visible={visible}
            onCancel={this.hideModal}
            cancelText={I18n.t("cancel")}
            okText={I18n.t("confirm")}
            title={I18n.t("editGroupNickname")}
            onOk={() => {
              this.handleOk({ userId: currentUser });
            }}
          >
            <Input
              value={nickName}
              onChange={(e) => {
                this.setState({ nickName: e.target.value });
              }}
              placeholder={I18n.t("editNickTip")}
            ></Input>
          </Modal>
        </Card>
        <Card
          title={I18n.t("members")}
          bordered={false}
          noHovering={true}
          className="group-member-wrapper"
        >
          {/* <Menu className="group-member-list">
                    {members.map((val, idx) => <Menu.Item key={idx} className="group-member-item"><span>{val+'sss'}</span></Menu.Item>)}
                </Menu> */}
          <Table
            columns={columns}
            dataSource={data}
            showHeader={false}
            pagination={false}
            scroll={{ y: 300 }}
            className="group-member-list"
          />
        </Card>
      </>
    );
  }
}

export default connect(
  ({ entities, login }) => ({
    login,
    groupMember: entities.groupMember,
    groupInfo: entities.group
  }),
  (dispatch) => ({
    listGroupMemberAsync: (opt) =>
      dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
    getUserAttrs: (groupId) => dispatch(GroupRedux.getUserAttrs(groupId)),
    setGroupMemberAttr: (res) => dispatch(GroupRedux.setGroupMemberAttr(res)),
    setAdminAsync: (groupId, name) =>
      dispatch(GroupMemberActions.setAdminAsync(groupId, name)),
    removeAdminAsync: (groupId, name) =>
      dispatch(GroupMemberActions.removeAdminAsync(groupId, name)),
    muteAsync: (groupId, name) =>
      dispatch(GroupMemberActions.muteAsync(groupId, name)),
    removeMuteAsync: (groupId, name) =>
      dispatch(GroupMemberActions.removeMuteAsync(groupId, name)),
    groupBlockSingleAsync: (groupId, name) =>
      dispatch(GroupMemberActions.groupBlockSingleAsync(groupId, name)),
    removeSingleGroupMemberAsync: (groupId, name) =>
      dispatch(GroupMemberActions.removeSingleGroupMemberAsync(groupId, name))
  })
)(withRouter(GroupMembers));
