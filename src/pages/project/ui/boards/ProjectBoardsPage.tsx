import { ProjectBoards } from './ProjectBoards';

export async function ProjectBoardsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <ProjectBoards projectId={projectId} />;
}
