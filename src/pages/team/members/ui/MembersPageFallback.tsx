import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Skeleton,
} from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';

export function MembersPageFallback() {
  return (
    <PageWrapper
      title="Участники команды"
      description={<Skeleton className="h-4 w-40" aria-hidden />}
      action={<Skeleton className="h-9 w-32 rounded-md" aria-hidden />}
    >
      <div className="mb-5">
        <Skeleton className="h-7 w-80 rounded-md" aria-hidden />
      </div>

      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-busy="true"
        aria-label="Загрузка участников"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Item variant="outline" className="flex-nowrap" key={index}>
            <ItemMedia>
              <Skeleton className="size-10 shrink-0 rounded-full" aria-hidden />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <Skeleton className="h-4 w-32 max-w-[70%]" aria-hidden />
              </ItemTitle>
              <ItemDescription>
                <Skeleton className="mt-1 h-3 w-full max-w-[90%]" aria-hidden />
              </ItemDescription>
            </ItemContent>
            <ItemActions className="self-start">
              <Skeleton className="size-8 shrink-0 rounded-md" aria-hidden />
            </ItemActions>
          </Item>
        ))}
      </div>
    </PageWrapper>
  );
}
