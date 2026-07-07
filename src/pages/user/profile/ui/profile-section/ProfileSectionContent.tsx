'use client';

import { CardSection, FloatingSaveBar } from 'shared/ui';
import { useMePage } from '../../model/useMePage';
import { IdentityItem } from './IdentityItem';
import { ProfileForm } from './ProfileForm';

export function ProfileSectionContent() {
  const { form, profile, isDirty, isPending, onSubmit, onDiscard } = useMePage();

  return (
    <>
      <CardSection
        className="space-y-4"
        title="Идентификация профиля"
        description="Публичная информация о вас."
      >
        <IdentityItem profile={profile} />
        <ProfileForm form={form} onSubmit={onSubmit} />
      </CardSection>
      <FloatingSaveBar
        visible={isDirty}
        onSave={form.handleSubmit(onSubmit)}
        onDiscard={onDiscard}
        pending={isPending && form.formState.isValidating}
        disabledSave={!form.formState.isValid}
      />
    </>
  );
}
