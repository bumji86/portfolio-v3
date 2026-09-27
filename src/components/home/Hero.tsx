import { useTranslations } from 'next-intl';
import { hero } from '@/content/home';
import HeroScroll from './HeroScroll';
import HeroVideo from './HeroVideo';
import Typewriter from './Typewriter';
import FloatingSubtitle from './FloatingSubtitle';

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section>
      <HeroScroll>
        {hero.video && <HeroVideo mp4={hero.video} webm={hero.webm} poster={hero.poster} />}

        {/* readability scrim — raise the opacity if the video gets brighter */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 px-5 text-center text-white">
          <Typewriter
            as="h1"
            lines={t.raw('title') as string[]}
            className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl"
          />
          <FloatingSubtitle text={t('subtitle')} className="mt-5 text-sm tracking-[0.2em] text-white/90" />
        </div>
      </HeroScroll>
    </section>
  );
}
