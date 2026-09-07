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
      <section className="page-shell page-shell--narrow">
        <header className="surface-card resume-hero">
          <div>
            <h1 className="text-display-lg">{t('name')}</h1>
            <p className="text-body-sm" style={{ opacity: 0.65, marginTop: '8px' }}>{t('title')} · {t('location')}</p>
            <p className="text-body-sm resume-contact">
              <a href="mailto:lbj86@naver.com">lbj86@naver.com</a>{' · '}
              <a href="https://linkedin.com/in/beomjun-lee-1854501b1" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </div>
          <button className="btn-primary resume-download" type="button">{t('downloadPdf')}</button>
        </header>

        <div className="detail-content">
          <section className="surface-card resume-section resume-section--cream">
            <p className="text-eyebrow resume-section__label">{sections.summary}</p>
            <p className="text-body-sm resume-section__body">{t('summaryText')}</p>
          </section>

          <section className="surface-card resume-section resume-section--mint">
            <p className="text-eyebrow resume-section__label">{sections.highlights}</p>
            <div className="resume-highlights">
              {highlights.map((h, i) => <div key={i}><p className="resume-highlight__number">{h.num}</p><p className="text-caption resume-highlight__label">{h.label}</p></div>)}
            </div>
          </section>

          <section className="surface-card resume-section">
            <p className="text-eyebrow resume-section__label">{sections.competencies}</p>
            <div className="resume-chips">{competencies.map((c, i) => <span key={i} className="text-caption resume-chip">{c}</span>)}</div>
          </section>

          <section className="surface-card resume-section">
            <p className="text-eyebrow resume-section__label">{sections.experience}</p>
            <div>
              {experience.map((exp, i) => (
                <div className="resume-entry" key={i}>
                  <p className="text-body-sm resume-entry__company">{exp.company}</p>
                  <p className="text-caption resume-entry__period" style={{ margin: '4px 0 16px' }}>{exp.period}</p>
                  {exp.roles.map((role, j) => (
                    <div className="resume-role" key={j}>
                      <div className="resume-entry__meta"><p className="text-body-sm" style={{ fontWeight: 600 }}>{role.title}</p><p className="text-caption resume-entry__period">{role.period}</p></div>
                      <ul className="text-body-sm resume-bullets">{role.bullets.map((bullet, k) => <li key={k}>{bullet}</li>)}</ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card resume-section resume-section--cream">
            <p className="text-eyebrow resume-section__label">{sections.projects}</p>
            <div>{projects.map((project, i) => <div className="resume-entry" key={i}><div className="resume-entry__meta"><p className="text-body-sm" style={{ fontWeight: 600 }}>{project.title}</p><p className="text-caption resume-entry__period">{project.period}</p></div><ul className="text-body-sm resume-bullets">{project.bullets.map((bullet, k) => <li key={k}>{bullet}</li>)}</ul></div>)}</div>
          </section>

          <section className="surface-card resume-section">
            <p className="text-eyebrow resume-section__label">{sections.education}</p>
            <div>{education.map((item, i) => <div className="resume-entry" key={i}><p className="text-body-sm" style={{ fontWeight: 600 }}>{item.school}</p><p className="text-body-sm resume-section__body">{item.degree}</p><p className="text-caption resume-entry__period" style={{ marginTop: '6px' }}>{item.period}</p></div>)}</div>
          </section>

          <section className="surface-card resume-section resume-section--mint">
            <p className="text-eyebrow resume-section__label">{sections.languages}</p>
            <div className="resume-highlights">{languages.map((language, i) => <div key={i}><p className="text-body-sm" style={{ fontWeight: 600 }}>{language.lang}</p><p className="text-caption resume-highlight__label">{language.level}</p></div>)}</div>
          </section>
        </div>
      </section>
    </main>
  );
}
