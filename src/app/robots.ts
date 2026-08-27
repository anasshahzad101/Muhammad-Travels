import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/* ============================================================================
   ROBOTS.TXT
   ============================================================================
   Reproduces the file specified verbatim in Spec §08, plus the additional
   agents named in the same section's prose.

   Spec §08, AI crawlers:
     "Explicitly allow GPTBot, OAI-SearchBot, ClaudeBot, anthropic-ai,
      PerplexityBot, Google-Extended, CCBot. BLOCKING THEM FORFEITS A CHANNEL
      YOUR COMPETITORS ARE ALSO IGNORING."

   The disallow rules exist to keep filter-parameter space out of the index —
   Spec §02: "Filter combinations must never generate indexable URLs." The
   filters on this site are handled client-side and never change the path, so
   these are belt and braces rather than load-bearing.
   ========================================================================= */

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/*?q=', '/*&sort='],
      },
      // Each AI crawler named explicitly, as the spec requires.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
