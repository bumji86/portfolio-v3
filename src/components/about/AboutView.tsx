import { useTranslations } from 'next-intl';
import Header from '@/components/home/Header';
import Closing from '@/components/home/Closing';
import Footer from '@/components/home/Footer';
import { ModalProvider } from '@/components/home/ModalProvider';
import { contact } from '@/content/contact';
import { aboutLinks } from '@/content/about';
import AboutSectionNav from './AboutSectionNav';
import ResumeDocument from '@/components/resume/ResumeDocument';

const SECTIONS = ['career', 'education', 'awards', 'activities', 'military'] as const;

type Item = {
  period: string;
  org: string;
  role: string;
  desc?: string;
  linkLabel?: string;
  groups?: { heading: string; bullets: string[] }[];
};

// `blindBase` (e.g. "/p/<key>"): no-contact version for blind-hiring submissions.
export default function AboutView({ blindBase = null }: { blindBase?: string | null }) {
  const t = useTranslations('about');
  const blind = blindBase !== null;
  const info = blind ? null : contact;

  const sections = SECTIONS.map((id) => ({
    id,
    title: t(`sections.${id}.title`),
    sub: t(`sections.${id}.sub`),
    cols: t.raw(`sections.${id}.cols`) as [string, string],
    items: t.raw(`sections.${id}.items`) as Item[],
  }));

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <ModalProvider contact={info} resume={<ResumeDocument />}>
        <Header blindBase={blindBase} linkedin={info?.linkedin ?? null} />
        <main>
          <section className="mx-auto max-w-[1440px] px-5 pt-16 md:px-20 md:pt-24">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <h1 className="text-6xl leading-none font-bold tracking-tight md:text-[96px]">{t('hero.title')}</h1>
                <p className="mt-6 text-neutral-500 md:mt-10 dark:text-neutral-400">{t('hero.tagline')}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight md:text-[32px]">{t('hero.name')}</p>
                <p className="mt-5 text-[17px] leading-[1.9] text-neutral-700 md:text-lg dark:text-neutral-300">{t('hero.intro')}</p>
              </div>
            </div>
            <p className="mt-14 border-t border-neutral-200 pt-7 pb-14 text-[11px] font-semibold tracking-wide text-neutral-500 dark:border-neutral-800">
              {t('hero.label')}
            </p>
          </section>

          <AboutSectionNav label={t('nav.label')} items={sections.map(({ id, title, sub }) => ({ id, title, sub }))} />

          <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-20 md:pb-36">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                // leaves room for the sticky header + section nav when jumping to an anchor
                className="grid scroll-mt-36 gap-6 pt-14 md:scroll-mt-44 md:grid-cols-[3fr_7fr] md:gap-10 md:pt-16"
              >
                <div>
                  <h2 className="text-3xl font-bold tracking-tight md:text-[40px]">{s.title}</h2>
                  {s.sub && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{s.sub}</p>}
                </div>

                <div className="border-t border-neutral-900 dark:border-neutral-300">
                  <div className="hidden grid-cols-[13rem_1fr] gap-6 py-4 text-[11px] text-neutral-500 sm:grid">
                    <span>{s.cols[0]}</span>
                    <span>{s.cols[1]}</span>
                  </div>
                  {s.items.map((item, i) => {
                    const link = aboutLinks[s.id]?.[i];
                    return (
                      <article
                        key={i}
                        className="grid gap-2 border-b border-neutral-200 py-7 sm:grid-cols-[13rem_1fr] sm:gap-6 dark:border-neutral-800"
                      >
                        <p className="text-sm text-neutral-500 sm:pt-1.5 dark:text-neutral-400">{item.period}</p>
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight md:text-[26px]">{item.org}</h3>
                          <p className="mt-2 text-[15px] font-medium text-neutral-800 md:text-base dark:text-neutral-200">{item.role}</p>

                          {item.groups && (
                            <div className="mt-3 space-y-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                              {item.groups.map((g) => (
                                <div key={g.heading}>
                                  <p>{g.heading}</p>
                                  <ul>
                                    {g.bullets.map((b) => (
                                      // hanging indent so wrapped lines align after the dash
                                      <li key={b} className="pl-3 -indent-3">
                                        - {b}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.desc && <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{item.desc}</p>}
                          {link && item.linkLabel && (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-block text-sm text-neutral-600 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                            >
                              &gt; {item.linkLabel}
                            </a>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <Closing variant="about" blind={blind} email={info?.email} />
        </main>
        <Footer blind={blind} />
      </ModalProvider>
    </div>
  );
}
