import type { Metadata } from 'next';
import "./globals.css";
import { CMSLayout } from '@/components/CMSLayout';

export const metadata: Metadata = {
  title: 'Jaladri CMS - Content Management System',
  description: 'Content Management System untuk Jaladri News - Portal Berita Modern',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <CMSLayout>
          {children}
        </CMSLayout>
      </body>
    </html>
  );
}