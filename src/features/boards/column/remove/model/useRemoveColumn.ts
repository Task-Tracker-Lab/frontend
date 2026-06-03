import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, TBoard } from 'entities/board';
import { useProjectStore } from 'entities/project';
import { toast } from 'sonner';

export type RemoveColunmnVariables = {
  columnId: string;
  boardId: string;
};

export type UseDeleteColumnOptions = Omit<
  UseMutationOptions<TBoard.ActionResponse, DefaultError, RemoveColunmnVariables>,
  'mutationFn'
>;

export function useRemoveColumn({ onSuccess, onSettled, ...rest }: UseDeleteColumnOptions = {}) {
  const projectId = useProjectStore((s) => s.projectId);
  return useMutation<TBoard.ActionResponse, DefaultError, RemoveColunmnVariables>({
    ...rest,
    mutationFn: (args) => BoardHttp.removeBoardColumn(args.boardId, args.columnId),
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Колонка удалена');
    },
    onSettled: async (_d, _e, _v, _m, context) => {
      onSettled?.(_d, _e, _v, _m, context);
      context.client.invalidateQueries({ queryKey: boardFabricKeys.columns(_v.boardId) });
      context.client.invalidateQueries({ queryKey: boardFabricKeys.list(projectId!) });
    },
  });
}
