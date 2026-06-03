import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getDefaultCreateBoardColumnValues } from './default-values';
import { useCreateBoardColumn, UseCreateBoardColumnOptions } from './useCreateBoardColumn';
import { CreateBoardColumnFormSchema } from './schemas';
import { CreateBoardColumnFormValues } from './type';
import { setFormErrors } from 'shared/lib/utils';
import { extractValidationIssues } from 'shared/api';
import { TBoard } from 'entities/board';
import { useProjectStore } from 'entities/project';

type UseCreateBoardColumnFormOptions = UseCreateBoardColumnOptions & {
  defaultPosition?: number;
};

export function useCreateBoardColumnForm(
  boardId: string,
  options: UseCreateBoardColumnFormOptions = {}
) {
  const { defaultPosition = 0, ...mutationOptions } = options;
  const projectId = useProjectStore((s) => s.projectId!);
  const form = useForm<CreateBoardColumnFormValues>({
    resolver: zodResolver(CreateBoardColumnFormSchema),
    defaultValues: getDefaultCreateBoardColumnValues(defaultPosition),
  });

  const createBoardColumn = useCreateBoardColumn({
    ...mutationOptions,
    meta: {
      skipGlobalValidationToast: true,
    },
    onError: (err, ...args) => {
      mutationOptions.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: CreateBoardColumnFormValues) => {
    const body: TBoard.CreateBoardColumnBody = {
      name: data.name,
      position: Number(data.position),
      ...(data.color ? { color: data.color } : {}),
    };

    createBoardColumn.mutate({ boardId, projectId, body });
  };

  return {
    form,
    boardId,
    projectId,
    isPending: createBoardColumn.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
