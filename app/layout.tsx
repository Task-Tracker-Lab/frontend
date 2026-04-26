import 'app/styles/global.css';
import { QueryProvider } from 'shared/providers';
import { Toaster, TooltipProvider } from 'shared/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
