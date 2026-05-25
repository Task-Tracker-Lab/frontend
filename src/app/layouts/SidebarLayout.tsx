import { ComponentProps } from 'react';
import { TeamSlugSync } from 'features/teams/active-team';
import { Separator, SidebarInset, SidebarProvider, SidebarTrigger } from 'shared/ui';
import { AppSidebar } from 'widgets/app-sidebar';

export function SidebarLayout({ children, ...props }: ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider {...props}>
      <TeamSlugSync />
      <AppSidebar />
      <SidebarInset className="min-h-screen">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 self-center! data-[orientation=vertical]:h-6"
          />
        </header>
        <div className="h-full overflow-x-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
