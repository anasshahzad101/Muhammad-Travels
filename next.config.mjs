/** @type {import('next').NextConfig} */

// Security headers — Spec §08 "Security headers: X-Content-Type-Options,
// X-Frame-Options, Referrer-Policy, Permissions-Policy. A trust signal on a
// site handling payments." HSTS is included for production; it is inert over
// plain http://localhost during development.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,

  // Spec §02 URL rules — "Trailing slash, applied consistently. Pick one form
  // and enforce it site-wide."
  trailingSlash: true,

  images: {
    // Spec §06 Imagery — "WebP or AVIF, lazy-loaded below fold."
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
    ],
    // Matches the breakpoint ladder in Spec §07: 360 · 390 · 414 · 768 · 1024 · 1280
    deviceSizes: [360, 390, 414, 768, 1024, 1280, 1600, 1920],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
