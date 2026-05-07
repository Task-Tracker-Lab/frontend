'use client';

import { ComponentProps, useEffect } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardSection,
  CardTitle,
  FloatingSaveBar,
  Separator,
} from 'shared/ui';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUser, UserQueries } from 'entities/user';
import { ProfileForm as ProfileFormSchema } from '../../model/schemas';
import type { ProfileFormValues } from '../../model/types';
import { useUpdateProfile } from '../../model/useUpdateProfile';
import { useQuery } from '@tanstack/react-query';
import { IdentityItem } from './IdentityItem';
import { ProfileForm } from './ProfileForm';
import { UploadHttp } from 'entities/file';

function MePage(props: Omit<ComponentProps<typeof Card>, 'children'>) {
  const query = useQuery(UserQueries.getMe());
  const profile = query.data?.profile;
  const email = query.data?.email;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
    },
  });
  const formValues = useWatch({ control: form.control });
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (!profile) {
      return;
    }

    form.reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio || '',
    });
  }, [form, profile]);

  if (!profile || !email) {
    return (
      <Card {...props}>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>Данные профиля пока недоступны.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const profileFormKeys: Array<keyof ProfileFormValues> = ['firstName', 'lastName', 'bio'];
  const dirty = profileFormKeys.some(
    (key) => (formValues[key] ?? '').trim() !== (profile[key] ?? '').trim()
  );

  const onSubmit = (data: ProfileFormValues) => {
    const body: TUser.ProfileUpdateBody = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      bio: data.bio ? data.bio.trim() : '',
    };

    updateProfileMutation.mutate(body);
  };

  void UploadHttp.uploadFile; //todo temporary. fsd linter

  return (
    <>
      <CardSection
        className="space-y-4"
        title="Идентификация профиля"
        description="Публичная информация о вас."
      >
        <IdentityItem profile={profile} email={email} />
        <Separator />
        <ProfileForm form={form} onSubmit={onSubmit} />
      </CardSection>
      <FloatingSaveBar
        visible={dirty}
        onSave={form.handleSubmit(onSubmit)}
        onDiscard={() =>
          form.reset({
            firstName: profile.firstName,
            lastName: profile.lastName,
            bio: profile.bio || '',
          })
        }
        pending={updateProfileMutation.isPending}
      />
    </>
  );
}

export { MePage };
