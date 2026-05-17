'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardSection,
  CardTitle,
  FloatingSaveBar,
  Separator,
} from 'shared/ui';
import { IdentityItem } from './IdentityItem';
import { ProfileForm } from './ProfileForm';
import { useMePage } from '../../model/useMePage';

function MePage() {
  const { form, profile, email, isDirty, isPending, onSubmit, onDiscard } = useMePage();

  if (!profile || !email) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>Данные профиля пока недоступны.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

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
        visible={isDirty}
        onSave={form.handleSubmit(onSubmit)}
        onDiscard={onDiscard}
        pending={isPending}
      />
    </>
  );
}

export { MePage };
