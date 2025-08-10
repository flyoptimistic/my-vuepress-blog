#!/bin/bash

# VuePress 博客迁移脚本
# 将 resource 文件夹中的 Hexo 格式文档迁移到 VuePress 格式

echo "开始迁移文档..."

# 创建目标目录
mkdir -p docs/posts/java/{jvm,concurrent,base}
mkdir -p docs/posts/database/{mysql,redis}
mkdir -p docs/posts/development/blog
mkdir -p docs/posts/other/{system,linux}

# 复制图片资源
echo "复制图片资源..."

# JVM 系列图片
for dir in resource/JVM系列*; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        target_dir="docs/.vuepress/public/images/jvm/$(echo "$dirname" | tr '[:upper:]' '[:lower:]' | sed 's/jvm系列([一-十]*)//' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')"
        mkdir -p "$target_dir"
        cp "$dir"/* "$target_dir/" 2>/dev/null || true
    fi
done

# 并发系列图片
for dir in resource/并发系列*; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        target_dir="docs/.vuepress/public/images/concurrent/$(echo "$dirname" | tr '[:upper:]' '[:lower:]' | sed 's/并发系列([一-十]*)//' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')"
        mkdir -p "$target_dir"
        cp "$dir"/* "$target_dir/" 2>/dev/null || true
    fi
done

# 数据库相关图片
for dir in resource/MySQL*; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        target_dir="docs/.vuepress/public/images/database/mysql/$(echo "$dirname" | tr '[:upper:]' '[:lower:]' | sed 's/mysql//' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')"
        mkdir -p "$target_dir"
        cp "$dir"/* "$target_dir/" 2>/dev/null || true
    fi
done

# 其他图片
for dir in resource/云服务器* resource/linux* resource/计算机* resource/网关* resource/GitPages*; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        target_dir="docs/.vuepress/public/images/other/$(echo "$dirname" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')"
        mkdir -p "$target_dir"
        cp "$dir"/* "$target_dir/" 2>/dev/null || true
    fi
done

echo "图片资源迁移完成！"
echo "接下来需要手动转换 Markdown 文件..."