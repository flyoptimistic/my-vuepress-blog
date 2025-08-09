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
        hostname: 'https://flyoptimistic.github.io/my-vuepress-blog/',
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
        sidebar: {
            '/posts/java/base/': [{ text: 'Java 基础', children: ['/posts/java/base/README.md'] }],
            '/posts/java/ai/': [{ text: 'Java AI', children: ['/posts/java/ai/README.md'] }],
            '/posts/java/jvm/': [{ text: 'JVM 深入', children: ['/posts/java/jvm/README.md'] }],
            '/posts/java/concurrent/': [{ text: '高并发编程', children: ['/posts/java/concurrent/README.md'] }],
            '/posts/java/spring/': [{ text: 'Spring 生态', children: ['/posts/java/spring/README.md'] }],
            '/posts/front/': [{ text: '前端技术', children: ['/posts/front/README.md'] }],
            '/posts/algorithm/': [{ text: '算法与数据结构', children: ['/posts/algorithm/README.md'] }],
            '/posts/database/base/': [{ text: '数据库基础', children: ['/posts/database/base/README.md'] }],
            '/posts/database/mysql/': [{ text: 'MySQL 专项', children: ['/posts/database/mysql/README.md'] }],
            '/posts/development/': [{ text: '开发记录', children: ['/posts/development/README.md'] }],
            '/posts/back/': [{ text: '后端技术', children: ['/posts/back/README.md'] }],
            '/posts/other/': [{ text: '其他技术', children: ['/posts/other/README.md'] }],
        },

        // --- 强大的主题内置插件 ---
        plugins: {
            // 开启博客功能
            blog: true,
            searchPro: true,

            // 评论功能 (需要配置 GitHub Discussions)
            // comment: {
            //     provider: 'Giscus',
            //     repo: 'flyoptimistic/my-vuepress-blog',
            //     repoId: '', // 需要从 Giscus 获取
            //     category: 'General',
            //     categoryId: '', // 需要从 Giscus 获取
            // },

            // Markdown 增强
            mdEnhance: {
                tabs: true,
                codetabs: true,
                tasklist: true,
                hint: true, // 启用自定义容器 ::: tip
                footnote: true,
                mark: true,
                sub: true,
                sup: true,
                align: true,
                attrs: true,
                imgLazyload: true,
                imgSize: true,
                figure: true,
            },

            // 代码复制功能 (默认开启，这是它的配置)
            copyCode: {},

            // SEO 优化
            seo: {
                autoDescription: true,
            },

            // PWA 支持
            pwa: {
                favicon: "/favicon.ico",
                cacheHTML: true,
                appendBase: true,
                apple: {
                    icon: "/images/logo.jpg",
                    statusBarColor: "black",
                },
                msTile: {
                    image: "/images/logo.jpg",
                    color: "#ffffff",
                },
                manifest: {
                    icons: [
                        {
                            src: "/images/logo.jpg",
                            sizes: "512x512",
                            purpose: "maskable",
                            type: "image/jpeg",
                        },
                    ],
                },
            },

            // 网站地图
            sitemap: {
                hostname: 'https://flyoptimistic.github.io/my-vuepress-blog/',
            },
        },
    }),

    // 我们不再需要顶层的 plugins 数组，因为功能都由主题管理
    // plugins: [],
})