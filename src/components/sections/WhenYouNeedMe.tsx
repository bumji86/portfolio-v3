'use client';
import { useTranslations } from 'next-intl';

export default function WhenYouNeedMe() {
  const t = useTranslations('when');
  const items = t.raw('items') as string[];

  return (
    <section style={{
      background: 'var(--color-block-lime)',
      borderRadius: 'var(--radius-lg)',
      margin: '96px 40px',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '64px 64px',
    }}>
      <p className="text-eyebrow" style={{ marginBottom: '40px', opacity: 0.6 }}>
        {t('label')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: '20px 0',
            borderBottom: i < items.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none',
            display: 'flex', gap: '20px', alignItems: 'flex-start',
          }}>
            <span className="text-caption" style={{ opacity: 0.4, paddingTop: '2px', minWidth: '24px' }}>
              0{i + 1}
            </span>
            <p className="text-headline" style={{ fontWeight: 340 }}>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
