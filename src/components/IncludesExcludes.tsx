import { Check, Cross } from './icons';
import { Reveal } from './Reveal';
import { stagger } from '@/lib/utils';

/* ============================================================================
   INCLUDES / EXCLUDES
   ============================================================================
   Spec §05: "Two columns, tick and cross glyphs. EXCLUDES COLUMN GIVEN EQUAL
   VISUAL WEIGHT — DELIBERATELY."
   Spec §04: "What's not included — EQUALLY PROMINENT."
   Spec §13 Blocker: "Exclusions listed as prominently as inclusions."

   So the two columns are identical in every dimension that carries visual
   weight: same width, same heading size, same body size, same border, same
   spacing, same icon size. The only difference is the glyph and its colour.

   This is the one place in the build where the temptation to de-emphasise is
   strongest and where the spec is most insistent. Resist the urge to shrink
   the right-hand column.
   ========================================================================= */

export default function IncludesExcludes({
  includes,
  excludes,
}: {
  includes: string[];
  excludes: string[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <Column
        heading="What’s included"
        items={includes}
        variant="include"
      />
      <Column
        heading="What’s not included"
        items={excludes}
        variant="exclude"
      />
    </div>
  );
}

function Column({
  heading,
  items,
  variant,
}: {
  heading: string;
  items: string[];
  variant: 'include' | 'exclude';
}) {
  const include = variant === 'include';

  return (
    <div className="surface-card p-6 lg:p-8">
      <Reveal className="flex items-center gap-3">
        <span
          className={
            include
              ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-input border border-antique/35 text-antique'
              : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-input border border-stone/30 text-stone'
          }
          aria-hidden
        >
          {include ? (
            <Check width={17} height={17} strokeWidth={1.6} />
          ) : (
            <Cross width={17} height={17} strokeWidth={1.6} />
          )}
        </span>
        <h3
          className="font-display text-[22px] leading-[28px] text-kiswah"
          style={{ fontWeight: 600 }}
        >
          {heading}
        </h3>
      </Reveal>

      <ul className="mt-6 flex flex-col">
        {items.map((item, i) => (
          <Reveal
            key={item}
            as="li"
            delay={stagger(i, 40, 260)}
            className="flex gap-3.5 border-b border-rule-light py-3.5 last:border-0 last:pb-0"
          >
            <span
              className={
                include
                  ? 'mt-0.5 shrink-0 text-antique'
                  : 'mt-0.5 shrink-0 text-stone/70'
              }
              aria-hidden
            >
              {include ? (
                <Check width={16} height={16} strokeWidth={1.6} />
              ) : (
                <Cross width={16} height={16} strokeWidth={1.6} />
              )}
            </span>
            <span className="text-[15.5px] leading-[25px] text-kiswah/80">
              {item}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
