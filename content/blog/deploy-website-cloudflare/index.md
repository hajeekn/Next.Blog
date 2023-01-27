---
title: 将你的网站部署到 Cloudflare 加快访问速度
sticky: 1
tags: [cloudflare]
description: 在 Cloudflare 上部署你的网站
categories: [cloudflare]
cover: https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171120796.png
photos: https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171120796.png
abbrlink: lyr15g
date: 2020-08-08 20:33:400
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!
通过各种高科技功能同步到[Hajeekn 的博客](https://blog.slqwq.cn)
上篇我们介绍了 Cloudflare Argo Tunnel 的玩法
本篇讲述如何部署网站到 Cloudflare 加快速度

# 配置 Cloudflare Pages

本文章基于 Cloudflare Pages,如果没有请用 GitHub + Cloudflare CDN
首先打开你的 Cloudflare 账户 Pages 页面
选择新建项目
授权应用完成后选择储存库
为了减少部署时间,推荐使用编译仓库(也就是 Hexo 生成 HTML 的仓库)
选择后无脑下一步
之后 Cloudflare Pages 就会开始部署你的 Hexo 了

# 自定义域名

打开 Cloudflare Partner 平台和你的 DNS 解析商
这里用辣椒和 DNS.LA 演示
新建一条解析(两边都是)
记录名写你博客的子域名,一般都是 blog
你的 DNS 解析商的 CNAME 海外写 blog.xxx.xx.cdn.cloudflare.net
默认和国内选择几个好用的自选 Cloudflare CDN 节点就行
辣椒的记录名也写 blog
记录类型选 CNAME
Cloudflare Pages 部署完成后会分给你一个
xxxx.pages.dev
把他复制填写进记录值然后保存就行
接着打开你的 Cloudflare Pages 页面
选择刚部署好的项目
进入自定义域
点击添加,自定义域就写 记录值.域名
然后等待 SSL 的启用就行了

# 配置缓存

打开 Cloudflare 的缓存配置页面
点击配置
**Always Online 设置为 true**
**缓存级别 设置为标准**
**浏览器缓存 TTL 设置成 4 小时**
然后打开规则
创建页面规则
这样写就行
记得把博客记录名.域名替换成你自己的
比如我的是 blog.slqwq.cn
就写 blog.slqwq.cn
~~今天又水了一篇文章,真棒(๑•̀ㅂ•́)و✧~~
