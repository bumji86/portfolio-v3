'use client';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section className="px-10 py-20">
      <p className="text-xs tracking-widest text-gray-300 mb-8 uppercase">{t('label')}</p>
      <p className="font-serif text-2xl tracking-tight mb-8 max-w-sm">{t('cta')}</p>
      <div className="flex flex-col gap-2">
        <a
          href={`mailto:${t('email')}`}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          {t('email')}
        </a>
        <a
          href={`https://${t('linkedin')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          {t('linkedin')}
        </a>
      </div>
    </section>
  );
}
