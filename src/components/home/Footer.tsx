import { useTranslations } from 'next-intl';
import { contact } from '@/content/contact';
import Logo from './Logo';
import { LinkedInIcon } from './icons';

// `blind`: no-contact version for blind-hiring submissions (logo + copyright only).
export default function Footer({ blind = false }: { blind?: boolean }) {
  const t = useTranslations('home.footer');

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-20 md:py-16">
        <Logo className="h-[19px]" />

        {!blind && (
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
        )}

        <p className="mt-6 text-[11px] text-neutral-400">{t('copyright')}</p>

        {!blind && (
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="mt-5 inline-block text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
        >
          <LinkedInIcon />
        </a>
        )}
      </div>
    </footer>
  );
}
