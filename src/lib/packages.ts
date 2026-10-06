import type { Img } from './images';
import { hotel, madinah, makkah, departure } from './images';

/* ============================================================================
   PACKAGE RECORDS
   ============================================================================

   Spec §09, "Whichever stack you choose":
     "Package data must live in structured records — hotel name, distance in
      metres, nights, room type, price, validity, departure cities, inclusions,
      exclusions — and every page, card, comparison table and schema block must
      be generated from those records. Prices hardcoded into page markup
      guarantee that within one season the site contradicts itself, and in this
      category a wrong published price is a refund dispute."

   Nothing in this codebase writes a price, a hotel name or a distance into
   markup. Every one of them resolves from this file.

   ⚠️  ALL RECORDS BELOW ARE ILLUSTRATIVE SAMPLE DATA.
   Hotel names are real properties and distances are approximate, but every
   `verified: false` flag means exactly what it says. Spec closing note:
   "Verify all package pricing against current net rates before publication."
   Distance to the Haram in metres is the single most decisive comparison field
   in the category (§04) — measure it, do not estimate it.
   ========================================================================= */

export type Tier = 'economy' | 'standard' | 'premium' | 'ramadan' | 'family';
export type Trip = 'umrah' | 'hajj';

export type Hotel = {
  city: 'Makkah' | 'Madinah';
  name: string;
  stars: number;
  /** Exact walking distance to the Haram gate, in metres. Spec §04. */
  distanceM: number;
  walkMinutes: number;
  roomType: string;
  board: string;
  image: Img;
  /** Set true only once the distance has been physically confirmed. */
  verified: boolean;
};

export type DepartureDate = {
  iso: string;
  label: string;
  /** Spec §04: "Fixed group dates with seats remaining, if genuinely tracked."
   *  null = not tracked, and the UI renders nothing rather than inventing
   *  scarcity. Spec §03 forbids "only 2 seats left" devices that aren't real. */
  seatsLeft: number | null;
};

export type ItineraryDay = { day: string; title: string; detail: string };
export type Faq = { q: string; a: string };

export type Package = {
  slug: string;
  trip: Trip;
  tier: Tier;
  name: string;
  h1: string;
  title: string;
  metaDescription: string;
  /** Spec §09: 40–60 word self-contained answer before any preamble. */
  answer: string;
  summary: string;
  nights: number;
  makkahNights: number;
  madinahNights: number;
  priceFrom: number;
  priceCurrency: 'PKR';
  /** Spec §13 Blocker: "Every price carries a validity date." */
  priceValidUntil: string;
  priceValidUntilLabel: string;
  roomBasis: string;
  airline: string;
  hotels: Hotel[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  departures: DepartureDate[];
  /** City slugs, cross-referenced against src/lib/cities.ts */
  departureCities: string[];
  faqs: Faq[];
  image: Img;
  featured: boolean;
  similar: string[];
};

/* ============================================================================
   SHARED INCLUSION / EXCLUSION SETS
   Spec §04: exclusions are given equal prominence, deliberately.
   ========================================================================= */

const baseIncludes = (opts: {
  airline: string;
  board: string;
  ziyarat: string;
}) => [
  `Return economy airfare — ${opts.airline}`,
  'Umrah visa processed through Nusuk Masar in our own name',
  'Hotel accommodation in Makkah and Madinah as listed above',
  'Airport transfers on arrival and departure (Jeddah / Madinah)',
  'Makkah ⇄ Madinah intercity coach transfer',
  opts.board,
  opts.ziyarat,
  'Zamzam allocation as permitted by the airline',
  'Group leader (mu’allim) accompanying the group throughout',
  'Pre-departure briefing covering rites, health and documentation',
];

const baseExcludes = [
  'Saudi inter-city transport beyond the Makkah ⇄ Madinah transfer',
  'Excess baggage charges above the airline allowance',
  'Meals beyond those explicitly listed above',
  'Mandatory vaccinations and any medical certificates',
  'Travel and medical insurance',
  'Qurbani, personal shopping and laundry',
  'Passport issuance or renewal fees',
  'Anything not listed under “What’s included”',
];

/* ============================================================================
   THE PACKAGES
   ========================================================================= */

export const packages: Package[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: 'umrah-14-nights-economy',
    trip: 'umrah',
    tier: 'economy',
    name: '14-Night Economy Umrah',
    h1: '14-Night Economy Umrah Package',
    title: '14-Night Economy Umrah Package 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 295,000 per person. 14 nights, named 3-star hotels, 850m from Masjid al-Haram. Visa, flights and transfers included. MoRA-licensed operator.',
    answer:
      'Our 14-night Economy Umrah package costs from PKR 295,000 per person and includes return flights, the Nusuk visa, eight nights in Makkah at Al Kiswah Towers 850m from Masjid al-Haram, five nights in Madinah 400m from the Prophet’s Mosque, all transfers and daily breakfast.',
    summary:
      'The straightforward option. Clean, named hotels at a genuine walking distance, no hidden supplements, and every exclusion listed as plainly as every inclusion.',
    nights: 14,
    makkahNights: 9,
    madinahNights: 5,
    priceFrom: 295000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Quad sharing',
    airline: 'Saudia or Airblue',
    hotels: [
      {
        city: 'Makkah',
        name: 'Al Kiswah Towers Hotel',
        stars: 3,
        distanceM: 850,
        walkMinutes: 12,
        roomType: 'Quad sharing, attached bath',
        board: 'Daily breakfast',
        image: hotel.roomTwin,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Al Eiman Royal Hotel',
        stars: 3,
        distanceM: 400,
        walkMinutes: 6,
        roomType: 'Quad sharing, attached bath',
        board: 'Daily breakfast',
        image: hotel.roomModern,
        verified: false,
      },
    ],
    includes: baseIncludes({
      airline: 'Saudia or Airblue, Lahore/Karachi/Islamabad departures',
      board: 'Daily breakfast at both hotels',
      ziyarat: 'Guided Ziyarat in Makkah and Madinah (one half-day in each city)',
    }),
    excludes: baseExcludes,
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival in Jeddah', detail: 'Group assembles at the departure airport three hours before the flight. On arrival at Jeddah, immigration and biometric checks, then coach transfer to the Makkah hotel. Ihram is assumed before crossing the Miqat.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Rested arrival, then the group performs Tawaf and Sa’i together with the group leader. Halq or taqsir completes the Umrah.' },
      { day: 'Days 3–8', title: 'Makkah — prayers and Ziyarat', detail: 'Free days for prayer at the Haram, with one guided half-day Ziyarat covering Jabal al-Noor, Jabal Thawr, Mina and Arafat viewpoints.' },
      { day: 'Day 9', title: 'Transfer to Madinah', detail: 'Morning checkout and coach transfer to Madinah, approximately five hours. Hotel check-in and evening prayer at Al-Masjid an-Nabawi.' },
      { day: 'Days 10–13', title: 'Madinah — the eight-day Arbaeen option', detail: 'Free days for prayer at the Prophet’s Mosque. One guided Ziyarat covering Quba, Uhud and Qiblatain.' },
      { day: 'Day 14', title: 'Return', detail: 'Checkout and transfer to Madinah airport for the return flight.' },
    ],
    departures: [
      { iso: '2026-09-18', label: '18 September 2026', seatsLeft: null },
      { iso: '2026-10-09', label: '9 October 2026', seatsLeft: null },
      { iso: '2026-11-06', label: '6 November 2026', seatsLeft: null },
      { iso: '2026-12-04', label: '4 December 2026', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad', 'multan'],
    faqs: [
      { q: 'What does the PKR 295,000 price actually cover?', a: 'Return economy airfare, the Umrah visa processed through Nusuk Masar, 14 nights of hotel accommodation on quad sharing, all airport and intercity transfers, daily breakfast and guided Ziyarat in both cities. It does not cover meals beyond breakfast, vaccinations, insurance or excess baggage.' },
      { q: 'How far is the Makkah hotel from Masjid al-Haram?', a: 'Al Kiswah Towers is 850 metres from the King Abdul Aziz gate — about a 12-minute walk. A shuttle runs at prayer times. We publish the metre figure rather than the phrase “walking distance” so you can compare it directly against any other operator.' },
      { q: 'Is quad sharing the only room option?', a: 'No. Triple, double and single occupancy are available as supplements. Message us on WhatsApp with your group size and we will quote the exact difference before you commit to anything.' },
      { q: 'How many nights are in Makkah and how many in Madinah?', a: 'Nine nights in Makkah and five nights in Madinah on this itinerary. The split can be adjusted for fixed group departures if the whole group agrees, subject to hotel availability.' },
      { q: 'When do I have to pay, and how much?', a: 'A deposit confirms the seat, with the balance due before visa submission. Full deposit, instalment schedule and cancellation terms are published on our refunds page — read them before you transfer anything, to us or to anyone else.' },
      { q: 'Do you issue the visa yourselves?', a: 'Yes. We hold our own MoRA Umrah attestation and issue visas through Nusuk Masar in our own name. There is no third-party agent between you and the visa, and no commission structure to explain.' },
      { q: 'What happens if the flight schedule changes?', a: 'Airlines occasionally retime seasonal flights. If a departure moves, we notify every booked pilgrim in writing, adjust hotel nights so no night is lost, and absorb the difference where the change is the airline’s.' },
      { q: 'Can I verify that you are a licensed operator?', a: 'Please do. Our registered company name and licence numbers are published on our licence page along with instructions for checking them against the Ministry’s published list of certified operators. Do this for us and for anyone else you are considering.' },
    ],
    image: hotel.roomTwin,
    featured: true,
    similar: ['umrah-10-nights-economy', 'umrah-14-nights-standard', 'umrah-family-14-nights'],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: 'umrah-10-nights-economy',
    trip: 'umrah',
    tier: 'economy',
    name: '10-Night Economy Umrah',
    h1: '10-Night Economy Umrah Package',
    title: '10-Night Economy Umrah Package 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 265,000 per person. 10 nights, named hotels with exact distances, visa and flights included. Licensed MoRA operator — verify our numbers.',
    answer:
      'Our 10-night Economy Umrah package costs from PKR 265,000 per person and includes return flights, the Nusuk visa, six nights in Makkah 850m from Masjid al-Haram, four nights in Madinah 400m from the Prophet’s Mosque, all transfers and daily breakfast.',
    summary:
      'The shortest complete itinerary we run. Enough time in both cities to perform Umrah unhurried, without the cost of a full fortnight.',
    nights: 10,
    makkahNights: 6,
    madinahNights: 4,
    priceFrom: 265000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Quad sharing',
    airline: 'Saudia or Airblue',
    hotels: [
      {
        city: 'Makkah',
        name: 'Al Kiswah Towers Hotel',
        stars: 3,
        distanceM: 850,
        walkMinutes: 12,
        roomType: 'Quad sharing, attached bath',
        board: 'Daily breakfast',
        image: hotel.roomTwin,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Al Eiman Royal Hotel',
        stars: 3,
        distanceM: 400,
        walkMinutes: 6,
        roomType: 'Quad sharing, attached bath',
        board: 'Daily breakfast',
        image: hotel.roomModern,
        verified: false,
      },
    ],
    includes: baseIncludes({
      airline: 'Saudia or Airblue',
      board: 'Daily breakfast at both hotels',
      ziyarat: 'Guided Ziyarat in Makkah and Madinah',
    }),
    excludes: baseExcludes,
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival', detail: 'Assembly at the departure airport, flight to Jeddah, immigration, and coach transfer to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Tawaf and Sa’i performed with the group leader, completing with halq or taqsir.' },
      { day: 'Days 3–5', title: 'Makkah', detail: 'Prayer at the Haram, plus one guided half-day Ziyarat of the Makkah sites.' },
      { day: 'Day 6', title: 'Transfer to Madinah', detail: 'Coach to Madinah, roughly five hours, and check-in before Maghrib where the schedule allows.' },
      { day: 'Days 7–9', title: 'Madinah', detail: 'Prayer at the Prophet’s Mosque and guided Ziyarat covering Quba, Uhud and Qiblatain.' },
      { day: 'Day 10', title: 'Return', detail: 'Checkout and transfer to Madinah airport for the return flight.' },
    ],
    departures: [
      { iso: '2026-09-25', label: '25 September 2026', seatsLeft: null },
      { iso: '2026-10-23', label: '23 October 2026', seatsLeft: null },
      { iso: '2026-11-20', label: '20 November 2026', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad'],
    faqs: [
      { q: 'Is ten nights long enough for Umrah?', a: 'Yes. Umrah itself takes a few hours; the remaining time is for prayer at the two Harams. Ten nights gives six in Makkah and four in Madinah, which is comfortable. If you want the eight-day Arbaeen in Madinah, choose a 14 or 21-night package instead.' },
      { q: 'How far are the hotels from the Haram?', a: 'Al Kiswah Towers in Makkah is 850 metres from the King Abdul Aziz gate, about 12 minutes on foot. Al Eiman Royal in Madinah is 400 metres from the Prophet’s Mosque, about six minutes.' },
      { q: 'What is not included in the price?', a: 'Meals beyond daily breakfast, vaccinations, insurance, excess baggage, Saudi inter-city travel beyond the Makkah–Madinah transfer, and personal expenses. The full exclusions list is published on this page with the same prominence as the inclusions.' },
      { q: 'Which airline do you use?', a: 'Saudia or Airblue depending on the departure date and city. The exact carrier and routing is confirmed in writing before you pay the balance, never after.' },
      { q: 'Can I extend my stay?', a: 'Often yes, subject to the visa validity and seat availability on a later return. Ask before booking rather than after — changing a ticket already issued costs considerably more.' },
      { q: 'Do you take cash payments?', a: 'We issue a receipt for every payment and prefer bank transfer to the company account. Be cautious of any operator — including us — who asks for cash with no receipt. That is one of the clearest fraud signals in this sector.' },
    ],
    image: madinah.courtyard,
    featured: false,
    similar: ['umrah-14-nights-economy', 'umrah-14-nights-standard'],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: 'umrah-14-nights-standard',
    trip: 'umrah',
    tier: 'standard',
    name: '14-Night Standard Umrah',
    h1: '14-Night Standard Umrah Package',
    title: '14-Night Standard Umrah Package 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 385,000 per person. 4-star hotels 250m from Masjid al-Haram, triple sharing, visa and flights included. Verify our MoRA licence before you book.',
    answer:
      'Our 14-night Standard Umrah package costs from PKR 385,000 per person and includes return flights, the Nusuk visa, nine nights at Hilton Suites Makkah 250m from Masjid al-Haram, five nights at Dar Al Taqwa Madinah 100m from the Prophet’s Mosque, transfers and daily breakfast.',
    summary:
      'The package most of our pilgrims choose. Four-star hotels close enough to walk to every prayer, on triple sharing, with the Madinah hotel effectively on the mosque courtyard.',
    nights: 14,
    makkahNights: 9,
    madinahNights: 5,
    priceFrom: 385000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Triple sharing',
    airline: 'Saudia',
    hotels: [
      {
        city: 'Makkah',
        name: 'Hilton Suites Makkah',
        stars: 4,
        distanceM: 250,
        walkMinutes: 4,
        roomType: 'Triple sharing, Haram-side wing subject to availability',
        board: 'Daily breakfast',
        image: hotel.roomWarm,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Dar Al Taqwa Hotel',
        stars: 5,
        distanceM: 100,
        walkMinutes: 2,
        roomType: 'Triple sharing',
        board: 'Daily breakfast',
        image: hotel.roomView,
        verified: false,
      },
    ],
    includes: baseIncludes({
      airline: 'Saudia, direct where the routing allows',
      board: 'Daily breakfast at both hotels',
      ziyarat: 'Guided Ziyarat in Makkah and Madinah with an Urdu-speaking guide',
    }),
    excludes: baseExcludes,
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival in Jeddah', detail: 'Group assembly, flight to Jeddah, immigration and biometrics, coach to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Tawaf and Sa’i with the group leader. Because the hotel is 250 metres out, the group walks rather than waits for a shuttle.' },
      { day: 'Days 3–8', title: 'Makkah', detail: 'Free for prayer at the Haram, with a guided half-day Ziyarat covering Jabal al-Noor, Jabal Thawr, Mina, Muzdalifah and Arafat.' },
      { day: 'Day 9', title: 'Transfer to Madinah', detail: 'Morning coach to Madinah. Dar Al Taqwa is on the mosque’s eastern courtyard, so check-in is a two-minute walk from the Haram.' },
      { day: 'Days 10–13', title: 'Madinah', detail: 'Prayer at the Prophet’s Mosque, plus guided Ziyarat of Quba, Uhud, Qiblatain and the date markets.' },
      { day: 'Day 14', title: 'Return', detail: 'Checkout and transfer to Prince Mohammad bin Abdulaziz airport for the return flight.' },
    ],
    departures: [
      { iso: '2026-09-11', label: '11 September 2026', seatsLeft: null },
      { iso: '2026-10-02', label: '2 October 2026', seatsLeft: null },
      { iso: '2026-10-30', label: '30 October 2026', seatsLeft: null },
      { iso: '2026-11-27', label: '27 November 2026', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad', 'multan', 'faisalabad', 'peshawar'],
    faqs: [
      { q: 'What is the difference between Economy and Standard?', a: 'Distance and room occupancy, mainly. Standard puts you 250 metres from Masjid al-Haram instead of 850, and 100 metres from the Prophet’s Mosque instead of 400, on triple sharing rather than quad. The itinerary, visa process and inclusions are otherwise identical.' },
      { q: 'How far is Hilton Suites Makkah from the Haram?', a: '250 metres to the nearest gate — roughly a four-minute walk. For pilgrims praying five times a day for nine days, that difference against an 850-metre hotel is about two hours of walking a day.' },
      { q: 'Is Dar Al Taqwa really 100 metres from the Prophet’s Mosque?', a: 'Yes. It sits on the eastern courtyard. In practice you leave the lobby and you are on the marble. This is the single strongest feature of this package for older pilgrims.' },
      { q: 'Can we book a double room instead of triple?', a: 'Yes, as a per-person supplement. Message us with your names and we will quote it exactly. We do not add supplements after booking.' },
      { q: 'Are meals included beyond breakfast?', a: 'No. Daily breakfast is included at both hotels; lunch and dinner are not. Both hotels sit in dense food districts where a meal costs roughly SAR 20–40. We list this as an exclusion rather than leaving you to discover it.' },
      { q: 'How much luggage can I take?', a: 'The airline allowance applies — typically 2 × 23kg checked on Saudia, but confirm against your issued ticket. Excess baggage is charged by the airline at the airport and is not included in the package.' },
      { q: 'Who accompanies the group?', a: 'A group leader travels with the group throughout and stays in the same hotels. For Ziyarat we use an Urdu-speaking guide in both cities.' },
      { q: 'How do I verify your licence before paying?', a: 'Our registered company name, Umrah attestation number and HGO registration number are published on our licence page, with instructions for checking each against the Ministry’s published certified-operator list. Verify before you transfer money — to us or to anyone.' },
    ],
    image: hotel.roomWarm,
    featured: true,
    similar: ['umrah-14-nights-economy', 'umrah-14-nights-premium', 'umrah-21-nights-standard'],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: 'umrah-21-nights-standard',
    trip: 'umrah',
    tier: 'standard',
    name: '21-Night Standard Umrah',
    h1: '21-Night Standard Umrah Package',
    title: '21-Night Standard Umrah Package 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 445,000 per person. Three weeks across Makkah and Madinah, 4-star hotels, the eight-day Arbaeen included. Licensed MoRA operator.',
    answer:
      'Our 21-night Standard Umrah package costs from PKR 445,000 per person. Thirteen nights in Makkah at Hilton Suites, 250m from Masjid al-Haram, and eight nights in Madinah at Dar Al Taqwa, 100m from the Prophet’s Mosque — long enough to complete the eight-day Arbaeen.',
    summary:
      'Three weeks, with eight full nights in Madinah so the Arbaeen — forty consecutive prayers at the Prophet’s Mosque — is actually achievable rather than nearly achievable.',
    nights: 21,
    makkahNights: 13,
    madinahNights: 8,
    priceFrom: 445000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Triple sharing',
    airline: 'Saudia',
    hotels: [
      {
        city: 'Makkah',
        name: 'Hilton Suites Makkah',
        stars: 4,
        distanceM: 250,
        walkMinutes: 4,
        roomType: 'Triple sharing',
        board: 'Daily breakfast',
        image: hotel.roomWarm,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Dar Al Taqwa Hotel',
        stars: 5,
        distanceM: 100,
        walkMinutes: 2,
        roomType: 'Triple sharing',
        board: 'Daily breakfast',
        image: hotel.roomView,
        verified: false,
      },
    ],
    includes: baseIncludes({
      airline: 'Saudia',
      board: 'Daily breakfast at both hotels',
      ziyarat: 'Guided Ziyarat in Makkah and Madinah, plus a second Madinah Ziyarat on longer stays',
    }),
    excludes: baseExcludes,
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival', detail: 'Flight to Jeddah, immigration, coach to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Tawaf and Sa’i performed with the group leader.' },
      { day: 'Days 3–12', title: 'Makkah', detail: 'Ten free days for prayer at the Haram, with a guided Ziyarat and the option of a second Umrah from the Masjid Aisha Miqat.' },
      { day: 'Day 13', title: 'Transfer to Madinah', detail: 'Morning coach to Madinah and check-in at Dar Al Taqwa.' },
      { day: 'Days 14–20', title: 'Madinah — the Arbaeen', detail: 'Seven full days, enough for forty consecutive prayers at the Prophet’s Mosque. Guided Ziyarat of Quba, Uhud and Qiblatain.' },
      { day: 'Day 21', title: 'Return', detail: 'Checkout and transfer to Madinah airport.' },
    ],
    departures: [
      { iso: '2026-09-11', label: '11 September 2026', seatsLeft: null },
      { iso: '2026-10-16', label: '16 October 2026', seatsLeft: null },
      { iso: '2026-11-13', label: '13 November 2026', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad', 'faisalabad'],
    faqs: [
      { q: 'What is the Arbaeen and does this package allow it?', a: 'The Arbaeen is forty consecutive prayers at Al-Masjid an-Nabawi without missing one, which takes eight days. This package includes eight nights in Madinah specifically so it is achievable, allowing for arrival and departure timings.' },
      { q: 'Is 21 nights better value than 14?', a: 'Per night, yes. The airfare and visa cost the same whether you stay ten nights or twenty-one, so the additional week costs only the hotel and food. Compare the per-night figures rather than the headline prices.' },
      { q: 'Can I perform a second Umrah?', a: 'Yes. Pilgrims commonly perform a second Umrah on behalf of a deceased relative by entering Ihram again at the Masjid Aisha Miqat in Tan’eem. The group leader arranges transport; the cost is nominal and not included.' },
      { q: 'Is three weeks difficult for older pilgrims?', a: 'It is usually easier than a short trip, not harder — there is no pressure to fit everything in, and both hotels are close enough that no one is walking long distances. Tell us about mobility needs when you enquire so we can allocate a lower floor and a closer room.' },
      { q: 'What is the room occupancy?', a: 'Triple sharing as standard. Double and single occupancy are available as supplements, quoted exactly before booking.' },
      { q: 'Does the visa cover 21 nights?', a: 'Yes. Umrah visas issued through Nusuk Masar permit a stay well beyond three weeks. We confirm the exact validity on your issued visa before departure.' },
    ],
    image: madinah.canopies,
    featured: false,
    similar: ['umrah-14-nights-standard', 'umrah-14-nights-premium'],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: 'umrah-14-nights-premium',
    trip: 'umrah',
    tier: 'premium',
    name: '14-Night Premium Umrah',
    h1: '14-Night Premium Umrah Package',
    title: '14-Night Premium Umrah Package 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 695,000 per person. Swissôtel Al Maqam 180m from Masjid al-Haram, Mövenpick Madinah 50m from the Prophet’s Mosque. Double occupancy, direct flights.',
    answer:
      'Our 14-night Premium Umrah package costs from PKR 695,000 per person on double occupancy. Nine nights at Swissôtel Al Maqam, 180m from Masjid al-Haram, and five nights at Anwar Al Madinah Mövenpick, 50m from the Prophet’s Mosque, with direct flights and private transfers.',
    summary:
      'The closest we go. Both hotels are inside the Haram complexes rather than near them — 180 metres in Makkah and 50 metres in Madinah — on double occupancy, with private rather than coach transfers.',
    nights: 14,
    makkahNights: 9,
    madinahNights: 5,
    priceFrom: 695000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Double occupancy',
    airline: 'Saudia — direct',
    hotels: [
      {
        city: 'Makkah',
        name: 'Swissôtel Al Maqam Makkah',
        stars: 5,
        distanceM: 180,
        walkMinutes: 3,
        roomType: 'Double occupancy, Haram-facing subject to availability',
        board: 'Daily breakfast and dinner',
        image: hotel.roomSuite,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Anwar Al Madinah Mövenpick',
        stars: 5,
        distanceM: 50,
        walkMinutes: 1,
        roomType: 'Double occupancy',
        board: 'Daily breakfast and dinner',
        image: hotel.roomOrnate,
        verified: false,
      },
    ],
    includes: [
      'Return direct economy airfare — Saudia',
      'Umrah visa processed through Nusuk Masar in our own name',
      'Swissôtel Al Maqam, Makkah — 9 nights, 180m from Masjid al-Haram',
      'Anwar Al Madinah Mövenpick — 5 nights, 50m from Al-Masjid an-Nabawi',
      'Private air-conditioned vehicle for all airport and intercity transfers',
      'Daily breakfast and dinner at both hotels',
      'Guided Ziyarat in Makkah and Madinah in a private vehicle',
      'Zamzam allocation as permitted by the airline',
      'Dedicated group leader and 24-hour in-country contact number',
      'Pre-departure briefing covering rites, health and documentation',
    ],
    excludes: [
      'Saudi inter-city transport beyond the itinerary',
      'Excess baggage charges above the airline allowance',
      'Lunch on all days',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Haram-view room supplement, where requested',
      'Personal shopping, laundry and telephone charges',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival in Jeddah', detail: 'Direct Saudia flight, immigration and biometrics, then private vehicle to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'At 180 metres the group walks to the Haram directly from the hotel. Tawaf and Sa’i with the group leader.' },
      { day: 'Days 3–8', title: 'Makkah', detail: 'Free days for prayer, with private-vehicle Ziyarat covering Jabal al-Noor, Jabal Thawr, Mina, Muzdalifah and Arafat.' },
      { day: 'Day 9', title: 'Transfer to Madinah', detail: 'Private vehicle to Madinah with a rest stop. Check-in at the Mövenpick, on the mosque’s southern piazza.' },
      { day: 'Days 10–13', title: 'Madinah', detail: 'Prayer at the Prophet’s Mosque a minute from the lobby. Private Ziyarat of Quba, Uhud and Qiblatain.' },
      { day: 'Day 14', title: 'Return', detail: 'Checkout and private transfer to Madinah airport for the direct return flight.' },
    ],
    departures: [
      { iso: '2026-09-11', label: '11 September 2026', seatsLeft: null },
      { iso: '2026-10-09', label: '9 October 2026', seatsLeft: null },
      { iso: '2026-11-13', label: '13 November 2026', seatsLeft: null },
      { iso: '2026-12-11', label: '11 December 2026', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad'],
    faqs: [
      { q: 'What makes this package premium?', a: 'Distance, occupancy and transfers. Swissôtel Al Maqam is 180 metres from Masjid al-Haram and the Mövenpick is 50 metres from the Prophet’s Mosque; rooms are double occupancy; transfers are private vehicles rather than group coaches; and dinner is included as well as breakfast.' },
      { q: 'Is Swissôtel Al Maqam really 180 metres from the Haram?', a: 'Yes — it sits within the Abraj Al Bait complex on the southern side. The walk to the King Abdul Aziz gate is roughly three minutes, entirely under cover. For pilgrims praying five times daily in summer heat, this is the difference the package is actually buying.' },
      { q: 'Do I get a Haram-view room?', a: 'Not automatically. Haram-facing rooms carry a supplement at both properties and are subject to availability on the date. We quote it separately rather than implying it is included — that is a common way this category is oversold.' },
      { q: 'Is the flight direct?', a: 'Yes, on the departures listed. Direct Saudia service from Lahore, Karachi and Islamabad. If a seasonal retiming forces a connection we tell you before you pay the balance and adjust the price.' },
      { q: 'What are the transfers?', a: 'Private air-conditioned vehicles for airport arrival, the Makkah–Madinah leg, Ziyarat in both cities and the return. You do not wait for a coach to fill.' },
      { q: 'Is this suitable for elderly parents?', a: 'It is the package we most often recommend for pilgrims over sixty-five, precisely because of the distances. Tell us about wheelchair needs, dialysis schedules or medication storage when you enquire and we will confirm in writing what the hotels can accommodate.' },
      { q: 'Can I upgrade from Standard after booking?', a: 'Subject to availability, yes, and we charge only the genuine difference in cost. Ask early — the closest hotels sell out first and the price rises as the date approaches.' },
      { q: 'Does the price include Qurbani or gifts?', a: 'No. Qurbani is not part of Umrah and is not included. Nothing on this page is included unless it appears in the inclusions list.' },
    ],
    image: hotel.roomSuite,
    featured: true,
    similar: ['umrah-10-nights-premium', 'umrah-14-nights-standard', 'umrah-ramadan-last-ten-nights'],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: 'umrah-10-nights-premium',
    trip: 'umrah',
    tier: 'premium',
    name: '10-Night Premium Umrah',
    h1: '10-Night Premium Umrah Package',
    title: '10-Night Premium Umrah Package 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 585,000 per person. Pullman ZamZam 200m from Masjid al-Haram, Mövenpick Madinah 50m from the Prophet’s Mosque. Ten nights, double occupancy.',
    answer:
      'Our 10-night Premium Umrah package costs from PKR 585,000 per person on double occupancy. Six nights at Pullman ZamZam Makkah, 200m from Masjid al-Haram, and four nights at Anwar Al Madinah Mövenpick, 50m from the Prophet’s Mosque, with private transfers throughout.',
    summary:
      'Premium hotels on a shorter itinerary, for pilgrims who cannot take a fortnight away but will not trade distance to the Haram for it.',
    nights: 10,
    makkahNights: 6,
    madinahNights: 4,
    priceFrom: 585000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Double occupancy',
    airline: 'Saudia — direct',
    hotels: [
      {
        city: 'Makkah',
        name: 'Pullman ZamZam Makkah',
        stars: 5,
        distanceM: 200,
        walkMinutes: 3,
        roomType: 'Double occupancy',
        board: 'Daily breakfast and dinner',
        image: hotel.roomModern,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Anwar Al Madinah Mövenpick',
        stars: 5,
        distanceM: 50,
        walkMinutes: 1,
        roomType: 'Double occupancy',
        board: 'Daily breakfast and dinner',
        image: hotel.roomOrnate,
        verified: false,
      },
    ],
    includes: [
      'Return direct economy airfare — Saudia',
      'Umrah visa processed through Nusuk Masar in our own name',
      'Pullman ZamZam Makkah — 6 nights, 200m from Masjid al-Haram',
      'Anwar Al Madinah Mövenpick — 4 nights, 50m from Al-Masjid an-Nabawi',
      'Private air-conditioned vehicle for all transfers',
      'Daily breakfast and dinner at both hotels',
      'Guided Ziyarat in Makkah and Madinah',
      'Dedicated group leader and 24-hour in-country contact number',
    ],
    excludes: [
      'Saudi inter-city transport beyond the itinerary',
      'Excess baggage charges above the airline allowance',
      'Lunch on all days',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Haram-view room supplement, where requested',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival', detail: 'Direct flight to Jeddah, private vehicle to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Tawaf and Sa’i with the group leader, a three-minute walk from the hotel.' },
      { day: 'Days 3–5', title: 'Makkah', detail: 'Free for prayer, with private-vehicle Ziyarat of the Makkah sites.' },
      { day: 'Day 6', title: 'Transfer to Madinah', detail: 'Private vehicle to Madinah and check-in at the Mövenpick.' },
      { day: 'Days 7–9', title: 'Madinah', detail: 'Prayer at the Prophet’s Mosque and private Ziyarat of Quba, Uhud and Qiblatain.' },
      { day: 'Day 10', title: 'Return', detail: 'Checkout and private transfer to Madinah airport.' },
    ],
    departures: [
      { iso: '2026-09-25', label: '25 September 2026', seatsLeft: null },
      { iso: '2026-10-23', label: '23 October 2026', seatsLeft: null },
      { iso: '2026-11-27', label: '27 November 2026', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad'],
    faqs: [
      { q: 'How close is Pullman ZamZam to the Haram?', a: '200 metres to the King Abdul Aziz gate — about three minutes on foot, under cover for most of the route. It sits in the Abraj Al Bait complex directly opposite the mosque.' },
      { q: 'Why is this only slightly cheaper than the 14-night premium?', a: 'Because airfare and the visa are fixed costs regardless of length. You are saving four hotel nights, not four nights of everything. If your dates are flexible, the 14-night package is materially better value per night.' },
      { q: 'Is dinner really included?', a: 'Yes, at both hotels, alongside breakfast. Lunch is not — we list it as an exclusion rather than leaving it ambiguous.' },
      { q: 'Can we choose our own room-mate?', a: 'Yes. Double occupancy means two to a room and you tell us who shares with whom. Single occupancy is available as a supplement.' },
      { q: 'What if I need a wheelchair at the Haram?', a: 'Wheelchairs are available at both Harams, free at ground level and paid for the upper floors. The group leader arranges this. Tell us in advance so we can allocate a room close to the lifts.' },
      { q: 'Is travel insurance included?', a: 'No. It is listed as an exclusion. We strongly recommend it for pilgrims over sixty and can point you to providers, but we do not sell it and take no commission on it.' },
    ],
    image: makkah.clockTower,
    featured: false,
    similar: ['umrah-14-nights-premium', 'umrah-14-nights-standard'],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    slug: 'umrah-ramadan-last-ten-nights',
    trip: 'umrah',
    tier: 'ramadan',
    name: 'Ramadan Umrah — Last Ten Nights',
    h1: 'Ramadan Umrah Package — The Last Ten Nights',
    title: 'Ramadan Umrah Package 2027 — Last Ten Nights | Muhammad Travels',
    metaDescription:
      'From PKR 615,000 per person. The last ten nights of Ramadan 1448 in Makkah and Madinah, including Laylat al-Qadr. Named hotels, exact distances, licensed operator.',
    answer:
      'Our last-ten-nights Ramadan Umrah package costs from PKR 615,000 per person and covers the final ten nights of Ramadan 1448 — including Laylat al-Qadr — with seven nights in Makkah 250m from Masjid al-Haram and five nights in Madinah 100m from the Prophet’s Mosque.',
    summary:
      'The most sought-after ten nights of the Islamic year, and the ones that sell out first. Book this in autumn, not in Ramadan — by then the close hotels are long gone.',
    nights: 12,
    makkahNights: 7,
    madinahNights: 5,
    priceFrom: 615000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-12-31',
    priceValidUntilLabel: '31 December 2026',
    roomBasis: 'Triple sharing',
    airline: 'Saudia',
    hotels: [
      {
        city: 'Makkah',
        name: 'Hilton Suites Makkah',
        stars: 4,
        distanceM: 250,
        walkMinutes: 4,
        roomType: 'Triple sharing',
        board: 'Suhoor and Iftar daily',
        image: hotel.roomWarm,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Dar Al Taqwa Hotel',
        stars: 5,
        distanceM: 100,
        walkMinutes: 2,
        roomType: 'Triple sharing',
        board: 'Suhoor and Iftar daily',
        image: hotel.roomView,
        verified: false,
      },
    ],
    includes: [
      'Return economy airfare — Saudia',
      'Umrah visa processed through Nusuk Masar in our own name',
      'Hilton Suites Makkah — 7 nights, 250m from Masjid al-Haram',
      'Dar Al Taqwa Madinah — 5 nights, 100m from Al-Masjid an-Nabawi',
      'Suhoor and Iftar daily at both hotels throughout Ramadan',
      'All airport and Makkah ⇄ Madinah transfers',
      'Guided Ziyarat in Makkah and Madinah, scheduled around fasting hours',
      'Group leader accompanying the group throughout',
      'Pre-departure briefing covering Ramadan-specific timings and health',
    ],
    excludes: [
      'Lunch — not applicable during fasting hours',
      'Saudi inter-city transport beyond the itinerary',
      'Excess baggage charges above the airline allowance',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'I’tikaf permits, where these are required by the Haram authorities',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival', detail: 'Flight to Jeddah timed to arrive before Iftar where the schedule allows. Coach to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Umrah performed after Fajr or after Taraweeh, when the Mataf is least crowded. The group leader advises on the day.' },
      { day: 'Days 3–7', title: 'Makkah — the last ten nights', detail: 'Taraweeh and Qiyam at the Haram nightly. Suhoor and Iftar at the hotel. Days are kept free for rest, which in Ramadan matters more than sightseeing.' },
      { day: 'Day 8', title: 'Transfer to Madinah', detail: 'Daytime coach to Madinah, timed to arrive well before Iftar.' },
      { day: 'Days 9–11', title: 'Madinah', detail: 'Taraweeh and Qiyam at the Prophet’s Mosque. Ziyarat scheduled in the early morning to avoid the heat of a fasting afternoon.' },
      { day: 'Day 12', title: 'Return', detail: 'Checkout and transfer to Madinah airport.' },
    ],
    departures: [
      { iso: '2027-02-25', label: 'Late February 2027 — subject to moon sighting', seatsLeft: null },
      { iso: '2027-02-27', label: 'Late February 2027 — second group', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad', 'multan', 'faisalabad'],
    faqs: [
      { q: 'When exactly does this package depart?', a: 'The last ten nights of Ramadan 1448 fall in late February and early March 2027, but the exact dates depend on the moon sighting. We publish an indicative departure and confirm the exact date in writing as soon as the Saudi announcement is made.' },
      { q: 'Does this package include Laylat al-Qadr?', a: 'It covers all of the last ten nights, which is when Laylat al-Qadr falls. No one can tell you which night it is; the point of the last ten nights is to be present for all of them.' },
      { q: 'Why is Ramadan Umrah more expensive?', a: 'Hotel rates near both Harams rise sharply for Ramadan, and airlines price the window accordingly. The increase is in our net cost, not in our margin. If budget is the constraint, Rajab and Shaban offer a very similar experience at close to ordinary rates.' },
      { q: 'When should I book?', a: 'Four to five months ahead. The hotels within 300 metres of the Haram sell their Ramadan allocation first, and by the time Ramadan begins the only rooms left are a kilometre out at a higher price than the close ones cost in October.' },
      { q: 'Are Suhoor and Iftar included?', a: 'Yes, both, daily, at both hotels for the whole stay. Lunch is not — nobody is eating lunch. We say this explicitly because “meals included” is used loosely across this sector.' },
      { q: 'Can I perform I’tikaf?', a: 'Many pilgrims do. The Haram authorities set the rules and any permit requirement each year, and these can change at short notice. We will tell you what the current position is at the pre-departure briefing, and we do not promise access we cannot guarantee.' },
      { q: 'How crowded is the Haram in the last ten nights?', a: 'Extremely. Tawaf on the ground floor can be impractical at peak times and the upper levels or the roof are often the sensible choice. This is precisely why a hotel 250 metres away matters more in Ramadan than at any other time of year.' },
      { q: 'Is this suitable for elderly pilgrims?', a: 'It is demanding — long nights, dense crowds and fasting. For pilgrims over seventy we usually suggest the first twenty days of Ramadan, or Rajab instead. We will give you an honest answer about a specific person if you tell us their situation.' },
    ],
    image: madinah.night,
    featured: true,
    similar: ['umrah-ramadan-full-month', 'umrah-14-nights-premium', 'umrah-14-nights-standard'],
  },

  /* ------------------------------------------------------------------ 08 */
  {
    slug: 'umrah-ramadan-full-month',
    trip: 'umrah',
    tier: 'ramadan',
    name: 'Ramadan Umrah — Full Month',
    h1: 'Full-Month Ramadan Umrah Package',
    title: 'Full Month Ramadan Umrah Package 2027 | Muhammad Travels',
    metaDescription:
      'From PKR 745,000 per person. The complete month of Ramadan 1448 in Makkah and Madinah with Suhoor and Iftar daily. Licensed MoRA operator — verify our numbers.',
    answer:
      'Our full-month Ramadan Umrah package costs from PKR 745,000 per person and covers the entire month of Ramadan 1448 across Makkah and Madinah, with Suhoor and Iftar included daily, 4-star hotels within 250 metres of each Haram, and the last ten nights in Makkah.',
    summary:
      'The whole month. Twenty-one nights in Makkah covering the last ten, then Eid and the closing week in Madinah — the itinerary pilgrims plan years around.',
    nights: 30,
    makkahNights: 21,
    madinahNights: 9,
    priceFrom: 745000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-12-31',
    priceValidUntilLabel: '31 December 2026',
    roomBasis: 'Triple sharing',
    airline: 'Saudia',
    hotels: [
      {
        city: 'Makkah',
        name: 'Hilton Suites Makkah',
        stars: 4,
        distanceM: 250,
        walkMinutes: 4,
        roomType: 'Triple sharing',
        board: 'Suhoor and Iftar daily',
        image: hotel.roomWarm,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Dar Al Taqwa Hotel',
        stars: 5,
        distanceM: 100,
        walkMinutes: 2,
        roomType: 'Triple sharing',
        board: 'Suhoor and Iftar daily',
        image: hotel.roomView,
        verified: false,
      },
    ],
    includes: [
      'Return economy airfare — Saudia',
      'Umrah visa processed through Nusuk Masar in our own name',
      'Hilton Suites Makkah — 21 nights, 250m from Masjid al-Haram',
      'Dar Al Taqwa Madinah — 9 nights, 100m from Al-Masjid an-Nabawi',
      'Suhoor and Iftar daily throughout the month',
      'All airport and Makkah ⇄ Madinah transfers',
      'Guided Ziyarat in both cities, scheduled around fasting hours',
      'Group leader resident with the group for the full month',
    ],
    excludes: [
      'Lunch — not applicable during fasting hours',
      'Eid al-Fitr celebration meals beyond the hotel’s provision',
      'Saudi inter-city transport beyond the itinerary',
      'Excess baggage charges above the airline allowance',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival', detail: 'Flight to Jeddah before the start of Ramadan, coach to Makkah in Ihram.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Umrah performed with the group leader before the month begins in earnest.' },
      { day: 'Days 3–11', title: 'Makkah — the first third', detail: 'Taraweeh nightly. The Haram is busy but manageable at this point in the month. Guided Ziyarat scheduled in this window rather than later.' },
      { day: 'Days 12–21', title: 'Makkah — the last ten nights', detail: 'Qiyam nightly. Days kept clear for rest. The group leader advises daily on the least crowded Tawaf timings.' },
      { day: 'Day 22', title: 'Eid al-Fitr and transfer to Madinah', detail: 'Eid prayer at the Haram, then coach to Madinah.' },
      { day: 'Days 23–29', title: 'Madinah', detail: 'The closing week at the Prophet’s Mosque, with Ziyarat of Quba, Uhud and Qiblatain.' },
      { day: 'Day 30', title: 'Return', detail: 'Checkout and transfer to Madinah airport.' },
    ],
    departures: [
      { iso: '2027-02-05', label: 'Early February 2027 — subject to moon sighting', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad'],
    faqs: [
      { q: 'Does this cover the whole of Ramadan?', a: 'Yes — thirty nights spanning the full month, including the last ten nights in Makkah and Eid al-Fitr at the Haram, followed by the closing week in Madinah.' },
      { q: 'When are the exact dates?', a: 'Ramadan 1448 is expected to begin in early February 2027, but the start depends on the moon sighting. We publish an indicative date and confirm in writing the moment the announcement is made. Any operator giving you a guaranteed date months ahead is guessing.' },
      { q: 'Is a full month realistic for a working person?', a: 'For most people, no — which is why the last-ten-nights package exists. This itinerary suits retired pilgrims, and families who plan a year or more ahead.' },
      { q: 'Where do we spend Eid?', a: 'Eid prayer is at Masjid al-Haram in Makkah, with the transfer to Madinah later that day. Some groups prefer Eid in Madinah; tell us at the time of booking and we will tell you honestly whether the coach schedule allows it.' },
      { q: 'Are Suhoor and Iftar included every day?', a: 'Yes, at both hotels, for all thirty nights. Lunch is not included and is not relevant during fasting hours.' },
      { q: 'Can I break the trip and return early?', a: 'The return flight is fixed and changing it is expensive. If you are unsure about a full month, book the last ten nights instead — extending is far easier than shortening.' },
    ],
    image: madinah.dusk,
    featured: false,
    similar: ['umrah-ramadan-last-ten-nights', 'umrah-21-nights-standard'],
  },

  /* ------------------------------------------------------------------ 09 */
  {
    slug: 'umrah-family-14-nights',
    trip: 'umrah',
    tier: 'family',
    name: '14-Night Family Umrah',
    h1: '14-Night Family Umrah Package',
    title: 'Family Umrah Package from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'From PKR 355,000 per person. Connecting family rooms, 4-star hotels 250m from Masjid al-Haram, children under 12 at a reduced rate. Licensed MoRA operator.',
    answer:
      'Our 14-night Family Umrah package costs from PKR 355,000 per person and is built around connecting rooms, a 250-metre walk to Masjid al-Haram, a 100-metre walk to the Prophet’s Mosque, and reduced rates for children under twelve sharing with parents.',
    summary:
      'Built for families travelling with children and grandparents together: connecting rooms, short walks, and a schedule that does not assume everybody can keep the same pace.',
    nights: 14,
    makkahNights: 9,
    madinahNights: 5,
    priceFrom: 355000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Family rooms — two adults plus two children',
    airline: 'Saudia',
    hotels: [
      {
        city: 'Makkah',
        name: 'Hilton Suites Makkah',
        stars: 4,
        distanceM: 250,
        walkMinutes: 4,
        roomType: 'Family room or connecting twins',
        board: 'Daily breakfast',
        image: hotel.roomFamily,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Dar Al Taqwa Hotel',
        stars: 5,
        distanceM: 100,
        walkMinutes: 2,
        roomType: 'Family room or connecting twins',
        board: 'Daily breakfast',
        image: hotel.roomView,
        verified: false,
      },
    ],
    includes: [
      'Return economy airfare — Saudia',
      'Umrah visas for the whole family, processed through Nusuk Masar in our own name',
      'Hilton Suites Makkah — 9 nights, 250m from Masjid al-Haram',
      'Dar Al Taqwa Madinah — 5 nights, 100m from Al-Masjid an-Nabawi',
      'Family or connecting rooms — allocated together, not scattered across floors',
      'Daily breakfast at both hotels',
      'All airport and Makkah ⇄ Madinah transfers',
      'Guided Ziyarat at a pace that works with children and older relatives',
      'Reduced rate for children under 12 sharing with two adults',
      'Group leader accompanying the group throughout',
    ],
    excludes: [
      'Infant seats or bassinets where the airline charges for them',
      'Saudi inter-city transport beyond the itinerary',
      'Excess baggage charges above the airline allowance',
      'Meals beyond daily breakfast',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Pushchair hire and wheelchair hire at the Haram upper levels',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Departure and arrival', detail: 'Family assembly at the departure airport. Flight to Jeddah, immigration, coach to Makkah. Adults enter Ihram before the Miqat.' },
      { day: 'Day 2', title: 'First Umrah', detail: 'Umrah performed together, at whatever pace the slowest member of the family needs. The group leader stays with the family rather than moving ahead.' },
      { day: 'Days 3–8', title: 'Makkah', detail: 'Free for prayer. One guided Ziyarat, kept to a half day. Rooms are allocated on the same floor so children are never on a different level from their parents.' },
      { day: 'Day 9', title: 'Transfer to Madinah', detail: 'Daytime coach to Madinah, with a rest stop. Check-in at Dar Al Taqwa on the mosque courtyard.' },
      { day: 'Days 10–13', title: 'Madinah', detail: 'Prayer at the Prophet’s Mosque two minutes from the lobby. Guided Ziyarat of Quba, Uhud and Qiblatain.' },
      { day: 'Day 14', title: 'Return', detail: 'Checkout and transfer to Madinah airport.' },
    ],
    departures: [
      { iso: '2026-09-11', label: '11 September 2026', seatsLeft: null },
      { iso: '2026-12-18', label: '18 December 2026 — winter school holidays', seatsLeft: null },
      { iso: '2027-06-04', label: '4 June 2027 — summer holidays', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad', 'multan', 'faisalabad', 'peshawar'],
    faqs: [
      { q: 'What is the rate for children?', a: 'Children under twelve sharing a room with two adults travel at a reduced rate; infants under two pay airline charges only. The exact figures depend on the departure date and airline, so we quote them in writing for your specific family rather than publishing a single number that would be wrong for most people.' },
      { q: 'Will our rooms be together?', a: 'Yes. Family or connecting rooms are part of the package, allocated on the same floor. If a hotel cannot honour that on the date, we tell you before you pay rather than at check-in.' },
      { q: 'Is Umrah obligatory for children?', a: 'No. Children may perform Umrah and it is meritorious, but it is not obligatory before puberty and is not counted as their obligatory pilgrimage. Many families have children perform it; some do not. Both are fine.' },
      { q: 'How do we manage with elderly parents and small children together?', a: 'Distance is the whole answer. At 250 metres in Makkah and 100 metres in Madinah, nobody is walking far, and anyone who needs to return to the room can do so alone. Tell us about mobility needs when you enquire.' },
      { q: 'Can we get a pushchair into the Haram?', a: 'Pushchairs are generally permitted in the outer courtyards but restricted in the Mataf during busy periods. Baby carriers are more practical. The group leader will advise on the day.' },
      { q: 'Are meals included for children?', a: 'Breakfast is included for every member of the family. Other meals are not. Both hotels sit near food courts with familiar options, and children’s portions are inexpensive.' },
      { q: 'What documents do children need?', a: 'Each child needs their own machine-readable passport and their own visa; they cannot travel on a parent’s passport. Bring the original birth certificate ('
        + 'or NADRA CRC) as well — it is occasionally requested at immigration.' },
      { q: 'When are the best dates for a family?', a: 'School holidays: the December window and the summer window. Both are on the departure list above. Avoid the last ten nights of Ramadan with young children — the crowds are genuinely difficult.' },
    ],
    image: hotel.roomFamily,
    featured: false,
    similar: ['umrah-14-nights-standard', 'umrah-14-nights-economy'],
  },

  /* ------------------------------------------------------------------ 09b */
  {
    slug: 'umrah-9-days-december',
    trip: 'umrah',
    tier: 'economy',
    name: '9-Day December Umrah',
    h1: '9-Day December Umrah Package from Lahore',
    title: '9-Day December Umrah Package 2026 from Lahore | Muhammad Travels',
    metaDescription:
      'PKR 330,000 per person, quad sharing. Saudia flights from Lahore 8–16 December 2026, 3-star hotels 300m from Masjid al-Haram, visa and transfers included.',
    answer:
      'Our 9-day December Umrah package costs PKR 330,000 per person on quad sharing and includes return Saudia flights from Lahore (8–16 December 2026), the Umrah visa, five nights at Nawara Shams in Makkah 300m from Masjid al-Haram, four nights at Maysan Al Taqwa in Madinah, and all transfers. Hotels are room only.',
    summary:
      'A short, fixed-date winter Umrah from Lahore on Saudia. Five nights in Makkah within 300 metres of the Haram, four in Madinah, room-only hotels so you eat where and when you like.',
    nights: 9,
    makkahNights: 5,
    madinahNights: 4,
    priceFrom: 330000,
    priceCurrency: 'PKR',
    priceValidUntil: '2026-11-30',
    priceValidUntilLabel: '30 November 2026',
    roomBasis: 'Quad sharing',
    airline: 'Saudia',
    hotels: [
      {
        city: 'Makkah',
        name: 'Nawara Shams Hotel',
        stars: 3,
        distanceM: 300,
        walkMinutes: 5,
        roomType: 'Quad sharing, attached bath',
        board: 'Room only',
        image: hotel.roomTwin,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Maysan Al Taqwa Hotel',
        stars: 3,
        // TODO: distance not supplied with the package — confirm before publishing.
        distanceM: 350,
        walkMinutes: 5,
        roomType: 'Quad sharing, attached bath',
        board: 'Room only',
        image: hotel.roomModern,
        verified: false,
      },
    ],
    includes: [
      'Return economy airfare — Saudia, Lahore → Jeddah (8 Dec) and Madinah → Lahore (16 Dec)',
      'Umrah visa processed through Nusuk Masar in our own name',
      'Hotel accommodation in Makkah (5 nights) and Madinah (4 nights) as listed above, room only',
      'Private transfer on arrival: Jeddah airport → Makkah hotel',
      'Coach (bus) transfer: Makkah hotel → Madinah hotel',
      'Private transfer on departure: Madinah hotel → Madinah airport',
    ],
    excludes: [
      'All meals — both hotels are on a room-only basis',
      'Guided Ziyarat in Makkah and Madinah',
      ...baseExcludes.filter((e) => !e.startsWith('Meals beyond')),
    ],
    itinerary: [
      { day: 'Day 1 · 8 Dec', title: 'Lahore to Jeddah, transfer to Makkah', detail: 'Saudia flight from Lahore to Jeddah. After immigration and biometric checks, a private transfer takes you straight to Nawara Shams in Makkah. Ihram is assumed before crossing the Miqat.' },
      { day: 'Day 2', title: 'Umrah', detail: 'Rested, you perform Tawaf and Sa’i at Masjid al-Haram, 300 metres from the hotel, completing the Umrah with halq or taqsir.' },
      { day: 'Days 3–5', title: 'Makkah', detail: 'Free days for prayer at the Haram. The hotel is room only, so meals are at your own choice in the surrounding area.' },
      { day: 'Day 6', title: 'Bus to Madinah', detail: 'Checkout and coach transfer from the Makkah hotel to Maysan Al Taqwa in Madinah, roughly five hours.' },
      { day: 'Days 7–8', title: 'Madinah', detail: 'Free days for prayer at Al-Masjid an-Nabawi and a visit to Riyadh ul-Jannah, subject to a Nusuk permit.' },
      { day: 'Day 9 · 16 Dec', title: 'Madinah to Lahore', detail: 'Checkout and private transfer from the hotel to Madinah airport for the Saudia flight home to Lahore.' },
    ],
    departures: [
      { iso: '2026-12-08', label: '8 December 2026', seatsLeft: null },
    ],
    departureCities: ['lahore'],
    faqs: [
      { q: 'What does PKR 330,000 cover?', a: 'Return Saudia airfare from Lahore, the Umrah visa, five nights in Makkah and four in Madinah on quad sharing, a private transfer from Jeddah airport to the Makkah hotel, the bus from Makkah to Madinah, and a private transfer to Madinah airport at the end. Meals are not included.' },
      { q: 'How much is it for a family of four?', a: 'PKR 1,320,000 in total for four people sharing one quad room (4 × PKR 330,000). Triple and double rooms are available at a supplement — ask us on WhatsApp and we will quote the exact difference in writing.' },
      { q: 'What does “room only” mean?', a: 'The hotel provides the room and nothing else — no breakfast or other meals. Both hotels are surrounded by restaurants and food courts, so most pilgrims find this easier and cheaper than fixed hotel meal times.' },
      { q: 'How far is the Makkah hotel from Masjid al-Haram?', a: 'Nawara Shams is about 300 metres from the Haram, roughly a five-minute walk. We publish the metre figure rather than “walking distance” so you can compare it directly against any other operator.' },
      { q: 'Are the travel dates fixed?', a: 'Yes. The group flies Lahore to Jeddah on 8 December 2026 and returns Madinah to Lahore on 16 December 2026. Rates are subject to availability and current market conditions, so the price is only guaranteed once we confirm your booking in writing.' },
      { q: 'Can I verify that you are a licensed operator?', a: 'Please do. Our registered company name and licence numbers are published on our licence page, with instructions for checking them against the Ministry’s list of certified operators.' },
    ],
    image: hotel.roomTwin,
    featured: true,
    similar: ['umrah-10-nights-economy', 'umrah-14-nights-economy'],
  },

  /* ------------------------------------------------------------------ 10 */
  {
    slug: 'hajj-shorter-package',
    trip: 'hajj',
    tier: 'premium',
    name: 'Hajj — Shorter Package',
    h1: 'Shorter Hajj Package (approximately 21 days)',
    title: 'Short Hajj Package from Pakistan 1448 | Muhammad Travels',
    metaDescription:
      'From PKR 1,650,000 per person. Approximately 21 days, hotels close to the Haram, Mina tent category confirmed in writing. Registered HGO — verify our licence.',
    answer:
      'Our shorter Hajj package costs from PKR 1,650,000 per person and runs approximately 21 days. It covers the full Hajj rites, accommodation in Makkah and Madinah, Mina and Arafat tents in the confirmed category, all transfers, and Hajj visa processing under our own HGO registration.',
    summary:
      'The shorter scheme, for pilgrims who cannot be away for six weeks. Fewer days, higher cost per day — because the Mina and Arafat components are fixed regardless of how long you stay.',
    nights: 21,
    makkahNights: 14,
    madinahNights: 5,
    priceFrom: 1650000,
    priceCurrency: 'PKR',
    priceValidUntil: '2027-01-31',
    priceValidUntilLabel: '31 January 2027',
    roomBasis: 'Quad sharing',
    airline: 'Saudia or PIA — as allocated under the scheme',
    hotels: [
      {
        city: 'Makkah',
        name: 'Elaf Ajyad Makkah',
        stars: 4,
        distanceM: 600,
        walkMinutes: 9,
        roomType: 'Quad sharing',
        board: 'Full board during the Hajj days',
        image: hotel.roomModern,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Al Eiman Royal Hotel',
        stars: 3,
        distanceM: 400,
        walkMinutes: 6,
        roomType: 'Quad sharing',
        board: 'Half board',
        image: hotel.roomTwin,
        verified: false,
      },
    ],
    includes: [
      'Return airfare as allocated under the Hajj scheme',
      'Hajj visa processed under our own HGO registration',
      'Makkah and Madinah hotel accommodation as listed',
      'Mina and Arafat tent accommodation — category confirmed in writing before payment',
      'Muzdalifah night arrangements',
      'All transfers including the Mashaer movement',
      'Full board during the five days of Hajj',
      'Trained mu’allim accompanying the group throughout the rites',
      'Pre-departure Hajj training covering every rite in sequence',
    ],
    excludes: [
      'Qurbani / Hady — payable separately, at cost',
      'Excess baggage charges above the airline allowance',
      'Meals outside the Hajj days beyond those listed',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Personal shopping, laundry and telephone charges',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Stage 1', title: 'Arrival and Makkah', detail: 'Arrival in Jeddah, transfer to Makkah in Ihram, and Umrah for those performing Tamattu. Settled in Makkah well before the eighth of Dhul Hijjah.' },
      { day: '8 Dhul Hijjah', title: 'Mina — Yawm al-Tarwiyah', detail: 'Transfer to the Mina tents. Five prayers at Mina, overnight.' },
      { day: '9 Dhul Hijjah', title: 'Arafat and Muzdalifah', detail: 'Movement to Arafat after Fajr, the standing until sunset, then Muzdalifah for the night and the gathering of pebbles.' },
      { day: '10 Dhul Hijjah', title: 'Jamarat, Qurbani, Tawaf al-Ifadah', detail: 'Stoning of Jamarat al-Aqabah, Qurbani, halq or taqsir, then Tawaf al-Ifadah and Sa’i.' },
      { day: '11–13 Dhul Hijjah', title: 'Days of Tashreeq', detail: 'Stoning of all three Jamarat on each day, with overnight stays in Mina.' },
      { day: 'Stage 6', title: 'Madinah and return', detail: 'Tawaf al-Wada, transfer to Madinah for five nights, then the return flight from Madinah.' },
    ],
    departures: [
      { iso: '2027-05-01', label: 'Hajj 1448 — dates confirmed after the MoRA scheme announcement', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad'],
    faqs: [
      { q: 'Why does a shorter Hajj cost more than a longer one?', a: 'Because the expensive components — the Mina and Arafat tents, the Mashaer transport, the Qurbani logistics and the Hajj visa — are fixed regardless of trip length. A shorter package removes cheap hotel nights, not expensive Hajj days, and short-scheme airfare is priced higher.' },
      { q: 'What Mina tent category do we get?', a: 'The category is confirmed to you in writing before you pay the balance. Tent category is the single biggest variable in Hajj pricing and the most common place for a package to quietly under-deliver, so we put it in the contract rather than the brochure.' },
      { q: 'When will the exact dates be confirmed?', a: 'After the Ministry announces the Hajj scheme for the year, which typically follows the Saudi quota allocation. Any operator selling you confirmed Hajj dates before the scheme is announced is not in a position to guarantee them.' },
      { q: 'Is Qurbani included?', a: 'No. Qurbani is payable separately at cost, and we pass through the actual amount without a markup. We list it as an exclusion because bundling it invites a dispute about what was actually paid on your behalf.' },
      { q: 'How is the Hajj quota allocated?', a: 'The Saudi authorities allocate a national quota to Pakistan, which the Ministry divides between the government scheme and licensed private operators. Our allocation is confirmed each year and published on our licence page.' },
      { q: 'What training do you provide?', a: 'A pre-departure Hajj training session covering every rite in sequence, what to do if you are separated from the group, and the health preparation that matters most. A trained mu’allim then accompanies the group through all five days.' },
      { q: 'Are you registered to operate Hajj?', a: 'Yes — we hold our own HGO registration with the Ministry of Religious Affairs. The number and the current-year quota status are published on our licence page with instructions for verifying them against the Ministry’s list.' },
      { q: 'What if the scheme changes after I have paid?', a: 'Hajj arrangements are subject to Ministry and Saudi authority decisions that no operator controls. Our refunds page sets out exactly what happens to your money in each scenario, including a scheme change and a quota shortfall. Read it before you pay.' },
    ],
    image: makkah.haramInterior,
    featured: false,
    similar: ['hajj-standard-package', 'hajj-premium-package'],
  },

  /* ------------------------------------------------------------------ 11 */
  {
    slug: 'hajj-standard-package',
    trip: 'hajj',
    tier: 'standard',
    name: 'Hajj — Standard Package',
    h1: 'Standard Hajj Package (approximately 38 days)',
    title: 'Hajj Package from Pakistan 1448 — Standard | Muhammad Travels',
    metaDescription:
      'From PKR 1,450,000 per person. Approximately 38 days including the full Hajj rites, Mina and Arafat tents, and Madinah. Registered HGO — verify our licence.',
    answer:
      'Our standard Hajj package costs from PKR 1,450,000 per person and runs approximately 38 days. It includes the full Hajj rites, Makkah and Madinah accommodation, Mina and Arafat tents in the confirmed category, all Mashaer transfers, and Hajj visa processing under our own HGO registration.',
    summary:
      'The long scheme, and the best value per day. Enough time in Makkah before the rites to arrive rested, and eight nights in Madinah after.',
    nights: 38,
    makkahNights: 26,
    madinahNights: 8,
    priceFrom: 1450000,
    priceCurrency: 'PKR',
    priceValidUntil: '2027-01-31',
    priceValidUntilLabel: '31 January 2027',
    roomBasis: 'Quad sharing',
    airline: 'Saudia or PIA — as allocated under the scheme',
    hotels: [
      {
        city: 'Makkah',
        name: 'Al Kiswah Towers Hotel',
        stars: 3,
        distanceM: 850,
        walkMinutes: 12,
        roomType: 'Quad sharing',
        board: 'Full board during the Hajj days',
        image: hotel.roomTwin,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Al Eiman Royal Hotel',
        stars: 3,
        distanceM: 400,
        walkMinutes: 6,
        roomType: 'Quad sharing',
        board: 'Half board',
        image: hotel.roomModern,
        verified: false,
      },
    ],
    includes: [
      'Return airfare as allocated under the Hajj scheme',
      'Hajj visa processed under our own HGO registration',
      'Makkah and Madinah hotel accommodation as listed',
      'Mina and Arafat tent accommodation — category confirmed in writing before payment',
      'Muzdalifah night arrangements',
      'All transfers including the Mashaer movement',
      'Full board during the five days of Hajj',
      'Trained mu’allim accompanying the group throughout the rites',
      'Pre-departure Hajj training covering every rite in sequence',
    ],
    excludes: [
      'Qurbani / Hady — payable separately, at cost',
      'Excess baggage charges above the airline allowance',
      'Meals outside the Hajj days beyond those listed',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Personal shopping, laundry and telephone charges',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Stage 1', title: 'Arrival and settling in Makkah', detail: 'Arrival in Jeddah, transfer to Makkah in Ihram, Umrah for those performing Tamattu, then several weeks of prayer at the Haram before the rites begin.' },
      { day: '8 Dhul Hijjah', title: 'Mina — Yawm al-Tarwiyah', detail: 'Transfer to the Mina tents. Five prayers at Mina, overnight.' },
      { day: '9 Dhul Hijjah', title: 'Arafat and Muzdalifah', detail: 'Movement to Arafat after Fajr, the standing until sunset, then Muzdalifah overnight.' },
      { day: '10 Dhul Hijjah', title: 'Jamarat, Qurbani, Tawaf al-Ifadah', detail: 'Stoning of Jamarat al-Aqabah, Qurbani, halq or taqsir, then Tawaf al-Ifadah and Sa’i.' },
      { day: '11–13 Dhul Hijjah', title: 'Days of Tashreeq', detail: 'Stoning of all three Jamarat on each day, with overnight stays in Mina.' },
      { day: 'Stage 6', title: 'Madinah and return', detail: 'Tawaf al-Wada, then eight nights in Madinah — long enough for the Arbaeen — before the return flight.' },
    ],
    departures: [
      { iso: '2027-04-20', label: 'Hajj 1448 — dates confirmed after the MoRA scheme announcement', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad', 'multan', 'faisalabad', 'peshawar'],
    faqs: [
      { q: 'How long is the standard Hajj scheme?', a: 'Approximately 38 days: around 26 nights in Makkah, the five days of the rites at Mina, Arafat and Muzdalifah, and eight nights in Madinah. Exact durations follow the Ministry scheme each year.' },
      { q: 'Why is the longer package cheaper than the shorter one?', a: 'The fixed Hajj costs are identical, and long-scheme airfare and hotel allocations are priced lower. You are paying less in total for more days — which is why the long scheme fills first among pilgrims who can take the time.' },
      { q: 'What is included during the five days of Hajj?', a: 'Tent accommodation at Mina and Arafat in the confirmed category, Muzdalifah arrangements, all Mashaer transport, full board throughout, and a trained mu’allim with the group at every stage.' },
      { q: 'Is Qurbani included in the price?', a: 'No. It is payable separately at cost and passed through without markup. We list it as an exclusion rather than bundling it.' },
      { q: 'Can I do the Arbaeen in Madinah?', a: 'Yes. Eight nights in Madinah is enough for forty consecutive prayers at the Prophet’s Mosque, which is one of the main reasons pilgrims choose the long scheme.' },
      { q: 'How do I apply, and when?', a: 'Applications open after the Ministry announces the scheme, usually six to eight months before Hajj. Our how-it-works page sets out the quota, the timeline and the documents required. Register your interest early — allocation is not first-come, but preparation time matters.' },
      { q: 'What happens if I do not get a seat under the quota?', a: 'Your money is returned in full under the terms published on our refunds page. A quota shortfall is not a cancellation by you and is not treated as one.' },
      { q: 'How can I check you are a registered HGO?', a: 'Our HGO registration number and current-year quota status are on our licence page, with instructions for verifying them against the Ministry’s published list of certified operators. Check ours, and check anyone else you are considering.' },
    ],
    image: makkah.night,
    featured: true,
    similar: ['hajj-shorter-package', 'hajj-premium-package'],
  },

  /* ------------------------------------------------------------------ 12 */
  {
    slug: 'hajj-premium-package',
    trip: 'hajj',
    tier: 'premium',
    name: 'Hajj — Premium Package',
    h1: 'Premium Hajj Package',
    title: 'Premium Hajj Package from Pakistan 1448 | Muhammad Travels',
    metaDescription:
      'From PKR 2,850,000 per person. 5-star hotels within 400m of the Haram, upgraded Mina camp, double occupancy. Registered HGO — verify our licence numbers.',
    answer:
      'Our premium Hajj package costs from PKR 2,850,000 per person on double occupancy. It includes 5-star accommodation within 400 metres of Masjid al-Haram, an upgraded air-conditioned Mina camp closer to the Jamarat, private Mashaer transport, and full board throughout.',
    summary:
      'For pilgrims prioritising distance and the Mina camp category above all else — including those travelling with elderly parents for whom the walk to Jamarat is the deciding factor.',
    nights: 24,
    makkahNights: 16,
    madinahNights: 6,
    priceFrom: 2850000,
    priceCurrency: 'PKR',
    priceValidUntil: '2027-01-31',
    priceValidUntilLabel: '31 January 2027',
    roomBasis: 'Double occupancy',
    airline: 'Saudia — as allocated under the scheme',
    hotels: [
      {
        city: 'Makkah',
        name: 'Jabal Omar Marriott Makkah',
        stars: 5,
        distanceM: 400,
        walkMinutes: 6,
        roomType: 'Double occupancy',
        board: 'Full board',
        image: hotel.roomSuite,
        verified: false,
      },
      {
        city: 'Madinah',
        name: 'Anwar Al Madinah Mövenpick',
        stars: 5,
        distanceM: 50,
        walkMinutes: 1,
        roomType: 'Double occupancy',
        board: 'Full board',
        image: hotel.roomOrnate,
        verified: false,
      },
    ],
    includes: [
      'Return airfare as allocated under the Hajj scheme',
      'Hajj visa processed under our own HGO registration',
      'Jabal Omar Marriott Makkah — 16 nights, 400m from Masjid al-Haram',
      'Anwar Al Madinah Mövenpick — 6 nights, 50m from Al-Masjid an-Nabawi',
      'Upgraded air-conditioned Mina camp, closer to the Jamarat bridge',
      'Arafat tent in the upgraded category with cooling',
      'Private Mashaer transport rather than the general bus allocation',
      'Full board for the entire trip',
      'Trained mu’allim and a dedicated 24-hour contact throughout',
      'Pre-departure Hajj training and a personal readiness review',
    ],
    excludes: [
      'Qurbani / Hady — payable separately, at cost',
      'Excess baggage charges above the airline allowance',
      'Mandatory vaccinations and any medical certificates',
      'Travel and medical insurance',
      'Haram-view room supplement, where requested',
      'Personal shopping, laundry and telephone charges',
      'Anything not listed under “What’s included”',
    ],
    itinerary: [
      { day: 'Stage 1', title: 'Arrival and Makkah', detail: 'Arrival, private transfer to Makkah in Ihram, Umrah for those performing Tamattu, and sixteen nights at Jabal Omar Marriott before the rites.' },
      { day: '8 Dhul Hijjah', title: 'Mina — Yawm al-Tarwiyah', detail: 'Transfer to the upgraded air-conditioned Mina camp, positioned closer to the Jamarat bridge to shorten the daily walk.' },
      { day: '9 Dhul Hijjah', title: 'Arafat and Muzdalifah', detail: 'Private transport to Arafat, the standing until sunset in an upgraded cooled tent, then Muzdalifah.' },
      { day: '10 Dhul Hijjah', title: 'Jamarat, Qurbani, Tawaf al-Ifadah', detail: 'Stoning of Jamarat al-Aqabah, Qurbani, halq or taqsir, then Tawaf al-Ifadah and Sa’i.' },
      { day: '11–13 Dhul Hijjah', title: 'Days of Tashreeq', detail: 'Stoning of all three Jamarat daily, with overnight stays in the Mina camp.' },
      { day: 'Stage 6', title: 'Madinah and return', detail: 'Tawaf al-Wada, private transfer to Madinah for six nights at the Mövenpick, then the return flight.' },
    ],
    departures: [
      { iso: '2027-04-28', label: 'Hajj 1448 — dates confirmed after the MoRA scheme announcement', seatsLeft: null },
    ],
    departureCities: ['lahore', 'karachi', 'islamabad'],
    faqs: [
      { q: 'What does premium actually buy in Hajj?', a: 'Two things that matter and one that does not. The Mina camp category and its distance to the Jamarat bridge matter enormously — that is a walk you make repeatedly in the heat. Hotel distance in Makkah matters. Hotel decor does not. We price the first two and do not charge you for the third.' },
      { q: 'How close is the Mina camp to the Jamarat?', a: 'The upgraded camp is materially closer than the general allocation, and air-conditioned. The exact zone is confirmed in writing before you pay the balance, because it is the component most often described vaguely across this sector.' },
      { q: 'Is this suitable for elderly pilgrims?', a: 'It is the package we recommend for pilgrims over seventy, for the Mina distance above all. That said, Hajj is physically demanding regardless of package, and we will give you a frank assessment rather than a sale if you describe the person’s health honestly.' },
      { q: 'Is Qurbani included?', a: 'No — payable separately at cost, passed through without markup, like every other package we run.' },
      { q: 'Is the Makkah hotel really 400 metres from the Haram?', a: 'Jabal Omar Marriott sits in the Jabal Omar development on the western side, roughly 400 metres to the nearest gate with a covered walkway for most of the route.' },
      { q: 'Do you offer single occupancy?', a: 'Yes, as a supplement. Double occupancy is the standard basis for this package.' },
      { q: 'When are the dates confirmed?', a: 'After the Ministry announces the Hajj scheme. We publish an indicative window and confirm the exact dates in writing the moment the announcement is made.' },
      { q: 'Can I verify your HGO registration?', a: 'Yes, and you should. The number and current-year quota status are on our licence page, along with instructions for checking them against the Ministry’s published list.' },
    ],
    image: hotel.roomSuite,
    featured: false,
    similar: ['hajj-standard-package', 'hajj-shorter-package'],
  },
];

/* ============================================================================
   TIER DEFINITIONS — /umrah/[tier]/ landing pages
   Spec §03: "P2 · /umrah/[tier]/ · Segment by budget · cheap / premium umrah
   packages."
   ========================================================================= */

export type TierDef = {
  slug: Tier;
  name: string;
  h1: string;
  title: string;
  metaDescription: string;
  answer: string;
  intro: string[];
  badge: string;
  image: Img;
  faqs: Faq[];
};

export const tiers: TierDef[] = [
  {
    slug: 'economy',
    name: 'Economy',
    h1: 'Economy Umrah Packages from Pakistan',
    title: 'Economy Umrah Packages from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'Economy Umrah packages from PKR 265,000 per person. Named 3-star hotels with exact distances in metres, visa and flights included. Licensed MoRA operator.',
    answer:
      'Economy Umrah packages start from PKR 265,000 per person and include return flights, the Nusuk visa, quad-sharing rooms in named 3-star hotels 850 metres from Masjid al-Haram and 400 metres from the Prophet’s Mosque, all transfers, and daily breakfast.',
    intro: [
      'Economy here means a longer walk and more people to a room. It does not mean an unnamed hotel, a vague distance or a price that changes after you have paid a deposit.',
      'Both hotels on every economy package are named on this page with their exact distance to the Haram in metres. Compare that figure against the operator quoting you “walking distance” — it is the single most useful comparison you can make in this category, and the one most often avoided.',
    ],
    badge: 'Best value',
    image: madinah.courtyard,
    faqs: [
      { q: 'What is the cheapest Umrah package from Pakistan?', a: 'Our lowest-priced package is the 10-night Economy Umrah from PKR 265,000 per person on quad sharing, including flights, visa, hotels, transfers and daily breakfast. Prices below roughly PKR 250,000 for a complete package generally exclude something significant — check the exclusions list before comparing.' },
      { q: 'What is the catch with a cheap Umrah package?', a: 'Usually distance, occupancy or exclusions. A cheaper package normally means a hotel a kilometre or more from the Haram, five or six people to a room, or meals and transfers charged separately. None of those are dishonest if they are disclosed. The problem is when they are not.' },
      { q: 'Are the hotels named before I pay?', a: 'Always, on this website, before you contact us. Any operator who will not name the hotel until after the deposit is asking you to accept a risk they are not willing to describe.' },
      { q: 'Is the visa really included?', a: 'Yes, processed through Nusuk Masar under our own MoRA attestation. There is no separate visa fee and no third-party agent taking a cut between you and the visa.' },
      { q: 'Can I upgrade later?', a: 'Subject to availability, yes, and you pay only the genuine difference. Upgrading early costs less than upgrading late — the closest hotels sell out first.' },
      { q: 'How do I know you will not disappear with my deposit?', a: 'Check our licence numbers against the Ministry’s published list of certified operators before paying anything. Our licence page explains exactly how. Do the same for every operator you are considering.' },
    ],
  },
  {
    slug: 'standard',
    name: 'Standard',
    h1: 'Standard Umrah Packages from Pakistan',
    title: 'Standard Umrah Packages from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'Standard Umrah packages from PKR 385,000 per person. 4-star hotels 250m from Masjid al-Haram, triple sharing, flights and visa included. MoRA-licensed.',
    answer:
      'Standard Umrah packages start from PKR 385,000 per person and include return flights, the Nusuk visa, triple-sharing rooms at 4-star hotels 250 metres from Masjid al-Haram and 100 metres from the Prophet’s Mosque, all transfers, and daily breakfast.',
    intro: [
      'This is the tier most of our pilgrims choose, and the reason is arithmetic rather than luxury. Moving from 850 metres to 250 metres in Makkah saves roughly two hours of walking a day across five prayers.',
      'Over a fortnight that is a materially different pilgrimage — particularly in summer, and particularly for anyone over fifty.',
    ],
    badge: 'Most chosen',
    image: madinah.canopies,
    faqs: [
      { q: 'What is the difference between economy and standard Umrah packages?', a: 'Distance to the Haram and room occupancy. Standard puts you 250 metres from Masjid al-Haram rather than 850, and 100 metres from the Prophet’s Mosque rather than 400, on triple sharing rather than quad. The visa process, transfers and group arrangements are identical.' },
      { q: 'Is the extra cost worth it?', a: 'For most pilgrims praying five times a day, yes — you are buying back about two hours of walking daily. For a short trip in cooler months with a fit group, the economy tier is perfectly reasonable. We will tell you honestly which one suits your group.' },
      { q: 'Which hotels are used?', a: 'Hilton Suites Makkah at 250 metres and Dar Al Taqwa Madinah at 100 metres. Both are named on every package page along with the room category actually being sold.' },
      { q: 'How many people share a room?', a: 'Three, as standard. Double and single occupancy are available as supplements and quoted exactly before booking.' },
      { q: 'Are meals included?', a: 'Daily breakfast at both hotels. Lunch and dinner are not, and appear in the exclusions list on every package page with the same prominence as the inclusions.' },
      { q: 'Which departure cities are available?', a: 'All six: Lahore, Karachi, Islamabad, Multan, Faisalabad and Peshawar. Flight routing and price vary by city and are shown on each departure page.' },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    h1: 'Premium Umrah Packages from Pakistan',
    title: 'Premium Umrah Packages from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'Premium Umrah packages from PKR 585,000 per person. Swissôtel Al Maqam 180m from Masjid al-Haram, Mövenpick Madinah 50m. Double occupancy, private transfers.',
    answer:
      'Premium Umrah packages start from PKR 585,000 per person on double occupancy and include direct flights, the Nusuk visa, 5-star hotels 180 metres from Masjid al-Haram and 50 metres from the Prophet’s Mosque, private transfers, and daily breakfast and dinner.',
    intro: [
      'Premium buys proximity, not decoration. Swissôtel Al Maqam is 180 metres from Masjid al-Haram and Anwar Al Madinah Mövenpick is 50 metres from the Prophet’s Mosque — in practice, you leave the lobby and you are on the marble.',
      'For pilgrims travelling with elderly parents, that distance is usually the deciding factor in the whole trip, and it is worth more than any number of stars.',
    ],
    badge: 'Closest to the Haram',
    image: madinah.night,
    faqs: [
      { q: 'What makes an Umrah package premium?', a: 'Distance to the Haram, room occupancy and private rather than shared transfers. On our premium packages that means 180 metres in Makkah, 50 metres in Madinah, two to a room, private vehicles for every transfer, and dinner included alongside breakfast.' },
      { q: 'Is a 5-star hotel worth the money for Umrah?', a: 'The star rating is not what you are paying for; the distance is. A 5-star hotel a kilometre from the Haram is worth less to a pilgrim than a 4-star hotel at 250 metres. Compare the metre figures first and the star ratings second.' },
      { q: 'Do premium packages include a Haram view?', a: 'No — Haram-facing rooms carry a supplement at both properties and are subject to availability. We quote it separately rather than implying it is included, which is a common way this tier is oversold.' },
      { q: 'Are flights direct?', a: 'Yes on the listed departures — direct Saudia service from Lahore, Karachi and Islamabad. Any seasonal change is confirmed before the balance is due.' },
      { q: 'Is this the right choice for elderly parents?', a: 'Usually yes, for the distances alone. Tell us about wheelchair needs, dialysis schedules or medication storage and we will confirm in writing what each hotel can actually accommodate before you book.' },
      { q: 'What is not included?', a: 'Lunch, insurance, vaccinations, excess baggage, the Haram-view supplement and personal expenses. Every package page lists exclusions in full, in the same visual weight as inclusions.' },
    ],
  },
  {
    slug: 'ramadan',
    name: 'Ramadan',
    h1: 'Ramadan Umrah Packages 2027',
    title: 'Ramadan Umrah Packages 2027 from Pakistan | Muhammad Travels',
    metaDescription:
      'Ramadan Umrah packages from PKR 615,000 per person. The last ten nights or the full month of Ramadan 1448, Suhoor and Iftar included. Licensed MoRA operator.',
    answer:
      'Ramadan Umrah packages start from PKR 615,000 per person and cover either the last ten nights or the full month of Ramadan 1448 (February–March 2027), with Suhoor and Iftar included daily and hotels within 250 metres of Masjid al-Haram.',
    intro: [
      'Ramadan is the highest-demand window of the year and the one where booking late costs the most. The hotels within 300 metres of either Haram sell their Ramadan allocation months ahead; what remains in the final weeks is further away and more expensive than the close rooms were in October.',
      'Exact dates depend on the moon sighting. We publish an indicative departure and confirm in writing the moment the Saudi announcement is made — because nobody can honestly guarantee a Ramadan date before then.',
    ],
    badge: 'Books out first',
    image: madinah.night,
    faqs: [
      { q: 'When is Ramadan Umrah 2027?', a: 'Ramadan 1448 is expected to begin in early February 2027 and end in early March 2027, subject to the moon sighting. The last ten nights therefore fall in late February and early March. We confirm exact dates as soon as the announcement is made.' },
      { q: 'How much does Ramadan Umrah cost from Pakistan?', a: 'From PKR 615,000 per person for the last ten nights and from PKR 745,000 for the full month, including flights, visa, hotels, transfers and Suhoor and Iftar daily. Ramadan rates are higher because hotel and airline net rates rise sharply for this window.' },
      { q: 'When should I book Ramadan Umrah?', a: 'Four to five months ahead — so by October for a February departure. This is the single most consequential timing decision in the category. Booking in Ramadan itself means paying more for a worse hotel.' },
      { q: 'Are Suhoor and Iftar included?', a: 'Yes, both, daily, at both hotels for the whole stay. Lunch is not included and is not applicable during fasting hours.' },
      { q: 'Is the last ten nights better than the full month?', a: 'It depends on what you can take away from work and family. The last ten nights contain Laylat al-Qadr and are the most sought-after; the full month is calmer at the start and lets you settle before the crowds build.' },
      { q: 'How crowded is the Haram in Ramadan?', a: 'Very, and extremely so in the last ten nights. Tawaf on the ground floor is often impractical at peak times. This is exactly why hotel distance matters more in Ramadan than at any other point in the year.' },
      { q: 'Can I perform I’tikaf?', a: 'Many pilgrims do. Rules and any permit requirements are set by the Haram authorities and can change year to year. We tell you the current position at the pre-departure briefing and do not promise access we cannot guarantee.' },
      { q: 'Is Ramadan Umrah suitable for elderly pilgrims?', a: 'The last ten nights are demanding — long nights, dense crowds and fasting. For pilgrims over seventy we usually suggest the earlier part of Ramadan, or Rajab instead. Describe the person’s situation and we will give you a straight answer.' },
    ],
  },
  {
    slug: 'family',
    name: 'Family',
    h1: 'Family Umrah Packages from Pakistan',
    title: 'Family Umrah Packages from Pakistan 2026 | Muhammad Travels',
    metaDescription:
      'Family Umrah packages from PKR 355,000 per person. Connecting rooms, reduced child rates, 4-star hotels 250m from the Haram. Licensed MoRA operator.',
    answer:
      'Family Umrah packages start from PKR 355,000 per person and include connecting or family rooms allocated together, reduced rates for children under twelve, hotels 250 metres from Masjid al-Haram and 100 metres from the Prophet’s Mosque, and a Ziyarat pace that works for mixed-age groups.',
    intro: [
      'Families travelling to Umrah are rarely one age group. The usual party is two parents, two or three children and at least one grandparent, and the constraint is almost never budget — it is whether everyone can walk the same distance at the same pace.',
      'This tier is built around that: rooms allocated together on one floor, short walks to both Harams, and a Ziyarat schedule that does not assume the whole family moves at the speed of its fittest member.',
    ],
    badge: 'Rooms allocated together',
    image: madinah.courtyard,
    faqs: [
      { q: 'What is the child rate for Umrah?', a: 'Children under twelve sharing a room with two adults travel at a reduced rate; infants under two pay airline charges only. The exact figures vary by departure date and airline, so we quote them in writing for your family rather than publishing one number that would be wrong for most people.' },
      { q: 'Will our family rooms be together?', a: 'Yes. Family or connecting rooms on the same floor are part of the package. If a hotel cannot honour that on your date, we tell you before you pay, not at check-in.' },
      { q: 'Do children need their own passport and visa?', a: 'Yes, both. Children cannot travel on a parent’s passport. Bring the original birth certificate or NADRA CRC as well — it is occasionally requested at immigration.' },
      { q: 'Is Umrah obligatory for children?', a: 'No. Children may perform Umrah and it is meritorious, but it is not obligatory before puberty and does not count as their obligatory pilgrimage later. Many families have children perform it; many do not.' },
      { q: 'What about travelling with grandparents and small children together?', a: 'Distance solves most of it. At 250 metres in Makkah and 100 metres in Madinah, anyone who needs to return to the room can do so alone. Tell us about mobility needs when you enquire so we can allocate low floors near the lifts.' },
      { q: 'When are the best dates for a family trip?', a: 'The December and summer school holidays, both of which appear on our departure list. We would avoid the last ten nights of Ramadan with young children — the crowds are genuinely difficult.' },
    ],
  },
];

/* ============================================================================
   ACCESSORS — every page, card, table and schema block reads through these.
   ========================================================================= */

export const umrahPackages = packages.filter((p) => p.trip === 'umrah');
export const hajjPackages = packages.filter((p) => p.trip === 'hajj');

export const packageSlugs = packages.map((p) => p.slug);
export const tierSlugs = tiers.map((t) => t.slug);

export function getPackage(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getTier(slug: string): TierDef | undefined {
  return tiers.find((t) => t.slug === slug);
}

export function packagesByTier(tier: Tier, trip: Trip = 'umrah'): Package[] {
  return packages.filter((p) => p.tier === tier && p.trip === trip);
}

export function packagesFromCity(citySlug: string): Package[] {
  return packages.filter((p) => p.departureCities.includes(citySlug));
}

export function featuredPackages(): Package[] {
  return packages.filter((p) => p.featured);
}

export function similarPackages(slug: string): Package[] {
  const pkg = getPackage(slug);
  if (!pkg) return [];
  return pkg.similar
    .map((s) => getPackage(s))
    .filter((p): p is Package => Boolean(p));
}

/** Lowest advertised price across a set — used for "from PKR …" summaries. */
export function lowestPrice(list: Package[]): number {
  return list.reduce(
    (min, p) => (p.priceFrom < min ? p.priceFrom : min),
    Number.POSITIVE_INFINITY,
  );
}
