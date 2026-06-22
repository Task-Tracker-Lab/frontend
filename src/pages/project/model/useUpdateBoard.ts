import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { BoardHttp, type TBoard } from 'entities/board';

type UpdateBoardVariables = {
  boardSlug: string;
  columnId: string;
  body: TBoard.UpdateBoardBody;
};

export type UseCreateBoardOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, UpdateBoardVariables>,
  'mutationFn'
>;

export function useUpdateBoard({ ...options }: UseCreateBoardOptions = {}) {
  return useMutation<TBoard.ActionResponse, DefaultError, UpdateBoardVariables>({
    ...options,
    mutationFn: ({ boardSlug, columnId, body }) => BoardHttp.updateBoard(boardSlug, columnId, body),
  });
}
