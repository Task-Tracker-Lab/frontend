import { BOARD_COLUMN_COLORS, TBoard } from 'entities/board';
import { RemoveColumnDialog } from 'features/boards/column/remove';
import { CreateTaskButton } from 'features/task/create';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
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
  KanbanColumnHandle,
} from 'shared/ui';

export interface TaskColumnHeaderProps extends TBoard.BoardColumnResponse {
  tasksLength: number;
}

export function TaskColumnHeader({ data }: { data: TaskColumnHeaderProps }) {
  const { tasksLength, name, id, boardId, color } = data;
  const [activeColor, setActiveColor] = useState<string>(color ?? BOARD_COLUMN_COLORS[0]);

  const existColor = BOARD_COLUMN_COLORS.findIndex((v) => v.toLowerCase() === data.color);
  const isExistColor = existColor !== -1;
  const newColors = isExistColor
    ? [...BOARD_COLUMN_COLORS]
    : color
      ? [color, ...BOARD_COLUMN_COLORS]
      : [...BOARD_COLUMN_COLORS];

  return (
    <KanbanColumnHandle variant="visible" cursor={false} asChild>
      <div className="dark:bg-card overflow-hidden rounded-lg bg-gray-100">
        <div style={{ backgroundColor: activeColor }} className="h-1.5" />
        <div className="flex h-8 items-center justify-between gap-2 rounded-xl px-2.5 py-1.5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-muted-foreground line-clamp-1 text-sm font-medium">{`${name} (${tasksLength})`}</h2>
          </div>
          <div className="flex items-center">
            <CreateTaskButton id={id} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={'icon-sm'} variant={'ghost'}>
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px]">
                <DropdownMenuGroup>
                  <RemoveColumnDialog columnId={id} boardId={boardId} asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                      Удалить
                    </DropdownMenuItem>
                  </RemoveColumnDialog>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Цвет колонки</DropdownMenuLabel>
                  <ColorPicker
                    colors={[...newColors]}
                    size="sm"
                    className="p-2"
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </KanbanColumnHandle>
  );
}
