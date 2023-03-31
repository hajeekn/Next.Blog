import Image from "next/image";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-4 py-8 border-t border-gray-100">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 text-sm text-gray-500">
        <p>Copyright &copy; 2023 Hajeekn</p>
        <span className="mx-2 font-bold hidden sm:block">·</span>
        <p>Powered by Next.js</p>
        <span className="mx-2 font-bold hidden sm:block">·</span>
        <Image alt="" src="/upyun.png" width={60} height={40} />
      </div>
    </footer>
  );
}
