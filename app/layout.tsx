import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { brand } from '@/lib/data';

// Space Grotesk for display/headings, Manrope for body — matching the design doc.
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const title = `${brand.name} — one screen to run the counter`;
const description =
  'The Mobile World ERP workspace: GST-ready billing, IMEI-level inventory, dealer ledgers and live analytics — unified in one workspace fast enough to keep up with the counter.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Mobile World',
    'mobile shop ERP',
    'GST billing',
    'IMEI inventory',
    'dealer ledger',
    'retail analytics',
    'point of sale',
    'West Bengal',
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: '#f7f5ff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
