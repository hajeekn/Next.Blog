---
title: 那些奇奇怪怪的图床
sticky: 3
tags: [picgo]
description: 图床盘点
categories: [picgo]
cover: https://i0.hdslb.com/bfs/album/4b212e3692523c9baa9bfb4415b89c68fff44557.png
abbrlink: nvz8s3
date: 2022-05-15 11:17:12
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!

通过各种高科技功能同步到[Hajeekn的博客](https://blog.slqwq.cn)

最近想用 IPFS 做图床但是发现的一堆奇奇怪怪的图床

(PS: 不会介绍传统的 GitHub + JSdelivr / SM.MS / 路过图床)

# Bilibili 图床

十分简单

PicGO 搜索 bilibili

![img](https://i0.hdslb.com/bfs/album/cf1ae1497dece72e055eb53e76ab22cce8edbd7f.png)

接着配置 Bilibili 图床

![image-20220515095616065](https://i0.hdslb.com/bfs/album/cdfe3d7b91a9e90d70b5b98f73cc210c3e3818af.png)

SESSDATA 可以登录哔哩哔哩后查看

进入哔哩哔哩,按下 F12

定位到应用  -> COOKIE

![image-20220515095718144](https://i0.hdslb.com/bfs/album/b9641807e390e3cb6400dfde505d355fed04efe7.png)

选择 `https://www.bilibili.com`

![image-20220515095812119](https://i0.hdslb.com/bfs/album/414a2c8e5ac3a5468149e9ba127d0ee4a13567fc.png)

在名称内找到 SESSDATA

点击它

![image-20220515100404765](https://i0.hdslb.com/bfs/album/acf7ca1d8eb1dd61ad279ba9d0d261ea46e67052.png)

然后在 Cookie Value 中复制值,粘贴进去

之后确定,设置默认图床即可

## 良心的处理参数

哔哩哔哩图床有十分良心的处理参数

| Type                                    | URL                      |
| --------------------------------------- | ------------------------ |
| 原图                                    | 不做更改                 |
| 原分辨率, 质量压缩                      | 原链接 + @1e_1c.jpg      |
| 原分辨率, 质量压缩(WEBP)                | 原链接 + @1e_1c.webp     |
| 规定宽, 高度自适应, 质量压缩(可变 WEBP) | 原链接 + @104w_1e_1c.jpg |
| 规定高, 宽度自适应, 质量压缩(可变 WEBP) | 原链接 + @104h_1e_1c.jpg |
| 规定高宽, 质量压缩(可变 WEBP)           | @104w_104h_1e_1c.jpg     |
| 原分辨率(WEBP)                          | @104w_104h_1e_1c.webp    |

这是 哔哩哔哩 的处理参数

哔哩哔哩还有许多节点可以选择

## 自定义 CDN

金山 CDN 路线:

- i0.hdslb.com
- i2.hdslb.com

阿里 CDN 路线:

- i1.hdslb.com
- 14.hdslb.com
- s1.hdslb.com
- s3.hdslb.com

腾讯 CDN 路线:

- 13.hdslb.com

未知 CDN 路线:

- s2.hdslb.com

> Bilibili 图床有防盗链,如果你要在你自己的网站中用 Bilibili 图床,得先配置头

```html
<meta name="referrer" content="no-referrer">
```

> 如果你用的 Hexo - Butterfly 则可以在配置文件中这样配置

```yaml
inject:
  head:
      - <meta name="referrer" content="no-referrer">
```

## 配套食用

[浏览器插件](https://github.com/xlzy520/bilibili-img-uploader)

[Typora 插件](https://github.com/xlzy520/typora-plugin-bilibili)

> 配合 typora 食用更佳

> 如果用了很久之后,在上传时出现了错误,那就是 SESSDATA 过期了,重新去生成一个就好

# NPM + UNPKG 镜像

> 使用这个方法前记得切换回原来 NPM 的注册表.因为其他镜像没有发布这个功能

十分简单

本地先登录,接着创建包,然后初始化版本,最后发布

指令:

```bash
$ npm login
$ npm init -y
$ npm version patch
$ npm publish
```

这样一个 npm 包就发布完了

接下来是收集的一些镜像

- https://npm.elemecdn.com/  饿了么(阿里 CDN)
- https://unpkg.zhimg.com/ 知乎(阿里 CDN)
- https://shadow.elemecdn.com/  饿了么(阿里)(这个停止维护了)
- https://code.bdstatic.com/npm/ 百度(百度 CDN)
- https://cdn.jsdelivr.net/npm/ Jsdelivr(备案没封前是网宿 CDN | 后来备案封后是 Cloudflare + Fastly + Gcore)(可以自定义节点)

Jsdelivr 自定义节点只需要:

gcore.jsdelivr.net

fastly.jsdleivr.net

即可

# 4EVERLAND BUCKET

> 这应该是 IPFS 的另一个方案(但是最多 1G)

## PicGo 插件安装

![image-20220515102843681](https://i0.hdslb.com/bfs/album/a331f344fec5938cf88bb31b96eb617ca7aa912a.png)

搜索 s3 并安装

然后就去 4EVERLAND 注册一个账户

https://4everland.org/

这个网站似乎只能用以太坊钱包登录,GitHub 登录会提示不支持了(

我用的 MetaMask

注册之后创建一个桶![image-20220515103035770](https://i0.hdslb.com/bfs/album/18d86351cd8e59f2952403b87e6148a011a0c8b7.png)

## 生成 API TOKEN

点击你账户, 选择设置

转到 Auth Token

选择 Bucket Auth Tokens

点击 Generate 即可

![image-20220515103143196](https://i0.hdslb.com/bfs/album/6a6280b7d227e71f85fe3ac5d6c723a1624b10b2.png)

> 本文章的 Key 在发布之前就删掉了,不要想着搞坏事

之后进入 PicGo 配置下

转到 Amazon S3

![image-20220515103304436](https://i0.hdslb.com/bfs/album/0c17cef3800acd7e24cb513332b581b7e533d734.png)

ID 和 密钥粘贴进去

桶写你创建桶的时候的名字

节点用 https://endpoint.4everland.co

自定义域名是 桶名.4everland.store

最后记得把这两个选项打开

![image-20220515103434098](https://i0.hdslb.com/bfs/album/2cfae6b3b35c40363da4d245be35ddbe689c6a48.png)

# IPFSUPLOAD(真正意义上的 IPFS 图床)

本地装一个 IPFS DESKTOP

等他启动后先看端口

![image-20220515103737939](https://i0.hdslb.com/bfs/album/4f632ddca72f5fd73c04b363a3bcc71c0ed32a46.png)

图中圈着的就是端口,然后去浏览器访问一下看看正不正常

`http://localhost:5001/api/v0/add?pin=true`

如果正常应该会提示 405 - Method Not Allowed

接着就是上传了

PicGo 安装一个 web-uploader

![image-20220515104103681](https://i0.hdslb.com/bfs/album/900e4ad2f69eb49de3c2cc768a570d0a4d64e341.png)

然后配置如图

![image-20220515104559575](https://i0.hdslb.com/bfs/album/f3964d51aa4ec7628e29561b436244322a9dc43d.png)

IPFS网关我是用的我自己的,所以打了马赛克,你们可以自己先用 workers 反代一次,然后再用 CDN 过墙

你也可以直接 CDN 我代理好的 worker (IPFS 官网)

PS :我没有反代 IPFS 网关

回源: **dl2p.taiyu.workers.dev**

回源 HOST: **dl2p.taiyu.workers.dev**

回源端口: 443

回源协议: HTTPS

速度测试:

![](https://dl2p.hesiy.cn/ipfs/QmeeNLDPcfC2SZnC5N2TZTSY19P4nRPHhVoqMrYJvuXVLX?filename=Genshin%20Impact.webp)

> 不给滥用,我设置了防盗链

# DogeDoge 图床

没有什么说的,速度炒鸡快,使用要申请,现在应该申请不到了

有的可以用

![image-20220515104734675](https://i0.hdslb.com/bfs/album/14b08dccb38ff79f6935a6a764a65b20773bf724.png)

# BACKBLAZE B2 + Cloudflare

首先猜到有人要提问: 为什么要加 Cloudflare?

因为 BACKBLAZE 有流量计费,但是他加入了带宽联盟,再加上 Cloudflare 超长缓存,≈ 完全免费

但是有10G空间

这是超出10G的价格

![](https://i0.hdslb.com/bfs/album/6389ccc4522227dd936a8eedfeb6988ecd39616c.jpg)

注册方法 ChenYFan 大佬已经写过了,与其再写一篇问文章,不如直接用他的~~(其实就是懒)~~

直接贴:

https://blog.cyfan.top/p/ce240368.html

# 云存储做图床

> 用 OneDrive Google Drive 做图床真的是闲

## OneDrive

参考 [Spencer Woo](https://ovi.swo.moe/zh/docs/getting-started) 去搭建一个 onedrive-vercel-index 就行

## xxxxxxxxxx2 1- <script async data-pjax src="https://cdn.jsdelivr.net/gh/slblog-github/Static@main/script/pace-main.min.js"></script>2- <link rel=stylesheet href="https://cdn.jsdelivr.net/gh/slblog-github/Static@main/styles/pace-theme-flash.min.css">yaml

参考 [ChenYFan](https://blog.cyfan.top/p/74e90c90.html) 搭建一个 GDIndex 即可

# 大厂的对象储存

## 阿里云 OSS

> 有很多人写,自己谷歌,反正价格挺便宜的

## 腾讯云 COS

> 🤢 这东西不推荐,计费十分离谱,而且配置头超长缓存后 COS 会在用户请求时悄悄篡改 max-cache
>
> 新用户有 6 个月免费额度,之后就要开始付费了(
>
> ⚠ 流量包和储存包都很贵

## 又拍云 UOS

> 又拍云似乎是没有免费额度的,但是又拍云有开发者联盟,只需要把他的 Logo 挂在你的网站页脚就行,甚至还能用一个徽章

徽章这样配置就行了

```html
<img src="https://img.shields.io/badge/CDN-%E5%8F%88%E6%8B%8D%E4%BA%91-00b6ff?style=flat&logo=data:image/png;base64,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">
```

但是这个网站似乎有点慢,你可以把他的 SVG 下载下来放在本地引用

```html
<img src="本地位置.svg">
```

# 总结

好用的图床千千万,你要自己去发现

我总结了 7 个免费图床,其中 DogeDoge 图床需要申请

如果细数的话,共有 8 个免费图床(每个云存储单独算一个)
