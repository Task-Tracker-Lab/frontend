import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui';

interface TaskMemberProps {
  name: string;
  avatarUrl?: string | null;
}

export function TaskMember({ name, avatarUrl }: TaskMemberProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-7">
        <AvatarImage src={avatarUrl ?? undefined} />
        <AvatarFallback className="text-xs">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="truncate font-medium">{name}</span>
    </div>
  );
}
