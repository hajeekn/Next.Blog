---
title: 使用Cloud Studio在云端写作✍
sticky: 1
tags: [Hexo, 云端, 高效写作]
description: 什么?你外出时还带一台电脑，太low了啊
categories: [Hexo, 云端写作]
abbrlink: 2ir0l12g
date: 2021-01-21 20:00:46
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 26
---

Hey，这篇文章我们会为你介绍一个写作的新方法------Cloud Studio 云写作(不是广告)

# 初始化 Cloud Studio 工作空间

想要在 `Cloud Studio` 云写作，首先你要上传源码到仓库。
你可以上传到 `GitLab`、`GitHub`、`Coding` 等代码托管商
首先我们打开 `Cloud Studio`
地址为 

`%PROJECTNAME%.cloudstudio.net/dashboard/workspace`
进入后选择新建工作空间
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171052931.png#crop=0&crop=0&crop=1&crop=1&id=nd3Sq&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
工作空间名可以随便填
运行环境选择 `Node.js`
代码来源可以选择空

# 同步仓库

现在进入工作空间后我们选择上栏的终端
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171053650.png)
新建终端
然后在下面就会出现类似这样的东西
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171054259.png#crop=0&crop=0&crop=1&crop=1&id=MTpvI&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
这就是我们的终端了，现在你要把你博客上传到 GitHub 之类的代码托管网站上，方便我们同步。
在你的终端内输入

````shell
$ git clone %REPOURL% .
````

![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171054751.png#crop=0&crop=0&crop=1&crop=1&id=kH50O&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
仓库克隆完后在列表会出现你的文件，这时候你就可以像本地一样正常写文章了
（其实我还是觉得 `GitHub Actions` 自动部署好一点)

[^%REPOURL%]: 仓库地址
[^%PROJECTNAME%]: 项目名称

