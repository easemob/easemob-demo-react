# 环境变量配置说明

## 概述

本项目使用 `.env` 文件来管理敏感信息和配置参数。项目基于 Create React App，已经内置支持读取 `.env` 文件。

## 配置文件

- `.env.example` - 环境变量模板文件，包含所有必需的变量示例
- `.env` - 实际的环境变量文件（请不要提交到版本控制）

## 重要说明

⚠️ **在 Create React App 中，只有以 `REACT_APP_` 开头的环境变量才会暴露给前端代码。**

## 环境变量列表

### 环信 Chat SDK 配置

```
REACT_APP_APP_KEY=your_app_key_here
```

### 阿里云验证码配置

```
REACT_APP_SCENE_ID=your_scene_id_here
REACT_APP_PREFIX=your_prefix_here
REACT_APP_SECRET=your_secret_here
```

### API 配置

```
REACT_APP_API_URL=https://your-api-url.com
```

## 使用方法

1. 复制 `.env.example` 为 `.env`：

   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入实际的配置值

3. 在代码中使用环境变量：
   ```javascript
   const appKey = process.env.REACT_APP_APP_KEY;
   const sceneId = process.env.REACT_APP_SCENE_ID;
   ```

## 支持的环境文件

按优先级顺序，Create React App 会读取以下文件：

1. `.env.development.local` (开发环境本地配置)
2. `.env.local` (本地配置，所有环境除了 test)
3. `.env.development` (开发环境配置)
4. `.env` (默认配置)

## 注意事项

1. **安全性**：`.env` 文件已添加到 `.gitignore`，不会被提交到版本控制
2. **命名规则**：前端可访问的环境变量必须以 `REACT_APP_` 开头
3. **重启**：修改环境变量后需要重启开发服务器
4. **构建**：构建时环境变量会被编译到静态文件中

## 验证配置

运行以下命令验证环境变量是否正确加载：

```bash
NODE_ENV=development node -e "
require('./config/env');
const getClientEnvironment = require('./config/env');
const env = getClientEnvironment('/');
console.log('Available REACT_APP_ variables:');
Object.keys(env.raw).filter(key => key.startsWith('REACT_APP_')).forEach(key => {
  console.log(\`\${key}: \${env.raw[key]}\`);
});
"
```

## 已修改的文件

以下文件已更新为使用新的环境变量：

- `src/components/SMS/index.tsx` - 阿里云验证码配置
- `src/pages/login/login.tsx` - 环信 SDK 配置
