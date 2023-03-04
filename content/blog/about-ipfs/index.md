---
title: IPFS - 一个基于点对点网络的超媒体协议
sticky: 1
tags: [p2p, peertopeer]
description: 关于 IPFS 的那些事
categories: [p2p, ipfs]
cover: https://rmt.ladydaily.com/fetch/hajeekn/storage/202205031336998.JPG
abbrlink: ys6wh9
date: 2022-05-03 20:00:46
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!
通过各种高科技功能同步到[Hajeekn 的博客](https://blog.slqwq.cn)

# IPFS's Author

IPFS's Author 是 `Juan Benet`
`Juan Benet`在 2014 年创建了 `Protocol Labs` (协议实验室)
协议实验室旗下的项目:

- IPFS
- FileCoin

协议实验室旨在如何构建下一代互联网

# What's IPFS?

依照官网的介绍,总的来说,IPFS 就是一种点对点超媒体协议,它可以使网络更快、更安全、更开放
本质上来说,它就是一种去中心化互联网(Peer to Peer) ≈ P2P
~~没错,就是孽种 P2P 下载器~~
~~这么牛的项目怎么是 P2P 下载器呢?~~ P2P 下载器只是个披着羊皮的狼
P2P(Peer to Peer)依靠用户群交换信息
以 number.exe 为例
当你上传后,无数个 Node(用户) 会瓜分你的 number.exe
他们将你的文件分成许多分片,瓜分分片
他们在瓜分的同时会获得奖励

> **是不是听起来很神奇?对的,你没有付出任何东西,别人却能获得奖励,而且你既满足储存文件的需求,储存你文件的人也能得到金钱.这种机制,叫做 FileCoin.你可以把它想象成 Bittorrent+BitCoin 的结合物,实际上他就是这样的.当然不完全是,但核心理念就是这样的.只不过,BitCoin 付出的是算力,而 FileCoin 付出的是硬盘.**

**摘自 **[ChenYFan の Blog](https://blog.cyfan.top/)
![](https://article.biliimg.com/bfs/article/c92dc234ca18387e6d432fcf21ddf9c3e0091651.png)
这是 IPFS の不权威原理图(来自 [ChenYFan の Blog](https://blog.cyfan.top/))
所以,IPFS 相对于响应式请求(HTTP(S) / FTP)不同
传统的响应式请求由一个主服务器(或主集群)处理每一个请求,并贡献内容
而 IPFS 基于 Peer to Peer 技术,让每个 Node 都贡献,没有中心服务器(去中心化)

## 更细致的解释

IPFS 是一个基于 Git 模型版本管理 & DHT & CBA & Hash 等的产物
它基于 DHT(分布式哈希表) 进行寻址
而传统的响应式请求由 LBA(基于位置的寻址)
而这样,响应式请求的缺点就暴露了出来
LBA(基于位置的寻址) 它在查找时所看重的信息是位置,就好比一个网址 `https://blog.slqwq.cn/link/`如果这个位置被删除了,链接位置转移了,他就会暴露出![](https://article.biliimg.com/bfs/article/9deb2f42cf59109f300109095f6acad09333316b.png)404 Not Found 错误
而 IPFS 所采用的 DHT(CBA 基于内容的寻址)就没有这个缺点
它在查找时所看重的信息是内容,不管你位置在哪里,只要找到的内容符合要查找的信息,那他就是正确的

## 最后

基于响应式请求(中心化网络)还有一个超级大大大大的弊端
那就是
非常容易引入审查
也就是类似于我们国家的 `**Great Firewall of China**`** ~~(GFW 是一个分布式的入侵检测系统，并不是一个严格意义上的防火墙)~~**
每个国家的 `**gov**` 可以很方便的 `**BAN**` 掉某个网站或者应用
引入一个具体事例
在 2017 年, `**Turkey's GOV**`**就用国家安全的理由禁掉了维基百科**
~~当然,去中心化也不能避免掉 Firewall 的屏蔽,只是不那么容易屏蔽掉罢了~~

# Use IPFS - IPFS Client

进入 [IPFS-Desktop の Releases](https://github.com/ipfs/ipfs-desktop/releases)
![](https://article.biliimg.com/bfs/article/309a148ef36352916dfab97da75ee65f7dbbff15.png)
找到需要的客户端下载并安装
![](https://article.biliimg.com/bfs/article/7d18e4fa2c211b5d43fa0994dc42e740ef312fc1.png)
![](https://article.biliimg.com/bfs/article/3bdb2275e99d89cdb60c7cd96de08fd88ddcd529.png)
弹出防火墙警报请一定要允许
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202205031303835.png#crop=0&crop=0&crop=1&crop=1&id=MBCw0&originHeight=610&originWidth=768&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
在文件处可以上传文件
上传点击导入即可
![](https://article.biliimg.com/bfs/article/56e12e04e1c94da384bd9f74c11196545f14ceae.png)

> **接下来，重点来了！** > **ipfs 分享文件有两种方式，是 ipfs 和 ipns，前者采用文件 hash 辨别文件，文件内容一旦改变，原来的链接无法更新，链接格式为 https://ipfs.io/ipfs/QmZCvMHrE56VqsejmG53xd9bW4RZjtFpLz46QMQjA81orL ；后者采用用户 id 辨别,内容允许更新，但是用户在线时间过短会导致无法同步，并且有可能暴露用户信息，后者格式为： https://ipfs.io/ipfs/QmQQKZphgJdEGhTp18NRvVdSJ3RJArRst2keKk3tZvmfPz?filename=index.html .** > **如果你只是单个文件网页，此处比较建议使用 ipfs，ipns 可能离线时间过长导致无法下载。具体看个人所好。** > **ipfs 链接获取：点击 ··· ,选择复制哈希，在前面加上网关域名即可。** > **ipns 连接获取：点击 ··· ,选择分享，复制链接即可。** > **在善用技术上网的前提下访问 https://ipfs.io/ipfs/QmZCvMHrE56VqsejmG53xd9bW4RZjtFpLz46QMQjA81orL 显示目标界面** > **请注意，每次上传后一定要先访问一遍资源，否则文件是不会上传到 ipfs 服务器的！**

**摘自 **[ChenYFan の Blog](https://blog.cyfan.top/)

# Use IPFS - IPFS Gateway

## JSProxy - IPFS Gateway

因为 IPFS 默认的网关被 FW 了
所以我们可以通过 Worker JSProxy 的方式解锁你自己的网关

```javascript
addEventListener("fetch", (event) => {
  let url = new URL(event.request.url);
  url.hostname = "cloudflare-ipfs.com";
  let request = new Request(url, event.request);
  event.respondWith(fetch(request));
});
```

粘贴进去,访问 Worker 地址就能看到 404 了
然后在 IPFS Client 里复制地址,接在后面就能打开你上传的文件了
![](https://article.biliimg.com/bfs/article/ebc64364151d835c36fe471b3a5369532ccf4b26.png)

## JSProxy - Cloudflare IPFS Gateway

我们可以通过 Worker JSProxy 的方式解锁你自己的 CNAME

```javascript
addEventListener("fetch", (event) => {
  let url = new URL(event.request.url);
  url.hostname = "cloudflare-ipfs.com";
  let request = new Request(url, event.request);
  event.respondWith(fetch(request));
});
```

粘贴进去,就变成了基于 CIG 的你自己的 IPFS 网关

# Use IPFS - Build Blog

搭建博客就等下次吧
