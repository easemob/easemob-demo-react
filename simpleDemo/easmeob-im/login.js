
$(function () {
    //注册账号
    $('#register').click(function () {
        var options = {
            username: uname,
            password: upwd,
            nickname: 'nickname',
            appKey: WebIM.config.appkey,
            success: function (res) {
                console.log('注册成功', res)
            },
            error: function (err) {
                console.log('注册失败', err)
            },
            apiUrl: WebIM.config.apiURL
        };
        WebIM.conn.registerUser(options);
    })
    //登陆
    $('#login').click(function () {
        options = {
            apiUrl: WebIM.config.apiURL,
            user: uname,
            pwd: upwd,
            appKey: WebIM.config.appkey
        };
        WebIM.conn.open(options);
    })
    //退出
    $('#logout').click(function () {
        WebIM.conn.close();
    });
})







