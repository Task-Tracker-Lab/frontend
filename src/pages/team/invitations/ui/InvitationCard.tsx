'use client';

import { ROLE_LABELS, type TTeam } from 'entities/team';
import { formatDate } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';
import { InvitationCardActions } from './InvitationCardActions';

interface InvitationCardProps {
  invitation: TTeam.TeamInvitationResponse;
}

export function InvitationCard({ invitation }: InvitationCardProps) {
  const emailInitial = invitation.email.charAt(0).toUpperCase();

  return (
    <Item variant="outline" className="flex-nowrap">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarFallback>{emailInitial}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{invitation.email}</ItemTitle>
        <ItemDescription className="line-clamp-2">
          {ROLE_LABELS[invitation.role as Exclude<TTeam.TeamRole, 'owner'>]} · Истекает{' '}
          {formatDate(invitation.expiresAt)}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="self-start">
        <InvitationCardActions invitation={invitation} />
      </ItemActions>
    </Item>
  );
}
