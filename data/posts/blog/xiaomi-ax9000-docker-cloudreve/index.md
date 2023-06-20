---
title: AX9000 Docker - Cloudreve 搭建并打洞
sticky: 1
tags:
  - docker
description: AX9000 的充分利用之 Cloudreve
categories:
  - docker
abbrlink: 4e18cfcd
date: 2022-12-10 12:31:55
---

接上次,我们在 `AX9000` 中安装了 `Docker`,我们可以用它搭建一个网盘,并且打洞映射到外网(`Cloudflare Argo Tunnel`)

> 打洞使用 `Cloudflare Argo Tunnel` / 和 `Cloudflare 零信任`使用同一个程序

# Cloudreve 的配置

进入 [快速开始 - Cloudreve](https://docs.cloudreve.org/getting-started/install)

找到  `Docker Compose`  安装方式

> 为什么不使用传统安装方式?
>
> AX9000 虽然开启了 Docker,但是不提供 SSH
>
> 所以我们无法通过命令行的方式安装  `Cloudreve`

复制  `Compose`  文件

```yaml
version: "3.8"
services:
  cloudreve:
    container_name: cloudreve
    image: cloudreve/cloudreve:latest
    restart: unless-stopped
    ports:
      - "5212:5212"
    volumes:
      - temp_data:/data
      - ./cloudreve/uploads:/cloudreve/uploads
      - ./cloudreve/conf.ini:/cloudreve/conf.ini
      - ./cloudreve/cloudreve.db:/cloudreve/cloudreve.db
      - ./cloudreve/avatar:/cloudreve/avatar
    depends_on:
      - aria2
  aria2:
    container_name: aria2
    image: p3terx/aria2-pro
    restart: unless-stopped
    environment:
      - RPC_SECRET=your_aria_rpc_token
      - RPC_PORT=6800
    volumes:
      - ./aria2/config:/config
      - temp_data:/data
volumes:
  temp_data:
    driver: local
    driver_opts:
      type: none
      device: $PWD/data
      o: bind
```



在桌面新建一个  `yml` 文件并用  `VSCode`  打开

![image-20221210124732395](https://i0.hdslb.com/bfs/album/75bffbeadb3fc7c0ef228d89f630750b9e106191.png)

看到 `Cloudreve` 的文件映射,我们要将 `./cloudreve` 前面全部加上 `/mnt/docker_disk/mi_docker/`

```yaml
version: "3.8"
services:
  cloudreve:
    container_name: cloudreve
    image: cloudreve/cloudreve:latest
    restart: unless-stopped
    ports:
      - "5212:5212"
    volumes:
      - temp_data:/data
      - /mnt/docker_disk/mi_docker/cloudreve/uploads:/cloudreve/uploads
      - /mnt/docker_disk/mi_docker/cloudreve/conf.ini:/cloudreve/conf.ini
      - /mnt/docker_disk/mi_docker/cloudreve/cloudreve.db:/cloudreve/cloudreve.db
      - /mnt/docker_disk/mi_docker/cloudreve/avatar:/cloudreve/avatar
    depends_on:
      - aria2
  aria2:
    container_name: aria2
    image: p3terx/aria2-pro
    restart: unless-stopped
    environment:
      - RPC_SECRET=your_aria_rpc_token
      - RPC_PORT=6800
    volumes:
      - /mnt/docker_disk/mi_docker/aria2/config:/config
      - temp_data:/data
volumes:
  temp_data:
    driver: local
    driver_opts:
      type: none
      device: $PWD/data
      o: bind
```

然后在 `Windows 资源管理器` 中进入路由器的 SMB

> 请对你的设备在米家中开启全盘访问

![image-20221210125139723](https://i0.hdslb.com/bfs/album/1f59f63d25ca1607ed365680425e47b0a61502c2.png)

新建一个 `cloudreve` 文件夹

在其中新建 `aria2 | avatar | uploads` 三个文件夹

并创建 `cloudreve.db | conf.ini ` 两个空文件

然后返回到 `mi_docker` 文件夹

新建 `aria2` 文件夹

并在其中新建 `config` 文件夹

这样就完成了文件映射~

# 部署 Cloudreve

进入 `Portainer` 中的 `Stacks`

![image-20221210125505668](https://i0.hdslb.com/bfs/album/7df78fc2229f73517fa8cba084050025fce60df5.png)

新建一个 Stacks

![image-20221210125533188](https://i0.hdslb.com/bfs/album/47650ce1a733e1046fa082adb4d0654ee0b72d7f.png)

将本地修改好的 `yml` 直接粘贴到输入框中

然后点击 Deploy the stack

![image-20221210125711406](https://i0.hdslb.com/bfs/album/7d083654907d5abea575065a3cef282ff044b508.png)

稍等片刻,你就能在 Stacks 中看见你部署的容器了

容器后面的 `IP Address` 就是你的容器内网地址

![image-20221210125834528](https://i0.hdslb.com/bfs/album/3ef831f95d609dda765976e0d2d28a1c1cfe5f9e.png)

`aria2` 没有映射端口,我们只要复制 `cloudreve` 的地址加上 `5212` 端口就行

接下来我们去 `cloudreve` 的日志中获取管理员密码

![image-20221210130214629](https://i0.hdslb.com/bfs/album/63891f9eb60dd72a4494f8b6eb49b93f946912e8.png)

![image-20221210130038220](https://i0.hdslb.com/bfs/album/76453eb4028d5b8660ff1f7e3b672bd9c972d8bf.png)

(这里是我配置好的网盘)

# 打洞映射

> 此处我们需要创建一个 `Ubuntu` 容器用来映射

进入 `App Templates` 界面

![image-20221210130407269](https://i0.hdslb.com/bfs/album/354c2055ceba3b09adc0d89087989636c9b72dd4.png)

找到 `Ubuntu` 并部署

部署完成之后进入容器详情

找到 `Connected networks`

![image-20221210130500276](https://i0.hdslb.com/bfs/album/60053a29a01a1757da849e00994c9eb36a1e112b.png)

在这里加入 `Cloudreve Stack` 的网络

然后找到 `Console`

![image-20221210130540644](https://i0.hdslb.com/bfs/album/7d1678a72ab02896b77b736b015cca2b2c03e108.png)

连接到容器

## 配置 Cloudflared

> 此处假设你拥有 Cloudflare 账号,并添加好了域名

首先换源

因为这个系统太迷你了

先升级 `ca-certificates`

```shell
$ apt-get update
$ apt-get install ca-certificates
```

然后安装必要工具

```shell
$ apt-get install vim
$ apt-get install systemctl
```

### 网络差用户

对于网络环境差的用户,请先用 `sed` 替换源,在进行操作

现在我们下载 `Cloudflared`

```shell
$ wget https://github.com/cloudflare/cloudflared/releases/download/2022.11.1/cloudflared-linux-arm64.deb cloudflared.deb
```

网络不好可以上传到你刚才搭建的 `Cloudreve` 中,然后 `wget` 下载下来

安装 `Cloudflared`

```shell
$ dpkg -i ./cloudflared.deb
```

然后我们需要设置隧道

```shell
$ cloudflared tunnel login
```

这时候终端里面会出现一串 URL,复制在浏览器里访问并授权就好了

创建一个隧道

```shell
$ cloudflared tunnel create <隧道名>
```

记录下隧道 ID

创建路由

```shell
$ cloudflared tunnel route dns <隧道名> <主机名>
```

然后我们需要创建配置文件

```shell
$ touch ~/.cloudflared/config.yml
```

内容大概如下

```yaml
url: http://localhost:8080
tunnel: xxxxxxx-5b0e-xxxx-8034-xxxxxxx
credentials-file: ~/.cloudflared/xxxxxxx-5b0e-xxxx-8034-xxxxxxx.json
```

`url` 替换成你要映射的 `cloudreve` 地址

`tunnel` 和 `credentials-file` 中的 `xxxxxxx-5b0e-xxxx-8034-xxxxxxx` 替换成你的隧道 ID

### 作为服务运行

不知道为什么, `screen` 在容器上面是用不了的,所以我们只能用 `systemctl` 作为服务运行

两步走起

```shell
$ cloudflared service install
$ systemctl start cloudflared
```

等 `Cloudflared` 连接到了 HKG 节点之后,你的 `Cloudreve` 就被映射出去辣~
