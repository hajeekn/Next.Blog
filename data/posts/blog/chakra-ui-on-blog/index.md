---
title: Chakra UI 与 Next.js
sticky: 1
tags: [blog, ui]
description: Chakra UI!
categories: [blog]
date: 2023-05-12 18:45:45
copyright_author_href: https://blog.slqwq.cn
author: Hajeekn
---

好久都没写博客了捏，今天逛 GitHub 的时候从推荐中发现了个 <Code colorScheme='green' children='Chakra UI' />

![](https://article.biliimg.com/bfs/article/8b6198789a75e4d948daa19ef67a1db61c97432a.png)

~~这 Star 太恐怖了（~~

![image-20230512185750376](https://article.biliimg.com/bfs/article/ae7ba820d77f0473d4d160031af60b9726788cb0.png)

看这样式挺好看的,准备给博客改造一下~

因为我博客是 <Code colorScheme='green' children='Next.js' />

所以就直接跟着文档走了

首先是安装

<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>npm</Tab>
    <Tab>yarn</Tab>
    <Tab>pnpm</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      ```sh
	  npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
	  ```
    </TabPanel>
    <TabPanel>
      ```sh
	  yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
	  ```
    </TabPanel>
	<TabPanel>
      ```sh
	  pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
	  ```
    </TabPanel>
  </TabPanels>
</Tabs>

安装过后需要先注册 <Code colorScheme='yellow' children='ChakraProvider' />

把 <Code colorScheme='yellow' children='/pages/_app.jsx' /> 改成这样就行

<Badge ml='1' fontSize='0.8em' colorScheme='purple'>不同的人需求不同,盲目复制粘贴只会疯狂报错</Badge>

```jsx
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;
```

除此以外，我们还需要对文章渲染页面做些更改

<Badge ml='1' fontSize='0.8em' colorScheme='purple'>这里我以 `next-mdx-remote` 做演示</Badge>

![](https://article.biliimg.com/bfs/article/b9e7a9891b2a26c43ea52f7cb2a27ad860047dcb.png)

根据 <Badge colorScheme='yellow'>vscode</Badge> 的提示

我们只需要增加一些组件即可

```jsx
	// Plugin, Plugin2 请替换成所需要的组件
	import { Plugin, Plugin2 } from '@chakra-ui/react';

	<MDXRemote
          components={
			// 此处以 {xx: xx} 的格式引入组件
            {Plugin: Plugin, Plugin2: Plugin2}
          }
    />
```

增加组件之后,我们就可以在 <Badge colorScheme='yellow'>.md</Badge> 或 <Badge colorScheme='yellow'>.mdx</Badge> 文件中使用组件了

以 <Badge colorScheme='yellow'>Alert</Badge> 为例

<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Show</Tab>
    <Tab>Code</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
	  <Alert status='success' variant='left-accent'>
		<AlertIcon />
		Data uploaded to the server. Fire on!
	</Alert>
    </TabPanel>
    <TabPanel>
      ```jsx
	  <Alert status='success' variant='left-accent'>
	  ```
    </TabPanel>
  </TabPanels>
</Tabs>

<Badge colorScheme='yellow'>Chakra UI</Badge> 也有着许多其他组件

像 <Badge colorScheme='green'>Tooltip</Badge>

<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Show</Tab>
    <Tab>Code</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
		<Tooltip label='Button!' fontSize='md'>
			<Button>Button</Button>
		</Tooltip>
    </TabPanel>
    <TabPanel>
      ```jsx
	  	<Tooltip label='Button!' fontSize='md'>
			<Button>Button</Button>
		</Tooltip>
	  ```
    </TabPanel>
  </TabPanels>
</Tabs>

更多的组件和用法,就请各位自行去官网查看吧

<Badge colorScheme='green'>[Compoents - Chakra UI](https://chakra-ui.com/docs/components)</Badge>