'use client';

import { ROLE_LABELS, STATUS_LABELS, type TTeam } from 'entities/team';
import { classNames } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  OwnerWrap,
} from 'shared/ui';
import { memberCardConfig as cfg } from '../config/member';
import { MemberCardActions } from './MemberCardActions';

interface MemberCardProps {
  member: TTeam.TeamMemberResponse;
}

export function MemberCard({ member }: MemberCardProps) {
  const isOwner = member.role === 'owner';

  return (
    <Item
      variant="outline"
      className={classNames(
        'flex-nowrap',
        {
          'opacity-50 grayscale': member.status === 'inactive',
        },
        [cfg.bgColor[member.status]]
      )}
    >
      <ItemMedia>
        <OwnerWrap isOwner={isOwner}>
          <Avatar className={classNames('size-10', {}, [cfg.ringColor[member.status]])}>
            <AvatarImage src={member.avatar?.small ?? undefined} alt={member.fullName} />
            <AvatarFallback firstName={member.firstName} lastName={member.lastName} />
          </Avatar>
        </OwnerWrap>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{member.fullName}</ItemTitle>
        <ItemDescription className="line-clamp-2">
          {isOwner
            ? 'Владелец'
            : `${ROLE_LABELS[member.role as Exclude<TTeam.TeamRole, 'owner'>]} · ${STATUS_LABELS[member.status]}`}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="self-start">
        <MemberCardActions member={member} />
      </ItemActions>
    </Item>
  );
}
