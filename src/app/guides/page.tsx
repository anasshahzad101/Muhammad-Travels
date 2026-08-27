import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import GuideCard from '@/components/GuideCard';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';

import { absUrl } from '@/lib/site';
import { guidesByRecency } from '@/lib/guides';
import { breadcrumbSchema } from '@/lib/schema';
import { stagger } from '@/lib/utils';
import { departure } from '@/lib/images';

/* ============================================================================
   /guides/ — CONTENT HUB
   ============================================================================
   Spec §02 sitemap: "/guides/ — Content engine."
   Spec §02 internal linking: "Guides feed money pages. Every guide carries two
   or three contextual links into relevant packages or departure pages. A guide
   that links nowhere earns traffic and no revenue."
   ========================================================================= */

const crumbs = [{ name: 'Guides', href: '/guides/' }];

export const metadata: Metadata = {
  title: 'Hajj & Umrah Guides for Pakistani Pilgrims | Muhammad Travels',
  description:
    'Practical guides to Umrah and Hajj from Pakistan — verifying an operator, package prices, Nusuk visa requirements, Ramadan timing and travelling with elderly parents.',
  alternates: { canonical: absUrl('/guides/') },
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Guides for Pakistani pilgrims"
        answer="Practical guides covering how to verify a Hajj or Umrah operator against the Ministry list, what packages actually cost from Pakistan, Nusuk visa requirements, the difference between Hajj and Umrah, Ramadan timing, and travelling with elderly parents."
        crumbs={crumbs}
        image={departure.board}
        compact
      />

      <Section tone="marble">
        <SectionHeading
          eyebrow="All guides"
          title="Written to be useful whether or not you book with us"
          lede="Two of these explain how to check up on operators, including us. That is deliberate — an operator confident of surviving verification has every reason to teach it, and an operator who is not has every reason to avoid the subject."
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {guidesByRecency.map((guide, i) => (
            <GuideCard key={guide.slug} guide={guide} delay={stagger(i, 70, 340)} />
          ))}
        </div>
      </Section>

      <CtaBand
        heading="A question none of these answer?"
        body="Ask it on WhatsApp. If it is a good question we will probably write a guide about it, and either way you will get an answer."
        message="Assalamu alaikum. I have a question about Umrah that I couldn't find an answer to:"
      />

      <StickyMobileBar message="Assalamu alaikum. I have a question about Hajj or Umrah." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
