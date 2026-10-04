import 'server-only';

// Personal contact details. Server-only on purpose: client components receive them as props,
// and only in the main version — so the blind (no-contact) page never ships them, not even in JS.
export type ContactInfo = typeof contact;
export const contact = {
  kakao: '18601064267',
  phone: '+82 10 2965 9558',
  email: 'lbj86@naver.com',
  wechat: 'lifanjun001',
  linkedin: 'https://www.linkedin.com/in/beomjun-lee-1854501b1',
};
