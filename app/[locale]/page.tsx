import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import KeyHighlights from '@/components/home/KeyHighlights';
import Works from '@/components/home/Works';
import BrandCollaborations from '@/components/home/BrandCollaborations';
import DiscoverByTag from '@/components/home/DiscoverByTag';
import Closing from '@/components/home/Closing';
import Footer from '@/components/home/Footer';
import { ModalProvider } from '@/components/home/ModalProvider';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <ModalProvider>
      <Header />
      <main>
        <Hero />
        <KeyHighlights />
        <Works />
        <BrandCollaborations />
        <DiscoverByTag />
        <Closing />
      </main>
      <Footer />
      </ModalProvider>
    </div>
  );
}
