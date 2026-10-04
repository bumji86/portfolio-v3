import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomeView from '@/components/home/HomeView';
import { requireBlindBase } from '@/lib/blind';

// No-contact version of the home page for blind-hiring submissions.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function BlindHomePage({ params }: { params: Promise<{ locale: string; key: string }> }) {
  const { locale, key } = await params;
  const base = requireBlindBase(key);
  setRequestLocale(locale);
  return <HomeView blindBase={base} />;
}
