/* ============================================================================
   DEPARTURE MONTHS
   ============================================================================
   A fixed list rather than one generated from `new Date()`, so the static
   build is deterministic and two builds of the same commit produce identical
   HTML. Roll this forward when the season changes.
   ========================================================================= */

export type Month = { value: string; label: string; note?: string };

export const months: Month[] = [
  { value: '2026-09', label: 'September 2026' },
  { value: '2026-10', label: 'October 2026' },
  { value: '2026-11', label: 'November 2026', note: 'Cooler weather begins' },
  { value: '2026-12', label: 'December 2026', note: 'Winter school holidays' },
  { value: '2027-01', label: 'January 2027', note: 'Rajab' },
  { value: '2027-02', label: 'February 2027', note: 'Ramadan begins' },
  { value: '2027-03', label: 'March 2027', note: 'Last ten nights & Eid' },
  { value: '2027-04', label: 'April 2027' },
  { value: '2027-05', label: 'May 2027', note: 'Hajj 1448 window' },
  { value: '2027-06', label: 'June 2027', note: 'Summer school holidays' },
  { value: '2027-07', label: 'July 2027' },
  { value: '2027-08', label: 'August 2027' },
];

export function monthLabel(value: string): string {
  return months.find((m) => m.value === value)?.label ?? value;
}
