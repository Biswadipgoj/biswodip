import { MetadataRoute } from 'next';
import { personal, projects } from '@/lib/data';
export default function sitemap(): MetadataRoute.Sitemap {
 return [{url: personal.canonicalUrl, priority: 1}, ...projects.map(project => ({url: `${personal.canonicalUrl}/project/${project.slug}`, priority: 0.8}))];
}
