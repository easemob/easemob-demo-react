## 说明
+ 简单demo提供最简单的集成sdk方式,可以直接调用api进行测试，兼容绝大部分浏览器（ie9+）
+ sdk文件夹下 webimSDK为即时通讯sdk, EMedia_x1v1为单人音视频sdk, EMedia_sdk-dev为多人音视频sdk,同时EMedia_x1v1依赖webimSDK, 音视频必须用https
+ WebIMConfig为webimSDK所以需要的配置文件, cert.pem、key.pem为起https服务需要的证书
+ IE浏览器文档模式选择标准模式
## 运行
1. npm i http-server

2. http-server  /  http-server -S

3. 用浏览器打开服务地址