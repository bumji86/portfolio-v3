'use client';
import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const MIN_SCALE = 0.9; // frame size at the end of the effect
const RADIUS = 30; // px, visual corner radius at the end
const DISTANCE = 0.6; // scroll distance of the effect, as a fraction of the hero height

// Shrinks and rounds the hero frame as the page scrolls. The frame scales from its top edge and
// is pushed down by exactly the height it loses, so its bottom edge — and the gap to the next
// section — stays put: no empty space at rest, and the hero drifts up a bit slower than the page.
// Styles are written directly in a rAF so scrolling never re-renders React.
export default function HeroScroll({ children }: { children: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    if (reduced) {
      f.style.transform = '';
      f.style.borderRadius = '';
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const h = f.offsetHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * DISTANCE)));
      const scale = 1 - (1 - MIN_SCALE) * p;
      f.style.transform = `translate3d(0, ${h * (1 - scale)}px, 0) scale(${scale})`;
      // radius is scaled along with the frame, so divide to keep the visual radius exact
      f.style.borderRadius = `${(RADIUS * p) / scale}px`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    // mask-image makes Safari clip the video to the rounded corners while transformed
    <div
      ref={frame}
      className="relative isolate flex h-[clamp(360px,32vw,480px)] origin-top items-center justify-center overflow-hidden bg-neutral-900 will-change-transform [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
    >
      {children}
    </div>
  );
}
