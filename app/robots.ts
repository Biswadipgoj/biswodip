import { MetadataRoute } from 'next'
import { personal } from '@/lib/data'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: personal.canonicalUrl + '/sitemap.xml',
  }
}