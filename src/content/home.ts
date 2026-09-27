// Media paths and non-translated data for the home page.
// Put files under /public and set the path (e.g. '/images/works/cobranding.jpg').
// `null` renders a placeholder. Translatable text lives in messages/{locale}.json under `home`.

export const hero = {
  video: '/videos/hero.mp4' as string | null,
  webm: null as string | null, // optional smaller source, e.g. '/videos/hero.webm'
  poster: null as string | null, // shown before load and under reduced motion, e.g. '/images/hero-poster.jpg'
};

export const highlights: { id: 'aiLevelUp' | 'gmvGrowth' | 'promotions'; image: string | null }[] = [
  { id: 'aiLevelUp', image: '/images/highlights/ai-level-up.jpg' },
  { id: 'gmvGrowth', image: '/images/highlights/gmv-growth.png' },
  { id: 'promotions', image: '/images/highlights/promotions.jpg' },
];

export const works: {
  id: 'cobranding' | 'groupDeal' | 'dataViz' | 'offlineEvents' | 'contentProduction';
  image: string | null;
}[] = [
  { id: 'cobranding', image: '/images/works/cobranding.jpg' },
  { id: 'groupDeal', image: '/images/works/group-deal.jpg' },
  { id: 'dataViz', image: '/images/works/data-viz.jpg' },
  { id: 'offlineEvents', image: '/images/works/offline-events.jpg' },
  { id: 'contentProduction', image: '/images/works/content-production.jpg' },
];

export const brands: { name: string; logo: string | null }[] = [
  { name: 'NAVER Cloud', logo: '/images/brands/naver-cloud.png' },
  { name: 'intel', logo: '/images/brands/intel.svg' },
  { name: 'CJ ENM', logo: '/images/brands/cj-enm.png' },
  { name: 'NAVER', logo: '/images/brands/naver.svg' },
  { name: 'SAMSUNG', logo: '/images/brands/samsung.png' },
  { name: 'SERIES', logo: '/images/brands/series.png' },
  { name: 'NVIDIA', logo: '/images/brands/nvidia.svg' },
  { name: 'dcinside', logo: '/images/brands/dcinside.svg' },
  { name: 'ECOVACS', logo: '/images/brands/ecovacs.png' },
  { name: 'roborock', logo: '/images/brands/roborock.png' },
  { name: 'weverse', logo: '/images/brands/weverse.svg' },
  { name: 'YouTube', logo: '/images/brands/youtube.png' },
];

export const contact = {
  kakao: '18601064267',
  phone: '+82 10 2965 9558',
  email: 'lbj86@naver.com',
  wechat: 'lifanjun001',
  linkedin: 'https://www.linkedin.com/in/beomjun-lee-1854501b1',
};
