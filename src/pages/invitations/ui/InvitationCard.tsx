'use client';

import { type TUser } from 'entities/user';
import { MailIcon } from 'lucide-react';
import { useAcceptTeamInvitation } from '../api/useAcceptTeamInvitation';
import { formatDate } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

interface InvitationCardProps {
  invitation: TUser.UserInvitationResponse;
}

export function InvitationCard({ invitation }: InvitationCardProps) {
  const acceptInvitation = useAcceptTeamInvitation();

  return (
    <Item variant="outline">
      <ItemHeader>
        <ItemMedia>
          <Avatar>
            <AvatarImage src={invitation.teamAvatar?.small} alt={invitation.teamName} />
            <AvatarFallback>
              <MailIcon />
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{invitation.teamName}</ItemTitle>
        </ItemContent>
      </ItemHeader>
      <ItemContent>
        <ItemDescription className="line-clamp-3">
          <span className="block">От {invitation.inviterName}</span>
          <span className="block">роль: {invitation.role}</span>
          <span className="block">До {formatDate(invitation.expiresAt)}</span>
        </ItemDescription>
        <ItemActions className="mt-2">
          <Button
            type="button"
            size="sm"
            disabled={acceptInvitation.isPending}
            onClick={() => acceptInvitation.mutate(invitation.code)}
          >
            {acceptInvitation.isPending ? 'Принимаем…' : 'Принять'}
          </Button>
        </ItemActions>
      </ItemContent>
    </Item>
  );
}
