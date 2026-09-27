import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { brands } from '@/content/home';

export default function BrandCollaborations() {
  const t = useTranslations('home.brands');

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-20 md:px-20">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('title')}</h2>

      <ul className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 md:mt-14 md:grid-cols-6">
        {brands.map(({ name, logo }) => (
          <li key={name} className="flex h-8 items-center justify-center">
            {logo ? (
              // fixed box + object-contain keeps wide and stacked logos at a similar visual size
              <span className="relative block h-full w-full max-w-[120px] transition-transform duration-300 ease-out hover:scale-115 motion-reduce:transition-none">
                <Image src={logo} alt={name} fill sizes="120px" className="object-contain dark:brightness-0 dark:invert" />
              </span>
            ) : (
              <span className="text-lg font-bold text-neutral-400 dark:text-neutral-500">{name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
