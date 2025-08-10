#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ImageLinkProcessor {
    constructor() {
        this.imageMap = new Map();
        this.loadImageMapping();
    }

    // 从配置文件加载图片映射关系
    loadImageMapping() {
        const mappingFile = path.join(__dirname, 'image-mapping.json');
        if (fs.existsSync(mappingFile)) {
            const data = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
            this.imageMap = new Map(Object.entries(data));
            console.log(`加载了 ${this.imageMap.size} 个图片映射`);
        }
    }

    // 保存图片映射关系
    saveImageMapping() {
        const mappingFile = path.join(__dirname, 'image-mapping.json');
        const data = Object.fromEntries(this.imageMap);
        fs.writeFileSync(mappingFile, JSON.stringify(data, null, 2));
        console.log(`保存了 ${this.imageMap.size} 个图片映射到 ${mappingFile}`);
    }

    // 添加图片映射
    addImageMapping(localPath, remoteUrl) {
        this.imageMap.set(localPath, remoteUrl);
        console.log(`添加映射: ${localPath} -> ${remoteUrl}`);
    }

    // 交互式添加图片映射
    async interactiveAddMapping() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

        try {
            while (true) {
                console.log('\n=== 添加图片映射 ===');
                const localPath = await question('本地路径 (如 /images/java/test.png，或输入 q 退出): ');
                
                if (localPath.toLowerCase() === 'q') break;
                
                const remoteUrl = await question('远程URL: ');
                
                if (localPath && remoteUrl) {
                    this.addImageMapping(localPath, remoteUrl);
                } else {
                    console.log('请输入有效的路径和URL');
                }
            }
        } finally {
            rl.close();
        }

        this.saveImageMapping();
    }

    // 批量替换 Markdown 文件中的图片链接
    replaceImageLinks(filePath) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let hasChanges = false;
        
        const localImageRegex = /!\[([^\]]*)\]\((\/images\/[^)]+)\)/g;
        
        content = content.replace(localImageRegex, (match, alt, localPath) => {
            if (this.imageMap.has(localPath)) {
                const remoteUrl = this.imageMap.get(localPath);
                hasChanges = true;
                console.log(`  替换: ${localPath} -> ${remoteUrl}`);
                return `![${alt}](${remoteUrl})`;
            }
            return match;
        });
        
        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✅ 更新文件: ${filePath}`);
        }
    }

    // 扫描并列出所有本地图片引用
    scanLocalImages() {
        const glob = require('glob');
        const markdownFiles = glob.sync('docs/posts/**/*.md', { cwd: __dirname });
        const localImages = new Set();
        
        for (const file of markdownFiles) {
            const fullPath = path.join(__dirname, file);
            const content = fs.readFileSync(fullPath, 'utf-8');
            
            const localImageRegex = /!\[([^\]]*)\]\((\/images\/[^)]+)\)/g;
            let match;
            
            while ((match = localImageRegex.exec(content)) !== null) {
                localImages.add(match[2]);
            }
        }
        
        console.log('\n=== 发现的本地图片引用 ===');
        for (const imagePath of Array.from(localImages).sort()) {
            const status = this.imageMap.has(imagePath) ? '✅' : '❌';
            const remoteUrl = this.imageMap.get(imagePath) || '(未映射)';
            console.log(`${status} ${imagePath} -> ${remoteUrl}`);
        }
        
        const unmapped = Array.from(localImages).filter(path => !this.imageMap.has(path));
        if (unmapped.length > 0) {
            console.log(`\n还有 ${unmapped.length} 个图片未配置映射`);
        } else {
            console.log('\n🎉 所有图片都已配置映射！');
        }
        
        return { total: localImages.size, unmapped: unmapped.length };
    }

    // 批量处理所有文件
    processAllFiles() {
        const glob = require('glob');
        const markdownFiles = glob.sync('docs/posts/**/*.md', { cwd: __dirname });
        
        console.log(`处理 ${markdownFiles.length} 个 Markdown 文件`);
        
        for (const file of markdownFiles) {
            const fullPath = path.join(__dirname, file);
            console.log(`\n处理: ${file}`);
            this.replaceImageLinks(fullPath);
        }
    }
}

// 命令行界面
async function main() {
    const processor = new ImageLinkProcessor();
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('使用方法:');
        console.log('  node image-processor.js scan     # 扫描本地图片引用');
        console.log('  node image-processor.js add      # 交互式添加图片映射');
        console.log('  node image-processor.js process  # 批量处理所有文件');
        return;
    }
    
    switch (args[0]) {
        case 'scan':
            processor.scanLocalImages();
            break;
        case 'add':
            await processor.interactiveAddMapping();
            break;
        case 'process':
            processor.processAllFiles();
            break;
        default:
            console.log(`未知命令: ${args[0]}`);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = ImageLinkProcessor;