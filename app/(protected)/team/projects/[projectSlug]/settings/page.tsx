import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ projectSlug: string }> }) {
  const { projectSlug } = await params;

  if (!projectSlug) {
    return notFound();
  }

  return <div>конфиг проекта {projectSlug}</div>;
}
