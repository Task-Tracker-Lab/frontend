'use client';

import { type TUser } from 'entities/user';
import { InviteTeamMemberDialog } from 'features/teams/invite';
import { RemoveTeamDialog } from 'features/teams/remove';
import { MoreHorizontal, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

interface TeamCardActionsProps {
  team: TUser.UserTeamResponse;
}

export function TeamCardActions({ team }: TeamCardActionsProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const isInviteDisabled = !team.permissions.canInvite;
  const isRemoveDisabled = !team.permissions.canDelete;

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
            aria-label="Действия с командой"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuItem onSelect={() => setInviteDialogOpen(true)} disabled={isInviteDisabled}>
            <UserPlus className="text-muted-foreground" />
            Пригласить
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setRemoveDialogOpen(true)}
            disabled={isRemoveDisabled}
          >
            <Trash2 className="text-muted-foreground" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <InviteTeamMemberDialog
        teamId={team.id}
        dialog={{ open: inviteDialogOpen, onOpenChange: setInviteDialogOpen }}
      />
      <RemoveTeamDialog
        teamId={team.id}
        teamName={team.name}
        dialog={{ open: removeDialogOpen, onOpenChange: setRemoveDialogOpen }}
      />
    </div>
  );
}
