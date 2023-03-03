import Image from 'next/image';
import { AtSign, GitHub } from 'react-feather';
import PageHead from '../shared/PageHead';
import Banner from '../shared/Banner';

export default function About() {
  return (
    <>
      <PageHead title="关于 - Hajeekn" />
      <Banner>
        <h1 className="text-2xl font-medium">关于</h1>
      </Banner>
      <div className="prose text-center max-w-2xl mx-auto py-8">
        <div className="flex justify-center mb-8">
          <Image
            className="rounded-full"
            src="/avatar.webp"
            width={100}
            height={100}
            alt="Avatar"
          />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <a className="w-5 h-5" title="Email" href="mailto:thajeekn@duck.com">
            <AtSign size="100%" />
          </a>
          <a className="w-5 h-5" title="GitHub" href="https://github.com/hajeekn">
            <GitHub size="100%" />
          </a>
        </div>

      </div>
    </>
  );
}
