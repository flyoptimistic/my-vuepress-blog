#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');
const glob = require('glob');

// 配置区域 - 可以根据需要选择不同的图床服务
const IMAGE_BED_CONFIG = {
    // 选项1: GitHub 作为图床
    github: {
        token: process.env.GITHUB_TOKEN, // GitHub Personal Access Token
        repo: 'flyoptimistic/blog-images', // 图床仓库
        branch: 'main',
        path: 'images/', // 图片在仓库中的路径前缀
        baseUrl: 'https://cdn.jsdelivr.net/gh/flyoptimistic/blog-images@main/images/'
    },
    
    // 选项2: 腾讯云 COS
    qcloud: {
        secretId: process.env.QCLOUD_SECRET_ID,
        secretKey: process.env.QCLOUD_SECRET_KEY,
        bucket: 'blog-images-1234567890',
        region: 'ap-beijing',
        baseUrl: 'https://blog-images-1234567890.cos.ap-beijing.myqcloud.com/'
    },
    
    // 选项3: SM.MS 免费图床
    smms: {
        token: process.env.SMMS_TOKEN,
        baseUrl: 'https://smms.app/api/v2/upload'
    }
};

// 当前使用的图床服务
const CURRENT_SERVICE = 'github'; // 可以改为 'qcloud' 或 'smms'

class ImageUploader {
    constructor(service = CURRENT_SERVICE) {
        this.service = service;
        this.config = IMAGE_BED_CONFIG[service];
        this.uploadedImages = new Map(); // 缓存已上传的图片
    }

    // GitHub 上传
    async uploadToGitHub(filePath, fileName) {
        const content = fs.readFileSync(filePath, { encoding: 'base64' });
        const apiUrl = `https://api.github.com/repos/${this.config.repo}/contents/${this.config.path}${fileName}`;
        
        const data = JSON.stringify({
            message: `Upload image: ${fileName}`,
            content: content,
            branch: this.config.branch
        });

        return new Promise((resolve, reject) => {
            const req = https.request(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.config.token}`,
                    'User-Agent': 'Blog-Image-Uploader',
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            }, (res) => {
                let responseData = '';
                res.on('data', chunk => responseData += chunk);
                res.on('end', () => {
                    if (res.statusCode === 201) {
                        const result = JSON.parse(responseData);
                        resolve(this.config.baseUrl + fileName);
                    } else {
                        reject(new Error(`GitHub upload failed: ${res.statusCode}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(data);
            req.end();
        });
    }

    // SM.MS 上传
    async uploadToSMMS(filePath, fileName) {
        const form = new FormData();
        form.append('smfile', fs.createReadStream(filePath));
        
        return new Promise((resolve, reject) => {
            form.submit({
                host: 'smms.app',
                path: '/api/v2/upload',
                method: 'POST',
                headers: {
                    'Authorization': this.config.token
                }
            }, (err, res) => {
                if (err) return reject(err);
                
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const result = JSON.parse(data);
                    if (result.success) {
                        resolve(result.data.url);
                    } else {
                        reject(new Error(`SM.MS upload failed: ${result.message}`));
                    }
                });
            });
        });
    }

    // 统一上传接口
    async uploadImage(localPath, fileName) {
        try {
            console.log(`正在上传图片: ${fileName}`);
            
            let url;
            switch (this.service) {
                case 'github':
                    url = await this.uploadToGitHub(localPath, fileName);
                    break;
                case 'smms':
                    url = await this.uploadToSMMS(localPath, fileName);
                    break;
                default:
                    throw new Error(`不支持的图床服务: ${this.service}`);
            }
            
            this.uploadedImages.set(localPath, url);
            console.log(`✅ 上传成功: ${fileName} -> ${url}`);
            return url;
        } catch (error) {
            console.error(`❌ 上传失败: ${fileName}`, error.message);
            return null;
        }
    }

    // 处理单个 Markdown 文件
    async processMarkdownFile(filePath) {
        console.log(`\n处理文件: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf-8');
        let hasChanges = false;
        
        // 匹配本地图片路径的正则表达式
        const localImageRegex = /!\[([^\]]*)\]\((\/images\/[^)]+)\)/g;
        const matches = [];
        let match;
        
        while ((match = localImageRegex.exec(content)) !== null) {
            matches.push({
                fullMatch: match[0],
                alt: match[1],
                localPath: match[2]
            });
        }
        
        if (matches.length === 0) {
            console.log('  没有发现本地图片引用');
            return;
        }
        
        console.log(`  发现 ${matches.length} 个本地图片引用`);
        
        for (const imageMatch of matches) {
            const { fullMatch, alt, localPath } = imageMatch;
            const fullLocalPath = path.join(__dirname, 'docs/.vuepress/public', localPath);
            
            if (!fs.existsSync(fullLocalPath)) {
                console.log(`  ⚠️  图片文件不存在: ${localPath}`);
                continue;
            }
            
            // 生成远程文件名
            const fileName = path.basename(localPath);
            const dirName = path.dirname(localPath).replace('/images/', '').replace(/\//g, '-');
            const remoteName = dirName ? `${dirName}-${fileName}` : fileName;
            
            // 检查是否已经上传过
            let remoteUrl = this.uploadedImages.get(fullLocalPath);
            if (!remoteUrl) {
                remoteUrl = await this.uploadImage(fullLocalPath, remoteName);
            }
            
            if (remoteUrl) {
                // 替换 Markdown 中的图片链接
                const newImageRef = `![${alt}](${remoteUrl})`;
                content = content.replace(fullMatch, newImageRef);
                hasChanges = true;
                console.log(`  ✅ 替换: ${localPath} -> ${remoteUrl}`);
            }
        }
        
        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`  📝 文件已更新: ${filePath}`);
        }
    }

    // 处理所有 Markdown 文件
    async processAllMarkdownFiles() {
        const markdownFiles = glob.sync('docs/posts/**/*.md', { cwd: __dirname });
        
        console.log(`发现 ${markdownFiles.length} 个 Markdown 文件`);
        
        for (const file of markdownFiles) {
            const fullPath = path.join(__dirname, file);
            await this.processMarkdownFile(fullPath);
        }
        
        console.log('\n🎉 所有文件处理完成！');
        console.log(`总共上传了 ${this.uploadedImages.size} 个图片`);
    }
}

// 命令行参数处理
async function main() {
    const args = process.argv.slice(2);
    const uploader = new ImageUploader();
    
    if (args.length === 0) {
        // 处理所有文件
        await uploader.processAllMarkdownFiles();
    } else {
        // 处理指定文件
        for (const file of args) {
            await uploader.processMarkdownFile(path.resolve(file));
        }
    }
}

// 检查必要的环境变量
function checkConfig() {
    const config = IMAGE_BED_CONFIG[CURRENT_SERVICE];
    
    switch (CURRENT_SERVICE) {
        case 'github':
            if (!config.token) {
                console.error('❌ 请设置 GITHUB_TOKEN 环境变量');
                process.exit(1);
            }
            break;
        case 'smms':
            if (!config.token) {
                console.error('❌ 请设置 SMMS_TOKEN 环境变量');
                process.exit(1);
            }
            break;
    }
}

if (require.main === module) {
    checkConfig();
    main().catch(console.error);
}

module.exports = ImageUploader;