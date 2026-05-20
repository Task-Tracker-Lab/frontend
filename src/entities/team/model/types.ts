import { z } from 'zod/v4';
import * as STeam from './schemas';
import { TeamAvatarSchema } from './schemas';

export type TeamAvatar = z.infer<typeof TeamAvatarSchema>;
export type TeamRole = z.infer<typeof STeam.TeamRole>;
export type MemberStatus = z.infer<typeof STeam.MemberStatus>;

export type CreateTeamBody = z.infer<typeof STeam.CreateTeamBody>;
export type UpdateTeamBody = z.infer<typeof STeam.UpdateTeamBody>;
export type CheckSlugResponse = z.infer<typeof STeam.CheckSlugResponse>;
export type TeamDetailsResponse = z.infer<typeof STeam.TeamDetailsResponse>;

export type TeamInvitationResponse = z.infer<typeof STeam.TeamInvitationResponse>;
export type TeamMemberResponse = z.infer<typeof STeam.TeamMemberResponse>;

export type InviteMemberBody = z.infer<typeof STeam.InviteMemberBody>;
export type UpdateInvitationBody = z.infer<typeof STeam.UpdateInvitationBody>;
export type UpdateMemberBody = z.infer<typeof STeam.UpdateMemberBody>;
export type SyncTagsBody = z.infer<typeof STeam.SyncTagsBody>;
export type ActionResponse = z.infer<typeof STeam.ActionResponse>;

export type CreateProjectBody = z.infer<typeof STeam.CreateProjectBody>;
export type UpdateProjectBody = z.infer<typeof STeam.UpdateProjectBody>;
export type CreateProjectResponse = z.infer<typeof STeam.CreateProjectResponse>;
export type CreateShareTokenBody = z.infer<typeof STeam.CreateShareTokenBody>;

export type ProjectListItemResponse = z.infer<typeof STeam.ProjectListItemResponse>;
export type ProjectListResponse = z.infer<typeof STeam.ProjectListResponse>;
export type ProjectDetailResponse = z.infer<typeof STeam.ProjectDetailResponse>;
