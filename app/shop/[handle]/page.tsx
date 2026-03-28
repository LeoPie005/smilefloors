'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { getProduct, formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/cartContext';

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { addItem, loading: cartLoading } = useCart() as any;

  useEffect(() => {
    async function load() {
      try {
        const p = await getProduct(handle);
        setProduct(p);
        if (p?.variants?.edges?.[0]?.node) {
          setSelectedVariant(p.variants.edges[0].node);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16 animate-pulse">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-stone-100 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-stone-100 rounded w-3/4" />
              <div className="h-6 bg-stone-100 rounded w-1/3" />
              <div className="h-24 bg-stone-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32">
        <h1 className="text-3xl font-bold text-stone-700 mb-4">Product Not Found</h1>
        <Link href="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const images = product.images.edges.map(({ node }: any) => node);
  const variants = product.variants.edges.map(({ node }: any) => node);
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addItem(selectedVariant.id, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
        <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-amber-600 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-stone-700 truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-4 shadow-lg">
            {images.length > 0 ? (
              <Image
                src={images[selectedImage]?.url}
                alt={images[selectedImage]?.altText || product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 text-6xl">
                🪵
              </div>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImage ? 'border-amber-500' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Image src={img.url} alt={img.altText || ''} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.vendor && (
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">{product.vendor}</p>
          )}
          <h1 className="text-3xl font-extrabold text-stone-900 mb-3">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-amber-400" />)}
            <span className="text-stone-500 text-sm ml-1">Verified Quality</span>
          </div>

          <div className="text-3xl font-extrabold text-stone-900 mb-1">
            {formatPrice(price.amount, price.currencyCode)}
            <span className="text-stone-400 text-base font-normal ml-2">/ sq ft</span>
          </div>

          {/* Variant selector */}
          {product.options?.length > 0 && product.options[0].values.length > 1 && (
            <div className="mt-6">
              {product.options.map((option: any) => (
                <div key={option.name} className="mb-4">
                  <label className="text-sm font-semibold text-stone-700 uppercase tracking-wide block mb-2">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((val: string) => {
                      const matchedVariant = variants.find((v: any) =>
                        v.selectedOptions.some((o: any) => o.name === option.name && o.value === val)
                      );
                      const isSelected = selectedVariant?.selectedOptions?.some(
                        (o: any) => o.name === option.name && o.value === val
                      );
                      return (
                        <button
                          key={val}
                          onClick={() => matchedVariant && setSelectedVariant(matchedVariant)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50 text-amber-700'
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          } ${!matchedVariant?.availableForSale ? 'opacity-40 line-through cursor-not-allowed' : ''}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-semibold text-stone-700">Quantity</label>
            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-stone-100 transition-colors font-bold"
              >
                −
              </button>
              <span className="px-4 py-2 font-semibold min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 hover:bg-stone-100 transition-colors font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || cartLoading || !selectedVariant?.availableForSale}
              className="flex-1 btn-primary py-4 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <Link href="/contact" className="btn-secondary py-4 px-6 text-base">
              Get Quote
            </Link>
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.slice(0, 6).map((tag: string) => (
                <span key={tag} className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {product.descriptionHtml && (
            <div
              className="mt-8 prose prose-stone prose-sm max-w-none text-stone-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-100 pt-6">
            {[
              { icon: '🏪', label: 'In-Store Pickup' },
              { icon: '📦', label: 'Bulk Orders' },
              { icon: '💬', label: 'Expert Advice' },
            ].map((b) => (
              <div key={b.label} className="text-center">
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-xs text-stone-500 font-medium">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
