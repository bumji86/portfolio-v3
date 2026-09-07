'use client';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section style={{
      background: 'var(--color-block-navy)',
      borderRadius: 'var(--radius-lg)',
      margin: '0 40px 96px',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '80px 64px',
      color: 'var(--color-inverse-ink)',
    }}>
      <p className="text-eyebrow" style={{ marginBottom: '32px', opacity: 0.5, color: 'white' }}>
        {t('label')}
      </p>
      <h2 style={{
        fontSize: 'clamp(28px, 3.5vw, 48px)',
        fontWeight: 340, lineHeight: 1.1,
        letterSpacing: '-0.5px', marginBottom: '40px',
        color: 'white',
      }}>
        {t('cta')}
      </h2>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <a href={`mailto:${t('email')}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'white', color: 'black',
          fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 480,
          padding: '14px 28px', borderRadius: 'var(--radius-pill)',
          textDecoration: 'none', transition: 'opacity 0.15s',
        }}>
          {t('email')}
        </a>
        <a href={`https://${t('linkedin')}`} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center',
          color: 'rgba(255,255,255,0.6)', fontSize: '16px',
          textDecoration: 'underline', textUnderlineOffset: '3px',
          padding: '14px 0',
        }}>
          LinkedIn →
        </a>
      </div>
    </section>
  );
}
