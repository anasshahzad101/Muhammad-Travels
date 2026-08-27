/* ============================================================================
   SITE CONFIGURATION — SINGLE SOURCE OF TRUTH
   ============================================================================

   ⚠️  EVERY VALUE MARKED `TODO` IS A PLACEHOLDER AND IS A PRE-LAUNCH BLOCKER.

   Spec §13 lists these as Blocker-grade checklist items:
     · "Licence numbers displayed in trust bar, footer and /licence/"
     · "/licence/ page complete, with verification instructions"
     · "Office address, map and real premises photographs published"

   Placeholders are rendered on-screen as visible `[ ... ]` tokens rather than
   plausible-looking fake numbers. That is deliberate. On a site whose entire
   proposition is verifiable honesty about licensing, a fabricated licence
   number that ships by accident is the single worst possible defect — so the
   build makes the gap impossible to miss instead of easy to overlook.
   ========================================================================= */

/** Marks a value that must be replaced before the site goes live. */
export const TODO = (label: string) => `[${label}]`;

export const site = {
  /* --- Identity ---------------------------------------------------------- */
  name: 'Muhammad Travels',

  /** Spec §04: "Legal company name exactly as registered with MoRA — not the
   *  trading name if they differ." */
  legalName: TODO('REGISTERED COMPANY NAME'),

  url: 'https://muhammadtravels.com',
  domain: 'muhammadtravels.com',

  description:
    'MoRA-licensed Hajj and Umrah operator based in Pakistan. Named hotels, exact distances to the Haram, and licence numbers you can verify against the Ministry list.',

  /* --- Contact ----------------------------------------------------------- */
  phone: {
    display: TODO('+92 3XX XXX XXXX'),
    e164: '+923000000000', // TODO: real number in E.164 for tel: links & schema
  },

  /** Spec §05: WhatsApp is the primary conversion route. Digits only, country
   *  code first, no + and no spaces — this is what wa.me expects. */
  whatsapp: {
    number: '923000000000', // TODO
    display: TODO('+92 3XX XXX XXXX'),
  },

  email: 'info@muhammadtravels.com',

  /** Spec §11 NAP consistency — this address must be byte-identical across the
   *  site, the schema, Google Business Profile and every directory listing. */
  address: {
    streetAddress: TODO('OFFICE STREET ADDRESS'),
    addressLocality: 'Lahore', // ASSUMPTION: head office in Lahore. Confirm.
    addressRegion: 'Punjab',
    postalCode: TODO('POSTCODE'),
    addressCountry: 'PK',
  },

  /** Used for the /contact/ and /licence/ map embeds. */
  mapQuery: 'Lahore, Pakistan', // TODO: exact office coordinates or address

  hours: [
    { days: 'Monday – Saturday', time: '10:00 – 19:00' },
    { days: 'Friday', time: '10:00 – 12:30, 15:00 – 19:00' },
    { days: 'Sunday', time: 'Closed' },
  ],

  social: {
    facebook: TODO('FACEBOOK URL'),
    instagram: TODO('INSTAGRAM URL'),
    youtube: TODO('YOUTUBE URL'),
  },

  /* --- Licensing. The strategic core of the whole site, Spec §01. --------- */
  licences: {
    umrah: {
      label: 'Umrah attestation',
      number: TODO('UMRAH LICENCE NO.'),
      expires: TODO('EXPIRY DATE'),
      issuer: 'Ministry of Religious Affairs and Interfaith Harmony',
    },
    hajj: {
      label: 'Hajj Group Organiser (HGO)',
      number: TODO('HGO REGISTRATION NO.'),
      quotaStatus: TODO('CURRENT-YEAR QUOTA STATUS'),
      issuer: 'Ministry of Religious Affairs and Interfaith Harmony',
    },
  },

  /** Where a customer can independently check the numbers above. Spec §04
   *  requires the citation and a link to the source. */
  verification: {
    ministryName: 'Ministry of Religious Affairs and Interfaith Harmony',
    ministryShort: 'MoRA',
    ministryUrl: 'https://www.mora.gov.pk/',
    nusukUrl: 'https://masar.nusuk.sa/',
    listNote:
      'The Ministry publishes the list of certified Hajj Group Organisers and attested Umrah operators. Search it for our registered company name — not our trading name — and match the licence number shown on this page.',
  },
} as const;

/* ============================================================================
   DERIVED HELPERS
   ========================================================================= */

/** Builds a wa.me deep link with the message pre-filled.
 *  Spec §05: "Pre-filled message carries the package name." */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${site.phone.e164}`;
}

/** Absolute URL for canonicals, sitemap entries and schema @id values. */
export function absUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withSlash =
    clean === '/' || clean.endsWith('/') ? clean : `${clean}/`;
  return `${site.url}${withSlash}`;
}

/** True when a config value is still an unreplaced placeholder. Used to gate
 *  schema output so we never publish `[UMRAH LICENCE NO.]` as machine-readable
 *  structured data. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith('[') && value.endsWith(']');
}

/* ============================================================================
   FIRST-PARTY REVIEW GATE
   ============================================================================
   Spec §10, "Two rules that carry manual-action risk":
     "Never fabricate AggregateRating. Invented star ratings, or ratings
      scraped from another platform and republished as your own, are a known
      trigger for structured-data manual actions."

   The testimonials shipped in this build are SAMPLE CONTENT written to
   exercise the layout. While this flag is `false` the site renders them
   visually but emits NO Review and NO AggregateRating schema whatsoever.

   Flip to `true` ONLY once every entry in src/lib/reviews.ts is a genuine,
   consented, first-party review from a real pilgrim.
   ========================================================================= */
export const REVIEWS_ARE_GENUINE = false;

/* ============================================================================
   PACKAGE DATA VERIFICATION GATE
   ============================================================================
   Spec closing note: "Verify all package pricing against current net rates
   before publication." Hotel names and distances in metres are the single most
   decisive comparison field in the category (§04) — and the most damaging to
   get wrong. Every record in src/lib/packages.ts is illustrative until checked.
   ========================================================================= */
export const PACKAGE_DATA_VERIFIED = false;
