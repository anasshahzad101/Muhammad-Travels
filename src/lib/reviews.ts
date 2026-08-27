/* ============================================================================
   TESTIMONIALS
   ============================================================================

   ⚠️  EVERYTHING BELOW IS SAMPLE CONTENT. IT IS NOT A REAL REVIEW.

   These entries exist to exercise the review card layout and nothing else.
   They are written by the build, not by pilgrims, and they must all be deleted
   and replaced before launch.

   Spec §10, "Two rules that carry manual-action risk":
     "Never fabricate AggregateRating. Invented star ratings, or ratings
      scraped from another platform and republished as your own, are a known
      trigger for structured-data manual actions. Collect real reviews from
      real pilgrims, then mark those up."

   Because of that, this build emits NO Review schema and NO AggregateRating
   schema at all while `REVIEWS_ARE_GENUINE` in src/lib/site.ts is false — which
   is its shipped value. The cards render visually; the machine-readable markup
   stays switched off until the content is real. See src/lib/schema.ts.

   Spec §05 also requires: "Name, city, trip type, month, photograph where
   consented. Anonymous testimonials read as invented." So the shape below
   carries all four fields — but a real name attached to an invented quote is
   worse than an anonymous one, which is why these are explicitly flagged as
   samples rather than dressed up as real people.
   ========================================================================= */

export type Review = {
  id: string;
  /** Sample data uses initials only. Real reviews carry full names. */
  name: string;
  city: string;
  citySlug: string;
  tripType: string;
  /** Which package this pilgrim travelled on. */
  packageSlug: string;
  month: string;
  quote: string;
  /** True only for genuine, consented, first-party reviews. */
  genuine: boolean;
};

export const reviews: Review[] = [
  {
    id: 'sample-1',
    name: 'Sample review — replace before launch',
    city: 'Lahore',
    citySlug: 'lahore',
    tripType: '14-Night Standard Umrah',
    packageSlug: 'umrah-14-nights-standard',
    month: 'October 2026',
    quote:
      'This card is a layout placeholder. Replace it with a genuine, consented review from a real pilgrim, including their name, city, the package they travelled on and the month they travelled.',
    genuine: false,
  },
  {
    id: 'sample-2',
    name: 'Sample review — replace before launch',
    city: 'Karachi',
    citySlug: 'karachi',
    tripType: '14-Night Premium Umrah',
    packageSlug: 'umrah-14-nights-premium',
    month: 'November 2026',
    quote:
      'Ask every returning pilgrim for a review, and respond to all of them. Review velocity matters as much as volume — see Spec §11, Local SEO.',
    genuine: false,
  },
  {
    id: 'sample-3',
    name: 'Sample review — replace before launch',
    city: 'Islamabad',
    citySlug: 'islamabad',
    tripType: '21-Night Standard Umrah',
    packageSlug: 'umrah-21-nights-standard',
    month: 'November 2026',
    quote:
      'Collect the photograph only where the pilgrim has consented to it being published. A named review with a city and a travel month reads as real because it is checkable.',
    genuine: false,
  },
  {
    id: 'sample-4',
    name: 'Sample review — replace before launch',
    city: 'Multan',
    citySlug: 'multan',
    tripType: '14-Night Economy Umrah',
    packageSlug: 'umrah-14-nights-economy',
    month: 'September 2026',
    quote:
      'Departure city pages should carry testimonials from pilgrims who actually departed from that city — see Spec §04, Departure city page template.',
    genuine: false,
  },
  {
    id: 'sample-5',
    name: 'Sample review — replace before launch',
    city: 'Faisalabad',
    citySlug: 'faisalabad',
    tripType: '14-Night Family Umrah',
    packageSlug: 'umrah-family-14-nights',
    month: 'December 2026',
    quote:
      'Once these are real, flip REVIEWS_ARE_GENUINE to true in src/lib/site.ts to switch on Review and AggregateRating structured data.',
    genuine: false,
  },
  {
    id: 'sample-6',
    name: 'Sample review — replace before launch',
    city: 'Peshawar',
    citySlug: 'peshawar',
    tripType: '10-Night Economy Umrah',
    packageSlug: 'umrah-10-nights-economy',
    month: 'October 2026',
    quote:
      'Do not import reviews from another platform and republish them as first-party. That is one of the known triggers for a structured-data manual action.',
    genuine: false,
  },
];

export function reviewsForCity(citySlug: string): Review[] {
  return reviews.filter((r) => r.citySlug === citySlug);
}

export function reviewsForPackage(packageSlug: string): Review[] {
  return reviews.filter((r) => r.packageSlug === packageSlug);
}

/** Only genuine reviews are ever eligible for structured data. */
export const genuineReviews = reviews.filter((r) => r.genuine);
