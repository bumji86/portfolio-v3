import Image from 'next/image';

// Renders an image when `src` is set, otherwise a neutral placeholder box.
export default function Media({
  src,
  alt,
  className = '',
  imgClassName = '',
  sizes,
}: {
  src: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${imgClassName}`} />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
          {alt}
        </span>
      )}
    </div>
  );
}
