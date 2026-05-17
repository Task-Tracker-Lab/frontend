import { INVITATION_ROLES, ROLE_LABELS, TTeam } from 'entities/team';
import { ComponentProps } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui';
import { useUpdateInvitation } from '../../api/useUpdateInvitation';

interface InvitationRoleSelectProps extends Omit<
  ComponentProps<typeof Select>,
  'children' | 'value' | 'onValueChange' | 'disabled'
> {
  code: string;
  role: TTeam.TeamRole;
}

export function InvitationRoleSelect({ code, role, ...props }: InvitationRoleSelectProps) {
  const { mutate: updateInvitation, isPending } = useUpdateInvitation();

  return (
    <Select
      {...props}
      value={role}
      onValueChange={(value) => updateInvitation({ code, role: value as TTeam.TeamRole })}
      disabled={isPending}
    >
      <SelectTrigger className="w-fulle h-6 gap-1 border-0 bg-transparent px-1.5 py-0 text-xs shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {INVITATION_ROLES.map((r) => (
          <SelectItem key={r} value={r} className="text-xs">
            {ROLE_LABELS[r]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
