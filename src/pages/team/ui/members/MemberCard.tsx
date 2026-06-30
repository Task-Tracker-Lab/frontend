import { ROLE_LABELS, type TTeam } from 'entities/team';
import { X } from 'lucide-react';
import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemHeader,
  OwnerWrap,
} from 'shared/ui';
import { memberCardConfig as cfg } from '../../config/member';
import { MemberRoleSelect } from './MemberRoleSelect';
import { MemberStatusSelect } from './MemberStatusSelect';
import { RemoveMemberDialog } from './RemoveMemberDialog';

interface MemberCardProps extends Omit<ComponentProps<typeof ItemGroup>, 'children'> {
  member: TTeam.TeamMemberResponse;
}

export function MemberCard({ className, member, ...props }: MemberCardProps) {
  const isOwner = member.role === 'owner';

  return (
    <ItemGroup
      className={classNames(
        'border-border bg-card rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.18)]',
        {
          'opacity-50 grayscale': member.status === 'inactive',
        },
        [cfg.bgColor[member.status], className]
      )}
      {...props}
    >
      <Item>
        <ItemHeader className="justify-start gap-3">
          <OwnerWrap isOwner={isOwner}>
            <Avatar className={classNames('size-10', {}, [cfg.ringColor[member.status]])}>
              <AvatarImage src={member.avatar?.small ?? undefined} alt={member.fullName} />
              <AvatarFallback firstName={member.firstName} lastName={member.lastName} />
            </Avatar>
          </OwnerWrap>
          <div className="flex-1">
            <p className="text-sm font-semibold">{member.fullName}</p>
            {member.role !== 'owner' && (
              <span className="text-muted-foreground text-xs">{ROLE_LABELS[member.role]}</span>
            )}
          </div>
          {!isOwner && (
            <ItemActions>
              <RemoveMemberDialog userId={member.id} name={member.fullName}>
                <Button variant="ghost">
                  <X size={14} className="text-muted-foreground/50" />
                </Button>
              </RemoveMemberDialog>
            </ItemActions>
          )}
        </ItemHeader>
        {!isOwner && (
          <ItemContent>
            <div className="flex items-center gap-1.5">
              <MemberRoleSelect userId={member.id} role={member.role} />
              <MemberStatusSelect userId={member.id} status={member.status} />
            </div>
          </ItemContent>
        )}
      </Item>
    </ItemGroup>
  );
}
