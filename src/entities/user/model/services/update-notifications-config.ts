import { api } from 'shared/api';
import {
  NotificationsUpdateBody,
  NotificationsUpdateResponse,
} from '../schema/notifications-update-schema';
import { z } from 'zod';

type Body = z.infer<typeof NotificationsUpdateBody>;

export const updateNotificationsConfig = (data: Body) =>
  api<Body>({
    url: '/users/me/notifications',
    method: 'PATCH',
    data,
    contracts: {
      body: NotificationsUpdateBody,
      response: NotificationsUpdateResponse,
    },
  });
