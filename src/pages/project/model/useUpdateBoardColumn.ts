import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { BoardHttp, type TBoard } from 'entities/board';

type UpdateBoardColumnVariables = {
  boardSlug: string;
  columnId: string;
  body: TBoard.UpdateBoardColumnBody;
};

export type UseUpdateBoardOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, UpdateBoardColumnVariables>,
  'mutationFn'
>;

export function useUpdateBoardColumn({ ...options }: UseUpdateBoardOptions = {}) {
  return useMutation<TBoard.ActionResponse, DefaultError, UpdateBoardColumnVariables>({
    ...options,
    mutationFn: ({ boardSlug, columnId, body }) =>
      BoardHttp.updateBoardColumn(boardSlug, columnId, body),
  });
}
