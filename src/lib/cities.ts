import type { Img } from './images';
import { cityImages } from './images';
import type { Faq } from './packages';

/* ============================================================================
   DEPARTURE CITIES
   ============================================================================
   Spec §04, Departure city page template:
     "One page per city, each genuinely distinct — not a template with the city
      name swapped in, which Google treats as doorway pages. Each carries:
      packages available from that airport, real flight routing and carriers,
      prices specific to that departure, group departure dates, the local
      office or representative if there is one, testimonials from pilgrims from
      that city, and a short FAQ about departing from there."

   Accordingly every field below is written per city. There is no shared
   boilerplate with a name substituted in — the routing, the connection
   position, the supplement and the FAQs differ because the facts differ.

   ⚠️  Flight routings and carriers change seasonally. Confirm against current
   schedules before publishing.
   ========================================================================= */

export type City = {
  slug: string;
  name: string;
  province: string;
  airport: string;
  iata: string;
  h1: string;
  title: string;
  metaDescription: string;
  /** Spec §09: 40–60 word self-contained answer before any preamble. */
  answer: string;
  /** Genuinely city-specific prose. Two to four paragraphs. */
  intro: string[];
  carriers: string[];
  routing: string;
  flightTime: string;
  /** Per-person difference against the headline Lahore price, in PKR. */
  supplement: number;
  supplementNote: string;
  localPresence: string;
  image: Img;
  faqs: Faq[];
};

export const cities: City[] = [
  /* ---------------------------------------------------------------- LAHORE */
  {
    slug: 'lahore',
    name: 'Lahore',
    province: 'Punjab',
    airport: 'Allama Iqbal International Airport',
    iata: 'LHE',
    h1: 'Umrah Packages from Lahore',
    title: 'Umrah Packages from Lahore 2026 | Muhammad Travels',
    metaDescription:
      'Umrah packages from Lahore from PKR 295,000 per person. Direct Saudia flights from Allama Iqbal International, named hotels, exact distances. MoRA-licensed.',
    answer:
      'Umrah packages from Lahore start at PKR 295,000 per person and depart from Allama Iqbal International Airport on direct Saudia and Airblue services to Jeddah, roughly four and a half hours. All six of our Umrah packages are available from Lahore with no departure supplement.',
    intro: [
      'Lahore is our home airport and the departure city with the widest choice. Every package we run departs from Allama Iqbal International, direct, with no connection and no supplement — which is not true of every city on this list, and we would rather say so than imply otherwise.',
      'Direct flights matter more than they sound. A Lahore pilgrim in Ihram boards once and disembarks at Jeddah; a pilgrim connecting through another airport must hold Ihram through a transit lounge, sometimes for several hours. For older pilgrims that is the practical difference between an easy first day and a difficult one.',
      'Our office is in Lahore, which also means you can do the thing we keep recommending: come and look at it. Verify our licence numbers against the Ministry list first, then visit the premises before you transfer money. Any operator who cannot offer both of those is asking for a level of trust they have not earned.',
    ],
    carriers: ['Saudia', 'Airblue', 'flynas'],
    routing: 'Direct Lahore (LHE) → Jeddah (JED). Return commonly from Madinah (MED) direct.',
    flightTime: 'approximately 4h 30m direct',
    supplement: 0,
    supplementNote: 'No departure supplement. Lahore prices are the headline prices shown on every package page.',
    localPresence:
      'Head office in Lahore. Walk-in visits welcome during opening hours — no appointment needed.',
    image: cityImages.lahore,
    faqs: [
      { q: 'How much does an Umrah package from Lahore cost?', a: 'From PKR 295,000 per person for 14 nights on quad sharing, including return direct flights, the Nusuk visa, named hotels, transfers and daily breakfast. Standard packages start at PKR 385,000 and premium at PKR 585,000. Every price carries a validity date.' },
      { q: 'Are there direct flights from Lahore to Jeddah?', a: 'Yes. Saudia and Airblue both operate direct Lahore–Jeddah services, roughly four and a half hours. Our group departures use the direct service, and the return is commonly direct from Madinah so you do not backtrack to Jeddah.' },
      { q: 'Which airport do Umrah flights use in Lahore?', a: 'Allama Iqbal International Airport (LHE). Group assembly is at the international departures hall three hours before the flight, and the group leader meets you there.' },
      { q: 'Is there a departure supplement from Lahore?', a: 'No. Lahore is our base airport and the prices shown on the package pages are Lahore prices. Cities requiring a connection carry a stated supplement, published on their own page.' },
      { q: 'Where do I enter Ihram flying from Lahore?', a: 'Most pilgrims change into Ihram at home or at the airport before boarding, and make the intention as the aircraft approaches the Miqat — the captain usually announces it. The group leader briefs everyone on this before departure.' },
      { q: 'Can I visit your Lahore office before booking?', a: 'Please do, and please verify our licence numbers against the Ministry’s published list before you come. A real office you can walk into is one of the clearest signals in this sector, and it costs you nothing to check.' },
    ],
  },

  /* --------------------------------------------------------------- KARACHI */
  {
    slug: 'karachi',
    name: 'Karachi',
    province: 'Sindh',
    airport: 'Jinnah International Airport',
    iata: 'KHI',
    h1: 'Umrah Packages from Karachi',
    title: 'Umrah Packages from Karachi 2026 | Muhammad Travels',
    metaDescription:
      'Umrah packages from Karachi from PKR 295,000 per person. Direct flights from Jinnah International — the shortest hop to Jeddah in Pakistan. MoRA-licensed operator.',
    answer:
      'Umrah packages from Karachi start at PKR 295,000 per person and depart from Jinnah International Airport on direct services to Jeddah of roughly three and a half hours — the shortest flight to Saudi Arabia from anywhere in Pakistan, with no departure supplement.',
    intro: [
      'Karachi has the shortest flight to Jeddah of any Pakistani city — around three and a half hours against Lahore’s four and a half and Islamabad’s five. On a trip where the first day is spent in Ihram, that hour matters.',
      'It also has the densest carrier competition, which is why Karachi fares occasionally undercut the rest of the country outright rather than merely matching them. Where that happens on a specific departure date we pass it on rather than pocketing the difference, and where Karachi is more expensive we say that too.',
      'Karachi pilgrims are the largest single group on most of our departures, which means a Karachi group usually travels as a Karachi group — the same coach, the same hotel floor and a group leader who does not have to split attention across three cities.',
    ],
    carriers: ['Saudia', 'PIA', 'Airblue', 'flynas'],
    routing: 'Direct Karachi (KHI) → Jeddah (JED). Return commonly from Madinah (MED) direct.',
    flightTime: 'approximately 3h 30m direct — the shortest from Pakistan',
    supplement: 0,
    supplementNote: 'No departure supplement. Karachi occasionally prices below the headline; where it does, the lower fare is passed through.',
    localPresence:
      'Karachi enquiries are handled by the Lahore office by phone and WhatsApp. A local representative meets every Karachi group at the airport on departure day.',
    image: cityImages.karachi,
    faqs: [
      { q: 'How much does an Umrah package from Karachi cost?', a: 'From PKR 295,000 per person for 14 nights on quad sharing including direct flights, the Nusuk visa, named hotels, transfers and daily breakfast. Standard starts at PKR 385,000 and premium at PKR 585,000, all with published validity dates.' },
      { q: 'How long is the flight from Karachi to Jeddah?', a: 'Roughly three and a half hours direct — the shortest flight to Saudi Arabia from any Pakistani city. Karachi is closer to Jeddah than it is to Gilgit.' },
      { q: 'Which airlines fly Karachi to Jeddah?', a: 'Saudia, PIA, Airblue and flynas all operate the route. Our group departures typically use Saudia or PIA; the exact carrier is confirmed in writing before the balance is due.' },
      { q: 'Is Umrah cheaper from Karachi than from Lahore?', a: 'Sometimes, because the route has more carriers competing on it. Where a Karachi departure genuinely prices lower we pass it through. Where it prices higher, we say so rather than quietly averaging it.' },
      { q: 'Do you have an office in Karachi?', a: 'Our office is in Lahore. Karachi enquiries are handled by phone and WhatsApp, and a local representative meets every Karachi group at Jinnah International on departure day. We would rather tell you that plainly than list a Karachi address that is really a postbox.' },
      { q: 'Where is group assembly at Jinnah International?', a: 'International departures, three hours before the flight. The group leader carries a Muhammad Travels sign and calls every booked pilgrim the evening before with the exact meeting point.' },
    ],
  },

  /* ------------------------------------------------------------- ISLAMABAD */
  {
    slug: 'islamabad',
    name: 'Islamabad',
    province: 'Islamabad Capital Territory',
    airport: 'Islamabad International Airport',
    iata: 'ISB',
    h1: 'Umrah Packages from Islamabad',
    title: 'Umrah Packages from Islamabad 2026 | Muhammad Travels',
    metaDescription:
      'Umrah packages from Islamabad from PKR 295,000 per person. Direct flights from Islamabad International, serving Rawalpindi and the north. MoRA-licensed operator.',
    answer:
      'Umrah packages from Islamabad start at PKR 295,000 per person and depart from Islamabad International Airport on direct Saudia and PIA services to Jeddah, roughly five hours. All packages are available from Islamabad with no departure supplement.',
    intro: [
      'Islamabad International serves not only the capital but Rawalpindi, Abbottabad, Murree and much of the Hazara belt, and a large share of our Islamabad group are travelling in from outside the city on the morning of departure.',
      'That shapes how we schedule. Islamabad group assembly is set with the road journey in mind rather than the flight alone, and the group leader confirms with every pilgrim travelling more than two hours by road the evening before — because the person who misses the flight is almost never the one who lives nearest the airport.',
      'The Islamabad–Jeddah sector is the longest of our three direct routes at around five hours. Pilgrims flying from here in the summer months should plan on entering Ihram at the airport rather than at home.',
    ],
    carriers: ['Saudia', 'PIA', 'Airblue'],
    routing: 'Direct Islamabad (ISB) → Jeddah (JED). Return commonly from Madinah (MED) direct.',
    flightTime: 'approximately 5h direct',
    supplement: 0,
    supplementNote: 'No departure supplement. Islamabad prices match the headline prices on every package page.',
    localPresence:
      'Islamabad enquiries are handled by the Lahore office by phone and WhatsApp. A representative meets every Islamabad group at the airport on departure day.',
    image: cityImages.islamabad,
    faqs: [
      { q: 'How much does an Umrah package from Islamabad cost?', a: 'From PKR 295,000 per person for 14 nights on quad sharing, including direct return flights, the Nusuk visa, named hotels, transfers and daily breakfast. There is no Islamabad departure supplement.' },
      { q: 'How long is the flight from Islamabad to Jeddah?', a: 'Around five hours direct — the longest of our three direct sectors. Plan to enter Ihram at the airport rather than several hours earlier at home, particularly in summer.' },
      { q: 'Does this cover pilgrims from Rawalpindi?', a: 'Yes. Islamabad International serves Rawalpindi, and a large share of every Islamabad group travels in from Rawalpindi, Abbottabad, Murree and the wider Hazara region. Tell us your road journey time when you book so assembly is set to suit it.' },
      { q: 'Which airlines fly Islamabad to Jeddah?', a: 'Saudia, PIA and Airblue. Our group departures typically use Saudia or PIA, with the carrier confirmed in writing before the balance falls due.' },
      { q: 'What time does the group assemble?', a: 'Three hours before departure at international departures, adjusted where the group includes pilgrims travelling several hours by road. The group leader calls everyone the evening before to confirm.' },
      { q: 'Do you have an office in Islamabad?', a: 'No — our office is in Lahore and we would rather say so than list an address that is not a real staffed premises. Islamabad enquiries are handled by phone and WhatsApp, and a representative meets every group at the airport.' },
    ],
  },

  /* ---------------------------------------------------------------- MULTAN */
  {
    slug: 'multan',
    name: 'Multan',
    province: 'Punjab',
    airport: 'Multan International Airport',
    iata: 'MUX',
    h1: 'Umrah Packages from Multan',
    title: 'Umrah Packages from Multan 2026 | Muhammad Travels',
    metaDescription:
      'Umrah packages from Multan from PKR 295,000 per person. Seasonal direct flights from Multan International, or a coach connection to Lahore. MoRA-licensed operator.',
    answer:
      'Umrah packages from Multan start at PKR 295,000 per person. Multan International operates seasonal direct services to Jeddah; where no direct flight runs on your date, we route you via Lahore with the coach transfer included rather than charged as an extra.',
    intro: [
      'Multan is the most honest page on this site to write, because the answer depends on the date. Multan International does operate direct services to Jeddah, but they are seasonal and they do not run on every departure we sell.',
      'Where a direct flight exists on your date, you fly direct from Multan at no supplement. Where it does not, we route you via Lahore and include the coach transfer in the price rather than adding it afterwards. We tell you which of the two applies before you pay a deposit, not after.',
      'South Punjab pilgrims are consistently quoted worse than Lahore and Karachi pilgrims across this sector, usually by operators who advertise a national price and then add a connection charge at the end. That practice is the reason this page states the routing explicitly.',
    ],
    carriers: ['Saudia (seasonal direct)', 'flynas (seasonal)', 'Airblue via Lahore'],
    routing:
      'Seasonal direct Multan (MUX) → Jeddah (JED). Where no direct service operates, coach transfer to Lahore (LHE) and direct onward flight — transfer included in the price.',
    flightTime: 'approximately 4h 15m direct where operating; otherwise add a 4h 30m road transfer to Lahore',
    supplement: 0,
    supplementNote:
      'No supplement either way. Where the routing is via Lahore, the coach transfer is included in the package price rather than charged separately at the end.',
    localPresence:
      'Multan enquiries are handled by the Lahore office by phone and WhatsApp. Where a group routes via Lahore, the coach is met by the group leader.',
    image: cityImages.multan,
    faqs: [
      { q: 'Are there direct Umrah flights from Multan?', a: 'Seasonally, yes — Multan International operates direct services to Jeddah at certain times of year, but not on every date. We confirm which applies to your specific departure before you pay a deposit.' },
      { q: 'What happens if there is no direct flight on my date?', a: 'We route you via Lahore and include the coach transfer in the package price. It is not added as a supplement at the end, which is the standard practice in this sector and the reason South Punjab pilgrims are so often quoted a price that grows.' },
      { q: 'How much does an Umrah package from Multan cost?', a: 'From PKR 295,000 per person for 14 nights on quad sharing — the same headline price as Lahore, with the connection included where one is needed.' },
      { q: 'How long is the road transfer to Lahore?', a: 'Roughly four and a half hours by coach. Where this applies, we schedule it so you arrive with time to rest before the flight rather than moving straight from coach to check-in.' },
      { q: 'Can I just book my own flight to Lahore and join there?', a: 'Yes, and some pilgrims prefer to. Tell us at the time of booking and we will price the package without the Multan leg. We do not charge for a transfer you are not using.' },
      { q: 'Where do I enter Ihram if I am connecting through Lahore?', a: 'At Lahore, before the international flight — not in Multan. The group leader confirms this with every connecting pilgrim, because entering Ihram too early is a common and avoidable difficulty.' },
    ],
  },

  /* ----------------------------------------------------------- FAISALABAD */
  {
    slug: 'faisalabad',
    name: 'Faisalabad',
    province: 'Punjab',
    airport: 'Faisalabad International Airport',
    iata: 'LYP',
    h1: 'Umrah Packages from Faisalabad',
    title: 'Umrah Packages from Faisalabad 2026 | Muhammad Travels',
    metaDescription:
      'Umrah packages from Faisalabad from PKR 295,000 per person. Limited direct services from Faisalabad International, or an included coach to Lahore. MoRA-licensed.',
    answer:
      'Umrah packages from Faisalabad start at PKR 295,000 per person. Faisalabad International has limited direct service to Jeddah, so most departures route by included coach transfer to Lahore — around two and a half hours — and fly direct from there.',
    intro: [
      'Faisalabad International handles a modest international schedule and direct Jeddah service is limited. For most of our departures, the practical route for a Faisalabad pilgrim is a coach to Lahore and a direct flight from there.',
      'Lahore is only about two and a half hours away by road, which makes Faisalabad the easiest of our connecting cities. The coach is included in the price, and we schedule it to arrive with rest time before check-in rather than running it tight.',
      'Where a direct Faisalabad service does operate on a date we are selling, we will tell you and price it accordingly. We do not advertise a direct flight and then quietly route you through Lahore, which is a complaint we hear regularly about this city.',
    ],
    carriers: ['Airblue (limited direct)', 'Saudia via Lahore', 'PIA via Lahore'],
    routing:
      'Limited direct Faisalabad (LYP) → Jeddah (JED). Most departures: included coach transfer to Lahore (LHE), then direct onward flight.',
    flightTime: 'approximately 2h 30m road transfer to Lahore, then 4h 30m direct',
    supplement: 0,
    supplementNote:
      'No supplement. The coach transfer to Lahore is included in the package price where it applies.',
    localPresence:
      'Faisalabad enquiries are handled by the Lahore office by phone and WhatsApp. The coach is met by the group leader at Lahore.',
    image: cityImages.faisalabad,
    faqs: [
      { q: 'Are there direct Umrah flights from Faisalabad?', a: 'Direct Jeddah service from Faisalabad International is limited and does not operate on most of our departure dates. Where it does, we say so and price it accordingly; where it does not, we include the coach to Lahore rather than adding it as a charge.' },
      { q: 'How long does it take to get from Faisalabad to Lahore?', a: 'About two and a half hours by coach on the motorway — the shortest connection of any of our departure cities. We schedule it to arrive with rest time before check-in.' },
      { q: 'How much does an Umrah package from Faisalabad cost?', a: 'From PKR 295,000 per person for 14 nights on quad sharing, the same headline price as Lahore, with the connecting transfer included where it is needed.' },
      { q: 'Is the transfer to Lahore included?', a: 'Yes, in the package price. If you would rather make your own way to Lahore, tell us at booking and we will price the package without it.' },
      { q: 'Where do I enter Ihram?', a: 'At Lahore before the international flight, not in Faisalabad. The group leader confirms this with every connecting pilgrim — entering Ihram before a long road journey makes the day considerably harder than it needs to be.' },
      { q: 'Will I be with the Faisalabad group throughout?', a: 'You join the main group at Lahore and travel together from there — same flight, same coach in Saudi Arabia, same hotel floor. The connection is only the first leg.' },
    ],
  },

  /* ------------------------------------------------------------- PESHAWAR */
  {
    slug: 'peshawar',
    name: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    airport: 'Bacha Khan International Airport',
    iata: 'PEW',
    h1: 'Umrah Packages from Peshawar',
    title: 'Umrah Packages from Peshawar 2026 | Muhammad Travels',
    metaDescription:
      'Umrah packages from Peshawar from PKR 305,000 per person. Seasonal direct flights from Bacha Khan International, or a connection via Islamabad. MoRA-licensed.',
    answer:
      'Umrah packages from Peshawar start at PKR 305,000 per person. Bacha Khan International operates seasonal direct services to Jeddah; where none runs on your date, we route via Islamabad — around two hours by road — with the transfer included in the price.',
    intro: [
      'Peshawar is the one city on this list that carries a genuine supplement, and it is PKR 10,000 per person. We would rather publish that figure than bury it, because a price that changes at the end is the most common complaint pilgrims from Khyber Pakhtunkhwa raise about this sector.',
      'The supplement exists because Bacha Khan International’s direct Jeddah service is seasonal and the connecting route via Islamabad carries a real cost we cannot absorb entirely. Where a direct Peshawar service operates on your date, the supplement does not apply and we say so.',
      'Peshawar and the wider KP region send a large number of pilgrims each season, and they are routinely quoted a national headline price by operators who then add the connection charge once the deposit has been paid. This page states the figure before you contact us.',
    ],
    carriers: ['Saudia (seasonal direct)', 'PIA via Islamabad', 'Airblue via Islamabad'],
    routing:
      'Seasonal direct Peshawar (PEW) → Jeddah (JED). Where no direct service operates, included road transfer to Islamabad (ISB), then direct onward flight.',
    flightTime: 'approximately 4h 45m direct where operating; otherwise a 2h road transfer to Islamabad, then 5h direct',
    supplement: 10000,
    supplementNote:
      'PKR 10,000 per person, published rather than added later. Waived entirely on dates where a direct Peshawar service operates.',
    localPresence:
      'Peshawar enquiries are handled by the Lahore office by phone and WhatsApp. Connecting groups are met at Islamabad by the group leader.',
    image: cityImages.peshawar,
    faqs: [
      { q: 'How much does an Umrah package from Peshawar cost?', a: 'From PKR 305,000 per person for 14 nights on quad sharing. That is the headline PKR 295,000 plus a published PKR 10,000 departure supplement, which is waived on dates where a direct Peshawar service operates.' },
      { q: 'Why is there a supplement from Peshawar?', a: 'Direct Jeddah service from Bacha Khan International is seasonal, and the connection via Islamabad carries a real cost. We publish the figure rather than adding it after a deposit, which is the practice pilgrims from KP most often complain about.' },
      { q: 'Are there direct Umrah flights from Peshawar?', a: 'Seasonally, yes. Where a direct service operates on your departure date, you fly direct from Peshawar and the supplement does not apply. We confirm which applies before you pay anything.' },
      { q: 'How long is the transfer to Islamabad?', a: 'About two hours by road on the motorway. The transfer is included in the price and scheduled to arrive with rest time before check-in.' },
      { q: 'Where do I enter Ihram?', a: 'At Islamabad before the international flight if you are connecting, or at Peshawar if you are flying direct. The group leader confirms this individually — it is the question connecting pilgrims most often get wrong.' },
      { q: 'Do you have a representative in Peshawar?', a: 'Not a staffed office. Enquiries are handled from Lahore by phone and WhatsApp, and connecting groups are met at Islamabad. We list what actually exists rather than an address that is not a real premises.' },
    ],
  },
];

/* ============================================================================
   ACCESSORS
   ========================================================================= */

export const citySlugs = cities.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function cityName(slug: string): string {
  return getCity(slug)?.name ?? slug;
}
