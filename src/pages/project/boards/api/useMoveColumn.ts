import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, type TBoard } from 'entities/board';
import { toast } from 'sonner';

type MoveColumnVariables = {
  boardSlug: string;
  columnId: string;
  body: TBoard.MoveBoardColumnBody;
};

export type UseMoveColumnOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, MoveColumnVariables>,
  'mutationFn'
>;

export function useMoveColumn({ onSettled, onError, ...options }: UseMoveColumnOptions = {}) {
  return useMutation<TBoard.ActionResponse, DefaultError, MoveColumnVariables>({
    ...options,
    mutationFn: ({ boardSlug, columnId, body }) =>
      BoardHttp.moveBoardColumn(boardSlug, columnId, body),
    onSettled: (data, error, variables, onMutateResult, context) => {
      onSettled?.(data, error, variables, onMutateResult, context);

      context?.client.invalidateQueries({
        queryKey: boardFabricKeys.columns(variables.boardSlug),
      });
    },
    onError: (error, variables, onMutateResult, context) => {
      onError?.(error, variables, onMutateResult, context);
      toast.error(error.message ?? 'Не удалось переместить колонку');
    },
  });
}
