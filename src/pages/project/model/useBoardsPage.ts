import { useQuery } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';
import { BoardMapper } from 'entities/board';

export const useBoardsPage = (projectId: string) => {
  const {
    data: dto,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(BoardQueries.getBoardList(projectId));
  const data = dto?.items.map(BoardMapper.toBoardWithTasks) ?? [];

  return { data, isLoading, isError, error, refetch };
};
