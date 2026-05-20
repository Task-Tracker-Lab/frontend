import type { MemberStatus } from '../model/types';

export const STATUS_LABELS: Record<MemberStatus, string> = {
  active: 'Активен',
  banned: 'Заблокирован',
  inactive: 'Неактивен',
} as const;

export const MEMBER_STATUSES = [
  ...new Set<keyof typeof STATUS_LABELS>(['active', 'inactive', 'banned']),
] as const;
