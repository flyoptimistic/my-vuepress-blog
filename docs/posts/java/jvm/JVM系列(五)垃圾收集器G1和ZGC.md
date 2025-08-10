---
title: JVM系列(五)：垃圾收集器G1和ZGC
date: 2024-01-15
category:
  - Java
  - JVM
tag:
  - JVM
  - 垃圾收集器
  - G1
  - ZGC
  - Java虚拟机
---

# JVM系列(五)：垃圾收集器G1和ZGC

## 类加载器初始化以及加载类的过程

### 在什么时候才会启动类加载器?

其实,类加载器并不需要等到某个类被"首次主动使用"时再加载它,JVM规范允许类加载器在预料某个类将要被使用时就预先加载它,如果在预先加载的过程中遇到了.class文件缺失或存在错误,类加载器必须在程序首次主动使用该类时才报告错误(LinkgeError)错误,如果这个类一直没有被程序主动使用,那么类加载器就不会报错误.

### 从那个地方去加载.class文件

在这里进行一个简单的分类:

1. 本地磁盘
2. 网上加载.class(Applet)
3. 从数据库中
4. 压缩文件中(ZAR,Jar等)
5. 从其他文件生成的(JSP应用)

### LoadClass的类加载过程

```java
public class Math {

    public static final int initData = 666;
    public static User user = new User();

    public int compute() { //一个方法对应一块栈帧内存区域
        int a = 1;
        int b = 2;
        int c = (a + b) * 10;
        return c;
    }

    public static void main(String[] args) {
        Math math = new Math();
        math.compute();
    }
}
```

![JVM类加载机制](/images/jvm/class-loading/JVM类加载机制.jpg)

类从被加载到虚拟机内存中开始，到卸载出内存为止，它的整个生命周期包括：**加载、验证、准备、解析、初始化**、使用和卸载七个阶段。它们的顺序如下图所示：

![类加载生命周期](/images/jvm/class-loading/类加载生命周期.png)