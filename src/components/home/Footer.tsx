import { useTranslations } from 'next-intl';
import { contact } from '@/content/home';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('home.footer');

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-20 md:py-16">
        <Logo className="h-[19px]" />

        <div className="mt-8 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <p>
            {t('kakao')}: {contact.kakao} | <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a> |{' '}
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </p>
          <p>
            {t('wechat')}: {contact.wechat}
          </p>
        </div>

        <p className="mt-6 text-[11px] text-neutral-400">{t('copyright')}</p>

        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="mt-5 inline-block text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
