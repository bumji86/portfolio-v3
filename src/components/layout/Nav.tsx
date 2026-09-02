'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const locales = ['en', 'ko', 'zh'] as const;

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-100">
      <Link href={`/${locale}`} className="font-serif text-lg tracking-tight">
        bumji.me
      </Link>
      <div className="flex gap-7">
        <Link href={`/${locale}`} className="text-xs text-gray-400 hover:text-gray-900 tracking-wider transition-colors">
          {t('about')}
        </Link>
        <Link href={`/${locale}/cases`} className="text-xs text-gray-400 hover:text-gray-900 tracking-wider transition-colors">
          {t('cases')}
        </Link>
        <Link href={`/${locale}/resume`} className="text-xs text-gray-400 hover:text-gray-900 tracking-wider transition-colors">
          {t('resume')}
        </Link>
        <Link href={`/${locale}/contact`} className="text-xs text-gray-400 hover:text-gray-900 tracking-wider transition-colors">
          {t('contact')}
        </Link>
      </div>
      <div className="flex gap-3">
        {locales.map((l) => (
          <Link
            key={l}
            href={getLocalePath(l)}
            className={`text-xs tracking-wider transition-colors ${
              l === locale ? 'text-gray-900 font-medium' : 'text-gray-300 hover:text-gray-600'
            }`}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}
