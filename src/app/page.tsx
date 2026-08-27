import type { Metadata } from 'next';
import Link from 'next/link';

import Hero from '@/components/Hero';
import PackageCard from '@/components/PackageCard';
import CityCard from '@/components/CityCard';
import GuideCard from '@/components/GuideCard';
import ReviewCard from '@/components/ReviewCard';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import LicenceBadge from '@/components/LicenceBadge';
import { Section, SectionHeading, Eyebrow } from '@/components/ui';
import { Reveal, RevealRule, DrawIcon } from '@/components/Reveal';
import {
  Shield,
  Distance,
  Document,
  Certificate,
  ArrowRight,
  Search,
} from '@/components/icons';

import { site, absUrl, isPlaceholder } from '@/lib/site';
import { featuredPackages } from '@/lib/packages';
import { cities } from '@/lib/cities';
import { guidesByRecency } from '@/lib/guides';
import { reviews } from '@/lib/reviews';
import { homeFaqs } from '@/lib/faqs';
import { faqPageSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';

/* ============================================================================
   HOME PAGE
   ============================================================================
   Spec §03 block order, implemented in exactly this sequence:
     01 Trust bar ......... rendered by the root layout, above the header
     02 Hero .............. <Hero />
     03 Search / filter ... inside <Hero />
     04 Featured packages
     05 Why book with us
     06 Verification strip
     07 Departure cities
     08 Reviews
     09 Guides
     10 FAQ
     11 Contact band ...... <CtaBand />

   And the prohibitions from the same section are honoured:
     · No carousel — one hero image
     · No countdown timers or "only 2 seats left" devices
     · No unverifiable claims — there is no "10,000+ happy pilgrims" anywhere
     · No stock photograph presented as our own group
   ========================================================================= */

export const metadata: Metadata = {
  title: 'Licensed Hajj & Umrah Packages from Pakistan | Muhammad Travels',
  description:
    'MoRA-licensed Hajj and Umrah operator. Umrah from PKR 265,000 with named hotels, exact distances to the Haram in metres, and licence numbers you can verify.',
  alternates: { canonical: absUrl('/') },
  openGraph: {
    url: absUrl('/'),
    title: 'Licensed Hajj & Umrah Packages from Pakistan | Muhammad Travels',
    description:
      'MoRA-licensed Hajj and Umrah operator. Named hotels, exact distances, licence numbers you can verify against the Ministry list.',
  },
};

/* --- Block 05 data. Spec: "Four points, LICENCE-LED. Not generic 'best
       service' claims." Every one of these is a checkable behaviour rather
       than an adjective. ------------------------------------------------- */
const whyPoints = [
  {
    icon: <Certificate width={22} height={22} />,
    title: 'We hold the licences ourselves',
    body: 'Both the Umrah attestation and the Hajj Group Organiser registration are ours. You contract us directly and your visa is issued through Nusuk Masar in our name — there is no partner whose licence you would have to check instead.',
  },
  {
    icon: <Distance width={22} height={22} />,
    title: 'Every distance published in metres',
    body: 'Not “walking distance”, not “close to Haram”. A measured figure for every hotel on every package, so you can compare us against anyone else in a single glance.',
  },
  {
    icon: <Document width={22} height={22} />,
    title: 'Exclusions given equal weight',
    body: 'What is not in the price sits in the same size column as what is. Most disputes in this business start with something a customer assumed was included.',
  },
  {
    icon: <Search width={22} height={22} />,
    title: 'We teach you to check up on us',
    body: 'Our guides explain how to verify any operator against the Ministry list and how to recognise a fraudulent one. We would rather you checked than trusted.',
  },
];

export default function HomePage() {
  const featured = featuredPackages().slice(0, 3);
  const latestGuides = guidesByRecency.slice(0, 3);
  const homeReviews = reviews.slice(0, 3);
  const licencePending = isPlaceholder(site.licences.umrah.number);

  return (
    <>
      {/* 02 + 03 ------------------------------------------------------- */}
      <Hero />

      {/* 04 · FEATURED PACKAGES ---------------------------------------- */}
      <Section tone="marble" id="packages">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured packages"
            title="Named hotels. Measured distances. Prices with a validity date."
            lede="Three of the packages we run most often. Every card shows the hotel you will actually stay in and how far it is from the Haram, because those are the two facts that decide the trip."
            className="max-w-[46rem]"
          />
          <Reveal delay={160}>
            <Link href="/umrah/" className="btn-base btn-ghost group shrink-0">
              All Umrah packages
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} delay={stagger(i, 90, 280)} />
          ))}
        </div>
      </Section>

      {/* 05 · WHY BOOK WITH US ------------------------------------------ */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Why book with us"
          title="Four reasons, none of them about breakfast"
          lede="Every competitor in this market sells on price and hotel star rating. The question customers are actually asking is whether the company will still exist in March."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {whyPoints.map((point, i) => (
            <Reveal key={point.title} delay={stagger(i, 90, 300)}>
              <div className="flex gap-5">
                <DrawIcon
                  length={140}
                  delay={stagger(i, 90, 300) + 120}
                  className="mt-1 shrink-0 text-antique"
                >
                  {point.icon}
                </DrawIcon>
                <div>
                  <h3
                    className="font-display text-[22px] leading-[30px] text-kiswah"
                    style={{ fontWeight: 600 }}
                  >
                    {point.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[16px] leading-[27px] text-stone">
                    {point.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 06 · VERIFICATION STRIP --------------------------------------- */}
      <section className="on-dark relative bg-kiswah section-tight">
        <div className="hairline-gold absolute inset-x-0 top-0 opacity-70" />
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Reveal className="mb-5 flex items-center gap-3">
                <Eyebrow tone="dark">Licence &amp; verification</Eyebrow>
                <RevealRule delay={130} className="hairline-gold h-px w-14 shrink-0" />
              </Reveal>

              <Reveal delay={60} as="h2">
                <span className="text-marble">
                  Do not take our word for it. Check the list.
                </span>
              </Reveal>

              <Reveal delay={140} as="p" className="lede mt-5 text-marble/65">
                The {site.verification.ministryName} publishes the register of
                certified Hajj and Umrah operators precisely because companies
                in this sector take deposits and disappear. Searching it takes
                about ten minutes and removes most of the risk — for us and for
                anyone else you are considering.
              </Reveal>

              <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
                <Link href="/licence/" className="btn-base btn-primary-invert group">
                  <Shield width={18} height={18} />
                  Our licence details
                  <ArrowRight
                    width={17}
                    height={17}
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/guides/how-to-verify-umrah-operator/"
                  className="btn-base btn-ghost-dark"
                >
                  How to verify any operator
                </Link>
              </Reveal>
            </div>

            {/* The numbers themselves, in text. Spec §13 Blocker. -------- */}
            <Reveal delay={180}>
              <div className="rounded-card border border-hizam/25 bg-soft p-7 lg:p-8">
                <div className="hairline-gold mb-7 w-16" />

                <dl className="flex flex-col gap-7">
                  <div>
                    <dt className="eyebrow-dark mb-2.5">
                      {site.licences.umrah.label}
                    </dt>
                    <dd
                      className={
                        licencePending
                          ? 'text-[19px] font-semibold text-hizam/85 underline decoration-dotted decoration-hizam/40 underline-offset-[6px]'
                          : 'tabular font-display text-[26px] text-hizam'
                      }
                    >
                      {site.licences.umrah.number}
                    </dd>
                    <p className="mt-2 text-[13.5px] text-marble/50">
                      Expires {site.licences.umrah.expires}
                    </p>
                  </div>

                  <div className="border-t border-rule-dark pt-7">
                    <dt className="eyebrow-dark mb-2.5">
                      {site.licences.hajj.label}
                    </dt>
                    <dd
                      className={
                        isPlaceholder(site.licences.hajj.number)
                          ? 'text-[19px] font-semibold text-hizam/85 underline decoration-dotted decoration-hizam/40 underline-offset-[6px]'
                          : 'tabular font-display text-[26px] text-hizam'
                      }
                    >
                      {site.licences.hajj.number}
                    </dd>
                    <p className="mt-2 text-[13.5px] text-marble/50">
                      {site.licences.hajj.quotaStatus}
                    </p>
                  </div>
                </dl>

                <p className="mt-7 border-t border-rule-dark pt-6 text-[14px] leading-6 text-marble/55">
                  {site.verification.listNote}
                </p>

                <a
                  href={site.verification.ministryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-hizam underline decoration-hizam/30 underline-offset-4 transition-colors hover:decoration-hizam"
                >
                  Open the Ministry website
                  <ArrowRight width={15} height={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07 · DEPARTURE CITIES ------------------------------------------ */}
      <Section tone="marble">
        <SectionHeading
          eyebrow="Departure cities"
          title="Six airports, and an honest answer about each"
          lede="Three of these have direct flights and no supplement. Two connect through Lahore with the transfer included. One carries a published supplement. We would rather put that on the page than add it after a deposit."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cities.map((city, i) => (
            <CityCard key={city.slug} city={city} delay={stagger(i, 70, 320)} />
          ))}
        </div>
      </Section>

      {/* 08 · REVIEWS ---------------------------------------------------- */}
      <Section tone="warm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Reviews"
            title="First-party, named, and checkable"
            lede="Every review here comes from a pilgrim who travelled with us, with their city, their package and the month they went. We publish no aggregate star rating, because inventing one is a known trigger for a search penalty and, more to the point, a lie."
            className="max-w-[46rem]"
          />
          <Reveal delay={160}>
            <Link href="/reviews/" className="btn-base btn-ghost group shrink-0">
              All reviews
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {homeReviews.map((review, i) => (
            <ReviewCard
              key={review.id}
              review={review}
              delay={stagger(i, 90, 280)}
            />
          ))}
        </div>
      </Section>

      {/* 09 · GUIDES ----------------------------------------------------- */}
      <Section tone="marble">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Guides"
            title="Including how to check up on us"
            lede="Written to be useful whether or not you book with us — which is the point. An operator confident of surviving verification has every reason to teach it."
            className="max-w-[46rem]"
          />
          <Reveal delay={160}>
            <Link href="/guides/" className="btn-base btn-ghost group shrink-0">
              All guides
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {latestGuides.map((guide, i) => (
            <GuideCard
              key={guide.slug}
              guide={guide}
              delay={stagger(i, 90, 280)}
            />
          ))}
        </div>
      </Section>

      {/* 10 · FAQ -------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Common questions"
              title="Answers, not deflections"
              lede="Eight questions we are asked most often, answered in full on the page rather than behind a click."
            />
            <Reveal delay={220} className="mt-9">
              <LicenceBadge />
            </Reveal>
          </div>

          <Faq items={homeFaqs} />
        </div>
      </Section>

      {/* 11 · CONTACT BAND ---------------------------------------------- */}
      <CtaBand />

      {/* Spec §02: "Mobile: persistent bottom bar with WhatsApp and Call.
          This is where the conversions happen." */}
      <StickyMobileBar />

      {/* Spec §10: FAQPage on the home page, mirroring the visible FAQs. */}
      <JsonLd schemas={[faqPageSchema(homeFaqs)]} />
    </>
  );
}
