import { redirect } from 'next/navigation';

// Legacy URL: case studies are now the Works section (project modals) on the home page.
export default async function CasesRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}#works`);
}
