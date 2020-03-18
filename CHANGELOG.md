# 版本更新说明:

## v3.1.6 @2020
### Feature
* [demo] iOS客户端邀请chrome浏览器加入音视频会议，chrome浏览器收到会议邀请时未有弹窗，导致无法接受邀请  2020/3/4
* [demo] 切换聊天室时还能收到上一个聊天室的通知消息  2020/3/18


## v3.1.5 @2020-2-19
### Feature
* [demo] 音视频会议支持小程序
* [demo] 增加共享桌面
* [demo] 部分bug

## v3.0.17 @2019-12-31
### Feature
* [demo] 去掉依赖多人音视频sdk emedia 只因用webrtc
* [demo] 以及imsdk 去掉默认恢复deliver 只有单聊并且配置里设置为true才发送
* [demo] 加发送语音
* [demo] 用户注册失败加提示
* [demo] 修复不能重复发送相同图片文件
* [demo] 以及 emedia 修复在http下demo打不开

## v3.0.5 @2019-08-22
### Feature
* [demo] 修改移除好友的回调
* [demo] 修改简单demo添加黑名单/移除黑名单
* [sdk] 扩展消息增加发送json对象
* [sdk] 简化添加黑名单/移除黑名单API
* [sdk] 修复electron下socket建立不成功

## v3.0.4 @2019-07-30
### Feature
* [demo] 增加消息撤回
* [demo] 简单demo增加发送视频文件实现
* [sdk] 修复无法发送扩展消息bug

## v3.0.2 @2019-07-18
### Feature
* [demo] 优化部分简单demo
* [sdk] 下上传文件走dns
* [sdk] 修复无法拉取历史消息bug
* [sdk] 修复loc/cmd消息 messageId bug

## v3.0.1 @2019-07-09
### Feature

* [demo] 修复简单demo未设置appkey问题
* [demo] 基于3.0sdk添加好友去掉反添加好友过程
* [demo] 根据需求调整项目结构
* [demo] 解决起服务是打印警告问题


## v3.0.0 @2019-06-29
### Feature

* [demo] 增加接受群邀请功能
* [demo] 增加和调整一些群操作通知
* [demo] 使用最新基于私有协议的sdk
* [demo] 拆分sdk源码为单独repo
* [demo] 修复部分bug
* [sdk] 基于私有协议重写
* [sdk] 增加拉取历史消息接口
* [sdk] 增加撤回消息接口
* [sdk] 增加接受群邀请接口

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
