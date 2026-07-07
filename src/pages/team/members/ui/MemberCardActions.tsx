'use client';

import {
  INVITATION_ROLES,
  MEMBER_STATUSES,
  ROLE_LABELS,
  STATUS_LABELS,
  type TTeam,
} from 'entities/team';
import { Check, CircleDot, MoreHorizontal, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { classNames } from 'shared/lib/utils';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'shared/ui';
import { useUpdateMember } from '../api/useUpdateMember';
import { RemoveMemberDialog } from './RemoveMemberDialog';

interface MemberCardActionsProps {
  member: TTeam.TeamMemberResponse;
}

export function MemberCardActions({ member }: MemberCardActionsProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const { mutate: updateMember, isPending } = useUpdateMember();

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-8"
            aria-label="Действия с участником"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={isPending}>
              <Shield className="text-muted-foreground" />
              Роль
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {INVITATION_ROLES.map((role) => (
                <DropdownMenuItem
                  key={role}
                  disabled={isPending || role === member.role}
                  onSelect={() => updateMember({ userId: member.id, role })}
                >
                  <Check
                    className={classNames('size-4', {
                      invisible: role !== member.role,
                    })}
                  />
                  {ROLE_LABELS[role]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={isPending}>
              <CircleDot className="text-muted-foreground" />
              Статус
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {MEMBER_STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status}
                  disabled={isPending || status === member.status}
                  onSelect={() => updateMember({ userId: member.id, status })}
                >
                  <Check
                    className={classNames('size-4', {
                      invisible: status !== member.status,
                    })}
                  />
                  {STATUS_LABELS[status]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem variant="destructive" onSelect={() => setRemoveDialogOpen(true)}>
            <Trash2 className="text-muted-foreground" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveMemberDialog
        userId={member.id}
        name={member.fullName}
        open={removeDialogOpen}
        onOpenChange={setRemoveDialogOpen}
      />
    </div>
  );
}
