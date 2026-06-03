import { ProjectBoards } from './ProjectBoards';

export async function ProjectBoardsPage({ params }: PageProps<'/team/projects/[projectId]'>) {
  const { projectId } = await params;

  return <ProjectBoards projectId={projectId} />;
}
