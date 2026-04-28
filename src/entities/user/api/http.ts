import { z } from 'zod/v4';
import { api } from 'shared/api';
import { UserResponse } from '../model/schema/user-response-schema';
import { AvatarUpdateResponse } from '../model/schema/avatar-update-schema';
import {
  NotificationsUpdateBody,
  NotificationsUpdateResponse,
} from '../model/schema/notifications-update-schema';
import { ProfileUpdateBody, ProfileUpdateResponse } from '../model/schema/profile-update-schema';

export class UserHttp {
  static getUser(signal?: AbortSignal) {
    return api<z.infer<typeof UserResponse>>({
      url: '/users/me',
      method: 'GET',
      contracts: {
        response: UserResponse,
      },
      signal,
    });
  }

  //todo ручка пока в разработке
  static getUserActivity(signal?: AbortSignal) {
    return api<unknown>({
      url: '/users/me/activity',
      method: 'GET',
      contracts: {},
      signal,
    });
  }

  static updateAvatar(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return api<z.infer<typeof AvatarUpdateResponse>>({
      url: '/users/me/avatar',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      contracts: {
        response: AvatarUpdateResponse,
      },
    });
  }

  static updateNotificationsConfig(data: z.infer<typeof NotificationsUpdateBody>) {
    return api<z.infer<typeof NotificationsUpdateBody>>({
      url: '/users/me/notifications',
      method: 'PATCH',
      data,
      contracts: {
        body: NotificationsUpdateBody,
        response: NotificationsUpdateResponse,
      },
    });
  }

  static updateUserConfig(data: z.infer<typeof ProfileUpdateBody>) {
    return api<z.infer<typeof ProfileUpdateBody>>({
      url: '/users/me',
      method: 'PATCH',
      data,
      contracts: {
        body: ProfileUpdateBody,
        response: ProfileUpdateResponse,
      },
    });
  }
}
