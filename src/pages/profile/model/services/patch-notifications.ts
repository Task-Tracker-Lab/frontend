import { api } from 'shared/api';
import {
  NotificationsUpdateSchema,
  NotificationsUpdateSchemaType,
} from '../schemas/notifications-update';

export const patchUser = (data: NotificationsUpdateSchemaType) =>
  api<NotificationsUpdateSchemaType>({
    url: '/users/me/notifications',
    method: 'PATCH',
    data,
    contracts: {
      body: NotificationsUpdateSchema,
    },
  });
