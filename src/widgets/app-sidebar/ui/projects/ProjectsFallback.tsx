import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  Skeleton,
} from 'shared/ui';

export function ProjectsFallback() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="pointer-events-none">
        <Skeleton className="size-4 rounded-sm" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="ml-auto size-4 rounded-sm" />
      </SidebarMenuButton>
      <SidebarMenuSub className="gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <SidebarMenuSubItem key={index} className="h-6">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="ml-2 h-full w-1/2 rounded-md" />
          </SidebarMenuSubItem>
        ))}
        <SidebarMenuSubItem>
          <Skeleton className="h-6 w-1/2 rounded-md" />
          <Skeleton className="ml-2 h-6 w-4 rounded-sm" />
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}
