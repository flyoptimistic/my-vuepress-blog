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
        
        // 生成 frontmatter
        const frontmatter = `---
title: ${title}
date: ${currentDate}
category:
${categories}
tag:
${tags}
---

# ${title}

<!-- 在这里开始写你的文章内容 -->
`;
        
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