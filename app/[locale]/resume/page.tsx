import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ResumeDocument from '@/components/resume/ResumeDocument';
import DownloadPdfLink from '@/components/resume/DownloadPdfLink';

// Standalone résumé (no contact details). Also the source for the PDFs: `npm run resume:pdf`
// prints this page to public/pdf/resume-<locale>.pdf.
export const metadata: Metadata = {
  title: 'Résumé — Beomjun Lee',
};

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 print:bg-white">
      <div className="mx-auto flex max-w-[820px] justify-end px-6 pt-8 md:px-12 print:hidden">
        <DownloadPdfLink />
      </div>
      <ResumeDocument />
    </div>
  );
}
