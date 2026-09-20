import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { personal, seo } from '@/lib/data';
import './journey.css';
const body=Manrope({subsets:['latin'],variable:'--font-body',display:'swap'});
export const metadata: Metadata = {
  metadataBase: new URL('https://biswadip.in'),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: 'https://biswadip.in' },
  keywords: [
    'Biswadip Goj',
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
    url: 'https://biswadip.in',
    images: [{ url: '/social-preview.jpg', width: 1200, height: 630, alt: 'Biswadip Goj — Full-Stack Software Engineer & Business Analyst' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.socialTitle,
    description: seo.socialDescription,
    images: ['/social-preview.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#e9cebb', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Biswadip Goj',
    jobTitle: 'Full-Stack Software Engineer & Business Analyst',
    url: 'https://biswadip.in',
    email: 'biswadipgoj@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'West Bengal',
      addressCountry: 'India'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Brainware University'
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
    sameAs: [
      'https://github.com/Biswadipgoj',
      'https://linkedin.com/in/biswadipgoj'
    ]
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

