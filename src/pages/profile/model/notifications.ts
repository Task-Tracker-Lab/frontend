import { TUser } from 'entities/user';

export type Notifications = TUser.UserResponse['notifications'];
export type NotificationChannel = keyof Notifications;

export type NotificationItem<TChannel extends NotificationChannel> = {
  key: keyof Notifications[TChannel];
  label: string;
  ariaLabel: string;
};
