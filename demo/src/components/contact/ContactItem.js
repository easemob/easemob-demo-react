import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge, Avatar } from 'antd'
import ContactHead from './ContactHead'
import WebIM from '@/config/WebIM'
import { MENTION_ALL } from '@/const/'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const defaultAvatar = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/Image1.png'



const ContactItem = ({ chatType, items, collapse, hasLogo, mentionedGroupIdLit, removeMentionedGroupId, ...rest }) => {
    const tabs = items //["Contacts", "Chat", "Public"]
    const tabsLen = tabs.length
    const tabCls = collapse ? '' : ''

    // 清除群组提醒提示
    const clearGroupMentioned = (item)=>{
        if(item.chatType === 'group'){
            removeMentionedGroupId({ groupId: item.id })
        }
    }


    const tabsItem = tabs.map(item =>
        <Menu.Item onClick={()=>{ clearGroupMentioned(item) }} key={chatType == 'chatroom' || chatType == 'group' ? item.id : item.name} className={tabCls} style={{ margin:0 }}>
            {hasLogo ? <ContactHead className="fl nav-img" name="test" width={50} /> : ''}
            <div className="nav-text">
                <div>
                    {chatType == 'contact' ? 
                        <Avatar src={item.info.avatarurl||defaultAvatar} onClick={rest.onClickAvatar}/>:null}
                    <span style={{ marginLeft: '5px' }}>{item?.info?.nickname || item.name}</span>
                    {/*
                        <Badge
                        count={109}
                        style={{
                            backgroundColor: "#87d068",
                            marginLeft: 10,
                            verticalAlign: "middle"
                        }}
                    />
                    */}
                    {/* {chatType === "group" ? <Badge count={item.unread} style={{ marginLeft: 10 }} /> : ""} */}
                    <Badge count={item.unread} style={{ marginLeft: 10 }} />
                </div>
                <div className="nav-text-desc">
                    {mentionedGroupIdLit.includes(item.id) ? <span style={{ color: 'red' }}>[@Mention me] </span> : ''}
                    {item.latestMessage}
                </div>
            </div>
            <div className="nav-op">
                {item.latestTime}
            </div>
        </Menu.Item>
    )

    return (
        <Menu id="x-contact-item" mode={'inline'} inlineIndent={24} {...rest} inlineCollapsed={false}>
            {tabsItem}
        </Menu>
    )
}

ContactItem.propTypes = {
    collapse: PropTypes.bool
    // menuOptions: PropTypes.array.isRequired,
}

export default ContactItem
