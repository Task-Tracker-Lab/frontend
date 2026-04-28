import { useMutation } from '@tanstack/react-query';
import { ComponentProps, useEffect, useId, useReducer } from 'react';
import { useQueuedDebouncedMutation } from 'shared/lib/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Switch,
} from 'shared/ui';
import { toast } from 'sonner';
import { z } from 'zod/v4';
import { updateNotificationsConfig, useCurrentUser, UserResponse } from 'entities/user';

const SAVE_DEBOUNCE_MS = 500;

type Notifications = z.infer<typeof UserResponse>['notifications'];
type NotificationsState = Notifications | null;
type NotificationChannel = keyof Pick<Notifications, 'email' | 'push'>;

type NotificationsAction = {
  type: 'set';
  payload: NotificationsState;
};

const notificationsReducer = (
  _state: NotificationsState,
  action: NotificationsAction
): NotificationsState => {
  switch (action.type) {
    case 'set':
      return action.payload;
    default:
      return _state;
  }
};

const areNotificationsEqual = (left: Notifications, right: Notifications) =>
  JSON.stringify(left) === JSON.stringify(right);

interface SwitchItemProps extends ComponentProps<typeof Switch> {
  wrapperClassName?: string;
  label?: string;
}

function SwitchItem({ label, ...props }: SwitchItemProps) {
  const id = useId();

  return (
    <div className="bg-muted/20 flex items-center justify-between gap-4 rounded-md border px-3 py-2">
      {label ? (
        <Label className="text-muted-foreground text-sm" htmlFor={id}>
          {label}
        </Label>
      ) : null}
      <Switch {...props} id={id} />
    </div>
  );
}

function ProfileNotificationsCard() {
  const query = useCurrentUser();
  const notifications = query.data?.notifications;
  const [localNotifications, dispatchLocalNotifications] = useReducer(
    notificationsReducer,
    notifications ?? null
  );
  const sendSettings = useMutation({
    mutationFn: updateNotificationsConfig,
    onSuccess: () => {
      toast.success('Настройки уведомлений обновлены');
      query.refetch();
    },
  });

  const { enqueueMutation, syncPersistedValue } = useQueuedDebouncedMutation<Notifications>({
    delayMs: SAVE_DEBOUNCE_MS,
    initialPersistedValue: notifications ?? null,
    isEqual: areNotificationsEqual,
    mutationFn: sendSettings.mutateAsync,
  });

  useEffect(() => {
    if (!notifications) {
      return;
    }

    syncPersistedValue(notifications);
    dispatchLocalNotifications({ type: 'set', payload: notifications });
  }, [notifications, syncPersistedValue]);

  const handleToggle = <TChannel extends NotificationChannel>(
    channel: TChannel,
    key: keyof Notifications[TChannel],
    checked: boolean
  ) => {
    if (!localNotifications) {
      return;
    }

    const nextNotifications: Notifications = {
      ...localNotifications,
      [channel]: {
        ...localNotifications[channel],
        [key]: checked,
      },
    } as Notifications;

    dispatchLocalNotifications({ type: 'set', payload: nextNotifications });
    enqueueMutation(nextNotifications);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Уведомления</CardTitle>
        <CardDescription>Настройки почтовых и push-уведомлений.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3 rounded-lg border p-4">
          <p className="text-sm font-semibold">Email</p>
          <SwitchItem
            label="Упоминания"
            checked={localNotifications?.email.mentions ?? false}
            disabled={query.isLoading}
            onCheckedChange={(checked) => handleToggle('email', 'mentions', checked)}
            aria-label="Email уведомления об упоминаниях"
          />
          <SwitchItem
            label="Ежедневная сводка"
            checked={localNotifications?.email.daily_summary ?? false}
            disabled={query.isLoading}
            onCheckedChange={(checked) => handleToggle('email', 'daily_summary', checked)}
            aria-label="Email ежедневная сводка"
          />
          <SwitchItem
            label="Назначение задач"
            checked={localNotifications?.email.task_assigned ?? false}
            disabled={query.isLoading}
            onCheckedChange={(checked) => handleToggle('email', 'task_assigned', checked)}
            aria-label="Email уведомления о назначении задач"
          />
        </div>
        <Separator />
        <div className="space-y-3 rounded-lg border p-4">
          <p className="text-sm font-semibold">Push</p>
          <SwitchItem
            label="Напоминания"
            checked={localNotifications?.push.reminders ?? false}
            disabled={query.isLoading}
            onCheckedChange={(checked) => handleToggle('push', 'reminders', checked)}
            aria-label="Push напоминания"
          />
          <SwitchItem
            label="Назначение задач"
            checked={localNotifications?.push.task_assigned ?? false}
            disabled={query.isLoading}
            onCheckedChange={(checked) => handleToggle('push', 'task_assigned', checked)}
            aria-label="Push уведомления о назначении задач"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { ProfileNotificationsCard };
