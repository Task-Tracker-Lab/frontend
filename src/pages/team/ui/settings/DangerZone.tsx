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
import { RemoveTeamDialog } from 'features/teams/remove';

interface Props {
  teamName: string;
  slug: string;
}

export function DangerZone({ teamName, slug }: Props) {
  return (
    <Item variant="destructive">
      <ItemMedia>
        <AlertTriangle size={16} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Опасная зона</ItemTitle>
        <ItemDescription className="text-xs">
          Навсегда удалить это рабочее пространство со всеми проектами, задачами и данными. Действие
          необратимо.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <RemoveTeamDialog teamName={teamName} slug={slug} asChild>
          <Button variant="destructive" size="sm">
            Удалить рабочее пространство
          </Button>
        </RemoveTeamDialog>
      </ItemActions>
    </Item>
  );
}
