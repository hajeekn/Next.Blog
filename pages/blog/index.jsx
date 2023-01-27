import Link from 'next/link';
import PageHead from '../../shared/PageHead';
import Banner from '../../shared/Banner';
import { getBlogList } from '../../lib/api';
import ContentItem from '../../shared/ContentItem';

export default function BlogIndex({ list }) {
  return (
    <>
      <PageHead title={`Hajeekn's Blog`} />
      <Banner>
        <h1 className="text-2xl font-medium">博客</h1>
      </Banner>
      <div className="max-w-2xl mx-auto mt-12">
        {list?.map((content) => (
          <ContentItem key={content.slug} content={content} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const list = getBlogList();
  return {
    props: { list: list.map(({ tags, ...rest }) => rest) },
  };
}
