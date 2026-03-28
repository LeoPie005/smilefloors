import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flooring Collections',
  description:
    'Explore Smile Floors collections — hardwood, tile, luxury vinyl plank, laminate, mosaics, and area rugs. Shop by category online or at our Lombard, IL showroom.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Flooring Collections | Smile Floors — Lombard, IL',
    description: 'Shop by flooring category: hardwood, tile, LVP, laminate, mosaics, and rugs.',
    url: '/collections',
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
