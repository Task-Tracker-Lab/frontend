import { zodResolver } from '@hookform/resolvers/zod';
import { type TBoard } from 'entities/board';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { setFormErrors } from 'shared/lib/utils';
import { getDefaultCreateBoardColumnValues } from '../config/default-values';
import { CreateBoardColumnFormSchema } from './schemas';
import { type CreateBoardColumnFormValues } from './types';
import { useCreateBoardColumn, UseCreateBoardColumnOptions } from './useCreateBoardColumn';

type UseCreateBoardColumnFormOptions = UseCreateBoardColumnOptions & {
  defaultPosition?: number;
};

export function useCreateBoardColumnForm(
  boardSlug: string,
  options: UseCreateBoardColumnFormOptions = {}
) {
  const { defaultPosition = 100, ...mutationOptions } = options;

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
      title: data.title,
      position: data.position, //todo: пока будет 100, потом будет динамический position
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
