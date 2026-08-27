import Link from 'next/link';
import { Quote, MapPin, Calendar } from './icons';
import { Reveal } from './Reveal';
import type { Review } from '@/lib/reviews';
import { cx } from '@/lib/utils';

/* ============================================================================
   REVIEW CARD
   ============================================================================
   Spec §05: "Name, city, trip type, month, photograph where consented.
   ANONYMOUS TESTIMONIALS READ AS INVENTED."

   All four attribution fields are therefore structural, not optional — a card
   cannot be rendered without them.

   The shipped data in src/lib/reviews.ts is sample content, and this component
   marks it as such rather than dressing it up. Spec §10 makes fabricated
   ratings a manual-action risk, and Spec §03 forbids "unverifiable claims"
   generally: "every hollow claim is a reason to leave."
   ========================================================================= */

export default function ReviewCard({
  review,
  delay = 0,
  tone = 'light',
}: {
  review: Review;
  delay?: number;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';

  return (
    <Reveal delay={delay} className="h-full">
      <figure
        className={cx(
          'flex h-full flex-col p-6 lg:p-7',
          dark ? 'surface-premium' : 'surface-card',
        )}
      >
        <Quote
          width={26}
          height={26}
          className={cx('shrink-0', dark ? 'text-hizam/50' : 'text-antique/45')}
          aria-hidden
        />

        <blockquote
          className={cx(
            'mt-5 flex-1 text-[16.5px] leading-[28px]',
            dark ? 'text-marble/80' : 'text-kiswah/80',
          )}
        >
          {review.quote}
        </blockquote>

        <figcaption
          className={cx(
            'mt-6 border-t pt-5',
            dark ? 'border-rule-dark' : 'border-rule-light',
          )}
        >
          <p
            className={cx(
              'text-[15px] font-semibold',
              dark ? 'text-marble' : 'text-kiswah',
              !review.genuine && 'italic opacity-70',
            )}
          >
            {review.name}
          </p>

          <div
            className={cx(
              'mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px]',
              dark ? 'text-marble/50' : 'text-stone',
            )}
          >
            <span className="flex items-center gap-1.5">
              <MapPin width={14} height={14} className={dark ? 'text-hizam/60' : 'text-antique/60'} />
              {review.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar width={14} height={14} className={dark ? 'text-hizam/60' : 'text-antique/60'} />
              {review.month}
            </span>
          </div>

          <Link
            href={`/umrah/${review.packageSlug}/`}
            className={cx(
              'mt-1 inline-flex min-h-11 items-center text-[13px] font-medium transition-colors duration-300',
              dark
                ? 'text-hizam/80 hover:text-hizam'
                : 'text-antique hover:text-kiswah',
            )}
          >
            {review.tripType}
          </Link>

          {/* Sample content is labelled rather than disguised. Delete this
              branch along with the sample data. */}
          {!review.genuine && (
            <p
              className={cx(
                'mt-4 rounded-input border border-dashed px-3 py-2 text-[11.5px] leading-4',
                dark
                  ? 'border-hizam/30 text-marble/40'
                  : 'border-antique/30 text-stone',
              )}
            >
              Placeholder — replace with a genuine consented review before
              launch. No Review or AggregateRating schema is emitted while this
              flag is set.
            </p>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}
