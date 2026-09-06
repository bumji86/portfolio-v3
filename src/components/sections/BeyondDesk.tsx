'use client';
import { useTranslations } from 'next-intl';

export default function BeyondDesk() {
  const t = useTranslations('beyond');
  const items = t.raw('items') as { location: string; desc: string }[];

  return (
    <section className="px-10 py-16 border-b border-gray-100 grid grid-cols-2 gap-12 items-start">
      <div>
        <p className="text-xs tracking-widest text-gray-300 mb-10 uppercase">{t('label')}</p>
        {items.map((item, i) => (
          <div key={i} className="mb-7">
            <p className="text-xs tracking-widest text-gray-300 mb-1.5">{item.location}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-gray-50 border border-gray-100 rounded h-48 flex items-center justify-center text-xs text-gray-300">
          Paris photo
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded h-48 flex items-center justify-center text-xs text-gray-300">
          Hangzhou photo
        </div>
      </div>
    </section>
  );
}
