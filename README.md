# AI灵感工具栏

## 项目简介
AI灵感工具栏是一款基于 **uni-app（Vue 2）** 框架开发的微信小程序，集成多种 AI 创意工具：AI 对话、图片生成、文案创作、创意激发等。前端代码为本仓库原创，AI 能力通过调用第三方大模型 API 实现。

> **项目状态**：个人/归档项目，按原样共享（shared as-is）。不保证长期可运行、维护或生产可用；第三方平台与大模型接口可用性可能随时变化。

## 技术栈
- **核心框架**：uni-app（Vue 2），使用 HBuilderX 开发
- **UI**：uni-app 内置组件 + 自定义 `navigation-bar` 组件
- **样式**：SCSS
- **云服务**：微信云开发（`cloudfunctions-wx/`）
- **AI 接口**：DeepSeek OpenAI 兼容接口（`utils/deepseekApi.js`）

## 运行与开发

### 前置准备
1. 安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)（uni-app 官方 IDE）
2. 在[微信公众平台](https://mp.weixin.qq.com/)注册你自己的小程序，拿到自己的 **AppID**：本仓库 `project.config.json` 中的 `appid` 为作者示例，导入时请替换为你自己的
3. 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，用于预览和上传微信小程序
4. 自备一个 DeepSeek（或任意兼容 OpenAI 格式）的 **API Key**

### 本地运行
1. 用 HBuilderX 打开本项目目录
2. HBuilderX 中把运行目标选为「微信开发者工具」，按提示关联微信开发者工具路径
3. 在微信公众平台/云开发控制台开通云开发环境，并在小程序侧关联
4. 上传部署 `cloudfunctions-wx/` 下的云函数（见下）
5. 编译运行；首次进入「AI对话」页时按弹窗提示填入你的 DeepSeek API Key

### 配置 AI API Key
- `utils/deepseekApi.js` 中 `apiKey` 默认为空，代码不内置任何密钥
- 用户在「AI 对话」页（`pages/chat/chat.vue`）首次使用时通过弹窗输入 Key，经 `saveApiKey()` 保存到本地存储（storage 键 `deepseek_api_key`）
- 未配置 Key 时对话按钮禁用并提示「未设置API密钥，请在设置中配置DeepSeek API密钥」
- Key 只保存在使用者自己的小程序本地 storage 中，不会随代码提交

### 部署云函数
`cloudfunctions-wx/` 目录下每个子目录都是一个微信云函数（含 `index.js` 与 `package.json`），在微信开发者工具中右键「上传并部署：云端安装依赖」：

- `wx-login`：微信登录，换取 openid
- `user`：用户信息读写
- `getAvatarList`：头像列表

## 项目结构（与实际代码一致）

```
├── App.vue / main.js / uni.scss      # uni-app 入口与全局样式
├── pages.json                        # 页面路由、tabBar、全局样式
├── manifest.json                     # uni-app 应用配置
├── project.config.json              # 微信开发者工具项目配置（appid 需替换）
├── pages/                            # 8 个页面（每个目录含 .vue 源码及 HBuilderX 编译产物）
│   ├── index/        # 工具首页
│   ├── profile/      # 个人中心
│   ├── about/        # 关于我们
│   ├── agreement/    # 用户协议
│   ├── chat/         # AI 对话（含 API Key 输入弹窗）
│   ├── image/        # 图片生成
│   ├── copy/         # 文案创作
│   └── idea/         # 创意激发
├── components/navigation-bar/       # 自定义导航栏组件
├── cloudfunctions-wx/               # 微信云函数：wx-login / user / getAvatarList
├── utils/deepseekApi.js             # DeepSeek API 封装（Key 从 storage 读取，默认空）
├── uni_modules/                     # DCloud 插件市场第三方组件（见下方第三方说明）
├── images/                          # 头像等图片资源
├── static/                          # logo、头像 svg 等静态资源
└── docs/项目开发补充文档.md
```

> `project.private.config.json` 是微信开发者工具生成的**本地私有配置**（项目名、编译开关等），已通过 `.gitignore` 排除、不纳入版本管理，由工具在本地自动生成，无需手动准备。

## 第三方组件说明（uni_modules）

`uni_modules/` 下的组件（`uni-captcha`、`uni-config-center`、`uni-feedback`、`uni-id-common`、`uni-id-pages`、`uni-open-bridge-common`、`uni-popup`、`uni-sign-in`）均为 **DCloud 插件市场的第三方插件**，不是本仓库作者的原创代码，保留其各自的原始版权与许可，**不随本仓库的 MIT 许可重新授权**。使用前请在 [DCloud 插件市场](https://ext.dcloud.net.cn/) 查看对应插件的许可条款。

## License & Attribution / 许可与来源

本仓库原创代码（作者自行编写的页面、组件、云函数、工具脚本等）采用 MIT 许可证发布，见 [LICENSE](./LICENSE)。

再分发时请保留 LICENSE 及其版权声明。版权行已包含原始仓库地址：https://github.com/change979666/ai-toolbar-miniprogram。

下列内容**不随 MIT 许可授权**：`uni_modules/` 下的 DCloud 第三方组件、平台 SDK、商标、截图、图标、字体等外部资源，均遵循其各自的许可与条款，复用前请自行核实。
