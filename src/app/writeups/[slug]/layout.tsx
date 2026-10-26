import type { Metadata } from 'next';
import { WRITEUPS } from '@/lib/writeups-data';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return WRITEUPS.map((writeup) => ({
    slug: writeup.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writeup = WRITEUPS.find((w) => w.slug === slug);
  if (!writeup) {
    return {
      title: 'Writeup Not Found',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://fekojewan.com';

  const canonicalUrl = `${siteUrl}/writeups/${writeup.slug}`;

  return {
    title: writeup.title,
    description: writeup.summary,
    keywords: [
      writeup.category,
      writeup.domain,
      ...writeup.tags,
      'Bug Bounty Writeup',
      'Security Research',
      'Vulnerability Disclosure',
      'Exploit Analysis',
    ],
    alternates: {
      canonical: `/writeups/${writeup.slug}`,
    },
    openGraph: {
      title: `${writeup.title} — FEKOJEWAN`,
      description: writeup.summary,
      url: canonicalUrl,
      type: 'article',
      publishedTime: writeup.publishedAt,
      modifiedTime: writeup.publishedAt,
      authors: ['FEKOJEWAN'],
      section: writeup.category,
      tags: writeup.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${writeup.title} — FEKOJEWAN`,
      description: writeup.summary,
    },
  };
}

export default async function WriteupDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writeup = WRITEUPS.find((w) => w.slug === slug);

  if (!writeup) {
    return <>{children}</>;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://fekojewan.com';

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${siteUrl}/writeups/${writeup.slug}#article`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
        },
        headline: writeup.title,
        description: writeup.summary,
        datePublished: writeup.publishedAt,
        dateModified: writeup.publishedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/writeups/${writeup.slug}`,
        },
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: 'FEKOJEWAN',
          url: `${siteUrl}/about`,
        },
        publisher: {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: 'FEKOJEWAN',
        },
        articleSection: writeup.category,
        keywords: writeup.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/writeups/${writeup.slug}#breadcrumb`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: writeup.title,
            item: `${siteUrl}/writeups/${writeup.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleStructuredData} />
      {children}
    </>
  );
}
