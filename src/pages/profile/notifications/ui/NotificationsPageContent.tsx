'use client';

import { useReducer } from 'react';
import { CardSection, FloatingSaveBar, OptionGroup, Switch } from 'shared/ui';
import { UserQueries } from 'entities/user';
import { useUpdateNotifications } from '../api/useUpdateNotifications';
import { useSuspenseQuery } from '@tanstack/react-query';
import { notificationItems } from '../config/notifications';
import { NotificationChannel, type Notifications } from '../model/notifications';

type NotificationsState = Notifications | null;

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

function NotificationsPageContent() {
  const query = useSuspenseQuery(UserQueries.getMe());
  const notifications = query.data?.notifications;
  const [localNotifications, dispatchLocalNotifications] = useReducer(
    notificationsReducer,
    notifications ?? null
  );

  const dirty =
    !query.isError &&
    !query.isLoading &&
    JSON.stringify(notifications) !== JSON.stringify(localNotifications);
  const sendSettings = useUpdateNotifications();

  const handleToggle = <TChannel extends NotificationChannel>(
    channel: TChannel,
    key: keyof Notifications[TChannel],
    checked: boolean
  ) => {
    if (!localNotifications) {
      return;
    }

    const nexNotifications: Notifications = {
      ...localNotifications,
      [channel]: {
        ...localNotifications[channel],
        [key]: checked,
      },
    } as Notifications;

    dispatchLocalNotifications({ type: 'set', payload: nexNotifications });
  };

  return (
    <>
      <CardSection
        title="Уведомления"
        description="Настройки почтовых и push-уведомлений."
        className="space-y-5"
      >
        {Object.entries(notificationItems).map(([channel, items]) => {
          const ch = channel as NotificationChannel;
          return (
            <OptionGroup
              key={channel}
              name={channel}
              items={items.map((item) => {
                const key = item.key as keyof Notifications[typeof ch];

                return {
                  key: item.key,
                  label: item.label,
                  input: (props) => (
                    <Switch
                      checked={localNotifications?.[ch][key] ?? false}
                      disabled={query.isLoading}
                      onCheckedChange={(checked) => handleToggle(ch, key, checked)}
                      aria-label={item.ariaLabel}
                      {...props}
                    />
                  ),
                };
              })}
            />
          );
        })}
      </CardSection>
      <FloatingSaveBar
        visible={dirty}
        onSave={() => localNotifications && sendSettings.mutate(localNotifications)}
        onDiscard={() =>
          notifications && dispatchLocalNotifications({ type: 'set', payload: notifications })
        }
        pending={sendSettings.isPending}
      />
    </>
  );
}

export { NotificationsPageContent };
