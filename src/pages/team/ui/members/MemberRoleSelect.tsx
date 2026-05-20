import { INVITATION_ROLES, ROLE_LABELS, TTeam } from 'entities/team';
import { ComponentProps } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui';
import { useUpdateMember } from '../../api/useUpdateMember';

interface MemberRoleSelectProps extends Omit<
  ComponentProps<typeof Select>,
  'children' | 'value' | 'onValueChange' | 'disabled'
> {
  userId: string;
  role: TTeam.TeamRole;
}

export function MemberRoleSelect({ userId, role, ...props }: MemberRoleSelectProps) {
  const { mutate: updateMember, isPending } = useUpdateMember();

  return (
    <Select
      {...props}
      value={role}
      onValueChange={(value: TTeam.TeamRole) => updateMember({ userId, role: value })}
      disabled={isPending}
    >
      <SelectTrigger className="h-6 w-auto gap-1 border-0 bg-transparent px-1.5 py-0 text-xs shadow-none focus:ring-0">
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
