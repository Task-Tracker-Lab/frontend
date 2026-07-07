import { RemoveColumnDialog } from 'features/boards/column/remove';
import { Ellipsis, Trash2 } from 'lucide-react';
import {
  Button,
  ColorPicker,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/ui';

interface ColumnHeaderActionsProps {
  columnId: string;
  boardSlug: string;
  colors: string[];
  activeColor: string;
  setActiveColor: (color: string) => void;
}

export function ColumnHeaderActions({
  columnId,
  boardSlug,
  colors,
  activeColor,
  setActiveColor,
}: ColumnHeaderActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        <DropdownMenuGroup>
          <RemoveColumnDialog columnId={columnId} boardSlug={boardSlug} asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
              <Trash2 className="size-4" />
              Удалить этап
            </DropdownMenuItem>
          </RemoveColumnDialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Цвет этапа</DropdownMenuLabel>
          <ColorPicker
            colors={colors}
            size="sm"
            className="p-2"
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
