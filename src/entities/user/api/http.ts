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
      contracts: {
        response: SUser.UserActivityResponse,
      },
      signal,
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

  static getMyTeams(signal?: AbortSignal) {
    return api<TUser.UserTeamsListResponse>({
      url: '/users/me/teams',
      method: 'GET',
      contracts: {
        response: SUser.UserTeamsListResponse,
      },
      signal,
    });
  }

  static getMyInvitations(signal?: AbortSignal) {
    return api<TUser.UserInvitationListResponse>({
      url: '/users/me/invites',
      method: 'GET',
      contracts: {
        response: SUser.UserInvitationListResponse,
      },
      signal,
    });
  }
}
