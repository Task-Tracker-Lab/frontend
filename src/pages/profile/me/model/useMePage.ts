'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type TUser, UserQueries } from 'entities/user';
import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useUpdateProfile } from '../api/useUpdateProfile';
import { ProfileForm as ProfileFormSchema, type ProfileFormValues } from './profile';

export function useMePage() {
  const query = useSuspenseQuery(UserQueries.getMe());
  const profile = query.data?.profile;
  const email = query.data?.email;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
    },
  });

  const { dirtyFields, isDirty } = useFormState({ control: form.control });
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (!profile) return;

    form.reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio || '',
    });
  }, [form, profile]);

  const onSubmit = (data: ProfileFormValues) => {
    const body: TUser.ProfileUpdateBody = {
      ...(dirtyFields.firstName && { firstName: data.firstName.trim() }),
      ...(dirtyFields.lastName && { lastName: data.lastName.trim() }),
      ...(dirtyFields.bio && { bio: data.bio ? data.bio.trim() : '' }),
    };

    updateProfileMutation.mutate(body);
  };

  const onDiscard = () => {
    if (!profile) return;
    form.reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio || '',
    });
  };

  return {
    form,
    profile,
    email,
    isDirty,
    isPending: updateProfileMutation.isPending,
    onSubmit,
    onDiscard,
  };
}
