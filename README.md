# Muhammad Travels

A statically generated Next.js site built to the *Muhammad Travels Website Build
Specification* (25 August 2026).

Fifteen page templates, 51 prerendered routes, package data held in structured
records, and a Kiswah black-and-gold design system.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build
```

Every route prerenders to static HTML — there are no server-rendered or
dynamic routes, which is Spec §08's non-negotiable requirement.

**Requirements:** Node.js 18.18+ (built and tested on Node 24.19, npm 11.17).

---

## ⚠️ Read this before you put it online

**This build is not launch-ready, and that is deliberate.** Several values are
placeholders, and they render on screen as visible bracketed tokens —
`[UMRAH LICENCE NO.]`, `[+92 3XX XXX XXXX]`, `[AUTHOR NAME]` — rather than as
plausible-looking fake data.

That choice is the whole point of this site. Spec §01 puts it plainly:

> You hold the licences. Put the numbers on the page, tell people how to verify
> them against the government list, and you have answered the market's loudest
> anxiety.

A fabricated licence number shipped by accident is the single worst defect this
site could carry, so the build makes the gaps impossible to miss instead of easy
to overlook.

### What must be replaced

| Where | What | Priority |
|---|---|---|
| `src/lib/site.ts` | Licence numbers, expiry, HGO number, quota status | **Blocker** |
| `src/lib/site.ts` | Registered company name (as on the licence, not the trading name) | **Blocker** |
| `src/lib/site.ts` | Phone number, WhatsApp number, office address | **Blocker** |
| `src/lib/packages.ts` | Every price, hotel name and **distance in metres** | **Blocker** |
| `src/lib/reviews.ts` | All six testimonials — currently sample text | **Blocker** |
| `src/lib/policies.ts` | Deposit, schedule and cancellation terms | **Blocker** |
| `src/lib/guides.ts` | Author bylines, and verification of all regulatory claims | High |
| `src/lib/images.ts` | Reverse-image-check and relicense the photography | High |
| `/licence/`, `/about/`, `/contact/` | Real office, team and premises photographs + map embed | High |

### Two safety gates wired into the code

Both are enforced in `src/lib/schema.ts`, not left to discipline:

- **`REVIEWS_ARE_GENUINE`** (`src/lib/site.ts`) — ships `false`. While false, the
  site renders the testimonial cards but emits **no `Review` and no
  `AggregateRating` schema at all**. Spec §10 flags invented ratings as a known
  trigger for a structured-data manual action. Flip it only when every entry in
  `reviews.ts` is a genuine, consented, first-party review.
- **Placeholder stripping** — any config value still wrapped in `[ ]` is dropped
  from JSON-LD rather than published as a machine-readable fact. So
  `hasCredential` simply does not appear until a real licence number replaces
  the placeholder.

There is no code path that emits a fabricated rating or a fake licence number.

---

## How it is built

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15, App Router, SSG | Spec §09 primary recommendation |
| Styling | Tailwind CSS v4, tokens in `@theme` | Spec §09 |
| Motion | CSS + one `IntersectionObserver` | Spec §08 INP budget — no animation library |
| Icons | Hand-authored SVG set | Spec §06 wants gold as *icon strokes*, never fills |
| Fonts | Cormorant Garamond + Inter via `next/font` | Spec §06; self-hosted, no third-party request |
| Images | Pexels CDN through `next/image` → AVIF/WebP | Spec §06 |
| Forms | WhatsApp primary, six-field form secondary | Spec §05, §09, §14 |

### Directory map

```
src/
├── app/                    routes — one directory per URL in the Spec §02 sitemap
│   ├── layout.tsx          trust bar · header · footer · TravelAgency schema
│   ├── page.tsx            home, blocks 01–11 in the Spec §03 order
│   ├── umrah/[slug]/       resolves to a tier page OR a package page
│   ├── hajj/[slug]/        package pages, shares the PackageDetail template
│   ├── from/[city]/        departure city pages
│   ├── guides/[slug]/      guide articles
│   ├── sitemap.ts          generated from the records, accurate lastmod
│   ├── robots.ts           AI crawlers explicitly allowed (Spec §08)
│   └── llms.txt/route.ts   generated from the records, so it cannot drift
├── components/             ~25 components, one per Spec §05 entry
└── lib/                    ← THE DATA. Everything on screen resolves from here.
    ├── site.ts             identity, contact, licences, the two safety gates
    ├── packages.ts         12 packages + 5 tiers — prices, hotels, distances
    ├── cities.ts           6 departure cities, each written individually
    ├── guides.ts           8 guides as typed blocks
    ├── reviews.ts          testimonials (sample)
    ├── policies.ts         payment and cancellation terms
    ├── schema.ts           JSON-LD builders + the safety gates
    └── images.ts           the photography library with alt text and credits
```

**Nothing writes a price, hotel name or distance into markup.** Spec §09:
"Prices hardcoded into page markup guarantee that within one season the site
contradicts itself, and in this category a wrong published price is a refund
dispute." Change a number in `packages.ts` and every card, table, page and
schema block follows.

---

## Decisions worth knowing about

**Motion is restrained on purpose.** You asked for "fully animated"; the spec
asks for the opposite — §06: *"Restrained motion. Slow, subtle fades on scroll.
No parallax, no counters spinning up, no carousels."* The build follows the
spec, and spends its motion budget on things that survive a second viewing:
staggered scroll reveals, gold hairlines that draw in from the left, SVG icon
strokes that trace themselves, card lifts, slow photographic zoom on hover, a
28-second breath on the hero, and a staggered mobile menu. All of it is CSS
driven by a single `IntersectionObserver`, and all of it collapses under
`prefers-reduced-motion`.

**Content is visible without JavaScript.** The reveal animations hide content
behind an `html.js` class that only JavaScript adds. With JS off — and for the
AI crawlers in Spec §08 that cannot execute it — nothing is ever hidden. Verify
by disabling JavaScript and reloading; the page renders complete.

**The FAQ accordions never hide anything from a crawler.** Built on native
`<details open>`, so every answer is in the served HTML in every state, with CSS
handling the visual collapse. Spec §05: *"GPTBot, ClaudeBot and PerplexityBot
cannot click."*

**Filters use query params and stay static.** `/umrah/?from=lahore` filters
client-side after hydration; the static HTML always contains the full list. No
filter combination generates an indexable URL (Spec §02).

**Photography is Pexels, and the spec would rather it weren't.** Spec §06 says
to pay for the library — *"Adobe Stock, Shutterstock or iStock rather than
Unsplash and Pexels. The free libraries are where the duplication happens."*
Pexels is used because it is the only source that hotlinks legally without an
API key for a working local build. Before launch, reverse-image search every
file in `src/lib/images.ts` and replace anything already appearing on a
competitor site. The hero deliberately avoids the front-on Kaaba shot the spec
warns about, using the Prophet's Mosque at night instead.

**No stock image is captioned as your own.** Spec §06's one hard line. Hotel
images are labelled as illustrative stock on every package page, and the footer
carries a site-wide disclosure. The premises photograph on `/licence/` is left
as an explicit placeholder because it is the one image whose entire value is
that it is real.

---

## Not built, and why

- **`/hajj/packages/`** — the Spec §02 sitemap lists it, but `/hajj/` already
  presents the full package range. Building both would create two near-identical
  pages, which the same spec warns against. Add it as a 301 to `/hajj/`, or
  split the scheme explainer onto it if you want the URL.
- **Guides 9–10 and the six per-city guides** from the Spec §12 content plan.
  Eight guides are written in full; the rest slot into the same `Guide` shape in
  `src/lib/guides.ts` with no template work needed.
- **Urdu and Arabic typography** — Spec §06 marks Urdu as phase two.

---

## Before launch

Work through the Spec §13 checklist. The items this build cannot do for you:

- Point DNS, pick a canonical host, 301 the other, enable HSTS
- Replace every placeholder in the table above
- Shoot the office, team and premises photographs
- Have a lawyer settle `/terms/`, `/privacy/` and `/refunds/`
- Verify every regulatory claim in the guides against current MoRA and Nusuk rules
- Submit the sitemap to Google Search Console **and Bing Webmaster Tools** —
  Spec §11 notes Bing is "routinely skipped and disproportionately valuable"
  because it feeds ChatGPT and Copilot
- Claim the Google Business Profile and Bing Places
- Wire GA4 and connect the `data-analytics` hooks already on every WhatsApp,
  call and form-submit control
- Add a server action or API route to `EnquiryForm` so the secondary path works
  for pilgrims without WhatsApp
- Run Core Web Vitals on a real mid-range Android over 4G, not on desktop
