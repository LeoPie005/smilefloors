import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Flooring',
  description:
    'Browse 4,000+ flooring products at Smile Floors — hardwood, tile, luxury vinyl plank (LVP), laminate, mosaics, and area rugs. Shop online or visit our Lombard, IL showroom. Call (708) 299-5189.',
  keywords: [
    'buy flooring online Illinois',
    'hardwood flooring shop Lombard',
    'tile shop DuPage County',
    'LVP flooring store Chicagoland',
    'flooring products near me',
  ],
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop All Flooring | Smile Floors — Lombard, IL',
    description: 'Browse 4,000+ flooring products. Hardwood, tile, LVP, laminate, mosaics, and rugs. In-store pickup in Lombard, IL.',
    url: '/shop',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
