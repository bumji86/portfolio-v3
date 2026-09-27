import { useTranslations } from 'next-intl';

// Each row's tag list is repeated this many times per set so one set is wider than any screen (~3,500px+).
const REPEAT = 4;
// Seconds per character of one set — keeps both rows moving at roughly the same px/s.
const SECONDS_PER_CHAR = 0.32;

export default function DiscoverByTag() {
  const t = useTranslations('home.tags');
  const rows = [t.raw('row1') as string[], t.raw('row2') as string[]];
  const unique = [...new Set(rows.flat())];

  return (
    <section className="pt-20 pb-12 md:pb-14">
      <h2 className="mx-auto max-w-[1440px] px-5 text-3xl font-semibold tracking-tight md:px-20 md:text-4xl">{t('title')}</h2>

      {/* screen readers get each tag once; the scrolling copies are decorative */}
      <ul className="sr-only">
        {unique.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div aria-hidden className="mt-8 flex flex-col gap-2.5 overflow-hidden">
        {rows.map((row, i) => {
          const set = Array.from({ length: REPEAT }, () => row).flat();
          const duration = set.join('').length * SECONDS_PER_CHAR;
          return (
            <div
              key={i}
              style={{ animationDuration: `${duration}s` }}
              className={`flex w-max hover:[animation-play-state:paused] ${i % 2 ? 'animate-marquee-reverse' : 'animate-marquee'}`}
            >
              {/* two identical sets, each with trailing padding equal to the gap, so -50% lands exactly on the seam */}
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 gap-3 pr-3">
                  {set.map((tag, j) => (
                    <li
                      key={j}
                      className="whitespace-nowrap rounded-full bg-neutral-900 px-3 py-0.5 text-base font-semibold text-white md:text-lg dark:bg-white dark:text-neutral-900"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
