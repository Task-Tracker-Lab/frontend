import { z } from 'zod/v4';
import * as SProfile from './schemas';
import { TUser } from 'entities/user';

export type Notifications = TUser.UserResponse['notifications'];
export type NotificationChannel = keyof Notifications;

export type NotificationItem<TChannel extends NotificationChannel> = {
  key: keyof Notifications[TChannel];
  label: string;
  ariaLabel: string;
};

export type ProfileFormValues = z.infer<typeof SProfile.ProfileForm>;
