import { TTeam } from 'entities/team';
import { X } from 'lucide-react';
import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  Progress,
} from 'shared/ui';
import { memberCardConfig as cfg } from '../../config/member';
import { MemberRoleSelect } from './MemberRoleSelect';
import { MemberStatusSelect } from './MemberStatusSelect';
import { RemoveMemberDialog } from './RemoveMemberDialog';

const workload = 61; //todo: mock
const skills = ['Design System', 'Sprint Plan']; //todo: mock
const backOn = '2026-05-10'; //todo: mock

interface MemberCardProps extends Omit<ComponentProps<typeof ItemGroup>, 'children'> {
  member: TTeam.TeamMemberResponse;
}

export function MemberCard({ className, member, ...props }: MemberCardProps) {
  const wl = cfg.workloadLabel(workload);

  return (
    <ItemGroup
      className={classNames(
        'border-border bg-card rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.18)]',
        {
          'opacity-50 grayscale': member.status === 'pending',
        },
        [cfg.bgColor[member.status], className]
      )}
      {...props}
    >
      <Item>
        <ItemHeader className="justify-start gap-3">
          <Avatar
            size="lg"
            className={classNames('ring-background size-28 shadow-md ring-2', {}, [
              cfg.ringColor[member.status],
            ])}
          >
            <AvatarImage src={member.avatar?.small ?? undefined} alt={member.fullName} />
            <AvatarFallback firstName={member.firstName} lastName={member.lastName} />
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-semibold">{member.fullName}</p>
          </div>
          {member.role !== 'owner' && (
            <ItemActions>
              <RemoveMemberDialog userId={member.id} name={member.fullName}>
                <Button variant="ghost">
                  <X size={14} className="text-muted-foreground/50" />
                </Button>
              </RemoveMemberDialog>
            </ItemActions>
          )}
        </ItemHeader>
        <ItemContent>
          <div className="flex items-center gap-1.5">
            {member.role !== 'owner' ? (
              <MemberRoleSelect userId={member.id} role={member.role} />
            ) : null}
            {member.role !== 'owner' ? (
              <MemberStatusSelect userId={member.id} status={member.status} />
            ) : null}
          </div>
          <div className="mt-1.5 flex flex-row flex-wrap items-center gap-1.5">
            {member.role === 'owner' && <Badge variant="default">Владелец</Badge>}
            {(skills ?? []).map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
        </ItemContent>
        <ItemFooter className="mt-3 flex flex-col gap-2">
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Загруженность
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-semibold ${wl.color}`}>{wl.text}</span>
              <span className="text-muted-foreground text-xs font-semibold">{workload}%</span>
            </div>
          </div>
          <Progress
            className={classNames('h-1.5', {}, [
              '[&>[data-slot=progress-indicator]]:' + cfg.workloadColor(workload),
            ])}
            value={workload}
          />
          {backOn && (
            <div className="mt-2 flex w-full items-center justify-between gap-1 text-[11px] font-medium">
              <span className="text-muted-foreground">В отпуске</span>
              <span>Вернётся {backOn}</span>
            </div>
          )}
        </ItemFooter>
      </Item>
    </ItemGroup>
  );
}
