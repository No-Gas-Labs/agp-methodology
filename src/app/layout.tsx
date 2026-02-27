import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "America's Got Problems: A Systems-Level Diagnosis of Hybrid Cognition",
  description: 'A structured approach to hybrid cognition where multiple AI systems are orchestrated under human guidance to produce outputs exceeding the capabilities of any single AI or unaided human reasoning.',
  authors: [{ name: 'Damien Edward Featherstone' }],
  keywords: ['hybrid cognition', 'systems theory', 'AI collaboration', 'operational intelligence', 'methodology'],
  openGraph: {
    title: "America's Got Problems",
    description: 'A Systems-Level Diagnosis of Hybrid Cognition',
    type: 'website',
    url: 'https://agp.systems',
    siteName: "America's Got Problems",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "America's Got Problems",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "America's Got Problems",
    description: 'A Systems-Level Diagnosis of Hybrid Cognition',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://agp.systems',
  },
  verification: {
    google: 'verification-code-here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://agp.systems" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
