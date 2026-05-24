#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function createPost() {
    try {
        console.log('创建新博客文章...\n');
        
        const type = (await question('文章类型 (tech/growth/reading，默认 tech): ')).trim().toLowerCase() || 'tech';
        const title = await question('文章标题: ');
        const category = await question('分类 (例: Java,并发编程): ');
        const tag = await question('标签 (例: JMM,内存模型,多线程): ');
        const filename = await question('文件名 (不含.md): ');
        const folder = await question('文件夹路径 (例: java/concurrent): ');
        
        // 生成当前日期
        const currentDate = new Date().toISOString().split('T')[0];
        
        // 处理分类和标签
        const categories = category.split(',').map(c => `  - ${c.trim()}`).join('\n');
        const tags = tag.split(',').map(t => `  - ${t.trim()}`).join('\n');
        
        // 获取额外信息
        const description = await question('文章摘要 (可选，用于SEO): ');
        const isStarred = await question('是否星标文章？ (y/n): ');
        const isSticky = await question('是否置顶文章？ (y/n): ');

        const contentTemplates = {
            tech: `# ${title}

## 适用范围

- JDK 版本：
- 框架版本：
- 阅读前置：

## 问题背景

## 核心结论

## 原理拆解

## 示例或实践

## 常见误区

## 延伸阅读

## 修订记录
`,
            growth: `# ${title}

## 本期关键词

## 做了什么

## 遇到的问题

## 收获与反思

## 下一步计划
`,
            reading: `# ${title}

## 阅读背景

## 核心观点

## 摘录与理解

## 对我的启发

## 行动计划
`
        };

        const content = contentTemplates[type] || contentTemplates.tech;
        
        // 生成 frontmatter
        const frontmatter = `---
title: ${title}
date: ${currentDate}${description ? `\ndescription: ${description}` : ''}
category:
${categories}
tag:
${tags}
star: ${isStarred.toLowerCase() === 'y' || isStarred.toLowerCase() === 'yes'}
sticky: ${isSticky.toLowerCase() === 'y' || isSticky.toLowerCase() === 'yes'}
---

${content}`;
        
        // 确定文件路径
        const filePath = path.join(__dirname, 'docs', 'posts', folder, `${filename}.md`);
        const dirPath = path.dirname(filePath);
        
        // 确保目录存在
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`创建目录: ${dirPath}`);
        }
        
        // 写入文件
        fs.writeFileSync(filePath, frontmatter);
        console.log(`\n✅ 文章创建成功: ${filePath}`);
        
    } catch (error) {
        console.error('创建文章时出错:', error);
    } finally {
        rl.close();
    }
}

createPost();
