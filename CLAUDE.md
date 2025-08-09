# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作提供指导。请默认使用中文回答。

## 项目概述

这是一个基于 VuePress 2.0 的博客项目（"北木南的博客"），使用 Vue 3、Vite 和 vuepress-theme-hope 主题构建。博客专注于技术内容，包括 Java、数据库、算法和前端开发。

## 开发命令

**本地开发：**
```bash
npm run docs:dev              # 在 8080 端口启动开发服务器
npm run docs:dev-port         # 在 9090 端口启动开发服务器
```

**构建：**
```bash
npm run docs:build            # 构建静态文件到 docs/.vuepress/dist
```

**安装：**
```bash
npm install --legacy-peer-deps    # 安装依赖（使用 legacy 标志避免冲突）
```

## 架构

**核心结构：**
- **VuePress 配置：** `docs/.vuepress/config.js` - 使用 vuepress-theme-hope 的主配置
- **内容结构：** `docs/posts/` - 按技术分类组织（java、database、algorithm、front 等）
- **静态资源：** `docs/.vuepress/public/` - 图片和其他静态资源
- **样式：** `docs/.vuepress/style/index.scss` - 自定义样式
- **侧边栏配置：** `docs/.vuepress/sidebar.ts` - 导航结构

**主题和插件：**
- 使用 `vuepress-theme-hope` 作为主主题
- 内置插件：blog、searchPro、comment (Giscus)、mdEnhance、copyCode
- Vite 打包器提供快速开发和构建

**内容组织：**
```
docs/posts/
├── java/           # Java 相关内容
│   ├── base/       # Java 基础
│   ├── ai/         # Java AI
│   ├── jvm/        # JVM 主题
│   ├── concurrent/ # 并发编程
│   └── spring/     # Spring 框架
├── database/       # 数据库内容
│   ├── base/       # 数据库基础
│   └── mysql/      # MySQL 专题
├── algorithm/      # 算法和数据结构
├── front/          # 前端开发
└── development/    # 开发实践
```

**配置要点：**
- Base URL 在 config.js 中设置为 `/`
- 主题包含完整的导航栏和侧边栏配置
- 评论系统配置为 Giscus（需要仓库和分类 ID）
- 启用了博客功能和搜索功能

## 重要文件

- `docs/.vuepress/config.js` - VuePress 主配置文件
- `docs/README.md` - 首页配置，包含英雄区和特性卡片
- `使用说明.md` - 详细的设置和部署说明
- `package.json` - 依赖和脚本配置

## 开发注意事项

- 默认端口 8080；如需要可使用备用端口 9090
- 构建输出到 `docs/.vuepress/dist` 用于部署
- 已配置 GitHub Pages 部署，但可能需要设置工作流
- 主题支持中文语言（lang: 'zh-CN'）