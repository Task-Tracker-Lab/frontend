import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, TBoard } from 'entities/board';
import { toast } from 'sonner';

export type RemoveBoardVariables = {
  projectSlug: string;
  boardSlug: string;
};

export type UseDeleteBoardOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, RemoveBoardVariables>,
  'mutationFn'
>;

export function useRemoveBoard({ onSuccess, onSettled, ...rest }: UseDeleteBoardOptions = {}) {
  return useMutation<TBoard.ActionResponse, DefaultError, RemoveBoardVariables>({
    ...rest,
    mutationFn: (args) => BoardHttp.removeBoard(args.projectSlug, args.boardSlug),
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Доска удалена');
    },
    onSettled: async (d, e, v, m, context) => {
      onSettled?.(d, e, v, m, context);
      context.client.invalidateQueries({ queryKey: boardFabricKeys.list(v.projectSlug) });
    },
  });
}
