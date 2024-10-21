import type { Metadata } from 'next';
import './globals.css';
import { DM_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import StickyTop from '@/components/navbar/StickyTop';
import Footer from '@/components/footer/Footer';
const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${dm_sans.className} antialiased`}>
        <SessionProvider>
          {' '}
          <StickyTop />
          {children}
          <Toaster />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
