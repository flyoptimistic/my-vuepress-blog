#!/bin/bash

# 重命名脚本 - 保持原始文件名
echo "开始重命名文档文件，保持原始文件名..."

# 定义重命名映射关系
declare -A rename_mapping=(
    # JVM系列
    ["docs/posts/java/jvm/jvm-class-loading.md"]="docs/posts/java/jvm/JVM系列(一)JVM类加载机制.md"
    ["docs/posts/java/jvm/jvm-memory-model.md"]="docs/posts/java/jvm/JVM系列(二)JVM内存模型深度剖析与优化.md"
    ["docs/posts/java/jvm/object-creation-memory-allocation.md"]="docs/posts/java/jvm/JVM系列(三)JVM对象创建与内存分配机制深度剖析.md"
    ["docs/posts/java/jvm/garbage-collector.md"]="docs/posts/java/jvm/JVM系列(四)垃圾收集器.md"
    ["docs/posts/java/jvm/jvm-class-loading-mechanism.md"]="docs/posts/java/jvm/JVM系列(五)垃圾收集器G1和ZGC.md"
    
    # 并发系列
    ["docs/posts/java/concurrent/synchronized-detailed.md"]="docs/posts/java/concurrent/并发系列(四)JVM内置锁synchronized关键字详解.md"
    ["docs/posts/java/concurrent/java-memory-model.md"]="docs/posts/java/concurrent/并发系列(二)深入理解Java内存模型.md"
    
    # 数据库系列
    ["docs/posts/database/mysql/mysql-locks.md"]="docs/posts/database/mysql/MySQL锁.md"
    ["docs/posts/database/redis/bloom-filter.md"]="docs/posts/database/redis/Bloom Filter.md"
    
    # 其他系列
    ["docs/posts/other/system/computer-architecture.md"]="docs/posts/other/system/计算机组成.md"
    ["docs/posts/other/gateway.md"]="docs/posts/other/网关.md"
    ["docs/posts/other/performance-metrics.md"]="docs/posts/other/高并发性能指标：QPS、TPS、RT、吞吐量.md"
)

# 执行重命名
for old_path in "${!rename_mapping[@]}"; do
    new_path="${rename_mapping[$old_path]}"
    
    if [ -f "$old_path" ]; then
        # 确保目标目录存在
        target_dir=$(dirname "$new_path")
        mkdir -p "$target_dir"
        
        # 执行重命名
        mv "$old_path" "$new_path"
        echo "已重命名: $(basename "$old_path") -> $(basename "$new_path")"
    else
        echo "文件不存在: $old_path"
    fi
done

echo "重命名完成！"