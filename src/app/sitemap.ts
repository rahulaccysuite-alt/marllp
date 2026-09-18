import type { MetadataRoute } from 'next';
import { resources } from '@/data/resources';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/services',
    '/industries',
    '/pricing',
    '/resources',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: (path === '' || path === '/resources' ? 'weekly' : 'monthly') as
        | 'weekly'
        | 'monthly',
      priority: path === '' ? 1 : 0.7,
    })),
    ...resources.map((resource) => ({
      url: `${siteUrl}/resources/${resource.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
