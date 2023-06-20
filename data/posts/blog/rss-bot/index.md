---
title: 部署你的RSS机器人
sticky: 1
tags: [VPS]
description: 快来部署一个支持TG内预览RSS的机器人吧
categories:
cover: https://cdn.nlark.com/yuque/0/2021/png/12488964/1613640390290-2b2d5a32-b5f8-4d49-83d5-be3617937724.png
photos: https://cdn.nlark.com/yuque/0/2021/png/12488964/1613640390290-2b2d5a32-b5f8-4d49-83d5-be3617937724.png
abbrlink: yllqclb9
date: 2021-02-18 17:03:01
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 31
---

本文章首发于[语雀](https://www.yuque.com/ladjeek/ygg4q6)!
通过各种高科技功能同步到[Hajeekn 的博客](https://blog.slqwq.cn)
[flowerss bot](https://github.com/indes/flowerss-bot)
挺好用的,今天给大家安利一下搭建方法( 白 嫖 )
首先呢，各位要注意下，flowerss bot 需要依赖一个 VPS，我知道你没钱买<s>其实我也是辣</s>，所以这篇教程用 Euserv 示范
白嫖 Euserv 鸡子的教程挺多的，各位可以自行 Bing 一下这边就不讲了。

# 开始

首先连接上 Euserv(我用的是嘿哟终端)
接着用

```bash
$ mkdir flbot
$ cd flbot
```

然后根据你的系统版本安装对应的版本
我是 64 就用

```bash
$ curl -LJO https://github.com/indes/flowerss-bot/releases/download/v0.8.3/flowerss-bot-v0.8.3-linux-amd64.tar.gz
```

如果你的 32 就用

```bash
$ curl -LJO https://github.com/indes/flowerss-bot/releases/download/v0.8.3/flowerss-bot-v0.8.3-linux-386.tar.gz
```

然后用 tar 命令解压包

```bash
$ tar zxvf  flowerss-bot-v0.8.3-linux-amd64.tar.gz
```

如果是 32 位请用

```bash
$ tar zxvf  flowerss-bot-v0.8.3-linux-amd386.tar.gz
```

再用 rm 命令删除包

```bash
$ rm flowerss-bot-v0.8.3-linux-amd64.tar.gz
```

如果是 32 位请用

```bash
$ rm flowerss-bot-v0.8.3-linux-amd386.tar.gz
```

然后执行 `ls` 查看文件
如果正确的话,目录结构应该如下

```
flbot                          # 文件所在的目录
|         |——README.md         # 项目的README
|         |——config.yml.sample # 配置文件示例
|         |——flowerss-bot      # 程序的文件
```

然后你需要用 mv 指令去重命名 `config.yml.sample`

```bash
$ mv config.yml.sample config.yml
```

然后你就可以用 vim 编辑配置文件了

```bash
$ vim config.yml
```

配置项如下:

```yaml
# 这是配置文件示例
bot_token: XXX
#多个telegraph_token可采用数组格式：
# telegraph_token:
#  - token_1
#  - token_2
telegraph_token: xxxx
user_agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
preview_text: 0
disable_web_page_preview: false
socks5: 127.0.0.1:1080
update_interval: 10
error_threshold: 100
telegram:
  endpoint: https://xxx.com/
mysql:
  host: 127.0.0.1
  port: 3306
  user: mysql_username
  password: mysql_password
  database: flowerss
sqlite:
  path: ./data.db
allowed_users:
  - 123
  - 234
```

注意 ⚠: 如果您想要关闭终端后保持机器人的运行,请一定注意按以下步骤来
安装 screen

```bash
$ apt-get update
$ apt-get install screen
```

在终端执行

```bash
$ screen
```

创建一个 `screen` 窗口
然后在里面启动就可以了

# 配置项说明

bot_token(Telegram Bot Token)(必填)
telegraph_token(Telegraph Token 用于转存原文到 Telegraph)(可忽略)
preview_text(纯文字预览字数)(可忽略)
user_agent(User Agent)(可忽略)
disable_web_page_preview(是否禁用 web 页面预览)(可忽略)
update_interval(RSS 源扫描间隔/分钟)(可忽略)
error_threshold(源最大出错次数)(可忽略）
socks5(用于无法正常 Telegram API 的环境)(可忽略)
mysql(MySQL 数据库配置)(可忽略)
sqlite(SQLite 配置)(可忽略(已配置 mysql 时，该项失效))
telegram.endpoint(自定义 telegram bot api url)(可忽略)
allowed_users(允许使用 bot 的用户 telegram id)(可忽略(为空时所有用户都能使用 bot))

| 项                       | 说明                                                  | 状态 |
| ------------------------ | ----------------------------------------------------- | ---- |
| bot_token                | Telegram 机器人令牌                                   | 必须 |
| telegraph_token          | 转存原文到 Telegraph                                  | 可选 |
| preview_text             | 纯文字预览字数                                        | 可选 |
| user_agent               | 用户代理                                              | 可选 |
| disable_web_page_preview | 禁用 Web 页面预览                                     | 可选 |
| update_interval          | RSS 源扫描间隔(单位: 分钟)                            | 可选 |
| error_threshold          | RSS 源最大出错次数                                    | 可选 |
| socks5                   | 代理(适用于无法访问 Telegram 的机器)                  | 可选 |
| mysql                    | 数据库配置(二选一)                                    | 可选 |
| sqlite                   | 数据库配置(二选一)                                    | 失效 |
| telegram.endpoint        | 自定义 Telegram API 地址(用于反代 API 给国内机器使用) | 可选 |
| allowed_users            | 允许的用户,不填写代表所有用户均可以使用               | 可选 |



# 申请 Telegram Bot Token

以下截图和内容来自[Spoience 的博客](https://www.dejavu.moe/)
打开 Telegram 搜索 @BotFather

![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171105160.png#crop=0&crop=0&crop=1&crop=1&id=rJkSB&originHeight=203&originWidth=351&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

点击 Start，发送 /newbot
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171105356.png#crop=0&crop=0&crop=1&crop=1&id=e7ELr&originHeight=711&originWidth=637&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

然后给你的 Telegram Bot 取一个昵称和名字，框中马赛克部分就是创建的 Telegram Bot Token，请妥善保管该 Token：
![](https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171105882.png#crop=0&crop=0&crop=1&crop=1&id=lsW1L&originHeight=763&originWidth=643&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

# 申请 Telegraph Token

| Telegram 应用内预览需要 Telegraph Api，所以我们还需要申请个 Telegraph Token
在终端中执行下面命令，会返回一段 json 格式的文本，其中的 access_token 字段值即为 Telegraph Token，请妥善保存

```yaml
curl https://api.telegra.ph/createAccount?short_name=DaiRSS_Bot&author_name=Spoience&author_url=https://spoience.com
```

其中的 short_name author_name author_url 请替换成自己的

# 查看 Telegram ID

| 默认的配置是允许所有用户使用我们刚刚创建的 Telegram RSS Bot，但为了安全、防止被滥用我们可以设置指定 ID 的 Telegram 用户能够使用该 Bot，获取允许使用用户（比如自己）的 Telegram ID 并填入配置文件的 allowed_users 字段
获取 Telegram ID：[https://t.me/getmyid_bot?start=botostore](https://t.me/getmyid_bot?start=botostore)

# 使用

将 Bot 添加到您的频道中，并设置为管理员，Bot 的管理命令如下：

```shell
/sub @ChannelID [url] 订阅
/unsub @ChannelID [url] 取消订阅
/list @ChannelID 查看当前订阅
/check @ChannelID 检查当前订阅
/unsuball @ChannelID 取消所有订阅
/activeall @ChannelID 开启所有订阅
/setfeedtag @ChannelID [sub id] [tag1] [tag2]  设置订阅标签（最多设置三个Tag，以空格分隔）
/import 导入 OPML 文件
/export @ChannelID 导出 OPML 文件
/pauseall @ChannelID 暂停所有订阅
```

然后这样一个机器人就配置好啦，你可以把它拉入你的频道,然后自己配置下 RSS
配置完成后你就可以看到更新文章时你的频道会有提示
