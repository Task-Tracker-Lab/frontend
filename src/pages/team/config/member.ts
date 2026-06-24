import { type TTeam } from 'entities/team';
import { ComponentProps } from 'react';
import { Badge } from 'shared/ui';

interface IMemberCardConfig {
  ringColor: Record<TTeam.MemberStatus, string>;
  bgColor: Record<TTeam.MemberStatus, string>;
  workloadColor: (w: number) => string;
  statusBadgeVariant: (s: TTeam.MemberStatus) => ComponentProps<typeof Badge>['variant'];
  workloadLabel: (w: number) => { text: string; color: string };
}

type EnsureAllStatuses<T> = {
  [K in TTeam.MemberStatus]: T;
};

export const memberCardConfig: IMemberCardConfig = {
  ringColor: {
    active: 'ring-primary',
    banned: 'ring-destructive',
    blocked: 'ring-destructive',
    inactive: 'ring-muted',
    pending: 'ring-muted',
  } satisfies EnsureAllStatuses<string>,
  bgColor: {
    active: 'bg-card',
    banned: 'bg-destructive/10',
    blocked: 'bg-destructive/10',
    inactive: 'bg-muted/90',
    pending: 'bg-muted/90',
  } satisfies EnsureAllStatuses<string>,
  workloadColor: (w) => {
    if (w === 0) return 'bg-muted/90';
    if (w <= 60) return 'bg-primary/40';
    if (w <= 80) return 'bg-primary';
    return 'bg-orange-500';
  },
  statusBadgeVariant: (s) => {
    if (s === 'banned') return 'destructive';
    if (s === 'active') return 'default';
    if (s === 'inactive') return 'outline';
  },
  workloadLabel: (w) => {
    if (w === 0) return { text: 'Не загружен', color: 'text-muted-foreground' };
    if (w <= 60) return { text: 'Низкая', color: 'text-muted-foreground' };
    if (w <= 80) return { text: 'Оптимальная', color: 'text-primary' };
    return { text: 'Перегружен', color: 'text-orange-600' };
  },
};
