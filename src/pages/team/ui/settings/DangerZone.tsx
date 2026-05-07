import { AlertTriangle } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from 'shared/ui';
import { DeleteWorkspaceDialog } from './DeleteWorkspaceDialog';

interface Props {
  workspaceName: string;
}

export function DangerZone({ workspaceName }: Props) {
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
        <DeleteWorkspaceDialog workspaceName={workspaceName} />
      </ItemActions>
    </Item>
  );
}
