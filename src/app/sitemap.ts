import { MetadataRoute } from 'next';
import { WRITEUPS } from '@/lib/writeups-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fekojewan.dev';

  const staticPages = [
    '',
    '/about',
    '/expertise',
    '/research',
    '/methodology',
    '/tools',
    '/writeups',
    '/challenge',
    '/arena',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const writeupPages = WRITEUPS.map((w) => ({
    url: `${baseUrl}/writeups/${w.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...writeupPages];
}
