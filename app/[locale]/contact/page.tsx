import Nav from '@/components/layout/Nav';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <main>
      <Nav />
      <section className="page-shell">
        <div className="surface-card contact-panel">
          <p className="text-eyebrow contact-panel__kicker">{t('label')}</p>
          <h1 className="text-display-lg contact-panel__heading">{t('cta')}</h1>
          <div className="contact-panel__links">
            <a href={`mailto:${t('email')}`} className="btn-primary">{t('email')} →</a>
            <a href={`https://${t('linkedin')}`} target="_blank" rel="noopener noreferrer" className="text-body-sm">LinkedIn →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
