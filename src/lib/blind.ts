import 'server-only';
import { notFound } from 'next/navigation';

// The blind (no-contact) pages live under /{locale}/p/{key}. The key comes from the BLIND_KEY env var,
// not this public repo; a wrong key — or no env var at all — is a 404. Returns the base path.
export function requireBlindBase(key: string) {
  const expected = process.env.BLIND_KEY;
  if (!expected || key !== expected) notFound();
  return `/p/${key}`;
}
