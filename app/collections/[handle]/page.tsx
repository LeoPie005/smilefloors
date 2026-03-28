'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import { AnimateIn } from '@/components/AnimateIn';

const COLLECTION_META: Record<string, { title: string; description: string }> = {
  hardwood: { title: 'Hardwood Flooring', description: 'Solid and engineered hardwood in hundreds of species, stains, and widths.' },
  laminate: { title: 'Laminate Flooring', description: 'Realistic wood and stone looks with outstanding durability and value.' },
  vinyl: { title: 'Vinyl / Luxury Vinyl Plank', description: 'Waterproof, family-friendly, and built to last. Perfect for any room.' },
  tile: { title: 'Tile Flooring', description: 'Porcelain, ceramic, and natural stone tile for floors and walls.' },
  mosaics: { title: 'Mosaic Tile', description: 'Artisan mosaic patterns for backsplashes, showers, and feature floors.' },
  rugs: { title: 'Rugs & Area Rugs', description: 'Warm, stylish rugs to complement any room.' },
  accessories: { title: 'Flooring Accessories', description: 'Moldings, transitions, underlayment, adhesives, and everything you need.' },
};

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const meta = COLLECTION_META[handle] || {
    title: handle.charAt(0).toUpperCase() + handle.slice(1).replace(/-/g, ' '),
    description: 'Browse our full selection.',
  };

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { getCollectionProducts } = await import('@/lib/shopify');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { products: p, pageInfo } = await (getCollectionProducts as any)({ handle, first: 24 });
        setProducts(p);
        setCursor(pageInfo.endCursor);
        setHasMore(pageInfo.hasNextPage);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [handle]);

  const loadMore = async () => {
    if (!cursor) return;
    setLoading(true);
    try {
      const { getCollectionProducts } = await import('@/lib/shopify');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { products: more, pageInfo } = await (getCollectionProducts as any)({ handle, first: 24, after: cursor });
      setProducts(p => [...p, ...more]);
      setCursor(pageInfo.endCursor);
      setHasMore(pageInfo.hasNextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-100 py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <AnimateIn>
            <nav className="flex items-center gap-2 text-xs font-medium text-stone-400 uppercase tracking-widest mb-4">
              <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-amber-500 transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-stone-600">{meta.title}</span>
            </nav>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Collection</p>
            <h1 className="text-5xl font-black text-stone-900">{meta.title}</h1>
            <p className="text-stone-400 mt-2 text-lg">{meta.description}</p>
          </AnimateIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-10">
        {loading && products.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 mb-3 text-lg">No products in this collection yet.</p>
            <p className="text-stone-300 text-sm mb-8">Connect Shopify and add products to the &ldquo;{handle}&rdquo; collection.</p>
            <Link href="/shop" className="btn-primary rounded-lg">Browse All Products</Link>
          </div>
        ) : (
          <>
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-6">{products.length} products{hasMore ? '+' : ''}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <AnimateIn key={product.id} delay={Math.min(i, 8) * 40}>
                  <ProductCard product={product} />
                </AnimateIn>
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-12">
                <button onClick={loadMore} disabled={loading} className="btn-outline rounded-lg px-10">
                  {loading
                    ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin" />Loading...</span>
                    : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
