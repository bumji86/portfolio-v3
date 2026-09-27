import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Temporary en-only release: ko/zh are hidden (their routes 404 and the language toggle is hidden).
  // To bring them back, restore ['en', 'ko', 'zh'] — messages/ko.json and zh.json are kept.
  locales: ['en'],
  defaultLocale: 'en',
});
