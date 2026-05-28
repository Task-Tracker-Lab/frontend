'use client';

import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Spinner,
} from 'shared/ui';

const notificationsQueryKey = ['notifications'];

async function getNotifications() {
  // TODO: Replace mocked request with real notifications endpoint.
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [];
}

export function NotificationsContent() {
  const [open, setOpen] = useState(false);
  const query = useQuery({
    queryKey: notificationsQueryKey,
    queryFn: getNotifications,
    enabled: open,
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-full"
          aria-label="Уведомления"
        >
          <Bell className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-lg p-3">
        {query.isLoading ? (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-6 text-sm">
            <Spinner className="size-4" />
            Загрузка уведомлений...
          </div>
        ) : (
          <Empty className="border-0 p-3">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bell />
              </EmptyMedia>
              <EmptyTitle>Уведомлений нет</EmptyTitle>
              <EmptyDescription>Новые уведомления появятся здесь.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
