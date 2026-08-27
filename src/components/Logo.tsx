import Image from 'next/image';
import { cx } from '@/lib/utils';

/* ============================================================================
   BRAND LOGO
   ============================================================================
   Two lockups, cut from the one supplied artwork:

     · LogoMark    — the Kaaba only. Used in the header, where the supplied
                     lockup is stacked (Kaaba above wordmark, roughly 1.2:1)
                     and would have to shrink to ~73px wide to fit an 80px
                     header. At that size the words "Muhammad Travels" render
                     about 5px tall — present, but unreadable. So the header
                     pairs the mark with the wordmark set in live type, which
                     stays crisp at any size and matches the logo's own
                     hierarchy: gold serif name over a letterspaced label.

     · LogoLockup  — the complete supplied artwork, used in the footer where
                     there is vertical room for it to be read as drawn.

   Both sit on a `logo-plate` and screen over it, which dissolves the artwork's
   black ground into the Kiswah black frame. See globals.css for the reasoning.
   ========================================================================= */

/** Intrinsic dimensions of the generated assets — used to reserve exact space
 *  so neither logo contributes to CLS (Spec §08: explicit width and height on
 *  every image). */
const MARK = { src: '/logo-mark.png', w: 472, h: 420 };
const LOCKUP = { src: '/logo.png', w: 900, h: 740 };

export function LogoMark({
  className,
  size = 44,
  priority = false,
}: {
  className?: string;
  /** Rendered height in px. Width follows the artwork's aspect ratio. */
  size?: number;
  priority?: boolean;
}) {
  const width = Math.round((size * MARK.w) / MARK.h);

  return (
    <span className={cx('logo-plate shrink-0', className)}>
      <Image
        src={MARK.src}
        // Decorative: the accessible name comes from the adjacent wordmark and
        // the link's own aria-label.
        alt=""
        aria-hidden
        width={width}
        height={size}
        priority={priority}
        className="logo-blend"
      />
    </span>
  );
}

/** The complete supplied lockup — Kaaba, wordmark and rule. */
export function LogoLockup({
  className,
  width = 220,
  priority = false,
}: {
  className?: string;
  /** Rendered width in px. Height follows the artwork's aspect ratio. */
  width?: number;
  priority?: boolean;
}) {
  const height = Math.round((width * LOCKUP.h) / LOCKUP.w);

  return (
    <span className={cx('logo-plate', className)}>
      <Image
        src={LOCKUP.src}
        alt="Muhammad Travels — Hajj & Umrah"
        width={width}
        height={height}
        priority={priority}
        className="logo-blend"
      />
    </span>
  );
}

/** Header lockup: the Kaaba mark beside the wordmark in live type. */
export function Logo({
  className,
  tone = 'dark',
  markSize = 44,
  priority = false,
}: {
  className?: string;
  /** `dark` = placed on the Kiswah-black frame. `light` = on marble. */
  tone?: 'dark' | 'light';
  markSize?: number;
  priority?: boolean;
}) {
  const textClass = tone === 'dark' ? 'text-marble' : 'text-kiswah';
  const subClass = tone === 'dark' ? 'text-hizam/75' : 'text-antique';

  return (
    <span className={cx('flex items-center gap-3', className)}>
      <LogoMark size={markSize} priority={priority} />

      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-display text-[19px] leading-none tracking-tight',
            textClass,
          )}
          style={{ fontWeight: 700 }}
        >
          Muhammad Travels
        </span>
        <span
          className={cx(
            'mt-[5px] text-[9.5px] font-semibold uppercase leading-none',
            subClass,
          )}
          style={{ letterSpacing: '0.16em' }}
        >
          Hajj &amp; Umrah
        </span>
      </span>
    </span>
  );
}
