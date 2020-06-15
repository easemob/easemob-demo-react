$(function () {
    //获取聊天室列表
    $('#getRoomsList').click(function () {
        var option = {
            apiUrl: 'https://a1.easemob.com',
            pagenum: 1,                                 // 页数
            pagesize: 20,                               // 每页个数
            success: function (res) {
                console.log('获取聊天室列表成功', res);
            },
            error: function (err) {
                console.log('获取聊天室列表失败', err);
            }
        };
        WebIM.conn.getChatRooms(option);
    });
    //获取聊天室成员
    $('#getRoomsMember').click(function () {
        WebIM.conn.listChatRoomMember({
            pageNum: 1,
            pageSize: 10,
            chatRoomId: gid,
            success: function (res) {
                console.log('获取聊天室成员', res)
            },
            error: function (err) {
                console.log('获取聊天室成员失败', err)
            }
        })
    })
    //加入聊天室
    $('#joinRoom').click(function () {
        WebIM.conn.joinChatRoom({
            roomId: gid, // 聊天室id
            success: function (res) {
                console.log('加入聊天室成功', res)
            }
        });
    });
    //退出聊天室
    $('#quitRoom').click(function () {
        WebIM.conn.quitChatRoom({
            roomId: gid,// 聊天室id
            success: function (res) {
                console.log('退出聊天室成功', res)
            }
        });
    });
    //上传/修改聊天室公告
    $('#setChatroomAnnouncement').click(function () {
        var options = {
            roomId: gid,            // 群组id   
            announcement: 'test Announcement',        // 公告内容                        
            success: function (res) {
                console.log('设置群公告成功', res)
            },
            error: function (err) {
                console.log('设置群公告失败', err)
            }
        };
        WebIM.conn.updateChatRoomAnnouncement(options);
    });
    //获取聊天室公告
    $('#getChatroomAnnouncement').click(function () {
        var options = {
            roomId: gid,            // 群组id                          
            success: function (res) {
                console.log('获取群公告成功', res)
            },
            error: function (err) {
                console.log('获取群公告失败', err)
            }
        };
        WebIM.conn.fetchChatRoomAnnouncement(options);
    });
    //将成员禁言
    $('#setChatroomMute').click(function () {
        var options = {
            username: toID,                      // 成员用户名
            muteDuration: -1000,               // 禁言的时长，单位是毫秒 -1000 是永久
            chatRoomId: gid,
            success: function (res) {
                console.log('成员禁言成功', res)
            },
            error: function (err) {
                console.log('成员禁言失败', err)
            }
        };
        WebIM.conn.muteChatRoomMember(options);
    });
    //将成员解除禁言
    $('#removeRoomMute').click(function () {
        var options = {
            chatRoomId: gid,                  // 群组ID
            username: toID,                    // 成员用户名
            success: function (res) {
                console.log('移除禁言成功', res)
            },
            error: function (err) {
                console.log('移除禁言失败', err)
            }
        };
        WebIM.conn.removeMuteChatRoomMember(options);
    });
    //获取聊天室禁言列表
    $('#getRoomMuteList').click(function () {
        var options = {
            chatRoomId: gid,                // 群组ID
            success: function (res) {
                console.log('获取禁言列表成功', res)
            },
            error: function (err) {
                console.log('获取禁言列表失败', err)
            }
        };
        WebIM.conn.getChatRoomMuted(options);
    });
    //开启聊天室全员禁言
    $('#setMuteAll').click(function () {
        var options = {
            chatRoomId: gid, //群组id
            success: function (res) {
                console.log('全员禁言成功', res)
            },
            error: function (err) {
                console.log('全员禁言失败', err)
            }
        };
        WebIM.conn.disableSendChatRoomMsg(options);
    });
    //关闭聊天室全员禁言
    $('#removeMuteAll').click(function () {
        var options = {
            chatRoomId: gid, //群组id
            success: function (res) {
                console.log('解除全员禁言成功', res)
            },
            error: function (err) {
                console.log('解除全员禁言失败', err)
            }
        };
        WebIM.conn.enableSendChatRoomMsg(options)
    });
    //将用户添加到白名单
    $('#setRoomWhite').click(function () {
        var options = {
            chatRoomId: gid, //群组id
            users: [toID], //成员id列表
            success: function (res) {
                console.log('添加群组白名单成功', res)
            },
            error: function (err) {
                console.log('添加群组白名单失败', err)
            }
        };
        WebIM.conn.addUsersToChatRoomWhitelist(options);
    });
    //将用户在白名单移除
    $('#removeRoomWhite').click(function () {
        var options = {
            chatRoomId: gid, //群组id
            userName: toID, //要移除的成员
            success: function (res) {
                console.log('移除群组白名单成功', res)
            },
            error: function (err) {
                console.log('移除群组白名单失败', err)
            }
        }
        WebIM.conn.rmUsersFromChatRoomWhitelist(options)
    });
    //获取聊天室白名单列表
    $('#getRoomWhiteList').click(function () {
        var options = {
            chatRoomId: gid, //群组id
            userName: toID, //要查询的成员
            success: function (res) {
                console.log('查询成功', res)
            },
            error: function (err) {
                console.log('查询失败', err)
            }
        }
        WebIM.conn.getChatRoomWhitelist(options)
    });
    //查看成员是否为白名单用户
    $('#getRoomMemberWhite').click(function () {
        var options = {
            chatRoomId: gid, //群组id
            userName: toID, //要查询的成员
            success: function (res) {
                console.log('查询成功', res)
            },
            error: function (err) {
                console.log('查询失败', err)
            }
        }
        WebIM.conn.isChatRoomWhiteUser(options)
    });
    //获取聊天室黑名单列表
    $('#getRoomBlack').click(function () {
        var option = {
            chatRoomId: gid,
            success: function (res) {
                console.log('查询群组黑名单成功', res)
            },
            error: function (err) {
                console.log('查询群组黑名单失败', err)
            }
        };
        WebIM.conn.getChatRoomBlacklistNew(option);
    });
    //将成员加入到聊天室黑名单  /单个
    $('#setRoomBlack').click(function () {
        var options = {
            chatRoomId: gid,                     // 群组ID
            username: toID,                         // 将要被加入黑名单的用户名
            success: function (res) {
                console.log('加入群组黑名单成功', res)
            },
            error: function (err) {
                console.log('加入群组黑名单失败', err)
            }
        };
        WebIM.conn.chatRoomBlockSingle(options);
    });
    //将成员移除聊天室黑名单  /单个
    $('#removeRoomBlack').click(function () {
        var options = {
            chatRoomId: gid,                     // 群组ID              
            username: toID,                             // 需要移除的用户名
            success: function (res) {
                console.log('移除群组黑名单成功', res)
            },
            error: function (err) {
                console.log('移除群组黑名单失败', err)
            }
        }
        WebIM.conn.removeChatRoomBlockSingle(options);
    });

})