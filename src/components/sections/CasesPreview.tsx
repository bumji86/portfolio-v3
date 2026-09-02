'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function CasesPreview() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const items = t.raw('items') as {
    slug: string;
    tag: string;
    title: string;
    desc: string;
    resultNum: string;
    resultLabel: string;
  }[];

  return (
    <section className="px-10 py-16 border-b border-gray-100">
      <div className="flex justify-between items-center mb-10">
        <p className="text-xs tracking-widest text-gray-300 uppercase">{t('label')}</p>
        <Link
          href={`/${locale}/cases`}
          className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
        >
          {t('viewAll')} →
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-px bg-gray-100">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/${locale}/cases/${item.slug}`}
            className="bg-white p-8 group hover:bg-gray-50 transition-colors"
          >
            <p className="text-xs tracking-widest text-gray-300 mb-5">{item.tag}</p>
            <h3 className="font-serif text-xl leading-snug tracking-tight mb-3 group-hover:text-gray-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="font-serif text-2xl tracking-tight">{item.resultNum}</div>
              <div className="text-xs text-gray-300 mt-0.5 tracking-wide">{item.resultLabel}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
