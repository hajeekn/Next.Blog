# Next-blog
基于 Next.js 搭建的博客
# 友链提交指南
首先 Fork 此仓库,在你 Fork 的仓库中修改 `data/friends.yaml`

添加如下内容

```yaml
    - name: 名字
      url: 链接
      avatar: /friends-avatar/···
      descr: 博客介绍
```
然后把你的头像上传到 `/public/friends-avatar`目录下

名称要求:
- 不允许中文
- 不允许出现 `avatar.xxx`(如 avatar.jpg / avatar.png)
- 必须经过压缩(推荐 webp 格式)

处理好之后向本仓库提 PR

一般2周回复(住校生)
