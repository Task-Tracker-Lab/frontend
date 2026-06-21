import { type TBoard } from 'entities/board';
import React from 'react';
import { type ProjectBoardViewData } from '../../model/types';
import dynamic from 'next/dynamic';
import { ProjectKanbanSkeleton } from './ProjectKanban.skeleton';

type ProjectBoardsContentProps = {
  view: TBoard.BoardViewType;
  data: ProjectBoardViewData;
};

const VIEW_COMPONENTS = {
  kanban: dynamic(() => import('./ProjectKanban').then((mod) => mod.ProjectKanban), {
    loading: () => <ProjectKanbanSkeleton />,
  }),
  list: null,
  calendar: null,
  gantt: null,
} satisfies Record<
  TBoard.BoardViewType,
  React.ComponentType<{
    data: ProjectBoardViewData;
  }> | null
>;

export function ProjectBoardsContent({ view, data }: ProjectBoardsContentProps) {
  const ViewComponent = VIEW_COMPONENTS[view];
  return ViewComponent ? <ViewComponent data={data} /> : null;
}
