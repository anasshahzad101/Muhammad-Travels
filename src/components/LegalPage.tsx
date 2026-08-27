import PageHero from './PageHero';
import StickyMobileBar from './StickyMobileBar';
import JsonLd from './JsonLd';
import { Section } from './ui';
import { Reveal, RevealRule } from './Reveal';
import { Info } from './icons';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';
import { slugifyHeading } from '@/lib/guides';
import { formatDateLong, stagger } from '@/lib/utils';
import type { Img } from '@/lib/images';

/* ============================================================================
   LEGAL PAGE TEMPLATE
   ============================================================================
   Spec §03: "/terms/ /privacy/ — P3 · Trust and compliance baseline."

   Shared shell so the two legal pages stay visually consistent with the rest
   of the site rather than dropping into an unstyled wall of text. Legal
   content is still page-specific.

   ⚠️  The wording on the pages using this template is a STARTING POINT drafted
   to be readable, not legal advice. Have a lawyer review both before launch —
   particularly the sections touching payment handling and personal data.
   ========================================================================= */

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export default function LegalPage({
  eyebrow,
  title,
  answer,
  crumbs,
  image,
  updated,
  sections,
  notice,
}: {
  eyebrow: string;
  title: string;
  answer: string;
  crumbs: Crumb[];
  image?: Img;
  updated: string;
  sections: LegalSection[];
  notice?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        answer={answer}
        crumbs={crumbs}
        image={image}
        compact
      >
        <Reveal delay={220} className="mt-8">
          <p className="text-[13.5px] text-marble/50">
            Last updated{' '}
            <time dateTime={updated} className="tabular text-marble/70">
              {formatDateLong(updated)}
            </time>
          </p>
        </Reveal>
      </PageHero>

      <Section tone="marble" tight>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div>
            {notice && (
              <Reveal className="mb-10 flex gap-4 rounded-card border border-antique/30 bg-warm p-6">
                <Info width={18} height={18} className="mt-0.5 shrink-0 text-antique" />
                <p className="text-[14.5px] leading-[25px] text-stone">{notice}</p>
              </Reveal>
            )}

            {sections.map((section, i) => (
              <section
                key={section.heading}
                id={slugifyHeading(section.heading)}
                className="mt-12 scroll-mt-28 first:mt-0"
              >
                <Reveal className="mb-4 flex items-center gap-3">
                  <RevealRule className="hairline-gold-light h-px w-10 shrink-0" />
                </Reveal>
                <Reveal as="h2" delay={40}>
                  <span className="text-kiswah">
                    <span className="tabular mr-3 text-antique">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.heading}
                  </span>
                </Reveal>

                {section.paragraphs?.map((p, pi) => (
                  <Reveal
                    as="p"
                    key={pi}
                    delay={80 + pi * 50}
                    className="mt-5 max-w-[68ch] text-[16.5px] leading-[28px] text-kiswah/80"
                  >
                    {p}
                  </Reveal>
                ))}

                {section.list && (
                  <ul className="mt-5 flex max-w-[68ch] flex-col gap-3">
                    {section.list.map((item, li) => (
                      <Reveal
                        as="li"
                        key={item}
                        delay={stagger(li, 45, 270)}
                        className="flex gap-3.5"
                      >
                        <span
                          className="mt-[12px] h-1 w-1 shrink-0 rounded-full bg-antique"
                          aria-hidden
                        />
                        <span className="text-[16px] leading-[27px] text-kiswah/80">
                          {item}
                        </span>
                      </Reveal>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={100}>
              <nav aria-label="On this page">
                <p className="eyebrow mb-3.5">On this page</p>
                <RevealRule className="hairline-gold-light mb-5 h-px w-full" />
                <ol className="flex flex-col gap-3">
                  {sections.map((s, i) => (
                    <li key={s.heading}>
                      <a
                        href={`#${slugifyHeading(s.heading)}`}
                        className="flex gap-2.5 text-[14px] leading-[22px] text-stone transition-colors duration-300 hover:text-antique"
                      >
                        <span className="tabular shrink-0 text-antique/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </aside>
        </div>
      </Section>

      <StickyMobileBar message="Assalamu alaikum. I have a question about your terms." />

      <JsonLd schemas={[breadcrumbSchema(crumbs)]} />
    </>
  );
}
