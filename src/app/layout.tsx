import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ClayThemeProvider from '@/components/ClayThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomDock from '@/components/MobileBottomDock';
import JsonLd from '@/components/JsonLd';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://fekojewan.com';

export const metadata: Metadata = {
  title: {
    default: 'FEKOJEWAN — Independent Bug Bounty Hunter & Security Researcher',
    template: '%s — FEKOJEWAN',
  },
  description:
    'Professional security research portfolio of FEKOJEWAN. Specializing in Web Application Security, API Security, coordinated vulnerability disclosure, and interactive security labs.',
  keywords: [
    'FEKOJEWAN',
    'Bug Bounty Hunter',
    'Security Researcher',
    'Web Application Security',
    'API Security',
    'BOLA',
    'SSRF',
    'Vulnerability Analysis',
    'Responsible Disclosure',
    'GraphQL Security',
    'OAuth Security',
  ],
  authors: [{ name: 'FEKOJEWAN', url: `${siteUrl}/about` }],
  creator: 'FEKOJEWAN',
  publisher: 'FEKOJEWAN',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FEKOJEWAN — Breaking Assumptions. Securing Systems.',
    description:
      'Independent security researcher specializing in Web Application and API Security. Explore research, solve synthetic security challenges, or challenge research methodology.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FEKOJEWAN Security Research',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FEKOJEWAN — Breaking Assumptions. Securing Systems.',
    description:
      'Independent security researcher specializing in Web Application and API Security.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const rootStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'FEKOJEWAN Security Research',
      description:
        'Professional security research portfolio of FEKOJEWAN. Specializing in Web Application Security, API Security, and vulnerability disclosure.',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'FEKOJEWAN',
      url: `${siteUrl}/about`,
      email: 'mailto:bounty@fekojewan.my.id',
      jobTitle: 'Independent Bug Bounty Hunter & Security Researcher',
      description:
        'Independent security researcher and bug bounty hunter specializing in Web Application Security, API Security, BOLA, and server-side vulnerabilities.',
      knowsAbout: [
        'Web Application Security',
        'API Security',
        'Broken Object Level Authorization (BOLA)',
        'Server-Side Request Forgery (SSRF)',
        'Authentication & OAuth Security',
        'Vulnerability Research',
        'Coordinated Vulnerability Disclosure',
      ],
      sameAs: [
        'https://github.com/kennedys0',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <JsonLd data={rootStructuredData} />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ClayThemeProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <MobileBottomDock />
          </div>
        </ClayThemeProvider>
      </body>
    </html>
  );
}
