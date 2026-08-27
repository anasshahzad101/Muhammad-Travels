import type { ReactNode, ElementType } from 'react';
import { Reveal, RevealRule } from './Reveal';
import { cx } from '@/lib/utils';

/* ============================================================================
   SHARED PRIMITIVES
   ============================================================================
   Spec §06, "What makes it read as premium":
     "Wider type contrast. Large serif headings against small, letter-spaced
      small-caps labels. The gap between the two sizes is where elegance comes
      from."

   `SectionHeading` is where that gap is enforced: a 12px letterspaced gold
   eyebrow, a gold hairline, then a 30–36px serif heading. Because every
   section on the site uses it, the rhythm is consistent by construction rather
   than by remembering.
   ========================================================================= */

export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <span className={cx(tone === 'dark' ? 'eyebrow-dark' : 'eyebrow', className)}>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: ElementType;
  id?: string;
  className?: string;
}) {
  const centered = align === 'center';

  return (
    <div
      className={cx(
        centered && 'mx-auto flex flex-col items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal className="mb-4 flex items-center gap-3">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <RevealRule
            delay={120}
            className={cx(
              'h-px w-14 shrink-0',
              tone === 'dark' ? 'hairline-gold' : 'hairline-gold-light',
            )}
          />
        </Reveal>
      )}

      <Reveal delay={60} as={Tag} id={id}>
        <span className={tone === 'dark' ? 'text-marble' : 'text-kiswah'}>
          {title}
        </span>
      </Reveal>

      {lede && (
        <Reveal
          delay={140}
          as="p"
          className={cx(
            'lede mt-5',
            tone === 'dark' && 'text-marble/65',
            centered && 'mx-auto',
          )}
        >
          {lede}
        </Reveal>
      )}
    </div>
  );
}

/** A small letterspaced label chip. Used for tier badges and metadata. */
export function Pill({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'gold';
  className?: string;
}) {
  const tones = {
    light:
      'border-rule-light bg-marble/60 text-stone',
    dark: 'border-rule-dark bg-white/[0.04] text-marble/70',
    gold: 'border-antique/40 bg-transparent text-antique',
  } as const;

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-input border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Spec §09: "First paragraph — 40–60 word self-contained answer to the page's
 *  core question, before any preamble." Rendered with a gold hairline on the
 *  left so it reads as the answer block it is. */
export function AnswerBlock({
  children,
  tone = 'light',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
}) {
  return (
    <Reveal
      as="p"
      delay={80}
      className={cx(
        'max-w-[64ch] border-l-2 py-1 pl-5 text-[18px] leading-[30px] lg:text-[19px] lg:leading-[32px]',
        tone === 'dark'
          ? 'border-hizam/55 text-marble/85'
          : 'border-antique/45 text-kiswah/85',
      )}
    >
      {children}
    </Reveal>
  );
}

/** Two golds, used correctly. Spec §06 contrast table: #C9A227 on marble fails
 *  at 2.4:1 and is permitted for "large decorative text and rules only", so
 *  anything readable on a light ground uses #8A6B22 instead. */
export function Stat({
  value,
  label,
  tone = 'light',
}: {
  value: ReactNode;
  label: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={cx(
          'font-display text-[30px] leading-none lg:text-[38px]',
          tone === 'dark' ? 'text-marble' : 'text-kiswah',
        )}
        style={{ fontWeight: 600 }}
        data-numeric
      >
        {value}
      </span>
      <span
        className={cx(
          'text-[11px] font-semibold uppercase tracking-[0.12em]',
          tone === 'dark' ? 'text-hizam/80' : 'text-antique',
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** Section wrapper enforcing the Spec §06 rhythm without each page repeating it. */
export function Section({
  children,
  tone = 'marble',
  tight = false,
  id,
  className,
}: {
  children: ReactNode;
  tone?: 'marble' | 'warm' | 'dark';
  tight?: boolean;
  id?: string;
  className?: string;
}) {
  const grounds = {
    marble: 'bg-marble text-kiswah',
    warm: 'bg-warm text-kiswah',
    dark: 'on-dark bg-kiswah text-marble',
  } as const;

  return (
    <section
      id={id}
      className={cx(
        grounds[tone],
        tight ? 'section-tight' : 'section',
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
