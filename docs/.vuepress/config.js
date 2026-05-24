import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'

const siteBase = process.env.DEPLOY_BASE || '/'
const siteUrl = `https://flyoptimistic.github.io${siteBase === '/' ? '' : siteBase.slice(0, -1)}`

export default defineUserConfig({
    // 基础配置
    bundler: viteBundler({
        viteOptions: {
            css: {
                preprocessorOptions: {
                    scss: {
                        quietDeps: true,
                        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'mixed-decls'],
                    },
                    sass: {
                        quietDeps: true,
                        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'mixed-decls'],
                    },
                },
            },
            build: {
                minify: 'terser', // 生产环境压缩方式
                chunkSizeWarningLimit: 1000,
                rollupOptions: {
                    onwarn(warning, warn) {
                        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                            return
                        }

                        warn(warning)
                    },
                },
            }
        }
    }),
    lang: 'zh-CN',
    title: '北木南的博客',
    description: '一个记录 Java 后端学习、工程实践、技术复盘和个人成长的个人博客。',
    base: siteBase,

    // SEO 和头部标签配置
    head: [
        ['link', { rel: 'icon', href: `${siteBase}images/logo.jpg` }],
        ['meta', { name: 'author', content: '北木南' }],
        ['meta', { name: 'keywords', content: 'Java, 后端, JVM, 并发编程, 数据库, Spring, 成长记录, 读书笔记, 技术复盘, 北木南' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: '北木南的博客' }],
        ['meta', { property: 'og:description', content: '一个记录 Java 后端学习、工程实践、技术复盘和个人成长的个人博客。' }],
        ['meta', { property: 'og:image', content: `${siteUrl}/images/logo.jpg` }],
        ['meta', { property: 'og:url', content: siteUrl }],
        ['meta', { property: 'og:site_name', content: '北木南的博客' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:image', content: `${siteUrl}/images/logo.jpg` }],
        ['meta', { 'http-equiv': 'cache-control', content: 'max-age=31536000' }],
        ['meta', { 'http-equiv': 'expires', content: '31536000' }],
        
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
        // 默认 frontmatter 配置
        blog: {
            description: "记录 Java 后端学习、工程实践、技术复盘和个人成长",
            intro: "/about.html",
            medias: {
                GitHub: "https://github.com/flyoptimistic",
            },
        },
        // 基础信息
        hostname: 'https://flyoptimistic.github.io', // GitHub Pages 根域名，base 会拼接项目路径
        author: {
            name: '北木南',
            url: 'https://github.com/flyoptimistic',
        },
        logo: `${siteBase}images/logo.jpg`,
        repo: 'flyoptimistic/my-vuepress-blog',

        // 导航栏
        navbar: [
            { text: '首页', link: '/' },
            {
                text: '技术专题',
                children: [
                    { text: 'Java 基础', link: '/posts/java/base/' },
                    { text: 'JVM', link: '/posts/java/jvm/' },
                    { text: '并发编程', link: '/posts/java/concurrent/' },
                    { text: 'Spring', link: '/posts/java/spring/' },
                    { text: '数据库', link: '/posts/database/' },
                ],
            },
            {
                text: '成长记录',
                children: [
                    { text: '成长周记', link: '/posts/growth/weekly/' },
                    { text: '阶段复盘', link: '/posts/growth/review/' },
                    { text: '读书笔记', link: '/posts/reading/' },
                    { text: '开发记录', link: '/posts/development/' },
                ],
            },
            {
                text: 'AI 工具',
                children: [
                    { text: 'AI 实践', link: '/posts/ai/' },
                    { text: 'Claude', link: '/posts/ai/claude/' },
                    { text: 'Gemini', link: '/posts/ai/gemini/' },
                ],
            },
            { text: '友链', link: '/friends.html' },
            { text: '关于', link: '/about.html' },
        ],

        // 结构化侧边栏排序：README 固定在前，其余优先使用 frontmatter order
        sidebarSorter: ['readme', 'order', 'filename'],

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
            '/posts/growth/weekly/': 'structure',
            '/posts/growth/review/': 'structure',
            '/posts/growth/': 'structure',
            '/posts/reading/': 'structure',
            '/posts/ai/claude/': 'structure',
            '/posts/ai/gemini/': 'structure',
            '/posts/ai/': 'structure',
            
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
            
            // 基础搜索功能
            // search: {},

            // SEO优化 - 基础配置
            // sitemap: {
            //     hostname: 'https://flyoptimistic.github.io'
            // },

            // Markdown 增强功能
            mdEnhance: {
                gfm: true,
                align: true,
                attrs: true,
                sup: true,
                sub: true,
                mark: true,
                tasklist: true,
                tabs: true,
                codetabs: true,
            },

            // 代码复制功能
            copyCode: {},

            // 阅读时间统计
            readingTime: {
                wordPerMinute: 300
            }
        },

        // 面包屑导航
        breadcrumb: true,
        
        // 页面信息显示
        pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime', 'Word'],
    }),
})
