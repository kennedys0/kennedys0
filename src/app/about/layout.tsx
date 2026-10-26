import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'About: Bug Bounty Hunter & Security Research Profile',
  description:
    'Profile, security philosophy, and coordinated vulnerability disclosure standards of FEKOJEWAN, an independent web and API security researcher.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About FEKOJEWAN — Security Researcher Profile',
    description:
      'Bug bounty hunter & independent security researcher specializing in Web and API Security.',
    url: `${siteUrl}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FEKOJEWAN — Security Researcher Profile',
    description:
      'Bug bounty hunter & independent security researcher specializing in Web and API Security.',
  },
};

const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
      name: 'About FEKOJEWAN — Security Researcher Profile',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
      mainEntity: {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/about#breadcrumb`,
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
          name: 'About',
          item: `${siteUrl}/about`,
        },
      ],
    },
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={aboutStructuredData} />
      {children}
    </>
  );
}
