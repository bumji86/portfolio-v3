'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { GlobeIcon } from './icons';
import { useModal } from './modal-context';

const navLink =
  'text-sm text-neutral-800 transition-colors hover:text-neutral-400 dark:text-neutral-200 dark:hover:text-neutral-500';

export default function Header() {
  const t = useTranslations('home.header');
  const locale = useLocale();
  const pathname = usePathname();
  const { openContact } = useModal();

  const links = [
    { href: '/#works', label: t('works') },
    { href: '/resume', label: t('about') },
    { href: '/#contact', label: t('contact'), contact: true },
  ];

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-20">
        <Link href="/" aria-label="LEE BEOMJUN — home">
          <Logo className="h-[19px] md:h-[26px]" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-6 md:gap-10">
          <nav className="hidden items-center gap-10 sm:flex">
            {links.map((l) =>
              l.contact ? (
                <button key={l.href} type="button" onClick={openContact} aria-haspopup="dialog" className={`cursor-pointer ${navLink}`}>
                  {l.label}
                </button>
              ) : (
                <Link key={l.href} href={l.href} className={navLink}>
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          {routing.locales.length > 1 && (
          <div className="flex items-center gap-1.5 text-xs" aria-label={t('language')}>
            <GlobeIcon className="mr-0.5" />
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

          <ThemeToggle labelLight={t('lightMode')} labelDark={t('darkMode')} className="hidden sm:flex" />
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
