import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import PackageFilter from '@/components/PackageFilter';
import ComparisonTable from '@/components/ComparisonTable';
import CityCard from '@/components/CityCard';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading, Pill } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from '@/components/icons';

import { absUrl } from '@/lib/site';
import { umrahPackages, tiers, getPackage } from '@/lib/packages';
import { cities } from '@/lib/cities';
import { umrahHubFaqs } from '@/lib/faqs';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { formatPKR, stagger } from '@/lib/utils';
import { madinah } from '@/lib/images';

/* ============================================================================
   /umrah/ — UMRAH HUB
   ============================================================================
   Spec §03: "P1 · Present the full range, filterable · umrah packages from
   pakistan."
   Spec §02 internal linking: "Hub and spoke. /umrah/ links down to every tier
   and package."

   The full package list is server-rendered into the static HTML; the filter
   only hides cards after hydration. See the note in PackageFilter.tsx.
   ========================================================================= */

const crumbs = [{ name: 'Umrah', href: '/umrah/' }];

export const metadata: Metadata = {
  title: 'Umrah Packages from Pakistan 2026 | Muhammad Travels',
  description:
    'Umrah packages from PKR 265,000 per person. Named hotels, exact distances to Masjid al-Haram in metres, flights and Nusuk visa included. MoRA-licensed operator.',
  alternates: { canonical: absUrl('/umrah/') },
  openGraph: {
    url: absUrl('/umrah/'),
    title: 'Umrah Packages from Pakistan 2026 | Muhammad Travels',
    description:
      'Nine Umrah packages with named hotels, exact distances in metres and prices carrying a validity date.',
  },
};

export default function UmrahHubPage() {
  const compare = ['umrah-14-nights-economy', 'umrah-14-nights-standard', 'umrah-14-nights-premium']
    .map(getPackage)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        eyebrow="Umrah"
        title="Umrah packages from Pakistan"
        answer="Our Umrah packages start at PKR 265,000 per person and include return flights, the Nusuk visa, named hotels in Makkah and Madinah with published distances to the Haram, all transfers, daily breakfast and guided Ziyarat. Every price carries a validity date."
        crumbs={crumbs}
        image={madinah.twilight}
        compact
      >
        <Reveal delay={220} className="mt-9 flex flex-wrap gap-2.5">
          {tiers.map((t) => (
            <Link
              key={t.slug}
              href={`/umrah/${t.slug}/`}
              className="inline-flex min-h-11 items-center gap-2 rounded-btn border border-rule-dark px-4 text-[14.5px] text-marble/80 transition-colors duration-300 hover:border-hizam/60 hover:text-marble"
            >
              {t.name}
              <ArrowRight width={15} height={15} className="text-hizam/60" />
            </Link>
          ))}
        </Reveal>
      </PageHero>

      {/* All packages, filterable ---------------------------------------- */}
      <Section tone="marble" id="packages">
        <SectionHeading
          eyebrow="All Umrah packages"
          title="Nine packages, every hotel named"
          lede="Filter by departure city, tier or month. Whatever you filter to, the hotel name and its distance to the Haram in metres are on every card — those two facts decide more than anything else on this page."
          className="max-w-[46rem]"
        />

        <div className="mt-14">
          <PackageFilter packages={umrahPackages} />
        </div>
      </Section>

      {/* Tier explainer --------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Choosing a tier"
          title="The difference is distance and beds, not service"
          lede="Every pilgrim on every package gets the same visa process, the same transfers, the same group leader and the same written terms. What changes between tiers is how far you walk and how many people share your room."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier, i) => (
            <Reveal key={tier.slug} delay={stagger(i, 80, 320)} className="h-full">
              <Link
                href={`/umrah/${tier.slug}/`}
                className="group lift surface-card flex h-full flex-col p-7"
              >
                <Pill tone="gold" className="self-start">
                  {tier.badge}
                </Pill>
                <h3
                  className="mt-5 font-display text-[24px] leading-[31px] text-kiswah"
                  style={{ fontWeight: 600 }}
                >
                  {tier.name} Umrah
                </h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-[26px] text-stone">
                  {tier.intro[0]}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-antique">
                  View {tier.name.toLowerCase()} packages
                  <ArrowRight
                    width={16}
                    height={16}
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison table ------------------------------------------------- */}
      <Section tone="marble">
        <SectionHeading
          eyebrow="Side by side"
          title="The three 14-night packages, compared"
          lede="Same duration, same itinerary shape, same inclusions. Read down the distance rows — that is where the money goes."
          className="max-w-[46rem]"
        />
        <div className="mt-12">
          <ComparisonTable
            packages={compare}
            caption="Scroll sideways on a phone to compare every column."
          />
        </div>
      </Section>

      {/* Departure cities ------------------------------------------------- */}
      <Section tone="warm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Departure cities"
            title="Where you fly from changes the price"
            lede="Three cities have direct flights and no supplement. Two connect via Lahore with the transfer included. One carries a published supplement, stated on its page rather than added later."
            className="max-w-[46rem]"
          />
          <Reveal delay={160}>
            <Link href="/from/" className="btn-base btn-ghost group shrink-0">
              All departure cities
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cities.map((city, i) => (
            <CityCard key={city.slug} city={city} delay={stagger(i, 70, 320)} />
          ))}
        </div>
      </Section>

      {/* FAQ --------------------------------------------------------------- */}
      <Section tone="marble">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Umrah questions"
            title="What people ask before booking"
            lede="Eight answers, each written to stand on its own."
          />
          <Faq items={umrahHubFaqs} />
        </div>
      </Section>

      <CtaBand
        heading="Not sure which package suits your group?"
        body="Tell us who is travelling — ages, mobility, budget and dates — and we will tell you which of the nine actually fits, including when the answer is none of them."
        message={`Assalamu alaikum. I'd like help choosing an Umrah package. Our group is:`}
      />

      <StickyMobileBar
        message={`Assalamu alaikum. I'd like to ask about your Umrah packages (from ${formatPKR(265000)} per person).`}
      />

      <JsonLd
        schemas={[faqPageSchema(umrahHubFaqs), breadcrumbSchema(crumbs)]}
      />
    </>
  );
}
