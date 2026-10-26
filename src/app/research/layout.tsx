import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Security Research & Vulnerability Archive',
  description:
    'Curated repository of vulnerability findings, remediation patterns, and attack surface analysis spanning web applications, APIs, and cloud services.',
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'Security Research & Vulnerability Archive — FEKOJEWAN',
    description:
      'Curated showcase of verified web application and API security findings, disclosure timelines, and root-cause analyses.',
    url: `${siteUrl}/research`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Research & Vulnerability Archive — FEKOJEWAN',
    description:
      'Curated repository of vulnerability findings, remediation patterns, and attack surface analysis.',
  },
};

const researchStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/research#webpage`,
      url: `${siteUrl}/research`,
      name: 'Security Research & Vulnerability Archive — FEKOJEWAN',
      description:
        'Curated repository of vulnerability findings, remediation patterns, and attack surface analysis spanning web applications, APIs, and cloud services.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/research#breadcrumb`,
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
          name: 'Security Research',
          item: `${siteUrl}/research`,
        },
      ],
    },
  ],
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={researchStructuredData} />
      {children}
    </>
  );
}
