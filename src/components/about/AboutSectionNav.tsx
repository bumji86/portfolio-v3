'use client';
import { useEffect, useState } from 'react';

// Sticky in-page nav under the header; highlights the section currently in view.
export default function AboutSectionNav({ label, items }: { label: string; items: { id: string; title: string; sub: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    // a section counts as "current" once its top passes ~40% of the viewport
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[calc(env(safe-area-inset-top,0px)+4rem)] z-40 border-y border-neutral-200 bg-white/95 backdrop-blur md:top-[calc(env(safe-area-inset-top,0px)+5rem)] dark:border-neutral-800 dark:bg-neutral-950/95"
    >
      <ul className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-5 [scrollbar-width:none] md:gap-10 md:px-20 [&::-webkit-scrollbar]:hidden">
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'location' : undefined}
              className={`flex items-baseline gap-2 border-b-2 py-4 text-sm font-semibold transition-colors ${
                active === i.id
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {i.title}
              {i.sub && <span className="text-[11px] font-normal text-neutral-400">{i.sub}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
