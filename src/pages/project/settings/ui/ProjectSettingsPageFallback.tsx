import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import { CardSection, Item, ItemActions, ItemContent, ItemMedia, Skeleton } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';

export function ProjectSettingsPageFallback() {
  return (
    <PageWrapper
      title="Настройки проекта"
      description={<Skeleton className="h-4 w-56" aria-hidden />}
      className="space-y-5"
      aria-busy="true"
      aria-label="Загрузка настроек проекта"
    >
      <div className="space-y-5">
        <CardSection title="Основные настройки" description="Название, ключ и оформление проекта.">
          <ProjectIdentityFieldsSkeleton />
        </CardSection>

        <CardSection title="Доступ" description="Видимость и статус проекта.">
          <div className="space-y-5">
            <div className="flex w-full items-center gap-2">
              <div className="flex flex-1 flex-col gap-0.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3.5 w-56" />
              </div>
              <Skeleton className="h-6 w-10 shrink-0 self-center rounded-full" />
            </div>
            <FieldSkeleton />
          </div>
        </CardSection>

        <CardSection title="Опасная зона" description="Необратимые действия с проектом.">
          <Item variant="destructive">
            <ItemMedia>
              <Skeleton className="size-4 rounded" />
            </ItemMedia>
            <ItemContent>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-1 h-3 w-full max-w-sm" />
            </ItemContent>
            <ItemActions>
              <Skeleton className="h-8 w-36 shrink-0 rounded-md" />
            </ItemActions>
          </Item>
        </CardSection>
      </div>
    </PageWrapper>
  );
}

function FieldSkeleton({ className, ...props }: ComponentProps<typeof Skeleton>) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton
        className={classNames('border-input block h-8 w-full rounded-lg border', {}, [className])}
        {...props}
      />
    </div>
  );
}

function ProjectIdentityFieldsSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <FieldSkeleton />
      <FieldSkeleton />
      <FieldSkeleton className="h-20" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-40" />
        <div className="border-border flex items-center justify-between gap-3 rounded-xl border p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 shrink-0 rounded-xl" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 shrink-0 rounded-md" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="size-8 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
