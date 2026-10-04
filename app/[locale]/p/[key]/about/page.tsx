import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AboutView from '@/components/about/AboutView';
import { requireBlindBase } from '@/lib/blind';

// No-contact version of the About page for blind-hiring submissions.
export const metadata: Metadata = {
  title: 'About — Beomjun Lee',
  robots: { index: false, follow: false },
};

export default async function BlindAboutPage({ params }: { params: Promise<{ locale: string; key: string }> }) {
  const { locale, key } = await params;
  const base = requireBlindBase(key);
  setRequestLocale(locale);
  return <AboutView blindBase={base} />;
}
