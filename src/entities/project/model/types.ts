import { z } from 'zod/v4';
import * as SProject from './schemas';

export type ProjectStatus = z.infer<typeof SProject.ProjectStatusSchema>;
export type ProjectVisibility = z.infer<typeof SProject.ProjectVisibilitySchema>;
export type ProjectMemberRole = z.infer<typeof SProject.ProjectMemberRoleSchema>;

export type CreateProjectBody = z.infer<typeof SProject.CreateProjectBody>;
export type UpdateProjectBody = z.infer<typeof SProject.UpdateProjectBody>;
export type CreateProjectResponse = z.infer<typeof SProject.CreateProjectResponse>;
export type CreateShareTokenBody = z.infer<typeof SProject.CreateShareTokenBody>;
export type CreateShareTokenResponse = z.infer<typeof SProject.CreateShareTokenResponse>;
export type ActionResponse = z.infer<typeof SProject.ActionResponse>;

export type ProjectListItemResponse = z.infer<typeof SProject.ProjectListItemResponse>;
export type ProjectListResponse = z.infer<typeof SProject.ProjectListResponse>;
export type ProjectDetailResponse = z.infer<typeof SProject.ProjectDetailResponse>;

export type CheckSlugResponse = z.infer<typeof SProject.CheckSlugResponse>;
