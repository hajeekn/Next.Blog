---
title: Hexo-Butterfly主题魔改
sticky: 1
tags: [Hexo, 主题魔改]
description: 想魔改自己的主题却总是报错?这篇文章我会将我的主题魔改贡献出来。
categories: [Hexo, 主题魔改]
abbrlink: bbr35lia
date: 2021-01-26 20:00:46
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
id: 27
---

**由于每个人的博客目录都不相同，这里博客目录使用%brt%代替**
**本文章除 Pace wowjs 普通引入法以外,其他魔改都不适合 Butterfly3.6.0 及以上**

# 通过 wowjs 给博客添加好看的样式

## 基础样式篇

- 1.创建 JS

前往`%brt%\themes\butterfly\source\js\`
新建一个 js,名称为`wow-init.js`
其 JS 内部写入如下内容

```javascript
wow = new WOW({
  boxClass: "wow",
  // 用户滚动时显示隐藏框的类名称(可以自行配置)
  animateClass: "animate__animated",
  // 触发 CSS 动画的类名称（动画库默认为"animate.css"库）(可以自行配置)
  offset: 0,
  // 定义浏览器视口底部与隐藏框顶部之间的距离。
  // 当用户滚动并到达此距离时，将显示隐藏的框。
  // 可以自行配置
  live: true,
  // 在页面上检查新的 wow.js元素。
});
wow.init();
```

如果您觉得不想出现注释，也可以删掉注释。

- 2.前往`%brt%\themes\butterfly\layout\includes\third-party\`目录,新建一个名为`wow-js.pug`的文件

其文件内部写入如下代码:

```python
.pjax-reload
  if theme.wowjs.animateitem
    each item in theme.wowjs.animateitem
      script(async).
        var arr = document.getElementsByClassName('!{item.class}');
        for(var i = 0;i<arr.length;i++){
            arr[i].classList.add('wow');
            arr[i].classList.add('!{item.style}');
            arr[i].setAttribute('data-wow-duration', '!{item.duration}');
            arr[i].setAttribute('data-wow-delay', '!{item.delay}');
            arr[i].setAttribute('data-wow-offset', '!{item.offset}');
            arr[i].setAttribute('data-wow-iteration', '!{item.iteration}');
          }
script(defer src=url_for(theme.CDN.wowjs))
script(defer src=url_for(theme.CDN.wowjs_init))
```

- 3.修改`%brt%\themes\butterfly\layout\includes\head.pug`的内容

在 //- font 的配置下
//- global config 的配置上的空白部分写入以下代码(请直接复制粘贴,避免出现缩进错误 ❌)

```
//- animate_css
if theme.wowjs.enable
  link(rel='stylesheet' href=url_for(theme.CDN.animate_css) media="print" onload="this.media='all'")
```

- 4.修改`%brt&\themes\butterfly\layout\includes\additional-js.pug`文件内部的内容

在 if theme.pjax.enable 配置大项的 baidu-push 小项下写入一下代码(请直接复制粘贴,避免出现缩进错误 ❌)
V3.4.0 以下(不包括 3.4.0):
将其中的

```javascript
$('script[data-pjax]').each(function () {
```

删除,并修改为:

```javascript
$("script[data-pjax], .pjax-reload script").each(function () {
  $(this).parent().append($(this).remove());
});
```

V3.4.0 以上(包括 3.4.0):
找到

```javascript
document.querySelectorAll('script[data-pjax]').forEach(item => {
```

删除它,并写入以下代码(请直接复制粘贴,避免缩进错误 ❌)

```javascript
document
  .querySelectorAll("script[data-pjax], .pjax-reload script")
  .forEach((item) => {
    const newScript = document.createElement("script");
    const content = item.text || item.textContent || item.innerHTML || "";
    Array.from(item.attributes).forEach((attr) =>
      newScript.setAttribute(attr.name, attr.value)
    );
    newScript.appendChild(document.createTextNode(content));
    item.parentNode.replaceChild(newScript, item);
  });
```

- 5.修改`%brt\%config%\_config.butterfly.yml`(请将%config%替换为你主题配置文件的位置,如果在根目录请无视)

找到 CDN 配置项
在

```yaml
utils: /js/utils.js
```

的配置项下添加 wowjs、wowjs-init、animate 的库(请直接复制粘贴以下代码,避免格式缩进导致的错误 ❌)

```yaml
wowjs: https://cdn.jsdelivr.net/gh/graingert/wow@1.3.0/dist/wow.min.js
wowjs_init: /js/wow_init.js
animate_css: https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css
```

- 6.修改`%brt\%config%\_config.butterfly.yml`(请将%config%替换为你主题配置文件的位置,如果在根目录请无视)

在该配置文件内部添加 wow 的开关，其中 class 和 style 配置为必填项

```yaml
wowjs:
  enable: true #控制动画开关。true是打开，false是关闭
  animateitem:
    - class: recent-post-item #必填项，需要添加动画的元素的class
      style: animate__zoomIn #必填项，需要添加的动画
      duration: 3s #选填项，动画持续时间，单位可以是ms也可以是s。例如3s，700ms。
      delay: 1s #选填项，动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。
      offset: 100 #选填项，开始动画的距离（相对浏览器底部）
      iteration: 2 #选填项，动画重复的次数
    - class: CoolButton
      style: animate__zoomIn
```

运行`hexo clean && hexo g`后方可看到效果,更多 animate 动画样式可查看[animate 官方文档](https://animate.style/)

## 浮动样式篇

浮动样式篇参考[Aklilar](https://akilar.top/)大佬的文章[给博客元素添加浮动特效](https://akilar.top/posts/9e3bccc6)和[洪哥](https://blog.zhheo.com/)的博客效果

- 1.前往`%brt%\themes\butterfly\source\js\`目录,新建一个名为`floatpanel.js`的文件

在内部写入以下代码:

```javascript
var ANGLE = 45; //控制浮动角度，数值越大，浮动幅度越大。

var panel = document.getElementsByClassName("wowpanels");
for (var i = 0; i < panel.length; i++) {
  floatable(panel[i]);
}
function floatable(content) {
  content.addEventListener("mouseout", (e) => {
    content.style.transform = `perspective(300px)
								   rotateX(0deg)
								   rotateY(0deg)
								   rotateZ(0deg)`;
  });
  content.addEventListener("mousemove", (e) => {
    var w = content.clientWidth;
    var h = content.clientHeight;
    var y = ((e.offsetX - w * 0.5) / w) * ANGLE;
    var x = ((1 - (e.offsetY - h * 0.5)) / h) * ANGLE;

    content.style.transform = `perspective(300px)
								   rotateX(${x}deg)
								   rotateY(${y}deg)`;
  });
}
```

- 2.修改`%brt\%config%\_config.butterfly.yml`(请将%config%替换为你主题配置文件的位置,如果在根目录请无视)

在 inject 大项的 bottom 小项中添加 script 引入项:

```yaml
- <script async data-pjax src="/js/floatpanel.js"></script>
```

- 3.给你想要特效的类元素添加 wowpanels 属性,修改 floatpanel.js 的代码如下:

```yaml
// 新增的内容
var arr = document.getElementsByClassName('element-class');
//把element-class替换成你想要添加特效的元素的类名
for(var i = 0;i<arr.length;i++){
arr[i].classList.add('wowpanels');
}
// 原来的内容
var ANGLE = 45; //控制浮动角度，数值越大，浮动幅度越大。
var panel= document.getElementsByClassName('wowpanels');
for(var i = 0;i<panel.length;i++){
floatable(panel[i]);
}
function floatable (content) {
content.addEventListener('mouseout', e => {
content.style.transform = `perspective(300px)
rotateX(0deg)
rotateY(0deg)
rotateZ(0deg)`;
});
content.addEventListener('mousemove', e => {
var w = content.clientWidth;
var h = content.clientHeight;
var y = (e.offsetX - w * 0.5) / w * ANGLE;
var x = (1 - (e.offsetY - h * 0.5)) / h * ANGLE;

content.style.transform = `perspective(300px)
rotateX(${x}deg)
rotateY(${y}deg)`;
});
}
```

_**当你完成了基础样式篇时,其实你可以直接将浮动效果看成一个动画样式**_
在之前的配置下直接添加以下配置项:

```yaml
- class: #你想要更改的class类名
  style: wowpanels
```

添加完成后 wowjs 的配置项应该与下面的截图类似
![](https://npm.elemecdn.com/wytong-source/photos/PicGo/202204171055304.png#crop=0&crop=0&crop=1&crop=1&id=DBS7C&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
如果报错,请检查你的配置缩进是否正确 ✔,这里博主推荐使用微软爸爸出品的 VSC 编辑对于缩进格式邀请很强的文件格式
以下代码供您用来参考:

```yaml
# wowjs
wowjs:
  enable: true #控制动画开关。true是打开，false是关闭
  animateitem:
    - class: recent-post-item #必填项，需要添加动画的元素的class
      style: animate__zoomIn #必填项，需要添加的动画
      duration: 3s #选填项，动画持续时间，单位可以是ms也可以是s。例如3s，700ms。
      delay: 0.5s #选填项，动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。
      offset: 100 #选填项，开始动画的距离（相对浏览器底部）
      iteration: 1 #选填项，动画重复的次数
    - class: card-widget #必填项，需要添加动画的元素的class
      style: animate__zoomInUp #必填项，需要添加的动画
      duration: 3s #选填项，动画持续时间，单位可以是ms也可以是s。例如3s，700ms。
      delay: 0.5s #选填项，动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。
      offset: 100 #选填项，开始动画的距离（相对浏览器底部）
      iteration: 1 #选填项，动画重复的次数
    - class: layout hide-aside #必填项，需要添加动画的元素的class
      style: animate__flipInY #必填项，需要添加的动画
      duration: 3s #选填项，动画持续时间，单位可以是ms也可以是s。例如3s，700ms。
      delay: 0.5s #选填项，动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。
      offset: 100 #选填项，开始动画的距离（相对浏览器底部）
      iteration: 1 #选填项，动画重复的次数
    - class: CoolButton
      style: wowpanels
```

**如果您想让动画更滑丝滑流畅,可以新建 css,在内部写入以下代码:**

```css
.wowpanels {
  transition: all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
}
```

# 添加 BiliBili 同款的动态 Banner

由于每个人的博客目录都不相同，这里博客目录使用%brt%代替

<div class="btns"><a href="https://slqwq.lanzous.com/i94DIkvxz6f" title="下载Bilibili的Banner" one-link-mark="yes" data-pjax-state=""><i class="far fa-hand-point-right"></i>下载Bilibili的Banner</a></div>

- 1.前往`%brt%\themes\butterfly\layout\includes\header\`新建一个名为`bilibili-banner.pug`的文件

在其内部写入

```javascript
if (!is_home())
  - var banner_style = (typeof(page.bilibili_banner) != "undefined" && page.bilibili_banner!=null) ? page.bilibili_banner : theme.bilibili_banner.style
  if (banner_style === 'autumn')
    #autumnBanner
      div
        img(src='/bilibiliBanner/autumn/bilibili-autumn-1.png')
      div
        img(src='/bilibiliBanner/autumn/bilibili-autumn-2.png')
      div
        img(src='/bilibiliBanner/autumn/bilibili-autumn-3.png')
      div
        img(src='/bilibiliBanner/autumn/bilibili-autumn-4.png')
      div
        img(src='/bilibiliBanner/autumn/bilibili-autumn-5.png')
      div
        img(src='/bilibiliBanner/autumn/bilibili-autumn-6.png')
  else if (banner_style === 'winter')
    #winterBanner
      .view
        img.morning(src='/bilibiliBanner/winter/bilibili-winter-view-1.png' alt='')
        img.afternoon(src='/bilibiliBanner/winter/bilibili-winter-view-2.png' alt='')
        video.evening(autoplay='' loop='' muted='')
          source(src='/bilibiliBanner/winter/bilibili-winter-view-3.webm' type='video/webm')
        img.window-cover(src='/bilibiliBanner/winter/bilibili-winter-view-3-snow.png' alt='')
      .tree
        img.morning(src='/bilibiliBanner/winter/bilibili-winter-tree-1.png' alt='')
        img.afternoon(src='/bilibiliBanner/winter/bilibili-winter-tree-2.png' alt='')
        img.evening(src='/bilibiliBanner/winter/bilibili-winter-tree-3.png' alt='')
  script(async data-pjax src=url_for(theme.CDN.bilibili_banner))
```

- 2.前往`%brt%\themes\butterfly\source\css\`新建一个名为`bilibiliBanner.css`的文件

在其内部写入以下代码:

```css
/* autumnBanner */
@media screen and (max-width: 1000px) {
  #autumnBanner {
    display: none !important;
  }
}
#autumnBanner {
  height: 100%;
  position: relative;
  overflow: hidden;
  filter: brightness(70%);
}

#autumnBanner > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  --offset: 0px;
  --blur: 2px;
}

#autumnBanner > div > img {
  display: block;
  width: 110%;
  height: 100%;
  object-fit: cover;

  transform: translatex(var(--offset));
  filter: blur(var(--blur));
}

/* winterBanner */
@media screen and (max-width: 1000px) {
  #winterBanner {
    display: none !important;
  }
}

#winterBanner {
  height: 100%;
  position: relative;
  width: 100%;
  overflow: hidden;
  --percentage: 0.5;
}

#winterBanner .view,
#winterBanner .tree {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#winterBanner img,
#winterBanner video {
  position: absolute;
  display: block;
  max-width: 120% !important;
  width: 120% !important;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
}

#winterBanner .morning {
  z-index: 20;
  opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
}

#winterBanner .afternoon {
  z-index: 10;
  opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
}

#winterBanner .view {
  transform: translatex(calc(var(--percentage) * 100px));
}

#winterBanner .tree {
  transform: translatex(calc(var(--percentage) * 50px));
  filter: blur(3px);
}

#winterBanner .view,
#winterBanner .tree,
#winterBanner .morning,
#winterBanner .afternoon {
  transition: 0.2s all ease-in;
}

#winterBanner.moving .view,
#winterBanner.moving .tree,
#winterBanner.moving .morning,
#winterBanner.moving .afternoon {
  transition: none;
}

#winterBanner .window-cover {
  opacity: calc((var(--percentage) - 0.9) / 0.1);
}
```

- 3.前往`%brt%\themes\butterfly\source\js\`新建一个名为`bilibili-banner.js`的文件

在其内部写入以下代码

```javascript
//autumn_banner

var autumnBanner = document.querySelector("#autumnBanner");
if (autumnBanner) {
  var images = document.querySelectorAll("#autumnBanner > div > img");
  autumnBanner.addEventListener("mousemove", (e) => {
    let percentage = e.clientX / window.outerWidth;
    let offset = 10 * percentage;
    let blur = 20;

    for (let [index, image] of images.entries()) {
      offset *= 1.3;

      let blurValue = Math.pow(index / images.length - percentage, 2) * blur;

      image.style.setProperty("--offset", `${offset}px`);
      image.style.setProperty("--blur", `${blurValue}px`);
    }
  });
}
//winter_banner

var winterBanner = document.querySelector("#winterBanner");
if (winterBanner) {
  var startingPoint;
  winterBanner.addEventListener("mouseenter", (e) => {
    startingPoint = e.clientX;
    winterBanner.classList.add("moving");
  });

  winterBanner.addEventListener("mouseout", (e) => {
    winterBanner.classList.remove("moving");
    winterBanner.style.setProperty("--percentage", 0.5);
  });

  winterBanner.addEventListener("mousemove", (e) => {
    let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5;

    winterBanner.style.setProperty("--percentage", percentage);
  });
}
```

- 4.在主题的 source 文件夹下新建`bilibiliBanner`文件夹,将我所提供的资源解压,直接放入进去(里面一定只有两个目录)
- 5.进入`%brt%\themes\butterfly\layout\includes\header\`文件夹,找到`index.pug`在内部注入 bilibili_banner 组件

在 include ./nav.pug 配置下 if is_post()配置上添加以下配置(请直接复制粘贴,避免代码缩进导致的错误 ❌)

```javascript
    - var bilibili_banner = (typeof(page.bilibili_banner) != "undefined" && page.bilibili_banner!=null) ? page.bilibili_banner : theme.bilibili_banner.enable
    if (bilibili_banner)
      include ./bilibili-banner.pug
```

- 6.修改`%brt\%config%\_config.butterfly.yml`(请将%config%替换为你主题配置文件的位置,如果在根目录请无视)

找到 CDN 配置,在 utils: /js/utils.js 配置的后面添加以下配置

```yaml
bilibili_banner: /js/bilibili-banner.js
```

- _**添加  **_`_**css**_`_**  配置项。此处使用了异步加载，同时做了媒体选择，对手机是不会生效的。因为手机的  **_`_**banner**_`_**  高度会导致适配效果很差。**_

我们找到 inject 配置大项的 head 小项,在其内部添加以下配置:

```yaml
- <link rel="stylesheet" href="/css/bilibiliBanner.css"  media="defer" onload="this.media='screen'">
```

- 7.添加控制开关

在 butterfly 主题配置中添加以下配置:

```yaml
# banner样式
bilibili_banner:
  enable: true # 开关banner
  style: winter # autumn 秋季样式 ；winter 冬季样式
```

- 除了在主题配置文件通过配置  `bilibili_banner:`  的默认项，还可以在每个页面的  `markdown`  文件中通过  `front-matter`  控制单页配置。提供了**三个选项**：
- `false` ：  关闭该页面的动态 `banner` 显示
- `autumn` ：  开启该页面的动态 `banner`，并设置主题为秋季
- `winter` ：  开启该页面的动态 `banner`，并设置主题为冬季
  页面配置项优先级高于主题配置

# 悬停左上角时在网站顶部中间位置会出现描述

- 1.进入`%brt%\themes\butterfly\layout\includes\header\`修改名为`nav.pug`的文件

找到

```javascript
span#blog_name
a#site-name(href=url_for('/')) #[=config.title]
```

将它们删除,并替换为以下代码(请直接复制粘贴,避免缩进错误 ❌):

```javascript
  - var pagedescr = (typeof(page.description) != "undefined" && page.description!=null) ? page.description : '欢迎您来到了Hajeekn的小木屋呢,不过看起来有点漏水🐕'
    if is_post()
      span#blog_name
        a#site-name(onclick='btf.scrollToDest(0,500)' data-title=pagedescr) #[=config.title]
    else if is_page()
      span#blog_name
        a#site-name(href=url_for('/') data-title=pagedescr) #[=page.title]
    else
      span#blog_name
        a#site-name(href=url_for('/') data-title=pagedescr) #[=config.title]
```

- 2.因为  `hexo`  自带缓存的关系，如果我们用的是缓存式引入的话，`nav`  的刷新是惰性的，我们需要它根据文章和页面的切换实时变动。所以需要改动一下引入逻辑。打开`%brt%\themes\butterfly\layout\includes\header\index.pug`

找到

```javascript
!=partial('includes/header/nav', {}, {cache:theme.fragment_cache})
```

删除,并将它修改为以下代码(请直接复制粘贴,避免缩进错误 ❌):

```javascript
  include ./nav.pug
  if top_img !== false
    if is_post()
      include ./post-info.pug
```

(如果您添加了 BiliBili 动态 banner,请将它放置在在 if is_post()的前面 if top_img !== false 的后面,避免报错)

- 3.进入`%brt%\themes\butterfly\source\css\_layout\`新建\_custom.styl

在其内部输入以下代码(请直接复制粘贴,避免缩进错误 ❌):

```css
/*标题悬停显示文章描述*/
#site-name
  &:hover
    &:before
      position: fixed
      width:fit-content
      margin:auto
      left:0;
      right:0
      top:10%
      border-radius: 10px
      text-align: center
      z-index: 100
      content: attr(data-title)
      font-size: 20px
      color: #fff
      padding: 10px
      background-color: rgba(#49B1F5,0.9)
/* 夜间模式适配 */
[data-theme=dark]
  a#site-name
    &:hover
      &:before
        background-color: rgba(#121212,0.8)
/*标题超过隐藏并显示省略号*/
@media screen and (max-width: 768px)
  a#site-name
    -webkit-line-clamp 1
    word-break break-all
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden
```

# 主页置顶的 ♂gitcalendar♂

哪个男孩纸不想拥有一个状态显示呢?
这个模块就会教大家在 Butterfly 使用 gitcalendar

## 准备好了吗?Go Go!

- 1.前往`%brt\themes\butterfly\layout\includes\`新建一个名为`gitcalendar.pug`的文件

在其内部添加以下代码(请直接复制粘贴,避免缩进错误 ❌):

```javascript
#gitcalendar.gitcalendar
  #gitmessage(:style='{top:y+px,left:x+px,position: fixed,zIndex:9999}')
    .angle-wrapper
      span {{span1}} &nbsp;
      span {{span2}} 次上传
  .position-relative
    .border.py-2.graph-before-activity-overview
      .js-gitcalendar-graph.mx-md-2.mx-3.d-flex.flex-column.flex-items-end.flex-xl-items-center.overflow-hidden.pt-1.is-graph-loading.graph-canvas.gitcalendar-graph.height-full.text-center
        #gitcalendarcanvasbox(v-if='simplemode')
          canvas#gitcanvas(style='animation: none;')
        svg.js-gitcalendar-graph-svg(width='100%', viewBox='0 0 770 128', v-if='!simplemode')
          text.month(:x='32 + monthindex*64', y='20', v-for='(month,monthindex) in monthchange') {{month}}
          text.wday(text-anchor='start', dx='0', dy='40')  日
          text.wday(text-anchor='start', dx='0', dy='65')  二
          text.wday(text-anchor='start', dx='0', dy='90')  四
          text.wday(text-anchor='start', dx='0', dy='115') 六
          g(v-for='(weekitem,weekIndex) in data', :transform='\'translate(\'+ (16 + weekIndex*14) + \',\' + \'0)\'')
            rect(@mouseover="selectStyle(dayitem,$event)"  @mouseleave="outStyle()" v-for='(dayitem,dayIndex) in weekitem', :style='{fill:thiscolor(dayitem.count),shapeRendering:crispedges}', :data-score='dayitem.count', :data-date='dayitem.date', x='0', :y=' 30 + dayIndex*13 ', width='11', height='11')
      .contrib-footer.clearfix.mt-1.mx-3.px-3.pb-1
        .float-left.text-gray
          | 数据来源
          a(:href="'https://github.com/'+ user ", target='blank') @{{user}}
        .contrib-legend.text-gray
          | Less

          ul.legend
            li(:style='{backgroundColor:color[0]}')
            li(:style='{backgroundColor:color[2]}')
            li(:style='{backgroundColor:color[4]}')
            li(:style='{backgroundColor:color[6]}')
            li(:style='{backgroundColor:color[8]}')
          | More

  .contrib-column.contrib-column-first.table-column
    span.text-muted 过去一年提交
    span.contrib-number {{total}}
    span.text-muted {{oneyearbeforeday}}&nbsp;-&nbsp;{{thisday}}
  .contrib-column.table-column
    span.text-muted 最近一月提交
    span.contrib-number {{thisweekdatacore}}
    span.text-muted {{amonthago}}&nbsp;-&nbsp;{{thisday}}
  .contrib-column.table-column
    span.text-muted 最近一周提交
    span.contrib-number {{weekdatacore}}
    span.text-muted {{aweekago}}&nbsp;-&nbsp;{{thisday}}

```

- 2.继续在这个目录下新建一个名为`gitcalendar-js.pug`的文件

在内部写入以下代码(请直接复制粘贴,避免缩进错误 ❌):

```javascript
script.
  var gitcalendar = new Vue({
    el: '#gitcalendar',
    data: {
      simplemode: !{theme.gitcalendar.simplemode},
      user: '!{theme.gitcalendar.user}',
      fixed: 'fixed',
      px: 'px',
      x: '',
      y: '',
      span1: '',
      span2: '',
      month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthchange: [],
      oneyearbeforeday: '',
      thisday: '',
      amonthago: '',
      aweekago: '',
      weekdatacore: 0,
      datacore: 0,
      total: 0,
      datadate: '',
      data: [],
      positionplusdata: [],
      firstweek: [],
      lastweek: [],
      beforeweek: [],
      thisweekdatacore: 0,
      mounthbeforeday: 0,
      mounthfirstindex: 0,
      crispedges: 'crispedges',
      thisdayindex: 0,
      amonthagoindex: 0,
      amonthagoweek: [],
      firstdate: [],
      first2date: [],
      montharrbefore: [],
      monthindex: 0,
      color: !{theme.gitcalendar.color}
    },
    methods: {
      selectStyle(data, event) {
        document.querySelector('.angle-wrapper').style.display = 'block'
        this.span1 = data.date;
        this.span2 = data.count;
        this.x = event.clientX - 100;
        this.y = event.clientY - 60
      },
      outStyle() {
        document.querySelector('.angle-wrapper').style.display = 'none'
      },
      thiscolor(x) {
        if (x === 0) {
          let i = parseInt(x / 2);
          return this.color[0]
        } else if (x < 2) {
          return this.color[1]
        } else if (x < 20) {
          let i = parseInt(x / 2);
          return this.color[i]
        } else {
          return this.color[9]
        }
      },
    }
  });
  var apiurl = '!{theme.gitcalendar.apiurl}' ? 'https://!{theme.gitcalendar.apiurl}/api?' : 'https://githubapi.ryanchristian.dev/user/'
  var githubapiurl = apiurl + gitcalendar.user;
  //canvas绘图
  function responsiveChart() {
    let c = document.getElementById("gitcanvas");
    if (c) {
      let cmessage = document.getElementById("gitmessage");
      let ctx = c.getContext("2d");
      c.width = document.getElementById("gitcalendarcanvasbox").offsetWidth;
      let linemaxwitdh = 0.96 * c.width / gitcalendar.data.length;
      c.height = 9 * linemaxwitdh;
      let lineminwitdh = 0.8 * linemaxwitdh;
      let setposition = {
        x: 0.02 * c.width,
        y: 0.025 * c.width
      };
      for (let week in gitcalendar.data) {
        weekdata = gitcalendar.data[week];
        for (let day in weekdata) {
          let dataitem = {
            date: "",
            count: "",
            x: 0,
            y: 0
          };
          gitcalendar.positionplusdata.push(dataitem);
          ctx.fillStyle = gitcalendar.thiscolor(weekdata[day].count);
          setposition.y = Math.round(setposition.y * 100) / 100;
          dataitem.date = weekdata[day].date;
          dataitem.count = weekdata[day].count;
          dataitem.x = setposition.x;
          dataitem.y = setposition.y;
          ctx.fillRect(setposition.x, setposition.y, lineminwitdh, lineminwitdh);
          setposition.y = setposition.y + linemaxwitdh
        };
        setposition.y = 0.025 * c.width;
        setposition.x = setposition.x + linemaxwitdh
      };
      ctx.font = "600  Arial";
      ctx.fillStyle = '#aaa';
      ctx.fillText("日", 0, 1.9 * linemaxwitdh);
      ctx.fillText("二", 0, 3.9 * linemaxwitdh);
      ctx.fillText("四", 0, 5.9 * linemaxwitdh);
      ctx.fillText("六", 0, 7.9 * linemaxwitdh);
      let monthindexlist = c.width / 24;
      for (let index in gitcalendar.monthchange) {
        ctx.fillText(gitcalendar.monthchange[index], monthindexlist, 0.7 * linemaxwitdh);
        monthindexlist = monthindexlist + c.width / 12
      };
      cmessage.onmousemove = function(event) {
        document.querySelector('.angle-wrapper').style.display = 'none'
      };
      c.onmousemove = function(event) {
        document.querySelector('.angle-wrapper').style.display = 'none'
        getMousePos(c, event);
      };

      function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left * (canvas.width / rect.width);
        var y = event.clientY - rect.top * (canvas.height / rect.height);
        //console.log("x:"+x+",y:"+y);
        for (let item of gitcalendar.positionplusdata) {
          let lenthx = x - item.x;
          let lenthy = y - item.y;
          //console.log(lenthx,lenthy);
          if (0 < lenthx && lenthx < lineminwitdh) {
            if (0 < lenthy && lenthy < lineminwitdh) {
              //console.log(item.date,item.count)
              document.querySelector('.angle-wrapper').style.display = 'block'
              gitcalendar.span1 = item.date;
              gitcalendar.span2 = item.count;
              gitcalendar.x = event.clientX - 100;
              gitcalendar.y = event.clientY - 60
            }
          }
          //if(0< x - item.x <lineminwitdh&&0< y - item.y <lineminwitdh){
          //console.log(item.count,item.date);
          //}
        }
      }
    }
  }
  //数据统计算法
  function addlastmonth() {
    if (gitcalendar.thisdayindex === 0) {
      thisweekcore(52);
      thisweekcore(51);
      thisweekcore(50);
      thisweekcore(49);
      thisweekcore(48);
      gitcalendar.thisweekdatacore += gitcalendar.firstdate[6].count;
      gitcalendar.amonthago = gitcalendar.firstdate[6].date
    } else {
      thisweekcore(52);
      thisweekcore(51);
      thisweekcore(50);
      thisweekcore(49);
      thisweek2core();
      gitcalendar.amonthago = gitcalendar.first2date[gitcalendar.thisdayindex - 1].date
    }
  };

  function thisweek2core() {
    for (let i = gitcalendar.thisdayindex - 1; i < gitcalendar.first2date.length; i++) {
      gitcalendar.thisweekdatacore += gitcalendar.first2date[i].count
    }
  };

  function thisweekcore(index) {
    for (let item of gitcalendar.data[index]) {
      gitcalendar.thisweekdatacore += item.count
    }
  };

  function addlastweek() {
    for (let item of gitcalendar.lastweek) {
      gitcalendar.weekdatacore += item.count
    }
  };

  function addbeforeweek() {
    for (let i = gitcalendar.thisdayindex; i < gitcalendar.beforeweek.length; i++) {
      gitcalendar.weekdatacore += gitcalendar.beforeweek[i].count
    }
  };

  function addweek(data) {
    if (gitcalendar.thisdayindex === 6) {
      gitcalendar.aweekago = gitcalendar.lastweek[0].date;
      addlastweek()
    } else {
      lastweek = data.contributions[51];
      gitcalendar.aweekago = lastweek[gitcalendar.thisdayindex + 1].date;
      addlastweek();
      addbeforeweek()
    }
  }

  fetch(githubapiurl)
    .then(data => data.json())
    .then(data => {
      gitcalendar.data = data.contributions;
      gitcalendar.total = data.total;
      gitcalendar.first2date = gitcalendar.data[48];
      gitcalendar.firstdate = gitcalendar.data[47];
      gitcalendar.firstweek = data.contributions[0];
      gitcalendar.lastweek = data.contributions[52];
      gitcalendar.beforeweek = data.contributions[51];
      gitcalendar.thisdayindex = gitcalendar.lastweek.length - 1;
      gitcalendar.thisday = gitcalendar.lastweek[gitcalendar.thisdayindex].date;
      gitcalendar.oneyearbeforeday = gitcalendar.firstweek[0].date;
      gitcalendar.monthindex = gitcalendar.thisday.substring(5, 7) * 1;
      gitcalendar.montharrbefore = gitcalendar.month.splice(gitcalendar.monthindex, 12 - gitcalendar.monthindex);
      gitcalendar.monthchange = gitcalendar.montharrbefore.concat(gitcalendar.month);
      addweek(data);
      addlastmonth();
      responsiveChart();
    })
    .catch(function(error) {
      console.log(error);
    });

  //手机版更换为svg绘制
  if (document.getElementById("gitcalendarcanvasbox").offsetWidth < 500) {
    gitcalendar.simplemode = false
  }

  //当改变窗口大小时重新绘制canvas
  window.onresize = function() {
    if (gitcalendar.simplemode) responsiveChart()
  }

  //解决滚动滑轮时出现的标签显示
  window.onscroll = function() {
    if (document.querySelector('.angle-wrapper')) {
      document.querySelector('.angle-wrapper').style.display = 'none'
    }
  };
```

然后你要去创建 Stylus 样式辣

- 3.进入`%brt%\themes\butterfly\source\css\_layout\`新建一个名为`gitcalendar.styl`的文件

用 编 辑 器 打开
在文件内部 植 入 以下代码:

```css
if hexo-config('gitcalendar.enable')
  .gitcalendar
    font-family SourceHanSans-Medium
    border 1px solid #DDDDDD
    border-radius 3px
    min-height 120px
    text-align center
    margin 0 auto
    border-width 0px
    width 100%
    display flex
    display -webkit-flex
    justify-content center
    align-items center
    flex-wrap wrap
    img
      &.spinner
        width 70px
        margin-top 50px
        min-height 70px

  .gitcalendar-graph text.wday,
  .gitcalendar-graph text.month
    font-size 10px
    fill #aaa

  .contrib-legend
    text-align right
    padding 0 14px 10px 0
    display inline-block
    float right
    .legend
      display inline-block
      list-style none
      margin 0 5px
      position relative
      bottom -1px
      padding 0
      li
        display inline-block
        width 10px
        height 10px

  .text-small
    font-size 12px
    color #767676

  .gitcalendar-graph
    padding 15px 0 0
    text-align center

  .contrib-column
    text-align center
    border-left 1px solid #ddd
    border-top 1px solid #ddd
    font-size 11px

  .contrib-column-first
    border-left 0

  .table-column
    padding 10px
    display table-cell
    width 33%
    vertical-align top

  .contrib-number
    font-weight 300
    line-height 1.3em
    font-size 24px
    display block

  .monospace
    text-align center
    color #000
    font-family monospace
    a
      color #1D75AB
      text-decoration none

  .contrib-footer
    font-size 11px
    padding 0 10px 12px
    text-align left
    width 100%
    box-sizing border-box
    height 26px

  .left
    &.text-muted
      float left
      margin-left 9px
      color #767676
      a
        color #4078c0
        text-decoration none

  .left.text-muted a:hover,
  .monospace a:hover
    text-decoration underline

  h2
    &.f4
      &.text-normal
        &.mb-3
          display none

  .float-left
    &.text-gray
      float left

  #user-activity-overview
    display none

  .day-tooltip
    white-space nowrap
    position absolute
    z-index 99999
    padding 10px
    font-size 12px
    color #959da5
    text-align center
    background rgba(0,0,0,.85)
    border-radius 3px
    display none
    pointer-events none
    strong
      color #dfe2e5
    &.is-visible
      display block
    &:after
      position absolute
      bottom -10px
      left 50%
      width 5px
      height 5px
      box-sizing border-box
      margin 0 0 0 -5px
      content " "
      border 5px solid transparent
      border-top-color rgba(0,0,0,.85)

  .position-relative
    width 100%
    padding-left 20px
    padding-right 20px

  @media screen and (max-width: 650px)
    .contrib-column
      display none

  .angle-wrapper
    z-index 9999
    display inline
    display none
    width 200px
    height 40px
    position relative
    padding 5px 0
    background rgba(0, 0, 0, 0.8)
    border-radius 8px
    text-align center
    color white
    span
      padding-bottom 1em
    &:before
      content ''
      width 0
      height 0
      border 10px solid transparent
      border-top-color rgba(0, 0, 0, 0.8)
      position absolute
      left 47.5%
      top 100%

  .angle-box
    position fixed
    padding 10px
```

- 4.快马加鞭的前往`%brt%\themes\butterfly\layout\`找到我们的 食 物 `index.pug`

为了方便我们食用,找到#recent-posts.recent-posts 在下面插入一段代码

```javascript
    if theme.gitcalendar.enable
      .recent-post-item(style='width:100%')
        !=partial('includes/gitcalendar', {}, {cache:theme.fragment_cache})
    if theme.categoryBar.enable
      .recent-post-item(style='height:auto;width:100%;padding:0px;')
        #categoryBar!= list_categories(site.categories,{class: 'categoryBar',depth: 1})
```

**记得一定要放在+postUI 的前一行哦**
**-** 5.进入`%brt%\themes\butterfly\layout\includes\`的`additional-js.pug`文件
在 script(src=url_for(theme.CDN.utils))的上面加入以下内容

```javascript
script((src = url_for(theme.CDN.vue)));
```

然后再找到 script(defer src=url_for(theme.CDN.busuanzi))配置项
在这下面放入以下代码

```javascript
    if theme.gitcalendar.enable
      !=partial('includes/gitcalendar-js', {}, {cache:theme.fragment_cache})
  !=partial('includes/third-party/prismjs', {}, {cache:theme.fragment_cache})
```

好的,修改完了,接下来我们就可以去添加 CDN 配置项和 gitcalendar 配置项了
进入`%brt%\_config.butterfly.yml`
找到 CDN 配置项
在 utils: /js/utils.js 配置项的下面插入以下代码

```javascript
  vue: https://cdn.jsdelivr.net/npm/vue@2.6.11
```

然后随便找一个屑位置,插入以下代码:

```yaml
#gitcalendar
gitcalendar:
  enable: true
  simplemode: true
  #设为true时使用canvas绘制gitgitcalendar，
  #设为false时使用svg绘制gitgitcalendar
  #canvas：dom数少，但图像会发生模糊，自适应一般
  #svg：dom数多，图像清晰，自适应更佳
  user: slblog-github #这里填写你的github用户名
  apiurl: # 留空为默认公共API
  # 以下色调选择喜欢的一行保留即可。其余注释。
  color: "['#e4dfd7', '#f9f4dc', '#f7e8aa', '#f7e8aa', '#f8df72', '#fcd217', '#fcc515', '#f28e16', '#fb8b05', '#d85916', '#f43e06']" #橘黄色调
  # color: "['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f']" #浅紫色调
  # color: "['#ebedf0', '#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620']" #翠绿色调
  # color: "['#ebedf0', '#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c']" #天青色调
```

然后参照上面的配置就行辣~
关于配置 apiurl 可以参照[Akilar 大佬的文章](https://akilar.top/posts/1f9c68c9/#%E8%87%AA%E5%BB%BAAPI%E9%83%A8%E7%BD%B2)自建 API 哦
各位有什么想魔改的可以评论以一下(只要不太难,毕竟我还是个 初 中 生)

# 在你的网站添加一个 ♂ 美妙 ♂ 的 PACE 加载进度条

## 这个很简单,只需要一个 JS 和一个 CSS 就可以了

现在我们开始吧
首先进入`%brt%\_config.butterfly.yml`
找到 inject 大项
在 bottom 配置项下面添加如下配置:

```yaml
- <script async data-pjax src="https://cdn.jsdelivr.net/gh/HCLonely/hclonely.github.io@1.4.7/js/custom/pace.min.js"></script>
- <link rel=stylesheet href="https://cdn.jsdelivr.net/gh/HCLonely/hclonely.github.io@1.4.7/css/custom/pace-theme-flash.min.css">
```

然后就行了,哈哈其实是用来水一下字数的

## 备用引入

备用 1

```yaml
- <script async data-pjax src="https://static.slqwq.cn/script/pace-main.min.js"></script>
- <link rel=stylesheet href="https://static.slqwq.cn/styles/pace-theme-flash.min.css">
```

备用 2

```yaml
- <script async data-pjax src="https://static-2.slqwq.cn/script/pace-main.min.js"></script>
- <link rel=stylesheet href="https://static-2.slqwq.cn/styles/pace-theme-flash.min.css">
```

备用 3

```yaml
- <script async data-pjax src="https://static-3.slqwq.cn/script/pace-main.min.js"></script>
- <link rel=stylesheet href="https://static-3.slqwq.cn/styles/pace-theme-flash.min.css">
```

备用 4

```yaml
- <script async data-pjax src="https://cdn.jsdelivr.net/gh/slblog-github/Static@main/script/pace-main.min.js"></script>
- <link rel=stylesheet href="https://cdn.jsdelivr.net/gh/slblog-github/Static@main/styles/pace-theme-flash.min.css">
```
