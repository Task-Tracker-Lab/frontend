import { Item, ItemActions, ItemContent, Skeleton } from 'shared/ui';

export function TeamItemSkeleton() {
  return (
    <>
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Item className="p-2">
        <ItemContent>
          <div className="grid gap-1 text-sm leading-tight">
            <Skeleton className="h-3 w-32 max-w-[70%]" />
            <Skeleton className="h-2 w-24 max-w-[55%]" />
          </div>
        </ItemContent>
        <ItemActions>
          <Skeleton className="size-3 shrink-0 rounded-sm" aria-hidden />
        </ItemActions>
      </Item>
    </>
  );
}
