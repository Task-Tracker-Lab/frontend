export { UserResponse } from './model/schema/user-response-schema';
export { AvatarUpdateResponse } from './model/schema/avatar-update-schema';
export {
  NotificationsUpdateBody,
  NotificationsUpdateResponse,
} from './model/schema/notifications-update-schema';
export { ProfileUpdateBody, ProfileUpdateResponse } from './model/schema/profile-update-schema';

export { getUser } from './model/services/get-user';
export { getUserActivity } from './model/services/get-user-activity';
export { updateAvatar } from './model/services/update-avatar';
export { updateNotificationsConfig } from './model/services/update-notifications-config';
export { updateUserConfig } from './model/services/update-user-config';

export { currentUserQueryKey, useCurrentUser } from './model/queries/use-current-user';
export {
  currentUserActivityQueryKey,
  useCurrentUserActivity,
} from './model/queries/use-current-user-activity';
