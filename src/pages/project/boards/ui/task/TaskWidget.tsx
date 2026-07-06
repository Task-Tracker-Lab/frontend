'use client';

import { XIcon } from 'lucide-react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from 'shared/ui';
import { Task } from 'widgets/task';

interface TaskWidgetProps {
  taskId: string | null;
  projectSlug: string;
  boardSlug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskTitle?: string;
}

export function TaskWidget({
  taskId,
  projectSlug,
  boardSlug,
  open,
  onOpenChange,
  taskTitle,
}: TaskWidgetProps) {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="data-[vaul-drawer-direction=right]:flex data-[vaul-drawer-direction=right]:h-full data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:flex-col data-[vaul-drawer-direction=right]:sm:max-w-[900px]">
        <DrawerHeader className="relative shrink-0 border-b">
          <DrawerTitle className="line-clamp-2 pr-8 text-left">{taskTitle ?? 'Задача'}</DrawerTitle>
          <DrawerDescription className="sr-only">Детали задачи</DrawerDescription>
          <DrawerClose asChild>
            <Button variant="ghost" className="absolute top-3 right-3" size="icon-sm">
              <XIcon />
              <span className="sr-only">Закрыть</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="min-h-0 flex-1">
          {taskId ? <Task taskId={taskId} projectSlug={projectSlug} boardSlug={boardSlug} /> : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
