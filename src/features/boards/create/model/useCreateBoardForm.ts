import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getDefaultCreateBoardValues } from './default-values';
import { useCreateBoard, UseCreateBoardOptions } from './useCreateBoard';
import { CreateBoardFormSchema } from './schemas';
import { CreateBoardFormValues } from './type';
import { setFormErrors } from 'shared/lib/utils';
import { extractValidationIssues } from 'shared/api';
import { TBoard } from 'entities/board';
import { useProjectStore } from 'entities/project';

export function useCreateBoardForm(options: UseCreateBoardOptions = {}) {
  const projectId = useProjectStore((s) => s.projectId!);
  const form = useForm<CreateBoardFormValues>({
    resolver: zodResolver(CreateBoardFormSchema),
    defaultValues: getDefaultCreateBoardValues(),
  });

  const createBoard = useCreateBoard({
    ...options,
    meta: {
      skipGlobalValidationToast: true,
    },
    onError: (err, ...args) => {
      options.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: CreateBoardFormValues) => {
    const body: TBoard.CreateBoardBody = {
      ...data,
      position: Number(data.position),
    };

    createBoard.mutate({ projectId, body });
  };

  return {
    form,
    projectId,
    isPending: createBoard.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
