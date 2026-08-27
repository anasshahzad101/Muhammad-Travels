import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import LicenceBadge from '@/components/LicenceBadge';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal, DrawIcon } from '@/components/Reveal';
import { Shield, Users, Distance, Document, ArrowRight } from '@/components/icons';

import { site, absUrl, isPlaceholder } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { architecture } from '@/lib/images';

/* ============================================================================
   /about/
   ============================================================================
   Spec §03: "P2 · Put real faces to the company · brand."
   Spec §02 sitemap: "/about/ /contact/ — Real people, real office."

   ⚠️  The team section is a scaffold. Spec §06 imagery: "Office and team
   photographs — shoot these before launch. They cost nothing, cannot be stock,
   and directly answer the fraud concern." A stock headshot with an invented
   name is precisely the fabrication this whole site argues against, so the
   slots render as visible placeholders instead.
   ========================================================================= */

const crumbs = [{ name: 'About', href: '/about/' }];

export const metadata: Metadata = {
  title: 'About Muhammad Travels — Licensed Hajj & Umrah Operator',
  description:
    'Who we are, why we publish our licence numbers, and how we work. A MoRA-licensed Hajj and Umrah operator contracting pilgrims directly from an office in Pakistan.',
  alternates: { canonical: absUrl('/about/') },
};

const principles = [
  {
    icon: <Shield width={22} height={22} />,
    title: 'We publish what can be checked',
    body: 'Licence numbers, registered company name, office address, hotel names and distances in metres. If a claim on this site cannot be verified by someone who does not trust us, it does not belong here.',
  },
  {
    icon: <Distance width={22} height={22} />,
    title: 'We compete on the decisive number',
    body: 'Distance to the Haram, measured. It is the field that most determines a pilgrim’s experience and the one most often obscured. We would rather lose a comparison honestly than win it vaguely.',
  },
  {
    icon: <Document width={22} height={22} />,
    title: 'We write the exclusions down',
    body: 'Most disputes in this business start with something a pilgrim assumed was included. Publishing exclusions at the same size as inclusions costs us some bookings and saves every one of them from becoming an argument.',
  },
  {
    icon: <Users width={22} height={22} />,
    title: 'We tell people when it is not us',
    body: 'If your dates do not work, if the tier you are looking at is wrong for your parents, or if another operator genuinely suits you better, we will say so. It is a better long-term business than the alternative.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A licensed operator, not a broker"
        answer="Muhammad Travels is a Hajj and Umrah operator holding its own MoRA Umrah attestation and Hajj Group Organiser registration. We contract pilgrims directly, issue visas through Nusuk Masar in our own name, and carry the service obligation ourselves — there is no partner in between."
        crumbs={crumbs}
        image={architecture.domeDetail}
        compact
      />

      {/* Position ---------------------------------------------------------- */}
      <Section tone="marble" tight>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="max-w-[68ch]">
            <Reveal as="p" className="text-[17.5px] leading-[30px] text-kiswah/80">
              Most companies selling Hajj and Umrah in Pakistan are not the
              operator of record. They sell a package assembled by somebody
              else, on somebody else’s licence, and the pilgrim never finds out
              whose licence it actually was until something goes wrong.
            </Reveal>
            <Reveal
              as="p"
              delay={80}
              className="mt-6 text-[17.5px] leading-[30px] text-kiswah/80"
            >
              We hold both licences ourselves. That means you contract us
              directly, your visa is issued in our name through Nusuk Masar, and
              the company answerable for your trip is the same company you paid.
              There is no commission structure to explain and no partner to
              disclose.
            </Reveal>
            <Reveal
              as="p"
              delay={160}
              className="mt-6 text-[17.5px] leading-[30px] text-kiswah/80"
            >
              It also means we can be checked. The Ministry of Religious Affairs
              publishes a register of certified operators precisely because
              companies in this sector take deposits and disappear — and the one
              genuine advantage of holding your own licence is that you can
              invite the customer to look you up before they pay you anything.
              That is what this website is built around.
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="surface-card p-7">
              <p className="eyebrow mb-4">Registered as</p>
              <p
                className={
                  isPlaceholder(site.legalName)
                    ? 'text-[18px] font-semibold text-antique underline decoration-dotted decoration-antique/40 underline-offset-[6px]'
                    : 'font-display text-[22px] leading-[30px] text-kiswah'
                }
              >
                {site.legalName}
              </p>
              <p className="mt-4 text-[14.5px] leading-6 text-stone">
                Trading as {site.name}. Search the Ministry list for the
                registered name above.
              </p>
              <div className="mt-6 border-t border-rule-light pt-6">
                <LicenceBadge className="w-full" />
              </div>
              <Link href="/licence/" className="btn-base btn-ghost group mt-4 w-full">
                Full licence details
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How we work -------------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="How we work"
          title="Four commitments, all of them checkable"
          lede="Not values. Commitments — each one is something you can hold us to on a specific page of this site."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={stagger(i, 90, 300)}>
              <div className="flex gap-5">
                <DrawIcon
                  length={140}
                  delay={stagger(i, 90, 300) + 120}
                  className="mt-1 shrink-0 text-antique"
                >
                  {p.icon}
                </DrawIcon>
                <div>
                  <h3
                    className="font-display text-[22px] leading-[30px] text-kiswah"
                    style={{ fontWeight: 600 }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[16px] leading-[27px] text-stone">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team --------------------------------------------------------------- */}
      <Section tone="marble">
        <SectionHeading
          eyebrow="The team"
          title="Real people, photographed at the real office"
          lede="A pilgrim deciding whether to transfer three hundred thousand rupees wants to see who is receiving it. This is the cheapest trust signal available and the one most operators skip."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[
            'Director / licence holder',
            'Operations & group leader',
            'Visa & documentation',
          ].map((role, i) => (
            <Reveal key={role} delay={stagger(i, 90)}>
              <div className="surface-card p-7 text-center">
                <span
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-antique/40 text-[10px] uppercase tracking-[0.1em] text-antique/50"
                  aria-hidden
                >
                  Photo
                </span>
                <p className="mt-5 text-[18px] font-semibold text-antique underline decoration-dotted decoration-antique/40 underline-offset-[6px]">
                  [NAME]
                </p>
                <p className="mt-2 text-[14px] text-stone">{role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-10">
          <p className="mx-auto max-w-[68ch] rounded-card border border-dashed border-antique/35 bg-warm p-6 text-center text-[14.5px] leading-[25px] text-stone">
            <strong className="font-semibold text-kiswah">Pre-launch:</strong>{' '}
            brief a photographer for the office, the team and the premises. Two
            hours’ work with permanent value — and these are the images on the
            site that cannot be stock, because their entire purpose is to prove
            the company is real.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        heading="Come and see the office"
        body="During opening hours, without an appointment. Check our licence numbers against the Ministry list first, then come and look at where your money would be going."
        message="Assalamu alaikum. I'd like to visit your office. When would be convenient?"
      />

      <StickyMobileBar message="Assalamu alaikum. I'd like to know more about Muhammad Travels." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
