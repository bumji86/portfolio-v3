import Nav from '@/components/layout/Nav';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Step = { title: string; desc: string };
type CaseItem = {
  slug: string;
  tag: string;
  title: string;
  context: string;
  problem: string;
  role: string;
  approach: { intro: string; steps: Step[]; outro: string };
  result: string;
  lesson: string;
  improvement: string;
};

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations('cases');
  const items = t.raw('items') as CaseItem[];
  const item = items.find((i) => i.slug === slug);

  if (!item) notFound();

  const sections = [
    { label: 'CONTEXT', content: item.context },
    { label: 'PROBLEM', content: item.problem },
    { label: 'MY ROLE', content: item.role },
  ];

  return (
    <main>
      <Nav />
      <article className="page-shell page-shell--narrow">
        <header className="surface-card detail-hero">
          <p className="text-eyebrow detail-hero__tag">{item.tag}</p>
          <h1 className="text-display-lg">{item.title}</h1>
        </header>

        <div className="detail-content">
          {sections.map((s) => (
            <section key={s.label} className="surface-card detail-section">
              <p className="text-eyebrow detail-section__label">{s.label}</p>
              <div>
                <p className="text-body-sm detail-section__body">{s.content}</p>
              </div>
            </section>
          ))}

          <section className="surface-card detail-section detail-section--accent">
            <p className="text-eyebrow detail-section__label">APPROACH</p>
            <div>
              {item.approach.intro && (
                <p className="text-body-sm detail-section__body" style={{ marginBottom: '24px' }}>{item.approach.intro}</p>
              )}
              <div>
                {item.approach.steps.map((step, i) => (
                  <div key={i} className="detail-step">
                    <span className="text-caption detail-step__number">0{i + 1}</span>
                    <div>
                      <p className="text-body-sm detail-step__title">{step.title}</p>
                      <p className="text-body-sm detail-section__body">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {item.approach.outro && (
                <p className="text-body-sm detail-section__body" style={{ marginTop: '24px' }}>{item.approach.outro}</p>
              )}
            </div>
          </section>

          <section className="surface-card detail-section">
            <p className="text-eyebrow detail-section__label">RESULT</p>
            <div>
              <p className="text-body-sm detail-section__body">{item.result}</p>
            </div>
          </section>

          <section className="surface-card detail-section">
            <p className="text-eyebrow detail-section__label">LESSON</p>
            <div>
              <p className="text-body-sm detail-section__body">{item.lesson}</p>
              <p className="text-body-sm detail-note">{item.improvement}</p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'creator-discovery' },
    { slug: 'itsub-crisis' },
    { slug: 'dashboard' },
  ];
}
