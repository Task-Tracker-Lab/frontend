import { zodResolver } from '@hookform/resolvers/zod';
import { type TBoard } from 'entities/board';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { useRouteParams } from 'shared/lib/hooks';
import { setFormErrors } from 'shared/lib/utils';
import { getDefaultCreateBoardValues } from '../config/default-values';
import { CreateBoardFormSchema } from './schemas';
import { type CreateBoardFormValues } from './types';
import { useCreateBoard, UseCreateBoardOptions } from '../api/useCreateBoard';

export function useCreateBoardForm(options: UseCreateBoardOptions = {}) {
  const { projectSlug } = useRouteParams();

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
      title: data.title,
    };

    createBoard.mutate({ projectSlug, body });
  };

  return {
    form,
    projectSlug,
    isPending: createBoard.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
