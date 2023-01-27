---
title: Floccus 食用教程
sticky: 1
tags: [书签同步]
description: 书签还在傻傻的导入导出?快来试试 Floccus
categories: [书签同步]
abbrlink: eur9h5la
date: 2021-04-18 10:49:42
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

> 演示过程基于 Twinkstar(星愿)浏览器,其他浏览器可能大致步骤一样

# 什么是 Floccus

Floccus 是一个在 GitHub 上的开源项目，该项目的官方简介如下

> Sync your bookmarks across browsers via Nextcloud, WebDAV or a local file (and thus any file sync solution).
> 简单的说它就是一个支持 Google Chrome 和 Mozilla Firefox 跨平台同步的一个插件，依赖于 WebDAV、nextcloud、本地文件等

# 下载并安装 Floccus 插件

[Chrome Store Download](https://chrome.google.com/webstore/detail/floccus/fnaicdffflnofjppbagibeoednhnbjhg)
[GitHub Release 下载](https://github.com/marcelklehr/floccus/releases/)

# 配置坚果云

坚果云支持 WebDAV,并且在国内,速度快,所以我们就选用了[坚果云](https://jianguoyun.com/)
如果你有账号点击登录
如果你没有账号点击注册
我有账号就直接登录了
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171111947.png#crop=0&crop=0&crop=1&crop=1&id=KZgFg&originHeight=867&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
进入后可以看见这些东西
sync 刚开始是没有的
接下来我们可以创建一个文件夹用于存放书签文件
这边命名为 sync,你也更改
在坚果云刚刚创建的文件夹中创建一个名为 bookmarks.xbel 的文件,文件内放入这些内容:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xbel PUBLIC "+//IDN python.org//DTD XML Bookmark Exchange Language 1.0//EN//XML" "http://pyxml.sourceforge.net/topics/dtds/xbel.dtd">
<xbel version="1.0">
</xbel>

```

然后保存就可以了
接下来进入账号信息
安全选项
点击添加第三方应用
点击生成密码

# 配置 Floccus 插件

打开 Floocus 选择新建账户
WEBDAV URL 写： https://dav.jianguoyun.com/dav/
用户名写示例里面的
密码写你的用户密码
书签路径写自己新建的文件夹/bookmarks.xbel
接下来点击保存即可
