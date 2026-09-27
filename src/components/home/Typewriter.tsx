'use client';
import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type Props = {
  lines: string[];
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  speed?: number; // ms per typed character
  deleteSpeed?: number; // ms per erased character
  holdTime?: number; // ms the full text stays before erasing
  restartDelay?: number; // ms of empty pause before typing again
  startDelay?: number; // ms before the first run (ignored when startOnView)
  startOnView?: boolean; // start when scrolled into view instead of on mount
  loop?: boolean; // type → hold → erase → repeat
};

type Phase = 'idle' | 'typing' | 'holding' | 'deleting' | 'waiting';

export default function Typewriter({
  lines,
  as: Tag = 'p',
  className = '',
  speed = 110,
  deleteSpeed = 45,
  holdTime = 2500,
  restartDelay = 600,
  startDelay = 300,
  startOnView = false,
  loop = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);

  // Each line break counts as one step, giving a short pause between lines.
  const offsets: number[] = [];
  let total = 0;
  lines.forEach((line, i) => {
    offsets.push(total);
    total += line.length + (i < lines.length - 1 ? 1 : 0);
  });

  // Kick off the first run, on mount or once scrolled into view.
  useEffect(() => {
    if (reduced) return;
    if (!startOnView) {
      const id = setTimeout(() => setPhase('typing'), startDelay);
      return () => clearTimeout(id);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('typing');
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, startOnView, startDelay]);

  // One timer per step; the phase/count pair drives the whole cycle.
  useEffect(() => {
    if (reduced) return;
    let id: ReturnType<typeof setTimeout> | undefined;
    if (phase === 'typing') {
      id = count < total ? setTimeout(() => setCount((c) => c + 1), speed) : setTimeout(() => setPhase('holding'), 0);
    } else if (phase === 'holding' && loop) {
      id = setTimeout(() => setPhase('deleting'), holdTime);
    } else if (phase === 'deleting') {
      id = count > 0 ? setTimeout(() => setCount((c) => c - 1), deleteSpeed) : setTimeout(() => setPhase('waiting'), 0);
    } else if (phase === 'waiting') {
      id = setTimeout(() => setPhase('typing'), restartDelay);
    }
    return () => clearTimeout(id);
  }, [reduced, phase, count, total, loop, speed, deleteSpeed, holdTime, restartDelay]);

  // Reduced motion: show the full text once with a static cursor, no loop.
  const shown = reduced ? total : count;
  const moving = !reduced && (phase === 'typing' || phase === 'deleting');
  const cursorLine = offsets.findLastIndex((o) => o <= shown);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, i) => {
        const typed = Math.max(0, Math.min(line.length, shown - offsets[i]));
        return (
          <span key={i} aria-hidden className="block">
            {line.slice(0, typed)}
            {i === cursorLine && <Cursor blink={!moving && !reduced} />}
            {/* untyped text keeps its space so the layout never shifts */}
            <span className="invisible">{line.slice(typed)}</span>
          </span>
        );
      })}
    </Tag>
  );
}

// Zero-width wrapper so the cursor never pushes centered text sideways.
function Cursor({ blink }: { blink: boolean }) {
  return (
    <span className="relative inline-block h-[0.9em] w-0 align-[-0.08em]">
      <span className={`absolute left-[0.06em] top-0 h-full w-[0.06em] min-w-[2px] bg-current ${blink ? 'animate-blink' : ''}`} />
    </span>
  );
}
