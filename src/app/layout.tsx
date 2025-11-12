import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import HeaderPage from '@/app/components/Header/HeaderPage';
import { AntdCompatProvider } from '@/app/providers/AntdCompatProvider';
import { AntdProvider } from '@/app/providers/AntdProvider';
import StoreProvider from '@/app/providers/StoreProvider';

import './globals.css';
import './lib/theme/css-variables.css';

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
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdProvider>
        <body className={`${roboto.variable}`}>
          <AntdCompatProvider>
            <StoreProvider>
              <HeaderPage />
              <main>{children}</main>
            </StoreProvider>
          </AntdCompatProvider>
        </body>
      </AntdProvider>
    </html>
  );
}
