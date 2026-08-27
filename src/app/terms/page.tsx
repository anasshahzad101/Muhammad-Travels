import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';
import { site, absUrl } from '@/lib/site';
import { architecture } from '@/lib/images';

/* ============================================================================
   /terms/
   ============================================================================
   Spec §03: "P3 · Trust and compliance baseline."
   ⚠️  Drafted for readability, not as legal advice. Have a lawyer review before
   launch. See the notice rendered at the top of the page.
   ========================================================================= */

const crumbs = [{ name: 'Terms', href: '/terms/' }];

export const metadata: Metadata = {
  title: 'Terms & Conditions | Muhammad Travels',
  description:
    'The terms on which we sell Hajj and Umrah packages: bookings, payment, documents, changes, our responsibilities and yours, and how complaints are handled.',
  alternates: { canonical: absUrl('/terms/') },
};

const sections: LegalSection[] = [
  {
    heading: 'Who these terms are with',
    paragraphs: [
      `These terms are between you and ${site.legalName}, trading as ${site.name}, a Hajj and Umrah operator registered with the ${site.verification.ministryName}. Our licence numbers and registered company name are published in full on our licence page.`,
      'When you book with us you contract with us directly. We are the operator of record: we hold the licences, we process your visa in our own name, and we carry the service obligation. There is no third party whose terms you also need to read.',
    ],
  },
  {
    heading: 'Making a booking',
    paragraphs: [
      'A booking is confirmed when we have received your deposit and issued you a written confirmation naming the package, the departure date, both hotels, the room category and the total price. A verbal agreement, a WhatsApp message or a receipt on its own is not a confirmed booking.',
      'If anything in that written confirmation differs from what you were told verbally, tell us immediately. The written confirmation is what we are accountable to.',
    ],
  },
  {
    heading: 'Prices and what they include',
    paragraphs: [
      'Every price published on this website is per person and carries a validity date. Prices are held for the validity period stated. After that date, prices may change to reflect airline, hotel and exchange-rate movements.',
      'Each package page lists what is included and what is excluded, given equal prominence. Anything not listed as included is excluded. Where a departure city carries a supplement, that supplement is published on the city page rather than added after a deposit.',
    ],
  },
  {
    heading: 'Payment',
    paragraphs: [
      'A deposit confirms your seat, with the balance falling due before visa submission. We will confirm the exact balance date in writing at the time of booking.',
      'Payment is by bank transfer to the company account. We issue a receipt on company letterhead for every payment received. We do not request payment to a personal account, and you should refuse any operator who does.',
    ],
  },
  {
    heading: 'Documents and visas',
    paragraphs: [
      'You are responsible for holding a valid machine-readable passport with sufficient validity, a valid CNIC, and any vaccinations required at the time of travel. We will tell you what is required, but we cannot obtain these on your behalf.',
      'Umrah and Hajj visas are issued by the Saudi authorities, through Nusuk Masar and under the Ministry scheme respectively. We submit a complete and prompt application; we cannot guarantee the outcome and neither can any other operator. Our refunds page sets out what happens if a visa is refused.',
      'Where we hold your passport for visa processing, we issue a signed receipt listing the passport number, the date taken and the expected date of return.',
    ],
  },
  {
    heading: 'Changes by us',
    paragraphs: [
      'Airlines retime seasonal flights and hotels occasionally fail to honour an allocation. Where this happens we will notify every booked pilgrim in writing, and we will provide an equivalent or better alternative at no additional cost.',
      'Where a hotel is substituted, the replacement will be at the same or a shorter distance from the Haram than the one you booked. The distance in metres is what we sold you and it is what we hold ourselves to.',
      'Where a change is significant and you do not accept the alternative, you may cancel for a full refund of amounts paid.',
    ],
  },
  {
    heading: 'Changes and cancellation by you',
    paragraphs: [
      'Cancellation terms and the refund schedule are published in full on our refunds page, separately for Umrah and Hajj. Please read them before paying a deposit.',
      'Where a name change is possible under the airline and visa rules, we will transfer your booking to another named person rather than treating it as a cancellation, and we will charge only the genuine cost of doing so.',
    ],
  },
  {
    heading: 'Conduct and group travel',
    paragraphs: [
      'Our packages are group departures with a group leader. We ask that you keep to the group timings for transfers and flights, since a delay affects everybody travelling with you.',
      'We may decline to carry, or may curtail the arrangements of, any pilgrim whose conduct endangers or seriously disrupts other members of the group. This is a last resort and has never yet been necessary.',
    ],
  },
  {
    heading: 'Health, mobility and insurance',
    paragraphs: [
      'Tell us about mobility needs, medical conditions, dialysis schedules or refrigerated medication when you enquire, not at check-in. We will confirm in writing what the hotels and the itinerary can accommodate, and we will tell you honestly when a package is not suitable.',
      'Travel and medical insurance is not included in any package and we do not sell it. We strongly recommend it, particularly for pilgrims over sixty.',
    ],
  },
  {
    heading: 'Limits on our responsibility',
    paragraphs: [
      'We are responsible for the services we have agreed in writing to provide. We are not responsible for events outside our reasonable control, including decisions of the Saudi or Pakistani authorities, airline schedule changes, Haram capacity restrictions, weather, or civil disruption.',
      'Where such an event prevents delivery of part of the package, we will refund the value of the affected component to the extent we recover it, and we will show you what was recovered.',
    ],
  },
  {
    heading: 'Complaints',
    paragraphs: [
      'If something goes wrong, tell the group leader while you are still travelling — most problems can be fixed on the spot and cannot be fixed afterwards.',
      `If you remain dissatisfied, write to us at ${site.email} with your booking reference. We reply to every complaint in writing. You may also complain to the ${site.verification.ministryName}, citing our registration number, which is published on our licence page.`,
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of the Islamic Republic of Pakistan, and the courts of Pakistan have jurisdiction over any dispute arising from them.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & conditions"
      answer="These terms cover how bookings are made and confirmed, what prices include, how and when payment is due, who is responsible for documents and visas, what happens when arrangements change, and how complaints are handled. Cancellation terms are published separately on our refunds page."
      crumbs={crumbs}
      image={architecture.mosaicSunset}
      updated="2026-08-25"
      sections={sections}
      notice="These terms are drafted to be readable rather than to be impenetrable, and they are a starting point for this build — not legal advice. Have a lawyer review and finalise them before this site goes live, particularly the sections on payment handling and limits of responsibility."
    />
  );
}
