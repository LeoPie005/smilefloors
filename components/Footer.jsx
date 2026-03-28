import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const links = {
  Shop: [
    ['All Flooring', '/shop'], ['Hardwood', '/collections/hardwood'],
    ['Vinyl / LVP', '/collections/vinyl'], ['Tile', '/collections/tile'],
    ['Mosaics', '/collections/mosaics'], ['Rugs', '/collections/rugs'],
    ['Laminate', '/collections/laminate'],
  ],
  Company: [
    ['About Us', '/about'], ['Contact Us', '/contact'], ['Get a Quote', '/contact'],
  ],
  'We Serve': [
    ['Homeowners', '/about#who-we-serve'], ['Contractors', '/about#who-we-serve'],
    ['Businesses', '/about#who-we-serve'], ['Healthcare', '/about#who-we-serve'],
    ['Schools', '/about#who-we-serve'],
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Smile Floors"
                width={140}
                height={50}
                className="h-11 w-auto object-contain mb-5"
              />
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted flooring destination in Lombard, IL. Serving homeowners, contractors, businesses, and institutions across Chicagoland.
            </p>
            <div className="space-y-3 text-sm text-stone-500">
              <a href="tel:7082995189" className="flex items-center gap-2.5 hover:text-amber-600 transition-colors group">
                <PhoneIcon className="w-4 h-4 text-amber-500 group-hover:text-amber-600" />
                (708) 299-5189
              </a>
              <a href="mailto:Shaw@smilefloorsusa.com" className="flex items-center gap-2.5 hover:text-amber-600 transition-colors group">
                <EnvelopeIcon className="w-4 h-4 text-amber-500 group-hover:text-amber-600" />
                Shaw@smilefloorsusa.com
              </a>
              <div className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                1218 S Garfield St, Lombard IL 60148
              </div>
              <div className="flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Mon–Fri 8 AM–5 PM<br /><span className="text-red-400">Sat–Sun Closed</span></span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-stone-800 font-bold text-xs uppercase tracking-widest mb-5">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="text-stone-400 hover:text-amber-600 transition-colors text-sm">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-200 mt-14 pt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-stone-400">
          <p>&copy; {new Date().getFullYear()} Smile Floors. All rights reserved.</p>
          <p>Lombard &amp; Chicagoland, IL</p>
        </div>
      </div>
    </footer>
  );
}
