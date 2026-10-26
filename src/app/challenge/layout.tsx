import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Challenge Me: Authorized Security Testing Scope',
  description:
    'Submit an authorized staging or sandbox target to challenge FEKOJEWAN\'s security research methodology. Safe, coordinated, and confidential.',
  alternates: {
    canonical: '/challenge',
  },
  openGraph: {
    title: 'Challenge Me: Authorized Security Testing Scope — FEKOJEWAN',
    description:
      'Submit an authorized staging or sandbox target to challenge FEKOJEWAN\'s security research methodology.',
    url: `${siteUrl}/challenge`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Challenge Me: Authorized Security Testing Scope — FEKOJEWAN',
    description:
      'Submit an authorized staging or sandbox target to challenge FEKOJEWAN\'s security research methodology.',
  },
};

const challengeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/challenge#webpage`,
      url: `${siteUrl}/challenge`,
      name: 'Challenge Me: Authorized Security Testing Scope — FEKOJEWAN',
      description:
        'Submit an authorized staging or sandbox target to challenge FEKOJEWAN\'s security research methodology. Safe, coordinated, and confidential.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/challenge#breadcrumb`,
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
          name: 'Challenge Me',
          item: `${siteUrl}/challenge`,
        },
      ],
    },
  ],
};

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={challengeStructuredData} />
      {children}
    </>
  );
}
