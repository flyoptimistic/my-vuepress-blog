# Hexo 旧博客内容整合报告

生成时间：2026-05-24

## 整合原则

- 旧 Hexo 文章按当前 VuePress 个人博客栏目归档，不单独保留 Hexo 目录结构。
- 已存在的同主题文章使用旧文完整内容补齐，避免重复生成第二份文章。
- 图片资源统一复制到 `docs/.vuepress/public/images/legacy/`，正文图片路径改为 VuePress 可访问的 `/images/legacy/...`。
- Hexo 专属的 `asset_img` 语法已转换为标准 Markdown 图片语法。
- 旧文中未随项目归档的本机绝对路径图片已替换为注释，避免暴露本机路径或产生不可访问资源。

## 文章映射

| Hexo 原文 | VuePress 位置 | 图片数 |
| --- | --- | ---: |
| `GitPages和Hexo搭建个人博客.md` | `docs/posts/development/GitPages和Hexo搭建个人博客.md` | 14 |
| `MySQL.md` | `docs/posts/database/mysql/MySQL.md` | 0 |
| `MySQL数据库事务.md` | `docs/posts/database/mysql/MySQL数据库事务.md` | 1 |
| `MySQL锁.md` | `docs/posts/database/mysql/MySQL锁.md` | 9 |
| `数据库.md` | `docs/posts/database/base/数据库.md` | 0 |
| `数据库事务，隔离级别，脏读，不可重复读，幻读.md` | `docs/posts/database/base/数据库事务，隔离级别，脏读，不可重复读，幻读.md` | 0 |
| `linux基础命令.md` | `docs/posts/other/linux/linux基础命令.md` | 0 |
| `并发系列(一)操作系统底层.md` | `docs/posts/java/concurrent/并发系列(一)操作系统底层.md` | 8 |
| `并发系列(二)深入理解Java内存模型.md` | `docs/posts/java/concurrent/并发系列(二)深入理解Java内存模型.md` | 9 |
| `并发系列(三)缓存一致性协议MESI.md` | `docs/posts/java/concurrent/并发系列(三)缓存一致性协议MESI.md` | 8 |
| `并发系列(四)JVM内置锁synchronized关键字详解.md` | `docs/posts/java/concurrent/并发系列(四)JVM内置锁synchronized关键字详解.md` | 6 |
| `并发系列(五)抽象队列同步器AQS应用之Lock详解.md` | `docs/posts/java/concurrent/并发系列(五)抽象队列同步器AQS应用之Lock详解.md` | 2 |
| `并发系列(六)抽象队列同步器AQS应用之阻塞队列BlockingQueue详解.md` | `docs/posts/java/concurrent/并发系列(六)抽象队列同步器AQS应用之阻塞队列BlockingQueue详解.md` | 2 |
| `并发系列(七)CountDownLatch&Semaphore原理与应用.md` | `docs/posts/java/concurrent/并发系列(七)CountDownLatch&Semaphore原理与应用.md` | 0 |
| `并发系列(八)Atomic&Unsafe魔法类详解.md` | `docs/posts/java/concurrent/并发系列(八)Atomic&Unsafe魔法类详解.md` | 7 |
| `并发系列(九)Collections之Map&List&Set详解.md` | `docs/posts/java/concurrent/并发系列(九)Collections之Map&List&Set详解.md` | 10 |
| `并发系列(十)Executor线程池原理与源码解读.md` | `docs/posts/java/concurrent/并发系列(十)Executor线程池原理与源码解读.md` | 6 |
| `网关.md` | `docs/posts/other/网关.md` | 12 |
| `计算机组成.md` | `docs/posts/other/system/计算机组成.md` | 12 |

## 后续整理建议

1. 优先复查并发系列文章标题层级，把旧文中的口语化段落整理成“问题背景、核心结论、原理拆解、实践示例”的技术文章结构。
2. 对 `GitPages 和 Hexo 搭建个人博客` 做历史归档说明，避免读者误以为当前博客仍使用 Hexo。
3. 将 MySQL 事务相关文章合并成一条主线：数据库事务基础 -> InnoDB 事务 -> 锁机制。
4. 逐步清理旧文章中的外部脚本示例，只保留代码块或说明，避免在 VuePress 页面中执行历史脚本片段。
