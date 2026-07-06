'use client';

import { useQuery } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { routes } from 'shared/config';
import { BoardsPageFallback } from './BoardsPageFallback';

const BoardsPageContent = dynamic(
  () => import('./BoardsPageContent').then((mod) => mod.BoardsPageContent),
  {
    ssr: false,
    loading: () => <BoardsPageFallback />,
  }
);

interface BoardsPageProps extends Partial<React.ComponentProps<typeof BoardsPageContent>> {
  projectSlug: string;
}

export function BoardsPage(props: BoardsPageProps) {
  const router = useRouter();
  const { data } = useQuery(BoardQueries.getBoardList(props.projectSlug));

  useLayoutEffect(() => {
    if (!data || data.length === 0 || data.some((item) => item.slug === props.boardSlug)) {
      return;
    }

    router.replace(routes.team.projects.board(props.projectSlug, data[0].slug));
  }, [props.boardSlug, props.projectSlug, data, router]);

  if (!props.boardSlug) {
    return null;
  }

  return <BoardsPageContent projectSlug={props.projectSlug} boardSlug={props.boardSlug} />;
}
