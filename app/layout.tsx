import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { personal } from '@/lib/data';
import './journey.css';

const display = Fraunces({ subsets: ['latin'], axes: ['opsz'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const title = `${personal.name} — ${personal.role}`;
export const metadata: Metadata = {
  metadataBase: new URL('https://biswadip.in'),
  title, description: personal.intro,
  alternates: { canonical: '/' },
  keywords: ['Biswodip Goj', 'Full-Stack Software Engineer', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Portfolio'],
  authors: [{ name: personal.name }], creator: personal.name,
  openGraph: { title, description: personal.intro, type: 'website', locale: 'en_IN', url: '/', images: [{ url: '/biswodip.png', width: 1086, height: 1448, alt: personal.name }] },
  twitter: { card: 'summary_large_image', title, description: personal.intro, images: ['/biswodip.png'] },
};
export const viewport: Viewport = { themeColor: '#f5edc8', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
