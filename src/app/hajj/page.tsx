import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import PackageCard from '@/components/PackageCard';
import ComparisonTable from '@/components/ComparisonTable';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import LicenceBadge from '@/components/LicenceBadge';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal, DrawIcon } from '@/components/Reveal';
import { ArrowRight, Certificate, Users, Calendar, Compass } from '@/components/icons';

import { site, absUrl, isPlaceholder } from '@/lib/site';
import { hajjPackages, lowestPrice } from '@/lib/packages';
import { hajjHubFaqs } from '@/lib/faqs';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { formatPKR, stagger } from '@/lib/utils';
import { makkah } from '@/lib/images';

/* ============================================================================
   /hajj/ — HAJJ HUB
   ============================================================================
   Spec §03: "P1 · Present Hajj packages and the scheme · hajj packages
   pakistan."

   Hajj differs from Umrah in one way that shapes the whole page: the operator
   needs an HGO registration and a quota allocation, and dates cannot be
   confirmed until the Ministry announces the scheme. Saying that plainly is
   more persuasive here than any package feature — an operator promising
   confirmed Hajj dates before the announcement is not in a position to.
   ========================================================================= */

const crumbs = [{ name: 'Hajj', href: '/hajj/' }];

export const metadata: Metadata = {
  title: 'Hajj Packages from Pakistan 1448 | Muhammad Travels',
  description:
    'Hajj packages from PKR 1,450,000 per person. Registered Hajj Group Organiser — Mina tent category confirmed in writing, full board during the rites, quota status published.',
  alternates: { canonical: absUrl('/hajj/') },
  openGraph: {
    url: absUrl('/hajj/'),
    title: 'Hajj Packages from Pakistan 1448 | Muhammad Travels',
    description:
      'Registered HGO. Mina tent category confirmed in writing before payment, and the quota status published on the site.',
  },
};

const schemeSteps = [
  {
    icon: <Certificate width={22} height={22} />,
    title: 'The Ministry announces the scheme',
    body: 'Saudi Arabia allocates a national quota to Pakistan. The Ministry of Religious Affairs divides it between the government scheme and licensed Hajj Group Organisers, then publishes the terms for the year.',
  },
  {
    icon: <Users width={22} height={22} />,
    title: 'Operators receive their allocation',
    body: 'Registered HGOs are allocated seats against their quota. Ours is published on our licence page each year, alongside the registration number you can check against the Ministry list.',
  },
  {
    icon: <Calendar width={22} height={22} />,
    title: 'Applications open and dates are confirmed',
    body: 'Only at this point can any operator honestly confirm departure dates. Applications typically open six to eight months before Hajj.',
  },
  {
    icon: <Compass width={22} height={22} />,
    title: 'Training, documents, then departure',
    body: 'Pre-departure Hajj training covering every rite in sequence, visa processing under our HGO registration, and a trained mu’allim with the group throughout the five days.',
  },
];

export default function HajjHubPage() {
  const from = lowestPrice(hajjPackages);

  return (
    <>
      <PageHero
        eyebrow="Hajj"
        title="Hajj packages from Pakistan"
        answer="Our Hajj packages start at PKR 1,450,000 per person and include the Hajj visa under our own HGO registration, accommodation in Makkah and Madinah, Mina and Arafat tents in a category confirmed in writing, all Mashaer transport and full board during the five days of the rites."
        crumbs={crumbs}
        image={makkah.night}
        compact
      >
        <Reveal delay={230} className="mt-9">
          <LicenceBadge tone="dark" />
        </Reveal>
      </PageHero>

      {/* Packages ---------------------------------------------------------- */}
      <Section tone="marble" id="packages">
        <SectionHeading
          eyebrow="Hajj packages"
          title="Three schemes, priced on what actually differs"
          lede="Tent category, distance to the Jamarat and hotel proximity. Those three decide a Hajj package. Everything else — decor, brochure photography, star ratings — is noise at this price point, and we do not charge you for it."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {hajjPackages.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} delay={stagger(i, 90, 280)} />
          ))}
        </div>

        <div className="mt-14">
          <ComparisonTable
            packages={hajjPackages}
            caption="Scroll sideways on a phone to compare every column."
          />
        </div>
      </Section>

      {/* The scheme -------------------------------------------------------- */}
      <Section tone="warm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="How the scheme works"
            title="Why nobody can confirm your Hajj dates yet"
            lede="Hajj from Pakistan runs on a quota allocated by Saudi Arabia and divided by the Ministry. Until that announcement is made, no operator — us included — is in a position to guarantee a departure date. Anyone who does is guessing."
            className="max-w-[46rem]"
          />
          <Reveal delay={160}>
            <Link href="/hajj/how-it-works/" className="btn-base btn-ghost group shrink-0">
              The full timeline
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {schemeSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={stagger(i, 90, 300)}>
              <div className="flex gap-5">
                <DrawIcon
                  length={140}
                  delay={stagger(i, 90, 300) + 120}
                  className="mt-1 shrink-0 text-antique"
                >
                  {step.icon}
                </DrawIcon>
                <div>
                  <span className="eyebrow">Step {i + 1}</span>
                  <h3
                    className="mt-2 font-display text-[22px] leading-[30px] text-kiswah"
                    style={{ fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[16px] leading-[27px] text-stone">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Quota status ------------------------------------------------------ */}
      <section className="on-dark relative bg-kiswah section-tight">
        <div className="hairline-gold absolute inset-x-0 top-0 opacity-70" />
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow="Our HGO registration"
                title="The number, and this year’s quota status"
                lede="Published here and on our licence page, in text, so you can check it against the Ministry’s list rather than take our word for it."
              />
            </div>
            <Reveal delay={140}>
              <dl className="rounded-card border border-hizam/25 bg-soft p-7 lg:p-8">
                <div className="hairline-gold mb-7 w-16" />
                <dt className="eyebrow-dark mb-2.5">
                  {site.licences.hajj.label}
                </dt>
                <dd
                  className={
                    isPlaceholder(site.licences.hajj.number)
                      ? 'text-[19px] font-semibold text-hizam/85 underline decoration-dotted decoration-hizam/40 underline-offset-[6px]'
                      : 'tabular font-display text-[28px] text-hizam'
                  }
                >
                  {site.licences.hajj.number}
                </dd>

                <dt className="eyebrow-dark mb-2.5 mt-7 border-t border-rule-dark pt-7">
                  Current-year quota status
                </dt>
                <dd className="text-[16px] leading-7 text-marble/70">
                  {site.licences.hajj.quotaStatus}
                </dd>

                <Link
                  href="/licence/"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 border-t border-rule-dark pt-6 text-[14.5px] font-semibold text-hizam"
                >
                  How to verify this
                  <ArrowRight width={15} height={15} />
                </Link>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ ---------------------------------------------------------------- */}
      <Section tone="marble">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Hajj questions"
            title="What people ask about the scheme"
            lede="Eight answers, each written to stand on its own."
          />
          <Faq items={hajjHubFaqs} />
        </div>
      </Section>

      <CtaBand
        heading="Register your interest for Hajj 1448"
        body="Applications open after the Ministry announces the scheme. Tell us now and we will contact you the day it does — with the dates, the tent category and the price, in writing."
        message={`Assalamu alaikum. I'd like to register my interest for Hajj 1448. My details are:`}
      />

      <StickyMobileBar
        message={`Assalamu alaikum. I'd like to ask about your Hajj packages (from ${formatPKR(from)} per person).`}
      />

      <JsonLd schemas={[faqPageSchema(hajjHubFaqs), breadcrumbSchema(crumbs)]} />
    </>
  );
}
