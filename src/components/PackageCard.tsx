import Link from 'next/link';
import Image from 'next/image';
import { Distance, Bed, Moon, ArrowRight, Plane } from './icons';
import { Pill } from './ui';
import { Reveal } from './Reveal';
import type { Package } from '@/lib/packages';
import { cityName } from '@/lib/cities';
import { formatPKR, formatMetres, cx } from '@/lib/utils';

/* ============================================================================
   PACKAGE CARD
   ============================================================================
   Spec §05: "Hotel image · tier badge · name · nights · DISTANCE TO HARAM ·
   room type · price with 'from' and validity · departure cities · CTA. Fixed
   height so cards align in a grid."

   Spec §05 price display: "Always PKR with thousands separators. 'From PKR
   285,000 per person · valid until 30 Sep 2026'. Never a bare number."

   Spec §06: premium tier cards are "black with gold rule — signals the tier
   without a price label having to". That branch is the only visual difference
   between tiers; nothing else about the card changes.

   Every value is read from the Package record. No price, hotel name or
   distance is written into this markup — Spec §09.
   ========================================================================= */

export default function PackageCard({
  pkg,
  delay = 0,
  priority = false,
}: {
  pkg: Package;
  delay?: number;
  priority?: boolean;
}) {
  const premium = pkg.tier === 'premium';
  const makkah = pkg.hotels.find((h) => h.city === 'Makkah') ?? pkg.hotels[0];
  const madinah = pkg.hotels.find((h) => h.city === 'Madinah');
  const href = `/${pkg.trip}/${pkg.slug}/`;

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={cx(
          'group flex h-full flex-col overflow-hidden lift zoom-frame',
          premium ? 'surface-premium lift-dark' : 'surface-card',
        )}
      >
        {/* Hotel image ---------------------------------------------------- */}
        <Link href={href} className="graded relative block aspect-[16/10] w-full">
          <Image
            src={pkg.image.src}
            alt={pkg.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
          />
          <span className="absolute left-4 top-4 z-10">
            <Pill tone={premium ? 'dark' : 'gold'}>
              {pkg.tier === 'ramadan' ? 'Ramadan' : pkg.tier}
            </Pill>
          </span>
        </Link>

        {/* Body ----------------------------------------------------------- */}
        <div className="flex flex-1 flex-col p-6">
          <h3
            className={cx(
              'font-display text-[23px] leading-[30px]',
              premium ? 'text-marble' : 'text-kiswah',
            )}
            style={{ fontWeight: 600 }}
          >
            <Link href={href} className="transition-colors duration-300">
              {pkg.name}
            </Link>
          </h3>

          <p
            className={cx(
              'mt-3 text-[14.5px] leading-6',
              premium ? 'text-marble/60' : 'text-stone',
            )}
          >
            {pkg.summary}
          </p>

          {/* Facts — the comparison fields, in the order they matter ------- */}
          <dl
            className={cx(
              'mt-6 flex flex-col gap-3 border-t pt-5 text-[14px]',
              premium ? 'border-rule-dark' : 'border-rule-light',
            )}
          >
            <Fact
              premium={premium}
              icon={<Distance width={17} height={17} />}
              label="Makkah hotel"
            >
              <span className="font-medium">{makkah.name}</span>
              <span className={premium ? 'text-hizam' : 'text-antique'}>
                {' '}
                · <span data-numeric>{formatMetres(makkah.distanceM)}</span> from
                Masjid al-Haram
              </span>
            </Fact>

            {madinah && (
              <Fact
                premium={premium}
                icon={<Distance width={17} height={17} />}
                label="Madinah hotel"
              >
                <span className="font-medium">{madinah.name}</span>
                <span className={premium ? 'text-hizam' : 'text-antique'}>
                  {' '}
                  · <span data-numeric>{formatMetres(madinah.distanceM)}</span>{' '}
                  from the Prophet’s Mosque
                </span>
              </Fact>
            )}

            <Fact
              premium={premium}
              icon={<Moon width={17} height={17} />}
              label="Duration"
            >
              <span data-numeric>{pkg.nights}</span> nights ·{' '}
              <span data-numeric>{pkg.makkahNights}</span> Makkah,{' '}
              <span data-numeric>{pkg.madinahNights}</span> Madinah
            </Fact>

            <Fact
              premium={premium}
              icon={<Bed width={17} height={17} />}
              label="Room"
            >
              {pkg.roomBasis}
            </Fact>

            <Fact
              premium={premium}
              icon={<Plane width={17} height={17} />}
              label="Departs from"
            >
              {pkg.departureCities.map((c) => cityName(c)).join(' · ')}
            </Fact>
          </dl>

          {/* Price + CTA, pinned to the bottom so cards align ------------- */}
          <div
            className={cx(
              'mt-auto border-t pt-5',
              premium ? 'border-rule-dark' : 'border-rule-light',
            )}
          >
            <p
              className={cx(
                'font-display text-[26px] leading-none',
                premium ? 'text-marble' : 'text-kiswah',
              )}
              style={{ fontWeight: 600 }}
            >
              <span
                className={cx(
                  'mr-1.5 font-sans text-[13px] font-medium',
                  premium ? 'text-marble/50' : 'text-stone',
                )}
              >
                From
              </span>
              <span data-numeric>{formatPKR(pkg.priceFrom)}</span>
            </p>
            <p
              className={cx(
                'mt-2 text-[12.5px]',
                premium ? 'text-marble/45' : 'text-stone',
              )}
            >
              per person · valid until{' '}
              <span data-numeric>{pkg.priceValidUntilLabel}</span>
            </p>

            <Link
              href={href}
              className={cx(
                'btn-base mt-5 w-full',
                premium ? 'btn-primary-invert' : 'btn-primary',
              )}
            >
              View package
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Fact({
  icon,
  label,
  children,
  premium,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  premium: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span
        className={cx(
          'mt-0.5 shrink-0',
          premium ? 'text-hizam/70' : 'text-antique/70',
        )}
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="sr-only">{label}</dt>
        <dd
          className={cx(
            'leading-6',
            premium ? 'text-marble/75' : 'text-kiswah/75',
          )}
        >
          {children}
        </dd>
      </div>
    </div>
  );
}
