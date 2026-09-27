'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const t = useTranslations('home.header');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: '/#works', label: t('works') },
    { href: '/resume', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-20">
        <Link href="/" className="font-logo text-2xl tracking-[0.06em] md:text-[32px]">
          LEE BEOMJUN
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          <nav className="hidden items-center gap-10 sm:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-neutral-800 transition-colors hover:text-neutral-400 dark:text-neutral-200 dark:hover:text-neutral-500"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {routing.locales.length > 1 && (
          <div className="flex items-center gap-1.5 text-xs" aria-label={t('language')}>
            <GlobeIcon />
            {routing.locales.map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-neutral-300 dark:text-neutral-600">·</span>}
                <Link
                  href={pathname}
                  locale={l}
                  className={
                    l === locale
                      ? 'font-semibold text-neutral-900 dark:text-white'
                      : 'text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white'
                  }
                >
                  {l.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>
          )}

          <ThemeToggle labelLight={t('lightMode')} labelDark={t('darkMode')} />
        </div>
      </div>
    </header>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="mr-0.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
