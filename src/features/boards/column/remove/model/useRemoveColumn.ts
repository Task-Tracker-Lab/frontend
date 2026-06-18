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
      toast.success(res.message ?? 'Колонка удалена');
    },
    onSettled: async (_d, _e, _v, _m, context) => {
      onSettled?.(_d, _e, _v, _m, context);
      context.client.invalidateQueries({ queryKey: boardFabricKeys.columns(_v.boardSlug) });
    },
  });
}
