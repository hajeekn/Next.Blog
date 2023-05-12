import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import ImageRenderer from '../../shared/ImageRenderer';
import { MDXRemote } from 'next-mdx-remote';
import Banner from '../../shared/Banner';
import { getBlogBySlug, getBlogSlugList } from '../../lib/api';
import { init } from '@waline/client';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Code,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tooltip,
  Button,
} from '@chakra-ui/react';

import 'prism-themes/themes/prism-duotone-sea.css';

export default function BlogItem({ blog }) {
  const walineRef = useRef(null);

  useEffect(() => {
    walineRef.current = init({
      el: '#waline-comment',
      path: blog.slug,
      serverURL: 'https://waline-1-n8622878.deta.app',
      lang: 'zh-CN',
      recaptchaV3Key: '6LcNtNAkAAAAAA6hV4hTdsKH4bEi07egSJmdIApQ',
    });

    return () => {
      walineRef.current.destroy();
    };
  }, []);
  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <Head>
        <title>{`${blog.title} - Hajeekn's Blog`}</title>
        <meta name="author" content="Hajeekn" />
        <meta name="description" content={blog.description} />
        <meta name="keywords" content={blog.tags} />
      </Head>
      <Banner>
        <h1 className="text-3xl font-medium dark:text-white">{blog.title}</h1>
        <span className="mt-2 text-sm text-gray-400">{blog.date}</span>
      </Banner>
      <article className="px-4 py-8 prose max-w-none">
        <MDXRemote
          {...blog.content}
          components={{
            Tabs: Tabs,
            TabList: TabList,
            TabPanels: TabPanels,
            Tab: Tab,
            TabPanel: TabPanel,
            Badge: Badge,
            Code: Code,
            Alert: Alert,
            AlertIcon: AlertIcon,
            AlertTitle: AlertTitle,
            AlertDescription: AlertDescription,
            Tooltip: Tooltip,
            Button: Button,
            img: ImageRenderer,
          }}
        />
      </article>
      <div id="waline-comment" />
    </div>
  );
}

export async function getStaticPaths() {
  const blogs = getBlogSlugList();

  return {
    paths: blogs.map((blog) => ({
      params: { slug: blog },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return { props: { blog } };
}
