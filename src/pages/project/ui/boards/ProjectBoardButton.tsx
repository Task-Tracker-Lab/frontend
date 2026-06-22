import { VariantProps } from 'class-variance-authority';
import { type TBoard, useBoardStore } from 'entities/board';
import { RemoveBoardDialog } from 'features/boards/remove';
import { EllipsisVertical } from 'lucide-react';
import { ComponentProps } from 'react';
import { cn } from 'shared/lib/utils';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  buttonVariants,
} from 'shared/ui';

type BoardButtonProps = ComponentProps<'div'> &
  VariantProps<typeof buttonVariants> & {
    board: TBoard.BoardResponse;
    projectSlug: string;
  };

export function ProjectBoardButton({
  projectSlug,
  board,
  className,
  variant = 'outline',
  size = 'default',
  ...props
}: BoardButtonProps) {
  const setActiveBoardId = useBoardStore((s) => s.setBoardId);
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  return (
    <div
      className={cn(
        buttonVariants({
          variant: activeBoardId === board.id ? 'default' : variant,
          size,
          className,
        }),
        'px-0'
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setActiveBoardId(board.id, board.slug)}
        className="h-full px-3 text-left"
      >
        <span>{board.title}</span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="h-full">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <RemoveBoardDialog projectSlug={projectSlug} boardSlug={board.slug} asChild>
            <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
              Удалить
            </DropdownMenuItem>
          </RemoveBoardDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
