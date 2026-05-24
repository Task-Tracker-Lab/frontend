import { GlobalSuccess } from 'shared/api';
import { z } from 'zod/v4';
import { PROJECT_ICONS } from '../config/icons';

export const ActionResponse = GlobalSuccess;

export const CreateProjectBody = z.object({
  name: z.string().min(1).max(100),
  key: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[A-Z0-9]+$/),
  description: z.string().max(2000).optional().nullable(),
  icon: z.enum(PROJECT_ICONS).optional().nullable(),
  color: z
    .string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .optional(),
  visibility: z.enum(['public', 'private']),
});

export const UpdateProjectBody = CreateProjectBody.extend({
  status: z.enum(['active', 'archived']).optional(),
  isPublic: z.boolean().optional(),
})
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  });

export const CreateProjectResponse = GlobalSuccess.extend({
  projectId: z.string(),
});

export const CreateShareTokenBody = z.object({
  ttl: z.iso.datetime({}).optional().nullable(),
});

export const ProjectListItemResponse = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  status: z.enum(['active', 'archived', 'template']),
  color: z.string(),
  icon: z.string().nullable(),
  createdAt: z.iso.datetime({}),
  canEdit: z.boolean(),
});

export const ProjectListResponse = z.object({
  team: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    role: z.string(),
  }),
  items: ProjectListItemResponse.array(),
  meta: z.object({ total: z.number() }),
});

export const ProjectDetailResponse = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  status: z.enum(['active', 'archived', 'template']),
  description: z.string().nullable(),
  visuals: z.object({ color: z.string(), icon: z.string().nullable() }),
  meta: z.object({
    taskSequence: z.number(),
    createdAt: z.iso.datetime({}),
    updatedAt: z.iso.datetime({}),
  }),
  access: z.object({
    visibility: z.enum(['public', 'private']),
    canEdit: z.boolean(),
    canDelete: z.boolean(),
    shareUrl: z.string().nullable(),
  }),
  settings: z.record(z.string(), z.unknown()),
});
