import Link from 'next/link';
import { LogoLockup } from './Logo';
import { Shield, MapPin, Phone, Mail, Clock, ArrowUpRight } from './icons';
import { site, telHref, isPlaceholder } from '@/lib/site';
import { cities } from '@/lib/cities';
import { tiers } from '@/lib/packages';
import { guidesByRecency } from '@/lib/guides';

/* ============================================================================
   FOOTER
   ============================================================================
   Spec §02, Navigation: "Licence numbers in text · office address · departure
   city links · guide links · package tiers · legal · social."

   "Licence numbers IN TEXT" is the operative phrase — not in an image, not in
   a badge graphic. A number rendered as text is copyable, indexable and
   readable by an assistant. Spec §13 lists this as a Blocker.
   ========================================================================= */

function LicenceLine({
  label,
  value,
  extra,
}: {
  label: string;
  value: string;
  extra?: string;
}) {
  const pending = isPlaceholder(value);
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-marble/40">
        {label}
      </span>
      <span
        className={
          pending
            ? 'text-[14px] font-semibold text-hizam/85 underline decoration-dotted decoration-hizam/40 underline-offset-4'
            : 'tabular text-[14px] font-semibold text-hizam'
        }
      >
        {value}
      </span>
      {extra && !isPlaceholder(extra) && (
        <span className="text-[12.5px] text-marble/50">{extra}</span>
      )}
    </div>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="eyebrow-dark mb-4 font-sans">
      {children}
    </h2>
  );
}

// 44px minimum tap height on mobile, relaxed on desktop where the pointer is
// precise and a tall footer costs more than it gains — Spec §07.
const footerLink =
  'flex min-h-11 items-center py-1 text-[14.5px] leading-6 text-marble/65 transition-colors duration-300 hover:text-marble lg:min-h-[34px] lg:py-0';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative bg-kiswah pt-16 lg:pt-24">
      <div className="hairline-gold absolute inset-x-0 top-0" />

      <div className="container-x">
        {/* Top: brand + licence block ------------------------------------- */}
        <div className="grid gap-10 border-b border-rule-dark pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            {/* The complete supplied lockup — the footer has the vertical room
                the header does not. */}
            <LogoLockup width={240} className="-ml-1" />
            <p className="lede mt-7 max-w-[52ch] text-[15.5px] leading-7 text-marble/60">
              A licensed Hajj and Umrah operator contracting pilgrims directly
              and issuing visas through Nusuk Masar in our own name. Named
              hotels, exact distances to the Haram in metres, and licence
              numbers you can check against the Ministry’s published list.
            </p>

            <Link
              href="/licence/"
              className="group mt-7 inline-flex min-h-11 items-center gap-2.5 text-[14.5px] font-semibold text-hizam transition-colors hover:text-hizam"
            >
              <Shield width={17} height={17} />
              How to verify us
              <ArrowUpRight
                width={15}
                height={15}
                className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-5">
              <ColumnHeading>Licensing</ColumnHeading>
              <LicenceLine
                label={site.licences.umrah.label}
                value={site.licences.umrah.number}
                extra={`Expires ${site.licences.umrah.expires}`}
              />
              <LicenceLine
                label={site.licences.hajj.label}
                value={site.licences.hajj.number}
                extra={site.licences.hajj.quotaStatus}
              />
              <p className="text-[12.5px] leading-5 text-marble/40">
                Issued by the {site.verification.ministryName}.
              </p>
            </div>

            <div>
              <ColumnHeading>Office</ColumnHeading>
              <address className="not-italic">
                <div className="flex gap-2.5 text-[14.5px] leading-7 text-marble/65">
                  <MapPin
                    width={16}
                    height={16}
                    className="mt-1.5 shrink-0 text-hizam/70"
                  />
                  <span>
                    {site.address.streetAddress}
                    <br />
                    {site.address.addressLocality}, {site.address.addressRegion}
                    <br />
                    Pakistan
                  </span>
                </div>
                <a
                  href={telHref()}
                  className="mt-2 flex min-h-11 items-center gap-2.5 text-[14.5px] text-marble/65 transition-colors hover:text-marble"
                >
                  <Phone width={16} height={16} className="shrink-0 text-hizam/70" />
                  <span className="tabular">{site.phone.display}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-11 items-center gap-2.5 text-[14.5px] text-marble/65 transition-colors hover:text-marble"
                >
                  <Mail width={16} height={16} className="shrink-0 text-hizam/70" />
                  {site.email}
                </a>
                <div className="mt-3 flex gap-2.5 text-[14px] leading-6 text-marble/50">
                  <Clock width={16} height={16} className="mt-1 shrink-0 text-hizam/70" />
                  <span>
                    {site.hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days} — {h.time}
                      </span>
                    ))}
                  </span>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Link columns ---------------------------------------------------- */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <ColumnHeading>Umrah packages</ColumnHeading>
            <ul>
              {tiers.map((t) => (
                <li key={t.slug}>
                  <Link href={`/umrah/${t.slug}/`} className={footerLink}>
                    {t.name} Umrah packages
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/umrah/" className={footerLink}>
                  All Umrah packages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Departing from</ColumnHeading>
            <ul>
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/from/${c.slug}/`} className={footerLink}>
                    Umrah from {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Guides</ColumnHeading>
            <ul>
              {guidesByRecency.slice(0, 6).map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}/`} className={footerLink}>
                    {g.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Company</ColumnHeading>
            <ul>
              <li>
                <Link href="/hajj/" className={footerLink}>
                  Hajj packages
                </Link>
              </li>
              <li>
                <Link href="/hajj/how-it-works/" className={footerLink}>
                  How Hajj works
                </Link>
              </li>
              <li>
                <Link href="/licence/" className={footerLink}>
                  Licence &amp; verification
                </Link>
              </li>
              <li>
                <Link href="/about/" className={footerLink}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/reviews/" className={footerLink}>
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact/" className={footerLink}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/refunds/" className={footerLink}>
                  Refunds &amp; cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal ----------------------------------------------------------- */}
        <div className="flex flex-col gap-4 border-t border-rule-dark py-8 text-[13px] text-marble/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/terms/" className="inline-flex min-h-11 items-center transition-colors hover:text-marble/80 lg:min-h-0">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="inline-flex min-h-11 items-center transition-colors hover:text-marble/80 lg:min-h-0">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/refunds/" className="inline-flex min-h-11 items-center transition-colors hover:text-marble/80 lg:min-h-0">
                Refunds
              </Link>
            </li>
            <li className="flex items-center gap-4">
              {Object.entries(site.social).map(([k, v]) =>
                isPlaceholder(v) ? (
                  <span key={k} className="capitalize text-marble/25">
                    {k}
                  </span>
                ) : (
                  <a
                    key={k}
                    href={v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize transition-colors hover:text-marble/80"
                  >
                    {k}
                  </a>
                ),
              )}
            </li>
          </ul>
        </div>

        <p className="border-t border-rule-dark py-6 text-[12px] leading-5 text-marble/30">
          Prices shown are per person and subject to the validity date stated on
          each package. Visa issuance is determined by the Saudi authorities
          through Nusuk Masar and cannot be guaranteed by any operator. Hajj
          arrangements are subject to the annual scheme announced by the{' '}
          {site.verification.ministryName}. Photography on this site is licensed
          stock used for illustration and does not depict our own groups.
        </p>
      </div>
    </footer>
  );
}
