# 北木南的博客

这是一个基于 VuePress 2 和 vuepress-theme-hope 构建的个人成长型技术博客。博客以 Java 后端学习、JVM、并发编程、数据库和工程实践为主线，同时记录成长周记、阶段复盘、读书思考和 AI 工具实践。

站点源码位于本仓库，VuePress 内容入口位于 [docs/README.md](docs/README.md)。

## 项目定位

这个博客不是单纯的资料收集站，而是一个长期维护的个人成长记录空间。

- **技术主线**：Java 后端、JVM、并发编程、Spring、MySQL、Redis、工程化实践。
- **成长记录**：学习周记、阶段复盘、项目复盘、读书笔记和个人思考。
- **实践沉淀**：博客维护、脚本工具、部署流程、AI 辅助开发和问题排查。

内容比例目标：技术内容约 70%，成长记录约 30%。

## 技术栈

- VuePress `2.0.0-rc.9`
- vuepress-theme-hope `2.0.0-rc.33`
- Vue `3.5.x`
- Vite bundler
- Sass
- GitHub Pages

## 目录结构

```text
.
├── docs/
│   ├── README.md                 # 站点首页
│   ├── about.md                  # 关于页
│   ├── friends.md                # 友链页
│   ├── .vuepress/
│   │   ├── config.js             # VuePress 站点配置
│   │   └── public/               # 静态资源
│   └── posts/
│       ├── java/                 # Java 后端成长路线
│       ├── database/             # 数据库实践笔记
│       ├── ai/                   # AI 工具实践
│       ├── growth/               # 成长记录
│       ├── reading/              # 读书与思考
│       └── development/          # 开发记录
├── create-post.js                # 新文章创建脚本
├── image-processor.js            # 图片扫描和链接处理脚本
├── upload-images.js              # 图片上传脚本
└── package.json
```

## 本地开发

安装依赖：

```bash
npm install --legacy-peer-deps
```

启动开发服务器：

```bash
npm run docs:dev
```

指定 9090 端口启动：

```bash
npm run docs:dev-port
```

构建生产静态文件：

```bash
npm run docs:build
```

构建产物默认输出到：

```text
docs/.vuepress/dist
```

## 内容组织

核心栏目：

- [Java 后端成长路线](docs/posts/java/README.md)
- [数据库实践笔记](docs/posts/database/README.md)
- [AI 工具实践](docs/posts/ai/README.md)
- [成长记录](docs/posts/growth/README.md)
- [成长周记](docs/posts/growth/weekly/README.md)
- [阶段复盘](docs/posts/growth/review/README.md)
- [读书与思考](docs/posts/reading/README.md)
- [开发记录](docs/posts/development/README.md)

新增文章优先放入 `docs/posts/` 下的明确栏目。新栏目上线前，需要同时补齐：

- 栏目 `README.md`
- 导航入口或侧边栏规则
- 至少一篇正文，或明确的待补文章清单

## 创建新文章

项目提供交互式文章创建脚本：

```bash
npm run new-post
```

脚本会提示输入：

- 文章类型：`tech` / `growth` / `reading`
- 文章标题
- 分类
- 标签
- 文件名
- 文件夹路径
- 文章摘要
- 是否星标
- 是否置顶

推荐文章路径示例：

```text
java/jvm
java/concurrent
database/mysql
growth/weekly
growth/review
reading
development/blog
```

## 写作规范

### 技术文章

技术文章建议包含：

- 适用范围
- 问题背景
- 核心结论
- 原理拆解
- 示例或实践
- 常见误区
- 延伸阅读
- 修订记录

### 成长记录

成长记录建议包含：

- 本期关键词
- 做了什么
- 遇到的问题
- 收获与反思
- 下一步计划

### frontmatter

推荐使用以下字段：

```yaml
---
title: 文章标题
date: 2026-05-24
description: 用 60 到 120 字说明文章解决的问题和读者收益。
category:
  - Java
tag:
  - JVM
star: false
sticky: false
---
```

## 图片管理

扫描本地图片引用：

```bash
npm run scan-images
```

交互式添加图片映射：

```bash
npm run add-image-mapping
```

批量替换图片链接：

```bash
npm run replace-image-links
```

上传并转换图片链接：

```bash
npm run upload-images
```

图片建议统一放在：

```text
docs/.vuepress/public/images/
```

## 发布流程

项目当前通过 `gh-pages` 分支部署到 GitHub Pages。源码推送到 `main` 和 `dev`，静态构建产物推送到 `gh-pages` 分支根目录。

发布流程：

1. 使用 `DEPLOY_BASE=/my-vuepress-blog/` 构建 VuePress 静态文件。
2. 将 `docs/.vuepress/dist` 内容推送到 `gh-pages` 分支。
3. GitHub Pages 从 `gh-pages` 分支根目录发布站点。

线上地址：

```text
https://flyoptimistic.github.io/my-vuepress-blog/
```

发布前建议本地执行：

```bash
DEPLOY_BASE=/my-vuepress-blog/ npm run docs:build
npm run scan-images
```

## 维护清单

每次新增或调整内容时检查：

- 导航链接是否能访问。
- 栏目 README 是否存在。
- 新文章是否有 `title`、`date`、`description`、`category`、`tag`。
- 图片是否存在或已上传到图床。
- 中文文件名是否会影响外链传播。
- 重要文章是否加入对应专题或栏目索引。
- 发布前是否通过 `npm run docs:build`。

## 常见问题

### Rollup 原生依赖加载失败

如果本地构建时出现类似错误：

```text
Cannot find module @rollup/rollup-darwin-arm64
```

可尝试：

```bash
npm rebuild @rollup/rollup-darwin-arm64
```

如果仍失败，通常是本地 `node_modules` 中 Rollup 原生包损坏或 macOS 代码签名问题。可以在确认不会覆盖重要本地改动后重新安装依赖：

```bash
npm install --legacy-peer-deps
```

## 相关文档

- [项目完善清单](PROJECT_IMPROVEMENT_PLAN.md)
- [优化指南](OPTIMIZATION_GUIDE.md)
- [字体优化说明](FONT_OPTIMIZATION.md)
- [重命名报告](RENAME_REPORT.md)
- [使用说明](使用说明.md)
