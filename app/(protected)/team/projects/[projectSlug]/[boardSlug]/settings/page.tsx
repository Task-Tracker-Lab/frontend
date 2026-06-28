import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ boardSlug: string; projectSlug: string }>;
}) {
  const { boardSlug, projectSlug } = await params;

  if (!boardSlug || !projectSlug) {
    return notFound();
  }

  return (
    <div>
      настройки доски {boardSlug} проекта {projectSlug}
    </div>
  );
}
