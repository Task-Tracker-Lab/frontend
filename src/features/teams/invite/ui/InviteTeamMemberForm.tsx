'use client';

import { INVITATION_ROLES, ROLE_LABELS } from 'entities/team';
import { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui';
import type { UseInviteTeamMemberOptions } from '../model/useInviteTeamMember';
import { useInviteTeamMemberForm } from '../model/useInviteTeamMemberForm';

interface InviteTeamMemberFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseInviteTeamMemberOptions;
  teamId?: string;
}

export function InviteTeamMemberForm({
  className,
  mutateOptions,
  teamId,
  ...props
}: InviteTeamMemberFormProps) {
  const { form, isPending, handleSubmit } = useInviteTeamMemberForm(mutateOptions, teamId);

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="invite-member-email">Email</FieldLabel>
              <Input
                {...field}
                id="invite-member-email"
                type="email"
                aria-label="Email участника"
                placeholder="user@example.com"
                aria-required="true"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="invite-member-role">Роль</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                <SelectTrigger id="invite-member-role" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  {INVITATION_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
