import { useTranslations } from 'next-intl';
import Typewriter from './Typewriter';
import ContactButton from './ContactButton';
import ResumeButton from './ResumeButton';

// scales the label only, so the button box keeps its size and the pair doesn't shift
const growText = 'inline-block transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none';

// Home variant: Resume (opens the résumé modal) + Contact. About variant: Contact + email line.
// `blind` (no-contact version) drops Contact and the email; the home Resume button stays (the résumé has no contacts).
export default function Closing({
  blind = false,
  variant = 'home',
  email,
}: {
  blind?: boolean;
  variant?: 'home' | 'about';
  email?: string;
}) {
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
      {!blind && variant === 'about' && (
        <div className="mt-12 flex flex-col items-center gap-5">
          <ContactButton className="group rounded-full border border-white bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-80">
            <span className={growText}>{t('contact')}</span>
          </ContactButton>
          {email && (
            <a href={`mailto:${email}`} className="text-sm text-white/80 hover:text-white hover:underline">
              {email}
            </a>
          )}
        </div>
      )}
      {variant === 'home' && (
      <div className="mt-12 flex justify-center gap-4">
        <ResumeButton className="group rounded-full border border-white bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-80">
          <span className={growText}>{t('resume')}</span>
        </ResumeButton>
        {!blind && (
          <ContactButton className="group rounded-full border border-white px-8 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-neutral-900">
            <span className={growText}>{t('contact')}</span>
          </ContactButton>
        )}
      </div>
      )}
    </section>
  );
}
