import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Web & API Security Expertise: Core Attack Surfaces',
  description:
    'Specialized security research domains: BOLA/BFLA, OAuth/JWT integrity, business logic state flaws, second-order SSRF, and federated GraphQL architectures.',
  alternates: {
    canonical: '/expertise',
  },
  openGraph: {
    title: 'Web & API Security Expertise — FEKOJEWAN',
    description:
      'Specialized security research focus areas across Web Application Security and API Security architectures.',
    url: `${siteUrl}/expertise`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web & API Security Expertise — FEKOJEWAN',
    description:
      'Specialized security research focus areas across Web Application Security and API Security architectures.',
  },
};

const expertiseStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/expertise#webpage`,
      url: `${siteUrl}/expertise`,
      name: 'Web & API Security Expertise: Core Attack Surfaces — FEKOJEWAN',
      description:
        'Specialized security research domains: BOLA/BFLA, OAuth/JWT integrity, business logic state flaws, second-order SSRF, and federated GraphQL architectures.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/expertise#breadcrumb`,
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
          name: 'Technical Expertise',
          item: `${siteUrl}/expertise`,
        },
      ],
    },
  ],
};

export default function ExpertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={expertiseStructuredData} />
      {children}
    </>
  );
}
