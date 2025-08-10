---
title: 并发系列(四)：JVM内置锁synchronized关键字详解
date: 2024-01-06
category:
  - Java
  - 并发编程
tag:
  - synchronized
  - 内置锁
  - Monitor
  - 线程安全
---

# 并发系列(四)：JVM内置锁synchronized关键字详解

## 设计同步器的意义

多线程编程中，有可能会出现多个线程同时访问同一个共享、可变资源的情况，这个资源我们称之其为临界资源；这种资源可能是：对象、变量、文件等。

**共享**：资源可以由多个线程同时访问

**可变**：资源可以在其生命周期内被修改

**引出的问题**：由于线程执行的过程是不可控的，所以需要采用同步机制来协同对对象可变状态的访问！

### 如何解决线程并发安全问题

实际上，所有的并发模式在解决线程安全问题时，采用的方案都是**序列化访问临界资源**。即在同一时刻，只能有一个线程访问临界资源，也称作**同步互斥访问**。

**Java 中，提供了两种方式来实现同步互斥访问：synchronized 和 Lock**

**同步器的本质就是加锁**

加锁目的：**序列化访问临界资源**，即同一时刻只能有一个线程访问临界资源(**同步互斥访问**)

不过有一点需要区别的是：当多个线程执行一个方法时，该方法内部的局部变量并不是临界资源，因为这些局部变量是在每个线程的私有栈中，因此不具有共享性，不会导致线程安全问题。

## synchronized原理详解

**synchronized内置锁是一种对象锁(锁的是对象而非引用)，作用粒度是对象，可以用来实现对临界资源的同步互斥访问，是可重入的。**

加锁的方式：

1. 同步实例方法，锁是当前实例对象
2. 同步类方法，锁是当前类对象  
3. 同步代码块，锁是括号里面的对象

### synchronized底层原理

**synchronized是基于JVM内置锁实现**，通过内部对象**Monitor**(监视器锁)实现，基于进入与退出**Monitor**对象实现方法与代码块同步，监视器锁的实现依赖底层操作系统的**Mutex lock**（互斥锁）实现，它是一个重量级锁性能较低。当然，**JVM内置锁在1.5之后版本做了重大的优化**，如锁粗化（Lock Coarsening）、锁消除（Lock Elimination）、轻量级锁（Lightweight Locking）、偏向锁（Biased Locking）、适应性自旋（Adaptive Spinning）等技术来减少锁操作的开销，内置锁的并发性能已经基本与Lock持平。

![synchronized底层原理](/images/concurrent/synchronized/synchronized底层原理.png)

### Monitor监视器锁

![monitor](/images/concurrent/synchronized/monitor.png)

任何一个对象都有一个Monitor与之关联，当且一个Monitor被持有后，它将处于锁定状态。Synchronized在JVM里的实现都是基于进入和退出Monitor对象来实现方法同步和代码块同步，虽然具体实现细节不一样，但是都可以通过成对的MonitorEnter和MonitorExit指令来实现。

- **MonitorEnter指令**：插入在同步代码块的开始位置，当代码执行到该指令时，将会尝试获取该对象Monitor的所有权，即尝试获得该对象的锁
- **MonitorExit指令**：插入在方法结束处和异常处，JVM保证每个MonitorEnter必须有对应的MonitorExit

### 对象的内存布局

![对象的内存布局](/images/concurrent/synchronized/对象的内存布局.png)

**对象头信息是与对象自身定义的数据无关的额外存储成本**，但是考虑到虚拟机的空间效率，Mark Word被设计成一个非固定的数据结构以便在极小的空间内存存储尽量多的数据，它会根据对象的状态复用自己的存储空间，也就是说，Mark Word会随着程序的运行发生变化，变化状态如下：

![32位对象头](/images/concurrent/synchronized/32位对象头.png)

**轻量级锁，重量级锁及其他状态的存储结构如下：**

- **轻量级锁**：32位的Mark Word存储的是指向线程栈中Lock Record的指针，64位存储的是指向线程栈中Lock Record的指针
- **重量级锁**：32位的Mark Word存储的是指向互斥量（重量级锁）的指针，64位存储的是指向互斥量（重量级锁）的指针  
- **GC标记**：30位的Mark Word存储的对象的hashCode，2位存储的是GC年龄