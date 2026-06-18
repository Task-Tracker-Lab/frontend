import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, type TBoard } from 'entities/board';
import { toast } from 'sonner';

type CreateBoardColumnVariables = {
  boardSlug: string;
  body: TBoard.CreateBoardColumnBody;
};

export type UseCreateBoardColumnOptions = Omit<
  UseMutationOptions<TBoard.CreateBoardColumnResponse, DefaultError, CreateBoardColumnVariables>,
  'mutationFn'
>;

export function useCreateBoardColumn({ onSuccess, ...rest }: UseCreateBoardColumnOptions = {}) {
  return useMutation<TBoard.CreateBoardColumnResponse, DefaultError, CreateBoardColumnVariables>({
    ...rest,
    mutationFn: ({ boardSlug, body }) => BoardHttp.createBoardColumn(boardSlug, body),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Колонка создана');
      await context.client.invalidateQueries({
        queryKey: boardFabricKeys.columns(variables.boardSlug),
      });
    },
  });
}
