'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { GlobeIcon, LinkedInIcon } from './icons';
import { setTheme } from './ThemeToggle';
import { useModal } from './modal-context';

const subscribeNoop = () => () => {};

const menuLink =
  'block w-full py-2.5 text-2xl font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-400 dark:text-white dark:hover:text-neutral-500';

// Hamburger (below `sm`) + right-side drawer. The drawer is portaled to <body> because the header's
// backdrop-filter would otherwise trap `position: fixed` inside the header box.
export default function MobileMenu({
  links,
  linkedin,
}: {
  links: { href: string; label: string; contact?: boolean }[];
  linkedin: string | null;
}) {
  const t = useTranslations('home.header');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openContact } = useModal();
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Scroll lock, Escape to close, focus handoff, and auto-close when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const desktop = window.matchMedia('(min-width: 640px)');
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);

    const triggerEl = trigger.current;
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
      triggerEl?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = (
    <div className="sm:hidden">
      {/* backdrop */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t('menu')}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(20rem,85vw)] flex-col bg-white pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none dark:bg-neutral-950 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* same height as the header so the close button sits where the hamburger was */}
        <div className="flex h-16 shrink-0 items-center justify-end px-5">
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label={t('closeMenu')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="px-8">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                {l.contact ? (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => {
                      close();
                      openContact();
                    }}
                    className={`cursor-pointer text-left ${menuLink}`}
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link href={l.href} onClick={close} aria-current={pathname === l.href ? 'page' : undefined} className={`${menuLink} aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8`}>
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <hr className="mx-8 my-6 border-neutral-200 dark:border-neutral-800" />

        <div className="px-8">
          <p className="flex items-center gap-2 text-xs tracking-wide text-neutral-400">
            <GlobeIcon size={13} />
            {t('language')}
          </p>
          <ul className="mt-3 flex gap-2">
            {routing.locales.map((l) => {
              const current = l === locale;
              const base = 'flex h-9 min-w-12 items-center justify-center rounded-full border px-3 text-xs font-medium';
              return (
                <li key={l}>
                  {!current ? (
                    <Link
                      href={pathname}
                      locale={l}
                      onClick={close}
                      className={`${base} border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white`}
                    >
                      {l.toUpperCase()}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-current="true"
                      className={`${base} border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900`}
                    >
                      {l.toUpperCase()}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-7 text-xs tracking-wide text-neutral-400">{t('theme')}</p>
          {/* active state comes from the `dark` class via CSS, so it's right before hydration too */}
          <div className="mt-3 inline-flex rounded-full border border-neutral-300 p-1 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className="h-8 rounded-full bg-neutral-900 px-4 text-xs font-medium text-white dark:bg-transparent dark:text-neutral-500"
            >
              {t('light')}
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className="h-8 rounded-full px-4 text-xs font-medium text-neutral-400 dark:bg-white dark:text-neutral-900"
            >
              {t('dark')}
            </button>
          </div>
        </div>

        {linkedin && (
        <div className="mt-auto px-8 pb-8">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
          >
            <LinkedInIcon size={18} />
          </a>
        </div>
        )}
      </aside>
    </div>
  );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('openMenu')}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100 sm:hidden dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {isClient && createPortal(drawer, document.body)}
    </>
  );
}
