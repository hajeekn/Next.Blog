---
title: AX9000 Docker 部署指南
sticky: 1
tags:
  - docker
categories:
  - docker
abbrlink: e443d51d
date: 2022-07-22 11:26:53
description: AX9000 的充分利用
---

废话不多说,先看配置

作为小米家主打电竞的路由器,AX9000 的配置还是非常强劲的

## 硬件参数

**处理器** **Qualcomm IPQ8072A 4核 A53 2.2GHz CPU**

**⽹络加速引擎** **双核 1.7GHz NPU**

**内存** **1GB**

**2.4G Wi-Fi** **4×4（最高支持 IEEE 802.11ax协议，理论最高速率可达 1148Mbps）**

**5.2G Wi-Fi** **4×4（最高支持 IEEE 802.11ax协议，理论最高速率可达 4804Mbps）**

**5.8G Wi-Fi** **4×4（最高支持 IEEE 802.11ax协议，理论最高速率可达 2402Mbps）**

**产品天线** **外置高增益天线 + 内置 AIoT天线**

**产品散热** **主动散热**

**整机接口** **1个10/100/1000/2500M 自适应 WAN/LAN口（Auto MDI/MDIX）**
**1个10/100/1000M 自适应 WAN/LAN口（Auto MDI/MDIX）**
**3个10/100/1000M 自适应 LAN口（Auto MDI/MDIX）**

**LED指示灯** **8个（SYSTEM指示灯×1，INTERNET指示灯×1，网口灯×5，氛围灯×1）**

**系统重置键 ** **1个**

**USB3.0接口**  **1个**

**Mesh组网按键** **1个**

**电源按键** **1个**

**电源输入接口** **1个**

**协议标准** **IEEE 802.11a/b/g/n/ac/ax，IEEE 802.3/3u/3ab**

**认证标准** **GB/T9254-2008；GB4943.1-2011**

**保修信息** **整机保修1年**

可以看到,AX9000 拥有频率为 2.2GHz(arm64) 的4核高通 CPU

还是非常适合搞事情的

并且小米官方也在 `2021年11月12日` 发布了第一个开发版 ROM

![image-20220722113425748](https://i0.hdslb.com/bfs/album/e895eded559f24c6787630eac2d396855d6ca0f5.png)

而且还有虚拟内存功能

# 硬盘准备

> 启用 Docker 需要至少 64GB 的 硬盘/ U 盘
>
> 对于体验上来说,使用硬盘明显比 U 盘好得多

我准备的是夏科的移动硬盘(支持 USB3.1)

首先下载 DiskGenius

在右侧位置选择你的硬盘

![image-20220722113615561](https://i0.hdslb.com/bfs/album/b755973dc1aa9824ff69260647cf3fa677f4ee0c.png)

然后选择格式化

![image-20220722113651477](https://i0.hdslb.com/bfs/album/536c79003fb5f97b846c88a3124dbf67eaa0c1d5.png)

格式化为 EXT4

> 这里需要注意,如果你的硬盘还要用来储存文件,你需要把第一个分区(序号为1)格式化为 EXT4,其他分区可以保持不动

接着保存更改,拔出硬盘

# 路由器配置

首先下载小米官方提供的开发版 `ROM`

进入常用设置 -> 系统状态中进行升级就行

接着插入硬盘 AX9000 的 USB 3.1 口

![0](https://i0.hdslb.com/bfs/album/3b7649339b18e242a2958109dc04ad9d3cb48036.jpg)

位置在指示灯面左侧(也就是有 `Mesh` 组网按钮的那一面)

插入之后重启路由器(因为 AX9000 的 USB3.1 口似乎是不支持热插拔的)

> PS: 也有可能是我的问题

具体操作就是登陆后台选择路由器,点击重启

![image-20220722114257383](https://i0.hdslb.com/bfs/album/643f7072ba8f98ace42ec04855c36e4ac6ea920b.png)

当然你也可以直接按 Power 按钮

接着进入储存状态

![image-20220722114422388](https://i0.hdslb.com/bfs/album/5fb6fb340f35a56e4490bdcb7f823d15f758cbb5.png)

找到虚拟内存

![image-20220722114442113](https://i0.hdslb.com/bfs/album/f3192d028aff9364222dc35cb8ad7e6e1c92c115.png)

创建虚拟内存,这里最好选 4069MB (4G)

以给 Docker 留出足够的内存

等待创建完成

进入高级设置 -> Docker

然后你会进入这个页面

![image-20220722114741531](https://i0.hdslb.com/bfs/album/9297d3d29b38e74851fb4b336e774fb66889a9a0.png)

点击安装 Docker

等待安装完成

![image-20220722114811255](https://i0.hdslb.com/bfs/album/45a2af9c02ecdfcfe9110fb472466837286922ed.png)

然后运行 Docker 并安装第三方管理(Portainer)

安装第三方管理时有 ipv6 会比较快,如果没有 ipv6 就得忍受天朝网络,时不时还能安装失败几十次

安装完成进入 Portainer

完成他的配置

然后你就能进入这个页面了

![image-20220722115102813](https://i0.hdslb.com/bfs/album/76bb7ff881764d391c3be868d2a7f5d0cec9e885.png)

# Portainer 配置

首先是新建自己的镜像源

进入 **Registries** 选项卡新建自己的源

![image-20220722115224991](https://i0.hdslb.com/bfs/album/5f21db591363ef4110cda85575c9630006e28dbd.png)

然后去 App templates 找模板安装

![image-20220722115306421](https://i0.hdslb.com/bfs/album/4cc941aa58bb85dd3029948affa3c33cc0fafe22.png)

没错你没看错,AX9000 的 Docker 是支持 Ubuntu 的!

# 演示:安装 Ubuntu

选择 Ubuntu

名字随意

![image-20220722115410481](https://i0.hdslb.com/bfs/album/d7b4354cd9c261cb818cba278b6b737702c06657.png)

**然后重点来了**

点击 `Show adbanced options`

添加映射

![image-20220722115452836](https://i0.hdslb.com/bfs/album/f968387a37ef145467b8a73e1eddaef4e6875b32.png)

然后部署即可

# 演示:Ubuntu 配置

部署完后进入容器,选择 Console 进入控制台

![image-20220722115526166](https://i0.hdslb.com/bfs/album/4a45d26fea4e0ce8fc0a8b839035a5946903fca1.png)

先安装 vim 和 ca-certificates

(没错,这个系统非常精简)

```bash
$ apt-get update
$ apt-get install vim
$ apt-get install ca-certificates
```

然后换源

```bash
$ vim /etc/apt/sources.list
```

进入 Vim 界面后不要忙着进入编辑模式,输入 gg

然后输入 dG 就可以方便的删除所有内容了

接着粘贴清华镜像源

```bash
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-proposed main restricted universe multiverse
```

然后更新源

```bash
$ apt-get update
```

接着去除最小化

```bash
$ unminimize
```

# 演示:Ubuntu SSH

先更新源

```bash
$ apt-get upgrade
```

然后安装 openssh

```bash
$ apt-get install openssh-server
```

设置一个 ROOT 密码

```bash
$ passwd
```

修改 SSH 的配置文件

```bash
$ vim /etc/ssh/sshd_config
```

因为默认是注释了 **PermitRootLogin prohibit-password** 的,所以只需要允许 Root 登录就行

添加这一行

`PermitRootLogin yes`

重启服务

```bash
$ /etc/init.d/ssh restart
```

然后就可以 SSH 了
