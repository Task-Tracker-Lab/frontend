import { TriangleAlert } from 'lucide-react';
import { classNames } from 'shared/lib/utils';
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from 'shared/ui';

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Не удалось загрузить данные',
  description = 'Попробуйте снова. Если ошибка повторится, перезагрузите страницу.',
  actionLabel = 'Повторить',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <Empty className={classNames('border-none', {}, [className])}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlert className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {onRetry ? (
        <EmptyContent>
          <Button type="button" onClick={onRetry}>
            {actionLabel}
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  );
}
