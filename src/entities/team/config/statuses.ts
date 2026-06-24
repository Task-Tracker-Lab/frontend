import type { MemberStatus } from '../model/types';

export const STATUS_LABELS = {
  active: 'Активен',
  banned: 'Заблокирован',
  blocked: 'Заблокирован',
  inactive: 'Неактивен',
  pending: 'Неактивен',
} as const satisfies Record<MemberStatus, string>;

export const MEMBER_STATUSES = [
  ...new Set<keyof typeof STATUS_LABELS>(['active', 'inactive', 'banned']),
] as const;
