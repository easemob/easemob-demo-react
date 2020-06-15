
$(function () {
    //获取好友
    $('#getRoasters').click(function () {
        WebIM.conn.getRoster({
            success: function (res) {
                console.log('获取好友')
            }
        })
    })
    //添加好友
    $("#addRoster").click(function () {
        WebIM.conn.subscribe({
            to: toID,
            message: '加个好友呗!'
        });
        $('toName').val('');
    })
    //删除好友
    $('#removeRoster').click(function () {
        WebIM.conn.removeRoster({
            to: toID
        });
        $('#toName').val('');
    })
    //获取黑名单列表
    $('#getBlackList').click(function () {
        WebIM.conn.getBlacklist();
    })
    //将好友加入黑名单
    $('#addBlackList').click(function () {
        WebIM.conn.addToBlackList({
            name: [toID],
            success: function (res) {
                console.log('加入黑名单成功', res);
            },
            error: function (err) {
                console.log('加入黑名单失败', err);
            }
        });
        $('#toName').val('');
    })
    //将好友移除黑名单
    $('#removeFromBlackList').click(function () {
        WebIM.conn.removeFromBlackList({
            name: [toID],
            success: function (res) {
                console.log('移除黑名单成功', res);
            },
            error: function (err) {
                console.log('移除黑名单失败', err)
            }
        });
        $('#toName').val('');
    })
    
})
