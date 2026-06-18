import { ProjectBoards } from './ProjectBoards';

export async function ProjectBoardsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ProjectBoards slug={slug} />;
}
