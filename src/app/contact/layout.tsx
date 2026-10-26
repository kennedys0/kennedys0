import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Secure Contact & PGP Key: Coordinated Disclosure',
  description:
    'Reach out to FEKOJEWAN for coordinated disclosure, security consulting, or private triage. PGP public key and security communication guidelines.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Secure Contact & PGP Key: Coordinated Disclosure — FEKOJEWAN',
    description:
      'Encrypted communication channels, PGP public key fingerprint, and coordinated disclosure contact info.',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Contact & PGP Key: Coordinated Disclosure — FEKOJEWAN',
    description:
      'Direct, encrypted communication channels for security research inquiries and bug bounty triage.',
  },
};

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${siteUrl}/contact#webpage`,
      url: `${siteUrl}/contact`,
      name: 'Secure Contact & PGP Key: Coordinated Disclosure — FEKOJEWAN',
      description:
        'Direct, encrypted communication channels for security research inquiries, bug bounty triage teams, and authorized challenge coordination.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/contact#breadcrumb`,
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
          name: 'Contact',
          item: `${siteUrl}/contact`,
        },
      ],
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={contactStructuredData} />
      {children}
    </>
  );
}
