/* ============================================================================
   PAYMENT, CANCELLATION AND REFUND TERMS
   ============================================================================
   Spec §04: "Payment & refunds — deposit, schedule, cancellation terms. Stated
   plainly."
   Spec §03: "/refunds/ — Convert the cautious buyer."
   Spec §13 Blocker: "Refund and cancellation terms published."

   The spec is explicit that the refunds page is a conversion asset rather than
   a legal formality (§02 sitemap: "Refunds page is a conversion asset"). A
   buyer worried about fraud reads the cancellation terms before the itinerary.

   ⚠️  THESE ARE ILLUSTRATIVE TERMS, NOT LEGAL ADVICE, AND NOT YOUR TERMS.
   Deposit levels, notice periods and refund percentages are commercial and
   legal decisions specific to your business, your supplier contracts and
   Pakistani consumer law. Have a lawyer settle them, then replace this file.
   Publishing terms you cannot honour is worse than publishing none.
   ========================================================================= */

export type PolicyRow = { window: string; refund: string; note: string };

export const payment = {
  depositLabel: 'Booking deposit',
  depositNote:
    'A deposit confirms your seat on a fixed group departure. We issue a receipt on company letterhead for every payment received.',
  balanceLabel: 'Balance',
  balanceNote:
    'The balance falls due before visa submission, typically three to six weeks before departure. We confirm the exact date in writing at the time of booking.',
  methodLabel: 'How to pay',
  methodNote:
    'Bank transfer to the company account. We do not ask for payment to a personal account, and you should refuse any operator who does — including us.',
  receiptLabel: 'Receipts',
  receiptNote:
    'Every payment is receipted on company letterhead, showing the amount, the date and what it is for. Keep them.',
};

/** Umrah cancellation schedule. */
export const umrahCancellation: PolicyRow[] = [
  {
    window: 'More than 45 days before departure',
    refund: 'Full refund less the deposit',
    note: 'The deposit covers costs already committed to hotels and the airline.',
  },
  {
    window: '30–45 days before departure',
    refund: 'Refund less deposit and any issued airfare',
    note: 'Once a ticket is issued, the airline’s own cancellation rules apply and we pass through what we recover.',
  },
  {
    window: '15–29 days before departure',
    refund: 'Partial refund — hotel and visa costs deducted',
    note: 'Hotel allocations become non-refundable inside this window.',
  },
  {
    window: 'Less than 15 days before departure',
    refund: 'No refund',
    note: 'All costs are committed by this point. We will still transfer your booking to another named person where the airline and visa rules allow.',
  },
];

/** Hajj cancellation is governed by the Ministry scheme as well as our terms. */
export const hajjCancellation: PolicyRow[] = [
  {
    window: 'Before quota allocation is confirmed',
    refund: 'Full refund',
    note: 'Nothing is committed until the allocation is confirmed under the Ministry scheme.',
  },
  {
    window: 'After allocation, more than 60 days before departure',
    refund: 'Refund less deposit and committed Mashaer costs',
    note: 'Mina and Arafat tent allocations are purchased well ahead and are not recoverable.',
  },
  {
    window: 'Less than 60 days before departure',
    refund: 'No refund',
    note: 'Transfer to another eligible pilgrim may be possible subject to Ministry and Saudi approval.',
  },
];

/** Circumstances where the money comes back regardless of the schedule above. */
export const guarantees = [
  {
    title: 'If your visa is refused',
    body: 'A full refund of everything except costs already irrecoverably committed, and a written account of exactly what those were. Visa outcomes are determined by the Saudi authorities and no operator controls them.',
  },
  {
    title: 'If we cancel the departure',
    body: 'A full refund with no deductions, or a transfer to another departure at no additional cost — your choice, not ours.',
  },
  {
    title: 'If you do not receive a Hajj quota seat',
    body: 'A full refund. A quota shortfall is not a cancellation by you and is not treated as one.',
  },
  {
    title: 'If we cannot deliver the hotel we sold you',
    body: 'A move to an equivalent or better property at the same or a shorter distance from the Haram, at our cost — or a refund of the difference. The distance in metres is what we sold you, and it is what we are accountable for.',
  },
];
