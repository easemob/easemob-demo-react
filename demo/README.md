## 说明
WebIM 2 (webim-h5) 在1.x的基础上, 主要做了以下更新:
1. 响应式布局, 一套Demo同时支持PC和H5,自适应不同终端屏幕尺寸
2. 完全基于React + Redux的单向数据流
3. 引入ant-design组件库，方便开发者后续开发
4. 支持所有的现代浏览器(不支持IE6-11)

## 安装

1. 初始化安装
	- 在/demo下执行 `npm i`

2. 如果需要同时编辑webrtc `cd webrtc && npm link && cd .. && npm link easemob-webrtc`
3. 如果需要同时编辑emedia `cd emedia && npm link && cd .. && npm link easemob-emedia`

4. 运行demo
	- `cd demo && npm start` （requires node@>=6）
	
	   http://localhost:3001
	- `cd demo && HTTPS=true npm start` (webrtc supports HTTPS only)
	
	   https://localhost:3001

5. 发布demo
`cd demo && npm run build `
/demo/build 目录下的就是可以运行和部署的版本

