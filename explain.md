# 北木南的博客 - 完整说明文档

这是一个经过全面优化的 VuePress 2.0 个人博客项目，专注于技术分享，包含 Java、数据库、算法和前端开发等内容。

## 🌟 项目特性

### ✨ 核心特性
- **现代化架构**: 基于 Vue 3、Vite 和 vuepress-theme-hope 主题
- **完整的 SEO 优化**: 自动生成站点地图、meta 标签优化
- **PWA 支持**: 支持离线访问和添加到主屏幕
- **自动化部署**: 完整的 GitHub Actions CI/CD 配置
- **响应式设计**: 完美适配移动端和桌面端
- **全文搜索**: 内置 searchPro 插件，快速定位内容

### 📝 增强的 Markdown 功能
- 代码块语法高亮和复制功能
- 自定义容器（提示、警告、危险等）
- 任务列表支持
- 脚注和标记功能
- 图片懒加载和尺寸优化
- 上标、下标和对齐功能

## 🏗️ 项目结构

```
vuepress-blog/
├── docs/                          # 文档源码目录
│   ├── .vuepress/                 # VuePress 配置目录
│   │   ├── public/                # 静态资源
│   │   │   └── images/            # 图片资源
│   │   ├── style/                 # 自定义样式
│   │   ├── config.js              # 主配置文件
│   │   └── sidebar.ts             # 侧边栏配置
│   ├── posts/                     # 文章内容目录
│   │   ├── java/                  # Java 相关文章
│   │   │   ├── base/              # Java 基础
│   │   │   ├── ai/                # Java AI
│   │   │   ├── jvm/               # JVM 深入
│   │   │   ├── concurrent/        # 高并发编程
│   │   │   └── spring/            # Spring 生态
│   │   ├── database/              # 数据库相关
│   │   │   ├── base/              # 数据库基础
│   │   │   └── mysql/             # MySQL 专项
│   │   ├── algorithm/             # 算法与数据结构
│   │   ├── front/                 # 前端技术
│   │   ├── back/                  # 后端技术
│   │   ├── development/           # 开发记录
│   │   └── other/                 # 其他技术
│   └── README.md                  # 首页配置
├── .github/                       # GitHub 配置
│   └── workflows/                 
│       └── deploy.yml             # 自动部署工作流
├── .gitignore                     # Git 忽略文件配置
├── package.json                   # 项目依赖和脚本
├── CLAUDE.md                      # Claude Code 使用指南
└── explain.md                     # 项目说明文档（本文件）
```

## 🚀 快速开始

### 1. 环境要求
- **Node.js**: >= 18.16.0
- **Git**: 最新版本
- **npm**: >= 8.0.0（建议升级到 11.5.2）

### 2. 本地开发

```bash
# 克隆项目
git clone git@github.com:flyoptimistic/my-vuepress-blog.git
cd my-vuepress-blog

# 安装依赖（使用 legacy 标志避免依赖冲突）
npm install --legacy-peer-deps

# 启动开发服务器
npm run docs:dev

# 如果端口被占用，使用备用端口
npm run docs:dev-port  # 使用 9090 端口
```

### 3. 构建和部署

```bash
# 构建静态文件
npm run docs:build

# 构建文件将输出到 docs/.vuepress/dist 目录
```

## ⚙️ 配置说明

### 主要配置文件

#### `docs/.vuepress/config.js`
项目的核心配置文件，包含：
- 基础网站信息（标题、描述、语言）
- SEO 优化配置
- 主题配置和插件设置
- 导航栏和侧边栏配置
- PWA 和 SEO 功能配置

#### 关键配置项
```javascript
// 基础配置
title: '北木南的博客'
lang: 'zh-CN'
hostname: 'https://flyoptimistic.github.io/my-vuepress-blog/'

// 启用的功能
plugins: {
    blog: true,              // 博客功能
    searchPro: true,         // 专业搜索
    seo: { autoDescription: true },  // SEO 优化
    pwa: { /* PWA 配置 */ }, // 离线支持
    sitemap: { /* 站点地图 */ }
}
```

## 🔄 自动化部署

### GitHub Actions 工作流

项目配置了完整的 CI/CD 流程：

1. **触发条件**: 推送到 `main` 分支时自动触发
2. **构建过程**: 
   - 检出代码并获取完整 git 历史
   - 设置 Node.js 18 环境
   - 安装依赖和构建项目
   - 上传构建产物
3. **部署过程**: 自动部署到 GitHub Pages

### 部署配置要点

```yaml
# .github/workflows/deploy.yml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
    paths-ignore: [".gitignore", "README.md", "CLAUDE.md"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write
```

## 📊 已完成的优化项目

### ✅ 文件清理和组织
- 删除冗余配置文件（`1.js`, `oldconfig.js`）
- 优化 `.gitignore` 文件，专门为 VuePress 项目定制
- 规范化项目目录结构

### ✅ 配置完善
- 修复所有占位符问题（hostname、repo 信息）
- 完善所有技术分类的侧边栏配置
- 启用 SEO 和 PWA 功能
- 增强 Markdown 渲染功能

### ✅ 部署优化
- 创建完整的 GitHub Actions 工作流
- 支持自动化构建和部署
- 优化构建缓存和性能

### ✅ 依赖管理
- 更新 Vue 到最新稳定版本 (3.5.18)
- 保持 VuePress 和主题在稳定版本
- 优化包管理配置

## 🎯 使用建议

### 内容创建
1. **文章结构**: 每个分类下创建具体的 Markdown 文件
2. **资源管理**: 图片放在 `docs/.vuepress/public/images/` 目录
3. **SEO 优化**: 为每篇文章添加合适的 frontmatter

### 功能扩展
1. **评论系统**: 如需启用，配置 Giscus（已预留配置）
2. **数学公式**: 可启用 KaTeX 支持
3. **图表支持**: 可添加 Mermaid 图表功能

### 性能优化
- 图片使用懒加载（已启用）
- 代码块自动高亮（已启用）
- PWA 离线缓存（已配置）

## 🔧 开发工具支持

- **Claude Code**: 已配置 `CLAUDE.md` 文件，支持中文交互
- **IDE 支持**: 兼容 VS Code、WebStorm 等主流编辑器
- **Git 集成**: 自动显示文章最后更新时间和贡献者

## 📞 技术支持

- **项目地址**: https://github.com/flyoptimistic/my-vuepress-blog
- **在线访问**: https://flyoptimistic.github.io/my-vuepress-blog/
- **技术文档**: VuePress 2.x 官方文档
- **主题文档**: vuepress-theme-hope 官方文档

---

© 2025 北木南 | 基于 VuePress 2.0 构建