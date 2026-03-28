'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useCart } from '@/lib/cartContext';
import CartDrawer from './CartDrawer';

const shopLinks = [
  { name: 'All Products', href: '/shop' },
  { name: 'Hardwood', href: '/collections/hardwood' },
  { name: 'Laminate', href: '/collections/laminate' },
  { name: 'Vinyl / LVP', href: '/collections/vinyl' },
  { name: 'Tile', href: '/collections/tile' },
  { name: 'Mosaics', href: '/collections/mosaics' },
  { name: 'Rugs', href: '/collections/rugs' },
  { name: 'Accessories', href: '/collections/accessories' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top info bar */}
      <div className="bg-amber-50 border-b border-amber-100 text-stone-600 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex justify-between items-center">
          <a href="tel:7082995189" className="hover:text-amber-600 transition-colors font-medium">
            📞 (708) 299-5189
          </a>
          <span className="hidden sm:block">1218 S Garfield St, Lombard IL 60148 · Mon–Fri 8AM–5PM</span>
          <Link href="/contact" className="hover:text-amber-600 transition-colors font-medium">Free Quote →</Link>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'border-b border-stone-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between h-[68px]">

          {/* Logo — home button */}
          <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Smile Floors — Home">
            <Image
              src="/images/logo.svg"
              alt="Smile Floors"
              width={148}
              height={52}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link href="/about" className="nav-item">About</Link>

            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button className="nav-item flex items-center gap-1">
                Shop <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-0 w-52 bg-white border border-stone-100 shadow-xl rounded-b-lg py-2 z-50 transition-all duration-150 ${shopOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                {shopLinks.map((link) => (
                  <Link key={link.name} href={link.href}
                    className={`block px-5 py-2.5 text-sm transition-colors ${link.name === 'All Products' ? 'font-bold text-stone-800 border-b border-stone-100 hover:text-amber-600' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'}`}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" className="nav-item">Contact</Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <Link href="/shop" className="hidden sm:flex items-center justify-center w-10 h-10 text-stone-400 hover:text-stone-700 transition-colors rounded-lg hover:bg-stone-50">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Link>
            <button onClick={() => setIsOpen(true)} className="relative flex items-center justify-center w-10 h-10 text-stone-400 hover:text-stone-700 transition-colors rounded-lg hover:bg-stone-50" aria-label="Cart">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <Link href="/contact" className="hidden sm:inline-flex ml-2 bg-amber-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-colors">
              Get Quote
            </Link>
            <button className="lg:hidden flex items-center justify-center w-10 h-10 text-stone-600 ml-1 rounded-lg hover:bg-stone-50" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-stone-100 bg-white">
            <div className="max-w-7xl mx-auto px-5 py-4 space-y-0.5">
              <Link href="/" className="mob-item font-semibold text-stone-900" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/about" className="mob-item" onClick={() => setMobileOpen(false)}>About</Link>
              <div className="border-t border-stone-100 pt-2 mt-2">
                <p className="px-3 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-widest">Shop</p>
                {shopLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="mob-item" onClick={() => setMobileOpen(false)}>{link.name}</Link>
                ))}
              </div>
              <Link href="/contact" className="mob-item" onClick={() => setMobileOpen(false)}>Contact</Link>
              <div className="pt-3">
                <Link href="/contact" className="block bg-amber-500 text-white text-center font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors" onClick={() => setMobileOpen(false)}>
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer />

      <style>{`
        .nav-item { padding: 8px 14px; font-size: 14px; font-weight: 600; color: #57534e; transition: color 0.15s; border-radius: 6px; }
        .nav-item:hover { color: #111; background: #fafaf9; }
        .mob-item { display: block; padding: 10px 12px; font-size: 15px; font-weight: 500; color: #44403c; border-radius: 8px; transition: background 0.1s, color 0.1s; }
        .mob-item:hover { background: #fafaf9; color: #111; }
      `}</style>
    </>
  );
}
