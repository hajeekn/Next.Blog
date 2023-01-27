---
title: 搭建 YesPlayMusic 网页版
sticky: 1
tags: [Leancloud]
description: 没有服务器?用Leancloud鸭
categories: [Leancloud]
cover: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210211120920.png
photos: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210211120920.png
abbrlink: oc1hvkia
date: 2021-02-11 11:39:55
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 30
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!
通过各种高科技功能同步到[Hajeekn 的博客](https://blog.slqwq.cn)
最近在看 Spoience 的博客时看到了一篇文章: "一款高颜值跨平台的第三方网易云播放器 YesPlayMusic"
于是便看了看
看完后我进入了 YesPlayMusic 的 GitHub,突然我看到了这个
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171057375.png#crop=0&crop=0&crop=1&crop=1&id=CzHCn&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
可以直接将这个项目部署至云端，于是便抱着好奇的心试了试
以下是搭建步骤

# 搭建网易云 API

考虑到大部分人没有钱买服务器,抱着白嫖的心态部署在了 leancloud 尝试,没想到竟然可以
以下就是步骤喽

## 登录 Leancloud

进入[leancloud 的国际版官网](https://leancloud.app)
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171057084.png#crop=0&crop=0&crop=1&crop=1&id=XCCLZ&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
有账号的点击 Console
没有账号的选择中间的 Get started for free

## 创建应用

进入控制台后创建一个应用
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171057214.png#crop=0&crop=0&crop=1&crop=1&id=GrIzH&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
⚠ 注意: 现在必须写入应用描述,否则无法创建

## 部署 API

创建成功后进入你创建的应用后台
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171102794.png#crop=0&crop=0&crop=1&crop=1&id=WkOzz&originHeight=436&originWidth=320&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)选择云引擎 -> WEB -> 部署
选择部署项目 -> Git 部署 -> 配置 Git
在配置 Git 处填入
[https://github.com/ChenYFan-Tester/NeteaseCloudMusicApi.git](https://github.com/ChenYFan-Tester/NeteaseCloudMusicApi.git)
然后点击保存
保存完成之后再次进入部署项目
选择手动部署 -> 生产环境 -> 部署
稍等片刻即可部署完成![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171102499.png#crop=0&crop=0&crop=1&crop=1&id=eXVYi&originHeight=622&originWidth=1060&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

完成后关闭部署日志窗口
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171103830.png#crop=0&crop=0&crop=1&crop=1&id=pbkBY&originHeight=441&originWidth=309&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)选择设置 ->　域名绑定 -> 绑定新域名
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171103997.png#crop=0&crop=0&crop=1&crop=1&id=XK9TM&originHeight=689&originWidth=1068&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
在域名处填入自己准备绑定的域名,然后其他的原封不动,选择绑定
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171103224.png#crop=0&crop=0&crop=1&crop=1&id=mZS3w&originHeight=452&originWidth=654&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
这时候会给你分配一个 cname 域名
进入你的域名解析商
添加一个解析
解析记录选择 CNAME
主机记录填写刚才填写的域名(去掉.xxx.xx)
记录值填写刚才 leancloud 分配的 CNAME 域名
填写完成后大概的样子是这样的
保存,稍等片刻 leancloud 处就会显示部署完成
然后就可以部署主程序了

## 部署主程序

首先克隆云端仓库下来构建
在终端输入以下命令

```bash
git clone https://github.com/qier222/YesPlayMusic.git
cd YesPlayMusic
```

然后你需要安装依赖
在终端输入以下命令

```bash
yarn install
```

依赖安装完成后把目录下的.env.example 改成.env
修改 VUE_APP_NETEASE_API_URL=后的数据为你刚才部署的 API 的地址
例如我的是https://testapi.slqwq.cn就填写进去
VUE_APP_ELECTRON_API_URL=后的数据填写/
然后就可以用 yarn serve 查看
查看后觉得效果不错就可以用 yarn build 进行构建了
构建完成后上传到 GitHub 启动 Pages 服务就可以愉快的用了
如果想让这个 YesPlayMusic 支持播放灰色音乐还需要搭建 UnlockNeteaseMusic
各位可以自行去摸索

啊对了,今天是新年,祝各位新年快乐哦!
