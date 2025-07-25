import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defaultTheme } from '@vuepress/theme-default'

// --- 基础插件 ---
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

// --- 新增的强大插件 ---



export default defineUserConfig({
    // --- 网站基础配置 ---
    bundler: webpackBundler(),
    lang: 'zh-CN',
    title: '北木南的博客',
    description: '一个专注于 Java, 高并发, 数据库和各类编程技术的个人博客。', // 优化点：更丰富的描述有利于SEO
    base: '/',

    // --- SEO 和头部标签配置 ---
    head: [
        ['link', { rel: 'icon', href: '/images/logo.jpg' }], // 网站图标
        ['meta', { name: 'author', content: '北木南' }],
        ['meta', { name: 'keywords', content: 'Java, 高并发, 数据库, Spring, 算法, 前端, 后端, 博客, 北木南' }],
        ['meta', { property: 'og:title', content: '北木南的博客' }],
        ['meta', { property: 'og:description', content: '一个专注于 Java, 高并发, 数据库和各类编程技术的个人博客。' }],
    ],

    // --- 插件配置 ---
    plugins: [
        // 基础插件
        searchPlugin({ locales: { '/': { placeholder: '搜索' } } }),
        backToTopPlugin(),
        nprogressPlugin(),
    ],

    // --- 主题配置 ---
    theme: defaultTheme({
        logo: '/images/logo.jpg', // 建议将logo放在 public/images/ 目录下

        // --- Git 相关信息 ---
        lastUpdated: true,
        lastUpdatedText: '最后更新于',
        contributors: true,
        contributorsText: '本文贡献者',

        // --- 导航栏 ---
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
            { text: 'GitHub', link: 'https://github.com/flyoptimistic/my-vuepress-blog', target:'_blank' },
        ],

        // --- 侧边栏 ---
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
        },
    }),
})
