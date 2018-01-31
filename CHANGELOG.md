# 版本更新说明:

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
