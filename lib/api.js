import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import { serialize } from 'next-mdx-remote/serialize';
import prism from 'remark-prism';
import externalLinks from 'remark-external-links';
import gfm from 'remark-gfm';
import imageSize from 'rehype-img-size';

const contentDirectory = path.join(process.cwd(), 'content');

export const getContentSlugList = (type) => fs.readdirSync(path.join(contentDirectory, type));

export const getBlogSlugList = () => getContentSlugList('blog');

export const getContentSummaryBySlug = (type, slug) => {
  const fileContent = fs.readFileSync(path.join(contentDirectory, type, slug, 'index.md'), 'utf-8');
  const { data } = matter(fileContent);
  return {
    type,
    title: data.title,
    description: data.description,
    tags: data.tags,
    date: dayjs(data.date).format('YYYY-MM-DD'),
    slug,
  };
};

export const getContentList = (type) => {
  const slugs = getContentSlugList(type);
  return slugs
    .map((slug) => getContentSummaryBySlug(type, slug))
    .sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1));
};

export const getBlogList = () => getContentList('blog');

export const getAllList = () => {
  const blogList = getBlogList();
  return [...blogList].sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
  );
};

export const getContentBySlug = async (type, slug) => {
  const fileContent = fs.readFileSync(path.join(contentDirectory, type, slug, 'index.md'), 'utf-8');
  const { data, content } = matter(fileContent);
  return {
    title: data.title,
    date: dayjs(data.date).format('YYYY-MM-DD'),
    description: data.description,
    tags: data.tags || [],
    content: await serialize(content, {
      mdxOptions: {
        remarkPlugins: [prism, externalLinks, gfm],
        rehypePlugins: [[imageSize, { dir: 'public' }]],
      },
    }),
  };
};

export const getBlogBySlug = (slug) => getContentBySlug('blog', slug);
