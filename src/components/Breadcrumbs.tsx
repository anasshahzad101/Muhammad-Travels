import Link from 'next/link';
import type { Crumb } from '@/lib/schema';

/* ============================================================================
   BREADCRUMBS
   ============================================================================
   Spec §05: "Text links with schema, every page except home."
   Spec §02: "Every page except home, with BreadcrumbList schema."

   The visible trail and the BreadcrumbList schema are generated from the same
   `crumbs` array the page passes in, so the two cannot drift apart — Spec §10:
   "Schema must mirror visible content."
   ========================================================================= */

export default function Breadcrumbs({
  crumbs,
  tone = 'light',
}: {
  crumbs: Crumb[];
  tone?: 'light' | 'dark';
}) {
  const muted = tone === 'dark' ? 'text-marble/50' : 'text-stone';
  const active = tone === 'dark' ? 'text-marble/80' : 'text-kiswah';
  const hover =
    tone === 'dark' ? 'hover:text-marble' : 'hover:text-antique';

  return (
    <nav aria-label="Breadcrumb" className="py-5">
      {/* Breadcrumb links are standalone controls, so they carry the 44px
          minimum tap height on mobile — Spec §07. */}
      <ol className="flex flex-wrap items-center gap-x-2 text-[13px]">
        <li>
          <Link
            href="/"
            className={`${muted} ${hover} inline-flex min-h-11 items-center transition-colors lg:min-h-0`}
          >
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              <span aria-hidden className={tone === 'dark' ? 'text-rule-dark' : 'text-rule-light'}>
                /
              </span>
              {last ? (
                <span
                  className={`${active} inline-flex min-h-11 items-center font-medium lg:min-h-0`}
                  aria-current="page"
                >
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className={`${muted} ${hover} inline-flex min-h-11 items-center transition-colors lg:min-h-0`}
                >
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
