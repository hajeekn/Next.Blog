import Script from 'next/script'
import LinkData from '../data/friends.yaml'
import Image from 'next/image';
import { useState, useEffect } from 'react'
import PageHead from '../shared/PageHead';
import Banner from '../shared/Banner';
import '../public/static/friends.js';
import Link from 'next/link';

export default function Friends() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch('https://hamids.hesiy.cn/index.json')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])


    if (isLoading) return <center><h1>Loading...</h1></center>
    if (!data) return <center><h1>Unexpected error, please try again!</h1></center>
    
  return (
    <>
      <PageHead title="朋友们 - Hajeekn" />
      <Banner>
        <h1 className="text-2xl font-medium">朋友们</h1>
      </Banner>
      <div className="prose text-center max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-center space-x-4">
            {LinkData.name.map(item => (
                <>
                    <div class="flex items-center p-4">
                        <div class="ml-4 flex-auto">
                            <div class="font-medium" key={item}>
                                {item}
                            </div>
                            <div class="mt-1 text-slate-700">
                    </div>
                        </div>
                        {LinkData.url.map(lurl => (
                        <div key={lurl} class="pointer-events-auto ml-4 flex-none rounded-md py-[0.3125rem] px-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                            <Link href={lurl} />
                        </div>
                        ))}
                    </div>
                </>
            ))}
        </div>
        </div>
    </>
  );
}
