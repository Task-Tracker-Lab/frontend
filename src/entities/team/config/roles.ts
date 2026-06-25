import type { TeamRole } from '../model/types';

export const ROLE_LABELS: Record<Exclude<TeamRole, 'owner'>, string> = {
  admin: 'Администратор',
  member: 'Участник',
  viewer: 'Гость',
} as const;

export const INVITATION_ROLES = [
  ...new Set<keyof typeof ROLE_LABELS>(['admin', 'member', 'viewer']),
] as const;
