import Link from 'next/link';
import ProductCard from './ProductCard';
import { AnimateIn } from './AnimateIn';

const MOCK_PRODUCTS = [
  { id: '1', handle: 'rustic-oak-hardwood', title: 'Rustic Oak Hardwood Planks', vendor: 'Shaw', priceRange: { minVariantPrice: { amount: '4.29', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '2', handle: 'calacatta-marble-tile', title: 'Calacatta Marble Tile 12×24', vendor: 'MSI', priceRange: { minVariantPrice: { amount: '3.89', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '3', handle: 'herringbone-mosaic', title: 'Herringbone Mosaic Backsplash', vendor: 'Daltile', priceRange: { minVariantPrice: { amount: '6.99', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '4', handle: 'weathered-grey-lvp', title: 'Weathered Grey LVP Flooring', vendor: 'Pergo', priceRange: { minVariantPrice: { amount: '2.79', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '5', handle: 'bamboo-natural-plank', title: 'Bamboo Natural Wide Plank', vendor: 'US Floors', priceRange: { minVariantPrice: { amount: '3.49', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '6', handle: 'travertine-stone-tile', title: 'Travertine Stone Tile', vendor: 'Armstrong', priceRange: { minVariantPrice: { amount: '5.19', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '7', handle: 'subway-tile-white', title: 'Classic Subway Tile 3×6', vendor: 'Elysium', priceRange: { minVariantPrice: { amount: '1.99', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
  { id: '8', handle: 'moroccan-mosaic', title: 'Moroccan Star Pattern Mosaic', vendor: 'Jeffrey Court', priceRange: { minVariantPrice: { amount: '8.49', currencyCode: 'USD' } }, images: { edges: [] }, variants: { edges: [] } },
];

export default function FeaturedProducts({ products }) {
  const list = products?.length ? products.slice(0, 8) : MOCK_PRODUCTS;
  const isLive = products?.length > 0;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">

        <div className="flex items-end justify-between mb-12">
          <AnimateIn>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-1">
              {isLive ? 'From Your Store' : 'Sample Catalog'}
            </p>
            <h2 className="text-4xl font-black text-stone-900">Featured Products</h2>
          </AnimateIn>
          <AnimateIn direction="right">
            <Link href="/shop" className="hidden sm:block text-stone-400 hover:text-stone-700 text-sm font-semibold transition-colors">
              View All →
            </Link>
          </AnimateIn>
        </div>

        {!isLive && (
          <AnimateIn>
            <div className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-700 text-sm px-5 py-3 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
              Add your Shopify credentials to <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code> to show real products.
            </div>
          </AnimateIn>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((product, i) => (
            <AnimateIn key={product.id} delay={i * 45} direction="up">
              <ProductCard product={product} />
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={280}>
          <div className="mt-12 text-center">
            <Link href="/shop" className="btn-primary">
              Browse All 4,000+ Products →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
