import { WhatsApp, Phone } from './icons';
import { site, telHref, whatsappHref } from '@/lib/site';

/* ============================================================================
   STICKY MOBILE ACTION BAR
   ============================================================================
   Spec §02: "Sticky element — Mobile: persistent bottom bar with WhatsApp and
   Call. THIS IS WHERE THE CONVERSIONS HAPPEN."
   Spec §07: "Sticky bar — WhatsApp and Call, bottom, always visible, never
   obscuring content."
   Spec §14 closing: "Route every conversion through WhatsApp, because that is
   where this transaction actually closes."

   Two things this component is careful about:

   1. It never obscures content. The layout adds matching bottom padding to
      <main> on mobile, and globals.css reserves the space — so the bar sits
      below the last element rather than on top of it.

   2. It reserves its own height from first paint rather than appearing after
      hydration, which keeps CLS under the 0.05 target in Spec §08.
   ========================================================================= */

export default function StickyMobileBar({
  /** Pre-filled WhatsApp message. Package pages pass the package name.
   *  Spec §04: "Sticky CTA (mobile) — WhatsApp with the package name
   *  pre-filled in the message." */
  message,
}: {
  message?: string;
}) {
  const text =
    message ??
    `Assalamu alaikum. I'd like to ask about your Hajj and Umrah packages.`;

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-rule-dark bg-kiswah/97 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="hairline-gold opacity-70" />
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={telHref()}
          className="btn-base btn-ghost-dark w-full text-[15px]"
          data-analytics="call-click"
        >
          <Phone width={18} height={18} className="text-hizam" />
          Call
        </a>
        <a
          href={whatsappHref(text)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-whatsapp w-full text-[15px]"
          data-analytics="whatsapp-click"
        >
          <WhatsApp width={19} height={19} />
          WhatsApp
        </a>
      </div>
      <span className="sr-only">
        Call {site.phone.display} or message us on WhatsApp
      </span>
    </div>
  );
}
