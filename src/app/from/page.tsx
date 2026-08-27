import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import CityCard from '@/components/CityCard';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

import { absUrl } from '@/lib/site';
import { cities } from '@/lib/cities';
import { packagesFromCity, lowestPrice } from '@/lib/packages';
import { breadcrumbSchema } from '@/lib/schema';
import { formatPKR, stagger } from '@/lib/utils';
import { departure } from '@/lib/images';

/* ============================================================================
   /from/ — DEPARTURE CITIES INDEX
   ============================================================================
   Spec §02 sitemap: "/from/ — Departure cities — high local intent."
   Spec §11 local SEO: "Departure city pages serve 'umrah near me' and
   city-qualified intent."

   The routing table below is the point of this page. Most operators advertise
   one national price and add the connection charge after a deposit; publishing
   the routing and the supplement up front is the differentiator.
   ========================================================================= */

const crumbs = [{ name: 'Departures', href: '/from/' }];

export const metadata: Metadata = {
  title: 'Umrah Packages by Departure City in Pakistan | Muhammad Travels',
  description:
    'Umrah packages departing from Lahore, Karachi, Islamabad, Multan, Faisalabad and Peshawar. Real flight routing, carriers, and any supplement published up front.',
  alternates: { canonical: absUrl('/from/') },
};

export default function DeparturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Departures"
        title="Umrah packages by departure city"
        answer="We depart from six Pakistani airports. Lahore, Karachi and Islamabad have direct flights with no supplement. Multan and Faisalabad connect via Lahore with the coach transfer included in the price. Peshawar carries a published PKR 10,000 supplement where no direct service operates."
        crumbs={crumbs}
        image={departure.dusk}
        compact
      />

      <Section tone="marble">
        <SectionHeading
          eyebrow="Six cities"
          title="Every routing stated before you enquire"
          lede="Where the flight is direct we say so. Where it connects, we say where and include the transfer. Where there is a supplement, the figure is on the page rather than added once a deposit has been paid."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cities.map((city, i) => (
            <CityCard key={city.slug} city={city} delay={stagger(i, 70, 320)} />
          ))}
        </div>
      </Section>

      {/* Routing table — Spec §11: comparison tables are preferentially cited
          over prose for factual queries. ---------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="At a glance"
          title="Routing, carriers and supplements"
          lede="The whole picture in one table. Scroll sideways on a phone."
          className="max-w-[46rem]"
        />

        <Reveal className="mt-12">
          <div className="scroll-x surface-card">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule-light">
                  {['City', 'Airport', 'Routing', 'Flight time', 'Supplement', 'From'].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-antique"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {cities.map((c) => {
                  const from = lowestPrice(packagesFromCity(c.slug)) + c.supplement;
                  return (
                    <tr key={c.slug} className="border-b border-rule-light last:border-0">
                      <th
                        scope="row"
                        className="px-5 py-4 text-[15px] font-semibold text-kiswah"
                      >
                        {c.name}
                      </th>
                      <td className="px-5 py-4 text-[14.5px] leading-6 text-kiswah/75">
                        {c.airport}
                        <span className="tabular block text-[13px] text-stone">
                          {c.iata}
                        </span>
                      </td>
                      <td className="max-w-[280px] px-5 py-4 text-[14px] leading-6 text-kiswah/75">
                        {c.routing}
                      </td>
                      <td className="tabular px-5 py-4 text-[14px] leading-6 text-kiswah/75">
                        {c.flightTime}
                      </td>
                      <td className="tabular px-5 py-4 text-[14.5px] leading-6">
                        {c.supplement > 0 ? (
                          <span className="font-semibold text-kiswah">
                            {formatPKR(c.supplement)}
                          </span>
                        ) : (
                          <span className="text-antique">None</span>
                        )}
                      </td>
                      <td className="tabular px-5 py-4 text-[15px] font-semibold text-kiswah">
                        {formatPKR(from)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        heading="Departing from somewhere else?"
        body="We can usually arrange a connection from any Pakistani city with a scheduled service to Lahore, Karachi or Islamabad. Tell us where you are and we will price it honestly — including telling you when making your own way is cheaper."
        message="Assalamu alaikum. I'd like to depart from a city not listed. I am travelling from:"
      />

      <StickyMobileBar message="Assalamu alaikum. I'd like to ask about Umrah departures from my city." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
