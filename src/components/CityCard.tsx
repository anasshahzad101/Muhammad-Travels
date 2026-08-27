import Link from 'next/link';
import Image from 'next/image';
import { Plane, ArrowRight } from './icons';
import { Reveal } from './Reveal';
import type { City } from '@/lib/cities';
import { packagesFromCity, lowestPrice } from '@/lib/packages';
import { formatPKR } from '@/lib/utils';

/* ============================================================================
   DEPARTURE CITY CARD
   ============================================================================
   Spec §03, home block 07: "Six linked city cards — internal linking plus
   genuine navigation value."
   Spec §02 internal linking: "Departure pages cross-link to the packages
   available from that city."
   Spec §02 anchor text: "Descriptive anchor text. '14-night Ramadan Umrah
   package from Lahore', never 'click here' or a bare URL." — the card's
   accessible name is the full descriptive phrase.
   ========================================================================= */

export default function CityCard({
  city,
  delay = 0,
}: {
  city: City;
  delay?: number;
}) {
  const available = packagesFromCity(city.slug);
  const from = lowestPrice(available);

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/from/${city.slug}/`}
        aria-label={`Umrah packages from ${city.name}`}
        className="group zoom-frame lift surface-card flex h-full flex-col overflow-hidden"
      >
        <div className="graded relative aspect-[4/3] w-full">
          <Image
            src={city.image.src}
            alt={city.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5">
            <h3
              className="font-display text-[24px] leading-none text-marble"
              style={{ fontWeight: 600 }}
            >
              {city.name}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-hizam">
              <Plane width={13} height={13} />
              {city.iata}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[14px] leading-6 text-stone">{city.flightTime}</p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-antique">
                {available.length} packages from
              </p>
              <p
                className="tabular mt-1.5 font-display text-[21px] leading-none text-kiswah"
                style={{ fontWeight: 600 }}
              >
                {formatPKR(from + city.supplement)}
              </p>
            </div>
            <ArrowRight
              width={19}
              height={19}
              className="mb-1 shrink-0 text-antique transition-transform duration-400 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
