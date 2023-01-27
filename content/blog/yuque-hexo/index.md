---
title: 使用语雀随时编写文章
sticky: 1
tags: [云端写作, 语雀]
description: 蛤,台式机不好带?GitHub上不去?用语雀写文章鸭
categories: [云端写作, 语雀]
cover: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210220124920.png
photos: https://rmt.dogedoge.com/fetch/hajeekn/storage/20210220124920.png
abbrlink: gklcufla
date: 2021-02-20 11:41:21
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 32
---

>  本文章基于[冰卡诺老师的教程](https://zfe.space/post/554e.html)编写
> 「语雀」是一个「专业的云端知识库」，孵化自  [蚂蚁金服](https://www.antfin.com/?deer_tracert_token=cc478126-c93a-459b-a448-dd41de67f2d4) ，是  [体验科技](https://www.yuque.com/yubo/explore/tcaywl?deer_tracert_token=cc478126-c93a-459b-a448-dd41de67f2d4)  理念下的一款创新产品，已是 10 万阿里员工进行文档编写、知识沉淀的标配。
> 语雀诞生伊始，只是希望能给工程师提供一个好用的工具用来写技术文档，达成「用 Markdown 写文档」这个小目标。但在产品研发的过程中，我们发现其实身边的每个人、每个团队、每个组织都有很多知识，但一直以来缺少一个好用的工具让这些知识不只是留在每个人的大脑或电脑里，还可以被记录、分享和交流。
> 所以，带着这颗初心，我们觉得语雀不应止步于服务工程师，应该致力于为每个想表达所思所想的人提供一款顺手的工具，让知识能得以记录和传播，让人们可以在「语雀」中平等快乐地创作和交流知识，让再小的个体也可以拥有自己的知识库。

# 部署流程

在语雀上编写文章并发布 -> 通过 Webhook 触发 serverless 云函数的部署 -- serverless 云函数使用 token 等数据调用 GitHub API -> GitHub Actions 脚本运行(包括安装依赖与 Hexo / 同步语雀文章到本地 / 执行部署)

# 教前准备

- 一个语雀账号

{% btn 'https://www.yuque.com/login?platform=wechat&inviteToken=f6e959505e77f114312173f53ec62f7b2c4ff248e08ed045603ad16d2ecf62ec',Click Me,far fa-hand-point-right,outline green larger %}

- Vercel 账号
- GitHub 私钥

## GitHub 私钥的获得

{% btn 'https://github.com/settings/tokens',Click Me,far fa-hand-point-right,outline orange larger %}
进入以上地址
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794133135-53076e7e-49e3-4d92-9453-c8df7c660726.png#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=image.png&originHeight=856&originWidth=1895&size=180244&status=done&style=none&width=947.5)

选择 Generate new token
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794201009-7268b5a9-3ad0-48b1-9543-d402d1585bdf.png#align=left&display=inline&height=254&margin=%5Bobject%20Object%5D&name=image.png&originHeight=508&originWidth=1146&size=57781&status=done&style=none&width=573)
Note 随便填写
Select scopes 选择 repo / 或者宁可以全选,但是泄露了你就完蛋了(哭笑)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794290580-44aca6a7-fe80-4b5a-b691-5a7e190ec607.png#align=left&display=inline&height=41&margin=%5Bobject%20Object%5D&name=image.png&originHeight=82&originWidth=1105&size=7769&status=done&style=none&width=552.5)
生成好后复制这一串(避免有人手贱,推荐点击后面的蓝色按钮![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794321440-4e986b79-26e1-4a71-b995-ed4e0ef2fa7b.png#align=left&display=inline&height=24&margin=%5Bobject%20Object%5D&name=image.png&originHeight=48&originWidth=41&size=462&status=done&style=none&width=20.5)
然后我们可以新建个 txt 记录下来,避免老年痴呆忘记(不是)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794384285-47ab5e7d-b087-4d16-b0db-05e94348338c.png#align=left&display=inline&height=473&margin=%5Bobject%20Object%5D&name=image.png&originHeight=946&originWidth=1202&size=436597&status=done&style=none&width=601)

## 仓库新建

进入 GitHub 新建仓库
{% btn 'https://github.com/new',点我传送,far fa-hand-point-right,outline orange larger %}
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794501142-563d3399-8640-4fae-bd35-c5b155fcea5f.png#align=left&display=inline&height=338&margin=%5Bobject%20Object%5D&name=image.png&originHeight=676&originWidth=1163&size=74636&status=done&style=none&width=581.5)
创建仓库时,权限请选择 Private(否则后续会很麻烦的)

# 开始工作

## 创建知识库

登录语雀,进入[工作台](https://www.yuque.com/dashboard)
进入[个人知识库](https://www.yuque.com/dashboard/my_books)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794635798-0d420722-b9d5-43ae-aab4-63085925d0c9.png#align=left&display=inline&height=434&margin=%5Bobject%20Object%5D&name=image.png&originHeight=867&originWidth=1882&size=97209&status=done&style=none&width=941)
选择创建知识库
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794717549-8483e394-ed71-49f9-9df9-ea6f3c1cc2ca.png#align=left&display=inline&height=419&margin=%5Bobject%20Object%5D&name=image.png&originHeight=838&originWidth=1642&size=175733&status=done&style=none&width=821)
归属选择你自己,类型选择文档知识库
点击下一步
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794787185-a03d9656-feb9-4887-8af7-aff03fc038db.png#align=left&display=inline&height=371&margin=%5Bobject%20Object%5D&name=image.png&originHeight=743&originWidth=1273&size=100718&status=done&style=none&width=636.5)
名称随便填写,可见范围选择互联网可见
公开内容是否允许搜索引擎收录选择允许(其实允许不允许也没关系)
然后我们点击三个点 - 管理文档
新建 - 导入![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613794928815-d3f3928d-63ee-4e34-b718-de33f831c308.png#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=image.png&originHeight=839&originWidth=917&size=86665&status=done&style=none&width=458.5)
类型选择 Markdown
为了方便以后文档的撰写，可以新建模板。注意图片链接需要加上’’防止被渲染成链接。
盗一下冰老师的图

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608132265373-09c816b7-bbf8-4a6f-9ea0-012060269c8b.png#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=1279&size=127438&status=done&style=none&width=1279#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&originHeight=789&originWidth=1279&status=done&style=none&width=1279)
如果你使用了 abbrlink，请手动填写 abbrlink。
这里提供一套语雀模板

```markdown
---

title: 使用语雀随时编写文章
sticky: 1
tags: [云端写作,语雀]
description: 蛤,台式机不好带?GitHub上不去?用语雀写文章鸭
categories: [云端写作,语雀[
cover:
photos: 
abbrlink: gklcufla
date: 2021-02-20 11:41:21
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 32

---
```

tags 配置和 categories 配置推荐用数组格式

## 安装语雀插件进行本地调试

为了确保在云端能够正常生成博客，需要首先在本地进行调试。
打开你的终端
使用

```bash
npm i -g yuque-hexo
```

全局安装 yuque-hexo 插件

### 修改 package.json

在第一个对象代码块后增加”yuqueConfig”代码块。

```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server"
},
  "yuqueConfig": {
    "postPath": "source/_posts",
    "cachePath": "yuque.json",
    "mdNameFormat": "slug",
    "adapter": "markdown",
    "concurrency": 5,
    "baseUrl": "https://www.yuque.com/api/v2",
    "login": "bingkanuo",
    "repo": "sffipz",
    "token": "***********************",
    "onlyPublished": true,
    "onlyPublic": true
  },
```

其中的 login repo token 需要自己更改
login:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613795210885-4690758f-c8cb-4846-b5a5-7b330221299f.png#align=left&display=inline&height=23&margin=%5Bobject%20Object%5D&name=image.png&originHeight=45&originWidth=359&size=3434&status=done&style=none&width=179.5)框起来的这一段(不要/和https://www.yuque.com)
token 是在右上角头像 -> 账户设置 -> Token 添加的，权限的话只给读取就可以。复制粘贴获取的”token”字段。
再次盗图

![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608133711645-569d4bb4-3de1-450b-80b6-5cf1ca7060b0.png#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=1279&size=176577&status=done&style=none&width=1279#align=left&display=inline&height=789&margin=%5Bobject%20Object%5D&originHeight=789&originWidth=1279&status=done&style=none&width=1279)
添加完成后保存，在执行命令前，请先备份自己的\_post 文件夹，因为语雀的下载操作会覆盖原有的\_post 文件夹。
在终端中输入‘yuque-hexo sync’就会把语雀的文章给下载下来。
然后通过‘hexo g&hexo s’进行调试。
ps：输入‘yuque-hexo clean’就会清除\_post 下的所有文章。
如果存在外挂标签，请确保外挂标签格式的书写规范，否则容易报错。

## 配置 GitHub Actions

### 删除主题的.git(使用 npm 安装请忽略)

因为在仓库里面再放一个仓库是没法把里面那个仓库 push 到 github 的，只会传一个空文件夹，会导致后期博客成了空白页面，需要把 git clone 的 hexo 主题里的.git 文件夹给删掉。

## 修改 hexo 主题文件中的 meta

以 Butterfly 主题为例
进入%brt%/themes/butterfly/layout/includes/head.pug (Windows 用户请替换 / 为 \ )
在 meta(name=”theme-color” content=themeColor)后方添加 meta(name=”referrer” content=”no-referrer”)。
该步骤是确保语雀中的图片可以正常加载。

```yaml
meta(name="theme-color" content=themeColor)
meta(name="referrer" content="no-referrer")
```

## 修改 hexo 的\_config,yml

前往博客的根目录，修改 hexo 的\_config,yml 中关于 develop 的配置

```yaml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository:
    github: https://用户名:保存在txt中的密钥@github.com/用户名/仓库名.git
  branch: master

  #例子：https://ladjeek-actions:*******@github.com/slblog-github/Blog.git
```

### 创建 GitHub Actions 脚本

在博客根目录下新建.github 文件夹（点不要漏掉了），在该文件夹下新建 workflows 文件夹。
[![image.png](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608135890427-0dc37d9e-8eed-4581-8570-e806b5e4fa1a.png#align=left&display=inline&height=65&margin=%5Bobject%20Object%5D&name=image.png&originHeight=65&originWidth=349&size=4021&status=done&style=none&width=349#align=left&display=inline&height=65&margin=%5Bobject%20Object%5D&originHeight=65&originWidth=349&status=done&style=none&width=349)](https://cdn.nlark.com/yuque/0/2020/png/8391485/1608135890427-0dc37d9e-8eed-4581-8570-e806b5e4fa1a.png#align=left&display=inline&height=65&margin=%5Bobject%20Object%5D&name=image.png&originHeight=65&originWidth=349&size=4021&status=done&style=none&width=349)
在 workflows 文件夹下新建 autodeploy.yml。并填入以下代码。
将下面那个 user.name 和 user.email 修改为自己的信息，注意对齐。

```yaml
name: 自动部署

# 当有改动推送和语雀发布时，启动Action
on: [push, repository_dispatch]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检查分支
        uses: actions/checkout@v2
        with:
          ref: master

      - name: 安装 Node
        uses: actions/setup-node@v1
        with:
          node-version: "12.x"

      - name: 安装 Hexo
        run: |
          export TZ='Asia/Shanghai'
          npm install hexo-cli -g 
          #npm install gulp-cli -g 
          #如果你有使用gulp的话，打开上面这一行
          npm install yuque-hexo -g
          yuque-hexo clean
          yuque-hexo sync

      - name: 缓存 Hexo
        uses: actions/cache@v1
        id: cache
        with:
          path: node_modules
          key: ${{runner.OS}}-${{hashFiles('**/package-lock.json')}}

      - name: 安装依赖
        if: steps.cache.outputs.cache-hit != 'true'
        run: |
          npm install --save

      - name: 更新 语雀拉取缓存及文章 #更新yuque 拉取的文章到GitHub仓库
        run: |
          echo `date +"%Y-%m-%d %H:%M:%S"` begin > time.log
          git config --global user.email "499984532@qq.com"
          git config --global user.name "Zfour"
          git add .
          git commit -m "Refresh yuque json" -a

      - name: 推送 语雀拉取缓存及文章 #推送修改后的yuque json
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }

      - name: 生成静态文件
        run: |
          hexo clean
          hexo g
          #gulp # 使用Gulp压缩取消#号并和上面命令对齐

      - name: 部署
        run: |
          git config --global user.name "slblog-github"
          git config --global user.email "sladmin@slwebtap.onmicrosoft.com"
          hexo deploy
```

## 上传博客源码

在你的终端输入:

```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/你的用户名/你的私有博客源码仓库名.git
git push -u origin master
```

## 进行云端调试

上传后你会发现 github action 生效。等待几分钟后，如果打勾，就说明部署成功。如果未打勾请检查出错的步骤。

## 配置云函数

以下采用 Vercel 示范,其他云函数请看详细步骤:[https://zfe.space/post/554e.html](https://zfe.space/post/554e.html)
为了方便调用,冰老师写了一个 API
调用方式如下

```
https://yuque-vercel-webhook-api.vercel.app/api?token='{填写你的github私钥}'&user='{填写你的github用户名}'&source='{填写你的github仓库地址}'
```

你需要传递的参数有 token，user，source。
当然你也可以直接 Fork 冰老师的项目自己搭建
[https://github.com/Zfour/yuque_vercel_webhook_api](https://github.com/Zfour/yuque_vercel_webhook_api)
部署完成后将[https://yuque-vercel-webhook-api.vercel.app](https://yuque-vercel-webhook-api.vercel.app)换成你搭建好的地址

## 配置语雀的 webhook

### 设定触发规则

在知识库中选择设置 -> 开发者
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12488964/1613795895821-bbc15fcb-adab-4966-9b36-62ed416b8b73.png#align=left&display=inline&height=282&margin=%5Bobject%20Object%5D&name=image.png&originHeight=563&originWidth=900&size=44950&status=done&style=none&width=450)
添加一个 WebHook
推送方式选择发布文档 更新文档 删除文档
然后名称随便写,URL 就把上面的调用方式补充完成放上去就行
设置完毕后，你可以尝试发布一篇文章进行测试。如果 github action 执行则说明配置成功。

# Thanks for you~
