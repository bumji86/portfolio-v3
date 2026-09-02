import { useTranslations } from 'next-intl';
import Nav from '@/components/layout/Nav';
import Hero from '@/components/sections/Hero';
import Highlights from '@/components/sections/Highlights';
import WhenYouNeedMe from '@/components/sections/WhenYouNeedMe';
import CasesPreview from '@/components/sections/CasesPreview';
import BeyondDesk from '@/components/sections/BeyondDesk';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Highlights />
      <WhenYouNeedMe />
      <CasesPreview />
      <BeyondDesk />
      <Contact />
    </main>
  );
}
