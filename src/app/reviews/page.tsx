import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import ReviewCard from '@/components/ReviewCard';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Info, ArrowRight } from '@/components/icons';

import { absUrl, REVIEWS_ARE_GENUINE } from '@/lib/site';
import { reviews } from '@/lib/reviews';
import { breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { madinah } from '@/lib/images';

/* ============================================================================
   /reviews/
   ============================================================================
   Spec §03: "P2 · Social proof, FIRST-PARTY · brand + reviews."
   Spec §05 review card: "Name, city, trip type, month, photograph where
   consented. Anonymous testimonials read as invented."
   Spec §10: "Review + AggregateRating — ONLY FROM GENUINE FIRST-PARTY REVIEWS."

   The page states the no-aggregate-rating position openly rather than quietly
   omitting it. On a site whose argument is verifiable honesty, explaining why
   there is no star rating is stronger than having one.
   ========================================================================= */

const crumbs = [{ name: 'Reviews', href: '/reviews/' }];

export const metadata: Metadata = {
  title: 'Reviews from Pilgrims | Muhammad Travels',
  description:
    'First-party reviews from pilgrims who travelled with us, each with their city, package and month of travel. We publish no aggregate star rating — here is why.',
  alternates: { canonical: absUrl('/reviews/') },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Reviews from pilgrims who travelled with us"
        answer="Every review here is first-party: written by a pilgrim who travelled on one of our packages, published with their name, city, the package they took and the month they travelled. We publish no aggregate star rating, and the reason is explained below."
        crumbs={crumbs}
        image={madinah.sunset}
        compact
      />

      {/* The position on ratings ------------------------------------------- */}
      <Section tone="marble" tight>
        <Reveal>
          <div className="surface-card mx-auto flex max-w-[68rem] flex-col gap-5 p-7 sm:flex-row lg:p-9">
            <Info width={22} height={22} className="mt-0.5 shrink-0 text-antique" />
            <div>
              <h2
                className="font-display text-[24px] leading-[32px] text-kiswah"
                style={{ fontWeight: 600 }}
              >
                Why there is no star rating on this page
              </h2>
              <p className="mt-4 max-w-[68ch] text-[16.5px] leading-[28px] text-kiswah/80">
                Aggregate ratings are trivially easy to invent and widely
                invented, which is exactly why search engines treat a fabricated
                one as grounds for a manual penalty. Ratings scraped from
                another platform and republished as first-party carry the same
                risk.
              </p>
              <p className="mt-4 max-w-[68ch] text-[16.5px] leading-[28px] text-kiswah/80">
                We will publish a rating when we have collected enough genuine,
                consented reviews to compute one honestly — and not before. In
                the meantime, judge us on the individual reviews below, on our
                licence numbers, and on whether the office exists when you visit
                it.
              </p>
              {!REVIEWS_ARE_GENUINE && (
                <p className="mt-5 rounded-input border border-dashed border-antique/35 bg-warm px-4 py-3 text-[14px] leading-[24px] text-stone">
                  <strong className="font-semibold text-kiswah">
                    Build note:
                  </strong>{' '}
                  the cards below are layout placeholders. No Review or
                  AggregateRating structured data is emitted anywhere on this
                  site while <code className="tabular">REVIEWS_ARE_GENUINE</code>{' '}
                  is false in <code>src/lib/site.ts</code>.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Reviews ------------------------------------------------------------ */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="What pilgrims say"
          title="Named, dated and attached to a package"
          lede="Each review states who wrote it, which city they departed from, which package they took and when they travelled — the four facts that make a testimonial checkable rather than decorative."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} delay={stagger(i, 70, 340)} />
          ))}
        </div>

        <Reveal delay={280} className="mt-12">
          <Link href="/umrah/" className="btn-base btn-ghost group">
            See the packages these reviews refer to
            <ArrowRight
              width={17}
              height={17}
              className="transition-transform duration-400 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Section>

      <CtaBand
        heading="Travelled with us? Please write one."
        body="We ask every returning pilgrim, and we respond to all of them — including the critical ones. If something went wrong on your trip we would rather hear it and fix it than have you say nothing."
        message="Assalamu alaikum. I travelled with you recently and would like to leave a review."
      />

      <StickyMobileBar message="Assalamu alaikum. I'd like to ask about your packages." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
