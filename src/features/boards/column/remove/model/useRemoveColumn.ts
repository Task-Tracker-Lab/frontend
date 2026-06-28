import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, type TBoard } from 'entities/board';
import { toast } from 'sonner';

export type RemoveColunmnVariables = {
  columnId: string;
  boardSlug: string;
};

export type UseDeleteColumnOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, RemoveColunmnVariables>,
  'mutationFn'
>;

export function useRemoveColumn({ onSuccess, onSettled, ...rest }: UseDeleteColumnOptions = {}) {
  return useMutation<TBoard.ActionResponse, DefaultError, RemoveColunmnVariables>({
    ...rest,
    mutationFn: (args) => BoardHttp.removeBoardColumn(args.boardSlug, args.columnId),
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Этап удален');
    },
    onSettled: async (d, e, v, m, context) => {
      onSettled?.(d, e, v, m, context);
      context.client.invalidateQueries({ queryKey: boardFabricKeys.columns(v.boardSlug) });
    },
  });
}
