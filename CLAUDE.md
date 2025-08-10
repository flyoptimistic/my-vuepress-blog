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

## 使用说明

### 创建新文章模板
为了避免重复配置 frontmatter，项目提供了自动化文章创建脚本：

#### 使用方法
```bash
npm run new-post
```

#### 交互式创建流程
运行命令后会提示输入：
- 文章标题
- 分类（用逗号分隔，如：Java,并发编程）
- 标签（用逗号分隔，如：JMM,内存模型,多线程）
- 文件名（不含.md扩展名）
- 文件夹路径（如：java/concurrent）

#### 自动生成的 frontmatter 格式
```yaml
---
title: 深入理解Java内存模型（JMM）
date: 2024-01-03
category:
  - Java
  - 并发编程
tag:
  - JMM
  - 内存模型
  - 多线程
  - 并发
---
```

#### 功能特性
- 自动生成当前日期
- 自动创建目录结构（如果不存在）
- 标准化的 frontmatter 格式
- 避免重复配置工作

### 图片管理和上传

博客支持自动化图片上传和链接转换，将本地图片转换为远程图床链接。

#### 方案一：自动上传到图床（推荐）

支持多种图床服务：
- **GitHub**: 使用 GitHub 仓库作为图床（推荐，稳定且免费）
- **SM.MS**: 免费图床服务
- **腾讯云COS**: 商业云存储服务

##### 使用步骤：

1. **配置环境变量**：
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，填入对应图床服务的配置信息
   ```

2. **自动上传并转换所有图片**：
   ```bash
   npm run upload-images
   ```

3. **处理单个文件**：
   ```bash
   node upload-images.js docs/posts/java/concurrent/某篇文章.md
   ```

#### 方案二：手动映射转换

适合已经有图片托管服务，只需要批量替换链接的场景：

1. **扫描本地图片引用**：
   ```bash
   npm run scan-images
   ```

2. **交互式添加图片映射**：
   ```bash
   npm run add-image-mapping
   ```

3. **批量替换图片链接**：
   ```bash
   npm run replace-image-links
   ```

#### 支持的转换格式
- **转换前**: `![图片描述](/images/java/jvm/内存模型.png)`
- **转换后**: `![图片描述](https://cdn.jsdelivr.net/gh/username/repo@main/images/java-jvm-内存模型.png)`

#### 图片管理最佳实践
- 本地开发时继续使用 `/images/` 路径
- 发布前运行图片上传脚本
- 保持本地图片文件作为备份
- 使用有意义的图片文件名