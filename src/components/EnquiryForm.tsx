'use client';

import { useState } from 'react';
import { WhatsApp, ArrowRight } from './icons';
import { whatsappHref } from '@/lib/site';
import { cities } from '@/lib/cities';
import { months } from '@/lib/months';

/* ============================================================================
   ENQUIRY FORM
   ============================================================================
   Spec §05: "SIX FIELDS MAXIMUM: name, phone, departure city, travellers,
   month, message. Every extra field costs completions."
   That is exactly six below. Do not add a seventh.

   Spec §07 mobile requirements, all applied:
     · `type="tel"` and `inputMode="tel"` on phone — summons the numeric keypad
     · correct `autoComplete` tokens on every field
     · 16px minimum font size, so iOS never zooms on focus
     · 48px minimum control height, exceeding the 44×44px tap target minimum

   Spec §09 build stack: "Forms — WhatsApp primary, form secondary."
   Submitting composes the answers into a pre-filled WhatsApp message and hands
   off to WhatsApp, which is where this transaction actually closes (§14).

   ⚠️  TO ADD THE SECONDARY PATH: wire `onSubmit` to a server action or API
   route that emails the enquiry, so pilgrims without WhatsApp are not turned
   away. Track the submit as an analytics event — Spec §13 lists "WhatsApp
   click, call click and form submit tracked as events" as a High item.
   ========================================================================= */

const field =
  'field';
const label =
  'mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-antique';

export default function EnquiryForm({
  packageName,
}: {
  /** Package pages pass their name so the message arrives with context. */
  packageName?: string;
}) {
  const [state, setState] = useState({
    name: '',
    phone: '',
    city: '',
    travellers: '2',
    month: '',
    message: '',
  });

  const set = (k: keyof typeof state) => (v: string) =>
    setState((s) => ({ ...s, [k]: v }));

  function compose() {
    const lines = [
      'Assalamu alaikum.',
      packageName
        ? `I'd like to enquire about the ${packageName}.`
        : `I'd like to enquire about your Umrah packages.`,
      '',
      state.name && `Name: ${state.name}`,
      state.phone && `Phone: ${state.phone}`,
      state.city && `Departing from: ${state.city}`,
      state.travellers && `Travellers: ${state.travellers}`,
      state.month && `Preferred month: ${state.month}`,
      state.message && `\n${state.message}`,
    ].filter(Boolean);

    return lines.join('\n');
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappHref(compose()), '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={onSubmit} className="surface-card p-6 lg:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* 1 — Name */}
        <div>
          <label className={label} htmlFor="ef-name">
            Your name
          </label>
          <input
            id="ef-name"
            className={field}
            type="text"
            name="name"
            autoComplete="name"
            required
            value={state.name}
            onChange={(e) => set('name')(e.target.value)}
            placeholder="Full name"
          />
        </div>

        {/* 2 — Phone. type=tel + inputMode=tel per Spec §07. */}
        <div>
          <label className={label} htmlFor="ef-phone">
            Phone number
          </label>
          <input
            id="ef-phone"
            className={field}
            type="tel"
            inputMode="tel"
            name="phone"
            autoComplete="tel"
            required
            value={state.phone}
            onChange={(e) => set('phone')(e.target.value)}
            placeholder="03XX XXXXXXX"
          />
        </div>

        {/* 3 — Departure city */}
        <div>
          <label className={label} htmlFor="ef-city">
            Departing from
          </label>
          <select
            id="ef-city"
            className={field}
            name="city"
            value={state.city}
            onChange={(e) => set('city')(e.target.value)}
          >
            <option value="">Select a city</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4 — Travellers */}
        <div>
          <label className={label} htmlFor="ef-travellers">
            Travellers
          </label>
          <input
            id="ef-travellers"
            className={field}
            type="number"
            inputMode="numeric"
            min={1}
            max={60}
            name="travellers"
            value={state.travellers}
            onChange={(e) => set('travellers')(e.target.value)}
          />
        </div>

        {/* 5 — Month */}
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ef-month">
            Preferred month
          </label>
          <select
            id="ef-month"
            className={field}
            name="month"
            value={state.month}
            onChange={(e) => set('month')(e.target.value)}
          >
            <option value="">Select a month</option>
            {months.map((m) => (
              <option key={m.value} value={m.label}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* 6 — Message */}
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ef-message">
            Anything we should know
          </label>
          <textarea
            id="ef-message"
            className={`${field} min-h-[110px] resize-y`}
            name="message"
            rows={4}
            value={state.message}
            onChange={(e) => set('message')(e.target.value)}
            placeholder="Mobility needs, room preferences, questions about a specific package…"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-base btn-whatsapp mt-6 w-full"
        data-analytics="form-submit"
      >
        <WhatsApp width={19} height={19} />
        Send this on WhatsApp
        <ArrowRight width={17} height={17} />
      </button>

      <p className="mt-4 text-[13px] leading-5 text-stone">
        This opens WhatsApp with your details filled in — nothing is sent until
        you press send there. We reply during office hours and always in
        writing, with hotels named and exclusions listed.
      </p>
    </form>
  );
}
