import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
    // 1. 基础配置
    bundler: viteBundler(),
    lang: 'zh-CN',
    title: '北木南的博客',
    description: '一个专注于 Java, 高并发, 数据库和各类编程技术的个人博客。',
    base: '/',

    // 2. SEO 和头部标签配置
    head: [
        ['link', { rel: 'icon', href: '/images/logo.jpg' }],
        ['meta', { name: 'author', content: '北木南' }],
        ['meta', { name: 'keywords', content: 'Java, 高并发, 数据库, Spring, 算法, 前端, 后端, 博客, 北木南' }],
    ],

    // 3. 配置 vuepress-theme-hope 主题
    theme: hopeTheme({
        // --- 基础信息 ---
        hostname: 'https://你的域名.com', // ❗ 必须！填写你未来部署的域名
        author: {
            name: '北木南',
            url: 'https://github.com/flyoptimistic', // 你的个人链接
        },
        logo: '/images/logo.jpg',
        repo: 'flyoptimistic/my-vuepress-blog', // 你的仓库地址

        // --- 导航栏 (Navbar) ---
        // 好消息是，你之前的 navbar 配置与新主题完全兼容！
        navbar: [
            { text: '首页', link: '/' },
            {
                text: 'Java',
                children: [
                    { text: 'Java 基础', link: '/posts/java/base/' },
                    { text: 'Java AI', link: '/posts/java/ai/' },
                    { text: 'JVM', link: '/posts/java/jvm/' },
                    { text: '高并发', link: '/posts/java/concurrent/' },
                    { text: 'Spring', link: '/posts/java/spring/' },
                ],
            },
            { text: '前端', link: '/posts/front/' },
            { text: '算法', link: '/posts/algorithm/' },
            {
                text: '数据库',
                children: [
                    { text: '数据库基础', link: '/posts/database/base/' },
                    { text: 'MySQL', link: '/posts/database/mysql/' },
                ],
            },
            { text: '开发记录', link: '/posts/development/' },
        ],

        // --- 侧边栏 (Sidebar) ---
        // 你的 sidebar 配置也与新主题完全兼容！
        sidebar: {
            '/posts/java/base/': [{ text: 'Java 基础', children: ['/posts/java/base/README.md'] }],
            '/posts/java/ai/': [{ text: 'Java AI', children: ['/posts/java/ai/README.md'] }],
            // ... 你其他的 sidebar 配置可以继续放在这里
        },

        // --- 强大的主题内置插件 ---
        plugins: {
            // 开启博客功能
            blog: true,

            // 开启评论功能 (这里使用 Giscus)
            comment: {
                provider: 'Giscus',
                repo: 'flyoptimistic/my-vuepress-blog', // 替换为你的 "用户名/仓库名"
                repoId: 'YOUR_REPO_ID',                 // ❗ 需要替换为你的 Repo ID
                category: 'Announcements',             // 替换为你的 Discussion 分类名
                categoryId: 'YOUR_CATEGORY_ID',        // ❗ 需要替换为你的 Category ID
            },

            // Markdown 增强
            mdEnhance: {
                tabs: true,
                codetabs: true,
                tasklist: true,
                container: true, // 启用自定义容器 ::: tip
            },

            // 代码复制功能 (默认开启，这是它的配置)
            copyCode: {},

            // 其他插件如 PWA, SEO 等也可以在这里配置
            // pwa: true,
            // seo: true,
        },
    }),

    // 我们不再需要顶层的 plugins 数组，因为功能都由主题管理
    // plugins: [],
})