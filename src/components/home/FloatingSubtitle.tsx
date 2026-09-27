'use client';
import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const RANGE = 16; // px of travel across the whole viewport (±8px from center)

// Idle float (outer, CSS) + mouse parallax (inner, JS). Both are off under reduced motion.
export default function FloatingSubtitle({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * RANGE;
        const y = (e.clientY / window.innerHeight - 0.5) * RANGE;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, [reduced]);

  return (
    <p className={`motion-safe:animate-float ${className}`}>
      <span ref={ref} className="inline-block transition-transform duration-300 ease-out">
        {text}
      </span>
    </p>
  );
}
