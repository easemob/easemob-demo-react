# 版本更新说明:

## v1.11.1 @2019-03-18

###Feature

* [sdk] 通过设置isHttpDNS为true，从服务端获取DNS配置文件
* [demo] 配置文件文件增加配置isHttpDNS
* [demo] 项目初始化sdk增加isHttpDNS
* [demo] 解决safari视频无图片、无声音问题



###BugFix


## v1.10.0 @2018-09-17

###Feature

* [demo] 多人音视频

###BugFix

* [demo] 在视频界面中，切到其他界面，视频界面不在了。但是视频还在继续 中
* [demo] 火狐 邀请 chrome， 进入多人会议，都收不到视频通知
* [demo] 不选择会话，收不到视频来电
* [demo] 多人视频 开关视频键状态不对
* [demo] chrome和firfox多人音视频会议中，chrome不显示firefox用户的视频
* [demo] 多人视频，一个浏览器登录两个账号，有一个账号 ui经常收不到视频邀请


## v1.6.0 @2018-01-29

###Feature

* [demo] 多人音视频
* [sdk] 多人音视频

###BugFix

* [demo] 无法发送表情

## v1.5.0 @2017-11-17

###Feature

* [demo] 添加Rest Interface的Test case
* [demo] sdk/demo 上传功能兼容ie8

###BugFix

* [demo] 多设备登录异常
* [demo] 新建需要审批的公有群，加入必须有审批流程
* [demo] 鼠标悬浮在群禁言图标上出现提示信息“禁言”
* [demo] demo.html中从cdn引入sdk
* [demo] 修复无法准确统计离线消息数的bug
* [demo] window.history.pushState在windows的chrome上有兼容性问题，统一改成window.location.href
* [demo] window.location.href = xxxx，如果修改的是href.search参数(?a=x&b=y)时候, 如果遇到file方式打开本地index.html会直接跳转页面，造成登录一直不成功，改成修改 href.hash 参数(#a=x&b=y)
* [demo] 将群管理员可操作的项目展示给管理员

## v1.4.11 @ 2017-09-22

###Feature

* [demo] 响应式布局，一套Demo同时支持PC和H5,自适应不同终端屏幕尺寸
* [demo] 完全基于React + Redux的单向数据流
* [demo] 引入ant-design组件库，方便开发者后续开发
* [demo] 专为移动端h5打造的webim 适配微信/QQ 和各种手机浏览器
