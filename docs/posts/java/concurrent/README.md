---
title: Java 并发编程
index: true
icon: flash
category:
  - Java
  - 并发编程
---

# Java 并发编程

欢迎来到Java并发编程的世界，这里深入探讨多线程、锁机制、内存模型等核心概念。

## 📚 文档列表

### 并发系列文章

- [并发系列(一)操作系统底层](./并发系列\(一\)操作系统底层.md) - 计算机模型、CPU 缓存与线程模型
- [并发系列(二)深入理解Java内存模型](./并发系列\(二\)深入理解Java内存模型.md) - JMM、volatile、happens-before原则
- [并发系列(三)缓存一致性协议MESI](./并发系列\(三\)缓存一致性协议MESI.md) - CPU 缓存与 MESI 缓存一致性协议
- [并发系列(四)JVM内置锁synchronized关键字详解](./并发系列\(四\)JVM内置锁synchronized关键字详解.md) - synchronized原理与优化
- [并发系列(五)AQS应用之Lock详解](./并发系列\(五\)抽象队列同步器AQS应用之Lock详解.md) - AQS、ReentrantLock、公平锁与非公平锁
- [并发系列(六)AQS应用之阻塞队列BlockingQueue详解](./并发系列\(六\)抽象队列同步器AQS应用之阻塞队列BlockingQueue详解.md) - 阻塞队列与生产者消费者模型
- [并发系列(七)CountDownLatch与Semaphore原理与应用](./并发系列\(七\)CountDownLatch&Semaphore原理与应用.md) - 常用并发同步工具
- [并发系列(八)Atomic与Unsafe魔法类详解](./并发系列\(八\)Atomic&Unsafe魔法类详解.md) - CAS、Unsafe 与原子类
- [并发系列(九)Collections之Map、List、Set详解](./并发系列\(九\)Collections之Map&List&Set详解.md) - 集合结构与并发场景问题
- [并发系列(十)Executor线程池原理与源码解读](./并发系列\(十\)Executor线程池原理与源码解读.md) - Executor 框架与线程池源码

## 🎯 核心主题

### 内存模型与可见性
- Java内存模型（JMM）
- volatile关键字原理
- happens-before规则

### 锁机制
- synchronized内置锁
- Monitor监视器锁
- 锁优化技术（偏向锁、轻量级锁、重量级锁）

### 并发工具类
- 线程池框架
- 原子操作类
- 并发集合

## 🚀 学习路径

1. **基础理论**: Java内存模型 → synchronized锁机制
2. **进阶应用**: 并发工具类 → 性能优化
3. **高级话题**: 分布式并发 → 无锁编程

## 🔗 相关技术

- [JVM技术](../jvm/) - JVM内存管理与垃圾收集
- [性能优化](../../other/) - 系统性能调优

---

> ⚡ **重要提醒**: 并发编程需要对内存模型有深入理解，建议先学习JMM相关内容。
