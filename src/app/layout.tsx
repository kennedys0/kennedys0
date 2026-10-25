import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ClayThemeProvider from '@/components/ClayThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomDock from '@/components/MobileBottomDock';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'FEKOJEWAN — Independent Bug Bounty Hunter & Security Researcher',
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
  ],
  authors: [{ name: 'FEKOJEWAN' }],
  metadataBase: new URL('https://fekojewan.dev'),
  openGraph: {
    title: 'FEKOJEWAN — Breaking Assumptions. Securing Systems.',
    description:
      'Independent security researcher specializing in Web Application and API Security. Explore research, solve synthetic security challenges, or challenge research methodology.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FEKOJEWAN Security Research',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
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
