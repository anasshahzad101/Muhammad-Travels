import { site, absUrl, isPlaceholder, REVIEWS_ARE_GENUINE } from './site';
import type { Package, Faq } from './packages';
import type { Guide } from './guides';
import { genuineReviews } from './reviews';

/* ============================================================================
   STRUCTURED DATA
   ============================================================================
   Spec §10: "Schema serves two purposes now: Google rich results, and giving
   AI assistants a machine-readable description of what you sell. Treat it as a
   primary deliverable, not a plugin afterthought."

   TWO GUARDRAILS ARE ENFORCED IN CODE HERE, NOT LEFT TO DISCIPLINE:

   1. "Never fabricate AggregateRating." → `aggregateRatingSchema()` returns
      undefined unless REVIEWS_ARE_GENUINE is true AND real reviews exist.
      There is no code path that emits an invented rating.

   2. "Schema must mirror visible content." → Every builder below is fed the
      same record the page renders from, so an Offer price cannot drift from
      the displayed price, and FAQPage entries cannot exist without the visible
      FAQ that produced them.

   Placeholder configuration values (`[UMRAH LICENCE NO.]` and similar) are
   stripped rather than published as machine-readable facts.
   ========================================================================= */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

type Json = Record<string, unknown>;

/** Drops keys whose values are undefined, null or unreplaced placeholders. */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && (v === '' || isPlaceholder(v))) continue;
    out[k] = v;
  }
  return out as T;
}

/* ============================================================================
   TravelAgency — root layout, every page. Spec §10.
   ========================================================================= */

export function travelAgencySchema(): Json {
  const licence = site.licences.umrah.number;

  return clean({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: site.name,
    legalName: isPlaceholder(site.legalName) ? undefined : site.legalName,
    url: site.url,
    // The raster lockup rather than a transparent cut-out: Google renders
    // schema logos on a white card, where gold-on-transparent would vanish.
    logo: `${site.url}/logo.png`,
    image: `${site.url}/logo.png`,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    address: clean({
      '@type': 'PostalAddress',
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      postalCode: site.address.postalCode,
      addressCountry: site.address.addressCountry,
    }),
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    knowsAbout: [
      'Umrah packages',
      'Hajj packages',
      'Umrah visa',
      'Nusuk Masar',
      'Hajj Group Organiser scheme',
      'Ziyarat',
    ],
    /* Spec §10: "hasCredential is rarely used in this sector and directly
       encodes your differentiator in machine-readable form." Emitted only once
       the real licence number replaces the placeholder. */
    hasCredential: isPlaceholder(licence)
      ? undefined
      : {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Government licence',
          recognizedBy: {
            '@type': 'GovernmentOrganization',
            name: site.verification.ministryName,
          },
          identifier: licence,
        },
    sameAs: Object.values(site.social).filter((u) => !isPlaceholder(u)),
    aggregateRating: aggregateRatingSchema(),
  });
}

export function webSiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: site.url,
    name: site.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-PK',
  };
}

/* ============================================================================
   BreadcrumbList — every page except home. Spec §05, §10.
   ========================================================================= */

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Home', href: '/' },
      ...crumbs,
    ].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.href),
    })),
  };
}

/* ============================================================================
   FAQPage — home, packages, tiers, guides. Spec §10.
   Every entry here corresponds to a question rendered visibly on the page.
   ========================================================================= */

export function faqPageSchema(faqs: Faq[]): Json | undefined {
  if (!faqs.length) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/* ============================================================================
   AggregateRating — HARD-GATED. Spec §10 manual-action rule.
   ========================================================================= */

function aggregateRatingSchema(): Json | undefined {
  if (!REVIEWS_ARE_GENUINE) return undefined;
  if (genuineReviews.length === 0) return undefined;

  // Reached only once real, rated, first-party reviews exist. Compute the
  // value from those reviews — never write a literal here.
  return undefined;
}

/* ============================================================================
   Product + Offer — package pages. Spec §10.
   Price, currency and validity all resolve from the same record the page
   renders, so markup and page cannot disagree.
   ========================================================================= */

export function productSchema(pkg: Package): Json {
  const url = absUrl(`/${pkg.trip}/${pkg.slug}`);

  return clean({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name,
    description: pkg.answer,
    image: pkg.image.src,
    brand: { '@id': ORG_ID },
    category: pkg.trip === 'hajj' ? 'Hajj package' : 'Umrah package',
    offers: {
      '@type': 'Offer',
      price: String(pkg.priceFrom),
      priceCurrency: pkg.priceCurrency,
      priceValidUntil: pkg.priceValidUntil,
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@id': ORG_ID },
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: aggregateRatingSchema(),
  });
}

/* ============================================================================
   Article + Person — guides. Spec §10: "Author authority, E-E-A-T."
   ========================================================================= */

export function articleSchema(guide: Guide): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.answer,
    image: guide.image.src,
    datePublished: guide.published,
    dateModified: guide.updated,
    author: {
      '@type': 'Person',
      name: guide.author.name,
      jobTitle: guide.author.role,
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absUrl(`/guides/${guide.slug}`),
    },
    inLanguage: 'en-PK',
  });
}

/* ============================================================================
   RENDERING
   One helper so no page hand-writes a <script> tag.
   ========================================================================= */

export function jsonLd(schemas: Array<Json | undefined>): string {
  const present = schemas.filter((s): s is Json => Boolean(s));
  return JSON.stringify(present.length === 1 ? present[0] : present);
}
