import { notFound } from 'next/navigation';
import { BoardsPage } from 'pages/project/boards';

export default async function Page({
  params,
}: {
  params: Promise<{ boardSlug: string; projectSlug: string }>;
}) {
  const { boardSlug, projectSlug } = await params;

  if (!boardSlug || !projectSlug) {
    return notFound();
  }

  return <BoardsPage projectSlug={projectSlug} boardSlug={boardSlug} />;
}
