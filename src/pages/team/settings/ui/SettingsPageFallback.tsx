import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import { CardSection, Item, ItemActions, ItemContent, ItemMedia, Skeleton } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';

export function SettingsPageFallback() {
  return (
    <PageWrapper
      title="Настройки"
      description="Измените название, описание и другие параметры команды"
      className="space-y-5"
      aria-busy="true"
      aria-label="Загрузка настроек команды"
    >
      <form className="space-y-5">
        <CardSection title="Идентификация команды" description="Публичная информация о команде.">
          <div className="space-y-5">
            <Skeleton className="h-28 w-full rounded-lg" aria-hidden />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[120px_1fr]">
              <Skeleton className="size-28 rounded-full" aria-hidden />
              <div className="space-y-4">
                <FieldSkeleton />
                <FieldSkeleton className="h-20" />
              </div>
            </div>

            <Skeleton className="h-px w-full" aria-hidden />
            <Skeleton className="h-3 w-48" aria-hidden />
          </div>
        </CardSection>

        <Item variant="destructive">
          <ItemMedia>
            <Skeleton className="size-4 rounded" aria-hidden />
          </ItemMedia>
          <ItemContent>
            <Skeleton className="h-4 w-28" aria-hidden />
            <Skeleton className="mt-1 h-3 w-full max-w-md" aria-hidden />
          </ItemContent>
          <ItemActions>
            <Skeleton className="h-8 w-36 shrink-0 rounded-md" aria-hidden />
          </ItemActions>
        </Item>
      </form>
    </PageWrapper>
  );
}

function FieldSkeleton({ className, ...props }: ComponentProps<typeof Skeleton>) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-32" aria-hidden />
      <Skeleton
        className={classNames('border-input block h-8 w-full rounded-lg border', {}, [className])}
        {...props}
      />
    </div>
  );
}
