import Link from 'next/link';
import { site, telHref, isPlaceholder } from '@/lib/site';
import { Shield, Phone } from './icons';

/* ============================================================================
   TRUST BAR
   ============================================================================
   Spec §03, home page block order — block 01, before anything else on the page:
     "Above the header. 'MoRA-licensed Hajj & Umrah operator · Licence no.
      XXXX' — the first thing on the page, before any marketing."

   Spec §05 component definition:
     "Full-width strip above the header. Kiswah black ground, ivory text, a
      single gold hairline beneath. Licence number, phone. Persistent on every
      page."

   Spec §13 lists "Licence numbers displayed in trust bar, footer and /licence/"
   as a Blocker.

   PLACEHOLDER HANDLING: while the licence number in src/lib/site.ts is still a
   placeholder, it renders as a visible dotted token rather than a plausible
   fake number. This is intentional and is discussed at length in site.ts.
   ========================================================================= */

export default function TrustBar() {
  const licence = site.licences.umrah.number;
  const pending = isPlaceholder(licence);

  return (
    <div className="on-dark w-full bg-kiswah">
      <div className="container-x">
        {/* Each link is its own 44px tap target — Spec §07. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6">
          <Link
            href="/licence/"
            className="group flex min-h-11 items-center gap-2.5 py-1 text-marble/85 transition-colors hover:text-marble"
          >
            <Shield
              width={15}
              height={15}
              className="shrink-0 text-hizam"
              strokeWidth={1.4}
            />
            <span className="text-[11.5px] font-medium tracking-wide sm:text-[12px]">
              MoRA-licensed Hajj &amp; Umrah operator
            </span>
            <span aria-hidden className="text-rule-dark">
              ·
            </span>
            <span
              className={
                pending
                  ? 'text-[11.5px] font-semibold text-hizam/90 underline decoration-dotted decoration-hizam/50 underline-offset-4 sm:text-[12px]'
                  : 'text-[11.5px] font-semibold tabular text-hizam sm:text-[12px]'
              }
            >
              {pending ? licence : `Licence no. ${licence}`}
            </span>
          </Link>

          <a
            href={telHref()}
            className="flex min-h-11 items-center gap-2 py-1 text-[11.5px] font-medium text-marble/85 transition-colors hover:text-marble sm:text-[12px]"
          >
            <Phone width={14} height={14} className="shrink-0 text-hizam" />
            <span className="tabular">{site.phone.display}</span>
          </a>
        </div>
      </div>
      {/* The single gold hairline beneath. */}
      <div className="hairline-gold" />
    </div>
  );
}
