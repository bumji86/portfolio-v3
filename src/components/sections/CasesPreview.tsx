'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function CasesPreview() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const items = t.raw('items') as {
    slug: string; tag: string; title: string;
    desc: string; resultNum: string; resultLabel: string;
  }[];

  const blockColors = ['var(--color-block-lilac)', 'var(--color-block-coral)', 'var(--color-block-mint)'];

  return (
    <section style={{ padding: '0 40px 96px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: '40px',
      }}>
        <p className="text-eyebrow" style={{ opacity: 0.5 }}>{t('label')}</p>
        <Link href={`/${locale}/cases`} className="text-body-sm" style={{
          textDecoration: 'underline', textUnderlineOffset: '3px',
          color: 'var(--color-ink)',
        }}>
          {t('viewAll')} →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {items.map((item, i) => (
          <Link key={item.slug} href={`/${locale}/cases/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: blockColors[i],
              borderRadius: 'var(--radius-lg)',
              padding: '40px 36px',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            >
              <p className="text-eyebrow" style={{ opacity: 0.5, marginBottom: '20px' }}>{item.tag}</p>
              <h3 style={{
                fontSize: '22px', fontWeight: 600, lineHeight: 1.25,
                letterSpacing: '-0.3px', marginBottom: '12px',
              }}>
                {item.title}
              </h3>
              <p className="text-body-sm" style={{ opacity: 0.65, marginBottom: '32px' }}>{item.desc}</p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)', paddingTop: '24px' }}>
                <div style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.5px' }}>{item.resultNum}</div>
                <div className="text-caption" style={{ opacity: 0.5, marginTop: '4px' }}>{item.resultLabel}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
