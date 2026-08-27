import type { Faq } from './packages';

/* ============================================================================
   SITE-LEVEL FAQ SETS
   ============================================================================
   Spec §11, "The formatting that gets you quoted":
     · 40–60 word self-contained answer immediately under each heading
     · One concept per section, understandable in isolation
     · Specific checkable facts
     · Eight to twelve FAQs per money page, each answer standing alone in
       40–100 words

   Every answer below is written to stand alone if an assistant lifts it out of
   the page, which is the point.
   ========================================================================= */

/** Home page — Spec §03 block 10: "Six to eight questions with FAQPage schema." */
export const homeFaqs: Faq[] = [
  {
    q: 'Is Muhammad Travels a licensed Hajj and Umrah operator?',
    a: 'Yes. We hold our own Umrah attestation and Hajj Group Organiser registration with the Ministry of Religious Affairs and Interfaith Harmony. Both numbers are published on our licence page, along with step-by-step instructions for checking them against the Ministry’s published list of certified operators. Verify before you pay anyone, including us.',
  },
  {
    q: 'How much does an Umrah package from Pakistan cost?',
    a: 'Our packages run from PKR 265,000 per person for ten nights on quad sharing to PKR 745,000 for the full month of Ramadan. Every price includes return flights, the Nusuk visa, named hotels, transfers and daily breakfast, and every price on this site carries a validity date.',
  },
  {
    q: 'How far are your hotels from the Haram?',
    a: 'We publish the exact distance in metres for every hotel on every package, because it is the most decisive comparison in this category. Our packages range from 850 metres to 180 metres from Masjid al-Haram, and from 400 metres to 50 metres from Al-Masjid an-Nabawi.',
  },
  {
    q: 'Do you issue the Umrah visa yourselves?',
    a: 'Yes. Because we hold our own MoRA Umrah attestation, we issue visas through Nusuk Masar in our own name. There is no third-party agent between you and the visa, no commission structure, and no partner whose licence you would need to check instead of ours.',
  },
  {
    q: 'What is not included in your package prices?',
    a: 'Meals beyond those listed, vaccinations, travel insurance, excess baggage, Saudi inter-city transport beyond the Makkah–Madinah transfer, and personal expenses. Every package page lists its exclusions in full, given the same visual weight as the inclusions — deliberately.',
  },
  {
    q: 'How do I pay, and what happens if I cancel?',
    a: 'A deposit confirms your seat and the balance falls due before visa submission. We issue a receipt for every payment and prefer bank transfer to the company account. Full cancellation terms and the refund schedule are published on our refunds page — read them before transferring money.',
  },
  {
    q: 'Which cities do you depart from?',
    a: 'Lahore, Karachi, Islamabad, Multan, Faisalabad and Peshawar. Lahore, Karachi and Islamabad have direct services with no supplement. Multan and Faisalabad connect via Lahore with the transfer included, and Peshawar carries a published PKR 10,000 supplement where no direct service operates.',
  },
  {
    q: 'How do I check that any Umrah operator is genuine?',
    a: 'Ask for the registered company name and licence number, check both against the Ministry’s published certified-operator list, visit the office in person, insist on a receipt for every payment, and refuse any request for cash without one. Our guide to verifying an operator sets out the full checklist.',
  },
];

/** /umrah/ hub. */
export const umrahHubFaqs: Faq[] = [
  {
    q: 'What is the cheapest Umrah package from Pakistan?',
    a: 'Our lowest-priced package is the 10-night Economy Umrah from PKR 265,000 per person on quad sharing, including return flights, the Nusuk visa, named hotels, all transfers and daily breakfast. Packages advertised far below this usually exclude something significant — always compare the exclusions list, not the headline.',
  },
  {
    q: 'How long should an Umrah trip be?',
    a: 'Ten nights is enough to perform Umrah unhurried, fourteen is the most common choice, and twenty-one allows the eight-day Arbaeen in Madinah. Because airfare and the visa cost the same regardless of length, longer trips are considerably better value per night.',
  },
  {
    q: 'What is included in an Umrah package?',
    a: 'Return economy airfare, the Umrah visa through Nusuk Masar, hotel accommodation in Makkah and Madinah, all airport and intercity transfers, daily breakfast, guided Ziyarat in both cities and a group leader throughout. Meals beyond breakfast, insurance and vaccinations are not included.',
  },
  {
    q: 'When is the best time to perform Umrah?',
    a: 'Winter months are cooler and suit older pilgrims. Rajab and Shaban are a strong secondary peak at close to ordinary rates. Ramadan carries the greatest reward and the highest cost, and needs booking four to five months ahead.',
  },
  {
    q: 'How far in advance should I book Umrah?',
    a: 'Six to eight weeks for ordinary dates, and four to five months for Ramadan. Hotels within 300 metres of either Haram sell their allocation first, so late booking usually means paying more for a hotel further away.',
  },
  {
    q: 'Do you offer Umrah packages without flights?',
    a: 'Yes, as a land package for pilgrims already holding a ticket or travelling from outside Pakistan. Message us on WhatsApp with your dates and we will quote the hotel, transfer and visa components separately.',
  },
  {
    q: 'What documents do I need for an Umrah visa?',
    a: 'A machine-readable passport valid for at least six months beyond travel, passport photographs to the current specification, proof of vaccination as required at the time, and a NADRA CNIC. Women under 45 travelling without a mahram are subject to current Saudi rules, which change — we confirm the position at the time of booking.',
  },
  {
    q: 'Can I add days to a package?',
    a: 'Often yes, subject to visa validity and seat availability on a later return. Ask before booking rather than after — changing a ticket that has already been issued costs considerably more than building the extra nights in from the start.',
  },
];

/** /hajj/ hub. */
export const hajjHubFaqs: Faq[] = [
  {
    q: 'How much does Hajj cost from Pakistan?',
    a: 'Our packages run from PKR 1,450,000 per person for the long scheme of approximately 38 days to PKR 2,850,000 for the premium package with an upgraded Mina camp. All include the Hajj visa under our own HGO registration, tents at Mina and Arafat, Mashaer transport and full board during the rites.',
  },
  {
    q: 'Why does a shorter Hajj package cost more than a longer one?',
    a: 'Because the expensive components are fixed. Mina and Arafat tents, Mashaer transport, the Hajj visa and Qurbani logistics cost the same whether you stay 21 days or 38. A shorter package removes cheap hotel nights, not expensive Hajj days, and short-scheme airfare prices higher.',
  },
  {
    q: 'How is the Pakistan Hajj quota allocated?',
    a: 'The Saudi authorities allocate a national quota to Pakistan, which the Ministry of Religious Affairs divides between the government scheme and licensed private Hajj Group Organisers. Our allocation is confirmed each year and published on our licence page with the current-year quota status.',
  },
  {
    q: 'When do Hajj applications open?',
    a: 'After the Ministry announces the Hajj scheme for the year, typically six to eight months before Hajj. Any operator selling you confirmed Hajj dates before the scheme is announced is not in a position to guarantee them.',
  },
  {
    q: 'What is the Mina tent category and why does it matter?',
    a: 'Tent category determines your position in Mina, whether the tent is air-conditioned, and how far you walk to the Jamarat bridge — a walk you repeat over several days in extreme heat. It is the single biggest variable in Hajj pricing and the most common place a package quietly under-delivers.',
  },
  {
    q: 'Is Qurbani included in your Hajj packages?',
    a: 'No. Qurbani is payable separately at cost and passed through without a markup on every package we run. We list it as an exclusion rather than bundling it, because bundling invites a dispute about what was actually paid on your behalf.',
  },
  {
    q: 'Are you registered to operate Hajj?',
    a: 'Yes. We hold our own Hajj Group Organiser registration with the Ministry of Religious Affairs and Interfaith Harmony. The registration number and current-year quota status are published on our licence page with instructions for verifying both against the Ministry list.',
  },
  {
    q: 'What happens if I do not receive a seat under the quota?',
    a: 'Your money is returned in full. A quota shortfall is not a cancellation by you and is not treated as one. The exact terms are published on our refunds page — read them before you pay.',
  },
];

/** /licence/ — the trust page. */
export const licenceFaqs: Faq[] = [
  {
    q: 'How do I check if an Umrah operator is government-approved in Pakistan?',
    a: 'The Ministry of Religious Affairs and Interfaith Harmony publishes lists of registered Hajj Group Organisers and attested Umrah operators. Search the list for the operator’s registered company name — not their trading name — and match the licence number they have given you. If either does not match, stop.',
  },
  {
    q: 'What is the difference between a Hajj HGO licence and an Umrah attestation?',
    a: 'They are separate authorisations. Hajj Group Organiser registration permits an operator to run Hajj groups under the Ministry scheme with an allocated quota. Umrah attestation permits Umrah visa processing through Nusuk Masar. An operator may hold one without the other, so check for the one you need.',
  },
  {
    q: 'Why do you publish your licence numbers on the website?',
    a: 'Because fraud is the deciding anxiety in this market, and most operators bury licence details in the footer if they show them at all. Putting the numbers in the trust bar, the footer and a dedicated page — and telling you how to check them — answers the question before you have to ask it.',
  },
  {
    q: 'What should I do if an operator refuses to give a licence number?',
    a: 'Walk away. A licensed operator has no reason to withhold a number that is already published on a government list. Refusal, delay, or a number that does not appear on the Ministry list are three of the clearest fraud signals in this sector.',
  },
  {
    q: 'Can I visit your office to verify you exist?',
    a: 'Yes, during opening hours and without an appointment. A verifiable physical premises is one of the strongest signals available to you, and one of the hardest for a fraudulent operator to fake. Come and see it before you transfer money.',
  },
  {
    q: 'Does a licence guarantee good service?',
    a: 'No, and we would not claim otherwise. A licence means the operator is accountable to a regulator and can be traced. It does not tell you whether the hotel is where they said it was. Check the licence first, then check the specifics — named hotels, exact distances and written terms.',
  },
];
