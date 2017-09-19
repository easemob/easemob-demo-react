## 说明
WebIM 2.0 在1.x的基础上, 主要做了以下更新:
1. 响应式布局, 一套Demo同时支持PC和H5,自适应不同终端屏幕尺寸
2. 完全基于Reac + Redux的单向数据流
3. 引入ant-design组件库，方便开发者后续开发
4. 支持所有的现代浏览器(不支持IE6-11)

## 安装

1. 初始化安装
	- 在/demo下执行 `npm i`
2. 如果需要同时编辑sdk
	- `cd sdk && npm link && cd ..`
	- 在根目录下执行 `npm link easemob-websdk`

    ```
    否则会报错:
    ./src/config/WebIM.js
    Module not found: Can't resolve 'easemob-websdk/dist/strophe-1.2.8-g.js' in '<YourRootDir>/demo/src/config'
    ```
3. 如果需要同时编辑webrtc
	- `cd webrtc && npm link && cd ..`
	- 在根目录下执行 `npm link easemob-webrtc`

4. 运行demo
	- `cd demo && npm start` （requires node@>=6）
	
	   http://localhost:3001
	- `cd demo && HTTPS=true npm start` (webrtc supports HTTPS only)
	
	   https://localhost:3001

5. 发布demo
`cd demo && npm run build `
/demo/build 目录下的就是可以允许和部署的版本



 
## FAQ
  
### 1. 如果在npm i的过程中遇到

```
> phantomjs-prebuilt@2.1.14 install /Users/will/work/my-project/node_modules/phantomjs-prebuilt
> node install.js

PhantomJS not found on PATH
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1/phantomjs-2.1.1-macosx.zip
Saving to /var/folders/mh/2ptfthxj2qb49jscj1b0gjsm0000gn/T/phantomjs/phantomjs-2.1.1-macosx.zip
Receiving...

Error making request.
Error: connect ETIMEDOUT 54.231.113.227:443
    at Object.exports._errnoException (util.js:1018:11)
    at exports._exceptionWithHostPort (util.js:1041:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1090:14)
```

FIX: 这个问题，可以尝试PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/ npm install --save-dev phantomjs-prebuilt来解决

### 2. 执行npm start时如果出现

```
> node scripts/start.js

/Users/wenke/www/web-im/demo/scripts/start.js:23
const {
      ^

SyntaxError: Unexpected token {
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:373:25)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:974:3
```
FIX: 请检查node版本是否是v6.0+ 

### 3. redux state

```
{
	// ------- 响应式断点 ---------
	//xs: "480px",
	//sm: "768px",
 	//md: "992px",
	//lg: "1200px",
	//xl: "1600px"
	breakpoint: {
		sm: true
	},
	// ------ ui 相关 ------------
	common: {
		fetching:false
	},
	login: {
		username: '',
		password: '',
		isSigned: false,
	},
	im: [],
	// ------ 数据实体 -------
	entities: {
		roster: {
			byName: {
				[name]: {
					jid, name, subscription, groups
				}
			},
			names: ['lwz2'...],
			// 好友列表在此，因为好友列表来源于roster，息息相关
			friends: [],
		},
		// 订阅通知
		subscribe: {
			byFrom: {}
		},
		room: {},
		group: {
			byId: {},
			names: []
		},
		members: {
			byName: [],
			byGroupId: []
		}
		blacklist: {},
		message: {
			byId: {}
			chat: {
				[chatId]: [messageId1, messageId2]
			},
			groupChat: {
				[chatId]: {}
			},
		}
	}
}
```



