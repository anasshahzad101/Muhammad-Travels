import Link from 'next/link';
import Image from 'next/image';

import PageHero from './PageHero';
import IncludesExcludes from './IncludesExcludes';
import ComparisonTable from './ComparisonTable';
import PackageCard from './PackageCard';
import Faq from './Faq';
import CtaBand from './CtaBand';
import EnquiryForm from './EnquiryForm';
import StickyMobileBar from './StickyMobileBar';
import LicenceBadge from './LicenceBadge';
import JsonLd from './JsonLd';
import { Section, SectionHeading, Pill, Stat } from './ui';
import { Reveal, RevealRule } from './Reveal';
import {
  WhatsApp,
  Distance,
  Bed,
  Calendar,
  Plane,
  Star,
  ArrowRight,
  Refund,
  Utensils,
} from './icons';

import type { Package, Hotel } from '@/lib/packages';
import { similarPackages } from '@/lib/packages';
import { cities } from '@/lib/cities';
import { site, whatsappHref } from '@/lib/site';
import { payment, umrahCancellation, hajjCancellation } from '@/lib/policies';
import { productSchema, faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { formatPKR, formatMetres, stagger, cx } from '@/lib/utils';

/* ============================================================================
   PACKAGE DETAIL — THE CONVERSION PAGE
   ============================================================================
   Spec §04 sets the block order and this component follows it exactly:

     ABOVE THE FOLD ..... name · price with validity date · duration ·
                          departure city selector · WhatsApp CTA · licence line
     HOTELS ............. named, distance in metres, room type, photographs
     WHAT'S INCLUDED .... itemised
     WHAT'S NOT INCLUDED  equally prominent
     DEPARTURE DATES .... fixed group dates, seats remaining if genuinely tracked
     ITINERARY .......... day by day
     PAYMENT & REFUNDS .. deposit, schedule, cancellation terms, stated plainly
     PACKAGE FAQ ........ six to eight questions, with schema
     SIMILAR PACKAGES ... two or three alternatives
     STICKY CTA (MOBILE)  WhatsApp with the package name pre-filled

   Spec §04 callout, DISTANCE TO THE HARAM IN METRES:
     "This is the single most decisive comparison field in the category and
      most competitors hide it behind vague phrasing like 'walking distance'.
      Publishing an exact figure … wins the comparison against a rival
      advertising a higher star rating a kilometre away, and it is the kind of
      specific, checkable fact that AI assistants quote directly."
   The metre figure therefore appears above the fold, on every hotel card, in
   the comparison table and in the Product schema description.
   ========================================================================= */

export default function PackageDetail({ pkg }: { pkg: Package }) {
  const similar = similarPackages(pkg.slug);
  const cancellation = pkg.trip === 'hajj' ? hajjCancellation : umrahCancellation;
  const hubLabel = pkg.trip === 'hajj' ? 'Hajj' : 'Umrah';
  const hubHref = pkg.trip === 'hajj' ? '/hajj/' : '/umrah/';

  const crumbs = [
    { name: hubLabel, href: hubHref },
    { name: pkg.name, href: `/${pkg.trip}/${pkg.slug}/` },
  ];

  // Spec §04: the pre-filled message carries the package name.
  const enquiry = `Assalamu alaikum. I'd like to enquire about the ${pkg.name} (from ${formatPKR(
    pkg.priceFrom,
  )} per person). Please could you send me the details?`;

  const makkah = pkg.hotels.find((h) => h.city === 'Makkah');
  const madinah = pkg.hotels.find((h) => h.city === 'Madinah');

  return (
    <>
      {/* ABOVE THE FOLD ------------------------------------------------- */}
      <PageHero
        eyebrow={`${hubLabel} package · ${pkg.tier === 'ramadan' ? 'Ramadan' : pkg.tier}`}
        title={pkg.h1}
        crumbs={crumbs}
        image={pkg.image}
        compact
      >
        <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal
              as="p"
              delay={80}
              className="max-w-[62ch] border-l-2 border-hizam/55 py-1 pl-5 text-[18px] leading-[30px] text-marble/85"
            >
              {pkg.answer}
            </Reveal>

            {/* The four comparison facts, above the fold. */}
            <Reveal delay={160}>
              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-rule-dark pt-8 sm:grid-cols-4">
                <Stat tone="dark" value={pkg.nights} label="Nights" />
                <Stat
                  tone="dark"
                  value={makkah ? formatMetres(makkah.distanceM) : '—'}
                  label="To Masjid al-Haram"
                />
                <Stat
                  tone="dark"
                  value={madinah ? formatMetres(madinah.distanceM) : '—'}
                  label="To the Prophet’s Mosque"
                />
                <Stat
                  tone="dark"
                  value={`${pkg.makkahNights}/${pkg.madinahNights}`}
                  label="Makkah / Madinah"
                />
              </dl>
            </Reveal>

            {/* Departure city selector. Doubles as internal linking into the
                city pages — Spec §02: "those packages link back to every city
                they depart from." */}
            <Reveal delay={230} className="mt-9">
              <p className="eyebrow-dark mb-3.5">Departing from</p>
              <ul className="flex flex-wrap gap-2">
                {pkg.departureCities.map((slug) => {
                  const city = cities.find((c) => c.slug === slug);
                  if (!city) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/from/${slug}/`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-btn border border-rule-dark px-4 text-[14.5px] text-marble/80 transition-colors duration-300 hover:border-hizam/60 hover:text-marble"
                      >
                        <Plane width={15} height={15} className="text-hizam/70" />
                        {city.name}
                        {city.supplement > 0 && (
                          <span className="tabular text-[12.5px] text-hizam/80">
                            +{formatPKR(city.supplement)}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Price card + primary CTA + licence line --------------------- */}
          <Reveal delay={140}>
            <div className="rounded-card border border-hizam/25 bg-soft p-7">
              <div className="hairline-gold mb-6 w-14" />

              <p className="eyebrow-dark">Price</p>
              <p
                className="mt-3 font-display text-[40px] leading-none text-marble"
                style={{ fontWeight: 600 }}
              >
                <span className="mr-2 font-sans text-[15px] font-medium text-marble/50">
                  From
                </span>
                <span data-numeric>{formatPKR(pkg.priceFrom)}</span>
              </p>
              <p className="mt-3 text-[14px] text-marble/55">
                per person · {pkg.roomBasis.toLowerCase()}
              </p>
              <p className="mt-1.5 text-[14px] text-hizam/85">
                Valid until{' '}
                <span className="tabular">{pkg.priceValidUntilLabel}</span>
              </p>

              <a
                href={whatsappHref(enquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-whatsapp mt-7 w-full"
                data-analytics="whatsapp-click"
              >
                <WhatsApp width={19} height={19} />
                Enquire on WhatsApp
              </a>

              <a
                href="#enquire"
                className="btn-base btn-ghost-dark mt-3 w-full"
              >
                Request a written quote
              </a>

              {/* Licence line — Spec §04 requires it above the fold. */}
              <div className="mt-7 border-t border-rule-dark pt-6">
                <LicenceBadge tone="dark" size="sm" className="w-full" />
                <p className="mt-3 text-[12.5px] leading-5 text-marble/45">
                  Verify this number against the Ministry’s published list
                  before you pay anything.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </PageHero>

      {/* HOTELS ---------------------------------------------------------- */}
      <Section tone="marble" id="hotels">
        <SectionHeading
          eyebrow="Accommodation"
          title="Where you will actually stay"
          lede="Both properties named, with the walking distance to the Haram measured in metres rather than described. This is the number worth comparing against any other quote you receive."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {pkg.hotels.map((h, i) => (
            <HotelCard key={h.name + h.city} hotel={h} delay={stagger(i, 100)} />
          ))}
        </div>

        <Reveal delay={200} className="mt-8">
          <p className="max-w-[68ch] text-[14px] leading-6 text-stone">
            Photographs above are licensed stock images of hotel interiors used
            for illustration. They are not photographs of these properties and
            do not depict the exact room category sold. Hotel media-kit imagery
            replaces them before launch.
          </p>
        </Reveal>
      </Section>

      {/* INCLUDED / NOT INCLUDED ---------------------------------------- */}
      <Section tone="warm" id="included">
        <SectionHeading
          eyebrow="What you get"
          title="Included and excluded, at the same size"
          lede="Most disputes in this business begin with something the pilgrim assumed was covered. So the right-hand column gets the same width, the same type size and the same prominence as the left."
          className="max-w-[46rem]"
        />
        <div className="mt-14">
          <IncludesExcludes includes={pkg.includes} excludes={pkg.excludes} />
        </div>
      </Section>

      {/* DEPARTURE DATES -------------------------------------------------- */}
      <Section tone="marble" id="departures" tight>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Departure dates"
            title="Fixed group departures"
            lede="We publish seat counts only where they are genuinely tracked. You will not find an invented “2 seats left” counter anywhere on this site."
          />

          <Reveal delay={120}>
            <ul className="surface-card divide-y divide-rule-light">
              {pkg.departures.map((d) => (
                <li
                  key={d.iso}
                  className="flex flex-wrap items-center justify-between gap-4 p-5 lg:px-7"
                >
                  <div className="flex items-center gap-3.5">
                    <Calendar width={18} height={18} className="shrink-0 text-antique" />
                    <span className="tabular text-[16px] font-medium text-kiswah">
                      {d.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {d.seatsLeft !== null && (
                      <span className="tabular text-[13.5px] text-stone">
                        {d.seatsLeft} seats remaining
                      </span>
                    )}
                    <a
                      href={whatsappHref(
                        `${enquiry}\n\nDeparture date: ${d.label}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] font-semibold text-antique underline decoration-antique/30 underline-offset-4 transition-colors hover:decoration-antique"
                      data-analytics="whatsapp-click"
                    >
                      Check availability
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ITINERARY -------------------------------------------------------- */}
      <Section tone="warm" id="itinerary">
        <SectionHeading
          eyebrow="Itinerary"
          title="Day by day, so nothing is a surprise"
          lede="Setting expectations before departure is what reduces friction after it. If anything below does not match what you were told verbally, the page is what we are accountable to."
          className="max-w-[46rem]"
        />

        <ol className="mt-14 max-w-[62rem]">
          {pkg.itinerary.map((day, i) => (
            <Reveal
              as="li"
              key={day.day}
              delay={stagger(i, 70, 350)}
              className="relative grid gap-3 border-b border-rule-light py-7 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-8"
            >
              <div>
                <span className="eyebrow">{day.day}</span>
              </div>
              <div>
                <h3
                  className="font-display text-[21px] leading-[29px] text-kiswah"
                  style={{ fontWeight: 600 }}
                >
                  {day.title}
                </h3>
                <p className="mt-2.5 max-w-[62ch] text-[16px] leading-[27px] text-stone">
                  {day.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* PAYMENT & REFUNDS ------------------------------------------------ */}
      <Section tone="marble" id="payment">
        <SectionHeading
          eyebrow="Payment & refunds"
          title="What happens to your money, stated plainly"
          lede="A cautious buyer reads this section before the itinerary. That is the correct order, and it is why we publish the cancellation schedule rather than referring you to terms on request."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <dl className="surface-card flex flex-col divide-y divide-rule-light">
              {[
                { label: payment.depositLabel, note: payment.depositNote },
                { label: payment.balanceLabel, note: payment.balanceNote },
                { label: payment.methodLabel, note: payment.methodNote },
                { label: payment.receiptLabel, note: payment.receiptNote },
              ].map((row) => (
                <div key={row.label} className="p-6">
                  <dt className="eyebrow mb-2.5">{row.label}</dt>
                  <dd className="text-[15.5px] leading-[26px] text-kiswah/80">
                    {row.note}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="scroll-x surface-card">
              <table className="w-full min-w-[540px] border-collapse text-left">
                <caption className="px-6 pt-6 text-left text-[13px] text-stone">
                  Cancellation schedule —{' '}
                  {pkg.trip === 'hajj' ? 'Hajj packages' : 'Umrah packages'}
                </caption>
                <thead>
                  <tr className="border-b border-rule-light">
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-antique">
                      If you cancel
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-antique">
                      You receive
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cancellation.map((row) => (
                    <tr key={row.window} className="border-b border-rule-light last:border-0">
                      <th
                        scope="row"
                        className="px-6 py-5 align-top text-[15px] font-medium leading-6 text-kiswah"
                      >
                        {row.window}
                      </th>
                      <td className="px-6 py-5 align-top">
                        <span className="block text-[15px] font-semibold leading-6 text-kiswah">
                          {row.refund}
                        </span>
                        <span className="mt-1.5 block text-[14px] leading-6 text-stone">
                          {row.note}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link
              href="/refunds/"
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 text-[15px] font-semibold text-antique transition-colors hover:text-kiswah"
            >
              <Refund width={17} height={17} />
              Full refund and cancellation policy
              <ArrowRight width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* PACKAGE FAQ ------------------------------------------------------ */}
      <Section tone="warm" id="faq">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Package questions"
            title={`About the ${pkg.name}`}
            lede="Answered in full on the page rather than behind a click — assistants and crawlers cannot click, and neither can someone comparing four tabs at midnight."
          />
          <Faq items={pkg.faqs} />
        </div>
      </Section>

      {/* ENQUIRY FORM ----------------------------------------------------- */}
      <Section tone="marble" id="enquire" tight>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Request a quote"
              title="Six fields, then a written answer"
              lede="You will receive a written quote naming both hotels, their exact distance to the Haram, the room category and the full exclusions list. If we cannot do your dates, we will say so rather than quoting something else."
            />
            <Reveal delay={200} className="mt-8">
              <LicenceBadge />
            </Reveal>
          </div>
          <Reveal delay={120}>
            <EnquiryForm packageName={pkg.name} />
          </Reveal>
        </div>
      </Section>

      {/* SIMILAR PACKAGES ------------------------------------------------- */}
      {similar.length > 0 && (
        <Section tone="warm">
          <SectionHeading
            eyebrow="Similar packages"
            title="If this one is not quite right"
            lede="Two or three alternatives, compared on the fields that actually differ."
            className="max-w-[46rem]"
          />

          <div className="mt-12">
            <ComparisonTable
              packages={[pkg, ...similar].slice(0, 4)}
              caption="Scroll sideways on a phone to compare every column."
            />
          </div>

          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {similar.map((p, i) => (
              <PackageCard key={p.slug} pkg={p} delay={stagger(i, 90, 280)} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        heading={`Questions about the ${pkg.name}?`}
        body="Send us your dates and group size on WhatsApp. You will get a written answer with the hotels named, the distances in metres and the exclusions listed — before anyone asks you for a deposit."
        message={enquiry}
      />

      {/* Spec §04: sticky CTA on mobile, with the package name pre-filled. */}
      <StickyMobileBar message={enquiry} />

      {/* Spec §10: Product + Offer, FAQPage, BreadcrumbList. */}
      <JsonLd
        schemas={[
          productSchema(pkg),
          faqPageSchema(pkg.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------------ */

function HotelCard({ hotel, delay }: { hotel: Hotel; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="surface-card zoom-frame overflow-hidden">
        <div className="graded relative aspect-[16/10] w-full">
          <Image
            src={hotel.image.src}
            alt={`Hotel room interior, illustrative of the ${hotel.roomType.toLowerCase()} sold with this package`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 z-10">
            <Pill tone="dark">{hotel.city}</Pill>
          </span>
        </div>

        <div className="p-6 lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="font-display text-[24px] leading-[31px] text-kiswah"
              style={{ fontWeight: 600 }}
            >
              {hotel.name}
            </h3>
            <span
              className="flex shrink-0 items-center gap-0.5 pt-1.5"
              aria-label={`${hotel.stars} star`}
            >
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} width={13} height={13} className="text-antique" />
              ))}
            </span>
          </div>

          {/* The decisive field, given its own emphasis. */}
          <div className="mt-5 flex items-center gap-3.5 rounded-input border border-antique/30 bg-marble/60 px-4 py-3.5">
            <Distance width={20} height={20} className="shrink-0 text-antique" />
            <p className="text-[15.5px] leading-6 text-kiswah">
              <strong className="tabular font-semibold">
                {formatMetres(hotel.distanceM)}
              </strong>{' '}
              from{' '}
              {hotel.city === 'Makkah'
                ? 'Masjid al-Haram'
                : 'Al-Masjid an-Nabawi'}
              <span className="text-stone">
                {' '}
                · about <span className="tabular">{hotel.walkMinutes}</span>{' '}
                minutes on foot
              </span>
            </p>
          </div>

          <dl className="mt-5 flex flex-col gap-3.5">
            <Row icon={<Bed width={17} height={17} />} label="Room">
              {hotel.roomType}
            </Row>
            <Row icon={<Utensils width={17} height={17} />} label="Board">
              {hotel.board}
            </Row>
          </dl>

          {!hotel.verified && (
            <p className="mt-5 rounded-input border border-dashed border-antique/30 px-3.5 py-2.5 text-[12px] leading-5 text-stone">
              Distance not yet physically verified. Measure and confirm before
              launch — this figure is the one customers will check.
            </p>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 shrink-0 text-antique/70" aria-hidden>
        {icon}
      </span>
      <div>
        <dt className="sr-only">{label}</dt>
        <dd className="text-[15px] leading-6 text-kiswah/80">{children}</dd>
      </div>
    </div>
  );
}
