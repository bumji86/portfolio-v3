// Outlined pill for use on top of the dark card overlay.
export default function Tag({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`inline-block rounded-full border border-white/60 text-white ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs tracking-wide'
      }`}
    >
      {children}
    </span>
  );
}
