import PageHead from '../shared/PageHead';
import Link from 'next/link';
import Image from 'next/image';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

export default function Home({ data }) {
  return (
    <div>
      <PageHead title="朋友们 - Hajeekn" />
      <section class="max-w-2xl mx-auto px-4" fr-fix-stroke="true">
        <div
          class="flex flex-col items-center justify-center pt-6 pb-12 border-b border-gray-100"
          fr-fix-stroke="true"
        >
          <h1 class="text-2xl font-medium">朋友们</h1>
        </div>
      </section>
      <div class="flex flex-wrap items-center p-4 justify-center space-x-4">
        {data.map((item, index) => (
          <div key={index}>
            <div class="flex flex-1 m-2 rounded-lg items-center p-4">
              <Image
                src={item.avatar}
                width="100"
                height="100"
                alt=""
                class="w-10 flex-none rounded-full"
              />
              <div class="ml-4 flex-auto">
                <div class="font-medium">{item.name}</div>
                <div class="mt-1 text-slate-700">{item.descr}</div>
              </div>
              <Link target="_blank" href={item.url}>
                <div class="pointer-events-auto ml-4 flex-none rounded-md py-[0.3125rem] px-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                  View
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <center><p>提交友链请查看<a href="https://github.com/hajeekn/Next.Blog">仓库 README.md</a></p></center>
    </div>
  );
}

export async function getStaticProps() {
  // read and parse the YML file
  const filePath = path.join(process.cwd(), 'data', 'friends.yaml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = yaml.parse(fileContent);

  // return the data as props
  return {
    props: {
      data,
    },
  };
}
