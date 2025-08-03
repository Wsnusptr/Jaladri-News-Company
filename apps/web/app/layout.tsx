import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// --- Semua import Anda sudah benar ---
import { Providers } from '@/app/providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientPopupWrapper } from '@/components/shared/ClientPopupWrapper';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import '@/styles/globals.css';
import '@/styles/animations.css';
// --- Tambahkan import untuk SessionProvider ---
import SessionProvider from '@/components/auth/SessionProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jaladri News - Portal Berita Modern',
  description: 'Portal berita terkini Indonesia dengan informasi politik, ekonomi, olahraga, teknologi, dan lifestyle. Dapatkan berita terpercaya dan terbaru setiap hari.',
  keywords: 'berita, news, indonesia, politik, ekonomi, olahraga, teknologi, lifestyle, jaladri',
  authors: [{ name: 'Jaladri News Team' }],
  creator: 'Jaladri News',
  publisher: 'Jaladri News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jaladri News - Portal Berita Modern',
    description: 'Portal berita terkini Indonesia dengan informasi politik, ekonomi, olahraga, teknologi, dan lifestyle.',
    url: '/',
    siteName: 'Jaladri News',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Jaladri News Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaladri News - Portal Berita Modern',
    description: 'Portal berita terkini Indonesia dengan informasi politik, ekonomi, olahraga, teknologi, dan lifestyle.',
    images: ['/logo.png'],
    creator: '@jaladrinews',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Script Anda untuk tema sudah bagus */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Jaladri News",
              "alternateName": "Jaladri News - Portal Berita Modern",
              "url": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/logo.png`,
                "width": 512,
                "height": 512
              },
              "description": "Portal berita terkini Indonesia dengan informasi politik, ekonomi, olahraga, teknologi, dan lifestyle.",
              "sameAs": [
                "https://facebook.com/jaladrinews",
                "https://twitter.com/jaladrinews",
                "https://instagram.com/jaladrinews"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Indonesian"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID",
                "addressLocality": "Indonesia"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen font-edge bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 ease-edge antialiased">
        <Providers>
          {/* Bungkus semua komponen dengan SessionProvider */}
          <SessionProvider>
            <AnimatedBackground intensity="medium" enableInteraction={true} />
            <div className="relative z-10 min-h-screen flex flex-col">
              <Header />
              <CategoryNav variant="horizontal" />
              <main className="flex-1 relative">
                <div className="min-h-screen">
                  {children}
                </div>
              </main>
              <ClientPopupWrapper />
              <Footer />
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}