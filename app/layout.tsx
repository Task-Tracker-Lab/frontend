import 'app/styles/global.css';
import { AppProviders } from 'app/providers/AppProviders';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['cyrillic'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
