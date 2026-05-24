---
title: JVM系列(三)：JVM对象创建与内存分配机制深度剖析
order: 3
date: 2024-01-04
category:
  - Java
  - JVM
tag:
  - JVM
  - 对象创建
  - 内存分配
  - 对象头
---

# JVM系列(三)：JVM对象创建与内存分配机制深度剖析

## 对象的创建

<!-- ![对象创建的流程](/images/jvm/object-creation/对象创建的流程.png) -->

### 类加载检查

虚拟机遇到一条new指令时,首先将去检查这个指令的参数是否能在常量池中定位到一个类的符号引用,并且检查这个符号代表的类是否已被加载,解析和初始化过.如果没有,那必须先执行相应的类加载过程.

new 指令对应到语言层面上讲意思是:new关键词,对象克隆,对象序列化等.

### 分配内存

在类加载检查通过后,接下来虚拟机将为新生对象分配内存.对象所需内存的大小在类加载完成后便可完全确定,为对象分配空间的任务等同于把一块确定大小的内存从Java堆中划分出来.

#### 如何划分内存?

##### 指针碰撞(Bump The Pointer)-默认

如果Java堆中的内存是觉得规整的,所有用过的内存都放在一边,空闲的在另一边,中间放着一个指针作为分界点的指示器,那所分配内存就仅仅是把那个指针向空闲空间那边挪动一段与对象大小相等的距离.

##### 空闲列表(Free List)

如果Java堆中的内存并不是规整的,已使用的内存和空闲的内存相互交错,那么就没有办法简单的进行指针碰撞了,虚拟机就必须维护一个列表,来记录那些内存块是可用的,在分配的时候从列表中找到一块足够大的空间划分给对象实例,并更新列表上的记录.

#### 在并发情况下,可能出现正在给对象A分配内存,指针还没来得及修改,对象B又同时使用了原来的指针分配内存的情况

##### CAS (compare and swap)

虚拟机采用CAS配上失败重试的方式保证更新操作的原子性来分配堆内存空间的动作进行同步处理.

##### 本地线程分配缓冲(Thread Local Allocation Buffer,TLAB)

把内存分配的动作按照线程划分在不同的空间之中进行,即每个线程在Java堆中预先分配一小块内存,通过-XX:/-UserTLAB参数来设定虚拟机是否使用TLAB(JVM默认开启),-XX:TLABSize 指定TLAB大小.

### 初始化零值

内存分配完成后,虚拟机需要将分配到的内存空间都初始化为零值(不包含对象头),如果使用TLAB,这一工作过程也可以提前至TLAB分配时进行.这一步操作保证了对象的实例字段在Java代码中可以不赋初始值就直接使用,程序能访问到这些字段的数据类型所对应的零值.

### 设置对象头

初始化零值之后,虚拟机要对对象进行必要的设置,例如这个对象是那个类的实例,如何才能找到类的元数据信息,对象的哈希码,对象的GC分代年龄等信息.这些信息存放在对象的对象头Object Header之中.

在HotSpot虚拟机中,对象在内存中存储的布局可以分为3块区域:对象头(Header),实例数据(Instance Data)和对齐填充(Padding).在HotSpot虚拟机的对象头包括两部分信息,第一部分用于存储对象自身的运行时数据,如哈希码(Hash Code),GC分代年龄,锁状态标志,线程持有的锁,偏向线程ID,偏向时间戳等,对象头的另外一部分是类型指针,即对象指向它的类元数据的指针,虚拟机通过这个指针来确定这个对象是那个类的实例.

#### 32位对象头

<!-- ![32位对象头](/images/jvm/object-creation/32位对象头.png) -->

#### 64位对象头

<!-- ![64位对象头](/images/jvm/object-creation/64位对象头.png) -->

对象头在hotspot的C++源码markOop.hpp文件里的注释如下：

```c
// Bit-format of an object header (most significant first, big endian layout below):
//
//  32 bits:
//  --------
//             hash:25 ------------>| age:4    biased_lock:1 lock:2 (normal object)
//             JavaThread*:23 epoch:2 age:4    biased_lock:1 lock:2 (biased object)
//             size:32 ------------------------------------------>| (CMS free block)
//             PromotedObject*:29 ---------->| promo_bits:3 ----->| (CMS promoted object)
//
//  64 bits:
//  --------
//  unused:25 hash:31 -->| unused:1   age:4    biased_lock:1 lock:2 (normal object)
//  JavaThread*:54 epoch:2 unused:1   age:4    biased_lock:1 lock:2 (biased object)
//  PromotedObject*:61 --------------------->| promo_bits:3 ----->| (CMS promoted object)
//  size:64 ----------------------------------------------------->| (CMS free block)
//
//  unused:25 hash:31 -->| cms_free:1 age:4    biased_lock:1 lock:2 (COOPs && normal object)
//  JavaThread*:54 epoch:2 cms_free:1 age:4    biased_lock:1 lock:2 (COOPs && biased object)
//  narrowOop:32 unused:24 cms_free:1 unused:4 promo_bits:3 ----->| (COOPs && CMS promoted object)
//  unused:21 size:35 -->| cms_free:1 unused:7 ------------------>| (COOPs && CMS free block)
```

### 执行`<init>`方法

在上面工作都完成后,从虚拟机的视角来看,一个新的对象已经产生了,但从Java程序的视角看来,对象创建才刚刚开始,`<init>`方法还没有执行,所有的字段都还为零.所以,一般来说,执行new指令之后会接着执行`<init>`方法,把对象按照程序员的意愿进行初始化,这样一个真正可用的对象才算完全产生出来.