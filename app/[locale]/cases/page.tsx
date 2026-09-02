import { useTranslations } from 'next-intl';
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
      <section className="px-10 py-16">
        <p className="text-xs tracking-widest text-gray-300 mb-12 uppercase">{t('label')}</p>
        <div className="flex flex-col divide-y divide-gray-100">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/cases/${item.slug}`}
              className="py-10 grid grid-cols-12 gap-8 group hover:bg-gray-50 -mx-10 px-10 transition-colors"
            >
              <div className="col-span-1">
                <p className="text-xs text-gray-300">{item.tag.split('·')[0].trim()}</p>
              </div>
              <div className="col-span-7">
                <h2 className="font-serif text-2xl tracking-tight leading-snug mb-3 group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="col-span-4 text-right">
                <div className="font-serif text-3xl tracking-tight">{item.resultNum}</div>
                <div className="text-xs text-gray-300 mt-1">{item.resultLabel}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
