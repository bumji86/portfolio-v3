'use client';
import { useLocale, useTranslations } from 'next-intl';

// Pre-generated PDFs live in public/pdf (regenerate with `npm run resume:pdf` after editing the résumé copy).
export default function DownloadPdfLink({ className = '' }: { className?: string }) {
  const t = useTranslations('cv');
  const locale = useLocale();
  return (
    <a
      href={`/pdf/resume-${locale}.pdf`}
      download={`LeeBeomjun_Resume_${locale.toUpperCase()}.pdf`}
      className={`inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-neutral-900 ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" />
      </svg>
      {t('downloadPdf')}
    </a>
  );
}
