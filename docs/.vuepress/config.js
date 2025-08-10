import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
    // 基础配置
    bundler: viteBundler({
        viteOptions: {
            logLevel: 'error',
            server: {
                port: 8080,
                open: true // 自动打开浏览器
            },
            build: {
                minify: 'terser' // 生产环境压缩方式
            }
        }
    }),
    lang: 'zh-CN',
    title: '北木南的博客',
    description: '一个专注于 Java, 高并发, 数据库和各类编程技术的个人博客。',
    base: '/',

    // SEO 和头部标签配置
    head: [
        ['link', { rel: 'icon', href: '/images/logo.jpg' }],
        ['meta', { name: 'author', content: '北木南' }],
        ['meta', { name: 'keywords', content: 'Java, 高并发, 数据库, Spring, 算法, 前端, 后端, 博客, 北木南' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: '北木南的博客' }],
        ['meta', { property: 'og:description', content: '一个专注于 Java, 高并发, 数据库和各类编程技术的个人博客。' }],
        
        // 字体预加载 - 提升字体加载性能
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap', as: 'style' }],
        ['link', { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }],
        ['link', { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap', as: 'style' }],
        
        // 字体显示优化
        ['style', {}, `
            /* 字体回退策略 */
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif; }
            /* 避免字体加载时的布局偏移 */
            * { font-display: swap; }
        `],
    ],

    // 配置 vuepress-theme-hope 主题
    theme: hopeTheme({
        // 基础信息
        hostname: 'https://flyoptimistic.github.io', // GitHub Pages 域名
        author: {
            name: '北木南',
            url: 'https://github.com/flyoptimistic',
        },
        logo: '/images/logo.jpg',
        repo: 'flyoptimistic/my-vuepress-blog',

        // 导航栏
        navbar: [
            { text: '首页', link: '/' },
            {
                text: 'Java',
                children: [
                    { text: 'Java 基础', link: '/posts/java/base/' },
                    { text: 'Java 设计模式', link: '/posts/java/base/' },
                    { text: 'JVM', link: '/posts/java/jvm/' },
                    { text: '并发编程', link: '/posts/java/concurrent/' },
                    { text: 'Spring', link: '/posts/java/spring/' },
                    { text: 'AI', link: '/posts/ai/' },
                ],
            },
            {
                text: '数据库',
                children: [
                    { text: '数据库基础', link: '/posts/database/base/' },
                    { text: 'MySQL', link: '/posts/database/mysql/' },
                    { text: 'Redis', link: '/posts/database/redis/' },
                    { text: 'Es', link: '/posts/database/es/' },
                ],
            },
            {
                text: '系统技术',
                children: [
                    { text: '计算机系统', link: '/posts/other/system/' },
                    { text: 'Linux 系统', link: '/posts/other/linux/' },
                    { text: '系统架构', link: '/posts/other/' },
                ],
            },
            {
                text: '开发技术',
                children: [
                    { text: '前端技术', link: '/posts/front/' },
                    { text: '后端技术', link: '/posts/back/' },
                    { text: '开发记录', link: '/posts/development/' },
                ],
            },
            {
                text: '算法与数据结构',
                children: [
                    { text: '算法', link: '/posts/algorithm/' }
                ],
            },
            {
                text: 'AI',
                children: [
                    { text: 'AI', link: '/posts/ai/' },
                    { text: 'GEMINI', link: '/posts/ai/gemini' },
                    { text: 'CLAUDE', link: '/posts/ai/claude' }
                ],
            },
            { text: '友链', link: '/friends.html' },
            { text: '关于', link: '/about.html' },
        ],

        // 优化侧边栏配置 - 按路径精确匹配
        sidebar: {
            // Java 相关页面的侧边栏
            '/posts/java/jvm/': 'structure',
            '/posts/java/concurrent/': 'structure',
            '/posts/java/base/': 'structure', 
            '/posts/java/spring/': 'structure',
            '/posts/java/ai/': 'structure',
            '/posts/java/': 'structure',
            
            // 数据库相关页面的侧边栏
            '/posts/database/mysql/': 'structure',
            '/posts/database/redis/': 'structure',
            '/posts/database/base/': 'structure',
            '/posts/database/': 'structure',
            
            // 系统技术相关页面的侧边栏
            '/posts/other/system/': 'structure',
            '/posts/other/linux/': 'structure',
            '/posts/other/': 'structure',
            
            // 开发技术相关页面的侧边栏
            '/posts/front/': 'structure',
            '/posts/back/': 'structure',
            '/posts/algorithm/': 'structure',
            '/posts/development/': 'structure',
            
            // 避免显示 posts 层级 - 对于根目录使用空侧边栏
            '/posts/': false,
            
            // 独立页面不显示侧边栏
            '/friends.html': false,
            '/about.html': false,
            
            // 默认侧边栏 - 只对首页生效
            '/': false,
        },

        // 主题插件配置
        plugins: {
            // 博客功能
            blog: true,
            
            // 搜索功能
            // 注意：使用默认搜索，不使用已过期的searchPro

            // Markdown 增强
            mdEnhance: {
                gfm: true,
                align: true,
                attrs: true,
                mark: true,
                sub: true,
                sup: true,
                tasklist: true,
            },

            // 代码复制功能
            copyCode: {},
        },
    }),
})