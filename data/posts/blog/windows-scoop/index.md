---
title: Windows 使用 Scoop 管理软件
sticky: 1
tags: [windows]
description: Windows 下的软件管理器
categories: [windows]
cover: https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171122924.png
photos: https://rmt.ladydaily.com/fetch/hajeekn/storage/202204171122924.png
abbrlink: kmlrip
date: 2021-08-22 14:08:23
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

本篇文章参考 [Dejavu](https://www.dejavu.moe/posts/windows-scoop/) 的文章和 [Scoop](https://scoop-docs.vercel.app/) 官方文档
Windows 和 MacOS Linux 不一样
Windows 安装软件的途径一般是搜索引擎/软件管家

而 MacOS Linux 有自己的包管理器
MacOS 是 Homebrew
Linux 是 apt
Windows 下其实也有包管理器,比较流行的是

- [Scoop](https://scoop.sh/)
- [Chocolatey](https://chocolatey.org/)
- [Winget-cli](https://github.com/microsoft/winget-cli)

Scoop 和 Chocolatey 都是比较出名的第三方包管理器了,Winget 是微软整的一个新活
但是严格来说，Scoop 并不算是 "包管理器"，Scoop 官方解释为 "Scoop 是 Windows 的命令行安装程序"，但是它基本实现了一个包管理器的功能

# 系统要求

- Windows 7 SP1+ / Windows Server 2008+
- [PowerShell 5](https://aka.ms/wmf5download) / [PowerShell Core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6) 和 [.NET Framework 4.5](https://www.microsoft.com/net/download) (或更高版本)

# 配置 Scoop 目录

Scoop 默认的安装本体和软件目录为:`C:\Users\%username%\scoop\`
Scoop 默认安装全局软件的目录为: `C:\ProgramData\scoop\`
在我们安装 Scoop 前,我们应该使用环境变量配置安装目录
配置本体和软件目录:

```bash
$env:SCOOP='<盘符>:\Scoop'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
```

配置全局软件目录:

```bash
$env:SCOOP_GLOBAL='<盘符>:\Scoop\Global'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

配置完成后就可以开始安装 Scoop 了

# 安装 Scoop

打开你的 Windows Terminal / Powershell 5
输入安装指令:

```bash
iwr -useb get.scoop.sh | iex
```

安装时鉴于国内防火长城,推荐打开全局代理
当提示 successfully 的时候就安装完成了

# 安装 Git

Git 是 Scoop 必须的组件,现在你可以通过一个简单指令安装

```bash
scoop install git openssh
```

# 安装 Aria2

接着我们需要安装 Aria2 让 Scoop 以多线程下载
你也可以通过一个简单的指令下载

```bash
scoop install aria2
```

安装完成后需要配置一下 Aria2 的参数

```bash
# 启用 Aria2
scoop config aria2-enabled true
# 设置单任务最大线程为 16
scoop config aria2-split 16
# 设置单服务器最大线程为 16
scoop config aria2-max-connection-per-server 16
# 设置文件最小切片大小为 1M
scoop config aria2-min-split-size 1M
```

# 安装 Sudo

如果你使用 Scoop 全局安装软件(如 Node.js)你便需要管理员权限
安装 Sudo 可以简化提取权限步骤
同样,你也可以通过一个简单指令安装 Sudo

```bash
scoop install sudo
```

# 常用 Scoop Bucket

| [Main](https://github.com/lukesampson/scoop)                                            | Windows 的命令行安装程序                                                                                                            |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [extras](https://github.com/lukesampson/scoop-extras)                                   | 包含不太符合主存储桶标准的应用                                                                                                      |
| [main](https://github.com/ScoopInstaller/Main)                                          | 下一代的 Scoop 默认 Bucket                                                                                                          |
| [chawyehsu/dorado](https://github.com/chawyehsu/dorado)                                 | 🐟 又是一个可爱的 Scoop 的 Bucket                                                                                                   |
| [Ash258/Scoop-Ash258](https://github.com/Ash258/Scoop-Ash258)                           | 个人 Bucket，包含各种应用                                                                                                           |
| [nerd-fonts](https://github.com/matthewjberger/scoop-nerd-fonts)                        | 一个用于安装 Nerd Fonts 字体的 Bucket                                                                                               |
| [java](https://github.com/ScoopInstaller/Java)                                          | 用于 Oracle Java, OpenJDK, Zulu, ojdkbuild, AdoptOpenJDK, Amazon Corretto, BellSoft Liberica, SapMachine 和 Microsoft JDK 的 Bucket |
| [borger/scoop-galaxy-integrations](https://github.com/borger/scoop-galaxy-integrations) | 提供安装、附加和更新 GOG Galaxy 2 号集成的简单方法                                                                                  |
| [TheRandomLabs/Scoop-Spotify](https://github.com/TheRandomLabs/Scoop-Spotify)           | 一个用于 Spotify、Spicetify 和相关软件包的 Bucket                                                                                   |
| [nonportable](https://github.com/TheRandomLabs/scoop-nonportable)                       | 一个用于非可移植应用程序的 Bucket                                                                                                   |
| [games](https://github.com/Calinou/scoop-games)                                         | 开源/免费游戏和游戏相关工具的 Bucket                                                                                                |
| [TheCjw/scoop-retools](https://github.com/TheCjw/scoop-retools)                         | 逆向工程工具的 Bucket                                                                                                               |
| [jetbrains](https://github.com/Ash258/Scoop-JetBrains)                                  | 包含 Jetbrians IDE 的 Bucket                                                                                                        |
| [integzz/scoopet](https://github.com/integzz/scoopet)                                   | 包含学术研究应用的 Bucket                                                                                                           |
| [Versions](https://github.com/ScoopInstaller/Versions)                                  | 包含一些知名软件包的旧版本的 Bucket                                                                                                 |
| [Ash258/GenericBucket](https://github.com/Ash258/GenericBucket)                         | 通用的 Bucket 模板                                                                                                                  |
| [kidonng/sushi](https://github.com/kidonng/sushi)                                       | 一个美味的、包容的 Bucket                                                                                                           |
| [rasa/scoops](https://github.com/rasa/scoops)                                           | 一个美味的的 Bucket                                                                                                                 |
| [littleli/scoop-clojure](https://github.com/littleli/scoop-clojure)                     | 安装 Clojure 的 Bucket                                                                                                              |
| [MCOfficer/scoop-nirsoft](https://github.com/MCOfficer/scoop-nirsoft)                   | 个人收藏的 nirsoft.net-bucket，总共包含了 250 多个程序                                                                              |
| [kkzzhizhou/coop-apps](https://github.com/kkzzhizhou/scoop-apps)                        | 合并多个 Scoop 仓库，使用 Github Action 自动更新                                                                                    |
| [KNOXDEV/wsl](https://github.com/KNOXDEV/wsl)                                           | 一个用于 WSL 的 Bucket，不需要 Windows UWP 应用商店                                                                                 |
| [Ash258/Scoop-Sysinternals](https://github.com/Ash258/Scoop-Sysinternals)               | 所有分开的 Sysinternals 工具的 Bucket                                                                                               |
| [TheRandomLabs/Scoop-Bucket](https://github.com/TheRandomLabs/Scoop-Bucket)             | 个人收藏的 Bucket                                                                                                                   |
| [cderv/r-bucket](https://github.com/cderv/r-bucket)                                     | R 语言用户和软件工程师使用的个人 Bucket                                                                                             |
| [kkzzhizhou/scoop-zapps](https://github.com/kkzzhizhou/scoop-zapps)                     | 自用 Scoop 仓库，使用 Github Actions 自动更新                                                                                       |
| [tetradice/scoop-iyokan-jp](https://github.com/tetradice/scoop-iyokan-jp)               | 日本語環境に最適化された scoop bucket                                                                                               |
| [rkbk60/scoop-for-jp](https://github.com/rkbk60/scoop-for-jp)                           | 适合小日子过得不错的日本人的 Bucket                                                                                                 |
| [ZvonimirSun/scoop-iszy](https://github.com/ZvonimirSun/scoop-iszy)                     | ZvonimirSun 个人收藏的 Bucket                                                                                                       |
| [php](https://github.com/ScoopInstaller/PHP)                                            | PHP 的 Bucket                                                                                                                       |

你可以通过以下指令添加 Bucket

```bash
scoop bucket add <name> <repo>
```
