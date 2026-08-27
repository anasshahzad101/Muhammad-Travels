import Image from 'next/image';
import type { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Reveal, RevealRule } from './Reveal';
import { Eyebrow, AnswerBlock } from './ui';
import type { Crumb } from '@/lib/schema';
import type { Img } from '@/lib/images';

/* ============================================================================
   INNER-PAGE HERO
   ============================================================================
   Spec §06, light and dark: "Trust bar, header, footer — Kiswah black. Hero —
   Kiswah black. Body content, packages, guides — marble / warm white."
   So every page opens on black and then hands over to marble for the reading.
   That is the "dark frame around light, readable content" the spec describes.

   Spec §09 on-page: "H1 — exactly one per page, containing the primary
   keyword, not identical to the title tag" and "First paragraph — 40–60 word
   self-contained answer to the page's core question, before any preamble."
   Both are structural here: `title` is the sole H1 on the page and `answer`
   renders immediately beneath it.
   ========================================================================= */

export default function PageHero({
  eyebrow,
  title,
  answer,
  crumbs,
  image,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  answer?: string;
  crumbs: Crumb[];
  image?: Img;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-kiswah">
      {image && (
        <div className="graded graded-hero absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="container-x">
        <Breadcrumbs crumbs={crumbs} tone="dark" />

        <div className={compact ? 'pb-14 pt-4 lg:pb-20' : 'pb-16 pt-6 lg:pb-24 lg:pt-10'}>
          <Reveal className="mb-5 flex items-center gap-3">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <RevealRule delay={130} className="hairline-gold h-px w-14 shrink-0" />
          </Reveal>

          <Reveal delay={60} as="h1" className="max-w-[22ch]">
            <span className="text-marble">{title}</span>
          </Reveal>

          {answer && (
            <div className="mt-8">
              <AnswerBlock tone="dark">{answer}</AnswerBlock>
            </div>
          )}

          {children}
        </div>
      </div>

      <div className="hairline-gold absolute inset-x-0 bottom-0 opacity-60" />
    </section>
  );
}
