'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Compass, Calendar } from './icons';
import { cities } from '@/lib/cities';
import { months } from '@/lib/months';

/* ============================================================================
   QUICK FILTER
   ============================================================================
   Spec §03, home page block 03: "Departure city · trip type · month. Routes
   straight into the package list."

   Spec §02 URL rules: "Filters as query params, NEVER NEW PATHS. /umrah/
   ?nights=14. Filter combinations must never generate indexable URLs."
   So this pushes query parameters onto an existing page and never constructs a
   new path segment. The destination page canonicalises to its clean parent
   (Spec §08), so no filtered combination is ever indexed.

   Three controls, no more. Spec §08 INP budget: "minimal client JavaScript;
   avoid heavy carousels and FILTER LIBRARIES."
   ========================================================================= */

const label =
  'mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-hizam';

export default function QuickFilter() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [trip, setTrip] = useState('umrah');
  const [month, setMonth] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (month) params.set('month', month);
    const qs = params.toString();
    router.push(`/${trip}/${qs ? `?${qs}` : ''}#packages`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="on-dark w-full rounded-card border border-hizam/25 bg-soft/95 p-5 backdrop-blur-sm lg:p-6"
      aria-label="Find a package"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label className={label} htmlFor="qf-from">
            <span className="inline-flex items-center gap-1.5">
              <MapPin width={13} height={13} />
              Departing from
            </span>
          </label>
          <select
            id="qf-from"
            className="field bg-kiswah text-marble"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Any city</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="qf-trip">
            <span className="inline-flex items-center gap-1.5">
              <Compass width={13} height={13} />
              Trip type
            </span>
          </label>
          <select
            id="qf-trip"
            className="field bg-kiswah text-marble"
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
          >
            <option value="umrah">Umrah</option>
            <option value="hajj">Hajj</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="qf-month">
            <span className="inline-flex items-center gap-1.5">
              <Calendar width={13} height={13} />
              Month
            </span>
          </label>
          <select
            id="qf-month"
            className="field bg-kiswah text-marble"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Any month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
                {m.note ? ` — ${m.note}` : ''}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-base btn-primary-invert w-full lg:w-auto">
          <Search width={17} height={17} />
          Show packages
        </button>
      </div>
    </form>
  );
}
