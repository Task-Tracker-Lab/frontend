import { type TTeam } from 'entities/team';

interface IMemberCardConfig {
  ringColor: Record<TTeam.MemberStatus, string>;
  bgColor: Record<TTeam.MemberStatus, string>;
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
};
