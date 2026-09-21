import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { personal, seo, socials } from '@/lib/data';
import './journey.css';
const body=Manrope({subsets:['latin'],variable:'--font-body',display:'swap'});
export const metadata: Metadata = {
  metadataBase: new URL(personal.canonicalUrl),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: personal.canonicalUrl },
  keywords: [
    'Biswodip Goj',
    'Full-Stack Software Engineer',
    'Business Analyst',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Prisma',
    'Python',
    'RAG',
    'pgvector'
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    title: seo.socialTitle,
    description: seo.socialDescription,
    type: 'website',
    locale: 'en_IN',
    url: personal.canonicalUrl,
    images: [{ url: '/social-preview.jpg', width: 1200, height: 630, alt: 'Biswodip Goj — Full-Stack Software Engineer & Business Analyst' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.socialTitle,
    description: seo.socialDescription,
    images: ['/social-preview.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#10171c', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: 'Full-Stack Software Engineer & Business Analyst',
    url: personal.canonicalUrl,
    email: 'biswadipgoj@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'West Bengal',
      addressCountry: 'India'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Brainware University, Kolkata'
    },
    knowsAbout: [
      'Business Analysis',
      'Requirements Elicitation',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Python',
      'RAG',
      'Vector Databases',
      'Docker'
    ],
    sameAs: socials.filter(link => link.label !== 'Email').map(link => link.url)
  };

  return (
    <html lang="en" className={body.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

