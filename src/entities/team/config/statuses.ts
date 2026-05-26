import type { MemberStatus } from '../model/types';

export const STATUS_LABELS: Record<MemberStatus, string> = {
  active: 'Активен',
  blocked: 'Заблокирован',
  pending: 'Неактивен',
} as const;

export const MEMBER_STATUSES = [
  ...new Set<keyof typeof STATUS_LABELS>(['active', 'pending', 'blocked']),
] as const;
