import { RemoveTeamDialog } from 'features/teams/remove';
import { AlertTriangle } from 'lucide-react';
import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

interface Props {
  teamName: string;
  teamId: string;
}

export function DangerZone({ teamName, teamId }: Props) {
  return (
    <Item variant="destructive">
      <ItemMedia>
        <AlertTriangle size={16} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Опасная зона</ItemTitle>
        <ItemDescription className="text-xs">
          Навсегда удалить эту команду со всеми проектами, задачами и данными. Действие необратимо.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <RemoveTeamDialog teamName={teamName} teamId={teamId} asChild>
          <Button variant="destructive" size="sm">
            Удалить команду
          </Button>
        </RemoveTeamDialog>
      </ItemActions>
    </Item>
  );
}
