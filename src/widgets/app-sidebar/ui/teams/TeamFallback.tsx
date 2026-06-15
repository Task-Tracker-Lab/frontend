import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  Skeleton,
} from 'shared/ui';

export function TeamFallback() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="pointer-events-none">
        <Skeleton className="size-4 rounded-sm" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="ml-auto size-4 rounded-sm" />
      </SidebarMenuButton>
      <SidebarMenuSub className="gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuSubItem key={index} className="h-6">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="ml-2 h-full w-1/2 rounded-md" />
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}
