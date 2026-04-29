import { api } from 'shared/api';
import * as TUser from '../model/types';
import * as SUser from '../model/schemas';

export class UserHttp {
  static getUser(signal?: AbortSignal) {
    return api<TUser.UserResponse>({
      url: '/users/me',
      method: 'GET',
      contracts: {
        response: SUser.UserResponse,
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

    return api<TUser.AvatarUpdateResponse>({
      url: '/users/me/avatar',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      contracts: {
        response: SUser.AvatarUpdateResponse,
      },
    });
  }

  static updateNotificationsConfig(data: TUser.NotificationsUpdateBody) {
    return api<TUser.NotificationsUpdateResponse>({
      url: '/users/me/notifications',
      method: 'PATCH',
      data,
      contracts: {
        body: SUser.NotificationsUpdateBody,
        response: SUser.NotificationsUpdateResponse,
      },
    });
  }

  static updateUserConfig(data: TUser.ProfileUpdateBody) {
    return api<TUser.ProfileUpdateResponse>({
      url: '/users/me',
      method: 'PATCH',
      data,
      contracts: {
        body: SUser.ProfileUpdateBody,
        response: SUser.ProfileUpdateResponse,
      },
    });
  }
}
