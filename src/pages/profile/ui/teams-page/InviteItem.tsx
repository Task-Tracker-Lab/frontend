import { TUser } from 'entities/user';
import { useAcceptTeamInvite } from '../../api/useAcceptTeamInvite';
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

export function InviteItem(props: TUser.UserInviteResponse) {
  const acceptInvite = useAcceptTeamInvite();

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
          disabled={acceptInvite.isPending}
          onClick={() => acceptInvite.mutate(props.code)}
        >
          {acceptInvite.isPending ? 'Принимаем…' : 'Принять'}
        </Button>
      </ItemActions>
    </Item>
  );
}