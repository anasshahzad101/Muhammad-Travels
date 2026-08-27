import Link from 'next/link';
import Image from 'next/image';

import { Reveal, RevealRule } from '@/components/Reveal';
import { Eyebrow } from '@/components/ui';
import { ArrowRight, Shield, Compass } from '@/components/icons';
import { madinah } from '@/lib/images';

/* ============================================================================
   404
   ============================================================================
   Spec §08: "404 handling — custom page ROUTING BACK TO /umrah/ AND /hajj/.
   Soft 404s must return real 404 status."

   Next.js serves this file with a real HTTP 404 for unmatched routes, so there
   is no soft-404 risk. The two primary routes back are the two money hubs, as
   specified, with the licence page third because a visitor who mistyped a URL
   is often mid-verification.
   ========================================================================= */

const routes = [
  {
    href: '/umrah/',
    label: 'Umrah packages',
    body: 'Nine packages from PKR 265,000, every hotel named with its distance to the Haram in metres.',
  },
  {
    href: '/hajj/',
    label: 'Hajj packages',
    body: 'Three schemes under our own HGO registration, with the Mina tent category confirmed in writing.',
  },
  {
    href: '/licence/',
    label: 'Licence & verification',
    body: 'Our registration numbers, and how to check them against the Ministry’s published list.',
  },
];

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[72svh] items-center overflow-hidden bg-kiswah">
      <div className="graded graded-hero absolute inset-0 -z-10">
        <Image
          src={madinah.twilight.src}
          alt={madinah.twilight.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="container-x py-24 lg:py-32">
        <Reveal className="mb-5 flex items-center gap-3">
          <Eyebrow tone="dark">Error 404</Eyebrow>
          <RevealRule delay={130} className="hairline-gold h-px w-14 shrink-0" />
        </Reveal>

        <Reveal delay={60} as="h1" className="max-w-[20ch]">
          <span className="text-marble">This page does not exist.</span>
        </Reveal>

        <Reveal delay={140} as="p" className="lede mt-6 max-w-[52ch] text-marble/70">
          The link may be out of date, or the address mistyped. Everything on
          this site is reachable within three clicks of the home page — here are
          the three most likely places you were heading.
        </Reveal>

        <ul className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-6">
          {routes.map((route, i) => (
            <Reveal as="li" key={route.href} delay={220 + i * 80}>
              <Link
                href={route.href}
                className="group lift-dark flex h-full flex-col rounded-card border border-rule-dark bg-soft/70 p-6 backdrop-blur-sm"
              >
                <span className="text-hizam">
                  {route.href === '/licence/' ? (
                    <Shield width={20} height={20} />
                  ) : (
                    <Compass width={20} height={20} />
                  )}
                </span>
                <h2
                  className="mt-4 font-display text-[21px] leading-[29px] text-marble"
                  style={{ fontWeight: 600 }}
                >
                  {route.label}
                </h2>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[24px] text-marble/55">
                  {route.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-hizam">
                  Go there
                  <ArrowRight
                    width={15}
                    height={15}
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={480} className="mt-10">
          <Link href="/" className="btn-base btn-ghost-dark">
            Back to the home page
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
