
$(function () {
    //设置/修改 用户属性
    $('#updateInfo').click(function () {
        let options = {
            nickname: userNickname,
            avatarurl: userAvatarUrl,
            mail: '123@qq.com',
            phone: '16888888888',
            gender: 'female',
            birth: '2000-01-01',
            sign: 'a sign',
            ext: JSON.stringify({
                nationality: 'China',
                merit: 'Hello，世界！'
            })
        }
        WebIM.conn.updateOwnUserInfo(options).then((res) => {
            console.log('修改属性成功',res)
        })
    })

    //获取用户属性
    $('#fetchInfo').click(function () {
        if (toID) {
            WebIM.conn.fetchUserInfoById(toID).then((res) => {
                console.log('获取属性成功', res)
            })           
        }else {
            alert('请输入要拉取信息的ID/接收方ID！')
        }
        
    })
})