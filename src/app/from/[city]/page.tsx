import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import PackageCard from '@/components/PackageCard';
import ReviewCard from '@/components/ReviewCard';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading, Stat } from '@/components/ui';
import { Reveal, DrawIcon } from '@/components/Reveal';
import { Plane, Route, MapPin, ArrowRight, Calendar } from '@/components/icons';

import { absUrl } from '@/lib/site';
import { cities, citySlugs, getCity } from '@/lib/cities';
import { packagesFromCity, lowestPrice } from '@/lib/packages';
import { reviewsForCity } from '@/lib/reviews';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { formatPKR, stagger } from '@/lib/utils';

/* ============================================================================
   /from/[city]/ — DEPARTURE CITY PAGE
   ============================================================================
   Spec §04, Departure city page template:
     "One page per city, EACH GENUINELY DISTINCT — not a template with the city
      name swapped in, which Google treats as doorway pages. Each carries:
      packages available from that airport, real flight routing and carriers,
      prices specific to that departure, group departure dates, the local
      office or representative if there is one, testimonials from pilgrims from
      that city, and a short FAQ about departing from there."

   The template below is shared, but everything that fills it is per city and
   written individually in src/lib/cities.ts — the routing, the connection
   position, the supplement, the prose and all six FAQs. Lahore's page argues
   something different from Peshawar's because the facts are different.
   ========================================================================= */

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const canonical = absUrl(`/from/${slug}/`);
  return {
    title: city.title,
    description: city.metaDescription,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: city.title,
      description: city.metaDescription,
      images: [{ url: city.image.src }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const available = packagesFromCity(city.slug);
  const from = lowestPrice(available) + city.supplement;
  const cityReviews = reviewsForCity(city.slug);
  const otherCities = cities.filter((c) => c.slug !== city.slug);

  // Group departure dates available from this city, earliest first.
  const departures = Array.from(
    new Map(
      available
        .flatMap((p) => p.departures.map((d) => [d.iso, { ...d, pkg: p }] as const))
        .sort((a, b) => a[0].localeCompare(b[0])),
    ).values(),
  ).slice(0, 8);

  const crumbs = [
    { name: 'Departures', href: '/from/' },
    { name: city.name, href: `/from/${city.slug}/` },
  ];

  const enquiry = `Assalamu alaikum. I'd like to ask about Umrah packages departing from ${city.name}.`;

  return (
    <>
      <PageHero
        eyebrow={`Departing from ${city.name}`}
        title={city.h1}
        answer={city.answer}
        crumbs={crumbs}
        image={city.image}
        compact
      >
        <Reveal delay={220}>
          <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-rule-dark pt-8 sm:grid-cols-4">
            <Stat tone="dark" value={city.iata} label="Airport code" />
            <Stat tone="dark" value={available.length} label="Packages available" />
            <Stat tone="dark" value={formatPKR(from)} label="From, per person" />
            <Stat
              tone="dark"
              value={city.supplement > 0 ? formatPKR(city.supplement) : 'None'}
              label="Departure supplement"
            />
          </dl>
        </Reveal>
      </PageHero>

      {/* City-specific prose ---------------------------------------------- */}
      <Section tone="marble" tight>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="max-w-[68ch]">
            {city.intro.map((para, i) => (
              <Reveal
                as="p"
                key={i}
                delay={i * 80}
                className="mt-6 text-[17.5px] leading-[30px] text-kiswah/80 first:mt-0"
              >
                {para}
              </Reveal>
            ))}
          </div>

          {/* Routing, carriers and local presence -------------------------- */}
          <Reveal delay={140}>
            <dl className="surface-card flex flex-col divide-y divide-rule-light">
              <Detail icon={<Plane width={18} height={18} />} label="Airport">
                {city.airport}{' '}
                <span className="tabular text-stone">({city.iata})</span>
              </Detail>
              <Detail icon={<Route width={18} height={18} />} label="Routing">
                {city.routing}
              </Detail>
              <Detail icon={<Calendar width={18} height={18} />} label="Flight time">
                {city.flightTime}
              </Detail>
              <Detail icon={<Plane width={18} height={18} />} label="Carriers">
                {city.carriers.join(' · ')}
              </Detail>
              <Detail icon={<MapPin width={18} height={18} />} label="Local presence">
                {city.localPresence}
              </Detail>
            </dl>

            <p className="mt-5 rounded-input border border-antique/30 bg-warm px-4 py-3.5 text-[14.5px] leading-6 text-kiswah/80">
              <strong className="font-semibold">Supplement:</strong>{' '}
              {city.supplementNote}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Packages from this city ------------------------------------------ */}
      <Section tone="warm" id="packages">
        <SectionHeading
          eyebrow={`From ${city.name}`}
          title={`Umrah packages departing from ${city.name}`}
          lede={`${available.length} packages depart from ${city.airport}. Prices below include any ${city.name} supplement, so what you see is what you pay from this city.`}
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {available.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} delay={stagger(i, 70, 320)} />
          ))}
        </div>
      </Section>

      {/* Group departure dates -------------------------------------------- */}
      <Section tone="marble" tight>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Group departures"
            title={`Fixed dates from ${city.name}`}
            lede="Every date below is a group departure, travelling together with a group leader from this airport."
          />

          <Reveal delay={120}>
            <ul className="surface-card divide-y divide-rule-light">
              {departures.map((d) => (
                <li
                  key={d.iso}
                  className="flex flex-wrap items-center justify-between gap-4 p-5 lg:px-7"
                >
                  <div>
                    <p className="tabular text-[16px] font-medium text-kiswah">
                      {d.label}
                    </p>
                    <Link
                      href={`/${d.pkg.trip}/${d.pkg.slug}/`}
                      className="inline-flex min-h-11 items-center text-[13.5px] text-antique underline decoration-antique/25 underline-offset-4 transition-colors hover:decoration-antique"
                    >
                      {d.pkg.name}
                    </Link>
                  </div>
                  <span className="tabular text-[15px] font-semibold text-kiswah">
                    {formatPKR(d.pkg.priceFrom + city.supplement)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Testimonials from this city -------------------------------------- */}
      {cityReviews.length > 0 && (
        <Section tone="warm">
          <SectionHeading
            eyebrow={`${city.name} pilgrims`}
            title={`What pilgrims from ${city.name} say`}
            lede="First-party reviews from people who departed from this airport, with their package and the month they travelled."
            className="max-w-[46rem]"
          />
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {cityReviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} delay={stagger(i, 90)} />
            ))}
          </div>
        </Section>
      )}

      {/* City FAQ ---------------------------------------------------------- */}
      <Section tone="marble">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title={`Departing from ${city.name}`}
              lede="Six questions specific to this airport and this routing."
            />
            <Reveal delay={200} className="mt-8">
              <p className="eyebrow mb-3.5">Other departure cities</p>
              <ul className="flex flex-wrap gap-2">
                {otherCities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/from/${c.slug}/`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-btn border border-rule-light px-4 text-[14.5px] text-kiswah/80 transition-colors duration-300 hover:border-antique/60"
                    >
                      {c.name}
                      <ArrowRight width={14} height={14} className="text-antique/60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Faq items={city.faqs} />
        </div>
      </Section>

      <CtaBand
        heading={`Umrah from ${city.name} — get a written quote`}
        body={`Tell us your dates and group size. You will get the hotels named, the distances in metres, the routing from ${city.airport} and the full exclusions list, in writing.`}
        message={enquiry}
      />

      <StickyMobileBar message={enquiry} />

      <JsonLd schemas={[faqPageSchema(city.faqs), breadcrumbSchema(crumbs)]} />
    </>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 p-5 lg:p-6">
      <DrawIcon length={110} className="mt-0.5 shrink-0 text-antique/80">
        {icon}
      </DrawIcon>
      <div>
        <dt className="eyebrow mb-2">{label}</dt>
        <dd className="text-[15px] leading-[25px] text-kiswah/80">{children}</dd>
      </div>
    </div>
  );
}
