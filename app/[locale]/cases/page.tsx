import Nav from '@/components/layout/Nav';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function CasesPage() {
  const t = await getTranslations('cases');
  const locale = await getLocale();
  const items = t.raw('items') as {
    slug: string;
    tag: string;
    title: string;
    desc: string;
    resultNum: string;
    resultLabel: string;
  }[];

  return (
    <main>
      <Nav />
      <section className="page-shell">
        <p className="text-eyebrow page-kicker">{t('label')}</p>
        <h1 className="text-display-lg page-heading">Selected work, measured in outcomes.</h1>
        <p className="text-body-lg page-intro">Growth, creator, and data projects built from a clear question through to a tangible result.</p>
        <div className="case-list">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/cases/${item.slug}`}
              className="surface-card case-card"
            >
              <p className="text-eyebrow case-card__tag">{item.tag}</p>
              <div>
                <h2 className="text-headline case-card__title">{item.title}</h2>
                <p className="text-body-sm case-card__description">{item.desc}</p>
              </div>
              <div className="case-card__result">
                <p className="case-card__number">{item.resultNum}</p>
                <p className="text-caption case-card__result-label">{item.resultLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
