import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AboutView from '@/components/about/AboutView';

export const metadata: Metadata = {
  title: 'About — Beomjun Lee',
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);
  return <AboutView />;
}
