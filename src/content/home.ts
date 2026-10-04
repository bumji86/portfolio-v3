// Media paths and non-translated data for the home page.
// Put files under /public and set the path (e.g. '/images/works/cobranding.jpg').
// `null` renders a placeholder. Translatable text lives in messages/{locale}.json under `home`.

export const hero = {
  video: '/videos/hero.mp4' as string | null,
  webm: null as string | null, // optional smaller source, e.g. '/videos/hero.webm'
  poster: null as string | null, // shown before load and under reduced motion, e.g. '/images/hero-poster.jpg'
};

// A reference slot at the bottom of a project modal: image, self-hosted video, or an embed
// (YouTube via youtube-nocookie.com/embed/<id>, Google Drive via drive.google.com/file/d/<id>/preview).
export type ProjectMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'embed'; src: string; title?: string };

export const highlights: { id: 'aiLevelUp' | 'gmvGrowth' | 'promotions'; image: string | null }[] = [
  { id: 'aiLevelUp', image: '/images/highlights/ai-level-up.jpg' },
  { id: 'gmvGrowth', image: '/images/highlights/gmv-growth.png' },
  { id: 'promotions', image: '/images/highlights/promotions.jpg' },
];

// Card image + modal media. Modal text (summary, body, tags) lives in messages/<locale>.json → home.works.items.
// `cover` overrides the card image inside the modal; `media: []` hides the reference row.
export const works: {
  id: 'cobranding' | 'groupDeal' | 'dataViz' | 'offlineEvents' | 'contentProduction' | 'aiTools';
  image: string | null;
  cover?: string;
  cardFit?: 'contain'; // show the whole card image (e.g. a landscape image with text) instead of cropping
  media: (ProjectMedia | null)[];
  builtWith?: string[];
  toolLinks?: (string | null)[]; // per entry of messages home.works.items.<id>.tools
}[] = [
  {
    id: 'cobranding',
    image: '/images/works/cobranding.jpg',
    media: [{ type: 'embed', src: 'https://www.youtube-nocookie.com/embed/y6zZQB7EMDo', title: 'YouTube video' }, { type: 'embed', src: 'https://www.youtube-nocookie.com/embed/MJu-21h5x1E', title: 'YouTube video' }],
  },
  {
    id: 'groupDeal',
    image: '/images/works/group-deal.jpg',
    cover: '/images/works/group-deal-cover.jpg',
    media: [{ type: 'embed', src: 'https://www.youtube-nocookie.com/embed/CPhQUP153s0', title: 'YouTube video' }, { type: 'embed', src: 'https://www.youtube-nocookie.com/embed/PlPOnpJCQXg', title: 'YouTube video' }],
  },
  {
    id: 'dataViz',
    image: '/images/works/data-viz.jpg',
    media: [],
  },
  {
    id: 'offlineEvents',
    image: '/images/works/offline-events.jpg',
    media: [
      { type: 'image', src: '/images/works/offline-events-ref-1.jpg', alt: 'Offline event' },
      { type: 'image', src: '/images/works/offline-events-ref-2.jpg', alt: 'Offline event' },
    ],
  },
  {
    id: 'contentProduction',
    image: '/images/works/content-production.jpg',
    media: [{ type: 'embed', src: 'https://www.youtube-nocookie.com/embed/FAmeed16hEs', title: 'YouTube video' }, { type: 'embed', src: 'https://www.youtube-nocookie.com/embed/kxUfbUtl7u4', title: 'YouTube video' }],
  },
  {
    // One card for all AI-built tools on purpose (keeps the portfolio reading as a marketer's, not a developer's)
    id: 'aiTools',
    image: '/images/works/ai-tools.jpg',
    media: [
      { type: 'image', src: '/images/works/ai-tools-ref-1.jpg', alt: 'YouTube Trend Radar dashboard' },
      { type: 'image', src: '/images/works/ai-tools-ref-2.jpg', alt: 'Hotdeal Monitor dashboard' },
    ],
    builtWith: [
      'Claude, Qoder (AI coding assistants)',
      'Next.js, TypeScript, SQLite',
      'Chrome extension with on-device OCR',
      'Home server + Cloudflare Tunnel',
    ],
    toolLinks: [null, 'https://hotdeal.sumimasen.dev', 'https://radar.sumimasen.dev'],
  },
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
