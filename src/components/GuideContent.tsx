import Link from 'next/link';
import { Check, AlertTriangle, Info, ArrowRight } from './icons';
import { Reveal, RevealRule } from './Reveal';
import type { Block } from '@/lib/guides';
import { slugifyHeading } from '@/lib/guides';
import { stagger } from '@/lib/utils';

/* ============================================================================
   GUIDE BODY RENDERER
   ============================================================================
   Guides are stored as typed blocks rather than HTML strings, which is what
   makes Spec §09's structural rules enforceable instead of aspirational:

   · "H2–H4 sequential, never skipping levels. Sequential structure correlates
      with materially higher AI citation rates." — the block types only permit
      h2 and h3, so a level cannot be skipped by accident.
   · "Question headings — phrase H2s as the questions users ask." — visible in
      the data, reviewable at a glance.
   · Spec §11: "Comparison tables — preferentially cited over prose for factual
      queries." — tables are a first-class block, not an afterthought, and
      scroll inside their own container per §07.

   Every H2 gets a stable id so the table of contents anchors correctly.
   ========================================================================= */

export default function GuideContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} index={i} />
      ))}
    </div>
  );
}

function BlockView({ block, index }: { block: Block; index: number }) {
  switch (block.type) {
    case 'h2':
      return (
        <div className="mt-14 first:mt-0">
          <Reveal className="mb-4 flex items-center gap-3">
            <RevealRule className="hairline-gold-light h-px w-10 shrink-0" />
          </Reveal>
          <Reveal
            as="h2"
            id={slugifyHeading(block.text)}
            className="scroll-mt-28"
          >
            <span className="text-kiswah">{block.text}</span>
          </Reveal>
        </div>
      );

    case 'h3':
      return (
        <Reveal as="h3" className="mt-9 scroll-mt-28 text-kiswah">
          {block.text}
        </Reveal>
      );

    case 'p':
      return (
        <Reveal
          as="p"
          className="mt-5 max-w-[68ch] text-[17px] leading-[29px] text-kiswah/80"
        >
          {block.text}
        </Reveal>
      );

    case 'list':
      return (
        <ul className="mt-6 flex max-w-[68ch] flex-col gap-3">
          {block.items.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={stagger(i, 45, 270)}
              className="flex gap-3.5"
            >
              <span
                className="mt-[13px] h-1 w-1 shrink-0 rounded-full bg-antique"
                aria-hidden
              />
              <span className="text-[16.5px] leading-[28px] text-kiswah/80">
                {item}
              </span>
            </Reveal>
          ))}
        </ul>
      );

    case 'checklist':
      return (
        <ul className="mt-6 flex max-w-[68ch] flex-col">
          {block.items.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={stagger(i, 45, 270)}
              className="flex gap-3.5 border-b border-rule-light py-3.5 last:border-0"
            >
              <Check
                width={17}
                height={17}
                strokeWidth={1.6}
                className="mt-1.5 shrink-0 text-antique"
              />
              <span className="text-[16.5px] leading-[28px] text-kiswah/80">
                {item}
              </span>
            </Reveal>
          ))}
        </ul>
      );

    case 'warnlist':
      return (
        <ul className="mt-6 flex max-w-[68ch] flex-col">
          {block.items.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={stagger(i, 45, 270)}
              className="flex gap-3.5 border-b border-rule-light py-3.5 last:border-0"
            >
              <AlertTriangle
                width={17}
                height={17}
                strokeWidth={1.5}
                className="mt-1.5 shrink-0 text-stone"
              />
              <span className="text-[16.5px] leading-[28px] text-kiswah/80">
                {item}
              </span>
            </Reveal>
          ))}
        </ul>
      );

    case 'table':
      return (
        <Reveal className="mt-8">
          {block.caption && (
            <p className="eyebrow mb-3">{block.caption}</p>
          )}
          {/* Own scroll container — the page body never scrolls sideways. */}
          <div className="scroll-x surface-card">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule-light">
                  {block.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-antique"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b border-rule-light last:border-0"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={
                          ci === 0
                            ? 'px-5 py-4 text-[15px] font-medium leading-6 text-kiswah'
                            : 'tabular px-5 py-4 text-[15px] leading-6 text-kiswah/75'
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      );

    case 'callout':
      return (
        <Reveal
          className="mt-9 max-w-[68ch] rounded-card border border-antique/30 bg-warm p-6 lg:p-7"
          delay={index * 10}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <Info width={16} height={16} className="shrink-0 text-antique" />
            <span className="eyebrow">{block.label}</span>
          </div>
          <p className="text-[16.5px] leading-[28px] text-kiswah/80">
            {block.text}
          </p>
        </Reveal>
      );

    case 'cta':
      return (
        <Reveal className="mt-10 max-w-[68ch]">
          <div className="on-dark rounded-card bg-kiswah p-7 lg:p-8">
            <div className="hairline-gold mb-6 w-16" />
            <p className="text-[16.5px] leading-[28px] text-marble/75">
              {block.text}
            </p>
            <Link
              href={block.href}
              className="btn-base btn-primary-invert group mt-6"
            >
              {block.label}
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      );
  }
}
