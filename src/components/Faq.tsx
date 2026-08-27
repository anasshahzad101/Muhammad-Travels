import { ChevronDown } from './icons';
import { Reveal } from './Reveal';
import type { Faq as FaqItem } from '@/lib/packages';
import { stagger, cx } from '@/lib/utils';

/* ============================================================================
   FAQ ACCORDION
   ============================================================================
   THE ACCORDION RULE — Spec §05:
     "GPTBot, ClaudeBot and PerplexityBot cannot click. Any content that only
      appears after user interaction — tabs, accordions, 'read more' toggles —
      is invisible to them, and increasingly invisible to the customers who now
      ask an assistant before they open a browser. RENDER THE CONTENT IN THE
      HTML AND LET CSS HANDLE THE VISUAL COLLAPSE; NEVER FETCH IT ON CLICK."

   How this component honours that, precisely:

   · It is built on native <details>, so every answer is in the served HTML in
     every state. There is no JavaScript, no conditional rendering, no fetch.
   · Every item ships `open` by default — Spec §05: "Expanded by default, or
     content rendered in HTML regardless of state."
   · The collapse animation is a CSS grid-template-rows transition on content
     that is always present in the DOM (see globals.css .faq-item).
   · A crawler with no CSS and no JS sees a plain list of questions and full
     answers, which is exactly what it should see.
   ========================================================================= */

export default function Faq({
  items,
  tone = 'light',
  columns = 1,
}: {
  items: FaqItem[];
  tone?: 'light' | 'dark';
  columns?: 1 | 2;
}) {
  const dark = tone === 'dark';

  return (
    <div
      className={cx(
        'w-full',
        columns === 2 && 'grid gap-x-12 lg:grid-cols-2',
      )}
    >
      {items.map((item, i) => (
        <Reveal key={item.q} delay={stagger(i, 55, 330)}>
          <details
            open
            className={cx(
              'faq-item group border-b',
              dark ? 'border-rule-dark' : 'border-rule-light',
            )}
          >
            <summary
              className={cx(
                'flex items-start justify-between gap-6 py-5 transition-colors duration-300',
                dark
                  ? 'text-marble hover:text-hizam'
                  : 'text-kiswah hover:text-antique',
              )}
            >
              {/* h3 inside summary keeps the heading hierarchy sequential —
                  Spec §09: "H2–H4 sequential, never skipping levels." */}
              <h3
                className="font-display text-[19px] leading-[27px] lg:text-[21px] lg:leading-[29px]"
                style={{ fontWeight: 600 }}
              >
                {item.q}
              </h3>
              <ChevronDown
                width={19}
                height={19}
                className={cx(
                  'faq-chevron mt-1 shrink-0',
                  dark ? 'text-hizam/70' : 'text-antique/70',
                )}
              />
            </summary>

            <div className="faq-answer">
              <div>
                <p
                  className={cx(
                    'max-w-[68ch] pb-6 pr-8 text-[16px] leading-[27px]',
                    dark ? 'text-marble/65' : 'text-stone',
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
