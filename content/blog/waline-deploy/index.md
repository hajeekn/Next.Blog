---
title: Waline评论系统部署日志
sticky: 1
tags: [评论, 部署日志]
description: SL部署Waline评论系统时的日志，希望你也能用上这款评论系统
categories: [评论, 部署日志]
cover: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210222111238.png
photos: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210222111238.png
abbrlink: rbblakpo
date: 2021-02-21 19:46:58
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 33
---

**本文基于**[@CCKNBC](https://blog.ccknbc.cc/posts/waline-commens-system-deployment-logs/)**的日志**[@Waline 官方文档](https://waline.js.org/)和博主自己部署时的实际情况编写
如果需要最详细的配置请前往 [@Waline 官方文档](https://waline.js.org/)

---

# 评论系统特性

- 快速
- **真**·安全
- Markdown 语法支持
- 轻量易用
- 免费部署
- 多种部署方式和存储服务支持，每列选择一项多达 48 种部署方式任君选择

|                | Waline         |              |
| -------------- | -------------- | ------------ |
| **客户端脚本** | **服务端部署** | **数据存储** |
| @waline/client | Vercel         | LeanCloud    |
| MiniValine     | CloudBase      | CloudBase    |
|                | Docker         | MongoDB      |
|                | 独立部署       | MySQL        |
|                |                | SQLite       |
|                |                | PostgreSQL   |
|                |                | Github       |

## Todo

- [x] 微信通知
- [x] QQ 通知
- [x] Telegram 通知
- [x] Akismet
- [x] 文章统计
- [x] 多语言同步
- [x] 自定义语言支持
- [x] 登录支持
- [x] 评论管理
- [x] 评论删除
- [x] 其它数据库支持
- [x] 基于 IP 的发布评论频率限制
- [x] 基于关键词的评论过滤限制
- [x] IP 黑名单
- [x] 重复内容检测
- [x] CloudBase 腾讯云开发部署支持
- [x] 社交登录
- [ ] AWS, GCP, Azure 部署支持
- [ ] 置顶评论
- [ ] 评论赞踩

如果您要获得来自 Waline 群友或公子大佬的支持,可以在[Github Discussions](https://github.com/lizheming/waline/discussions) 中发布问题获取支持。当然你也可以加入 Waline 的 [Telegram](https://t.me/walinejs) 小组或者是加入我们的 [Waline 用户交流 QQ 群](https://qm.qq.com/cgi-bin/qm/qr?k=rPZvq_EBfwQa6QZX7sToVlhH49c6ed0R&jump_from=webapi)获取更多的支持。

# 上手

博主采用 Butterfly 主题,已经内置 Waline 评论系统

## Vercel + LeanCloud

**博主就使用了这种方式**~~(毕竟能白嫖谁还要花钱啊?~~
博主推荐使用[LeanCloud 国际版本](https://leancloud.app),如果您使用的是[LeanCloud 中国版本](https://leancloud.cn),除了本文介绍的环境变量,还需要绑定 LeanCloud 域名
配置方式: 设置 > 域名绑定 > API 访问域名 绑定新域名 > 输入需要绑定的已备案域名点击 确定。之后按照页面上的提示去 DNS 上做正确的 CNAME 解析即可。
[ ](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)![](https://cdn.nlark.com/yuque/0/2021/svg/12488964/1613908946082-2b97a876-6dcf-437c-8b06-d1be78602a82.svg#crop=0&crop=0&crop=1&crop=1&height=32&id=SkrZu&originHeight=32&originWidth=92&originalType=binary&ratio=1&rotation=0&showTitle=false&size=0&status=done&style=none&title=&width=92)
点击上面的 Deploy 按钮就可以快速跳转到 Vercel 部署辣
如果你没有 Vercel 账号,可能提示你需要注册一个,这里不要用 QQ 邮箱因为他们会认为 QQ 邮箱是一个垃圾邮箱
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171106702.png#crop=0&crop=0&crop=1&crop=1&id=nd4Cj&originHeight=875&originWidth=1896&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
PROJECT NAME 可以随便填写一个
这就是项目名称,不过为了之后好辩别,还是写一个方便记住的吧
输入了你的项目名称后点击 Continue 进入下一步
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171107459.png#crop=0&crop=0&crop=1&crop=1&id=GLi6Z&originHeight=874&originWidth=1898&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
不过可能会提示你要选择一个
随便来一个就是(前提是你有对应的账号,否则老老实实选择 GitHub
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171107509.png#crop=0&crop=0&crop=1&crop=1&id=uKJnF&originHeight=429&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
进入下一步后会让你填写创建的 Git 仓库名称
点击你的用户名可以显示出你账号绑定的 GitHub 账号
这样就可以自定义创建的账号

下方 👇 的 Create private Git Repository 如果勾选上创建的时候就会创建一个私有仓库
然后再次点击 Continue 进行下一步
然后就会出现这个页面
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171107245.png#crop=0&crop=0&crop=1&crop=1&id=ARA2n&originHeight=863&originWidth=1895&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
不管他,下滑
找到 `Environment Variables` 配置环境变量
默认需要的环境变量如下:

- LEAN_ID
- LEAN_KEY
- LEAN_MASTER_KEY

它们的值分别对应上一步在 `LeanCloud` 中获得的 `APPID` `APPKEY` `MasterKey`
获取方法:
进入 LeanCloud
这边用国际版演示
进入选择 [Console](https://console.leancloud.app/)
如果没有创建一个应用
**注意 ⚠: 如果您之前用了 Valine 评论系统 就不用创建了,因为 Waline 评论数据与 Valine 评论数据可以共用**
进入应用设置后选择 设置 -> 应用 Keys
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171107450.png#crop=0&crop=0&crop=1&crop=1&id=N57mx&originHeight=512&originWidth=915&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
复制并保存 Credentials 的所有配置
然后把获取到的变量依次填入环境变量中
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171108331.png#crop=0&crop=0&crop=1&crop=1&id=JpTSM&originHeight=376&originWidth=948&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
设置都完成后就可以点击 `Deploy` 了
在这里稍等一会儿就可以部署完成
部署完成后在接下来的页面点击 Visit
就可以打开部署好的示例网页
然后你需要注册一个账号
在 `Vercel` 分配的域名后面加上/ui/register
第一个注册的会成为管理员哦~
如果你想要自定义管理员头衔
可以在客户端脚本中用`langMode.admin`配置哦
例如:

```javascript
function waline() {
  const Waline = require("@waline/client");
  new Waline({
    el: "#waline-comment",
    serverURL: %WALINEURL%,
    path: window.location.pathname,
    visitor: true,
    lang: location.pathname.startsWith("/en/") ? "en" : "zh-CN",
    langMode: {
      admin: location.pathname.startsWith("/en/") ? "Admin" : "Hajeekn",
    },
  });
}
```

按这样来说,你还可以配置访客的角标(头衔)
具体去看看[Waline 文档](https://waline.js.org/)或者[@CCKNBC](https://blog.ccknbc.cc/)
当然如果你和我一样用的是 Butterfly
那么可以找到 Waline 配置项
在`option`配置项加入配置即可

    langMode:
     admin: Hajeekn
示例:

```yaml
option:
  pageSize: 10
  ·····
  langMode:
    admin: Hajeekn
```

当然 Waline 现在也可以更改邮件模板
只需要在环境变量内写入就行
但是环境变量限制大小,推荐按照[issues/106](https://github.com/lizheming/waline/issues/106)配置
当然如果你的评论不是很多，并且之前配置过 Valine-Admin，那么你仍然可以使用 `LeanCloud` 异步发送通知

## 表情包配置(Butterfly)

这部分和 Valine 没多大差别,格式也可以直接复制粘贴 Valine 的
只需要把名字改为 waline.json
具体可以查看[主题文档](https://butterfly.js.org/posts/ceeb73f/#%E8%A9%95%E8%AB%96)

# CloudBase 云开发部署

可以去看看[@CCKNBC](https://blog.ccknbc.cc/posts/waline-commens-system-deployment-logs/#CloudBase-%E4%BA%91%E5%BC%80%E5%8F%91%E9%83%A8%E7%BD%B2)(CC)大佬写的

# 升级

## Vercel

所需要的工具

- [Renovate](https://github.com/marketplace/renovate)
- [Mergify](https://github.com/marketplace/mergify)

!在这之前仓库必须公开!
安装完成后就可以删除 `Waline` 仓库，再 fork [CC 的仓库](https://github.com/ccknbc-actions/waline)，之后绑定到 fork 的仓库并重新部署即可

但是如果你没用 腾讯云开发 就把 `.github/workflows/Update Waline TCB.yml`   里的文件删掉，因为涉及到自动部署更新云开发，还有环境变量，如果没设定会导致报错

## Tencent Cloudbase

和上面一样
Fork [CC 的仓库](https://github.com/ccknbc-actions/waline) 然后新建几个变量
进入你的仓库/settings/secrets/actions

| 变量名                                         | 变量解释                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| SECRETID                                       | API 访问密钥 ID，可[点击这里](https://console.cloud.tencent.com/cam/capi)  |
| 新建/查看                                      |
| SECRETKEY                                      | API 访问密钥 KEY，可[点击这里](https://console.cloud.tencent.com/cam/capi) |
| 新建/查看                                      |
| TCBFUNNAME（没什么好加密的，就叫 waline 算了） | 你想要新建/已有函数的名称，比如 `Waline`                                   |
| TCBENVID                                       | 环境 ID，可[点击这里](https://console.cloud.tencent.com/tcb/env/overview)  |

或[这里](https://console.cloud.tencent.com/tcb/env/index)
查看，地址栏后也会显示，反正就是很多地方都在上面点一下就能看到 |

---

AD!

我的博客即将同步至腾讯云+社区，邀请大家一同入驻：[https://cloud.tencent.com/developer/support-plan?invite_code=3gll8aqhc2kgg](https://cloud.tencent.com/developer/support-plan?invite_code=3gll8aqhc2kgg)

