import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Bug Bounty Writeups & Technical Disclosures',
  description:
    'Technical bug bounty writeups and post-mortems covering BOLA, SSRF, and business logic flaws discovered in modern web and API applications.',
  alternates: {
    canonical: '/writeups',
  },
  openGraph: {
    title: 'Bug Bounty Writeups & Technical Disclosures — FEKOJEWAN',
    description:
      'In-depth vulnerability post-mortems, exploit mechanics, and remediation case studies.',
    url: `${siteUrl}/writeups`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bug Bounty Writeups & Technical Disclosures — FEKOJEWAN',
    description:
      'In-depth vulnerability post-mortems, exploit mechanics, and remediation case studies.',
  },
};

const writeupsStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/writeups#webpage`,
      url: `${siteUrl}/writeups`,
      name: 'Bug Bounty Writeups & Technical Disclosures — FEKOJEWAN',
      description:
        'Technical bug bounty writeups and post-mortems covering BOLA, SSRF, and business logic flaws discovered in modern web and API applications.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/writeups#breadcrumb`,
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
          name: 'Technical Writeups',
          item: `${siteUrl}/writeups`,
        },
      ],
    },
  ],
};

export default function WriteupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={writeupsStructuredData} />
      {children}
    </>
  );
}
