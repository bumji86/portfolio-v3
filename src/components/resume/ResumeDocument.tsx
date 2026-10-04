import { useTranslations } from 'next-intl';
import { works } from '@/content/home';

// Résumé built from the About copy + project results. Deliberately contains NO contact details,
// so the same document (modal, /resume page and the generated PDF) is safe for blind submissions.
// Laid out to print on A4 (see `print:` variants and @page in app/globals.css).

type Item = {
  period: string;
  org: string;
  role: string;
  desc?: string;
  groups?: { heading: string; bullets: string[] }[];
};

const MINOR = ['education', 'awards', 'activities', 'military'] as const;

export default function ResumeDocument() {
  const about = useTranslations('about');
  const cv = useTranslations('cv');
  const home = useTranslations('home');

  const career = about.raw('sections.career.items') as Item[];
  const results = cv.raw('keyResults.items') as { value: string; label: string }[];
  const skills = [...new Set([...(home.raw('tags.row1') as string[]), ...(home.raw('tags.row2') as string[])])];

  return (
    <article className="mx-auto max-w-[820px] px-6 pt-12 pb-14 text-neutral-900 md:px-12 dark:text-neutral-100 print:max-w-none print:p-0 print:text-neutral-900">
      <header className="border-b border-neutral-900 pb-6 print:pb-4 dark:border-neutral-300 print:border-neutral-900">
        <h1 id="resume-title" className="text-3xl font-bold tracking-tight md:text-4xl">{about('hero.name')}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {cv('role')} · {about('hero.tagline')}
        </p>
        <p className="mt-4 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300 print:text-neutral-700">{about('hero.intro')}</p>
      </header>

      <Section title={cv('keyResults.title')} sub={cv('keyResults.sub')} keep>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-3 print:grid-cols-3 print:gap-y-3">
          {results.map((r) => (
            <li key={r.value} className="break-inside-avoid">
              <p className="text-2xl font-bold tracking-tight">{r.value}</p>
              <p className="mt-1 text-[13px] leading-6 text-neutral-600 dark:text-neutral-400 print:text-neutral-600">{r.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={about('sections.career.title')} sub={about('sections.career.sub')}>
        <div className="space-y-7 print:space-y-4">
          {career.map((c) => (
            <div key={c.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold tracking-tight">{c.org}</h3>
                <p className="text-[13px] text-neutral-500">{c.period}</p>
              </div>
              <p className="mt-0.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 print:text-neutral-700">{c.role}</p>
              <div className="mt-2.5 space-y-3 text-[13px] leading-6 print:mt-1.5 print:space-y-1.5 print:text-[12px] print:leading-[1.55] text-neutral-600 dark:text-neutral-400 print:text-neutral-600">
                {c.groups?.map((g) => (
                  <div key={g.heading} className="break-inside-avoid">
                    <p className="font-medium text-neutral-800 dark:text-neutral-200 print:text-neutral-800">{g.heading}</p>
                    <ul>
                      {g.bullets.map((b) => (
                        <li key={b} className="pl-3 -indent-3">
                          - {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={cv('projects.title')} sub={cv('projects.sub')}>
        <ul className="space-y-3 print:space-y-1.5">
          {works.map(({ id }) => (
            <li key={id} className="break-inside-avoid text-[13px] leading-6 print:text-[12px] print:leading-[1.55]">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">{home(`works.items.${id}.title`)}</span>
              <span className="text-neutral-400"> — </span>
              <span className="text-neutral-600 dark:text-neutral-400 print:text-neutral-600">{home(`works.items.${id}.summary`)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {MINOR.map((id) => (
        <Section key={id} title={about(`sections.${id}.title`)} sub={about(`sections.${id}.sub`)} keep>
          <ul className="space-y-3 print:space-y-1.5">
            {(about.raw(`sections.${id}.items`) as Item[]).map((it) => (
              <li key={it.org} className="grid break-inside-avoid gap-x-6 text-[13px] leading-6 sm:grid-cols-[9rem_1fr] print:grid-cols-[9rem_1fr] print:text-[12px] print:leading-[1.55]">
                <span className="text-neutral-500">{it.period}</span>
                <span>
                  <span className="font-semibold">{it.org}</span>
                  <span className="text-neutral-600 dark:text-neutral-400 print:text-neutral-600"> · {it.role}</span>
                  {it.desc && <span className="block text-neutral-600 dark:text-neutral-400 print:text-neutral-600">{it.desc}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title={cv('skills.title')} sub={cv('skills.sub')} keep>
        <p className="text-[13px] leading-6 text-neutral-700 dark:text-neutral-300 print:text-neutral-700">{skills.join(' · ')}</p>
      </Section>
    </article>
  );
}

// `keep`: never split this (short) section across pages, so its heading can't be orphaned.
function Section({ title, sub, keep = false, children }: { title: string; sub: string; keep?: boolean; children: React.ReactNode }) {
  return (
    <section className={`mt-9 print:mt-5 ${keep ? 'break-inside-avoid' : ''}`}>
      <h2 className="mb-4 flex items-baseline gap-2 break-after-avoid border-b border-neutral-200 pb-2 text-[13px] font-bold tracking-[0.12em] uppercase dark:border-neutral-800 print:border-neutral-200">
        {title}
        {sub && <span className="text-[11px] font-normal tracking-normal text-neutral-400 normal-case">{sub}</span>}
      </h2>
      {children}
    </section>
  );
}
