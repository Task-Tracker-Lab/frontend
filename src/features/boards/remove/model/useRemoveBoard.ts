import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, TBoard } from 'entities/board';
import { toast } from 'sonner';

export type RemoveBoardVariables = {
  projectId: string;
  boardId: string;
};

export type UseDeleteBoardOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, RemoveBoardVariables>,
  'mutationFn'
>;

export function useRemoveBoard({ onSuccess, onSettled, ...rest }: UseDeleteBoardOptions = {}) {
  return useMutation<TBoard.ActionResponse, DefaultError, RemoveBoardVariables>({
    ...rest,
    mutationFn: (args) => BoardHttp.removeBoard(args.projectId, args.boardId),
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Доска удалена');
    },
    onSettled: async (_d, _e, _v, _m, context) => {
      onSettled?.(_d, _e, _v, _m, context);
      context.client.invalidateQueries({ queryKey: boardFabricKeys.list(_v.projectId) });
    },
  });
}
