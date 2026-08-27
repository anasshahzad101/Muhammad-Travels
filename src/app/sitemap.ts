import type { MetadataRoute } from 'next';
import { absUrl } from '@/lib/site';
import { umrahPackages, hajjPackages, tiers } from '@/lib/packages';
import { citySlugs } from '@/lib/cities';
import { guides } from '@/lib/guides';

/* ============================================================================
   XML SITEMAP
   ============================================================================
   Spec §08: "Auto-generated, every indexable URL, accurate lastmod. Submitted
   to Google and Bing."
   Spec §13 Blocker: "XML sitemap generated and submitted to Google and Bing."

   Generated from the same records the pages are, so a new package or guide
   appears here the moment it is added and cannot be forgotten.

   `lastModified` is accurate rather than decorative — guides carry their real
   `updated` date. Stamping every URL with today's date, which is the common
   shortcut, teaches crawlers to ignore the field.

   ⚠️  AFTER DEPLOYING: submit https://muhammadtravels.com/sitemap.xml to both
   Google Search Console and Bing Webmaster Tools. Spec §11 notes that Bing is
   "routinely skipped and disproportionately valuable" because it feeds ChatGPT
   and Copilot.
   ========================================================================= */

/** Date the static content was last substantively revised. */
const CONTENT_REVISION = '2026-08-25';

export default function sitemap(): MetadataRoute.Sitemap {
  // Annotated on the literal, not on the result of .map() — otherwise
  // `changeFrequency` widens to `string` and no longer matches the union.
  const staticEntries: MetadataRoute.Sitemap = [
    { url: absUrl('/'), changeFrequency: 'weekly', priority: 1.0 },
    { url: absUrl('/umrah/'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absUrl('/hajj/'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absUrl('/licence/'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absUrl('/from/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/guides/'), changeFrequency: 'weekly', priority: 0.7 },
    { url: absUrl('/hajj/how-it-works/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/contact/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absUrl('/about/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/reviews/'), changeFrequency: 'weekly', priority: 0.6 },
    { url: absUrl('/refunds/'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absUrl('/terms/'), changeFrequency: 'yearly', priority: 0.3 },
    { url: absUrl('/privacy/'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticEntries.map((entry) => ({
    ...entry,
    lastModified: CONTENT_REVISION,
  }));

  const tierPages: MetadataRoute.Sitemap = tiers.map((t) => ({
    url: absUrl(`/umrah/${t.slug}/`),
    lastModified: CONTENT_REVISION,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const packagePages: MetadataRoute.Sitemap = [
    ...umrahPackages,
    ...hajjPackages,
  ].map((p) => ({
    url: absUrl(`/${p.trip}/${p.slug}/`),
    lastModified: CONTENT_REVISION,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: absUrl(`/from/${slug}/`),
    lastModified: CONTENT_REVISION,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: absUrl(`/guides/${g.slug}/`),
    // The guide's own last-updated date, not the build date.
    lastModified: g.updated,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...tierPages,
    ...packagePages,
    ...cityPages,
    ...guidePages,
  ];
}
