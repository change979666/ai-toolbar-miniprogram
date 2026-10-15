# AI灵感工具栏

## 项目简介
AI灵感工具栏是一款基于 uni-app 框架开发的跨平台应用，集成多种AI创意工具，旨在帮助用户激发创意灵感、提高工作效率。提供AI对话、图片生成、文案创作、创意激发等功能。

## 技术栈
- **核心框架**：uni-app (基于 Vue.js 2.x)
- **UI框架**：uni-app 内置组件 + 自定义组件
- **样式处理**：SCSS
- **云服务**：uniCloud (阿里云)
- **开发工具**：HBuilderX
- **包管理**：npm/yarn
- **代码规范**：ESLint + Prettier

## 项目结构
```
├── app.js                 # 小程序入口文件
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
├── assets                 # 静态资源目录
│   └── images             # 图片资源
│       ├── default-avatar.png
│       ├── chat-icon.png
│       ├── image-icon.png
│       ├── copy-icon.png
│       └── idea-icon.png
├── components             # 自定义组件
│   └── navigation-bar     # 导航栏组件
│       ├── navigation-bar.js
│       ├── navigation-bar.json
│       ├── navigation-bar.wxml
│       └── navigation-bar.wxss
├── pages                  # 页面文件
│   ├── index              # 工具首页
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── profile            # 个人中心
│   │   ├── profile.js
│   │   ├── profile.json
│   │   ├── profile.wxml
│   │   └── profile.wxss
│   ├── about              # 关于我们
│   │   ├── about.js
│   │   ├── about.json
│   │   ├── about.wxml
│   │   └── about.wxss
│   ├── agreement          # 用户协议
│   │   ├── agreement.js
│   │   ├── agreement.json
│   │   ├── agreement.wxml
│   │   └── agreement.wxss
│   ├── chat               # AI对话
│   │   ├── chat.js
│   │   ├── chat.json
│   │   ├── chat.wxml
│   │   └── chat.wxss
│   ├── image              # 图片生成
│   │   ├── image.js
│   │   ├── image.json
│   │   ├── image.wxml
│   │   └── image.wxss
│   ├── copy               # 文案创作
│   │   ├── copy.js
│   │   ├── copy.json
│   │   ├── copy.wxml
│   │   └── copy.wxss
│   └── idea               # 创意激发
│       ├── idea.js
│       ├── idea.json
│       ├── idea.wxml
│       └── idea.wxss
├── uni_modules            # uni-app 模块
├── uniCloud-aliyun        # 云开发相关
├── static                 # 静态资源
├── utils                  # 工具函数
│   └── util.js            # 通用工具函数
└── manifest.json          # 应用配置文件
```

## 功能模块
1. 工具首页
   - 展示所有AI工具入口
   - 提供工具分类和快速访问

2. 个人中心
   - 用户信息展示
   - 设置管理
   - 客服联系
   - 用户协议查看

3. AI对话
   - 智能对话功能
   - 历史记录保存
   - 对话内容展示

4. 图片生成
   - AI绘画创作
   - 图片预览
   - 图片保存

5. 文案创作
   - 智能文案生成
   - 文案编辑
   - 文案保存

6. 创意激发
   - 创意建议
   - 灵感激发
   - 创意保存

## 技术特点
1. 使用 uni-app 框架，支持多端发布
2. 采用自定义导航栏组件
3. 使用 flex 布局实现响应式设计
4. 统一的样式规范和组件复用
5. 模块化的代码结构
6. 完善的错误处理机制
7. 支持云开发功能
8. 支持分包加载优化

## 开发环境
- HBuilderX IDE
- Node.js 环境
- 微信开发者工具（开发微信小程序时使用）
- 小程序基础库 2.19.0 或以上

## 项目依赖
- uni-app 框架
- uniCloud 云开发
- 自定义导航栏组件
- 其他第三方组件（根据需求添加）

## 开发规范
1. 代码规范
   - 使用 ES6+ 语法
   - 遵循 Vue.js 官方风格指南
   - 使用 JSDoc 注释
   - 使用 ESLint 进行代码检查
   - 使用 Prettier 进行代码格式化

2. 命名规范
   - 文件命名：小写字母，多个单词用连字符(-)连接
   - 变量命名：驼峰命名法
   - 组件命名：小写字母，多个单词用连字符(-)连接
   - 常量命名：全大写，下划线分隔

3. 目录规范
   - 页面文件放在 pages 目录下
   - 组件文件放在 components 目录下
   - 静态资源放在 static 目录下
   - 工具函数放在 utils 目录下
   - 云开发相关放在 uniCloud-aliyun 目录下

## 更新日志
### v1.0.0 (2024-01-01)
- 首次发布
- 支持基础AI创作功能
- 优化用户界面交互

### v1.1.0 (2024-02-01)
- 新增图片生成功能
- 优化响应速度
- 修复已知问题

### v1.2.0 (2024-03-01)
- 集成 uniCloud 云开发
- 优化性能，支持分包加载
- 完善错误处理机制
- 更新 UI 设计

## License & Attribution / 许可与来源

Original project code authored for this repository is released under the MIT License; see [LICENSE](./LICENSE).

When reusing or redistributing a substantial portion, retain the LICENSE and its copyright notice. The copyright notice includes this original source URL: https://github.com/change979666/ai-toolbar-miniprogram. Please keep the source link visible in your redistributed source or project documentation.

This license applies only to original material that the repository maintainer has the right to license. Third-party libraries, vendor code, platform SDKs, trademarks, screenshots, icons, fonts, and other external assets remain subject to their respective licenses and terms. Review those terms before reuse.

**Project status:** personal/archived project, shared as-is. Maintenance, compatibility, and production readiness are not guaranteed.
