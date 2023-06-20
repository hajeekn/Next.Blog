---
title: 使用Vercel搭建一个静态网站
sticky: 1
tags: [网站, Free]
description: [干货]
categories: [Vercel]
abbrlink: 98e384e2
date: 2020-12-11 21:53:28
cover: https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212180846.gif
photos: https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212180846.gif
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

提供免费搭建网站的服务有很多，像热铁盒主机、Coding Pages、GitHub Pages······Vercel 也是其中之一，今天教大家使用 Vercel 搭建一个静态网站。

# 登录账号

[前往 Vercel 官网](https://www.vercel.com)

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212171545.png#alt=image-20201212171544981#align=left&display=inline&height=870&margin=%5Bobject%20Object%5D&originHeight=870&originWidth=1920&status=done&style=none&width=1920)

点击 Login 按钮

点击后会跳转至这个页面

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212171715.png#alt=image-20201212171715452#align=left&display=inline&height=703&margin=%5Bobject%20Object%5D&originHeight=703&originWidth=1673&status=done&style=none&width=1673)

# 授权服务

选择一个你有的账号

按钮 1.连接到 GitHub

按钮 2.连接到 GitLab

按钮 3.连接到 Bitbucket

如果你都没有就可以点击下面的 Don't have an account? Sign Up(没有一个账号?注册)

这里用 GitHub 来演示

登录完成后会跳转到仪表盘

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212172119.png#alt=image-20201212172119038#align=left&display=inline&height=856&margin=%5Bobject%20Object%5D&originHeight=856&originWidth=1894&status=done&style=none&width=1894)

这时候我们先回到 GitHub，我们先创建一个仓库放入测试 html

# 导入项目

接着我们复制刚创建的仓库的 git 地址

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212172440.png#alt=image-20201212172440181#align=left&display=inline&height=406&margin=%5Bobject%20Object%5D&originHeight=406&originWidth=935&status=done&style=none&width=935)

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212172456.png#alt=image-20201212172456843#align=left&display=inline&height=721&margin=%5Bobject%20Object%5D&originHeight=721&originWidth=1007&status=done&style=none&width=1007)

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212172552.png#alt=image-20201212172552337#align=left&display=inline&height=690&margin=%5Bobject%20Object%5D&originHeight=690&originWidth=929&status=done&style=none&width=929)进入这个页面的时候注意，由于我们的仓库里放了一个 html，所以这里不要做任何设置直接点击蓝色的 Deploy 按钮

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212172705.png#alt=image-20201212172704922#align=left&display=inline&height=655&margin=%5Bobject%20Object%5D&originHeight=655&originWidth=1622&status=done&style=none&width=1622)

出现这个页面就代表你的网页成功部署了

我们点击 Visit 按钮去测试一下

![](https://cdn.jsdelivr.net/gh/glahajeekn/imcdn@main/images/20201212172947.png#alt=image-20201212172947775#align=left&display=inline&height=1020&margin=%5Bobject%20Object%5D&originHeight=1020&originWidth=1920&status=done&style=none&width=1920)

成功!

这样就可以搭建一个简单的静态网站了。

对于 Hexo 你可以直接放源码上去，然后配置构建命令，不过这个内容不属于本文范围之类，所以就不讲了。

# Thanks For You
