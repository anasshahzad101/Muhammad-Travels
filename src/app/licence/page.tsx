import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal, RevealRule, DrawIcon } from '@/components/Reveal';
import {
  Shield,
  Certificate,
  Check,
  AlertTriangle,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Search,
} from '@/components/icons';

import { site, absUrl, isPlaceholder } from '@/lib/site';
import { licenceFaqs } from '@/lib/faqs';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { architecture } from '@/lib/images';

/* ============================================================================
   /licence/ — THE TRUST PAGE
   ============================================================================
   Spec §04: "The most important page on the site after the home page."

   Required contents, all present below:
     · Legal company name exactly as registered with MoRA
     · Umrah attestation number and its expiry date
     · Hajj (HGO) registration number and current-year quota status
     · Citation of the entry on the Ministry's published list, with a link
     · Office address, with a map and a photograph of the actual premises
     · "How to verify any Umrah operator" — a plain checklist
     · "How to spot a fraudulent operator"

   Spec §04 on that last pair: "That last pair is counter-intuitive and it is
   the most persuasive material on the site. Teaching customers to check up on
   you is the strongest possible signal that you will survive being checked."

   ⚠️  TWO PRE-LAUNCH BLOCKERS REMAIN ON THIS PAGE:
     1. Every licence value comes from src/lib/site.ts and is still a
        placeholder. They render as visible bracketed tokens on purpose.
     2. The map embed and the photograph of the actual premises are stubbed.
        A stock photograph must NEVER be used here — Spec §06's hard line. The
        premises photograph is the one image on this site that cannot be stock,
        because its entire evidential value is that it is real.
   ========================================================================= */

const crumbs = [{ name: 'Licence & Verification', href: '/licence/' }];

export const metadata: Metadata = {
  title: 'Licence & Verification | Muhammad Travels',
  description:
    'Our MoRA Umrah attestation and Hajj Group Organiser registration numbers, and step-by-step instructions for verifying them — and any other operator — against the Ministry list.',
  alternates: { canonical: absUrl('/licence/') },
  openGraph: {
    url: absUrl('/licence/'),
    title: 'Licence & Verification | Muhammad Travels',
    description:
      'Our licence numbers, published in text, with instructions for checking them against the Ministry’s published certified-operator list.',
  },
};

/* --- The checklist. Spec §04: "a plain checklist telling people what to
       demand from ANYONE, INCLUDING YOU." ------------------------------- */
const verifySteps = [
  {
    title: 'Ask for the registered company name',
    body: 'Not the name on the shopfront. Companies often trade under a different name from the one on the licence, and searching the Ministry list for the wrong one returns nothing. An operator who will not give you the registered name has answered your question.',
  },
  {
    title: 'Ask for the licence number and its expiry date',
    body: 'Umrah attestation for Umrah, Hajj Group Organiser registration for Hajj. They are separate authorisations and an operator may hold one without the other. A lapsed licence is not a licence.',
  },
  {
    title: 'Search the Ministry’s published list yourself',
    body: 'Do not accept a screenshot — including ours. Go to the Ministry website, find the current list, search the registered name and match the number character for character. A near-match is not a match.',
  },
  {
    title: 'Telephone the Ministry if you cannot find them',
    body: 'Rather than accepting the operator’s explanation for why they are absent from the list. There are legitimate reasons a listing can lag; there are also illegitimate ones, and the Ministry can tell you which applies.',
  },
  {
    title: 'Visit the office',
    body: 'Actually go. A residential flat, a shared desk or an address belonging to another company are all common findings, and all discoverable for the price of a rickshaw fare. A staffed office is considerably harder to fake than a website.',
  },
  {
    title: 'Insist on a receipt for every payment',
    body: 'On company letterhead, to a company bank account, showing the amount, the date and what it is for. Cash with no receipt is not a payment method — it is the removal of your evidence.',
  },
];

/* --- Spec §04: "'How to spot a fraudulent operator' — cash-only demands,
       guaranteed-visa promises, no verifiable office, holding your passport
       without receipt." ------------------------------------------------- */
const fraudSigns = [
  {
    title: 'Cash only, and no receipt',
    body: 'The most reliable single indicator. The discount offered for cash is never worth having nothing to hand an investigator if the trip does not happen.',
  },
  {
    title: 'A guaranteed visa',
    body: 'Visas are issued by the Saudi authorities through Nusuk Masar. No Pakistani agent issues them and none can guarantee an outcome. An operator can promise a complete, prompt application. Nobody can promise the visa.',
  },
  {
    title: 'No office you can walk into',
    body: 'Ask to visit, then go. If the address turns out to be a flat, a shared desk or a different company’s shopfront, you have your answer.',
  },
  {
    title: 'Your passport taken without a receipt',
    body: 'Handing over a passport is normal. Handing it over with no signed document listing the passport number, the date taken and the date of return is not.',
  },
  {
    title: 'Hotels never named',
    body: '“Four-star, near Haram” is not a hotel. Vagueness at booking stage almost always resolves into a hotel considerably further away than implied.',
  },
  {
    title: 'A price far below everyone else',
    body: 'Airfare, the visa and hotel nights have floors. A quote materially below the market has removed something significant — ask what, and get the answer in writing.',
  },
  {
    title: 'Pressure to pay before you can check',
    body: 'Genuine scarcity exists in this business. Urgency deployed specifically to stop you verifying a licence is a different thing, and it is the tell.',
  },
];

export default function LicencePage() {
  const umrahPending = isPlaceholder(site.licences.umrah.number);
  const hajjPending = isPlaceholder(site.licences.hajj.number);

  return (
    <>
      <PageHero
        eyebrow="Licence & verification"
        title="Our licence numbers, and how to check them"
        answer="Muhammad Travels holds its own Umrah attestation and Hajj Group Organiser registration with the Ministry of Religious Affairs and Interfaith Harmony. Both numbers are published below in text. This page also explains how to verify them, and how to verify any other operator you are considering."
        crumbs={crumbs}
        image={architecture.minaretMono}
        compact
      />

      {/* THE NUMBERS ------------------------------------------------------ */}
      <Section tone="marble" id="numbers">
        <SectionHeading
          eyebrow="Registration"
          title="The details, in text and copyable"
          lede="Not in an image, not in a badge graphic. A number rendered as text can be copied, searched and read aloud by an assistant — which is the whole point of publishing it."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          <Reveal className="lg:col-span-1">
            <div className="surface-card h-full p-7">
              <DrawIcon length={120} className="text-antique">
                <Certificate width={24} height={24} />
              </DrawIcon>
              <p className="eyebrow mt-5">Registered company name</p>
              <p
                className={
                  isPlaceholder(site.legalName)
                    ? 'mt-3 text-[19px] font-semibold text-antique underline decoration-dotted decoration-antique/40 underline-offset-[6px]'
                    : 'mt-3 font-display text-[24px] leading-[32px] text-kiswah'
                }
              >
                {site.legalName}
              </p>
              <p className="mt-4 text-[14px] leading-6 text-stone">
                Search the Ministry list for this name, not for our trading name
                — they are not always the same, and searching the wrong one
                returns nothing.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="surface-card h-full p-7">
              <DrawIcon length={120} delay={120} className="text-antique">
                <Shield width={24} height={24} />
              </DrawIcon>
              <p className="eyebrow mt-5">{site.licences.umrah.label}</p>
              <p
                className={
                  umrahPending
                    ? 'mt-3 text-[19px] font-semibold text-antique underline decoration-dotted decoration-antique/40 underline-offset-[6px]'
                    : 'tabular mt-3 font-display text-[28px] leading-none text-kiswah'
                }
              >
                {site.licences.umrah.number}
              </p>
              <dl className="mt-5 flex flex-col gap-2.5 border-t border-rule-light pt-5 text-[14px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone">Expires</dt>
                  <dd className="tabular font-medium text-kiswah">
                    {site.licences.umrah.expires}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone">Issued by</dt>
                  <dd className="text-right font-medium text-kiswah">
                    {site.verification.ministryShort}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="surface-card h-full p-7">
              <DrawIcon length={120} delay={240} className="text-antique">
                <Shield width={24} height={24} />
              </DrawIcon>
              <p className="eyebrow mt-5">{site.licences.hajj.label}</p>
              <p
                className={
                  hajjPending
                    ? 'mt-3 text-[19px] font-semibold text-antique underline decoration-dotted decoration-antique/40 underline-offset-[6px]'
                    : 'tabular mt-3 font-display text-[28px] leading-none text-kiswah'
                }
              >
                {site.licences.hajj.number}
              </p>
              <dl className="mt-5 flex flex-col gap-2.5 border-t border-rule-light pt-5 text-[14px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone">Quota status</dt>
                  <dd className="text-right font-medium text-kiswah">
                    {site.licences.hajj.quotaStatus}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone">Issued by</dt>
                  <dd className="text-right font-medium text-kiswah">
                    {site.verification.ministryShort}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Citation of the Ministry listing --------------------------------- */}
        <Reveal delay={120} className="mt-8">
          <div className="surface-card p-7 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-[60ch]">
                <p className="eyebrow mb-3">Source</p>
                <h3
                  className="font-display text-[22px] leading-[30px] text-kiswah"
                  style={{ fontWeight: 600 }}
                >
                  The Ministry’s published certified-operator list
                </h3>
                <p className="mt-3 text-[15.5px] leading-[26px] text-stone">
                  {site.verification.listNote}
                </p>
              </div>
              <a
                href={site.verification.ministryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-primary group shrink-0"
              >
                Open the Ministry website
                <ArrowUpRight
                  width={16}
                  height={16}
                  className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Screenshot slot — Spec §04 asks for a screenshot or citation of
                the listing. A screenshot is supporting evidence, never a
                substitute for the reader checking the live list themselves. */}
            <div className="mt-7 rounded-input border border-dashed border-antique/35 bg-marble/50 p-6">
              <p className="text-[14px] leading-6 text-stone">
                <strong className="font-semibold text-kiswah">
                  Pre-launch:
                </strong>{' '}
                add a dated screenshot of your entry on the Ministry’s published
                list here, captioned with the date it was captured and a link to
                the live source. A screenshot supports the claim; it does not
                replace the reader checking the live list, and this page should
                keep saying so.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* HOW TO VERIFY ANY OPERATOR --------------------------------------- */}
      <Section tone="warm" id="how-to-verify">
        <SectionHeading
          eyebrow="How to verify any operator"
          title="Six checks. Run them on us, and on everyone else."
          lede="This checklist is deliberately not about us. It works against any Hajj or Umrah operator in Pakistan, and we would rather you used it than trusted a website — ours included."
          className="max-w-[46rem]"
        />

        <ol className="mt-14 grid gap-x-12 gap-y-9 lg:grid-cols-2">
          {verifySteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={stagger(i, 70, 320)}>
              <div className="flex gap-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-antique/40 font-display text-[16px] text-antique"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h3
                    className="font-display text-[21px] leading-[29px] text-kiswah"
                    style={{ fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] text-[15.5px] leading-[26px] text-stone">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={260} className="mt-12">
          <Link
            href="/guides/how-to-verify-umrah-operator/"
            className="btn-base btn-ghost group"
          >
            <Search width={17} height={17} />
            Read the full verification guide
            <ArrowRight
              width={17}
              height={17}
              className="transition-transform duration-400 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Section>

      {/* HOW TO SPOT A FRAUDULENT OPERATOR -------------------------------- */}
      <section className="on-dark relative bg-kiswah section">
        <div className="hairline-gold absolute inset-x-0 top-0 opacity-70" />
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="How to spot a fraudulent operator"
            title="Seven behaviours that appear in almost every fraud case"
            lede="Hajj and Umrah fraud in Pakistan is not sophisticated. It repeats a small number of patterns, and almost every case contains at least two of the seven below. Any one of them is reason enough to stop."
            className="max-w-[46rem]"
          />

          <ul className="mt-14 grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {fraudSigns.map((sign, i) => (
              <Reveal as="li" key={sign.title} delay={stagger(i, 65, 340)}>
                <div className="flex gap-4 border-t border-rule-dark pt-6">
                  <AlertTriangle
                    width={19}
                    height={19}
                    className="mt-1 shrink-0 text-hizam/70"
                  />
                  <div>
                    <h3
                      className="font-display text-[20px] leading-[28px] text-marble"
                      style={{ fontWeight: 600 }}
                    >
                      {sign.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-[26px] text-marble/60">
                      {sign.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={260} className="mt-12">
            <Link
              href="/guides/how-to-spot-a-fraudulent-agent/"
              className="btn-base btn-primary-invert group"
            >
              The full fraud guide
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* THE OFFICE -------------------------------------------------------- */}
      <Section tone="marble" id="office">
        <SectionHeading
          eyebrow="The office"
          title="A real address you can walk into"
          lede="Spec-compliant websites are cheap. A staffed office with a signboard is not, and it is the check a fraudulent operator fails most reliably. Come during opening hours — no appointment needed."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card p-7 lg:p-8">
              <DrawIcon length={110} className="text-antique">
                <MapPin width={22} height={22} />
              </DrawIcon>
              <address className="mt-5 not-italic">
                <p className="font-display text-[22px] leading-[31px] text-kiswah">
                  {site.address.streetAddress}
                  <br />
                  {site.address.addressLocality}, {site.address.addressRegion}
                  <br />
                  Pakistan
                </p>
              </address>

              <dl className="mt-7 flex flex-col gap-3 border-t border-rule-light pt-6 text-[15px]">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6">
                    <dt className="text-stone">{h.days}</dt>
                    <dd className="tabular text-right font-medium text-kiswah">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link href="/contact/" className="btn-base btn-ghost group mt-7 w-full">
                Directions and contact details
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          {/* Premises photograph slot. THIS ONE CANNOT BE STOCK. ---------- */}
          <Reveal delay={120}>
            <div className="surface-card flex h-full flex-col justify-center p-7 lg:p-8">
              <div className="rounded-input border border-dashed border-antique/40 bg-marble/50 p-8 text-center">
                <Check width={26} height={26} className="mx-auto text-antique/60" />
                <h3
                  className="mt-4 font-display text-[21px] leading-[29px] text-kiswah"
                  style={{ fontWeight: 600 }}
                >
                  Photograph of the premises goes here
                </h3>
                <p className="mx-auto mt-3 max-w-[46ch] text-[14.5px] leading-[25px] text-stone">
                  Along with an embedded map of the exact location. Spec §06
                  requires office and team photographs to be shot before launch
                  — two hours’ work, permanent value.
                </p>
                <p className="mx-auto mt-4 max-w-[46ch] rounded-input border border-antique/30 bg-warm px-4 py-3 text-[13.5px] leading-5 text-kiswah/80">
                  <strong className="font-semibold">
                    This image must never be stock.
                  </strong>{' '}
                  Every other photograph on this site sets a mood. This one is
                  evidence, and its entire value is that it is real.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ ---------------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Verification questions"
              title="What people ask about licensing"
              lede="Six answers, each written to be useful whether or not you book with us."
            />
            <Reveal className="mt-8 flex items-center gap-3">
              <RevealRule delay={120} className="hairline-gold-light h-px w-14 shrink-0" />
            </Reveal>
          </div>
          <Faq items={licenceFaqs} />
        </div>
      </Section>

      <CtaBand
        heading="Checked us out? Then let’s talk."
        body="If the numbers matched and the office is real, the next question is which package suits your group. Message us with your dates and we will answer in writing."
        message="Assalamu alaikum. I've checked your licence details and would like to enquire about a package."
      />

      <StickyMobileBar message="Assalamu alaikum. I have a question about your licence and registration." />

      <JsonLd schemas={[faqPageSchema(licenceFaqs), breadcrumbSchema(crumbs)]} />
    </>
  );
}
