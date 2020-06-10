
var ticket; //会议
var createrStram;  //个人流
var deskStream; //桌面流

$(function () {
    //创建会议，目前只支持 COMMUNICATION 会议模式。
    $('#createConfr').click(function () {
        let params = {
            confrType: 10,
            password: '123456',
            rec: true,
            recMerge: true,
            supportWechatMiniProgram: true,
            maxTalkerCount: 2,//会议最大主播人数
            maxVideoCount: 1, //会议最大视频数
            maxPubDesktopCount: 1, //会议最大共享桌面数
            maxAudienceCount: 100 //会议最大观众数
        };
        emedia.mgr.createConference(params).then(function (confr) {
            console.log('会议创建成功：', confr);
            //加入会议
            ticket = confr;
            // var ext = '创建者加入会议'
            // emedia.mgr.joinConference(ticket.confrId, ticket.password, ext).then(function (confr)
            emedia.mgr.joinConferenceWithTicket(ticket.confrId, ticket.ticket).then(function (confr) {
                console.log('加入会议成功', confr)
                //发布视频流
                var constaints = { audio: true, video: true };
                var videoTag = $('#meVideo')[0];
                emedia.mgr.publish(constaints, videoTag).then(function (pushedStream) {
                    console.log('发布视频流成功', pushedStream)
                    createrStram = pushedStream;
                }).catch(function (error) {
                    console.log('发布视频流失败', error)
                });
            }).catch(function (error) {
                console.log('>>>> 加入会议失败', error)
            })
        }).catch(function (error) {
            console.log('会议创建失败：', error);
        });
    });
    //邀请他人加入会议
    $('#inviteUser').click(function () {
        var jid = WebIM.config.appkey + "_" + toID + "@" + WebIM.config.Host;
        WebIM.call.inviteConference(ticket.confrId, ticket.password, jid);
    });
    //取消发布流
    $('#cancelPushSteam').click(function () {
        emedia.mgr.unpublish(createrStram);
    });
    //暂停自己的视频
    $('#pauseMeVideo').click(function () {
        var VideoTag = $('#meVideo')[0];
        emedia.mgr.triggerPauseVideo(VideoTag)
    })
    //恢复自己的视频
    $('#resumeMeVideo').click(function () {
        var VideoTag = $('#meVideo')[0];
        emedia.mgr.triggerResumeVideo(VideoTag);
    })
    //暂停自己的音频
    $('#pauseMeAudio').click(function () {
        var VideoTag = $('#meVideo')[0];
        emedia.mgr.triggerPauseAudio(VideoTag)
    })
    //恢复自己的音频
    $('#resumeMeAudio').click(function () {
        var VideoTag = $('#meVideo')[0];
        emedia.mgr.triggerResumeAudio(VideoTag);
    })
    //取消订阅其他成员流
    $('#cancelStream').click(function () {
        emedia.mgr.unsubscribe(userPushStream);
    });
    //手动订阅其他成员流
    $('#subscriStream').click(function () {
        var video = $('#youVideo')[0];
        emedia.mgr.subscribe(userMember, userPushStream, true, true, video)
    });
    //订阅音频
    $('#resumeAudio').click(function () {
        var videoTag = $('#youVideo')[0];
        emedia.mgr.triggerResumeAudio(videoTag).then(function (stream) {
            console.log('订阅音频成功', stream);
        }).catch(function (error) {
            console.log('订阅音频失败', error);
        });
    });
    //暂停音频
    $('#pauseAudio').click(function () {
        var videoTag = $('#youVideo')[0];
        emedia.mgr.triggerPauseAudio(videoTag).then(function (stream) {
            console.log('暂停音频成功', stream);
        }).catch(function (error) {
            console.log('暂停音频失败', error);
        });

    });
    //订阅视频
    $('#resumeVideo').click(function () {
        var videoTag = $('#youVideo')[0];
        emedia.mgr.triggerResumeVideo(videoTag).then(function (stream) {
            console.log('订阅视频成功', stream);
        }).catch(function (error) {
            console.log('订阅视频失败', error);
        });
    });
    //暂停视频
    $('#pauseVideo').click(function () {
        var videoTag = $('#youVideo')[0];
        emedia.mgr.triggerPauseVideo(videoTag).then(function (stream) {
            console.log('暂停视频成功', stream);
        }).catch(function (error) {
            console.log('暂停视频失败', error);
        });
    });
    //共享桌面
    $('#pushDeskStream').click(function () {
        var params = {
            // videoConstaints: true,
            // withAudio: true,
            videoTag: $('#deskVideo')[0],
            // ext: '桌面流',
            // confrId: ticket.confrId,
            stopSharedCallback: function () {
                emedia.mgr.hungup(deskStream);
            }

        }

        emedia.mgr.shareDesktopWithAudio(params).then(function (pushedStream) {
            console.log('>>> 桌面共享成功', pushedStream);
            deskStream = pushedStream;
        }).catch(function (error) {
            console.log('>>> 桌面共享失败', error);
        });
    });
    //移除会议成员
    $('#removeUser').click(function () {
        var userName = WebIM.conn.appKey + '_' + userMember;
        console.log('移除成员ID：',userName)
        emedia.mgr.kickMember([userName]).then(function () {
            console.log('移除会议成员', userMember);
        })
        // emedia.mgr.kickMembersById(ticket, [userName]).then(function () {
        //     console.log('移除会议成员', userMember);
        // })
    });
    //离开会议
    $('#exitConfr').click(function () {
        var exit_rtc = window.confirm("确认离开会议么？")
        if (exit_rtc) {
            emedia.mgr.exitConference();
        }
    });
    //销毁会议
    $('#destroyConfr').click(function () {
        var dest_rtc = window.confirm("确认销毁会议么？")
        if (dest_rtc) {
            emedia.mgr.destroyConference(ticket.confrId)
        }

    });
    //根据会议ID 和密码加入会议
    $('#joinConfrence').click(function () {
        emedia.mgr.joinConference(confrenceId, confrencePwd).then(function (res) {
            console.log('加入会议成功',res);
            //发布视频流
            var constaints = { audio: true, video: true };
            var videoTag = $('#meVideo')[0];
            emedia.mgr.publish(constaints, videoTag).then(function (pushedStream) {
                console.log('发布视频流成功', pushedStream)
                createrStram = pushedStream;
            }).catch(function (error) {
                console.log('发布视频流失败', error)
            });
        }).catch(function (error) {
            console.log('加入会议失败',error);
        })
    })



})