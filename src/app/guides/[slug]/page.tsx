import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import GuideContent from '@/components/GuideContent';
import GuideCard from '@/components/GuideCard';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import StickyMobileBar from '@/components/StickyMobileBar';
import JsonLd from '@/components/JsonLd';
import LicenceBadge from '@/components/LicenceBadge';
import { Section, SectionHeading } from '@/components/ui';
import { Reveal, RevealRule } from '@/components/Reveal';
import { Clock, Info, ArrowRight } from '@/components/icons';

import { absUrl, isPlaceholder } from '@/lib/site';
import {
  getGuide,
  guideSlugs,
  relatedGuides,
  needsToc,
  tocEntries,
} from '@/lib/guides';
import { articleSchema, faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { formatDateLong, stagger } from '@/lib/utils';

/* ============================================================================
   /guides/[slug]/ — GUIDE ARTICLE
   ============================================================================
   Spec §04, Guide article template, implemented item by item:
     H1 ................................ PageHero title
     byline with name, role, photograph . below the H1 and again in the bio
     published AND last-updated, both visible
     40–60 word answer block under the H1
     table of contents for anything over 1,200 words
     question-phrased H2s .............. from the guide record
     contextual links into packages .... `cta` blocks in the body
     FAQ block
     author bio
     related guides

   Spec §11 on what earns citations: Claude rewards "long-form structured
   guides and named expert sources. Real bylines matter." Perplexity rewards
   "freshness and citations within the content. Visible last-updated dates."
   Both dates are therefore visible above the fold, not in a footer.
   ========================================================================= */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const canonical = absUrl(`/guides/${slug}/`);
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: guide.title,
      description: guide.metaDescription,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [{ url: guide.image.src }],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = relatedGuides(slug);
  const toc = needsToc(guide) ? tocEntries(guide) : [];
  const authorPending = isPlaceholder(guide.author.name);

  const crumbs = [
    { name: 'Guides', href: '/guides/' },
    { name: guide.h1, href: `/guides/${guide.slug}/` },
  ];

  return (
    <>
      <PageHero
        eyebrow={guide.intent}
        title={guide.h1}
        answer={guide.answer}
        crumbs={crumbs}
        image={guide.image}
        compact
      >
        {/* Byline and both dates, visible. ------------------------------- */}
        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-dark pt-7">
            <div className="flex items-center gap-3.5">
              {/* Photograph slot. Spec §04 asks for a real photograph; a stock
                  headshot attached to a real name would be a fabrication. */}
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-hizam/40 text-[10px] uppercase tracking-[0.1em] text-hizam/50"
                aria-hidden
              >
                Photo
              </span>
              <div>
                <p
                  className={
                    authorPending
                      ? 'text-[15px] font-semibold text-hizam/85 underline decoration-dotted decoration-hizam/40 underline-offset-4'
                      : 'text-[15px] font-semibold text-marble'
                  }
                >
                  {guide.author.name}
                </p>
                <p className="mt-0.5 text-[13px] text-marble/50">
                  {guide.author.role}
                </p>
              </div>
            </div>

            <dl className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[13.5px]">
              <div>
                <dt className="text-marble/40">Published</dt>
                <dd className="tabular mt-0.5 text-marble/70">
                  <time dateTime={guide.published}>
                    {formatDateLong(guide.published)}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="text-marble/40">Last updated</dt>
                <dd className="tabular mt-0.5 text-marble/70">
                  <time dateTime={guide.updated}>
                    {formatDateLong(guide.updated)}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="text-marble/40">Reading time</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-marble/70">
                  <Clock width={14} height={14} className="text-hizam/60" />
                  <span className="tabular">{guide.readingMinutes} min</span>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </PageHero>

      {/* BODY -------------------------------------------------------------- */}
      <Section tone="marble" tight>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <article>
            <GuideContent blocks={guide.blocks} />

            {/* Verification notice — this site's own standard applied to
                itself. Spec's closing note requires confirming regulatory
                claims before publishing. */}
            {guide.needsVerification && (
              <Reveal className="mt-12 flex gap-4 rounded-card border border-rule-light bg-warm p-6">
                <Info width={18} height={18} className="mt-0.5 shrink-0 text-antique" />
                <p className="text-[14.5px] leading-[25px] text-stone">
                  Rules on visas, quotas and licensing change, sometimes at
                  short notice. This guide was last reviewed on{' '}
                  <time dateTime={guide.updated} className="tabular font-medium text-kiswah">
                    {formatDateLong(guide.updated)}
                  </time>
                  . Confirm current requirements with the Ministry, with Nusuk,
                  or with us before acting on anything here.
                </p>
              </Reveal>
            )}

            {/* AUTHOR BIO --------------------------------------------------- */}
            <Reveal className="mt-12">
              <div className="surface-card flex flex-col gap-5 p-7 sm:flex-row">
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-antique/40 text-[10px] uppercase tracking-[0.1em] text-antique/50"
                  aria-hidden
                >
                  Photo
                </span>
                <div>
                  <p className="eyebrow mb-2">Written by</p>
                  <p
                    className={
                      authorPending
                        ? 'text-[18px] font-semibold text-antique underline decoration-dotted decoration-antique/40 underline-offset-4'
                        : 'font-display text-[21px] text-kiswah'
                    }
                  >
                    {guide.author.name}
                  </p>
                  <p className="mt-1 text-[14px] text-stone">{guide.author.role}</p>
                  <p className="mt-3.5 max-w-[56ch] text-[15px] leading-[26px] text-kiswah/75">
                    {guide.author.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          </article>

          {/* SIDEBAR — table of contents + licence badge ------------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 && (
              <Reveal delay={100}>
                <nav aria-label="On this page">
                  <p className="eyebrow mb-3.5">On this page</p>
                  <RevealRule className="hairline-gold-light mb-5 h-px w-full" />
                  <ol className="flex flex-col gap-3">
                    {toc.map((entry, i) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          className="block text-[14px] leading-[22px] text-stone transition-colors duration-300 hover:text-antique"
                          style={{ transitionDelay: `${stagger(i, 20, 120)}ms` }}
                        >
                          {entry.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            )}

            <Reveal delay={200} className="mt-9">
              <LicenceBadge className="w-full" />
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* FAQ ---------------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked"
            lede="Each answer written to stand alone if it is lifted out of the page."
          />
          <Faq items={guide.faqs} />
        </div>
      </Section>

      {/* RELATED GUIDES ----------------------------------------------------- */}
      {related.length > 0 && (
        <Section tone="marble">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Related guides"
              title="Read next"
              className="max-w-[46rem]"
            />
            <Reveal delay={160}>
              <Link href="/guides/" className="btn-base btn-ghost group shrink-0">
                All guides
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((g, i) => (
              <GuideCard key={g.slug} guide={g} delay={stagger(i, 90, 280)} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        heading="Still deciding?"
        body="Send us your dates and group size. You will get a written answer with the hotels named, the distances in metres and the exclusions listed — and an honest recommendation, including when it is not us."
        message={`Assalamu alaikum. I read your guide "${guide.h1}" and have a question:`}
      />

      <StickyMobileBar
        message={`Assalamu alaikum. I read your guide "${guide.h1}" and have a question.`}
      />

      {/* Spec §10: Article + Person, FAQPage, BreadcrumbList. */}
      <JsonLd
        schemas={[
          articleSchema(guide),
          faqPageSchema(guide.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}
