import Image from 'next/image';

export default function ImageRenderer({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      style={{
        width: 'auto',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}
