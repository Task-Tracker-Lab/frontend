import 'app/styles/global.css';
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'shared/ui';
import { AppSidebar } from 'app/layouts/BaseLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
