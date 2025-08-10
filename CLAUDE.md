# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 项目概览

这是一个使用 VuePress 2.0 和 vuepress-theme-hope 主题构建的个人博客。博客专注于 Java、并发编程、数据库、算法和前端开发。网站结构为技术知识库，内容按类别组织。

## 开发命令

### 本地开发
- `npm run docs:dev` - 启动开发服务器（默认端口 8080）
- `npm run docs:dev-port` - 在端口 9090 启动开发服务器

- `npm run docs:build` - 构建生产环境静态文件

### 安装依赖
- `npm install --legacy-peer-deps` - 安装依赖包（使用 legacy peer deps 避免冲突）

## 架构设计

### 核心结构
- `docs/` - 包含所有 Markdown 文件的主要内容目录
- `docs/.vuepress/config.js` - VuePress 主配置文件
- `docs/.vuepress/public/` - 静态资源（图片、favicon 等）
- `docs/posts/` - 按类别组织的博客内容
- `docs/README.md` - 首页内容，包含英雄区和功能卡片

### 主题配置
项目使用 vuepress-theme-hope 主题，特性包括：
- 自动侧边栏生成（`sidebar: 'structure'`）
- 启用博客功能
- 通过 searchPro 插件提供搜索功能
- Markdown 增强功能（标签页、代码标签页、任务列表、提示框）
- 配置了 Giscus 评论系统（需要设置）

### 内容组织结构
博客文章在 `/docs/posts/` 目录下按以下结构组织：
- `java/` - Java 相关内容（基础、AI、JVM、并发、Spring）
- `database/` - 数据库内容（基础、MySQL）
- `algorithm/` - 算法和数据结构内容
- `front/` - 前端开发内容
- `development/` - 开发记录和笔记
- `back/` - 后端开发内容
- `other/` - 其他内容

### 关键配置详情
- 语言：中文（zh-CN）
- 基础路径：`/`（配置为根目录部署）
- 打包工具：Vite，提供快速开发和构建
- 主题特性：博客模式、搜索、Markdown 扩展、代码复制

## 部署配置
项目配置了 GitHub Pages 自动部署。部署流程使用 GitHub Actions，当代码推送到 main 分支时自动构建并部署到 gh-pages 分支。

## 重要注意事项
- 修改导航或侧边栏时，需编辑 `docs/.vuepress/config.js`
- 首页内容由 `docs/README.md` 的 frontmatter 控制
- 所有博客内容应放置在 `docs/posts/` 下的相应子目录中
- 静态资源放在 `docs/.vuepress/public/` 目录
- 主题使用自动侧边栏生成，文件结构决定导航结构