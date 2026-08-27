import Link from 'next/link';
import { Shield, ArrowUpRight } from './icons';
import { DrawIcon } from './Reveal';
import { site, isPlaceholder } from '@/lib/site';
import { cx } from '@/lib/utils';

/* ============================================================================
   LICENCE BADGE
   ============================================================================
   Spec §05: "Small, repeatable component: shield glyph, 'MoRA Licensed',
   licence number, links to /licence/. Used in footer, package pages, cards."

   Spec §06: "Real gold sparingly on the licence badge. Tying your credential
   to the most precious colour on the page is the correct hierarchy — it is
   your most valuable asset."

   This is the one place gold is allowed to be more than a hairline, and even
   here it is a stroke and a letterspaced label, never a fill.
   ========================================================================= */

export default function LicenceBadge({
  tone = 'light',
  size = 'md',
  linked = true,
  className,
}: {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
  linked?: boolean;
  className?: string;
}) {
  const licence = site.licences.umrah.number;
  const pending = isPlaceholder(licence);
  const dark = tone === 'dark';

  const inner = (
    <>
      <DrawIcon length={90}>
        <Shield
          width={size === 'sm' ? 17 : 21}
          height={size === 'sm' ? 17 : 21}
          strokeWidth={1.35}
          className={cx('shrink-0', dark ? 'text-hizam' : 'text-antique')}
        />
      </DrawIcon>

      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-semibold uppercase tracking-[0.12em]',
            size === 'sm' ? 'text-[9.5px]' : 'text-[10.5px]',
            dark ? 'text-hizam' : 'text-antique',
          )}
        >
          MoRA Licensed
        </span>
        <span
          className={cx(
            'mt-1',
            size === 'sm' ? 'text-[11px]' : 'text-[12.5px]',
            pending
              ? cx(
                  'font-semibold underline decoration-dotted underline-offset-4',
                  dark
                    ? 'text-marble/70 decoration-hizam/40'
                    : 'text-stone decoration-antique/40',
                )
              : cx('tabular font-semibold', dark ? 'text-marble/80' : 'text-kiswah/80'),
          )}
        >
          {pending ? licence : licence}
        </span>
      </span>

      {linked && (
        <ArrowUpRight
          width={14}
          height={14}
          className={cx(
            'ml-auto shrink-0 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            dark ? 'text-hizam/60' : 'text-antique/60',
          )}
        />
      )}
    </>
  );

  const shell = cx(
    'group inline-flex items-center gap-3 rounded-card border px-3.5 py-2.5 transition-colors duration-400',
    dark
      ? 'border-hizam/30 bg-white/[0.03] hover:border-hizam/60'
      : 'border-antique/30 bg-warm hover:border-antique/60',
    className,
  );

  if (!linked) {
    return <span className={shell}>{inner}</span>;
  }

  return (
    <Link
      href="/licence/"
      className={shell}
      aria-label="View our licence details and how to verify them"
    >
      {inner}
    </Link>
  );
}
