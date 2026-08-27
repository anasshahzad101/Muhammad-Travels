import type { SVGProps } from 'react';

/* ============================================================================
   ICON SET
   ============================================================================
   Hand-authored, stroke-based, no icon library and no runtime dependency.

   Spec §06 governs the visual treatment: gold appears as "hairline rules,
   small-caps labels, ICON STROKES, the licence badge, and the premium tier
   marker. Nothing else." So every icon here is a 1.25px open stroke in
   currentColor — never a filled shape, never a gradient, never a bevel.

   The uniform 24×24 grid and shared stroke width are what let a mixed set read
   as one commissioned family rather than as clip art from three sources.

   Icons opt into the stroke-draw animation by having `data-draw` set on an
   ancestor (see globals.css). The `--draw-length` custom property tunes the
   dash length per icon where the path is unusually long or short.
   ========================================================================= */

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/* --- Trust and verification --------------------------------------------- */

/** The licence shield. Spec §05: "shield glyph, 'MoRA Licensed', licence
 *  number, links to /licence/." This is the one glyph that carries real gold. */
export const Shield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2.75 4.75 5.5v5.4c0 4.4 2.9 8.4 7.25 10.35 4.35-1.95 7.25-5.95 7.25-10.35V5.5L12 2.75Z" />
    <path d="m8.9 11.9 2.1 2.15 4.1-4.35" />
  </svg>
);

export const Certificate = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 3.75h9.5L19 8.25V15a1.25 1.25 0 0 1-1.25 1.25H5A1.25 1.25 0 0 1 3.75 15V5A1.25 1.25 0 0 1 5 3.75Z" />
    <path d="M14.25 3.9v4.35h4.35M6.75 8h4M6.75 11h6.5" />
    <circle cx="15.5" cy="18" r="2.6" />
    <path d="M13.6 20.1 13 23l2.5-1.35L18 23l-.6-2.9" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="10.75" cy="10.75" r="6.5" />
    <path d="m15.6 15.6 4.15 4.15" />
  </svg>
);

export const Info = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 11v5.25M12 7.9v.1" />
  </svg>
);

/* --- Confirmation and negation ------------------------------------------ */

/** Spec §05: "Includes / excludes — two columns, tick and cross glyphs." */
export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m4.75 12.5 4.6 4.6 9.9-10.2" />
  </svg>
);

export const Cross = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
  </svg>
);

export const CheckCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="m8.4 12.2 2.5 2.5 4.7-5.1" />
  </svg>
);

export const CrossCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M9.2 9.2 14.8 14.8M14.8 9.2 9.2 14.8" />
  </svg>
);

export const AlertTriangle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3.9 2.9 19.6h18.2L12 3.9Z" />
    <path d="M12 9.6v4.2M12 16.8v.1" />
  </svg>
);

/* --- Contact ------------------------------------------------------------- */

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8.1 3.75H5.4A1.65 1.65 0 0 0 3.75 5.4c0 8.2 6.65 14.85 14.85 14.85a1.65 1.65 0 0 0 1.65-1.65v-2.7l-4.05-1.35-1.8 2.25a13.4 13.4 0 0 1-5.85-5.85l2.25-1.8L8.1 3.75Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21.25c3.5-4.05 6.25-7.2 6.25-10.35a6.25 6.25 0 1 0-12.5 0c0 3.15 2.75 6.3 6.25 10.35Z" />
    <circle cx="12" cy="10.75" r="2.4" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="1.5" />
    <path d="m3.9 6.4 8.1 6 8.1-6" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 6.9V12l3.4 2" />
  </svg>
);

/** WhatsApp's own mark. Spec §05: brand-locked — this one is deliberately a
 *  filled glyph in WhatsApp's own green, not a stroke in our palette, because
 *  users recognise it precisely because it is not our colour. */
export const WhatsApp = (p: IconProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    {...p}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

/* --- Travel -------------------------------------------------------------- */

export const Plane = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10.4 3.35a1.6 1.6 0 0 1 3.2 0v5.3l7.65 4.5v2.2l-7.65-2.35v4.6l2.5 1.85v1.7L12 20.05l-4.1.9v-1.7l2.5-1.85v-4.6L2.75 15.35v-2.2l7.65-4.5v-5.3Z" />
  </svg>
);

export const Suitcase = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.75" y="7.25" width="18.5" height="12" rx="1.75" />
    <path d="M8.75 7.25V5.4a1.4 1.4 0 0 1 1.4-1.4h3.7a1.4 1.4 0 0 1 1.4 1.4v1.85M8.75 19.25v1.1M15.25 19.25v1.1" />
  </svg>
);

export const Bed = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.75 18.25v-11M2.75 12.25h18.5v6M21.25 18.25v-3" />
    <path d="M6.4 12.25V9.9a1.4 1.4 0 0 1 1.4-1.4h9.05a1.4 1.4 0 0 1 1.4 1.4v2.35" />
    <circle cx="7.6" cy="10.6" r="1.3" />
  </svg>
);

export const Route = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="5.5" cy="5.75" r="2.25" />
    <circle cx="18.5" cy="18.25" r="2.25" />
    <path d="M5.5 8.4v4.35a3.25 3.25 0 0 0 3.25 3.25h6.6" />
    <path d="m13.6 13.6 2.4 2.4-2.4 2.4" />
  </svg>
);

export const Compass = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="m15.1 8.9-1.8 4.4-4.4 1.8 1.8-4.4 4.4-1.8Z" />
  </svg>
);

/** Distance to the Haram — the field Spec §04 calls the single most decisive
 *  comparison in the category. Concentric arcs radiating from a fixed point. */
export const Distance = (p: IconProps) => (
  <svg {...base} {...p} style={{ ...(p.style ?? {}) }}>
    <circle cx="6.75" cy="17.25" r="2" />
    <path d="M10.4 17.25a3.65 3.65 0 0 0-3.65-3.65" />
    <path d="M14.05 17.25a7.3 7.3 0 0 0-7.3-7.3" />
    <path d="M17.7 17.25a10.95 10.95 0 0 0-10.95-10.95" />
  </svg>
);

/* --- Time and people ----------------------------------------------------- */

export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.25" y="5.25" width="17.5" height="15.5" rx="1.75" />
    <path d="M3.25 10h17.5M8 3v4.4M16 3v4.4" />
  </svg>
);

export const Moon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 14.4a8.6 8.6 0 0 1-10.4-10.4 8.75 8.75 0 1 0 10.4 10.4Z" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9.25" cy="8.25" r="3.25" />
    <path d="M3.4 19.4a5.9 5.9 0 0 1 11.7 0" />
    <path d="M16.1 5.4a3.25 3.25 0 0 1 0 5.7M17.4 14.3a5.9 5.9 0 0 1 3.2 5.1" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3.5 2.65 5.4 5.95.87-4.3 4.2 1.02 5.93L12 17.1l-5.32 2.8 1.02-5.93-4.3-4.2 5.95-.87L12 3.5Z" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9.4 6.75c-2.9 1-4.65 3.5-4.65 6.8v3.7h5.6v-5.6H7.6c0-1.85.85-3.15 2.55-3.85l-.75-1.05ZM19.4 6.75c-2.9 1-4.65 3.5-4.65 6.8v3.7h5.6v-5.6H17.6c0-1.85.85-3.15 2.55-3.85l-.75-1.05Z" />
  </svg>
);

/* --- Navigation ---------------------------------------------------------- */

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.75 12h14.5M13.9 6.6 19.25 12l-5.35 5.4" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7.25 16.75 16.75 7.25M8.9 7.25h7.85v7.85" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3.75 7h16.5M3.75 12h16.5M3.75 17h16.5" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* --- Everything else ----------------------------------------------------- */

export const Utensils = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.25v6.5a2.25 2.25 0 0 0 4.5 0v-6.5M8.75 12v8.75M4.25 3.25v4.5M17.75 3.25c-1.65 1.4-2.5 3.4-2.5 6s.85 3.5 2.5 3.5V3.25Zm0 9.5v8" />
  </svg>
);

export const Document = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3.25h7.5L18.75 8.5v12.25H6A1.25 1.25 0 0 1 4.75 19.5V4.5A1.25 1.25 0 0 1 6 3.25Z" />
    <path d="M13.25 3.4v5.35h5.35M8 13h8M8 16.5h5.5" />
  </svg>
);

export const Refund = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3.9 12a8.1 8.1 0 1 0 2.4-5.75" />
    <path d="M3.4 3.9v3.9h3.9" />
    <path d="M12 8.6v6.8M10.1 10.4h3.1a1.55 1.55 0 0 1 0 3.1h-2.4a1.55 1.55 0 0 0 0 3.1h3.1" />
  </svg>
);

/** Abstract architectural mark — an arch and its springing line. Geometry
 *  only. Spec §06 permits "abstract geometry, hairlines and the palette"; it
 *  explicitly does not permit Qur'anic text or the Kiswah's embroidered bands
 *  as ornament, and none appear anywhere in this set. */
export const Arch = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5.25 20.75V11a6.75 6.75 0 0 1 13.5 0v9.75" />
    <path d="M9 20.75v-9.5a3 3 0 0 1 6 0v9.5M3.4 20.75h17.2" />
  </svg>
);
