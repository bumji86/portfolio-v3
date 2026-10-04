import { redirect } from 'next/navigation';

// Legacy URL: contact now lives in a modal on the home page (opened by #contact).
export default async function ContactRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}#contact`);
}
