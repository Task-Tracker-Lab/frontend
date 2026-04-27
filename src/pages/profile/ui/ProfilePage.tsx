'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { currentUserQueryKey, useCurrentUser } from '../model/queries/use-current-user';
import { useQueryClient } from '@tanstack/react-query';
import { ProfilePageSkeleton } from './ProfilePage.skeleton';
import { ProfileIdentityCard } from './ProfileIdentityCard';
import { ProfileSecurityCard } from './ProfileSecurityCard';
import { ProfileNotificationsCard } from './ProfileNotificationsCard';
import { SignOut } from './SignOut';

interface ProfilePageProps {
  className?: string;
}

function ProfilePage({ className }: ProfilePageProps) {
  const queryClient = useQueryClient();
  const invalidateUser = async () =>
    await queryClient.invalidateQueries({ queryKey: currentUserQueryKey });

  const query = useCurrentUser();
  if (query.isLoading) {
    return <ProfilePageSkeleton />;
  }

  if (query.isError || !query.data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Не удалось загрузить профиль</CardTitle>
          <CardDescription>Проверьте подключение и попробуйте снова.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={invalidateUser}>Повторить</Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className={cn('mx-auto w-full max-w-5xl space-y-6 pb-6', className)}>
      <SignOut />
      <ProfileIdentityCard />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <ProfileSecurityCard />
        <ProfileNotificationsCard />
      </div>
    </div>
  );
}

export { ProfilePage };
