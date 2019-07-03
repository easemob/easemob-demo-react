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

### 3. Redux State 的数据结构如下：


```
{
	// ---------------------------------
	// 响应式断点
	// ---------------------------------
	//xs: "480px"
	//sm: "768px"
 	//md: "992px"
	//lg: "1200px"
	//xl: "1600px"
	breakpoint: {
		xs: false,
		sm: false,
		md: false,
		lg: false,
		xl: false
	},
	
	// ---------------------------------
	// UI相关
	// ---------------------------------
	common: {
		fetching: false,
		isGetGroupAlready: true,
		isGetChatRoomAlready: false,
		showGroupRequestModal: false   //群主管理加入群消息
	},
	
	// ---------------------------------	
	// 用户登录信息
	// ---------------------------------
	login: {
		username: 'sunylt',
		password: null,
		token: "YWMtZ0m-opwTEeeS-e0Ko59rsU1-S6DcShHjkNXh_7qs2vV",
		fetching: false,
		error: false
		isLogin: true,
	},
	
	// ---------------------------------
	// 多语言
	// ---------------------------------
	i18n: {
	
		// 已配置语言
		translations: {
			cn: {},
			us: {},
		},
		
		// 当前语言
		locale: "cn"
	},
	
	
	// 注册信息，没进行注册操作为{}
	register: {
		username: "123abcdbb",
		password: "123",
		fetching: false,
		registerError: null
	},
	
	// 预留 暂无用
	contacts: {}
	
	// 预留 暂无用
    im: {}

	// ---------------------------------	
	// 数据实体
	// ---------------------------------
	entities: {
	    // 好友
		roster: {
			byName: {
				name: { subscription,jid, ask, name, groups }
				...
			},
			names: ['lwz2' ...],
			// 好友列表在此，因为好友列表来源于roster，息息相关
			friends: [],
		},
		// 群组
		group: {
			loadingFailed: <Boolean>,
			isLoading: <Booleadn>,
			rightSiderOffset: <Number>, //控制右侧群组管理面板
			byId: {
				groupId: {groupid, groupname},
				....
			},
			names: [groupName_#-#_groupId, ....]
		},
		// 聊天室
		chatroom: {
			byId: {
				chatId: {chatId, name, owner, affiliations_count}
				...
			},
			names: [chatName_#-#_chatId, ....]
		},
		// 陌生人
		stranger: {
		},
		
		// 群组成员信息
		groupMember: {
			groupId: {
				muted: {byName: {}},//群主可见，禁言列表
				byName: {
					name: {name: <String: name>, affiliation: 'member'}
				},
				names: [],
				admins: [],  //群管理员可见
			},
			...
		}
		
		// 订阅通知
		subscribe: {
			byFrom: {}
		},
		
		// 黑名单列表
		blacklist: {
			byName: {}
			name: []
		},
		
		// 消息
		message: {
		
			// 所有消息
			byId: {
				mid: {"type":"chat|groupchat|chatroom|stranger|error", "chatId": <String: chatId>},
				...
			}
			
			// 单聊消息列表
			chat: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// 群组消息列表
			groupChat: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// 聊天室消息列表
			chatroom: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// 陌生人消息列表
			stranger: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// 预留 暂无用
			extra: {}
			
			// 未读消息记录
			unread: {
			    // 好友
				chat: {
					chatId: <Number: unreadNum>,
					...
				},
				// 群组
				groupchat: {
					chatId: <Number: unreadNum>,
					...
				},
				// 聊天室
				chatroom: {
					chatId: <Number: unreadNum>,
					...
				},
				// 陌生人
				stranger: {
					chatId: <Number: unreadNum>,
					...
				}
			}
			
			// 自己发的消息mid跟本地id对照
			byMid: {
				messageId: {id: <String: localId>},
				...
			},
		},
		
		// 加入群申请
		groupRequest: {
			byGid: {}
		}
	}
}
```



