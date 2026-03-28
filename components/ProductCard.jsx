'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/cartContext';

function FloorPlaceholder({ title = '' }) {
  const palettes = [
    { bg: '#faf8f5', stroke: '#d4b896' },
    { bg: '#f5f5f4', stroke: '#a8a29e' },
    { bg: '#fefce8', stroke: '#d97706' },
    { bg: '#f0fdf4', stroke: '#86efac' },
    { bg: '#fdf2f8', stroke: '#f0abfc' },
  ];
  const p = palettes[(title.charCodeAt(0) || 0) % palettes.length];
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: p.bg }}>
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`fp-${title.slice(0, 3)}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <polygon points="15,2 28,15 15,28 2,15" fill="none" stroke={p.stroke} strokeWidth="0.7"/>
          </pattern>
        </defs>
        <rect width="120" height="120" fill={`url(#fp-${title.slice(0, 3)})`}/>
        <rect x="35" y="48" width="50" height="7" rx="1" fill={p.stroke} opacity="0.45"/>
        <rect x="35" y="59" width="50" height="7" rx="1" fill={p.stroke} opacity="0.45"/>
        <rect x="35" y="70" width="50" height="7" rx="1" fill={p.stroke} opacity="0.45"/>
      </svg>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const image = product?.images?.edges?.[0]?.node;
  const price = product?.priceRange?.minVariantPrice;
  const defaultVariantId = product?.variants?.edges?.[0]?.node?.id;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (defaultVariantId) await addItem(defaultVariantId, 1);
  };

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group bg-white border border-stone-100 rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:border-stone-200 transition-all duration-250"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <FloorPlaceholder title={product.title} />
        )}

        {defaultVariantId && (
          <button
            onClick={handleAddToCart}
            className="absolute inset-x-0 bottom-0 bg-amber-500 text-white font-bold text-sm py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-250 hover:bg-amber-600"
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-0.5">
        {product.vendor && (
          <p className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">{product.vendor}</p>
        )}
        <h3 className="text-stone-800 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-stone-900 transition-colors">
          {product.title}
        </h3>
        {price ? (
          <p className="text-stone-900 font-black text-base mt-1.5">
            {formatPrice(price.amount, price.currencyCode)}
            <span className="text-stone-400 font-normal text-xs ml-1">/ sq ft</span>
          </p>
        ) : (
          <p className="text-stone-400 text-sm mt-1.5">Contact for price</p>
        )}
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-stone-100 rounded-xl overflow-hidden">
      <div className="aspect-square bg-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-2.5 bg-stone-100 rounded w-1/4 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
        <div className="h-3.5 bg-stone-100 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
        <div className="h-5 bg-stone-100 rounded w-1/3 mt-2 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}
