import { defineRouting } from 'next-intl/routing';

const ALL = ['en', 'ko', 'zh'] as const;
type Locale = (typeof ALL)[number];

// Enabled locales: en + ko are live. zh is parked until it's ready (messages/zh.json is kept);
// NEXT_PUBLIC_LOCALES (e.g. "en,ko,zh" in .env.local) can override this for local previews.
const enabled = (process.env.NEXT_PUBLIC_LOCALES ?? 'en,ko')
  .split(',')
  .map((l) => l.trim())
  .filter((l): l is Locale => (ALL as readonly string[]).includes(l));

export const routing = defineRouting({
  locales: enabled.length ? enabled : ['en'],
  defaultLocale: 'en',
});
