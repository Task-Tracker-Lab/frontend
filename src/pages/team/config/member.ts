import { type TTeam } from 'entities/team';
import { ComponentProps } from 'react';
import { Badge } from 'shared/ui';

interface IMemberCardConfig {
  ringColor: Record<TTeam.TeamMemberResponse['status'], string>;
  bgColor: Record<TTeam.TeamMemberResponse['status'], string>;
  workloadColor: (w: number) => string;
  statusBadgeVariant: (s: TTeam.MemberStatus) => ComponentProps<typeof Badge>['variant'];
  workloadLabel: (w: number) => { text: string; color: string };
}

export const memberCardConfig: IMemberCardConfig = {
  ringColor: {
    banned: 'ring-destructive',
    active: 'ring-primary',
    inactive: 'ring-muted',
  },
  bgColor: {
    banned: 'bg-destructive/10',
    active: 'bg-card',
    inactive: 'bg-muted/90',
  },
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
