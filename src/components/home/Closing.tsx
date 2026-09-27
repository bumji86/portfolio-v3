import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Typewriter from './Typewriter';
import ContactButton from './ContactButton';

// scales the label only, so the button box keeps its size and the pair doesn't shift
const growText = 'inline-block transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none';

export default function Closing() {
  const t = useTranslations('home.closing');

  return (
    <section className="bg-neutral-950 px-5 py-28 text-center text-white md:py-36 dark:bg-black">
      <Typewriter
        lines={[t('line1'), t('line2')]}
        startOnView
        speed={55}
        deleteSpeed={25}
        className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
      />
      <div className="mt-12 flex justify-center gap-4">
        <Link
          href="/resume"
          className="group rounded-full border border-white bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-80"
        >
          <span className={growText}>{t('resume')}</span>
        </Link>
        <ContactButton className="group rounded-full border border-white px-8 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-neutral-900">
          <span className={growText}>{t('contact')}</span>
        </ContactButton>
      </div>
    </section>
  );
}
