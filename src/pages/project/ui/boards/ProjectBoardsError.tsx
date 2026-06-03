import { AlertTriangle, RefreshCw } from 'lucide-react';
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from 'shared/ui';

interface ProjectBoardsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function ProjectBoardsError({ message, onRetry }: ProjectBoardsErrorProps) {
  return (
    <div className="flex h-full p-5">
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="text-destructive bg-destructive/10">
            <AlertTriangle />
          </EmptyMedia>
          <EmptyTitle>Не удалось загрузить доски</EmptyTitle>
          <EmptyDescription>
            {message ?? 'Проверьте подключение и попробуйте обновить список досок.'}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button type="button" variant="outline" onClick={onRetry}>
            <RefreshCw />
            Повторить
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
