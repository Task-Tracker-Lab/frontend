import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDefaultCreateBoardValues } from '../config/default-values';
import { useCreateBoard, UseCreateBoardOptions } from './useCreateBoard';
import { CreateBoardFormSchema } from './schemas';
import { setFormErrors } from 'shared/lib/utils';
import { extractValidationIssues } from 'shared/api';
import { type TBoard } from 'entities/board';
import { type CreateBoardFormValues } from './types';

export function useCreateBoardForm(options: UseCreateBoardOptions = {}) {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

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
