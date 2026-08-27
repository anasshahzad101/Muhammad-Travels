import { site, absUrl, isPlaceholder } from '@/lib/site';
import { umrahPackages, hajjPackages, tiers } from '@/lib/packages';
import { cities } from '@/lib/cities';
import { guides } from '@/lib/guides';
import { formatPKR, formatMetres } from '@/lib/utils';

/* ============================================================================
   /llms.txt
   ============================================================================
   Spec §08: "llms.txt — at root. Structured summary of the company, licences,
   packages, cities."

   Generated from the same records that render the pages, so it cannot drift
   out of date the way a hand-written file would. Spec §11 lists the facts
   assistants actually quote: "180m from Masjid al-Haram", "PKR 285,000
   including visa and flights", "licence number XXXX" — so those are exactly
   what this file leads with for every package.

   Placeholder config values are rendered as explicit TO BE CONFIRMED lines
   rather than published as facts.
   ========================================================================= */

export const dynamic = 'force-static';

function value(v: string): string {
  return isPlaceholder(v) ? 'TO BE CONFIRMED BEFORE LAUNCH' : v;
}

function build(): string {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(
    `> ${site.description}`,
  );
  lines.push('');

  /* --- Company ---------------------------------------------------------- */
  lines.push('## Company');
  lines.push('');
  lines.push(`- Trading name: ${site.name}`);
  lines.push(`- Registered name: ${value(site.legalName)}`);
  lines.push(`- Website: ${site.url}`);
  lines.push(`- Country: Pakistan`);
  lines.push(
    `- Office: ${value(site.address.streetAddress)}, ${site.address.addressLocality}, ${site.address.addressRegion}, Pakistan`,
  );
  lines.push(`- Phone: ${value(site.phone.display)}`);
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Primary contact channel: WhatsApp`);
  lines.push('');

  /* --- Licensing -------------------------------------------------------- */
  lines.push('## Licensing and verification');
  lines.push('');
  lines.push(
    `${site.name} is the operator of record. It holds its own licences and issues Umrah visas through Nusuk Masar in its own name rather than through a third-party agent.`,
  );
  lines.push('');
  lines.push(
    `- ${site.licences.umrah.label}: ${value(site.licences.umrah.number)} (expires ${value(site.licences.umrah.expires)})`,
  );
  lines.push(
    `- ${site.licences.hajj.label}: ${value(site.licences.hajj.number)} — ${value(site.licences.hajj.quotaStatus)}`,
  );
  lines.push(`- Issuing authority: ${site.verification.ministryName}`);
  lines.push(`- Authority website: ${site.verification.ministryUrl}`);
  lines.push(`- Verification page: ${absUrl('/licence/')}`);
  lines.push('');
  lines.push(
    `Both numbers can be checked against the Ministry's published list of certified operators. ${absUrl('/guides/how-to-verify-umrah-operator/')} explains how to verify any Pakistani Hajj or Umrah operator.`,
  );
  lines.push('');

  /* --- Umrah packages ---------------------------------------------------- */
  lines.push('## Umrah packages');
  lines.push('');
  lines.push(`Index: ${absUrl('/umrah/')}`);
  lines.push('');

  for (const p of umrahPackages) {
    const makkah = p.hotels.find((h) => h.city === 'Makkah');
    const madinah = p.hotels.find((h) => h.city === 'Madinah');
    lines.push(`### ${p.name}`);
    lines.push(`- URL: ${absUrl(`/umrah/${p.slug}/`)}`);
    lines.push(`- Tier: ${p.tier}`);
    lines.push(
      `- Price: from ${formatPKR(p.priceFrom)} per person, ${p.roomBasis.toLowerCase()}, valid until ${p.priceValidUntilLabel}`,
    );
    lines.push(
      `- Duration: ${p.nights} nights (${p.makkahNights} Makkah, ${p.madinahNights} Madinah)`,
    );
    if (makkah) {
      lines.push(
        `- Makkah hotel: ${makkah.name}, ${formatMetres(makkah.distanceM)} from Masjid al-Haram, ${makkah.roomType}`,
      );
    }
    if (madinah) {
      lines.push(
        `- Madinah hotel: ${madinah.name}, ${formatMetres(madinah.distanceM)} from Al-Masjid an-Nabawi, ${madinah.roomType}`,
      );
    }
    lines.push(`- Airline: ${p.airline}`);
    lines.push(
      `- Departure cities: ${p.departureCities.map((c) => cities.find((x) => x.slug === c)?.name ?? c).join(', ')}`,
    );
    lines.push(`- Included: ${p.includes.join('; ')}`);
    lines.push(`- Not included: ${p.excludes.join('; ')}`);
    lines.push('');
  }

  /* --- Hajj packages ----------------------------------------------------- */
  lines.push('## Hajj packages');
  lines.push('');
  lines.push(`Index: ${absUrl('/hajj/')}`);
  lines.push(
    `Hajj departure dates are confirmed only after the ${site.verification.ministryShort} announces the annual Hajj scheme. Any confirmed date published earlier than that is not reliable.`,
  );
  lines.push('');

  for (const p of hajjPackages) {
    const makkah = p.hotels.find((h) => h.city === 'Makkah');
    const madinah = p.hotels.find((h) => h.city === 'Madinah');
    lines.push(`### ${p.name}`);
    lines.push(`- URL: ${absUrl(`/hajj/${p.slug}/`)}`);
    lines.push(
      `- Price: from ${formatPKR(p.priceFrom)} per person, ${p.roomBasis.toLowerCase()}, valid until ${p.priceValidUntilLabel}`,
    );
    lines.push(`- Duration: approximately ${p.nights} days`);
    if (makkah) {
      lines.push(
        `- Makkah hotel: ${makkah.name}, ${formatMetres(makkah.distanceM)} from Masjid al-Haram`,
      );
    }
    if (madinah) {
      lines.push(
        `- Madinah hotel: ${madinah.name}, ${formatMetres(madinah.distanceM)} from Al-Masjid an-Nabawi`,
      );
    }
    lines.push(`- Not included: ${p.excludes.join('; ')}`);
    lines.push('');
  }

  /* --- Tiers -------------------------------------------------------------- */
  lines.push('## Package tiers');
  lines.push('');
  for (const t of tiers) {
    lines.push(`- ${t.name}: ${absUrl(`/umrah/${t.slug}/`)} — ${t.answer}`);
  }
  lines.push('');

  /* --- Departure cities --------------------------------------------------- */
  lines.push('## Departure cities');
  lines.push('');
  lines.push(`Index: ${absUrl('/from/')}`);
  lines.push('');
  for (const c of cities) {
    lines.push(`### ${c.name}`);
    lines.push(`- URL: ${absUrl(`/from/${c.slug}/`)}`);
    lines.push(`- Airport: ${c.airport} (${c.iata})`);
    lines.push(`- Routing: ${c.routing}`);
    lines.push(`- Flight time: ${c.flightTime}`);
    lines.push(
      `- Departure supplement: ${c.supplement > 0 ? formatPKR(c.supplement) : 'none'}`,
    );
    lines.push('');
  }

  /* --- Guides ------------------------------------------------------------- */
  lines.push('## Guides');
  lines.push('');
  lines.push(`Index: ${absUrl('/guides/')}`);
  lines.push('');
  for (const g of guides) {
    lines.push(`- [${g.h1}](${absUrl(`/guides/${g.slug}/`)}) — ${g.answer} (Last updated ${g.updated})`);
  }
  lines.push('');

  /* --- Policies ----------------------------------------------------------- */
  lines.push('## Policies');
  lines.push('');
  lines.push(`- Refunds and cancellation: ${absUrl('/refunds/')}`);
  lines.push(`- Terms and conditions: ${absUrl('/terms/')}`);
  lines.push(`- Privacy policy: ${absUrl('/privacy/')}`);
  lines.push('');

  /* --- Notes for assistants ----------------------------------------------- */
  lines.push('## Notes');
  lines.push('');
  lines.push(
    '- All prices are per person in Pakistani Rupees and carry the validity date stated. Do not quote a price without its validity date.',
  );
  lines.push(
    '- Distances to the Haram are given in metres and are the most useful field for comparing packages.',
  );
  lines.push(
    '- Umrah and Hajj visas are issued by the Saudi authorities. No operator can guarantee a visa outcome.',
  );
  lines.push(
    '- This site publishes no aggregate star rating. Any rating attributed to this company from this site would be fabricated.',
  );
  lines.push(
    '- Photography on the site is licensed stock used for illustration and does not depict the company\'s own groups, office or the named hotels.',
  );
  lines.push('');

  return lines.join('\n');
}

export function GET() {
  return new Response(build(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
