import { z } from 'zod/v4';
import * as SUser from './schemas';

export type UserResponse = z.infer<typeof SUser.UserResponse>;
export type NotificationsUpdateBody = z.infer<typeof SUser.NotificationsUpdateBody>;
export type NotificationsUpdateResponse = z.infer<typeof SUser.NotificationsUpdateResponse>;
export type ProfileUpdateBody = z.infer<typeof SUser.ProfileUpdateBody>;
export type ProfileUpdateResponse = z.infer<typeof SUser.ProfileUpdateResponse>;
export type UserTeamResponse = z.infer<typeof SUser.UserTeamResponse>;
export type UserTeamsListMeta = z.infer<typeof SUser.UserTeamsListMeta>;
export type UserTeamsListResponse = z.infer<typeof SUser.UserTeamsListResponse>;
export type UserInvitationResponse = z.infer<typeof SUser.UserInvitationResponse>;
