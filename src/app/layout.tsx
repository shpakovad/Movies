import { ConfigProvider } from 'antd';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { antStyleTheme } from '@/app/shared/antStyleTheme';

import './globals.css';
import './lib/theme/css-variables.css';
import StoreProvider from '@/app/StoreProvider';

const roboto = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Movies list',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={antStyleTheme}>
        <body className={`${roboto.variable}`}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </ConfigProvider>
    </html>
  );
}
