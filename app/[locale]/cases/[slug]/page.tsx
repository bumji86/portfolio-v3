import Nav from '@/components/layout/Nav';
import { getTranslations, getLocale } from 'next-intl/server';
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
  const locale = await getLocale();
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
      <article className="px-10 py-16 max-w-3xl">
        <p className="text-xs tracking-widest text-gray-300 mb-6">{item.tag}</p>
        <h1 className="font-serif text-4xl leading-tight tracking-tight mb-16">{item.title}</h1>

        <div className="flex flex-col gap-12">
          {sections.map((s) => (
            <div key={s.label} className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <p className="text-xs tracking-widest text-gray-300 pt-1">{s.label}</p>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <p className="text-xs tracking-widest text-gray-300 pt-1">APPROACH</p>
            </div>
            <div className="col-span-3">
              {item.approach.intro && (
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.approach.intro}</p>
              )}
              <div className="flex flex-col gap-5">
                {item.approach.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-xs text-gray-300 pt-0.5 shrink-0">0{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{step.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {item.approach.outro && (
                <p className="text-sm text-gray-600 leading-relaxed mt-6">{item.approach.outro}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <p className="text-xs tracking-widest text-gray-300 pt-1">RESULT</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm text-gray-600 leading-relaxed">{item.result}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10 grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <p className="text-xs tracking-widest text-gray-300 pt-1">LESSON</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.lesson}</p>
              <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-gray-100 pl-4">
                {item.improvement}
              </p>
            </div>
          </div>
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
