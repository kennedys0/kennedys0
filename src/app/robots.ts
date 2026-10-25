import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/challenges/*'],
      },
    ],
    sitemap: 'https://fekojewan.dev/sitemap.xml',
  };
}
