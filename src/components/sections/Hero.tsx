'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="px-10 pt-20 pb-18 max-w-3xl">
      <p className="text-xs tracking-widest text-gray-300 mb-6 uppercase">
        Growth · Data · Creator
      </p>
      <h1 className="font-serif text-5xl leading-tight tracking-tight mb-4">
        {t('line1')}
        <br />
        {t('line2')}
      </h1>
      <p className="text-base text-gray-500 leading-relaxed max-w-lg">
        {t('sub')}
      </p>
    </section>
  );
}
