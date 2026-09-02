'use client';
import { useTranslations } from 'next-intl';

export default function WhenYouNeedMe() {
  const t = useTranslations('when');
  const items = t.raw('items') as string[];

  return (
    <section className="px-10 py-16 border-b border-gray-100">
      <p className="text-xs tracking-widest text-gray-300 mb-10 uppercase">{t('label')}</p>
      <div className="flex flex-col gap-5 max-w-xl">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 shrink-0" />
            <p className="text-sm text-gray-500 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
