import 'app/styles/global.css';
import { QueryProvider } from 'shared/providers';
import { Toaster } from 'shared/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
