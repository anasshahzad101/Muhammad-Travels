import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import EnquiryForm from '@/components/EnquiryForm';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import LicenceBadge from '@/components/LicenceBadge';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal, DrawIcon } from '@/components/Reveal';
import {
  WhatsApp,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
} from '@/components/icons';

import { site, absUrl, telHref, whatsappHref } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { departure } from '@/lib/images';

/* ============================================================================
   /contact/
   ============================================================================
   Spec §03: "P1 · Make contact effortless; PROVE A REAL OFFICE · brand +
   contact."
   Spec §14: "Route every conversion through WhatsApp, because that is where
   this transaction actually closes."

   So WhatsApp comes first, the phone number second, the form third, and the
   office address is treated as evidence rather than as a footer detail.
   ========================================================================= */

const crumbs = [{ name: 'Contact', href: '/contact/' }];

export const metadata: Metadata = {
  title: 'Contact Muhammad Travels — Licensed Hajj & Umrah Operator',
  description:
    'WhatsApp, phone, email and our office address with opening hours. Walk-in visits welcome — verify our licence numbers first, then come and see the premises.',
  alternates: { canonical: absUrl('/contact/') },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the company that holds the licence"
        answer="Message us on WhatsApp for the fastest reply, call during opening hours, or send the six-field form below. Our office is open to walk-in visits without an appointment — and we would rather you came and looked before you paid anything."
        crumbs={crumbs}
        image={departure.terminalNight}
        compact
      />

      {/* Contact methods --------------------------------------------------- */}
      <Section tone="marble" tight>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          <Reveal>
            <a
              href={whatsappHref(
                `Assalamu alaikum. I'd like to ask about your Hajj and Umrah packages.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="lift surface-card flex h-full flex-col p-7"
              data-analytics="whatsapp-click"
            >
              <span className="text-whatsapp">
                <WhatsApp width={26} height={26} />
              </span>
              <h2
                className="mt-5 font-display text-[22px] leading-[30px] text-kiswah"
                style={{ fontWeight: 600 }}
              >
                WhatsApp
              </h2>
              <p className="mt-2.5 flex-1 text-[15px] leading-[25px] text-stone">
                The fastest way to reach us, and where most bookings actually
                happen. Replies during office hours, always in writing.
              </p>
              <span className="tabular mt-5 text-[15px] font-semibold text-kiswah">
                {site.whatsapp.display}
              </span>
            </a>
          </Reveal>

          <Reveal delay={90}>
            <a
              href={telHref()}
              className="lift surface-card flex h-full flex-col p-7"
              data-analytics="call-click"
            >
              <DrawIcon length={120} delay={120} className="text-antique">
                <Phone width={26} height={26} />
              </DrawIcon>
              <h2
                className="mt-5 font-display text-[22px] leading-[30px] text-kiswah"
                style={{ fontWeight: 600 }}
              >
                Telephone
              </h2>
              <p className="mt-2.5 flex-1 text-[15px] leading-[25px] text-stone">
                For pilgrims who would rather speak than type — which, in this
                business, is a great many of them.
              </p>
              <span className="tabular mt-5 text-[15px] font-semibold text-kiswah">
                {site.phone.display}
              </span>
            </a>
          </Reveal>

          <Reveal delay={180}>
            <a
              href={`mailto:${site.email}`}
              className="lift surface-card flex h-full flex-col p-7"
            >
              <DrawIcon length={120} delay={240} className="text-antique">
                <Mail width={26} height={26} />
              </DrawIcon>
              <h2
                className="mt-5 font-display text-[22px] leading-[30px] text-kiswah"
                style={{ fontWeight: 600 }}
              >
                Email
              </h2>
              <p className="mt-2.5 flex-1 text-[15px] leading-[25px] text-stone">
                For documents, written quotes and anything you want a record of.
                A branded mailbox on our own domain, not a free account.
              </p>
              <span className="mt-5 text-[15px] font-semibold text-kiswah">
                {site.email}
              </span>
            </a>
          </Reveal>
        </div>
      </Section>

      {/* Office + form ------------------------------------------------------ */}
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The office"
              title="A real address, open to walk-ins"
              lede="No appointment needed during opening hours. Check our licence numbers against the Ministry’s list first — then come and see where your money would be going."
            />

            <Reveal delay={140} className="mt-9">
              <dl className="surface-card flex flex-col divide-y divide-rule-light">
                <div className="flex gap-4 p-6">
                  <DrawIcon length={110} className="mt-0.5 shrink-0 text-antique">
                    <MapPin width={19} height={19} />
                  </DrawIcon>
                  <div>
                    <dt className="eyebrow mb-2">Address</dt>
                    <dd>
                      <address className="text-[15.5px] not-italic leading-[26px] text-kiswah/80">
                        {site.address.streetAddress}
                        <br />
                        {site.address.addressLocality},{' '}
                        {site.address.addressRegion}
                        <br />
                        Pakistan
                      </address>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 p-6">
                  <DrawIcon length={110} delay={120} className="mt-0.5 shrink-0 text-antique">
                    <Clock width={19} height={19} />
                  </DrawIcon>
                  <div className="w-full">
                    <dt className="eyebrow mb-2.5">Opening hours</dt>
                    <dd className="flex flex-col gap-2">
                      {site.hours.map((h, i) => (
                        <span
                          key={h.days}
                          className="flex justify-between gap-6 text-[15px]"
                          style={{ transitionDelay: `${stagger(i, 40)}ms` }}
                        >
                          <span className="text-stone">{h.days}</span>
                          <span className="tabular text-right font-medium text-kiswah">
                            {h.time}
                          </span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 p-6">
                  <DrawIcon length={110} delay={240} className="mt-0.5 shrink-0 text-antique">
                    <Shield width={19} height={19} />
                  </DrawIcon>
                  <div>
                    <dt className="eyebrow mb-2">Before you visit</dt>
                    <dd className="text-[15.5px] leading-[26px] text-kiswah/80">
                      Look us up on the Ministry’s certified-operator list. It
                      takes ten minutes and it is the single most useful thing
                      you can do before meeting any operator.
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>

            {/* Map slot ---------------------------------------------------- */}
            <Reveal delay={220} className="mt-6">
              <div className="rounded-card border border-dashed border-antique/35 bg-marble/50 p-8 text-center">
                <MapPin width={24} height={24} className="mx-auto text-antique/60" />
                <p className="mt-3 text-[14.5px] leading-[25px] text-stone">
                  <strong className="font-semibold text-kiswah">
                    Pre-launch:
                  </strong>{' '}
                  embed a map of the exact office location here, and claim the
                  Google Business Profile — Spec §11 calls it “the single
                  highest-return local action”.
                </p>
              </div>
            </Reveal>

            <Reveal delay={280} className="mt-8">
              <Link href="/licence/" className="btn-base btn-ghost group">
                Licence &amp; verification
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              eyebrow="Written quote"
              title="Six fields, then a written answer"
              lede="Name, phone, departure city, travellers, month and anything we should know. That is all we need, and every extra field would only cost you time."
            />
            <Reveal delay={140} className="mt-9">
              <EnquiryForm />
            </Reveal>
            <Reveal delay={220} className="mt-6">
              <LicenceBadge className="w-full" />
            </Reveal>
          </div>
        </div>
      </Section>

      <StickyMobileBar message="Assalamu alaikum. I'd like to get in touch about a package." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
