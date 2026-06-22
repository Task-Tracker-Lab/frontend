import { useQuery } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';

export const useBoardsPage = (projectId: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    BoardQueries.getBoardList(projectId)
  );

  return { data, isLoading, isError, error, refetch };
};
