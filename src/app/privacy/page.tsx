import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';
import { site, absUrl } from '@/lib/site';
import { architecture } from '@/lib/images';

/* ============================================================================
   /privacy/
   ============================================================================
   Spec §03: "P3 · Trust and compliance baseline."
   ⚠️  Drafted for readability, not as legal advice. Have a lawyer review before
   launch — particularly the sections on passport data and analytics.
   ========================================================================= */

const crumbs = [{ name: 'Privacy', href: '/privacy/' }];

export const metadata: Metadata = {
  title: 'Privacy Policy | Muhammad Travels',
  description:
    'What personal data we collect when you enquire or book, why we hold it, who we share it with, how long we keep it, and how to ask us to delete it.',
  alternates: { canonical: absUrl('/privacy/') },
};

const sections: LegalSection[] = [
  {
    heading: 'What this policy covers',
    paragraphs: [
      `This policy explains what personal information ${site.legalName}, trading as ${site.name}, collects from you, why we hold it, who we share it with and how long we keep it.`,
      'It covers this website, our WhatsApp and telephone enquiries, and the booking process itself.',
    ],
  },
  {
    heading: 'What we collect',
    list: [
      'Enquiry details: your name, phone number, departure city, number of travellers, preferred month and anything you tell us in the message.',
      'Booking details: full name as it appears in your passport, passport number and expiry, CNIC number, date of birth, contact details and next-of-kin contact.',
      'Health and mobility information, but only where you choose to tell us so that we can arrange suitable accommodation and assistance.',
      'Payment records: the amounts received, dates and the account they came from. We do not store card numbers.',
      'Basic website analytics: pages viewed and how you reached the site.',
    ],
  },
  {
    heading: 'Why we hold it',
    paragraphs: [
      'To quote for and deliver the service you have asked us for. Passport and CNIC details are required to submit a visa application through Nusuk Masar or under the Hajj scheme — there is no way to obtain a visa without them.',
      'Health and mobility information is used only to arrange rooms, transport and assistance appropriately, and is shared only with the people who need it to do that.',
    ],
  },
  {
    heading: 'Who we share it with',
    list: [
      'The Saudi authorities, through Nusuk Masar or the Hajj scheme, as part of your visa application.',
      `The ${site.verification.ministryName}, where required by the scheme or by law.`,
      'Airlines, hotels and ground transport suppliers, limited to what each needs to deliver its part of your trip.',
      'Nobody else. We do not sell your data, we do not share it with other travel agencies, and we do not pass your number to marketing partners.',
    ],
  },
  {
    heading: 'How we look after it',
    paragraphs: [
      'Passports held for visa processing are stored securely and returned against the signed receipt we issue when we take them. Digital records are held on access-controlled systems, and only staff who need a record can see it.',
      'This website is served over HTTPS and does not collect payment details. Do not send passport scans or payment information through any unencrypted channel, to us or to anyone else.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'Booking and payment records are kept for as long as required by Pakistani tax and regulatory obligations, and then deleted.',
      'Enquiries that do not become bookings are deleted within twelve months. If you would like an enquiry deleted sooner, ask us and we will do it.',
    ],
  },
  {
    heading: 'Your choices',
    list: [
      'You can ask us what we hold about you, and we will tell you.',
      'You can ask us to correct anything that is wrong.',
      'You can ask us to delete your data, subject to records we are legally required to retain.',
      'You can ask us to stop contacting you about future departures at any time, and that will not affect a booking already made.',
    ],
    paragraphs: [
      `Write to ${site.email} or visit the office. We respond to every request in writing.`,
    ],
  },
  {
    heading: 'Cookies and analytics',
    paragraphs: [
      'This site uses only what it needs to function and to understand which pages are useful. We do not run advertising trackers or sell audience data.',
      'Analytics tooling is listed in our build documentation and disclosed here before it is enabled. If that changes, this section changes with it and the last-updated date above moves.',
    ],
  },
  {
    heading: 'Contacting us about privacy',
    paragraphs: [
      `Email ${site.email}, call ${site.phone.display}, or come to the office during opening hours. Our full address is published on the contact page and on the licence page.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      answer="We collect what we need to quote for and deliver your trip — contact details when you enquire, and passport and CNIC details when you book, because a visa application cannot be submitted without them. We share it only with the authorities and suppliers who need it, and never sell it."
      crumbs={crumbs}
      image={architecture.ottomanDome}
      updated="2026-08-25"
      sections={sections}
      notice="This policy is drafted to be readable rather than impenetrable, and it is a starting point for this build — not legal advice. Have a lawyer review it before launch, particularly the sections covering passport data and analytics."
    />
  );
}
