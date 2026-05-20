import { Item, ItemActions, ItemContent, ItemMedia, Skeleton } from 'shared/ui';

export function DangerZoneSkeleton() {
  return (
    <Item variant="destructive">
      <ItemMedia>
        <Skeleton className="size-4 rounded" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-1 h-3 w-full max-w-xs" />
      </ItemContent>
      <ItemActions>
        <Skeleton className="h-8 w-44 shrink-0 rounded-md" />
      </ItemActions>
    </Item>
  );
}
