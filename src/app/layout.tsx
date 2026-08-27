import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

import TrustBar from '@/components/TrustBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';

import { site } from '@/lib/site';
import { travelAgencySchema, webSiteSchema } from '@/lib/schema';

/* ============================================================================
   ROOT LAYOUT
   ============================================================================
   Spec §06 typography:
     Display — "Cormorant Garamond, or Marcellus. High-contrast old-style
       serifs — the thin strokes echo the gold thread."
     Body/UI — "Inter, or Source Sans 3. Chosen for legibility on mid-range
       Android."
     "Do not set body copy in the display serif — elegance at 17px becomes
      strain."

   Both are self-hosted by next/font, so there is no render-blocking request to
   fonts.googleapis.com and no third-party connection on the critical path.
   `display: swap` is set on both — Spec §08 lists it as a CLS lever.

   Spec §10: TravelAgency schema belongs in the root layout, on every page.
   ========================================================================= */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});

/* ------------------------------------------------------------------------ */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: 'Licensed Hajj & Umrah Packages from Pakistan | Muhammad Travels',
    // Pages supply their own complete title including the brand, per Spec §09:
    // "50–60 characters. Primary keyword first, brand last."
    template: '%s',
  },
  description: site.description,

  // Spec §08: "Canonical tags — self-referencing on every page."
  alternates: { canonical: '/' },

  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,

  formatDetection: { telephone: true, address: true, email: true },

  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: site.url,
    siteName: site.name,
    title: 'Licensed Hajj & Umrah Packages from Pakistan | Muhammad Travels',
    description: site.description,
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Licensed Hajj & Umrah Packages from Pakistan | Muhammad Travels',
    description: site.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#12110E',
  width: 'device-width',
  initialScale: 1,
  // Never block zoom — Spec §07 designs for readers over fifty.
  maximumScale: 5,
};

/* ------------------------------------------------------------------------ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PK" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Spec §08 LCP: warm up the image CDN before the hero request. */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className="min-h-dvh bg-marble antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-kiswah focus:px-5 focus:py-3 focus:text-marble"
        >
          Skip to content
        </a>

        {/* Spec §05: persistent on every page, above the header. */}
        <TrustBar />
        <Header />

        {/* Bottom padding reserves the sticky mobile bar's height so it never
            obscures content — Spec §07. */}
        <main id="main" className="pb-[76px] lg:pb-0">
          {children}
        </main>

        <Footer />

        {/* NOTE: the sticky mobile bar is rendered per page, not here, so that
            package pages can pre-fill the WhatsApp message with the package
            name — Spec §04: "Sticky CTA (mobile) — WhatsApp with the package
            name pre-filled in the message." */}

        {/* The site's entire motion runtime: one IntersectionObserver. */}
        <ScrollReveal />

        {/* Spec §10: TravelAgency on the root layout, all pages. */}
        <JsonLd schemas={[travelAgencySchema(), webSiteSchema()]} />
      </body>
    </html>
  );
}

// Spec §08: "Server-render or statically generate every page. Non-negotiable."
export const dynamic = 'force-static';
