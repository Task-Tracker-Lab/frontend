import { zodResolver } from '@hookform/resolvers/zod';
import { type TBoard } from 'entities/board';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { setFormErrors } from 'shared/lib/utils';
import { getDefaultCreateBoardValues } from '../config/default-values';
import { CreateBoardFormSchema } from './schemas';
import { type CreateBoardFormValues } from './types';
import { useCreateBoard, UseCreateBoardOptions } from './useCreateBoard';

export function useCreateBoardForm(options: UseCreateBoardOptions = {}) {
  const params = useParams<{ projectSlug: string }>();
  const slug = params?.projectSlug;

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

    createBoard.mutate({ projectSlug: slug!, body });
  };

  return {
    form,
    projectSlug: slug!,
    isPending: createBoard.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
