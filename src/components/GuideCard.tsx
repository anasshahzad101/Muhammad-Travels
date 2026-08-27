import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from './icons';
import { Reveal } from './Reveal';
import { Pill } from './ui';
import type { Guide } from '@/lib/guides';
import { formatDate } from '@/lib/utils';

/* ============================================================================
   GUIDE CARD
   ============================================================================
   Spec §03, home block 09: "Three latest. Signals an active, maintained
   company."
   Spec §09: "Dates — visible published and LAST-UPDATED dates on all guides."
   Spec §11 on Perplexity: "Freshness and citations within the content. Visible
   last-updated dates."

   So the card leads with the updated date, not the published one. A guide
   maintained last month is a stronger signal than one written last year.
   ========================================================================= */

export default function GuideCard({
  guide,
  delay = 0,
  compact = false,
}: {
  guide: Guide;
  delay?: number;
  compact?: boolean;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group zoom-frame lift surface-card flex h-full flex-col overflow-hidden">
        {!compact && (
          <Link
            href={`/guides/${guide.slug}/`}
            className="graded relative block aspect-[16/9] w-full"
            tabIndex={-1}
            aria-hidden
          >
            <Image
              src={guide.image.src}
              alt={guide.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </Link>
        )}

        <div className="flex flex-1 flex-col p-6">
          <Pill tone="gold" className="self-start">
            {guide.intent}
          </Pill>

          <h3
            className="mt-4 font-display text-[21px] leading-[29px] text-kiswah"
            style={{ fontWeight: 600 }}
          >
            <Link
              href={`/guides/${guide.slug}/`}
              className="transition-colors duration-300 group-hover:text-antique"
            >
              {guide.h1}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-3 text-[15px] leading-[25px] text-stone">
            {guide.answer}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-rule-light pt-5">
            <div className="flex flex-col gap-1 text-[12.5px] text-stone">
              <span className="tabular">
                Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock width={13} height={13} className="text-antique/70" />
                <span className="tabular">{guide.readingMinutes} min read</span>
              </span>
            </div>
            <ArrowRight
              width={18}
              height={18}
              className="shrink-0 text-antique transition-transform duration-400 group-hover:translate-x-1"
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
