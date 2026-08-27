import type { CSSProperties, ElementType, ReactNode } from 'react';

/* ============================================================================
   REVEAL WRAPPERS
   ============================================================================
   Server components. They emit a data attribute and a CSS custom property and
   nothing else — all the actual motion is CSS, driven by the single observer
   in ScrollReveal.tsx. That keeps the client bundle flat no matter how many
   revealed elements a page contains.
   ========================================================================= */

type RevealProps = {
  children: ReactNode;
  /** Milliseconds. Use `stagger(i)` from lib/utils for lists. */
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
};

/** Fades and rises 14px as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
  style,
  id,
}: RevealProps) {
  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** A gold hairline that extends from the left as its section arrives.
 *  Spec §06: "Hairlines, not borders. 1px gold rules at 40–60% opacity." */
export function RevealRule({
  delay = 0,
  className = 'hairline-gold-light',
  style,
}: {
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      data-reveal-rule=""
      className={className}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
      aria-hidden
    />
  );
}

/** Wraps an icon so its strokes draw themselves in. */
export function DrawIcon({
  children,
  delay = 0,
  length = 240,
  className,
}: {
  children: ReactNode;
  delay?: number;
  length?: number;
  className?: string;
}) {
  return (
    <span
      data-draw=""
      className={className}
      style={{
        ['--reveal-delay' as string]: `${delay}ms`,
        ['--draw-length' as string]: String(length),
        display: 'inline-flex',
      }}
    >
      {children}
    </span>
  );
}
