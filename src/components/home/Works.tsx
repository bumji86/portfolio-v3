'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { works } from '@/content/home';
import OverlayCard from './OverlayCard';

export default function Works() {
  const t = useTranslations('home.works');
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="works" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 pt-24 md:px-20 md:pt-36">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('title')}</h2>
        <div className="flex gap-2">
          <ArrowButton label={t('prev')} onClick={() => scroll(-1)} flip />
          <ArrowButton label={t('next')} onClick={() => scroll(1)} />
        </div>
      </div>

      <div
        ref={track}
        className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-14 md:gap-8 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {works.map(({ id, image, href }) => {
          const card = (
            <OverlayCard
              image={image}
              title={t(`items.${id}.title`)}
              tags={t.raw(`items.${id}.tags`) as string[]}
              sizes="(min-width: 768px) 20vw, 60vw"
              size="sm"
              className="aspect-[7/10] rounded-sm"
            />
          );
          const cls = 'w-[60%] shrink-0 snap-start sm:w-[calc((100%-2*1.25rem)/3)] md:w-[calc((100%-4*2rem)/5)]';
          return href ? (
            <Link key={id} href={href} className={cls}>
              {card}
            </Link>
          ) : (
            <article key={id} className={cls}>
              {card}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-200 dark:hover:bg-white dark:hover:text-neutral-900"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={flip ? 'rotate-180' : ''}>
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
