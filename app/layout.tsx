import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { personal, seo } from '@/lib/data';
import './journey.css';
const body=Manrope({subsets:['latin'],variable:'--font-body',display:'swap'});
export const metadata:Metadata={
  metadataBase:new URL('https://biswodip.in'),title:seo.title,description:seo.description,alternates:{canonical:'/'},
  keywords:['Biswodip Goj','Full-Stack Software Engineer','React','Next.js','Node.js','TypeScript','PostgreSQL','MongoDB','Python','SQL'],
  authors:[{name:personal.name}],creator:personal.name,
  openGraph:{title:seo.socialTitle,description:seo.socialDescription,type:'website',locale:'en_IN',url:'/',images:[{url:'/social-preview.jpg',width:1200,height:630,alt:'Biswodip Goj and real application interfaces'}]},
  twitter:{card:'summary_large_image',title:seo.socialTitle,description:seo.socialDescription,images:['/social-preview.jpg']},
};
export const viewport:Viewport={themeColor:'#e9cebb',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={body.variable}><body>{children}</body></html>;}

