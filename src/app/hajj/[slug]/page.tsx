import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PackageDetail from '@/components/PackageDetail';
import { absUrl } from '@/lib/site';
import { getPackage, hajjPackages } from '@/lib/packages';

/* ============================================================================
   /hajj/[package]/ — HAJJ PACKAGE DETAIL
   ============================================================================
   Spec §02 sitemap: /hajj/[package]/.
   Shares the PackageDetail template with Umrah — same block order, same
   comparison fields, and the cancellation table swaps to the Hajj schedule
   because that record differs. One template, driven by the data.
   ========================================================================= */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return hajjPackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};

  const canonical = absUrl(`/hajj/${slug}/`);
  return {
    title: pkg.title,
    description: pkg.metaDescription,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: pkg.title,
      description: pkg.metaDescription,
      images: [{ url: pkg.image.src }],
    },
  };
}

export default async function HajjPackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);

  if (!pkg || pkg.trip !== 'hajj') notFound();

  return <PackageDetail pkg={pkg} />;
}
