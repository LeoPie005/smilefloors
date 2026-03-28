'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import { AnimateIn } from '@/components/AnimateIn';

const CATEGORIES = ['All', 'Hardwood', 'Laminate', 'Vinyl / LVP', 'Tile', 'Mosaics', 'Rugs', 'Accessories'];

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cursor, setCursor] = useState<string | null | undefined>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const { getProducts } = await import('@/lib/shopify');
      const searchQuery = [query, activeCategory !== 'All' ? activeCategory : ''].filter(Boolean).join(' ');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { products: newProducts, pageInfo } = await (getProducts as any)({
        first: 24, after: reset ? null : cursor, query: searchQuery || undefined,
      });
      setProducts(reset ? newProducts : (prev: any[]) => [...prev, ...newProducts]);
      setCursor(pageInfo.endCursor);
      setHasMore(pageInfo.hasNextPage);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeCategory]);

  useEffect(() => { setCursor(null); fetchProducts(true); }, [query, activeCategory]); // eslint-disable-line

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setQuery(inputVal); };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-stone-50 border-b border-stone-100 py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          <AnimateIn>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-1">Shop</p>
            <h1 className="text-5xl font-black text-stone-900">All Flooring</h1>
            <p className="text-stone-400 mt-2">4,000+ products — hardwood, tile, vinyl, mosaics, rugs &amp; more.</p>
          </AnimateIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-10">
        <AnimateIn>
          <form onSubmit={handleSearch} className="flex gap-3 mb-7">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                placeholder="Search by name, style, brand..."
                className="w-full pl-11 pr-10 py-3 border border-stone-200 text-stone-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 rounded-lg placeholder:text-stone-400 transition-all bg-white"
              />
              {inputVal && (
                <button type="button" onClick={() => { setInputVal(''); setQuery(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <button type="submit" className="btn-primary px-7 rounded-lg">Search</button>
          </form>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700 bg-white'
                }`}
              >{cat}</button>
            ))}
          </div>
        </AnimateIn>

        {loading && products.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <MagnifyingGlassIcon className="w-10 h-10 text-stone-200 mx-auto mb-5" />
            <h3 className="text-xl font-black text-stone-700 mb-2">No products found</h3>
            <p className="text-stone-400 mb-8 max-w-sm mx-auto text-sm">
              {query || activeCategory !== 'All'
                ? 'Try clearing filters, or connect your Shopify store.'
                : 'Connect your Shopify store in .env.local to display products.'}
            </p>
            <button onClick={() => { setQuery(''); setInputVal(''); setActiveCategory('All'); }} className="btn-outline rounded-lg">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-5">{products.length} products{hasMore ? '+' : ''}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <AnimateIn key={product.id} delay={Math.min(i, 8) * 35}>
                  <ProductCard product={product} />
                </AnimateIn>
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-12">
                <button onClick={() => fetchProducts(false)} disabled={loading} className="btn-outline rounded-lg px-10">
                  {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin" />Loading...</span> : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-stone-400 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
