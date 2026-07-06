import { zodResolver } from '@hookform/resolvers/zod';
import { type TBoard } from 'entities/board';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { setFormErrors } from 'shared/lib/utils';
import { CreateBoardColumnFormSchema } from './schemas';
import { type CreateBoardColumnFormValues } from './types';
import { useCreateBoardColumn, UseCreateBoardColumnOptions } from '../api/useCreateBoardColumn';
import { useDefaultCreateBoardColumnValues } from '../config/useDefaultCreateBoardColumnValues';

export function useCreateBoardColumnForm(
  boardSlug: string,
  options: UseCreateBoardColumnOptions = {}
) {
  const getDefaultValues = useDefaultCreateBoardColumnValues(boardSlug);

  const form = useForm<CreateBoardColumnFormValues>({
    resolver: zodResolver(CreateBoardColumnFormSchema),
    defaultValues: getDefaultValues(),
  });

  const createBoardColumn = useCreateBoardColumn({
    ...options,
    meta: {
      skipGlobalValidationToast: true,
    },
    onError: (err, ...args) => {
      options.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: CreateBoardColumnFormValues) => {
    const body: TBoard.CreateBoardColumnBody = {
      title: data.title,
      position: data.position,
      ...(data.color ? { color: data.color } : {}),
    };

    createBoardColumn.mutate({ boardSlug, body });
  };

  return {
    form,
    isPending: createBoardColumn.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
