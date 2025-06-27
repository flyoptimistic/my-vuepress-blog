北木南的博客


这是我的个人博客项目，使用 VuePress 2.0 强力驱动，用于记录技术学习、思考和生活中的点滴。

线上访问地址: https://flyoptimistic.github.io/my-vuepress-blog/ (请替换为你的实际部署地址)

✨ 特性
现代化: 基于 Vue 3 和 Vite，享受极致的开发体验和飞快的应用性能。
功能完备: 内置响应式默认主题、全文搜索、Git集成的“最后更新时间”等功能。
Markdown 扩展: 支持你用 Markdown 书写一切，并提供了丰富的扩展语法（如容器、数学公式等）。
自动化部署: 配置了 GitHub Actions，实现推送代码后自动部署到 GitHub Pages。

目录结构
.
├── docs
│   ├── .vuepress       # VuePress 的核心配置目录
│   │   ├── public      # 存放公共静态资源，如 favicon, logo 等
│   │   └── config.js   # 项目的核心配置文件
│   ├── posts           # 存放所有博客文章的 Markdown 文件
│   └── README.md       # 网站的首页
├── .github
│   └── workflows
│       └── deploy.yml  # GitHub Actions 自动化部署配置文件
├── node_modules        # 项目依赖包（由 .gitignore 忽略）
├── .gitignore          # 配置 Git 忽略规则的文件
├── package.json        # 项目依赖和脚本命令的配置文件
└── README.md           # 就是你正在看的这个项目说明文件
🚀 快速开始
1. 环境准备
   在开始之前，请确保你的电脑上已安装以下软件：

Node.js: 版本要求 >= 18.16.0。可以通过 node -v 命令检查。
Git: 用于版本控制和代码托管。
2. 项目安装
   Bash

# 1. 克隆本项目到本地
git clone git@github.com:flyoptimistic/my-vuepress-blog.git

# 2. 进入项目目录
cd my-vuepress-blog

# 3. 安装项目依赖
# 我们之前的经验表明，使用 --legacy-peer-deps 可以避免潜在的依赖冲突问题
npm install --legacy-peer-deps
3. 本地开发
   运行以下命令，启动本地开发服务器：

Bash

npm run docs:dev
服务启动后，你应该能在终端看到 ... is listening at http://localhost:8080/ 的提示。在浏览器中打开该地址即可实时预览你的博客。

💡 避坑提示：端口占用
如果 8080 端口被占用导致启动失败 (出现 EACCES 错误)，可以运行 npm run docs:dev -- --port 9090 来指定一个新端口。

4. 项目打包
   当你准备部署时，运行以下命令来生成静态文件：

Bash

npm run docs:build
该命令会在 docs/.vuepress/dist 目录下生成所有用于部署的静态 HTML、CSS 和 JS 文件。

部署到 GitHub Pages
本项目配置了 GitHub Actions，可以实现非常优雅的自动化部署。你只需要将代码推送到 main 分支，部署过程就会自动触发。

1. 修改 config.js 配置
   部署到 GitHub Pages 前，最重要的一步是正确设置 base 路径。打开 docs/.vuepress/config.js 文件，修改 base 选项：

JavaScript

export default defineUserConfig({
// base 的值必须是 "/你的仓库名/"
base: '/my-vuepress-blog/',
// ... 其他配置
})
2. 创建 GitHub Actions 配置文件
   在你的项目根目录下，创建 .github/workflows/deploy.yml 文件，并粘贴以下内容：

YAML

name: Deploy GitHub Pages

on:
push:
branches:
- main # 只监听 main 分支的 push 操作

permissions:
contents: write

jobs:
build-and-deploy:
runs-on: ubuntu-latest
steps:
- name: Checkout 🛎️
uses: actions/checkout@v4

      - name: Install and Build 🔧
        run: |
          npm install --legacy-peer-deps
          npm run docs:build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages # 部署到 gh-pages 分支
          folder: docs/.vuepress/dist # VuePress 构建输出的目录
3. 配置 GitHub 仓库
   将你的所有代码（包括上面创建的 deploy.yml 文件）推送到 GitHub 的 main 分支。
   在你的 GitHub 仓库页面，进入 Settings -> Pages。
   在 "Build and deployment" 下，将 Source 设置为 Deploy from a branch。
   将分支设置为 gh-pages，文件夹保持为 /(root)。点击 Save。
   配置完成后，每当你向 main 分支 push 新的提交，GitHub Actions 就会自动运行，将你最新的博客网站构建好并部署到 gh-pages 分支，几分钟后你的线上网站就会更新。

© 2025 北木南