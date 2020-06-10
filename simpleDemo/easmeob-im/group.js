
$(function () {
    //获取当前登陆账号已加入的群组列表
    $('#getGroupList').click(function () {
        var options = {
            success: function (resp) {
                console.log("获取已加入群组成功", resp)
            },
            error: function (err) {
                console.log("获取已加入群组失败", err)
            }
        }
        WebIM.conn.getGroup(options)
    });
    //分页获取公开群组
    $('#getPubGroupList').click(function () {
        var limit = 20,
            options = {
            limit: limit,                                   // 预期每页获取的记录数
            cursor: cursor || '',                           // 游标，第一次为空
            success: function (resp) {
                console.log("Response: ", resp);
                $('#gCursor').val() = resp.cursor;
            },
            error: function (e) { }
        };
        WebIM.conn.listGroups(options);
    });
    ////创建群组
    $('#createGroups').click(function () {
        var options = {
            data: {
                groupname: 'test1',                    // 群组名
                desc: '测试群组',                       // 群组描述                      
                public: true,                         // pub等于true时，创建为公开群
                approval: false,                      // approval为true，加群需审批，为false时加群无需审批
                allowinvites: false
            },
            success: function (res) {
                console.log('创建群组成功', res)
            },
            error: function (error) {
                console.log('创建群组失败', error)
            }
        };
        if(toID != undefined){
            options.data.members = [toID];  // 用户名组成的数组
        };
        WebIM.conn.createGroupNew(options);
    });
    //获取群组信息
    $('#getGroupInfo').click(function () {
        var options = {
            groupId: gid,                                //群组id
            success: function (res) {
                console.log("获取群组信息成功", res);
            },
            error: function (err) {
                console.log("获取群组信息失败", err);
            }
        };
        WebIM.conn.getGroupInfo(options);
    });
    //修改群组信息
    $('#putGroupInfo').click(function () {
        var option = {
            groupId: gid,
            groupName: 'ChangeTest',                         // 群组名称
            description: 'Change group information test',  // 群组简介
            success: function (res) {
                console.log('修改群组成功', res);
            }
        };
        WebIM.conn.modifyGroup(option);
    });
    //获取群组成员
    $('#getGroupMember').click(function () {
        var pageNum = 1,
            pageSize = 1000;
        var options = {
            pageNum: pageNum,                                               // 页码
            pageSize: pageSize,                                             // 预期每页获取的记录数
            groupId: gid,
            success: function (res) {
                console.log("获取群成员成功", res)
            },
            error: function (err) {
                console.log("获取群成员失败", err)
            }
        };
        WebIM.conn.listGroupMember(options);
    });
    //将好友加入群组
    $('#inviteGroupMember').click(function () {
        var option = {
            users: [toID],
            groupId: gid
        };
        WebIM.conn.inviteToGroup(option);
    });
    //将成员移除群组
    $('#removeGroupMember').click(function () {
        var option = {
            groupId: gid,
            username: toID,                         // 群组成员名称
            success: function (res) {
                console.log('移除成员成功', res);
            },
            error: function (err) {
                console.log('移除成员失败', err)
            }
        };
        WebIM.conn.removeSingleGroupMember(option);
    });
    //退出群组
    $('#quitGroup').click(function () {
        var option = {
            groupId: gid,
            success: function (res) {
                console.log('退出群组成功', res);
            },
            error: function (err) {
                console.log('退出群组失败', err);
            }
        };
        WebIM.conn.quitGroup(option);
    });
    //解散群组
    $('#disGroup').click(function () {
        var option = {
            groupId: gid,
            success: function () {
                console.log('解散群组成功');
            }
        };
        WebIM.conn.dissolveGroup(option);
    });
    //获取群组管理员
    $('#getGroupAdmin').click(function () {
        var options = {
            groupId: gid,                 // 群组id
            success: function (res) {
                console.log('获取群组管理员成功', res)
            },
            error: function (err) {
                console.log('获取群组管理员失败', err)
            }
        };
        WebIM.conn.getGroupAdmin(options);
    });
    //设置群组管理员
    $('#setGroupAdmin').click(function () {
        var options = {
            groupId: gid,            // 群组id
            username: toID,              // 用户名
            success: function (res) {
                console.log('设置管理员成功', res)
            },
            error: function (err) {
                console.log('设置管理员失败', err)
            }
        };
        WebIM.conn.setAdmin(options);
    });
    //移除群组管理员
    $('#removeGroupAdmin').click(function () {
        var options = {
            groupId: gid,             // 群组id
            username: toID,               // 用户名
            success: function (res) {
                console.log('移除管理员成功', res)
            },
            error: function (err) {
                console.log('移除管理员失败', err)
            }
        };
        WebIM.conn.removeAdmin(options);
    });
    //申请加入群组
    $('#applyJoinGroup').click(function () {
        var options = {
            groupId: gid,                              // 群组ID
            success: function (res) {
                console.log("申请发送群组成功", res);
            },
            error: function (err) {
                console.log("申请加入群组失败", err);
            }
        };
        WebIM.conn.joinGroup(options);
    });
    //获取群组禁言列表
    $('#getMuteGroupList').click(function () {
        var options = {
            groupId: gid,                // 群组ID
            success: function (res) {
                console.log('获取禁言列表成功', res)
            },
            error: function (err) {
                console.log('获取禁言列表失败', err)
            }
        };
        WebIM.conn.getMuted(options);
    });
    //将成员禁言
    $('#setMuteGroupMember').click(function () {
        var options = {
            username: toID,                      // 成员用户名
            muteDuration: 886400000,               // 禁言的时长，单位是毫秒
            groupId: gid,
            success: function (res) {
                console.log('成员禁言成功', res)
            },
            error: function (err) {
                console.log('成员禁言失败', err)
            }
        };
        WebIM.conn.mute(options);
    });
    //移除群组禁言
    $('#removeMuteGroupMember').click(function () {
        var options = {
            groupId: gid,                  // 群组ID
            username: toID,                    // 成员用户名
            success: function (res) {
                console.log('移除禁言成功', res)
            },
            error: function (err) {
                console.log('移除禁言失败', err)
            }
        };
        WebIM.conn.removeMute(options);
    });
    //一键全员禁言
    $('#setMuteAll').click(function () {
        var options = {
            groupId: gid, //群组id
            success: function (res) {
                console.log('全员禁言成功', res)
            },
            error: function (err) {
                console.log('全员禁言失败', err)
            }
        };
        WebIM.conn.disableSendGroupMsg(options);
    });
    //一键解除全员禁言
    $('#removeMuteAll').click(function () {
        var options = {
            groupId: gid, //群组id
            success: function (res) {
                console.log('解除全员禁言成功', res)
            },
            error: function (err) {
                console.log('解除全员禁言失败', err)
            }
        };
        WebIM.conn.enableSendGroupMsg(options)
    });
    //查询群组白名单
    $('#getGroupWhite').click(function () {
        var options = {
            groupId: gid, //群组id
            success: function (res) {
                console.log('获取群组白名单成功', res)
            },
            error: function (err) {
                console.log('获取群组白名单失败', err)
            }
        }
        WebIM.conn.getGroupWhitelist(options)
    });
    //将成员加入白名单
    $('#setGroupWhite').click(function () {
        var options = {
            groupId: gid, //群组id
            users: [toID], //成员id列表
            success: function (res) {
                console.log('添加群组白名单成功', res)
            },
            error: function (err) {
                console.log('添加群组白名单失败', err)
            }
        };
        WebIM.conn.addUsersToGroupWhitelist(options);
    });
    //将成员移除白名单
    $('#removeGroupWhite').click(function () {
        var options = {
            groupId: gid, //群组id
            userName: toID, //要移除的成员
            success: function (res) {
                console.log('移除群组白名单成功', res)
            },
            error: function (err) {
                console.log('移除群组白名单失败', err)
            }
        }
        WebIM.conn.rmUsersFromGroupWhitelist(options)
    });
    //查询成员是否是白名单用户
    $('#getGroupMemberWhite').click(function () {
        var options = {
            groupId: gid, //群组id
            userName: toID, //要查询的成员
            success: function (res) {
                console.log('查询成功', res)
            },
            error: function (err) {
                console.log('查询失败', err)
            }
        }
        WebIM.conn.isGroupWhiteUser(options)
    });
    //获取群组黑名单列表
    $('#getGroupBlack').click(function () {
        var option = {
            groupId: gid,
            success: function (res) {
                console.log('查询群组黑名单成功', res)
            },
            error: function (err) {
                console.log('查询群组黑名单失败', err)
            }
        };
        WebIM.conn.getGroupBlacklistNew(option);
    });
    //将成员加入群组黑名单 /单个
    $('#setGroupBlack').click(function () {
        var options = {
            groupId: gid,                     // 群组ID
            username: toID,                         // 将要被加入黑名单的用户名
            success: function (res) {
                console.log('加入群组黑名单成功', res)
            },
            error: function (err) {
                console.log('加入群组黑名单失败', err)
            }
        };
        WebIM.conn.groupBlockSingle(options);
    });
    //将群组黑名单成员移除  /单个
    $('#removeGroupBlack').click(function () {
        var options = {
            groupId: gid,                     // 群组ID              
            username: toID,                             // 需要移除的用户名
            success: function (res) {
                console.log('移除群组黑名单成功', res)
            },
            error: function (err) {
                console.log('移除群组黑名单失败', err)
            }
        }
        WebIM.conn.removeGroupBlockSingle(options);
    });
    //上传/修改 群公告
    $('#putAnnouncement').click(function () {
        var options = {
            groupId: gid,            // 群组id   
            announcement: 'test Announcement',        // 公告内容                        
            success: function (res) {
                console.log('设置群公告成功', res)
            },
            error: function (err) {
                console.log('设置群公告失败', err)
            }
        };
        WebIM.conn.updateGroupAnnouncement(options);
    });
    //获取群组公告
    $('#getAnnouncement').click(function () {
        var options = {
            groupId: gid,            // 群组id                          
            success: function (res) {
                console.log('获取群公告成功', res)
            },
            error: function (err) {
                console.log('获取群公告失败', err)
            }
        };
        WebIM.conn.fetchGroupAnnouncement(options);
    });
    //获取群组文件
    $('#getGroupFile').click(function () {
        var options = {
            groupId: gid,                  // 群组id                        
            success: function (res) {
                console.log('获取文件成功', res)
            },
            error: function (err) {
                console.log('获取群文件失败', err)
            }
        };
        WebIM.conn.fetchGroupSharedFileList(options);
    });
    //上传群文件，需要在 file 上传
    $('#setGroupFile').click(function () {
        var options = {
            groupId: gid,                                // 群组id 
            file: $("#fileMsg")[0],                      // <input type="file"/>获取的file文件对象                         
            onFileUploadProgress: function (res) {
                console.log('开始上传文件', res)
            },   // 上传进度的回调
            onFileUploadComplete: function (res) {
                console.log('上传文件成功', res)
            },   // 上传完成时的回调
            onFileUploadError: function (err) {
                console.log('上传文件失败', err)
            },         // 上传失败的回调
            onFileUploadCanceled: function (err) {
                console.log('取消上传文件', err)
            }       // 上传取消的回调
        };
        WebIM.conn.uploadGroupSharedFile(options);
    });
    //下载群文件
    $('#downGroupFile').click(function () {
        var options = {
            groupId: gid,                  // 群组id 
            fileId: gFileId,                          // 文件id                        
            onFileDownloadComplete: function (res,resp) {
                console.log('下载群文件成功', res,resp)
            }, // 下载成功的回调
            onFileDownloadError: function (err) {
                console.log('下载群文件失败', err)
            },       // 下载失败的回调
        };
        WebIM.conn.downloadGroupSharedFile(options);
    });
    //删除群文件
    $('#removeGroupFile').click(function () {
        var options = {
            groupId: gid,                  // 群组id 
            fileId: gFileId,                          // 文件id                        
            success: function (res) {
                console.log('删除群文件成功', res)
            },
            error: function (err) {
                console.log('删除群文件失败', err)
            }
        };
        WebIM.conn.deleteGroupSharedFile(options);
    });
})


