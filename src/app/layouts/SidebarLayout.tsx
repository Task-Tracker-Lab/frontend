import { TeamIdSync } from 'features/teams/active-team';
import { ComponentProps } from 'react';
import { Separator, SidebarInset, SidebarProvider, SidebarTrigger } from 'shared/ui';
import { AppSidebar } from 'widgets/app-sidebar';
import { NavUser } from 'widgets/nav-user';
import { Notifications } from 'widgets/notifications';
import { QuickCreate } from 'widgets/quick-create';

export function SidebarLayout({ children, ...props }: ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider {...props}>
      <TeamIdSync />
      <AppSidebar />
      <SidebarInset className="min-h-screen">
        <header className="bg-background sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="self-center! data-[orientation=vertical]:h-6"
            />
          </div>
          <div className="flex items-center gap-4">
            <QuickCreate />
            <Notifications />
            <NavUser />
          </div>
        </header>
        <div className="h-full overflow-x-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
