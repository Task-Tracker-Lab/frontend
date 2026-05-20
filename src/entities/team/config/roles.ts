import type { TeamRole } from '../model/types';

export const ROLE_LABELS: Record<Exclude<TeamRole, 'owner'>, string> = {
  admin: 'Администратор',
  lead: 'Лид',
  moderator: 'Модератор',
  member: 'Участник',
  viewer: 'Гость',
} as const;

export const INVITATION_ROLES = [
  ...new Set<keyof typeof ROLE_LABELS>(['admin', 'lead', 'moderator', 'member', 'viewer']),
] as const;
