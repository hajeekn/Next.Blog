const needRedirectPostList = [
  'react-code-style-guide',
  'css-in-react',
  'webpack-auto-css-modules',
  'how-to-write-great-react',
  'dva.js-get-started',
  'koa2-get-started',
];

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      ...needRedirectPostList.map((slug) => ({
        source: `/${slug}`,
        destination: `/post/${slug}`,
        permanent: true,
      })),
      {
        source: '/post/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i0.hdslb.com', 'rmt.ladydaily.com'],
  },
};
