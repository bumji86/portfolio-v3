'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const locales = ['en', 'ko', 'zh'] as const;

export default function Nav() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-hairline)',
      height: '56px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      <Link href={`/${locale}`} style={{
        fontWeight: 700, fontSize: '18px',
        letterSpacing: '-0.5px', textDecoration: 'none', color: 'var(--color-ink)'
      }}>
        BJ.
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {[
          { label: 'WORK', href: `/${locale}/cases` },
          { label: 'ABOUT', href: `/${locale}` },
          { label: 'CONTACT', href: `/${locale}/contact` },
        ].map(({ label, href }) => (
          <Link key={label} href={href} className="text-body-sm" style={{
            padding: '6px 12px', textDecoration: 'none', color: 'var(--color-ink)',
            borderRadius: 'var(--radius-full)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-soft)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {label}
          </Link>
        ))}

        {/* Locale switcher */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: '16px' }}>
          {locales.map((l) => (
            <Link key={l} href={getLocalePath(l)} style={{
              fontSize: '12px', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.5px', textTransform: 'uppercase',
              padding: '4px 8px', borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              color: l === locale ? 'var(--color-canvas)' : 'var(--color-ink)',
              background: l === locale ? 'var(--color-ink)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {l}
            </Link>
          ))}
        </div>

        <Link href={`/${locale}/cases`} className="btn-primary" style={{ marginLeft: '16px', fontSize: '14px', padding: '10px 20px' }}>
          VIEW CASES
        </Link>
      </div>
    </nav>
  );
}
