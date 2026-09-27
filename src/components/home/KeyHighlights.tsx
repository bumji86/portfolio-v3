import { useTranslations } from 'next-intl';
import { highlights } from '@/content/home';
import OverlayCard from './OverlayCard';

export default function KeyHighlights() {
  const t = useTranslations('home.highlights');

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 md:px-20 md:pt-24">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('title')}</h2>

      <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-8">
        {highlights.map(({ id, image }) => (
          <OverlayCard
            key={id}
            image={image}
            title={t(`items.${id}.title`)}
            desc={t(`items.${id}.desc`)}
            tags={t.raw(`items.${id}.tags`) as string[]}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[10/7] rounded-md"
          />
        ))}
      </div>
    </section>
  );
}
