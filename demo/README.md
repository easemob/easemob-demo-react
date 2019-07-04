## 说明
WebIM 3 (webim-h5) 在2.x的基础上, 主要做了以下更新:
1. 更换新版基于私有协议重写的sdk
2. 群组增加接受邀请/拒绝加群邀请功能
3. 修复部分bug
WebIM 2 (webim-h5) 在1.x的基础上, 主要做了以下更新:
1. 响应式布局, 一套Demo同时支持PC和H5,自适应不同终端屏幕尺寸
2. 完全基于React + Redux的单向数据流
3. 引入ant-design组件库，方便开发者后续开发
4. 支持所有的现代浏览器(不支持IE6-11)

## 项目结构
+ config 为项目配置文件夹
+ fontdemo 为icon demo
+ scripts 为项目package.json中scripts所运行脚本
+ src 为项目源码

## 注意
+ sdk 文件夹下 webimSDK为即时通讯sdk, EMedia_x1v1为单人音视频sdk, EMedia_sdk-dev为多人音视频sdk,同时EMedia_x1v1依赖webimSDK, 音视频必须用https
+ simpleDemo 为简单demo，提供最简单直接的api调用示例
+ demo 为基于react+redux写的完整功能的demo
+ 更多关于sdk[集成文档](http://docs-im.easemob.com/im/web/intro/start)


## 安装

1. 初始化安装
	- 在/demo下执行 `npm i` `npm install` 

2. 运行demo
	- `cd demo && npm start` （requires node@>=6）
	
	   http://localhost:3001
	- `cd demo && HTTPS=true npm start` (webrtc supports HTTPS only)
	
	   https://localhost:3001

3. 发布demo
`cd demo && npm run build `
/demo/build 目录下的就是可以运行和部署的版本
