import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal, DrawIcon } from '@/components/Reveal';
import { Refund, Check, ArrowRight, Info } from '@/components/icons';

import { absUrl } from '@/lib/site';
import {
  payment,
  umrahCancellation,
  hajjCancellation,
  guarantees,
  type PolicyRow,
} from '@/lib/policies';
import { breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { architecture } from '@/lib/images';

/* ============================================================================
   /refunds/
   ============================================================================
   Spec §02 sitemap: "/terms/ /privacy/ /refunds/ — Refunds page IS A
   CONVERSION ASSET."
   Spec §03: "P3 · Convert the cautious buyer."
   Spec §13 Blocker: "Refund and cancellation terms published."

   A buyer whose deciding anxiety is fraud reads this page before the itinerary.
   Treating it as a legal formality wastes the strongest page on the site after
   /licence/.

   ⚠️  The schedules below come from src/lib/policies.ts and are ILLUSTRATIVE.
   Have a lawyer settle your actual terms before launch.
   ========================================================================= */

const crumbs = [{ name: 'Refunds & cancellation', href: '/refunds/' }];

export const metadata: Metadata = {
  title: 'Refunds & Cancellation Policy | Muhammad Travels',
  description:
    'Our deposit, payment schedule and cancellation terms in full, plus the four circumstances in which your money is returned regardless of the schedule.',
  alternates: { canonical: absUrl('/refunds/') },
};

function ScheduleTable({
  caption,
  rows,
}: {
  caption: string;
  rows: PolicyRow[];
}) {
  return (
    <Reveal>
      <div className="scroll-x surface-card">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="px-6 pt-6 text-left text-[13px] text-stone">
            {caption}
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
            {rows.map((row) => (
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
    </Reveal>
  );
}

export default function RefundsPage() {
  return (
    <>
      <PageHero
        eyebrow="Refunds & cancellation"
        title="What happens to your money"
        answer="A deposit confirms your seat and the balance falls due before visa submission. If you cancel, the refund depends on how close to departure you are and what we have already committed. If your visa is refused, if we cancel, or if a Hajj quota seat does not materialise, you are refunded."
        crumbs={crumbs}
        image={architecture.tilework}
        compact
      />

      {/* Why this page exists ----------------------------------------------- */}
      <Section tone="marble" tight>
        <Reveal>
          <div className="surface-card mx-auto flex max-w-[68rem] flex-col gap-5 p-7 sm:flex-row lg:p-9">
            <Info width={22} height={22} className="mt-0.5 shrink-0 text-antique" />
            <div>
              <h2
                className="font-display text-[24px] leading-[32px] text-kiswah"
                style={{ fontWeight: 600 }}
              >
                Read this before you pay anyone
              </h2>
              <p className="mt-4 max-w-[68ch] text-[16.5px] leading-[28px] text-kiswah/80">
                Not just us. Ask every operator you are considering for their
                cancellation schedule in writing, before a deposit. An operator
                who will not put it in writing is telling you what happens if
                you need it.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Payment ------------------------------------------------------------ */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Paying"
          title="Deposit, balance and receipts"
          lede="Stated plainly. Note in particular that we never ask for payment to a personal account — and neither should anyone else."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {[
            { label: payment.depositLabel, note: payment.depositNote },
            { label: payment.balanceLabel, note: payment.balanceNote },
            { label: payment.methodLabel, note: payment.methodNote },
            { label: payment.receiptLabel, note: payment.receiptNote },
          ].map((row, i) => (
            <Reveal key={row.label} delay={stagger(i, 80)}>
              <div className="surface-card h-full p-7">
                <DrawIcon length={130} delay={stagger(i, 80) + 100} className="text-antique">
                  <Refund width={22} height={22} />
                </DrawIcon>
                <h3
                  className="mt-5 font-display text-[21px] leading-[29px] text-kiswah"
                  style={{ fontWeight: 600 }}
                >
                  {row.label}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[26px] text-stone">
                  {row.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Schedules ---------------------------------------------------------- */}
      <Section tone="marble">
        <SectionHeading
          eyebrow="Cancellation schedules"
          title="Umrah and Hajj, separately"
          lede="Hajj is governed by the Ministry scheme as well as by our terms, so the two schedules differ. Both are published in full rather than available on request."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-10 lg:gap-14">
          <ScheduleTable
            caption="Umrah packages — cancellation schedule"
            rows={umrahCancellation}
          />
          <ScheduleTable
            caption="Hajj packages — cancellation schedule"
            rows={hajjCancellation}
          />
        </div>

        <Reveal delay={200} className="mt-8">
          <p className="max-w-[68ch] text-[14px] leading-[24px] text-stone">
            Where a refund involves costs already committed to an airline, hotel
            or the Mashaer allocation, we pass through exactly what we recover
            and give you a written account of what was deducted and why. We do
            not retain the difference.
          </p>
        </Reveal>
      </Section>

      {/* Guarantees --------------------------------------------------------- */}
      <section className="on-dark relative bg-kiswah section">
        <div className="hairline-gold absolute inset-x-0 top-0 opacity-70" />
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="Regardless of the schedule"
            title="Four circumstances where the money comes back"
            lede="These override the tables above. They are the situations pilgrims most fear, and the ones where an operator’s terms tell you most about the operator."
            className="max-w-[46rem]"
          />

          <div className="mt-14 grid gap-x-12 gap-y-9 lg:grid-cols-2">
            {guarantees.map((g, i) => (
              <Reveal key={g.title} delay={stagger(i, 80, 320)}>
                <div className="flex gap-4 border-t border-rule-dark pt-6">
                  <Check
                    width={19}
                    height={19}
                    strokeWidth={1.6}
                    className="mt-1 shrink-0 text-hizam"
                  />
                  <div>
                    <h3
                      className="font-display text-[21px] leading-[29px] text-marble"
                      style={{ fontWeight: 600 }}
                    >
                      {g.title}
                    </h3>
                    <p className="mt-2.5 max-w-[52ch] text-[15.5px] leading-[26px] text-marble/60">
                      {g.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280} className="mt-12">
            <Link href="/terms/" className="btn-base btn-primary-invert group">
              Full terms and conditions
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Unsure about the terms?"
        body="Ask before you pay, not after. Send us the question on WhatsApp and you will get the answer in writing, which is the form you want it in."
        message="Assalamu alaikum. I have a question about your refund and cancellation terms:"
      />

      <StickyMobileBar message="Assalamu alaikum. I have a question about your refund terms." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
