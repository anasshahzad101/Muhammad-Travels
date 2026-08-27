import { jsonLd } from '@/lib/schema';

/* ============================================================================
   JSON-LD
   ============================================================================
   Spec §10: "Treat it as a primary deliverable, not a plugin afterthought."

   One component so no page hand-writes a script tag, and undefined schemas
   (a hard-gated AggregateRating, an absent FAQ set) drop out silently rather
   than emitting `null` into the document.
   ========================================================================= */

export default function JsonLd({
  schemas,
}: {
  schemas: Array<Record<string, unknown> | undefined>;
}) {
  const payload = jsonLd(schemas);
  if (payload === '[]' || payload === '{}') return null;

  return (
    <script
      type="application/ld+json"
      // Content is generated from typed records in src/lib, never user input.
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
