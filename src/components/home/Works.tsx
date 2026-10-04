'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { works } from '@/content/home';
import OverlayCard from './OverlayCard';

export default function Works() {
  const t = useTranslations('home.works');
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  // Track whether the carousel can move each way, so the arrows disable at the ends
  // (and both stay disabled while every card fits on screen).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  // One "page" = the visible width, so each click reveals the next set of cards.
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id="works" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 pt-24 md:px-20 md:pt-36">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('title')}</h2>
        <div className="flex gap-2">
          <ArrowButton label={t('prev')} onClick={() => scroll(-1)} disabled={edges.start} flip />
          <ArrowButton label={t('next')} onClick={() => scroll(1)} disabled={edges.end} />
        </div>
      </div>

      <div
        ref={track}
        className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-14 md:gap-8 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {works.map(({ id, image, cover, cardFit, media, builtWith, toolLinks }) => (
          <div key={id} className="w-[60%] shrink-0 snap-start sm:w-[calc((100%-2*1.25rem)/3)] md:w-[calc((100%-4*2rem)/5)]">
            <OverlayCard
              image={image}
              title={t(`items.${id}.title`)}
              tags={t.raw(`items.${id}.tags`) as string[]}
              sizes="(min-width: 768px) 20vw, 60vw"
              size="sm"
              className="aspect-[7/10] rounded-sm"
              modal={{
                desc: t(`items.${id}.summary`),
                body: t.raw(`items.${id}.body`) as string[],
                image: cover ?? image,
                media,
                builtWith,
                tools: t.has(`items.${id}.tools`)
                  ? (t.raw(`items.${id}.tools`) as { name: string; desc: string }[]).map((tool, i) => ({
                      ...tool,
                      link: toolLinks?.[i] ?? undefined,
                    }))
                  : undefined,
              }}
              fit={cardFit}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, disabled, flip }: { label: string; onClick: () => void; disabled: boolean; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-900 transition-colors enabled:hover:bg-neutral-900 enabled:hover:text-white disabled:cursor-default disabled:opacity-25 dark:border-neutral-200 dark:enabled:hover:bg-white dark:enabled:hover:text-neutral-900"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={flip ? 'rotate-180' : ''}>
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
