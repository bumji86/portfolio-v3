'use client';
import { useTranslations } from 'next-intl';

export default function Highlights() {
  const t = useTranslations('highlights');
  const items = t.raw('items') as { num: string; label: string }[];

  return (
    <div style={{
      borderTop: '1px solid var(--color-hairline)',
      borderBottom: '1px solid var(--color-hairline)',
      display: 'flex',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          flex: 1,
          padding: '36px 40px',
          borderRight: i < items.length - 1 ? '1px solid var(--color-hairline)' : 'none',
        }}>
          <div className="text-display-lg" style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '4px' }}>
            {item.num}
          </div>
          <div className="text-caption" style={{ opacity: 0.5 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
