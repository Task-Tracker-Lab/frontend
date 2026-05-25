import { TUser } from 'entities/user';
import { useAcceptTeamInvitation } from '../../api/useAcceptTeamInvitation';
import { MailIcon } from 'lucide-react';
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
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

export function InvitationItem(props: TUser.UserInvitationResponse) {
  const acceptInvitation = useAcceptTeamInvitation();

  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar>
          <AvatarImage src={props.teamAvatar?.small ?? undefined} alt={props.teamName} />
          <AvatarFallback>
            <MailIcon />
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{props.teamName}</ItemTitle>
        <ItemDescription>
          От {props.inviterName} · роль: {props.role}. Действует до {formatDate(props.expiresAt)}.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          type="button"
          size="sm"
          disabled={acceptInvitation.isPending}
          onClick={() => acceptInvitation.mutate(props.code)}
        >
          {acceptInvitation.isPending ? 'Принимаем…' : 'Принять'}
        </Button>
      </ItemActions>
    </Item>
  );
}
