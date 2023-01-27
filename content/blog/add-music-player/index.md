---
title: 如何给自己的网站添加音乐播放器
sticky: 1
tags: [Butterfly, Custom]
description: 添加一个音乐播放器在你的网站上
categories: [Butterfly, Custom]
cover: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210224141138.png
photos: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210224141138.png
abbrlink: adlloiau
date: 2021-02-24 11:00:47
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!
通过各种高科技功能同步到[Hajeekn 的博客](https://blog.slqwq.cn)

---

本文章为以前文章的重制版本,会详细说明

# 开始前言

首先,这篇文章所写的教程适用于大部分主题和网站
本篇文章会提供 HTML/YML 引用方法,可以将 HTML 引用方法转换成你主题所提供的自定义 head 方法

# 开始

首先打开你的 Butterfly 配置文件
一般为以下几个名称

- \_config.butterfly.yml(存在于根目录下)
- butterfly.yml(存在于 source/\_data 目录下)
- \_config.yml(存在于主题目录下)

找到 inject
在 head 部分粘贴以下内容

```yaml
- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css"  media="defer" onload="this.media='all'">
- <meting-js server='tencent' type='playlist' id='3813658180' fixed='true'></meting-js>
```

在 bottom 部分粘贴以下内容

```yaml
- <script async src="https://cdn.jsdelivr.net/npm/aplayer"></script>
- <script async src="https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js"></script>
```

HTML 引入方法:
在 head 添加

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css"
  media="defer"
  onload="this.media='all'"
/>
<meting-js
  server="tencent"
  type="playlist"
  id="3813658180"
  fixed="true"
></meting-js>
```

在/body 前添加

```html
<script async src="https://cdn.jsdelivr.net/npm/aplayer"></script>
<script
  async
  src="https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js"
></script>
```

其中`server='tencent' type='playlist' id='3813658180' fixed='true'`可以自定义
自定义方法可参照 MetingJS 官方 README
[https://github.com/metowolf/MetingJS/blob/master/README.md](https://github.com/metowolf/MetingJS/blob/master/README.md)
水完了,溜了溜了

## 说明

如果你要达到本博客的刷新不断歌(除主动刷新或刷新 JavaScript 脚本)
需要开启 Pjax 功能
