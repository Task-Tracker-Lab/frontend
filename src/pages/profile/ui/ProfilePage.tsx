'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ProfilePageSkeleton } from './ProfilePage.skeleton';
import { ProfileIdentityCard } from './ProfileIdentityCard';
import { ProfileSecurityCard } from './ProfileSecurityCard';
import { ProfileNotificationsCard } from './ProfileNotificationsCard';
import { UserQueries } from 'entities/user';

interface ProfilePageProps {
  className?: string;
}

function ProfilePage({ className }: ProfilePageProps) {
  const query = useQuery(UserQueries.getMe());

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
          <Button onClick={() => query.refetch()}>Повторить</Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className={cn('mx-auto w-full space-y-6 pb-6', className)}>
      <ProfileIdentityCard />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <ProfileSecurityCard />
        <ProfileNotificationsCard />
      </div>
    </div>
  );
}

export { ProfilePage };
