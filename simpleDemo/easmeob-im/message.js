

$(function (e) {
    //文本消息
    $('#privateText').click(function () {
        var id = WebIM.conn.getUniqueId();
        var msg = new WebIM.message('txt', id);
        msg.set({
            msg: msgContent,
            to: toID,
            ext: {
                time: newDate,
            },
            success: function (id, serverMsgId) {
                console.log('发送文本消息成功', id, serverMsgId);
            },
            fail: function (err) {
                console.log("发送文本消息失败", err);
            }
        });
        //判断消息类型是否为群组
        if (gType != undefined) {
            msg.setGroup('groupchat')
        };
        //判断是否为聊天室
        if (roomType != undefined) {
            msg.set.roomType = true
        }
        WebIM.conn.send(msg.body);
    });
    //命令消息
    $('#privateCmd').click(function () {
        var id = WebIM.conn.getUniqueId();
        var msg = new WebIM.message('cmd', id);
        msg.set({
            msg: 'test msg',
            to: toID,
            action: msgContent,
            ext: {
                time: newDate,
            },
            success: function (id, serverMsgId) {
                console.log('发送命令消息成功', id, serverMsgId);
            },
            fail: function (err) {
                console.log("发送命令消息失败", err);
            }
        });
        //判断消息类型是否为群组
        if (gType != undefined) {
            msg.setGroup('groupchat')
        };
        //判断是否为聊天室
        if (roomType != undefined) {
            msg.set.roomType = true
        }
        WebIM.conn.send(msg.body);
    })
    //位置消息
    $('#privateLoc').click(function () {
        var id = WebIM.conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.message('location', id);      // 创建位置消息
        msg.set({
            to: toID,                          // 接收消息对象（用户id）
            roomType: false,
            addr: "北京四通桥",
            lat: "39.9666",
            lng: "116.322",
            success: function (id, serverMsgId) {
                console.log('发送位置消息成功', id, serverMsgId)
            }
        })
        //判断消息类型是否为群组
        if (gType != undefined) {
            msg.setGroup('groupchat')
        };
        //判断是否为聊天室
        if (roomType != undefined) {
            msg.set.roomType = true
        }
        WebIM.conn.send(msg.body);
    })
    //Url 图片消息
    $('#privateUrlImg').click(function () {
        var id = WebIM.conn.getUniqueId();                   // 生成本地消息id
        var msg = new WebIM.message('img', id);        // 创建图片消息
        var option = {
            body: {
                type: 'file',
                url: msgContent,            //填写Url 地址
                size: {
                    width: '1123',
                    height: '2234',
                },
                length: '11223',            //目前自定义的，需要获取到url 图片信息后再赋值
                filename: 'tup.jpg',
                filetype: 'img'
            },
            to: toID,
            success: function (id, serverMsgId) {
                console.log('发送url图片成功', id, serverMsgId)
                //发送成功后，将文本框置空
            }
        };
        msg.set(option);
        //判断消息类型是否为群组
        if (gType != undefined) {
            msg.setGroup('groupchat')
        }
        WebIM.conn.send(msg.body);
    })
    //图片消息
    $('#privateImg').click(function () {
        var id = WebIM.conn.getUniqueId();
        var msg = new WebIM.message('img', id);
        var input = $("#imgMsg")[0]  // 选择图片的input
        var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
        var allowType = {        // 设置支持的图片类型
            'jpg': true,
            'gif': true,
            'png': true,
            'bmp': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: toID,
                ext: {
                    'time': newDate,
                },
                width: '1123',
                height: '2234',
                // 接收消息对象
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError: function (err) {      // 消息上传失败
                    console.log('onFileUploadError', err);
                },
                onFileUploadComplete: function (res) {   // 消息上传成功
                    console.log('onFileUploadComplete', res);
                },
                success: function (id, serverMsgId) {                // 消息发送成功
                    console.log('发送图片消息成功', id, serverMsgId);
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            //判断消息类型是否为群组
            if (gType != undefined) {
                msg.setGroup('groupchat')
            };
            //判断是否为聊天室
            if (roomType != undefined) {
                option.roomType = true
            };
            WebIM.conn.send(msg.body);
        }
    })
    //音频消息
    $('#privateAudio').click(function () {
        var id = WebIM.conn.getUniqueId();             // 生成本地消息id
        var msg = new WebIM.message('audio', id);      // 创建音频消息
        var input = $("#audioMsg")[0];                    // 选择音频的input
        var file = WebIM.utils.getFileUrl(input);      // 将音频转化为二进制文件
        var allowType = {
            'mp3': true,
            'amr': true,
            'wmv': true,
            'm4a': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: toID,
                ext: {
                    'time': newDate,
                    file_length: file.data.size
                },
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError: function (err) {      // 消息上传失败
                    console.log('onFileUploadError', err);
                },
                onFileUploadComplete: function (res) {   // 消息上传成功
                    console.log('onFileUploadComplete', res);
                    var msgUrl = res.uri + '/' + res.entities[0].uuid
                    console.log('>>>>>', msgUrl)
                    window.localStorage.setItem('updateUrl', msgUrl)
                },
                success: function (id, serverMsgId) {                // 消息发送成功
                    console.log('发送音频消息成功', id, serverMsgId);
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            //判断消息类型是否为群组
            if (gType != undefined) {
                msg.setGroup('groupchat')
            };
            //判断是否为聊天室
            if (roomType != undefined) {
                option.roomType = true
            };
            WebIM.conn.send(msg.body);
        }
    })
    //视频消息
    $('#privateVideo').click(function () {
        var id = WebIM.conn.getUniqueId();                   // 生成本地消息id
        var msg = new WebIM.message('video', id);      // 创建视频消息
        var input = $('#videoMsg')[0];  // 选择视频的input
        var file = WebIM.utils.getFileUrl(input);      // 将视频转化为二进制文件
        var allowType = {
            'mp4': true,
            'wmv': true,
            'avi': true,
            'rmvb': true,
            'mkv': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: toID,                       // 接收消息对象
                roomType: false,
                ext: {
                    'time': newDate,
                    file_length: file.data.size
                },
                onFileUploadError: function (err) {      // 消息上传失败
                    console.log('onFileUploadError', err);
                },
                onFileUploadComplete: function (res) {   // 消息上传成功
                    console.log('onFileUploadComplete', res);
                },
                success: function (id, serverMsgId) {                // 消息发送成功
                    console.log('发送视频消息成功', id, serverMsgId);
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            //判断消息类型是否为群组
            if (gType != undefined) {
                msg.setGroup('groupchat')
            };
            //判断是否为聊天室
            if (roomType != undefined) {
                option.roomType = true
            };
            WebIM.conn.send(msg.body);
        }
    })
    //文件消息
    $('#privateFile').click(function () {
        var id = WebIM.conn.getUniqueId();                   // 生成本地消息id
        var msg = new WebIM.message('file', id);        // 创建文件消息
        var input = $('#fileMsg')[0];  // 选择文件的input
        var file = WebIM.utils.getFileUrl(input);      // 将文件转化为二进制文件
        var allowType = {
            'jpg': true,
            'gif': true,
            'png': true,
            'bmp': true,
            'zip': true,
            'txt': true,
            'doc': true,
            'pdf': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: toID,                       // 接收消息对象
                roomType: false,
                ext: {
                    'time': newDate,
                    // file_length: file.data.size
                },
                onFileUploadError: function (err) {      // 消息上传失败
                    console.log('onFileUploadError', err);
                },
                onFileUploadComplete: function (res) {   // 消息上传成功
                    console.log('onFileUploadComplete', res);
                },
                success: function (id, serverMsgId) {                // 消息发送成功
                    console.log('发送附件消息成功', id, serverMsgId);
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            //判断消息类型是否为群组
            if (gType != undefined) {
                msg.setGroup('groupchat')
            };
            //判断是否为聊天室
            if (roomType != undefined) {
                option.roomType = true
            };
            WebIM.conn.send(msg.body);

        }
    })
    //撤回消息
    $('#recallMsg').click(function () {
        WebIM.conn.recallMessage({
            mid: mid,
            to: toID,
            // type: chat || groupchat,
            success: function (id) {
                console.log('撤回成功', id) // id为撤回通知的id
            },
            fail: function (err) {
                console.log('撤回失败', err)
            }
        })
    })
    //拉取漫游消息
    $('#getHistory').click(function () {
        var options = {
            queue: toID,
            isGroup: false,
            count: 10,
            success: function (res) {
                console.log('拉取消息成功', res)
            },
            fail: function (err) {
                console.log('拉取消息成功', err)
            }
        }
        WebIM.conn.fetchHistoryMessages(options)
    })
})