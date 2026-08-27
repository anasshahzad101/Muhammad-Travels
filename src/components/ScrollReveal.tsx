'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* ============================================================================
   SCROLL REVEAL — the whole motion runtime for the site
   ============================================================================
   Spec §06: "Restrained motion. Slow, subtle fades on scroll. No parallax, no
   counters spinning up, no carousels."
   Spec §08 CWV: "INP < 200ms — minimal client JavaScript."

   This is the only piece of scroll-driven JavaScript on the site. It is one
   IntersectionObserver over elements the server already rendered, and it does
   nothing but add a class. No animation library, no per-component state, no
   scroll listener, no layout reads.

   Elements stay revealed once shown — they are unobserved immediately, so an
   element never animates twice and the observer set shrinks as the user reads.

   IMPORTANT — the no-JS contract (Spec §08, §13 Blocker: "Every page
   server-rendered — verify with JavaScript disabled"): the hidden state lives
   behind `html.js` in globals.css, and that class is set by this component's
   own effect. If JavaScript never runs — including for the AI crawlers in
   Spec §08 that cannot execute it — nothing is ever hidden and the full
   content renders exactly as served.
   ========================================================================= */

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-reveal], [data-reveal-rule], [data-draw]',
      ),
    );

    // Respecting the preference means showing everything at once, immediately.
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      {
        // Fires a little before the element reaches the viewport, so the
        // transition is already underway by the time it is properly on screen.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.06,
      },
    );

    for (const el of targets) {
      // Anything already on screen at mount (the hero, the trust bar) should
      // resolve straight away rather than waiting for a scroll that may
      // never come on a short page.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
