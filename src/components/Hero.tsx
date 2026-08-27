import Link from 'next/link';
import { ArrowRight, Shield, Distance, Document } from './icons';
import { Reveal, RevealRule, DrawIcon } from './Reveal';
import { Eyebrow } from './ui';
import QuickFilter from './QuickFilter';

/* ============================================================================
   HOME HERO
   ============================================================================
   Spec §03, block 02: "H1 with the proposition. NOT 'Welcome to Muhammad
   Travels'. Something like 'Hajj and Umrah, arranged by a licensed operator
   you can verify'. One primary CTA and one secondary."

   NO HERO PHOTOGRAPH — typographic, on flat Kiswah black.

   This is a deliberate departure from Spec §03's "one strong hero image".
   The spec's own §06 guidance explains why it holds up: "Space, above
   everything. Luxury reads as room to breathe," and "Wider type contrast.
   Large serif headings against small, letter-spaced small-caps labels. The gap
   between the two sizes is where elegance comes from." With no photograph
   competing for attention, that type contrast carries the whole frame, and the
   gold stays exactly where §06 wants it — hairlines, small-caps labels and
   icon strokes, covering a few per cent of the surface.

   It also helps the numbers. Spec §08 targets LCP < 2.0s and the hero image
   was the largest paint on the page; the LCP element is now server-rendered
   text, and the home route no longer makes a cross-origin image request at
   all. Spec §07's real device — a mid-range Android on mobile data in the
   evening — benefits most.
   ========================================================================= */

const proofPoints = [
  {
    icon: <Shield width={19} height={19} />,
    title: 'Licence numbers on the page',
    body: 'Not buried in the footer. Published, with instructions for checking them against the Ministry list.',
  },
  {
    icon: <Distance width={19} height={19} />,
    title: 'Distance in metres, not adjectives',
    body: 'Every hotel named, every distance to the Haram measured. “Walking distance” is not a distance.',
  },
  {
    icon: <Document width={19} height={19} />,
    title: 'Exclusions as prominent as inclusions',
    body: 'What is not in the price gets the same column width as what is. Deliberately.',
  },
];

export default function Hero() {
  return (
    <section className="on-dark relative bg-kiswah">
      <div className="container-x">
        <div className="flex min-h-[max(560px,72svh)] flex-col justify-center py-20 lg:min-h-[max(640px,80svh)] lg:py-28">
          <div className="max-w-[52rem]">
            <Reveal className="mb-6 flex items-center gap-3">
              <Eyebrow tone="dark">Hajj &amp; Umrah from Pakistan</Eyebrow>
              <RevealRule delay={140} className="hairline-gold h-px w-16 shrink-0" />
            </Reveal>

            <Reveal delay={80} as="h1">
              <span className="text-marble">
                Hajj and Umrah, arranged by a licensed operator{' '}
                <span className="text-hizam">you can verify</span>.
              </span>
            </Reveal>

            <Reveal
              delay={180}
              as="p"
              className="lede mt-7 max-w-[54ch] text-marble/75"
            >
              We hold our own MoRA licences for both Hajj and Umrah, contract
              you directly, and issue your visa through Nusuk Masar in our own
              name. The licence numbers are on this page. So is how to check
              them.
            </Reveal>

            {/* One primary CTA, one secondary. Exactly as specified. */}
            <Reveal delay={260} className="mt-9 flex flex-wrap gap-3">
              <Link href="/umrah/" className="btn-base btn-primary-invert group">
                See Umrah packages
                <ArrowRight
                  width={18}
                  height={18}
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
              <Link href="/licence/" className="btn-base btn-ghost-dark">
                <Shield width={18} height={18} className="text-hizam" />
                Verify our licence
              </Link>
            </Reveal>
          </div>

          {/* Three proof points, gold icon strokes drawing themselves in --- */}
          <ul className="mt-14 grid gap-8 border-t border-rule-dark pt-10 sm:grid-cols-3 lg:mt-20 lg:gap-12">
            {proofPoints.map((p, i) => (
              <Reveal as="li" key={p.title} delay={340 + i * 90}>
                <DrawIcon length={120} delay={420 + i * 90} className="text-hizam">
                  {p.icon}
                </DrawIcon>
                <h2
                  className="mt-3.5 font-sans text-[15px] font-semibold leading-6 text-marble"
                  style={{ letterSpacing: 0 }}
                >
                  {p.title}
                </h2>
                <p className="mt-1.5 text-[14px] leading-6 text-marble/55">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick filter — Spec §03 block 03, routes into the package list --- */}
      <div className="container-x relative z-10 pb-14 lg:pb-20">
        <Reveal delay={200}>
          <QuickFilter />
        </Reveal>
      </div>
    </section>
  );
}
