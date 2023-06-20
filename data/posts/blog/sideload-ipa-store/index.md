---
title: 侧载 IPA 的另外方案 - SideStore
sticky: 1
date: 2023-01-23 12:08:00
tags: [ios,ipa]
description: 在高版本 iOS 上安装第三方应用程序的解决方案
categories: [ios,ipa]
---

在 iOS 上侧载 IPA 文件,是一个令人头疼的问题

TrollStore 但是 iOS 16 不支持

我们可以使用  Sideloadly 但是续签需要电脑

我们也可以使用 AltStore 但是续签也需要电脑

我们还可以使用爱思助手但是续签同样需要电脑

有什么方法可以在手机上续签?

SideStore!

# 下载 SideStore IPA

进入 [SideStore][] 官网

[SideStore]: https://sidestore.io/	"SideStore"

开始下载 

![image-20230123121457969](https://i0.hdslb.com/bfs/album/12a5bde0867a366acfb32709e59607d25fe716b1.png)

此处有两个选项

第一个选项会下载稳定版 SideStore

第二个选项会下载每夜(测试)版 SideStore

下载好后放在一个文件夹里面

# 下载 SideStore Downloader

加入 [JitStreamer][]

[JitStreamer]: https://discord.gg/CacsuuzsBq	"JitStreamer"

![image-20230123121916946](https://i0.hdslb.com/bfs/album/f9d960d1e57c288991e62f4ba35e6a43efd38f76.png)

在 downloads 频道中下载

下载完后打开

# 预处理 SideStore IPA

![image-20230123122010052](https://i0.hdslb.com/bfs/album/f44d40ef7004583103d03561b2be6dece9dcd8b2.png)

此处选择本地文件

![image-20230123122027968](https://i0.hdslb.com/bfs/album/769cb23984dad79af1163fd5d1ab1f7cba3c1428.png)

这里直接粘贴 IPA 文件

然后一直默认就行

在配对设备的步骤中将你的 iPhone 插入电脑并信任

然后输入你的设备 IP 地址就行

稍等片刻,你就会拥有一个以 SideStore-设备名称命名的 IPA 文件

![image-20230123122339744](https://i0.hdslb.com/bfs/album/2ea5274abbb914a3dee6a765a03061f922cf3405.png)

# 下载 AltStore 并安装 SideStore

SideStore 需要使用 AltStore 安装

[AltStore][]

[AltStore]: https://altstore.io/	"AltStore"

链接贴在这里,直接下载安装即可

然后是 Windows 11 的解决办法

(来自 JitStreamer)

> **Windows 11 - AltServer Workaround** 
>
> *Step 1* - Download the vivetool from here !👉🏻 https://github.com/thebookisclosed/ViVe/releases 
>
> *Step 2* - Create a folder name vivetool without any spaces in the name,  in C Drive. *Step 3* - Now Extract all the files from the zip to That vivetool folder you had created in Step 2. 
>
> *Step 4* - Open Up the CMD (Run as Administrator). 
>
> *Step 5* - Copy Paste & Run this Command in CMD !👉🏻 c:\vivetool\vivetool.exe  /disable /id:26008830 
>
> *Step 6* - After Running the Command it will Show you a Message saying 👉🏻Successfully Set Feature Configuration ) which means the command is successfully implemented.  
>
> *Step 7* - Now the only thing you need to do afterwards is that restart your PC. *Step 8* - After Restarting your PC, Launch the AltServer as Administrator, Guess what, !!!Boom!!!!🎆) u can see the AltServer Icon in your taskbar tray bar. Instructions courtesy of RyzenGaming#5928 - thank you! ![:Praise:](https://i0.hdslb.com/bfs/album/cfffefab2ad18aea4d36350ac972f5fd71739776.webp)

安装之后查看任务栏,按住 Shift 的同时点击 AltStore

选择 Sideload .ipa

> Windows 用户请安装非 Microsoft Store 的 iTunes 和非 Microsoft Store 的 iCloud

# 配置 WireGuard

注册一个非国区 Apple ID

并获取 WireGuard

然后去 [SideStore][] 获取 WireGaurd 配置

[SideStore]: https://sidestore.io/

下载完成之后导入 WireGuard 并启用即可

然后你的 SideStore 就可以正常使用了

如果有需要你可以自定义 Anisette 服务器

# 搭建 Anisette 服务器(非必须)

详情请看文档

[Custom Anisette Server | SideStore Docs][]

[Custom Anisette Server | SideStore Docs]: https://wiki.sidestore.io/guides/custom-anisette.html
