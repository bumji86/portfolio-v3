import Nav from '@/components/layout/Nav';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <main>
      <Nav />
      <section className="px-10 py-24">
        <p className="text-xs tracking-widest text-gray-300 mb-10 uppercase">{t('label')}</p>
        <p className="font-serif text-4xl tracking-tight mb-12 max-w-lg leading-snug">{t('cta')}</p>
        <div className="flex flex-col gap-3">
          <a href={`mailto:${t('email')}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {t('email')}
          </a>
          <a href={`https://${t('linkedin')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {t('linkedin')}
          </a>
        </div>
      </section>
    </main>
  );
}
