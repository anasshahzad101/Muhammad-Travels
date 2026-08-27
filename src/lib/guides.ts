import type { Img } from './images';
import { guideImages } from './images';
import type { Faq } from './packages';
import { TODO } from './site';

/* ============================================================================
   GUIDES — THE CONTENT ENGINE
   ============================================================================
   Spec §04, Guide article template:
     "H1 · byline with a real name, role and photograph · published and
      last-updated dates, both visible · 40–60 word answer block immediately
      under the H1 · table of contents for anything over 1,200 words ·
      question-phrased H2s · contextual links into packages · FAQ block ·
      author bio · related guides."

   Spec §11, the formatting that gets you quoted:
     · One concept per section, understandable in isolation
     · Specific checkable facts
     · Comparison tables — preferentially cited over prose

   ⚠️  AUTHOR BYLINES ARE PLACEHOLDERS.
   Spec §13 lists "Real named author on every guide" as a High-priority
   pre-launch item, and Spec §11 notes that Claude in particular rewards
   "long-form structured guides and named expert sources. Real bylines matter."
   A fabricated author is worse than none, so the byline renders as a visible
   placeholder token until a real person is attached to it.

   ⚠️  REGULATORY CONTENT REQUIRES VERIFICATION BEFORE PUBLISHING.
   The spec's own closing note applies here: "Regulatory references reflect
   Ministry of Religious Affairs requirements and Saudi Nusuk Masar procedures
   as published at the time of writing; confirm current requirements before
   publishing any claims about visa process or licensing." Visa rules in
   particular change without notice. Every guide below carries
   `needsVerification: true`.
   ========================================================================= */

export type Author = {
  name: string;
  role: string;
  bio: string;
};

export const authors: Record<string, Author> = {
  operations: {
    name: TODO('AUTHOR NAME'),
    role: 'Operations Director, Muhammad Travels',
    bio: 'Replace this byline with a real named member of staff, their role, and a photograph before publishing. Named expert sources are what earn citations from AI assistants, and an invented author undermines the verifiability the rest of this site is built on.',
  },
  visa: {
    name: TODO('AUTHOR NAME'),
    role: 'Visa & Documentation Lead, Muhammad Travels',
    bio: 'Replace this byline with a real named member of staff, their role, and a photograph before publishing.',
  },
};

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'checklist'; items: string[] }
  | { type: 'warnlist'; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'callout'; label: string; text: string }
  | { type: 'cta'; href: string; label: string; text: string };

export type Guide = {
  slug: string;
  h1: string;
  title: string;
  metaDescription: string;
  intent: string;
  /** Spec §09: 40–60 word self-contained answer, before any preamble. */
  answer: string;
  published: string;
  updated: string;
  author: Author;
  image: Img;
  readingMinutes: number;
  blocks: Block[];
  faqs: Faq[];
  related: string[];
  needsVerification: boolean;
};

/* ========================================================================= */

export const guides: Guide[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: 'how-to-verify-umrah-operator',
    h1: 'How to check if an Umrah operator is government-approved',
    title: 'How to Check if an Umrah Operator Is Approved | Muhammad Travels',
    metaDescription:
      'A plain checklist for verifying any Pakistani Hajj or Umrah operator against the Ministry list — including us. Six checks, ten minutes, before you pay anyone.',
    intent: 'Verification',
    answer:
      'To verify a Pakistani Umrah operator, ask for their registered company name and licence number, match both against the Ministry of Religious Affairs published list of certified operators, visit their office in person, and insist on a receipt for every payment. If any check fails, do not pay.',
    published: '2026-06-12',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.verify,
    readingMinutes: 7,
    needsVerification: true,
    blocks: [
      {
        type: 'callout',
        label: 'Why we published this',
        text: 'This guide tells you how to check up on us. That is deliberate. Teaching customers to verify an operator is the strongest available signal that the operator will survive being verified — and in a market where the Ministry publishes a certified-operator list precisely because companies take deposits and disappear, it is the most useful thing we can put on this website.',
      },
      { type: 'h2', text: 'Why does verification matter so much for Umrah?' },
      {
        type: 'p',
        text: 'Umrah is one of the largest single payments most Pakistani families ever make outside a house or a wedding, and it is paid up front to a company on the promise of a service delivered two thousand kilometres away. That combination attracts fraud, and every season brings arrests, seized deposits and groups stranded at the airport.',
      },
      {
        type: 'p',
        text: 'The regulator’s answer is a published list. The Ministry of Religious Affairs and Interfaith Harmony maintains registers of licensed Hajj Group Organisers and attested Umrah operators. Checking that list takes about ten minutes and eliminates the great majority of the risk.',
      },
      { type: 'h2', text: 'What exactly should I ask an operator for?' },
      {
        type: 'p',
        text: 'Four things, and a licensed operator will give you all four without hesitating, because all four are already a matter of public record.',
      },
      {
        type: 'checklist',
        items: [
          'The registered company name, exactly as it appears on the licence — not the trading name on the shopfront, which is often different.',
          'The Umrah attestation number, and the date it expires.',
          'The Hajj Group Organiser (HGO) registration number, if you are booking Hajj rather than Umrah. These are separate authorisations.',
          'The office address, and confirmation that you may visit it during working hours without an appointment.',
        ],
      },
      {
        type: 'callout',
        label: 'The registered name is the detail people miss',
        text: 'Companies frequently trade under a name that differs from the one on the licence. Searching the Ministry list for the shopfront name and finding nothing does not necessarily mean the operator is unlicensed — but it does mean you must ask for the registered name and search again. An operator who cannot or will not give you that name has answered your question.',
      },
      { type: 'h2', text: 'How do I check the number against the Ministry list?' },
      {
        type: 'list',
        items: [
          'Go to the Ministry of Religious Affairs and Interfaith Harmony website and find the current published list of registered Hajj Group Organisers or attested Umrah operators.',
          'Search for the registered company name, not the trading name.',
          'Match the licence number character for character. A near-match is not a match.',
          'Check the expiry date. A licence that lapsed last season is not a licence.',
          'If you cannot find the operator, telephone the Ministry directly rather than accepting the operator’s explanation for why they are absent from the list.',
        ],
      },
      {
        type: 'p',
        text: 'Lists move and get republished. If a link is dead, search the Ministry site rather than trusting a screenshot the operator has given you — including the one on our own licence page. A screenshot is a starting point, not evidence.',
      },
      { type: 'h2', text: 'What should I check beyond the licence?' },
      {
        type: 'p',
        text: 'A licence proves accountability, not competence. Once the number checks out, verify the specifics of what you are being sold — because this is where a licensed but careless operator will still cost you.',
      },
      {
        type: 'table',
        caption: 'The six specifics worth confirming in writing',
        head: ['What to confirm', 'What a straight answer looks like'],
        rows: [
          ['Hotel names', 'Both hotels named, in writing, before any deposit — not "4-star near Haram"'],
          ['Distance to the Haram', 'An exact figure in metres. "Walking distance" is not a distance'],
          ['Room occupancy', 'The number of beds in your room, stated. Quad, triple, double'],
          ['What is excluded', 'A written exclusions list as detailed as the inclusions list'],
          ['Payment terms', 'A deposit amount, a balance date, and a written cancellation schedule'],
          ['Receipts', 'A receipt for every payment, on company letterhead, to a company account'],
        ],
      },
      { type: 'h2', text: 'What are the warning signs of an unlicensed operator?' },
      {
        type: 'warnlist',
        items: [
          'Cash demanded with no receipt, or payment requested to a personal bank account rather than a company one.',
          'A guaranteed visa. Nobody can guarantee a visa — the Saudi authorities issue them, not the operator.',
          'No verifiable office, or an address that turns out to be a residential flat or a shared desk.',
          'Your passport held without a signed receipt listing what was taken and when it will be returned.',
          'Pressure to pay today for a price that expires tonight.',
          'Refusal to name the hotels, or naming them only after the deposit is paid.',
          'A licence number that does not appear on the Ministry list, or an expired one.',
        ],
      },
      {
        type: 'cta',
        href: '/licence/',
        label: 'Verify Muhammad Travels',
        text: 'Our registered company name, Umrah attestation number and HGO registration are published in full, with instructions for checking each of them against the Ministry list.',
      },
      { type: 'h2', text: 'What if I have already paid an operator I now doubt?' },
      {
        type: 'p',
        text: 'Act immediately rather than waiting to see. Gather every receipt, message and advertisement, check the Ministry list, and contact the Ministry directly to confirm the operator’s status. If the operator is not registered, report it to the Federal Investigation Agency — which prosecutes Hajj and Umrah fraud each season — and to the Ministry.',
      },
      {
        type: 'p',
        text: 'The earlier you act, the more likely recovery becomes. Deposits are usually moved quickly, and complaints filed weeks after the fact recover far less than complaints filed the same week.',
      },
    ],
    faqs: [
      { q: 'How do I check if an Umrah company is registered in Pakistan?', a: 'Ask for the registered company name and licence number, then search the Ministry of Religious Affairs published list of attested Umrah operators for that exact name and match the number character for character. If the operator does not appear, telephone the Ministry rather than accepting their explanation.' },
      { q: 'Is a licence number alone enough to trust an operator?', a: 'No. A licence proves the operator is accountable to a regulator and can be traced. It does not prove the hotel is where they said it was. Check the licence first, then get the hotel names, exact distances in metres and the written exclusions list.' },
      { q: 'What is the difference between an HGO registration and an Umrah attestation?', a: 'They are separate authorisations. Hajj Group Organiser registration permits an operator to run Hajj groups under the Ministry scheme with an allocated quota. Umrah attestation permits Umrah visa processing through Nusuk Masar. Many operators hold one and not the other.' },
      { q: 'Should I pay a deposit in cash?', a: 'No. Pay by bank transfer to a company account and obtain a receipt on company letterhead for every payment. Cash with no receipt is the single most common feature of Hajj and Umrah fraud cases, because it leaves you nothing to take to an investigator.' },
      { q: 'Can an operator guarantee my visa?', a: 'No. Visas are issued by the Saudi authorities through Nusuk Masar, not by the travel agent. An operator can process the application correctly and promptly; they cannot guarantee the outcome. A guaranteed-visa promise is a warning sign, not a service.' },
      { q: 'What do I do if I have been defrauded?', a: 'Gather every receipt, message and advertisement immediately, confirm the operator’s status with the Ministry, and report to the Federal Investigation Agency and the Ministry the same week. Recovery rates fall sharply the longer a complaint takes to file.' },
    ],
    related: ['how-to-spot-a-fraudulent-agent', 'umrah-package-prices', 'umrah-visa-requirements'],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: 'how-to-spot-a-fraudulent-agent',
    h1: 'How to spot a fraudulent Hajj or Umrah agent',
    title: 'How to Spot a Fraudulent Hajj or Umrah Agent | Muhammad Travels',
    metaDescription:
      'The seven behaviours that appear in almost every Hajj and Umrah fraud case in Pakistan, and what to do the moment you see one. Written by a licensed operator.',
    intent: 'Trust',
    answer:
      'Fraudulent Hajj and Umrah agents share seven recurring behaviours: cash-only demands, guaranteed-visa promises, no verifiable office, holding passports without a receipt, refusing to name hotels, prices far below market, and pressure to pay immediately. Any one of them is reason enough to stop.',
    published: '2026-06-20',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.fraud,
    readingMinutes: 8,
    needsVerification: true,
    blocks: [
      {
        type: 'p',
        text: 'Hajj and Umrah fraud in Pakistan is not sophisticated. It follows a small number of patterns, repeated season after season, and almost every case contains at least two of the seven signs below. Learning them takes ten minutes and is the best protection available to you.',
      },
      { type: 'h2', text: 'Sign 1 — Cash only, and no receipt' },
      {
        type: 'p',
        text: 'This is the most reliable single indicator. A legitimate operator issues a receipt on company letterhead for every payment and receives funds into a company bank account. Cash with no paper trail is not a payment method; it is the removal of your evidence.',
      },
      {
        type: 'p',
        text: 'The excuse is usually a discount for cash. Weigh that discount against having nothing to hand an investigator if the trip does not happen.',
      },
      { type: 'h2', text: 'Sign 2 — A guaranteed visa' },
      {
        type: 'p',
        text: 'Umrah visas are issued by the Saudi authorities through Nusuk Masar. No Pakistani travel agent issues them, and none can guarantee an outcome. An operator can promise to submit a complete application promptly. Anyone promising the visa itself is either misunderstanding their own business or misleading you.',
      },
      { type: 'h2', text: 'Sign 3 — No office you can walk into' },
      {
        type: 'p',
        text: 'Ask to visit. Then actually go. A residential flat, a shared desk in a business centre, or an address that turns out to be a shopfront belonging to a different company are all common findings — and all discoverable for the cost of a rickshaw fare.',
      },
      {
        type: 'callout',
        label: 'The visit is worth more than the website',
        text: 'A convincing website costs a few thousand rupees and an afternoon. A staffed office with a signboard, filing cabinets and other customers in it is considerably harder to fake, and it is the check that fraudulent operators fail most reliably. Go before you pay, not after.',
      },
      { type: 'h2', text: 'Sign 4 — Your passport taken without a receipt' },
      {
        type: 'p',
        text: 'Handing over a passport is normal; handing it over without a signed receipt is not. The receipt should list the passport number, the date it was taken, and the date it will be returned. Without that document you have no proof the operator ever held it.',
      },
      { type: 'h2', text: 'Sign 5 — The hotels are never named' },
      {
        type: 'p',
        text: '"Four-star, near Haram" is not a hotel. Legitimate operators name both properties before a deposit is taken and state the distance to the Haram in metres, because those are the facts they are competing on. Vagueness at this stage almost always resolves into a hotel much further away than implied.',
      },
      { type: 'h2', text: 'Sign 6 — A price far below everyone else' },
      {
        type: 'p',
        text: 'Airfare, the visa and hotel nights have floors. An operator quoting materially less than the rest of the market is either excluding something significant, or is not planning to deliver. Ask what has been removed. If the answer is nothing, the price is not real.',
      },
      {
        type: 'table',
        caption: 'What a suspiciously low price usually conceals',
        head: ['Claimed saving', 'What is actually missing'],
        rows: [
          ['“Same hotels, lower price”', 'A different room category, or six to a room'],
          ['“All-inclusive”', 'Meals beyond breakfast, transfers, or Ziyarat charged later'],
          ['“Direct flight”', 'A connection added after the deposit, or an unconfirmed seat'],
          ['“Near the Haram”', 'A hotel 1.5–2km out, with a shuttle that runs when full'],
          ['“Visa included”', 'A visa fee invoiced separately once the deposit is non-refundable'],
        ],
      },
      { type: 'h2', text: 'Sign 7 — Pressure to pay right now' },
      {
        type: 'p',
        text: 'Genuine scarcity exists in this business — Ramadan hotel allocations really do run out. But a licensed operator will let you verify their licence before taking your money, because they know the verification will pass. Urgency deployed specifically to prevent checking is the tell.',
      },
      {
        type: 'cta',
        href: '/guides/how-to-verify-umrah-operator/',
        label: 'Read the verification checklist',
        text: 'The companion guide sets out the six checks to run against any operator, including us, before paying a deposit.',
      },
      { type: 'h2', text: 'What should I do if I see one of these signs?' },
      {
        type: 'list',
        items: [
          'Stop the payment. Do not pay a smaller amount as a compromise.',
          'Ask directly for the registered company name and licence number, in writing.',
          'Check the Ministry’s published certified-operator list yourself rather than accepting a screenshot.',
          'If the operator is not on the list, report them to the Ministry and to the Federal Investigation Agency.',
          'Warn the people who referred you. Most of these cases spread through family and mosque networks, and a warning stops the next payment.',
        ],
      },
    ],
    faqs: [
      { q: 'What are the most common Hajj and Umrah scams in Pakistan?', a: 'Taking deposits for trips that never depart, collecting cash with no receipt, promising guaranteed visas, advertising hotels far closer to the Haram than the ones actually booked, and adding charges after a non-refundable deposit is paid. Most cases combine two or three of these.' },
      { q: 'Is a cash discount ever legitimate?', a: 'A discount can be legitimate; the absence of a receipt never is. If an operator offers a cash price, pay it and take a receipt on company letterhead. An operator unwilling to document a payment they have received is telling you something important.' },
      { q: 'Should I hand over my passport?', a: 'Yes, that is normal for visa processing — but only against a signed receipt listing the passport number, the date taken and the date of return. Without that document you cannot prove the operator ever held it.' },
      { q: 'How can a price be too low?', a: 'Airfare, the visa and hotel nights have hard floors. A quote materially below the market has either removed something significant or is not intended to be delivered. Ask specifically what has been excluded and get the answer in writing.' },
      { q: 'Who investigates Hajj and Umrah fraud in Pakistan?', a: 'The Federal Investigation Agency prosecutes these cases and makes arrests each season, and the Ministry of Religious Affairs maintains the certified-operator list and receives complaints. Report to both, and report early — recovery rates fall sharply with delay.' },
      { q: 'What if the operator is licensed but still misled me?', a: 'A licence makes an operator traceable and accountable, which is exactly what you need. File a complaint with the Ministry citing the registration number, and keep every written communication. A licensed operator has considerably more to lose from a complaint than an unlicensed one.' },
    ],
    related: ['how-to-verify-umrah-operator', 'umrah-package-prices', 'first-time-umrah'],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: 'umrah-package-prices',
    h1: 'Umrah package prices from Pakistan — what’s actually included',
    title: 'Umrah Package Prices from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'What an Umrah package from Pakistan really costs in 2026, what each price tier buys, and the six exclusions that turn a cheap package into an expensive one.',
    intent: 'Commercial',
    answer:
      'Umrah packages from Pakistan cost roughly PKR 265,000 to PKR 750,000 per person in 2026, depending on trip length, hotel distance from the Haram and room occupancy. The price difference between tiers is mostly distance and beds per room, not service quality.',
    published: '2026-05-30',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.prices,
    readingMinutes: 9,
    needsVerification: true,
    blocks: [
      {
        type: 'p',
        text: 'Umrah pricing looks opaque from the outside and is actually fairly simple once you know which four variables move it. Almost every price difference you will see quoted comes down to trip length, distance to the Haram, beds per room, and season.',
      },
      { type: 'h2', text: 'How much does Umrah cost from Pakistan in 2026?' },
      {
        type: 'table',
        caption: 'Indicative 2026 pricing per person, including flights and visa',
        head: ['Tier', 'From (PKR)', 'Makkah distance', 'Room basis', 'Typical length'],
        rows: [
          ['Economy', '265,000', '850m', 'Quad sharing', '10–14 nights'],
          ['Standard', '385,000', '250m', 'Triple sharing', '14–21 nights'],
          ['Family', '355,000', '250m', 'Family / connecting', '14 nights'],
          ['Premium', '585,000', '180–200m', 'Double occupancy', '10–14 nights'],
          ['Ramadan', '615,000', '250m', 'Triple sharing', '12–30 nights'],
        ],
      },
      {
        type: 'p',
        text: 'These are our own published figures and every one of them carries a validity date on the package page. Treat any quote without a validity date as an estimate rather than a price.',
      },
      { type: 'h2', text: 'What drives the price difference between tiers?' },
      { type: 'h3', text: 'Distance to the Haram' },
      {
        type: 'p',
        text: 'This is the largest single lever, and it is worth understanding in practical terms rather than as a number. Moving from 850 metres to 250 metres saves roughly ten minutes each way, five times a day. Across a fourteen-night stay that is about two hours of walking a day, in Makkah heat, often for people in their sixties.',
      },
      { type: 'h3', text: 'Beds per room' },
      {
        type: 'p',
        text: 'A hotel room costs what it costs; dividing it four ways rather than two halves the per-person figure. Quad sharing is the standard economy basis, triple is standard, double is premium. Nothing else about the room changes.',
      },
      { type: 'h3', text: 'Trip length' },
      {
        type: 'p',
        text: 'Airfare and the visa are fixed costs regardless of how long you stay, which is why a 21-night package is not fifty per cent more than a 14-night one. Compare per-night figures rather than headline prices — longer trips are consistently better value.',
      },
      { type: 'h3', text: 'Season' },
      {
        type: 'p',
        text: 'Ramadan hotel rates near either Haram rise sharply, and airlines price the window accordingly. Rajab and Shaban offer a very similar experience at close to ordinary rates and are the most underrated value in the calendar.',
      },
      { type: 'h2', text: 'What should always be included?' },
      {
        type: 'checklist',
        items: [
          'Return economy airfare, with the carrier named',
          'The Umrah visa, processed through Nusuk Masar',
          'Hotel accommodation in both Makkah and Madinah, with both hotels named',
          'Airport transfers on arrival and departure',
          'The Makkah ⇄ Madinah intercity transfer',
          'Daily breakfast, at minimum',
          'Guided Ziyarat in both cities',
          'A group leader travelling with the group',
        ],
      },
      { type: 'h2', text: 'What is usually excluded, and what does it cost?' },
      {
        type: 'p',
        text: 'This is where a cheap package becomes an expensive one. The following are legitimately excluded by most operators — the problem is when they are not disclosed until after a deposit.',
      },
      {
        type: 'table',
        caption: 'Common exclusions and what to budget for them',
        head: ['Excluded item', 'Typical cost', 'Notes'],
        rows: [
          ['Lunch and dinner', 'SAR 20–40 per meal', 'Both Harams sit in dense, inexpensive food districts'],
          ['Travel insurance', 'PKR 3,000–15,000', 'Strongly advised over 60; not sold by us'],
          ['Vaccinations', 'Varies', 'Requirements change — confirm at time of travel'],
          ['Excess baggage', 'Charged by airline', 'Check your issued ticket, not the brochure'],
          ['Ziyarat beyond the included tour', 'SAR 50–150', 'Taif, Badr and similar day trips'],
          ['Second Umrah transport', 'SAR 20–50', 'Transport to the Masjid Aisha Miqat at Tan’eem'],
        ],
      },
      {
        type: 'callout',
        label: 'The comparison that actually works',
        text: 'Put two quotes side by side and compare four fields only: the named Makkah hotel, its distance in metres, the number of beds in the room, and the written exclusions list. Those four explain nearly every price difference in this market. Star ratings and photographs explain almost none of it.',
      },
      {
        type: 'cta',
        href: '/umrah/',
        label: 'See all Umrah packages',
        text: 'Every package we run publishes named hotels, exact distances in metres, the room basis and a full exclusions list — before you contact us.',
      },
      { type: 'h2', text: 'How do payment schedules usually work?' },
      {
        type: 'p',
        text: 'A deposit confirms the seat and the balance falls due before visa submission, typically three to six weeks before departure. Get the deposit amount, the balance date and the cancellation schedule in writing before you pay anything, and pay to a company account against a receipt.',
      },
    ],
    faqs: [
      { q: 'How much does Umrah cost from Pakistan in 2026?', a: 'Between roughly PKR 265,000 and PKR 750,000 per person including flights and visa, depending on trip length, hotel distance from the Haram, room occupancy and season. Economy 14-night packages start around PKR 295,000 and premium packages around PKR 585,000.' },
      { q: 'Why are some Umrah packages so much cheaper?', a: 'Almost always distance and occupancy. A cheaper package usually means a hotel a kilometre or more from the Haram and five or six people to a room. Neither is dishonest if disclosed — the problem is when the hotel is not named until after the deposit.' },
      { q: 'Is a longer Umrah trip better value?', a: 'Per night, considerably. Airfare and the visa cost the same whether you stay ten nights or twenty-one, so the extra week costs only the hotel and food. Compare per-night figures rather than headline prices.' },
      { q: 'What is not included in an Umrah package?', a: 'Typically meals beyond breakfast, travel insurance, vaccinations, excess baggage, Saudi inter-city transport beyond the Makkah–Madinah transfer, and personal expenses. Budget roughly SAR 40–80 a day for food and incidentals.' },
      { q: 'When is Umrah cheapest?', a: 'Outside Ramadan and outside the school holidays. Rajab and Shaban are a strong secondary peak but still priced close to ordinary rates, and the winter months suit older pilgrims because of the cooler weather.' },
      { q: 'How much deposit is normal?', a: 'A partial deposit at booking with the balance due before visa submission is the standard structure. What matters more than the amount is that the deposit, balance date and cancellation terms are all in writing before you pay, and that you receive a receipt.' },
      { q: 'Should I budget extra beyond the package price?', a: 'Yes — roughly SAR 40–80 per day covers meals beyond breakfast and incidentals, plus insurance and any vaccinations. For a fourteen-night trip that is a meaningful additional sum and should be part of the plan, not a surprise.' },
      { q: 'Does the price include Qurbani?', a: 'Qurbani is not part of Umrah and is not included in an Umrah package. It applies to Hajj, where it should be listed as a separate at-cost item rather than bundled into the headline price.' },
    ],
    related: ['how-to-verify-umrah-operator', 'ramadan-umrah-guide', 'umrah-with-elderly-parents'],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: 'umrah-visa-requirements',
    h1: 'Umrah visa requirements under Nusuk — 2026',
    title: 'Umrah Visa Requirements from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'What the Umrah visa requires from Pakistani pilgrims in 2026 under Nusuk Masar: documents, processing, validity and the rules that changed recently.',
    intent: 'Process',
    answer:
      'Pakistani pilgrims need a machine-readable passport valid at least six months beyond travel, photographs to the current specification, a CNIC, and vaccinations as required at the time. Umrah visas are issued through the Saudi Nusuk Masar platform by a licensed operator, not by the pilgrim directly.',
    published: '2026-07-02',
    updated: '2026-08-25',
    author: authors.visa,
    image: guideImages.visa,
    readingMinutes: 8,
    needsVerification: true,
    blocks: [
      {
        type: 'callout',
        label: 'Verify before you rely on this',
        text: 'Saudi visa procedure has changed repeatedly in recent years and most published guidance in this sector is out of date. Treat this page as an orientation, not an authority, and confirm current requirements with your operator or the Nusuk platform at the time you travel. We update this guide when rules change and show the last-updated date above so you can judge how fresh it is.',
      },
      { type: 'h2', text: 'What is Nusuk Masar?' },
      {
        type: 'p',
        text: 'Nusuk Masar is the Saudi platform through which licensed operators register pilgrims, book accommodation and transport, and obtain Umrah visas. The practical consequence for a Pakistani pilgrim is that the visa is applied for by the operator in the operator’s own name — which is exactly why the operator’s licence status matters so much.',
      },
      {
        type: 'p',
        text: 'If your operator does not hold their own attestation, they are routing your application through somebody else’s. That is not necessarily improper, but it does mean the company you are paying is not the company answerable for your visa, and you should know which company that is.',
      },
      { type: 'h2', text: 'What documents do I need for an Umrah visa?' },
      {
        type: 'checklist',
        items: [
          'A machine-readable passport valid for at least six months beyond your date of travel',
          'Passport photographs to the current specification — white background, specified dimensions',
          'A valid NADRA CNIC',
          'Proof of vaccination where required at the time of travel',
          'For children: their own passport and their own visa. A child cannot travel on a parent’s passport',
          'Birth certificate or NADRA CRC for children, occasionally requested at immigration',
        ],
      },
      { type: 'h2', text: 'How long does an Umrah visa take to process?' },
      {
        type: 'p',
        text: 'Processing through Nusuk is normally a matter of days rather than weeks once a complete application is submitted with confirmed accommodation and transport. Delays are almost always caused by incomplete documents at the operator’s end, not by the platform.',
      },
      {
        type: 'p',
        text: 'This is why operators ask for passports several weeks before departure. Give yourself margin: a passport that expires in five months rather than six cannot be fixed in the week before a flight.',
      },
      { type: 'h2', text: 'Can women travel for Umrah without a mahram?' },
      {
        type: 'p',
        text: 'Saudi rules on this have changed in recent years and continue to be applied with some variation in practice. Rather than state a rule that may be out of date by the time you read it, we confirm the current position for your specific circumstances at the time of booking — and we will tell you if we are uncertain rather than guessing.',
      },
      { type: 'h2', text: 'How long is an Umrah visa valid for?' },
      {
        type: 'p',
        text: 'Umrah visas issued through Nusuk permit a stay well beyond the length of a typical package, so a 21-night or even 30-night itinerary is comfortably within the validity. The exact validity is printed on your issued visa; check it rather than relying on a general figure.',
      },
      { type: 'h2', text: 'What are the most common reasons an application is delayed?' },
      {
        type: 'warnlist',
        items: [
          'Passport validity under six months at the date of travel',
          'Photographs that do not meet the current specification — the most frequent single cause',
          'Name spelling that differs between the passport and the CNIC',
          'A damaged passport, or one with pages missing',
          'Incomplete vaccination documentation where it is required',
          'Accommodation or transport not yet confirmed on the operator’s side',
        ],
      },
      {
        type: 'cta',
        href: '/umrah/',
        label: 'Browse Umrah packages',
        text: 'We hold our own MoRA attestation and process visas through Nusuk Masar in our own name — no third-party agent between you and the application.',
      },
      { type: 'h2', text: 'What should I check on the visa once it is issued?' },
      {
        type: 'list',
        items: [
          'Your name, spelled exactly as it appears in your passport',
          'The passport number',
          'The validity dates, against your actual travel dates',
          'The visa type — Umrah, not visit or tourist, unless you have deliberately chosen otherwise',
        ],
      },
      {
        type: 'p',
        text: 'Errors are correctable before departure and expensive afterwards. Check the document the day you receive it, not the night before the flight.',
      },
    ],
    faqs: [
      { q: 'What documents do I need for an Umrah visa from Pakistan?', a: 'A machine-readable passport valid at least six months beyond travel, passport photographs to the current specification, a valid NADRA CNIC, and vaccination proof where required. Children need their own passport and visa, and should carry a birth certificate or NADRA CRC.' },
      { q: 'How long does an Umrah visa take?', a: 'Normally days rather than weeks once a complete application is submitted through Nusuk Masar with confirmed accommodation and transport. Delays are almost always caused by incomplete documents rather than by the platform itself.' },
      { q: 'Can I apply for an Umrah visa myself?', a: 'Umrah visas are processed through Nusuk Masar by a licensed operator, who registers the pilgrim along with confirmed accommodation and transport. This is why the operator’s own licence status matters — the application is made in their name.' },
      { q: 'How long can I stay on an Umrah visa?', a: 'Well beyond a typical package length — a 21 or 30-night itinerary sits comfortably within the validity. The exact period is printed on your issued visa, and you should check that document rather than rely on a general figure.' },
      { q: 'Do children need their own Umrah visa?', a: 'Yes. Every child needs their own machine-readable passport and their own visa; they cannot travel on a parent’s passport. Carry the original birth certificate or NADRA CRC as well, as it is occasionally requested at immigration.' },
      { q: 'Can women perform Umrah without a mahram?', a: 'The Saudi position on this has changed in recent years and is applied with some variation in practice. We confirm the current requirement for your specific circumstances at the time of booking rather than publishing a rule that may already be out of date.' },
      { q: 'What is the most common reason a visa application is delayed?', a: 'Photographs that do not meet the current specification, followed by passport validity falling under six months and name spellings that differ between passport and CNIC. All three are avoidable if checked several weeks before departure.' },
    ],
    related: ['first-time-umrah', 'how-to-verify-umrah-operator', 'umrah-package-prices'],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: 'hajj-vs-umrah',
    h1: 'Hajj vs Umrah — obligation, cost and timing',
    title: 'Hajj vs Umrah — Difference, Cost and Timing | Muhammad Travels',
    metaDescription:
      'The difference between Hajj and Umrah explained: obligation, timing, rites, duration and cost from Pakistan. A plain comparison for first-time pilgrims.',
    intent: 'Foundational',
    answer:
      'Hajj is obligatory once in a lifetime for every Muslim who is able, performed only during Dhul Hijjah, and takes several weeks. Umrah is voluntary, can be performed at any time of year, and takes as little as ten days. From Pakistan, Hajj costs roughly five times as much.',
    published: '2026-05-15',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.hajjVsUmrah,
    readingMinutes: 7,
    needsVerification: true,
    blocks: [
      {
        type: 'p',
        text: 'These are two different acts of worship that happen in the same city, and confusing them is common enough that it is worth setting out plainly before anyone starts comparing prices.',
      },
      { type: 'h2', text: 'What is the difference between Hajj and Umrah?' },
      {
        type: 'table',
        caption: 'Hajj and Umrah compared',
        head: ['', 'Hajj', 'Umrah'],
        rows: [
          ['Obligation', 'Obligatory once for those able', 'Voluntary, highly recommended'],
          ['Timing', 'Only 8–13 Dhul Hijjah', 'Any time of year'],
          ['Duration from Pakistan', '21–40 days', '10–30 nights'],
          ['Locations', 'Makkah, Mina, Arafat, Muzdalifah', 'Makkah only for the rites'],
          ['Core rites', 'Ihram, Tawaf, Sa’i, Arafat, Muzdalifah, Jamarat, Qurbani', 'Ihram, Tawaf, Sa’i, halq or taqsir'],
          ['Quota', 'Nationally allocated, limited', 'No quota'],
          ['Cost from Pakistan', 'From ~PKR 1,450,000', 'From ~PKR 265,000'],
        ],
      },
      { type: 'h2', text: 'Why is Hajj so much more expensive?' },
      {
        type: 'p',
        text: 'Because of what happens between the eighth and thirteenth of Dhul Hijjah. Tent accommodation at Mina and Arafat, transport through the Mashaer area, catering for two million people simultaneously and the Qurbani logistics are all costs that simply do not exist for Umrah.',
      },
      {
        type: 'p',
        text: 'A useful way to see it: Umrah is a trip with rites in it. Hajj is a five-day mass operation with a trip attached at either end. The five days are where most of the money goes.',
      },
      { type: 'h2', text: 'Does Umrah count as Hajj?' },
      {
        type: 'p',
        text: 'No. Umrah is sometimes called the lesser pilgrimage, and performing it does not discharge the obligation of Hajj. They are separate, and someone who has performed Umrah many times still owes Hajj if they are able to perform it.',
      },
      { type: 'h2', text: 'Should I perform Umrah before Hajj?' },
      {
        type: 'p',
        text: 'Many pilgrims do, and there is a practical argument for it beyond the spiritual one. Hajj is physically demanding and logistically complex, and arriving with prior experience of Tawaf, Sa’i, the Haram’s scale and the Saudi heat makes the whole thing considerably easier to manage.',
      },
      {
        type: 'p',
        text: 'For pilgrims over sixty in particular, an Umrah trip is a realistic assessment of whether Hajj is physically achievable — and it is far better to discover that in a fortnight in Makkah than on the ninth of Dhul Hijjah at Arafat.',
      },
      { type: 'h2', text: 'How does the Hajj quota work from Pakistan?' },
      {
        type: 'p',
        text: 'Saudi Arabia allocates a national quota to Pakistan, which the Ministry of Religious Affairs divides between the government scheme and licensed private Hajj Group Organisers. Private operators receive an allocation each year, and applications open after the Ministry announces the scheme — usually six to eight months ahead.',
      },
      {
        type: 'cta',
        href: '/hajj/how-it-works/',
        label: 'How Hajj works from Pakistan',
        text: 'The quota system, the scheme timeline, what you need to prepare and when applications open.',
      },
      { type: 'h2', text: 'Which should I do first if I can only afford one?' },
      {
        type: 'p',
        text: 'If you are able to perform Hajj — physically and financially — it is the obligation, and it takes precedence. If Hajj is not currently within reach, Umrah is not a consolation prize; it is a substantial act of worship in its own right, and performing it does not reduce the reward of a later Hajj.',
      },
    ],
    faqs: [
      { q: 'What is the difference between Hajj and Umrah?', a: 'Hajj is obligatory once in a lifetime for those able, performed only during Dhul Hijjah, and includes rites at Mina, Arafat and Muzdalifah over five days. Umrah is voluntary, can be performed at any time, and consists of Ihram, Tawaf, Sa’i and halq or taqsir in Makkah alone.' },
      { q: 'Does Umrah count as Hajj?', a: 'No. Umrah is sometimes called the lesser pilgrimage but it does not discharge the obligation of Hajj. Someone who has performed Umrah many times still owes Hajj if they are able to perform it.' },
      { q: 'Why does Hajj cost so much more than Umrah?', a: 'Because of the five days of rites. Tent accommodation at Mina and Arafat, Mashaer transport, catering at enormous scale and Qurbani logistics are all fixed costs that do not exist for Umrah, and they account for most of the difference.' },
      { q: 'Can I perform Umrah during Hajj season?', a: 'Umrah is generally suspended in the immediate run-up to and during Hajj so the authorities can manage capacity. Outside that window it is available year-round. Check the current position before planning travel for late Dhul Qa’dah or Dhul Hijjah.' },
      { q: 'Should I perform Umrah before Hajj?', a: 'Many pilgrims do, and there is a practical case for it. Hajj is physically demanding, and arriving with prior experience of the Haram, Tawaf, Sa’i and the heat makes it considerably easier. For older pilgrims it is also an honest test of whether Hajj is achievable.' },
      { q: 'How long does each take from Pakistan?', a: 'Umrah packages run from 10 to 30 nights, most commonly 14. Hajj packages run from about 21 days on the short scheme to around 38 on the long scheme, with the difference being time in Makkah and Madinah rather than the rites themselves.' },
    ],
    related: ['hajj-quota-and-application', 'first-time-umrah', 'umrah-package-prices'],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: 'ramadan-umrah-guide',
    h1: 'Ramadan Umrah — costs, timing and what to expect',
    title: 'Ramadan Umrah 2027 — Cost, Timing, What to Expect | Muhammad Travels',
    metaDescription:
      'What Ramadan Umrah costs from Pakistan in 2027, when to book, how crowded the Haram gets, and whether the last ten nights are right for your family.',
    intent: 'Seasonal',
    answer:
      'Ramadan Umrah from Pakistan costs from roughly PKR 615,000 per person for the last ten nights and PKR 745,000 for the full month. Ramadan 1448 falls in February and March 2027. Book four to five months ahead — hotels near the Haram sell their allocation first.',
    published: '2026-08-01',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.ramadan,
    readingMinutes: 8,
    needsVerification: true,
    blocks: [
      {
        type: 'p',
        text: 'Ramadan is the most sought-after window in the Umrah calendar and the one where the difference between booking early and booking late is measured in hundreds of thousands of rupees.',
      },
      { type: 'h2', text: 'When is Ramadan Umrah 2027?' },
      {
        type: 'p',
        text: 'Ramadan 1448 is expected to begin in early February 2027 and end in early March 2027, which places the last ten nights in late February and early March. Exact dates depend on the moon sighting and cannot be confirmed months ahead by anyone — an operator giving you a guaranteed date before the announcement is guessing.',
      },
      { type: 'h2', text: 'How much does Ramadan Umrah cost?' },
      {
        type: 'table',
        caption: 'Ramadan 1448 indicative pricing per person',
        head: ['Package', 'From (PKR)', 'Nights', 'Board'],
        rows: [
          ['Last ten nights', '615,000', '12', 'Suhoor and Iftar daily'],
          ['Full month', '745,000', '30', 'Suhoor and Iftar daily'],
        ],
      },
      {
        type: 'p',
        text: 'Ramadan rates are higher because hotel and airline net rates rise sharply for the window, not because operators widen their margins. If budget is the binding constraint, Rajab and Shaban deliver a very similar experience at close to ordinary prices.',
      },
      { type: 'h2', text: 'When should I book Ramadan Umrah?' },
      {
        type: 'p',
        text: 'Four to five months ahead — so by October for a February departure. This is the single most consequential timing decision in the whole category.',
      },
      {
        type: 'callout',
        label: 'The arithmetic of booking late',
        text: 'Hotels within 300 metres of either Haram sell their Ramadan allocation first, typically months in advance. What remains in the final weeks is further out and priced higher than the close rooms cost in October. Booking late in Ramadan means paying more for a longer walk — the worst possible trade in a month when the walk is the hardest part.',
      },
      { type: 'h2', text: 'How crowded is the Haram during Ramadan?' },
      {
        type: 'p',
        text: 'Very, and in the last ten nights extremely so. Tawaf on the ground floor becomes impractical at peak times and the upper levels or the roof are often the sensible choice. Getting into the Mataf at all after Taraweeh can take a long time.',
      },
      {
        type: 'p',
        text: 'This is exactly why hotel distance matters more in Ramadan than at any other point in the year. A 250-metre hotel is not a luxury when you are making that walk after Qiyam at two in the morning while fasting the next day.',
      },
      { type: 'h2', text: 'What is the daily rhythm like?' },
      {
        type: 'list',
        items: [
          'Suhoor before Fajr, usually at the hotel',
          'Fajr at the Haram, then most pilgrims sleep for several hours',
          'A quiet afternoon — this is not a sightseeing month',
          'Iftar at the Haram or the hotel, followed by Maghrib',
          'Isha and Taraweeh at the Haram, typically running well past midnight',
          'Qiyam in the last ten nights, often until close to Suhoor',
        ],
      },
      {
        type: 'p',
        text: 'Ziyarat should be scheduled early in the month and early in the day. Anything requiring energy in a fasting afternoon in Makkah is a mistake most first-time Ramadan pilgrims make exactly once.',
      },
      { type: 'h2', text: 'Is Ramadan Umrah suitable for elderly pilgrims?' },
      {
        type: 'p',
        text: 'The last ten nights are demanding: long nights, dense crowds, fasting and broken sleep. For pilgrims over seventy we usually suggest the first twenty days of Ramadan, or Rajab instead — the reward of Umrah in Ramadan is not diminished by performing it in the first half of the month.',
      },
      {
        type: 'cta',
        href: '/umrah/ramadan/',
        label: 'Ramadan Umrah packages',
        text: 'Last ten nights and full month, with Suhoor and Iftar included daily and hotels within 250 metres of Masjid al-Haram.',
      },
    ],
    faqs: [
      { q: 'When is Ramadan Umrah 2027?', a: 'Ramadan 1448 is expected to run from early February to early March 2027, placing the last ten nights in late February and early March. Exact dates depend on the moon sighting and are confirmed only after the Saudi announcement.' },
      { q: 'How much does Ramadan Umrah cost from Pakistan?', a: 'From roughly PKR 615,000 per person for the last ten nights and PKR 745,000 for the full month, including flights, visa, hotels, transfers and Suhoor and Iftar daily. Rates are higher because hotel and airline net costs rise sharply for the window.' },
      { q: 'When should I book Ramadan Umrah?', a: 'Four to five months ahead — by October for a February departure. Hotels within 300 metres of either Haram sell their Ramadan allocation first, and late booking means paying more for a hotel further away.' },
      { q: 'Are the last ten nights worth the extra cost?', a: 'They contain Laylat al-Qadr and are the most sought-after nights of the year, which is why they carry a premium. Whether they suit you depends on stamina — they involve long nights, dense crowds and broken sleep alongside fasting.' },
      { q: 'How crowded is Makkah in Ramadan?', a: 'Extremely, particularly in the last ten nights. Tawaf on the ground floor is often impractical at peak times and the upper levels are the sensible choice. Hotel distance matters more in Ramadan than at any other time of year.' },
      { q: 'Can I perform I’tikaf during Ramadan Umrah?', a: 'Many pilgrims do. The Haram authorities set the rules and any permit requirement, and these can change year to year at short notice. Ask your operator for the current position and be wary of anyone guaranteeing access.' },
      { q: 'Is Ramadan Umrah suitable for elderly parents?', a: 'The last ten nights are physically demanding. For pilgrims over seventy the first half of Ramadan, or Rajab, is usually the better choice — the reward of Umrah in Ramadan applies throughout the month, not only at the end.' },
      { q: 'Are Suhoor and Iftar included in Ramadan packages?', a: 'They should be, and on our packages they are, daily at both hotels for the whole stay. Lunch is not included and is not applicable during fasting hours. Check this explicitly — “meals included” is used loosely across this sector.' },
    ],
    related: ['umrah-package-prices', 'umrah-with-elderly-parents', 'first-time-umrah'],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    slug: 'first-time-umrah',
    h1: 'First-time Umrah — a step-by-step guide',
    title: 'First-Time Umrah — Step by Step Guide | Muhammad Travels',
    metaDescription:
      'A complete first-timer’s guide to Umrah from Pakistan: preparation, Ihram, the Miqat, Tawaf, Sa’i and what actually happens on each day of the trip.',
    intent: 'Reassurance',
    answer:
      'Umrah consists of four steps: entering Ihram before the Miqat, performing Tawaf of seven circuits around the Kaaba, performing Sa’i between Safa and Marwah seven times, and completing with halq or taqsir. The rites themselves take a few hours; the rest of the trip is prayer.',
    published: '2026-06-05',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.firstTime,
    readingMinutes: 10,
    needsVerification: true,
    blocks: [
      {
        type: 'p',
        text: 'The most common feeling among first-time pilgrims is not excitement but anxiety about doing something wrong. It is worth saying clearly at the outset: Umrah is four steps, they are straightforward, and you will be doing them alongside a group leader whose job is to make sure you get them right.',
      },
      { type: 'h2', text: 'What are the steps of Umrah?' },
      {
        type: 'list',
        items: [
          'Enter Ihram — the state of consecration — before crossing the Miqat boundary, and make the intention.',
          'Perform Tawaf: seven circuits around the Kaaba, beginning and ending at the Black Stone corner.',
          'Pray two rak’ah after Tawaf, then drink Zamzam.',
          'Perform Sa’i: seven passes between Safa and Marwah, beginning at Safa and ending at Marwah.',
          'Complete with halq (shaving) or taqsir (trimming), which exits the state of Ihram.',
        ],
      },
      {
        type: 'p',
        text: 'That is the whole of it. Performed unhurried it takes roughly three to four hours, longer if the Mataf is busy.',
      },
      { type: 'h2', text: 'What do I need to prepare before I travel?' },
      {
        type: 'checklist',
        items: [
          'Passport valid at least six months beyond travel, handed to your operator against a signed receipt',
          'Vaccinations as required at the time of travel',
          'Two sets of Ihram garments for men; ordinary modest clothing for women',
          'Comfortable, easily removable footwear — you will be taking shoes on and off constantly',
          'Any regular medication in original packaging, with a copy of the prescription',
          'A small bag for shoes to carry into the Haram',
          'Learn the Talbiyah and the basic du’a before you go, rather than reading from a phone in the Mataf',
        ],
      },
      { type: 'h2', text: 'What is Ihram and when do I enter it?' },
      {
        type: 'p',
        text: 'Ihram is a state, not a garment — the clothing is simply its outward sign. You enter it by making the intention and reciting the Talbiyah, and it must be done before you cross the Miqat boundary.',
      },
      {
        type: 'p',
        text: 'Flying from Pakistan, the Miqat is crossed in the air. Most pilgrims change into Ihram clothing at home or at the departure airport and make the intention when the captain announces the approach — this announcement is standard on Umrah flights. If you are connecting through another Pakistani city, enter Ihram at the international departure point, not before the domestic leg.',
      },
      {
        type: 'callout',
        label: 'The most common first-timer mistake',
        text: 'Entering Ihram too early. A pilgrim who changes at home before a four-hour road transfer and a three-hour airport wait spends seven uncomfortable hours under restrictions that had not yet begun to apply. Your group leader will tell you exactly when — ask, and then wait.',
      },
      { type: 'h2', text: 'What is prohibited in Ihram?' },
      {
        type: 'list',
        items: [
          'Cutting hair or nails',
          'Using scented products, including perfumed soap — pack unscented',
          'Covering the head for men, or the face for women',
          'Stitched clothing for men',
          'Hunting, and marital relations',
          'Arguing and quarrelling — explicitly, and worth remembering in a crowd',
        ],
      },
      { type: 'h2', text: 'What actually happens on each day?' },
      {
        type: 'table',
        caption: 'A typical 14-night itinerary',
        head: ['When', 'What happens'],
        rows: [
          ['Day 1', 'Depart, arrive Jeddah, immigration and biometrics, coach to Makkah in Ihram'],
          ['Day 2', 'Umrah performed with the group leader — Tawaf, Sa’i, halq or taqsir'],
          ['Days 3–8', 'Prayer at the Haram; one guided half-day Ziyarat of the Makkah sites'],
          ['Day 9', 'Coach to Madinah, roughly five hours, hotel check-in'],
          ['Days 10–13', 'Prayer at the Prophet’s Mosque; Ziyarat of Quba, Uhud and Qiblatain'],
          ['Day 14', 'Checkout and return flight from Madinah'],
        ],
      },
      { type: 'h2', text: 'What should I expect physically?' },
      {
        type: 'p',
        text: 'More walking than you expect. Five prayers a day at the Haram means ten journeys between hotel and mosque, and the Haram itself is enormous — the walk from the gate to a place in the Mataf can be several hundred metres on its own.',
      },
      {
        type: 'p',
        text: 'This is why hotel distance in metres is the number worth comparing above all others, and why we publish it on every package rather than describing it as "walking distance".',
      },
      {
        type: 'cta',
        href: '/umrah/',
        label: 'See our Umrah packages',
        text: 'Every package names both hotels and publishes the exact distance to the Haram in metres, so you can judge the walk before you book it.',
      },
      { type: 'h2', text: 'What if I make a mistake during the rites?' },
      {
        type: 'p',
        text: 'Most errors are minor and correctable, and some require no correction at all. This is precisely what the group leader is for — ask at the time rather than worrying about it for the rest of the trip. Scholars are also available at both Harams.',
      },
    ],
    faqs: [
      { q: 'What are the steps of Umrah?', a: 'Enter Ihram before the Miqat and make the intention; perform Tawaf of seven circuits around the Kaaba; pray two rak’ah and drink Zamzam; perform Sa’i seven times between Safa and Marwah; complete with halq or taqsir. Performed unhurried, this takes three to four hours.' },
      { q: 'When do I enter Ihram flying from Pakistan?', a: 'Before crossing the Miqat, which happens in the air. Most pilgrims change at home or at the departure airport and make the intention when the captain announces the approach. If you are connecting domestically, enter Ihram at the international departure point, not before the domestic leg.' },
      { q: 'How long does Umrah take?', a: 'The rites themselves take three to four hours, longer if the Mataf is crowded. The trip around them is typically 10 to 14 nights, most of which is prayer at the two Harams rather than ritual obligation.' },
      { q: 'What should I pack for Umrah?', a: 'Two sets of Ihram for men, modest clothing for women, unscented toiletries, comfortable easily-removable shoes, a shoe bag for the Haram, regular medication in original packaging with a prescription copy, and a light bag for daily use.' },
      { q: 'What is prohibited while in Ihram?', a: 'Cutting hair or nails, scented products including perfumed soap, covering the head for men or the face for women, stitched clothing for men, hunting, marital relations, and arguing. Pack unscented soap and shampoo before you travel — this catches most first-timers out.' },
      { q: 'What if I make a mistake during Umrah?', a: 'Most errors are minor and correctable, and some require nothing at all. Ask the group leader at the time rather than worrying afterwards; scholars are also available at both Harams for questions during the rites.' },
      { q: 'How much walking is involved?', a: 'Considerably more than most first-timers expect — five prayers a day means ten journeys between hotel and Haram, and the Haram itself is large enough that the internal walk is several hundred metres. This is why hotel distance in metres is the number worth comparing.' },
    ],
    related: ['umrah-visa-requirements', 'what-to-pack-for-umrah', 'umrah-with-elderly-parents'],
  },

  /* ------------------------------------------------------------------ 08 */
  {
    slug: 'umrah-with-elderly-parents',
    h1: 'Umrah with elderly parents — a practical guide',
    title: 'Umrah with Elderly Parents — Practical Guide | Muhammad Travels',
    metaDescription:
      'How to plan Umrah for parents in their sixties, seventies and beyond: hotel distance, wheelchairs, medication, pacing and the questions to ask an operator.',
    intent: 'Underserved',
    answer:
      'For elderly pilgrims, hotel distance to the Haram matters more than any other factor. Choose accommodation within 250 metres, plan for wheelchair access at both Harams, carry medication in original packaging with prescriptions, and pick cooler months over Ramadan.',
    published: '2026-07-18',
    updated: '2026-08-25',
    author: authors.operations,
    image: guideImages.elderly,
    readingMinutes: 9,
    needsVerification: true,
    blocks: [
      {
        type: 'p',
        text: 'A large share of Umrah pilgrims from Pakistan are over sixty, and a larger share of the people paying for the trip are. Yet almost nothing published in this sector is written for them specifically. This guide is.',
      },
      { type: 'h2', text: 'What matters most when travelling with elderly parents?' },
      {
        type: 'p',
        text: 'Distance to the Haram, and it is not close. Every other consideration — hotel category, meal arrangements, airline — is secondary to how far your parents have to walk, ten times a day, in heat, for two weeks.',
      },
      {
        type: 'table',
        caption: 'What distance actually means in daily walking',
        head: ['Hotel distance', 'Per prayer, return', 'Per day, five prayers'],
        rows: [
          ['850m', '1.7km', 'roughly 8.5km'],
          ['400m', '0.8km', 'roughly 4km'],
          ['250m', '0.5km', 'roughly 2.5km'],
          ['180m', '0.36km', 'roughly 1.8km'],
        ],
      },
      {
        type: 'p',
        text: 'And that is before the walk inside the Haram itself, which can add several hundred metres each way. The difference between an 850-metre hotel and a 250-metre one is, for an eighty-year-old, the difference between attending five prayers a day and attending two.',
      },
      { type: 'h2', text: 'Are wheelchairs available at the Haram?' },
      {
        type: 'p',
        text: 'Yes, at both Harams. Manual wheelchairs are generally available free at ground level, and paid electric wheelchairs and scooters operate on the upper floors and the roof, which is where Tawaf is usually easier for anyone with mobility limits.',
      },
      {
        type: 'p',
            text: 'Tell your operator before booking rather than on arrival — a room near the lifts on a low floor is easy to arrange in advance and difficult to change once the group has checked in.',
      },
      { type: 'h2', text: 'How should we handle medication?' },
      {
        type: 'checklist',
        items: [
          'Carry all medication in original labelled packaging, never decanted into unmarked containers',
          'Bring a copy of the prescription, ideally with generic names as well as brand names',
          'Pack medication in hand luggage, not checked baggage',
          'Bring more than the trip length — flight delays happen',
          'For refrigerated medication, confirm in writing that the hotel room has a working fridge',
          'Carry a short written summary of conditions and current medication, in English',
        ],
      },
      { type: 'h2', text: 'Which months are best for older pilgrims?' },
      {
        type: 'p',
        text: 'The cooler months, without much competition. Makkah in summer is genuinely dangerous for frail pilgrims, and the winter window is both more comfortable and usually cheaper.',
      },
      {
        type: 'p',
        text: 'Ramadan deserves a specific caution. The last ten nights combine fasting, dense crowds, broken sleep and very long nights. For pilgrims over seventy we routinely suggest the first half of Ramadan, or Rajab instead — and we would rather lose the booking than send someone into a situation they cannot manage.',
      },
      {
        type: 'callout',
        label: 'The question to ask an operator',
        text: 'Not "is it suitable for elderly people" — every operator says yes. Ask instead: what is the exact distance in metres from the hotel door to the nearest Haram gate, is the route covered, is there a step-free path, and can you confirm a low floor near the lifts in writing? An operator who answers all four precisely is one worth booking.',
      },
      { type: 'h2', text: 'How should we pace the trip?' },
      {
        type: 'list',
        items: [
          'Do not attempt all five prayers at the Haram every day. Three is a good target; the rest can be prayed at the hotel.',
          'Perform Tawaf on the upper level or the roof, where it is less crowded and the surface is easier.',
          'Schedule Ziyarat early in the trip, before fatigue accumulates, and early in the day.',
          'Build in genuine rest afternoons rather than treating them as wasted time.',
          'Choose a longer package rather than a shorter one — more days means less pressure per day.',
        ],
      },
      { type: 'h2', text: 'What about a wheelchair for Tawaf and Sa’i?' },
      {
        type: 'p',
        text: 'Performing Tawaf and Sa’i in a wheelchair is permitted and common, and attendants can be hired at both Harams for the purpose. Agree the price before starting rather than after — this is a routine transaction but not always a transparently priced one.',
      },
      {
        type: 'cta',
        href: '/umrah/premium/',
        label: 'Packages closest to the Haram',
        text: 'Our premium packages place you 180 metres from Masjid al-Haram and 50 metres from the Prophet’s Mosque — the distances that matter most for older pilgrims.',
      },
    ],
    faqs: [
      { q: 'Is Umrah suitable for elderly parents?', a: 'For most people in reasonable health, yes — provided the hotel is close to the Haram and the trip is paced properly. Distance in metres matters more than any other factor. Wheelchairs are available at both Harams, and Tawaf and Sa’i may be performed seated.' },
      { q: 'How close should the hotel be for an elderly pilgrim?', a: 'Within 250 metres of Masjid al-Haram if possible, and within 100 metres of the Prophet’s Mosque. At 850 metres an elderly pilgrim walks around 8.5km a day across five prayers; at 250 metres that falls to roughly 2.5km.' },
      { q: 'Are wheelchairs available at the Haram?', a: 'Yes at both Harams. Manual wheelchairs are generally free at ground level, and paid electric wheelchairs operate on the upper floors and roof, where Tawaf is usually easier for anyone with mobility limits.' },
      { q: 'Can Tawaf be performed in a wheelchair?', a: 'Yes, and it is common. Attendants can be hired at both Harams to push the wheelchair through Tawaf and Sa’i. Agree the price before starting rather than afterwards.' },
      { q: 'What is the best time of year for elderly pilgrims?', a: 'The cooler winter months. Makkah in summer is genuinely hazardous for frail pilgrims, and winter is usually cheaper as well as more comfortable. Ramadan’s last ten nights are the hardest window of the year and are best avoided over seventy.' },
      { q: 'How should medication be carried?', a: 'In original labelled packaging in hand luggage, with a copy of the prescription using generic names as well as brand names, and in greater quantity than the trip length. For refrigerated medication, confirm the hotel room fridge in writing before booking.' },
      { q: 'Should we book a longer or shorter trip for elderly parents?', a: 'Longer. More days means less pressure to do everything each day, genuine rest afternoons, and the ability to miss a prayer at the Haram without feeling the trip has been wasted. A rushed ten nights is harder than an unhurried twenty-one.' },
    ],
    related: ['ramadan-umrah-guide', 'first-time-umrah', 'umrah-package-prices'],
  },
];

/* ============================================================================
   ACCESSORS
   ========================================================================= */

export const guideSlugs = guides.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Newest first, by last-updated date. */
export const guidesByRecency = [...guides].sort((a, b) =>
  b.updated.localeCompare(a.updated) || b.published.localeCompare(a.published),
);

export function relatedGuides(slug: string): Guide[] {
  const g = getGuide(slug);
  if (!g) return [];
  return g.related.map(getGuide).filter((x): x is Guide => Boolean(x));
}

/** Spec §04: "table of contents for anything over 1,200 words". Approximated
 *  by reading time — anything at 6 minutes or more gets a contents list. */
export function needsToc(guide: Guide): boolean {
  return guide.readingMinutes >= 6;
}

export function tocEntries(guide: Guide): { id: string; text: string }[] {
  return guide.blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'"“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
