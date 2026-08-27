import Link from 'next/link';
import { WhatsApp, Phone, MapPin, Clock, Shield } from './icons';
import { Reveal, RevealRule, DrawIcon } from './Reveal';
import { Eyebrow } from './ui';
import { site, telHref, whatsappHref } from '@/lib/site';

/* ============================================================================
   CONTACT BAND
   ============================================================================
   Spec §03, home page block 11: "WhatsApp, phone, office address, opening
   hours."
   Spec §06: "Section breaks, quotes, CTA bands — Black. Punctuation. Used
   sparingly, they set the rhythm."

   Kept to one per page so it stays punctuation rather than wallpaper.
   ========================================================================= */

export default function CtaBand({
  heading = 'Speak to someone who holds the licence',
  body = 'Message us on WhatsApp with your dates and group size and you will get a written quote naming both hotels, their exact distance to the Haram, and what is excluded — before you are asked for anything.',
  message,
}: {
  heading?: string;
  body?: string;
  message?: string;
}) {
  const text =
    message ??
    `Assalamu alaikum. I'd like a quote. My preferred dates and group size are:`;

  return (
    <section className="on-dark relative bg-kiswah section-tight">
      <div className="hairline-gold absolute inset-x-0 top-0 opacity-70" />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal className="mb-4 flex items-center gap-3">
              <Eyebrow tone="dark">Talk to us</Eyebrow>
              <RevealRule delay={120} className="hairline-gold h-px w-14 shrink-0" />
            </Reveal>

            <Reveal delay={60} as="h2">
              <span className="text-marble">{heading}</span>
            </Reveal>

            <Reveal delay={130} as="p" className="lede mt-5 text-marble/65">
              {body}
            </Reveal>

            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappHref(text)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-whatsapp"
                data-analytics="whatsapp-click"
              >
                <WhatsApp width={19} height={19} />
                Message on WhatsApp
              </a>
              <a
                href={telHref()}
                className="btn-base btn-ghost-dark"
                data-analytics="call-click"
              >
                <Phone width={18} height={18} className="text-hizam" />
                <span className="tabular">{site.phone.display}</span>
              </a>
            </Reveal>
          </div>

          {/* Practical detail — a real office, stated plainly. Spec §01:
              a company handling PKR 300,000 payments has to look like one. */}
          <Reveal delay={160}>
            <dl className="flex flex-col gap-6 border-t border-rule-dark pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <Item icon={<MapPin width={18} height={18} />} label="Office">
                {site.address.streetAddress}
                <br />
                {site.address.addressLocality}, {site.address.addressRegion},
                Pakistan
              </Item>

              <Item icon={<Clock width={18} height={18} />} label="Opening hours">
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} — {h.time}
                  </span>
                ))}
              </Item>

              <Item icon={<Shield width={18} height={18} />} label="Before you pay">
                <Link
                  href="/licence/"
                  className="text-hizam underline decoration-hizam/35 underline-offset-4 transition-colors hover:decoration-hizam"
                >
                  Check our licence numbers
                </Link>{' '}
                against the Ministry’s published list. Do the same for every
                operator you are considering.
              </Item>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Item({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <DrawIcon length={110} className="mt-0.5 shrink-0 text-hizam/70">
        {icon}
      </DrawIcon>
      <div>
        <dt className="eyebrow-dark mb-2">{label}</dt>
        <dd className="text-[15px] leading-[26px] text-marble/70">{children}</dd>
      </div>
    </div>
  );
}
