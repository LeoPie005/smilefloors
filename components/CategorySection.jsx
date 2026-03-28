import Link from 'next/link';
import { AnimateIn } from './AnimateIn';

const HardwoodIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
    <rect x="4" y="9" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="4" y="21" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="4" y="33" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
    <line x1="18" y1="9" x2="18" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
    <line x1="30" y1="21" x2="30" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
    <line x1="22" y1="33" x2="22" y2="41" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
  </svg>
);
const TileIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
    <rect x="4" y="4" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="26" y="4" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="4" y="26" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="26" y="26" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const VinylIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
    <rect x="4" y="7" width="40" height="34" rx="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="4" y1="19" x2="44" y2="19" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="4" y1="31" x2="44" y2="31" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 13 Q16 11 22 13 Q28 15 34 13" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <path d="M10 25 Q18 23 26 25 Q34 27 40 25" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </svg>
);
const MosaicIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
    <polygon points="24,4 44,24 24,44 4,24" stroke="currentColor" strokeWidth="2"/>
    <polygon points="24,13 35,24 24,35 13,24" stroke="currentColor" strokeWidth="1.5"/>
    <polygon points="24,19 29,24 24,29 19,24" fill="currentColor" opacity="0.25"/>
  </svg>
);
const RugIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
    <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="12" y="12" width="24" height="24" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="18" y="18" width="12" height="12" rx="0.5" stroke="currentColor" strokeWidth="1"/>
    <line x1="6" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1"/>
    <line x1="6" y1="22" x2="12" y2="22" stroke="currentColor" strokeWidth="1"/>
    <line x1="6" y1="29" x2="12" y2="29" stroke="currentColor" strokeWidth="1"/>
    <line x1="36" y1="15" x2="42" y2="15" stroke="currentColor" strokeWidth="1"/>
    <line x1="36" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="1"/>
    <line x1="36" y1="29" x2="42" y2="29" stroke="currentColor" strokeWidth="1"/>
  </svg>
);
const LaminateIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
    <rect x="4" y="10" width="40" height="9" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="4" y="23" width="40" height="9" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="4" y="36" width="40" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.45"/>
    <line x1="24" y1="10" x2="24" y2="19" stroke="currentColor" strokeWidth="0.75" opacity="0.3"/>
    <line x1="14" y1="23" x2="14" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.3"/>
    <line x1="34" y1="23" x2="34" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.3"/>
  </svg>
);

const categories = [
  { name: 'Hardwood', handle: 'hardwood', tagline: 'Solid & Engineered', Icon: HardwoodIcon, bg: 'bg-amber-50', border: 'border-amber-100', iconColor: 'text-amber-600', hover: 'hover:border-amber-300 hover:bg-amber-50/80' },
  { name: 'Tile', handle: 'tile', tagline: 'Porcelain & Ceramic', Icon: TileIcon, bg: 'bg-stone-50', border: 'border-stone-200', iconColor: 'text-stone-500', hover: 'hover:border-stone-400' },
  { name: 'Vinyl / LVP', handle: 'vinyl', tagline: '100% Waterproof', Icon: VinylIcon, bg: 'bg-sky-50', border: 'border-sky-100', iconColor: 'text-sky-500', hover: 'hover:border-sky-300' },
  { name: 'Mosaics', handle: 'mosaics', tagline: 'Artisan Patterns', Icon: MosaicIcon, bg: 'bg-orange-50', border: 'border-orange-100', iconColor: 'text-orange-500', hover: 'hover:border-orange-300' },
  { name: 'Rugs', handle: 'rugs', tagline: 'Area & Accent', Icon: RugIcon, bg: 'bg-red-50', border: 'border-red-100', iconColor: 'text-red-500', hover: 'hover:border-red-300' },
  { name: 'Laminate', handle: 'laminate', tagline: 'Durable & Affordable', Icon: LaminateIcon, bg: 'bg-zinc-50', border: 'border-zinc-200', iconColor: 'text-zinc-500', hover: 'hover:border-zinc-400' },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">

        <AnimateIn>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-1">Browse</p>
              <h2 className="text-4xl font-black text-stone-900">Shop by Category</h2>
            </div>
            <Link href="/shop" className="hidden sm:block text-stone-400 hover:text-stone-700 text-sm font-semibold transition-colors">
              All Products →
            </Link>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <AnimateIn key={cat.handle} delay={i * 55} direction="up">
              <Link
                href={`/collections/${cat.handle}`}
                className={`group border ${cat.border} ${cat.bg} ${cat.hover} rounded-xl p-6 sm:p-8 flex flex-col gap-5 transition-all duration-200 hover:shadow-md`}
                style={{ minHeight: '180px' }}
              >
                <div className={`${cat.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                  <cat.Icon />
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-black text-stone-900">{cat.name}</h3>
                  <p className="text-xs text-stone-400 font-medium mt-0.5 uppercase tracking-wider">{cat.tagline}</p>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
