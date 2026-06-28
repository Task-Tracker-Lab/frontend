import { notFound } from 'next/navigation';
import { BoardsPage } from 'pages/boards';

export default async function Page({ params }: { params: Promise<{ projectSlug: string }> }) {
  const { projectSlug } = await params;

  if (!projectSlug) {
    return notFound();
  }

  return <BoardsPage projectSlug={projectSlug} />;
}
