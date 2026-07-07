'use client';

import { INVITATION_ROLES, ROLE_LABELS, type TTeam } from 'entities/team';
import { Check, MoreHorizontal, Shield, Trash2 } from 'lucide-react';
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
import { useUpdateInvitation } from '../api/useUpdateInvitation';
import { RemoveInvitationDialog } from './RemoveInvitationDialog';

interface InvitationCardActionsProps {
  invitation: TTeam.TeamInvitationResponse;
}

export function InvitationCardActions({ invitation }: InvitationCardActionsProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const { mutate: updateInvitation, isPending } = useUpdateInvitation();

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
            aria-label="Действия с приглашением"
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
                  disabled={isPending || role === invitation.role}
                  onSelect={() => updateInvitation({ code: invitation.code, role })}
                >
                  <Check
                    className={classNames('size-4', {
                      invisible: role !== invitation.role,
                    })}
                  />
                  {ROLE_LABELS[role]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem variant="destructive" onSelect={() => setRemoveDialogOpen(true)}>
            <Trash2 className="text-muted-foreground" />
            Отозвать
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveInvitationDialog
        code={invitation.code}
        open={removeDialogOpen}
        onOpenChange={setRemoveDialogOpen}
      />
    </div>
  );
}
