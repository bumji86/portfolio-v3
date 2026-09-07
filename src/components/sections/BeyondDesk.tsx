'use client';
import { useTranslations } from 'next-intl';

export default function BeyondDesk() {
  const t = useTranslations('beyond');
  const items = t.raw('items') as { location: string; desc: string }[];

  return (
    <section style={{
      background: 'var(--color-block-cream)',
      borderRadius: 'var(--radius-lg)',
      margin: '0 40px 96px',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '64px 64px',
    }}>
      <p className="text-eyebrow" style={{ marginBottom: '48px', opacity: 0.6 }}>{t('label')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {items.map((item, i) => (
            <div key={i}>
              <p className="text-eyebrow" style={{ opacity: 0.4, marginBottom: '8px' }}>{item.location}</p>
              <p className="text-body" style={{ opacity: 0.8 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            background: 'rgba(0,0,0,0.08)', borderRadius: 'var(--radius-md)',
            height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p className="text-caption" style={{ opacity: 0.4 }}>Paris 2024 photo</p>
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.08)', borderRadius: 'var(--radius-md)',
            height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p className="text-caption" style={{ opacity: 0.4 }}>Hangzhou 2024 photo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
