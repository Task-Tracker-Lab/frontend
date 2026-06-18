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
import { AccountSection } from './account-section/AccountsSection';
import { Suspense } from 'react';
import { QueryParamsHandler } from 'features/handle-query-params';

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
      <Suspense>
        <QueryParamsHandler />
      </Suspense>
      <div className="space-y-4">
        <CardSection
          className="space-y-4"
          title="Идентификация профиля"
          description="Публичная информация о вас."
        >
          <IdentityItem profile={profile} email={email} />
          <Separator />
          <ProfileForm form={form} onSubmit={onSubmit} />
        </CardSection>
        <AccountSection />
        <FloatingSaveBar
          visible={isDirty}
          onSave={form.handleSubmit(onSubmit)}
          onDiscard={onDiscard}
          pending={isPending && form.formState.isValidating}
          disabledSave={!form.formState.isValid}
        />
      </div>
    </>
  );
}

export { MePage };
