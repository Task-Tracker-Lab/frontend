import { InviteTeamMemberDialog } from 'features/teams/invite';
import { MailOpen } from 'lucide-react';
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from 'shared/ui';

export function InvitationsEmpty() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MailOpen />
        </EmptyMedia>
        <EmptyTitle>Нет активных приглашений</EmptyTitle>
        <EmptyDescription>
          Пригласите участников команды, чтобы они появились здесь.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InviteTeamMemberDialog asChild>
          <Button>Пригласить участника</Button>
        </InviteTeamMemberDialog>
      </EmptyContent>
    </Empty>
  );
}
