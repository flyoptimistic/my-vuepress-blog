---
# 开启首页布局
#home: true
layout: Homepage

# 导航区/英雄区 (Hero Section)
heroImage: /images/logo.jpg # 一个更具设计感的 Hero 图片
heroText: 北木南的博客
tagline: 纸上得来终觉浅，绝知此事要躬行。
actions:
  - text: 🚀 开始阅读
    link: /posts/java/base/
    type: primary
  - text: 👨‍💻 关于我
    link: /about.html
    type: secondary

# 特性区 (Features Section) - 修正了链接并美化
features:
  - title: 深入 Java 核心
    icon: /images/icons/java.svg # 为卡片添加图标
    details: 从 JVM 内存模型到 JUC 并发包，系统性地梳理 Java 技术栈的核心知识，夯实基础，理解原理。
    link: /posts/java/base/ # <-- 关键修正：添加了 link 属性
  - title: 高并发编程实践
    icon: /images/icons/concurrent.svg
    details: 探讨在分布式系统中保证数据一致性、提升系统吞吐量的各种策略，包括锁、事务、消息队列等。
    link: /posts/java/concurrent/ # <-- 关键修正：添加了 link 属性
  - title: MySQL 深度优化
    icon: /images/icons/mysql.svg
    details: 专注 MySQL 的索引优化、查询性能分析、MVCC 原理以及高可用架构设计，让你的数据库飞起来。
    link: /posts/database/mysql/ # <-- 关键修正：添加了 link 属性
  - title: Spring 生态剖析
    icon: /images/icons/spring.svg
    details: 全面解析 Spring Framework 与 Spring Boot 的核心思想，包括 IoC、AOP、自动装配等，并分享实战经验。
    link: /posts/java/spring/ # <-- 关键修正：添加了 link 属性
  - title: 算法与数据结构
    icon: /images/icons/algorithm.svg
    details: 通过解决经典的 LeetCode 问题，巩固常见数据结构与算法思想，提升编程内功。
    link: /posts/algorithm/ # <-- 关键修正：添加了 link 属性
  - title: 前端技术探索
    icon: /images/icons/frontend.svg
    details: 记录在 Vue、React 等现代前端框架开发中的学习笔记和踩坑记录。
    link: /posts/front/ # <-- 关键修正：添加了 link 属性

# 页脚
footer: MIT Licensed | Copyright © 2024-present 北木南
---

[//]: # (## 📚 最新文章)

[//]: # ()
[//]: # (- [文章一：深入理解 JVM 内存模型]&#40;/posts/java/jvm/memory-model.md&#41;)

[//]: # (- [文章二：MySQL 索引为什么选择 B+ 树]&#40;/posts/database/mysql/why-b-plus-tree.md&#41;)

[//]: # (- [文章三：手写一个简单的线程池]&#40;/posts/java/concurrent/implement-thread-pool.md&#41;)

[//]: # ()
[//]: # (## ✉️ 联系我)

[//]: # ()
[//]: # (- **GitHub**: [flyoptimistic]&#40;https://github.com/flyoptimistic&#41;)

[//]: # (- **邮箱**: your_email@example.com)