'use client';

import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/shopify';

export default function CartDrawer() {
  const { isOpen, setIsOpen, cartLines, cartTotal, cartCurrency, updateItem, removeItem, checkoutUrl } = useCart();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl border-l border-stone-100 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="text-lg font-black text-stone-900">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-700 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartLines.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCartIcon className="w-12 h-12 text-stone-200 mx-auto mb-4" />
              <p className="text-stone-500 font-semibold mb-1">Your cart is empty</p>
              <p className="text-stone-400 text-sm mb-6">Add products from the shop to get started.</p>
              <button onClick={() => setIsOpen(false)}>
                <Link href="/shop" className="text-amber-500 hover:text-amber-600 font-bold text-sm transition-colors">
                  Browse Products →
                </Link>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartLines.map((line) => {
                const product = line.merchandise.product;
                const image = product?.images?.edges?.[0]?.node;
                return (
                  <div key={line.id} className="flex gap-4 border border-stone-100 rounded-xl p-4">
                    <div className="relative w-18 h-18 flex-shrink-0 bg-stone-50 rounded-lg overflow-hidden" style={{width: 72, height: 72}}>
                      {image ? (
                        <Image src={image.url} alt={image.altText || product.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 text-stone-300">
                            <rect x="4" y="8" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                            <rect x="4" y="20" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                            <rect x="4" y="32" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-stone-800 text-sm font-semibold truncate">{product.title}</p>
                      {line.merchandise.title !== 'Default Title' && (
                        <p className="text-stone-400 text-xs">{line.merchandise.title}</p>
                      )}
                      <p className="text-amber-600 font-black mt-0.5">
                        {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))} className="w-7 h-7 border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
                          <MinusIcon className="w-3 h-3 text-stone-500" />
                        </button>
                        <span className="text-stone-800 font-bold text-sm w-5 text-center">{line.quantity}</span>
                        <button onClick={() => updateItem(line.id, line.quantity + 1)} className="w-7 h-7 border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
                          <PlusIcon className="w-3 h-3 text-stone-500" />
                        </button>
                        <button onClick={() => removeItem(line.id)} className="ml-auto text-stone-300 hover:text-red-400 transition-colors">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartLines.length > 0 && (
          <div className="border-t border-stone-100 p-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-stone-500 font-semibold text-sm">Total</span>
              <span className="text-stone-900 font-black text-2xl">{formatPrice(cartTotal, cartCurrency)}</span>
            </div>
            <p className="text-xs text-stone-400">Shipping & taxes calculated at checkout</p>
            {checkoutUrl ? (
              <a href={checkoutUrl} className="btn-primary w-full py-4 text-base justify-center">Checkout →</a>
            ) : (
              <Link href="/shop" onClick={() => setIsOpen(false)} className="btn-primary w-full py-4 text-base justify-center block text-center">Continue Shopping →</Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
