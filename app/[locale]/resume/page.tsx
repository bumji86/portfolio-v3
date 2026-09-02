import Nav from '@/components/layout/Nav';
import { getTranslations } from 'next-intl/server';

type Role = { title: string; period: string; bullets: string[] };
type Experience = { company: string; companyFull: string; period: string; roles: Role[] };
type Project = { title: string; period: string; bullets: string[] };
type Education = { school: string; degree: string; period: string };
type Language = { lang: string; level: string };

export default async function ResumePage() {
  const t = await getTranslations('resume');
  const sections = t.raw('sections') as Record<string, string>;
  const competencies = t.raw('competencies') as string[];
  const experience = t.raw('experience') as Experience[];
  const projects = t.raw('projects') as Project[];
  const education = t.raw('education') as Education[];
  const languages = t.raw('languages') as Language[];
  const highlights = t.raw('highlights') as { num: string; label: string }[];

  return (
    <main>
      <Nav />
      <div className="px-10 py-16 max-w-4xl">
        <div className="flex justify-between items-start mb-16">
          <div>
            <h1 className="font-serif text-5xl tracking-tight mb-2">{t('name')}</h1>
            <p className="text-sm text-gray-400">{t('title')} · {t('location')}</p>
            <p className="text-sm text-gray-400 mt-1">
              <a href="mailto:lbj86@naver.com" className="hover:text-gray-900 transition-colors">lbj86@naver.com</a>
              {' · '}
              <a href="https://linkedin.com/in/beomjun-lee-1854501b1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
            </p>
          </div>
          <button className="text-xs text-gray-400 border border-gray-200 px-4 py-2 rounded hover:border-gray-400 hover:text-gray-900 transition-colors">
            {t('downloadPdf')}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-12 border-t border-gray-100 pt-10">
          <p className="text-xs tracking-widest text-gray-300 uppercase">{sections.summary}</p>
          <p className="col-span-3 text-sm text-gray-600 leading-relaxed">{t('summaryText')}</p>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-12 border-t border-gray-100 pt-10">
          <p className="text-xs tracking-widest text-gray-300 uppercase">{sections.highlights}</p>
          <div className="col-span-3 flex gap-8">
            {highlights.map((h, i) => (
              <div key={i}>
                <div className="font-serif text-2xl tracking-tight">{h.num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{h.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-12 border-t border-gray-100 pt-10">
          <p className="text-xs tracking-widest text-gray-300 uppercase">{sections.competencies}</p>
          <div className="col-span-3 flex flex-wrap gap-2">
            {competencies.map((c, i) => (
              <span key={i} className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-full">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 mb-2">
          <p className="text-xs tracking-widest text-gray-300 uppercase mb-8">{sections.experience}</p>
          {experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-4 gap-8 mb-10">
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
              </div>
              <div className="col-span-3">
                {exp.roles.map((role, j) => (
                  <div key={j} className={j > 0 ? 'mt-6 pt-6 border-t border-gray-50' : ''}>
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="text-sm font-medium text-gray-700">{role.title}</p>
                      <p className="text-xs text-gray-300">{role.period}</p>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {role.bullets.map((b, k) => (
                        <li key={k} className="text-xs text-gray-500 leading-relaxed flex gap-3">
                          <span className="text-gray-300 shrink-0">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-10 mb-2">
          <p className="text-xs tracking-widest text-gray-300 uppercase mb-8">{sections.projects}</p>
          {projects.map((p, i) => (
            <div key={i} className="grid grid-cols-4 gap-8 mb-8">
              <div className="col-span-1">
                <p className="text-xs text-gray-400">{p.period}</p>
              </div>
              <div className="col-span-3">
                <p className="text-sm font-medium text-gray-700 mb-2">{p.title}</p>
                <ul className="flex flex-col gap-1.5">
                  {p.bullets.map((b, k) => (
                    <li key={k} className="text-xs text-gray-500 leading-relaxed flex gap-3">
                      <span className="text-gray-300 shrink-0">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-10 grid grid-cols-4 gap-8 mb-10">
          <p className="text-xs tracking-widest text-gray-300 uppercase">{sections.education}</p>
          <div className="col-span-3">
            {education.map((e, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-gray-700">{e.school}</p>
                <p className="text-xs text-gray-400 mt-0.5">{e.degree}</p>
                <p className="text-xs text-gray-300 mt-0.5">{e.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 grid grid-cols-4 gap-8">
          <p className="text-xs tracking-widest text-gray-300 uppercase">{sections.languages}</p>
          <div className="col-span-3 flex gap-8">
            {languages.map((l, i) => (
              <div key={i}>
                <p className="text-sm text-gray-700">{l.lang}</p>
                <p className="text-xs text-gray-400 mt-0.5">{l.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
