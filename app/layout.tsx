import 'app/styles/global.css';
import { AppProviders } from 'app/providers/AppProviders';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
