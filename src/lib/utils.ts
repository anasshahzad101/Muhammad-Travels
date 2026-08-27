/* ============================================================================
   FORMATTING HELPERS
   ============================================================================
   Spec §05, Price display: "Always PKR with thousands separators. 'From PKR
   285,000 per person · valid until 30 Sep 2026'. Never a bare number."
   Every price on the site renders through these functions, so that rule holds
   in one place rather than in forty templates.
   ========================================================================= */

const pkrFormatter = new Intl.NumberFormat('en-PK', {
  maximumFractionDigits: 0,
});

/** `285000` → `"285,000"` */
export function formatNumber(n: number): string {
  return pkrFormatter.format(n);
}

/** `285000` → `"PKR 285,000"` */
export function formatPKR(n: number): string {
  return `PKR ${pkrFormatter.format(n)}`;
}

/** `285000` → `"From PKR 285,000 per person"` */
export function formatFrom(n: number): string {
  return `From ${formatPKR(n)} per person`;
}

/** `850` → `"850m"`. Distances are always exact metres — Spec §04. */
export function formatMetres(m: number): string {
  return `${formatNumber(m)}m`;
}

/** `'2026-11-30'` → `"30 Nov 2026"` */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** `'2026-11-30'` → `"30 November 2026"` */
export function formatDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Joins class names, dropping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Staggered reveal delays, capped so a long list never crawls in. */
export function stagger(index: number, step = 70, max = 420): number {
  return Math.min(index * step, max);
}

export function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
