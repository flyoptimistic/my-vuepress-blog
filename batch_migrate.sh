#!/bin/bash

# 批量迁移脚本 - 剩余重要文档

echo "开始迁移剩余技术文档..."

# 创建目标目录结构
mkdir -p docs/posts/{other/system,development/blog}

# 1. 迁移计算机组成原理
echo "正在创建计算机组成原理文档..."
cat > docs/posts/other/system/computer-architecture.md << 'EOF'
---
title: 计算机组成原理
date: 2024-01-08
category:
  - 计算机基础
  - 系统架构
tag:
  - 计算机组成
  - 硬件架构
  - 存储器
---

# 计算机组成原理

## 系统硬件组成

![系统硬件组成](/images/other/computer-architecture/系统硬件组成.png)

## 存储器层次结构

![存储器层次结构](/images/other/computer-architecture/存储器层次结构.png)

## 多核处理器架构

![多核处理器](/images/other/computer-architecture/多核处理器.png)

![多核处理器组织结构](/images/other/computer-architecture/多核处理器组织结构.png)

## 高速缓存

![高速缓存](/images/other/computer-architecture/高速缓存.png)

## 进程的上下文切换

![进程的上下文切换](/images/other/computer-architecture/进程的上下文切换.png)

## 进程的虚拟地址空间

![进程的虚拟地址空间](/images/other/computer-architecture/进程的虚拟地址空间.png)

## 操作系统提供的抽象表示

![操作系统提供的抽象表示](/images/other/computer-architecture/操作系统提供的抽象表示.png)
EOF

# 2. 迁移网关技术
echo "正在创建网关技术文档..."
cat > docs/posts/other/gateway.md << 'EOF'
---
title: 微服务网关技术详解
date: 2024-01-09
category:
  - 微服务
  - 架构设计
tag:
  - API网关
  - Spring Cloud Gateway
  - Kong
  - 微服务架构
---

# 微服务网关技术详解

## 网关概念与分类

![网关](/images/other/gateway/网关.png)

![网关分类和功能](/images/other/gateway/网关分类和功能.jpg)

## 微服务架构演进

### 单体应用架构

![单体应用](/images/other/gateway/单体应用.png)

### 微服务架构思想

![微服务的思想](/images/other/gateway/微服务的思想.png)

## API网关

![api网关](/images/other/gateway/api网关.png)

## Spring Cloud Gateway

![spring_cloud_gateway_diagram](/images/other/gateway/spring_cloud_gateway_diagram.png)

![spring-cloud-gateway-predicate](/images/other/gateway/spring-cloud-gateway-predicate.png)

## Kong网关架构

![kong架构](/images/other/gateway/kong架构.jpg)

![Kong-GS-overview](/images/other/gateway/Kong-GS-overview.png)

### 使用Kong前后架构变化

![使用kong架构前后变化](/images/other/gateway/使用kong架构前后变化.png)

## WebFlux架构

![webflux官方架构](/images/other/gateway/webflux官方架构.jpg)
EOF

# 3. 迁移高并发性能指标
echo "正在创建高并发性能指标文档..."
cat > docs/posts/other/performance-metrics.md << 'EOF'
---
title: 高并发性能指标：QPS、TPS、RT、吞吐量详解
date: 2024-01-10
category:
  - 性能优化
  - 系统设计
tag:
  - QPS
  - TPS
  - 响应时间
  - 吞吐量
  - 性能测试
---

# 高并发性能指标：QPS、TPS、RT、吞吐量详解

## 核心性能指标

### QPS (Queries Per Second)
每秒查询率，是对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准。

### TPS (Transactions Per Second)  
每秒事务数，一个事务是指一个客户端向服务器发送请求然后服务器做出反应的过程。

### RT (Response Time)
响应时间，执行一个请求从开始到最后收到响应数据所花费的总体时间。

### 吞吐量 (Throughput)
系统在单位时间内处理请求的数量，通常用来衡量系统的整体处理能力。

## 并发用户数与性能关系

并发用户数分为：
1. **并发连接数**：某一时刻服务器所接受的请求数
2. **并发用户数**：某一时刻同时向系统提交请求的用户数

## 性能测试要点

1. **压力测试**：测试系统在一定负载下的表现
2. **负载测试**：测试系统在预期负载下的表现  
3. **容量测试**：测试系统的最大处理能力
4. **稳定性测试**：测试系统在长时间运行下的稳定性

## 性能优化策略

1. **水平扩展**：增加服务器数量
2. **垂直扩展**：提升单机性能
3. **缓存优化**：减少数据库压力
4. **异步处理**：提高系统响应速度
5. **数据库优化**：索引、分库分表等
EOF

echo "文档迁移完成！"
EOF