## 说明
+ 简单demo提供最简单的集成sdk方式,可以直接调用api进行测试，兼容绝大部分浏览器（ie9+）
+ sdk文件夹下 webimSDK为即时通讯sdk, EMedia_x1v1为单人 + 多人音视频sdk,同时EMedia_x1v1依赖webimSDK, 音视频必须用https
+ WebIMConfig为webimSDK所以需要的配置文件, cert.pem、key.pem为起https服务需要的证书
+ IE浏览器文档模式选择标准模式
+ 会议模式测试，是登陆者先创建会议，邀请成员加入后再发起共享
##### 运行
## 安装环境
1.  sudo npm i -g http-server

    
## http 启动，不支持桌面共享
2.  http-server   

## mac 本地 https 启动命令， 先填写信息创建证书，然后再启动，支持共享桌面
3.  openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

    http-server -S -C cert.pem -o


4.  用浏览器打开服务地址