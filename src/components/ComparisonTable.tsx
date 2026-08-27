import Link from 'next/link';
import type { Package } from '@/lib/packages';
import { formatPKR, formatMetres, cx } from '@/lib/utils';
import { Reveal } from './Reveal';

/* ============================================================================
   COMPARISON TABLE
   ============================================================================
   Spec §05: "Two to four packages side by side across hotel, distance, nights,
   room, price. Horizontally scrollable on mobile, NEVER SQUEEZED."
   Spec §07: "Tables — horizontally scrollable in their own container. The page
   body must never scroll sideways."
   Spec §11: "Comparison tables — preferentially cited over prose for factual
   queries."

   The table therefore keeps a real minimum column width and scrolls inside its
   own `scroll-x` container rather than compressing to fit a 360px viewport.
   ========================================================================= */

const rows = [
  {
    label: 'Makkah hotel',
    get: (p: Package) => p.hotels.find((h) => h.city === 'Makkah')?.name ?? '—',
  },
  {
    label: 'Distance to Masjid al-Haram',
    get: (p: Package) => {
      const h = p.hotels.find((x) => x.city === 'Makkah');
      return h ? formatMetres(h.distanceM) : '—';
    },
    numeric: true,
    emphasis: true,
  },
  {
    label: 'Madinah hotel',
    get: (p: Package) => p.hotels.find((h) => h.city === 'Madinah')?.name ?? '—',
  },
  {
    label: 'Distance to the Prophet’s Mosque',
    get: (p: Package) => {
      const h = p.hotels.find((x) => x.city === 'Madinah');
      return h ? formatMetres(h.distanceM) : '—';
    },
    numeric: true,
    emphasis: true,
  },
  {
    label: 'Nights',
    get: (p: Package) => `${p.nights}`,
    numeric: true,
  },
  {
    label: 'Makkah / Madinah split',
    get: (p: Package) => `${p.makkahNights} / ${p.madinahNights}`,
    numeric: true,
  },
  { label: 'Room basis', get: (p: Package) => p.roomBasis },
  { label: 'Airline', get: (p: Package) => p.airline },
  {
    label: 'From, per person',
    get: (p: Package) => formatPKR(p.priceFrom),
    numeric: true,
    emphasis: true,
  },
  {
    label: 'Price valid until',
    get: (p: Package) => p.priceValidUntilLabel,
    numeric: true,
  },
] as const;

export default function ComparisonTable({
  packages,
  caption,
}: {
  packages: Package[];
  caption?: string;
}) {
  if (packages.length < 2) return null;

  return (
    <Reveal>
      <div className="scroll-x surface-card">
        <table className="w-full min-w-[720px] border-collapse text-left">
          {caption && (
            <caption className="px-6 pt-6 text-left text-[13px] text-stone">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="border-b border-rule-light">
              <th
                scope="col"
                className="w-[220px] px-6 py-5 align-bottom text-[11px] font-semibold uppercase tracking-[0.12em] text-antique"
              >
                Compare
              </th>
              {packages.map((p) => (
                <th
                  key={p.slug}
                  scope="col"
                  className="min-w-[200px] px-6 py-5 align-bottom"
                >
                  <Link
                    href={`/${p.trip}/${p.slug}/`}
                    className="font-display text-[19px] leading-[26px] text-kiswah transition-colors duration-300 hover:text-antique"
                    style={{ fontWeight: 600 }}
                  >
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-rule-light last:border-0"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-[13.5px] font-medium text-stone"
                >
                  {row.label}
                </th>
                {packages.map((p) => (
                  <td
                    key={p.slug}
                    className={cx(
                      'px-6 py-4 text-[15px] leading-6',
                      'numeric' in row && row.numeric && 'tabular',
                      'emphasis' in row && row.emphasis
                        ? 'font-semibold text-kiswah'
                        : 'text-kiswah/75',
                    )}
                  >
                    {row.get(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12.5px] text-stone lg:hidden">
        Scroll the table sideways to compare all columns.
      </p>
    </Reveal>
  );
}
