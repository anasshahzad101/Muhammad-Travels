import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Check, AlertTriangle } from '@/components/icons';

import { absUrl } from '@/lib/site';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { makkah } from '@/lib/images';
import type { Faq as FaqItem } from '@/lib/packages';

/* ============================================================================
   /hajj/how-it-works/
   ============================================================================
   Spec §02 sitemap: "/hajj/how-it-works/ — Scheme, quota, timeline."
   Spec §03: "P3 · Explain quota and timeline · how to apply for hajj pakistan."
   Spec §12 content plan: "Hajj quota and application process explained —
   Complex and poorly explained across the sector."

   ⚠️  Scheme details change annually. Confirm against the current Ministry
   announcement before publishing.
   ========================================================================= */

const crumbs = [
  { name: 'Hajj', href: '/hajj/' },
  { name: 'How it works', href: '/hajj/how-it-works/' },
];

export const metadata: Metadata = {
  title: 'How to Apply for Hajj from Pakistan 1448 | Muhammad Travels',
  description:
    'How the Pakistan Hajj scheme works: the quota, the government and private schemes, the application timeline, documents required, and what to prepare before applying.',
  alternates: { canonical: absUrl('/hajj/how-it-works/') },
};

const timeline = [
  {
    when: '8–10 months before',
    title: 'Saudi Arabia sets the national quota',
    detail:
      'The Saudi authorities confirm how many pilgrims each country may send. Pakistan’s allocation is announced and the Ministry begins preparing the scheme for the year.',
  },
  {
    when: '6–8 months before',
    title: 'The Ministry announces the Hajj Policy',
    detail:
      'The quota is divided between the government scheme and licensed Hajj Group Organisers. Package cost bands, the balloting arrangements and the application window are all published at this point — and not before.',
  },
  {
    when: '6–7 months before',
    title: 'Applications open',
    detail:
      'Applications are submitted with passport, CNIC, medical fitness documentation and the required payment. Government-scheme applications go through designated banks; private-scheme applications go through your registered HGO.',
  },
  {
    when: '5–6 months before',
    title: 'Allocation confirmed',
    detail:
      'Successful applicants are confirmed. Where demand exceeds the quota a ballot may be used. Unsuccessful applicants under the government scheme are refunded.',
  },
  {
    when: '2–4 months before',
    title: 'Visa processing and training',
    detail:
      'Hajj visas are processed, vaccinations completed, and pre-departure training runs. This is when the tent category, hotel and flight details should be confirmed to you in writing.',
  },
  {
    when: 'Dhul Qa’dah',
    title: 'Departure',
    detail:
      'Flights depart across several weeks depending on scheme and city. Long-scheme pilgrims leave first, and short-scheme pilgrims closer to the rites.',
  },
];

const documents = [
  'Machine-readable passport valid well beyond the return date',
  'Valid NADRA CNIC',
  'Recent passport photographs to the current specification',
  'Medical fitness certification as required by the scheme for the year',
  'Vaccination records as required at the time of travel',
  'A mahram’s documents where the scheme requires them for the applicant',
];

const cautions = [
  'Any operator confirming Hajj dates before the Ministry announces the scheme is guessing. Nobody has that information earlier.',
  'Tent category at Mina is the largest single variable in Hajj pricing. Get it in writing before paying a balance, not in a brochure.',
  'Qurbani should be listed separately at cost. Bundled into a headline price, it invites a dispute about what was actually paid on your behalf.',
  'A private-scheme operator must hold a current HGO registration. Check the number against the Ministry list before you transfer any money.',
];

const faqs: FaqItem[] = [
  {
    q: 'How do I apply for Hajj from Pakistan?',
    a: 'Applications open after the Ministry of Religious Affairs announces the Hajj Policy for the year, typically six to eight months before Hajj. Government-scheme applications are submitted through designated banks; private-scheme applications go through a registered Hajj Group Organiser with passport, CNIC and medical documentation.',
  },
  {
    q: 'What is the difference between the government and private Hajj schemes?',
    a: 'The government scheme is administered directly by the Ministry, usually at a lower cost with allocation by ballot where demand exceeds supply. The private scheme runs through licensed Hajj Group Organisers, generally costs more, and offers a choice of package, hotel proximity and Mina tent category.',
  },
  {
    q: 'How is the Hajj quota decided?',
    a: 'Saudi Arabia allocates a national quota to each country, broadly in proportion to its Muslim population and subject to capacity decisions at the holy sites. Pakistan’s Ministry of Religious Affairs then divides that allocation between the government scheme and licensed private operators.',
  },
  {
    q: 'What happens if I am not selected in the ballot?',
    a: 'Under the government scheme, unsuccessful applicants are refunded according to the terms published with the policy for that year. With a private operator, a quota shortfall should mean a full refund — check that this is written into the terms before you apply.',
  },
  {
    q: 'When should I start preparing for Hajj?',
    a: 'A year ahead is realistic. Passport validity, medical fitness, savings and — for many pilgrims — an Umrah trip first, to become familiar with the Haram and the climate, all take time that the six-month application window does not leave room for.',
  },
  {
    q: 'Is there an age or health requirement for Hajj?',
    a: 'Requirements vary by year and are set by the Saudi authorities and the Ministry, and have included age limits and vaccination conditions in recent years. Medical fitness documentation is normally part of the application. Confirm the current position before applying.',
  },
  {
    q: 'How much does Hajj cost from Pakistan?',
    a: 'Government-scheme costs are published with the annual policy. Private packages typically run from around PKR 1,450,000 per person for the long scheme, rising with hotel proximity and Mina tent category. Our own packages are published with a price validity date.',
  },
  {
    q: 'Can I perform Hajj on an Umrah or visit visa?',
    a: 'No. Hajj requires a Hajj visa issued under the scheme, and the Saudi authorities enforce this at the Mashaer checkpoints. Anyone offering to arrange Hajj on another visa type is proposing something that will not work and may be unlawful.',
  },
];

export default function HajjHowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Hajj"
        title="How Hajj works from Pakistan"
        answer="Hajj from Pakistan runs on a national quota allocated by Saudi Arabia and divided by the Ministry of Religious Affairs between the government scheme and licensed private operators. Applications open six to eight months before Hajj, once the annual Hajj Policy is announced."
        crumbs={crumbs}
        image={makkah.haramInterior}
        compact
      />

      {/* Timeline ---------------------------------------------------------- */}
      <Section tone="marble">
        <SectionHeading
          eyebrow="The timeline"
          title="When each thing actually happens"
          lede="The single most common misunderstanding about Hajj is that you can book it like a holiday, at any time, for a date of your choosing. You cannot — and the sequence below is why."
          className="max-w-[46rem]"
        />

        <ol className="mt-14 max-w-[62rem]">
          {timeline.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={stagger(i, 70, 350)}
              className="grid gap-3 border-b border-rule-light py-7 last:border-0 sm:grid-cols-[190px_1fr] sm:gap-8"
            >
              <span className="eyebrow pt-1">{step.when}</span>
              <div>
                <h3
                  className="font-display text-[21px] leading-[29px] text-kiswah"
                  style={{ fontWeight: 600 }}
                >
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[62ch] text-[16px] leading-[27px] text-stone">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Documents + cautions ---------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What you need"
              title="Documents required to apply"
            />
            <ul className="mt-8">
              {documents.map((doc, i) => (
                <Reveal
                  as="li"
                  key={doc}
                  delay={stagger(i, 45, 260)}
                  className="flex gap-3.5 border-b border-rule-light py-3.5 last:border-0"
                >
                  <Check
                    width={17}
                    height={17}
                    strokeWidth={1.6}
                    className="mt-1.5 shrink-0 text-antique"
                  />
                  <span className="text-[16px] leading-[27px] text-kiswah/80">
                    {doc}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              eyebrow="Before you pay anyone"
              title="Four things worth knowing"
            />
            <ul className="mt-8">
              {cautions.map((c, i) => (
                <Reveal
                  as="li"
                  key={c}
                  delay={stagger(i, 45, 260)}
                  className="flex gap-3.5 border-b border-rule-light py-3.5 last:border-0"
                >
                  <AlertTriangle
                    width={17}
                    height={17}
                    strokeWidth={1.5}
                    className="mt-1.5 shrink-0 text-stone"
                  />
                  <span className="text-[16px] leading-[27px] text-kiswah/80">
                    {c}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={280} className="mt-8">
              <Link href="/licence/" className="btn-base btn-ghost group">
                Check our HGO registration
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* FAQ ---------------------------------------------------------------- */}
      <Section tone="marble">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Questions"
            title="Applying for Hajj — common questions"
            lede="Eight answers, each standing alone."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        heading="Register interest for the next Hajj scheme"
        body="We will contact you the day the Ministry announces the policy — with the dates, the tent category and the price, in writing. No deposit is taken before that."
        message="Assalamu alaikum. I'd like to register interest for the next Hajj scheme."
      />

      <StickyMobileBar message="Assalamu alaikum. I have a question about applying for Hajj from Pakistan." />

      <JsonLd schemas={[faqPageSchema(faqs), breadcrumbSchema(crumbs)]} />
    </>
  );
}
