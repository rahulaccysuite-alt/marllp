import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Footer } from '@/components/marketing/Footer';
import { Header } from '@/components/marketing/Header';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { siteName, siteUrl } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

const defaultTitle = 'MAR LLP | Accounting, Tax & Business Advisory';
const defaultDescription =
  'MAR LLP provides professional accounting, taxation, review engagements, financial reporting, and business advisory services to businesses, professionals, and entrepreneurs across Canada.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/assets/mar-llp-logo.png',
    apple: '/assets/mar-llp-logo.png',
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    locale: 'en_CA',
    siteName,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${manrope.variable}`}>
      <body className={inter.className}>
        <div className="min-h-screen overflow-x-clip bg-white">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
