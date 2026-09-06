'use client';
import { useTranslations } from 'next-intl';

export default function Highlights() {
  const t = useTranslations('highlights');
  const items = t.raw('items') as { num: string; label: string }[];

  return (
    <div className="flex border-t border-b border-gray-100 mx-10">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex-1 py-7 pl-8 ${i < items.length - 1 ? 'border-r border-gray-100' : ''}`}
        >
          <div className="font-serif text-3xl tracking-tight mb-1">{item.num}</div>
          <div className="text-xs text-gray-400 tracking-wide">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
