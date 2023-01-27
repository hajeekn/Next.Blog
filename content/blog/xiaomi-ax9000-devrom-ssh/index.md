---
title: 小米路由器 AX9000 开发版固件获取 SSH / 安装 MIXBOX & ENTWARE
sticky: 1
date: 2023-01-17 15:50:35
tags: [ax9000,docker]
description: AX9000 “做好事”指南
categories: [ax9000,docker]
---

既然 `AX9000` 有了 `Docker`

那我们打开 `SSH` 的方式就很多了

# Portainer 部署 BusyBox

这边我们通过 `BusyBox` 打开 `SSH` 权限

首先进入 `Portainer` 后台

创建一个容器

镜像使用 `busybox `

在 `Advanced container settings` 中开启 `tty`

![image-20230117163148194](https://i0.hdslb.com/bfs/album/81edeabda4659295baa48acda92b2c56a24a6715.png)

然后挂载路由器的根目录

![image-20230117163235982](https://i0.hdslb.com/bfs/album/35d1352d3f0a5f73e4949117c2282420c729d07a.png)

然后部署容器

# Attch 修改配置

之后回到容器列表,选择刚创建的容器

使用 `attch` 进入容器

![image-20230117163335547](https://i0.hdslb.com/bfs/album/737ea4d0b17873f32afc627b68640b758e699d93.png)

`chroot`到主机根目录并且修改 `dropbear`

```bash
chroot /mnt
vi /etc/init.d/dropbear
```

找到如下内容

```sh
start_service()
{
        flg_ssh=`nvram get ssh_en`
        channel=`/sbin/uci get /usr/share/xiaoqiang/xiaoqiang_version.version.CHANNEL`
        if [ "$flg_ssh" != "1" -o "$channel" = "release" ]; then
               return 0
        fi
···
}
```

将它注释掉

```sh
start_service()
{
        #flg_ssh=`nvram get ssh_en`
        #channel=`/sbin/uci get /usr/share/xiaoqiang/xiaoqiang_version.version.CHANNEL`
        #if [ "$flg_ssh" != "1" -o "$channel" = "release" ]; then
               #return 0
        #fi
···
}
```

然后启动一下 `dropbear`

```bash
/etc/init.d/dropbear start
```

修改 `root` 密码(或者添加 `RSA`的`authorized_keys`)

```bash
passwd root
```

```bash
vi /etc/dropbear/authorized_keys
```

# 固化 SSH(有变砖风险,可以跳过)

使用 [mitool][]

先查看 `bdata` 分区

```bash
cat /proc/mtd
```

然后备份 `bdata`

```bash
nanddump -f /mnt/docker_disk/bdata.img /dev/mtd18
```

固化 `SSH`

```bash
/tmp/mitool.sh unlock
```

`SSH` 权限就开启了

# 安装 MIXBOX

```bash
export MB_URL=https://gcore.jsdelivr.net/gh/monlor/mbfiles && sh -c "$(curl -kfsSl ${MB_URL}/install.sh)" && source /etc/profile &> /dev/null
```

一串命令就行

之后在命令行使用`mixbox`

就能使用了

手动更新

```bash
sh -c "$(curl -kfsSl https://gcore.jsdelivr.net/gh/monlor/mbfiles/update.sh)" && source /etc/profile &> /dev/null
```

手动卸载

```bash
sh -c "$(curl -kfsSl https://gcore.jsdelivr.net/gh/monlor/MIXBOX/apps/mixbox/scripts/uninstall.sh)" && source /etc/profile &> /dev/null
```

# 安装 Entware

首先备份

```bash
mv /bin/opkg /bin/opkg.bak
mv /opt /data/opt_bak
```

```bash
mkdir /data/opt
ln -s /data/opt /
curl http://bin.entware.net/aarch64-k3.10/installer/alternative.sh | sh
echo 'export PATH=$PATH:/opt/bin:/opt/sbin' >> /etc/profile
source /etc/profile
/opt/etc/init.d/rc.unslung start
```

如果你想要安装在外置存储(USB)

```bash
mkdir /mnt/docker_disk/entware
ln -s /mnt/docker_disk/entware /
curl http://bin.entware.net/aarch64-k3.10/installer/alternative.sh | sh
echo 'export PATH=$PATH:/opt/bin:/opt/sbin' >> /etc/profile
source /etc/profile
/opt/etc/init.d/rc.unslung start
```

如果已经安装完了要更改路径

```bash
mv /data/opt 新路径
rm -f /data/opt
ln -s 新路径 /opt
```

# 参考内容

[小米路由器 AX9000 开发版固件直接获取 SSH - 南浦月 (nanpuyue.com)](https://blog.nanpuyue.com/2022/056.html)

---

[AX9000官方固件一些ssh配置分享(静态路由，巨型帧，彻底关闭无线，Godaddy DDNS等)-小米无线路由器以及小米无线相关的设备-恩山无线论坛 (right.com.cn)](https://www.right.com.cn/FORUM/thread-7673021-1-1.html)

---

[monlor/MIXBOX-ARCHIVE: 一款基于Shell的小米路由器工具箱，原为Monlor-Tools，A tool box for XiaoMi Router base on Shell. (github.com)](https://github.com/monlor/MIXBOX-ARCHIVE)

[mitool]: https://github.com/paldier/ax3600_tool/releases	"mitool releases"
