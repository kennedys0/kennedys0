import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Security Research Methodology & Audit Workflow',
  description:
    'Systematic 8-step security research process from invariant mapping and threat modeling to proof of concept creation and remediation verification.',
  alternates: {
    canonical: '/methodology',
  },
  openGraph: {
    title: 'Security Research Methodology — FEKOJEWAN',
    description:
      'Structured 8-step security research workflow prioritizing non-destructive validation and reproducible proof of concepts.',
    url: `${siteUrl}/methodology`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Research Methodology — FEKOJEWAN',
    description:
      'Systematic 8-step security research process from invariant mapping to remediation verification.',
  },
};

const methodologyStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/methodology#webpage`,
      url: `${siteUrl}/methodology`,
      name: 'Security Research Methodology & Audit Workflow — FEKOJEWAN',
      description:
        'Systematic 8-step security research process from invariant mapping and threat modeling to proof of concept creation and remediation verification.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/methodology#breadcrumb`,
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
          name: 'Methodology',
          item: `${siteUrl}/methodology`,
        },
      ],
    },
  ],
};

export default function MethodologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={methodologyStructuredData} />
      {children}
    </>
  );
}
