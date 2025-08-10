#!/bin/bash

# 重命名脚本 - 保持原始文件名
echo "开始重命名文档文件，保持原始文件名..."

# JVM系列重命名
if [ -f "docs/posts/java/jvm/jvm-class-loading.md" ]; then
    mv "docs/posts/java/jvm/jvm-class-loading.md" "docs/posts/java/jvm/JVM系列(一)JVM类加载机制.md"
    echo "重命名: jvm-class-loading.md -> JVM系列(一)JVM类加载机制.md"
fi

if [ -f "docs/posts/java/jvm/jvm-memory-model.md" ]; then
    mv "docs/posts/java/jvm/jvm-memory-model.md" "docs/posts/java/jvm/JVM系列(二)JVM内存模型深度剖析与优化.md"
    echo "重命名: jvm-memory-model.md -> JVM系列(二)JVM内存模型深度剖析与优化.md"
fi

if [ -f "docs/posts/java/jvm/object-creation-memory-allocation.md" ]; then
    mv "docs/posts/java/jvm/object-creation-memory-allocation.md" "docs/posts/java/jvm/JVM系列(三)JVM对象创建与内存分配机制深度剖析.md"
    echo "重命名: object-creation-memory-allocation.md -> JVM系列(三)JVM对象创建与内存分配机制深度剖析.md"
fi

if [ -f "docs/posts/java/jvm/garbage-collector.md" ]; then
    mv "docs/posts/java/jvm/garbage-collector.md" "docs/posts/java/jvm/JVM系列(四)垃圾收集器.md"
    echo "重命名: garbage-collector.md -> JVM系列(四)垃圾收集器.md"
fi

if [ -f "docs/posts/java/jvm/jvm-class-loading-mechanism.md" ]; then
    mv "docs/posts/java/jvm/jvm-class-loading-mechanism.md" "docs/posts/java/jvm/JVM系列(五)垃圾收集器G1和ZGC.md"
    echo "重命名: jvm-class-loading-mechanism.md -> JVM系列(五)垃圾收集器G1和ZGC.md"
fi

# 并发系列重命名
if [ -f "docs/posts/java/concurrent/synchronized-detailed.md" ]; then
    mv "docs/posts/java/concurrent/synchronized-detailed.md" "docs/posts/java/concurrent/并发系列(四)JVM内置锁synchronized关键字详解.md"
    echo "重命名: synchronized-detailed.md -> 并发系列(四)JVM内置锁synchronized关键字详解.md"
fi

if [ -f "docs/posts/java/concurrent/java-memory-model.md" ]; then
    mv "docs/posts/java/concurrent/java-memory-model.md" "docs/posts/java/concurrent/并发系列(二)深入理解Java内存模型.md"
    echo "重命名: java-memory-model.md -> 并发系列(二)深入理解Java内存模型.md"
fi

# 数据库系列重命名
if [ -f "docs/posts/database/mysql/mysql-locks.md" ]; then
    mv "docs/posts/database/mysql/mysql-locks.md" "docs/posts/database/mysql/MySQL锁.md"
    echo "重命名: mysql-locks.md -> MySQL锁.md"
fi

if [ -f "docs/posts/database/redis/bloom-filter.md" ]; then
    mv "docs/posts/database/redis/bloom-filter.md" "docs/posts/database/redis/Bloom Filter.md"
    echo "重命名: bloom-filter.md -> Bloom Filter.md"
fi

# 其他系列重命名
if [ -f "docs/posts/other/system/computer-architecture.md" ]; then
    mv "docs/posts/other/system/computer-architecture.md" "docs/posts/other/system/计算机组成.md"
    echo "重命名: computer-architecture.md -> 计算机组成.md"
fi

if [ -f "docs/posts/other/gateway.md" ]; then
    mv "docs/posts/other/gateway.md" "docs/posts/other/网关.md"
    echo "重命名: gateway.md -> 网关.md"
fi

if [ -f "docs/posts/other/performance-metrics.md" ]; then
    mv "docs/posts/other/performance-metrics.md" "docs/posts/other/高并发性能指标：QPS、TPS、RT、吞吐量.md"
    echo "重命名: performance-metrics.md -> 高并发性能指标：QPS、TPS、RT、吞吐量.md"
fi

echo "所有文件重命名完成！"