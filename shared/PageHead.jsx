import Head from 'next/head';

export default function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Hajeekn" />
      <meta
        name="description"
        content="Hajeekn 的博客,什么东西都写"
      />
      <meta
        name="keywords"
        content="Hajeekn, HTML, CSS, JavaScript, Node.js, React"
      />
    </Head>
  );
}
