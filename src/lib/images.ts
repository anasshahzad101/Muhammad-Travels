/* ============================================================================
   IMAGE LIBRARY
   ============================================================================

   All photography is licensed stock from Pexels, served from the Pexels CDN and
   optimised through next/image to AVIF/WebP (Spec §06: "WebP or AVIF,
   lazy-loaded below fold").

   ── HOW THIS SET WAS CHOSEN (Spec §06, "Using stock well") ─────────────────

   · "Avoid the obvious subject — skip the front-on Kaaba hero. Reach for
      Madinah, the Prophet's Mosque at night, architectural detail, marble and
      geometry, hotel interiors, a departure at the airport."
      → The hero is the Prophet's Mosque illuminated at night. There is no
        front-on Kaaba shot anywhere above the fold on any page.

   · "Grade the whole set identically."
      → Handled once in globals.css via the `graded` utility, not per-image.

   · "Descriptive alt text on everything."
      → Every entry carries real alt text describing what is actually shown.

   · "Respectful framing — no pilgrims' faces without consent; no imagery of
      people in prayer used as decoration."
      → Selections favour architecture, distance crowds and backs of heads.

   ── ⚠️  TWO THINGS TO DO BEFORE LAUNCH ────────────────────────────────────

   1. Spec §06 says to PAY for the library — "Adobe Stock, Shutterstock or
      iStock rather than Unsplash and Pexels. The free libraries are where the
      duplication happens." Pexels is used here because it is the only source
      that can be hotlinked legally and without a key for a working local
      build. Before going live, reverse-image search every file below and
      replace anything that already appears on a Pakistani competitor site.

   2. Spec §06, THE ONE HARD LINE: "Never caption stock as your own." Nothing
      in this build captions a stock photograph as Muhammad Travels' own group,
      office or hotel, and nothing should be edited to do so. Stock sets the
      mood. It never provides evidence.
   ========================================================================= */

export type Img = {
  /** Pexels photo id — keep this so the licence record is traceable. */
  id: number;
  src: string;
  alt: string;
  credit: string;
};

/** Pexels CDN URL. `w` caps the source download; next/image resizes from there. */
const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const img = (id: number, alt: string, credit: string, w?: number): Img => ({
  id,
  src: px(id, w),
  alt,
  credit,
});

/* ============================================================================
   MADINAH — the hero territory. Deliberately the site's primary imagery.
   ========================================================================= */

export const madinah = {
  night: img(
    12607981,
    'Al-Masjid an-Nabawi in Madinah illuminated against the night sky',
    'Yasir Gurbuz / Pexels',
    2400,
  ),
  dusk: img(
    34246946,
    'Aerial view of Al-Masjid an-Nabawi and the surrounding courtyards at dusk',
    'Konevi / Pexels',
    2000,
  ),
  twilight: img(
    35385106,
    'Minarets of the Prophet’s Mosque silhouetted during twilight',
    'Earth Photart / Pexels',
  ),
  greenDome: img(
    33840568,
    'The green dome of Al-Masjid an-Nabawi above the Madinah skyline',
    'Mumtaz Niazi / Pexels',
  ),
  interior: img(
    35385089,
    'Intricately decorated ceiling inside Al-Masjid an-Nabawi',
    'Earth Photart / Pexels',
  ),
  canopies: img(
    20279548,
    'The retractable canopies over the courtyard of Al-Masjid an-Nabawi',
    'Mhmdims / Pexels',
  ),
  courtyard: img(
    6099936,
    'The marble courtyard of Al-Masjid an-Nabawi in Madinah',
    'Jepret Hikmah / Pexels',
  ),
  sunset: img(
    35385134,
    'Pilgrims gathered outside Al-Masjid an-Nabawi at sunset',
    'Earth Photart / Pexels',
  ),
  minaret: img(
    19042360,
    'A minaret of the Prophet’s Mosque against a clear sky',
    'Rushdi Fatani / Pexels',
  ),
};

/* ============================================================================
   MAKKAH — used below the fold and on package pages, never as a front-on hero.
   ========================================================================= */

export const makkah = {
  haramInterior: img(
    31763113,
    'The interior colonnades of Al-Masjid al-Haram in Makkah',
    'Pexels',
  ),
  clockTower: img(
    27291499,
    'The Abraj Al Bait clock tower rising above central Makkah',
    'Pexels',
    2000,
  ),
  night: img(
    34956761,
    'Al-Masjid al-Haram in Makkah at night, seen from the upper level',
    'Pexels',
  ),
  street: img(
    15934938,
    'A street in central Makkah near the Haram district',
    'Pexels',
  ),
  tawaf: img(
    7984586,
    'Pilgrims performing Tawaf at Al-Masjid al-Haram, photographed at distance',
    'Pexels',
  ),
};

/* ============================================================================
   ARCHITECTURE, MARBLE AND GEOMETRY — the abstract register. Spec §06 permits
   geometry and the palette freely; Qur’anic calligraphy is never used here
   as ornament.
   ========================================================================= */

export const architecture = {
  domeDetail: img(
    15201873,
    'Ornate dome and arched windows of a historic mosque',
    'Pexels',
  ),
  ottomanDome: img(
    7698879,
    'Close view of an Ottoman mosque dome in Istanbul',
    'Pexels',
  ),
  tilework: img(
    32493983,
    'Geometric tile patterning and arched windows on a mosque facade',
    'Pexels',
  ),
  minaretMono: img(
    19311193,
    'A mosque minaret photographed in black and white',
    'Pexels',
  ),
  mosaicSunset: img(
    19439101,
    'Detail of a tiled dome and mosaic at sunset',
    'Pexels',
  ),
};

/* ============================================================================
   HOTELS — interiors for package and hotel blocks.
   ⚠️  These are stock hotel interiors, NOT photographs of the named properties.
   Spec §06: "Hotel photographs from the hotel — request media kits from the
   properties you sell." Replace every one of these with the property's own
   media-kit imagery for the exact room category being sold before launch.
   ========================================================================= */

export const hotel = {
  roomLight: img(
    7507131,
    'A hotel room with sheer curtains and soft daylight',
    'Pexels',
  ),
  roomWarm: img(
    14547139,
    'A hotel room with warm lighting and upholstered bedding',
    'Pexels',
  ),
  roomModern: img(
    237371,
    'A contemporary hotel room interior',
    'Pexels',
  ),
  roomSuite: img(
    8082217,
    'A spacious hotel bedroom with a chandelier',
    'Pexels',
  ),
  roomOrnate: img(
    34496715,
    'A hotel room with ornate decor and plush bedding',
    'Pexels',
  ),
  roomTwin: img(
    6434592,
    'A hotel room interior with pillows and cover on the bed',
    'Pexels',
  ),
  roomView: img(
    38624798,
    'A hotel room with a city view and simple contemporary furnishing',
    'Pexels',
  ),
  roomFamily: img(
    14750392,
    'A spacious hotel bedroom furnished for a family',
    'Pexels',
  ),
  lobby: img(
    29090531,
    'A hotel lobby with chandeliers and seating',
    'Pexels',
  ),
  breakfast: img(
    6466281,
    'A breakfast tray with pastries and juice in a hotel room',
    'Pexels',
  ),
};

/* ============================================================================
   DEPARTURE — the airport register. Spec §06 explicitly recommends "a
   departure at the airport" as an under-used, distinctive subject.
   ========================================================================= */

export const departure = {
  dusk: img(
    27550030,
    'Silhouette of an aircraft and waiting passengers inside an airport terminal at dusk',
    'Pexels',
    2000,
  ),
  board: img(
    12717154,
    'Passengers reading a departure board in an airport terminal',
    'Pexels',
  ),
  walkingMono: img(
    6354991,
    'Travellers walking with luggage through an airport terminal',
    'Pexels',
  ),
  terminalNight: img(
    3396656,
    'An airport departures hall illuminated at night',
    'Pexels',
  ),
  hall: img(
    12932408,
    'A modern airport terminal with large windows and seating',
    'Pexels',
  ),
  gate: img(
    38778476,
    'An aircraft docked at the gate seen from an airport terminal window',
    'Pexels',
  ),
};

/* ============================================================================
   DEPARTURE CITIES — a real photograph of each city, not a generic swap.
   Spec §04 warns that templated city pages read as doorway pages; distinct
   imagery is part of making each page genuinely its own.
   ========================================================================= */

export const cityImages: Record<string, Img> = {
  lahore: img(
    12912453,
    'Sunset over the Badshahi Mosque in Lahore',
    'Pexels',
  ),
  karachi: img(
    34096453,
    'Aerial view of dense residential Karachi',
    'Pexels',
  ),
  islamabad: img(
    27698081,
    'Faisal Mosque in Islamabad silhouetted against a sunset sky',
    'Pexels',
  ),
  multan: img(
    16021535,
    'Aerial view of Multan at night with traffic light trails',
    'Pexels',
  ),
  faisalabad: img(
    11179156,
    'Aerial view of the Faisalabad cityscape',
    'Pexels',
  ),
  peshawar: img(
    5838486,
    'Islamia College Peshawar at sunset',
    'Pexels',
  ),
};

/* ============================================================================
   GUIDE ARTICLE IMAGERY
   ========================================================================= */

export const guideImages: Record<string, Img> = {
  verify: departure.board,
  prices: makkah.clockTower,
  visa: departure.gate,
  hajjVsUmrah: madinah.greenDome,
  ramadan: madinah.night,
  firstTime: madinah.canopies,
  elderly: madinah.courtyard,
  fraud: departure.walkingMono,
  hajjQuota: makkah.haramInterior,
  packing: hotel.roomLight,
};
