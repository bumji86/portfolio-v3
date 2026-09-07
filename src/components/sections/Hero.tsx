'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section style={{
      background: 'var(--color-canvas)',
      padding: '64px 40px 0',
      minHeight: 'calc(100vh - 56px)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'flex-end',
      gap: '48px',
      maxWidth: '1280px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Left — text */}
      <div style={{ paddingBottom: '80px' }}>
        {/* Eyebrow */}
        <p className="text-eyebrow" style={{
          color: 'var(--color-ink)', opacity: 0.4,
          marginBottom: '32px', letterSpacing: '2px',
        }}>
          GROWTH · DATA · CREATOR
        </p>

        {/* Hero headline */}
        <h1 className="text-display-xl" style={{ marginBottom: '28px' }}>
          {t('line1')}<br />{t('line2')}
        </h1>

        {/* Subtext */}
        <p className="text-body-lg" style={{
          maxWidth: '440px',
          marginBottom: '48px',
          opacity: 0.65,
        }}>
          {t('sub')}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href={`/${locale}/cases`} className="btn-primary">
            View cases →
          </Link>
          <Link href={`/${locale}/resume`} className="btn-secondary">
            Read resume
          </Link>
        </div>
      </div>

      {/* Right — character */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
        {/* Hand-drawn annotation — "IDEA..." */}
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '40px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '1px',
          border: '1.5px solid var(--color-ink)',
          borderRadius: '4px',
          padding: '5px 10px',
          background: 'var(--color-canvas)',
        }}>
          IDEA...
        </div>

        {/* Hand-drawn annotation — bottom right */}
        <div style={{
          position: 'absolute',
          bottom: '120px',
          right: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '1.5px',
          lineHeight: 1.6,
          textAlign: 'right',
          opacity: 0.5,
          textTransform: 'uppercase',
        }}>
          SAME CURIOSITY<br />DIFFERENT<br />QUESTIONS.
        </div>

        {/* Sparkle */}
        <div style={{
          position: 'absolute',
          top: '48%',
          left: '8px',
          fontSize: '20px',
          opacity: 0.4,
        }}>✦</div>

        {/* Character image */}
        <Image
          src="/character.png"
          alt="Bumji character"
          width={480}
          height={480}
          className="pixelated"
          style={{
            width: '100%',
            maxWidth: '480px',
            height: 'auto',
            objectFit: 'contain',
          }}
          priority
        />
      </div>
    </section>
  );
}
