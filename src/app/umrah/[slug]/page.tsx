import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import PackageDetail from '@/components/PackageDetail';
import PageHero from '@/components/PageHero';
import PackageFilter from '@/components/PackageFilter';
import ComparisonTable from '@/components/ComparisonTable';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from '@/components/icons';

import { absUrl } from '@/lib/site';
import {
  getPackage,
  getTier,
  packagesByTier,
  tierSlugs,
  umrahPackages,
  lowestPrice,
} from '@/lib/packages';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { formatPKR } from '@/lib/utils';

/* ============================================================================
   /umrah/[slug]/ — TIER PAGES AND PACKAGE PAGES
   ============================================================================
   Spec §02 sitemap places both under the same segment:
     /umrah/economy/   ← tier pages, "each separately rankable"
     /umrah/[package]/ ← package detail pages

   Next.js permits only one dynamic segment per level, so this route resolves
   the slug against the tier list first and the package list second. The two
   render completely different templates.

   Spec §02 URL rules: "Max three levels deep — everything reachable within
   three clicks of home." This keeps package pages at two.
   ========================================================================= */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...tierSlugs.map((slug) => ({ slug })),
    ...umrahPackages.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tier = getTier(slug);
  const pkg = getPackage(slug);
  const canonical = absUrl(`/umrah/${slug}/`);

  if (tier) {
    return {
      title: tier.title,
      description: tier.metaDescription,
      alternates: { canonical },
      openGraph: {
        url: canonical,
        title: tier.title,
        description: tier.metaDescription,
        images: [{ url: tier.image.src }],
      },
    };
  }

  if (pkg) {
    return {
      title: pkg.title,
      description: pkg.metaDescription,
      alternates: { canonical },
      openGraph: {
        url: canonical,
        title: pkg.title,
        description: pkg.metaDescription,
        images: [{ url: pkg.image.src }],
      },
    };
  }

  return {};
}

export default async function UmrahSlugPage({ params }: Props) {
  const { slug } = await params;

  const tier = getTier(slug);
  if (tier) return <TierPage slug={slug} />;

  const pkg = getPackage(slug);
  if (pkg && pkg.trip === 'umrah') return <PackageDetail pkg={pkg} />;

  notFound();
}

/* ------------------------------------------------------------------------ */

function TierPage({ slug }: { slug: string }) {
  const tier = getTier(slug)!;
  const list = packagesByTier(tier.slug, 'umrah');
  const from = lowestPrice(list);

  const crumbs = [
    { name: 'Umrah', href: '/umrah/' },
    { name: `${tier.name} Umrah`, href: `/umrah/${tier.slug}/` },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${tier.name} tier`}
        title={tier.h1}
        answer={tier.answer}
        crumbs={crumbs}
        image={tier.image}
        compact
      >
        <Reveal delay={220} className="mt-9">
          <p className="text-[15px] text-marble/60">
            <span className="tabular font-display text-[30px] text-marble">
              {formatPKR(from)}
            </span>{' '}
            <span className="ml-1">from, per person · {list.length}{' '}
              {list.length === 1 ? 'package' : 'packages'} in this tier</span>
          </p>
        </Reveal>
      </PageHero>

      {/* Tier-specific prose. Genuinely different per tier — Spec §04 warns
          that templated pages with a word swapped read as doorway pages. */}
      <Section tone="marble" tight>
        <div className="max-w-[68ch]">
          {tier.intro.map((para, i) => (
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
      </Section>

      <Section tone="warm" id="packages">
        <SectionHeading
          eyebrow={`${tier.name} packages`}
          title={`${tier.name} Umrah packages`}
          lede="Filter by departure city or month. Every hotel is named and every distance is measured."
          className="max-w-[46rem]"
        />
        <div className="mt-14">
          <PackageFilter packages={list} showTierFilter={false} />
        </div>
      </Section>

      {list.length > 1 && (
        <Section tone="marble">
          <SectionHeading
            eyebrow="Side by side"
            title="Compared on the fields that differ"
            className="max-w-[46rem]"
          />
          <div className="mt-12">
            <ComparisonTable
              packages={list.slice(0, 4)}
              caption="Scroll sideways on a phone to compare every column."
            />
          </div>
        </Section>
      )}

      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title={`${tier.name} Umrah — common questions`}
              lede="Answered on the page, in full."
            />
            <Reveal delay={200} className="mt-8">
              <Link href="/umrah/" className="btn-base btn-ghost group">
                All Umrah packages
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
          <Faq items={tier.faqs} />
        </div>
      </Section>

      <CtaBand
        heading={`Is the ${tier.name.toLowerCase()} tier right for your group?`}
        body="Tell us who is travelling and what matters most — distance, budget, room occupancy or dates — and we will give you a straight answer, including when a different tier suits you better."
        message={`Assalamu alaikum. I'm looking at your ${tier.name} Umrah packages. My group is:`}
      />

      <StickyMobileBar
        message={`Assalamu alaikum. I'd like to ask about your ${tier.name} Umrah packages (from ${formatPKR(from)} per person).`}
      />

      <JsonLd schemas={[faqPageSchema(tier.faqs), breadcrumbSchema(crumbs)]} />
    </>
  );
}
