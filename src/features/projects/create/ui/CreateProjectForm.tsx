'use client';

import { ComponentProps } from 'react';
import { FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { FieldGroup, Separator } from 'shared/ui';
import type { UseCreateProjectOptions } from '../api/useCreateProject';
import { useCreateProjectForm } from '../model/useCreateProjectForm';
import { ProjectIdentityFields } from './ProjectIdentityFields';
import { VisibilityPicker } from './VisibilityPicker';

interface CreateProjectFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseCreateProjectOptions;
}

export function CreateProjectForm({ className, mutateOptions, ...props }: CreateProjectFormProps) {
  const { form, isPending, handleSubmit } = useCreateProjectForm(mutateOptions);

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
        <FieldGroup>
          <ProjectIdentityFields disabled={isPending} idPrefix="create-project" showPlaceholders />
          <Separator />
          <VisibilityPicker disabled={isPending} />
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
