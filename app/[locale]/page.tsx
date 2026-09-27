import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import KeyHighlights from '@/components/home/KeyHighlights';
import Works from '@/components/home/Works';
import BrandCollaborations from '@/components/home/BrandCollaborations';
import DiscoverByTag from '@/components/home/DiscoverByTag';
import Closing from '@/components/home/Closing';
import Footer from '@/components/home/Footer';
import { ProjectModalProvider } from '@/components/home/ProjectModal';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header />
      <ProjectModalProvider>
      <main>
        <Hero />
        <KeyHighlights />
        <Works />
        <BrandCollaborations />
        <DiscoverByTag />
        <Closing />
      </main>
      </ProjectModalProvider>
      <Footer />
    </div>
  );
}
