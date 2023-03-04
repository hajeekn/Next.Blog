---
title: 未备案使用国内服务器 & Cloudreve 部署指南
sticky: 1
tags: [cloudreve]
description: 未备案绕备指北(逃
categories: [cloudreve]
cover: https://rmt.ladydaily.com/fetch/hajeekn/storage/202205031220844.png
abbrlink: phiyrf
date: 2022-05-02 10:26:46
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!
通过各种高科技功能同步到[Hajeekn 的博客](https://blog.slqwq.cn)
正如标题所说
若欲正事未备案用国服务器,则不可得,故可以阿里云主机漏洞跳备案
跳备案仅适用于 CN 域名,其他域名请自己尝试
~~首先我们需要一个阿里云账户(废话)~~
然后实名认证(汝可用支付宝实名,或旧法实名)

# 云服务器配置

在创建云服务器时这样配置
![](https://article.biliimg.com/bfs/article/30d1f177250a3f8c98a8c4f1bb8d81df2c5d4d7e.png)
实例选 n4.small
地域上海 A 区
带宽根据自己的需要调
然后典型 1h2g

# 宝塔安装

登陆上服务器
Ubuntu / Deepin:

```bash
$ wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

CentOS:

```bash
$ yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

Debian:

```bash
$ wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh ed8484bec
```

**不知道自己是什么系统?**
~~那你就干脆别用了~~
这是万能安装脚本:

```bash
$ if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec
```

登上主机后安装 Nginx

# 安装 Cloudreve

去 Cloudreve 的 GitHub 中找安装包
![](https://article.biliimg.com/bfs/article/638e543f133c0144fac9ab882ea2fadeed7386db.png)
登录宝塔
创建一个文件夹
![](https://article.biliimg.com/bfs/article/03e302d7da73f943e88c80466d8a6314ff501c2f.png)
创建完后选择远程下载
把地址粘贴进去,等待下载完成
然后点击 tar.gz 后面的解压
![](https://article.biliimg.com/bfs/article/cb02fd969b04964efbea53a3e322756c8e546664.png)
之后给解压出来的文件给 777 权限
![](https://article.biliimg.com/bfs/article/22f5700de07dc4eba675de42ef6c3006a796ffb7.png)
![](https://article.biliimg.com/bfs/article/26f5ff92f2f3aec0f492821d33c71dbdad6abe48.png)
然后进入终端
安装 Screen

```bash
$ apt-get update
$ apt-get install screen
```

命令行启动 Screen

```bash
$ screen
```

用 `cd` 命令进入文件夹

```bash
$ ./cloudreve
```

启动 Cloudreve

# 配置反向代理 & SSL

启动完后回到宝塔,添加站点
![](https://article.biliimg.com/bfs/article/446c5af1111bb0627a248c895ed4d4906454184b.png)
创建完后进入反向代理
新建反向代理
![](https://article.biliimg.com/bfs/article/37dc0f6a98a12a1f8f55093ea6c3053caf74c420.png)
目标 URL 写 cloudreve 启动的地址
配置完后提交
转到 SSL
![](https://article.biliimg.com/bfs/article/f90d8d71ee919ef6e355b2e77caa8392b3c2eca8.png)
选择 Let's Encrypt
选择 DNS 验证(因为我们开了反向代理,不能用文件验证)
![](https://article.biliimg.com/bfs/article/e6b87b97aa375e5f0f8caaf21f7e468fffaa030a.png)
DNS 接口根据自己选择并配置
如果没有你的 DNS 提供商,就手动解析
配置完后勾选要申请 SSL 的域名
点击申请
这样就部署好了
之后记得在 DNS 提供商解析一下主机
A 记录到你鸡子的 IP

# 关于账户

看启动 cloudreve 时终端提示的管理员账户与密码即可
