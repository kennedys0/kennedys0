import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Security Arena: Interactive Web & API Exploit Labs',
  description:
    'Interactive, safe security challenge labs to practice real-world web exploits: test BOLA, second-order SSRF, GraphQL leaks, and token validation.',
  alternates: {
    canonical: '/arena',
  },
  openGraph: {
    title: 'Security Arena: Interactive Web & API Exploit Labs — FEKOJEWAN',
    description:
      'Safe interactive security testing labs demonstrating real-world vulnerability patterns and defensive remediation.',
    url: `${siteUrl}/arena`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Arena: Interactive Web & API Exploit Labs — FEKOJEWAN',
    description:
      'Practice simulated web vulnerability exploits in safe, sandboxed labs.',
  },
};

const arenaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/arena#webpage`,
      url: `${siteUrl}/arena`,
      name: 'Security Arena: Interactive Web & API Exploit Labs — FEKOJEWAN',
      description:
        'Interactive, safe security challenge labs to practice real-world web exploits: test BOLA, second-order SSRF, GraphQL leaks, and token validation.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/arena#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Security Arena',
          item: `${siteUrl}/arena`,
        },
      ],
    },
  ],
};

export default function ArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={arenaStructuredData} />
      {children}
    </>
  );
}
