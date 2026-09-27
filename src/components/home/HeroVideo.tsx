'use client';
import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// Plays from JS instead of `autoPlay` so reduced-motion users never see it start;
// they get the poster (or first frame) instead.
export default function HeroVideo({ mp4, webm, poster }: { mp4: string; webm: string | null; poster: string | null }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) video.pause();
    else video.play().catch(() => {});
  }, [reduced]);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="auto"
      controlsList="nodownload"
      poster={poster ?? undefined}
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
