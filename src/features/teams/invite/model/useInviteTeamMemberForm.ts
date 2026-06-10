'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTeamStore } from 'entities/team';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { setFormErrors } from 'shared/lib/utils';
import { InviteTeamMemberFormSchema } from './schemas';
import type { InviteTeamMemberFormValues } from './types';
import { useInviteTeamMember, type UseInviteTeamMemberOptions } from './useInviteTeamMember';

export function useInviteTeamMemberForm(
  mutateOptions: UseInviteTeamMemberOptions = {},
  teamIdProp?: string
) {
  const activeTeamId = useTeamStore.use.teamId();
  const teamId = teamIdProp ?? activeTeamId;

  const form = useForm<InviteTeamMemberFormValues>({
    resolver: zodResolver(InviteTeamMemberFormSchema),
    defaultValues: {
      email: '',
      role: 'member',
    },
  });

  const inviteTeamMember = useInviteTeamMember({
    ...mutateOptions,
    meta: {
      skipGlobalValidationToast: true,
    },
    onError: (err, ...args) => {
      mutateOptions.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: InviteTeamMemberFormValues) => {
    if (!teamId) return;
    inviteTeamMember.mutate({ teamId, body: data });
  };

  return {
    form,
    isPending: inviteTeamMember.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
