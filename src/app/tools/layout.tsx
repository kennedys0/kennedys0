import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: 'Security Research Tooling & Testing Stack',
  description:
    'The testing stack, intercepting proxies, CLI utilities, and custom extensions used by FEKOJEWAN for deep Web and API vulnerability research.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Security Research Tooling & Stack — FEKOJEWAN',
    description:
      'HTTP proxies, API schema analyzers, and custom tooling utilized during security audits and vulnerability research.',
    url: `${siteUrl}/tools`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Research Tooling & Stack — FEKOJEWAN',
    description:
      'The testing stack, intercepting proxies, CLI utilities, and custom extensions used by FEKOJEWAN.',
  },
};

const toolsStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/tools#webpage`,
      url: `${siteUrl}/tools`,
      name: 'Security Research Tooling & Testing Stack — FEKOJEWAN',
      description:
        'The testing stack, intercepting proxies, CLI utilities, and custom extensions used by FEKOJEWAN for deep Web and API vulnerability research.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/tools#breadcrumb`,
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
          name: 'Security Tools',
          item: `${siteUrl}/tools`,
        },
      ],
    },
  ],
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={toolsStructuredData} />
      {children}
    </>
  );
}
