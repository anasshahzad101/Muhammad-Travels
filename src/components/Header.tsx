'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Shield, Phone, WhatsApp, Menu, Close, ArrowRight } from './icons';
import { site, telHref, whatsappHref } from '@/lib/site';
import { cx } from '@/lib/utils';

/* ============================================================================
   HEADER
   ============================================================================
   Spec §02, Navigation:
     Desktop — "Logo · Umrah · Hajj · Departures · Guides · Licence &
       Verification · About · phone number · WhatsApp button"
     Mobile  — "Logo · WhatsApp icon · hamburger. WhatsApp must be reachable
       WITHOUT OPENING THE MENU."

   Spec §02 callout, "Put verification in the main navigation":
     "Most operators bury licence details in the footer, if they show them at
      all. A top-level 'Licence & Verification' nav item is unusual enough to be
      noticed and reassuring enough to be remembered."
   Accordingly that item is styled distinctly from its neighbours — a gold
   shield and a hairline underline — rather than being one link among six.
   ========================================================================= */

const nav = [
  { href: '/umrah/', label: 'Umrah' },
  { href: '/hajj/', label: 'Hajj' },
  { href: '/from/', label: 'Departures' },
  { href: '/guides/', label: 'Guides' },
  { href: '/about/', label: 'About' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the sheet on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cx(
        'on-dark sticky top-0 z-50 w-full bg-kiswah transition-shadow duration-500',
        scrolled && 'shadow-[0_1px_0_0_rgba(201,162,39,0.28),0_10px_30px_-12px_rgba(0,0,0,0.6)]',
      )}
    >
      <div className="container-x">
        <div
          className={cx(
            'flex items-center justify-between transition-[height] duration-500',
            scrolled ? 'h-[68px]' : 'h-[80px]',
          )}
        >
          {/* Logo ---------------------------------------------------------- */}
          <Link
            href="/"
            className="flex min-h-11 shrink-0 items-center"
            aria-label="Muhammad Travels — home"
          >
            {/* priority: the mark is the topmost brand element on every page,
                so it must not be lazy-loaded. */}
            <Logo tone="dark" markSize={scrolled ? 38 : 44} priority />
          </Link>

          {/* Desktop navigation -------------------------------------------- */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  'relative rounded-btn px-3.5 py-2.5 text-[14.5px] font-medium transition-colors duration-300',
                  isActive(item.href)
                    ? 'text-marble'
                    : 'text-marble/70 hover:text-marble',
                )}
              >
                {item.label}
                <span
                  className={cx(
                    'absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-hizam/70 transition-transform duration-400',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0',
                  )}
                  aria-hidden
                />
              </Link>
            ))}

            {/* The verification item, deliberately differentiated. */}
            <Link
              href="/licence/"
              className={cx(
                'group ml-2 flex items-center gap-2 rounded-btn border px-3.5 py-2.5 text-[14.5px] font-semibold transition-all duration-300',
                isActive('/licence/')
                  ? 'border-hizam/70 text-hizam'
                  : 'border-hizam/35 text-hizam/90 hover:border-hizam/70 hover:text-hizam',
              )}
            >
              <Shield
                width={16}
                height={16}
                className="shrink-0 transition-transform duration-500 group-hover:-translate-y-px"
              />
              Licence &amp; Verification
            </Link>
          </nav>

          {/* Desktop actions ------------------------------------------------ */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={telHref()}
              className="flex items-center gap-2 px-2 text-[14.5px] font-medium text-marble/80 transition-colors hover:text-marble"
            >
              <Phone width={16} height={16} className="text-hizam" />
              <span className="tabular">{site.phone.display}</span>
            </a>
            <a
              href={whatsappHref(
                `Assalamu alaikum. I'd like to ask about your Hajj and Umrah packages.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-whatsapp"
            >
              <WhatsApp width={18} height={18} />
              WhatsApp
            </a>
          </div>

          {/* Mobile actions — WhatsApp reachable without opening the menu --- */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={whatsappHref(
                `Assalamu alaikum. I'd like to ask about your Hajj and Umrah packages.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-btn text-whatsapp transition-colors hover:bg-white/5"
            >
              <WhatsApp width={23} height={23} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-btn text-marble transition-colors hover:bg-white/5"
            >
              {open ? <Close width={24} height={24} /> : <Menu width={24} height={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="hairline-gold opacity-60" />

      {/* Mobile sheet ----------------------------------------------------- */}
      {open && (
        <div
          id="mobile-nav"
          className="anim-sheet fixed inset-x-0 top-[calc(var(--header-h,68px))] z-40 max-h-[calc(100dvh-68px)] overflow-y-auto bg-kiswah lg:hidden"
          style={{ ['--header-h' as string]: scrolled ? '68px' : '80px' }}
        >
          <nav className="container-x pb-8 pt-4" aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="anim-rise flex items-center justify-between border-b border-rule-dark py-4 text-[17px] font-medium text-marble"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    {item.label}
                    <ArrowRight
                      width={18}
                      height={18}
                      className="text-hizam/60"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/licence/"
                  className="anim-rise mt-5 flex items-center justify-center gap-2.5 rounded-btn border border-hizam/45 py-4 text-[16px] font-semibold text-hizam"
                  style={{ animationDelay: `${nav.length * 45}ms` }}
                >
                  <Shield width={18} height={18} />
                  Licence &amp; Verification
                </Link>
              </li>
            </ul>

            <div
              className="anim-rise mt-6 flex flex-col gap-3"
              style={{ animationDelay: `${(nav.length + 1) * 45}ms` }}
            >
              <a href={telHref()} className="btn-base btn-ghost-dark w-full">
                <Phone width={18} height={18} />
                <span className="tabular">{site.phone.display}</span>
              </a>
              <a
                href={whatsappHref(
                  `Assalamu alaikum. I'd like to ask about your Hajj and Umrah packages.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-whatsapp w-full"
              >
                <WhatsApp width={19} height={19} />
                Message us on WhatsApp
              </a>
            </div>

            <p className="mt-6 text-[13px] leading-5 text-marble/45">
              Verify our licence numbers against the Ministry’s published list
              before paying any operator — including us.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
