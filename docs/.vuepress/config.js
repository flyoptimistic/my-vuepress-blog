import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from 'vuepress'

// 所有配置都应该在同一个 defineUserConfig 函数调用中
export default defineUserConfig({
    // 1. 打包器配置
    // 对于基础配置，直接调用即可，无需传入空对象
    bundler: webpackBundler(),

    // 2. 网站基础信息配置
    lang: 'zh-CN',
    title: '北木南的博客',
    description: '由 VuePress 2 驱动',
    base: '/', // 用于部署的根路径

    // 3. 插件配置
    plugins: [
        searchPlugin({
            locales: {
                '/': { placeholder: '搜索' },
            },
        }),
    ],

    // 4. 主题配置
    theme: defaultTheme({
        logo: 'https://vuejs.org/images/logo.png', // 可以换成你自己的 Logo
        navbar: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/posts/front/' },
            { text: '后端', link: '/posts/back/' },
            { text: '算法', link: '/posts/algorithm/' },
            { text: '数据库', link: '/posts/database/' },
            { text: '其他', link: '/posts/other/' },
            { text: 'GitHub', link: 'https://github.com/flyoptimistic/my-vuepress-blog', target:'_blank' },
        ],
    }),
})
