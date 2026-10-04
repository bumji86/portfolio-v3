import Header from './Header';
import Hero from './Hero';
import KeyHighlights from './KeyHighlights';
import Works from './Works';
import BrandCollaborations from './BrandCollaborations';
import DiscoverByTag from './DiscoverByTag';
import Closing from './Closing';
import Footer from './Footer';
import { ModalProvider } from './ModalProvider';
import { contact } from '@/content/contact';
import ResumeDocument from '@/components/resume/ResumeDocument';

// The whole home page. `blindBase` (e.g. "/p/<key>") renders the no-contact version served at the
// secret URL (see app/[locale]/p/[key]/page.tsx); links then stay under that path.
export default function HomeView({ blindBase = null }: { blindBase?: string | null }) {
  const blind = blindBase !== null;
  const info = blind ? null : contact;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <ModalProvider contact={info} resume={<ResumeDocument />}>
        <Header blindBase={blindBase} linkedin={info?.linkedin ?? null} />
        <main>
          <Hero />
          <KeyHighlights />
          <Works />
          <BrandCollaborations />
          <DiscoverByTag />
          <Closing blind={blind} />
        </main>
        <Footer blind={blind} />
      </ModalProvider>
    </div>
  );
}
