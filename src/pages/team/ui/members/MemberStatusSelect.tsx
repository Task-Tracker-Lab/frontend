import { MEMBER_STATUSES, STATUS_LABELS, TTeam } from 'entities/team';
import { ComponentProps } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui';
import { useUpdateMember } from '../../api/useUpdateMember';

interface MemberStatusSelectProps extends Omit<
  ComponentProps<typeof Select>,
  'children' | 'value' | 'onValueChange' | 'disabled'
> {
  userId: string;
  status: TTeam.MemberStatus;
}

export function MemberStatusSelect({ userId, status, ...props }: MemberStatusSelectProps) {
  const { mutate: updateMember, isPending } = useUpdateMember();

  return (
    <Select
      {...props}
      value={status}
      onValueChange={(value: TTeam.MemberStatus) => updateMember({ userId, status: value })}
      disabled={isPending}
    >
      <SelectTrigger className="h-6 w-auto gap-1 border-0 bg-transparent px-1.5 py-0 text-xs shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {MEMBER_STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            {STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
