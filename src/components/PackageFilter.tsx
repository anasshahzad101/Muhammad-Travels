'use client';

import { useEffect, useMemo, useState } from 'react';
import PackageCard from './PackageCard';
import { Close } from './icons';
import type { Package } from '@/lib/packages';
import { cities } from '@/lib/cities';
import { months } from '@/lib/months';
import { stagger, cx } from '@/lib/utils';

/* ============================================================================
   PACKAGE FILTER
   ============================================================================
   Spec §02: "Filters as query params, never new paths."
   Spec §08: "Rendering — server-render or statically generate every page.
   Non-negotiable. AI crawlers largely cannot execute JavaScript."

   Those two requirements pull against each other, and the resolution matters:

   · The FULL, UNFILTERED list is rendered on the server into the static HTML.
     A crawler — or a browser with JavaScript disabled — receives every package
     with every hotel name, distance and price present in the markup.
   · Filter state is initialised from `window.location.search` in an effect
     AFTER hydration. It never runs during the static render, so the build
     output stays identical regardless of query string, the page remains fully
     static, and no filtered combination can produce a different document.
   · Filtering hides cards client-side. It never fetches.

   Reading the query string directly rather than via useSearchParams is
   deliberate: useSearchParams forces the route out of static rendering unless
   wrapped in Suspense, and the effect is only ever needed post-hydration.
   ========================================================================= */

type Filters = { from: string; tier: string; month: string };

const EMPTY: Filters = { from: '', tier: '', month: '' };

const control =
  'field h-11 min-h-11 py-0 text-[15px]';
const label =
  'mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-antique';

export default function PackageFilter({
  packages,
  showTierFilter = true,
}: {
  packages: Package[];
  showTierFilter?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  // Post-hydration only. See the note above on why this is not useSearchParams.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      from: params.get('from') ?? '',
      tier: params.get('tier') ?? '',
      month: params.get('month') ?? '',
    });
  }, []);

  const tiersPresent = useMemo(
    () => Array.from(new Set(packages.map((p) => p.tier))),
    [packages],
  );

  const visible = useMemo(() => {
    return packages.filter((p) => {
      if (filters.from && !p.departureCities.includes(filters.from)) return false;
      if (filters.tier && p.tier !== filters.tier) return false;
      if (
        filters.month &&
        !p.departures.some((d) => d.iso.startsWith(filters.month))
      ) {
        return false;
      }
      return true;
    });
  }, [packages, filters]);

  const active =
    Boolean(filters.from) || Boolean(filters.tier) || Boolean(filters.month);

  const set = (k: keyof Filters) => (v: string) => {
    const next = { ...filters, [k]: v };
    setFilters(next);
    // Keep the URL in step so the view is shareable — query params only.
    const params = new URLSearchParams();
    if (next.from) params.set('from', next.from);
    if (next.tier) params.set('tier', next.tier);
    if (next.month) params.set('month', next.month);
    const qs = params.toString();
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${qs ? `?${qs}` : ''}`,
    );
  };

  return (
    <div>
      {/* Controls -------------------------------------------------------- */}
      <div className="surface-card mb-10 p-5 lg:p-6">
        <div
          className={cx(
            'grid gap-4',
            showTierFilter ? 'lg:grid-cols-[1fr_1fr_1fr_auto]' : 'lg:grid-cols-[1fr_1fr_auto]',
            'lg:items-end',
          )}
        >
          <div>
            <label className={label} htmlFor="pf-from">
              Departing from
            </label>
            <select
              id="pf-from"
              className={control}
              value={filters.from}
              onChange={(e) => set('from')(e.target.value)}
            >
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {showTierFilter && (
            <div>
              <label className={label} htmlFor="pf-tier">
                Tier
              </label>
              <select
                id="pf-tier"
                className={control}
                value={filters.tier}
                onChange={(e) => set('tier')(e.target.value)}
              >
                <option value="">All tiers</option>
                {tiersPresent.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className={label} htmlFor="pf-month">
              Departure month
            </label>
            <select
              id="pf-month"
              className={control}
              value={filters.month}
              onChange={(e) => set('month')(e.target.value)}
            >
              <option value="">Any month</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setFilters(EMPTY);
              window.history.replaceState(null, '', window.location.pathname);
            }}
            disabled={!active}
            className={cx(
              'btn-base h-11 min-h-11 text-[15px]',
              active ? 'btn-ghost' : 'btn-ghost opacity-40',
            )}
          >
            <Close width={16} height={16} />
            Clear
          </button>
        </div>

        <p
          className="mt-4 text-[13.5px] text-stone"
          role="status"
          aria-live="polite"
        >
          Showing <span className="tabular font-semibold text-kiswah">{visible.length}</span> of{' '}
          <span className="tabular">{packages.length}</span> packages
        </p>
      </div>

      {/* Grid — 3-up desktop, 2-up tablet, 1-up mobile. Spec §06. -------- */}
      {visible.length > 0 ? (
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visible.map((p, i) => (
            <PackageCard key={p.slug} pkg={p} delay={stagger(i, 60, 300)} />
          ))}
        </div>
      ) : (
        <div className="surface-card p-10 text-center">
          <h3
            className="font-display text-[24px] text-kiswah"
            style={{ fontWeight: 600 }}
          >
            No packages match those filters
          </h3>
          <p className="lede mx-auto mt-3 text-[16px]">
            We run private group departures from every city we serve. Clear the
            filters, or message us with your dates and we will tell you honestly
            whether we can arrange it.
          </p>
        </div>
      )}
    </div>
  );
}
